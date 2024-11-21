<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="1_Journey.aspx.vb" Inherits="ICC._1_Journey" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/1_journey.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Main content -->
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxLayerEskalasi" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-md-3 col-lg-3">
                <div class="box">
                    <div class="box-body box-profile">
                        <h4 class="box-title text-info"><i class="ti-user mr-15"></i>Personal Information</h4>
                        <hr />
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Full name</label>
                                    <input class="form-control input-lg" type="text" placeholder="Full name" id="TxtName" name="TxtName">
                                </div>
                            </div>
                        </div>                    
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Phone number</label>
                                    <input class="form-control input-lg" type="text" placeholder="Phone number" id="TxtProfilePhone" name="TxtProfilePhone" title="Phone number">
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>E-mail</label>
                                    <input class="form-control input-lg" type="text" placeholder="E-mail" id="TxtProfileEmail" name="TxtProfileEmail" title="E-mail">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Gender </label>
                                    <div class="c-inputs-stacked">
                                        <input name="Gender" type="radio" id="GenderMale_Journey" value="Male">
                                        <label for="GenderMale_Journey" class="block">Male</label>
                                        <input name="Gender" type="radio" id="GenderFemale_Journey" value="Female">
                                        <label for="GenderFemale_Journey" class="block">Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Date of birth</label>
                                    <input type="date" class="form-control" placeholder="Date of Birth" id="Journey_DateofBirth" name="Journey_DateofBirth" title="Date of Birth">
                                </div>
                            </div>
                        </div>                     
                        <div class="row" style="display:none;">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Polis Number</label>
                                    <input class="form-control input-lg" type="text" placeholder="Polis Number" id="Journey_PolisNumber" name="Journey_PolisNumber" title="Polis Number">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>NIK number</label>
                                    <input class="form-control input-lg" type="text" placeholder="NIK number" id="Journey_NIK" name="Journey_NIK" title="NIK number">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Address line</label>
                                    <textarea id="TxtAddress" name="TxtAddress" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                    </div>
                </div>
                <%--<div class="box">
                    <div class="box-body box-profile">
                        <div class="row">
                            <div class="col-12">
                                <div>
                                    <p>Email :<span class="text-gray pl-10" id="lblEmail">mail@yahoo.com</span> </p>
                                    <p>Phone :<span class="text-gray pl-10" id="lblPhone">+11 123 456 7890</span></p>
                                    <p>Address :<span class="text-gray pl-10" id="lblAlamat">123, Lorem Ipsum, Florida, USA</span></p>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="pb-15">
                                    <p class="mb-10">Social Profile</p>
                                    <div class="user-social-acount">
                                        <button class="btn btn-circle btn-social-icon btn-facebook"><i class="fa fa-facebook"></i></button>
                                        <button class="btn btn-circle btn-social-icon btn-twitter"><i class="fa fa-twitter"></i></button>
                                        <button class="btn btn-circle btn-social-icon btn-instagram"><i class="fa fa-instagram"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div>
                                    <div class="map-box">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805244.1745767146!2d-86.32675167439648!3d29.383165774894163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c1766591562abf%3A0xf72e13d35bc74ed0!2sFlorida%2C+USA!5e0!3m2!1sen!2sin!4v1501665415329" width="100%" height="100" frameborder="0" style="border: 0" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>--%>
            </div>
            <div class="col-md-9 col-lg-9">
                <div class="nav-tabs-custom box-profile">
                    <ul class="nav nav-tabs">
                        <li><a class="active" href="#dataTicket" data-toggle="tab"><i class="fa fa-ticket"></i>&nbsp;Data Ticket</a></li>
                        <li><a href="#usertimeline" data-toggle="tab"><i class="fa fa-street-view"></i>&nbsp;Journey Ticket</a></li>
                        <li><a href="#activity" data-toggle="tab" onclick="display_internal()"><i class="fa fa-sticky-note"></i>&nbsp;Internal Note</a></li>
                        <li><a href="#settings" data-toggle="tab" onclick="display_setting()"><i class="fa fa-bell"></i>&nbsp;Reminder Ticket</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="active tab-pane" id="dataTicket">
                            <div class="box-body bg-white">
                                <div class="box-body p-0">
                                    <ul class="todo-list">
                                        <li class="b-1 p-0 mb-15">
                                            <div class="position-relative p-20">
                                                <!-- drag handle -->
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Date of Transaction</label>
                                                            <p class="font-weight-normal" id="Ticket_DateofTransaction"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Agent Name</label>
                                                            <p class="font-weight-normal" id="Ticket_AgentName"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Product Type</label>
                                                            <p class="font-weight-normal" id="Ticket_ProductType"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Product Name</label>
                                                            <p class="font-weight-normal" id="Ticket_ProductName"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">

                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Customer Status</label>
                                                            <p class="font-weight-normal" id="Ticket_UserStatus"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Customer Category</label>
                                                            <p class="font-weight-normal" id="Ticket_UserCategory"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Polis Number</label>
                                                            <p class="font-weight-normal" id="Ticket_BankAccount"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Ticket Channel</label>
                                                            <p class="font-weight-normal" id="Ticket_SourceChannel"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Category</label>
                                                            <p class="font-weight-normal" id="Ticket_Category"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Enquiry Type</label>
                                                            <p class="font-weight-normal" id="Ticket_Enquiry"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Enquiry Detail</label>
                                                            <p class="font-weight-normal" id="Ticket_EnquiryDetail"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Problem</label>
                                                            <p class="font-weight-normal" id="Ticket_EnquiryReason"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <%--         <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Type of Complaint</label>
                                                            <p class="font-weight-normal" id="Ticket_ComplaintType"></p>
                                                        </div>
                                                    </div>--%>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Escalation Layer</label>
                                                            <p class="font-weight-normal" id="Ticket_Layer_Eskalasi"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Escalation Unit</label>
                                                            <p class="font-weight-normal" id="Ticket_Escalation"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Priority Scale</label>
                                                            <p class="font-weight-normal" id="Ticket_Priority"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">SLA</label>
                                                            <p class="font-weight-normal" id="Ticket_SLA"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="text-primary">Ticket Status</label>
                                                            <p class="font-weight-normal" id="Ticket_Status"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="text-primary">Customer Complaints</label>
                                                            <p class="font-size-12" id="Ticket_Complaints"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="text-primary">Last Agent Response</label>
                                                            <p class="font-size-12" id="Ticket_NoteAgent"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" id="divAttachmentTicket" style="width: 100%; margin-left: 5px;"></div>
                                                <br />
                                                <div class="row" id="divAttachmentEmail" style="width: 100%; margin-left: 5px;"></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <br />
                            <div class="box">
                                <div class="box-body bg-white">
                                    <div class="row">
                                        <div class="col-md-9 col-lg-9">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <textarea rows="16" id="Journey_Response" name="Journey_Response" class="form-control" placeholder="Write interaction" style="width: 100%;"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-lg-3">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <%--<p class="font-weight-normal">Status</p>--%>
                                                        <select name="select" id="Journey_Status" required class="form-control" style="height: 33px;" onchange="get_EscalationStatus(1)">
                                                            <option value="">Select Status</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row fx-element-overlay">
                                                <div class="col-md-12 col-lg-12">
                                                    <div class="fx-card-item">
                                                        <div class="box ribbon-box">
                                                            <div class="ribbon-two ribbon-two-primary">
                                                                <span>
                                                                    <label id="P_TypeEscalation"></label>
                                                                </span>
                                                            </div>
                                                            <div class="fx-card-avatar fx-overlay-1">
                                                                <img src="../images/card/2.jpg" alt="user"><div class="fx-overlay">
                                                                    <ul class="fx-info">
                                                                        <li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="modalEscalation()" id="ahref_Escalationto"><i class="fa fa-pencil" id="escalationto"></i></a></li>
                                                                        <li><a class="btn default btn-outline" href="1_Journey.aspx?ticketid=<%=Server.UrlEncode(Request.QueryString("ticketid"))%>"><i class="fa fa-refresh"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="fx-card-content">
                                                                <h4 class="box-title">
                                                                    <p class="font-weight-normal" id="Journey_EscalationValue" style="text-align: center; font-weight: bold; vertical-align: bottom; margin-top: 15px;"></p>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row" style="margin-top: -20px;">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <p class="font-weight-normal" id="P_Escalation" style="display: none;"></p>
                                                        <select name="select" id="Journey_EscalationChannel" required class="form-control" style="height: 33px;">
                                                            <option value="">Select Escalation</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" id="divfile" style="display: none;">
                                        <div class="p-20">
                                            <div class="row" id="divAttachmentInteractionTicket" style="width: 100%; margin-left: -5px; margin-top: -20px; margin-bottom: -20px"></div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="btn btn-rounded btn-default btn-file" id="btnAttachment">
                                                    <i class="fa fa-paperclip"></i>&nbsp;Attachment					 
                                                            <input type="file" name="files">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>&nbsp;</label>
                                                <a class="btn btn-rounded btn-success btn-outline pull-right" onclick="post_WS_DataInteraction()" id="btnInteraction">
                                                    <i class="fa fa-save"></i>&nbsp;Submit
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="box-body bg-white">
                                <div class="timeline timeline-single-column timeline-single-full-column" style="margin-left: -12px; margin-top: -20px;" id="Div1">
                                    <span class="timeline-label">
                                        <button class="btn btn-success btn-rounded"><i class="fa fa-clock-o"></i></button>
                                    </span>
                                    <span class="timeline-label">
                                        <button class="btn btn-danger btn-rounded" style="cursor: none; margin-left: 100px;">
                                            <p class="font-weight-bold" id="P_TicketNumber"></p>
                                        </button>
                                    </span>
                                    <div id="Ticket_ListInteraction"></div>
                                    <span class="timeline-label">
                                        <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                    </span>
                                </div>
                            </div>
                            <div class="box">
                            </div>
                        </div>
                        <div class="tab-pane" id="usertimeline">
                            <div class="box">
                                <div class="box-body">
                                    <span class="timeline-label">
                                        <button class="btn btn-danger btn-rounded" style="cursor: none;">
                                            <p class="font-weight-bold" id="P_TicketNumberJourney"></p>
                                        </button>
                                    </span>
                                    <div id="Journey_ListOfTicket" class="timeline timeline-single-column timeline-single-full-column"></div>
                                    <span class="timeline-label" style="margin-left: 15px;">
                                        <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="activity">
                            <div class="box p-15">
                                <!-- Post -->
                                <div id="Journey_InternalNote"></div>
                                <!-- /.post -->
                            </div>
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="settings">
                            <div class="box p-15">
                                <div class="row">
                                    <div class="col-md-10">
                                        <div class="form-group">
                                            <input type="text" id="Reminder_Ticket" class="form-control" placeholder="Judul Reminder">
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <input class="form-control" id="Reminder_Date" type="date">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <textarea rows="10" id="Reminder_Description" name="Reminder_Description" style="width: 100%;" placeholder="Description Reminder"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-9">
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>&nbsp;</label>
                                            <a class="btn btn-rounded btn-success btn-outline pull-right" onclick="post_WS_TicketReminder()">
                                                <i class="fa fa-save"></i>&nbsp;Submit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="box-body bg-white" id="reminder_display">
                                <div class="timeline timeline-single-column timeline-single-full-column" style="margin-left: -12px; margin-top: -20px;">
                                    <span class="timeline-label">
                                        <button class="btn btn-success btn-rounded"><i class="fa fa-clock-o"></i></button>
                                    </span>
                                    <div id="Reminder_ListTransaction"></div>
                                    <span class="timeline-label">
                                        <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                    </span>
                                </div>
                            </div>
                            <%--<div class="timeline timeline-single-column timeline-single-full-column" style="margin-left: -20px; margin-top: -30px;">
                                <span class="timeline-label">
                                    <button class="btn btn-success btn-rounded"><i class="fa fa-clock-o"></i></button>
                                </span>
                                <span class="timeline-label">
                                    <span class="badge badge-pill badge-primary badge-lg">Agent1</span>
                                </span>
                                <div class="timeline-item">
                                    <div class="timeline-point">
                                        <i class="fa fa-circle"></i>
                                    </div>
                                    <div class="timeline-event">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Timeline Event</h4>
                                        </div>
                                        <div class="timeline-body">
                                            <p>Advenientibus aliorum eam ad per te sed. Facere debetur aut veneris accedens.</p>
                                            <p>Advenientibus aliorum eam ad per te sed. Facere debetur aut veneris accedens.</p>
                                            <p>Advenientibus aliorum eam ad per te sed. Facere debetur aut veneris accedens.</p>
                                            <p>Advenientibus aliorum eam ad per te sed. Facere debetur aut veneris accedens.</p>
                                        </div>
                                        <div class="timeline-footer">
                                            <p class="text-right">Feb-22-2014</p>
                                        </div>
                                    </div>
                                </div>
                                <span class="timeline-label">
                                    <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                </span>                               
                            </div>--%>
                        </div>
                        <!-- /.tab-pane -->
                    </div>
                    <!-- /.tab-content -->
                </div>
                <!-- /.nav-tabs-custom -->
            </div>
            <%--<div class="col-md-5 col-lg-2">
                <div class="box mb-0 no-shadow bg-transparent b-0">
                    <div class="box-header with-border p-10">
                        <h4 class="box-title">Folders</h4>
                    </div>
                    <div class="box-body mailbox-nav p-0">
                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item"><a class="nav-link active" href="javascript:void(0)"><i class="ion ion-ios-email-outline"></i>Inbox
							  <span class="label label-success pull-right">12</span></a></li>
                            <li class="nav-item"><a class="nav-link" href="javascript:void(0)"><i class="ion ion-paper-airplane"></i>Sent</a></li>
                            <li class="nav-item"><a class="nav-link" href="javascript:void(0)"><i class="ion ion-email-unread"></i>Drafts</a></li>
                            <li class="nav-item"><a class="nav-link" href="javascript:void(0)"><i class="ion ion-star"></i>Starred <span class="label label-warning pull-right">14</span></a>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="javascript:void(0)"><i class="ion ion-trash-a"></i>Trash</a></li>
                        </ul>
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /. box -->
                <div class="box no-shadow bg-transparent b-0">
                    <div class="box-header with-border p-10">
                        <h4 class="box-title">Labels</h4>
                    </div>
                    <div class="box-body mailbox-nav p-0">
                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item"><a class="nav-link" href="#"><i class="fa fa-circle-o text-danger"></i>Important</a></li>
                            <li class="nav-item"><a class="nav-link" href="#"><i class="fa fa-circle-o text-warning"></i>Promotions</a></li>
                            <li class="nav-item"><a class="nav-link" href="#"><i class="fa fa-circle-o text-info"></i>Social</a></li>
                        </ul>
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->

            </div>--%>
        </div>
    </section>
    <!-- /.content -->
    <!-- /.Popup Data -->
    <div class="modal fade bs-example-modal-lg" role="dialog" id="modal-ShowEscalation" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="width: 1200px; margin-left: -100px;">
                <div class="modal-header">
                    <%--  <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>--%>
                    <div class="col-md-3" style="margin-top: 10px;">
                        <%-- <div class="form-group">
                            <select name="select" id="Journey_EscalationType" onchange="getWS_EscalationData(1);" required class="form-control" style="height: 33px;">
                                <option value="">Select Escalation Type</option>
                            </select>
                        </div>--%>
                    </div>
                    <div class="col-md-6"></div>
                    <div class="col-md-3" style="margin-top: 10px;">
                        <%--<h5 class="modal-title" id="Journey_TittlePopup_Escalation" style="visibility:hidden;">Data Escalation Ticket</h5>--%>
                        <div class="box-controls pull-right">
                            <div class="lookup lookup-circle lookup-right">
                                <input type="text" id="TxtSearchingEscalation" placeholder="Search">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 520px;">
                        <div class="row" id="Journey_ListEscalation">
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary float-right" data-dismiss="modal">Close</button>
                    <%--<button type="button" class="btn btn-rounded btn-primary float-right">Save changes</button>--%>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-description" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px; height: 650px">
                <div class="modal-header">
                    <h5 class="modal-title">Detail Description</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 500px;">
                        <pre id="Pre_Ticket_Detail"></pre>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary float-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!--End-->
    <div class="modal center-modal fade" id="modal-interaction" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px; height: 650px">
                <div class="modal-header">
                    <h5 class="modal-title">Detail Description</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 500px;">
                        <pre id="Pre_Ticket_Interaction"></pre>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary float-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-individual" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <%--<h5 class="modal-title">Individu Selected</h5>--%>
                    <h4 class="box-title text-info"><i class="ti-user mr-15"></i>Individu Selected</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="scrollable ps-container ps-theme-default ps-active-y" style="overflow: hidden; width: auto; height: 400px;">
                            <div class="media-list media-list-hover media-list-divided inner-user-div" id="Journey_Escalation_Individual" style="height: 450px;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <a href="#" class="btn btn-rounded btn-success btn-outline pull-left" onclick="submitIndividual()" id="BTN_SubmitIndividual">
                        <i class="ti-save-alt"></i>&nbsp;Submit
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-left fade" id="modal-interaction-attachment" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <%--<h5 class="modal-title">Attachment Interaction Ticket</h5>--%>
                    <h4 class="box-title text-info"><i class="ti-clip mr-15"></i>Attachment Interaction</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="p-20">
                    <div class="row" id="InteractionAttachment" style="width: 100%; margin-left: 15px;"></div>
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
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('Reminder_Description');
        CKEDITOR.replace('Journey_Response');
        CKEDITOR.config.height = 320;
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

        var TrmTxtAddress = CKEDITOR.replace('TxtAddress');
        TrmTxtAddress.config.height = 150;
        TrmTxtAddress.config.toolbar = 'Basic';
        TrmTxtAddress.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
