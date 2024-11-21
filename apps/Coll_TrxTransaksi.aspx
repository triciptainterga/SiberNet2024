<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Coll_TrxTransaksi.aspx.vb" Inherits="ICC.Coll_TrxTransaksi" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/ckeditor/ckeditor.js"></script>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Coll_TrxTransaksi.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxUploadID" runat="server" />
    <asp:HiddenField ID="TrxPolisNumber" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-md-3 col-lg-3">
                <div class="row fx-element-overlay">
                    <div class="box box-default" style="margin-left: 15px; margin-right: 15px;">
                        <div class="fx-card-item">
                            <div class="fx-card-avatar fx-overlay-1">
                                <img src="../images/card/img3.jpg" alt="user">
                                <div class="fx-overlay scrl-up">
                                    <ul class="fx-info">
                                        <li><a class="btn default btn-outline image-popup-vertical-fit" href="../images/card/1.jpg"><i class="ion-camera"></i></a></li>
                                        <li><a class="btn default btn-outline" href="javascript:void(0);"><i class="ion-eye"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="fx-card-content">
                                <h3 class="box-title" id="NamaUser"></h3>
                               <%-- <small>Senior Telesales Indonesia</small>
                                <br>--%>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box box-default">
                    <div class="box-body box-profile">
                        <%--                        <h4 class="box-title text-info"><i class="ti-user mr-15"></i>Personal Information</h4>                        <hr />--%>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Nama *" id="TeleNama">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Email" id="TeleEmail">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Telepon" id="TeleTelpon">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <select id="ComboGender" class="form-control" style="height: 33px;">
                                            <option value="">Select</option>
                                            <option value="1" selected="selected">Pria</option>
                                            <option value="2">Wanita</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Job Tittle" id="TeleJobTittle">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Alamat" id="TeleAlamat">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Negara" id="TeleNegara">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Provinsi" id="TeleProvinsi">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Kota" id="TeleKota">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Zip Code" id="TeleZipCode">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-9">
                <div class="row">
                    <div class="col-12">
                        <div class="box">
                            <div class="box-body">
                                <ul class="nav nav-pills rounded nav-justified">
                                    <li class="nav-item"><a href="#navpills-6" class="nav-link active" data-toggle="tab" aria-expanded="true" onclick="CampaignScript()"><i class="fa fa-clipboard"></i>Script Greeting</a> </li>
                                    <li class="nav-item"><a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="GetWS_JourneyTagihan()"><i class="fa fa-sticky-note"></i>Notes Tagihan</a> </li>
                                    <li class="nav-item"><a href="#navpills-1" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="GetWS_JourneyPembayaran()"><i class="fa fa-history"></i>History Tagihan</a> </li>
                                    <li class="nav-item"><a href="#navpills-4" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="HistoryCall()"><i class="fa fa-phone"></i>History Call</a> </li>
                                    <li class="nav-item"><a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="DataTableProduk()"><i class="fa fa-archive"></i>Produk</a> </li>
                                    <%--<li class="nav-item"><a href="#navpills-5" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionQuestion()"><i class="fa fa-question-circle-o"></i>Data Question</a> </li>--%>
                                </ul>
                            </div>
                        </div>
                        <div class="box">
                            <div class="box-body">
                                <div class="tab-content">
                                    <div id="navpills-6" class="tab-pane active">
                                        <div class="box-body">
                                            <blockquote class="blockquote">
                                                <b>
                                                    <p id="HeaderScript"></p>
                                                </b>
                                                <hr />
                                                <div id="campaignScript"></div>
                                                <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                    <div id="navpills-3" class="tab-pane">
                                        <div class="box-body box-profile">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Type Pinjaman <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-cart-plus"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control" id="TypePinjaman" placeholder="Type Pinjaman">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Nama Pinjaman <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-id-card"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control" id="NamaPinjaman" placeholder="Nama Pinjaman">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Total Pinjaman <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-money"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control" id="TotalPinjaman" placeholder="Total Pinjaman">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Periode Total Tagihan <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-clock-o"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control" id="PeriodeTotalTagihan" placeholder="Periode Total Tagihan">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Jumlah Tagihan <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-suitcase"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control" id="JumlahTagihan" placeholder="Jumlah Tagihan">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Periode Tagihan Ke <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-level-down"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control" id="PeriodeTagihanKe" placeholder="Periode Tagihan Ke">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Periode Tagihan Sampai Dengan <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-level-up"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control" id="PeriodeTagihanSampaiDengan" placeholder="Periode Tagihan Sampai Dengan">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Tanggal Jatuh Tempo <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="ti-calendar"></i></span>
                                                            </div>
                                                            <input type="date" class="form-control" id="JatuhTempoBayar" placeholder="Jatuh Tempo">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Tanggal Bayar <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="ti-calendar"></i></span>
                                                            </div>
                                                            <input type="date" class="form-control" id="TanggalBayar" placeholder="Tanggal Bayar">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Status Tagihan <span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                                            </div>
                                                            <select name="select" id="ComboStatusTagihan" class="form-control" style="height: 33px;">
                                                                <option value="">Select</option>
                                                                <option value="Progress">Progress</option>
                                                                <option value="Complete">Completed</option>
                                                                <option value="Pending">Pending</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Status Telepon<span class="text-danger">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                                            </div>
                                                            <select id="ComboStatusTelepon" class="form-control" style="height: 33px;">
                                                                <option value="">Select</option>
                                                                <option value="Reject">Connected</option>
                                                                <option value="Reject">Reject</option>
                                                                <option value="No Answer">No Answer</option>
                                                                <option value="Busy">Busy</option>
                                                                <option value="Wrong Number">Wrong Number</option>
                                                                <option value="Unregistered">Unregistered</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Eskalasi Ticket <span class="text-success">*</span></label>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                                            </div>
                                                            <select id="EskalasiTicket" class="form-control" style="height: 33px;">
                                                                <option value="">Select</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Keterangan <span class="text-danger">*</span></label>
                                                        <textarea rows="3" id="Coll_NotesTagihan" name="Coll_NotesTagihan" style="width: 100%;"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div id="results_notes"></div>
                                                    <label for="file_default"></label>
                                                    <label for="file_name"><b></b></label>
                                                    <div class="tb-height-b60 tb-height-lg-b60"></div>
                                                    <section class="hk-sec-wrapper">
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <div class="custom-file">
                                                                    <input type="file" name="filesnya_notes" class="custom-file-input" id="filesnya" />
                                                                    <label class="custom-file-label" for="customFile">Choose file</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <br />
                                                </div>
                                            </div>
                                            <%--  <div class="box-footer">                                                                                           </div>--%>
                                            <%--<hr />--%>
                                            <br />
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <a class="btn btn-rounded btn-danger btn-outline pull-left" onclick="CancelTagihan()"><i class="fa fa-trash"></i>&nbsp;Cancel                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <a class="btn btn-rounded btn-primary btn-outline pull-right" onclick="SimpanTagihan()"><i class="fa fa-save"></i>&nbsp;Submit                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="timeline timeline-single-column timeline-single-full-column">
                                                <span class="timeline-label"><span class="badge badge-pill badge-primary badge-lg">Transaksi</span></span>
                                                <div class="timeline-item timeline-item-arrow-sm">
                                                    <div class="timeline-point timeline-point-primary">
                                                        <i class="fa fa-history"></i>
                                                    </div>
                                                    <div class="timeline-event timeline-event-primary">
                                                        <table class="table table-striped table-hover" id="TableNotesTagihan">
                                                            <tbody>
                                                                <tr>
                                                                    <%--<th>Pinjaman</th>--%>
                                                                    <th>Tagihan</th>
                                                                    <th>Per From</th>
                                                                    <th>Per To</th>
                                                                    <th>Status Tagihan</th>
                                                                    <th>Status Telepon</th>
                                                                    <th>Tanggal Bayar</th>
                                                                    <th>Date Create</th>
                                                                    <th>Keterangan</th>
                                                                </tr>
                                                            </tbody>
                                                            <%-- <tbody>
                                                                <tr>
                                                                    <td>25.000.000</td>
                                                                    <td>1.250.0000</td>
                                                                    <td>1</td>
                                                                    <td>1</td>
                                                                    <td>Completed</td>
                                                                    <td>Connected</td>
                                                                    <td>16 Agustus 2022</td>
                                                                </tr>
                                                            </tbody>--%>
                                                        </table>
                                                    </div>
                                                </div>
                                                <p id="DataKeterangan"></p>
                                                <div class="timeline-item" id="DivKeterangan">
                                                    <div class="timeline-point timeline-point-primary">
                                                        <i class="fa fa-sticky-note"></i>
                                                    </div>
                                                    <div class="timeline-event timeline-event-primary">
                                                        <div class="timeline-heading">
                                                            <%--<h4 class="timeline-title">Keterangan</h4>--%>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <div id="Note_JourneyKeterangan"></div>
                                                        </div>
                                                        <div class="timeline-footer">
                                                            <p class="text-right" id="TanggalKeterangan" style="font-size: 10px;"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="timeline-item" id="DivAttachment">
                                                    <div class="timeline-point timeline-point-primary">
                                                        <i class="fa fa-image"></i>
                                                    </div>
                                                    <div class="timeline-event">
                                                        <div class="timeline-heading">
                                                            <h4 class="timeline-title"><a href="#">Document</a></h4>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <img src="../images/150x100.png" alt="..." class="m-10">
                                                            <img src="../images/150x100.png" alt="..." class="m-10">
                                                            <img src="../images/150x100.png" alt="..." class="m-10">
                                                            <img src="../images/150x100.png" alt="..." class="m-10">
                                                        </div>
                                                        <div class="timeline-footer">
                                                            <p class="text-right"><i class="fa fa-clock-o"></i>8 days ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="Note_usertimeline" style="margin-top: -15px;">
                                                <div id="Note_JourneyTagihan" class="timeline timeline-single-column timeline-single-full-column"></div>
                                                <span class="timeline-label" style="margin-left: 15px;">
                                                    <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-1" class="tab-pane">
                                        <div class="box-body">
                                            <div class="timeline timeline-single-column timeline-single-full-column">
                                                <%--<div class="timeline-item timeline-item-arrow-sm">                                                    <div class="timeline-point timeline-point-primary">                                                        <i class="fa fa-star"></i>                                                    </div>                                                    <div class="timeline-event">                                                        <div class="panel">                                                            <div class="panel-heading">                                                                <h3 class="panel-title">timeline-event timeline-event-primary with panel panel-default</h3>                                                            </div>                                                            <div class="panel-body">                                                                Panel content									                                                            </div>                                                        </div>                                                    </div>                                                </div>--%>                                                <span class="timeline-label"><span class="badge badge-pill badge-primary badge-lg">Data History Tagihan</span></span>
                                                <div class="timeline-item timeline-item-arrow-sm">
                                                    <div class="timeline-point timeline-point-primary">
                                                        <i class="fa fa-history"></i>
                                                    </div>
                                                    <div class="timeline-event timeline-event-primary">
                                                        <table class="table table-striped table-hover" id="TableNotesPembayaran">
                                                            <tbody>
                                                                <tr>
                                                                    <th style="width: 150px;">Jumlah Tagihan</th>
                                                                    <th style="width: 150px;">Periode Tagihan</th>
                                                                    <th style="width: 150px;">Metode Pembayaran</th>
                                                                    <th style="width: 150px;">Status</th>
                                                                    <th style="width: 150px;">Tanggal Bayar</th>
                                                                </tr>
                                                                <%--<tr>
                                                                    <td>1.250.0000</td>
                                                                    <td>Januari 2022</td>
                                                                    <td>Debit Rekening</td>
                                                                    <td>Sudah Bayar</td>
                                                                    <td>15 Januari 2022</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1.250.0000</td>
                                                                    <td>Februari 2022</td>
                                                                    <td>Debit Rekening</td>
                                                                    <td>Sudah Bayar</td>
                                                                    <td>15 Februari 2022</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1.250.0000</td>
                                                                    <td>Maret 2022</td>
                                                                    <td>Debit Rekening</td>
                                                                    <td>Sudah Bayar</td>
                                                                    <td>15 Maret 2022</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1.250.0000</td>
                                                                    <td>April 2022</td>
                                                                    <td>Debit Rekening</td>
                                                                    <td>Sudah Bayar</td>
                                                                    <td>15 April 2022</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1.250.0000</td>
                                                                    <td>Mei 2022</td>
                                                                    <td>Debit Rekening</td>
                                                                    <td>Sudah Bayar</td>
                                                                    <td>15 Mei 2022</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1.250.0000</td>
                                                                    <td>Juni 2022</td>
                                                                    <td>Debit Rekening</td>
                                                                    <td>Sudah Bayar</td>
                                                                    <td>15 Juni 2022</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1.250.0000</td>
                                                                    <td>Juli 2022</td>
                                                                    <td>Debit Rekening</td>
                                                                    <td>Sudah Bayar</td>
                                                                    <td>15 Juli 2022</td>
                                                                </tr>--%>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <%--   <div class="timeline-item">
                                                    <div class="timeline-point timeline-point-primary">
                                                        <i class="fa fa-sticky-note"></i>
                                                    </div>
                                                    <div class="timeline-event timeline-event-primary">
                                                        <div class="timeline-heading">
                                                            <h4 class="timeline-title">Keterangan</h4>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <p>
                                                                Presiden Joko Widodo (Jokowi) memilih cara penyelesaian 'di luar persidangan' untuk menuntaskan kasus pelanggaran HAM berat masa lalu. Para aktivis menolak dan ingin persoalan serius itu tetap diselesaikan di persidangan. Berikut duduk perkara soal Keputusan Presiden (Keppres) terbaru Jokowi.                                                                Dalam pidato di sidang tahunan MPR di kompleks parlemen, Senayan, Jakarta, Selasa (16/8), Jokowi menyampaikan pihaknya menaruh perhatian soal penyelesaian pelanggaran HAM berat masa lalu. Perhatian itu berwujud, pertama pemrosesan RUU Komisi Kebenaran dan Rekonsiliasi (KKR). Kedua, berwujud Keppres.                                                                Baca artikel detiknews, "Cara Pilihan Jokowi Tangani Pelanggaran HAM Berat Tuai Penolakan" selengkapnya https://news.detik.com/berita/d-6240316/cara-pilihan-jokowi-tangani-pelanggaran-ham-berat-tuai-penolakan.                                                                Download Apps Detikcom Sekarang https://apps.detik.com/detik/                                                           
                                                            </p>
                                                        </div>
                                                        <div class="timeline-footer">
                                                            <p class="text-right">Feb-27-2014</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="timeline-item">
                                                    <div class="timeline-point timeline-point-primary">
                                                        <i class="fa fa-image"></i>
                                                    </div>
                                                    <div class="timeline-event">
                                                        <div class="timeline-heading">
                                                            <h4 class="timeline-title"><a href="#">Document</a></h4>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <img src="../images/150x100.png" alt="..." class="m-10">
                                                            <img src="../images/150x100.png" alt="..." class="m-10">
                                                            <img src="../images/150x100.png" alt="..." class="m-10">
                                                            <img src="../images/150x100.png" alt="..." class="m-10">
                                                        </div>
                                                        <div class="timeline-footer">
                                                            <p class="text-right"><i class="fa fa-clock-o"></i>8 days ago</p>
                                                        </div>
                                                    </div>
                                                </div>--%>
                                                <span class="timeline-label">
                                                    <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-2" class="tab-pane">
                                        <%--<button type="button" class="btn btn-rounded btn-primary float-right" onclick="showAdd();">+ Add</button>--%>
                                        <br />
                                        <%--<a href="#" class="float-right"><i class="fa fa-plus float-right" onclick="AddProduk()"></i>Tambah Produk</a>--%>                                        <a href="#" onclick="AddProduk();"><span class="badge badge-pill badge-default float-right" style="font-weight: bold; font-size: 14px;">+ Tambah Produk</span></a>
                                        <br />
                                        <br />
                                        <%-- <br />--%>
                                        <table id="TrmProduk" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">ID</th>
                                                    <th style="width: 200px;">Produk</th>
                                                    <th style="width: 200px;">Detail Produk</th>
                                                    <th style="width: 200px;">Telepon Lainnya</th>
                                                    <th style="width: 200px;">Jatuh Tempo</th>
                                                    <th style="width: 100px;">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <%-- <div id="navpills-3" class="tab-pane">                                        <table id="TrxHistoryOutbound" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">                                            <thead>                                                <tr>                                                    <th>call_id</th>                                                    <th style="width: 250px;">product_campaign</th>                                                    <th>call_reason</th>                                                    <th>call_status</th>                                                    <th style="width: 100px;">call_agent</th>                                                    <th style="width: 160px;">call_date</th>                                                </tr>                                            </thead>                                            <tbody>                                            </tbody>                                        </table>                                    </div>--%>
                                    <div id="navpills-4" class="tab-pane">
                                        <table id="TrmHistoryCall" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">ID</th>
                                                    <th style="width: 100px;">Telepon</th>
                                                    <th style="width: 170px;">Start Call</th>
                                                    <th style="width: 170px;">End Call</th>
                                                    <th style="width: 60px;">Extension</th>
                                                    <th style="width: 60px;">Duration</th>
                                                    <th style="width: 60px;">Play</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <%--<div id="navpills-5" class="tab-pane">
                                    </div>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="chat-box-body">
            <div id="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-primary l-h-70">
                <div id="chat-overlay"></div>
                <span class="mdi mdi-phone-in-talk font-size-30"></span>
            </div>
        </div>
        <div id="chat-box-bodyDrop"></div>
        <div class="modal modal-right fade show" id="modal-audio" tabindex="-1" aria-modal="true" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Voice Recording</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <%--<iframe id="FrameAudio" src="http://localhost/2022briqm/apps/js/voice/Clean-Audio-Player-jQuery/index.html" title="description" style="width: 100%; height: 400px;"></iframe>--%>
                            <iframe id="FrameAudio" title="description" style="width: 100%; height: 400px;"></iframe>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-rounded btn-danger float-left" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal center-modal fade" id="modal-produk" tabindex="-1" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content" style="width: 1000px; margin-left: -250px;">
                    <div class="modal-header">
                        <h5 class="modal-title">Form Tambah Produk</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Produk <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                        </div>
                                        <select id="ComboProduk" class="form-control" style="height: 33px;" onchange="ChangeComboProduk('1');">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Detail Produk <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                        </div>
                                        <select id="ComboDetailProduk" class="form-control" style="height: 33px;">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Jatuh Tempo <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ti-calendar"></i></span>
                                        </div>
                                        <input type="date" class="form-control" placeholder="Jatuh Tempo" id="JatuhTempo">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Nomor Telepon Selain Keluarga <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-phone"></i></span>
                                        </div>
                                        <input type="text" class="form-control" id="NomorTeleponKeluarga" placeholder="Nomor Telepon Selain Keluarga">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Hubungan <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-street-view"></i></span>
                                        </div>
                                        <select id="ComboHubungan" class="form-control" style="height: 33px;">
                                            <option value="">Select</option>
                                            <option value="1">Teman Kerja</option>
                                            <option value="2">Atasan Kerja</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Status <span class="text-danger">*</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                        </div>
                                        <select name="select" id="ComboStatus" class="form-control" style="height: 33px;">
                                            <option value="">Select</option>
                                            <option value="Progress">Progress</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Keterangan <span class="text-danger">*</span></label>
                                    <textarea rows="8" class="form-control" id="KeteranganProduk"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdateProduk()" id="UpdateProduk">Update</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpanProduk()" id="SimpanProduk">Save</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionDeleteProduk()" id="DeleteProduk">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script type="text/javascript">        var CollNotes = CKEDITOR.replace('Coll_NotesTagihan');        CollNotes.config.height = 325;        CollNotes.config.toolbar = 'Basic';        CollNotes.config.toolbar_Basic =            [                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']            ];    </script>
</asp:Content>
