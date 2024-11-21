<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmLDAP.aspx.vb" Inherits="ICC.TrmLDAP" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmLDAP.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data LDAP Configuratiobn</h4>
                    </div>
                    <div class="box-body">
                        <table id="TrmChannel" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>LDAP Server</th>
                                    <th>LDAP Username</th>
                                    <th>LDAP Password</th>
                                    <th>Status</th>
                                    <th style="width: 200px;">Date Create</th>
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
        <hr />
        <div class="row">
            <div class="col-4">
                <div class="form-group">
                    <label>LDAP Server</label>
                    <asp:TextBox runat="server" ID="Txt_Server" CssClass="form-control"></asp:TextBox>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <label>LDAP User</label>
                    <asp:TextBox runat="server" ID="Txt_User" CssClass="form-control"></asp:TextBox>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <label>LDAP Password</label>
                    <asp:TextBox runat="server" ID="Txt_Password" CssClass="form-control"></asp:TextBox>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <asp:Button ID="BTN_Submit" runat="server" Text="Submit" />
                </div>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <asp:Label ID="lblhasil" runat="server"></asp:Label>
                </div>
            </div>
        </div>
    </section>
    <div class="modal center-modal fade" id="ModalChannel" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1000px; margin-left: -240px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form LDAP Configuration</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>LDAP Server</label>
                                <input type="text" class="form-control" id="LDAP_Server" placeholder="LDAP Server">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>LDAP User</label>
                                <input type="text" class="form-control" id="LDAP_User" placeholder="LDAP User">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>LDAP Password</label>
                                <input type="text" class="form-control" id="LDAP_Password" placeholder="LDAP Password">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Status</label>
                                <select name="select" id="cmbStatus" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="Y">Aktif</option>
                                    <option value="N">Non Aktif</option>
                                </select>
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
