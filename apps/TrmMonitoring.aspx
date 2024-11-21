<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmMonitoring.aspx.vb" Inherits="ICC.TrmMonitoring" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmMonitoring.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxTicketID" runat="server" />
    <!-- /.modal -->
    <div class="container-full">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="d-flex align-items-center">
                <div class="w-p100 d-md-flex align-items-center justify-content-between">
                    <h3 class="page-title">Monitoring User Login</h3>
                    <div class="d-inline-block align-items-center">
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                                <%--<li class="breadcrumb-item" aria-current="page">Apps</li>--%>
                                <li class="breadcrumb-item active" aria-current="page">Monitoring Agent Login</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main content -->
        <section class="content">
            <!-- /.col -->
            <%--<a onclick="postEmail_Notif()">Test Email</a>--%>
            <div class="row" id="2_TampungKotakAtas">
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="box">
                        <div class="box-body">
                            <div class="table-responsive">
                                <table id="TaskboardMonitoring" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px;">ID</th>
                                            <th style="width: 250px;">Username</th>
                                            <th style="width: 250px;">Name</th>
                                            <th style="width: 250px;">Email Address</th>
                                            <th style="width: 150px;">Level User</th>
                                            <th style="width: 150px;">Aux Description</th>
                                            <th style="width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.row -->
            <div class="modal center-modal fade" id="modal-center" tabindex="-1" data-keyboard="false" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content" style="width: 850px; margin-left: -200px;">
                        <div class="modal-header">
                            <h5 class="modal-title">Form Internal Note</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <textarea rows="8" class="form-control" id="InternalNote" placeholder="Internal Note"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer-uniform">
                            <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionInternalNote()" id="SaveCustomer">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /.content -->
    </div>
</asp:Content>
