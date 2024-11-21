<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Coll_TrxUpload.aspx.vb" Inherits="ICC.Coll_TrxUpload" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Coll_TrxUpload.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Upload Collection</h4>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Collection Name <span class="text-danger">*</span></label>
                                    <select id="ComboCampaignCollection" class="form-control" style="height: 33px;" onchange="OnchangeComboUpload()">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4" style="margin-top: 8px;">
                                <div id="results"></div>
                                <label for="file_default"></label>
                                <a href="../FileTemplateUpload/Telemarketing.xlsx" class="text-primary"><i class="mdi mdi-cloud-download float-right"></i></a>
                                <label for="file_name"><b></b></label>
                                <div class="tb-height-b60 tb-height-lg-b60"></div>
                                <section class="hk-sec-wrapper">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="custom-file">
                                                <input type="file" name="filesnya" class="custom-file-input" id="filesnya" />
                                                <label class="custom-file-label" for="customFile">Choose file</label>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <br />
                            </div>
                            <%--<div class="col-md-2">
                                <div class="form-group" id="TambahDocument">
                                    <br />
                                    <a href="#" onclick="DeleteAll()" class="btn btn-rounded btn-default btn-block"><i class="ti-trash" aria-hidden="true"></i>Delete All</a>
                                </div>
                            </div>--%>
                            <div class="col-md-4"></div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Select Upload ID <span class="text-danger">*</span></label>
                                    <select id="ComboUploadID" class="form-control" onchange="OnchangeComboUpload()" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
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
                                        <%--  <dx:GridViewDataTextColumn Caption="Action" Width="45px" HeaderStyle-HorizontalAlign="Center">
                                            <DataItemTemplate>
                                                <a href="#" onclick="FunctionDelete('<%#Eval("id_run") %>')">Delete</a>
                                            </DataItemTemplate>
                                        </dx:GridViewDataTextColumn>--%>
                                        <dx:GridViewDataTextColumn Caption="Name" FieldName="Name" Width="200px"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Gender" FieldName="Gender" Width="200px"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Birth Date" FieldName="BirthDate" Width="200px"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Email" FieldName="Email" Width="200px"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Telepon" FieldName="Telepon" Width="200px"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Job Tittle" FieldName="JobTitle" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Address" FieldName="Address" Width="300px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Upload ID" FieldName="UploadID" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Status" FieldName="Status" Width="200px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                    </Columns>
                                </dx:ASPxGridView>
                                <asp:SqlDataSource ID="XtraUpload" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <button type="button" class="btn btn-rounded btn-danger btn-outline" id="ButtonDelete" onclick="ButtonDistributeDelete()">
                            <i class="ti-trash"></i>&nbsp;Delete
                        </button>
                        <button type="button" class="btn btn-rounded btn-primary btn-outline float-right" id="ButtonDistribute" onclick="ButtonDistributeData()">
                            <i class="ti-sharethis"></i>&nbsp;Distribute
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="chat-box-body" onclick="modalUpload()">
            <div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-primary l-h-70">
                <div id="chat-overlay"></div>
                <span class="font-size-24 ti-user"></span>
            </div>
        </div>
        <div id="chat-box-bodyDrop"></div>
    </section>
    <div class="modal modal-right fade" id="modal_delete" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Delete Data Upload</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Tanggal Upload <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="ti-calendar"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Tanggal Upload" id="TglUpload" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Jumlah Data Upload<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="ti-user"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Jumlah Data" id="JumlahData" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionDeleteAll()" id="DeleteDataCustomer">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal_upload" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1000px; margin-left: -250px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Data Upload</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <dx:ASPxGridView ID="ASPxGridView2" ClientInstanceName="ASPxGridView2" runat="server" Width="100%" Styles-Header-HorizontalAlign="Center"
                                    Theme="MetropolisBlue" DataSourceID="SqlDataSource1" Styles-Header-Font-Bold="true" Font-Size="X-Small" Settings-HorizontalScrollBarMode="Auto">
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
                                        <%--  <dx:GridViewDataTextColumn Caption="Action" Width="45px" HeaderStyle-HorizontalAlign="Center">
                                            <DataItemTemplate>
                                                <a href="#" onclick="FunctionDelete('<%#Eval("id_run") %>')">Delete</a>
                                            </DataItemTemplate>
                                        </dx:GridViewDataTextColumn>--%>
                                        <dx:GridViewDataTextColumn Caption="No" FieldName="pn" Width="100px" CellStyle-HorizontalAlign="left"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Name" FieldName="name" Width="270px"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Contact Info" FieldName="gender" Width="270px"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Status" FieldName="birth_date" Width="270px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Job Tittle" FieldName="tmt_pkwt" Width="270px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Address" FieldName="tmt_pkwt" Width="300px" CellStyle-HorizontalAlign="Left"></dx:GridViewDataTextColumn>
                                    </Columns>
                                </dx:ASPxGridView>
                                <asp:SqlDataSource ID="SqlDataSource1" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionDeleteAll()" id="DeleteCustomer">Delete</button>
                </div>
            </div>
        </div>
    </div>
      <div class="modal modal-right fade" id="ModalAgentLogin" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="box-body p-0" style="min-height: 500px;">
                        <div class="lookup lookup-sm lookup-right d-none d-lg-block">
                            <input type="text" id="TrxSearching_Outbound" placeholder="Searching" class="w-p100">
                        </div>
                        <div id="ListSearching" class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 650px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
