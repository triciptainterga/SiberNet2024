$(document).ready(function () {
    HeaderCampaign();
});
function HeaderCampaign() {
    $.ajax({
        type: "POST",
        url: "asmx/Campaign.asmx/DataTable",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK26'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultHeaderCampaign = "";

            $('#div_HeaderCampaign').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].CampaignImage == "" || json[i].CampaignImage == null ) {
                    var ImageNya = "../images/card/1.jpg"
                } else {
                    var ImageNya = json[i].CampaignImage
                }
                ResultHeaderCampaign = '<div class="col-md-12 col-lg-3">' +
                    '<div class="box box-default" style="margin-left:15px;margin-right:65px;">' +
                    '<div class="fx-card-item">' +
                    '<div class="fx-card-avatar fx-overlay-1">' +
                    '<img src=' + ImageNya + '>' +
                    '<div class="fx-overlay">' +
                    '<ul class="fx-info">' +
                    '<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="ActionTambahHeader(' + json[i].ID + ')"><i class="fa fa-plus"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ActionUpdateModul(' + json[i].ID + ');"><i class="fa fa-pencil"></i></a></li>' +
                    //'<li><a class="btn default btn-outline" href="#" onclick="ButtonDelete(' + json[i].ID + ');"><i class="fa fa-trash-o"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ActionPreviewModul(' + json[i].ID + ');"><i class="fa fa-eye"></i></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="fx-card-content">' +
                    '<h4 class="box-title">' + json[i].CampaignName + '</h4>' +
                    '<small>' + json[i].CampaignDescription + '</small><br>' +
                    //'<span class="badge badge-pill badge-primary badge-lg"><small>Max Handle ' + json[i].maxhandle + ' - Now Handle ' + json[i].nowhandle + '</small></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#div_HeaderCampaign').append(ResultHeaderCampaign)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionTambahModul(ValueID) {
    HeaderCleansing();
    $("#modal-modul").modal('show')
    $("#SimpanModul").show();
    $("#DeleteModul").hide();
    $("#UpdateModul").hide();
}
function ActionUpdateModul(ValueID) {
    $("#modal-modul").modal('show')
    $("#SimpanModul").hide();
    $("#DeleteModul").hide();
    $("#UpdateModul").show();
    $("#ContentPlaceHolder1_TrxID").val(ValueID)
    $.ajax({
        type: "POST",
        url: "asmx/Campaign.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK80'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                $("#ModulName").val(json[i].CampaignName)
                CKEDITOR.instances.ModulDescription.setData(json[i].CampaignDescription)
                $("#ModulChannel").val(json[i].Channel)
                $("#ComboStatusModul").val(json[i].StatusActive)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionPreviewModul(ValueID) {
    $("#modal-header").modal('show')
    $("#SimpanModul").hide();
    $("#DeleteModul").hide();
    $("#UpdateModul").hide();
}
function ButtonSimpanModul() {
    if ($("#ModulName").val() == "") {
        swal(
            '',
            'Name Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ModulDescription = CKEDITOR.instances.ModulDescription.getData();
    if (ModulDescription == "") {
        swal(
            '',
            'Description Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ModulChannel").val() == "") {
        swal(
            '',
            'Channel Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusModul").val() == "" || $("#ComboStatusModul").val() == null) {
        swal(
            '',
            'Status Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        ID: "0", Name: $("#ModulName").val(),
        Description: ModulDescription, Channel: $("#ModulChannel").val(), Status: $("#ComboStatusModul").val(),
        UserName: $("#hd_sessionLogin").val(), Action: "INSERT"
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Campaign.asmx/ActionModul",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Modul Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Campaign.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Modul Has Been Failed',
                                    'error'
                                ).then(function () {
                                });
                            }

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function ButtonUpdateModul() {
    if ($("#ModulName").val() == "") {
        swal(
            '',
            'Name Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ModulDescription = CKEDITOR.instances.ModulDescription.getData();
    if (ModulDescription == "") {
        swal(
            '',
            'Description Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ModulChannel").val() == "") {
        swal(
            '',
            'Channel Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusModul").val() == "" || $("#ComboStatusModul").val() == null) {
        swal(
            '',
            'Status Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        ID: $("#ContentPlaceHolder1_TrxID").val(), Name: $("#ModulName").val(),
        Description: ModulDescription, Channel: $("#ModulChannel").val(), Status: $("#ComboStatusModul").val(),
        UserName: $("#hd_sessionLogin").val(), Action: "UPDATE"
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Campaign.asmx/ActionModul",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Modul Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Campaign.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Modul Has Been Failed',
                                    'error'
                                ).then(function () {
                                });
                            }

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function ButtonDeleteModul() {
    if ($("#ModulName").val() == "") {
        swal(
            '',
            'Name Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ModulDescription = CKEDITOR.instances.ModulDescription.getData();
    if (ModulDescription == "") {
        swal(
            '',
            'Description Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ModulChannel").val() == "") {
        swal(
            '',
            'Channel Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusModul").val() == "" || $("#ComboStatusModul").val() == null) {
        swal(
            '',
            'Status Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        ID: $("#ContentPlaceHolder1_TrxID").val(), Name: $("#ModulName").val(),
        Description: ModulDescription, Channel: $("#ModulChannel").val(), Status: $("#ComboStatusModul").val(),
        UserName: $("#hd_sessionLogin").val(), Action: "DELETE"
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Campaign.asmx/ActionModul",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Modul Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Campaign.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Modul Has Been Failed',
                                    'error'
                                ).then(function () {
                                });
                            }

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function ActionTambahHeader(ValueID) {
    $("#modal-header").modal('show')
    $("#ContentPlaceHolder1_TrxID").val(ValueID)
}
function ButtonSimpanHeader() {
    if ($("#CampaignName").val() == "") {
        swal(
            '',
            'Name Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var CampaignDescription = CKEDITOR.instances.CampaignDescription.getData();
    if (CampaignDescription == "") {
        swal(
            '',
            'Description Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatus").val() == "" || $("#ComboStatus").val() == null) {
        swal(
            '',
            'Status Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        ID: "0", HeaderID: $("#ContentPlaceHolder1_TrxID").val(), Name: $("#CampaignName").val(),
        Description: CampaignDescription, Status: $("#ComboStatus").val(),
        UserName: $("#hd_sessionLogin").val(), Action: "INSERT"
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Campaign.asmx/ActionCampaign",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Campaign Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Campaign.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Campaign Has Been Failed',
                                    'error'
                                ).then(function () {
                                });
                            }

                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function HeaderCleansing() {
    $("#ModulName").val("")
    CKEDITOR.instances.ModulDescription.setData("")
    $("#ModulChannel").val("")
    $("#ComboStatusModul").val("")
}
