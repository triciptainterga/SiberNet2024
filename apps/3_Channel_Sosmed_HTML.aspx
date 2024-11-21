<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_Channel_Sosmed_HTML.aspx.vb" Inherits="ICC._3_Channel_Sosmed_HTML" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
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
						  <h4 class="box-title">Inbox</h4>
                              <ul class="box-controls pull-right">
									          <li class="dropdown">
										        <a data-toggle="dropdown" href="#"><i class="mdi mdi-settings"></i></a>
										        <div class="dropdown-menu dropdown-menu-right">
										          <a class="dropdown-item" href="#"><img src="avail.png" /> Available</a>
										          <a class="dropdown-item" href="#"><img src="away.png" /> Away</a>								          
										        </div>
									          </li>
									        </ul>
						</div>
						<div class="box-body mailbox-nav p-20">
                           <!-- /. box -->
					          <div class="box no-shadow bg-transparent b-0">
						        <div class="box-header with-border p-0">
						          <h4 class="box-title"><img src="chatting.png" width="32" /> All Messages</h4>
						        </div>
						        <div class="box-body mailbox-nav p-0">
						          <ul class="nav nav-pills flex-column">
							        <li class="nav-item"><a class="nav-link" href="#"><img src="fbm_off.png" width="24" /> Messenger</a></li>
							        <li class="nav-item"><a class="nav-link" href="directmessage_IG.html"><img src="igd.png" width="24" /> Instagram Direct</a></li>
							        <li class="nav-item"><a class="nav-link" href="#"><img src="waicon_off.png" width="24" /> Whatsapp</a></li>
						          </ul>
						        </div>
						        <!-- /.box-body -->
					          </div>

					  <!-- /.box -->	
                          
						  
						</div>
						<!-- /.box-body -->
					  </div>
					  <div class="box mb-0 no-shadow bg-transparent b-0">
						<div class="box-header with-border p-20">
						  <h4 class="box-title">Comments & More</h4>
						</div>
                          <ul class="nav nav-pills flex-column">
							<li class="nav-item"><a class="nav-link" href="javascript:void(0)"><img src="fbicon_off.png" width="24" /> Facebook
							  <span class="label label-success pull-right">12</span></a></li>
							<li class="nav-item"><a class="nav-link" href="javascript:void(0)"><img src="igicon_off.png" width="24" /> Instagram</a></li>
							<li class="nav-item"><a class="nav-link" href="javascript:void(0)"><img src="twicon_off.png" width="24" /> Twitter</a></li>
							
						  </ul>
					  </div>
					</div>				
				</div>
			</div>
	</section>
	<!-- /.left content -->

	<!-- right content -->
	<section class="right-block content">

		<div class="row">
				<div class="col-lg-4 col-12">
					<div class="box bg-lightest" id="chat-bx">
					
						<div class="box-body">
							
							<!-- Tab panes -->
							<div class="tab-content">
								<div class="tab-pane active" id="messages" role="tabpanel">
								
									<div class="chat-box-one-side2">
										<div class="media-list media-list-hover">
                                            <%--<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="fbm.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Mical Clark</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>
											<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="fbicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Mical Clark</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>

											<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="twicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Colin Nathan</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>
											
											<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="fbicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Nathan Johen</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>--%>
                                            <div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="igicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Username #1</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>
											<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="igicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Username #2</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>
											<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="igicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Username #3</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>
											<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="igicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Username #4</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>
                                            <div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="igicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Username #5</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>
											<%--<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="fbicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Mical</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>
											
											<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="twicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Johen Doe</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>
											
											<div class="media bg-white box-shadowed mb-15">
											  <a class="align-self-center mr-0" href="#"><img src="fbicon.png"  alt="..."></a>
											  <div class="media-body">
												<p>
												  <a class="hover-primary" href="#"><strong>Nathan</strong></a>
												  <span class="float-right font-size-10">28 Mei 21</span>
												</p>
												<p>Nullam facilisis velit.</p>
											  </div>
											</div>--%>

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
				<div class="col-lg-8 col-12">
					<div class="row">
						<div class="col-lg-12 col-12">
							<div class="box">
							  <div class="box-header">
								<div class="media align-items-top p-0">
								  <a class="avatar avatar-lg status-success mx-0" href="#">
									<img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">
								  </a>
									<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">
										<div class="media-body mb-lg-0 mb-20">
											<p class="font-size-16">
											  <a class="hover-primary" href="#"><strong>Username #1</strong></a>
											</p>
											  <p class="font-size-12">Last Seen 10:30pm ago</p>
										</div>
										<div>
											<ul class="list-inline mb-0 font-size-18">
												<li class="list-inline-item"><a href="#" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>
												<li class="list-inline-item"><a href="#" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>
												<li class="list-inline-item"><a href="#" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>
                                                <li class="list-inline-item"><a href="#" class="hover-primary"><img src="unread.png" alt="Mark as unread"></a></li>
                                                <li class="list-inline-item"><a href="#" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>
                                                <li class="list-inline-item"><a href="#" class="hover-primary"><img src="blocked.png" alt="Mark as block"></a></li>
											</ul>
										</div>
									</div>				  
								</div>             
							  </div>

							  <div class="box-body mb-30">
								  <div class="chat-box-one">
									  
									  
									  <div class="col-lg-12">
				                            <div class="box">
				                             

				                              <div class="box-body bb-1 border-fade">
					                            <p class="lead">Authoritatively syndicate goal-oriented leadership skills for clicks-and-mortar outsourcing. Synergistically reconceptualize enabled catalysts for change.</p>

					                            <div class="gap-items-4 mt-10">
					                              <a class="text-fade hover-light" href="#">
						                            <i class="fa fa-heart mr-1"></i> 1254
					                              </a>
					                              <a class="text-fade hover-light" href="#">
						                            <i class="fa fa-comment mr-1"></i> 25
					                              </a>
					                              <a class="text-fade hover-light" href="#">
						                            <i class="fa fa-location-arrow mr-1"></i> 
					                              </a>
					                            </div>
				                              </div>


				                              <div class="media-list media-list-divided bg-lighter">
					                            <div class="media">
					                              <a class="avatar" href="#">
						                            <img src="../images/avatar/6.jpg" alt="...">
					                              </a>
					                              <div class="media-body">
						                            <p>
						                              <a href="#"><strong>Rock Tele</strong></a>
						                              <time class="float-right text-fade" datetime="2017-07-14 20:00">Just now</time>
						                            </p>
						                            <p>Uniquely enhance world-class channels with just in time schemas.</p>
                                                    <div class="gap-items-4 mt-10">
					                                  <a class="text-fade hover-light" href="#">
						                                <i class="fa fa-thumbs-up mr-1"></i> 1254
					                                  </a>
					                                  <a class="text-fade hover-light" href="#">
						                                <i class="fa fa-comment mr-1"></i> 25
					                                  </a>
					                                  <a class="text-fade hover-light" href="#">
						                                <i class="fa fa-share-alt mr-1"></i> 12
					                                  </a>
					                                </div>
						                            <div class="media px-0 mt-20">
						                              <a class="avatar" href="#">
							                            <img src="../images/avatar/8.jpg" alt="...">
						                              </a>
						                              <div class="media-body">
							                            <p>
							                              <a href="#"><strong>Brock Lensar</strong></a>
							                              <time class="float-right text-fade" datetime="2017-07-14 20:00">26 mins ago</time>
							                            </p>
							                            <p>Thank you for your nice comment.</p>
						                              </div>
						                            </div>

					                              </div>
					                            </div>

					                            <div class="media">
					                              <a class="avatar" href="#">
						                            <img src="../images/avatar/9.jpg" alt="...">
					                              </a>
					                              <div class="media-body">
						                            <p>
						                              <a href="#"><strong>Tony Stark</strong></a>
						                              <time class="float-right text-fade" datetime="2017-07-14 20:00">2 hours ago</time>
						                            </p>
						                            <p>Continually drive user friendly solutions through performance based infomediaries.</p>
					                              </div>
					                            </div>
				                              </div>

				                              

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
			</div>
		  <!-- /. box -->

	</section>
	<!-- /.right content -->
	    </div>  
  </div>
  <!-- /.content-wrapper -->
</asp:Content>
