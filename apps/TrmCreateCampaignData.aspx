<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmCreateCampaignData.aspx.vb" Inherits="ICC.TrmCreateCampaignData" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/3_CreateCampaign_Grid.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <%--<div class="content-header">
        <div class="d-flex align-items-center">
            <div class="w-p100 d-md-flex align-items-center justify-content-between">
                <h3 class="page-title">Data Campaign Outbound</h3>
                <div class="d-inline-block align-items-center">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                            <li class="breadcrumb-item" aria-current="page">Outbound</li>
                            <li class="breadcrumb-item active" aria-current="page">Data Campaign Outbound</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>--%>
    <section class="content">
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Create Campaign Data Outbound</h4>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Select Campaign Group <a href="TrmCampaign.aspx"><i class="fa fa-plus"></i></a></label>
                                    <select name="select" id="cmb_CampaignHeader" required class="form-control">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Select Campaign Content <a href="TrmCampaignContent.aspx"><i class="fa fa-plus"></i></a></label>
                                    <select name="select" id="cmb_TemplateBlast" onchange="getval(this);" required class="form-control">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                            </div>
                            <div class="col-md-3" style="margin-top: 25px;">
                                <%--Sample Template <a href="../FileBlast/sample.xlsx">Download here</a>--%>

                                <%--<a id="removeUpload" class="tb-btn tb-style1 tb-medium">Remove File</a>--%>
                                <a href="../FileBlast/sample.xlsx" class="btn btn-rounded btn-warning pull-right">Download File</a>
                                <%--<a id="removeUpload" class="btn btn-rounded btn-warning pull-right">Remove File</a>--%>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-md-12">
                                <div id="results"></div>
                                <label for="file_default">No File Choosen </label>
                                <label for="file_name"><b></b></label>
                                <div class="tb-height-b60 tb-height-lg-b60"></div>
                                <section class="hk-sec-wrapper">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <%--<input type="file" name="files" class="custom_file" id="files" />--%>
                                            <input type="file" name="files" class="form-control" id="file" />
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="text" name="txtFileName" class="form-control" id="txtFileName" style="width: 100%;" readonly="true" />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-md-12">
                                <table id="TrmCreateCampaignData" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Channel Account</th>
                                            <th>Campaign Name</th>
                                            <th>Channel</th>
                                            <th style="width: 200px;">Status Active</th>
                                            <th style="width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <%--<div class="row">
                            <div class="col-md-12">
                                <ul class="nav nav-tabs customtab2" role="tablist">
                                    <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home7" role="tab"><span class="hidden-sm-up"><i class="ion-home"></i></span><span class="hidden-xs-down">Blast Upload</span></a> </li>
                                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#profile7" role="tab"><span class="hidden-sm-up"><i class="ion-person"></i></span><span class="hidden-xs-down">Blast Table</span></a> </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="home7" role="tabpanel">
                                    </div>
                                    <div class="tab-pane" id="profile7" role="tabpanel">
                                        <div class="p-15">
                                            <p>Data yang terdapat disini yaitu data yang terdapat pada Menu List Phone</p>
                                            <div class="box-footer text-right">
                                                <a href="#" onclick="Blast_GenerateData()" class="btn btn-rounded btn-success btn-outline">
                                                    <i class="ti-save-alt"></i>Generate
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="box-body p-0">
                                            <div class="table-responsive">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <%--  <hr />
                                <div class="row">
                                    <div class="col-md-12">
                                        <table id="TrmCampaignContent" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Template Name</th>
                                                    <th>Message Blast</th>
                                                    <th>Url Attachment</th>
                                                    <th>UserCreate</th>
                                                    <th style="width: 200px;">Date Create</th>
                                                    <th style="width: 50px;">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-secondary" onclick="showBack()">Back</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="Blast_SaveData()" id="Update">Submit</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="Blast_PostData()" id="PostingStatus">Posting</button>
                        <%-- <a href="#" onclick="Blast_SaveData()" class="btn btn-rounded btn-success btn-outline">
                            <i class="ti-save-alt"></i>Submit
                        </a>--%>
                    </div>
                </div>
            </div>
        </div>
        <input type="hidden" id="TxtMsgNya" />
    </section>
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
