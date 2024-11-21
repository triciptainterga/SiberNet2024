<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="CampaignDetail.aspx.vb" Inherits="ICC.CampaignDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/CampaignDetail.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <section class="content">
        <br />
        <div class="row fx-element-overlay">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Campaign Header</h4>
                        <h6 class="card-subtitle">Add Campaign <i class="fa fa-plus" onclick="ActionTambahHeader()" style="cursor: pointer;"></i></h6>
                    </div>
                </div>
            </div>
            <div class="row" id="div_CampaignDetail"></div>
        </div>
    </section>
    <div class="modal modal-right fade" id="modal-header" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="overflow-y:scroll;">
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
                                <label>Modul <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <select id="ComboModul" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Campaign Name <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <input type="text" class="form-control" id="CampaignName" placeholder="Campaign Name">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Campaign Description </label>
                                <textarea rows="10" class="form-control" id="CampaignDescription" name="CampaignDescription"></textarea>
                            </div>
                        </div>
                    </div>                    
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Type Call <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <select id="ComboTypeCall" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="PDS">PDS</option>
                                        <option value="Preview">Preview</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Logic Data <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <select id="ComboLogic" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="1">By Due Date</option>
                                        <option value="2">By Call Time Pickup Rate</option>
                                        <option value="3">By Schedule</option>
                                    </select>
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
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ButtonSaveHeader()" id="SaveHeader">Save</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ButtonUpdateHeader()" id="UpdateHeader">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ButtonDeleteHeader()" id="DeleteHeader">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal center-modal fade" id="modal-script" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1000px; margin-left: -250px">
                <div class="modal-header">
                    <h5 class="modal-title">Form Campaign Script</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Name <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Name" id="NameScript">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Status <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-tasks"></i></span>
                                    </div>
                                    <select id="ComboStatusScript" class="form-control" style="height: 33px;">
                                        <option value="">Select</option>
                                        <option value="Yes">Aktif</option>
                                        <option value="No">No Aktif</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Campaign Script <span class="text-danger">*</span></label>
                                <textarea rows="8" class="form-control" id="Campaign_Script" name="Campaign_Script"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" id="SimpanScript" onclick="ButtonSimpanScript()">Simpan</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" id="UpdateScript" onclick="ButtonUpdateScript()">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" id="DeleteScript" onclick="ButtonDeleteScript()">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/ckeditor/ckeditor.js"></script>
    <script>
        var Campaign_Script = CKEDITOR.replace('Campaign_Script');
        Campaign_Script.config.height = 350;
        Campaign_Script.config.toolbar = 'Basic';
        Campaign_Script.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
        var CampaignDescription = CKEDITOR.replace('CampaignDescription');
        CampaignDescription.config.height = 220;
        CampaignDescription.config.toolbar = 'Basic';
        CampaignDescription.config.toolbar_Basic =
            [
                ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
            ];
    </script>
</asp:Content>
