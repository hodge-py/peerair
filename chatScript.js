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


$(document).on('click','#connect-user', function () {
  title = "hey u"
  window.electronAPI.setTitle(title)
  
});




});