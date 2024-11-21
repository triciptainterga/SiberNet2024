<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_Channel_Sosmed_Analytic.aspx.vb" Inherits="ICC._3_Channel_Sosmed_Analytic" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/3_Channel_Sosmed_Analytic.js"></script>
    <script src="../assets/vendor_components/c3/d3.min.js"></script>
    <script src="../assets/vendor_components/c3/c3.min.js"></script>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/pages/c3-data.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Content Wrapper. Contains page content -->
    <div class="content">
        <div class="container-full">
            <!-- left content -->
            <section class="left-block content">
                <a class="mdi mdi-close mdi-menu btn btn-success open-left-block d-block d-md-none" href="javascript:void(0)"></a>
                <div class="scrollable" style="height: 100%;">
                    <div class="left-content-area">
                        <div class="h-p100">

                            <%--<div class="p-20">
						<a href="mailbox_compose.html" class="btn btn-rounded btn-success btn-block">Compose</a>
					  </div>--%>

                            <div class="box mb-0 no-shadow bg-transparent b-0">
                                <div class="box-header with-border p-20">
                                    <h4 class="box-title">Data Analytic</h4>
                                    <ul class="box-controls pull-right">
                                        <li class="dropdown">
                                            <a data-toggle="dropdown" href="#"><i class="mdi mdi-settings"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item" href="#">
                                                    <img src="avail.png" />
                                                    Available</a>
                                                <a class="dropdown-item" href="#">
                                                    <img src="away.png" />
                                                    Away</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="box-body mailbox-nav p-20">
                                    <!-- /. box -->
                                    <div class="box no-shadow bg-transparent b-0">
                                        <div class="box-header with-border p-0">
                                            <h4 class="box-title">
                                                <img src="chatting.png" width="32" />
                                                Campaign Data</h4>
                                        </div>
                                        <div class="box-body mailbox-nav p-0">
                                            <ul class="nav nav-pills flex-column">
                                                <li class="nav-item"><a class="nav-link" href="?flagto=FB">
                                                    <img src="fbicon_off.png" width="24" />
                                                    Facebook</a></li>
                                                <li class="nav-item"><a class="nav-link" href="?flagto=IG">
                                                    <img src="igicon_off.png" width="24" />
                                                    Instagram</a></li>
                                                <li class="nav-item"><a class="nav-link" href="?flagto=msg">
                                                    <img src="twicon_off.png" width="24" />
                                                    Twitter</a></li>
                                            </ul>
                                        </div>
                                        <!-- /.box-body -->
                                    </div>

                                    <!-- /.box -->


                                </div>
                                <!-- /.box-body -->
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <!-- /.left content -->

            <!-- right content -->
            <section class="right-block content">

                <div class="row" id="commentsDiv">
                    <div class="col-lg-3 col-12">
                        <div class="box bg-lightest" id="chat-bx">

                            <div class="box-body">

                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div class="tab-pane active" id="messages" role="tabpanel">

                                        <div class="chat-box-one-side2">
                                            <div class="media-list media-list-hover">
                                                <!-- GetLIST Social Media Inbox -->

                                                <div id="HTMLresultListInboxSocialMedia"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="contacts" role="tabpanel">
                                        <div class="lookup lookup-sm lookup-right d-none d-lg-block my-20">
                                            <input type="text" name="s" placeholder="Search" class="w-p100">
                                        </div>
                                        <div class="chat-box-one-side">
                                            <div class="media-list media-list-hover">
                                                <div class="media py-10 px-0 align-items-center">
                                                    <a class="avatar avatar-lg status-success" href="#">
                                                        <img src="../images/avatar/1.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#">Sarah Kortney</a>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0 align-items-center">
                                                    <a class="avatar avatar-lg status-danger" href="#">
                                                        <img src="../images/avatar/2.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#">Tommy Nash</a>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0 align-items-center">
                                                    <a class="avatar avatar-lg status-warning" href="#">
                                                        <img src="../images/avatar/3.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#">Kathryn Mengel</a>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0 align-items-center">
                                                    <a class="avatar avatar-lg status-primary" href="#">
                                                        <img src="../images/avatar/4.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#">Mayra Sibley</a>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0 align-items-center">
                                                    <a class="avatar avatar-lg status-success" href="#">
                                                        <img src="../images/avatar/1.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#">Tommy Nash</a>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0 align-items-center">
                                                    <a class="avatar avatar-lg status-danger" href="#">
                                                        <img src="../images/avatar/2.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#">Williemae Lagasse</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="group" role="tabpanel">
                                        <div class="lookup lookup-sm lookup-right d-none d-lg-block my-20">
                                            <input type="text" name="s" placeholder="Search" class="w-p100">
                                        </div>
                                        <div class="chat-box-one-side">
                                            <div class="media-list media-list-hover">
                                                <div class="media py-10 px-0">
                                                    <a class="avatar avatar-lg status-success" href="#">
                                                        <img src="../images/avatar/1.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#"><strong>Tyler</strong></a>
                                                        </p>
                                                        <p>Praesent tristique diam...</p>
                                                        <span>Just now</span>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0">
                                                    <a class="avatar avatar-lg status-danger" href="#">
                                                        <img src="../images/avatar/2.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#"><strong>Luke</strong></a>
                                                        </p>
                                                        <p>Cras tempor diam ...</p>
                                                        <span>33 min ago</span>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0">
                                                    <a class="avatar avatar-lg status-warning" href="#">
                                                        <img src="../images/avatar/3.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#"><strong>Evan</strong></a>
                                                        </p>
                                                        <p>In posuere tortor vel...</p>
                                                        <span>42 min ago</span>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0">
                                                    <a class="avatar avatar-lg status-primary" href="#">
                                                        <img src="../images/avatar/4.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#"><strong>Evan</strong></a>
                                                        </p>
                                                        <p>In posuere tortor vel...</p>
                                                        <span>42 min ago</span>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0">
                                                    <a class="avatar avatar-lg status-success" href="#">
                                                        <img src="../images/avatar/1.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#"><strong>Tyler</strong></a>
                                                        </p>
                                                        <p>Praesent tristique diam...</p>
                                                        <span>Just now</span>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0">
                                                    <a class="avatar avatar-lg status-danger" href="#">
                                                        <img src="../images/avatar/2.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#"><strong>Luke</strong></a>
                                                        </p>
                                                        <p>Cras tempor diam ...</p>
                                                        <span>33 min ago</span>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0">
                                                    <a class="avatar avatar-lg status-warning" href="#">
                                                        <img src="../images/avatar/3.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#"><strong>Evan</strong></a>
                                                        </p>
                                                        <p>In posuere tortor vel...</p>
                                                        <span>42 min ago</span>
                                                    </div>
                                                </div>

                                                <div class="media py-10 px-0">
                                                    <a class="avatar avatar-lg status-primary" href="#">
                                                        <img src="../images/avatar/4.jpg" alt="...">
                                                    </a>
                                                    <div class="media-body">
                                                        <p class="font-size-16">
                                                            <a class="hover-primary" href="#"><strong>Evan</strong></a>
                                                        </p>
                                                        <p>In posuere tortor vel...</p>
                                                        <span>42 min ago</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 col-12">
                        <div class="row">
                            <div class="col-lg-12 col-12">
                                <div class="box">
                                    <div class="box-header">
                                        <div id="HTMLcontent_header_inbox"></div>
                                    </div>

                                    <div class="box-body mb-30">
                                        <!-- Loader -->
                                        <center>
                                            <div class="spin2" id="LoaderPage"></div>
                                        </center>
                                        <!--End-->
                                        <div class="chat-box-one">

                                            <div class="col-lg-12">
                                                <div class="box">
                                                    <!-- Header Post-->
                                                    <div id="HTMLcontent_inbox">
                                                    </div>
                                                    <!--End Header Post-->
                                                    <!-- Comment #1-->
                                                    <div id="HTMLcontent_inboxComment">
                                                    </div>
                                                    <!-- End Comment #1-->
                                                    <!-- Comment Reply #1-->

                                                    <!-- End Comment Reply #1-->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-footer">
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
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-4 col-12">
                        <div class="box">
                            <div class="box-header with-border">
                                <h4 class="box-title">Hashtags Summary</h4>
                            </div>
                            <div class="box-body">
                                <div id="data-post-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="messagesDiv">
                    <div class="col-lg-3 col-12">
                        <div class="box bg-lightest" id="msg-bx">
                            <div class="box">
                                <div class="box-body">
                                    <h4 class="text-center">Users</h4>
                                    <div class="lookup lookup-sm lookup-right d-none d-lg-block my-20">
                                        <input type="text" name="s" placeholder="Search" class="w-p100">
                                    </div>
                                    <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 650px;">
                                        <div class="chat-box-one-side" style="overflow: hidden; width: auto; height: 650px;">
                                            <div class="media-list media-list-hover">
                                                <div id="HTMLcontent_listuser_inbox"></div>

                                                <%--<div class="media py-10 px-0 align-items-center">
					                          <a class="avatar avatar-lg status-danger" href="#">
						                        <img src="../images/avatar/2.jpg" alt="...">
					                          </a>
					                          <div class="media-body">
						                        <p class="font-size-16">
						                          <a class="hover-primary" href="#">Williemae Lagasse</a>
						                        </p>
					                          </div>
					                          <div class="media-right">
						                        <span class="badge badge-warning badge-pill">4</span>
					                          </div>
					                        </div>--%>
                                            </div>
                                        </div>
                                        <div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 0px; opacity: 0.05; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 650px;"></div>
                                        <div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12">
                        <div class="box">
                            <div class="box-header">

                                <div id="HTMLcontent_header_inboxMessage"></div>
                            </div>


                            <!-- Loader -->
                            <center>
                                <div class="spin2" id="LoaderPageChat"></div>
                            </center>
                            <!--End-->
                            <!-- Header Post-->
                            <div class="box-body mb-30">
                                <div class="chat-box-one">
                                    <div id="HTMLcontent_inboxMessage">
                                    </div>
                                </div>
                            </div>
                            <!--End Header Post-->
                            <!-- Comment #1-->
                            <div id="HTMLcontent_inboxCommentMessage">
                            </div>

                            <!-- End Comment #1-->
                            <!-- Comment Reply #1-->

                            <!-- End Comment Reply #1-->


                            <div class="box-footer">
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
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-12">
                        <!-- Profile Messages #1-->
                        <div id="HTMLcontent_inboxCommentMessageProfile">
                        </div>
                        <!-- End Profile Messages #1-->
                    </div>
                </div>
                <!-- /. box -->

            </section>
            <!-- /.right content -->
        </div>
    </div>
    <!-- /.content-wrapper -->
</asp:Content>
