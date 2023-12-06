const { app, BrowserWindow, ipcMain, dialog } = require('electron')
var mysql = require('mysql2');
const fs = require("fs");
const path = require('node:path')

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
  
    win.loadFile('login.html')
  }



  app.whenReady().then(() => {
    createWindow()
    

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })


      ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(title)
      })

      ipcMain.on('login', (event, args) => {
        //const webContents = event.sender
        //const win = BrowserWindow.fromWebContents(webContents)
        console.log(args)

        connection.query(
          'SELECT `username`, `pasword` FROM `login` where `username` = ? and `pasword` = ?', [args[0], args[1]],
          function(err, results, fields) {

            if(results){
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            win.loadFile('chat.html')
            }
          }
        );

      })


    
  })



  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  