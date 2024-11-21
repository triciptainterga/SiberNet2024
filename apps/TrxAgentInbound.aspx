<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxAgentInbound.aspx.vb" Inherits="ICC.TrxAgentInbound" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxAgentInbound.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxAgentId" runat="server" />
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        <div class="media align-items-top p-0">
                            <%--<a class="avatar avatar-lg status-success mx-0" href="#">
                                    <img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">
                                </a>--%>
                            <div class="d-lg-flex d-block justify-content-between align-items-center w-p100">
                                <%-- <div class="media-body mb-lg-0 mb-20">
                                            <p class="font-size-16">
                                                <a class="hover-primary" href="#"><strong><i class="fa fa-address-book" aria-hidden="true"></i>&nbsp;Data Address Notification Sending</strong></a>
                                            </p>
                                            <p class="font-size-12">Last Seen 10:30pm ago</p>
                                        </div>--%>
                                <div>
                                    <%--<button type="button" class="btn btn-rounded btn-default float-left" onclick="showAdd();" style="height:30px;"></button>--%>
                                    <a href="#" onclick="AgentSetting();"><span class="badge badge-pill badge-default" style="font-weight: bold; font-size: 14px;">+ Assign Agent Call</span></a>
                                </div>
                                <div class="box-controls pull-right">
                                    <div class="lookup lookup-circle lookup-right">
                                        <input type="text" id="TxtSearchingUserName" placeholder="Searching">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-body mb-30" style="height: 750px;margin-left:10px">
                        <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow-x: hidden; width: auto; height: 750px;">
                            <div class="row fx-element-overlay">
                                <div class="row" id="divUserNotification" style="margin-left:5px;margin-top:10px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer"></div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal modal-right fade" id="modal-agent" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Assign Agent Call</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Call Type</label>
                                <select id="cmbType" class="form-control" style="height: 33px;" onchange="Get_TypeAgent(1);">
                                    <option value="">Select</option>
                                    <option value="1">Inbound Call</option>
                                    <option value="2">Outbound Call</option>
                                    <option value="3">Inbound & Outbound Call</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>User Agent </label>
                                <select id="CmbAgent" class="form-control" style="height: 33px;" onchange="Get_CmbAgent(1);">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Password EPIC</label>
                                <input type="text" class="form-control" id="EPIC_Password" placeholder="EPIC Password" readonly="readonly" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>User PABX</label>
                                <input type="text" class="form-control" id="EPIC_PABX_User" placeholder="PABX User" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Password PABX</label>
                                <input type="text" class="form-control" id="EPIC_PABX_Password" placeholder="PABX Password" readonly="readonly" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>PIN PABX</label>
                                <input type="text" class="form-control" id="EPIC_PABX_Pin" placeholder="PABX PIN" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <%--<input id="btnGet1" type="button" value="Get Selected" />--%>
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSave()" id="Save">Submit</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="Update">Update</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modalright" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Edit Setting Agent Email</h5>
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
                            <label>Select Account Email</label>
                            <select id="CmbUpdateAccountEmail" class="form-control" style="height: 33px;">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-md-12">
                            <label>Select Maximal Distribution Data</label>
                            <select id="CmbUpdateMaxCampaign" class="form-control" style="height: 33px;">
                                <option value="">Select</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
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
