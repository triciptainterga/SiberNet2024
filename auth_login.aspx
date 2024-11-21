<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="auth_login.aspx.vb" Inherits="ICC.auth_login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>MKN Omnichannel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    <!-- swiper Css -->
    <!-- swiper Css -->
    <link href="assets/libs/swiper/swiper-bundle.min.css" rel="stylesheet" type="text/css" />
     <script src="js/jquery-1.9.1.min.js"></script>

    <style>
        body, html {
            height: 100%;
            margin: 0;
            /*display: flex;*/
            justify-content: flex-end; /* Aligns the content to the right */
            align-items: center;
            background-size: cover;
            background-position: center;
            overflow-x: hidden;
        }

        body {
            /*background: url('material/bg.png') no-repeat bottom center;
            background-size: cover;*/
            background-image: url('https://siber.net.id/web/image/5871-3cefa18a/BG%20white.webp');
           background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
        }
        .login-slider {
            background: url('https://siber.net.id/web/image/5871-3cefa18a/BG%20white.webp') no-repeat bottom center;
            background-size: cover;
           
           
            margin-right: 20px; /* Adds some space from the right edge */
        }
       .outer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Pastikan container utama mengambil tinggi penuh dari viewport */
}

.login-container {
    /*background: url('https://siber.net.id/web/image/5871-3cefa18a/BG%20white.webp') no-repeat bottom center;*/
    background-color: rgb(207, 203, 203);
    background-size: cover;
    max-width: 400px;
    padding: 10px;
    height: 100%; /* Pertahankan tinggi 100% sesuai kebutuhan */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

        .logo {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            margin-top: 0px;
        }

        .login-container h3 {
            text-align: center;
            margin-bottom: 0px;
        }

        .btn-login {
            background-color: #ffcc00;
            border: none;
            color: #fff;
            width: 100%;
            margin-top:20px;
        }

            .btn-login:hover {
                background-color: #ffbb00;
            }

    </style>
    <script>
        const inputElement = document.getElementById('Login_Username');
        const outputElement = document.getElementById('output');

        inputElement.addEventListener('input', function () {
            requestAnimationFrame(() => {
                // Manipulasi DOM dilakukan dalam batch
                outputElement.textContent = inputElement.value;
            });
        });
    </script>
</head>
<body>
    <br /><br /><br /><br />
    <div class="row">
        <div class="col-lg-1">

        </div>
        <div class="col-lg-7">
            <div class="login-slider">
                <div class="card">
                    <div class="card-body">
                        <div class="swiper-container pagination-swiper" dir="ltr">
                            <div class="swiper-wrapper">
                               

                                <div class="swiper-slide">
                                    <div class="">
                                        <img src="banner.png" class="img-fluid mx-auto d-block" width="100%">
                                    </div>
                                </div><!-- end swiper-slide -->

                               
                            </div><!-- end swiper wrapper -->
                            <div class="swiper-pagination"></div>
                        </div><!-- end swiper container -->
                    </div><!-- end card body -->
                </div><!-- end card -->
            </div>
            </div>
        <div class="col-lg-4">
            <div class="login-container">
                <div class="logo">
                    <img src="https://crm.siber.net.id/crm/sibernet.png" alt="Logo" height="150" />
                </div>
                <p><center>
                    
                    Log in to Sibernet Omnichannel</center>
                </p>
                <form runat="server">

                    <div class="mb-3">
                        <input type="text" class="form-control" id="Login_Username" placeholder="Username" runat="server" />
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control" id="Login_Password" placeholder="Password" runat="server" />
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-login w-100" id="Login_ButtonSubmit" runat="server">Log In</button>
                        
                    </div>
                </form>

            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- JAVASCRIPT -->
    <script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/libs/metismenujs/metismenujs.min.js"></script>
    <script src="assets/libs/simplebar/simplebar.min.js"></script>
    <script src="assets/libs/feather-icons/feather.min.js"></script>

    <!-- swiper js -->
    <script src="assets/libs/swiper/swiper-bundle.min.js"></script>

    <!-- notification init -->
    <script src="assets/js/pages/swiper-slider.init.js"></script>
</body>


</html>
