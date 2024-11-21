<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmCampaignDashboard.aspx.vb" Inherits="ICC.TrmCampaignDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="row no-gutters py-2">

                        <div class="col-12 col-lg-3">
                            <div class="box-body br-1 border-light">
                                <div class="flexbox mb-1">
                                    <span>
                                        <i class="mdi mdi-phone font-size-26"></i>
                                        <br>
                                        Total Call
						  </span>
                                    <span class="text-primary font-size-40">845</span>
                                </div>
                                <div class="progress progress-xxs mt-10 mb-0">
                                    <div class="progress-bar" role="progressbar" style="width: 35%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>


                        <div class="col-12 col-lg-3 hidden-down">
                            <div class="box-body br-1 border-light">
                                <div class="flexbox mb-1">
                                    <span>
                                        <i class="mdi mdi-phone-in-talk font-size-26"></i>
                                        <br>
                                        Call Answer 
						  </span>
                                    <span class="text-info font-size-40">952</span>
                                </div>
                                <div class="progress progress-xxs mt-10 mb-0">
                                    <div class="progress-bar bg-info" role="progressbar" style="width: 55%; height: 4px;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>


                        <div class="col-12 col-lg-3 d-none d-lg-block">
                            <div class="box-body br-1 border-light">
                                <div class="flexbox mb-1">
                                    <span>
                                        <i class="mdi mdi-phone-missed font-size-26"></i>
                                        <br>
                                        Not Answered 
						  </span>
                                    <span class="text-warning font-size-40">845</span>
                                </div>
                                <div class="progress progress-xxs mt-10 mb-0">
                                    <div class="progress-bar bg-warning" role="progressbar" style="width: 65%; height: 4px;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>


                        <div class="col-12 col-lg-3 d-none d-lg-block">
                            <div class="box-body">
                                <div class="flexbox mb-1">
                                    <span>
                                        <i class="ion-folder font-size-26"></i>
                                        <br>
                                        Call Pending
						  </span>
                                    <span class="text-danger font-size-40">158</span>
                                </div>
                                <div class="progress progress-xxs mt-10 mb-0">
                                    <div class="progress-bar bg-danger" role="progressbar" style="width: 40%; height: 4px;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-3 col-12">
                <div class="box bg-lightest" id="chat-bx">
                    <div class="box-header bg-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <%--                            <p class="font-size-18 mb-0 d-lg-none d-block"><a href="#" id="cht-btn" class="hover-primary"><i class="fa fa-navicon"></i></a></p>
                            <p class="font-size-18 mb-0"><a href="#" class="hover-primary"><i class="fa fa-comment"></i></a></p>
                            <p class="font-size-18 mb-0"><a href="#" class="hover-primary"><i class="fa fa-phone"></i></a></p>
                            <p class="font-size-18 mb-0"><a href="#" class="hover-primary"><i class="fa fa-envelope"></i></a></p>
                            <p class="font-size-18 mb-0"><a href="#" class="hover-primary"><i class="fa fa-group"></i></a></p>--%>
                            <h4 class="box-title">Data Agent Outbound</h4>
                            <p class="font-size-18 mb-0">
                                <a href="#" class="hover-primary">
                                    <img alt="Profile" src="../images/avatar/1.jpg" class="avatar"></a>
                            </p>
                        </div>
                    </div>
                    <div class="box-body">
                        <%-- <div class="d-flex justify-content-between align-items-center mb-20">
                            <h4 class="box-title">Chats</h4>
                            <p class="font-size-24 mb-0"><a href="#" class="hover-primary"><i class="fa fa-plus-circle"></i></a></p>
                        </div>--%>
                        <ul class="nav nav-tabs customtab nav-justified" role="tablist">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#messages" role="tab">Team</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#group" role="tab">All Agent</a> </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="messages" role="tabpanel">
                                <div class="lookup lookup-sm lookup-right my-20">
                                    <input type="text" name="s" placeholder="Search" class="w-p100">
                                </div>
                                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 510px;">
                                    <div class="chat-box-one-side2" style="overflow: hidden; width: auto; height: 510px;">
                                        <div class="media-list media-list-hover">
                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Mical Clark</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>

                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/3.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Colin Nathan</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>

                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/4.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Nathan Johen</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>

                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/5.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Semi Doe</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>

                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/6.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Mical</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>

                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/7.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Johen Doe</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>

                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Nathan</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>
                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/7.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Johen Doe</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>

                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Nathan</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>
                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/7.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Johen Doe</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>

                                            <div class="media bg-white box-shadowed mb-15">
                                                <a class="align-self-center mr-0" href="#">
                                                    <img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="..."></a>
                                                <div class="media-body">
                                                    <p>
                                                        <a class="hover-primary" href="#"><strong>Nathan</strong></a>
                                                        <span class="float-right font-size-10">10:00pm</span>
                                                    </p>
                                                    <p>Nullam facilisis velit.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="slimScrollBar" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; width: 7px; position: absolute; top: 0px; opacity: 0.05; display: block; border-radius: 7px; z-index: 99; right: 1px; height: 408.32px;"></div>
                                    <div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51) none repeat scroll 0% 0%; opacity: 0.2; z-index: 90; right: 1px;"></div>
                                </div>
                            </div>
                            <div class="tab-pane" id="group" role="tabpanel">
                                <div class="lookup lookup-sm lookup-right d-none d-lg-block my-20">
                                    <input type="text" name="s" placeholder="Search" class="w-p100">
                                </div>
                                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 650px;">
                                    <div class="chat-box-one-side" style="overflow: hidden; width: auto; height: 650px;">
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
                                    <div class="slimScrollBar" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; width: 7px; position: absolute; top: 0px; opacity: 0.05; display: block; border-radius: 7px; z-index: 99; right: 1px;"></div>
                                    <div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51) none repeat scroll 0% 0%; opacity: 0.2; z-index: 90; right: 1px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-9 col-12">
                <div class="row">
                    <%--<div class="col-12">
                        <div class="box">
                            <div class="box-header with-border">
                                <h4 class="box-title">Call Duration Base on Hour</h4>
                            </div>
                            <div class="box-body">
                                <div id="multiple-xy" class="c3" style="max-height: 350px; position: relative;">
                                    <svg style="overflow: hidden;" width="1167.199951171875" height="350px">
                                        <defs>
                                            <clipPath id="c3-1629952747212-clip">
                                                <rect width="1115.199951171875" height="296"></rect>
                                            </clipPath>
                                            <clipPath id="c3-1629952747212-clip-xaxis">
                                                <rect x="-51" y="-20" width="1197.199951171875" height="70"></rect>
                                            </clipPath>
                                            <clipPath id="c3-1629952747212-clip-yaxis">
                                                <rect x="-49" y="-4" width="70" height="320"></rect>
                                            </clipPath>
                                            <clipPath id="c3-1629952747212-clip-grid">
                                                <rect width="1115.199951171875" height="296"></rect>
                                            </clipPath>
                                            <clipPath id="c3-1629952747212-clip-subchart">
                                                <rect width="1115.199951171875"></rect>
                                            </clipPath>
                                        </defs><g transform="translate(50.5,4.5)"><text class="c3-text c3-empty" text-anchor="middle" dominant-baseline="middle" x="557.5999755859375" y="148" style="opacity: 0;"></text>
                                            <rect class="c3-zoom-rect" width="1115.199951171875" height="296" style="opacity: 0;"></rect>
                                            <g clip-path="url(file:///D:/%232021%20Project%20UIDESK/Source%20Code%20Master%20Template/chat-bot-admin-main-file/HTML/main/charts_c3_line.html#c3-1629952747212-clip)" class="c3-regions" style="visibility: visible;"></g>
                                            <g clip-path="url(file:///D:/%232021%20Project%20UIDESK/Source%20Code%20Master%20Template/chat-bot-admin-main-file/HTML/main/charts_c3_line.html#c3-1629952747212-clip-grid)" class="c3-grid" style="visibility: visible;">
                                                <g class="c3-ygrids">
                                                    <line class="c3-ygrid" x1="0" x2="1116" y1="285" y2="285"></line>
                                                    <line class="c3-ygrid" x1="0" x2="1116" y1="253" y2="253"></line>
                                                    <line class="c3-ygrid" x1="0" x2="1116" y1="220" y2="220"></line>
                                                    <line class="c3-ygrid" x1="0" x2="1116" y1="188" y2="188"></line>
                                                    <line class="c3-ygrid" x1="0" x2="1116" y1="155" y2="155"></line>
                                                    <line class="c3-ygrid" x1="0" x2="1116" y1="123" y2="123"></line>
                                                    <line class="c3-ygrid" x1="0" x2="1116" y1="91" y2="91"></line>
                                                    <line class="c3-ygrid" x1="0" x2="1116" y1="58" y2="58"></line>
                                                    <line class="c3-ygrid" x1="0" x2="1116" y1="26" y2="26"></line>
                                                </g>
                                                <g class="c3-xgrid-focus">
                                                    <line class="c3-xgrid-focus" x1="-10" x2="-10" y1="0" y2="296" style="visibility: hidden;"></line>
                                                </g>
                                            </g>
                                            <g clip-path="url(file:///D:/%232021%20Project%20UIDESK/Source%20Code%20Master%20Template/chat-bot-admin-main-file/HTML/main/charts_c3_line.html#c3-1629952747212-clip)" class="c3-chart">
                                                <g class="c3-event-rects c3-event-rects-multiple" style="fill-opacity: 0;">
                                                    <rect x="0" y="0" width="1115.199951171875" height="296" class=" c3-event-rect c3-event-rect"></rect>
                                                </g>
                                                <g class="c3-chart-bars">
                                                    <g class="c3-chart-bar c3-target c3-target-data1" style="pointer-events: none;">
                                                        <g class=" c3-shapes c3-shapes-data1 c3-bars c3-bars-data1" style="cursor: pointer;"></g>
                                                    </g>
                                                    <g class="c3-chart-bar c3-target c3-target-data2" style="pointer-events: none;">
                                                        <g class=" c3-shapes c3-shapes-data2 c3-bars c3-bars-data2" style="cursor: pointer;"></g>
                                                    </g>
                                                </g>
                                                <g class="c3-chart-lines">
                                                    <g class="c3-chart-line c3-target c3-target-data1" style="opacity: 1; pointer-events: none;">
                                                        <g class=" c3-shapes c3-shapes-data1 c3-lines c3-lines-data1">
                                                            <path class=" c3-shape c3-shape c3-line c3-line-data1" style="stroke: rgb(62, 142, 247); opacity: 1;" d="M11,264.94736842105266L210,154.96929824561403L359,219.66228070175436L409,25.583333333333346L608,187.31578947368422L906,122.62280701754385"></path>
                                                        </g>
                                                        <g class=" c3-shapes c3-shapes-data1 c3-areas c3-areas-data1">
                                                            <path class=" c3-shape c3-shape c3-area c3-area-data1" style="fill: rgb(62, 142, 247); opacity: 0.2;" d="M 11 264.94736842105266"></path>
                                                        </g>
                                                        <g class=" c3-selected-circles c3-selected-circles-data1"></g>
                                                        <g class=" c3-shapes c3-shapes-data1 c3-circles c3-circles-data1" style="cursor: pointer;">
                                                            <circle class=" c3-shape c3-shape-0 c3-circle c3-circle-0" r="4" style="fill: rgb(62, 142, 247); opacity: 1;" cx="11" cy="264.94736842105266"></circle>
                                                            <circle class=" c3-shape c3-shape-1 c3-circle c3-circle-1" r="4" style="fill: rgb(62, 142, 247); opacity: 1;" cx="210" cy="154.96929824561403"></circle>
                                                            <circle class=" c3-shape c3-shape-2 c3-circle c3-circle-2" r="4" style="fill: rgb(62, 142, 247); opacity: 1;" cx="359" cy="219.66228070175436"></circle>
                                                            <circle class=" c3-shape c3-shape-3 c3-circle c3-circle-3" r="4" style="fill: rgb(62, 142, 247); opacity: 1;" cx="409" cy="25.583333333333346"></circle>
                                                            <circle class=" c3-shape c3-shape-4 c3-circle c3-circle-4" r="4" style="fill: rgb(62, 142, 247); opacity: 1;" cx="608" cy="187.31578947368422"></circle>
                                                            <circle class=" c3-shape c3-shape-5 c3-circle c3-circle-5" r="4" style="fill: rgb(62, 142, 247); opacity: 1;" cx="906" cy="122.62280701754385"></circle>
                                                        </g>
                                                    </g>
                                                    <g class="c3-chart-line c3-target c3-target-data2" style="opacity: 1; pointer-events: none;">
                                                        <g class=" c3-shapes c3-shapes-data2 c3-lines c3-lines-data2">
                                                            <path class=" c3-shape c3-shape c3-line c3-line-data2" style="stroke: rgb(255, 76, 82); opacity: 1;" d="M210,271.41666666666663L409,167.90789473684208L657,129.09210526315792L906,219.66228070175436L1105,161.43859649122808"></path>
                                                        </g>
                                                        <g class=" c3-shapes c3-shapes-data2 c3-areas c3-areas-data2">
                                                            <path class=" c3-shape c3-shape c3-area c3-area-data2" style="fill: rgb(255, 76, 82); opacity: 0.2;" d="M 210 271.41666666666663"></path>
                                                        </g>
                                                        <g class=" c3-selected-circles c3-selected-circles-data2"></g>
                                                        <g class=" c3-shapes c3-shapes-data2 c3-circles c3-circles-data2" style="cursor: pointer;">
                                                            <circle class=" c3-shape c3-shape-0 c3-circle c3-circle-0" r="4" style="fill: rgb(255, 76, 82); opacity: 1;" cx="210" cy="271.41666666666663"></circle>
                                                            <circle class=" c3-shape c3-shape-1 c3-circle c3-circle-1" r="4" style="fill: rgb(255, 76, 82); opacity: 1;" cx="409" cy="167.90789473684208"></circle>
                                                            <circle class=" c3-shape c3-shape-2 c3-circle c3-circle-2" r="4" style="fill: rgb(255, 76, 82); opacity: 1;" cx="657" cy="129.09210526315792"></circle>
                                                            <circle class=" c3-shape c3-shape-3 c3-circle c3-circle-3" r="4" style="fill: rgb(255, 76, 82); opacity: 1;" cx="906" cy="219.66228070175436"></circle>
                                                            <circle class=" c3-shape c3-shape-4 c3-circle c3-circle-4" r="4" style="fill: rgb(255, 76, 82); opacity: 1;" cx="1105" cy="161.43859649122808"></circle>
                                                        </g>
                                                    </g>
                                                </g>
                                                <g class="c3-chart-arcs" transform="translate(557.5999755859375,143)">
                                                    <text class="c3-chart-arcs-title" style="text-anchor: middle; opacity: 0;"></text>
                                                </g>
                                                <g class="c3-chart-texts">
                                                    <g class="c3-chart-text c3-target c3-target-data1" style="opacity: 1; pointer-events: none;">
                                                        <g class=" c3-texts c3-texts-data1"></g>
                                                    </g>
                                                    <g class="c3-chart-text c3-target c3-target-data2" style="opacity: 1; pointer-events: none;">
                                                        <g class=" c3-texts c3-texts-data2"></g>
                                                    </g>
                                                </g>
                                            </g>
                                            <g clip-path="url(file:///D:/%232021%20Project%20UIDESK/Source%20Code%20Master%20Template/chat-bot-admin-main-file/HTML/main/charts_c3_line.html#c3-1629952747212-clip-grid)" class="c3-grid c3-grid-lines">
                                                <g class="c3-xgrid-lines"></g>
                                                <g class="c3-ygrid-lines"></g>
                                            </g>
                                            <g class="c3-axis c3-axis-x" clip-path="url(file:///D:/%232021%20Project%20UIDESK/Source%20Code%20Master%20Template/chat-bot-admin-main-file/HTML/main/charts_c3_line.html#c3-1629952747212-clip-xaxis)" transform="translate(0,296)" style="visibility: visible; opacity: 1;">
                                                <text class="c3-axis-x-label" transform="" style="text-anchor: end;" x="1115.199951171875" dx="-0.5em" dy="-0.5em"></text>
                                                <g class="tick" style="opacity: 1;" transform="translate(11, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">10</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(210, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">30</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(359, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">45</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(409, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">50</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(608, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">70</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(657, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">75</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(906, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">100</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(1105, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">120</tspan>
                                                    </text>
                                                </g>
                                                <path class="domain" d="M0,6V0H1115.199951171875V6"></path>
                                            </g>
                                            <g class="c3-axis c3-axis-y" clip-path="url(file:///D:/%232021%20Project%20UIDESK/Source%20Code%20Master%20Template/chat-bot-admin-main-file/HTML/main/charts_c3_line.html#c3-1629952747212-clip-yaxis)" transform="translate(0,0)" style="visibility: visible; opacity: 1;">
                                                <text class="c3-axis-y-label" transform="rotate(-90)" style="text-anchor: end;" x="0" dx="-0.5em" dy="1.2em"></text>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,285)">
                                                    <line x2="-6"></line>
                                                    <text x="-9" y="0" style="text-anchor: end;">
                                                        <tspan x="-9" dy="3">0</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,253)">
                                                    <line x2="-6"></line>
                                                    <text x="-9" y="0" style="text-anchor: end;">
                                                        <tspan x="-9" dy="3">50</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,220)">
                                                    <line x2="-6"></line>
                                                    <text x="-9" y="0" style="text-anchor: end;">
                                                        <tspan x="-9" dy="3">100</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,188)">
                                                    <line x2="-6"></line>
                                                    <text x="-9" y="0" style="text-anchor: end;">
                                                        <tspan x="-9" dy="3">150</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,155)">
                                                    <line x2="-6"></line>
                                                    <text x="-9" y="0" style="text-anchor: end;">
                                                        <tspan x="-9" dy="3">200</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,123)">
                                                    <line x2="-6"></line>
                                                    <text x="-9" y="0" style="text-anchor: end;">
                                                        <tspan x="-9" dy="3">250</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,91)">
                                                    <line x2="-6"></line>
                                                    <text x="-9" y="0" style="text-anchor: end;">
                                                        <tspan x="-9" dy="3">300</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,58)">
                                                    <line x2="-6"></line>
                                                    <text x="-9" y="0" style="text-anchor: end;">
                                                        <tspan x="-9" dy="3">350</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,26)">
                                                    <line x2="-6"></line>
                                                    <text x="-9" y="0" style="text-anchor: end;">
                                                        <tspan x="-9" dy="3">400</tspan>
                                                    </text>
                                                </g>
                                                <path class="domain" d="M-6,1H0V296H-6"></path>
                                            </g>
                                            <g class="c3-axis c3-axis-y2" transform="translate(1115.199951171875,0)" style="visibility: hidden; opacity: 1;">
                                                <text class="c3-axis-y2-label" transform="rotate(-90)" style="text-anchor: end;" x="0" dx="-0.5em" dy="-0.5em"></text>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,296)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,267)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0.1</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,237)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0.2</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,208)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0.3</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,178)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0.4</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,149)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0.5</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,119)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0.6</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,90)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0.7</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,60)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0.8</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,31)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">0.9</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(0,1)">
                                                    <line x2="6" y2="0"></line>
                                                    <text x="9" y="0" style="text-anchor: start;">
                                                        <tspan x="9" dy="3">1</tspan>
                                                    </text>
                                                </g>
                                                <path class="domain" d="M6,1H0V296H6"></path>
                                            </g>
                                        </g><g transform="translate(20.5,350.5)" style="visibility: hidden;"><g clip-path="url(file:///D:/%232021%20Project%20UIDESK/Source%20Code%20Master%20Template/chat-bot-admin-main-file/HTML/main/charts_c3_line.html#c3-1629952747212-clip-subchart)" class="c3-chart"><g class="c3-chart-bars"></g>
                                            <g class="c3-chart-lines"></g>
                                        </g>
                                            <g clip-path="url(file:///D:/%232021%20Project%20UIDESK/Source%20Code%20Master%20Template/chat-bot-admin-main-file/HTML/main/charts_c3_line.html#c3-1629952747212-clip)" class="c3-brush" style="pointer-events: all;">
                                                <rect class="background" style="visibility: hidden; cursor: crosshair;" x="0" width="1145.199951171875"></rect>
                                                <rect class="extent" style="cursor: move;" x="0" width="0"></rect>
                                                <g class="resize e" style="cursor: ew-resize; display: none;" transform="translate(0,0)">
                                                    <rect x="-3" width="6" height="6" style="visibility: hidden;"></rect>
                                                </g>
                                                <g class="resize w" style="cursor: ew-resize; display: none;" transform="translate(0,0)">
                                                    <rect x="-3" width="6" height="6" style="visibility: hidden;"></rect>
                                                </g>
                                            </g>
                                            <g class="c3-axis-x" transform="translate(0,0)" clip-path="url(file:///D:/%232021%20Project%20UIDESK/Source%20Code%20Master%20Template/chat-bot-admin-main-file/HTML/main/charts_c3_line.html#c3-1629952747212-clip-xaxis)" style="visibility: hidden; opacity: 1;">
                                                <g class="tick" style="opacity: 1;" transform="translate(11, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">10</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(210, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">30</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(359, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">45</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(409, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">50</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(608, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">70</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(657, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">75</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(906, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">100</tspan>
                                                    </text>
                                                </g>
                                                <g class="tick" style="opacity: 1;" transform="translate(1105, 0)">
                                                    <line x1="0" x2="0" y2="6"></line>
                                                    <text x="0" y="9" transform="" style="text-anchor: middle; display: block;">
                                                        <tspan x="0" dy=".71em" dx="0">120</tspan>
                                                    </text>
                                                </g>
                                                <path class="domain" d="M0,6V0H1115.199951171875V6"></path>
                                            </g>
                                        </g><g transform="translate(0,330)"><g class="c3-legend-item c3-legend-item-data1" style="visibility: visible; cursor: pointer;"><text style="pointer-events: none;" x="545.0499725341797" y="9">data1</text>
                                            <rect class="c3-legend-item-event" style="fill-opacity: 0;" x="531.0499725341797" y="-5" width="57.55000305175781" height="18.933334350585938"></rect>
                                            <line class="c3-legend-item-tile" style="stroke: rgb(62, 142, 247); pointer-events: none;" x1="529.0499725341797" y1="4" x2="539.0499725341797" y2="4" stroke-width="10"></line>
                                        </g>
                                            <g class="c3-legend-item c3-legend-item-data2" style="visibility: visible; cursor: pointer;">
                                                <text style="pointer-events: none;" x="602.5999755859375" y="9">data2</text>
                                                <rect class="c3-legend-item-event" style="fill-opacity: 0;" x="588.5999755859375" y="-5" width="47.55000305175781" height="18.933334350585938"></rect>
                                                <line class="c3-legend-item-tile" style="stroke: rgb(255, 76, 82); pointer-events: none;" x1="586.5999755859375" y1="4" x2="596.5999755859375" y2="4" stroke-width="10"></line>
                                            </g>
                                        </g><text class="c3-title" x="583.5999755859375" y="0"></text></svg>
                                    <div class="c3-tooltip-container" style="position: absolute; pointer-events: none; display: none;"></div>
                                </div>
                            </div>
                        </div>
                    </div>--%>
                    <div class="col-lg-6 col-12">
                        <!-- Extreme responsive configuration -->
                        <div class="box">
                            <div class="box-header with-border">
                                <h4 class="box-title">Call Volume</h4>
                            </div>
                            <div class="box-body">
                                <div class="chart">
                                    <div class="ct-chart-12 h-300">
                                        <svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" class="ct-chart-bar" style="width: 100%; height: 100%;">
                                            <g class="ct-grids">
                                                <line x1="70" x2="70" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="185.64999389648438" x2="185.64999389648438" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="301.29998779296875" x2="301.29998779296875" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="416.9499816894531" x2="416.9499816894531" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line y1="265" y2="265" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="237.22222222222223" y2="237.22222222222223" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="209.44444444444446" y2="209.44444444444446" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="181.66666666666669" y2="181.66666666666669" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="153.88888888888889" y2="153.88888888888889" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="126.11111111111111" y2="126.11111111111111" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="98.33333333333334" y2="98.33333333333334" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="70.55555555555554" y2="70.55555555555554" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="42.77777777777777" y2="42.77777777777777" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="15" y2="15" x1="70" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                            </g><g><g class="ct-series ct-series-a"><line x1="97.82499694824219" x2="97.82499694824219" y1="265" y2="126.11111111111111" class="ct-bar" ct:value="5"></line>
                                                <line x1="213.47499084472656" x2="213.47499084472656" y1="265" y2="153.88888888888889" class="ct-bar" ct:value="4"></line>
                                                <line x1="329.12498474121094" x2="329.12498474121094" y1="265" y2="181.66666666666669" class="ct-bar" ct:value="3"></line>
                                                <line x1="444.7749786376953" x2="444.7749786376953" y1="265" y2="70.55555555555554" class="ct-bar" ct:value="7"></line>
                                            </g>
                                                <g class="ct-series ct-series-b">
                                                    <line x1="112.82499694824219" x2="112.82499694824219" y1="265" y2="181.66666666666669" class="ct-bar" ct:value="3"></line>
                                                    <line x1="228.47499084472656" x2="228.47499084472656" y1="265" y2="209.44444444444446" class="ct-bar" ct:value="2"></line>
                                                    <line x1="344.12498474121094" x2="344.12498474121094" y1="265" y2="15" class="ct-bar" ct:value="9"></line>
                                                    <line x1="459.7749786376953" x2="459.7749786376953" y1="265" y2="126.11111111111111" class="ct-bar" ct:value="5"></line>
                                                </g>
                                                <g class="ct-series ct-series-c">
                                                    <line x1="127.82499694824219" x2="127.82499694824219" y1="265" y2="237.22222222222223" class="ct-bar" ct:value="1"></line>
                                                    <line x1="243.47499084472656" x2="243.47499084472656" y1="265" y2="126.11111111111111" class="ct-bar" ct:value="5"></line>
                                                    <line x1="359.12498474121094" x2="359.12498474121094" y1="265" y2="42.77777777777777" class="ct-bar" ct:value="8"></line>
                                                    <line x1="474.7749786376953" x2="474.7749786376953" y1="265" y2="153.88888888888889" class="ct-bar" ct:value="4"></line>
                                                </g>
                                                <g class="ct-series ct-series-d">
                                                    <line x1="142.8249969482422" x2="142.8249969482422" y1="265" y2="209.44444444444446" class="ct-bar" ct:value="2"></line>
                                                    <line x1="258.47499084472656" x2="258.47499084472656" y1="265" y2="181.66666666666669" class="ct-bar" ct:value="3"></line>
                                                    <line x1="374.12498474121094" x2="374.12498474121094" y1="265" y2="153.88888888888889" class="ct-bar" ct:value="4"></line>
                                                    <line x1="489.7749786376953" x2="489.7749786376953" y1="265" y2="98.33333333333334" class="ct-bar" ct:value="6"></line>
                                                </g>
                                                <g class="ct-series ct-series-e">
                                                    <line x1="157.8249969482422" x2="157.8249969482422" y1="265" y2="153.88888888888889" class="ct-bar" ct:value="4"></line>
                                                    <line x1="273.47499084472656" x2="273.47499084472656" y1="265" y2="237.22222222222223" class="ct-bar" ct:value="1"></line>
                                                    <line x1="389.12498474121094" x2="389.12498474121094" y1="265" y2="209.44444444444446" class="ct-bar" ct:value="2"></line>
                                                    <line x1="504.7749786376953" x2="504.7749786376953" y1="265" y2="237.22222222222223" class="ct-bar" ct:value="1"></line>
                                                </g>
                                            </g><g class="ct-labels"><foreignObject style="overflow: visible;" x="70" y="270" width="115.64999389648438" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 116px; height: 20px;">Quarter 1</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="185.64999389648438" y="270" width="115.64999389648438" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 116px; height: 20px;">Quarter 2</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="301.29998779296875" y="270" width="115.64999389648438" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 116px; height: 20px;">Quarter 3</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="416.9499816894531" y="270" width="115.64999389648438" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 116px; height: 20px;">Quarter 4</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="237.22222222222223" x="10" height="27.77777777777778" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 50px;">0</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="209.44444444444446" x="10" height="27.77777777777778" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 50px;">1</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="181.66666666666669" x="10" height="27.77777777777777" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 50px;">2</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="153.8888888888889" x="10" height="27.777777777777786" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 50px;">3</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="126.11111111111111" x="10" height="27.77777777777777" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 50px;">4</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="98.33333333333334" x="10" height="27.77777777777777" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 50px;">5</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="70.55555555555554" x="10" height="27.7777777777778" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 50px;">6</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="42.77777777777777" x="10" height="27.77777777777777" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 50px;">7</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="15" x="10" height="27.77777777777777" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 50px;">8</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="-15" x="10" height="30" width="50"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 30px; width: 50px;">9</span></foreignObject>
                                            </g></svg>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                        <!-- /.box -->
                    </div>
                    <div class="col-lg-6 col-12">
                        <!-- Line chart with area -->
                        <div class="box">
                            <div class="box-header with-border">
                                <h4 class="box-title">Call Duration</h4>
                            </div>
                            <div class="box-body">
                                <div class="chart">
                                    <div class="ct-chart-4 h-300">
                                        <svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" class="ct-chart-line" style="width: 100%; height: 100%;">
                                            <g class="ct-grids">
                                                <line x1="50" x2="50" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="110.32499694824219" x2="110.32499694824219" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="170.64999389648438" x2="170.64999389648438" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="230.97499084472656" x2="230.97499084472656" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="291.29998779296875" x2="291.29998779296875" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="351.62498474121094" x2="351.62498474121094" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="411.9499816894531" x2="411.9499816894531" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line x1="472.2749786376953" x2="472.2749786376953" y1="15" y2="265" class="ct-grid ct-horizontal"></line>
                                                <line y1="265" y2="265" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="237.22222222222223" y2="237.22222222222223" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="209.44444444444446" y2="209.44444444444446" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="181.66666666666669" y2="181.66666666666669" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="153.88888888888889" y2="153.88888888888889" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="126.11111111111111" y2="126.11111111111111" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="98.33333333333334" y2="98.33333333333334" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="70.55555555555554" y2="70.55555555555554" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="42.77777777777777" y2="42.77777777777777" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                                <line y1="15" y2="15" x1="50" x2="532.5999755859375" class="ct-grid ct-vertical"></line>
                                            </g><g><g class="ct-series ct-series-a"><path d="M50,265L50,126.111C70.108,89.074,90.217,15,110.325,15C130.433,15,150.542,70.556,170.65,70.556C190.758,70.556,210.867,42.778,230.975,42.778C251.083,42.778,271.192,103.889,291.3,126.111C311.408,148.333,331.517,181.667,351.625,181.667C371.733,181.667,391.842,126.111,411.95,126.111C432.058,126.111,452.167,144.63,472.275,153.889L472.275,265Z" class="ct-area"></path>
                                                <path d="M50,126.111C70.108,89.074,90.217,15,110.325,15C130.433,15,150.542,70.556,170.65,70.556C190.758,70.556,210.867,42.778,230.975,42.778C251.083,42.778,271.192,103.889,291.3,126.111C311.408,148.333,331.517,181.667,351.625,181.667C371.733,181.667,391.842,126.111,411.95,126.111C432.058,126.111,452.167,144.63,472.275,153.889" class="ct-line"></path>
                                                <line x1="50" y1="126.11111111111111" x2="50.01" y2="126.11111111111111" class="ct-point" ct:value="5"></line>
                                                <line x1="110.32499694824219" y1="15" x2="110.33499694824219" y2="15" class="ct-point" ct:value="9"></line>
                                                <line x1="170.64999389648438" y1="70.55555555555554" x2="170.65999389648437" y2="70.55555555555554" class="ct-point" ct:value="7"></line>
                                                <line x1="230.97499084472656" y1="42.77777777777777" x2="230.98499084472655" y2="42.77777777777777" class="ct-point" ct:value="8"></line>
                                                <line x1="291.29998779296875" y1="126.11111111111111" x2="291.30998779296874" y2="126.11111111111111" class="ct-point" ct:value="5"></line>
                                                <line x1="351.62498474121094" y1="181.66666666666669" x2="351.6349847412109" y2="181.66666666666669" class="ct-point" ct:value="3"></line>
                                                <line x1="411.9499816894531" y1="126.11111111111111" x2="411.9599816894531" y2="126.11111111111111" class="ct-point" ct:value="5"></line>
                                                <line x1="472.2749786376953" y1="153.88888888888889" x2="472.2849786376953" y2="153.88888888888889" class="ct-point" ct:value="4"></line>
                                            </g>
                                            </g><g class="ct-labels"><foreignObject style="overflow: visible;" x="50" y="270" width="60.32499694824219" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 60px; height: 20px;">1</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="110.32499694824219" y="270" width="60.32499694824219" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 60px; height: 20px;">2</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="170.64999389648438" y="270" width="60.32499694824219" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 60px; height: 20px;">3</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="230.97499084472656" y="270" width="60.32499694824219" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 60px; height: 20px;">4</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="291.29998779296875" y="270" width="60.32499694824219" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 60px; height: 20px;">5</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="351.62498474121094" y="270" width="60.32499694824219" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 60px; height: 20px;">6</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="411.9499816894531" y="270" width="60.32499694824219" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 60px; height: 20px;">7</span></foreignObject>
                                                <foreignObject style="overflow: visible;" x="472.2749786376953" y="270" width="60.32499694824219" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 60px; height: 20px;">8</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="237.22222222222223" x="10" height="27.77777777777778" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 30px;">0</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="209.44444444444446" x="10" height="27.77777777777778" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 30px;">1</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="181.66666666666669" x="10" height="27.77777777777777" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 30px;">2</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="153.8888888888889" x="10" height="27.777777777777786" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 30px;">3</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="126.11111111111111" x="10" height="27.77777777777777" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 30px;">4</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="98.33333333333334" x="10" height="27.77777777777777" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 30px;">5</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="70.55555555555554" x="10" height="27.7777777777778" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 30px;">6</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="42.77777777777777" x="10" height="27.77777777777777" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 30px;">7</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="15" x="10" height="27.77777777777777" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 28px; width: 30px;">8</span></foreignObject>
                                                <foreignObject style="overflow: visible;" y="-15" x="10" height="30" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 30px; width: 30px;">9</span></foreignObject>
                                            </g></svg>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                        <!-- /.box -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="box">
                            <div class="box-header with-border">
                                <h4 class="box-title">Responsive Hover Table</h4>
                                <div class="box-controls pull-right">
                                    <div class="lookup lookup-circle lookup-right">
                                        <input type="text" name="s">
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body no-padding">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <tbody>
                                            <tr>
                                                <th>Invoice</th>
                                                <th>User</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Country</th>
                                            </tr>
                                            <tr>
                                                <td><a href="javascript:void(0)">Order #123456</a></td>
                                                <td>Lorem Ipsum</td>
                                                <td><span class="text-muted"><i class="fa fa-clock-o"></i>Oct 16, 2017</span> </td>
                                                <td>$158.00</td>
                                                <td><span class="badge badge-pill badge-danger">Pending</span></td>
                                                <td>CH</td>
                                            </tr>
                                            <tr>
                                                <td><a href="javascript:void(0)">Order #458789</a></td>
                                                <td>Lorem Ipsum</td>
                                                <td><span class="text-muted"><i class="fa fa-clock-o"></i>Oct 16, 2017</span> </td>
                                                <td>$55.00</td>
                                                <td><span class="badge badge-pill badge-warning">Shipped</span></td>
                                                <td>US</td>
                                            </tr>
                                            <tr>
                                                <td><a href="javascript:void(0)">Order #84532</a></td>
                                                <td>Lorem Ipsum</td>
                                                <td><span class="text-muted"><i class="fa fa-clock-o"></i>Oct 16, 2017</span> </td>
                                                <td>$845.00</td>
                                                <td><span class="badge badge-pill badge-danger">Prossing</span></td>
                                                <td>IG</td>
                                            </tr>
                                            <tr>
                                                <td><a href="javascript:void(0)">Order #48956</a></td>
                                                <td>Lorem Ipsum</td>
                                                <td><span class="text-muted"><i class="fa fa-clock-o"></i>Oct 16, 2017</span> </td>
                                                <td>$145.00</td>
                                                <td><span class="badge badge-pill badge-success">Paid</span></td>
                                                <td>EN</td>
                                            </tr>
                                            <tr>
                                                <td><a href="javascript:void(0)">Order #92154</a></td>
                                                <td>Lorem Ipsum</td>
                                                <td><span class="text-muted"><i class="fa fa-clock-o"></i>Oct 16, 2017</span> </td>
                                                <td>$450.00</td>
                                                <td><span class="badge badge-pill badge-warning">Shipped</span></td>
                                                <td>UK</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                        <!-- /.box -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <%--        <!-- Vendor JS -->
	<script src="js/vendors.min.js"></script>
	<script src="js/pages/chat-popup.js"></script>
    
	<script src="../assets/vendor_components/jquery.peity/jquery.peity.js"></script>
	<script src="../assets/vendor_components/easypiechart/dist/jquery.easypiechart.js"></script>
	<script src="../assets/vendor_components/chart.js-master/Chart.min.js"></script>
	<script src="../assets/vendor_components/d3/d3.min.js"></script>
	<script src="../assets/vendor_components/d3/d3_tooltip.js"></script>
    
	<!-- Chat Bot Admin App -->
	<script src="js/template.js"></script>
	<script src="js/demo.js"></script>
	<script src="js/pages/chart-widgets.js"></script>
    <script src="js/pages/chartjs-int.js"></script>--%>
</asp:Content>
