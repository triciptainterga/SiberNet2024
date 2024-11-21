<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxAgentSM.aspx.vb" Inherits="ICC.TrxAgentSM" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <%--<script src="js/TrxAgentSM.js"></script>--%>
    <script src="js/TrxAgentSM_New.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxAgentId" runat="server" />
    <asp:HiddenField ID="TrxID" runat="server" />
     <asp:HiddenField ID="TrxTransaksiID" runat="server" />
    <asp:HiddenField ID="TrxTokenMeta" runat="server" />
    <asp:HiddenField ID="TrxSosialMediaType" runat="server" />
    <asp:HiddenField ID="TrxSosialMediaAccount" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        <div class="media align-items-top p-0">
                            <div class="d-lg-flex d-block justify-content-between align-items-center w-p100">
                                <div class="row" style="margin-left: -30px; margin-top: -10px;">
                                    <div class="col-md-12">
                                        <label><a href="#" onclick="AgentSetting();"><span class="badge badge-pill badge-default" style="font-weight: bold; font-size: 14px;">+ Assign Agent WhatsApp</span></a></label>
                                        <%--<select id="CmbSosialMedia" class="form-control" style="height: 33px; width: 300px;" onchange="Pre_DropdownAccountSM(1)">
                                            <option value="">Select</option>
                                        </select>--%>
                                    </div>
                                </div>
                                <div class="box-controls pull-right">
                                    <div class="lookup lookup-circle lookup-right">
                                        <input type="text" id="TxtSearchingUserName" placeholder="Searching">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-body mb-30" style="height: 750px;">
                        <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow-x: hidden; width: auto; height: 750px;">
                            <div class="row fx-element-overlay">
                                <div class="row" id="divUserNotification" style="margin-left:10px;margin-top:10px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer"></div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal center-modal fade" id="modal-agent" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; height: 700px; margin-left: -300px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Assign Agent WhatsApp</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Account Type</label>
                                <select id="CmbSosialMediaType" class="form-control" style="height: 33px;" onchange="Add_DropdownSosialMedia(1)">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Account WhatsApp Number</label>
                                <select id="CmbSosialMediaTransaksi" class="form-control" style="height: 33px;" onchange="Add_DropdownAccountSM(1)">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Maximal Distribution Data</label>
                                <select id="CmbMaxCampaign" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr style="border: solid; border-width: 1px; color: #6993ff !important;" />
                    <div class="row">
                        <div class="col-md-12">
                            <div class="scrollable ps-container ps-theme-default ps-active-y" style="position: fixed; height: 450px; width: 1070px;">
                                <table id="TrmAgent" class="table table-hover table-dark mb-0" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px"></th>
                                            <th style="width: 30px">ID</th>
                                            <th style="width: 150px;">Agent</th>
                                            <th style="width: 150px;">Name</th>
                                            <th style="width: 150px;">Email</th>
                                            <th style="width: 150px;">Token</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <%--<input id="btnGet1" type="button" value="Get Selected" />--%>
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <input id="btnSimpan" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Submit" />
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modalright" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Edit Setting Agent Sosial Media</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <input type="checkbox" id="Agent_Checkbox" class="filled-in" />
                            <label for="Agent_Checkbox">All Agent</label>
                            <input type="hidden" id="HDAgent_Checkbox" runat="server" />
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-12">
                            <label>Sosial Media Type</label>
                            <select id="CmbUpdateSosialMediaType" class="form-control" style="height: 33px;">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-md-12">
                            <label>Sosial Media Account</label>
                            <select id="CmbUpdateSosialMediaAccount" class="form-control" style="height: 33px;">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-md-12">
                            <label>Maximal Distribution Data</label>
                            <select id="CmbUpdateMaxCampaign" class="form-control" style="height: 33px;">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()">Update</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
