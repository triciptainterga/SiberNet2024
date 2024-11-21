$(document).ready(function () {
    TrmAgentSetting();
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            SearchingAgent($(this).val());
        } else if (jumlahString == 0) {
            SearchingAgent($(this).val(""));
        }
    });
});
function TrmAgentSetting() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK10'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].type == "1") {
                    var TypeCall = "Inbound Call"
                } else if (json[i].type == "2") {
                    var TypeCall = "Outbound Call"
                } else {
                    var TypeCall = "Inbound & Outbound Call"
                }
                if (json[i].EpicLogin == "1") {
                    var LoginStatus = "Login"
                    var LoginColor = "success"
                } else {
                    var LoginStatus = "Not Login"
                    var LoginColor = "danger"
                }
                if (json[i].GENDER == "Wanita") {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/7.jpg' alt='...'> "
                } else {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/2.jpg' alt='...'> "
                }
                if (json.length > 2) {
                    var columns = "2"
                } else {
                    var columns = "6"
                }
                resultUserNotification = '<div class="col-md-12 col-lg-' + columns +'">' +
                    '<div class="box box-default">' +
                    '<div class="media-right" style="margin-left:5px;margin-top:5px;margin-right:5px;">' +
                    '<span class="badge badge-' + LoginColor + ' badge-pill">' + LoginStatus + '</span>' +
                    '</div>' +
                    '<div class="fx-card-item">' +
                    '<div class="fx-card-avatar fx-overlay-1">' +
                    '' + JenisKelamin + '' +
                    '<div class="fx-overlay">' +
                    '<ul class="fx-info">' +
                    '<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="ButtonUpdate(' + json[i].pbxUser + ')"><i class="fa fa-pencil"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ButtonDelete(' + json[i].pbxUser + ');"><i class="fa fa-trash-o"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ButtonEpic(' + json[i].pbxUser + ');"><i class="fa fa-refresh"></i></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="fx-card-content">' +
                    '<h5 class="box-title">' + json[i].NAME + '</h5></br>' +
                    '<small>Extension : ' + json[i].pbxUser + '</small><br>' +
                    '<span class="badge badge-pill badge-primary badge-lg"><small>' + TypeCall + '</small></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SearchingAgent(AgentName) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + AgentName + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK13'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].type == "1") {
                    var TypeCall = "Inbound Call"
                } else if (json[i].type == "2") {
                    var TypeCall = "Outbound Call"
                } else {
                    var TypeCall = "Inbound & Outbound Call"
                }
                if (json[i].EpicLogin == "1") {
                    var Epic = "Login"
                } else {
                    var Epic = "Not Login"
                }
                if (json[i].GENDER == "Wanita") {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/7.jpg' alt='...'> "
                } else {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/2.jpg' alt='...'> "
                }
                if (json.length > 2) {
                    var columns = "2"
                } else {
                    var columns = "6"
                }
                resultUserNotification = '<div class="col-md-12 col-lg-' + columns +'">' +
                    '<div class="box box-default">' +
                    '<div class="fx-card-item">' +
                    '<div class="fx-card-avatar fx-overlay-1">' +
                    '' + JenisKelamin + '' +
                    '<div class="fx-overlay">' +
                    '<ul class="fx-info">' +
                    '<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="ButtonUpdate(' + json[i].pbxUser + ')"><i class="fa fa-pencil"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ButtonDelete(' + json[i].pbxUser + ');"><i class="fa fa-trash-o"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ButtonEpic(' + json[i].pbxUser + ');"><i class="fa fa-refresh"></i></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="fx-card-content">' +
                    '<h5 class="box-title">' + json[i].NAME + '</h5></br>' +
                    '<small>User ' + json[i].pbxUser + ' - Pin ' + json[i].pin + ' - Epic ' + Epic + '</small><br>' +
                    '<span class="badge badge-pill badge-primary badge-lg"><small>' + TypeCall + '</small></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function AgentSetting() {
    $("#cmbType").val("");
    $("#CmbAgent").val("");
    $("#EPIC_Password").val("");
    $("#EPIC_PABX_User").val("");
    $("#EPIC_PABX_Password").val("");
    $("#EPIC_PABX_Pin").val("");

    $("#modal-agent").modal('show')
    $("#Save").css("display", "block");
    $("#Update").css("display", "none");
}
function CmbAgent() {
    var CmbAgent = $('#CmbAgent');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK11'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbAgent.empty();
            CmbAgent.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                result = '<option value="' + json[i].USERNAME + '">' + json[i].USERNAME + ' - ' + json[i].NAME + '</option>';
                CmbAgent.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ButtonDelete(TrxID) {
    swal({
        title: "Do you want to delete login epic?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: TrxID, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrxAgentInbound.asmx/DeleteSettingAgentInbound",
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
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrxAgentInbound.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#modal-agent").modal('hide')
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
function ButtonUpdate(TrxID) {
    $("#Save").css("display", "none");
    $("#Update").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#modal-agent").modal('show');
    EpicSelected($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSave() {
    if ($("#cmbType").val() == "") {
        swal("Call Type is empty")
        return false;
    }
    if ($("#CmbAgent").val() == "") {
        swal("Agent is empty")
        return false;
    }
    if ($("#EPIC_PABX_User").val() == "") {
        swal("PABX User is empty")
        return false;
    } 

    checkingPBXuser($("#EPIC_PABX_User").val())

    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxID: "0", TrxCallType: $("#cmbType").val(), TrxUserName: $("#CmbAgent").val(), TrxUserCreated: $("#hd_sessionLogin").val(), TrxPABXUser: $("#EPIC_PABX_User").val(),
                    TrxPABXPassword: $("#EPIC_PABX_Password").val(), TrxPABXPin: $("#EPIC_PABX_Pin").val(), TrxAction: "Insert"
                });
                $.ajax({
                    url: "asmx/TrxAgentInbound.asmx/InsertSettingAgentInbound",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal("Input Data User Agent Call Success");
                                //$("#modal-agent").modal('hide');
                                window.location.href = "TrxAgentInbound.aspx"
                            } else {
                                swal("PBX User Already exits");
                                $("#modal-agent").modal('hide');
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
function ActionUpdate() {
    if ($("#CmbAgent").val() == "") {
        swal("Agent is empty")
        return false;
    }
    if ($("#EPIC_PABX_User").val() == "") {
        swal("PABX User is empty")
        return false;
    }
    //else {
    //    var regex = /^[^0-9*\\\^\/<>_#']+$/;
    //    if (regex.test($("#EPIC_PABX_User").val())) {
    //    } else {
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    //if ($("#EPIC_PABX_Password").val() == "") {
    //    swal("PABX Password is empty")
    //    return false;
    //}
    //if ($("#EPIC_PABX_Pin").val() == "") {
    //    swal("PABX PIN is empty")
    //    return false;
    //}
    //else {
    //    var regex = /^[^0-9*\\\^\/<>_#']+$/;
    //    if (regex.test($("#EPIC_PABX_Pin").val())) {
    //    } else {
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxCallType: $("#cmbType").val(), TrxUserName: $("#CmbAgent").val(), TrxUserCreated: $("#hd_sessionLogin").val(), TrxPABXUser: $("#EPIC_PABX_User").val(),
                    TrxPABXPassword: $("#EPIC_PABX_Password").val(), TrxPABXPin: $("#EPIC_PABX_Pin").val(), TrxAction: "Update"
                });
                $.ajax({
                    url: "asmx/TrxAgentInbound.asmx/InsertSettingAgentInbound",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                $("#modal-agent").modal('show')
                                swal("Done", {
                                    icon: "success",
                                });
                                window.location.href = "TrxAgentInbound.aspx"
                            } else {
                                alert(json[i].NamaNya);
                                $("#modal-agent").modal('hide');
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
function EpicSelected(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK12'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#cmbType').val(json[i].type);
                $("#CmbAgent").find("option:selected").text(json[i].username);
                $('#CmbAgent').attr("disabled", true);
                $('#EPIC_PABX_User').val(json[i].pbxUser);
                $('#EPIC_Password').val(json[i].password);
                $('#EPIC_PABX_Password').val(json[i].pbxPassword);
                $('#EPIC_PABX_Pin').val(json[i].pin);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Get_TypeAgent() {
    $('#CmbAgent').attr("disabled", false);
    var selectedText = $("#cmbType").find("option:selected").text();
    var selectedValue = $("#cmbType").val();
    var CmbAgent = $('#CmbAgent');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbAgent.empty();
            CmbAgent.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                result = '<option value="' + json[i].USERNAME + '">' + json[i].USERNAME + ' - ' + json[i].NAME + '</option>';
                CmbAgent.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Get_CmbAgent() {
    var selectedText = $("#CmbAgent").find("option:selected").text();
    var selectedValue = $("#CmbAgent").val();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {
                $("#EPIC_Password").val(json[i].PASSWORD)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function checkingPBXuser(pbxUserValue) {
    $.ajax({
        type: "POST",
        url: "asmx/TrxAgentInbound.asmx/CheckAgentCall",
        data: "{pbxUser:'" + pbxUserValue + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].result == "1") {
                    swal("PABX User already exits")
                    return false;
                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ButtonEpic(TrxID) {
    swal({
        title: "Do you want to release login epic?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ pbxUser: TrxID, release_by: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrxAgentInbound.asmx/ReleaseEpic",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Release Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrxAgentInbound.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Release Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrxAgentInbound.aspx"
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