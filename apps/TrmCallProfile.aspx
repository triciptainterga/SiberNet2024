<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmCallProfile.aspx.vb" Inherits="ICC.TrmCallProfile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
    <%--<script src="js/TrmCallProfile.js"></script>--%>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- RTC Recording system JS -->
    <!-- recommended -->
    <script src="https://www.WebRTC-Experiment.com/RecordRTC.js"></script>
    <!-- web streams API polyfill to support Firefox -->
    <script src="https://unpkg.com/@mattiasbuelens/web-streams-polyfill/dist/polyfill.min.js"></script>

    <!-- ../libs/DBML.js to fix video seeking issues -->
    <script src="https://www.webrtc-experiment.com/EBML.js"></script>

    <!-- for Edge/FF/Chrome/Opera/etc. getUserMedia support -->
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="https://www.webrtc-experiment.com/DetectRTC.js"> </script>

    <!-- video element -->
    <link href="https://www.webrtc-experiment.com/getHTMLMediaElement.css" rel="stylesheet">
    <script src="https://www.webrtc-experiment.com/getHTMLMediaElement.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxUserName" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12 col-xl-3">
                <div class="box bg-gradient-default">
                    <div class="box-header">
                        <h4 class="box-title text-white"></h4>
                        <ul class="box-controls pull-right">
                            <li class="dropdown">
                                <a data-toggle="dropdown" href="#" class="btn btn-rounded btn-outline btn-primary px-10">Action</a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" href="#" onclick="showCustomer();"><i class="fa fa-pencil"></i>Edit Profile</a>
                                    <a class="dropdown-item" href="#" onclick="AddChannel()"><i class="fa fa-plus"></i>Add Channel</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#"><i class="ti-settings"></i>Settings</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="box-body">
                        <%--  <select id="RecordRTC_Extension_Options">
    <option value="0">Screen Only (without audio)</option>
    <option value="1">Screen + Microphone</option>
    <option value="2">Screen + Speakers</option>
    <option value="3">Screen + Microphone + Speakers</option>
    <option value="4">Chrome Tab</option>
    <option value="5">Chrome Tab (Audio Only)</option>
    <option value="6">Full Screen + Camera</option>
    <option value="7">Microphone + Camera</option>
    <option value="8">Microphone + Speakers</option>
    <option value="9">Microphone Only</option>
    <option value="10">Speakers Only</option>
</select>
                        <button type="button" id="btn-start-recording">Start Recording</button>
                        --%>
                        <div class="slimScrollDiv">
                            <%--         <div class="box-body text-center pb-50">
                                <a href="#">
                                    <img class="avatar avatar-xxl avatar-bordered" src="../images/avatar/5.jpg" alt="">
                                </a>
                                <h4 class="mt-2 mb-0"><a class="hover-primary text-white" href="#">Roben Parkar</a></h4>
                            </div>--%>
                            <div class="px-10 py-30 bg-white text-dark">
                                <h5 class="px-10 mb-15 font-weight-700">Personal Info</h5>
                                <div class="box-body form-element">
                                    <input class="form-control input-lg" type="text" placeholder="Name" id="TxtName" name="TxtName" readonly="readonly">
                                    <br>
                                    <br>
                                    <input class="form-control input-lg" type="text" placeholder="Gender" id="TxtGender" name="TxtGender" readonly="readonly">
                                    <br>
                                    <br>
                                    <input class="form-control input-lg" type="text" placeholder="Birth" id="TxtBirth" name="TxtBirth" readonly="readonly">
                                    <br>
                                    <br>
                                    <input class="form-control input-lg" type="text" placeholder="Address" id="TxtAddress" name="TxtAddress" readonly="readonly">
                                </div>
                            </div>
                            <div class="px-10 py-30 my-20 bg-white text-dark">
                                <h5 class="px-10 mb-15 font-weight-700">Detail Info</h5>
                                <div class="box-body form-element">
                                    <input class="form-control input-lg" type="text" placeholder="Email" id="TxtProfileEmail" name="TxtProfileEmail" title="Email" readonly="readonly">
                                    <br>
                                    <br>
                                    <input class="form-control input-lg" type="text" placeholder="Phone" id="TxtProfilePhone" name="TxtProfilePhone" title="Phone" readonly="readonly">
                                    <br>
                                    <br>
                                    <input class="form-control input-lg" type="text" placeholder="NIK" id="TxtProfileNIK" name="TxtProfileNIK" title="NIK" readonly="readonly">
                                    <br>
                                    <br>
                                    <input class="form-control input-lg" type="text" placeholder="Twitter" id="TxtTwitter" name="TxtTwitter" title="Twitter" readonly="readonly">
                                    <br>
                                    <br>
                                    <input class="form-control input-lg" type="text" placeholder="Facebook" id="TxtProfileFacebook" name="TxtProfileFacebook" title="Facebook" readonly="readonly">
                                    <br>
                                    <br>
                                    <input class="form-control input-lg" type="text" placeholder="Instagram" id="TxtProfileInstagram" name="TxtProfileInstagram" title="Instagram" readonly="readonly">
                                    <br>
                                    <br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-9">
                <div class="row">
                    <div class="col-12">
                        <div class="box">
                            <div class="box-body">
                                <!-- Nav tabs -->
                                <ul class="nav nav-pills rounded nav-justified">
                                    <li class="nav-item"><a href="#navpills-1" class="nav-link active" data-toggle="tab" aria-expanded="false" onclick="ActionScriptOutbound()">Script Outbound</a> </li>
                                    <li class="nav-item"><a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="false" onclick="ActionNoteOutbound()">Note Outbound</a> </li>
                                    <li class="nav-item"><a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionReminderOutbound()">Reminder Note</a> </li>
                                    <li class="nav-item"><a href="#navpills-4" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionHelpdeskTransaction()">Helpdesk Transaction</a> </li>
                                </ul>
                            </div>
                            <!-- /.box-body -->
                        </div>
                        <!-- /.box -->
                        <div class="box">
                            <div class="box-body">
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div id="navpills-1" class="tab-pane active">
                                        <!-- Categroy 1 -->
                                        <div class=" tab-pane animation-fade active" id="category-1" role="tabpanel">
                                            <div class="panel-group panel-group-simple panel-group-continuous" id="accordion2"
                                                aria-multiselectable="true" role="tablist">
                                                <!-- Question 1 -->
                                                <div class="panel">
                                                    <div class="panel-heading" id="question-1" role="tab">
                                                        <a class="panel-title" aria-controls="answer-1" aria-expanded="true" data-toggle="collapse"
                                                            href="#answer-1" data-parent="#accordion2"><b>Greeting Script</b>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse show" id="answer-1" aria-labelledby="question-1"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            <div id="divScript"></div>
                                                            <%--  <p>
                                                                <i>18 May 2021 17:55 WIB
                                                                    <br />
                                                                    Customer last interaction from outbound channel
                                                                <br />
                                                                    <br />
                                                                    Last agent interaction outbound note</i>
                                                                <br />
                                                                <br />
                                                            </p>
                                                            <p>
                                                                Hi _____________, this is Jess from Fit Small Business. We haven’t met yet, but I was doing some research on companies that may be a good fit for our [product or service] and noticed we might be able to help.
                                                                <br />
                                                                <br />
                                                                I haven’t caught you at a bad time, have I?
                                                                <br />
                                                                <br />
                                                                I know your time is valuable so I’ll be brief. Several of the businesses we work with encounter challenges in finding affordable, effective tools to manage their growing teams. Is that something you experience at [company name]?
                                                                <br />
                                                                <br />
                                                                We’re a software company that’s dedicated to making tools that save time, improve productivity, and increase sales for small businesses. I’d love to set up 15 minutes with you and anyone else on your team who’d like to learn more next week. Does Monday or Thursday afternoon work better for you?
                                                                <br />
                                                                <br />
                                                                Great, I’ll send you a calendar invite right away. Thank you for your time—I look forward to meeting you soon!    
                                                            </p>--%>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Question 1 -->
                                                <!-- Question 2 -->
                                                <div class="panel">
                                                    <div class="panel-heading" id="question-2" role="tab">
                                                        <a class="panel-title" aria-controls="answer-2" aria-expanded="false" data-toggle="collapse"
                                                            href="#answer-2" data-parent="#accordion2"><b>History Transaction Outbound</b>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse show" id="answer-2" aria-labelledby="question-2" role="tabpanel">
                                                        <div class="panel-body">
                                                            <table id="TrmHistoryOutbound" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Channel Account</th>
                                                                        <th style="width: 250px;">Campaign Name</th>
                                                                        <th>Channel</th>
                                                                        <th>Status</th>
                                                                        <th style="width: 150px;">Date Create</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Question 2 -->
                                                <!-- Question 3 -->
                                                <%--<div class="panel">
                                                    <div class="panel-heading" id="question-3" role="tab">
                                                        <a class="panel-title" aria-controls="answer-3" aria-expanded="false" data-toggle="collapse"
                                                            href="#answer-3" data-parent="#accordion2">Morbi quis dui at justo posuere aliquam?
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse" id="answer-3" aria-labelledby="question-3"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
                                                        </div>
                                                    </div>
                                                </div>--%>
                                                <!-- End Question 3 -->
                                                <!-- Question 4 -->
                                                <%--<div class="panel">
                                                    <div class="panel-heading" id="question-4" role="tab">
                                                        <a class="panel-title" aria-controls="answer-4" aria-expanded="false" data-toggle="collapse"
                                                            href="#answer-4" data-parent="#accordion2">Vivamus dictum turpis at nisi mattis congue?
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse" id="answer-4" aria-labelledby="question-4"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
                                                        </div>
                                                    </div>
                                                </div>--%>
                                                <!-- End Question 4 -->
                                            </div>
                                        </div>
                                        <!-- End Categroy 1 -->
                                    </div>
                                    <div id="navpills-2" class="tab-pane">
                                        <!-- Categroy 2 -->
                                        <div class="tab-pane animation-fade" id="category-2" role="tabpanel">
                                            <div class="panel-group panel-group-simple panel-group-continuous" id="accordion"
                                                aria-multiselectable="true" role="tablist">
                                                <!-- Question 5 -->
                                                <div class="panel">
                                                    <div class="panel-heading" id="question-5" role="tab">
                                                        <a class="panel-title" aria-controls="answer-5" aria-expanded="true" data-toggle="collapse"
                                                            href="#answer-5" data-parent="#accordion"><b>Add Note Outbound</b>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse show" id="answer-5" aria-labelledby="question-5"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Priority Scale</label>
                                                                        <select id="cmbPriorityScale" class="form-control select2">
                                                                            <option>Select</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Callback Reminder</label>
                                                                        <select id="cmbCallback" class="form-control">
                                                                            <option value="">Select</option>
                                                                            <option value="No">No</option>
                                                                            <option value="Yes">Yes</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Call Status</label>
                                                                        <select id="cmbCallStatus" class="form-control">
                                                                            <option>Select</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="form-group">
                                                                        <label>Note Outbound</label>
                                                                        <textarea style="height: 250px;" class="form-control" id="TrxNoteOutbound"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <%--<button type="button" class="btn btn-rounded btn-secondary float-left" data-dismiss="modal">Close</button>--%>
                                                                    <button type="button" class="btn btn-rounded btn-primary float-right" id="btn-stop-recording">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Question 5 -->
                                                <!-- Question 6 -->
                                                <div class="panel">
                                                    <div class="panel-heading" id="question-6" role="tab">
                                                        <a class="panel-title" aria-controls="answer-6" aria-expanded="false" data-toggle="collapse"
                                                            href="#answer-6" data-parent="#accordion"><b>Interaction Note Outbound</b>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse" id="answer-6" aria-labelledby="question-6"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            <div class="box-body p-0">
                                                                <div id="divHistoryNote" class="media-list media-list-hover media-list-divided inner-user-div" style="height: 145px;"></div>
                                                                <%--<div class="events-side">
                                                                    <div class="media-list media-list-hover" style="height: 500px;">
                                                                        <div class="media media-single">
                                                                            <div class="media-body">
                                                                                <h6 class="font-weight-600"><a href="#">8 March</a></h6>
                                                                                <p class="text-fader">Main basket bersama muhammad fauzi</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="media media-single">
                                                                            <div class="media-body">
                                                                                <h6 class="font-weight-600"><a href="#">9 March</a></h6>
                                                                                <p class="text-fader">Deadline project desain aplikasi $5000</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="media media-single">
                                                                            <div class="media-body">
                                                                                <h6 class="font-weight-600"><a href="#">10 March</a></h6>
                                                                                <p class="text-fader">Meeting ITone persiapan lomba website di jogja dan ... </p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="media media-single">
                                                                            <div class="media-body">
                                                                                <h6 class="font-weight-600"><a href="#">11 March</a></h6>
                                                                                <p class="text-fader">Berangkat ke jogja untuk technical meeting </p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="media media-single">
                                                                            <div class="media-body">
                                                                                <h6 class="font-weight-600"><a href="#">28 March</a></h6>
                                                                                <p class="text-fader">Main basket bersama muhammad fauzi</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="media media-single">
                                                                            <div class="media-body">
                                                                                <h6 class="font-weight-600"><a href="#">29 March</a></h6>
                                                                                <p class="text-fader">Main basket bersama muhammad fauzi</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>--%>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Question 6 -->
                                                <!-- Question 7 -->
                                            </div>
                                        </div>
                                        <!-- End Categroy 2 -->
                                    </div>
                                    <div id="navpills-3" class="tab-pane">
                                        <!-- Categroy 3 -->
                                        <div class="tab-pane animation-fade" id="category-3" role="tabpanel">
                                            <div class="panel-group panel-group-simple panel-group-continuous" id="accordion1"
                                                aria-multiselectable="true" role="tablist">
                                                <!-- Question 8 -->
                                                <div class="panel">
                                                    <div class="panel-heading" id="question-8" role="tab">
                                                        <a class="panel-title" aria-controls="answer-8" aria-expanded="true" data-toggle="collapse"
                                                            href="#answer-8" data-parent="#accordion1"><b>Add Reminder Note</b>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse show" id="answer-8" aria-labelledby="question-8"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label>Subject</label>
                                                                        <input class="form-control input-lg" type="text" placeholder="Subject" id="TxtReminderSubject" name="TxtReminderSubject">
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <div class="form-group">
                                                                        <label>Reminder Date</label>
                                                                        <input class="form-control" type="date" id="TxtReminderDate">
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <div class="form-group">
                                                                        <label>Reminder Status</label>
                                                                        <select id="cmbReminderStatus" class="form-control">
                                                                            <option>Select</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="form-group">
                                                                        <textarea style="height: 250px;" class="form-control" placeholder="Description" id="TxtReminderDescription"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdateReminder()" id="UpdateReminder">Update</button>
                                                                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpanReminder()" id="SaveReminder">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Question 8 -->
                                                <!-- Question 9 -->
                                                <div class="panel">
                                                    <div class="panel-heading" id="question-9" role="tab">
                                                        <a class="panel-title" aria-controls="answer-9" aria-expanded="false" data-toggle="collapse"
                                                            href="#answer-9" data-parent="#accordion1"><b>History Reminder Note</b>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse" id="answer-9" aria-labelledby="question-9"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            <div id="divHistoryReminderNote" class="media-list media-list-hover media-list-divided inner-user-div" style="height: 145px;"></div>
                                                            <%-- <div class="mailbox-read-info">
                                                                <h3>Replace Insurance Card</h3>
                                                            </div>
                                                            <div class="mailbox-read-info bb-0 clearfix">
                                                                <div class="float-left mr-5">
                                                                    <a href="#">
                                                                        <img src="../images/1.jpg" alt="user" width="40" class="rounded-circle"></a>
                                                                </div>
                                                                <h5 class="no-margin">Agent Samsu Rizal<br>
                                                                    <small>Jacob@domain.com</small>
                                                                    <span class="mailbox-read-time pull-right">22 JUL. 2018 08:03 PM</span></h5>
                                                            </div>
                                                            <!-- /.mailbox-read-info -->
                                                            <div class="mailbox-read-message">
                                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.</p>
                                                                <p>enean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.</p>
                                                            </div>--%>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Question 9 -->
                                            </div>
                                        </div>
                                        <!-- End Categroy 3 -->
                                    </div>
                                    <div id="navpills-4" class="tab-pane">
                                        <!-- Categroy 4 -->
                                        <div class="tab-pane animation-fade" id="category-4" role="tabpanel">
                                            <div class="panel-group panel-group-simple panel-group-continuous" id="accordion3"
                                                aria-multiselectable="true" role="tablist">
                                                <!-- Question 11 -->
                                                <div class="panel">
                                                    <div class="panel-heading" id="question-11" role="tab">
                                                        <a class="panel-title" aria-controls="answer-11" aria-expanded="true" data-toggle="collapse"
                                                            href="#answer-11" data-parent="#accordion3"><b>History Helpdesk Transaction</b>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse show" id="answer-11" aria-labelledby="question-11"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            <table id="example5" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Ticket Number</th>
                                                                        <th>Category</th>
                                                                        <th style="width: 250px;">Problem</th>
                                                                        <th>SLA</th>
                                                                        <th style="width: 100px;">User Create</th>
                                                                        <th style="width: 160px;">Date Create</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Question 11 -->
                                                <!-- Question 12 -->
                                                <div class="panel">
                                                    <div class="panel-heading" id="question-12" role="tab">
                                                        <a class="panel-title" aria-controls="answer-12" aria-expanded="false" data-toggle="collapse"
                                                            href="#answer-12" data-parent="#accordion3"><b>History Interaction Ticket</b>
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse" id="answer-12" aria-labelledby="question-12"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            <div id="divHistoryInteractionTicket" class="media-list media-list-hover media-list-divided inner-user-div" style="height: 145px;"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Question 12 -->
                                            </div>
                                        </div>
                                        <!-- End Categroy 4 -->
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                        <!-- /.box -->
                    </div>
                </div>
                <!-- /.row -->
            </div>
        </div>
    </section>

    <!-- Modal -->
    <div class="modal center-modal fade" id="ModalOtherChannelCustomer" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1000px; margin-left: -230px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Add Channel</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Channel Value</label>
                                <input type="text" class="form-control" id="TxtChannelValue" placeholder="Channel Value">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Channel Type</label>
                                <select name="select" id="cmbOtherChannel" class="form-control">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionOtherChannel('Simpan')" id="SaveOtherChannel">Save</button>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-12">
                            <div class="media-list media-list-hover media-list-divided inner-user-div">
                                <table id="TrmAddChannel" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th style="width: 300px;">Channel</th>
                                            <th>Type</th>
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
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- /.modal -->
    <div class="modal center-modal fade" id="modal-center" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; height: 630px; margin-left: -300px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Edit Customer</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" id="cusTomerName" placeholder="Name">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>E-mail</label>
                                <input type="text" class="form-control" id="cusTomerEmail" placeholder="E-mail">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" class="form-control" id="cusTomerPhone" placeholder="Phone">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Gender</label>
                                <select name="select" id="cusTomerGender" class="form-control">
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Date of Birth</label>
                                <input class="form-control" type="date" id="cusTomerDate">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>NIK</label>
                                <input type="text" class="form-control" id="cusTomerNIK" placeholder="KTP">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Facebook Account</label>
                                <input type="text" class="form-control" id="cusTomerFacebook" placeholder="Facebook">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Instagram Account</label>
                                <input type="text" class="form-control" id="cusTomerInstagram" placeholder="Instagram">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Twitter Account</label>
                                <input type="text" class="form-control" id="cusTomerTwitter" placeholder="Twitter">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <textarea rows="6" class="form-control" id="cusTomerAlamat" placeholder="Alamat"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdateCustomer()" id="UpdateCustomer">Update</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /.modal -->
    <!-- Media Player-->
    <div class="modal center-modal fade show" id="modal-video" tabindex="-1" aria-modal="true">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 900px; margin-left: -200px;">
                <div class="modal-header">
                    <h5 class="modal-title">Agent Voice/Video Recording</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="box">
                                    <video
                                        width="750px"
                                        id="my-player"
                                        class="video-js"
                                        controls
                                        preload="auto"
                                        poster=""
                                        data-setup='{}'>

                                        <source src="https://triciptaintegra.com/graphapi/recordingfile/uploads/RecordRTC-2021725-43jreqr0ozv.webm" type="video/webm" />

                                        <p class="vjs-no-js">
                                            To view this video please enable JavaScript, and consider upgrading to a web browser that
						     <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video
                             </a>
                                        </p>
                                    </video>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End -->
</asp:Content>
