$(document).ready(function () {


    
    $(document).on('click','#login-button', function () {
      user = $("#username2").val();
      password = $("#password2").val();
      window.electronAPI.login(user,password)
      
    });
    
    
    $("#register-hide").hide();


    var counter = 0
    
    $(document).on("click", "#switch-between" ,function () {
        if(counter % 2 == 0){
        $("#sign-hide").hide();
    
        $("#register-hide").show();
    
        $("#switch-between").text("login");
    
        counter += 1;
        }
        else{
        $("#sign-hide").show();
    
        $("#register-hide").hide();
    
        $("#switch-between").text("register");
    
        counter += 1;
        }
    
    
    });
    
    $(document).on('click', '#forgotPass', function () {
    
        $("#mainContain").append(`
        <div class="input-group">
            
            <p>Enter a Username to send a password reset email</p>
            <input type='text' class='form-control' />
            <button type='button' class='btn btn-primary'>submit</button>
    
    
        </div>
        `)
    
        
    });


    
    
    });