<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Frame_DashboardTicketing.aspx.vb" Inherits="ICC.Frame_DashboardTicketing" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script src="js/jquery-1.9.1.min.js"></script>
    <script src="WB/main/js/TicketDashboard.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <body onload="getData()">
    </body>
    <iframe id="FrameTicket" title="description" style="width: 100%; height: 1000px;"></iframe>
</asp:Content>
