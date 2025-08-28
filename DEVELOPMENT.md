# JSON Editor - Development Guide

This guide is for developers who want to contribute to or modify the JSON Editor.

## 🛠 Development Setup

### Prerequisites
- Node.js 16 or higher
- npm (comes with Node.js)

### Installation
```bash
git clone https://github.com/jasonzhengz/json-sheet-editor.git
cd json-sheet-editor
npm install
```

### Running in Development Mode
```bash
npm run dev
```

This will:
1. Start the React development server on http://localhost:3000
2. Launch Electron and connect to the dev server
3. Enable hot reloading for React components

### Building for Production
```bash
# Build React app
npm run build

# Test production build locally
npm start

# Build distributables
npm run dist
```

## 📦 Creating Distributable Apps

### For Current Platform
```bash
npm run dist
```

### For Specific Platforms
```bash
npm run dist-mac     # macOS
npm run dist-win     # Windows  
npm run dist-linux   # Linux
npm run dist-all     # All platforms
```

Generated files will be in the `dist/` folder:
- **macOS**: `JSON Editor-1.0.0.dmg`, `JSON Editor-1.0.0-mac.zip`
- **Windows**: `JSON Editor Setup 1.0.0.exe`, portable EXE
- **Linux**: `JSON Editor-1.0.0.AppImage`, `json-editor_1.0.0_amd64.deb`

## 🏗 Project Structure

```
json-editor/
├── main.js                 # Electron main process
├── preload.js              # Secure IPC bridge
├── package.json            # Dependencies and build config
├── src/
│   ├── App.tsx             # Main React application
│   ├── index.tsx           # React entry point
│   ├── types/index.ts      # TypeScript type definitions
│   ├── utils/
│   │   └── jsonFlattener.ts # JSON processing utilities
│   └── components/
│       ├── TableView.tsx    # Main table component
│       ├── ColumnFilter.tsx # Column filtering
│       ├── BatchEditor.tsx  # Batch editing modal
│       └── FileLoader.tsx   # File loading screen
├── public/
│   └── index.html          # HTML template
└── build/                  # Production React build
```

## 🔧 Technical Architecture

### Electron Structure
- **Main Process** (`main.js`): Window management, file operations, menu
- **Preload Script** (`preload.js`): Secure IPC communication bridge
- **Renderer Process** (React app): UI and user interactions

### React Components
- **App**: Main application logic and state management
- **TableView**: Spreadsheet display with editing capabilities
- **ColumnFilter**: Individual column search functionality
- **BatchEditor**: Multi-row editing modal
- **FileLoader**: Welcome screen and file selection

### Data Flow
1. JSON file loaded via Electron file dialog
2. Data flattened by `jsonFlattener.ts` utilities
3. Displayed in table format with React components  
4. Edits applied and saved back to original JSON structure

## 🔒 Security

The app uses modern Electron security practices:
- `contextIsolation: true` - Isolate renderer from Node.js
- `nodeIntegration: false` - No direct Node.js access in renderer
- `contextBridge` API - Secure communication via preload script

## 🧪 Testing

### Manual Testing
1. Test with various JSON structures (nested objects, arrays, different data types)
2. Verify file operations (open, save, save-as)
3. Test filtering and batch editing features
4. Validate cross-platform builds

### Test Data
Use `test-data.json` for development testing:
```json
[
  {"foo": 456, "hello": "hi"},
  {"foo": 123, "bar": ["a", "b"]},
  {"nested": {"level1": {"level2": "value"}}}
]
```

## 🚀 GitHub Actions

### Automated Builds
The repository includes GitHub Actions that automatically:
- Build for macOS, Windows, and Linux
- Run tests and linting
- Create releases with attached binaries
- Trigger on tags matching `v*` pattern

### Creating Releases
1. Tag a version: `git tag v1.1.0 && git push origin v1.1.0`
2. GitHub Actions will automatically build and create a release
3. Distributables will be attached to the GitHub release

## 🐛 Debugging

### Electron Issues
- Enable DevTools: Set `isDev = true` in `main.js`
- Check console logs in both main and renderer processes
- Use `--enable-logging` flag when running Electron

### React Issues  
- Use React DevTools browser extension
- Check browser console in DevTools
- Add console.log statements in components

### Build Issues
- Clear build cache: `rm -rf build/ dist/`
- Check electron-builder logs for packaging errors
- Verify file paths and permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m 'Add amazing feature'`
5. Push and create a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow existing code patterns and naming conventions
- Add comments for complex logic
- Test on multiple platforms when possible

## 📚 Resources

- [Electron Documentation](https://electronjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [electron-builder](https://www.electron.build/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🔄 Release Process

1. Update version in `package.json`
2. Update CHANGELOG (if maintaining one)
3. Create and push git tag: `git tag v1.x.x && git push origin v1.x.x`
4. GitHub Actions will build and publish the release automatically
5. Update README if needed with new features

## ❓ Troubleshooting

### Common Issues

**Empty window in packaged app:**
- Check file paths in `main.js`
- Verify build output in `build/` folder
- Ensure `homepage: "./"` in package.json

**Build failures:**
- Update electron-builder: `npm update electron-builder`
- Check Node.js version compatibility
- Clear npm cache: `npm cache clean --force`

**Permission errors:**
- Ensure repository permissions allow GitHub Actions to create releases
- Check that GITHUB_TOKEN has proper scopes