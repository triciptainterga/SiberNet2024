<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmNotification.aspx.vb" Inherits="ICC.TrmNotification" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmNotification.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxDepartmentID" runat="server" />
    <asp:HiddenField ID="TrxVendorID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-lg-3 col-12">
                <div class="box bg-lightest" id="chat-bx">
                    <div class="box-header bg-white">
                        <div class="media-body mb-lg-0 mb-20">
                            <p class="font-size-16">
                                <a class="hover-primary" href="#"><strong><i class="mdi mdi-bell" aria-hidden="true"></i>&nbsp;System Notification Setting</strong></a>
                            </p>
                            <%--<p class="font-size-12">Last Seen 10:30pm ago</p>--%>
                        </div>
                    </div>
                    <div class="box-body">
                        <%--                        <h6 class="control-sidebar-heading"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;User Notification</h6>--%>
                        <%--<hr />--%>
                        <%-- <p class="font-size-16">
                            <strong><i class="fa fa-user" aria-hidden="true" style="font-size: 18px;"></i>&nbsp;User Notification</strong>
                        </p>
                         <hr />--%>
                        <div class="flexbox mb-10">
                            <label for="layout_fixed" class="control-sidebar-subheading">Ticket Create</label>
                            <label class="switch switch-border switch-danger">
                                <input type="checkbox" data-layout="fixed" id="SettingTicketCreate" checked="checked" onclick="TicketCreate(this.checked)">
                                <span class="switch-indicator"></span><span class="switch-description"></span>
                            </label>
                        </div>
                        <div class="flexbox mb-10">
                            <label for="layout_fixed" class="control-sidebar-subheading">Ticket Over SLA</label>
                            <label class="switch switch-border switch-danger">
                                <input type="checkbox" data-layout="fixed" id="SettingTicketOver" checked="checked" onclick="TicketOver(this.checked)">
                                <span class="switch-indicator"></span><span class="switch-description"></span>
                            </label>
                        </div>
                        <div class="flexbox mb-10">
                            <label for="layout_fixed" class="control-sidebar-subheading">Ticket Close</label>
                            <label class="switch switch-border switch-danger">
                                <input type="checkbox" data-layout="fixed" id="SettingTicketClosed" checked="checked" onclick="TicketClosed(this.checked)">
                                <span class="switch-indicator"></span><span class="switch-description"></span>
                            </label>
                        </div>
                        <div class="flexbox mb-10">
                            <label for="layout_fixed" class="control-sidebar-subheading">Ticket Escalation</label>
                            <label class="switch switch-border switch-danger">
                                <input type="checkbox" data-layout="fixed" id="SettingTicketEskalasi" checked="checked" onclick="TicketEskalasi(this.checked)">
                                <span class="switch-indicator"></span><span class="switch-description"></span>
                            </label>
                        </div>
                    </div>
                    <div class="box-footer bg-lightest">
                    </div>
                </div>
                <div class="box bg-lightest" id="Div1">
                    <div class="box-header bg-white">
                        <div class="media-body mb-lg-0 mb-20">
                            <p class="font-size-16">
                                <a class="hover-primary" href="#"><strong><i class="mdi mdi-bell" aria-hidden="true"></i>&nbsp;Customer Notification Setting</strong></a>
                            </p>
                            <%--<p class="font-size-12">Last Seen 10:30pm ago</p>--%>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="flexbox mb-10">
                            <label for="layout_fixed" class="control-sidebar-subheading">Ticket Create</label>
                            <label class="switch switch-border switch-danger">
                                <input type="checkbox" data-layout="fixed" id="SettingCustomerCreate" checked="checked" onclick="CustomerTicketCreate(this.checked)">
                                <span class="switch-indicator"></span><span class="switch-description"></span>
                            </label>
                        </div>
                        <div class="flexbox mb-10">
                            <label for="layout_fixed" class="control-sidebar-subheading">Ticket Close</label>
                            <label class="switch switch-border switch-danger">
                                <input type="checkbox" data-layout="fixed" id="SettingCustomerClosed" checked="checked" onclick="CustomerTicketClosed(this.checked)">
                                <span class="switch-indicator"></span><span class="switch-description"></span>
                            </label>
                        </div>
                    </div>
                    <div class="box-footer bg-lightest">
                    </div>
                </div>
                <div class="box">
                    <div class="box-header with-border">
                        <p class="font-size-16">
                            <a class="hover-primary" href="TrmNotificationTemplate.aspx" target="_blank"><strong><i class="mdi mdi-calendar-plus"></i>&nbsp;Notification Template</strong></a>
                        </p>
                    </div>
                    <div class="box-body p-0">
                        <div class="media-list media-list-hover media-list-divided inner-user-div" id="divNotificationTemplate" style="height: 255px;"></div>
                        <%--<div class="media-list media-list-hover">
                            <a class="media media-single" href="#">
                                <span class="avatar avatar-lg bg-primary"><i class="fa fa-user"></i></span>
                                <div class="media-body">
                                    <p>Pellentesque rhoncus ipsum vel mauris sagittis, vulputate semper arcu consectetur.</p>
                                    <span>55 min ago</span>
                                </div>
                            </a>
                            <a class="media media-single" href="#">
                                <span class="avatar avatar-lg bg-success"><i class="fa fa-usd"></i></span>
                                <div class="media-body">
                                    <p>Pellentesque blandit odio id felis semper, imperdiet sagittis purus tincidunt.</p>
                                    <span>23 hours ago</span>
                                </div>
                            </a>
                            <a class="media media-single" href="#">
                                <span class="avatar avatar-lg bg-warning"><i class="fa fa-star"></i></span>
                                <div class="media-body">
                                    <p>Aenean tincidunt tortor sit amet erat rutrum, vel condimentum ipsum gravida.</p>
                                    <span>Yesterday</span>
                                </div>
                            </a>
                        </div>--%>
                    </div>
                    <div class="box-footer">
                    </div>
                </div>
            </div>

            <%--Right--%>
            <div class="col-lg-9 col-12">
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
                                            <a href="#" onclick="showAdd();"><span class="badge badge-pill badge-default" style="font-weight: bold; font-size: 14px;">+ Add Email Address Notification</span></a>
                                        </div>
                                        <div class="box-controls pull-right">
                                            <div class="lookup lookup-circle lookup-right">
                                                <input type="text" id="TxtSearchingEmail" placeholder="Email or User">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="box-body mb-30" style="height: 950px;">
                                <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 900px;">
                                    <div class="row fx-element-overlay">
                                        <div class="row" id="divUserNotification"></div>
                                    </div>
                                </div>
                            </div>
                            <%--<div class="box-footer">
                                <div class="d-md-flex d-block justify-content-between align-items-center">
                                <input class="form-control b-0 py-10" type="text" placeholder="Say something...">
                                <div class="d-flex justify-content-between align-items-center mt-md-0 mt-30">
                                    <button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
                                        <i class="mdi mdi-link"></i>
                                    </button>
                                    <button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
                                        <i class="mdi mdi-image"></i>
                                    </button>
                                    <button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
                                        <i class="mdi mdi-face"></i>
                                    </button>
                                    <button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
                                        <i class="mdi mdi-microphone"></i>
                                    </button>
                                    <button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
                                        <i class="mdi mdi-camera"></i>
                                    </button>
                                    <button type="button" class="waves-effect waves-circle btn btn-circle btn-primary">
                                        <i class="mdi mdi-send"></i>
                                    </button>
                                </div>
                            </div>
                            </div>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal center-modal fade" id="ModalChannel" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1000px; margin-left: -260px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Email Notification Address</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>User Name</label>
                                <select name="select" id="cmbUserName" class="form-control" onchange="getWS_CategoryType(1);" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="text" class="form-control" id="TxtEmailAddress" placeholder="Email Address">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Status</label>
                                <select name="select" id="cmbStatus" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="YES">Yes</option>
                                    <option value="NO">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Level User</label>
                                <input type="text" class="form-control" id="TxtLevelUser" placeholder="Level User">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group" id="Div_Department">
                                <label>Department</label>
                                <input type="text" class="form-control" id="TxtDepartment" placeholder="Department">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Group Agent</label>
                                <input type="text" class="form-control" id="TxtVendor" placeholder="Group Agent">
                            </div>
                        </div>
                    </div>
                    <hr />
                    <label for="layout_fixed" class="control-sidebar-subheading"><i class="fa fa-bell" aria-hidden="true"></i>&nbsp;Setting Notification Event</label>
                    <hr />
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="c-inputs-stacked">
                                    <input type="checkbox" id="checkboxCreate" onclick="CheckCreate(this.checked)">
                                    <label for="checkboxCreate" class="block">Ticket Create</label>
                                    <input type="hidden" id="HdTicketCreate" runat="server" value="NO" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="c-inputs-stacked">
                                    <input type="checkbox" id="checkboxOver" onclick="CheckOver(this.checked)">
                                    <label for="checkboxOver" class="block">Ticket Over SLA</label>
                                    <input type="hidden" id="HdTicketOverSLA" runat="server" value="NO" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="c-inputs-stacked">
                                    <input type="checkbox" id="checkboxClosed" onclick="CheckClosed(this.checked)">
                                    <label for="checkboxClosed" class="block">Ticket Closed</label>
                                    <input type="hidden" id="HdTicketClosed" runat="server" value="NO" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="c-inputs-stacked">
                                    <input type="checkbox" id="checkboxEscalation" onclick="CheckEscalation(this.checked)">
                                    <label for="checkboxEscalation" class="block">Ticket Escalation</label>
                                    <input type="hidden" id="HdTicketEscalation" runat="server" value="NO" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan()" id="Simpan">Save</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionDelete()" id="Delete">Delete</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
