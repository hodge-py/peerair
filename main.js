const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
var mysql = require('mysql2');
const fs = require("fs");
const path = require('node:path')
const Store = require('electron-store');
var ip = require('ip');
const { shell } = require('electron')
const express = require('express');
const exp = express();
const http = require('http');
const server = http.createServer(exp);
const { Server } = require("socket.io");
const io = new Server(server);
var bodyParser = require('body-parser')
const multer = require("multer");
//const updater = require('src/index');


//updater.init('https://raw.githubusercontent.com/hodge-py/PeerAir-production/main/update.json');


const store = new Store();

var win = '';
var savesPath;

const createWindow = async () => {
    win = new BrowserWindow({
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
      },
      width: 400,
      height: 400,
      minWidth:400,
      minHeight: 400,
      maxWidth: 400,
      maxHeight: 400,
      icon: path.join(__dirname, '/public/thunder.png')
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });

    current_ip = ip.address()
    current_ip = "http://" + current_ip + ':8185'
    await win.loadFile('./public/server.html');
    win.webContents.send('ip_address', current_ip);


    
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

  




  exp.use(bodyParser.json({limit: '1000mb'}));
  exp.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));
  
  port = process.env.PORT || 8185
  
  exp.use('/', express.static(__dirname + "/public"));
  
  const storage = multer.diskStorage({
    destination: path.join(__dirname,'/public/uploads'),
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
  })
  
  
  serverMain = server.listen(port, () => {
    console.log(port);
  });
  
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20000000000 //give no. of bytes
    },
    // fileFilter: function(req, file, cb){
    //     checkFileType(file, cb);
    // }
  }).single('fileInput');
  
  
  
  exp.post("/file-submit", async (req, res) => {
      upload(req, res, async (err) =>{
          if(err){
              //Send error msg
              res.send(err);
          }else{
              //send correct msg
              //res.send()
              res.send(`${req.file.originalname}`);
              console.log('file uploaded succcessfully');
          }
      });
  })
  
  
  exp.get("/uploadFolder", (req, res) => {
      fileArr = []
      fileSize = ''
      lastM = ''
  
      route = path.join(__dirname,"/public/uploads")
  
      fs.readdirSync(route).forEach(file => {
        //Print file name
        
        
        size = fs.statSync(route + '/' + file).size
        lastM = fs.statSync(route + '/' + file).mtime
  
        fileArr.push([file,size,lastM])
  
    });
  
    res.send(fileArr)
  
  })
  
  
  io.on("connection", (socket) => {
    
    socket.on("newfile", (arg) => {
        route2 = path.join(__dirname,"/public/uploads");

        newName = arg
        size = fs.statSync(route2 + '/' + arg).size
        lastM = fs.statSync(route2 + '/' + arg).mtime
  
      arr = [newName,size,lastM]
      io.emit("appendFile",arr);
  
    });


    socket.on("delete files", (arg) => {

      directory = path.join(__dirname,"/public/uploads");

      fs.readdir(directory, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
        }
      });
  });

  socket.on("single file delete", (arg) => {

    directory = path.join(__dirname,"/public/uploads");

    fs.readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        if(file == arg){
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }

      }
    });
  });


  socket.on("chat logs", (arg) => {
    io.sockets.emit("chat returned", arg);
    
  });



    
  
  });




  