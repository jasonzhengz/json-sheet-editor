# JSON Editor

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey.svg)

A powerful desktop JSON editor that displays JSON files as spreadsheet-like tables with advanced filtering and batch editing capabilities.

## 📥 Download

**[⬇️ Download Latest Release](https://github.com/jasonzhengz/json-sheet-editor/releases/latest)**

### Choose Your Platform:
- **🍎 macOS**: Download the `.dmg` file
- **🪟 Windows**: Download the `.exe` installer  
- **🐧 Linux**: Download the `.AppImage` file

> **No technical setup required!** Simply download and install like any other desktop application.

## ✨ Screenshots
<img width="1199" height="802" alt="Screenshot 2025-08-28 at 11 36 11 PM" src="https://github.com/user-attachments/assets/fe61d187-85e9-492c-8cbd-de925255d7bf" />

<img width="1198" height="798" alt="Screenshot 2025-08-28 at 11 36 37 PM" src="https://github.com/user-attachments/assets/e8676579-de3f-4c66-a7a8-96d391e55485" />


## ✨ Features

### 📊 **Spreadsheet View**
- View JSON arrays as familiar spreadsheet tables
- Nested objects automatically flattened into columns
- Clean, intuitive interface for complex JSON data

### 🔍 **Smart Filtering** 
- Filter each column independently with search bars
- Real-time filtering as you type
- Easily find and focus on specific data

### ⚡ **Batch Editing**
- Select multiple rows and edit them all at once
- Save time when making bulk changes
- Undo/redo support for peace of mind

### 🎯 **Easy Editing**
- Double-click any cell to edit directly
- Handles all data types: strings, numbers, arrays, objects
- Auto-saves changes with visual indicators

## 🚀 How to Use

### 1. **Open Your JSON File**
- Launch the app
- Click "Open JSON File" or press `Ctrl/Cmd + O`
- Select any JSON file with an array of objects

### 2. **View as Table** 
Your JSON data will appear as a clean, organized table. For example:

```json
[
  {"name": "Alice", "age": 30, "city": "New York"},
  {"name": "Bob", "age": 25, "address": {"city": "Boston", "zip": "02101"}}
]
```

Becomes:
| name | age | city | address.city | address.zip |
|------|-----|------|--------------|-------------|
| Alice | 30 | New York | null | null |
| Bob | 25 | null | Boston | 02101 |

### 3. **Edit Your Data**
- **Single edits**: Double-click any cell
- **Bulk edits**: Select rows and use "Batch Edit"
- **Filter data**: Use the search boxes in column headers

### 4. **Save Changes**
- Press `Ctrl/Cmd + S` to save
- All edits are preserved in the original JSON format

## 🎹 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + O` | Open JSON file |
| `Ctrl/Cmd + S` | Save changes |
| `Double-click` | Edit cell |
| `Enter` | Confirm edit |
| `Escape` | Cancel edit |

## 📋 System Requirements

- **macOS**: macOS 10.13 or later
- **Windows**: Windows 10 or later (64-bit)
- **Linux**: Most modern distributions

## 🐛 Support

Found a bug or have a feature request? [Open an issue](https://github.com/jasonzhengz/json-sheet-editor/issues) on GitHub.

## 📄 License

MIT License - feel free to use this software for any purpose.
