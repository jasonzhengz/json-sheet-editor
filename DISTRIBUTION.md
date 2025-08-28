# JSON Editor - Distribution Guide

This guide explains how to create executable installers for the JSON Editor that users can install and run without requiring Node.js or npm.

## 🚀 Quick Distribution Build

### For Current Platform (Recommended)
```bash
npm run dist
```

### For All Platforms (requires appropriate OS or cross-compilation setup)
```bash
npm run dist-all     # Build for macOS, Windows, and Linux
npm run dist-mac     # Build for macOS only
npm run dist-win     # Build for Windows only
npm run dist-linux   # Build for Linux only
```

## 📦 Generated Files

After running the build, you'll find the distributable files in the `dist/` folder:

### macOS
- `JSON Editor-1.0.0.dmg` - DMG installer for Intel Macs
- `JSON Editor-1.0.0-arm64.dmg` - DMG installer for Apple Silicon (M1/M2) Macs  
- `JSON Editor-1.0.0-mac.zip` - Portable app for Intel Macs
- `JSON Editor-1.0.0-arm64-mac.zip` - Portable app for Apple Silicon Macs

### Windows (when built on Windows or with cross-compilation)
- `JSON Editor Setup 1.0.0.exe` - NSIS installer
- `JSON Editor 1.0.0.exe` - Portable executable

### Linux (when built on Linux or with cross-compilation)
- `JSON Editor-1.0.0.AppImage` - Portable AppImage
- `json-editor_1.0.0_amd64.deb` - Debian package

## 🔧 Build Instructions

### Prerequisites
1. **Node.js** (v16 or higher)
2. **npm** (comes with Node.js)

### Step-by-Step Build Process

1. **Clone and prepare**:
   ```bash
   git clone <repository-url>
   cd json-editor
   npm install
   ```

2. **Build for distribution**:
   ```bash
   # Option 1: Use the build script
   ./build-dist.sh
   
   # Option 2: Manual build
   npm run build
   npm run dist
   ```

3. **Find your executable files**:
   ```bash
   ls -la dist/
   ```

## 📋 Installation Instructions for End Users

### macOS Users
1. **DMG Installer (Recommended)**:
   - Download `JSON Editor-1.0.0.dmg` (Intel) or `JSON Editor-1.0.0-arm64.dmg` (Apple Silicon)
   - Double-click the DMG file
   - Drag "JSON Editor" to Applications folder
   - Launch from Applications or Spotlight

2. **ZIP Archive**:
   - Download the appropriate ZIP file
   - Extract and move "JSON Editor.app" to Applications folder

### Windows Users
1. **NSIS Installer (Recommended)**:
   - Download `JSON Editor Setup 1.0.0.exe`
   - Run the installer and follow prompts
   - Launch from Start Menu or Desktop shortcut

2. **Portable Version**:
   - Download `JSON Editor 1.0.0.exe`
   - Place anywhere and double-click to run

### Linux Users
1. **AppImage (Recommended)**:
   - Download `JSON Editor-1.0.0.AppImage`
   - Make executable: `chmod +x JSON\ Editor-1.0.0.AppImage`
   - Run: `./JSON\ Editor-1.0.0.AppImage`

2. **DEB Package (Debian/Ubuntu)**:
   - Download `json-editor_1.0.0_amd64.deb`
   - Install: `sudo dpkg -i json-editor_1.0.0_amd64.deb`
   - Launch from applications menu

## 🛠 Advanced Build Configuration

### Custom Build Settings
Edit `package.json` in the `build` section to customize:

- **App ID**: `appId: "com.yourcompany.json-editor"`
- **Product Name**: `productName: "Your JSON Editor"`
- **Version**: Update `version` field
- **Icons**: Add icon files and reference them in platform-specific configs

### Cross-Platform Building
To build for other platforms, you may need:

- **macOS**: Can build for macOS and Linux
- **Windows**: Can build for Windows and Linux  
- **Linux**: Can build for all platforms

Some limitations apply due to native dependencies and signing requirements.

### Code Signing (for macOS/Windows)
For production releases:

1. **macOS**: Requires Apple Developer account and certificates
2. **Windows**: Requires code signing certificate

Without signing, users may see security warnings.

## 📊 File Sizes (Approximate)

- **macOS DMG**: ~115-120 MB
- **Windows NSIS**: ~100-110 MB  
- **Linux AppImage**: ~110-120 MB
- **ZIP/Portable**: ~110-115 MB

## 🚨 Troubleshooting

### Build Issues
1. **"electron-builder command not found"**: Run `npm install`
2. **Build fails**: Clear cache with `npm run build` first
3. **Missing dependencies**: Run `npm install --production=false`

### Runtime Issues
1. **App won't start**: Check that target platform matches download
2. **macOS "damaged" warning**: Right-click → Open, or allow in Security preferences
3. **Windows "unknown publisher"**: Click "More info" → "Run anyway"

### Reduce File Size
To make smaller distributions:
```bash
# Build without source maps and dev tools
NODE_ENV=production npm run build
npm run dist
```

## 🔄 Update Distribution

To update the app:
1. Update `version` in `package.json`
2. Make your changes
3. Rebuild: `npm run dist`
4. Distribute new files to users

## 📁 Distribution Checklist

- [ ] Test the app locally with `npm start`
- [ ] Build successfully with `npm run dist`  
- [ ] Test the generated executable
- [ ] Verify file opens/saves work correctly
- [ ] Check app works without internet connection
- [ ] Test on target operating systems
- [ ] Update version numbers if needed
- [ ] Create release notes

## 🌐 Sharing Your App

### For Small Distribution
- Share DMG/EXE files directly via email, cloud storage, etc.
- Host files on your website for download

### For Wider Distribution  
- Submit to app stores (requires additional setup)
- Use auto-updater (requires additional configuration)
- Set up a download website with installation instructions

---

**Note**: The generated executables are completely standalone and don't require Node.js, npm, or any development tools to run. Users can simply download and install like any other desktop application.