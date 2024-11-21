<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Qc_List.aspx.vb" Inherits="ICC.Qc_List" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content">
        <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="d-flex align-items-center">
                    <div class="w-p100 d-md-flex align-items-center justify-content-between">
                        <h3 class="page-title">List of avaya recording system</h3>
                        <div class="d-inline-block align-items-center">
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="2_taskboard.aspx"><i class="mdi mdi-home-outline"></i></a></li>
                                    <li class="breadcrumb-item" aria-current="page">Home</li>
                                    <li class="breadcrumb-item active" aria-current="page">Campaign</li>
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
                                        <h3 class="widget-user-username text-white">Michael Jorden</h3>
                                        <h6 class="widget-user-desc text-white">SPV</h6>
                                    </div>
                                    <div class="widget-user-image">
                                        <img class="rounded-circle" src="../images/user3-128x128.jpg" alt="User Avatar">
                                    </div>
                                    <br />
                                </div>
                                <!-- /.widget-user -->
                                <div class="box">
                                    <div class="box-header with-border">
                                        <h5 class="box-title">QA Result share per status</h5>
                                        <div class="box-tools pull-right">
                                            <ul class="card-controls">
                                                <li class="dropdown">
                                                    <a data-toggle="dropdown" href="#"><i class="ion-android-more-vertical"></i></a>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item active" href="#">Today</a>
                                                        <a class="dropdown-item" href="#">Yesterday</a>
                                                        <a class="dropdown-item" href="#">Last week</a>
                                                        <a class="dropdown-item" href="#">Last month</a>
                                                    </div>
                                                </li>
                                                <li><a href="" class="link card-btn-reload" data-toggle="tooltip" title="" data-original-title="Refresh"><i class="fa fa-circle-thin"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="box-body">
                                        <div class="text-center pb-25">
                                            <div class="donut" data-peity='{ "fill": ["#fc4b6c", "#ffb22b", "#398bf7"], "radius": 70, "innerRadius": 28  }'>9,6,5</div>
                                        </div>

                                        <ul class="list-inline">
                                            <li class="flexbox mb-5">
                                                <div>
                                                    <span class="badge badge-dot badge-lg mr-1" style="background-color: #fc4b6c"></span>
                                                    <span>Good</span>
                                                </div>
                                                <div>3</div>
                                            </li>

                                            <li class="flexbox mb-5">
                                                <div>
                                                    <span class="badge badge-dot badge-lg mr-1" style="background-color: #ffb22b"></span>
                                                    <span>Average</span>
                                                </div>
                                                <div>1</div>
                                            </li>

                                            <li class="flexbox">
                                                <div>
                                                    <span class="badge badge-dot badge-lg mr-1" style="background-color: #398bf7"></span>
                                                    <span>Bad</span>
                                                </div>
                                                <div>1</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                




                            </div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-8 col-12">
                        <div class="row">
                            <div class="col-12">
                                <div class="box">
                                    <div class="row no-gutters py-2">

                                        <div class="col-12 col-lg-3">
                                            <div class="box-body br-1 border-light">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i class="mdi mdi-file-document font-size-26"></i>
                                                        <br>
                                                        Open
                                                    </span>
                                                    <span class="text-primary font-size-30">4</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar" role="progressbar" style="width: 4%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-12 col-lg-3 hidden-down">
                                            <div class="box-body br-1 border-light">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i class="mdi mdi-alarm font-size-26"></i>
                                                        <br>
                                                        On Progress
                                                    </span>
                                                    <span class="text-info font-size-30">16</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar bg-info" role="progressbar" style="width: 16%; height: 4px;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-12 col-lg-3 d-none d-lg-block">
                                            <div class="box-body br-1 border-light">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i class="mdi mdi-flag font-size-26"></i>
                                                        <br>
                                                        Finished
                                                    </span>
                                                    <span class="text-warning font-size-30">80</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar bg-warning" role="progressbar" style="width: 80%; height: 4px;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-12 col-lg-3 d-none d-lg-block">
                                            <div class="box-body">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i class="mdi mdi-timer font-size-26"></i>
                                                        <br>
                                                        Target
                                                    </span>
                                                    <span class="text-danger font-size-30">100</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%; height: 4px;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
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
                                            <a href="Qc_List.aspx" class="btn btn-rounded btn-danger">Get data from ACRA</a>
                                        </div>
                                    </div>
                                     
                                </div>
                                <!-- Nav tabs -->
                                <ul class="nav nav-pills mb-20">
                                    <li class=" nav-item"><a href="#navpills-1" class="nav-link active" data-toggle="tab" aria-expanded="false">List Agent</a> </li>
                                    <li class="nav-item"><a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="false">History QA</a> </li>
                                   
                                </ul>
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div id="navpills-1" class="tab-pane active">
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
									<th style="width: 150px; text-align: center;">Channel</th>
									<th style="text-align: left;">Date Recorded</th>
									<th style="text-align: center;">Action</th>
								</tr>
								
								<tr>
									<td style="width: 50px;">1</td>
									<td style="width: 300px;">John Doe</td>
									<td style="width: 150px; text-align: center;">Voice Recording</td>
									<td style="width: 200px;">
										21-08-2021 09-01 WIB
									</td>
									<td style="text-align: center;color:white"><span class="badge badge-pill badge-danger"><a href="Qc_Trx.aspx" style="color:white">Evaluation</a></span></td>
								</tr>
								<tr>
									<td style="width: 50px;">2</td>
									<td style="width: 300px;">John Doe</td>
									<td style="width: 150px; text-align: center;">Chat</td>
									<td style="width: 200px;">
										21-08-2021 09-01 WIB
									</td>
									<td style="text-align: center;"><span class="badge badge-pill badge-danger"><a href="Qc_Trx.aspx" style="color:white">Evaluation</a></span></td>
								</tr>
								<tr>
									<td style="width: 50px;">3</td>
									<td style="width: 300px;">John Doe</td>
									<td style="width: 150px; text-align: center;">Voice Recording</td>
									<td style="width: 200px;">
										21-08-2021 09-01 WIB
									</td>
									<td style="text-align: center;"><span class="badge badge-pill badge-danger"><a href="Qc_Trx.aspx" style="color:white">Evaluation</a></span></td>
								</tr>
								<tr>
									<td style="width: 50px;">4</td>
									<td style="width: 300px;">John Doe</td>
									<td style="width: 150px; text-align: center;">Social Media</td>
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
                                    <div id="navpills-2" class="tab-pane">
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
                                                                    John Doe
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td>Remarks dari SPV</td>

                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>
                                                                    John Doe
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                               <td><span class="badge badge-success">Complete</span> </td>
                                                                <td>Remarks dari SPV</td>

                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>
                                                                    John Doe
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td>Remarks dari SPV</td>

                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>
                                                                    John Doe
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td>Remarks dari SPV</td>

                                                            </tr>
                                                            <tr>
                                                                <td>5</td>
                                                                <td>
                                                                    John Doe
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td>Remarks dari SPV</td>

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
                        <div class="box">
                        </div>
                    </div>
                </div>
                <!-- /.row -->

            </section>
            <!-- /.content -->
        </div>
    </div>
</asp:Content>
