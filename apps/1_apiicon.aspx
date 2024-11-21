<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="1_apiicon.aspx.vb" Inherits="ICC._1_apiicon" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="js/1_apiicon.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="text-center bt-0 border-light p-2">
        <div class="input-group">
            <input type="search" id="Ticket_SearchCustomer" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2">
            
        </div>
    </div>
    <br />
    <div class="box-body p-0">
        <div id="Ticket_ListCustomer" class="media-list media-list-hover media-list-divided inner-user-div" style="height: 345px">
            <div class="media media-single">No data found... </div>
        </div>
    </div>
</asp:Content>
