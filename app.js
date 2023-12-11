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


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

port = process.env.PORT || 8080

app.use('/', express.static(__dirname + "/public"));


serverMain = server.listen(port, () => {
  console.log(port);
});


app.post("/file-submit", (req, res) => {
  let base64String = req.body.hey; // Not a real image
// Remove header
  let base64Image = base64String.split(';base64,').pop();

  fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
    console.log('File created');
});

  console.log(req.body.hey)
  //res.sendFile(path.join(__dirname,'public/uploads/Cat03.jpg'))
  res.send(req.body.hey);
})

