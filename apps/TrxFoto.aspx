<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxFoto.aspx.vb" Inherits="ICC.TrxFoto" %>
<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="headline">Management Foto</h4>
                    </div>
                    <div class="box-body">
                        <dx:ASPxFileManager ID="fileManager" runat="server" Width="1450px" Theme="MetropolisBlue">
                            <Settings RootFolder="~/Images/agent" ThumbnailFolder="~/tmp/Thumbnails"
                                AllowedFileExtensions=".gif,.jpg,.png,.bmp"
                                InitialFolder="agent" />
                            <SettingsFileList View="Thumbnails">
                                <DetailsViewSettings AllowColumnResize="true" AllowColumnDragDrop="true" AllowColumnSort="true" 
                                    ShowHeaderFilterButton="true"/>
                            </SettingsFileList>
                            <SettingsAdaptivity Enabled="true" />
                            <%--<SettingsToolbar ShowDownloadButton="true" />--%>
                            <SettingsEditing AllowDownload="true" AllowDelete="true" AllowCreate="true" AllowCopy="true" AllowRename="true" AllowMove="true" />
                            <%--<SettingsEditing AllowCreate="true" />--%>
                        </dx:ASPxFileManager>
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>