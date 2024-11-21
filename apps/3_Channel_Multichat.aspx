<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_Channel_Multichat.aspx.vb" Inherits="ICC._3_Channel_Multichat" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
	    <script src="js/3_Channel_Sosmed.js"></script>
		<!--<script src="https://cdn.tiny.cloud/1/gdnj4zsxxqk0td7cvhzfh2g7hypsro4e58q66enhvz4bvcjt/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>-->
		
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Popup -->
    <div class="modal center-modal fade" id="modal-syncAccount" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 850px; margin-left:-200px;">
                <div class="modal-header">
                    <h4 class="box-title text-info"><i class="ti-user mr-15"></i> Sync Data to uidesk</h4>
						<hr class="my-15">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="box-body">
                                
						<div class="row">
							<div class="col-md-6">
							<div class="form-group">
								<label>Name</label>
								<input type="text" id="txtName" class="form-control" placeholder="Name">
							</div>
							</div>
							<div class="col-md-6">
							<div class="form-group">
								<label>Status</label>
								<input type="text" id="txtStatus" readonly="readonly" value="HELPDESK INFORMATION" class="form-control" placeholder="Status">
							</div>
							</div>
						</div>
                        <div class="row">
							<div class="col-md-6">
							<div class="form-group">
								<label>Phone</label>
								<input type="text" id="txtPhone" readonly="readonly" class="form-control" placeholder="Phone">
							</div>
							</div>
							<div class="col-md-6">
							<div class="form-group">
								<label>Email</label>
								<input type="text" id="txtEmail"  class="form-control" placeholder="Email">
							</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
							<div class="form-group">
								<label >Source</label>
								<!--<input type="text" id="txtSource" readonly="readonly" value="HELPDESK" class="form-control" placeholder="Source">-->
							</div>
							</div>
							<div class="col-md-6">
							<div class="form-group">
								<label >Description</label>
								<textarea rows="5" id="txtDescription" class="form-control" placeholder="Description"></textarea>
							</div>
							</div>
						</div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="show_CustSyncSM()" id="OtherChannel">Other Channel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionPostToLeads()" id="SaveLeads">Save To Leads</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionLeadsToCust()" id="SaveCust">Sync To Cust Table</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-syncAccountSM" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 850px; margin-left:-200px;">
                <div class="modal-header">
                    <h4 class="box-title text-info"><i class="ti-user mr-15"></i> Sync Data to UIdesk Channel</h4>
						<hr class="my-15">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <section class="content">
                        <div class="box-body">
                        <!-- Nav tabs -->
					    <ul class="nav nav-pills mb-20">
						    <%--<li class=" nav-item"> <a href="#navpills-1" class="nav-link" data-toggle="tab" aria-expanded="false">Add New Customer</a> </li>--%>
						    <li class="nav-item"> <a href="#navpills-2" class="nav-link active" data-toggle="tab" aria-expanded="false">Add Customer Channel</a> </li>
						
					    </ul>
                        <!-- Tab panes -->
					    <div class="tab-content">
						    <div id="navpills-1" class="tab-pane">
							    <div class="row">
								    <div class="row">
							            <div class="col-md-4">
							            <div class="form-group">
								            <label>Name</label>
								            <input type="text" id="txtNameSM" class="form-control" placeholder="Name">
							            </div>
							            </div>
							            <div class="col-md-4">
							            <div class="form-group">
								            <label>Status</label>
								            <input type="text" id="txtStatusSM" readonly="readonly" value="SocialMedia Information" class="form-control" placeholder="Status">
							            </div>
							            </div>
						           
							                <div class="col-md-4">
							                <div class="form-group">
								                <label>Profile ID</label>
								                <input type="text" id="txtProfileID" readonly="readonly" class="form-control" placeholder="Phone">
							                </div>
							                </div>
							                <div class="col-md-4">
							                <div class="form-group">
								                <label>Email</label>
								                <input type="text" id="txtEmailSM"  class="form-control" placeholder="Email">
							                </div>
							                </div>
						          
							                <div class="col-md-4">
							                <div class="form-group">
								                <label >Source</label>
								                <input type="text" id="txtSourceSM" readonly="readonly" value="SM" class="form-control" placeholder="Source">
							                </div>
							                </div>
							                <div class="col-md-4">
							                <div class="form-group">
								                <label >Description</label>
								                <textarea rows="5" id="txtDescriptionSM" class="form-control" placeholder="Description"></textarea>
							                </div>
							                </div>
						                </div>
							    </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div>
                                            <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    
                                            <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionLeadsToCustSM()" id="SaveCustSM">Add To Cust Table</button>
                                        </div>
                                    </div>
                                </div>
						    </div>
						    <div id="navpills-2" class="tab-pane active">
                                <div class="row">
                                    <div class="box-body p-0">
				                          <div class="flexbox align-items-center p-15">
					                        <div>
					                          <div class="lookup lookup-circle lookup-right">
						                        Pencarian menggunakan Nama,Email,No Telp <input type="text" id="txtKeySearch" data-provide="media-search">
					                          </div>
					                        </div>
				                          </div>              
				                        </div>
                                </div>
							    <div class="row">
                                    <div class="col-md-6 col-12">
                                        
                                        <div class="media-list media-list-divided media-list-hover">
                                            <div id="listCustomerMaster">
                                                
                                            </div>
                                            
					                    </div>
                                    </div>
								    <div class="col-md-6 col-12">
                                        <div id="txtAddChannel" style="visibility:hidden">
                                                <p id="labelForChannel"></p>
	                                            <div class="editable-input" style="position: relative;">
		                                            <input type="text" id="txtChannelValue" class="form-control input-sm" style="padding-right: 24px;">
	                                            </div>
	                                            <div class="editable-buttons">
		                                            <button type="button" onclick="addToChannel()" class="btn btn-primary btn-md editable-submit"><i class="glyphicon glyphicon-ok"></i></button>
		                                            <button type="button" onclick="cancelChannel()" class="btn btn-default btn-md editable-cancel"><i class="glyphicon glyphicon-remove"></i></button>
	                                            </div>
                                            </div>
								    </div>
							    </div>
						    </div>
						
					    </div>
						
                        </div>
                    </section>
                </div>
                
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-scriptwa" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 850px; margin-left:-200px;">
                 
                <div class="modal-body">
                    <div class="box-body">
                            <!-- Default box -->
			                     <div class="box box-solid box-info">
				                    <div class="box-header with-border">
				                      <h4 class="box-title">Script Template</h4>

				                      <ul class="box-controls pull-right">
					                    <li><a  href="#" data-dismiss="modal">X</a></li>
					
					
				                      </ul>
				                    </div>
				                    <div class="box-body p-10">
				                      <ul class="todo-list">
					                    <li class="b-1 p-0 mb-15">
					                      <div class="position-relative p-20">
						                      <!-- drag handle -->
						                      <div class="handle handle2"></div>
						                      <!-- checkbox -->
						                      <input type="checkbox" onclick="getCheckboxScript(19)" id="basic_checkbox_19" class="filled-in">
						                      <label for="basic_checkbox_19" class="mb-0 h-15 ml-15"></label>
						                      <!-- todo text -->
						                      <span class="font-size-18">Greeting</span>
						                      <!-- General tools such as edit or delete-->
						  
                    <div class="mt-5 ml-50 pl-5" id="script_19">Good morning/afternoon, 
                    thank you for calling [COMPANY NAME],
                    you're speaking to [AGENT'S FIRST NAME]. 
                    How may I assist you?</div>					 
                    </div>
					                    </li>
					                    <li class="b-1 p-0 mb-15">
					                      <div class="position-relative p-20">
						                      <!-- drag handle -->
						                      <div class="handle handle2"></div>
						                      <!-- checkbox -->
						                      <input type="checkbox" onclick="getCheckboxScript(20)"  id="basic_checkbox_20" class="filled-in">
						                      <label for="basic_checkbox_20" class="mb-0 h-15 ml-15"></label>
						                      <!-- todo text -->
						                      <span class="font-size-18">Closing</span>
						                      <!-- General tools such as edit or delete-->
						  
                    <div class="mt-5 ml-50 pl-5" id="script_20">“You’re certainly welcome, [CUSTOMER NAME]. 
                    I’m delighted we could get the problem sorted out and thank you. 
                    We appreciate you calling to let us know.”
                    “Thanks for calling, and if you have any additional questions, please call us again, we’ll be happy to help.”
                    “Thanks for your call. It was a pleasure discussing your [concern/ issue] today, enjoy the rest of your day.”
                    “Thank you very much for you time, [CUSTOMER NAME], and thanks for calling [COMPANY NAME]. 
                              
                    We look forward to working with you in the future. Have a great day!”
                    </div>
						 
						                    </div>
					                    </li>
					
				                      </ul>
				                    </div>
				                    <!-- /.box-body -->
			                      </div>
			                    <!-- /.box -->
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-sendtothread" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 850px; margin-left:-200px;">
                
                <div class="modal-body">
                    <div class="box-body">
                            <!-- Default box -->
			                     <div class="box box-solid box-info">
				                    <div class="box-header with-border">
				                      <h4 class="box-title">Post To Thread</h4>

				                      <ul class="box-controls pull-right">
					                    <li><a  href="#" data-dismiss="modal">X</a></li>
					
					
				                      </ul>
				                    </div>
				                    <div class="box-body p-10">
				                        <div class="row">
							               
							                <div class="col-md-12">
							                <div class="form-group">
								                <label >Description</label>
								                <textarea rows="5" name="txtDescriptionThread" id="txtDescriptionThread" class="form-control" placeholder="Description"></textarea>
							                </div>
							                </div>
						                </div>
				                    </div>
				                    <!-- /.box-body -->
			                      </div>
			                    <!-- /.box -->
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                   
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionInsertThread()" id="SaveThread">Save Thread</button>
                   
                </div>
            </div>
        </div>
    </div>
    <!-- End -->
  <!-- Content Wrapper. Contains page content -->
  <div class="content">
	  <div class="container-full">
	<!-- left content -->
	<section class="left-block content style1" id="ShowMenu" >
		<br>
		<a href="#" onclick="ShowSideLeftMenu()"><i class="mdi mdi-arrow-right-thick"></i></a>
	</section>
	<section class="left-block content" id="SideLeftMenu">
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
										        <a href="#" onclick="HideSideLeftMenu()"><i class="mdi mdi-arrow-left-thick"></i></a>
										        
									          </li>
											  <li class="dropdown">
										        <a data-toggle="dropdown" href="#"><i class="mdi mdi-settings"></i></a>
										        <div class="dropdown-menu dropdown-menu-right">
										          <a class="dropdown-item" href="#" onclick="DivShowSearchData(1)"><img src="../Images/icon/search.png" width="20"/> Search Data</a>
										          <a class="dropdown-item" href="#" onclick="DivShowSearchData(2)"><img src="../Images/icon/-totaltickets.png" width="20"/> View Menu</a>
                                                    <!--<a class="dropdown-item" href="#"><img src="away.png" /> Away</a>-->							          
										        </div>
									          </li>
									        </ul>
						</div>
                        <!-- Data Search Ticket-->
                          <div class="box" id="DivSearchTicket" style="display:none">
					        <div class="box-header with-border">
						        
                                 <input type="text" id="txtSearchTicket" class="form-control" placeholder="Search...">
					        </div>
                  
					
                       
					        <div class="box-body p-0">
					          <div class="box">
					
					<div class="box-body p-20" id="listSearchTicket">
					  
					  
					</div>
				</div>
				          </div>
				        </div>

                          <!--End-->

						<div id="DivMultichat" class="box-body mailbox-nav p-20">
                           <!-- /. box -->
					          <div class="box no-shadow bg-transparent b-0">
						        <div class="box-header with-border p-0">
						          <h4 class="box-title"><img src="chatting.png" width="32" /> All Messages</h4>
						        </div>
						        <div class="box-body mailbox-nav p-0">
						          <ul class="nav nav-pills flex-column">
							        <li class="nav-item"><a class="nav-link" href="?flagto=msg"><img src="messengerfb.png" width="24" /> Multichat</a></li>
									<li class="nav-item"><a class="nav-link" href="?flagto=comment"><img src="star.png" width="24" /> Comments & More</a></li>
									<li class="nav-item"><a class="nav-link" href="TrmMultichannel.aspx"><img src="waicon_off.png" width="24" /> Omnichannel Iframe</a></li>
							       <%-- <li class="nav-item"><a class="nav-link" href="TrmMultichannel.aspx"><img src="waicon_off.png" width="24" /> Whatsapp</a></li>
									<li class="nav-item"><a class="nav-link" href="?flagto=mp"><img src="consultation.png" width="24" /> Marketplace</a></li>--%>
								  </ul>
						        </div>
						        <!-- /.box-body -->
					          </div>

					  <!-- /.box -->	
                          
						  
						</div>
						<!-- /.box-body -->
					  </div>
					  <%--<div id="DivComments" class="box mb-0 no-shadow bg-transparent b-0">
						<div class="box-header with-border p-20">
						  <h4 class="box-title">Comments & More</h4>
						</div>
                          <ul class="nav nav-pills flex-column">
						  <li class="nav-item"><a class="nav-link" href="?flagto=mentions"><img src="mentions.png" width="24" /> Mentions</a></li>
							<li class="nav-item"><a class="nav-link" href="?flagto=FB"><img src="fbicon_off.png" width="24" /> Facebook</a></li>
							<li class="nav-item"><a class="nav-link" href="?flagto=IG"><img src="igicon_off.png" width="24" /> Instagram</a></li>
							<li class="nav-item"><a class="nav-link" href="?flagto=TW"><img src="twicon_off.png" width="24" /> Twitter</a></li>
							
						  </ul>
					  </div>--%>
					  <!--<div class="box mb-0 no-shadow bg-transparent b-0">
						<div class="box-header with-border p-20">
						  <h4 class="box-title">Post</h4>
						</div>
                          <ul class="nav nav-pills flex-column">
							<li class="nav-item"><a class="nav-link" onclick="PostPopup('FBpost','show')"><img src="fbicon_off.png" width="24" /> Facebook</a></li>
							<li class="nav-item"><a class="nav-link" onclick="PostPopup('IGpost','show')"><img src="igicon_off.png" width="24" /> Instagram</a></li>							
						  </ul>
					  </div>-->
					</div>				
				</div>
			</div>
	</section>
	<!-- /.left content -->

	<!-- right content -->
	<section class="right-block content" id="SideRightMenu">

		    <div class="row" id="commentsDiv">
			    
                <div class="col-lg-4 col-12">
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
				<div class="col-lg-8 col-12">
					<div class="row">
						<div class="col-lg-12 col-12">
							<div class="box">
							  <div class="box-header">
								<div id="HTMLcontent_header_inbox"></div>
							  </div>

							  <div class="box-body mb-30">
                                  <!-- Loader -->
                                        <center><div class="spin2" id="LoaderPage"></div></center>
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
								<div id="socialMediaFooter" class="box-footer">
									<div class="d-md-flex d-block justify-content-between align-items-center">
										<%--<input class="form-control b-0 py-10" type="text" placeholder="Say something...">--%>
                                        <textarea rows="3" id="txtReplyMessenger" class="form-control" placeholder="Say something..."></textarea>
										<div class="d-flex justify-content-between align-items-center mt-md-0 mt-30">
                                           <%-- &nbsp;&nbsp;&nbsp;
											<button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
												<i class="mdi mdi-link"></i>
											</button>--%>
                                             &nbsp;&nbsp;&nbsp;
                                            <div class="">
								              
								                  <div class="dropdown">
									                <button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary" data-toggle="dropdown">
												        <i class="fa fa-reorder"></i>
											        </button>
									                <div class="dropdown-menu">
                                                      
									                    <%--<a class="dropdown-item" href="#">Greeting</a>
									                  <div class="dropdown-divider"></div>--%>
                                                        <a onclick="generateLink()" class="dropdown-item" href="#">Direct To Whatsapp Official</a>
									                  
<%--									                  <div class="dropdown-divider"></div>
									                  <a class="dropdown-item" href="#">Separated link</a>--%>
									                </div>
								                  </div>
							                  </div>
											&nbsp;
											<button onclick="ActionReplyInboxMessages()" type="button" class="waves-effect waves-circle btn btn-circle btn-primary">
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
                                        <div class="chat-box-one-side" id="chat_box" style="overflow: hidden; width: auto; height: 650px;">
				                        <div id="slimScrollDiv" class="media-list media-list-hover">
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
			                        </div><div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 0px; opacity: 0.05; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 650px;"></div><div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
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
                            <center><div class="spin2" id="LoaderPageChat"></div></center>
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
                                <input type="hidden" id="txtMessageTo" />
                                <input type="hidden" id="txtFileName" />
								<input type="hidden" id="txtIGaccountID" />
                                <input type="hidden" id="txtCustID" />
								<input type="hidden" id="txtRecipientID" />
                                <input type="hidden" id="txtConvID" />
                                <input type="hidden" id="txtSourceChannel" />
                                <input type="hidden" id="txtLabelChannel" />
                                <input type="hidden" id="txtLabelProfileID" />
			                    <%--<input class="form-control b-0 py-10" id="txtMessageAgent" type="text" placeholder="Say something...">--%>
                                <textarea class="form-control b-0 py-10" id="txtMessageAgent" rows="5" cols="15" placeholder="Say something..."></textarea>
			                    <div class="d-flex justify-content-between align-items-center mt-md-0 mt-30">
				                    <%--<button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
					                    <i class="mdi mdi-link"></i>
				                    </button>--%>
                                    <input type="file" id="files" name="files" style="display:none;">
				                    <button type="button" onclick="thisFileUpload();" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
					                    <i class="mdi mdi-image"></i>
				                    </button>
				                    <button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
					                    <i class="mdi mdi-face"></i>
				                    </button>
				                    <%--<button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
					                    <i class="mdi mdi-microphone"></i>
				                    </button>
				                    <button type="button" class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary">
					                    <i class="mdi mdi-camera"></i>
				                    </button>--%>
				                    <button type="button"  id="SendMessages" onclick="SendMessagesNya()"  class="waves-effect waves-circle btn btn-circle btn-primary">
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
            <div class="row" id="multichatIframe">
                <div class="col-md-12">
                    <div class="form-group">
                        <iframe id="iframe_channel" title="description" frameBorder="0" src="" style="width: 100%; height: 700px;"></iframe>
                    </div>
                </div>
            </div>
	</section>
	<!-- /.right content -->
	    </div>  
  </div>
  <!-- /.content-wrapper -->
	<!-- Show History Data-->
	<div class="modal center-modal fade" id="modal-center-history" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 850px; margin-left:-200px;">
                <div class="modal-header">
                    <h5 class="modal-title">Let's do something great...</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style='width: 100%;
   height: 600px;
   overflow: scroll;'>
					<div class="row" id="dataListHistory">
					</div>
                </div>
               
            </div>
        </div>
    </div>
	<!-- End -->
    <!-- Content for popup action do-->
    <div class="modal center-modal fade" id="modal-center" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 850px; margin-left:-200px;">
                <div class="modal-header">
                    <h5 class="modal-title">Let's do something great...</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" style="visibility:hidden;height:0">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" id="TxtActionDo"/><input type="text" id="TxtSource"/>
                            </div>
                        </div>
                         <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" id="TxtTableID"/><input type="text" id="TxtSocialID"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <textarea rows="8" class="form-control" id="ReasonWhy" placeholder="The reason why ?"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSaveActionDoMulti()" id="SaveActionDo">Submit</button>
                </div>
            </div>
        </div>
    </div>
	
	<div class="modal center-modal fade" id="modal-post" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content" style="width: 850px; margin-left:-200px;">
			<div class="modal-header">
				<h5 class="modal-title">Let's POST something great...</h5>
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-6" style="visibility:hidden">
						<div class="form-group">
							<input type="text" id="TxtActionDo_Post"/><input type="text" id="TxtSource_Post"/>
						</div>
					</div>
					<div class="col-md-6" style="visibility:hidden">
						<div class="form-group">
							<input type="text" id="TxtTableID_Post"/><input type="text" id="TxtSocialID_Post"/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<select class="form-control" name="cmbAccountSosmed" id="cmbAccountSosmed"></select>
						</div>
					</div>
				</div>
				
				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<textarea rows="8" class="form-control" id="ReasonWhy_Post" placeholder="Post something great"></textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer modal-footer-uniform">
				<button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionPostSocialMedia()" id="SaveActionDo_Post">Post</button>
			</div>
		</div>
	</div>
</div>
	

    <!-- View Modal Data ticket-->
    <div class="modal center-modal fade" id="modal-dataticket" tabindex="-1" aria-hidden="true" style="display: none;">
	  <div class="modal-dialog modal-lg modal-dialog-scrollable">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Data Tickets</h5>
			<button type="button" class="close" data-dismiss="modal">
			  <span aria-hidden="true">×</span>
			</button>
		  </div>
		  <div class="modal-body">
			<div class="col-xl-12 col-lg-12">
			  <!-- Box Comment -->
			  <div class="box box-widget">
				<div class="box-header with-border">
				  <div class="user-block">
					<img class="avatar" src="../images/user1-128x128.jpg" alt="User Image">
					<span class="username"><span id="ViewTicketNumber"></span>-<span id="ViewNamaCust"></span></span>
					<span class="description"><span id="ViewStatus"></span>-<span id="ViewChannel"></span>-<span id="ViewWaktu"></span></span>
				  </div>
				  <!-- /.user-block -->              
				  <ul class="box-controls pull-right">				  
					  <li class="dropdown">
                                                      <a data-toggle="dropdown" href="#" aria-expanded="false"><i style="color: black;" class="font-size-18 ti-more-alt rotate-90"></i></a>
                                                      <div class="dropdown-menu dropdown-menu-right" style="will-change: transform;">
                                                        <a class="dropdown-item" href="#" onclick="SendDataToMultichat()"><i class="ti-import"></i> Send To Multichat</a>
                                                        
                                                        <div class="dropdown-divider"></div>
                                                        <a class="dropdown-item" href="#"><i class="ti-settings"></i> Settings</a>
                                                      </div>
                                                    </li>
			      </ul>
				  <!-- /.box-tools -->
				</div>
				<!-- /.box-header -->
				<div class="box-body">
				  <!-- post text -->
				  <p><span id="ViewKeluhanPelanggan"></span></p>

				 
				  <!-- Attachment -->
				  <div class="attachment-block clearfix">
					

					<div class="">
					  
					  <div class="attachment-text">
						<span id="ViewJawabanAgent"></span>
					  </div>
					  <!-- /.attachment-text -->
					</div>
					<!-- /.attachment-pushed -->
				  </div>
				  <!-- /.attachment-block -->

				  <!-- Social sharing buttons -->
				  <span class="pull-right text-muted">All Interaction Agents</span>
				</div>
				<!-- /.box-body -->
				<div class="box-footer box-comments" id="DataListInteraction">
				  
				  <!-- /.box-comment -->
				  
				  <!-- /.box-comment -->
				</div>
				<!-- /.box-footer -->
				
				<!-- /.box-footer -->
			  </div>
			  <!-- /.box -->
			</div>
			<!-- /.col -->
		  </div>
		  <div class="modal-footer modal-footer-uniform">
			<button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
			
		  </div>
		</div>
	  </div>
	</div>
    <!--End-->
    <script src="js/ckeditor/ckeditor.js"></script>
    <script src="js/3_Channel_Multichat.js"></script>
	<style>
		.style1{
			display: none;
			/*visibility: none;*/
		}
		
		.style2{
			margin-left: 50px;
		}
		.style3{
			margin-left: 350px;
		}
		.style4{
			display: block;
			/*visibility: none;*/
		}
		.style5{
			display: block;
		}
	</style>
    <script>
        function HideSideLeftMenu() {
            console.log("123");
            document.getElementById('SideLeftMenu').setAttribute("class", "style1");
            document.getElementById('SideRightMenu').setAttribute("class", "style2");
            document.getElementById('ShowMenu').setAttribute("class", "left-block content style4");
        }
        function ShowSideLeftMenu() {
            console.log("456");
            document.getElementById('ShowMenu').setAttribute("class", "left-block content style1");
            document.getElementById('SideLeftMenu').setAttribute("class", "left-block content style5");
            document.getElementById('SideRightMenu').setAttribute("class", "style3");
        }
    </script>
</asp:Content>
