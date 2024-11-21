<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmCategoryReason.aspx.vb" Inherits="ICC.TrmCategoryReason" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmCategoryReason.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="Hd_CmbCategory" runat="server" />
    <asp:HiddenField ID="Hd_CmbCategoryType" runat="server" />
    <asp:HiddenField ID="Hd_CmbCategoryDetail" runat="server" />
    <asp:HiddenField ID="Hd_EscalationUnit" runat="server" />
    <asp:HiddenField ID="Hd_Status" runat="server" />
    <asp:HiddenField ID="Hd_ComboLayer" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Jenis Komplain&nbsp;<i class="fa fa-plus" onclick="showAdd()" style="cursor: pointer;"></i></h4>
                    </div>
                    <div class="box-body">
                        <table id="TrmCategoryReason" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Jenis Layanan</th>
                                    <th>Tipe Komplain</th>
                                    <th>Jenis Komplain</th>
                                    <th>Ticket Tag</th>
                                    <th>Priority Scale</th>
                                    <th>Escalation Team</th>
                                    <th>Escalation Ticket</th>
                                    <th>Layer</th>
                                    <th>SLA</th>
                                    <th>Status</th>
                                    <th>User Create</th>
                                    <%--<th style="width: 200px;">Date Create</th>--%>
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
    </section>
    <!-- /.modal -->
    <div class="modal center-modal fade" id="ModalChannel" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Data Jenis Komplain</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Type</label>
                                <select name="select" id="cmbCategory" class="form-control" onchange="getWS_CategoryType(1);" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Jenis Layanan</label>
                                <select name="select" id="cmbCategoryType" class="form-control" onchange="getWS_CategoryTypeDetail(1);" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Tipe Komplain</label>
                                <select name="select" id="cmbCategoryDetail" class="form-control" onchange="getWS_CategoryTypeDetail_Value(1)" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Jenis Komplain</label>
                                <textarea style="height: 150px;" class="form-control" id="TxtCategoryReasonName"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Ticket Tag</label>
                                <input type="text" class="form-control" id="TxtTag" placeholder="Tag">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Priority</label>
                                <select name="select" id="cmbPriorityScale" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Escalation Team</label>
                                <select name="select" id="cmbEscalationUnit" class="form-control" onchange="getWS_EscalationUnit(1)" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Escalation Ticket</label>
                                <select name="select" id="cmbEscalationTicket" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Layer</label>
                                <select name="select" id="ComboLayer" class="form-control" style="height: 33px;" onchange="getWS_ComboLayer(1)">
                                    <option value="">Select</option>
                                    <%--  <option value="2">Layer 2</option>
                                    <option value="3">Layer 3</option>--%>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>SLA(Days)</label>
                                <input type="text" class="form-control" id="TxtSLA" placeholder="SLA">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Status</label>
                                <select name="select" id="cmbStatus" class="form-control" onchange="getWS_Status(1)" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="Y">Aktif</option>
                                    <option value="N">Non Aktif</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan()" id="Simpan">Save</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
