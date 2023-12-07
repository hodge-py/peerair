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

$("#mainUser").text(`${value[0]}`)
console.log(value);
username = value[0];
peer_id = value[1];

})








});