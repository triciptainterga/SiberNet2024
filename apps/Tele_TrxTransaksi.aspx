<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Tele_TrxTransaksi.aspx.vb" Inherits="ICC.Tele_TrxTransaksi" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Tele_TrxTransaksi.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxUploadID" runat="server" />
    <asp:HiddenField ID="TrxPolisNumber" runat="server" />
    <asp:HiddenField ID="TrxTelepon" runat="server" />
    <asp:HiddenField ID="TrxTransaksiID" runat="server" />
    <asp:HiddenField ID="TrxScript" runat="server" />
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
                                        <li><a class="btn default btn-outline" href="#" onclick="EditNasabah()"><i class="ion-edit"></i></a></li>
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
                        <%--                        <h4 class="box-title text-info"><i class="ti-user mr-15"></i>Personal Information</h4>
                        <hr />--%>
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
                                        <input class="form-control input-lg" type="text" placeholder="Kota" id="TeleKota">
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
                                        <input class="form-control input-lg" type="text" placeholder="Wilayah" id="TeleWilayah" value="Indonesia Bagian Barat">
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
                                    <li class="nav-item"><a href="#navpills-6" class="nav-link active" data-toggle="tab" aria-expanded="true" onclick="ActionScript()"><i class="fa fa-clipboard"></i>Script Greeting</a> </li>
                                    <li class="nav-item"><a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionNotes()"><i class="fa fa-sticky-note"></i>Notes</a> </li>
                                    <li class="nav-item"><a href="#navpills-1" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionTask()"><i class="fa fa-server"></i>Task</a> </li>
                                    <li class="nav-item"><a href="#navpills-4" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionCall()"><i class="fa fa-phone"></i>History Call</a> </li>
                                    <%--<li class="nav-item"><a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="DataTableProduk()"><i class="fa fa-archive"></i>Produk</a> </li>--%>
                                    <%--<li class="nav-item"><a href="#navpills-5" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionQuestion()"><i class="fa fa-question-circle-o"></i>Data Question</a> </li>--%>
                                    <%--<li class="nav-item"><a href="#navpills-7" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="DataRecording()"><i class="fa fa-archive"></i>Recording</a> </li>--%>
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
                                                <%--  <p><b>Produk Tabungan Nasional</b></p>
                                                <hr />
                                                <p>"Selamat pagi! Selamat datang di Customer Service. Nama saya [Nama Agent]. Ada yang bisa saya bantu?"</p>
                                                <p>"Halo selamat datang! Anda terhubung ke [Nama Agent] di Customer Service. Bagaimana saya bisa membantu Anda?”</p>
                                                <p>“Senang bertemu denganmu lagi, [Nama Pelanggan]. Saya harap Anda baik-baik saja. Apakah Anda ingin saya menunjukkan kepada Anda beberapa produk yang berbeda kali ini?”</p>
                                                <p>“Senang melayani Anda di sini lagi, [Nama Pelanggan]. Bagaimana saya bisa membantu Anda kali ini? Ingin melihat sesuatu yang baru?”</p>
                                                <p>"Selamat pagi! Selamat datang di Customer Service. Nama saya [Nama Agent]. Ada yang bisa saya bantu?"</p>
                                                <p>"Halo selamat datang! Anda terhubung ke [Nama Agent] di Customer Service. Bagaimana saya bisa membantu Anda?”</p>
                                                <p>“Senang bertemu denganmu lagi, [Nama Pelanggan]. Saya harap Anda baik-baik saja. Apakah Anda ingin saya menunjukkan kepada Anda beberapa produk yang berbeda kali ini?”</p>
                                                <p>“Senang melayani Anda di sini lagi, [Nama Pelanggan]. Bagaimana saya bisa membantu Anda kali ini? Ingin melihat sesuatu yang baru?”</p>
                                                <p>"Selamat pagi! Selamat datang di Customer Service. Nama saya [Nama Agent]. Ada yang bisa saya bantu?"</p>
                                                <p>"Halo selamat datang! Anda terhubung ke [Nama Agent] di Customer Service. Bagaimana saya bisa membantu Anda?”</p>
                                                <p>“Senang bertemu denganmu lagi, [Nama Pelanggan]. Saya harap Anda baik-baik saja. Apakah Anda ingin saya menunjukkan kepada Anda beberapa produk yang berbeda kali ini?”</p>
                                                <p>“Senang melayani Anda di sini lagi, [Nama Pelanggan]. Bagaimana saya bisa membantu Anda kali ini? Ingin melihat sesuatu yang baru?”</p>
                                                <p>"Selamat pagi! Selamat datang di Customer Service. Nama saya [Nama Agent]. Ada yang bisa saya bantu?"</p>
                                                <p>"Halo selamat datang! Anda terhubung ke [Nama Agent] di Customer Service. Bagaimana saya bisa membantu Anda?”</p>
                                                <p>“Senang bertemu denganmu lagi, [Nama Pelanggan]. Saya harap Anda baik-baik saja. Apakah Anda ingin saya menunjukkan kepada Anda beberapa produk yang berbeda kali ini?”</p>
                                                <p>“Senang melayani Anda di sini lagi, [Nama Pelanggan]. Bagaimana saya bisa membantu Anda kali ini? Ingin melihat sesuatu yang baru?”</p>--%>
                                                <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                    <div id="navpills-3" class="tab-pane">
                                        
                                        <div class="box-body box-profile">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Note <span class="text-danger">*</span></label>
                                                        <textarea rows="3" id="Tele_Notes" name="Tele_Notes" style="width: 100%;" placeholder="Note"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">

                                                <div class="col-md-4">
                                                    <label>State&nbsp;<span class="text-danger">*</span></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                                        </div>
                                                        <select id="Notes_EskalasiTicket" class="form-control" style="height: 33px;">
                                                            <option value="">Select</option>
                                                            <option value="Confirmed">Confirmed</option>
                                                            <option value="Not Confirmed">Not Confirmed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label>Reason Call&nbsp;<span class="text-danger">*</span></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                                        </div>
                                                        <select id="Notes_ComboStatus" class="form-control" style="height: 33px;">
                                                            <option value="">Select</option>
                                                            <option value="Answer">Answer</option>
                                                            <option value="Reject">Reject</option>
                                                            <option value="No Answer">No Answer</option>
                                                            <option value="Busy">Busy</option>
                                                            <option value="Wrong Number">Wrong Number</option>
                                                            <option value="Unregistered">Unregistered</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4" style="margin-top: 5px;">
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
                                            <%--  <div class="box-footer">                                               
                                            </div>--%>
                                            <hr />
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <a class="btn btn-rounded btn-danger btn-outline pull-left" onclick="CancelNotes()">
                                                            <i class="fa fa-trash"></i>&nbsp;Cancel
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <a class="btn btn-rounded btn-primary btn-outline pull-right" onclick="SimpanNotes()">
                                                            <i class="fa fa-save"></i>&nbsp;Submit
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <hr />
                                            <div class="tab-pane" id="Note_usertimeline" style="margin-top: -15px;">
                                                <div id="Note_Journey" class="timeline timeline-single-column timeline-single-full-column"></div>
                                                <span class="timeline-label" style="margin-left: 15px;">
                                                    <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-1" class="tab-pane">
                                        <div class="box-body box-profile">
                                            <div class="row" style="margin-left: -20px;">
                                                <div class="box-body form-element">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Nama Task <span class="text-danger">*</span></label>
                                                            <input class="form-control input-lg" type="text" placeholder="Nama Task" id="NamaTask">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Detail Task <span class="text-danger">*</span></label>
                                                        <textarea rows="3" id="Task_Detail" name="Task_Detail" style="width: 100%;" placeholder="Detail Task"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Langkah Selanjutnya <span class="text-danger">*</span></label>
                                                        <textarea rows="3" id="Langkah_Selanjutnya" name="Langkah_Selanjutnya" style="width: 100%;" placeholder="Langkah Selanjutnya"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <label>Kategori <span class="text-danger">*</span></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                                        </div>
                                                        <select id="ComboKategori" class="form-control" style="height: 33px;">
                                                            <option value="">Select</option>
                                                            <option value="Premium">Premium</option>
                                                            <option value="Silver">Silver</option>
                                                            <option value="Gold">Gold</option>
                                                        </select>
                                                    </div>
                                                    <%--<div class="box-body form-element">
                                                        <div class="form-group">
                                                            <label>Kategori <span class="text-danger">*</span></label>
                                                            <select id="ComboKategori" class="form-control" style="height: 33px;">
                                                                <option value="">Select</option>
                                                                <option value="1">Prioritas</option>
                                                                <option value="2">Non Prioritas</option>
                                                            </select>
                                                        </div>
                                                    </div>--%>
                                                </div>
                                                <div class="col-md-3">
                                                    <label>Status <span class="text-danger">*</span></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                                        </div>
                                                        <select id="ComboStatusNya" class="form-control" style="height: 33px;">
                                                            <option value="">Select</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Waiting">Waiting</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <label>Priority <span class="text-danger">*</span></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                                        </div>
                                                        <select id="ComboPriority" class="form-control" style="height: 33px;">
                                                            <option value="">Select</option>
                                                            <option value="Low">Low</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Hight">Hight</option>
                                                            <option value="Urgent">Urgent</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <label>Reminder <span class="text-danger">*</span></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fa fa-bars"></i></span>
                                                        </div>
                                                        <select id="ComboReminder" class="form-control" style="height: 33px;">
                                                            <option value="">Select</option>
                                                            <option value="The Day Of">The Day Of</option>
                                                            <option value="The Day Before">The Day Before</option>
                                                            <option value="The Week Before">The Week Before</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <label>Due Date <span class="text-danger">*</span></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                                                        </div>
                                                        <input class="form-control" id="DueDate_Task" type="date">
                                                    </div>
                                                </div>
                                                <div class="col-md-3" style="margin-top: 5px;">
                                                    <div id="results"></div>
                                                    <label for="file_default"></label>
                                                    <label for="file_name"><b></b></label>
                                                    <div class="tb-height-b60 tb-height-lg-b60"></div>
                                                    <section class="hk-sec-wrapper">
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <div class="custom-file">
                                                                    <input type="file" name="filesnya" class="custom-file-input" id="filesnyaTask" />
                                                                    <label class="custom-file-label" for="customFile">Choose file</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <br />
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <a class="btn btn-rounded btn-danger btn-outline pull-left" onclick="CancelTask()">
                                                            <i class="fa fa-trash"></i>&nbsp;Cancel
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <a class="btn btn-rounded btn-primary btn-outline pull-right" onclick="SimpanTask()">
                                                            <i class="fa fa-save"></i>&nbsp;Submit
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <hr />
                                            <div class="tab-pane" id="Task_usertimeline" style="margin-top: -15px;">
                                                <div id="Task_Journey" class="timeline timeline-single-column timeline-single-full-column"></div>
                                                <span class="timeline-label" style="margin-left: 15px;">
                                                    <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-2" class="tab-pane">
                                        <br />
                                        <a href="#" onclick="AddProduk();" style="display: none;"><span class="badge badge-pill badge-default float-right" style="font-weight: bold; font-size: 14px;">+ Tambah Produk</span></a>
                                        <br />
                                        <br />
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
                                    <div id="navpills-7" class="tab-pane">
                                        <br />
                                        <iframe src="https://uidesk.id/Asterisk/index.php" style="width: 1100px; height: 600px;"></iframe>
                                    </div>
                                    <%-- <div id="navpills-3" class="tab-pane">
                                        <table id="TrxHistoryOutbound" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                            <thead>
                                                <tr>
                                                    <th>call_id</th>
                                                    <th style="width: 250px;">product_campaign</th>
                                                    <th>call_reason</th>
                                                    <th>call_status</th>
                                                    <th style="width: 100px;">call_agent</th>
                                                    <th style="width: 160px;">call_date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>--%>
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
                                    <div id="navpills-5" class="tab-pane">
                                    </div>
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
        <div class="modal modal-left fade" id="modal-customer" tabindex="-1" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Form Data Nasabah</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="height:500px;overflow:scroll;overflow-x:hidden;overflow-y:scroll;">
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Nama *" id="UpdateNama">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Email" id="UpdateEmail">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Telepon" id="UpdateTelpon">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <select id="UpdateComboGender" class="form-control" style="height: 33px;">
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
                                        <input class="form-control input-lg" type="text" placeholder="Job Tittle" id="UpdateJobTittle">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Alamat" id="UpdateAlamat">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Kota" id="UpdateKota">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Provinsi" id="UpdateProvinsi">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Wilayah" id="UpdateWilayah" value="Indonesia Bagian Barat">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Negara" id="UpdateNegara">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="box-body form-element">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="form-control input-lg" type="text" placeholder="Zip Code" id="UpdateZipCode">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-uniform">
                        <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdateProduk()" id="UpdateNasabah">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        //var Outbound_Address = CKEDITOR.replace('Outbound_Address');
        //Outbound_Address.config.height = 150;
        //Outbound_Address.config.toolbar = 'Basic';
        //Outbound_Address.config.toolbar_Basic =
        //    [
        //        ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
        //    ];
        var Task_Detail = CKEDITOR.replace('Task_Detail');
        Task_Detail.config.height = 170;
        Task_Detail.config.toolbar = 'Basic';
        Task_Detail.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
        var Langkah_Selanjutnya = CKEDITOR.replace('Langkah_Selanjutnya');
        Langkah_Selanjutnya.config.height = 170;
        Langkah_Selanjutnya.config.toolbar = 'Basic';
        Langkah_Selanjutnya.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];

        var Tele_Notes = CKEDITOR.replace('Tele_Notes');
        Tele_Notes.config.height = 250;
        Tele_Notes.config.toolbar = 'Basic';
        Tele_Notes.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
