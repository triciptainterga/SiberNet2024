<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_CreateCampaign.aspx.vb" Inherits="ICC._3_CreateCampaign" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/3_CreateCampaign.js"></script>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Content Wrapper. Contains page content -->
    <div class="content">
        <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="d-flex align-items-center">
                    <div class="w-p100 d-md-flex align-items-center justify-content-between">
                        <h3 class="page-title">Create a Campaign</h3>
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
                                <div class="box">
                                    <div class="box-header with-border">
                                        <h4 class="box-title">Campaign list</h4>
                                        <a href="3_CreateCampaign_ListGroup.aspx" class="btn btn-rounded btn-warning pull-right">+</a>
                                    </div>
                                    <div class="box-body p-0">
                                        <div id="ListCampaigns" class="media-list media-list-hover media-list-divided inner-user-div" style="height: 345px">
                                            <%--<div class="media media-single">
						      <a href="#">
							    <img src="../images/icon/wa.png" height="32" alt="...">
						      </a>
						      <div class="media-body">
							    <h6><a href="#">Promosi susu bendera</a></h6>
							    <small class="text-fader">Whatsapp</small>
						      </div>
						    </div>
                            <div class="media media-single">
						      <a href="#">
							    <img src="../images/icon/call.png" height="32" alt="...">
						      </a>
						      <div class="media-body">
							    <h6><a href="#">Informasi hindari berkumpul</a></h6>
							    <small class="text-fader">Call</small>
						      </div>
						    </div>
						    <div class="media media-single">
						      <a href="#">
							    <img src="../images/icon/email_blast_.png" height="32" alt="...">
						      </a>
						      <div class="media-body">
							    <h6><a href="#">Kepuasan terhadap kinerja agent</a></h6>
							    <small class="text-fader">Email Blast</small>
						      </div>
						    </div>
                            <div class="media media-single">
						      <a href="#">
							    <img src="../images/icon/email_blast_.png" height="32" alt="...">
						      </a>
						      <div class="media-body">
							    <h6><a href="#">Indimie Rasa Variant Baru</a></h6>
							    <small class="text-fader">Email Blast</small>
						      </div>
						    </div>
                            <div class="media media-single">
						      <a href="#">
							    <img src="../images/icon/call.png" height="32" alt="...">
						      </a>
						      <div class="media-body">
							    <h6><a href="#">Tunggakan tagihan Tayota</a></h6>
							    <small class="text-fader">Call</small>
						      </div>
						    </div>--%>
                                        </div>
                                    </div>
                                    <div class="text-center bt-1 border-light p-2">
                                        <a class="text-uppercase d-block font-size-12" href="#">Multiple Channel Campaign</a>
                                    </div>
                                </div>
                                <!-- /.widget-user -->
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-8 col-12">
                        <div class="row">
                            <!-- /.col -->
                            <div class="col-lg-6 col-12">
                                <!-- Default box -->
                                <div class="box text-center">
                                    <div class="box-body bg-warning-light">
                                        <div class="p-25">
                                            <div>
                                                <img src="../images/icon/call.png" alt="...">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.box-body -->
                                    <div class="box-footer">
                                        <div class="p-30">
                                            <div class="row">
                                                <div class="col-8">

                                                    <p class="text-left">
                                                        <h5>Create Call Campaign </h5>
                                                    </p>


                                                </div>
                                                <div class="col-4">
                                                    <a href="3_CreateCampaign_Grid.aspx?type=call" class="btn btn-rounded btn-warning pull-right">Create</a>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <p class="font-italic">
                                                    <small>To get phone calls to your business, set up a call campaign to encourage customers to call you by clicking or tapping your ad. 
                                          You can set your ads to show only when your business can take calls, 
                                          so you won't miss an opportunity to connect with your customers.</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- /.box -->
                            </div>
                            <!-- /.col -->
                            <div class="col-lg-6 col-12">
                                <!-- Default box -->
                                <div class="box">
                                    <div class="box-header with-border bg-primary">
                                        <img src="../images/icon/email_blast_.png" height="48" alt="...">
                                    </div>
                                    <div class="box-body">
                                        <div class="row">
                                            <div class="col-6">
                                                <p class="text-left">
                                                    <h5>Create Email Blast Campaign </h5>
                                                </p>
                                            </div>
                                            <div class="col-6 text-right">
                                                <a href="3_CreateCampaign_Grid.aspx?type=Email" class="btn btn-rounded btn-danger btn-outline">Create</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.box-body -->
                                </div>
                                <!-- /.box -->

                                <!-- Default box -->
                                <div class="box">
                                    <div class="box-body">
                                        <div class="row">
                                            <div class="col-6">
                                                <img src="../images/icon/wa.png" alt="...">
                                            </div>
                                            <div class="col-6 text-right">
                                                <p class="text-left">
                                                    <h5>Create WA Campaign </h5>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.box-body -->
                                    <div class="box-footer bg-success">
                                        <a href="3_CreateCampaign_Grid.aspx?type=Whatsapp" class="btn btn-rounded btn-danger">Create</a>
                                    </div>
                                </div>
                                <!-- /.box -->
                            </div>

                        </div>

                    </div>
                </div>
                <!-- /.row -->

            </section>
            <!-- /.content -->
        </div>
    </div>
    <!-- /.content-wrapper -->
</asp:Content>
