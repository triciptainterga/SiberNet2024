<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxReleaseOutbound.aspx.vb" Inherits="ICC.TrxReleaseOutbound" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxReleaseOutbound.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxOutboundID" runat="server" />
    <section class="content">
        <br />
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Release Data Outbound&nbsp;<i class="fa fa-search" onclick="Searching()" style="cursor: pointer;"></i></h4>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="media align-items-center bg-primary mb-20">
                                    <img class="avatar" src="../images/avatar.png" alt="...">
                                    <div class="media-body">
                                        <p id="ByName" class="text-white"></p>
                                    </div>
                                    <div>
                                        <a class="btn btn-block btn-outline btn-white btn-sm btn-rounded" href="#" id="ActionEdit" onclick="ActionEditModal()">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <%-- <div class="col-md-3">
                                <img class="card-img-top img-responsive" src="../images/card/img1.jpg" alt="Card image cap">
                                <div class="box-body">
                                    <div class="text-center">
                                        <br />
                                        <h4 class="box-title">Michael Jhondoe</h4>
                                        <br />
                                        <a href="#" class="btn btn-rounded btn-warning btn-sm">3 X Call</a>
                                    </div>
                                </div>
                                <!-- /.box-body -->
                            </div>--%>
                            <div class="col-md-12" id="DetailTransaksi">
                                <%--<h4 class="box-title">Detail Data Transaksi</h4>--%>
                                <div class="timeline-event timeline-event-primary">
                                    <table class="table table-striped table-hover" id="TableDetailTransaksi">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Nomor Polis</th>
                                                <th>Nomor Telepon</th>
                                                <th>Reason Call</th>
                                                <th>Agent</th>
                                                <th>Status</th>
                                                <th>Date Create</th>
                                                <%--<th>Action</th>--%>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-12" id="HeaderTransaksi">
                                <%--<h4 class="box-title">Header Data Transaksi</h4>--%>
                                <div class="timeline-event timeline-event-primary">
                                    <table class="table table-striped table-hover" id="TableHeaderTransaksi">
                                        <thead>
                                            <tr>
                                                <th>Nomor</th>
                                                <th>Nama Nasabah</th>
                                                <th>Nomor Polis</th>
                                                <th>Nomor Telepon</th>
                                                <th>Status</th>
                                                <%--<th>Agent</th>--%>
                                                <th>Distribute Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                        </div>
                    </div>
                    <div class="box-footer" id="ReleaseFooter">
                        <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                        <input id="btnDistribute" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Submit" onclick="ActionDistribute()" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal modal-right fade" id="modal-searching" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Searching Data</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Action &nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboAction" class="form-control" style="height: 33px;" onchange="ChangeRelease('1')">
                                        <option value="">Select</option>
                                        <option value="Enable">Enable Data Outbound</option>
                                        <option value="Disable">Disable Data Outbound</option>
                                        <option value="Change">Change Skill Outbound</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="DisplayTelepon">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Nomor Polis Atau Nomor Telepon &nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <input type="text" class="form-control" id="TxtSearching" placeholder="Nomor Polis Atau Nomor Telepon" style="height: 35px;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="DisplayAgent">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Agent Name &nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboAgent" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="row">
                        <div class="col-md-12">
                            <center>
                                <div class="spinner-border text-warning" id="LoaderRelease"></div>
                            </center>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <input id="btnSubmit" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Submit" onclick="ActionSubmit()" />
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-detail" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Detail Outbound</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Reason Call&nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboReasonCall" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Enable">Enable</option>
                                        <option value="Disable">Disable</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Status Call&nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboStatusCall" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Enable">Enable</option>
                                        <option value="Disable">Disable</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Counting Call&nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboCall" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <input id="btnSubmitCall" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Submit" onclick="ActionSubmit()" />
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-release" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Action</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Call Counting</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboCallCounting" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Call Status</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboCallStatus" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Open">Open</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Progress">Progress</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="row">
                        <div class="col-md-12">
                            <center>
                                <div class="spinner-border text-warning" id="LoaderReleaseTransaksi"></div>
                            </center>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <input id="btnSubmitRelease" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Submit" onclick="ActionRelease()" />
                </div>
            </div>
        </div>
    </div>
</asp:Content>
