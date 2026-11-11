const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

// User-requested shared local project folder: keep the archive beside the app project.
const dataFile = () => 'F:\\애니메이션1\\archive.json';
function readStore() { try { const saved = JSON.parse(fs.readFileSync(dataFile(), 'utf8')); return Array.isArray(saved) ? { legacy: saved } : saved; } catch { return {}; } }
function archiveFor(userId) { return readStore()[userId || 'guest'] || []; }
function writeArchive(userId, items) { const store = readStore(); store[userId || 'guest'] = items; fs.writeFileSync(dataFile(), JSON.stringify(store, null, 2), 'utf8'); }
function createWindow() {
  const win = new BrowserWindow({ width: 1420, height: 940, minWidth: 1100, minHeight: 700, autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, sandbox: true } });
  win.loadFile('index.html');
}
app.whenReady().then(() => { createWindow(); app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); }); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
ipcMain.handle('archive:list', (_, userId) => archiveFor(userId));
ipcMain.handle('archive:save', (_, userId, item) => { const all = archiveFor(userId); if (!all.some(x => x.category === item.category)) { all.unshift(item); writeArchive(userId, all); } return all; });
ipcMain.handle('archive:remove', (_, userId, category) => { const all = archiveFor(userId).filter(x => x.category !== category); writeArchive(userId, all); return all; });
ipcMain.handle('shell:open', (_, target) => shell.openExternal(target));
