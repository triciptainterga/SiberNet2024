<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmKnowledgebase.aspx.vb" Inherits="ICC.TrmKnowledgebase" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="headline">Knowledge By Document</h4>
                    </div>
                    <div class="box-body">
                        <dx:ASPxFileManager ID="fileManager" runat="server" Width="1450px" Theme="MetropolisBlue">
                            <Settings RootFolder="~/apps/DocumentKnowledge" ThumbnailFolder="~/tmp/Thumbnails"
                                AllowedFileExtensions=".doc,.docx,.xls,.xlsx,.jpg,.pdf"
                                InitialFolder="DocumentBC" />
                            <SettingsFileList View="Details">
                                <DetailsViewSettings AllowColumnResize="true" AllowColumnDragDrop="true" AllowColumnSort="true" ShowHeaderFilterButton="true" />
                            </SettingsFileList>
                            <%--<SettingsToolbar ShowDownloadButton="true" />--%>
                            <SettingsEditing AllowDownload="true" />
                            <%--<SettingsEditing AllowCreate="true" />--%>
                        </dx:ASPxFileManager>
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
