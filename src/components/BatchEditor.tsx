import React, { useState } from 'react';
import { ColumnInfo } from '../types';
import { parseCellValue } from '../utils/jsonFlattener';
import './BatchEditor.css';

interface BatchEditorProps {
  columns: ColumnInfo[];
  selectedRowCount: number;
  onBatchEdit: (columnKey: string, newValue: any) => void;
  onClose: () => void;
}

const BatchEditor: React.FC<BatchEditorProps> = ({ 
  columns, 
  selectedRowCount, 
  onBatchEdit, 
  onClose 
}) => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedColumn || newValue === '') {
      alert('Please select a column and enter a value');
      return;
    }

    const columnInfo = columns.find(col => col.key === selectedColumn);
    if (!columnInfo) return;

    const parsedValue = parseCellValue(newValue, columnInfo.type);
    onBatchEdit(selectedColumn, parsedValue);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="batch-editor-overlay" onClick={handleOverlayClick}>
      <div className="batch-editor-modal">
        <div className="modal-header">
          <h3>Batch Edit</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <p className="selected-info">
            Editing {selectedRowCount} selected row{selectedRowCount !== 1 ? 's' : ''}
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="column-select">Column:</label>
              <select
                id="column-select"
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                required
              >
                <option value="">Select a column...</option>
                {columns.map(column => (
                  <option key={column.key} value={column.key}>
                    {column.path} ({column.type})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="new-value">New Value:</label>
              <input
                id="new-value"
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Enter new value..."
                required
              />
              <small className="help-text">
                {selectedColumn && columns.find(col => col.key === selectedColumn) && (
                  <>
                    Type: {columns.find(col => col.key === selectedColumn)?.type}
                    {columns.find(col => col.key === selectedColumn)?.type === 'array' && 
                      ' (use JSON format, e.g., ["a", "b"])'}
                    {columns.find(col => col.key === selectedColumn)?.type === 'object' && 
                      ' (use JSON format, e.g., {"key": "value"})'}
                  </>
                )}
              </small>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="apply-btn">
                Apply to {selectedRowCount} row{selectedRowCount !== 1 ? 's' : ''}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BatchEditor;