<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmUserManagement.aspx.vb" Inherits="ICC.TrmUserManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <%--<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>--%>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
        <script src="js/TrmUserManagement.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <%--  <div class="content-header">
        <div class="d-flex align-items-center">
            <div class="w-p100 d-md-flex align-items-center justify-content-between">
                <h3 class="page-title">Setting Data Menu Application <i class="fa fa-plus" onclick=showAdd()></i></h3>
                <div class="d-inline-block align-items-center">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                            <li class="breadcrumb-item" aria-current="page">User Management</li>
                            <li class="breadcrumb-item active" aria-current="page">Setting User Management</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>--%>
    <section class="content">
        <div class="row" runat="server">
            <div class="col-xl-12 col-lg-12 col-12">
                <div class="box p-15">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="form-group">
                                <label>Level User</label>
                                <select name="select" id="cmbLevelUser" required class="form-control" onchange="OnchangeCmbLevelUser();" style="width: 100%;">
                                    <option value="">Select Level User</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6"></div>
                        <div class="col-md-4">
                            <br />
                            <button type="button" class="btn btn-rounded btn-default float-right" onclick="showAdd();">+ Setting Data Menu Application</button>
                        </div>
                    </div>
                </div>
                <div class="box p-15">
                    <div class="row">
                        <div class="col-md-12">
                            <table id="TrmUserManagement" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Level User</th>
                                        <th>Menu Level 1</th>
                                        <th>Menu Level 2</th>
                                        <th>Menu Level 3</th>
                                        <th>User Create</th>
                                        <th style="width: 200px;">Date Create</th>
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
        </div>
    </section>
    <div class="modal center-modal fade" id="ModalChannel" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1000px; margin-left: -250px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Setting Menu Application</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Menu Level 1</label>
                                <select name="select" id="cmbMenu1" class="form-control" onchange="getWS_CategoryType(1);" style="height:33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Menu Level 2</label>
                                <select name="select" id="cmbMenu2" class="form-control" onchange="getWS_CategoryTypeDetail(1);" style="height:33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Menu Level 3</label>
                                <select name="select" id="cmbMenu3" class="form-control" style="height:33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Description</label>
                                <textarea style="height: 150px;" class="form-control" id="TxtDescription"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan()" id="Simpan">Save</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionDelete()" id="Delete">Delete</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
