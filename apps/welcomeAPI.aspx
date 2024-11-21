<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="welcomeAPI.aspx.vb" Inherits="ICC.welcomeAPI" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/welcomeAPI.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxSearchingFlag" runat="server" />
    <asp:HiddenField ID="TrxUploadID" runat="server" />
    <asp:HiddenField ID="TrxJumlahData" runat="server" />
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="row">
                    <div class="col-md-3">
                        <label>Product Campaign</label>
                        <select id="CmbProductCampaign" class="form-control" style="height: 38px;" onchange="ProductCampaign_AgentLogin()">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <br />
                        <div class="form-group" style="margin-top: 5px;">
                            <a class="btn btn-rounded btn-primary" onclick="GetAPI_PolisNumber()" id="GetAPI"><i class="fa fa-cogs"></i>&nbsp;Get Transacion Data API</a>
                            <a class="btn btn-rounded btn-warning" onclick="checkCountingHeader()" id="CheckAPI" style="display: none;"><i class="fa fa-cogs"></i>&nbsp;Check Transacion Data API</a>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <br />
                        <div class="spinner-border text-warning" id="LoaderPageCounting"></div>
                    </div>
                    <div class="col-md-3">
                        <label>Select API ID</label>
                        <select id="CmbUploadID" class="form-control" style="height: 38px;" onchange="get_CmbUploadID(1)">
                            <option>Select</option>
                        </select>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table id="TrmSummary" class="table table-hover table-dark mb-0" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                <thead>
                                    <tr>
                                        <th style="width: 150px;">Data Type</th>
                                        <th style="width: 400px;">Data ID</th>
                                        <th style="width: 70px;">Data API</th>
                                        <th style="width: 70px;">Data Row</th>
                                        <%--<th style="width: 30px;">Action</th>--%>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-12">
                        <div class="modal-footer modal-footer-uniform" id="divButton" style="display: none;">
                            <button type="button" class="btn btn-rounded btn-danger" onclick="cancelUpload()" id="btn_cancel">Cancel</button>
                            <button type="button" class="btn btn-rounded btn-primary float-right" onclick="doneUpload()" id="btn_done">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal modal-right fade" id="modalright" tabindex="-1">
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
