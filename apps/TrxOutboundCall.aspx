<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxOutboundCall.aspx.vb" Inherits="ICC.TrxOutboundCall" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrxOutboundCall.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxCustomerID" runat="server" />
    <asp:HiddenField ID="TrxUploadID" runat="server" />
    <asp:HiddenField ID="TrxPolisNumber" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-md-3 col-lg-3">
                <div class="box">
                    <div class="box-body box-profile">
                        <h4 class="box-title text-info"><i class="ti-user mr-15"></i>Personal Information</h4>
                        <hr />
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Nama Pemegang Polis </label>
                                    <input class="form-control input-lg" type="text" placeholder="Nama Pemegang Polis" id="Outbound_Fullname" name="Outbound_Fullname" title="Nama Pemegang Polis">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Jenis Kelamin PemPol</label>
                                    <div class="c-inputs-stacked">
                                        <input name="Gender" type="radio" id="GenderPria_Outbound" value="Pria">
                                        <label for="GenderPria_Outbound" class="block">Pria</label>
                                        <input name="Gender" type="radio" id="GenderWanita_Outbound" value="Wanita">
                                        <label for="GenderWanita_Outbound" class="block">Wanita</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Nomor Polis</label>
                                    <input class="form-control input-lg" type="text" placeholder="Polis Number" id="Outbound_PolisNumber" name="Outbound_PolisNumber" title="Polis Number">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Product</label>
                                    <input class="form-control input-lg" type="text" placeholder="Nama Product" id="Outbound_NamaProduct" name="Outbound_NamaProduct" title="Nama Product">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Nama Tertanggung</label>
                                    <input type="text" class="form-control" id="Outbound_NamaTertanggung" placeholder="Nama Tertanggung" title="Nama Tertanggung" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>No. Handphone</label>
                                    <input class="form-control input-lg" type="text" placeholder="Nomor HP Pemegang Polis" id="Outbound_PhoneNumber" name="Outbound_PhoneNumber" title="Nomor HP Pemegang Polis">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Alamat Email</label>
                                    <input class="form-control input-lg" type="text" placeholder="Alamat Email Pemegang Polis" id="Outbound_Email" name="Outbound_Email" title="Alamat Email Pemegang Polis">
                                </div>
                            </div>
                        </div>
                        <%--<div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" class="form-control" placeholder="Date of Birth" id="Outbound_DateofBirth" name="Outbound_DateofBirth" title="Date of Birth">
                                </div>
                            </div>
                        </div>--%>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Kategori Nasabah</label>
                                    <select id="CmbTypeNasabah" class="form-control" style="height: 33px;">
                                        <option value="1">Prioritas</option>
                                        <option value="2">Non Prioritas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <%-- <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Address</label>
                                    <textarea id="Outbound_Address" name="Outbound_Address" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>--%>
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
                                    <li class="nav-item"><a href="#navpills-1" class="nav-link active" data-toggle="tab" aria-expanded="true" onclick="ActionNoteOutbound()">Note Outbound</a> </li>
                                    <li class="nav-item"><a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionReminderOutbound()">Note Reminder</a> </li>
                                    <li class="nav-item"><a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionHistoryOutbound()">History Outbound</a> </li>
                                    <li class="nav-item"><a href="#navpills-4" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="ActionHelpdeskTransaction()">History Ticketing</a> </li>
                                </ul>
                            </div>
                        </div>
                        <div class="box">
                            <div class="box-body">
                                <div class="tab-content">
                                    <div id="navpills-1" class="tab-pane active">
                                        <div class="box-body box-profile">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Uang Pertanggungan</label>
                                                        <input class="form-control input-lg" type="text" id="Outbound_UangPertanggungan" placeholder="Uang Pertanggungan" title="Uang Pertanggungan">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Tanggal Pendebetan</label>
                                                        <input class="form-control input-lg" type="text" id="Outbound_TglPendebetan" placeholder="Tanggal Pendebetan" title="Tanggal Pendebetan">
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Cara Bayar</label>
                                                        <input type="text" class="form-control" id="Outbound_CaraBayar" placeholder="Cara Bayar" title="Cara Bayar" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                  <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Premi Dasar Berkala</label>
                                                        <input type="text" class="form-control" id="Outbound_PremiDasarBerkala" placeholder="Premi Dasar Berkala" title="Premi Dasar Berkala" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Premi Top Up Berkala</label>
                                                        <input type="text" class="form-control" id="Outbound_PremiTopUp" placeholder="Premi Top Up" title="Premi Top Up" />
                                                    </div>
                                                </div>                                             
                                              <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Nama Tenaga Penjualan</label>
                                                        <input type="text" class="form-control" id="Outbound_NamaTenagaPenjualan" placeholder="Nama Tenaga Penjualan (BFA/FA)" title="Nama Tenaga Penjualan (BFA/FA)" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Nomor Rekening</label>
                                                        <input type="text" class="form-control" id="Outbound_BiayaAkuisisi1" placeholder="Biaya Akuisisi (Tahun ke-1)" title="Biaya Akuisisi (Tahun ke-1)" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Virtual Account</label>
                                                        <input type="text" class="form-control" id="Outbound_BiayaAkuisisi2" placeholder="Biaya Akuisisi (Tahun ke-2)" title="Biaya Akuisisi (Tahun ke-2)" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Tgl. Kirim E-Polis</label>
                                                        <input type="date" class="form-control" id="Outbound_NominalCOI" placeholder="Nominal COI" title="Nominal COI" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Tgl. Transaksi</label>
                                                        <input type="date" class="form-control" id="Outbound_NominalCOR" placeholder="Nominal COR" title="Nominal COR" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Biaya Akuisisi 1</label>
                                                        <input type="text" class="form-control" id="Outbound_BiayaAkuisisi1add" placeholder="Biaya Akuisisi 1 (Tahun ke-1)" title="Biaya Akuisisi 1 (Tahun ke-1)" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Biaya Akuisisi 2</label>
                                                        <input type="text" class="form-control" id="Outbound_BiayaAkuisisi2add" placeholder="Biaya Akuisisi 2 (Tahun ke-2)" title="Biaya Akuisisi 2 (Tahun ke-2)" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Biaya Akuisisi 3</label>
                                                        <input type="text" class="form-control" id="Outbound_BiayaAkuisisi3add" placeholder="Biaya Akuisisi 3 (Tahun ke-3)" title="Biaya Akuisisi 2 (Tahun ke-2)" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Biaya Akuisisi 4</label>
                                                        <input type="text" class="form-control" id="Outbound_BiayaAkuisisi4add" placeholder="Biaya Akuisisi 4 (Tahun ke-4)" title="Biaya Akuisisi 4 (Tahun ke-4)" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Biaya Akuisisi 5</label>
                                                        <input type="text" class="form-control" id="Outbound_BiayaAkuisisi5add" placeholder="Biaya Akuisisi 5 (Tahun ke-5)" title="Biaya Akuisisi 5 (Tahun ke-5)" />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr style="margin-top: 0px;" />
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="nav-tabs-custom box-profile">
                                                        <ul class="nav nav-tabs">
                                                            <li><a class="active" href="#TabWaris" data-toggle="tab">Nama Ahli Waris</a></li>
                                                            <li><a href="#TabRider" data-toggle="tab" class="" onclick="ActionRider()">Data Manfaat</a></li>
                                                            <li><a href="#TabFund" data-toggle="tab" class="" onclick="ActionFund()">Jenis Darlink</a></li>
                                                        </ul>
                                                        <div class="tab-content">
                                                            <div class="tab-pane active" id="TabWaris">
                                                                <table id="TrmWaris" class="table b-1 border-primary" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                                                    <thead class="bg-primary">
                                                                        <tr>
                                                                            <th style="width: 150px;">Nama Ahli Waris</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div class="tab-pane" id="TabRider">
                                                                <table id="TrmRider" class="table b-1 border-primary" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                                                    <thead class="bg-primary">
                                                                        <tr>
                                                                            <th style="width: 150px;">Manfaat</th>
                                                                            <th style="width: 150px;">Nominal</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div class="tab-pane" id="TabFund">
                                                                <table id="TrmFund" class="table b-1 border-primary" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                                                    <thead class="bg-primary">
                                                                        <tr>
                                                                            <th style="width: 150px;">Jenis Investasi</th>
                                                                            <th style="width: 150px;">Persentase Alokasi</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <!-- /.tab-pane -->
                                                        </div>
                                                        <!-- /.tab-content -->
                                                    </div>
                                                </div>
                                            </div>
                                            <hr style="margin-top: -10px;" />
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Reason Call</label>
                                                        <select id="Select_Outbound_Reason" class="form-control" style="height: 33px;">
                                                            <option>Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Call Status</label>
                                                        <select id="Select_Outbound_Status" class="form-control" style="height: 33px;" onchange="get_OutboundStatus('1')">
                                                            <option>Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Escalation To Ticket</label>
                                                        <select id="Select_Outbound_Ticaket" class="form-control" style="height: 33px;">
                                                            <option value="">Select</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <textarea rows="10" id="Outbound_Callnote" name="Outbound_Callnote" style="width: 100%;" placeholder="Description"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-footer">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <a class="btn btn-rounded btn-danger btn-outline pull-left" id="btnCancelOutbound" style="display:none;" onclick="post_WS_CancelOutboundCall()">
                                                            <i class="fa fa-trash"></i>&nbsp;Cancel
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <a class="btn btn-rounded btn-success btn-outline pull-right" id="btnSubmitOutbound" style="display:none;" onclick="post_WS_OutboundCall()">
                                                            <i class="fa fa-save"></i>&nbsp;Submit
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="usertimeline">
                                            <div class="box p-15">
                                                <div id="Journey_OutboundNote" class="timeline timeline-single-column timeline-single-full-column"></div>
                                                <span class="timeline-label" style="margin-left: 15px;">
                                                    <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-2" class="tab-pane">
                                        <div class="box-body box-profile">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Subject</label>
                                                        <input type="text" id="Reminder_Subject" class="form-control" placeholder="Subject Reminder">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Status</label>
                                                        <select id="Select_Reminder_Status" class="form-control" style="height: 33px;">
                                                            <option value="">Select</option>
                                                            <option value="Hight">Hight</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Low">Low</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Date</label>
                                                        <input class="form-control" id="Reminder_Date" type="date">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <textarea rows="10" id="Reminder_Description" name="Reminder_Description" style="width: 100%;" placeholder="Description Reminder"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-footer">
                                            <div class="row">
                                                <div class="col-md-9">
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <a class="btn btn-rounded btn-success btn-outline pull-right" onclick="post_WS_OutboundReminder()">
                                                            <i class="fa fa-save"></i>&nbsp;Submit
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="divReminder">
                                            <div class="box p-15">
                                                <div id="Journey_ReminderNote" class="timeline timeline-single-column timeline-single-full-column"></div>
                                                <span class="timeline-label" style="margin-left: 15px;">
                                                    <button class="btn btn-danger btn-rounded"><i class="fa fa-clock-o"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="navpills-3" class="tab-pane">
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
                                    </div>
                                    <div id="navpills-4" class="tab-pane">
                                        <table id="TrxHelpdeskTransaction" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                            <thead>
                                                <tr>
                                                    <th>Ticket Number</th>
                                                    <th style="width: 230px;">Category</th>
                                                    <th>Status</th>
                                                    <th>SLA</th>
                                                    <th style="width: 100px;">User Create</th>
                                                    <th style="width: 180px;">Date Create</th>
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
        var Reminder_Description = CKEDITOR.replace('Reminder_Description');
        Reminder_Description.config.height = 300;
        Reminder_Description.config.toolbar = 'Basic';
        Reminder_Description.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
        var Outbound_Callnote = CKEDITOR.replace('Outbound_Callnote');
        Outbound_Callnote.config.height = 300;
        Outbound_Callnote.config.toolbar = 'Basic';
        Outbound_Callnote.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
