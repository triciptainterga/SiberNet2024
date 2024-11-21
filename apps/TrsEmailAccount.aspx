<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrsEmailAccount.aspx.vb" Inherits="ICC.TrsEmailAccount" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrsEmailAccount.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Email Account</h4>
                        <center>
                            <div class="spin2" id="LoaderPage"></div>
                        </center>
                    </div>
                    <div class="box-body">
                        <div style="overflow-y: hidden; overflow-x: scroll;">
                            <table id="TrsEmailAccount" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow-y: scroll;">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th style="width: 250px;">name</th>
                                        <th>incoming_account_name</th>
                                        <th>incoming_password</th>
                                        <th>incoming_server</th>
                                        <th>incoming_port</th>
                                        <th>encrypted_connection</th>
                                        <th>outgoing_account_name</th>
                                        <th>outgoing_password</th>
                                        <th>outgoing_server</th>
                                        <th>outgoing_port</th>
                                        <th>encrypted_connection_out</th>
                                        <th>need_login</th>
                                        <th>incoming_back_up</th>
                                        <th>outgoing_back_up</th>
                                        <th>server_protocol</th>
                                        <th>server_protocol_out</th>
                                        <th>server_profile_id</th>
                                        <th>email_signiture_id</th>
                                        <th>email_service_method_id</th>
                                        <th>Status</th>
                                        <th style="width: 50px;">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /.modal -->
    <div class="modal center-modal fade" id="ModalChannel" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Data Email Account</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>name</label>
                                <input type="text" class="form-control" id="account_name" placeholder="name">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>incoming_account_name</label>
                                <input type="text" class="form-control" id="incoming_account_name" placeholder="incoming_account_name">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>incoming_password</label>
                                <input type="text" class="form-control" id="incoming_password" placeholder="incoming_password">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>incoming_server</label>
                                <input type="text" class="form-control" id="incoming_server" placeholder="incoming_server">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>incoming_port</label>
                                <input type="text" class="form-control" id="incoming_port" placeholder="incoming_port">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>encrypted_connection</label>
                                <input type="text" class="form-control" id="encrypted_connection" placeholder="encrypted_connection">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>outgoing_account_name</label>
                                <input type="text" class="form-control" id="outgoing_account_name" placeholder="outgoing_account_name">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>outgoing_password</label>
                                <input type="text" class="form-control" id="outgoing_password" placeholder="outgoing_password">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>outgoing_server</label>
                                <input type="text" class="form-control" id="outgoing_server" placeholder="outgoing_server">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>outgoing_port</label>
                                <input type="text" class="form-control" id="outgoing_port" placeholder="outgoing_port">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>encrypted_connection_out</label>
                                <input type="text" class="form-control" id="encrypted_connection_out" placeholder="encrypted_connection_out">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>need_login</label>
                                <input type="text" class="form-control" id="need_login" placeholder="need_login">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>incoming_back_up</label>
                                <input type="text" class="form-control" id="incoming_back_up" placeholder="incoming_back_up">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>outgoing_back_up</label>
                                <input type="text" class="form-control" id="outgoing_back_up" placeholder="outgoing_back_up">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>server_protocol</label>
                                <input type="text" class="form-control" id="server_protocol" placeholder="server_protocol">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>server_protocol_out</label>
                                <input type="text" class="form-control" id="server_protocol_out" placeholder="server_protocol_out">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>server_profile_id</label>
                                <input type="text" class="form-control" id="server_profile_id" placeholder="server_profile_id">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>email_signiture_id</label>
                                <input type="text" class="form-control" id="email_signiture_id" placeholder="email_signiture_id">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>email_service_method_id</label>
                                <input type="text" class="form-control" id="email_service_method_id" placeholder="email_service_method_id">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Status</label>
                                <select name="select" id="cmbStatus" class="form-control">
                                    <option value="">Select</option>
                                    <option value="Y">Inactive</option>
                                    <option value="N">Active</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan()" id="Simpan">Save</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <%--    <script>
        CKEDITOR.replace('Email_Signature');
        var TrmTicket_Address = CKEDITOR.replace('Email_Signature');
        TrmTicket_Address.config.height = 100;
        TrmTicket_Address.config.toolbar = 'Basic';
        TrmTicket_Address.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>--%>
</asp:Content>

