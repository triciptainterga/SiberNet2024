<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmCustomer.aspx.vb" Inherits="ICC.TrmCustomer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmCustomer.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
      <asp:HiddenField ID="TrxStatus" runat="server" />
    <section class="content">
        <form class="form-horizontal form-element col-12">
            <div class="row">
                <div class="col-12 col-lg-4 col-xl-3">
                    <div class="box bg-lightest" id="chat-bx">
                        <div class="box-header bg-white">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="font-size-18 mb-0 d-lg-none d-block"><a href="#" id="cht-btn" class="hover-primary"><i class="fa fa-navicon"></i></a></p>
                                <%--<p class="font-size-18 mb-0"><a href="#" class="hover-primary" onclick="AddCustomer()"><i class="fa fa-plus-circle"></i></a></p>--%>
                                <p class="font-size-18 mb-0">
                                    <a href="#" class="hover-primary">
                                        <img alt="Profile" src="../images/avatar/6.jpg" class="avatar" onclick="otherChannel()" title="Searching Other Channel"></a>
                                </p>
                            </div>
                        </div>
                        <div class="box-body" style="margin-top: -20px;">
                            <%--  <div class="d-flex justify-content-between align-items-center mb-20">
                                <h4 class="box-title"></h4>
                                <p class="font-size-24 mb-0"><a href="#" class="hover-primary"><i class="fa fa-plus-circle"></i></a></p>
                            </div>--%>
                            <div class="lookup lookup-sm lookup-right my-20" style="width: 100%;">
                                <input type="text" name="s" id="TxtSearchingCustomer" placeholder="Search Customer" class="w-p100">
                            </div>
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
                            <%--<li><a href="#transaction" data-toggle="tab" class="active"><i class="fa fa-plus-circle"></i>&nbsp;Add Transaction</a></li>--%>
                            <%--<li><a href="#activity" data-toggle="tab"><i class="fa fa-suitcase"></i>&nbsp;Product Assets</a></li>--%>
                            <li><a href="#history" data-toggle="tab"><i class="fa fa-list-alt"></i>&nbsp;History Transaction</a></li>
                            <li><a href="#profile" data-toggle="tab"><i class="fa fa-user"></i>&nbsp;Detail Profile</a></li>
                            <li><a href="#channel" data-toggle="tab"><i class="fa fa-group"></i>&nbsp;Channel Account</a></li>
                            <li><a href="#vehicle" data-toggle="tab"><i class="fa fa-wifi" onclick="TableVehicle()"></i>&nbsp;Paket Broadband</a></li>
                            <%--<li><a href="#logchange" data-toggle="tab"><i class="fa fa-file" onclick="LogChange()"></i>&nbsp;Log Change</a></li>--%>
                        </ul>
                        <div class="tab-content">
                            <div class="active tab-pane" id="history">
                                <div class="box p-15">
                                    <table id="TableHistoryTicket" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                                        <thead>
                                            <tr>
                                                <th style="width: 100px;">Ticket Number</th>
                                                <th style="width: 300px;">Category</th>
                                                <th style="width: 100px;">Status</th>
                                                <th style="width: 100px;">User Create</th>
                                                <th style="width: 170px;">Date Create</th>
                                                <%--<th style="width: 50px;">Action</th>--%>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane" id="profile">
                                <div class="box p-15">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Full name</label>
                                                <input type="text" class="form-control" id="Profile_Name" placeholder="Full name">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Email</label>
                                                <input type="text" class="form-control" id="Profile_Email" placeholder="E-mail">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Phone number</label>
                                                <input type="text" class="form-control" id="Profile_Phone" placeholder="Phone number">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Gender</label>
                                                <select name="select" id="Profile_Gender" class="form-control" style="height: 33px;">
                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Province</label>
                                                <select name="select" onchange="getProvince(1);" id="cusTomerProvince" class="form-control">
                                                    <option value="">Select</option>
                                                </select>
                                                <input type="text" class="form-control" id="Facebook_Account" placeholder="Facebook Account" style="display: none;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" style="display:none;">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>NIK number</label>
                                                <input type="text" class="form-control" id="Profile_State" placeholder="NIK number">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Username</label>
                                                <input type="text" class="form-control" id="Profile_UserName" placeholder="Username">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Password</label>
                                                <input type="text" class="form-control" id="Profile_Password" placeholder="Password">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Date of birth</label>
                                                <input class="form-control" id="Profile_Birth" type="date">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>City</label>
                                                <select name="select" onchange="getCity(1);" id="cusTomerCity" class="form-control">
                                                    <option value="">Select</option>
                                                </select>
                                                <input type="text" class="form-control" id="Instagram_Account" placeholder="Instagram Account" style="display: none;">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>District</label>
                                                <select name="select" onchange="getDistrict(1);" id="cusTomerDistrict" class="form-control">
                                                    <option value="">Select</option>
                                                </select>
                                                <input type="text" class="form-control" id="Twitter_Account" placeholder="Twitter Account" style="display: none;">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Subdistrict</label>
                                                <select name="select" onchange="getZipCode(1);" id="cusTomerZipCode" class="form-control">
                                                    <option value="">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Postal code</label>
                                                <%--<input type="text" class="form-control" id="KodePos" placeholder="Zip code">--%>
                                                <select name="select" id="KodePos" class="form-control" style="height: 33px;">
                                                    <option value="">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Address</label>
                                                <textarea id="Profile_Address" name="Profile_Address" class="form-control" style="height: 300px;"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />
                                    <div class="row" id="DivAction">
                                        <div class="col-md-2"></div>
                                        <div class="col-md-10">
                                            <div class="pull-right">
                                                <button type="button" class="btn btn-rounded btn-warning btn-outline mr-1">
                                                    <i class="ti-trash"></i>Cancel
                                                </button>
                                                <a href="#" class="btn btn-rounded btn-success btn-outline pull-right" onclick="UpdateProfile()">
                                                    <i class="ti-save-alt"></i>&nbsp;Update
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="channel">
                                <div class="box p-15">
                                    <%--                                    <div class="row">
                                        <div class="col-md-9">
                                        </div>
                                        <div class="col-md-3">
                                            <button type="button" class="btn btn-rounded btn-default float-right" onclick="addChannel();" style="margin-right: 20px; width: 190px">+ Add Data Channel</button>
                                        </div>
                                    </div>--%>
                                    <a href="#" onclick="addChannel();"><span class="badge badge-pill badge-default float-right" style="font-weight: bold; font-size: 14px;">+</span></a>
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
                            <div class="tab-pane" id="vehicle">
                                <div class="box p-15">
                                    <table id="TableVehicle" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">ID</th>
                                                <th style="width: 450px;">Jenis Paket</th>
                                                <th style="width: 50px;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane" id="logchange">
                                <div class="box p-15">
                                    <div class="chat-box-one">
                                        <div class="form-group" style="transform: scale(0.8);">
                                            <div class="timeline timeline-single-column timeline-single-full-column" style="margin-left: -12px; margin-top: -20px;" id="Div1">
                                                <span class="timeline-label">
                                                    <button class="btn btn-success btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                                <%--                                                <span class="timeline-label">
                                                    <button class="btn btn-danger btn-rounded" style="cursor: none; margin-left: 100px;">
                                                        <p class="font-weight-bold" id="P_TicketNumber"></p>
                                                    </button>
                                                </span>--%>
                                                <div id="Ticket_ListInteraction"></div>
                                                <span class="timeline-label">
                                                    <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.nav-tabs-custom -->
                </div>
                <!-- /.col -->
            </div>
        </form>
        <!-- Modal -->
        <div class="modal modal-right fade" id="ModalOtherChannelCustomer" tabindex="-1" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Form Add Channel</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Channel Value</label>
                                    <input type="text" class="form-control" id="TxtChannelValue" placeholder="Channel Value">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Channel Type</label>
                                    <select name="select" id="cmbOtherChannel" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionOtherChannel('Simpan')" id="SaveOtherChannel">Save</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionOtherChannel('Update')" id="UpdateOtherChannel">Update</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionOtherChannel('Delete')" id="DeleteOtherChannel">Delete</button>
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
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionProduct()" id="SimpanProduct">Save</button>
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
                                    <label>Full name</label>
                                    <input type="text" class="form-control" id="cusTomerName" placeholder="Full name">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" class="form-control" id="cusTomerEmail" placeholder="E-mail">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Phone number</label>
                                    <input type="text" class="form-control" id="cusTomerPhone" placeholder="Phone number">
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
                        <div class="row" style="display:none;">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Date of birth</label>
                                    <input class="form-control" type="date" id="cusTomerDate">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>NIK number</label>
                                    <input type="text" class="form-control" id="cusTomerNIK" placeholder="NIK number">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Facebook Account</label>
                                    <input type="text" class="form-control" id="cusTomerFacebook" placeholder="Facebook ">
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

        <div class="modal center-modal fade" id="modal-searching-other" tabindex="-1" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content" style="width: 1200px; height: 690px; margin-left: -360px;">
                    <div class="modal-header">
                        <h5 class="modal-title">Searching Other Channel</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="scrollable ps-container ps-theme-default ps-active-y" style="position: fixed; height: 550px; width: 1170px;">
                            <table id="TableSearchingChannel" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th style="width: 250px;">Name</th>
                                        <th style="width: 250px;">Account</th>
                                        <th style="width: 60px;">Channel</th>
                                        <th style="width: 60px;">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-secondary float-right" data-dismiss="modal">Close</button>
                        <%--<button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionInsertCustomer()" id="Button1">Save</button>--%>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal modal-right fade" id="modal-vehicle" tabindex="-1" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Form Vehicle Number</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="Vehicle_Number" placeholder="Vehicle Number">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-danger float-left" data-dismiss="modal">Close</button>
                        <a class="btn btn-rounded btn-primary float-right" href="#" onclick="SubmitVehicle()" id="ButtonSubmitVehicle">Save</a>
                        <a class="btn btn-rounded btn-primary float-right" href="#" onclick="UpdateVehicle()" id="ButtonUpdateVehicle">Update</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        //CKEDITOR.replace('composetextarea');
        //CKEDITOR.config.height = 350;
        //CKEDITOR.config.toolbar = 'Full';
        //CKEDITOR.config.toolbar_Full =
        //    [
        //        //{ name: 'snddocument', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
        //        //{ name: 'clipboard', items: ['Undo', 'Redo'] },
        //        //{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
        //        {
        //            name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
        //                'HiddenField']
        //        },
        //        '/',
        //        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
        //        {
        //            name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv',
        //                '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
        //        },
        //        { name: 'links', items: ['Link', 'Unlink'] },
        //        { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'PageBreak', 'Iframe'] },
        //        '/',
        //        { name: 'styles', items: ['Styles', 'Format', 'FontSize'] },
        //        { name: 'colors', items: ['TextColor', 'BGColor'] },
        //        { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
        //    ];
        var TrmProfileAddress = CKEDITOR.replace('Profile_Address');
        TrmProfileAddress.config.height = 250;
        //var TrmProfile_BillingAddress = CKEDITOR.replace('Profile_BillingAddress');
        //TrmProfile_BillingAddress.config.height = 150;
    </script>
</asp:Content>
