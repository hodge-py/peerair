$(document).ready(function () {

class UserInfo {
  constructor(username,peer_id){
    this.username = username;
    this.peer_id = peer_id;
  }
}

var username = '';
var peer_id = ''; 

const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')



title = "PeerAir"
window.electronAPI.setTitle(title)
var tmp = '';

$(document).on('click','#connect-user', function () {
  console.log(username)
});


window.electronAPI.sendSettings((value) => {

$("#userIden").text(`${value[0]}`)

console.log(value);
username = value[0];
peer_id = value[1];


const peerElement = new PeerClient('http://localhost:8081');

peerElement.init()


})


//const socket = io('http://localhost:8081')
class PeerClient {
  constructor(serverUrl){
      this.socket = io(serverUrl)
      this.socket.user_id = $("#userIden").text();
      this.peer
  }

  init(){
    this.socket.emit('initiate peer', this.socket.user_id);
    console.log(this.socket.user_id);
    this.createPeerConnection()
  }

  createPeerConnection(connection){
    //Friends list to go through

    this.socket.on('initiate peer', (message) =>
      this.createEntity()
    );

  }


  createEntity(){
    //const options = this._getPeerOptions(connection.initiator);
    this.peer = new SimplePeer({ initiator: true });
    this.peer1 = new SimplePeer({ initiator: true });
    console.log("created");
    //this.peer.initiator = false
    console.log(this.peer.initiator)
    console.log(this.peer)
    console.log(this.peer1)
    // set initiator on click of a user

    // If initiator,peer.on'signal' will fire right away, if not it waits for signal
    // https://github.com/feross/simple-peer#peeronsignal-data--
    this.peer.on('signal', (data) => this._sendSignal(data));
    this.peer.on('connect', () => {console.log("connected")});
    //peer.on('connect', () => this._handleConnection());
    //peer.on('error', (err) => this._handleError(err));
    //peer.on('stream', (stream) => this._handleStream(stream));
    //peer.on('data', (data) => this._handleData(data));
    // peer.on('track', (track, stream) =>
    //   this._handleTrack(track, stream),
    // );
    //peer.on('close', () => this._handleClose());

    //connection.peerStarted = true;
    //connection.peer = peer;


    this.socket.on('handle peer', (data) =>
      this.handleSendSignal(data)
    );

    
    $(document).on('click','friendsNum', function () {


      
    });


  }


  _sendSignal(data){
    var tmp = this
    tmp.friends = []
    console.log(tmp.friends);
    $(".friendsNum").each(function (indexInArray, valueOfElement) { 

       tmp.friends.push($(this).text());
    });
    console.log(tmp.friends);
    tmp.socket.emit('send signal', [data,tmp.friends]);

  }

  handleSendSignal(connection){
    try{
    this.peer.initiator = false;
    console.log(connection)
    this.peer.signal(connection);
    console.log("he???")
    }
    catch(error){
      console.log(error);
    }
  }


  }








});




