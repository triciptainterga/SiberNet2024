<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="1_Thread_Before.aspx.vb" Inherits="ICC._1_Thread_Before" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/1_Thread_Before.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxUnitKerja" runat="server" />
    <asp:HiddenField ID="TrxLevelUser" runat="server" />
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxType" runat="server" />
    <div class="content-header">
        <div class="d-flex align-items-center">
            <div class="w-p100 d-md-flex align-items-center justify-content-between">
                <h3 class="page-title">Data Channel Transaction</h3>
                <div class="d-inline-block align-items-center">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                            <li class="breadcrumb-item" aria-current="page">Apps</li>
                            <li class="breadcrumb-item active" aria-current="page">Thread Transaction</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="row no-gutters py-2" id="1_TampungKotakAtas">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-body">
                        <div class="table-responsive">
                            <table id="ticketThread" class="table mt-0 table-hover no-wrap table-borderless">
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th style="width: 200px;">Name</th>
                                        <th style="width: 40px;">Channel</th>
                                        <th style="width: 250px;">Number ID</th>
                                        <th>Account</th>
                                        <%--<th>Category</th>--%>
                                        <th style="width: 200px;">Subject</th>
                                        <%--<th style="width: 200px;">Problem</th>--%>
                                        <%--<th>Description</th>--%>
                                        <th>Agent</th>
                                        <%--<th style="width: 200px;">Ticket Number</th>--%>
                                        <%--<th>Priority</th>--%>
                                        <%--<th style="width: 150px;">Date Transaction</th>--%>
                                        <th style="width: 200px;">Date Create</th>
                                        <th style="width: 40px;">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal center-modal fade" id="modal-center-reason" tabindex="-1" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content" style="width: 900px; margin-left: -180px;">
                    <div class="modal-header">
                        <h5 class="modal-title">Form Reason Thread</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <%--                        <div class="row">
                            <div class="col-md-12">
                                <div class="box box-slided-up">
                                    <div class="box-header with-border">
                                        <h4 class="box-title">Instan Note</h4>
                                        <ul class="box-controls pull-right">
                                            <li><a class="box-btn-slide rotate-180" href="#"></a></li>
                                        </ul>
                                    </div>
                                    <div class="box-body">
                                        <div id="divInstanNote" style="overflow: scroll; overflow-y: scroll; overflow-x: hidden; height: 300px"></div>
                                    </div>
                                </div>
                            </div>
                        </div>--%>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <textarea rows="6" class="form-control" name="ReasonThread" id="ReasonThread" placeholder="Reason Thread"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionReasonThread()" id="SaveReasonThread">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal center-modal fade" id="modal-center-email" tabindex="-1" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content" style="width: 1100px; margin-left: -300px;">
                    <div class="modal-header">
                        <h5 class="modal-title">Detail Transaction</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <iframe id="framefile_html" title="description" style="width: 100%; height: 500px;"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-danger float-right" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var ReasonThread = CKEDITOR.replace('ReasonThread');
        ReasonThread.config.height = 200;
        ReasonThread.config.toolbar = 'Basic';
        ReasonThread.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
