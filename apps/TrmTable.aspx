<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmTable.aspx.vb" Inherits="ICC.TrmTable" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmTable.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box box-default">
                        <div class="box-body">
                            <center>
                                <div class="spinner-border text-warning" id="LoaderPageCounting"></div>
                            </center>
                            <div class="table-responsive">
                                <table id="TrmOutboundHeader" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th style="width: 200px;">name</th>
                                            <th>polis_number</th>
                                            <th>email_address</th>
                                            <th>phone_number</th>
                                            <th>status_call</th>
                                            <th>agent_id</th>
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
    </section>
</asp:Content>
