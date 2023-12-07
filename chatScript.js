$(document).ready(function () {



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

window.electronAPI.sendSettings((value) => console.log(value))




});