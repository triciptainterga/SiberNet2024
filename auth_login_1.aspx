<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="auth_login_1.aspx.vb" Inherits="ICC.auth_login_1" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>UIDESK OMNICHANNEL</title>
   <%-- <link href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' rel='stylesheet'>
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'>--%>
   <%-- <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>--%>
    <script src="apps/js/jquery-1.9.1.min.js"></script>
    <script src="apps/js/sweetalert.min.js"></script>
    <script>
        function modalForgot() {
            $("#modal-forgot-password").modal('show')
        }
        function SubmitForgot() {
            var TrxForgotEmail = $("#Forgot_Email").val();
            if (TrxForgotEmail != '') {
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (TrxForgotEmail.match(mailformat)) {

                    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "msuser", paramQuery: "where (USERNAME='" + TrxForgotEmail + "' or EMAIL_ADDRESS='" + TrxForgotEmail + "') And NA='Y'" });
                    $.ajax({
                        type: "POST",
                        url: "apps/WebServiceGetDataMaster.asmx/GetWhereRecords",
                        data: jsonText,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var i, x, resultSourceCustomer = "", jenisKelamin;
                            //listDataCustomer.empty();

                            if (json.length == 0) {
                                console.log("data not found " + i);
                                swal("Email address is not found")
                                return false

                            } else {
                                var jsonText = JSON.stringify({ TrxEmailAddress: $("#Forgot_Email").val() });
                                $.ajax({
                                    type: "POST",
                                    url: "apps/WebServiceGetDataMaster.asmx/InsertForgotPassword",
                                    data: jsonText,
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (data) {

                                        var json = JSON.parse(data.d);
                                        var i, x = "";
                                        var result = "";
                                        console.log("forgot password : " + jsonText)

                                        for (i = 0; i < json.length; i++) {
                                            if (json[i].Result == "True") {
                                                swal("Success, Please check your email")
                                                $("#modal-forgot-password").modal('hide')
                                            } else {
                                                swal(json[i].TrxmsgSystem)
                                                return false;
                                            }
                                        }

                                    },
                                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                                        console.log(xmlHttpRequest.responseText);
                                        console.log(textStatus);
                                        console.log(errorThrown);
                                    }
                                });


                                $("#Forgot_Email").val("");
                            }

                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    })

                }
                else {
                    swal("Format email address is not valid")
                    return false
                }

            } else {
                swal("email address is not empty")
                return false
            }
        }
    </script>
    <style>
        body {
            color: #000;
            overflow-x: hidden;
            height: 100%;
            background-color: #B0BEC5;
            background-repeat: no-repeat
        }

        .card0 {
            box-shadow: 0px 4px 8px 0px #757575;
            border-radius: 0px
        }

        .card2 {
            margin: 0px 40px
        }

        .logo {
            width: 200px;
            height: 100px;
            margin-top: 20px;
            margin-left: 35px
        }

        .image {
            width: 460px;
        }

        .border-line {
            border-right: 1px solid #EEEEEE
        }

        .facebook {
            background-color: #3b5998;
            color: #fff;
            font-size: 18px;
            padding-top: 5px;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            cursor: pointer
        }

        .twitter {
            background-color: #1DA1F2;
            color: #fff;
            font-size: 18px;
            padding-top: 5px;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            cursor: pointer
        }

        .linkedin {
            background-color: #2867B2;
            color: #fff;
            font-size: 18px;
            padding-top: 5px;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            cursor: pointer
        }

        .line {
            height: 1px;
            width: 45%;
            background-color: #E0E0E0;
            margin-top: 10px
        }

        .or {
            width: 10%;
            font-weight: bold
        }

        .text-sm {
            font-size: 14px !important
        }

        ::placeholder {
            color: #BDBDBD;
            opacity: 1;
            font-weight: 300
        }

        :-ms-input-placeholder {
            color: #BDBDBD;
            font-weight: 300
        }

        ::-ms-input-placeholder {
            color: #BDBDBD;
            font-weight: 300
        }

        input,
        textarea {
            padding: 10px 12px 10px 12px;
            border: 1px solid lightgrey;
            border-radius: 2px;
            margin-bottom: 5px;
            margin-top: 2px;
            width: 100%;
            box-sizing: border-box;
            color: #2C3E50;
            font-size: 14px;
            letter-spacing: 1px
        }

            input:focus,
            textarea:focus {
                -moz-box-shadow: none !important;
                -webkit-box-shadow: none !important;
                box-shadow: none !important;
                border: 1px solid #304FFE;
                outline-width: 0
            }

        button:focus {
            -moz-box-shadow: none !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            outline-width: 0
        }

        a {
            color: inherit;
            cursor: pointer
        }

        .btn-blue {
            background-color: #1A237E;
            width: 150px;
            color: #fff;
            border-radius: 2px
        }

            .btn-blue:hover {
                background-color: #000;
                cursor: pointer
            }

        .bg-blue {
            color: #fff;
            background-color: #1A237E
        }

        @media screen and (max-width: 991px) {
            .logo {
                margin-left: 0px
            }

            .image {
                width: 300px;
                height: 220px
            }

            .border-line {
                border-right: none
            }

            .card2 {
                border-top: 1px solid #EEEEEE !important;
                margin: 0px 15px
            }
        }
    </style>
</head>
<body class='snippet-body'>
    <br />
    <br />
    <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div class="card card0 border-0">
            <div class="row d-flex">
                <div class="col-lg-6">
                    <div class="card1 pb-5">

                        <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                            <img src="uidesk_background.png" class="image">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card2 card border-0 px-4 py-5">

                        <div class="row px-3 mb-4">
                            Please login to your account
                        
                        </div>
                        <div class="row px-3">
                            <label class="mb-1">
                                <h6 class="mb-0 text-sm">Email Address</h6>
                            </label>
                            <input class="mb-4" type="text" name="email" id="Login_Username" placeholder="Enter a valid username/email address">
                        </div>
                        <div class="row px-3">
                            <label class="mb-1">
                                <h6 class="mb-0 text-sm">Password</h6>
                            </label>
                            <input type="password" name="password" id="Login_Password" placeholder="Enter password">
                        </div>
                        <div class="row px-3 mb-4">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input id="chk1" type="checkbox" name="chk" class="custom-control-input">
                                <label for="chk1" class="custom-control-label text-sm">Remember me</label>
                            </div>
                            <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                        </div>
                        <div class="row mb-3 px-3">
                            <button type="submit" id="Login_ButtonSubmit" class="btn btn-blue text-center">Login</button>
                        </div>
                        <div class="row mb-4 px-3"><small class="font-weight-bold">Don't have an account? <a class="text-danger ">Register</a></small> </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <script type='text/javascript' src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js'></script>
    <script type='text/javascript'></script>
    <!-- Vendor JS -->
    <script src="apps/js/vendors.min.js"></script>
    <script src="assets/vendor_components/jquery-toast-plugin-master/src/jquery.toast.js"></script>

    <!-- Chat Bot Admin App -->
    <script src="apps/js/template.js"></script>
    <script src="apps/js/demo.js"></script>
    <script src="apps/js/pages/toastr.js"></script>
    <script src="apps/js/pages/notification.js"></script>
</body>
</html>
