# JSON Editor

![Build Status](https://github.com/YOUR_USERNAME/json-editor/workflows/Build%20and%20Release/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey.svg)

A desktop JSON editor application built with Electron, React, and TypeScript that provides a spreadsheet-like interface for editing JSON arrays with advanced filtering and batch editing capabilities.

## 📥 Download

**[⬇️ Download Latest Release](https://github.com/YOUR_USERNAME/json-editor/releases/latest)**

### Quick Download Links:
- **🍎 macOS**: [Download DMG](https://github.com/YOUR_USERNAME/json-editor/releases/latest/download/JSON%20Editor-1.0.0.dmg)
- **🪟 Windows**: [Download Installer](https://github.com/YOUR_USERNAME/json-editor/releases/latest/download/JSON%20Editor%20Setup%201.0.0.exe)
- **🐧 Linux**: [Download AppImage](https://github.com/YOUR_USERNAME/json-editor/releases/latest/download/JSON%20Editor-1.0.0.AppImage)

> **No installation required!** Download, install, and run immediately - no Node.js or development tools needed.

## ✨ Screenshots

![JSON Editor Screenshot](https://via.placeholder.com/800x500/f0f0f0/666666?text=JSON+Editor+Screenshot)
*Add your actual screenshot here*

## Features

- **Table View**: Display JSON arrays as spreadsheet-like tables with flattened nested objects
- **Column Filtering**: Search and filter data in each column using search bars
- **Batch Editing**: Select multiple rows and edit values in bulk
- **In-place Editing**: Double-click cells to edit values directly
- **Nested Object Support**: Automatically flattens nested objects into columns with dot notation paths
- **File Operations**: Open, save, and save-as functionality with auto-save indicators
- **Type-aware Editing**: Handles different data types (strings, numbers, booleans, arrays, objects)

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the React app**:
   ```bash
   npm run build
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

For development:
```bash
npm run dev
```

## Usage

### Loading JSON Files

1. Launch the application
2. Click "Open JSON File" or use `Ctrl/Cmd + O`
3. Select a JSON file containing an array of objects

### Example JSON Structure

```json
[
  {
    "foo": 456,
    "hello": "hi"
  },
  {
    "foo": 123,
    "bar": ["a", "b"]
  },
  {
    "foo": 789,
    "nested": {
      "level1": {
        "level2": "deep value"
      },
      "simple": "value"
    }
  }
]
```

This will be displayed as:

| foo | bar | hello | nested.level1.level2 | nested.simple |
|-----|-----|-------|---------------------|---------------|
| 456 | null | hi | null | null |
| 123 | ["a", "b"] | null | null | null |
| 789 | null | null | "deep value" | "value" |

### Editing Data

- **Single Cell Edit**: Double-click any cell to edit its value
- **Batch Edit**: 
  1. Select multiple rows using checkboxes
  2. Click "Batch Edit" button
  3. Choose column and enter new value
  4. Apply changes

### Filtering

- Each column header contains a search input
- Type to filter rows containing the search term
- Clear filters using the "×" button

### Keyboard Shortcuts

- `Ctrl/Cmd + O` - Open file
- `Ctrl/Cmd + S` - Save file
- `Ctrl/Cmd + Shift + S` - Save as
- `Enter` - Confirm cell edit
- `Escape` - Cancel cell edit
- `Double-click` - Start editing cell

## Data Types

The editor supports various data types:

- **Strings**: Regular text values
- **Numbers**: Numeric values (integers and floats)
- **Booleans**: true/false values
- **Arrays**: JSON arrays (displayed and edited as JSON strings)
- **Objects**: JSON objects (displayed and edited as JSON strings)
- **Null**: null values (displayed as "null")

## File Operations

- **Auto-save indicators**: Asterisk (*) shows unsaved changes
- **File path display**: Shows current file name in header
- **Export**: All changes are saved back to the original JSON format

## 🛠 Installation Instructions

### For End Users (Recommended)

1. **Download** the appropriate file for your operating system from the [releases page](https://github.com/YOUR_USERNAME/json-editor/releases/latest)
2. **Install** following the standard process for your OS:
   - **macOS**: Open the DMG and drag to Applications
   - **Windows**: Run the installer EXE file  
   - **Linux**: Make AppImage executable and run: `chmod +x *.AppImage && ./JSON*.AppImage`

### For Developers

```bash
git clone https://github.com/YOUR_USERNAME/json-editor.git
cd json-editor
npm install
npm start
```

## 📦 Building from Source

To create your own distributable apps:

```bash
# Build for your current platform
npm run dist

# Build for specific platforms
npm run dist-mac     # macOS
npm run dist-win     # Windows  
npm run dist-linux   # Linux

# The executable files will be in the dist/ folder
```

See [DISTRIBUTION.md](DISTRIBUTION.md) for complete build and distribution instructions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/YOUR_USERNAME/json-editor/issues) page to report bugs or request features.

## ⭐ Support

If you find this project helpful, please consider giving it a star on GitHub!

## Development

### Project Structure

```
json-editor/
├── main.js                 # Electron main process
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── src/
│   ├── App.tsx           # Main React application
│   ├── index.tsx         # React entry point
│   ├── types/
│   │   └── index.ts      # TypeScript type definitions
│   ├── utils/
│   │   └── jsonFlattener.ts  # JSON flattening utilities
│   └── components/
│       ├── TableView.tsx      # Main table component
│       ├── ColumnFilter.tsx   # Column filtering
│       ├── BatchEditor.tsx    # Batch editing modal
│       └── FileLoader.tsx     # File loading screen
├── public/
│   └── index.html        # HTML template
└── build/                # Production build output
```

### Building for Distribution

```bash
npm run build-electron
```

This creates platform-specific installers in the `dist/` directory.

## Testing

A test JSON file is included (`test-data.json`) for trying out the features.

## Technical Details

- **Frontend**: React 18 with TypeScript
- **Desktop**: Electron 23
- **Build**: React Scripts with electron-builder
- **Styling**: CSS modules with responsive design
- **File I/O**: Node.js fs module through Electron IPC

## Troubleshooting

### Common Issues

1. **Build errors**: Make sure all dependencies are installed with `npm install`
2. **File not loading**: Ensure the JSON file contains a valid array at the root level
3. **Type errors**: The editor attempts to preserve data types but may convert complex objects to strings

### Error Messages

- "JSON file must contain an array of objects" - The root element must be an array
- File loading errors will display the specific error message
- Save errors will show relevant file system error details

## License

MIT License