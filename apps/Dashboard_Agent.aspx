<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Dashboard_Agent.aspx.vb" Inherits="ICC.Dashboard_Agent" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <!-- Content Wrapper. Contains page content -->

		<!-- Content Header (Page header) -->
		<div class="content-header">
			<div class="d-flex align-items-center">
				<div class="w-p100 d-md-flex align-items-center justify-content-between">
					<h3 class="page-title">Dashboard Agent</h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
								<li class="breadcrumb-item" aria-current="page">Widgets</li>
								<li class="breadcrumb-item active" aria-current="page">Chart widgets</li>
							</ol>
						</nav>
					</div>
				</div>
				
			</div>
		</div>	  

		<!-- Main content -->
		<section class="content">

			<div class="row">

				<div class="col-md-6 col-xl-4">
					<!-- Basic bar chart -->
					<div class="box bg-warning">
						<div class="box-body">
							<div class="d-flex">
								<h3 class="font-weight-600 mb-0">120</h3>
							</div>

							<div>
								Complaint Weekly
								<div class="font-size-16">50 avg</div>
							</div>
						</div>

						<div id="line_chart_color"></div>
					</div>
					<!-- /basic bar chart -->
				</div>	
                <div class="col-md-6 col-xl-4">
					<!-- Basic bar chart -->
					<div class="box bg-info">
						<div class="box-body">
							<div class="d-flex">
								<h3 class="font-weight-600 mb-0">120</h3>
							</div>

							<div>
								Request Weekly
								<div class="font-size-16">50 avg</div>
							</div>
						</div>

						<div id="line_chart_request_color"></div>
					</div>
					<!-- /basic bar chart -->
				</div>	
			    <div class="col-md-6 col-xl-4">
					<!-- Basic bar chart -->
					<div class="box bg-dark">
						<div class="box-body">
							<div class="d-flex">
								<h3 class="font-weight-600 mb-0">120</h3>
							</div>

							<div>
								Inquiry Weekly
								<div class="font-size-16">50 avg</div>
							</div>
						</div>

						<div id="line_chart_inquiry_color"></div>
					</div>
					<!-- /basic bar chart -->
				</div>

            </div>
            <div class="row">
                <div class="col-xl-8 col-lg-12">
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
               
			  <%--</div>
              <div class="box-group">--%>
                      
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
                <div class="col-xl-4 col-lg-12">
                    <div class="box-group">
					<div class="box">
					  <div class="vertical-align h-200">
						<div class="vertical-align-middle font-size-30 text-center w-p100">
						  <span class="mr-10"><i class="fa fa-line-chart"></i></span>
						  <span class="countnm per">75</span>
						  <div class="font-size-16 mt-3 text-fade">More Activity</div>
						</div>
					  </div>
					</div>
					<div class="box bg-primary bg-temple-dark">
					  <div class="vertical-align text-center p-30 h-200">
						<div class="vertical-align-middle font-size-40">
						  <p>Today</p>
						  
						</div>
					  </div>
					</div>
				</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
					<div class="box">
						<div class="box-body analytics-info">
							<h4 class="box-title">Weekly Activity</h4>
							<div id="stacked-bar" style="height:400px;"></div>
						</div>
					</div>
				</div>
            </div>
		</section>
		<!-- /.content -->	  
	
  <!-- /.content-wrapper -->
    <!-- Chat Bot Admin App -->
    <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
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
	<script src="js/template.js"></script>
	<script src="js/demo.js"></script>
	<script src="js/Dashboard_Agent.js"></script>
    
    <script src="js/pages/echart-bar.js"></script>
</asp:Content>
