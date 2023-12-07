class PeerServer {
    constructor(httpServer) {
    this.ioServer;
    this.rooms = [];
    this.roomCounter = 0;



    this.init(httpServer);

    }


    init(httpServer){
        this.ioServer = require('socket.io')(httpServer, {
            cors: {
              origin: '*',
            },
          });


          this.ioServer.sockets.on('connection', (socket) => {
            // logs server messages on the client
            console.log(socket);
            socket.on('message', (message) =>
              this._handleMessage(message, socket),
            );
            socket.on('initiate peer', (room) =>
              this._handleInitiatePeer(room, socket),
            );
            socket.on('sending signal', (message) =>
              this._handleSendSignal(message, socket),
            );
            socket.on('create or join', () =>
              this._handleCreateOrJoin(socket, this.ioServer),
            );
            socket.on('hangup', () => this._handleHangup(socket));
            socket.on('disconnect', (reason) =>
              console.log("dis")
            );
      
          })

    }


    _handleInitiatePeer(room,socket){
        socket.join(room)
        socket.to(room).emit('initiate peer');


    }


}



module.exports = PeerServer;