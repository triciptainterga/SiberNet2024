<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmCustomerRequest.aspx.vb" Inherits="ICC.TrmCustomerRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
 
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmCustomerRequest.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <section class="content">
        <form class="form-horizontal form-element col-12">
            <div class="row">
            </div>
            <div class="row">
                <%--<div class="col-12 col-lg-4 col-xl-3">
                      </div>--%>
                <%--  <div class="box box-inverse bg-img" style="background-image: url(../images/gallery/full/1.jpg);" data-overlay="2">
                        <div class="flexbox px-20 pt-20">
                            <label class="toggler toggler-danger text-white">
                                <input type="checkbox">
                                <i class="fa fa-heart"></i>
                            </label>
                            <div class="dropdown">
                                <a data-toggle="dropdown" href="#" aria-expanded="false"><i class="ti-more-alt rotate-90 text-white"></i></a>
                                <div class="dropdown-menu dropdown-menu-right" style="will-change: transform;">
                                    <a class="dropdown-item" href="#"><i class="fa fa-user"></i>Profile</a>
                                    <a class="dropdown-item" href="#"><i class="fa fa-picture-o"></i>Shots</a>
                                    <a class="dropdown-item" href="#"><i class="ti-check"></i>Follow</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#"><i class="fa fa-ban"></i>Block</a>
                                </div>
                            </div>
                        </div>
                        <div class="box-body text-center pb-50">
                            <a href="#">
                                <img class="avatar avatar-xxl avatar-bordered" src="../images/avatar/5.jpg" alt="">
                            </a>
                            <h4 class="mt-2 mb-0"><a class="hover-primary text-white" href="#">Roben Parkar</a></h4>
                            <span><i class="fa fa-map-marker w-20"></i>Miami</span>
                        </div>
                        <ul class="box-body flexbox flex-justified text-center" data-overlay="4">
                            <li>
                                <span class="opacity-60">Followers</span><br>
                                <span class="font-size-20">8.6K</span>
                            </li>
                            <li>
                                <span class="opacity-60">Following</span><br>
                                <span class="font-size-20">8457</span>
                            </li>
                            <li>
                                <span class="opacity-60">Tweets</span><br>
                                <span class="font-size-20">2154</span>
                            </li>
                        </ul>
                    </div>--%>
                <%--<div class="box">
                         <div class="flexbox px-20 pt-20">
                            <label class="toggler toggler-danger text-danger">
                                <input type="checkbox">
                                <i class="fa fa-heart"></i>
                            </label>
                            <div class="dropdown">
                                <a data-toggle="dropdown" href="#" aria-expanded="false"><i class="ti-more-alt rotate-90 text-white"></i></a>
                                <div class="dropdown-menu dropdown-menu-right" style="will-change: transform;">
                                    <a class="dropdown-item" href="#"><i class="fa fa-user"></i>Profile</a>
                                    <a class="dropdown-item" href="#"><i class="fa fa-picture-o"></i>Shots</a>
                                    <a class="dropdown-item" href="#"><i class="ti-check"></i>Follow</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#"><i class="fa fa-ban"></i>Block</a>
                                </div>
                            </div>
                        </div>
                        <div class="box-body text-center pb-50">
                            <a href="#">
                                <img class="avatar avatar-xxl avatar-bordered" src="../images/avatar/5.jpg" alt="">
                            </a>
                            <h4 class="mt-2 mb-0"><a class="hover-primary text-black" href="#">Roben Parkar</a></h4>
                            <span><i class="fa fa-map-marker w-20"></i>Miami</span>
                        </div>
                        <ul class="box-body flexbox flex-justified text-center" data-overlay="4">
                            <li>
                                <span class="opacity-60">Followers</span><br>
                                <span class="font-size-20">8.6K</span>
                            </li>
                            <li>
                                <span class="opacity-60">Following</span><br>
                                <span class="font-size-20">8457</span>
                            </li>
                            <li>
                                <span class="opacity-60">Tweets</span><br>
                                <span class="font-size-20">2154</span>
                            </li>
                        </ul>                        
                    </div>--%>
                <%--<div class="box">
                        <div class="box-body form-element">
                            <div class="box p-30 pt-50 text-center bg-primary">
                                <div>
                                    <a class="avatar avatar-xxl status-success mb-3 bg-primary" href="#">
                                        <img src="../images/avatar/9.jpg" class="rounded-circle" alt="...">
                                    </a>
                                </div>
                                <h5 class="mt-5 "><a class="text-default hover-warning" href="#" style="color: white;"><label id="Ticket_FullName"/></a></h5>
                                <p><small class="font-size-12">Description</small></p>
                                <p class="text-fade font-size-12 mb-50">Hello everyone, I am Maryam. My designs are used in several big companies in United State and other countries.</p>
                            </div>
                            <div class="box-body text-center">
                                <h5 class="text-uppercase text-muted">Information Personal</h5>
                                <hr />                               
                            </div>
                            <br>
                            <input class="form-control input-lg" type="text" placeholder="Email" id="Ticket_Email" name="Ticket_Email" readonly="readonly">
                            <input class="form-control input-lg" type="text" placeholder="Phone" id="Ticket_Phone" name="Ticket_Phone" readonly="readonly">
                            <input class="form-control input-lg" type="text" placeholder="Mobile" id="Ticket_Mobile" name="Ticket_Mobile" readonly="readonly">
                            <input class="form-control input-lg" type="text" placeholder="Gender" id="Ticket_Gender" name="Ticket_Gender" readonly="readonly">
                            <input class="form-control input-lg" type="text" placeholder="Address" id="Ticket_Address" name="Ticket_Address" readonly="readonly">
                            <div class="box-body text-center">
                                <a class="btn btn-rounded text-center btn-warning" href="#">Edit Profile</a>
                            </div>
                        </div>
                    </div>--%>
                <%--<div class="box">
                            <div class="box-body">
                                <div class="media-list media-list-divided media-list-hover">
                                    <div class="media align-items-center">
                                        <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
                                            <img class="avatar" src="../images/avatar/1.jpg" alt="...">
                                            <div class="media-body text-truncate">
                                                <h6>Sophia</h6>
                                                <small>
                                                    <span>Teknikal Support</span>
                                                </small>
                                            </div>
                                        </a>
                                        <div class="dropdown">
                                            <a class="text-fade" href="#" data-toggle="dropdown" aria-expanded="false"><i class="ti-more-alt rotate-90"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right" style="will-change: transform;">
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i>Call</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i>Message</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i>Email</a>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="media align-items-center">
                                        <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
                                            <img class="avatar" src="../images/avatar/2.jpg" alt="...">
                                            <div class="media-body text-truncate">
                                                <h6>Isabella</h6>
                                                <small>
                                                    <span>Teknikal Support</span>
                                                </small>
                                            </div>
                                        </a>
                                        <div class="dropdown">
                                            <a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i>Call</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i>Message</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i>Email</a>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="media align-items-center">
                                        <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
                                            <img class="avatar" src="../images/avatar/3.jpg" alt="...">
                                            <div class="media-body text-truncate">
                                                <h6>Emma</h6>
                                                <small>
                                                    <span>Teknikal Support</span>
                                                </small>
                                            </div>
                                        </a>
                                        <div class="dropdown">
                                            <a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i>Call</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i>Message</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i>Email</a>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="media align-items-center">
                                        <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
                                            <img class="avatar" src="../images/avatar/4.jpg" alt="...">
                                            <div class="media-body text-truncate">
                                                <h6>Olivia</h6>
                                                <small>
                                                     <span>Teknikal Support</span>
                                                </small>
                                            </div>
                                        </a>
                                        <div class="dropdown">
                                            <a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i>Call</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i>Message</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i>Email</a>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="media align-items-center">
                                        <div class="custom-control custom-checkbox">
                                            <div class="icheckbox_flat-blue" style="position: relative;" aria-checked="false" aria-disabled="false">
                                                <input type="checkbox" class="custom-control-input" style="position: absolute; opacity: 0;">
                                                <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins></div>
                                        </div>
                                        <div class="app-contact-star"><a href="#"><i class="fa fa-star text-yellow"></i></a></div>
                                        <span class="badge badge-dot badge-info"></span>
                                        <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
                                            <img class="avatar" src="../images/avatar/default.jpg" alt="...">

                                            <div class="media-body text-truncate">
                                                <h6>Ava</h6>
                                                <small>
                                                    <span>Ava@gmail.com</span>
                                                    <span class="divider-dash">(123) 456-7890</span>
                                                </small>
                                            </div>
                                        </a>


                                        <div class="dropdown">
                                            <a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i>Call</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i>Message</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i>Email</a>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i>Delete</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="media align-items-center">
                                        <div class="custom-control custom-checkbox">
                                            <div class="icheckbox_flat-blue" style="position: relative;" aria-checked="false" aria-disabled="false">
                                                <input type="checkbox" class="custom-control-input" style="position: absolute; opacity: 0;">
                                                <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins></div>
                                        </div>

                                        <div class="app-contact-star"><a href="#"><i class="fa fa-star text-yellow"></i></a></div>

                                        <span class="badge badge-dot badge-info"></span>

                                        <a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview">
                                            <img class="avatar" src="../images/avatar/5.jpg" alt="...">

                                            <div class="media-body text-truncate">
                                                <h6>Emily</h6>
                                                <small>
                                                    <span>Emily@gmail.com</span>
                                                    <span class="divider-dash">(123) 456-7890</span>
                                                </small>
                                            </div>
                                        </a>

                                        <div class="dropdown">
                                            <a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i>Call</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-commenting"></i>Message</a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-envelope"></i>Email</a>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#"><i class="fa fa-fw fa-trash"></i>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                    </div>--%>
                <%--<div class="box bg-transparant" id="chat-bx">
                          <div class="box-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" id="Ticket_FullName" class="form-control" placeholder="Enter Name">
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" id="Ticket_Phone" class="form-control" placeholder="Enter Phone">
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="email" id="Ticket_Email" class="form-control" placeholder="Enter Email Address">
                            </div>
                            <div class="form-group">
                                <label>Date of Birth</label>
                                <input class="form-control" id="Ticket_Dateofbirth" type="date">
                            </div>
                            <div class="form-group">
                                <label>Gender</label>
                                <div class="c-inputs-stacked">
                                    <input name="Gender" type="radio" id="GenderMale_Ticket" value="Male">
                                    <label for="GenderMale_Ticket" class="block">Male</label>
                                    <input name="Gender" type="radio" id="GenderFemale_Ticket" value="Female">
                                    <label for="GenderFemale_Ticket" class="block">Female</label>
                                    <input name="Gender" type="radio" id="GenderOther_Ticket" value="Other">
                                    <label for="GenderOther_Ticket" class="block">Other</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>CIF Number</label>
                                <input type="text" id="Ticket_CIF" class="form-control" placeholder="CIF Number">
                            </div>
                            <div class="form-group">
                                <label>NIK</label>
                                <input type="text" id="Ticket_NIK" class="form-control" placeholder="NIK">
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <textarea rows="5" id="Ticket_Address" cols="5" class="form-control" placeholder="Address"></textarea>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-rounded btn-success btn-outline float-right" onclick="ShowActionUpdate()">
                                <i class="ti-save-alt"></i>&nbsp;Edit
                            </button>
                        </div>
                    </div>--%>
                <div class="col-12 col-lg-4 col-xl-3">
                    <div class="box bg-lightest" id="chat-bx">
                        <div class="box-header bg-white">
                           <%-- <div class="d-flex justify-content-between align-items-center">
                                <p class="font-size-18 mb-0 d-lg-none d-block"><a href="#" id="cht-btn" class="hover-primary"><i class="fa fa-navicon"></i></a></p>
                                <p class="font-size-18 mb-0">
                                    <a href="#" class="hover-primary">
                                        <img alt="Profile" src="../images/avatar/6.jpg" class="avatar"></a>
                                </p>
                            </div>--%>
                            <p class="font-size-18 mb-0">Data Customer</>
                        </div>
                        <div class="box-body" style="margin-top: -10px;">
                            <%-- <div class="lookup lookup-sm lookup-right my-20" style="width: 100%;">
                                <input type="text" name="s" id="TxtSearchingCustomer" placeholder="Search Customer" class="w-p100">
                            </div>--%>
                            <div class="chat-box-one-side2">
                                <div class="media-list media-list-hover">
                                    <div id="divCustomer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-8 col-xl-9">
                    <div class="nav-tabs-custom box-profile">
                        <ul class="nav nav-tabs">
                            <li><a href="#transaction" data-toggle="tab" class="active"><i class="fa fa-plus-circle"></i>&nbsp;Add Transaction</a></li>
                            <%--<li><a href="#activity" data-toggle="tab"><i class="fa fa-suitcase"></i>&nbsp;Product Assets</a></li>--%>
                            <li><a href="#history" data-toggle="tab"><i class="fa fa-list-alt"></i>&nbsp;History Transaction</a></li>
                            <li><a href="#channel" data-toggle="tab"><i class="fa fa-group"></i>&nbsp;Channel Account</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="active tab-pane" id="transaction">
                                <div class="box p-15">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Name</label>
                                                <input type="text" class="form-control" id="Customer_Name" placeholder="Name">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Email</label>
                                                <input type="text" class="form-control" id="Customer_Email" placeholder="Email">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Phone</label>
                                                <input type="text" class="form-control" id="Customer_Phone" placeholder="Phone">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Nama Perusahaan</label>
                                                <input type="text" class="form-control" id="Customer_Perusahaan" placeholder="Nama Perusahaan">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Product Assets Problem</label>
                                                <select id="cmb_Assets_Problem" class="form-control" style="height: 33px;">
                                                    <option>Select</option>
                                                    <option value="0">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Date of Transaction</label>
                                                <input class="form-control" type="date" id="DateofTransaction">
                                            </div>
                                        </div>
                                        <%--<div class="col-md-4">
                                            <div class="form-group">
                                                <label>Category</label>
                                                <select id="cmb_Category" class="form-control" style="height: 33px;">
                                                    <option>Select</option>
                                                </select>
                                            </div>
                                        </div>--%>
                                        <%-- <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Problem</label>
                                                <select id="cmb_Problem" class="form-control" style="height: 33px;">
                                                    <option>Select</option>
                                                </select>
                                            </div>
                                        </div>--%>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea id="composetextarea" name="composetextarea" class="form-control"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <%--<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Source Information/Channel</label>
                                                <select id="cmb_Source_Information" class="form-control" style="height: 33px;" readonly="readonly">
                                                    <option selected="selected" value="Portal">Portal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Priority</label>
                                                <select id="cmb_Priority_Problem" class="form-control" style="height: 33px;">
                                                    <option>Select</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>--%>
                                    <div class="row" id="divfile" style="display: block; margin-top: -20px; margin-bottom: -20px;">
                                        <div class="p-20">
                                            <div class="row" id="divThreadAttachment" style="width: 100%; margin-left: -5px;"></div>
                                        </div>
                                    </div>
                                    <%--<hr />--%>
                                    <div class="modal-footer modal-footer-uniform">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <div class="form-group">
                                                    <div class="pull-left" style="margin-left: -30px;">
                                                        <div class="btn btn-rounded btn-default btn-file">
                                                            <i class="fa fa-paperclip"></i>&nbsp;Attachment					 
                                                            <input type="file" name="files">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-10">
                                                <div class="pull-right" style="margin-right: -30px;">
                                                    <button type="button" class="btn btn-rounded btn-warning btn-outline mr-1">
                                                        <i class="ti-trash"></i>Cancel
                                                    </button>
                                                    <button type="button" id="Thread_SaveData" class="btn btn-rounded btn-success btn-outline pull-right" onclick="ThreadSimpan()">
                                                        <i class="ti-save-alt"></i>&nbsp;Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           <%-- <div class="tab-pane" id="activity">
                                <div class="box p-15">
                                     <div class="row">
                                        <div class="col-md-9">
                                        </div>
                                        <div class="col-md-3">
                                            <button type="button" class="btn btn-rounded btn-default float-right" onclick="addProduct();" style="margin-right: 20px; width: 190px">+ Add Data Product</button>
                                        </div>
                                    </div>
                                    <table id="Table1" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th style="width: 30px;">ID</th>
                                                <th style="width: 250px;">Product Name</th>
                                                <th style="width: 250px;">Description</th>
                                                <th style="width: 100px;">Type</th>
                                                <th style="width: 100px;">Status</th>
                                                <th style="width: 150px;">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>--%>
                            <div class="tab-pane" id="history">
                                <div class="box p-15">
                                    <table id="TableHistoryTicket" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                                        <thead>
                                            <tr>
                                                <th style="width: 150px;">Ticket Number</th>
                                                <th style="width: 150px;">Account</th>
                                                <th style="width: 150px;">Channel</th>
                                                <th style="width: 150px;">Agent</th>
                                                <th style="width: 170px;">Date Create</th>
                                                <%--<th style="width: 50px;">Action</th>--%>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane" id="channel">
                                <div class="box p-15">
                                    <div class="row">
                                        <div class="col-md-9">
                                        </div>
                                        <div class="col-md-3">
                                            <button type="button" class="btn btn-rounded btn-default float-right" onclick="addChannel();" style="margin-right: 20px; width: 190px">+ Add Data Channel</button>
                                        </div>
                                    </div>
                                    <table id="TableChannelInformation" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                                        <thead>
                                            <tr>
                                                <th style="width: 100px;">Channel</th>
                                                <th style="width: 200px;">Account</th>
                                                <th style="width: 100px;">Status</th>
                                                <th style="width: 100px;">User Create</th>
                                                <th style="width: 170px;">Date Create</th>
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
                    <!-- /.nav-tabs-custom -->
                </div>
            </div>
        </form>
        <!-- Modal -->
        <div class="modal center-modal fade" id="ModalOtherChannelCustomer" tabindex="-1" data-keyboard="false" data-backdrop="static">
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
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionOtherChannel('Simpan')" id="SaveOtherChannel">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal center-modal fade" id="ModalProduct" tabindex="-1" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content" style="width: 1000px; margin-left: -240px;">
                    <div class="modal-header">
                        <h5 class="modal-title">Form Add Product</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Product Name</label>
                                    <input type="text" class="form-control" id="Product_Name" placeholder="Product Name">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <textarea id="Textarea_Description" class="form-control" style="height: 300px;"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Product Type</label>
                                    <input type="text" class="form-control" id="Product_Type" placeholder="Product Type">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Status</label>
                                    <select name="select" id="cmb_Status" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="YES">Aktif</option>
                                        <option value="NO">Non Aktif</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionProduct('Simpan')" id="SimpanProduct">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal center-modal fade" id="modal-customer" tabindex="-1" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content" style="width: 1100px; height: 620px; margin-left: -300px;">
                    <div class="modal-header">
                        <h5 class="modal-title">Form Customer</h5>
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
                                    <select name="select" id="addcusTomerGender" class="form-control">
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
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionInsertCustomer()" id="SaveCustomer">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="trackingDiv"></div>
    </section>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('composetextarea');
        CKEDITOR.config.height = 350;
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
