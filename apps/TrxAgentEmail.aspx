<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxAgentEmail.aspx.vb" Inherits="ICC.TrxAgentEmail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxAgentEmail.js"></script>
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
                                    <a href="#" onclick="AgentSetting();"><span class="badge badge-pill badge-default" style="font-weight: bold; font-size: 14px;">+ Assign Agent Email</span></a>
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
                    <h5 class="modal-title">Form Setting Agent Email</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Select Account Email</label>
                                <select id="CmbAccountEmail" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Select Maximal Distribution Data</label>
                                <select id="CmbMaxCampaign" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                    <%--<option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>--%>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr style="border: solid; border-width: 1px; color: #6993ff !important;" />
                    <div class="row">
                        <div class="col-md-12">
                            <div class="scrollable ps-container ps-theme-default ps-active-y" style="position: fixed; height: 450px; width: 1070px;">
                                <table id="TrxAgent" class="table table-hover table-dark mb-0" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="width: 10px"></th>
                                            <th style="width: 10px">ID</th>
                                            <th style="width: 150px;">Agent</th>
                                            <th style="width: 150px;">Name</th>
                                            <th style="width: 150px;">Email</th>
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
                               <%-- <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>--%>
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
