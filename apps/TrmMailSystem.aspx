<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmMailSystem.aspx.vb" Inherits="ICC.TrmMailSystem" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmMailSystem.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxEmailID" runat="server" />
    <asp:HiddenField ID="TrxGenerateEmailID" runat="server" />
    <asp:HiddenField ID="Hd_StartDate" runat="server" />
    <asp:HiddenField ID="Hd_FinishDate" runat="server" />
    <asp:HiddenField ID="DraftID" runat="server" />
    <asp:HiddenField ID="HDSignature" runat="server" />
    <asp:HiddenField ID="AssignID" runat="server" />
   
    <section class="left-block content">
        <a class="mdi mdi-close mdi-menu btn btn-success open-left-block d-block d-md-none" href="javascript:void(0)"></a>
        <div class="scrollable" style="height: 100%;">
            <div class="left-content-area">
                <div class="h-p100">
                    <div class="p-20">
                        <a href="#" class="btn btn-rounded btn-success btn-block" onclick="Compose_Add()">Compose</a>
                    </div>
                    <div class="box mb-0 no-shadow bg-transparent b-0">
                        <div class="box-header with-border p-20">
                            <h4 class="box-title"><i class="mdi mdi-folder text-warning"></i>&nbsp;Folders</h4>
                        </div>
                        <div class="box-body mailbox-nav p-20">
                            <ul class="nav nav-pills flex-column">
                                <li class="nav-item"><a class="nav-link active" href="javascript:void(0)" onclick="TrmInboxEmail()"><i class="ion ion-ios-email-outline"></i>Inbox<span class="badge badge-pill badge-warning float-right">
                                    <p id="InboxCount" style="text-align: center;"></p>
                                </span></a></li>
                                <li class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="TrmSendingEmail()"><i class="ion ion-paper-airplane"></i>Sent</a></li>
                                <li class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="TrmDraftEmail()"><i class="ion ion-email-unread"></i>Drafts<span class="badge badge-pill badge-success float-right"><p id="DraftCount" style="text-align: center;"></p>
                                </span></a></li>
                                <li class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="TrmSpamEmail()"><i class="ion ion-trash-a"></i>Spam <span class="badge badge-pill badge-danger float-right">
                                    <p id="SpamCount" style="text-align: center;"></p>
                                </span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="box no-shadow bg-transparent b-0">
                        <div class="media align-items-center no-shadow bb-1">
                            <a class="avatar avatar-lg status-success mx-0" href="#">
                                <img src="../images/avatar/6.jpg" class="rounded-circle" alt="...">
                            </a>
                            <div class="media-body">
                                <p class="font-size-16">
                                    <a class="hover-success" href="#"><strong>
                                        <label id="Name_Customer"></label>
                                    </strong></a>
                                </p>
                                <label id="Email_Customer"></label>
                                <%--<span class="badge badge-pill badge-primary float-right" onclick="EmailCounting()"><a href="#" onclick="EmailCounting()" title="Refresh"><i class="fa fa-refresh" style="color: white;" title="Refresh"></i></a></span>--%>
                            </div>
                        </div>
                        <div class="box-body mailbox-nav p-20">
                            <div id="divLisTicket"></div>
                        </div>
                    </div>
                    <div class="box no-shadow bg-transparent b-0">
                        <div class="media align-items-center no-shadow bb-1">
                            <a class="avatar avatar-lg status-success mx-0" href="#">
                                <img src="../images/avatar/5.jpg" class="rounded-circle" alt="...">
                            </a>
                            <div class="media-body">
                                <p class="font-size-16">
                                    <a class="hover-success" href="#"><strong>
                                        <label id="Agent_Name"></label>
                                    </strong></a>
                                </p>
                                <label id="Agent_Email"></label>
                                <span class="badge badge-pill badge-primary float-right" onclick="EmailCounting()"><a href="#" onclick="EmailCounting()" title="Refresh"><i class="fa fa-refresh" style="color: white;" title="Refresh"></i></a></span>
                            </div>
                        </div>
                        <div class="box-body mailbox-nav p-20">
                            <div id="divLisAgent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="right-block content">
        <div class="box">
            <div class="box-header with-border">
                <h4 class="box-title pull-left"></h4>
                <span class="badge badge-pill badge-danger">
                    <span class="mdi mdi-timetable font-size-16" style="margin-top: 5px; color: white; cursor: pointer;" onclick="DisplayData()" title="Filter Data Email"></span>
                    <label style="margin-top: 5px; font-size: 10px; font-weight: bold; cursor: pointer;" id="FilterDate" onclick="DisplayData()" title="Filter Data Email"></label>
                </span>
                <h4 class="box-title pull-right"><a href="#">
                    <label id="myLabel" class="label" style="font-size: 14px; font-weight: bold; color: black;"></label>
                </a></h4>
            </div>
            <div class="box-body">
                <center>
                    <div class="spinner-border text-warning" id="LoaderPageCounting"></div>
                </center>
                <div id="DivTrmInboxEmail">
                    <table id="TrmInboxEmail" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 50px;">#</th>
                                <th style="width: 100px;">Email Service</th>
                                <th style="width: 150px;">From</th>
                                <th>Subject</th>
                                <th style="width: 150px;">Status</th>
                                <th style="width: 150px;">Date Create</th>
                                <th style="width: 50px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div id="DivTrmSpamEmail" style="display: none;">
                    <table id="TrmSpamEmail" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 50px;">#</th>
                                <th style="width: 150px;">Email Service</th>
                                <th style="width: 150px;">From</th>
                                <th>Subject</th>
                                <th style="width: 150px;">Date Create</th>
                                <th style="width: 50px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div id="DivTrmSendingEmail" style="display: none;">
                    <table id="TrmSendingEmail" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 50px;">#</th>
                                <th style="width: 150px;">Email Service</th>
                                <th style="width: 150px;">To</th>
                                <th>Subject</th>
                                <th style="width: 200px;">Date Create</th>
                                <th style="width: 50px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div id="DivTrmDraftEmail" style="display: none;">
                    <table id="TrmDraftEmail" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 50px;">#</th>
                                <th style="width: 150px;">Email Service</th>
                                <th style="width: 150px;">To</th>
                                <th>Subject</th>
                                <th style="width: 150px;">Date Create</th>
                                <th style="width: 50px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="box" id="Div_Conversation">
            <div class="box-body">
                <div class="timeline" id="DivStart">
                    <span class="timeline-label">
                        <button class="btn btn-success btn-rounded"><i class="fa fa-clock-o"></i></button>
                    </span>
                </div>
                <div id="Journeymailconversation"></div>
                <div class="timeline" id="DivDone">
                    <span class="timeline-label">
                        <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                    </span>
                </div>
                <br />
                <br />
            </div>
            <hr />
            <div class="box-body">
                <div class="timeline" id="DivStartNew">
                    <span class="timeline-label">
                        <button class="btn btn-success btn-rounded"><i class="fa fa-clock-o"></i></button>
                    </span>
                </div>
                <div id="Journeymailconversationnew"></div>          
                <div class="timeline" id="DivDoneNew">
                    <span class="timeline-label">
                        <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                    </span>
                </div>
                <br />
                <br />
            </div>
        </div>
    </section>
    <div class="modal center-modal fade show" id="modal-compose" tabindex="-1" aria-modal="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1300px; height: 720px; margin-left: -400px;">
                <div class="modal-header">
                    <a href="#" onclick="PreviewAttachment();"><span class="badge badge-pill badge-primary float-right" style="font-weight: bold; font-size: 14px;"><i class="fa fa-paperclip"></i></span></a>&nbsp;
                    <h5 class="modal-title">Form Compose Email</h5>
                    &nbsp;&nbsp;
                    <button type="button" class="close" onclick="DraftEvent()">
                        <span aria-hidden="true">×</span>
                    </button>
                    <%--        <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>--%>
                </div>
                <div class="modal-body">
                    <div style="overflow-y: scroll; overflow-x: hidden; height: 550px;">
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label style="text-align: right;">From</label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <select id="ComboFrom" class="form-control" style="height: 33px;" onchange="ChangeComboSignature('1')">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label>Format</label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <select id="FormatTypeCompose" class="form-control" style="height: 33px;" onchange="OnchangeFormatTypeCompose('1')">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label class="text-right">To <span class="text-danger">*</span></label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <div class="controls">
                                        <input type="text" class="form-control" id="ComposeETO" name="ComposeETO" placeholder="To:" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label>Cc</label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <div class="controls">
                                        <input type="text" class="form-control" id="ComposeECC" name="ComposeECC" placeholder="CC:" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1" style="text-align: right;">
                                <label>Subject <span class="text-danger">*</span></label>
                            </div>
                            <div class="col-md-11">
                                <div class="form-group">
                                    <div class="controls">
                                        <input class="form-control" placeholder="Subject:" type="text" id="ComposeESUBJECT" name="ComposeESUBJECT()">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea id="Compose_Body" name="Compose_Body" class="form-control"></textarea>
                        </div>
                        <div class="box-footer" id="divFooter">
                            <div class="row" id="Div_Compose_Attachment" style="width: 100%;"></div>
                        </div>
                        <div id="divAppendemail"></div>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="pull-right">
                        <%--  <a href="#" class="btn btn-rounded btn-warning btn-outline mr-1" onclick="Draft_ActionButton()"><i class="fa fa-pencil"></i>&nbsp;Draft</a>
                        <a href="#" class="btn btn-rounded btn-success btn-outline pull-right" onclick="Compose_ActionButton()"><i class="fa fa-envelope-o"></i>&nbsp;Send</a>--%>
                        <div class="dropdown">
                            <button class="btn btn-primary btn-outline btn-rounded dropdown-toggle" type="button" data-toggle="dropdown" id="ButtonAction"><i class="fa fa-plus"></i>&nbsp;Action</button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" onclick="Compose_ActionButton()" id="ComposeActionButton"><i class="fa fa-send"></i>Send</a>
                                <a class="dropdown-item" href="#" onclick="DraftSend_ActionButton()" id="DraftSendActionButton"><i class="fa fa-send"></i>Send</a>
                                <a class="dropdown-item" href="#" onclick="DraftEvent()" id="DraftActionButton"><i class="fa fa-file-text"></i>Draft</a>
                                <a class="dropdown-item" href="#" onclick="CloseEvent()"><i class="fa fa-times-circle"></i>Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="btn btn-primary btn-outline btn-rounded btn-file">
                            <i class="fa fa-paperclip"></i>&nbsp;Attachment					 
                                <input type="file" name="files">
                        </div>
                    </div>
                </div>
                <!-- /.box-footer -->
            </div>
        </div>
    </div>
    <div class="modal center-modal fade show" id="modal-reply" tabindex="-1" aria-modal="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1300px; height: 720px; margin-left: -400px;">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <label id="LabelFormReplyEmail" class="label" style="color: black; font-size: large;"></label>
                    </h5>
                    <button type="button" class="close" onclick="ReplyEvent()">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div style="overflow-y: scroll; overflow-x: hidden; height: 550px;">
                        <div id="Div_Reply">
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">From</label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <div class="controls">
                                            <input class="form-control" placeholder="Email Service" id="ReplyEmailService" name="ReplyEmailService" readonly="readonly">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">Format</label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <select id="FormatTypeReply" class="form-control" style="height: 33px;" onchange="OnchangeFormatTypeReply('1')">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">To <span class="text-danger">*</span></label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <div class="controls">
                                            <input class="form-control" placeholder="To:" id="ReplyTo" name="ReplyTo" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">Cc</label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <div class="controls">
                                            <input class="form-control" placeholder="CC:" type="text" id="ReplyECC" name="ReplyECC" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">Subject <span class="text-danger">*</span></label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Subject:" id="ReplySubject" name="ReplySubject">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <textarea id="Reply_BodyEmail" name="Reply_BodyEmail" class="form-control"></textarea>
                            </div>
                            <div class="form-group">
                                <div class="btn btn-primary btn-outline btn-rounded btn-file">
                                    <i class="fa fa-paperclip"></i>Attachment					 
                                <input type="file" name="attachmentreply">
                                </div>
                            </div>
                            <div class="box-footer">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="row" id="Div_Inbox_Attachment" style="width: 100%;"></div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row" id="Div_Reply_Attachment" style="width: 100%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <iframe id="Reply_FrameHTML" title="description" style="width: 100%; height: 400px;"></iframe>
                        <br />
                    </div>
                </div>
                <div class="box-footer">
                    <div class="pull-right">
                        <a href="#" class="btn btn-rounded btn-primary btn-outline pull-right" onclick="Reply_ActionButton();" id="ActionReply"><i class="fa fa-send"></i>&nbsp;Send</a>
                    </div>
                    <button type="button" class="btn btn-rounded btn-danger" onclick="ReplyEvent()">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade show" id="modal-forward" tabindex="-1" aria-modal="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1300px; height: 720px; margin-left: -400px;">
                <div class="modal-header">
                    <a href="#" onclick="ForwardPreviewAttachment();"><span class="badge badge-pill badge-primary float-right" style="font-weight: bold; font-size: 14px;"><i class="fa fa-paperclip"></i></span></a>&nbsp;
                    <h5 class="modal-title">
                        <label id="LabelFormForwardEmail" class="label" style="color: black; font-size: large;">Forward Email</label>
                    </h5>
                    <button type="button" class="close" onclick="ForwardEvent()">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div style="overflow-y: scroll; overflow-x: hidden; height: 550px;">
                        <div id="DivForward">
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">From</label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <select id="ForwardComboFrom" class="form-control" style="height: 33px;" onchange="ChangeComboSignature('3')">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <asp:HiddenField ID="HdForward_From" runat="server" />
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">Format</label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <select id="FormatTypeForward" class="form-control" style="height: 33px;" onchange="OnchangeFormatTypeForward('3')">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">To <span class="text-danger">*</span></label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <div class="controls">
                                            <input class="form-control" placeholder="To:" id="ForwardTo" name="ForwardTo" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">Cc</label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <div class="controls">
                                            <input class="form-control" placeholder="CC:" type="text" id="ForwardECC" name="ForwardECC" data-validation-regex-regex="((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*([;])*)*" data-validation-regex-message="Format Email Address Invalid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1" style="text-align: right;">
                                    <label style="text-align: right;">Subject <span class="text-danger">*</span></label>
                                </div>
                                <div class="col-md-11">
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Subject:" id="ForwardSubject" name="ForwardSubject">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <textarea id="Forward_BodyEmail" name="Forward_BodyEmail" class="form-control"></textarea>
                            </div>
                            <div class="form-group">
                                <div class="btn btn-primary btn-outline btn-rounded btn-file">
                                    <i class="fa fa-paperclip"></i>Attachment					 
                                <input type="file" name="attachmentforward">
                                </div>
                            </div>
                            <div class="box-footer">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="row" id="Div_ForwardAttachment" style="width: 100%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <iframe id="Forward_FrameHTML" title="description" style="width: 100%; height: 400px;"></iframe>
                        <br />
                    </div>
                </div>
                <div class="box-footer">
                    <div class="pull-right">
                        <a href="#" class="btn btn-rounded btn-primary btn-outline pull-right" onclick="Forward_ActionButton();" id="ActionForward"><i class="fa fa-send"></i>&nbsp;Send</a>
                    </div>
                    <button type="button" class="btn btn-rounded btn-danger" onclick="ForwardEvent()">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade show" id="modal-preview" tabindex="-1" aria-modal="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1300px; height: 720px; margin-left: -400px;">
                <div class="modal-header">
                    <a href="#" onclick="PreviewAttachment();"><span class="badge badge-pill badge-primary float-right" style="font-weight: bold; font-size: 14px;"><i class="fa fa-paperclip"></i></span></a>&nbsp;
                    <h5 class="modal-title">
                        <label id="LabelFormPreviewEmail" class="label" style="color: black; font-size: large;">Preview Email</label>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <iframe id="Preview_FrameHTML" title="description" style="width: 100%; height: 600px;"></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-preview-file" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Data Attachment Email</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row" id="Div_PreviewInbox_Attachment" style="width: 100%; margin-left: 10px;"></div>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row" id="Div_PreviewReply_Attachment" style="width: 100%; margin-left: 10px;"></div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <center>
                        <div class="spinner-border text-warning" id="LoaderPageAttachment"></div>
                    </center>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-history" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Setting Data Email</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Start Date</label>
                                <div class="form-group">
                                    <input type="date" class="form-control" id="startdate" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>End Date</label>
                                <div class="form-group">
                                    <input type="date" class="form-control" id="enddate" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <center>
                        <div class="spinner-border text-warning" id="LoaderPage"></div>
                    </center>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal" id="Today">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionHistory()" id="Save">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-assign" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Assign Email</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Nama Agent &nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group">
                                    <select id="ComboAgent" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Alasan Assign &nbsp;<span class="text-danger">*</span></label>
                                <textarea style="height: 200px;" class="form-control" id="AssignEmail"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionAssign()" id="SaveAssign">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/pages/validation.js"></script>
    <script src="js/pages/form-validation.js"></script>
    <script src="../assets/vendor_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js"></script>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('Compose_Body');
        CKEDITOR.replace('Reply_BodyEmail');
        CKEDITOR.replace('Forward_BodyEmail');
        CKEDITOR.config.height = 300;
        CKEDITOR.config.toolbar = 'Full';
        CKEDITOR.config.toolbar_Full =
            [
                //{ name: 'snddocument', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
                //{ name: 'clipboard', items: ['Undo', 'Redo'] },
                //{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
                {
                    name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                        'HiddenField']
                },
                '/',
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
                        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
                },
                { name: 'links', items: ['Link', 'Unlink'] },
                { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'PageBreak', 'Iframe'] },
                '/',
                { name: 'styles', items: ['Styles', 'Format', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
                { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
            ];
    </script>
</asp:Content>
