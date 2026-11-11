const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktop', {
  listArchive: () => ipcRenderer.invoke('archive:list'),
  saveArchive: item => ipcRenderer.invoke('archive:save', item),
  removeArchive: category => ipcRenderer.invoke('archive:remove', category),
  open: url => ipcRenderer.invoke('shell:open', url)
});
