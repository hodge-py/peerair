$(document).ready(function () {
    

    $(document).on('click',"#file", function () {
        $("#upload-file").css("display",'none');
        $("#file-table").css("display",'table');
     
    });


    $(document).on('click',"#upload", function () {
        $("#file-table").css("display",'none');
        $("#upload-file").css("display",'block');
     
    });
    


});