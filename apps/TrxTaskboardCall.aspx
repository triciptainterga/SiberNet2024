<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxTaskboardCall.aspx.vb" Inherits="ICC.TrxTaskboardCall" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxTaskboardCall.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Content Wrapper. Contains page content -->
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-xl-3 col-lg-3 col-12">
                <div class="row">
                    <div class="col-12">
                        <!-- Widget: user widget style 1 -->
                        <div class="box box-widget widget-user">
                            <!-- Add the bg color to the header using any of the bg-* classes -->
                            <div class="widget-user-header bg-primary" data-overlay="5">
                                <h3 class="widget-user-username text-white">
                                    <asp:Label ID="labelName" runat="server"></asp:Label></h3>
                                <h6 class="widget-user-desc text-white"></h6>
                            </div>
                            <div class="widget-user-image">
                                <img class="rounded-circle" src="../images/avatar/2.jpg" alt="User Avatar">
                            </div>
                            <div class="box-footer">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="description-block">
                                            <%--<h5 class="description-header"><label id="Agent_Name" style="color:#6993ff !important;"></label></h5>--%>
                                            <span class="description-text">
                                                <label id="Agent_Name" style="font-weight: bold; color: #6993ff !important;"></label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.widget-user -->

                        <div class="box">
                            <div class="box-body">
                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs customtab nav-justified" role="tablist">
                                    <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#messages" role="tab" onclick="ListCallPreviousDays()">Follow up Not Finish</a> </li>
                                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#contacts" role="tab" onclick="ListCallTodayNotClosed()">Today Not Finish</a> </li>
                                </ul>
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div class="tab-pane active" id="messages" role="tabpanel">
                                        <div class="lookup lookup-sm lookup-right d-none d-lg-block my-20">
                                            <input type="text" name="s" id="Searching_Previous" placeholder="Search" class="w-p100">
                                        </div>
                                        <div class="chat-box-one-side">
                                            <div id="previous_day_call" class="row"></div>

                                        </div>
                                    </div>
                                    <div class="tab-pane" id="contacts" role="tabpanel">
                                        <div class="lookup lookup-sm lookup-right d-none d-lg-block my-20">
                                            <input type="text" name="s" id="Searching_TodayNotClosed" placeholder="Search" class="w-p100">
                                        </div>
                                        <div class="chat-box-one-side">
                                            <div id="today_not_closed" class="row"></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-12">
                <div class="row">
                    <div class="col-12">
                        <div class="box">
                            <div class="row no-gutters py-2" id="divcountingCall"></div>
                        </div>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
                <center>
                    <div class="spinner-border text-warning" id="LoaderPage"></div>
                </center>
                <div class="box box-default">
                    <div class="box-body">
                        <%--<div>
                            <a href="#" data-toggle="modal" data-target="#modal-right" class="btn btn-rounded btn-warning pull-right" onclick="AddCampaignName()"><i class="si-magnifier si"></i>&nbsp;Searching Campaign</a>
                        </div>--%>
                        <div class="table-responsive">
                            <table id="TrxTaskboardCall" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow-y: scroll;">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th style="width: 200px;">name</th>
                                        <th>polis_number</th>
                                        <th>email</th>
                                        <th>phone_number</th>
                                        <%--<th>phone_office</th>--%>
                                        <%--<th>phone_home</th>--%>
                                        <th>product_campaign</th>
                                        <th>status</th>
                                        <th>action</th>
                                        <%--<th style="width: 50px;">Action</th>--%>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="box">
                </div>
            </div>
        </div>
        <!-- /.row -->
        <div id="chat-box-body" onclick="modulReminder()">
            <div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-primary l-h-70">
                <div id="chat-overlay"></div>
                <span class="font-size-24 ti-layout-accordion-list "></span>
            </div>
        </div>
    </section>

    <!-- Modal -->
    <div class="modal modal-right fade" id="modal-right" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" style="position: fixed; height: 900px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Data Call Activity & Reminder</h5>
                    <%--<button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>--%>
                    <button type="button" id="chat-box-toggle" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="box-body">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs customtab nav-justified" role="tablist">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#activiy" role="tab" onclick="ListCallActivity()">Data Call Activity</a> </li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#reminder" role="tab" onclick="ListCallReminder()">Data Reminder Call</a> </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="activiy" role="tabpanel" style="position: static; overflow: hidden; width: auto; height: 650px;">
                                <div class="lookup lookup-sm lookup-right d-none d-lg-block my-20">
                                    <input type="text" name="s" id="searching_activity" placeholder="Search" class="w-p100">
                                </div>
                                <div class="scrollable ps-container ps-theme-default ps-active-x" style="overflow: hidden; width: auto; height: 550px;">
                                    <div id="divsearching_activity" class="row"></div>
                                </div>
                            </div>
                            <div class="tab-pane" id="reminder" role="tabpanel">
                                <div class="lookup lookup-sm lookup-right d-none d-lg-block my-20">
                                    <input type="text" name="s" id="searching_reminder" placeholder="Search" class="w-p100">
                                </div>
                                <div class="chat-box-one-side">
                                    <div id="divsearching_reminder" class="row"></div>
                                </div>
                            </div>
                        </div>
                        <%-- <div class="box-body p-0" style="min-height: 600px;">
                        <div class="lookup lookup-sm lookup-right d-none d-lg-block">
                            <input type="text" id="Reminder_Searching" placeholder="Subject Reminder" class="w-p100">
                        </div>
                        <div id="ListCallReminder" class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 600px;">
                        </div>
                    </div>--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.modal -->
</asp:Content>
