<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="2_Channel_Inbox.aspx.vb" Inherits="ICC._2_Channel_Inbox" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/2_channel_inbox.js"></script>
	<script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Content Wrapper. Contains page content -->
  <%--<div class="content-wrapper">  --%>
		<!-- left content -->
		<section class="left-block content">
			<a class="mdi mdi-close mdi-menu btn btn-success open-left-block d-block d-md-none" href="javascript:void(0)"></a>
				<div class="scrollable" style="height: 100%;">
					<div class="left-content-area">

						<div class="box no-shadow">
							<div class="box-body">
							  <div class="contact-page-aside">
								<asp:Literal runat="server" ID="listInbox"></asp:Literal>
                                <%--<li class="box-label"><a href="javascript:void(0)" data-toggle="modal" data-target="#myModal" class="btn btn-rounded btn-success mt-10">+ Create New Label</a></li>	--%>
							</div>
						  </div>
						</div>
					  <!-- /. box -->

					</div>
				</div>
		</section>
		<!-- /.left content -->

		<!-- right content -->
		<section class="right-block content">

			<div class="box">
				<div class="box-body p-0">
				  <div class="flexbox align-items-center p-15">
					<div class="flexbox align-items-center">
					  <div class="custom-control custom-checkbox pl-0">
						<button type="button" class="btn btn-info btn-round checkbox-toggle"><i class="ion ion-android-checkbox-outline-blank"></i></button>
					  </div>

					  <span class="divider-line mx-1"></span>

					  <div class="dropdown">
						<button class="btn btn-info btn-rounded dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">Move to</button>
						<div class="dropdown-menu">
						  <a class="dropdown-item" href="#"><span class="badge badge-ring badge-danger mr-1"></span> Work</a>
						  <a class="dropdown-item" href="#"><span class="badge badge-ring badge-warning mr-1"></span> Family</a>
						  <a class="dropdown-item" href="#"><span class="badge badge-ring badge-info mr-1"></span> Friends</a>
						  <a class="dropdown-item" href="#"><span class="badge badge-ring badge-success mr-1"></span> Private</a>
						</div>
					  </div>
					  <div class="dropdown d-none d-sm-block">
						<button class="btn btn-info btn-rounded dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">Sort by</button>
						<div class="dropdown-menu">
						  <a class="dropdown-item" href="#">Date</a>
						  <a class="dropdown-item" href="#">Name</a>
						  <a class="dropdown-item" href="#">Group</a>
						  <a class="dropdown-item" href="#">Popular</a>
						</div>
					  </div>
					</div>

					<div>
					  <div class="lookup lookup-circle lookup-right">
						<input type="text" data-provide="media-search">
					  </div>
					</div>
				  </div>              
				</div>
				<!-- /.box-body -->
			  </div>
			<div class="row">
				<div class="col-lg-7 col-12">
					<div class="box">
						<div class="box-body">
							<div class="media-list media-list-divided media-list-hover">

								<asp:Literal runat="server" ID="listDetailInbox"></asp:Literal>


							</div>

						</div>
						<!-- /.box-body -->
					  </div>
					  <!-- /. box -->
				</div>
				<%--<div class="col-lg-6 col-12">
					<div class="box">
						<div class="box-body">
							<div class="media-list media-list-divided media-list-hover">

								<div class="media align-items-center">
								  <div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input">
								  </div>

									<div class="app-contact-star"><a href="#"><i class="fa fa-star text-yellow"></i></a></div>

								  <span class="badge badge-dot badge-danger"></span>

								  <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
									<img class="avatar" src="../images/avatar/9.jpg" alt="...">

									<div class="media-body text-truncate">
									  <h6>Madison</h6>
									  <small>
										<span>Madison@gmail.com</span>
										<span class="divider-dash">(123) 456-7980</span>
									  </small>
									</div>
								  </a>

								  <div class="dropdown">
									<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i> Message</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i> Email</a>
									  <div class="dropdown-divider"></div>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i> Delete</a>
									</div>
								  </div>
								</div>

								<div class="media align-items-center">
								  <div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input">
								  </div>

								  <div class="app-contact-star"><a href="#"><i class="fa fa-star text-yellow"></i></a></div>

								  <span class="badge badge-dot badge-danger opacity-0"></span>

								  <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
									<img class="avatar" src="../images/avatar/8.jpg" alt="...">

									<div class="media-body text-truncate">
									  <h6>Mason</h6>
									  <small>
										<span>Mason@gmail.com</span>
										<span class="divider-dash">(256) 875-6579</span>
									  </small>
									</div>
								  </a>


								  <div class="dropdown">
									<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i> Message</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i> Email</a>
									  <div class="dropdown-divider"></div>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i> Delete</a>
									</div>
								  </div>
								</div>

								<div class="media align-items-center">
								  <div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input">
								  </div>

								 <div class="app-contact-star"> <a href="#"><i class="fa fa-star-o text-yellow"></i></a></div>

								  <span class="badge badge-dot badge-warning"></span>

								  <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
									<img class="avatar" src="../images/avatar/7.jpg" alt="...">

									<div class="media-body text-truncate">
									  <h6>William</h6>
									  <small>
										<span>William@gmail.com</span>
										<span class="divider-dash">(123) 456-7890</span>
									  </small>
									</div>
								  </a>

								  <div class="dropdown">
									<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i> Message</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i> Email</a>
									  <div class="dropdown-divider"></div>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i> Delete</a>
									</div>
								  </div>
								</div>

								<div class="media align-items-center">
								  <div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input">
								  </div>

								  <div class="app-contact-star"><a href="#"><i class="fa fa-star-o text-yellow"></i></a></div>

								  <span class="badge badge-dot badge-danger opacity-0"></span>

								  <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
									<img class="avatar" src="../images/avatar/6.jpg" alt="...">

									<div class="media-body text-truncate">
									  <h6>Jayden</h6>
									  <small>
										<span>Jayden@gmail.com</span>
										<span class="divider-dash">(123) 456-7890</span>
									  </small>
									</div>
								  </a>

								  <div class="dropdown">
									<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i> Message</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i> Email</a>
									  <div class="dropdown-divider"></div>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i> Delete</a>
									</div>
								  </div>
								</div>

								<div class="media align-items-center">
								  <div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input">
								  </div>

								  <div class="app-contact-star"><a href="#"><i class="fa fa-star text-yellow"></i></a></div>

								  <span class="badge badge-dot badge-info"></span>

								  <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
									<img class="avatar" src="../images/avatar/5.jpg" alt="...">

									<div class="media-body text-truncate">
									  <h6>Noah</h6>
									  <small>
										<span>Noah@gmail.com</span>
										<span class="divider-dash">(123) 456-7890</span>
									  </small>
									</div>
								  </a>


								  <div class="dropdown">
									<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i> Message</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i> Email</a>
									  <div class="dropdown-divider"></div>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i> Delete</a>
									</div>
								  </div>
								</div>

								<div class="media align-items-center">
								  <div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input">
								  </div>

								  <div class="app-contact-star"><a href="#"><i class="fa fa-star text-yellow"></i></a></div>

								  <span class="badge badge-dot badge-info"></span>

								  <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
									<img class="avatar" src="../images/avatar/4.jpg" alt="...">

									<div class="media-body text-truncate">
									  <h6>Michael</h6>
									  <small>
										<span>Michael@gmail.com</span>
										<span class="divider-dash">(123) 456-7890</span>
									  </small>
									</div>
								  </a>

								  <div class="dropdown">
									<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i> Message</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i> Email</a>
									  <div class="dropdown-divider"></div>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i> Delete</a>
									</div>
								  </div>
								</div>

								<div class="media align-items-center">
								  <div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input">
								  </div>

								  <div class="app-contact-star"><a href="#"><i class="fa fa-star-o text-yellow"></i></a></div>

								  <span class="badge badge-dot badge-danger opacity-0"></span>

								  <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
									<img class="avatar" src="../images/avatar/3.jpg" alt="...">

									<div class="media-body text-truncate">
									  <h6>Ethan</h6>
									  <small>
										<span>Ethan@gmail.com</span>
										<span class="divider-dash">(123) 456-7890</span>
									  </small>
									</div>
								  </a>

								  <div class="dropdown">
									<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i> Message</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i> Email</a>
									  <div class="dropdown-divider"></div>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i> Delete</a>
									</div>
								  </div>
								</div>

								<div class="media align-items-center">
								  <div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input">
								  </div>

								  <div class="app-contact-star"><a href="#"><i class="fa fa-star text-yellow"></i></a></div>

								  <span class="badge badge-dot badge-success"></span>

								  <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
									<img class="avatar" src="../images/avatar/2.jpg" alt="...">

									<div class="media-body text-truncate">
									  <h6>Alexander</h6>
									  <small>
										<span>Alexander@gmail.com</span>
										<span class="divider-dash">(123) 456-7890</span>
									  </small>
									</div>
								  </a>

								  <div class="dropdown">
									<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i> Message</a>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i> Email</a>
									  <div class="dropdown-divider"></div>
									  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i> Delete</a>
									</div>
								  </div>
								</div>

							</div>

						</div>
						<!-- /.box-body -->
					  </div>
					  <!-- /. box -->
				</div>--%>
			</div> 

		</section>
		<!-- /.right content -->
  <%--</div>--%>
  <!-- /.content-wrapper -->
	
	<!-- Popup Model Plase Here -->
	  <div id="myModal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">Add Lable</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				</div>
				<div class="modal-body">
					<from class="form-horizontal">
						<div class="form-group">
							<label class="col-md-12">Name of Label</label>
							<div class="col-md-12">
								<input type="text" class="form-control" placeholder="type name"> </div>
						</div>
						<div class="form-group">
							<label class="col-md-12">Select Number of people</label>
							<div class="col-md-12">
								<select class="form-control">
									<option>All Contacts</option>
									<option>10</option>
									<option>20</option>
									<option>30</option>
									<option>40</option>
									<option>Custome</option>
								</select>
							</div>
						</div>
					</from>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-rounded btn-success" data-dismiss="modal">Save</button>
					<button type="button" class="btn btn-rounded btn-default float-right" data-dismiss="modal">Cancel</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /Popup Model Plase Here -->
</asp:Content>
