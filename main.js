const { app, BrowserWindow } = require('electron')
var mysql = require('mysql2');
const fs = require("fs");



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
    const win = new BrowserWindow({
      width: 800,
      height: 800,
      minWidth:800,
      minHeight: 800
    })
  
    win.loadFile('chat.html')
  }



  app.whenReady().then(() => {
    createWindow()
    

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
    
  })



  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  