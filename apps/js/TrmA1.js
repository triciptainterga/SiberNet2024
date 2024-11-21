$(document).ready(function () {
    TrmMenu();
});
function TrmMenu() {
    var myTable = $('#TrmMenu').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].MenuID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].MenuID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Activity == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Yes</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>No</span>"
                }
                myTable.row.add([json[i].MenuID, json[i].MenuName, json[i].Url, json[i].Number, json[i].Icon, TrxParam, urlClick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function showAdd() {
    $('#TxtName').attr('disabled', false);
    $('#TxtUrl').attr('disabled', false);
    $('#TxtNumber').attr('disabled', false);
    $('#TxtIcon').attr('disabled', false);
    $('#cmbType').attr('disabled', false);
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function showUpdate(TrxID) {
    $('#TxtName').attr('disabled', false);
    $('#TxtUrl').attr('disabled', false);
    $('#TxtNumber').attr('disabled', false);
    $('#TxtIcon').attr('disabled', false);
    $('#cmbType').attr('disabled', false);
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function showdDelete(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $('#TxtName').attr('disabled', true);
    $('#TxtUrl').attr('disabled', true);
    $('#TxtNumber').attr('disabled', true);
    $('#TxtIcon').attr('disabled', true);
    $('#cmbType').attr('disabled', true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    if ($("#TxtName").val() == '') {
        swal("Name is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtName").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#TxtNumber").val() == '') {
        swal("Number is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtNumber").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#TxtIcon").val() == '') {
        swal("Icon is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtIcon").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#cmbType").val() == '') {
        swal("Type is empty");
        return false
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxName: $("#TxtName").val(), TrxUrl: $("#TxtUrl").val(), TrxNumber: $("#TxtNumber").val(), TrxIcon: $("#TxtIcon").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionMenuApplication",
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
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#TxtName").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtNumber").val("");
                                    $("#TxtIcon").val("");
                                    $("#cmbType").val("");
                                    $("#ModalChannel").modal('hide');
                                    TrmMenu();
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    TrmMenu();
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
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxName: $("#TxtName").val(), TrxUrl: $("#TxtUrl").val(), TrxNumber: $("#TxtNumber").val(), TrxIcon: $("#TxtIcon").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionMenuApplication",
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
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#TxtName").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtNumber").val("");
                                    $("#TxtIcon").val("");
                                    $("#cmbType").val("");
                                    $("#ModalChannel").modal('hide');
                                    TrmMenu();
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    TrmMenu();
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
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxName: $("#TxtName").val(), TrxUrl: $("#TxtUrl").val(), TrxNumber: $("#TxtNumber").val(), TrxIcon: $("#TxtIcon").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionMenuApplication",
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
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#TxtName").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtNumber").val("");
                                    $("#TxtIcon").val("");
                                    $("#cmbType").val("");
                                    $("#ModalChannel").modal('hide');
                                    TrmMenu();
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    TrmMenu();
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
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/DeleteTransactionMenuApplication",
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
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#TxtName").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtNumber").val("");
                                    $("#TxtIcon").val("");
                                    $("#cmbType").val("");
                                    $("#ModalChannel").modal('hide');
                                    TrmMenu();
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    TrmMenu();
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
function AutoValidasiSuccess(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: 'success',
        hideAfter: 3500,
        stack: 6
    });
}
function TrmSelect(TrxMenuID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxMenuID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#TxtName").val(json[i].MenuName);
                $("#TxtUrl").val(json[i].Url);
                $("#TxtNumber").val(json[i].Number);
                $("#TxtIcon").val(json[i].Icon);
                $("#cmbType").val(json[i].Activity);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}