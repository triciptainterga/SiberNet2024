<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxHistoryEmail.aspx.vb" Inherits="ICC.TrxHistoryEmail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxHistoryEmail.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data History Email&nbsp;<i class="fa fa-cogs" onclick="showAdd()" style="cursor: pointer;"></i></h4>
                        <h4 class="box-title pull-right">
                            <label id="myLabel" class="label" style="font-size: 11px; font-weight: bold;"></label>
                        </h4>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table id="TrxHistory" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow-y: scroll;">
                                        <thead>
                                            <tr>
                                                <th style="width: 150px;">Email Service</th>
                                                <th style="width: 150px;">Email Address</th>
                                                <th style="width: 650px;">Subject</th>
                                                <th style="width: 150px;">Agent Name</th>
                                                <th style="width: 180px;">Date</th>
                                                <th style="width: 100px;">Type</th>
                                                <th style="width: 50px;">File</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal modal-right fade" id="modal-history" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Setting History Email</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Select Feature</label>
                                <div class="form-group">
                                    <select id="cmbFeature" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="1">Inbox Email</option>
                                        <option value="2">Outboux Email</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Start Date</label>
                                <div class="form-group">
                                    <input type="date" class="form-control" id="startdate" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>End Date</label>
                                <div class="form-group">
                                    <input type="date" class="form-control" id="enddate" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="text" class="form-control" placeholder="Email Address" id="EmailAddress" />
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <center>
                        <div class="spinner-border text-warning" id="LoaderPage"></div>
                    </center>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionHistory()" id="Save">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-left fade" id="modal-interaction-attachment" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="box-title text-info"><i class="ti-clip mr-15"></i>File Attachment</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="p-20">
                    <div class="row" id="InteractionAttachment" style="width: 100%; margin-left: 15px;"></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
