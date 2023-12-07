const { app, BrowserWindow, ipcMain, dialog } = require('electron')
var mysql = require('mysql2');
const fs = require("fs");
const path = require('node:path')
const Store = require('electron-store');

const store = new Store();

var win = '';

var connection = mysql.createConnection({
  host     : 'mysql-2872dcda-khodge1-9a96.a.aivencloud.com',
  user     : 'avnadmin',
  password : 'AVNS_Jaj2G0S2DROi77lmrSP',
  database : 'defaultdb',
  port: 17203,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  }
});

connection.query(
  'SELECT * FROM `login`',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

const createWindow = () => {
    win = new BrowserWindow({
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
      width: 800,
      height: 800,
      minWidth:800,
      minHeight: 800
    })

  if(store.get('login_true') == undefined){
      win.loadFile('login.html')
    }
  else{
    win.loadFile('chat.html')
  }

  store.delete('login_true')

  }



  app.whenReady().then(() => {
    createWindow()
    

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })


      ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.webContents.send('send-user', [store.get('username'),store.get('peer_id')]);
        win.setTitle(title)
      })

      ipcMain.on('login', (event, args) => {
        //const webContents = event.sender
        //const win = BrowserWindow.fromWebContents(webContents)
        console.log(args)

        connection.query(
          'SELECT `username`, `pasword`, `peer_id` FROM `login` where `username` = ? and `pasword` = ?', [args[0], args[1]],
          function(err, results, fields) {

            if(results.length > 0){
            store.delete('username')
            store.delete('peer_id')
            console.log(results.length); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            store.set('login_true', true);
            store.set('username', results[0].username)
            store.set('peer_id', results[0].peer_id)
            win.loadFile('chat.html')
            
            }
            else{
              win.loadFile('login.html')
            }
          }
        );

        
      })


    
  })



  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  