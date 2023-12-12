const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var ip = require("ip");
var path = require('path');
var bodyParser = require('body-parser')
const Busboy = require('busboy');
const fs = require("fs");
const multer = require("multer");


app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));

port = process.env.PORT || 8080

app.use('/', express.static(__dirname + "/public"));

const storage = multer.diskStorage({
  destination: path.join(__dirname,'/public/uploads') ,
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
      fileSize: 2000000000000 //give no. of bytes
  },
  // fileFilter: function(req, file, cb){
  //     checkFileType(file, cb);
  // }
}).single('fileInput');



app.post("/file-submit", (req, res) => {
    upload(req, res, (err) =>{
        if(err){
            //Send error msg
            console.log(err);
            res.send(err);
        }else{
            //send correct msg
            //res.send()
            res.send('Successful');
            console.log('file uploaded succcessfully');
        }
    });
})

