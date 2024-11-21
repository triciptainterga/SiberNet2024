<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Tele_TrxTipeProduk.aspx.vb" Inherits="ICC.Tele_TrxTipeProduk" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Tele_TrxTipeProduk.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Detail Produk&nbsp;<i class="fa fa-plus" onclick="ActionAdd()"></i></h4>
                    </div>
                    <div class="box-body">
                        <table id="TrmDetailProduk" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                            <thead>
                                <tr>
                                    <th style="width: 50px;">ID</th>
                                    <th style="width: 250px;">Produk</th>
                                    <th style="width: 250px;">Detail Produk</th>
                                    <th style="width: 100px;">Status</th>
                                    <th style="width: 100px;">Date Create</th>
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
    <div class="modal modal-right fade" id="Modal-Produk" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Detail Produk</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Produk <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboProduk" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Waiting">Waiting</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Detail Produk <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                                    </div>
                                    <input type="text" class="form-control" id="TxtDetailProduk" placeholder="Detail Produk">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Status <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                    </div>
                                    <select id="ComboStatus" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Yes">Aktif</option>
                                        <option value="No">No Aktif</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdateProduk()" id="UpdateProduk">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpanProduk()" id="SimpanProduk">Submit</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionDeleteProduk()" id="DeleteProduk">Delete</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
