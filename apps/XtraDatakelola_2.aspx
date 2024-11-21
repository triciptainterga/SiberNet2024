<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="XtraDatakelola_2.aspx.vb" Inherits="ICC.XtraDatakelola_2" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
</head>
<body>
    <form id="form1" runat="server">
        <div class="row" runat="server">
            <div class="col-xl-12 col-lg-12 col-12">
                <div class="box">
                    <div class="box-body p-15">
                        <hr />
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server"
                            DataSourceID="TempBaseTrx" Width="100%" Styles-Header-Font-Bold="true" Theme="MetropolisBlue">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                            </SettingsPager>
                            <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowFilterBar="Hidden" EnableFilterControlPopupMenuScrolling="true"
                                ShowVerticalScrollBar="false" ShowFooter="false" ShowHorizontalScrollBar="true" />
                            <Columns>
                                <dx:GridViewDataTextColumn Caption="Session_ID" FieldName="SessionID" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Handle_Name" FieldName="HandleName" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Status_Chat" FieldName="StatusChat" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Note_Chat" FieldName="NoteChat" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Start_Time" FieldName="StartTime" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="End_Time" FieldName="EndTime" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Channel_Name" FieldName="ChannelName" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Channel_Pages_Name" FieldName="ChannelPagesName" Width="200px" Settings-AllowHeaderFilter="true"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Durasi_Chat" FieldName="DurasiChat" Width="200px" Settings-AllowHeaderFilter="true"></dx:GridViewDataTextColumn>
                            </Columns>
                        </dx:ASPxGridView>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-sm-2">
                <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                    <asp:ListItem Value="xlsx" Text="Excel" />
                    <asp:ListItem Value="xls" Text="Excel 97-2003" />
                    <asp:ListItem Value="pdf" Text="PDF" />
                    <asp:ListItem Value="rtf" Text="RTF" />
                    <asp:ListItem Value="csv" Text="CSV" />
                </asp:DropDownList>
            </div>
            <div class="col-sm-2">
                <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis"
                    HoverStyle-BackColor="gray" Height="30px" Width="100%" HoverStyle-Border-BorderColor="gray">
                </dx:ASPxButton>
            </div>
        </div>
        <hr />
        <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
        <asp:SqlDataSource ID="TempBaseTrx" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
    </form>
</body>
</html>
