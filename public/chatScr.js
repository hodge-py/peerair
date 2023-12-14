$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/uploadFolder",
        data: "",
        success: function (data) {
            for(var i = 0; data.length > i; i++){
            //console.log(data)
            $("#mainBody").append(`
            <tr>
            <th scope="row">${i+1}</th>
            <td><a href="./uploads/${data[i][0]}" download>${data[i][0]}</a></td>
            <td>${(data[i][1] / (1024*1024)).toFixed(2)} MB</td>
            <td>${data[i][2]}</td>
            </tr>
            `)

            }

        }
    });


    const socket = io();

    $(document).on('click',"#file", function () {
        $("#upload-file").css("display",'none');
        $("#file-table").css("display",'table');
        $("#delete-row").css("display",'block');

     
    });


    $(document).on('click',"#upload", function () {
        $("#file-table").css("display",'none');
        $("#delete-row").css("display",'none');
        $("#upload-file").css("display",'block');
     
    });


    $(document).on('click',"#file-submit", async function () {

        var myFile = $('#formFile').prop('files')[0];
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
              $("#files-added").text("")
              socket.emit("newfile",data);
            }
          });

    });


    $(document).on('change','#formFile', function () {
        $("#files-added").text($("#formFile").prop("files")[0].name)
        
    });


    socket.on("appendFile", (arg) => {

        $("#mainBody").append(`
            <tr>
            <th scope="row">?</th>
            <td><a href="./uploads/${arg[0]}" download>${arg[0]}</a></td>
            <td>${(arg[1] / (1024*1024)).toFixed(2)} MB</td>
            <td>${arg[2]}</td>
            </tr>
            `)

      });


      $(document).on('click','#delete-all', function () {
        socket.emit('delete files');
        $('#exampleModal').modal('hide');
        $("#mainBody").text("")
        
      });


    


});