<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_Channel_WA.aspx.vb" Inherits="ICC._3_Channel_WA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<script>
  function resizeIframe(obj) {
    obj.style.height = 0;
     obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<iframe name="Stack" src="http://103.66.44.141/wagent/login-custom?id=1" width="100%"
        frameborder="0" scrolling="no" id="iframe" onload="resizeIframe(this)">
</iframe>
</asp:Content>
