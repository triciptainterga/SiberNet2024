<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Coll_FrameDashboard.aspx.vb" Inherits="ICC.Coll_FrameDashboard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="WB/main/js/CollDashboard.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <body onload="getDataPrimary()">
		<iframe id="iframe_wb" title="description" style="width: 100%; height: 1000px;"></iframe>
    </body>
</asp:Content>
