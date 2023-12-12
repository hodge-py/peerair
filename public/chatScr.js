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
            <td><a href="./uploads/${data[i]}" download>${data[i]}</a></td>
            <td>Otto</td>
            <td>@mdo</td>
            </tr>
            `)

            }

        }
    });



    
    const socket = io();

    $(document).on('click',"#file", function () {
        $("#upload-file").css("display",'none');
        $("#file-table").css("display",'table');
     
    });


    $(document).on('click',"#upload", function () {
        $("#file-table").css("display",'none');
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
            }
          });


        

    });


    $(document).on('change','#formFile', function () {
        $("#files-added").text($("#formFile").prop("files")[0].name)
        
    });




    


});