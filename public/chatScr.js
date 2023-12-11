$(document).ready(function () {
    

    $(document).on('click',"#file", function () {
        $("#upload-file").css("display",'none');
        $("#file-table").css("display",'table');
     
    });


    $(document).on('click',"#upload", function () {
        $("#file-table").css("display",'none');
        $("#upload-file").css("display",'block');
     
    });

    $(document).on('click',"#file-submit", async function () {

        var myFile = $('#formFile').prop('files');
        let formData = new FormData();
        console.log(myFile[0].type)
        var blob = new Blob([myFile[0]],{type: myFile[0].type})
        blob = await blob.arrayBuffer()
        //console.log(blob)
        formData.append(myFile[0].name,blob)
        $.ajax({
            type: "POST",
            url: "/file-submit",
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
              console.log(data)
            }
          });


    });

    


});