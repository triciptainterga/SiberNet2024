<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxHistoryTicketJourney.aspx.vb" Inherits="ICC.TrxHistoryTicketJourney" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/1_journey_new.js"></script>
    <script src="js/TrmMailSystem_Journey.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxLayerEskalasi" runat="server" />
    <asp:HiddenField ID="PhoneNumberReported" runat="server" />
    <div class="container-full">
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-lg-3 col-12">
                    <div class="box bg-lightest" id="chat-bx">
                        <div>
                            <div class="box-body box-profile">
                                <%--<h4 class="box-title text-info"><i class="ti-user mr-15"></i>Profile</h4>
                                <hr />--%>
                                <div class="box-header no-border">
                                    <h4 class="box-title">Information Profile
                                    </h4>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Full Name</label>
                                            <input class="form-control input-lg" type="text" placeholder="Name" id="TxtName" name="TxtName">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Phone Number</label>
                                            <input class="form-control input-lg" type="text" placeholder="Phone Number" id="TxtProfilePhone" name="TxtProfilePhone" title="Phone Number">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Email Address</label>
                                            <input class="form-control input-lg" type="text" placeholder="Email Address" id="TxtProfileEmail" name="TxtProfileEmail" title="Email Address">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Date of Birth</label>
                                            <input type="date" class="form-control" placeholder="Date of Birth" id="Journey_DateofBirth" name="Journey_DateofBirth" title="Date of Birth">
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
                                <div class="row" style="display: none;">
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
                                            <label>NIK</label>
                                            <input class="form-control input-lg" type="text" placeholder="NIK" id="Journey_NIK" name="Journey_NIK" title="NIK">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>UserName</label>
                                            <input class="form-control input-lg" type="text" placeholder="UserName" id="Journey_UserName" name="Journey_UserName" title="UserName">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input class="form-control input-lg" type="text" placeholder="Password" id="Journey_Password" name="Journey_Password" title="Password">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea id="TxtAddress" name="TxtAddress" class="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Province</label>
                                            <input type="text" id="Ticket_Province" class="form-control" placeholder="Province">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>City</label>
                                            <input type="text" id="Ticket_City" class="form-control" placeholder="City">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>District</label>
                                            <input type="text" id="Ticket_District" class="form-control" placeholder="District">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Village</label>
                                            <input type="text" id="Ticket_Zip_Code" class="form-control" placeholder="Village">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <%--<div class="box-footer">
                            </div>--%>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-12">
                    <div class="row">
                        <div class="col-lg-8 col-12">
                            <div class="box">
                                <div class="box-header">
                                    <div class="media align-items-top p-0">
                                        <a class="avatar avatar-lg mx-0" href="#">
                                            <img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">
                                        </a>
                                        <div class="d-lg-flex d-block justify-content-between align-items-center w-p100">
                                            <div class="media-body mb-lg-0 mb-20">
                                                <p class="font-size-16" style="margin-top: 15px;">
                                                    <a class="hover-primary" href="#"><strong><span id="newNamaCustomer"></span></strong></a>
                                                </p>
                                                <p class="font-size-12" id="newLastInteraction"></p>
                                            </div>
                                            <div>
                                                <ul class="list-inline mb-0 font-size-18">

                                                    <%-- <li class="list-inline-item" id="newWaktuCall" style="visibility: hidden;">
                                                        <p class="font-size-24" id="newLastInteraction">00:01</p>
                                                    </li>--%>
                                                    <li class="list-inline-item" id="newDropCall" style="visibility: hidden;"><a href="#" class="hover-primary" onclick="clickdropCall()">
                                                        <img src="../Images/icon/drop.png" width="24"></li>
                                                    <%-- <li class="list-inline-item" id="newTransferCall" style="visibility: hidden;"><a href="#" class="hover-primary">
                                                        <img src="../Images/icon/transfer.png" width="24"></li>
                                                    <li class="list-inline-item" id="newHoldCall" style="visibility: hidden;"><a href="#" class="hover-primary">
                                                        <img src="../Images/icon/hold.png" width="24"></li>--%>
                                                    <li class="list-inline-item" id="newCall"><a href="#" class="hover-primary" onclick="click2Call()">
                                                        <img src="../Images/icon/call1.png" width="24"></a></li>
                                                    <%-- <li class="list-inline-item" id="newCall"><a href="#" class="hover-primary" onclick="ShowEmailCompose()">
                                                        <img src="../Images/icon/email.png" width="24"></a></li>
                                                    <li class="list-inline-item"><a href="#" class="hover-primary" onclick="click2Call()">
                                                        <img src="../Images/icon/menu.png" width="24"></a></li>--%>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="box-body mb-30">
                                    <div class="chat-box-one">
                                        <div class="form-group" style="transform: scale(0.8);">
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
                                    </div>
                                </div>
                                <div class="box-footer">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <input class="form-control b-0 py-10" id="Journey_Response" name="Journey_Response" type="text" placeholder="Say something...">
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <%--<p class="font-weight-normal">Status</p>--%>
                                                <select name="select" id="Journey_Status" required class="form-control" style="height: 33px;" onchange="get_EscalationStatus(1)">
                                                    <option value="">Select Status</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <p class="font-weight-normal" id="P_Escalation" style="display: none;"></p>
                                                <select name="select" id="Journey_EscalationChannel" required class="form-control" style="height: 33px;" onchange="get_SelectEscalation(1)">
                                                    <option value="">Select Escalation</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="d-md-flex d-block justify-content-between align-items-center">

                                                <div class="d-flex justify-content-between align-items-center mt-md-0 mt-30">

                                                    <div class="btn btn-rounded btn-outline-secondary btn-file waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary" id="btnAttachment">
                                                        <i class="mdi mdi-link"></i>
                                                        <input type="file" name="files">
                                                    </div>



                                                    <a class="waves-effect waves-circle btn btn-circle btn-primary" onclick="post_WS_DataInteraction()" id="btnInteraction">
                                                        <i class="mdi mdi-send"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-12">
                            <div class="box">
                                <div class="box-header no-border">
                                    <h4 class="box-title">Detail Ticket Information
                                    </h4>
                                </div>
                                <div class="box-body px-0 pt-0" style="height: 1145px; overflow-y: scroll;">
                                    <div class="position-relative p-20">
                                        <!-- drag handle -->
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Contact Number Reported</label>
                                                    <p class="font-weight-normal" id="Ticket_Contact_Reported" style="color: red; font-weight: bold;"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Date of Transaction</label>
                                                    <p class="font-weight-normal" id="Ticket_DateofTransaction"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Agent Name</label>
                                                    <p class="font-weight-normal" id="Ticket_AgentName"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12" style="display: none;">
                                                <div class="form-group">
                                                    <label class="text-primary">Product Type</label>
                                                    <p class="font-weight-normal" id="Ticket_ProductType"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Tag</label>
                                                    <p class="font-weight-normal" id="Ticket_ProductName"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12" style="display: none;">
                                                <div class="form-group">
                                                    <label class="text-primary">Customer Status</label>
                                                    <p class="font-weight-normal" id="Ticket_UserStatus"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12" style="display: none;">
                                                <div class="form-group">
                                                    <label class="text-primary">Customer Category</label>
                                                    <p class="font-weight-normal" id="Ticket_UserCategory"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Vehicle Number</label>
                                                    <p class="font-weight-normal" id="Ticket_BankAccount"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Ticket Channel</label>
                                                    <p class="font-weight-normal" id="Ticket_SourceChannel"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <%-- <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="text-primary">Brand</label>
                                                            <p class="font-weight-normal" id="Ticket_Brand"></p>
                                                        </div>
                                                    </div>--%>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Category</label>
                                                    <p class="font-weight-normal" id="Ticket_Category"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Category Type</label>
                                                    <p class="font-weight-normal" id="Ticket_Enquiry"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Category Detail</label>
                                                    <p class="font-weight-normal" id="Ticket_EnquiryDetail"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Category Problem</label>
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
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Escalation Ticket</label>
                                                    <p class="font-weight-normal" id="Ticket_Layer_Eskalasi"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Escalation Unit</label>
                                                    <p class="font-weight-normal" id="Ticket_Escalation"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Priority Scale</label>
                                                    <p class="font-weight-normal" id="Ticket_Priority"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">SLA</label>
                                                    <p class="font-weight-normal" id="Ticket_SLA"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Status</label>
                                                    <p class="font-weight-normal" id="Ticket_Status"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="text-primary">Customer Question</label>
                                                    <p class="font-size-12" id="Ticket_Complaints"></p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
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
                                </div>
                                <%--<div class="box-header no-border">
                                    <h4 class="box-title">Product Detail
                                    </h4>
                                </div>
                                <div class="box-body px-0 pt-0">
                                    <div class="suggestions-side">
                                        <div id="orderView" class="box-body p-0">

                                            <p class="mt-0 px-30 bt-1 py-5 bg-light">
                                                <img src="../images/bd/lazada.png" height="28">
                                                Mothercare | <i class="fa fa-calendar"></i>Sept 16th, 2018 | <i class="fa fa-navicon"></i>
                                                <a href="#">Sedang Dikemas</a>
                                            </p>
                                            <div class="media">
                                                <img class="align-self-start w-80" src="../images/bd/orderproduk.jpg" alt="Order">
                                                <div class="media-body">
                                                    <div>
                                                        <div>
                                                            <span>Mothercare Tiger Face Long-Sleeved T-Shirt - Kaos Anak Laki-laki (Kuning)</span>
                                                        </div>
                                                        <div>Variasi: 5-6 Years</div>
                                                        <div>x1</div>
                                                    </div>
                                                </div>
                                                Rp. 125.000,-
                                            </div>
                                            <div class="media">
                                                <img class="align-self-start w-80" src="../images/bd/orderproduk1.jpg" alt="Order">
                                                <div class="media-body">
                                                    <div>
                                                        <div>
                                                            <span>Mothercare Dino Splat T-Shirt - Kaos Anak Laki-laki (Hijau)</span>
                                                        </div>
                                                        <div>Variasi: 7-8 Years</div>
                                                        <div>x1</div>
                                                    </div>
                                                </div>
                                                Rp. 125.000,-
                                            </div>
                                            <p class="mt-0 px-30 bt-1 py-5 bg-light text-right">

                                                <a href="#">Total Pesanan : Rp. 250.000</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>--%>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /.content -->
        <div class="modal modal-info fade" id="modal-escalation">
            <div class="modal-dialog">
                <div class="modal-content bg-info">
                    <div class="modal-header">
                        <h4 class="modal-title">Escalation Layer</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">

                        <div class="media bg-white mb-20">
                            <span class="status-success">
                                <img src="../images/card/2.jpg" width="128p" alt="...">
                            </span>
                            <br />

                            <div class="media-body">
                                <p id="Journey_EscalationValue"></p>
                                <p id="P_TypeEscalation"></p>

                                <div class="d-inline-block mt-10">

                                    <a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="modalEscalation()" id="ahref_Escalationto"><i class="fa fa-pencil" id="escalationto"></i></a>
                                    <a class="btn default btn-outline" href="1_Journey.aspx?ticketid=<%=Server.UrlEncode(Request.QueryString("ticketid"))%>"><i class="fa fa-refresh"></i></a>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
    </div>
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

    <!--Modal Email Global-->
    <div class="modal center-modal fade show" id="modal-composeGlobal" tabindex="-1" aria-modal="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1300px; height: 720px; margin-left: -400px;">
                <div class="modal-header">
                    <a href="#" onclick="PreviewAttachment();"><span class="badge badge-pill badge-primary float-right" style="font-weight: bold; font-size: 14px;"><i class="fa fa-paperclip"></i></span></a>&nbsp;
                    <h5 class="modal-title">Form Compose Email</h5>
                    &nbsp;&nbsp;
                    <button type="button" class="close" data-dismiss="modal">
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
                                <%--<a class="dropdown-item" href="#" onclick="DraftSend_ActionButton()" id="DraftSendActionButton"><i class="fa fa-send"></i>Send</a>--%>
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

    <!-- Control Side Bar Recording-->
    <!-- Control Sidebar -->
    <div class="modal modal-left fade" data-backdrop="false" id="modal-recording" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Recording File</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>
                        <audio controls="">
                            <source src="https://pbx.uidesk.id/stream.php?file=/var/spool/asterisk/monitor/2023/10/11/exten-102023-102025-20231011-135657-1697007417.2617.wav" type="audio/wav">' +
                            
                            Your browser does not support the audio element.
                        </audio>

                        <!--<img onclick="btnRequestTranscript(' + json[i].RecordingID + ')" src="https://cdn-icons-png.flaticon.com/512/1599/1599234.png" width="42">-->
                        <p><small id="balikanVTT"></small></p>

                    </p>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>

                </div>
            </div>
        </div>
    </div>
    <!-- /.control-sidebar -->
    <!-- End Control-->

    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('Reminder_Description');
        CKEDITOR.replace('Journey_Response');
        CKEDITOR.config.height = 345;
        CKEDITOR.config.width = '100%';
        CKEDITOR.config.toolbar = 'Full';
        CKEDITOR.config.toolbar_Full =
            [
                //{ name: 'snddocument', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
                //{ name: 'clipboard', items: ['Undo', 'Redo'] },
                //{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },

                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
                        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
                }
            ];

        var TrmTxtAddress = CKEDITOR.replace('TxtAddress');
        TrmTxtAddress.config.height = 100;
        TrmTxtAddress.config.toolbar = 'Basic';
        TrmTxtAddress.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];

        var Compose_Body = CKEDITOR.replace('Compose_Body');
        Compose_Body.config.height = 300;
        Compose_Body.config.toolbar = 'Basic';
        Compose_Body.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];

    </script>
</asp:Content>

