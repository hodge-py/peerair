const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  login: (user,password) => ipcRenderer.send('login', [user,password]),
  sendSettings: (callback) => ipcRenderer.on('send-user', (_event, value) => callback(value))
})