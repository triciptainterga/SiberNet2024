<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmEpicSystem.aspx.vb" Inherits="ICC.TrmEpicSystem" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmEpicSystem.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Configurasi Epic System</h4>
                        <center>
                            <div class="spin2" id="LoaderPage"></div>
                        </center>
                    </div>
                    <div class="box-body" style="overflow-y:scroll;">
                        <table id="TrmEpicSystem" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                            <thead>
                                <tr>
                                    <th style="width: 50px;">ID</th>
                                    <th style="width: 150px;">AES</th>
                                    <th style="width: 150px;">Aes User</th>
                                    <th style="width: 150px;">Aes Password</th>
                                    <th style="width: 150px;">Port</th>
                                    <th style="width: 150px;">IP Database</th>
                                    <th style="width: 150px;">Database User</th>
                                    <th style="width: 150px;">Database Password</th>
                                    <th style="width: 150px;">Database Name</th>
                                    <th style="width: 150px;">Dial Code</th>
                                    <th style="width: 150px;">Call History Endpoint</th>
                                    <th style="width: 150px;">Agent Endpoint</th>
                                    <th style="width: 150px;">Inbound Endpoint</th>
                                    <th style="width: 150px;">Outbound Endpoint</th>
                                    <th style="width: 150px;">Browser Path</th>
                                    <th style="width: 150px;">Theme</th>
                                    <th style="width: 150px;">ACW</th>
                                    <th style="width: 150px;">PBX Login</th>
                                    <th style="width: 150px;">PBX LogOut</th>
                                    <th style="width: 150px;">PBX Aux</th>
                                    <th style="width: 150px;">PBX AutoIn</th>
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
</asp:Content>
