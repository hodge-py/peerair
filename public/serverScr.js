$(document).ready(function () {
  

    window.electronAPI.ip_address((value) => {
        $("#ip-address").text(value);
        $("#ip-address").attr("href", value)
        console.log("fasf")

      })


      
      $(document).on('click', '#clipboard', function () {

        navigator.clipboard.writeText($("#ip-address").text()).then(function () {
          alert('Address copied to clipboard')
      }, function () {
          alert('Failure to copy. Check permissions for clipboard')
      });
        
      });



      $.ajax({  
        type: "POST",  
        url: "http://peerair-server.000.pe", 
        data: {test: "test"},
        success: function(response) {
            console.log("hey it worked")
        }
      });











});