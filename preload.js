const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  openJsonFile: () => ipcRenderer.invoke('open-json-file'),
  saveJsonFile: (data, filePath) => ipcRenderer.invoke('save-json-file', data, filePath),
  saveJsonFileAs: (data) => ipcRenderer.invoke('save-json-file-as', data),
  
  // Menu events
  onMenuOpenFile: (callback) => ipcRenderer.on('menu-open-file', callback),
  onMenuSaveFile: (callback) => ipcRenderer.on('menu-save-file', callback),
  onMenuSaveFileAs: (callback) => ipcRenderer.on('menu-save-file-as', callback),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});