<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmCallCampaign.aspx.vb" Inherits="ICC.TrmCallCampaign" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        function resizeIframe(obj) {
            obj.style.height = 0;
            obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        }
    </script>
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <%--<script src="js/TrmCallCampaign.js"></script>--%> 
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
                                <h6 class="widget-user-desc text-white">Agent Outbound</h6>
                            </div>
                            <div class="widget-user-image">
                                <img class="rounded-circle" src="../images/user3-128x128.jpg" alt="User Avatar">
                            </div>
                            <div class="box-footer">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="description-block">
                                            <h5 class="description-header">100</h5>
                                            <span class="description-text">GOOD</span>
                                        </div>
                                        <!-- /.description-block -->
                                    </div>
                                    <!-- /.col -->
                                    <div class="col-sm-4 br-1 bl-1">
                                        <div class="description-block">
                                            <h5 class="description-header">550</h5>
                                            <span class="description-text">AVERAGE</span>
                                        </div>
                                        <!-- /.description-block -->
                                    </div>
                                    <!-- /.col -->
                                    <div class="col-sm-4">
                                        <div class="description-block">
                                            <h5 class="description-header">158</h5>
                                            <span class="description-text">BAD</span>
                                        </div>
                                        <!-- /.description-block -->
                                    </div>
                                    <!-- /.col -->
                                </div>
                                <!-- /.row -->
                            </div>
                        </div>
                        <!-- /.widget-user -->
                        <div class="box">
                            <div class="box-header with-border">
                                <h5 class="box-title">Outbound share per status</h5>
                                <div class="box-tools pull-right">
                                    <ul class="card-controls">
                                        <li class="dropdown">
                                            <a data-toggle="dropdown" href="#"><i class="ion-android-more-vertical"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item active" href="#">Today</a>
                                                <a class="dropdown-item" href="#">Yesterday</a>
                                            </div>
                                        </li>
                                        <%--                                                <li><a href="" class="link card-btn-reload" data-toggle="tooltip" title="" data-original-title="Refresh"><i class="fa fa-circle-thin"></i></a></li>--%>
                                    </ul>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="text-center pb-25">
                                    <div class="donut" data-peity='{ "fill": ["#fc4b6c", "#ffb22b", "#398bf7"], "radius": 70, "innerRadius": 28  }'>9,6,5</div>
                                </div>
                                <div id="divOutboundStatus"></div>
                                <%--<ul class="list-inline">
                                            <li class="flexbox mb-5">
                                                <div>
                                                    <span class="badge badge-dot badge-lg mr-1" style="background-color: #fc4b6c"></span>
                                                    <span>New</span>
                                                </div>
                                                <div>3</div>
                                            </li>
                                            <li class="flexbox mb-5">
                                                <div>
                                                    <span class="badge badge-dot badge-lg mr-1" style="background-color: #ffb22b"></span>
                                                    <span>Pending</span>
                                                </div>
                                                <div>1</div>
                                            </li>
                                            <li class="flexbox">
                                                <div>
                                                    <span class="badge badge-dot badge-lg mr-1" style="background-color: #398bf7"></span>
                                                    <span>Complete</span>
                                                </div>
                                                <div>1</div>
                                            </li>
                                        </ul>--%>
                            </div>
                        </div>
                        <div class="box">
                            <div class="box-header with-border">
                                <h5 class="box-title">Outbound share per agent</h5>
                                <div class="box-tools pull-right">
                                    <ul class="card-controls">
                                        <li class="dropdown">
                                            <a data-toggle="dropdown" href="#"><i class="ion-android-more-vertical"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item active" href="#">Today</a>
                                                <a class="dropdown-item" href="#">Yesterday</a>
                                                <%--  <a class="dropdown-item" href="#">Last week</a>
                                                        <a class="dropdown-item" href="#">Last month</a>--%>
                                            </div>
                                        </li>
                                        <%--<li><a href="" class="link card-btn-reload" data-toggle="tooltip" title="" data-original-title="Refresh"><i class="fa fa-circle-thin"></i></a></li>--%>
                                    </ul>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="flexbox mt-10">
                                    <div class="bar" data-peity='{ "fill": ["#666EE8", "#1E9FF2", "#28D094", "#FF4961", "#FF9149"], "height": 150, "width": 120, "padding":0.2 }'>5,7,8,3,2</div>
                                    <div id="divOutboundAgent"></div>
                                    <%--<ul class="list-inline align-self-end text-muted text-right mb-0">
                                                <li>Jorden <span class="badge badge-primary ml-2">5</span></li>
                                                <li>Benjamin <span class="badge badge-info ml-2">7</span></li>
                                                <li>Elijah <span class="badge badge-success ml-2">8</span></li>
                                                <li>Chloe <span class="badge badge-danger ml-2">3</span></li>
                                                <li>Daniel <span class="badge badge-warning ml-2">2</span></li>
                                            </ul>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-12">
                <div class="row">
                    <div class="col-12">
                        <div class="box">
                            <div class="row no-gutters py-2">

                                <div class="col-12 col-lg-3">
                                    <div class="box-body br-1 border-light">
                                        <div class="flexbox mb-1">
                                            <span>
                                                <i class="mdi mdi-phone font-size-26"></i>
                                                <br>
                                                Calls Today
                                            </span>
                                            <span class="text-primary font-size-30">845</span>
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
                                                Answered Calls
                                            </span>
                                            <span class="text-info font-size-30">952</span>
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
                                            <span class="text-warning font-size-30">845</span>
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
                                                <i class="mdi mdi-timer font-size-26"></i>
                                                <br>
                                                AHT
                                            </span>
                                            <span class="text-danger font-size-30">00:18:51</span>
                                        </div>
                                        <div class="progress progress-xxs mt-10 mb-0">
                                            <div class="progress-bar bg-danger" role="progressbar" style="width: 40%; height: 4px;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
                <div class="box box-default">
                    <div class="box-body">
                        <!-- Nav tabs -->
                        <div>
                            <a href="#" data-toggle="modal" data-target="#modal-right" class="btn btn-rounded btn-warning pull-right" onclick="AddCampaignName()"><i class="si-magnifier si"></i>&nbsp;Searching Campaign</a>
                        </div>
                        <ul class="nav nav-pills mb-20">
                            <li class=" nav-item"><a href="#navpills-1" class="nav-link active" data-toggle="tab" aria-expanded="false">Outbound List</a> </li>
                            <%--<li class="nav-item"><a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="false">My Activity</a> </li>--%>
                            <li class="nav-item"><a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true">Reminder List</a> </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div id="navpills-1" class="tab-pane active">
                                <div class="row">
                                    <div class="box-body p-0">
                                        <div class="table-responsive">
                                            <table id="TrmCallCampaign" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Channel Account</th>
                                                        <th>Campaign Name</th>
                                                        <th>Channel</th>
                                                        <th>Status</th>
                                                        <th style="width: 150px;">Date Create</th>
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
                            <%--<div id="navpills-2" class="tab-pane">
                                        <div class="row">
                                            <div class="box-body p-0">
                                                <div class="table-responsive">
                                                    <table id="Table1" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>First Name</th>
                                                                <th>Last Name</th>
                                                                <th>Time Stamp</th>
                                                                <th>Status</th>
                                                                <th>Response</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-warning">New</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-warning">New</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-warning">New</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-danger">Pending</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>
                                                            <tr>
                                                                <td>5</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>--%>
                            <div id="navpills-3" class="tab-pane">
                                <div class="row">
                                    <div class="box-body p-0">
                                        <div class="table-responsive">
                                            <table id="TrmReminder" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Account</th>
                                                        <th style="width: 150px;">Campaign Name</th>
                                                        <th style="width: 150px;">Subject</th>
                                                        <th style="width: 250px;">Description</th>
                                                        <th style="width: 150px;">Reminder Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box">
                </div>
            </div>
        </div>
        <!-- /.row -->
    </section>

    <!-- Modal -->
    <div class="modal modal-right fade" id="modal-right" tabindex="-1">
        <div class="modal-dialog" style="position: fixed;">
            <div class="modal-content">
                <%--  <div class="modal-header">
                    <h5 class="modal-title">Campaign Name</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>--%>
                <div class="modal-body">
                    <div class="box-body p-0" style="min-height: 500px;">
                        <div class="lookup lookup-sm lookup-right d-none d-lg-block">
                            <input type="text" id="TxtSearchingCampaignName" placeholder="Search Campaign Name" class="w-p100">
                        </div>
                        <div id="ListCallCampaigns" class="media-list media-list-hover media-list-divided inner-user-div" style="overflow: hidden; width: auto; height: 500px;">
                        </div>
                        <hr />
                        <div class="lookup lookup-sm lookup-right d-none d-lg-block">
                            <input type="text" id="TxtSearchingChannel" placeholder="Search Account Outbound" class="w-p100">
                        </div>
                        <div id="listCallChannel" class="media-list media-list-hover media-list-divided inner-user-div" style="overflow: hidden; width: auto; height: 500px;">
                            <hr />
                        </div>
                    </div>
                </div>
                <%-- <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                </div>--%>
            </div>
        </div>
    </div>
    <!-- /.modal -->
</asp:Content>
