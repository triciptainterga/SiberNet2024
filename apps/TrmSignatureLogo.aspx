<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmSignatureLogo.aspx.vb" Inherits="ICC.TrmSignatureLogo" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="headline">Logo Signature</h4>
                    </div>
                    <div class="box-body">
                        <dx:ASPxFileManager ID="fileManager" runat="server" Width="100%" Theme="MetropolisBlue">
                            <Settings RootFolder="~/apps/Signature" ThumbnailFolder="~/tmp/Thumbnails"
                                AllowedFileExtensions=".doc,.docx,.xls,.xlsx,.jpg,.pdf,.png,.bmp,.gif"
                                InitialFolder="DocumentBC" />
                            <SettingsFileList View="Details">
                                <DetailsViewSettings AllowColumnResize="true" AllowColumnDragDrop="true" AllowColumnSort="true" ShowHeaderFilterButton="true" />
                            </SettingsFileList>
                            <SettingsToolbar ShowDownloadButton="true" />
                            <SettingsEditing AllowDownload="true" AllowDelete="true" />
                            <SettingsEditing AllowCreate="true" />
                        </dx:ASPxFileManager>
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
