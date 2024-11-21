<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Uidesk_03.aspx.vb" Inherits="ICC.Uidesk_03" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Uidesk_03.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Transaksi Project&nbsp;<i class="fa fa-plus" onclick="TransactionModal()" style="cursor: pointer;"></i></h4>
                    </div>
                    <div class="box-body">
                        <table id="DataTables" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                            <thead>
                                <tr>
                                    <th style="width: 100px;">Transaksi ID</th>
                                    <th style="width: 150px;">Subject</th>
                                    <th style="width: 150px;">Company</th>
                                    <th style="width: 150px;">Application</th>
                                    <th style="width: 150px;">Partner Name</th>
                                    <th style="width: 150px;">Partner Company</th>
                                    <th style="width: 150px;">State</th>
                                    <th style="width: 150px;">Status</th>
                                    <th style="width: 50px;">File</th>
                                    <th style="width: 50px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="box-footer">
                        <br />
                        <%--  <div class="pull-right">
                            <a href="#" class="btn btn-rounded btn-success btn-outline pull-right" onclick="Reply_ActionButton();" id="ActionReply"><i class="fa fa-save"></i>&nbsp;Submit</a>
                        </div>
                        <button type="button" class="btn btn-rounded btn-danger btn-outline pull-left" onclick="ReplyEvent()"><i class="fa fa-trash"></i>&nbsp;Cancel</button>--%>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /.modal -->
    <div class="modal modal-right fade" id="modal-apps" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Data Transaksi</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="overflow-x: hidden; overflow-y: scroll;">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Subject <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Subject" id="TransaksiSubject">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Company <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="Combo_Company" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Partner Name <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="Combo_Partner" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Application <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="Combo_Application" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Follow Up State &nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="Combo_Follow" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Present">Present</option>
                                        <option value="POC">POC</option>
                                        <option value="Project">Project</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Managed">Managed Services</option>
                                        <option value="Anwaizing">Anwaizing</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Status <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="Combo_Status" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="New">New</option>
                                        <option value="Progress">Progress</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Reject">Reject</option>
                                        <option value="Failed">Failed</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Transaction Note</label>
                                <textarea rows="10" class="form-control" id="UIDESK_Request" name="UIDESK_Request" placeholder="UIDESK Request"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Date <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                                    </div>
                                    <input type="date" class="form-control" placeholder="Date" id="DateTransaction">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div id="results"></div>
                            <label for="file_default"></label>
                            <label for="file_name"><b></b></label>
                            <div class="tb-height-b60 tb-height-lg-b60"></div>
                            <section class="hk-sec-wrapper">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="custom-file">
                                            <input type="file" name="filesTransaksinya" class="custom-file-input" id="filesTransaksinya" />
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <br />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>PIC Uidesk <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="Combo_UIDESK" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Restu">Restu</option>
                                        <option value="Chandra">Chandra</option>
                                        <option value="Jeber">Jeber</option>
                                        <option value="Rizal">Rizal</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan()" id="Simpan">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-interaction" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1000px; margin-left: -250px; overflow-y: scroll; overflow-x: hidden; height: 650px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Interaction Note</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Subject <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Subject" id="Subject_Interaction">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Interaction Note <span class="text-danger">*</span></label>
                                <textarea rows="3" id="Interaction_Notes" name="Interaction_Notes" style="width: 100%;"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <%--   <div class="col-md-3">
                            <div class="form-group">
                                <label>Date Planning &nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                                    </div>
                                    <input type="date" class="form-control" id="Tanggal" />
                                </div>
                            </div>
                        </div>--%>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Follow Up State &nbsp;<span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboState" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Present">Present</option>
                                        <option value="POC">POC</option>
                                        <option value="Project">Project</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Managed">Managed Services</option>
                                        <option value="Anwaizing">Anwaizing</option>
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
                                    <select id="ComboStatusTransaksi" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Progress">Progress</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Reject">Reject</option>
                                        <option value="Failed">Failed</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4" style="margin-top: 8px;">
                            <div id="resultsinteraction"></div>
                            <label for="file_default"></label>
                            <label for="file_name"><b></b></label>
                            <div class="tb-height-b60 tb-height-lg-b60"></div>
                            <section class="hk-sec-wrapper">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="custom-file">
                                            <input type="file" name="filesInteractionnya" class="custom-file-input" id="filesInteractionnya" />
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <br />
                        </div>
                    </div>
                    <hr />
                    <div class="tab-pane" id="usertimeline">
                        <%--                        <center>
                            <div class="spinner-border text-primary" id="LoaderJourNeyInteraction"></div>
                        </center>--%>
                        <span class="timeline-label" style="margin-left: 22px; display: none;">
                            <button class="btn btn-success btn-rounded" style="cursor: none;">
                                <i class="fa fa-clock-o"></i>
                            </button>
                        </span>
                        <div id="JourNeyInteraction" class="timeline timeline-single-column timeline-single-full-column"></div>
                        <span class="timeline-label" style="margin-left: 18px; display: none;">
                            <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                        </span>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpanInteraction()" id="SimpanTransaksi">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-quatation" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1000px; margin-left: -250px; overflow-y: scroll; overflow-x: hidden; height: 650px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Add Quatation</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Subject <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Subject" id="Quo_Subject">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="form-group">
                                    <label>Number <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Number" id="Quo_Number">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Quotation Note <span class="text-danger">*</span></label>
                                <textarea rows="3" id="QUO_Notes" name="QUO_Notes" style="width: 100%;"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <div class="form-group">
                                    <label>Versi <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Versi" id="Quo_Versi">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <div class="form-group">
                                    <label>Total <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Total" id="Quo_Total">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4" style="margin-top: 8px;">
                            <div id="resultsinteraction_quo"></div>
                            <label for="file_default"></label>
                            <label for="file_name"><b></b></label>
                            <div class="tb-height-b60 tb-height-lg-b60"></div>
                            <section class="hk-sec-wrapper">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="custom-file">
                                            <input type="file" name="filesQuotation" class="custom-file-input" id="filesQuotation" />
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <br />
                        </div>
                    </div>
                    <hr />
                    <div class="tab-pane" id="usertimeline_quo">
                        <span class="timeline-label" style="margin-left: 22px; display: none;">
                            <button class="btn btn-success btn-rounded" style="cursor: none;">
                                <i class="fa fa-clock-o"></i>
                            </button>
                        </span>
                        <div id="JourNeyQuotation" class="timeline timeline-single-column timeline-single-full-column"></div>
                        <span class="timeline-label" style="margin-left: 18px; display: none;">
                            <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                        </span>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpanQuatation()" id="SimpanQuatation">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-preview-interactionattachment" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Data Attachment</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row" id="PreviewInteractionAttachmentSide" style="width: 100%; margin-left: 10px;"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger float-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var UIDESKRequest = CKEDITOR.replace('UIDESK_Request');
        UIDESKRequest.config.height = 150;
        UIDESKRequest.config.toolbar = 'Basic';
        UIDESKRequest.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
        var UIDESKInteraction_Notes = CKEDITOR.replace('Interaction_Notes');
        UIDESKInteraction_Notes.config.height = 230;
        UIDESKInteraction_Notes.config.toolbar = 'Basic';
        UIDESKInteraction_Notes.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
        var UIDESKQUO_Notes = CKEDITOR.replace('QUO_Notes');
        UIDESKQUO_Notes.config.height = 230;
        UIDESKQUO_Notes.config.toolbar = 'Basic';
        UIDESKQUO_Notes.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
