const { app, BrowserWindow, ipcMain, dialog } = require('electron')
var mysql = require('mysql2');
const fs = require("fs");
const path = require('node:path')
const Store = require('electron-store');
var childProcess = require('child_process');
var ip = require('ip');

const store = new Store();

var win = '';

var connection = mysql.createConnection({
  host     : 'mysql-2872dcda-khodge1-9a96.a.aivencloud.com',
  user     : 'avnadmin',
  password : 'AVNS_Jaj2G0S2DROi77lmrSP',
  database : 'defaultdb',
  port: 17203,
});


const createWindow = async () => {
    win = new BrowserWindow({
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
      },
      width: 400,
      height: 400,
      minWidth:400,
      minHeight: 400
    });


    function runScript(scriptPath, callback) {

      // keep track of whether callback has been invoked to prevent multiple invocations
      var invoked = false;
  
      var process = childProcess.fork(scriptPath);
  
      // listen for errors as they may prevent the exit event from firing
      process.on('error', function (err) {
          if (invoked) return;
          invoked = true;
          callback(err);
      });
  
      // execute the callback once the process has finished running
      process.on('exit', function (code) {
          if (invoked) return;
          invoked = true;
          var err = code === 0 ? null : new Error('exit code ' + code);
          callback(err);
      });
  
  }

    runScript('./app.js', function (err) {
      if (err) throw err;
      console.log('finished running some-script.js');
  });

      win.loadFile('./Views/server.html');


     

  }



  app.whenReady().then(() => {
    createWindow()
    
    console.log(ip.address())

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })

      
  })



  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  











  /*
      ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        //win.webContents.send('send-user', [store.get('username'),store.get('peer_id')]);
        win.setTitle(title)
      })

      ipcMain.on('login', (event, args) => {
        //const webContents = event.sender
        //const win = BrowserWindow.fromWebContents(webContents)
        console.log(args)

        connection.query(
          'SELECT `username`, `pasword`, `peer_id` FROM `login` where `username` = ? and `pasword` = ?', [args[0], args[1]],
          async function(err, results, fields) {

            if(results.length > 0){
            store.delete('username')
            store.delete('peer_id')
            console.log(results.length); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            store.set('login_true', true);
            store.set('username', results[0].username)
            store.set('peer_id', results[0].peer_id)
            await win.loadFile('chat.html')

            win.webContents.send('send-user', [store.get('username'),store.get('peer_id')]);
            }
            else{
              win.loadFile('login.html')
            }
          }
        );

        
      })

        */