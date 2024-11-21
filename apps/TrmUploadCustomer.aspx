<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmUploadCustomer.aspx.vb" Inherits="ICC.TrmUploadCustomer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmUploadCustomer.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUploadID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Customer Upload</h4>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <table id="TrmUploadCustomer" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th style="width: 250px;">Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Jenis Kelamin</th>
                                            <th>Polis Number</th>
                                            <th>NIK</th>
                                            <%--<th style="width: 50px;">Action</th>--%>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <%--                  <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-secondary" onclick="showBack()">Back</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="Blast_SaveData()" id="Update">Submit</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="Blast_PostData()" id="PostingStatus">Posting</button>
                    </div>--%>
                </div>
            </div>
        </div>
        <input type="hidden" id="TxtMsgNya" />
        <div id="chat-box-body" onclick="modalUpload()">
            <div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-primary l-h-70">
                <div id="chat-overlay"></div>
                <span class="font-size-24 ti-upload"></span>
            </div>
        </div>
    </section>

    <div class="modal modal-left fade" id="modalLeft" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a href="../FileUploadCustomer/ExampleUploadCustomer.xlsx" class="text-primary" title="Download Template">
                        <i class="mdi mdi-cloud-download float-right"></i>
                    </a>
                    <button type="button" id="chat-box-toggle" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="results"></div>
                            <label for="file_default">No File Choosen </label>
                            <label for="file_name"><b></b></label>
                            <div class="tb-height-b60 tb-height-lg-b60"></div>
                            <section class="hk-sec-wrapper">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <%--<input type="file" name="files" class="custom_file" id="files" />--%>
                                        <input type="file" name="files" class="form-control" id="file" />
                                    </div>
                                    <%--  <div class="col-sm-6">
                                        <input type="text" name="txtFileName" class="form-control" id="txtFileName" style="width: 100%;" readonly="true" />
                                    </div>--%>
                                </div>
                            </section>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-12">
                            <label>Upload ID</label>
                            <input type="text" name="txtFileName" class="form-control" id="txtFileName" style="width: 100%;" readonly="true" />
                            <%--<select id="CmbUploadID" class="form-control" style="height: 33px;" onchange="get_CmbUploadID(1)">
                                <option>Select</option>
                            </select>--%>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="box-body p-0" style="min-height: 400px;">
                            <%--<div class="lookup lookup-sm lookup-right d-none d-lg-block">
                                <input type="text" id="TrxSearching_Upload" placeholder="Searching" class="w-p100">
                            </div>--%>
                            <div id="ListUpload" class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 400px;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <br />
                </div>
            </div>
        </div>
    </div>
    <!-- /.modal -->
    <div class="modal center-modal fade" id="ModalChannel" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 900px; margin-left: -180px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Create Campaign Data</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <label>Channel Account</label>
                            <div class="form-group">
                                <input type="text" class="form-control" id="TrxChannelAccount" placeholder="Channel Account">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Campaign Name</label>
                                <select name="select" id="cmbCampaign" class="form-control">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Campaign Channel</label>
                                <select name="select" id="cmbCampaignChannel" class="form-control">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="UpdateCampaign">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan()" id="Simpan">Save</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionDelete()" id="Delete">Delete</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

