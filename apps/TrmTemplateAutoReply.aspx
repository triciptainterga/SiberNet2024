<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmTemplateAutoReply.aspx.vb" Inherits="ICC.TrmTemplateAutoReply" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmTemplateAutoReply.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Template Auto Reply Email&nbsp;<i class="fa fa-plus" onclick="NewTransaction()" style="cursor: pointer;"></i></h4>
                        <center>
                            <div class="spin2" id="LoaderPage"></div>
                        </center>
                    </div>
                    <div class="box-body">
                        <table id="TrmCategory" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                            <thead>
                                <tr>
                                    <th style="width: 50px;">ID</th>
                                    <th>Template Auto Reply</th>
                                    <th style="width: 150px;">Account Email</th>
                                    <th style="width: 150px;">Status</th>
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
    <div class="modal modal-center fade" id="ModalTransaction" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px; margin-left: -300px;">
                <div class="modal-header">
                    <h5 class="modal-title">Form Template Auto Reply Email</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Template Auto Reply (Maksimal 7000 Character) <span class="text-danger">*</span></label>
                                <textarea id="TemplateAutoReply" name="TemplateAutoReply" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Account Email</label>
                                <select name="select" id="CmbAccount" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Status</label>
                                <select name="select" id="cmbStatus" class="form-control" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="Y">Aktif</option>
                                    <option value="N">Non Aktif</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan()" id="Simpan">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var TemplateAutoReplyCHK = CKEDITOR.replace('TemplateAutoReply');
        TemplateAutoReplyCHK.config.height = 350;
        TemplateAutoReplyCHK.config.toolbar = 'Basic';
        TemplateAutoReplyCHK.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
