const io = require('socket.io-client');
const Peer = require('simple-peer');

class PeerClient {
    constructor(serverUrl,peer_id){
        this.socket = io(serverUrl)
        this.socket.user_id = peer_id;
    }




}

module.exports = PeerClient;