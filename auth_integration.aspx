<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="auth_integration.aspx.vb" Inherits="ICC.auth_integration" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link rel="icon" href="apps/images/favicon.ico" />

    <title>Demo System</title>

    <!-- Vendors Style-->
    <link rel="stylesheet" href="apps/css/vendors_css.css" />

    <!-- Style-->
    <link rel="stylesheet" href="apps/css/style.css" />
    <link rel="stylesheet" href="apps/css/skin_color.css" />
    <script src="apps/js/jquery-1.9.1.min.js"></script>
    <script src="apps/js/sweetalert.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <br />
                                    <div class="alert alert-danger alert-dismissible" runat="server" id="Login_NotifErr" visible="false">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                        <h4><i class="icon fa fa-ban"></i>Alert!</h4>
                                        <center>Your authentication is incorrect, Try again</center>
                                    </div>
        </div>
    </form>
</body>
</html>
