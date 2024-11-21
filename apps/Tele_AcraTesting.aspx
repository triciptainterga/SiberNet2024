<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Tele_AcraTesting.aspx.vb" Inherits="ICC.Tele_AcraTesting" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Tele_AcraTesting.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <a href="#" onclick="Simulasi()">Testing</a>
    <asp:Button ID="ButtonSimulasi" runat="server" Text="Testing" />
</asp:Content>
