const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PeerServer = require('./PeerServer/PeerServer')
///const { Server } = require("socket.io");
//const io = new Server(server);
const serverPeer = new PeerServer(server)

port = process.env.PORT || 8081

server.listen(port, () => {
  console.log(port);
});
