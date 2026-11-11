const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const dataFile = () => path.join(app.getPath('userData'), 'archive.json');
function readArchive() { try { return JSON.parse(fs.readFileSync(dataFile(), 'utf8')); } catch { return []; } }
function writeArchive(items) { fs.writeFileSync(dataFile(), JSON.stringify(items, null, 2), 'utf8'); }
function createWindow() {
  const win = new BrowserWindow({ width: 1420, height: 940, minWidth: 1100, minHeight: 700, autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, sandbox: true } });
  win.loadFile('index.html');
}
app.whenReady().then(() => { createWindow(); app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); }); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
ipcMain.handle('archive:list', () => readArchive());
ipcMain.handle('archive:save', (_, item) => { const all = readArchive(); if (!all.some(x => x.category === item.category)) { all.unshift(item); writeArchive(all); } return all; });
ipcMain.handle('archive:remove', (_, category) => { const all = readArchive().filter(x => x.category !== category); writeArchive(all); return all; });
ipcMain.handle('shell:open', (_, target) => shell.openExternal(target));
