<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Out_TrxTaskboard.aspx.vb" Inherits="ICC.Out_TrxTaskboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Out_TrxTaskboard.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxLevelUser" runat="server" />
    <asp:HiddenField ID="TrxTelepon" runat="server" />
    <section class="content">
        <br />
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <div class="box">
                                    <div class="row no-gutters py-2" id="divCountingDataCall"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="box">
                                    <div class="box box-default">
                                        <div class="box-body">
                                            <center>
                                                <div class="spinner-border text-warning" id="LoaderPageCounting"></div>
                                            </center>
                                            <div class="table-responsive">
                                                <table id="TrmTeleHeader" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 50px;">ID</th>
                                                            <th style="width: 150px;">Name</th>
                                                            <th style="width: 150px;">Email</th>
                                                            <th style="width: 120px;">Telepon</th>
                                                            <th style="width: 120px;">Job Tittle</th>
                                                            <th style="width: 300px;">Address</th>
                                                            <th style="width: 150px;">Date Create</th>
                                                            <th style="width: 50px;">Called</th>
                                                            <th style="width: 50px;">Action</th>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <input type="hidden" id="TxtMsgNya" />
        <div id="chat-box-body" onclick="ModalPending()">
            <div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-primary l-h-70">
                <div id="chat-overlay"></div>
                <span class="font-size-24 ti-files"></span>
            </div>
        </div>
    </section>
    <div class="modal center-modal fade" id="ModalChannel" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 900px; margin-left: -180px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Create Campaign Data</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <label>Channel Account</label>
                            <div class="form-group">
                                <input type="text" class="form-control" id="TrxChannelAccount" placeholder="Channel Account">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Campaign Name</label>
                                <select name="select" id="cmbCampaign" class="form-control">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Campaign Channel</label>
                                <select name="select" id="cmbCampaignChannel" class="form-control">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="UpdateCampaign">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan()" id="Simpan">Save</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionDelete()" id="Delete">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modalLeft" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="height: 710px; width: 1100px; margin-left: -300px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Campaign Data</h5>
                    <button type="button" id="chat-box-toggle" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <%--<button id="chat-box-toggle" data-dismiss="modal" class="waves-effect waves-circle btn btn-danger h-40 w-40 rounded-circle l-h-40" type="button">
                      <span class="font-size-18 mdi mdi-close"></span>
                    </button>--%>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label>Product Campaign</label>
                            <%--<input type="text" name="txtFileName" class="form-control" id="txtFileName" style="width: 100%;" readonly="true" />--%>
                            <select id="CmbProductCampaign" class="form-control" style="height: 33px;" onchange="ProductCampaign_AgentLogin()">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <%-- <div class="col-md-3">
                            <br />
                            <a class="btn btn-rounded btn-primary" onclick="GetAPI_PolisNumber()"><i class="fa fa-cogs"></i>&nbsp;Transacion Get API</a>
                        </div>--%>
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-3">
                            <label>Select Upload ID</label>
                            <%--<input type="text" name="txtFileName" class="form-control" id="txtFileName" style="width: 100%;" readonly="true" />--%>
                            <select id="CmbUploadID" class="form-control" style="height: 33px;" onchange="get_CmbUploadID(1)">
                                <option>Select</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" style="margin-top: -10px;">
                        <div class="col-md-12">
                            <div id="navpills-4" class="tab-pane">
                                <!-- Categroy 4 -->
                                <div class="tab-pane animation-fade" id="category-4" role="tabpanel">
                                    <div class="panel-group panel-group-simple panel-group-continuous" id="accordion3" aria-multiselectable="true" role="tablist">
                                        <!-- Question 11 -->
                                        <div class="panel">
                                            <div class="panel-heading" id="question-11" role="tab">
                                                <a class="panel-title text-primary" aria-controls="answer-11" aria-expanded="true" data-toggle="collapse" href="#answer-11" data-parent="#accordion3">
                                                    <br />
                                                </a>
                                            </div>
                                            <div class="panel-collapse collapse" id="answer-11" aria-labelledby="question-11" role="tabpanel">
                                                <div class="panel-body">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div id="results"></div>
                                                            <label for="file_default">Data Nomor Polis</label><a href="../FileUploadOutbound/FileNasabah/PolisNumber.xlsx" class="text-primary"><i class="mdi mdi-cloud-download float-right"></i></a>
                                                            <label for="file_name"><b></b></label>
                                                            <div class="tb-height-b60 tb-height-lg-b60"></div>
                                                            <section class="hk-sec-wrapper">
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                        <input type="file" name="files" class="form-control" id="file" />
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div id="resultsAhliWaris"></div>
                                                            <label for="file_default_ahli_waris">Data Nama Ahli Waris</label><a href="../FileUploadOutbound/FileWaris/AhliWaris.xlsx" class="text-primary"><i class="mdi mdi-cloud-download float-right"></i></a>
                                                            <label for="file_name_ahli_waris"><b></b></label>
                                                            <div class="tb-height-b60 tb-height-lg-b60"></div>
                                                            <section class="hk-sec-wrapper">
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                        <input type="file" name="file_ahli_waris" class="form-control" id="file_ahli_waris" />
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div id="results_rider"></div>
                                                            <label for="file_default_rider">Data Manfaat Rider</label><a href="../FileUploadOutbound/FileRider/Rider.xlsx" class="text-primary"><i class="mdi mdi-cloud-download float-right"></i></a>
                                                            <label for="file_name_rider"><b></b></label>
                                                            <div class="tb-height-b60 tb-height-lg-b60"></div>
                                                            <section class="hk-sec-wrapper">
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                        <input type="file" name="file_rider" class="form-control" id="file_rider" />
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div id="results_darlink"></div>
                                                            <label for="file_default_jenis_darlink">Data Jenis Darlink</label><a href="../FileUploadOutbound/FileFund/Fund.xlsx" class="text-primary"><i class="mdi mdi-cloud-download float-right"></i></a>
                                                            <label for="file_name_jenis_darlink"><b></b></label>
                                                            <div class="tb-height-b60 tb-height-lg-b60"></div>
                                                            <section class="hk-sec-wrapper">
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                        <input type="file" name="file_jenis_darlink" class="form-control" id="file_jenis_darlink" />
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Question 11 -->
                                    </div>
                                </div>
                                <!-- End Categroy 4 -->
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-top: -25px;">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table id="TrmSummary" class="table table-hover table-dark mb-0" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                    <thead>
                                        <tr>
                                            <th style="width: 150px;">Data Type</th>
                                            <th style="width: 400px;">Data ID</th>
                                            <th style="width: 70px;">Data API</th>
                                            <th style="width: 70px;">Data Row</th>
                                            <th style="width: 30px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="spinner-border text-warning" id="LoaderPage"></div>
                    <%--<div class="row">
                        <div class="box-body p-0" style="min-height: 330px;">
                            <div id="ListUpload" class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 330px;">
                            </div>
                        </div>
                    </div>--%>
                    <div class="modal-footer modal-footer-uniform" id="divButton" style="display: none;">
                        <button type="button" class="btn btn-rounded btn-danger" onclick="cancelUpload()">Cancel</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="doneUpload()">Done</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modalright" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="box-body p-0" style="min-height: 500px;">
                        <div class="lookup lookup-sm lookup-right d-none d-lg-block">
                            <input type="text" id="TrxSearching_Outbound" placeholder="Searching" class="w-p100">
                        </div>
                        <div id="ListSearching" class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 650px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="Modal-Call-Pending" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px;">
                <div class="modal-header">
                    <h5 class="modal-title">Data Not Complete</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive" style="height: 500px;">
                                <table id="TrmOutHeaderPending" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;">ID</th>
                                            <th style="width: 150px;">Name</th>
                                            <th style="width: 150px;">Email</th>
                                            <th style="width: 150px;">Telepon</th>
                                            <th style="width: 150px;">Date Create</th>
                                            <th style="width: 50px;">Called</th>
                                            <th style="width: 50px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <%--<button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>--%>
                    <button type="button" class="btn btn-rounded btn-danger float-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="Modal-Call" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1200px; margin-left: -350px; overflow-y: scroll; overflow-x:hidden; height: 700px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Data Call</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Keterangan <span class="text-danger">*</span></label>
                                <textarea rows="3" id="Coll_Notes" name="Coll_Notes" style="width: 100%;"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Status Call &nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboStatusCall" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Anser">Anser</option>
                                        <option value="Reject">Reject</option>
                                        <option value="No Anser">No Anser</option>
                                        <option value="Busy">Busy</option>
                                        <option value="Wrong Number">Wrong Number</option>
                                        <option value="Unregistered">Unregistered</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Status Transaksi &nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboStatusData" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Progress">Progress</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Tanggal &nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                                    </div>
                                    <input type="date" class="form-control" id="Tanggal" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="tab-pane" id="usertimeline">
                        <div id="Journey_ListOfTicket" class="timeline timeline-single-column timeline-single-full-column" style="margin-top: -12px;"></div>
                        <span class="timeline-label" style="margin-left: 15px;">
                            <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                        </span>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <%--<button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>--%>
                    <span class="badge badge-pill badge-default float-right" id="BodyCall"><a href="#" onclick="DialCall()" id="DialCalls"><span class="mdi mdi-phone font-size-24 font-size-24 text-success"></span></a><a href="#" onclick="DropCall()" id="DropCalls"><span class="mdi mdi-phone font-size-24 font-size-24 text-danger"></span></a></span>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpanTransaksi()" id="SimpanTransaksi" style="display: none;"><i class="fa fa-save"></i>&nbsp;Save</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script type="text/javascript">
        var CollNotes = CKEDITOR.replace('Coll_Notes');
        CollNotes.config.height = 250;
        CollNotes.config.toolbar = 'Basic';
        CollNotes.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
