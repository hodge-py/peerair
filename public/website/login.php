<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    

</head>
<body style="height: 100vh;">
    <div class="row p-3 border-end-0 shadow" style="backdrop-filter: blur(10px); width: 100vw; margin: 0px;">
        <div class="col-md-10">
        <h1 class="text-start ps-5 text-white"><a style="" href="./index2.html">&#9736; PeerAir</a></h1>
        </div>
        <div class="col-md-2">
        <div class="d-flex justify-content-evenly align-items-center" style="height: 100%;">
            
        </div>
        </div>
        </div>


<div id="mainContain" class="container rounded" style=" color: white; width: 65%; height: 90%;">
    <div class="d-flex flex-column justify-content-center" style="height: 100%;">

<div class="row mb-4 m-0 rounded" id="sign-hide" style="background-color: rgba(0,0,0,.5);">
<div class="col">

    <h3 class="fw-bold mb-3 pt-3">Login</h3>

    <form>
    <div class="form-group mb-3 ">

    <label for="username2">Email:</label>
    <input id="username2" name="username" type="text" class="form-control" />

    <label for="password2">Password:</label>
    <input id="password2" name="password" type="password" class="form-control" />


    </div>

    <button id="submit-log" type="submit" class="btn btn-primary form-control mb-4">Submit</button>
    </form>

<div class="d-flex justify-content-evenly pb-4">
    <a href="./Signup.html" class="">Signup</a>
    <a href="#" class="">Forgot Password</a>
    </div>

</div>

</div>




</div>

</div>


</body>

<style>


a {
color: white;
}
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
  color: lightblue;
}

a:active {
  text-decoration: none;
}
    
    body {
        /* background-color: rgb(231, 231, 231); */
       background-color: rgb(56, 56, 56);
        background-size: cover;
        font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        
    }
    
</style>


<script>

$(document).ready(function () {
    

    $(document).on('click','#submit-log', function () {

        $.ajax({
            type: "POST",
            url: "http://localhost:3001/login-try",
            dataType:'JSON',
            data: {'username': $("#username2").val(), 'password': $("#password2").val()},
            success: function (response) {
                if(response.valid == true){
                    window.location.href = "./index2.html"
                }
            }
        });


    });






});

</script>


</html>