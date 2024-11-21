<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Out_TrxHistoryUpload.aspx.vb" Inherits="ICC.Out_TrxHistoryUpload" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Out_TrxHistoryUpload.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data History Upload</h4>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView" runat="server" Width="100%" Styles-Header-HorizontalAlign="Center"
                                    Theme="MetropolisBlue" DataSourceID="XtraUpload" Styles-Header-Font-Bold="true" Font-Size="X-Small" Settings-HorizontalScrollBarMode="Auto">
                                    <SettingsPager>
                                        <AllButton Text="All">
                                        </AllButton>
                                        <NextPageButton Text="Next &gt;">
                                        </NextPageButton>
                                        <PrevPageButton Text="&lt; Prev">
                                        </PrevPageButton>
                                        <PageSizeItemSettings Visible="true" Items="10, 15, 20, 50" ShowAllItem="true" />
                                    </SettingsPager>
                                    <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="false" />
                                    <Columns>
                                        <dx:GridViewDataTextColumn Caption="Action" Width="45px" HeaderStyle-HorizontalAlign="Center">
                                            <DataItemTemplate>
                                                <a href="#" onclick="FunctionDelete('<%#Eval("UploadID") %>')">Delete</a>
                                            </DataItemTemplate>
                                        </dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Upload ID" FieldName="UploadID" Width="20%"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Total Data" FieldName="TotalData" Width="20%" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Total Call" FieldName="TotalCall" Width="20%" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Total Not Call" FieldName="TotalNotCall" Width="20%" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Upload By" FieldName="UploadBy" Width="20%" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                       <%-- <dx:GridViewDataHyperLinkColumn Settings-FilterMode="DisplayText" Caption="Url FileName" CellStyle-HorizontalAlign="Center"
                                            ShowInCustomizationForm="True" FieldName="UrlFileName" Width="400px">
                                            <DataItemTemplate>
                                                <dx:ASPxHyperLink ForeColor="#333333" Font-Underline="true" Font-Size="10px" ID="ASPxHyperLinkTest" Target="_blank" runat="server"
                                                    NavigateUrl='<%#String.Format(Eval("UrlFileName"))%>'>
                                                </dx:ASPxHyperLink>
                                            </DataItemTemplate>
                                        </dx:GridViewDataHyperLinkColumn>--%>
                                        <%--<dx:GridViewDataTextColumn Caption="Url File Upload" Width="435px" HeaderStyle-HorizontalAlign="Center">
                                            <DataItemTemplate>
                                                  <a href="#" onclick="FunctionDelete('<%#Eval("UploadID") %>')">Download</a>
                                            </DataItemTemplate>
                                        </dx:GridViewDataTextColumn>--%>
                                        <%--<dx:GridViewDataTextColumn Caption="Url File Upload" FieldName="UrlFileName" Width="435px"></dx:GridViewDataTextColumn>--%>
                                    </Columns>
                                </dx:ASPxGridView>
                                <asp:SqlDataSource ID="XtraUpload" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</asp:Content>
