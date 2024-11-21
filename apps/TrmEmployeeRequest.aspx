<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmEmployeeRequest.aspx.vb" Inherits="ICC.TrmEmployeeRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">

    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
        <script src="js/TrmEmployeeRequest.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <form class="form-horizontal form-element col-12">
            <div class="row">
                <div class="col-12 col-lg-4 col-xl-3">
                    <div class="box bg-lightest" id="chat-bx">
                        <div class="box-header bg-white">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="font-size-18 mb-0 d-lg-none d-block"><a href="#" id="cht-btn" class="hover-primary"><i class="fa fa-navicon"></i></a></p>
                              <%--  <p class="font-size-18 mb-0"><a href="#" class="hover-primary"><i class="fa fa-comment"></i></a></p>
                                <p class="font-size-18 mb-0"><a href="#" class="hover-primary"><i class="fa fa-phone"></i></a></p>
                                <p class="font-size-18 mb-0"><a href="#" class="hover-primary"><i class="fa fa-envelope"></i></a></p>
                                <p class="font-size-18 mb-0"><a href="#" class="hover-primary"><i class="fa fa-group"></i></a></p>
                                --%>
                                <h4>Employee List</h4>
                                <p class="font-size-18 mb-0">
                                    <a href="#" class="hover-primary">
                                        <img alt="Profile" src="../images/avatar/6.jpg" class="avatar"></a>
                                </p>
                            </div>
                        </div>
                        <div class="box-body" style=" margin-top:-20px;">
                           <%--  <div class="d-flex justify-content-between align-items-center mb-20">
                                <h4 class="box-title"></h4>
                                <p class="font-size-24 mb-0"><a href="#" class="hover-primary"><i class="fa fa-plus-circle"></i></a></p>
                            </div>--%>
                            <div class="lookup lookup-sm lookup-right my-20" style="width: 100%;">
                                    <input type="text" name="s" placeholder="Search employee" class="w-p100">
                                </div>
                            <div class="chat-box-one-side2">
                                <div class="media-list media-list-hover">
                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>Mical Clark</strong></a>
                                                <%--<span class="float-right font-size-10">085782431288</span>--%>
                                            </p>
                                            <p>Mical@gmail.com</p>
                                        </div>
                                    </div>

                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/3.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>Colin Nathan</strong></a>
                                                <%--<span class="float-right font-size-10">10:00pm</span>--%>
                                            </p>
                                            <p>Nullam facilisis velit.</p>
                                        </div>
                                    </div>

                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/4.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>Nathan Johen</strong></a>
                                                <%--<span class="float-right font-size-10">10:00pm</span>--%>
                                            </p>
                                            <p>Nullam facilisis velit.</p>
                                        </div>
                                    </div>

                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/5.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>Semi Doe</strong></a>
                                                <%--<span class="float-right font-size-10">10:00pm</span>--%>
                                            </p>
                                            <p>Nullam facilisis velit.</p>
                                        </div>
                                    </div>

                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/1.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>Janny</strong></a>
                                                <%--<span class="float-right font-size-10">10:00pm</span>--%>
                                            </p>
                                            <p>Nullam facilisis velit.</p>
                                        </div>
                                    </div>

                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/7.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>Johen Doe</strong></a>
                                                <%--<span class="float-right font-size-10">10:00pm</span>--%>
                                            </p>
                                            <p>Nullam facilisis velit.</p>
                                        </div>
                                    </div>

                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>Nathan</strong></a>
                                                <%--<span class="float-right font-size-10">10:00pm</span>--%>
                                            </p>
                                            <p>Nullam facilisis velit.</p>
                                        </div>
                                    </div>

                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/3.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>Tony</strong></a>
                                                <%--<span class="float-right font-size-10">10:00pm</span>--%>
                                            </p>
                                            <p>Nullam facilisis velit.</p>
                                        </div>
                                    </div>

                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/3.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>James</strong></a>
                                                <%--<span class="float-right font-size-10">10:00pm</span>--%>
                                            </p>
                                            <p>Nullam facilisis velit.</p>
                                        </div>
                                    </div>
                                    <div class="media bg-white box-shadowed mb-15">
                                        <a class="align-self-center mr-0" href="#">
                                            <img class="avatar avatar-lg" src="../images/avatar/3.jpg" alt="..."></a>
                                        <div class="media-body">
                                            <p>
                                                <a class="hover-primary" href="#"><strong>Robert</strong></a>
                                                <%--<span class="float-right font-size-10">10:00pm</span>--%>
                                            </p>
                                            <p>Nullam facilisis velit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-8 col-xl-9">
                    <div class="nav-tabs-custom box-profile">
                        <ul class="nav nav-tabs">
                            <li><a class="active" href="#transaction" data-toggle="tab"><i class="fa fa-plus-circle"></i>&nbsp;Add Data Transaction</a></li>
                            <li><a href="#history" data-toggle="tab"><i class="fa fa-list-alt"></i>&nbsp;History Transaction Employee</a></li>
                            <li><a href="#activity" data-toggle="tab"><i class="fa fa-suitcase"></i>&nbsp;Employee Assets Management</a></li>
                            <li><a href="#profile" data-toggle="tab"><i class="fa fa-user"></i>&nbsp;Employee Profile</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="active tab-pane" id="transaction">
                                <div class="box p-15">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Employee Name</label>
                                                <input type="text" class="form-control" id="Reported_Name" placeholder="Full Name">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Employee Email</label>
                                                <input type="text" class="form-control" id="Text1" placeholder="Full Name">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Employee Phone</label>
                                                <input type="text" class="form-control" id="Text2" placeholder="Full Name">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Select Problem</label>
                                                <select id="selectProblem" class="form-control">
                                                    <option>--Select--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Select Assets Problem</label>
                                                <select id="selectAssetsProblem" class="form-control">
                                                    <option>--Select--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Select Source Information</label>
                                                <select id="select1" class="form-control">
                                                    <option>--Select--</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea id="compose-textarea" class="form-control" style="height: 300px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Select Department Problem</label>
                                                <select id="select2" class="form-control">
                                                    <option>--Select--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Select Priority Problem</label>
                                                <select id="select3" class="form-control">
                                                    <option>--Select--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <br />
                                                <div class="pull-left">
                                                    <div class="btn btn-rounded btn-default btn-file">
                                                        <i class="fa fa-paperclip"></i>&nbsp;Attachment					 
                                                            <input type="file" name="files">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="modal-footer modal-footer-uniform">
                                        <div class="row">
                                            <div class="col-md-2">
                                            </div>
                                            <div class="col-md-10">
                                                <div class="pull-right" style="margin-right:-30px;">
                                                    <button type="button" class="btn btn-rounded btn-warning btn-outline mr-1">
                                                        <i class="ti-trash"></i>Cancel
                                                    </button>
                                                    <button type="submit" id="Ticket_SaveData" class="btn btn-rounded btn-success btn-outline pull-right" onclick="Simpan()">
                                                        <i class="ti-save-alt"></i>&nbsp;Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.tab-pane -->
                            <div class="tab-pane" id="history">
                                <div class="box p-15">
                                    <table id="TrmHistoryOutbound" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th style="width: 150px;">Ticket Number</th>
                                                <th style="width: 300px;">Employee Name</th>
                                                <th style="width: 300px;">Kategori</th>
                                                <th style="width: 150px;">Status</th>
                                                <th style="width: 150px;">Request By</th>
                                                <th style="width: 300px;">Request Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20210615015317190</td>
                                                <td>Andrew</td>
                                                <td>How to set Horizontal nav</td>
                                                <td><span class="badge badge-success">Closed</span> </td>
                                                <td>Andrew</td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 07:03:47.940</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane" id="activity">
                                <div class="box p-15">
                                    <table id="Table1" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th style="width: 250px;">ID</th>
                                                <th style="width: 250px;">Asset Name</th>
                                                <th style="width: 150px;">Asset Type</th>
                                                <th style="width: 250px;">Request Asset User</th>
                                                <th style="width: 150px;">Status</th>
                                                <th style="width: 350px;">Request Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Laptop</td>
                                                <td>Komputer</td>
                                                <td>Andri</td>
                                                <td><span class="badge badge-success">Aktif</span> </td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 06:53:17.217</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Samsung A30</td>
                                                <td>Handphone</td>
                                                <td>Andri</td>
                                                <td><span class="badge badge-success">Aktif</span> </td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 06:53:17.217</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Honda Beat</td>
                                                <td>Sepeda Motor</td>
                                                <td>Andri</td>
                                                <td><span class="badge badge-success">Aktif</span> </td>
                                                <td>
                                                    <a href="javascript:void(0)">2021-06-15 06:53:17.217</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane" id="profile">
                                <div class="box p-15">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Employee Name</label>
                                                <input type="text" class="form-control" id="Text3" placeholder="Full Name">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Employee Email</label>
                                                <input type="text" class="form-control" id="Text4" placeholder="Full Name">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Employee Phone</label>
                                                <input type="text" class="form-control" id="Text5" placeholder="Full Name">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Employee Address</label>
                                                <textarea id="Textarea1" class="form-control" style="height: 300px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Position</label>
                                                <input type="text" class="form-control" id="Text6" placeholder="Full Name">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Department</label>
                                                <input type="text" class="form-control" id="Text7" placeholder="Full Name">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Status</label>
                                                <select name="select" id="Select5" class="form-control">
                                                    <option value="">Select</option>
                                                    <option value="Single">Single</option>
                                                    <option value="Married">Married</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Birth</label>
                                                <input type="date" class="form-control" id="Text9">
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
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Religion</label>
                                                <select name="select" id="Select6" class="form-control">
                                                    <option value="">Select</option>
                                                    <option value="Single">Islma</option>
                                                    <option value="Married">Kristen Protestan</option>
                                                    <option value="Married">Kristen Khatolik</option>
                                                    <option value="Married">Hindu</option>
                                                    <option value="Married">Budha</option>
                                                    <option value="Married">Konghucu</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-2"></div>
                                        <div class="col-md-10">
                                            <div class="pull-right">
                                                <button type="button" class="btn btn-rounded btn-warning btn-outline mr-1">
                                                    <i class="ti-trash"></i>Cancel
                                                </button>
                                                <button type="submit" id="Button1" class="btn btn-rounded btn-success btn-outline pull-right">
                                                    <i class="ti-save-alt"></i>&nbsp;Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.tab-pane -->
                        </div>
                        <!-- /.tab-content -->
                    </div>
                    <!-- /.nav-tabs-custom -->
                </div>
                <!-- /.col -->
            </div>
        </form>
    </section>
</asp:Content>
