const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var ip = require("ip");
var path = require('path');
var bodyParser = require('body-parser')
const multer  = require('multer')
var multiparty = require('multiparty');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json())

port = process.env.PORT || 8080

app.use('/', express.static(__dirname + "/public"));


serverMain = server.listen(port, () => {
  console.log(port);
});


app.post("/file-submit", (req, res) => {

  console.log(req.file)
  //res.sendFile(path.join(__dirname,'public/uploads/Cat03.jpg'))
  res.send("complete");
})

