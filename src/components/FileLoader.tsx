import React from 'react';
import './FileLoader.css';

interface FileLoaderProps {
  onFileLoad: () => void;
  isLoading: boolean;
}

const FileLoader: React.FC<FileLoaderProps> = ({ onFileLoad, isLoading }) => {
  return (
    <div className="file-loader">
      <div className="file-loader-content">
        <div className="file-loader-icon">📁</div>
        <h2>JSON Editor</h2>
        <p>Load a JSON file to start editing</p>
        <button 
          onClick={onFileLoad}
          disabled={isLoading}
          className="load-file-btn"
        >
          {isLoading ? 'Loading...' : 'Open JSON File'}
        </button>
        <div className="file-info">
          <small>
            The JSON file should contain an array of objects.<br/>
            Nested objects will be flattened into table columns.
          </small>
        </div>
        <div className="shortcuts">
          <p><strong>Keyboard Shortcuts:</strong></p>
          <ul>
            <li><kbd>Ctrl/Cmd + O</kbd> - Open file</li>
            <li><kbd>Ctrl/Cmd + S</kbd> - Save file</li>
            <li><kbd>Double-click</kbd> - Edit cell</li>
            <li><kbd>Enter</kbd> - Confirm edit</li>
            <li><kbd>Escape</kbd> - Cancel edit</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileLoader;