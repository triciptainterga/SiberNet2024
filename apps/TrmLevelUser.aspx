<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmLevelUser.aspx.vb" Inherits="ICC.TrmLevelUser" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmLevelUser.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="row">
            <div class="col-12 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-success"><span>Layer 1</span></div>
                    <div class="box-header no-border p-0">
                        <a href="#">
                            <img class="img-fluid" src="../images/avatar/375x200/2.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="text-center">
                            <%-- <div class="user-contact list-inline text-center">
                                <a href="#" class="btn btn-circle mb-5 btn-facebook"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-instagram"><i class="fa fa-instagram"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-twitter"><i class="fa fa-twitter"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-warning"><i class="fa fa-envelope"></i></a>
                            </div>--%>
                            <span class="badge badge-pill badge-primary badge-lg">
                                <p id="layer1" style="text-align: center;"></p>
                            </span>
                            <br />
                            <br />
                            <h6 class="user-info mt-0 mb-10 text-fade">Agent Contact Center </h6>
                            <p class="text-fade w-p85 mx-auto" style="text-align: center;">First Handling Problem Service</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-warning"><span>Layer 2</span></div>
                    <div class="box-header no-border p-0">
                        <a href="#">
                            <img class="img-fluid" src="../images/avatar/375x200/3.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="text-center">
                            <%-- <div class="user-contact list-inline text-center">
                                <a href="#" class="btn btn-circle mb-5 btn-facebook"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-instagram"><i class="fa fa-instagram"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-twitter"><i class="fa fa-twitter"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-warning"><i class="fa fa-envelope"></i></a>
                            </div>--%>
                            <span class="badge badge-pill badge-primary badge-lg">
                                <p id="layer2" style="text-align: center;"></p>
                            </span>
                            <br />
                            <br />
                            <h6 class="user-info mt-0 mb-10 text-fade">Support Agent (Supervisor Agent)</h6>
                            <p class="text-fade w-p85 mx-auto" style="text-align: center;">Escalation Handling Problem Service</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-danger"><span>Layer 3</span></div>
                    <div class="box-header no-border p-0">
                        <a href="#">
                            <img class="img-fluid" src="../images/avatar/375x200/5.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="text-center">
                            <%-- <div class="user-contact list-inline text-center">
                                <a href="#" class="btn btn-circle mb-5 btn-facebook"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-instagram"><i class="fa fa-instagram"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-twitter"><i class="fa fa-twitter"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-warning"><i class="fa fa-envelope"></i></a>
                            </div>--%>
                            <span class="badge badge-pill badge-primary badge-lg">
                                <p id="layer3" style="text-align: center;"></p>
                            </span>
                            <br />
                            <br />
                            <h6 class="user-info mt-0 mb-10 text-fade">Department Unit Case</h6>
                            <p class="text-fade w-p85 mx-auto" style="text-align: center;">Escalation Handling Problem Department</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-info"><span>Supervisor</span></div>
                    <div class="box-header no-border p-0">
                        <a href="#">
                            <img class="img-fluid" src="../images/avatar/375x200/4.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="text-center">
                            <%-- <div class="user-contact list-inline text-center">
                                <a href="#" class="btn btn-circle mb-5 btn-facebook"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-instagram"><i class="fa fa-instagram"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-twitter"><i class="fa fa-twitter"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-warning"><i class="fa fa-envelope"></i></a>
                            </div>--%>
                            <span class="badge badge-pill badge-primary badge-lg">
                                <p id="layerSpv" style="text-align: center;"></p>
                            </span>
                            <br />
                            <br />
                            <h6 class="user-info mt-0 mb-10 text-fade">Department Unit Case (Supervisor)</h6>
                            <p class="text-fade w-p85 mx-auto" style="text-align: center;">Monitoring Handling Problem Department </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-primary"><span>Administrator</span></div>
                    <div class="box-header no-border p-0">
                        <a href="#">
                            <img class="img-fluid" src="../images/avatar/375x200/1.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                         <%-- <div class="user-contact list-inline text-center">
                                <a href="#" class="btn btn-circle mb-5 btn-facebook"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-instagram"><i class="fa fa-instagram"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-twitter"><i class="fa fa-twitter"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-warning"><i class="fa fa-envelope"></i></a>
                            </div>--%>
                        <div class="text-center">
                            <span class="badge badge-pill badge-primary badge-lg">
                                <p id="layerAdm" style="text-align: center;"></p>
                            </span>
                            <br />
                            <br />
                            <h6 class="user-info mt-0 mb-10 text-fade">Administrator System</h6>
                            <p class="text-fade w-p85 mx-auto" style="text-align: center;">Operations Application System</p>
                        </div>
                    </div>
                </div>
            </div>
            <%--  <div class="col-12 col-lg-4">
				<div class="box">
				  <div class="box-header no-border p-0">				
					<a href="#">
					  <img class="img-fluid" src="../images/avatar/375x200/6.jpg" alt="">
					</a>
				  </div>
				  <div class="box-body">
					  <div class="text-center">
						<div class="user-contact list-inline text-center">
							<a href="#" class="btn btn-circle mb-5 btn-facebook"><i class="fa fa-facebook"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-instagram"><i class="fa fa-instagram"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-twitter"><i class="fa fa-twitter"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-warning"><i class="fa fa-envelope"></i></a>				
						</div>
						<h3 class="my-10"><a href="#">William</a></h3>
						<h6 class="user-info mt-0 mb-10 text-fade">Marketing Department</h6>
						<p class="text-fade w-p85 mx-auto">125 Ipsum Lorem Ave, Suite 458 New York, USA 154875 </p>
					  </div>
				  </div>
				</div>
			  </div>
			  <div class="col-12 col-lg-4">
				<div class="box">
				  <div class="box-header no-border p-0">				
					<a href="#">
					  <img class="img-fluid" src="../images/avatar/375x200/7.jpg" alt="">
					</a>
				  </div>
				  <div class="box-body">
					  <div class="text-center">
						<div class="user-contact list-inline text-center">
							<a href="#" class="btn btn-circle mb-5 btn-facebook"><i class="fa fa-facebook"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-instagram"><i class="fa fa-instagram"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-twitter"><i class="fa fa-twitter"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-warning"><i class="fa fa-envelope"></i></a>				
						</div>
						<h3 class="my-10"><a href="#">Tristan</a></h3>
						<h6 class="user-info mt-0 mb-10 text-fade">Designer</h6>
						<p class="text-fade w-p85 mx-auto">125 Ipsum Lorem Ave, Suite 458 New York, USA 154875 </p>
					  </div>
				  </div>
				</div>
			  </div>
			  <div class="col-12 col-lg-4">
				<div class="box">
				  <div class="box-header no-border p-0">				
					<a href="#">
					  <img class="img-fluid" src="../images/avatar/375x200/8.jpg" alt="">
					</a>
				  </div>
				  <div class="box-body">
					  <div class="text-center">
						<div class="user-contact list-inline text-center">
							<a href="#" class="btn btn-circle mb-5 btn-facebook"><i class="fa fa-facebook"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-instagram"><i class="fa fa-instagram"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-twitter"><i class="fa fa-twitter"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-warning"><i class="fa fa-envelope"></i></a>				
						</div>
						<h3 class="my-10"><a href="#">Michael</a></h3>
						<h6 class="user-info mt-0 mb-10 text-fade">Designer</h6>
						<p class="text-fade w-p85 mx-auto">125 Ipsum Lorem Ave, Suite 458 New York, USA 154875 </p>
					  </div>
				  </div>
				</div>
			  </div>
			  <div class="col-12 col-lg-4">
				<div class="box">
				  <div class="box-header no-border p-0">				
					<a href="#">
					  <img class="img-fluid" src="../images/avatar/375x200/2.jpg" alt="">
					</a>
				  </div>
				  <div class="box-body">
					  <div class="text-center">
						<div class="user-contact list-inline text-center">
							<a href="#" class="btn btn-circle mb-5 btn-facebook"><i class="fa fa-facebook"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-instagram"><i class="fa fa-instagram"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-twitter"><i class="fa fa-twitter"></i></a>
							<a href="#" class="btn btn-circle mb-5 btn-warning"><i class="fa fa-envelope"></i></a>				
						</div>
						<h3 class="my-10"><a href="#">Sophia</a></h3>
						<h6 class="user-info mt-0 mb-10 text-fade">Full Stack Developer</h6>
						<p class="text-fade w-p85 mx-auto">125 Ipsum Lorem Ave, Suite 458 New York, USA 154875 </p>
					  </div>
				  </div>
				</div>
			  </div>--%>
        </div>

    </section>
</asp:Content>
