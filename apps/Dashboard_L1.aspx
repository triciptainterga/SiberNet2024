<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Dashboard_L1.aspx.vb" Inherits="ICC.Dashboard_L1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
	<script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Otorisasi Data Level -->
        <asp:HiddenField ID="hd_leveluser" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="hd_Org" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="hd_Unitkerja" ClientIDMode="Static" runat="server" />
    <!-- End -->
    <!-- Content Wrapper. Contains page content -->
  	<div class="content">
	  <div class="container-full">
		<!-- left content -->
		<section class="left-block content">
			<a class="mdi mdi-close mdi-menu btn btn-success open-left-block d-block d-md-none" href="javascript:void(0)"></a>
				<div class="scrollable" style="height: 100%;">
					<div class="left-content-area">

						<div class="box no-shadow">
							<div class="box-body">
							  <div class="contact-page-aside">
                                  <br />
								<ul class="list-style-none font-size-16">
									
                                    <li>
                                        <div class="d-flex flex-row">
							                <div class=""><img src="../Images/icon/process.png" alt="user" class="rounded-circle" width="70"></div>
							                <div class="pl-20">
								                <h5>TOTAL TICKETS</h5>
								                <h3><span class="text-success" id="spanTotTickets">00</span></h3>
								                
							                </div>
						                </div>
                                        <br />
                                    </li>
                                     <li>
                                        <div class="d-flex flex-row">
							                <div class=""><img src="../Images/icon/ticketsprocess.png" alt="user" class="rounded-circle" width="70"></div>
							                <div class="pl-20">
								                <h5>TICKETS OPEN</h5>
								                <h3><span class="text-success" id="spanTicketsOpen">0</span></h3>
								                
							                </div>
						                </div>
                                        <br />
                                    </li>
                                    <li>
                                        <div class="d-flex flex-row">
							                <div class=""><img src="../Images/icon/ticketsprocess.png" alt="user" class="rounded-circle" width="70"></div>
							                <div class="pl-20">
								                <h5>TICKETS PENDING</h5>
								                <h3><span class="text-success" id="spanTicketsProcessed">00</span></h3>
								                
							                </div>
						                </div>
                                        <br />
                                    </li>
                                    <li>
                                        <div class="d-flex flex-row">
							                <div class=""><img src="../Images/icon/closed.png" alt="user" class="rounded-circle" width="70"></div>
							                <div class="pl-20">
								                <h5>TICKETS CLOSED</h5>
								                <h3><span class="text-success" id="spanTicketsClosed">00</span></h3>
								                
							                </div>
						                </div>
                                        <br />
                                    </li>
                                    <li>
                                        <div class="box">
                                            Top 3 Agent Call
                                        <div class="box-body">
						                    <div class="row mt-10" id="top3Call">
							                   
							                    <div class="col-12 text-center">
								                   <h6 class="font-size-12 mt-5">No data to display</h6>
							                    </div>
						                    </div>
					                    </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="box">
                                            Top 3 Agent Email
                                        <div class="box-body">
						                    <div class="row mt-10" id="top3Email">
							                    <div class="col-12 text-center">
								                   <h6 class="font-size-12 mt-5">No data to display</h6>
							                    </div>
						                    </div>
					                    </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="box">
                                            Top 3 Agent Whatsapp
                                        <div class="box-body">
						                    <div class="row mt-10" id="top3Whatsapp">
							                    <div class="col-12 text-center">
								                   <h6 class="font-size-12 mt-5">No data to display</h6>
							                    </div>
						                    </div>
					                    </div>
                                        </div>
                                    </li>
                                  
                                    <li style="visibility:hidden">
                                        
                                        <div class="d-flex flex-row">
							               <div class="box">
					                            <div class="box-body">
						                            <div class="d-flex flex-row">
							                            <div class=""><img src="../images/avatar/2.jpg" alt="user" class="rounded-circle" width="80"></div>
							                            <div class="pl-20">
								                            <h4>Aditya Purnama</h4>
								                            <h6><i class="fa fa-phone text-muted mr-5"></i> Call Received 100</h6>
								                            <h6><i class="fa fa-ticket text-muted mr-5"></i> Resolved/Day 40</h6>
							                            </div>
						                            </div>
						
					                            </div>
				
				                            </div>

						                </div>
                                       
                                    </li>
                                    <li style="visibility:hidden">
                                        
                                        <div class="d-flex flex-row">
							               <div class="box">
					                            <div class="box-body">
						                            <div class="d-flex flex-row">
							                            <div class=""><img src="../images/avatar/3.jpg" alt="user" class="rounded-circle" width="80"></div>
							                            <div class="pl-20">
								                            <h4>Aditya Purnama</h4>
								                            <h6><i class="fa fa-phone text-muted mr-5"></i> Call Received 50</h6>
								                            <h6><i class="fa fa-ticket text-muted mr-5"></i> Resolved/Day 10</h6>
							                            </div>
						                            </div>
						
					                            </div>
				
				                            </div>

						                </div>
                                       
                                    </li>
                                    <li style="visibility:hidden">
                                      
                                        <div class="d-flex flex-row">
							               <div class="box">
					                            <div class="box-body">
						                            <div class="d-flex flex-row">
							                            <div class=""><img src="../images/avatar/1.jpg" alt="user" class="rounded-circle" width="80"></div>
							                            <div class="pl-20">
								                            <h4>Aditya Purnama</h4>
								                            <h6><i class="fa fa-phone text-muted mr-5"></i> Call Received 150</h6>
								                            <h6><i class="fa fa-ticket text-muted mr-5"></i> Resolved/Day 60</h6>
							                            </div>
						                            </div>
						
					                            </div>
				
				                            </div>

						                </div>
                                       
                                    </li>
                                    
                                    <li style="visibility:hidden">
                                        <div class="d-flex flex-row">
							                <div class=""><img src="../Images/icon/totaltickets.png" alt="user" class="rounded-circle" width="70"></div>
							                <div class="pl-20">
								                <h4>1st TOUCH RESOLUTION</h4>
								                <h3><span class="text-success" id="spanTotalClosedByAgent">0%</span></h3>
								                
							                </div>
						                </div>
                                        <br />
                                    </li>
                                    <li style="visibility:hidden">
                                        <div class="d-flex flex-row">
							                <div class=""><img src="../Images/icon/solved.png" alt="user" class="rounded-circle" width="70"></div>
							                <div class="pl-20">
								                <h4>Avg RESOLVED DAYS</h4>
								                <h3><span class="text-success" id="spanAvgResolvedDays">00</span></h3>
								                
							                </div>
						                </div>
                                        <br />
                                    </li>
                                    <%--<li>
                                        <div class="d-flex flex-row">
							                <div class=""><img src="../Images/icon/rating.png" alt="user" class="rounded-circle" width="70"></div>
							                <div class="pl-20">
								                <h4>SATISFACTION SCORE</h4>
								                <h3><span class="text-success" id="spanSatisfactionScore">00%</span></h3>
								                
							                </div>
						                </div>
                                        <br />
                                    </li>--%>
                                    <li style="visibility:hidden">
                                        <div class="d-flex flex-row">
							                <div class=""><img src="../Images/icon/slanew.png" alt="user" class="rounded-circle" width="70"></div>
							                <div class="pl-20">
								                <h4>% RESOLVED WITH SLA</h4>
								                <h3><span class="text-success" id="spanResolvedWithSLA">00%</span></h3>
								                
							                </div>
						                </div>
                                        <br />
                                    </li>
								    
                                </ul>
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
            <div class="row">
                <div class="col-3">
                    <div class="form-group">
					  <label>Agent Name</label>
					  <select class="form-control" id="dataAgentName">
						<%--<option value="Agent1">Agent1</option>
						<option value="csicon1">csicon1</option>
						<option>Name 3</option>
						<option>Name 4</option>
						<option>Name 5</option>--%>
					  </select>
					</div>
                </div>
                <div class="col-3">
                    <div class="form-group">
					  <label>Start Date</label>
					  <input class="form-control" type="date" id="dataStartDate">
					</div>
                </div>
                <div class="col-3">
                    <div class="form-group">
					  <label>End Date</label>
					  <input class="form-control" type="date" id="dataEndDate">
					</div>
                    
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <br />
                        <button onclick="clickResult()" type="button" class="btn mb-5 bg-gradient-secondary">Search</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
				<div class="box" >
				  <div class="row no-gutters py-2" id="isiBoxCategory">
                    
					<div class="col-12 col-lg-3">
					  <div class="box-body br-1 border-light">
						<div class="flexbox mb-1">
						  <span>
							<i class="ion-person font-size-26"></i><br>
							Complaint
						  </span>
						  <span class="text-primary font-size-40" id="spanComplaint">0</span>
						</div>
						<div class="progress progress-xxs mt-10 mb-0">
						  <div class="progress-bar" role="progressbar" style="width: 100%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					  </div>
					</div>

					<div class="col-12 col-lg-3 hidden-down">
					  <div class="box-body br-1 border-light">
						<div class="flexbox mb-1">
						  <span>
							<i class="ion-document font-size-26"></i><br>
							Information
						  </span>
						  <span class="text-info font-size-40" id="spanInformation">0</span>
						</div>
						<div class="progress progress-xxs mt-10 mb-0">
						  <div class="progress-bar bg-info" role="progressbar" style="width: 100%; height: 4px;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					  </div>
					</div>

					<div class="col-12 col-lg-3 d-none d-lg-block">
					  <div class="box-body br-1 border-light">
						<div class="flexbox mb-1">
						  <span>
							<i class="ion-information font-size-26"></i><br>
							Request
						  </span>
						  <span class="text-warning font-size-40" id="spanRequest">0</span>
						</div>
						<div class="progress progress-xxs mt-10 mb-0">
						  <div class="progress-bar bg-warning" role="progressbar" style="width: 100%; height: 4px;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					  </div>
					</div>

					<div class="col-12 col-lg-3 d-none d-lg-block">
					  <div class="box-body">
						<div class="flexbox mb-1">
						  <span>
							<i class="ion-folder font-size-26"></i><br>
							Inquiry
						  </span>
						  <span class="text-danger font-size-40" id="spanInquiry">0</span>
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
           <%-- <div class="row">
            <div class="col-xl-12 col-lg-12">
			    <!-- box -->
			    <div class="box-group">
			        <div class="box">
				        <div class="bg-temple-white rounded vertical-align h-150">
				        <div class="vertical-align-middle text-center w-p100 font-size-40">
					        <div class="mb-5"><i class="fa fa-facebook"></i></div>
					        <span class="countnm">15</span>
				        </div>
				        </div>
			        </div>
			        <div class="box p-0">
				        <div class="bg-temple-white vertical-align h-150">
				        <div class="vertical-align-middle text-center w-p100 font-size-40">
					        <div class="mb-5"><i class="fa fa-twitter"></i></div>
					        <span class="countnm">20</span>
				        </div>
				        </div>
			        </div>
			        <div class="box p-0">
				        <div class="bg-temple-white vertical-align h-150">
				        <div class="vertical-align-middle text-center w-p100 font-size-40">
					        <div class="mb-5"><i class="fa fa-instagram"></i></div>
					        <span class="countnm">10</span>
				        </div>
				        </div>
			        </div>
               
			   
                      
                    <div class="box p-0">
				    <div class="bg-temple-white vertical-align h-150">
				    <div class="vertical-align-middle text-center w-p100 font-size-40">
					    <div class="mb-5"><i class="fa fa-whatsapp"></i></div>
					    <span class="countnm">100</span>
				    </div>
				    </div>
			    </div>
                    <div class="box p-0">
				        <div class="bg-temple-white vertical-align h-150">
				        <div class="vertical-align-middle text-center w-p100 font-size-40">
					        <div class="mb-5"><i class="fa fa-envelope"></i></div>
					        <span class="countnm">70</span>
				        </div>
				        </div>
			        </div>
                    <div class="box p-0">
				        <div class="bg-temple-white vertical-align h-150">
				        <div class="vertical-align-middle text-center w-p100 font-size-40">
					        <div class="mb-5"><i class="fa fa-phone"></i></div>
					        <span class="countnm">210</span>
				        </div>
				        </div>
			        </div>
                </div>
			</div>
            
        </div>--%>
           <div class="row">
                <div class="col-lg-12">
					
						<div class="box-body analytics-info">
							<h4 class="box-title">Agent Productivity</h4>
                            <div class="row">
                                <div class="col-lg-4 col-12">
			                      <!-- Widget: user widget style 1 -->
			                      <div class="box box-widget widget-user">
				                    <!-- Add the bg color to the header using any of the bg-* classes -->
				                    <div class="widget-user-header bg-primary" data-overlay="5">
				                      <h3 class="widget-user-username text-white">Channel Call</h3>
				                      
				                    </div>
				                    <div class="widget-user-image">
				                      <img class="rounded-circle" src="../Images/icon/channel/call.png" alt="User Avatar">
				                    </div>
				                    <div class="box-footer">
				                      <div class="row" id="dataRowCallProductivity">
					                    <div class="col-sm-12">
					                      <div class="description-block">
						                    
						                    <span class="description-text">No Data To Display</span>
					                      </div>
					                      <!-- /.description-block -->
					                    </div>
					                    <!-- /.col -->
					                  
				                      </div>
				                      <!-- /.row -->
				                    </div>
                                      <div class="box-body p-0">
						                <div class="media-list media-list-hover media-list-divided">
                                            <div class="description-block">
						                        
						                        <span class="description-text">Top 5 Topic/Subtopic</span>
					                        </div>
							                <div id="dataRowCallProductivityTopic">
                                                    <div class="media media-single">
							                            <div class="media-body">
								                        <h6><a href="#">Topic 1 Escalation Tickets</a></h6>
							                            </div>
							                            <div class="media-right">
								                        <a class="btn btn-block btn-primary btn-sm" href="#">20</a>
							                            </div>
							                        </div>
							            
                                             </div>
						                </div>
					                </div>
                                    <div class="box-body p-0">
						            <div class="media-list media-list-hover media-list-divided">
                                        <div class="description-block">
						                        
						                    <span class="description-text">Top 5 Topic/Subtopic Escalation Tickets</span>
					                    </div>
                                        <div id="dataRowCallProductivityTopicEscalation">
                                            <div class="media media-single">
							                    <div class="media-body">
								                <h6><a href="#">Topic 1 Escalation Tickets</a></h6>
								               
							                    </div>
							                    <div class="media-right">
								                <a class="btn btn-block btn-primary btn-sm" href="#">20</a>
							                    </div>
							                </div>
							            
                                        </div>
							            
						            </div>
					                </div>
			                      </div>
			                      <!-- /.widget-user -->
			                    </div>
                                <div class="col-lg-4 col-12">
			                      <!-- Widget: user widget style 1 -->
			                      <div class="box box-widget widget-user">
				                    <!-- Add the bg color to the header using any of the bg-* classes -->
				                    <div class="widget-user-header bg-warning" data-overlay="5">
				                      <h3 class="widget-user-username text-white">Channel Email</h3>
				                      
				                    </div>
				                    <div class="widget-user-image">
				                      <img class="rounded-circle" src="../Images/icon/channel/email.png" alt="User Avatar">
				                    </div>
				                    <div class="box-footer">
				                      <div class="row" id="dataRowEmailProductivity">
					                    <div class="col-sm-12">
					                      <div class="description-block">
						                    
						                    <span class="description-text">No Data To Display</span>
					                      </div>
					                      <!-- /.description-block -->
					                    </div>
					                    <!-- /.col -->
				                      </div>
				                      <!-- /.row -->
				                    </div>
                                    <div class="box-body p-0">
						                <div class="media-list media-list-hover media-list-divided">
                                            <div class="description-block">
						                        
						                        <span class="description-text">Top 5 Topic/Subtopic</span>
					                        </div>
							                <div id="dataRowEmailProductivityTopic">
                                                    <div class="media media-single">
							                            <div class="media-body">
								                        <h6><a href="#">Topic 1 Escalation Tickets</a></h6>
								               
							                            </div>
							                            <div class="media-right">
								                        <a class="btn btn-block btn-primary btn-sm" href="#">20</a>
							                            </div>
							                        </div>
							            
                                             </div>
						                </div>
					                </div>
                                    <div class="box-body p-0">
						            <div class="media-list media-list-hover media-list-divided">
                                        <div class="description-block">
						                        
						                    <span class="description-text">Top 5 Topic/Subtopic Escalation Tickets</span>
					                    </div>
                                        <div id="dataRowEmailProductivityTopicEscalation">
                                            <div class="media media-single">
							                    <div class="media-body">
								                <h6><a href="#">Topic 1 Escalation Tickets</a></h6>
								               
							                    </div>
							                    <div class="media-right">
								                <a class="btn btn-block btn-primary btn-sm" href="#">20</a>
							                    </div>
							                </div>
							            
                                        </div>
							            
						            </div>
					                </div>
			                      </div>
			                      <!-- /.widget-user -->
			                    </div>
                                <div class="col-lg-4 col-12">
			                      <!-- Widget: user widget style 1 -->
			                      <div class="box box-widget widget-user">
				                    <!-- Add the bg color to the header using any of the bg-* classes -->
				                    <div class="widget-user-header bg-success" data-overlay="5">
				                      <h3 class="widget-user-username text-white">Channel Whatsapp</h3>
				                      
				                    </div>
				                    <div class="widget-user-image">
				                      <img class="rounded-circle" src="../Images/icon/channel/whatsapp.png" alt="User Avatar">
				                    </div>
				                    <div class="box-footer">
				                      <div class="row" id="dataRowWAProductivity">
					                    <div class="col-sm-12">
					                      <div class="description-block">
						                    
						                    <span class="description-text">No Data To Display</span>
					                      </div>
					                      <!-- /.description-block -->
					                    </div>
					                    <!-- /.col -->
				                      </div>
				                      <!-- /.row -->
				                    </div>
                                    <div class="box-body p-0">
						                <div class="media-list media-list-hover media-list-divided">
                                            <div class="description-block">
						                        
						                        <span class="description-text">Top 5 Topic/Subtopic</span>
					                        </div>
							                <div id="dataRowWAProductivityTopic">
                                                    <div class="media media-single">
							                            <div class="media-body">
								                        <h6><a href="#">Topic 1 Escalation Tickets</a></h6>
								               
							                            </div>
							                            <div class="media-right">
								                        <a class="btn btn-block btn-primary btn-sm" href="#">20</a>
							                            </div>
							                        </div>
							            
                                             </div>
						                </div>
					                </div>
                                    <div class="box-body p-0">
						            <div class="media-list media-list-hover media-list-divided">
                                        <div class="description-block">
						                        
						                    <span class="description-text">Top 5 Topic/Subtopic Escalation Tickets</span>
					                    </div>
                                        <div id="dataRowWAProductivityTopicEscalation">
                                            <div class="media media-single">
							                    <div class="media-body">
								                <h6><a href="#">Topic 1 Escalation Tickets</a></h6>
								               
							                    </div>
							                    <div class="media-right">
								                <a class="btn btn-block btn-primary btn-sm" href="#">20</a>
							                    </div>
							                </div>
							            
                                        </div>
							            
						            </div>
					                </div>
			                      </div>
			                      <!-- /.widget-user -->
			                    </div>
                            </div>
						</div>
					
				</div>
            </div>


        </section>
    </div>
  	
    
	<!-- Vendor JS -->
	<script src="js/vendors.min.js"></script>
	<script src="js/pages/chat-popup.js"></script>
    
	<script src="../assets/vendor_components/jquery.peity/jquery.peity.js"></script>
	<script src="../assets/vendor_components/easypiechart/dist/jquery.easypiechart.js"></script>
	<script src="../assets/vendor_components/chart.js-master/Chart.min.js"></script>
	<script src="../assets/vendor_components/d3/d3.min.js"></script>
	<script src="../assets/vendor_components/d3/d3_tooltip.js"></script>
    <script src="../assets/vendor_components/echarts/dist/echarts-en.min.js"></script>
	<!-- Chat Bot Admin App -->
	<%--<script src="js/template.js"></script>--%>
	<script src="js/demo.js"></script>
	<script src="js/Dashboard_L1.js"></script>
    
    <%--<script src="js/pages/echart-bar.js"></script>--%>
</asp:Content>
