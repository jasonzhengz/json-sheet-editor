import React from 'react';
import './ColumnFilter.css';

interface ColumnFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="column-filter">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="filter-input"
        onClick={(e) => e.stopPropagation()}
      />
      {value && (
        <button
          className="clear-filter"
          onClick={(e) => {
            e.stopPropagation();
            onChange('');
          }}
          title="Clear filter"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ColumnFilter;