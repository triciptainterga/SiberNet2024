<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="ProfileAPI.aspx.vb" Inherits="ICC.ProfileAPI" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/ProfileAPI.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="box">
            <div class="box-header with-border">
                <h4 class="box-title">API Data Profile Customer&nbsp;<i class="fa fa-cogs" onclick="showAdd()" style="cursor: pointer;"></i></h4>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Pilih Filter</label>
                            <select class="form-control" style="height: 33px;" id="ComboFilter" onchange="OnChange_Profile(1);">
                                <option value="">Select</option>
                                <option value="1">NIK</option>
                                <option value="2">Nomor Polis</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Value</label>
                            <input type="text" class="form-control" id="API_FilterValue" placeholder="Filter Value" title="Filter Value" disabled/>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <br />
                            <button type="button" id="Button_ProfileAPI" class="btn btn-rounded btn-primary btn-outline pull-right" onclick="Get_ProfileAPI()">
                                <i class="ti-save-alt"></i>&nbsp;Get Profile API                                              
                            </button>
                        </div>
                    </div>
                   <%-- <div class="col-md-2">
                        <div class="form-group">
                            <br />
                            <button type="button" id="Button_ProfileAPI2" class="btn btn-rounded btn-primary btn-outline pull-right" onclick="xx()">
                                <i class="ti-save-alt"></i>&nbsp;Get Profile API  2                                             
                            </button>
                        </div>
                    </div>--%>
                </div>
                <hr />
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" class="form-control" id="API_FullName" placeholder="Full Name" title="Full Name" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="text" class="form-control" id="API_EmailAddress" placeholder="Email Address" title="Email Address" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="text" class="form-control" id="API_PhoneNumber" placeholder="Phone Number" title="PhoneNumber" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Date Of Birth</label>
                            <input type="text" class="form-control" id="API_DateOfBirth" placeholder="Date Of Birth" title="Date Of Birth" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Gender</label>
                            <input type="text" class="form-control" id="API_GenderTest" placeholder="Gender" title="Gender" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" class="form-control" id="API_Address" placeholder=" Address" title="Address" />
                        </div>
                    </div>
                </div>
                <hr id="HR_ListNomorPolis"/>
                <div class="row" id="Div_ListNomorPolis">
                    <div class="col-md-12">
                        <table id="TrmPolisNumber" class="table b-1 border-primary" style="width: 100%;">
                            <thead class="bg-primary">
                                <tr>
                                    <th style="width: 30px;">#</th>
                                    <th style="width: 300px;">Nomor Polis</th>
                                    <th style="width: 300px;">Nomor SPAJ</th>
                                    <th style="width: 300px;">Nama Pemegang Polis</th>
                                    <th style="width: 300px;">Product</th>
                                </tr>
                            </thead>
                            <tbody>
                                <%--    <tr>
                                    <td>
                                        <a href="javascript:void(0)" style="cursor: pointer;" class="text-primary" data-toggle="tooltip" data-original-title="Delete"><i class="ti-arrow-right" aria-hidden="true"></i></a>
                                    </td>
                                    <td>81234567
                                    </td>
                                    <td>IB12345678
                                    </td>
                                    <td>John Doe
                                    </td>
                                    <td>Davestera
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="javascript:void(0)" style="cursor: pointer;" class="text-primary" data-toggle="tooltip" data-original-title="Delete"><i class="ti-arrow-right" aria-hidden="true"></i></a>
                                    </td>
                                    <td>71234567
                                    </td>
                                    <td>John Doe
                                    </td>
                                    <td>BRINGIN Purnadana
                                    </td>
                                    <td>IB12345679
                                    </td>
                                </tr>--%>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Nama Pemegang Polis</label>
                            <input type="text" class="form-control" id="API_Nama" placeholder="Nama Pemegang Polis" title="Nama Pemegang Polis" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Status Polis</label>
                            <input type="text" class="form-control" id="API_StatusPolis" placeholder="Status Polis" title="Status Polis" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Premi Dasar</label>
                            <input type="text" class="form-control" id="API_PremiDasar" placeholder="Premi Dasar" title="Premi Dasar" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Flagging Nasabah</label>
                            <input type="text" class="form-control" id="API_FlaggingNasabah" placeholder="Flagging Nasabah" title="Flagging Nasabah" />
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Jenis Kelamin Pemegang Polis</label>
                            <input type="text" class="form-control" id="API_Gender" placeholder="Nama Pemegang Polis" title="Nama Pemegang Polis" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Uang Pertanggungan</label>
                            <input type="text" class="form-control" id="API_UangPertanggungan" placeholder="Uang Pertanggungan" title="Uang Pertanggungan" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Premi Top Up</label>
                            <input type="text" class="form-control" id="API_PremiDasarTopup" placeholder="Premi Top Up" title="Premi Top Up" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Nomor HP Pemegang Polis</label>
                            <input type="text" class="form-control" id="API_NomorHPPemegangPolis" placeholder="Nomor HP Pemegang Polis" title="Nomor HP Pemegang Polis" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Tgl. Lahir Pemegang Polis</label>
                            <input type="text" class="form-control" id="API_DOB" placeholder="Tgl. Lahir Pemegang Polis" title="Tgl. Lahir Pemegang Polis" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Tgl. Mulai Polis</label>
                            <input type="text" class="form-control" id="API_TglMulaiPolis" placeholder="Tgl. Mulai Polis" title="Tgl. Mulai Polis" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Masa Bayar</label>
                            <input type="text" class="form-control" id="API_MasaBayar" placeholder="Masa Bayar" title="Masa Bayar" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Email Pemegang Polis</label>
                            <input type="text" class="form-control" id="API_EmailPemegangPolis" placeholder="Email Pemegang Polis" title="Email Pemegang Polis" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>NIK Pemegang Polis</label>
                            <input type="text" class="form-control" id="API_NIK" placeholder="NIK Pemegang Polis" title="NIK Pemegang Polis" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Tgl. Berakhir Polis</label>
                            <input type="text" class="form-control" id="API_TglBerakhirPolis" placeholder="Tgl. Berakhir Polis" title="Tgl. Berakhir Polis" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Cara Bayar</label>
                            <input type="text" class="form-control" id="API_CaraBayar" placeholder="Cara Bayar" title="Cara Bayar" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Alamat Identitas Pemegang Polis</label>
                            <input type="text" class="form-control" id="API_AlamatIdentitasPemegangPolis" placeholder="Alamat Identitas Pemegang Polis" title="Alamat Identitas Pemegang Polis" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Nama Gadis Ibu Kandung</label>
                            <input type="text" class="form-control" id="API_IbuKandung" placeholder="Nama Gadis Ibu Kandung" title="Nama Gadis Ibu Kandung" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Tgl. Kirim E-Polis</label>
                            <input type="text" class="form-control" id="API_TglKirimEPolis" placeholder="Tgl. Kirim E-Polis" title="Tgl. Kirim E-Polis" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Jenis Pembayaran</label>
                            <input type="text" class="form-control" id="API_JenisPembayaran" placeholder="Jenis Pembayaran" title="Jenis Pembayaran" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Core System</label>
                            <input type="text" class="form-control" id="API_Core" placeholder="Core System" title="Core System" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Nama Tertanggung</label>
                            <input type="text" class="form-control" id="API_NamaTertanggung" placeholder="Nama Tertanggung" title="Nama Tertanggung" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Masa Asuransi</label>
                            <input type="text" class="form-control" id="API_MasaAsuransi" placeholder="Masa Asuransi" title="Masa Asuransi" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Nomor Rekening</label>
                            <input type="text" class="form-control" id="API_NomorRekening" placeholder="Nomor Rekening" title="Nomor Rekening" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Accounts MyAccess</label>
                            <input type="text" class="form-control" id="API_AccountsMyAccess" placeholder="Accounts MyAccess" title="Accounts MyAccess" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Tgl. Lahir Tertanggung</label>
                            <input type="text" class="form-control" id="API_TglLahirTertanggung" placeholder="Tgl. Lahir Tertanggung" title="Tgl. Lahir Tertanggung" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Nomor Virtual Account</label>
                            <input type="text" class="form-control" id="API_NomorVirtualAccount" placeholder="Nomor Virtual Account" title="Nomor Virtual Account" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Nama Bank</label>
                            <input type="text" class="form-control" id="API_NamaBank" placeholder="Nama Bank" title="Nama Bank" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Jenis Kelamin Tertanggung</label>
                            <input type="text" class="form-control" id="API_JenisKelaminTertanggung" placeholder="Jenis Kelamin Tertanggung" title="Jenis Kelamin Tertanggung" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Nama Tenaga Penjualan</label>
                            <input type="text" class="form-control" id="API_NamaTenagaPenjualan" placeholder="Nama Tenaga Penjualan" title="Nama Tenaga Penjualan" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Nama Pemilik Rekening</label>
                            <input type="text" class="form-control" id="API_NamaPemilikRekening" placeholder="Nama Pemilik Rekening" title="Nama Pemilik Rekening" />
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-md-12">
                        <div class="nav-tabs-custom box-profile">
                            <ul class="nav nav-tabs">
                                <li><a class="active" href="#TabWaris" data-toggle="tab"><i class="fa fa fa-group" aria-hidden="true"></i>&nbsp;Nama Ahli Waris</a></li>
                                <li><a href="#TabManfaat" data-toggle="tab" class=""><i class="fa fa-handshake-o" aria-hidden="true"></i>&nbsp;Manfaat Asuransi</a></li>
                                <li><a href="#TabDarlink" data-toggle="tab" class=""><i class="fa fa-institution" aria-hidden="true"></i>&nbsp;Alokasi Darlink</a></li>
                                <li><a href="#TabTunai" data-toggle="tab" class=""><i class="fa fa-money" aria-hidden="true"></i>&nbsp;Nilai Tunai</a></li>
                                <li><a href="#TabPremi" data-toggle="tab" class=""><i class="fa fa-history" aria-hidden="true"></i>&nbsp;History Premi</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="TabWaris">
                                    <table id="TrmWaris" class="table b-1 border-primary" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                        <thead class="bg-primary">
                                            <tr>
                                                <th style="width: 150px;">Nama Ahli Waris</th>
                                                <th style="width: 150px;">Persentase</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane" id="TabManfaat">
                                    <table id="TrmManfaat" class="table b-1 border-primary" style="width: 100%; overflow-x: scroll; overflow: scroll;">
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
                                <div class="tab-pane" id="TabDarlink">
                                    <table id="TrmDarlink" class="table b-1 border-primary" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                        <thead class="bg-primary">
                                            <tr>
                                                <th style="width: 200px;">Alokasi Investasi/Darlink</th>
                                                <th style="width: 100px;">Persentase Alokasi</th>
                                                <th style="width: 100px;">Saldo Unit</th>
                                                <th style="width: 100px;">Nilai NAB</th>
                                                <th style="width: 100px;">Saldo Rupiah</th>
                                                <th style="width: 100px;">Tgl. NAB</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                     <%--                       <tr>
                                                <td>Darlink Stabil</td>
                                                <td>50</td>
                                                <td>1000</td>
                                                <td>2500</td>
                                                <td>2500000</td>
                                                <td>3/6/2022</td>
                                            </tr>
                                            <tr>
                                                <td>Darlink Agresif</td>
                                                <td>50</td>
                                                <td>1200</td>
                                                <td>1300</td>
                                                <td>1560000</td>
                                                <td>3/6/2022</td>
                                            </tr>--%>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane" id="TabTunai">
                                    <table id="TrmTunai" class="table b-1 border-primary" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                        <thead class="bg-primary">
                                            <tr>
                                                <th style="width: 50px;">Tahun Ke</th>
                                                <th style="width: 150px;">Nilai Tunai</th>
                                            </tr>
                                        </thead>
                                        <tbody>
<%--                                            <tr>
                                                <td>1</td>
                                                <td>2000000</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>4000000</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>6000000</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>8000000</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>10000000</td>
                                            </tr>--%>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane" id="TabPremi">
                                    <table id="TrmPremi" class="table b-1 border-primary" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                        <thead class="bg-primary">
                                            <tr>
                                                <th style="width: 150px;">Kuitansi Ke</th>
                                                <th style="width: 150px;">Tgl. Jatuh Tempo</th>
                                                <th style="width: 150px;">Tgl. Pembayaran Premi</th>
                                                <th style="width: 150px;">Nominal Premi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
       <%--                                     <tr>
                                                <td>1</td>
                                                <td>1/11/2022</td>
                                                <td>1/15/2022</td>
                                                <td>2000000</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>2/11/2022</td>
                                                <td>2/14/2022</td>
                                                <td>2000000</td>
                                            </tr>--%>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.tab-pane -->
                            </div>
                            <!-- /.tab-content -->
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top: -30px;">
                    <div class="col-md-12">
                        <button type="button" id="API_BTNRefresh" class="btn btn-rounded btn-danger btn-outline pull-left" onclick="SubmitInstanNote()">
                            <i class="ti-reload"></i>&nbsp;Refresh                                                  
                        </button>
                        <button type="button" id="API_BTNSynronise" class="btn btn-rounded btn-primary btn-outline pull-right" onclick="SubmitInstanNote()">
                            <i class="ti-save-alt"></i>&nbsp;Syn Data                                                  
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
