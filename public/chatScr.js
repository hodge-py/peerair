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
            }
          });


    });

    


});