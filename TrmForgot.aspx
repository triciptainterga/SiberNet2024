<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="TrmForgot.aspx.vb" Inherits="ICC.TrmForgot" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link rel="icon" href="apps/images/favicon.ico" />

    <title>UIDESK</title>
    <%--<script type="text/javascript" src="https://code.jquery.com/jquery-1.7.1.min.js"></script>--%>
    <!-- Vendors Style-->
    <link rel="stylesheet" href="apps/css/vendors_css.css" />
    <!-- Style-->
    <link rel="stylesheet" href="apps/css/style.css" />
    <link rel="stylesheet" href="apps/css/skin_color.css" />
    <%--<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>--%>
    <script src="apps/js/jquery-1.9.1.min.js"></script>
    <script src="apps/js/sweetalert.min.js"></script>
    <script type="text/javascript">
        function body_onload() {
            // Encode the String
            //var encodedString = btoa(string);
            //console.log("encodedString " + encodedString);
            var TrxEncrypt = '<%=Request.QueryString("id")%>';
            var decodedString = atob(TrxEncrypt);
            console.log("decodedString " + decodedString); 
            if (TrxEncrypt == '') {
                swal("Forgot password is not valid")
                return false;
            } else {

                var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_TrmForgotPassword", paramQuery: "", Value: decodedString });
                console.log("jsonText " + jsonText);
                $.ajax({
                    type: "POST",
                    url: "apps/WebServiceGetDataMaster.asmx/GetWhereRecordsForgotPassword",
                    data: jsonText,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x, resultSourceCustomer = "", jenisKelamin;
                        //listDataCustomer.empty();
                        if (json.length == 0) {
                            console.log("data not found " + i);
                            $("#P_Message").append("Forgot password does not work, Please try again to application system")
                            $("#DIV_Failed").css("display", "block");
                            $("#DIV_Success").css("display", "none");
                            $("#DIV_Main").css("display", "none");
                        } else {
                            for (i = 0; i < json.length; i++) {
                                
                                if (json[i].MinuteInterval > 50){
                                    $("#P_Message").append("Forgot password is expired, Please try again to application system")
                                    $("#DIV_Failed").css("display", "block");
                                    $("#DIV_Success").css("display", "none");
                                    $("#DIV_Main").css("display", "none");
                                    //swal("Email address is not found")
                                    //return false
                                } else {
                                    $("#DIV_Success").css("display", "block");
                                    $("#DIV_Failed").css("display", "none");
                                    //swal(json[i].EMAIL_ADDRESS)
                                    //return false;
                                }
                                                           
                            }

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })

            }

        }
    </script>
    <script type="text/javascript">
        function execForgotPassword() {
            var TrxEncrypt = '<%=Request.QueryString("id")%>';
            var decodedString = atob(TrxEncrypt);
            console.log("decodedString " + decodedString); 

            var TrxNewPassword = $("#Forgot_Password").val();
            var TrxConfirmNewPassword = $("#Forgot_ConfirmPassword").val();
            if (TrxNewPassword != '') {
                var passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
                if (TrxNewPassword.match(passwordformat)) {

                }
                else {
                    swal("Format new password is not valid");
                    return false;
                }

            } else { 
                swal("New password is empty");
                return false
            }
            if (TrxConfirmNewPassword == '') {
                swal("Confirm password is empty");
                return false
            }
            if (TrxNewPassword != TrxConfirmNewPassword) {
                swal("Password is not match");
                return false
            }

            event.preventDefault(); // prevent form submit
            var form = document.forms["myForm"]; // storing the form
            swal({
                title: "Do you want to process?",
                //text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {        
                    var form_data = JSON.stringify({ TrxNewPassword: TrxNewPassword, TrxEmailAddress: decodedString });
                    console.log("XXX" + form_data);
                    $.ajax({
                        type: "POST",
                        url: "apps/WebServiceGetDataMaster.asmx/ChangeForgotPassword",
                        data: form_data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var i, x = "";
                            var tblTickets = "";

                            for (i = 0; i < json.length; i++) {
                                //alert(json[i].Result)
                                if (json[i].Result === 'True') {
                                    swal("Done", {
                                        icon: "success",
                                    });
                                    
                                    window.location.href = "http://localhost/2021iconmedia/auth_login.aspx";

                                } else {
                                    swal("forgot password is " + json[i].msgSystem + ", please check your password")
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

                    } else {
                        //swal("Your imaginary file is safe!");
                        //$("#ModalChannel").modal('hide');
                    }
              });
        }
    </script>
</head>
<body class="hold-transition theme-primary bg-gradient-primary" onload="body_onload();">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="container h-p100" id="DIV_Main">
        <div class="row align-items-center justify-content-md-center h-p100">
            <div class="col-12">
                <div class="row justify-content-center no-gutters">
                    <div class="col-lg-6 col-md-7 col-12">
                        <div class="bg-white-10 rounded5">
                            <div class="content-top-agile p-10 pb-0">
                                <br />
                                <br />
                                <h4 class="text-white">UIDESK Forgot Password</h4>
                                <%--<span class="light-logo"><img src="apps/uidesk_new.png" alt="logo"/></span>--%>
                                <%--<p class="text-white-50 mb-0">Sign in to start your system</p>--%>
                            </div>
                            <div class="p-60">
                                <form id="form1">

                                    <div id="DIV_Success">
                                        <div class="form-group">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-transparent text-white"><i class="ti-lock"></i></span>
                                                </div>
                                                <input type="password" runat="server" class="form-control pl-15 bg-transparent text-white plc-white" id="Forgot_Password" placeholder="New Password" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text  bg-transparent text-white"><i class="ti-lock"></i></span>
                                                </div>
                                                <input type="password" runat="server" class="form-control pl-15 bg-transparent text-white plc-white" id="Forgot_ConfirmPassword" placeholder="Confirm Password" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                            </div>
                                            <!-- /.col -->
                                            <div class="col-12 text-right">
                                                <%--<a href="#" class="btn btn-danger btn-rounded mt-10" id="SUBMIT_ForgotPassword" onclick="ExecForgot()">Submit</a>--%>
                                                <a class="btn btn-rounded btn-primary float-right" onclick="execForgotPassword()">Submit</a>
                                            </div>
                                            <!-- /.col -->
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="row justify-content-center no-gutters">
        <div class="alert alert-danger alert-dismissible" runat="server" id="DIV_Failed" style="display: none;">
            <%--<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>--%>
            <h4><i class="icon fa fa-ban"></i>Alert!</h4>
            <p class="font-size-14" id="P_Message"></p>
            <%--   <div class="text-right">
                <a href="http://localhost/2021iconmedia/" class="text-white hover-warning">Go To Application</a>
            </div>--%>
            <%--Forgot password is expired, Please Try again to forgot password system--%>
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
