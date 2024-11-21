<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxHistoryTicket.aspx.vb" Inherits="ICC.TrxHistoryTicket" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxHistoryTicket.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data History Ticket&nbsp;<i class="fa fa-cogs" onclick="showAdd()" style="cursor: pointer;"></i></h4>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table id="TrxHistory" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow-y: scroll;">
                                        <thead>
                                            <tr>
                                                <th style="width: 30px;">ID</th>
                                                <th style="width: 100px;">Channel</th>
                                                <th>Ticket Number</th>
                                                <th style="width: 100px;">ID Laporan</th>
                                                <th style="width: 200px;">Customer Name</th>
                                                <th>Type</th>
                                                <th style="width: 200px;">Agent Name</th>
                                                <th>Posisi</th>
                                                <th style="width: 50px;">SLA</th>
                                                <th style="width: 50px;">Status</th>
                                                <th style="width: 200px;">Date</th>
                                                <th style="width: 50px;">Action</th>
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
                    <h5 class="modal-title">Form Setting History Ticket</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Filter Type</label>
                                <select name="select" id="Filter_Type" class="form-control" style="height: 33px;" onchange="GetFilterType('1')">
                                    <option value="">Select</option>
                                    <option value="Date">Date</option>
                                    <option value="Ticket Number">Ticket Number</option>
                                    <option value="Nomor Kartu">ID Laporan</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="divstartdate">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label id="HeaderStart"></label>
                                <div class="form-group">
                                    <input type="date" class="form-control" id="startdate" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="divenddate">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label id="HeaderEnd"></label>
                                <div class="form-group">
                                    <input type="date" class="form-control" id="enddate" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label id="HeaderSearching"></label>
                                <input type="text" class="form-control" id="TicketNumber" />
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
