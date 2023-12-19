$(document).ready(function () {


 var datatable;

    $.ajax({
        type: "GET",
        url: "/uploadFolder",
        data: "",
        success: function (data) {
            for(var i = 0; data.length > i; i++){
            //console.log(data)
            $("#mainBody").append(`
            <tr>
            <th scope="row"><input class="form-check-input all-checks" type="checkbox"></th>
            <td class='fileClass'><a href="./uploads/${data[i][0]}" download>${data[i][0]}</a></td>
            <td>${(data[i][1] / (1024*1024)).toFixed(2)} MB</td>
            <td>${data[i][2]}</td>
            <td>
            <div class='text-center'>
                <button class='btn delete-single'>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d10000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#e60000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
            </div>
            </td>
            </tr>
            `)

            }
            datatable = $('#file-table').DataTable({responsive: true});

        }
    });


    const socket = io();

    $(document).on('click',"#file", function () {
        $("#upload-file").css("display",'none');
        $("#table-cover").css("display",'block');
        $("#file-table").css("display",'table');
        $("#delete-row").css("display",'block');
        $("#show-chat").css("display",'none');

     
    });


    $(document).on('click',"#upload", function () {
        $("#table-cover").css("display",'none');
        $("#delete-row").css("display",'none');
        $("#upload-file").css("display",'block');
        $("#show-chat").css("display",'none');
     
    });

    $(document).on('click',"#chat", function () {
        $("#table-cover").css("display",'none');
        $("#delete-row").css("display",'none');
        $("#upload-file").css("display",'none');
        $("#show-chat").css("display",'block');
     
    });


    $(document).on('click',"#file-submit", async function () {
        var myFile = $('#formFile').prop('files')[0];
        console.log(myFile)
        if(myFile == undefined){

        }
        else{
        let formData = new FormData();
        formData.append('fileInput',myFile);
        $.ajax({
            type: "POST",
            url: "/file-submit",
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
              console.log(data)
              $("#success-or").text("Successful Upload").delay(2000).fadeOut('slow',function() {
                $("#success-or").text("")
                $("#success-or").css("display","block")
              });
              $("#files-added").text("")
              socket.emit("newfile",data);
            }
          });
        }


    });


    $(document).on('change','#formFile', function () {
        $("#files-added").text($("#formFile").prop("files")[0].name)
        
    });


    socket.on("appendFile", (arg) => {
        /*
        $("#mainBody").append(`
            <tr>
            <th scope="row">?</th>
            <td><a href="./uploads/${arg[0]}" download>${arg[0]}</a></td>
            <td>${(arg[1] / (1024*1024)).toFixed(2)} MB</td>
            <td>${arg[2]}</td>
            <td>
            <div class='text-center'>
                <button class='btn delete-single'>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d10000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#e60000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
            </div>
            </td>
            </tr>
            `)
          */
        datatable.row.add([
          `<input class="form-check-input all-checks" type="checkbox">`,
          `<a href="./uploads/${arg[0]}" download>${arg[0]}</a>`,
          `${(arg[1] / (1024*1024)).toFixed(2)} MB`,
          `${arg[2]}`,
          `<div class='text-center'>
          <button class='btn delete-single'>
          <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d10000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#e60000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </button>
      </div>`
        ]).draw();

        
      });


      $(document).on('click','#delete-all', function () {
        socket.emit('delete files');
        $('#exampleModal').modal('hide');
        datatable.clear().draw()
        
      });

      

      $(document).on('click', '.delete-single', function () {
        fileName = $(this).parent().parent().parent().find('a').text();

        socket.emit("single file delete", fileName);

        datatable.row($(this).parent().parent().parent()).remove().draw();

        
      });


      $(document).on('click','#submit-chat', function () {

        chatVal = $("#chat-text").val();
        $("#chat-text").val('');

        socket.emit('chat logs', chatVal);
        
      });


      socket.on("chat returned", (arg) => {
        
        $("#main-chat").append(`<p class='text-wrap'>${arg}</p>`);
        

      });

      $(document).on('click','#download-all', function () {
        var zip = new JSZip();
        selected = []
        let folder = zip.folder('collection');
        $(':checkbox:checked').each(function() {
          console.log($(this).parent().parent().find('a'))
          if($(this).parent().parent().find('a').length == 0){

          }
          else{
          selected.push($(this).parent().parent().find('a').attr("href"));
          }
          });

          for (let i = 0; i < selected.length; i++) {
            const imageBlob = fetch(selected[i]).then(response => response.blob());
            
            console.log(imageBlob)
            folder.file(selected[i].slice(10), imageBlob);

            
          }
          
          folder.generateAsync({ type: "blob" }).then(content => saveAs(content, "files"));
        
      });

    
      $(document).on('click','#all-checkboxes', function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
        
      });


      

});