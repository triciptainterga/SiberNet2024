$(document).ready(function () {
    DetailCampaign();
    DisplayComboModul();
});
function DetailCampaign() {
    $.ajax({
        type: "POST",
        url: "asmx/CampaignDetail.asmx/DataTable",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK26'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultCampaignDetail = "";

            $('#div_CampaignDetail').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].HeaderID == "1") {
                    //var ImageNya = "../images/gallery/creative/img-10.jpg"
                    var ImageNya = "../images/card/img1.jpg"
                } else if (json[i].HeaderID == "14") {
                    var ImageNya = "../images/card/img3.jpg"
                } else if (json[i].HeaderID == "16") {
                    var ImageNya = "../images/card/img4.jpg"
                }
                ResultCampaignDetail = '<div class="col-md-12 col-lg-2">' +
                    //'<div class="box ribbon-box">'+
                    //'<div class="ribbon-two ribbon-two-primary"><span>CEO</span></div>'+
                    '<div class="box box-default" style="margin-left:15px;margin-right:65px;">' +
                    '<div class="fx-card-item">' +
                    '<div class="fx-card-avatar fx-overlay-1">' +
                    '<img src="' + ImageNya +'">' +
                    '<div class="fx-overlay">' +
                    '<ul class="fx-info">' +
                    //'<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="ActionTambah(' + json[i].ID + ')"><i class="fa fa-plus"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ActionUpdateHeader(' + json[i].ID + ');"><i class="fa fa-pencil"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ActionDeleteHeader(' + json[i].ID + ');"><i class="fa fa-trash-o"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ActionPreviewHeader(' + json[i].ID + ');"><i class="fa fa-eye"></i></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="fx-card-content">' +
                    '<h4 class="box-title">' + json[i].DetailName + '</h4>' +
                    '<small>' + json[i].DetailDescription + '</small><br><br>' +
                    '<span class="badge badge-pill badge-primary badge-lg"><small><a href="#" style="color:white;" onclick="AddScript(' + json[i].ID + ')">Add Script</a> | <a href="#" style="color:white;" onclick="AddQuestion(' + json[i].ID + ')">Add Question</a></small></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    //'</div>' +
                    '</div>'
                $('#div_CampaignDetail').append(ResultCampaignDetail)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionTambahHeader() {
    HeaderCleansing()
    $('#ComboModul').attr("disabled", false);
    $("#modal-header").modal('show')
    $("#SaveHeader").show();
    $("#DeleteHeader").hide();
    $("#UpdateHeader").hide();
}
function ActionUpdateHeader(ValueID) {
    $("#modal-header").modal('show')
    $("#SaveHeader").hide();
    $("#UpdateHeader").show();
    $("#DeleteHeader").hide();

    $("#ContentPlaceHolder1_TrxID").val(ValueID)
    $.ajax({
        type: "POST",
        url: "asmx/CampaignDetail.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK78'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                $('#ComboModul').attr("disabled", true);
                $("#ComboModul").val(json[i].HeaderID)
                $("#CampaignName").val(json[i].DetailName)
                CKEDITOR.instances.CampaignDescription.setData(json[i].DetailDescription)
                $("#ComboTypeCall").val(json[i].TypeCall)
                $("#ComboLogic").val(json[i].LogicData)
                $("#ComboStatus").val(json[i].Status)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionDeleteHeader(ValueID) {
    $("#modal-header").modal('show')
    $("#SaveHeader").hide();
    $("#UpdateHeader").hide();
    $("#DeleteHeader").show();

    $("#ContentPlaceHolder1_TrxID").val(ValueID)
    $.ajax({
        type: "POST",
        url: "asmx/CampaignDetail.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK78'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                $('#ComboModul').attr("disabled", true);
                $("#ComboModul").val(json[i].HeaderID)
                $("#CampaignName").val(json[i].DetailName)
                CKEDITOR.instances.CampaignDescription.setData(json[i].DetailDescription)
                $("#ComboTypeCall").val(json[i].TypeCall)
                $("#ComboLogic").val(json[i].LogicData)
                $("#ComboStatus").val(json[i].Status)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionPreviewHeader(ValueID) {
    $("#modal-header").modal('show')
    $("#SaveHeader").hide();
    $("#UpdateHeader").hide();
    $("#DeleteHeader").hide();
    $("#ContentPlaceHolder1_TrxID").val(ValueID)
    $.ajax({
        type: "POST",
        url: "asmx/CampaignDetail.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK78'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                $('#ComboModul').attr("disabled", true);
                $("#ComboModul").val(json[i].HeaderID)
                $("#CampaignName").val(json[i].DetailName)
                CKEDITOR.instances.CampaignDescription.setData(json[i].DetailDescription)
                $("#ComboTypeCall").val(json[i].TypeCall)
                $("#ComboLogic").val(json[i].LogicData)
                $("#ComboStatus").val(json[i].Status)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DisplayComboModul() {
    var ComboModul = $('#ComboModul');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK80'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            ComboModul.empty()
            for (i = 0; i < json.length; i++) {
                result = '<option value="' + json[i].ID + '">' + json[i].CampaignName + '</option>';
                ComboModul.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ButtonSaveHeader() {
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
    if ($("#ComboTypeCall").val() == "" || $("#ComboTypeCall").val() == null) {
        swal(
            '',
            'Type Call Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboLogic").val() == "" || $("#ComboLogic").val() == null) {
        swal(
            '',
            'Logic Data Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        ID: "0", HeaderID: $("#ComboModul").val(), Name: $("#CampaignName").val(),
        Description: CampaignDescription, Status: $("#ComboStatus").val(), TypeCall: $("#ComboTypeCall").val(), LogicData: $("#ComboLogic").val(),
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
                    url: "asmx/CampaignDetail.asmx/ActionCampaign",
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
                                    location.href = "CampaignDetail.aspx";
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
function ButtonUpdateHeader() {
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
        ID: $("#ContentPlaceHolder1_TrxID").val(), HeaderID: $("#ComboModul").val(), Name: $("#CampaignName").val(),
        Description: CampaignDescription, Status: $("#ComboStatus").val(), TypeCall: $("#ComboTypeCall").val(), LogicData: $("#ComboLogic").val(),
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
                    url: "asmx/CampaignDetail.asmx/ActionCampaign",
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
                                    'Update Campaign Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "CampaignDetail.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Campaign Has Been Failed',
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
function ButtonDeleteHeader() {
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
        ID: $("#ContentPlaceHolder1_TrxID").val(), HeaderID: $("#ComboModul").val(), Name: $("#CampaignName").val(),
        Description: CampaignDescription, Status: $("#ComboStatus").val(), TypeCall: $("#ComboTypeCall").val(), LogicData: $("#ComboLogic").val(),
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
                    url: "asmx/CampaignDetail.asmx/ActionCampaign",
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
                                    'Delete Campaign Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "CampaignDetail.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Campaign Has Been Failed',
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
    $("#CampaignName").val("")
    CKEDITOR.instances.CampaignDescription.setData("")
    $("#ComboStatus").val("")
}

function AddScript(ValueID) {
    $("#modal-script").modal('show') 
    $("#ContentPlaceHolder1_TrxID").val(ValueID)
    $.ajax({
        type: "POST",
        url: "asmx/CampaignDetail.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK81'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            if (json.length != "") {
                for (i = 0; i < json.length; i++) {
                    $("#NameScript").val(json[i].CampaignScript)
                    $("#ComboStatusScript").val(json[i].StatusActive)
                    CKEDITOR.instances.Campaign_Script.setData(json[i].CampaignDescription)
                    $("#SimpanScript").hide();
                    $("#UpdateScript").show();
                    $("#DeleteScript").hide();
                }
            } else {
                ScriptCleansing();
                $("#SimpanScript").show();
                $("#UpdateScript").hide();
                $("#DeleteScript").hide();
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ButtonSimpanScript() {  
    if ($("#NameScript").val() == "") {
        swal(
            '',
            'Name Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var CampaignScript = CKEDITOR.instances.Campaign_Script.getData();
    if (CampaignScript == "") {
        swal(
            '',
            'Campaign Script Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusScript").val() == "" || $("#ComboStatusScript").val() == null) {
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
        ID: "0", DetailID: $("#ContentPlaceHolder1_TrxID").val(), Name: $("#NameScript").val(),
        CampaignScript: CampaignScript, Status: $("#ComboStatusScript").val(),
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
                    url: "asmx/CampaignDetail.asmx/ActionScript",
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
                                    'Insert Script Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "CampaignDetail.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Script Has Been Failed',
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
function ScriptCleansing() {
    $("#NameScript").val("")
    CKEDITOR.instances.Campaign_Script.setData("")
    $("#ComboStatusScript").val("")
}