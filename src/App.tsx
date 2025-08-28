import React, { useState, useEffect, useCallback } from 'react';
import { JsonData, FlattenedRow, ColumnInfo, FileData } from './types';
import { flattenJsonArray, unflattenToJsonArray } from './utils/jsonFlattener';
import TableView from './components/TableView';
import FileLoader from './components/FileLoader';
import './App.css';

// Use the secure electronAPI exposed by preload script
const electronAPI = (window as any).electronAPI;

const App: React.FC = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [flattenedData, setFlattenedData] = useState<FlattenedRow[]>([]);
  const [columns, setColumns] = useState<ColumnInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const loadJsonFile = useCallback(async () => {
    if (!electronAPI) {
      alert('Error: Electron API not available');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await electronAPI.openJsonFile();
      if (result.success) {
        const jsonData = result.data;
        
        if (!Array.isArray(jsonData)) {
          alert('Error: JSON file must contain an array of objects');
          return;
        }

        const { flattenedRows, columns: cols } = flattenJsonArray(jsonData);
        
        setFileData({ data: jsonData, filePath: result.filePath });
        setFlattenedData(flattenedRows);
        setColumns(cols);
        setHasUnsavedChanges(false);
      } else {
        if (result.error !== 'No file selected') {
          alert(`Error loading file: ${result.error}`);
        }
      }
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveFile = useCallback(async (saveAs = false) => {
    if (!fileData || !electronAPI) return;

    const originalData = unflattenToJsonArray(flattenedData);
    
    try {
      let result: { success: boolean; error?: string; filePath?: string };
      if (saveAs || !fileData.filePath) {
        result = await electronAPI.saveJsonFileAs(originalData);
      } else {
        result = await electronAPI.saveJsonFile(originalData, fileData.filePath);
      }

      if (result.success) {
        setHasUnsavedChanges(false);
        if (result.filePath) {
          setFileData(prev => prev ? { ...prev, filePath: result.filePath } : null);
        }
      } else {
        alert(`Error saving file: ${result.error}`);
      }
    } catch (error) {
      alert(`Error saving file: ${error}`);
    }
  }, [fileData, flattenedData]);

  const handleDataChange = useCallback((newData: FlattenedRow[]) => {
    setFlattenedData(newData);
    setHasUnsavedChanges(true);
  }, []);

  useEffect(() => {
    if (!electronAPI) return;
    
    const handleMenuOpen = () => loadJsonFile();
    const handleMenuSave = () => saveFile(false);
    const handleMenuSaveAs = () => saveFile(true);

    electronAPI.onMenuOpenFile(handleMenuOpen);
    electronAPI.onMenuSaveFile(handleMenuSave);
    electronAPI.onMenuSaveFileAs(handleMenuSaveAs);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      electronAPI.removeAllListeners('menu-open-file');
      electronAPI.removeAllListeners('menu-save-file');
      electronAPI.removeAllListeners('menu-save-file-as');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [loadJsonFile, saveFile, hasUnsavedChanges]);

  const getTitle = () => {
    let title = 'JSON Editor';
    if (fileData?.filePath) {
      const fileName = fileData.filePath.split('/').pop() || 'Untitled';
      title = `${fileName}${hasUnsavedChanges ? ' *' : ''} - JSON Editor`;
    } else if (hasUnsavedChanges) {
      title = 'Untitled * - JSON Editor';
    }
    return title;
  };

  useEffect(() => {
    document.title = getTitle();
  }, [fileData?.filePath, hasUnsavedChanges]);

  if (!fileData || flattenedData.length === 0) {
    return (
      <div className="app">
        <FileLoader onFileLoad={loadJsonFile} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>JSON Editor</h1>
          <div className="file-info">
            {fileData.filePath && (
              <span className="file-path">
                {fileData.filePath.split('/').pop()}
                {hasUnsavedChanges && <span className="unsaved-indicator"> *</span>}
              </span>
            )}
            <span className="data-info">
              {flattenedData.length} rows, {columns.length} columns
            </span>
          </div>
          <div className="header-actions">
            <button onClick={loadJsonFile} className="header-btn">
              Open New File
            </button>
            <button 
              onClick={() => saveFile(false)} 
              className="header-btn"
              disabled={!hasUnsavedChanges}
            >
              Save
            </button>
            <button onClick={() => saveFile(true)} className="header-btn">
              Save As...
            </button>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <TableView
          data={flattenedData}
          columns={columns}
          onDataChange={handleDataChange}
        />
      </main>
    </div>
  );
};

export default App;