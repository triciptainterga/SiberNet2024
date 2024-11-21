<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxAgentWA.aspx.vb" Inherits="ICC.TrxAgentWA1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxAgentWA.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Account Agent WA&nbsp;<i class="fa fa-plus" onclick="AgentSetting()" style="cursor:pointer;"></i></h4>
                        <center>
                            <div class="spin2" id="LoaderPage"></div>
                        </center>
                    </div>
                    <div class="box-body">
                        <table id="TrmAgentWA" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                            <thead>
                                <tr>
                                    <th style="width: 30px;">ID</th>
                                    <th style="width: 200px;">UserName UIDESK</th>
                                    <th style="width: 200px;">UserName Integration</th>
                                    <th style="width: 200px;">Account Number</th>
                                    <%--<th style="width: 150px;">Product</th>--%>
                                    <th style="width: 100px;">Status</th>
                                    <th style="width: 170px;">Date Create</th>
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
    <div class="modal modal-right fade" id="modal-agent" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Setting Agent WhatsApp</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Agent WA</label>
                                <select id="CmbAgentWA" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>UserName Integration</label>
                                <input type="text" class="form-control" id="UserName_Integration" placeholder="UserName Integration">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Channel</label>
                                <select name="select" id="CmbChannel" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="WA">WA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Nomor Telepon WhatsApp</label>
                                <select name="select" id="ComboNomorTelepon" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                                <%--<input type="text" class="form-control" id="Product_Channel" placeholder="Product Channel">--%>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Status</label>
                                <select name="select" id="cmbStatus" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="Y">Aktif</option>
                                    <option value="N">Non Aktif</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <input id="btnSimpan" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Submit" onclick="ActionSimpan()" />
                    <input id="btnUpdate" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Update" onclick="ActionUpdate()" />
                    <input id="btnDelete" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Delete" onclick="ActionDelete()" />
                </div>
            </div>
        </div>
    </div>
</asp:Content>
