<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Syn_CronisePhase2.aspx.vb" Inherits="ICC.Syn_CronisePhase2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Syn_CronisePhase2.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Syncronize Ticket & Thread Agent</h4>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="timeline-event timeline-event-primary">
                                    <table class="table table-striped table-hover" id="TableTransaksi">
                                        <thead>
                                            <tr>
                                                <th style="width:150px;">UserName</th>
                                                <th style="width:200px;">Nama</th>
                                                <th style="width:150px;">Group Agent</th>
                                                <th style="width:150px;">Site</th>
                                                <th style="width:100px;">Status Ticket</th>
                                                <th style="width:100px;">Jumlah Ticket</th>
                                                 <th style="width:100px;">Status Thread</th>
                                                <th style="width:110px;">Jumlah Thread</th>
                                                <th style="width:50px;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer" id="ReleaseFooter">
                        <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                        <input id="btnGetAgent" class="btn btn-rounded btn-primary float-right" style="width: 100px" value="Get Data" onclick="GetAgent()" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
