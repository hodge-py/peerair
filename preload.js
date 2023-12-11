const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  login: (user,password) => ipcRenderer.send('login', [user,password]),
  ip_address: (callback) => ipcRenderer.on('ip_address', (_event, value) => callback(value))
})
