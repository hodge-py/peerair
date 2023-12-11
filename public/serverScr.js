$(document).ready(function () {
  

    window.electronAPI.ip_address((value) => {
        $("#ip-address").text(value);
        $("#ip-address").attr("href", value)
        console.log("fasf")

      })












});