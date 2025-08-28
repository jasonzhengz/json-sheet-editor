const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, './build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for file operations
ipcMain.handle('open-json-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    try {
      const filePath = result.filePaths[0];
      const data = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      return { success: true, data: jsonData, filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: false, error: 'No file selected' };
});

ipcMain.handle('save-json-file', async (event, data, filePath) => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('save-json-file-as', async (event, data) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePath) {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      fs.writeFileSync(result.filePath, jsonString, 'utf8');
      return { success: true, filePath: result.filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: false, error: 'No file selected' };
});

// Menu setup
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open JSON File',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          mainWindow.webContents.send('menu-open-file');
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: () => {
          mainWindow.webContents.send('menu-save-file');
        }
      },
      {
        label: 'Save As...',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: () => {
          mainWindow.webContents.send('menu-save-file-as');
        }
      },
      { type: 'separator' },
      {
        role: 'quit'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);