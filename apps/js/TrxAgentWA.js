$(document).ready(function () {
    TrmAgentWA();
    CmbAgentWA();
    LoadingComboNomorWhatsApp();
    $("#LoaderPage").hide();
});
function TrmAgentWA() {
    var myTable = $('#TrmAgentWA').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK34'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Status == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].UsernameUidesk, json[i].UsernameThirdParty, json[i].AccountNumber, TrxParam, newDate + ' ' + newTime, urlClick]).draw(false);
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
    $("#btnSimpan").css("display", "block")
    $("#btnUpdate").css("display", "none")
    $("#btnDelete").css("display", "none")
    $("#modal-agent").modal('show')
}
function showUpdate(TrxID) {
    $("#btnSimpan").css("display", "none")
    $("#btnUpdate").css("display", "block")
    $("#btnDelete").css("display", "none")
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#modal-agent").modal('show')
    DetailAccount($("#ContentPlaceHolder1_TrxID").val());
}
function showdDelete(TrxID) {
    $("#btnSimpan").css("display", "none")
    $("#btnUpdate").css("display", "none")
    $("#btnDelete").css("display", "block")
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#modal-agent").modal('show')
    DetailAccount($("#ContentPlaceHolder1_TrxID").val());
}
function ActionSimpan() {
    if ($("#CmbAgentWA").val() == "Select" || $("#CmbAgentWA").val() == "") {
        swal("Agent WhatsApp is empty")
        return false;
    }
    if ($("#UserName_Integration").val() == "") {
        swal("UserName Integration is empty")
        return false;
    }
    if ($("#CmbChannel").val() == "Select" || $("#CmbChannel").val() == "") {
        swal("Channel is empty")
        return false;
    }
    if ($("#ComboNomorTelepon").val() == "") {
        swal("Nomor Telepon WhatsApp is empty")
        return false;
    }
    if ($("#cmbStatus").val() == "Select" || $("#cmbStatus").val() == "") {
        swal("Status is empty")
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: "0", TrxUserCreate: $("#hd_sessionLogin").val(), TrxUserName: $("#CmbAgentWA").val(), TrxUserNameIntegration: $("#UserName_Integration").val(), TrxType: $("#CmbChannel").val(), TrxProduct: $("#ComboNomorTelepon").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Insert" });
                $.ajax({
                    url: "asmx/TrxAgentWA.asmx/InsertAgentAccountWhatsApp",
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
                                    'Transaction Successfully',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrxAgentWA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Transaction Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrxAgentWA.aspx";
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
function ActionUpdate() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserCreate: $("#hd_sessionLogin").val(), TrxUserName: $("#CmbAgentWA").val(), TrxUserNameIntegration: $("#UserName_Integration").val(), TrxType: $("#CmbChannel").val(), TrxProduct: $("#ComboNomorTelepon").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Update" });
                $.ajax({
                    url: "asmx/TrxAgentWA.asmx/InsertAgentAccountWhatsApp",
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
                                    'Transaction Successfully',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrxAgentWA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Transaction Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrxAgentWA.aspx";
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
function ActionDelete() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserCreate: $("#hd_sessionLogin").val(), TrxUserName: $("#CmbAgentWA").val(), TrxUserNameIntegration: $("#UserName_Integration").val(), TrxType: $("#CmbChannel").val(), TrxProduct: $("#ComboNomorTelepon").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Delete" });
                $.ajax({
                    url: "asmx/TrxAgentWA.asmx/InsertAgentAccountWhatsApp",
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
                                    'Transaction Successfully',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrxAgentWA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Transaction Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrxAgentWA.aspx";
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
function CmbAgentWA() {
    var CmbAgentWA = $('#CmbAgentWA');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'4', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                CmbAgentWA.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DetailAccount() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK34'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#UserName_Integration').val(json[i].UsernameThirdParty);
                $('#CmbChannel').val(json[i].FlagChannel);
                $("#ComboNomorTelepon option:selected").text(json[i].AccountNumber);
                $('#cmbStatus').val(json[i].Status);
                $('#CmbAgentWA').attr('disabled', true);

                var CmbAgentWA = $('#CmbAgentWA');
                $.ajax({
                    type: "POST",
                    url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
                    data: "{TrxID:'" + json[i].UsernameUidesk + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK35'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i, x, result = "";

                        for (i = 0; i < json.length; i++) {
                            result = '<option value="' + json[i].USERNAME + '" selected=true>' + json[i].NAME + '</option>';
                            CmbAgentWA.append(result);
                        }

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function LoadingComboNomorWhatsApp() {
    var ComboNomorTelepon = $('#ComboNomorTelepon');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK109'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultnya = "";

            ComboNomorTelepon.empty();
            ComboNomorTelepon.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultnya = '<option value="' + json[i].NomorWA + '">' + json[i].NomorWA + '</option>';
                ComboNomorTelepon.append(resultnya);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}