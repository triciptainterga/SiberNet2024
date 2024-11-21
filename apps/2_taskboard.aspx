<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="2_taskboard.aspx.vb" Inherits="ICC._2_taskboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/2_taskboard.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxTicketID" runat="server" />
    <%--   <!-- Modal Edit Ticket Case-->
    <div class="modal modal-fill fade" data-backdrop="false" id="modal-fill" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p><a href="https://3cx.uidesk.id:5001/webclient/#/call?phone=08119970461&autodial=true" target="_blank">Call Here</a></p>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right">Save changes</button>
                </div>
            </div>
        </div>
    </div>--%>
    <!-- /.modal -->
    <div class="container-full">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="d-flex align-items-center">
                <div class="w-p100 d-md-flex align-items-center justify-content-between">
                    <h3 class="page-title">Taskboard</h3>
                    <div class="d-inline-block align-items-center">
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                                <li class="breadcrumb-item" aria-current="page">Apps</li>
                                <li class="breadcrumb-item active" aria-current="page">Taskboard</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main content -->
        <%--<a href="#" onclick="SubmitJira()">Submit JIRA</a>--%>
        <section class="content">
            <!-- /.col -->
            <%--<a onclick="postEmail_Notif()">Test Email</a>--%>
            <div class="row" id="2_TampungKotakAtas">
                <%--<div class="col-lg-3 col-6">
					  <a class="box box-link-shadow text-center" href="javascript:void(0)">
						<div class="box-body">
							<div class="font-size-24">+264</div>
							<span>Total Tickets</span>
						</div>
						<div class="box-body bg-info">
							<center>
								<span class="mdi mdi-ticket-confirmation font-size-30"></span>
							</center>
						</div>
					  </a>
				  </div>
				  <div class="col-lg-3 col-6">
					  <a class="box box-link-shadow text-center" href="javascript:void(0)">
						<div class="box-body">
							<div class="font-size-24">175</div>
							<span>Responded</span>
						</div>
						<div class="box-body bg-warning">
							<center>
								<span class="mdi mdi-message-reply-text font-size-30"></span>
							</center>
						</div>
					  </a>
				  </div>
				  <div class="col-lg-3 col-6">
					  <a class="box box-link-shadow text-center" href="javascript:void(0)">
						<div class="box-body">
							<div class="font-size-24">110</div>
							<span>Resolve</span>
						</div>
						<div class="box-body bg-success">
							<center>
								<span class="mdi mdi-thumb-up-outline font-size-30"></span>
							</center>
						</div>
					  </a>
				  </div>
				  <div class="col-lg-3 col-6">
					  <a class="box box-link-shadow text-center" href="javascript:void(0)">
						<div class="box-body">
							<div class="font-size-24">59</div>
							<span>Pending</span>
						</div>
						<div class="box-body bg-danger">
							<center>
								<span class="mdi mdi-ticket font-size-30"></span>
							</center>
						</div>
					  </a>
				  </div>--%>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="box">
                        <%--          <div class="box-header with-border">
                            <h4 class="box-title">Support Ticket List</h4>
                            <asp:Label runat="server" Visible="false" ID="lblSql"></asp:Label>
                        </div>--%>
                        <div class="box-body">
                            <center>
                                <div class="spinner-border text-warning" id="LoaderPageCounting"></div>
                            </center>
                            <div class="table-responsive">
                                <table id="TaskboardTicket" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                                    <thead>
                                        <tr>
                                            <th style="width: 20px;">#</th>
                                            <%--<th style="width: 20px;">No</th>--%>
                                            <th>Ticket Number</th>
                                            <th style="width: 200px;">Name</th>
                                            <%--<th>Email</th>--%>
                                            <th>Type</th>
                                            <%--<th>Created By</th>--%>
                                            <th>SLA</th>
                                            <th>Note SLA</th>
                                            <th>Position</th>
                                            <th>Status</th>
                                            <th style="width: 170px;">Date Create</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.row -->
            <div class="modal center-modal fade" id="modal-center" tabindex="-1" data-keyboard="false" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content" style="width: 850px; margin-left: -200px;">
                        <div class="modal-header">
                            <h5 class="modal-title">Form Internal Note</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <textarea rows="8" class="form-control" id="InternalNote" name="InternalNote" placeholder="Internal Note"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer-uniform">
                            <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionInternalNote()" id="SaveCustomer">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /.content -->
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var InternalNote = CKEDITOR.replace('InternalNote');
        InternalNote.config.height = 210;
        InternalNote.config.toolbar = 'Basic';
        InternalNote.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
