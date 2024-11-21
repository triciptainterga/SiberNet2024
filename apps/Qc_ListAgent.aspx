<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Qc_ListAgent.aspx.vb" Inherits="ICC.Qc_ListAgent" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        function comment() {
            $("#modal-center").modal('show');
        }
        function videoGuide() {
            $("#modal-guide").modal('show');
        }
        function playMedia() {
            $("#modal-video").modal('show');
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content">
        <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="d-flex align-items-center">
                    <div class="w-p100 d-md-flex align-items-center justify-content-between">
                        <h3 class="page-title">List of agent evaluation</h3>
                        <div class="d-inline-block align-items-center">
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="2_taskboard.aspx"><i class="mdi mdi-home-outline"></i></a></li>
                                    <li class="breadcrumb-item" aria-current="page">Home</li>
                                    <li class="breadcrumb-item active" aria-current="page">Evaluation</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Main content -->
            <section class="content">

                <div class="row">
                    <div class="col-xl-3 col-lg-4 col-12">
                        <div class="row">
                            <div class="col-12">
                                <!-- Widget: user widget style 1 -->
                                <div class="box box-widget widget-user">
                                    <!-- Add the bg color to the header using any of the bg-* classes -->
                                    <div class="widget-user-header bg-primary" data-overlay="5">
                                        <h3 class="widget-user-username text-white">John Doe</h3>
                                        <h6 class="widget-user-desc text-white">Agent</h6>
                                    </div>
                                    <div class="widget-user-image">
                                        <img class="rounded-circle" src="../images/user3-128x128.jpg" alt="User Avatar"><i style="color:red;" class="mdi mdi-arrow-down-bold-circle font-size-26"></i>
                                    </div>
                                    <div class="box-footer">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="description-block">
                                                    <h5 class="description-header">10</h5>
                                                    <span class="description-text">GOOD</span>
                                                </div>
                                                <!-- /.description-block -->
                                            </div>
                                            <!-- /.col -->
                                            <div class="col-sm-4 br-1 bl-1">
                                                <div class="description-block">
                                                    <h5 class="description-header">5</h5>
                                                    <span class="description-text">AVERAGE</span>
                                                </div>
                                                <!-- /.description-block -->
                                            </div>
                                            <!-- /.col -->
                                            <div class="col-sm-4">
                                                <div class="description-block">
                                                    <h5 class="description-header">20</h5>
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
                                
                                




                            </div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-8 col-12">
                        <div class="row">
                            <div class="col-12">
                                <div class="box">
                                    <div class="row no-gutters py-2">

                                        <div class="col-12 col-lg-6">
                                            <div class="box-body br-1 border-light">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i style="color:green;" class="mdi mdi-arrow-up-bold-circle font-size-26"></i>
                                                        <br>
                                                        LAST MONTH
                                                    </span>
                                                    <span class="text-primary font-size-30">87%</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar" role="progressbar" style="width: 87%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-12 col-lg-6 hidden-down">
                                            <div class="box-body br-1 border-light">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i style="color:red;" class="mdi mdi-arrow-down-bold-circle font-size-26"></i>
                                                        <br>
                                                        On GOING
                                                    </span>
                                                    <span class="text-info font-size-30">83%</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar bg-info" role="progressbar" style="width: 83%; height: 4px;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
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
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Start date</label>
                                            <input class="form-control" type="date" id="filter_DateofTransaction">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>End date</label>
                                            <input class="form-control" type="date" id="filter_DateofTransaction">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>&nbsp;</label>
                                            <br />
                                            <a href="Qc_List.aspx" class="btn btn-rounded btn-danger">Get History Data</a>
                                        </div>
                                    </div>
                                     
                                </div>
                                <!-- Nav tabs -->
                                <ul class="nav nav-pills mb-20">
                                    
                                    <li class="nav-item"><a onclick="videoGuide()" class="nav-link active" data-toggle="tab" aria-expanded="false">Video Guidance</a> </li>
                                   
                                </ul>
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div id="navpills-1" class="tab-pane">
                                        <div class="row">
                                            <%--<div class="box-header with-border">						
							                <h6 class="box-title">Campaign Test Name List</h6>
							                <h6 class="box-subtitle">List of outbound customers</h6>
						                </div>--%>
                                            <div class="box-body p-0">
                                                <div class="row">
		<div class="col-12">
			<div class="box">
				
				<!-- /.box-header -->
				<div class="box-body no-padding">
					<div class="table-responsive">
						<table class="table table-hover">
							<tbody>
								<tr class="rounded p-50 mb-30">
									<th></th>
									<th style="width: 300px; text-align: left;">Username</th>
									<th style="width: 100px; text-align: center;">Group</th>
									<th style="text-align: left;">Date Recorded</th>
									<th style="text-align: center;">Action</th>
								</tr>
								
								<tr>
									<td style="width: 50px;">1</td>
									<td style="width: 300px;">John Doe</td>
									<td style="width: 100px; text-align: center;">Group A</td>
									<td style="width: 200px;">
										21-08-2021 09-01 WIB
									</td>
									<td style="text-align: center;color:white"><span class="badge badge-pill badge-danger"><a href="Qc_Trx.aspx" style="color:white">Evaluation</a></span></td>
								</tr>
								<tr>
									<td style="width: 50px;">2</td>
									<td style="width: 300px;">John Doe</td>
									<td style="width: 100px; text-align: center;">Group B</td>
									<td style="width: 200px;">
										21-08-2021 09-01 WIB
									</td>
									<td style="text-align: center;"><span class="badge badge-pill badge-danger"><a href="Qc_Trx.aspx" style="color:white">Evaluation</a></span></td>
								</tr>
								<tr>
									<td style="width: 50px;">3</td>
									<td style="width: 300px;">John Doe</td>
									<td style="width: 100px; text-align: center;">Group C</td>
									<td style="width: 200px;">
										21-08-2021 09-01 WIB
									</td>
									<td style="text-align: center;"><span class="badge badge-pill badge-danger"><a href="Qc_Trx.aspx" style="color:white">Evaluation</a></span></td>
								</tr>
								<tr>
									<td style="width: 50px;">4</td>
									<td style="width: 300px;">John Doe</td>
									<td style="width: 100px; text-align: center;">Group D</td>
									<td style="width: 200px;">
									   21-08-2021 09-01 WIB
									</td>
									<td style="text-align: center;"><span class="badge badge-pill badge-danger"><a href="Qc_Trx.aspx" style="color:white">Evaluation</a></span></td>
								</tr>
							</tbody>
							
						</table>
					</div>
				</div>
				<!-- /.box-body -->
			</div>
		</div>
	</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-2" class="tab-pane active">
                                        <div class="row">
                                            <%--<div class="box-header with-border">						
							                <h6 class="box-title">Campaign Test Name List</h6>
							                <h6 class="box-subtitle">List of outbound customers</h6>
						                </div>--%>
                                            <div class="box-body p-0">
                                                <div class="table-responsive">
                                                    <table id="tickets" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
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
                                                                    John Doe <img onclick="playMedia()" src="../Images/icon/play-icon.png" width="24"/>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td><a href="#" onclick="comment()">Remarks dari SPV</a></td>

                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>
                                                                    John Doe <img onclick="playMedia()" src="../Images/icon/play-icon.png" width="24"/>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                               <td><span class="badge badge-success">Complete</span> </td>
                                                                <td><a href="#" onclick="comment()">Remarks dari SPV</a></td>

                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>
                                                                    John Doe <img onclick="playMedia()" src="../Images/icon/play-icon.png" width="24"/>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td><a href="#" onclick="comment()">Remarks dari SPV</a></td>

                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>
                                                                    John Doe <img onclick="playMedia()" src="../Images/icon/play-icon.png" width="24"/>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td><a href="#" onclick="comment()">Remarks dari SPV</a></td>

                                                            </tr>
                                                            <tr>
                                                                <td>5</td>
                                                                <td>
                                                                    John Doe <img onclick="playMedia()" src="../Images/icon/play-icon.png" width="24"/>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td><a href="#" onclick="comment()">Remarks dari SPV</a></td>

                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-3" class="tab-pane">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <img src="../images/card/img3.jpg" class="img-fluid" alt="">
                                            </div>
                                            <div class="col-md-10">
                                                <div class="box-body p-0">
                                                    <div class="table-responsive">
                                                        <table id="tickets" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                                                            <thead>
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>First Name</th>
                                                                    <th>Campaign</th>
                                                                    <th>Time Stamp</th>
                                                                    <th>Status</th>
                                                                    <th>Response</th>
                                                                    <th>Call</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>
                                                                        John Doe
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-warning">New</span> </td>
                                                                    <td>Customer meminta di Callback karena sedang meeting</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>
                                                                        John Doe
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-warning">New</span> </td>
                                                                    <td>Customer meminta di Callback karena sedang diperjalanan</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>
                                                                        John Doe
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-warning">New</span> </td>
                                                                    <td>Customer meminta di Callback karena sedang tidur</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>
                                                                        John Doe
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-danger">Pending</span> </td>
                                                                    <td>Remarks dari SPV</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>
                                                                        John Doe
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-success">Complete</span> </td>
                                                                    <td>Remarks dari SPV</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <!-- /.row -->

            </section>
            <!-- /.content -->
        </div>
    </div>
       <div class="modal center-modal fade show" id="modal-center" tabindex="-1" aria-modal="true">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 900px; margin-left: -200px;">
                <div class="modal-header">
                    <h5 class="modal-title">History Remarks</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12">
                                <%--<textarea style="height: 190px; width: 100%;"></textarea>--%>
                                <textarea rows="2" style="width: 100%;" ></textarea>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-rounded btn-primary float-right">Save</button>
                            </div>
                        </div>
                        <hr />
                        <div class="media-list media-list-hover media-list-divided inner-user-div">
                            <div class="mailbox-read-info bb-0 clearfix">
                                <div class="float-left mr-5">
                                    <a href="#">
                                        <img src="../images/1.jpg" alt="user" width="40" class="rounded-circle"></a>
                                </div>
                                <h5 class="no-margin">Spv Samsu Rizal<br>
                                    <small>Jacob@domain.com</small>
                                    <span class="mailbox-read-time pull-right">22 JUL. 2018 08:03 PM</span></h5>
                            </div>
                            <!-- /.mailbox-read-info -->
                            <div class="mailbox-read-message">
                                <p>Seharusnya kamu bisa lebih santun lagi dalam memilih kata atau kalimat.</p>
                                <div class="flexbox">
						            <div class="gap-items">
						              <span class="publisher-btn file-group">
							            <%--<i class="fa fa-image file-browser"></i>
							            <input type="file">--%>
                                          <div class="box-body">
					                        <div id="gallery-content">
						                        <div id="gallery-content-center">
							                        <a href="https://www.barantum.com/blog/wp-content/uploads/2019/03/Customer-Service-menciptakan-Customer-Experience.jpg" data-toggle="lightbox" data-gallery="multiimages" data-title="Image title will be apear here"><img src="https://www.barantum.com/blog/wp-content/uploads/2019/03/Customer-Service-menciptakan-Customer-Experience.jpg" alt="gallery" class="all studio" /> </a>
							                        <a href="http://empowerment.co.id/wp-content/uploads/2018/09/Customer-Service-Excellent.png" data-toggle="lightbox" data-gallery="multiimages" data-title="Image title will be apear here"><img src="http://empowerment.co.id/wp-content/uploads/2018/09/Customer-Service-Excellent.png" class="all landscape" alt="gallery" /> </a>
                                                </div>
                                            </div>
                                         </div>
						              </span>
						            </div>
					            </div>
                            </div>
                            
                           <%-- <hr />--%>
                            <div class="mailbox-read-info bb-0 clearfix">
                                <div class="float-left mr-5">
                                    <a href="#">
                                        <img src="../images/1.jpg" alt="user" width="40" class="rounded-circle"></a>
                                </div>
                                <h5 class="no-margin">Agent Malik<br>
                                    <small>Jacob@domain.com</small>
                                    <span class="mailbox-read-time pull-right">22 JUL. 2018 08:03 PM</span></h5>
                            </div>
                            <!-- /.mailbox-read-info -->
                            <div class="mailbox-read-message">
                                <p>Terimakasih masukannya pak, saya akan berusaha lebih baik lagi</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Media Player-->
    <div class="modal center-modal fade show" id="modal-video" tabindex="-1" aria-modal="true">
    <div class="modal-dialog">
    <div class="modal-content" style="width: 900px; margin-left: -200px;">
    <div class="modal-header">
	    <h5 class="modal-title">Agent Voice/Video Recording</h5>
	    <button type="button" class="close" data-dismiss="modal">
		    <span aria-hidden="true">×</span>
	    </button>
    </div>
    <div class="modal-body">
	    <div class="panel-body">
		    <div class="row">
			    <div class="col-12">
				    <div class="box">
					    <video
                            width="750px"
						     id="my-player"
						     class="video-js"
						     controls
						     preload="auto"
						     poster="//vjs.zencdn.net/v/oceans.png"
						     data-setup='{}'>
						     <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"/>
						     <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"/>
						     <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"/>
						     <p class="vjs-no-js">
						     To view this video please enable JavaScript, and consider upgrading to a web browser that
						     <a href="http://videojs.com/html5-video-support/" target="_blank">
						     supports HTML5 video
						     </a>
						     </p>
					    </video>
				    </div>
			    </div>
		    </div>
		
	  
	    </div>
    </div>
    </div>
    </div>
    </div>
    <!-- End -->
    <!-- Media Player Guide-->
    <div class="modal center-modal fade show" id="modal-guide" tabindex="-1" aria-modal="true">
    <div class="modal-dialog">
    <div class="modal-content" style="width: 900px; margin-left: -200px;">
    <div class="modal-header">
	    <h5 class="modal-title">Video Guidance</h5>
	    <button type="button" class="close" data-dismiss="modal">
		    <span aria-hidden="true">×</span>
	    </button>
    </div>
    <div class="modal-body">
	    <div class="panel-body">
		    <div class="row">
			    <div class="col-12">
				    <div class="box">
					    <video
                            width="750px"
						     id="my-player"
						     class="video-js"
						     controls
						     preload="auto"
						     poster="//vjs.zencdn.net/v/oceans.png"
						     data-setup='{}'>
						     <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"/>
						     <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"/>
						     <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"/>
						     <p class="vjs-no-js">
						     To view this video please enable JavaScript, and consider upgrading to a web browser that
						     <a href="http://videojs.com/html5-video-support/" target="_blank">
						     supports HTML5 video
						     </a>
						     </p>
					    </video>
				    </div>
			    </div>
		    </div>
		    <div class="row">
			    <div class="col-12">
				    <div class="box">
					    <video
                            width="750px"
						     id="my-player"
						     class="video-js"
						     controls
						     preload="auto"
						     poster="//vjs.zencdn.net/v/oceans.png"
						     data-setup='{}'>
						     <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"/>
						     <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"/>
						     <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"/>
						     <p class="vjs-no-js">
						     To view this video please enable JavaScript, and consider upgrading to a web browser that
						     <a href="http://videojs.com/html5-video-support/" target="_blank">
						     supports HTML5 video
						     </a>
						     </p>
					    </video>
				    </div>
			    </div>
		    </div>
	  
	    </div>
    </div>
    </div>
    </div>
    </div>
    <!-- End -->
</asp:Content>
