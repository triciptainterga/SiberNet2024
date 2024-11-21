<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmConfigurationEmail.aspx.vb" Inherits="ICC.TrmConfigurationEmail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmConfigurationEmail.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Email Configuratiobn</h4>
                    </div>
                    <div class="box-body">
                        <table id="TrmChannel" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email Account</th>
                                    <th>SMTP</th>
                                    <th>Port</th>
                                    <th>UserName</th>
                                    <th>Password</th>
                                    <th style="width: 50px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal center-modal fade" id="ModalChannel" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1000px; margin-left: -240px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Email Configuration</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Email Account</label>
                                <input type="text" class="form-control" id="Account" placeholder="Email Account">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>SMTP</label>
                                <input type="text" class="form-control" id="SMTP" placeholder="SMTP">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Port</label>
                                <input type="text" class="form-control" id="Port" placeholder="Port">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" class="form-control" id="Username" placeholder="Username">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Password</label>
                                <input type="text" class="form-control" id="Password" placeholder="Password">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="UpdateLDAP()" id="Update">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ConnectLDAP()" id="Connect">Connect</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
