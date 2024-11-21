<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmUserAdd.aspx.vb" Inherits="ICC.TrmUserAdd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <%--<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>--%>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmUserAdd.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="TrxTokenMeta" runat="server" />

    <%--  <div class="content-header">
        <div class="d-flex align-items-center">
            <div class="w-p100 d-md-flex align-items-center justify-content-between">
                <h3 class="page-title">Data User Application <i class="fa fa-plus" onclick="showAdd()"></i></h3>
                <div class="d-inline-block align-items-center">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                            <li class="breadcrumb-item" aria-current="page">User Management</li>
                            <li class="breadcrumb-item active" aria-current="page">Data User Application</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>--%>
    <section class="content">

        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data User Application&nbsp;<i class="fa fa-plus" onclick="showAdd()" style="cursor: pointer;"></i></h4>
                    </div>
                    <div class="box-body">
                        <table id="TrmUserAdd" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Name</th>
                                    <th style="width: 200px;">Name</th>
                                    <th>Level User</th>
                                    <th style="width: 200px;">Email Address</th>
                                    <th style="width: 100px;">Group Agent</th>
                                    <th style="width: 100px;">Department</th>
                                    <th style="width: 100px;">Site</th>
                                    <th>Status</th>
                                    <%--<th style="width: 200px;">Date Create</th>--%>
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
    </section>
    <!-- /.modal -->
    <div class="modal center-modal fade" id="ModalChannel" tabindex="-1" data-keyboard="false" data-backdrop="static" style="overflow-y: scroll;">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Add User Application</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>User Name</label>
                                <input type="text" class="form-control" id="TrxUserName" placeholder="User Name">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" id="TrxName" placeholder="Name">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="text" class="form-control" id="TrxEmail" placeholder="Email Address">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" id="TrxPassword" placeholder="Password">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Level User</label>
                                <select name="select" id="cmbLevelUser" required class="form-control" onchange="OnchangeCmbLevelUser();" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Department</label>
                                <select name="select" id="cmbDepartment" required class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Group Agent</label>
                                <select name="select" id="cmbGroupAgent" required class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Site</label>
                                <select name="select" id="ComboSite" required class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Status</label>
                                <select name="select" id="cmbStatus" required class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="Y">Aktif</option>
                                    <option value="N">Non Aktif</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="divChannel" style="display: none;">
                        <div class="col-md-12 col-12">
                            <div class="box box-slided-up">
                                <div class="box-header with-border bg-warning">
                                    <h6 class="box-title">
                                        <label>Channel Data Agent</label></h6>
                                    <ul class="box-controls pull-right">
                                        <li><a class="box-btn-close" href="#"></a></li>
                                        <li><a class="box-btn-slide rotate-180" href="#"></a></li>
                                        <%--<li><a class="box-btn-fullscreen" href="#"></a></li>--%>
                                    </ul>
                                </div>
                                <div class="box-body" style="display: block;">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="c-inputs-stacked">
                                                    <input type="checkbox" id="checkboxEmail" onclick="EmailCheck(this.checked)">
                                                    <label for="checkboxEmail" class="block">Email</label>
                                                    <input type="hidden" id="HDEmail" runat="server" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="c-inputs-stacked">
                                                    <input type="checkbox" id="checkboxWA" onclick="WACheck(this.checked)">
                                                    <label for="checkboxWA" class="block">WA</label>
                                                    <input type="hidden" id="HDWA" runat="server" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="c-inputs-stacked">
                                                    <input type="checkbox" id="checkboxInbound" onclick="InboundCheck(this.checked)">
                                                    <label for="checkboxInbound" class="block">Inbound</label>
                                                    <input type="hidden" id="HDInbound" runat="server" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="c-inputs-stacked">
                                                    <input type="checkbox" id="checkboxOutbound" onclick="OutboundCheck(this.checked)">
                                                    <label for="checkboxOutbound" class="block">Outbound</label>
                                                    <input type="hidden" id="HDOutbound" runat="server" />

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="c-inputs-stacked">
                                                    <input type="checkbox" id="checkboxInstagram" onclick="InstagramCheck(this.checked)">
                                                    <label for="checkboxInstagram" class="block">Instagram</label>
                                                    <input type="hidden" id="HDInstagram" runat="server" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="c-inputs-stacked">
                                                    <input type="checkbox" id="checkboxFacebook" onclick="FacebookCheck(this.checked)">
                                                    <label for="checkboxFacebook" class="block">Facebook</label>
                                                    <input type="hidden" id="HDFacebook" runat="server" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="c-inputs-stacked">
                                                    <input type="checkbox" id="checkboxTwitter" onclick="TwitterCheck(this.checked)">
                                                    <label for="checkboxTwitter" class="block">Twitter</label>
                                                    <input type="hidden" id="HDTwitter" runat="server" />
                                                </div>
                                            </div>
                                        </div>
                                        <%-- <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="c-inputs-stacked">
                                                    <input type="checkbox" id="checkboxChat" onclick="ChatCheck(this.checked)">
                                                    <label for="checkboxChat" class="block">Live Chat</label>
                                                    <input type="hidden" id="HDChat" runat="server" />
                                                </div>
                                            </div>
                                        </div>--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Description</label>
                                <textarea style="height: 150px;" class="form-control" id="TrxDescription" name="TrxDescription"></textarea>
                            </div>
                        </div>
                        <%-- <div class="col-md-3">
                            <div class="form-group">
                                <label>Foto Agent</label>
                                <div class="owl-item" style="width: 240.3px; margin-right: 20px;">
                                    <div class="box">
                                        <img class="card-img-top img-responsive" src="../images/card/img1.jpg" alt="Card image cap">
                                        <div class="box-body">
                                            <div class="text-center">
                                                <h4 class="box-title">Blog title</h4>
                                                <br>
                                                <a href="#" class="btn btn-rounded btn-primary btn-sm">Read more</a>
                                            </div>
                                        </div>
                                        <!-- /.box-body -->
                                    </div>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan()" id="Simpan">Save</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionDelete()" id="Delete">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-reset-password" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 900px; margin-left: -200px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Reset Password</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>UserName</label>
                                <input type="text" class="form-control" id="Reset_UserName" placeholder="UserName" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Reset Password</label>
                                <input type="password" class="form-control" id="Reset_Password" placeholder="Reset Password" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal" onclick="showclose()">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ResetPassword()" id="BTN_ResetPassword">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-foto" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Upload Foto</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <img class="rounded-circle" id="ImageFotoNya">
                            <%--<img class="rounded-circle" src="../images/card/img3.jpg" alt="Card image cap">--%>
                            <br />
                            <br />
                            <div class="box-body">
                                <div class="text-center">
                                    <h4 class="box-title">
                                        <label id="ValueName"></label>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal" onclick="showclose()">Cancel</button>
                    <div class="pull-right">
                        <div class="btn btn-rounded btn-primary btn-file" id="ButtonHeaderAttachment">
                            <i class="fa fa-file-photo-o"></i>&nbsp;Upload					 
                                                                <input type="file" name="filesfoto">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var TrxDescription = CKEDITOR.replace('TrxDescription');
        TrxDescription.config.height = 120;
        TrxDescription.config.toolbar = 'Basic';
        TrxDescription.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
