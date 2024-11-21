<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmMultiChannel.aspx.vb" Inherits="ICC.TrmMultiChannel" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmMultiChannel.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <iframe id="iframe_channel" title="description" style="width: 100%; height: 700px;" src="https://multichannel-indonesia.qiscus.com/"></iframe>
            </div>
        </div>
    </div>
</asp:Content>
