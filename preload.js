const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktop', {
  listArchive: userId => ipcRenderer.invoke('archive:list', userId),
  saveArchive: (userId, item) => ipcRenderer.invoke('archive:save', userId, item),
  removeArchive: (userId, category) => ipcRenderer.invoke('archive:remove', userId, category),
  open: url => ipcRenderer.invoke('shell:open', url)
});
