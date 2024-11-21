<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmCreateCampaign.aspx.vb" Inherits="ICC.TrmCreateCampaign" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmCampaignContent.js"></script>
    <script src="js/TrmCreateCampaign.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <%--<div class="content-header">
        <div class="d-flex align-items-center">
            <div class="w-p100 d-md-flex align-items-center justify-content-between">
                <h3 class="page-title"></h3>
                <div class="d-inline-block align-items-center">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                            <li class="breadcrumb-item" aria-current="page">Outbound</li>
                            <li class="breadcrumb-item active" aria-current="page">Create Campaign Data</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>--%>
    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-xl-3 col-lg-4 col-12">
                <div class="row">
                    <div class="col-12">
                        <div class="box">
                            <div class="box-header with-border">
                                <%--<h4 class="box-title">Group Campaign</h4>--%>
                                <div class="lookup lookup-sm lookup-right d-none d-lg-block">
                                    <input type="text" id="TxtSearchingCampaign" placeholder="Search Campaign Name" class="w-p100">
                                </div>
                                <%--                                <a href="TrmCampaign.aspx" class="btn btn-rounded btn-warning pull-right">+</a>--%>
                            </div>
                            <div class="box-body p-0">
                                <div id="ListCampaigns" class="media-list media-list-hover media-list-divided inner-user-div" style="height: 345px;">
                                    <%-- <div class="media media-single">
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
                            <div class="modal-footer modal-footer-uniform">
                                <button type="button" class="btn btn-rounded btn-warning float-right" onclick="addCampaign();">+ Add Campaign</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="box">
                            <div class="box-header with-border">
                                <div class="lookup lookup-sm lookup-right d-none d-lg-block">
                                    <input type="text" id="TxtCampaignContent" placeholder="Search Campaign Content" class="w-p100">
                                </div>
                                <%--<a href="TrmCampaignContent.aspx" class="btn btn-rounded btn-warning pull-right">+</a>--%>
                            </div>
                            <div id="ListCampaignTemplate" class="media-list media-list-hover media-list-divided inner-user-div" style="height: 345px;">
                            </div>
                            <%--<div class="box-body p-0">
                                <div id="Div1" class="media-list media-list-hover media-list-divided inner-user-div" style="height: 345px;">
                                    <div class="media media-single">
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
                                    </div>
                                </div>
                            </div>--%>
                            <div class="modal-footer modal-footer-uniform">
                                <button type="button" class="btn btn-rounded btn-warning float-right" onclick="addContent();">+ Add Template</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-8 col-12">
                <div class="row" id="divCreateCampaignData"></div>
                <%--<div class="row">                   
                    <div class="col-3">
                        <div class="box">
                            <div class="box-header with-border bg-danger">
                                <img src="../images/icon/email_blast_.png" height="48" alt="...">
                            </div>
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-6 text-left">
                                        <a href="TrmCreateCampaignData.aspx?type=Email" class="btn btn-rounded btn-danger btn-outline">Create</a>
                                    </div>
                                    <div class="col-6">
                                        <p class="text-right">
                                            <h6>Email Campaign </h6>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="box">
                            <div class="box-header with-border bg-success">
                                <img src="../images/icon/wa.png" alt="...">
                            </div>
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-6 text-left">
                                        <a href="TrmCreateCampaignData.aspx?type=WhatsApp" class="btn btn-rounded btn-success btn-outline">Create</a>
                                    </div>
                                    <div class="col-6 text-right">
                                        <p class="text-right">
                                            <h6>WA Campaign </h6>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="box">
                            <div class="box-header with-border bg-warning">
                                <img src="../images/icon/call.png" alt="...">
                            </div>
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-6">
                                        <p class="text-left">
                                            <h6>Call Campaign </h6>
                                        </p>
                                    </div>
                                    <div class="col-6 text-right">
                                        <a href="TrmCreateCampaignData.aspx?type=call" class="btn btn-rounded btn-warning btn-outline">Create</a>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                        <!-- /.col -->
                    </div>
                    <div class="col-3">
                        <div class="box">
                            <div class="box-header with-border bg-primary">
                                <img src="../images/icon/email.png" height="48" alt="...">
                            </div>
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-6">
                                        <p class="text-left">
                                            <h6>SMS Campaign </h6>
                                        </p>
                                    </div>
                                    <div class="col-6 text-right">
                                        <a href="TrmCreateCampaignData.aspx?type=Sms" class="btn btn-rounded btn-primary btn-outline">Create</a>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                    </div>
                    <!-- /.row -->
                </div>--%>
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default">
                            <div class="box-body">
                                <!-- Nav tabs -->
                                <table id="TrmCreateCampaign" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Channel Account</th>
                                            <th>Campaign Name</th>
                                            <th>Channel</th>
                                            <th style="width: 200px;">Status Active</th>
                                            <th style="width: 200px;">Date Create</th>
                                            <%--<th style="width: 50px;">Action</th>--%>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="box">
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.row -->
            <div class="modal modal-left fade" id="modal-SearchUser" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Search customer profile data</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-12  p-25">
                                <div class="box">
                                    <div class="text-center bt-0 border-light p-2">
                                        <div class="input-group">
                                            <input type="search" id="Ticket_SearchCustomer" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2">
                                        </div>
                                    </div>
                                    <div class="box-body p-0">
                                        <div id="Ticket_ListCustomer" class="media-list media-list-hover media-list-divided inner-user-div" style="height: 345px">
                                            <div class="media media-single">No data found... </div>
                                        </div>
                                    </div>
                                    <div class="text-center bt-1 border-light p-2">
                                        <a class="text-uppercase d-block font-size-12" href="#" data-toggle="modal" data-target="#modal-center" onclick="showAddCustomer()">Add Customer</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer modal-footer-uniform">
                            <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal modal-right fade" id="modal-Card" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Search customer profile data</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <!-- Default box -->
                                <div class="box">
                                    <div class="box-header with-border bg-primary">
                                        <img src="../images/icon/email_blast_.png" height="48" alt="...">
                                    </div>
                                    <div class="box-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <p class="text-left">
                                                    <h5>Create Email Blast Campaign </h5>
                                                </p>
                                            </div>
                                            <div class="col-12 text-right">
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
                                            <div class="col-md-12">
                                                <img src="../images/icon/wa.png" alt="...">
                                            </div>
                                            <div class="col-12 text-right">
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
                        <%-- <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>

                    </div>--%>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /.content -->
</asp:Content>
