<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="1_TrSimulation.aspx.vb" Inherits="ICC._1_TrSimulation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/1_TrSimulation.js"></script>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header">
                        <h4 class="box-title">Incoming Channel Transaction</h4>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Select Customer Type</label>
                                    <select id="selectCustomerType" name="select" required class="form-control" onchange="CustomerType()">
                                        <option value="">Select</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Non Customer">Non Customer</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Select Customer</label>
                                    <select name="select" id="Select_Customer" required class="form-control" onchange="changeCustomer()">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Source of Information / Channel</label>
                                    <select name="select" id="Ticket_SourceChannel" required class="form-control">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Select Account Channel</label>
                                    <select id="selectAccountChannel" name="select" required class="form-control">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Account Non Customer</label>
                                    <input type="text" class="form-control" id="Text1" placeholder="Phone" required data-validation-required-message="This field is required">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" class="form-control" id="Text0" placeholder="Phone" required data-validation-required-message="This field is required" readonly="true">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Thread ID</label>
                                    <input type="text" class="form-control" id="Text2" placeholder="Thread ID" required data-validation-required-message="This field is required" runat="server">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Number ID</label>
                                    <input type="text" class="form-control" id="Text3" placeholder="Number ID" required data-validation-required-message="This field is required" runat="server">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Subject</label>
                                    <input type="text" class="form-control" id="Text4" placeholder="Subject" required data-validation-required-message="This field is required" runat="server">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <br />
                                    <a href="#" type="submit" id="Action_SaveData" class="waves-effect waves-light btn btn-outline btn-success mb-5" onclick="ActionTransaction()" style="width: 100%;">
                                        <i class="ti-save-alt"></i>&nbsp;Action To Ticket                           
                                    </a>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <button type="submit" id="Ticket_SaveData" class="btn btn-rounded btn-success btn-outline">
                                        <i class="ti-save-alt"></i>Save
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <button type="submit" id="Ticket_SendMail" class="btn btn-rounded btn-success btn-outline" onclick="sendmail();">
                                        <i class="ti-save-alt"></i>Send Email
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <asp:TextBox ID="txtPassword" runat="server" Width="100%" CssClass="form-control"></asp:TextBox>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <button type="button" id="Button1" runat="server" class="btn btn-rounded btn-success btn-outline">
                                        <i class="ti-save-alt"></i>Encrypt Password
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <asp:Label ID="labelEncrypt" runat="server"></asp:Label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <button type="button" id="Button2" runat="server" class="btn btn-rounded btn-success btn-outline">
                                        <i class="ti-save-alt"></i>Decrypt Password
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <asp:Label ID="labelDecrypt" runat="server"></asp:Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-primary"><span></span></div>
                    <div class="box-header no-border p-0">
                        <a onclick="getWS_SelectedEscalationType(&#39;' + selectedValue + '&#39;,&#39;' + json[i].USERID + '&#39;,&#39;' + selectedText + '&#39;,&#39;' + json[i].USERNAME + '&#39;)" style="cursor: pointer;">
                            <img class="img-fluid" src="../images/card/4.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="user-contact list-inline text-center">
                            <a href="#" class="btn btn-circle btn-success mb-5"><i class="fa fa-whatsapp"></i></a>
                            <a href="#" class="btn btn-circle mb-5 btn-warning" title="'+ json[i].EMAIL_ADDRESS +'"><i class="fa fa-envelope"></i></a>
                        </div>
                        <div class="text-center">
                            <h5 class="my-10"><a href="#"></a></h5>
                            <h6 class="user-info mt-0 mb-10 text-fade"></h6>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-4 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-primary"><span></span></div>
                    <div class="box-header no-border p-0">
                        <a onclick="getWS_SelectedEscalationType(&#39;' + selectedValue + '&#39;,&#39;' + json[i].USERID + '&#39;,&#39;' + selectedText + '&#39;,&#39;' + json[i].USERNAME + '&#39;)" style="cursor: pointer;">
                            <img class="img-fluid" src="../images/card/4.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="user-contact list-inline text-center">
                            <a href="#" class="btn btn-circle btn-success mb-5"><i class="fa fa-whatsapp"></i></a>
                            <a href="#" class="btn btn-circle mb-5 btn-warning" title="'+ json[i].EMAIL_ADDRESS +'"><i class="fa fa-envelope"></i></a>
                        </div>
                        <div class="text-center">
                            <h5 class="my-10"><a href="#"></a></h5>
                            <h6 class="user-info mt-0 mb-10 text-fade"></h6>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-4 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-primary"><span></span></div>
                    <div class="box-header no-border p-0">
                        <a onclick="getWS_SelectedEscalationType(&#39;' + selectedValue + '&#39;,&#39;' + json[i].USERID + '&#39;,&#39;' + selectedText + '&#39;,&#39;' + json[i].USERNAME + '&#39;)" style="cursor: pointer;">
                            <img class="img-fluid" src="../images/card/4.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="user-contact list-inline text-center">
                            <a href="#" class="btn btn-circle btn-success mb-5"><i class="fa fa-whatsapp"></i></a>
                            <a href="#" class="btn btn-circle mb-5 btn-warning" title="'+ json[i].EMAIL_ADDRESS +'"><i class="fa fa-envelope"></i></a>
                        </div>
                        <div class="text-center">
                            <h5 class="my-10"><a href="#"></a></h5>
                            <h6 class="user-info mt-0 mb-10 text-fade"></h6>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-4 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-primary"><span></span></div>
                    <div class="box-header no-border p-0">
                        <a onclick="getWS_SelectedEscalationType(&#39;' + selectedValue + '&#39;,&#39;' + json[i].USERID + '&#39;,&#39;' + selectedText + '&#39;,&#39;' + json[i].USERNAME + '&#39;)" style="cursor: pointer;">
                            <img class="img-fluid" src="../images/card/4.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="user-contact list-inline text-center">
                            <a href="#" class="btn btn-circle btn-success mb-5"><i class="fa fa-whatsapp"></i></a>
                            <a href="#" class="btn btn-circle mb-5 btn-warning" title="'+ json[i].EMAIL_ADDRESS +'"><i class="fa fa-envelope"></i></a>
                        </div>
                        <div class="text-center">
                            <h5 class="my-10"><a href="#"></a></h5>
                            <h6 class="user-info mt-0 mb-10 text-fade"></h6>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-4 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-primary"><span></span></div>
                    <div class="box-header no-border p-0">
                        <a onclick="getWS_SelectedEscalationType(&#39;' + selectedValue + '&#39;,&#39;' + json[i].USERID + '&#39;,&#39;' + selectedText + '&#39;,&#39;' + json[i].USERNAME + '&#39;)" style="cursor: pointer;">
                            <img class="img-fluid" src="../images/card/4.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="user-contact list-inline text-center">
                            <a href="#" class="btn btn-circle btn-success mb-5"><i class="fa fa-whatsapp"></i></a>
                            <a href="#" class="btn btn-circle mb-5 btn-warning" title="'+ json[i].EMAIL_ADDRESS +'"><i class="fa fa-envelope"></i></a>
                        </div>
                        <div class="text-center">
                            <h5 class="my-10"><a href="#"></a></h5>
                            <h6 class="user-info mt-0 mb-10 text-fade"></h6>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-4 col-lg-3">
                <div class="box ribbon-box">
                    <div class="ribbon-two ribbon-two-primary"><span></span></div>
                    <div class="box-header no-border p-0">
                        <a onclick="getWS_SelectedEscalationType(&#39;' + selectedValue + '&#39;,&#39;' + json[i].USERID + '&#39;,&#39;' + selectedText + '&#39;,&#39;' + json[i].USERNAME + '&#39;)" style="cursor: pointer;">
                            <img class="img-fluid" src="../images/card/4.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="user-contact list-inline text-center">
                            <a href="#" class="btn btn-circle btn-success mb-5"><i class="fa fa-whatsapp"></i></a>
                            <a href="#" class="btn btn-circle mb-5 btn-warning" title="'+ json[i].EMAIL_ADDRESS +'"><i class="fa fa-envelope"></i></a>
                        </div>
                        <div class="text-center">
                            <h5 class="my-10"><a href="#"></a></h5>
                            <h6 class="user-info mt-0 mb-10 text-fade"></h6>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-4 col-lg-3">
                AMS
                </div>
        </div>
    </section>
</asp:Content>
