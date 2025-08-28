import React, { useState, useMemo } from 'react';
import { FlattenedRow, ColumnInfo, FilterState } from '../types';
import { formatCellValue, parseCellValue } from '../utils/jsonFlattener';
import ColumnFilter from './ColumnFilter';
import BatchEditor from './BatchEditor';
import './TableView.css';

interface TableViewProps {
  data: FlattenedRow[];
  columns: ColumnInfo[];
  onDataChange: (newData: FlattenedRow[]) => void;
}

const TableView: React.FC<TableViewProps> = ({ data, columns, onDataChange }) => {
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [editingCell, setEditingCell] = useState<{ row: number; column: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showBatchEditor, setShowBatchEditor] = useState(false);

  const filteredData = useMemo(() => {
    if (Object.keys(filters).length === 0) {
      return data;
    }

    return data.filter(row => {
      return Object.entries(filters).every(([columnKey, filterValue]) => {
        if (!filterValue.trim()) return true;
        
        const cellValue = formatCellValue(row[columnKey]).toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      });
    });
  }, [data, filters]);

  const handleFilterChange = (columnKey: string, filterValue: string) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: filterValue
    }));
  };

  const handleCellDoubleClick = (rowIndex: number, columnKey: string) => {
    const actualRowIndex = filteredData[rowIndex].__originalIndex;
    setEditingCell({ row: actualRowIndex, column: columnKey });
    setEditValue(formatCellValue(data[actualRowIndex][columnKey]));
  };

  const handleCellEdit = (value: string) => {
    if (!editingCell) return;

    const { row, column } = editingCell;
    const columnInfo = columns.find(col => col.key === column);
    const parsedValue = columnInfo ? parseCellValue(value, columnInfo.type) : value;

    const newData = [...data];
    newData[row] = { ...newData[row], [column]: parsedValue };
    onDataChange(newData);

    setEditingCell(null);
    setEditValue('');
  };

  const handleRowSelect = (rowIndex: number, selected: boolean) => {
    const actualRowIndex = filteredData[rowIndex].__originalIndex;
    const newSelection = new Set(selectedRows);
    
    if (selected) {
      newSelection.add(actualRowIndex);
    } else {
      newSelection.delete(actualRowIndex);
    }
    
    setSelectedRows(newSelection);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allVisibleIndices = filteredData.map(row => row.__originalIndex);
      setSelectedRows(new Set(allVisibleIndices));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleBatchEdit = (columnKey: string, newValue: any) => {
    const newData = [...data];
    selectedRows.forEach(rowIndex => {
      newData[rowIndex] = { ...newData[rowIndex], [columnKey]: newValue };
    });
    onDataChange(newData);
    setSelectedRows(new Set());
    setShowBatchEditor(false);
  };

  if (data.length === 0) {
    return (
      <div className="table-view-empty">
        <p>No data to display. Please load a JSON file.</p>
      </div>
    );
  }

  return (
    <div className="table-view">
      <div className="table-controls">
        <div className="selection-info">
          {selectedRows.size > 0 && (
            <>
              <span>{selectedRows.size} rows selected</span>
              <button 
                onClick={() => setShowBatchEditor(true)}
                className="batch-edit-btn"
              >
                Batch Edit
              </button>
              <button 
                onClick={() => setSelectedRows(new Set())}
                className="clear-selection-btn"
              >
                Clear Selection
              </button>
            </>
          )}
        </div>
      </div>

      <div className="table-container">
        <table className="json-table">
          <thead>
            <tr>
              <th className="select-column">
                <input
                  type="checkbox"
                  checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              {columns.map(column => (
                <th key={column.key} className={`column-${column.type}`}>
                  <div className="column-header">
                    <span className="column-title" title={column.path}>
                      {column.path}
                    </span>
                    <ColumnFilter
                      value={filters[column.key] || ''}
                      onChange={(value) => handleFilterChange(column.key, value)}
                      placeholder={`Filter ${column.path}...`}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, displayIndex) => {
              const actualIndex = row.__originalIndex;
              return (
                <tr 
                  key={actualIndex}
                  className={selectedRows.has(actualIndex) ? 'selected' : ''}
                >
                  <td className="select-column">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(actualIndex)}
                      onChange={(e) => handleRowSelect(displayIndex, e.target.checked)}
                    />
                  </td>
                  {columns.map(column => (
                    <td 
                      key={column.key}
                      className={`cell-${column.type}`}
                      onDoubleClick={() => handleCellDoubleClick(displayIndex, column.key)}
                    >
                      {editingCell?.row === actualIndex && editingCell?.column === column.key ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleCellEdit(editValue)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleCellEdit(editValue);
                            } else if (e.key === 'Escape') {
                              setEditingCell(null);
                              setEditValue('');
                            }
                          }}
                          autoFocus
                          className="cell-input"
                        />
                      ) : (
                        <span className="cell-value">
                          {formatCellValue(row[column.key])}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showBatchEditor && (
        <BatchEditor
          columns={columns}
          selectedRowCount={selectedRows.size}
          onBatchEdit={handleBatchEdit}
          onClose={() => setShowBatchEditor(false)}
        />
      )}
    </div>
  );
};

export default TableView;