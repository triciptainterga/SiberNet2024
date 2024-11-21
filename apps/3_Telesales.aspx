<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_Telesales.aspx.vb" Inherits="ICC._3_Telesales" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        function resizeIframe(obj) {
            obj.style.height = 0;
            obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Modal Outbound call-->
    <div class="modal modal-fill fade" data-backdrop="false" id="modal-fill" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Outbound note</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <hr class="my-15">

                    <!-- Content Wrapper. Contains page content -->
                    <div class="content-wrapper">
                        <div class="container-full">
                            <!-- Main content -->
                            <section class="content">
                                <div class="row">
                                    <div class="col-lg-4 col-12">
                                        <div class="box">
                                            <div class="box-body">
                                                <!-- Tab panes -->
                                                <div class="tab-content">
                                                    <div class="tab-pane active" id="messages" role="tabpanel">
                                                        <div class="chat-box-one-side3">
                                                            <div class="media-list media-list-hover">
                                                                <div class="">
                                                                    <%--<a class="align-self-center mr-0" href="#"><img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="..."></a>
											                      <div class="media-body">
												                    <p>
												                      <a class="hover-primary" href="#"><strong>Mical Clark</strong></a>
												                      <span class="float-right font-size-10">10:00pm</span>
												                    </p>
												                    <p>Nullam facilisis velit.</p>
											                      </div>https://collecttix.github.io/ctxSip/ --%>
                                                                    <!--<img src="phone_ui.png" />
																	<iframe="https://103.66.46.141/uidesk/apps/ctx/phone/"></iframe>-->

                                                                    <iframe name="Stack" src="ctx/phone/index.html" width="100%"
                                                                        frameborder="0" scrolling="no" id="iframe" height="500px"></iframe>
                                                                </div>
                                                                <br />
                                                                <br />

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-12">
                                        <div class="row">
                                            <!-- Nav tabs -->
                                            <ul class="nav nav-pills mb-20">
                                                <li class="nav-item"><a href="#ScriptNote-1" class="nav-link active" data-toggle="tab" aria-expanded="false">Script</a></li>
                                                <li class="nav-item"><a href="#OutboundNote-2" class="nav-link" data-toggle="tab" aria-expanded="false">Outbound Note</a></li>
                                                <li class="nav-item"><a href="#ReminderNote-3" class="nav-link" data-toggle="tab" aria-expanded="true">Reminder Note</a></li>
                                            </ul>
                                            <!-- Tab panes -->
                                            <div class="tab-content">
                                                <div id="ScriptNote-1" class="tab-pane active">
                                                    <div class="row">
                                                        <div class="col-md-10">

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
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="OutboundNote-2" class="tab-pane">
                                                    <div class="row">
                                                        <div class="box bg-lightest">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Priority Scale</label>
                                                                        <select name="select" id="Ticket_Priority" required="" class="form-control">
                                                                            <option value="">Select</option>

                                                                            <option value="High">High</option>
                                                                            <option value="Medium">Medium</option>
                                                                            <option value="Low">Low</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Callback reminder</label>
                                                                        <select name="select" id="Ticket_ComplaintType" required="" class="form-control">
                                                                            <option value="">Select</option>
                                                                            <option value="3">No</option>
                                                                            <option value="4">Yes</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Call Status</label>
                                                                        <select name="select" id="Ticket_Status" required="" class="form-control">
                                                                            <option value="">Select</option>

                                                                            <option value="Open">Open</option>
                                                                            <option value="Solved">Solved</option>
                                                                            <option value="Pending">Pending</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="form-group">
                                                                        <label>Note</label>
                                                                        <textarea rows="5" cols="5" class="form-control" id="Reported_Address" placeholder="Address"></textarea>
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="button" class="btn btn-rounded btn-primary float-right">Save</button>
                                                            </div>
                                                            <div class="row">
                                                                <div class="box-body p-0">
                                                                    <div class="events-side">
                                                                        <div class="media-list media-list-hover">
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
                                                                    </div>
                                                                    <div class="text-center bt-1 border-light p-10">
                                                                        <a class="text-uppercase d-block" href="#">Add Events</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="ReminderNote-3" class="tab-pane">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="box">
                                                                <div class="box-header no-border">
                                                                    <h4 class="box-title">My Events
                                                                    </h4>
                                                                    <ul class="box-controls pull-right">
                                                                        <li class="dropdown">
                                                                            <a data-toggle="dropdown" href="#"><i class="ti-more-alt rotate-90"></i></a>
                                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                                <a class="dropdown-item" href="#"><i class="ti-import"></i>Import</a>
                                                                                <a class="dropdown-item" href="#"><i class="ti-export"></i>Export</a>
                                                                                <a class="dropdown-item" href="#"><i class="ti-printer"></i>Print</a>
                                                                                <div class="dropdown-divider"></div>
                                                                                <a class="dropdown-item" href="#"><i class="ti-settings"></i>Settings</a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div class="box-body px-0 pt-0">
                                                                    <div id="calendar" class="dask evt-cal min-h-400"></div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                            <!-- /.content -->
                        </div>
                    </div>
                    <!-- /.content-wrapper -->



                </div>

            </div>
        </div>
    </div>
    <!-- /.modal -->
    <!-- Modal Outbound callback-->
    <div class="modal modal-fill fade" data-backdrop="false" id="modal-callback" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Outbound note</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <hr class="my-15">

                    <!-- Content Wrapper. Contains page content -->
                    <div class="content-wrapper">
                        <div class="container-full">
                            <!-- Main content -->
                            <section class="content">
                                <div class="row">
                                    <div class="col-lg-4 col-12">
                                        <div class="box">
                                            <div class="box-body">
                                                <!-- Tab panes -->
                                                <div class="tab-content">
                                                    <div class="tab-pane active" id="messages" role="tabpanel">
                                                        <div class="chat-box-one-side3">
                                                            <div class="media-list media-list-hover">
                                                                <div class="">
                                                                    <%--<a class="align-self-center mr-0" href="#"><img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="..."></a>
											                      <div class="media-body">
												                    <p>
												                      <a class="hover-primary" href="#"><strong>Mical Clark</strong></a>
												                      <span class="float-right font-size-10">10:00pm</span>
												                    </p>
												                    <p>Nullam facilisis velit.</p>
											                      </div>https://collecttix.github.io/ctxSip/ --%>
                                                                    <!--<img src="phone_ui.png" />
																	<iframe="https://103.66.46.141/uidesk/apps/ctx/phone/"></iframe>-->

                                                                    <iframe name="Stack" src="ctx/phone/index.html" width="100%"
                                                                        frameborder="0" scrolling="no" id="iframe" height="500px"></iframe>
                                                                </div>
                                                                <br />
                                                                <br />

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-12">
                                        <div class="row">
                                            <!-- Nav tabs -->
                                            <ul class="nav nav-pills mb-20">
                                                <li class="nav-item"><a href="#ScriptNoteCallback-1" class="nav-link active" data-toggle="tab" aria-expanded="false">Script For Callback</a></li>
                                                <li class="nav-item"><a href="#OutboundNoteCallback-2" class="nav-link" data-toggle="tab" aria-expanded="false">Callback Note</a></li>

                                            </ul>
                                            <!-- Tab panes -->
                                            <div class="tab-content">
                                                <div id="ScriptNoteCallback-1" class="tab-pane active">
                                                    <div class="row">
                                                        <div class="col-md-10">
                                                            <p>
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
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="OutboundNoteCallback-2" class="tab-pane">
                                                    <div class="row">
                                                        <div class="box bg-lightest">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Priority Scale</label>
                                                                        <select name="select" id="Ticket_Priority" required="" class="form-control">
                                                                            <option value="">Select</option>

                                                                            <option value="High">High</option>
                                                                            <option value="Medium">Medium</option>
                                                                            <option value="Low">Low</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Callback reminder</label>
                                                                        <select name="select" id="Ticket_ComplaintType" required="" class="form-control">
                                                                            <option value="">Select</option>
                                                                            <option value="3">No</option>
                                                                            <option value="4">Yes</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Call Status</label>
                                                                        <select name="select" id="Ticket_Status" required="" class="form-control">
                                                                            <option value="">Select</option>

                                                                            <option value="Open">Open</option>
                                                                            <option value="Solved">Solved</option>
                                                                            <option value="Pending">Pending</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="form-group">
                                                                        <label>Note</label>
                                                                        <textarea rows="5" cols="5" class="form-control" id="Reported_Address" placeholder="Address"></textarea>
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="button" class="btn btn-rounded btn-primary float-right">Save</button>
                                                            </div>
                                                            <div class="row">
                                                                <div class="box-body p-0">
                                                                    <div class="events-side">
                                                                        <div class="media-list media-list-hover">
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
                                                                    </div>
                                                                    <div class="text-center bt-1 border-light p-10">
                                                                        <a class="text-uppercase d-block" href="#">Add Events</a>
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
                            </section>
                            <!-- /.content -->
                        </div>
                    </div>
                    <!-- /.content-wrapper -->



                </div>

            </div>
        </div>
    </div>
    <!-- /.modal callback-->
    <!-- Content Wrapper. Contains page content -->
    <div class="content">
        <div class="container-full">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="d-flex align-items-center">
                    <div class="w-p100 d-md-flex align-items-center justify-content-between">
                        <h3 class="page-title">Campaign Name</h3>
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
                                <div class="box box-widget widget-user">
                                    <!-- Add the bg color to the header using any of the bg-* classes -->
                                    <div class="widget-user-header bg-primary" data-overlay="5">
                                        <h3 class="widget-user-username text-white">Michael Jorden</h3>
                                        <h6 class="widget-user-desc text-white">Agent Outbound</h6>
                                    </div>
                                    <div class="widget-user-image">
                                        <img class="rounded-circle" src="../images/user3-128x128.jpg" alt="User Avatar">
                                    </div>
                                    <div class="box-footer">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="description-block">
                                                    <h5 class="description-header">100</h5>
                                                    <span class="description-text">GOOD</span>
                                                </div>
                                                <!-- /.description-block -->
                                            </div>
                                            <!-- /.col -->
                                            <div class="col-sm-4 br-1 bl-1">
                                                <div class="description-block">
                                                    <h5 class="description-header">550</h5>
                                                    <span class="description-text">AVERAGE</span>
                                                </div>
                                                <!-- /.description-block -->
                                            </div>
                                            <!-- /.col -->
                                            <div class="col-sm-4">
                                                <div class="description-block">
                                                    <h5 class="description-header">158</h5>
                                                    <span class="description-text">BAD</span>
                                                </div>
                                                <!-- /.description-block -->
                                            </div>
                                            <!-- /.col -->
                                        </div>
                                        <!-- /.row -->
                                    </div>
                                </div>
                                <!-- /.widget-user -->
                                <div class="box">
                                    <div class="box-header with-border">
                                        <h5 class="box-title">Outbound share per status</h5>
                                        <div class="box-tools pull-right">
                                            <ul class="card-controls">
                                                <li class="dropdown">
                                                    <a data-toggle="dropdown" href="#"><i class="ion-android-more-vertical"></i></a>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item active" href="#">Today</a>
                                                        <a class="dropdown-item" href="#">Yesterday</a>
                                                        <a class="dropdown-item" href="#">Last week</a>
                                                        <a class="dropdown-item" href="#">Last month</a>
                                                    </div>
                                                </li>
                                                <li><a href="" class="link card-btn-reload" data-toggle="tooltip" title="" data-original-title="Refresh"><i class="fa fa-circle-thin"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="box-body">
                                        <div class="text-center pb-25">
                                            <div class="donut" data-peity='{ "fill": ["#fc4b6c", "#ffb22b", "#398bf7"], "radius": 70, "innerRadius": 28  }'>9,6,5</div>
                                        </div>

                                        <ul class="list-inline">
                                            <li class="flexbox mb-5">
                                                <div>
                                                    <span class="badge badge-dot badge-lg mr-1" style="background-color: #fc4b6c"></span>
                                                    <span>New</span>
                                                </div>
                                                <div>3</div>
                                            </li>

                                            <li class="flexbox mb-5">
                                                <div>
                                                    <span class="badge badge-dot badge-lg mr-1" style="background-color: #ffb22b"></span>
                                                    <span>Pending</span>
                                                </div>
                                                <div>1</div>
                                            </li>

                                            <li class="flexbox">
                                                <div>
                                                    <span class="badge badge-dot badge-lg mr-1" style="background-color: #398bf7"></span>
                                                    <span>Complete</span>
                                                </div>
                                                <div>1</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="box-header with-border">
                                        <h5 class="box-title">Outbound share per agent</h5>

                                        <div class="box-tools pull-right">
                                            <ul class="card-controls">
                                                <li class="dropdown">
                                                    <a data-toggle="dropdown" href="#"><i class="ion-android-more-vertical"></i></a>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item active" href="#">Today</a>
                                                        <a class="dropdown-item" href="#">Yesterday</a>
                                                        <a class="dropdown-item" href="#">Last week</a>
                                                        <a class="dropdown-item" href="#">Last month</a>
                                                    </div>
                                                </li>
                                                <li><a href="" class="link card-btn-reload" data-toggle="tooltip" title="" data-original-title="Refresh"><i class="fa fa-circle-thin"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="box-body">
                                        <div class="flexbox mt-10">
                                            <div class="bar" data-peity='{ "fill": ["#666EE8", "#1E9FF2", "#28D094", "#FF4961", "#FF9149"], "height": 150, "width": 120, "padding":0.2 }'>5,7,8,3,2</div>
                                            <ul class="list-inline align-self-end text-muted text-right mb-0">
                                                <li>Jorden <span class="badge badge-primary ml-2">5</span></li>
                                                <li>Benjamin <span class="badge badge-info ml-2">7</span></li>
                                                <li>Elijah <span class="badge badge-success ml-2">8</span></li>
                                                <li>Chloe <span class="badge badge-danger ml-2">3</span></li>
                                                <li>Daniel <span class="badge badge-warning ml-2">2</span></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-8 col-12">
                        <div class="row">
                            <div class="col-12">
                                <div class="box">
                                    <div class="row no-gutters py-2">

                                        <div class="col-12 col-lg-3">
                                            <div class="box-body br-1 border-light">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i class="mdi mdi-phone font-size-26"></i>
                                                        <br>
                                                        Calls Today
                                                    </span>
                                                    <span class="text-primary font-size-30">845</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar" role="progressbar" style="width: 35%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-12 col-lg-3 hidden-down">
                                            <div class="box-body br-1 border-light">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i class="mdi mdi-phone-in-talk font-size-26"></i>
                                                        <br>
                                                        Answered Calls
                                                    </span>
                                                    <span class="text-info font-size-30">952</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar bg-info" role="progressbar" style="width: 55%; height: 4px;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-12 col-lg-3 d-none d-lg-block">
                                            <div class="box-body br-1 border-light">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i class="mdi mdi-phone-missed font-size-26"></i>
                                                        <br>
                                                        Not Answered
                                                    </span>
                                                    <span class="text-warning font-size-30">845</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar bg-warning" role="progressbar" style="width: 65%; height: 4px;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-12 col-lg-3 d-none d-lg-block">
                                            <div class="box-body">
                                                <div class="flexbox mb-1">
                                                    <span>
                                                        <i class="mdi mdi-timer font-size-26"></i>
                                                        <br>
                                                        AHT
                                                    </span>
                                                    <span class="text-danger font-size-30">00:18:51</span>
                                                </div>
                                                <div class="progress progress-xxs mt-10 mb-0">
                                                    <div class="progress-bar bg-danger" role="progressbar" style="width: 40%; height: 4px;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                        <div class="box box-default">

                            <div class="box-body">
                                <!-- Nav tabs -->
                                <ul class="nav nav-pills mb-20">
                                    <li class=" nav-item"><a href="#navpills-1" class="nav-link active" data-toggle="tab" aria-expanded="false">Outbound List</a> </li>
                                    <li class="nav-item"><a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="false">My Activity</a> </li>
                                    <li class="nav-item"><a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true">List of reminder customer</a> </li>
                                </ul>
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div id="navpills-1" class="tab-pane active">
                                        <div class="row">
                                            <%--<div class="box-header with-border">						
							                <h6 class="box-title">Campaign Test Name List</h6>
							                <h6 class="box-subtitle">List of outbound customers</h6>
						                </div>--%>
                                            <div class="box-body p-0">
                                                <div class="table-responsive">
                                                    <table id="tickets" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>First Name</th>
                                                                <th>Last Name</th>
                                                                <th>Time Stamp</th>
                                                                <th>Campaign</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <%--<a target="_blank" href="https://3cx.uidesk.id:5001/webclient/#/call?phone=08119970461&autodial=true" class="text-info" data-toggle="tooltip" data-original-title="Delete">--%>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>5</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                             <tr>
                                                                <td>1</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <%--<a target="_blank" href="https://3cx.uidesk.id:5001/webclient/#/call?phone=08119970461&autodial=true" class="text-info" data-toggle="tooltip" data-original-title="Delete">--%>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>5</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td>Campaign Name</td>
                                                                <td>
                                                                    <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-2" class="tab-pane">
                                        <div class="row">
                                            <%--<div class="box-header with-border">						
							                <h6 class="box-title">Campaign Test Name List</h6>
							                <h6 class="box-subtitle">List of outbound customers</h6>
						                </div>--%>
                                            <div class="box-body p-0">
                                                <div class="table-responsive">
                                                    <table id="tickets" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>First Name</th>
                                                                <th>Last Name</th>
                                                                <th>Time Stamp</th>
                                                                <th>Status</th>
                                                                <th>Response</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-warning">New</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-warning">New</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-warning">New</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-danger">Pending</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>
                                                            <tr>
                                                                <td>5</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">Sophia</a>
                                                                </td>
                                                                <td>Last Name</td>
                                                                <td>2021-01-01 21:10:10</td>
                                                                <td><span class="badge badge-success">Complete</span> </td>
                                                                <td>Response Outbound</td>

                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-3" class="tab-pane">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <img src="../images/card/img3.jpg" class="img-fluid" alt="">
                                            </div>
                                            <div class="col-md-10">
                                                <div class="box-body p-0">
                                                    <div class="table-responsive">
                                                        <table id="tickets" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                                                            <thead>
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>First Name</th>
                                                                    <th>Campaign</th>
                                                                    <th>Time Stamp</th>
                                                                    <th>Status</th>
                                                                    <th>Response</th>
                                                                    <th>Call</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>
                                                                        <a href="javascript:void(0)">Sophia</a>
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-warning">New</span> </td>
                                                                    <td>Customer meminta di Callback karena sedang meeting</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>
                                                                        <a href="javascript:void(0)">Sophia</a>
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-warning">New</span> </td>
                                                                    <td>Customer meminta di Callback karena sedang diperjalanan</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>
                                                                        <a href="javascript:void(0)">Sophia</a>
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-warning">New</span> </td>
                                                                    <td>Customer meminta di Callback karena sedang tidur</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>
                                                                        <a href="javascript:void(0)">Sophia</a>
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-danger">Pending</span> </td>
                                                                    <td>Response Outbound</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>
                                                                        <a href="javascript:void(0)">Sophia</a>
                                                                    </td>
                                                                    <td>Campaign Name</td>
                                                                    <td>2021-01-01 21:10:10</td>
                                                                    <td><span class="badge badge-success">Complete</span> </td>
                                                                    <td>Response Outbound</td>
                                                                    <td><a href="#" data-toggle="modal" data-target="#modal-callback"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a></td>
                                                                </tr>

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
                        <div class="box">
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
