<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="auth_auto.aspx.vb" Inherits="ICC.auth_auto" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link rel="icon" href="apps/images/favicon.ico" />

    <title>UIDESK</title>

    <!-- Vendors Style-->
    <link rel="stylesheet" href="apps/css/vendors_css.css" />

    <!-- Style-->
    <link rel="stylesheet" href="apps/css/style.css" />
    <link rel="stylesheet" href="apps/css/skin_color.css" />
    <%--<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>--%>
    <script src="apps/js/jquery-1.9.1.min.js"></script>
    <script src="apps/js/sweetalert.min.js"></script>
    <script>
        function modalForgot() {
            $("#modal-forgot-password").modal('show')
        }
        function SubmitForgot() {
            var TrxForgotEmail = $("#Forgot_Email").val();
            var encodedString = btoa(TrxForgotEmail);
            console.log("encodedString " + encodedString);

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
                                var jsonText = JSON.stringify({ TrxEmailAddress: TrxForgotEmail, TrxEncodedString: encodeData(encodedString) });
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
    <script>
        function encodeData(s) {
            return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
        }
    </script>
    <style>
        #example2 {
            width: 100%;
            /*padding: 125px;*/
            background: url(https://brilife.co.id/documents/20123/48892/slider-one.jpg/950e2b25-1359-ee67-9281-f5c40de51fac?t=1606157220045);
            background-repeat: repeat;
            /*margin-left:10px;*/
        }
    </style>
</head>
<body class="example2" style="background-image: url(https://brilife.co.id/documents/20123/48892/slider-one.jpg/950e2b25-1359-ee67-9281-f5c40de51fac?t=1606157220045);">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div id="example2xx">
        <div class="container h-p100">
            <div class="row align-items-center justify-content-md-center h-p100">
                <div class="col-12">
                    <div class="row justify-content-center no-gutters">
                        <div class="col-lg-4 col-md-5 col-12">
                            <div class="bg-white-10 rounded5">
                                <div class="content-top-agile p-10 pb-0">
                                    <h2 class="text-white">Get started with Us</h2>
                                    <%--<span class="light-logo"><img src="apps/uidesk_new.png" alt="logo"/></span>--%>
                                    <p class="text-white-50 mb-0">Sign in to start your system</p>
                                </div>
                                <div class="p-30">
                                    <form id="form1" runat="server">
                                        <div class="form-group">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-transparent text-white"><i class="ti-user"></i></span>
                                                </div>
                                                <input type="text" runat="server" class="form-control pl-15 bg-transparent text-white plc-white" id="Login_Username" placeholder="Username" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text  bg-transparent text-white"><i class="ti-lock"></i></span>
                                                </div>
                                                <input type="password" runat="server" class="form-control pl-15 bg-transparent text-white plc-white" id="Login_Password" placeholder="Password" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <%--<div class="checkbox text-white">
			                            <input type="checkbox" id="basic_checkbox_1" >
			                            <label for="basic_checkbox_1">Remember Me</label>
			                            </div>--%>
                                            </div>
                                            <!-- /.col -->
                                            <div class="col-6">
                                                <div class="fog-pwd text-right">
                                                    <a href="#" class="text-white hover-warning" onclick="modalForgot()"><i class="ion ion-locked"></i>Forgot pwd?</a><br>
                                                </div>
                                            </div>
                                            <!-- /.col -->
                                            <div class="col-12 text-center">
                                                <button type="submit" id="Login_ButtonSubmit" runat="server" class="btn btn-danger btn-rounded mt-10">SIGN IN</button>
                                            </div>
                                            <!-- /.col -->
                                        </div>
                                    </form>
                                    <%-- <div class="text-center text-white">
								  <p class="mt-20">- Sign With -</p>
								  <p class="gap-items-2 mb-20">
									  <a class="btn btn-social-icon btn-round btn-outline btn-white" href="#"><i class="fa fa-facebook"></i></a>
									  <a class="btn btn-social-icon btn-round btn-outline btn-white" href="#"><i class="fa fa-twitter"></i></a>
									  <a class="btn btn-social-icon btn-round btn-outline btn-white" href="#"><i class="fa fa-google-plus"></i></a>
									  <a class="btn btn-social-icon btn-round btn-outline btn-white" href="#"><i class="fa fa-instagram"></i></a>
									</p>	
								</div>--%>

                                    <%--<div class="text-center">
									<p class="mt-15 mb-0 text-white">Don't have an account? <a href="auth_register.html" class="text-warning ml-5">Sign Up</a></p>
								</div>--%>
                                    <br />
                                    <div class="alert alert-danger alert-dismissible" runat="server" id="Login_NotifErr" visible="false">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                        <h4><i class="icon fa fa-ban"></i>Alert!</h4>
                                        <center>Your username or password is incorrect, Try again</center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal modal-right fade" id="modal-forgot-password" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Form Forgot Password</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Email Address</label>
                                    <input type="text" class="form-control" id="Forgot_Email" name="Forgot_Email" placeholder="Email Address" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                        <a href="#" class="btn btn-rounded btn-primary float-right" onclick="SubmitForgot()" id="Post_ForgotPassword">Submit</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

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

