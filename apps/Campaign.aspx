<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Campaign.aspx.vb" Inherits="ICC.Campaign" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/Campaign.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <br />
        <div class="row fx-element-overlay">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Modul Outbound Call</h4>
                        <h6 class="card-subtitle">Add Modul <i class="fa fa-plus" onclick="ActionTambahModul()" style="cursor: pointer;"></i></h6>
                    </div>
                </div>
            </div>
            <div class="row" id="div_HeaderCampaign"></div>

        </div>
    </section>
    <div class="modal modal-right fade" id="modal-header" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Campaign Header</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Name <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Name" id="CampaignName">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Description </label>
                                <textarea rows="10" class="form-control" id="CampaignDescription" name="CampaignDescription"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Status <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
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
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ButtonSimpanHeader()">Simpan</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-right fade" id="modal-modul" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Modul</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Name <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Name" id="ModulName">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Description </label>
                                <textarea rows="8" class="form-control" id="ModulDescription" name="ModulDescription"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Channel <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Channel" id="ModulChannel">
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
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <select id="ComboStatusModul" class="form-control" style="height: 33px;">
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
                    <button type="button" class="btn btn-rounded btn-primary float-right" id="SimpanModul" onclick="ButtonSimpanModul()">Simpan</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" id="UpdateModul" onclick="ButtonUpdateModul()">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" id="DeleteModul" onclick="ButtonDeleteModul()">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var CampaignDescription = CKEDITOR.replace('CampaignDescription');
        CampaignDescription.config.height = 250;
        CampaignDescription.config.toolbar = 'Basic';
        CampaignDescription.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
        var ModulDescription = CKEDITOR.replace('ModulDescription');
        ModulDescription.config.height = 250;
        ModulDescription.config.toolbar = 'Basic';
        ModulDescription.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
