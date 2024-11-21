<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxHistoryFB.aspx.vb" Inherits="ICC.TrxHistoryFB" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxHistoryFB.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">History Data Facebook</h4>
                        <div class="box-controls pull-right">
                            <i class="fa fa-cogs font-size-24" onclick="showAdd()" style="cursor: pointer;"></i>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table id="TrxHistory" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow-y: scroll;">
                                        <thead>
                                            <tr>
                                                <th style="width: 200px;">Header ID</th>
                                                <th style="width: 200px;">Account</th>
                                                <th style="width: 400px;">Message</th>
                                                <th style="width: 200px;">Date Post</th>
                                                <th style="width: 200px;">Account Comment</th>
                                                <th style="width: 400px;">Message Comment</th>
                                                <th style="width: 200px;">Date Comment</th>
                                                <th style="width: 200px;">Account Reply</th>
                                                <th style="width: 400px;">Message Reply</th>
                                                <th style="width: 200px;">Date Reply</th>
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
                    <h5 class="modal-title">Form Setting History Facebook</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
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
</asp:Content>
