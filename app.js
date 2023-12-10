const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var ip = require("ip");
var path = require('path');


port = process.env.PORT || 8080


serverMain = server.listen(port, () => {
  console.log(port);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./Views/chat.html'))
});