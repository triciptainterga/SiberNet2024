$(document).ready(function () {
    TrmMenu();
    cmbMenuApplication();
});
function TrmMenu() {
    var myTable = $('#TrmMenu').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0003', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
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
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].SubMenuIDTree + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].SubMenuIDTree + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Param == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Yes</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>No</span>"
                }
                myTable.row.add([json[i].SubMenuIDTree, json[i].MenuName, json[i].SubMenuName, json[i].MenuTreeName, json[i].Url, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbMenuApplication() {
    var cmbMenu = $('#cmbMenu1');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultMenu1 = "";

            for (i = 0; i < json.length; i++) {
                resultMenu1 = '<option value="' + json[i].MenuID + '">' + json[i].MenuName + '</option>';
                cmbMenu.append(resultMenu1);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_CategoryType(value) {
    var selectedText = $("#cmbMenu1").find("option:selected").text();
    var selectedValue = $("#cmbMenu1").val();
    var cmbMenuLevel2 = $('#cmbMenu2');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK38'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultMenuLevel2 = "";

            cmbMenuLevel2.empty();
            cmbMenuLevel2.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultMenuLevel2 = '<option value="' + json[i].SubMenuID + '">' + json[i].SubMenuName + '</option>';
                cmbMenuLevel2.append(resultMenuLevel2);
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
    $('#cmbMenu1').attr('disabled', false);
    $('#cmbMenu2').attr('disabled', false);
    $('#TxtDetailMenu').attr('disabled', false);
    $('#cmbType').attr('disabled', false);
    $('#TxtUrl').attr('disabled', false);
    $('#cmbMenu1').val("");
    $('#cmbMenu2').val("");
    $('#TxtDetailMenu').val("");
    $('#cmbType').val("");
    $('#TxtUrl').val("");
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function showUpdate(TrxID) {
    $('#cmbMenu1').attr('disabled', true);
    $('#cmbMenu2').attr('disabled', true);
    $('#TxtDetailMenu').attr('disabled', false);
    $('#cmbType').attr('disabled', false);
    $('#TxtUrl').attr('disabled', false);
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
    $('#cmbMenu1').attr('disabled', true);
    $('#cmbMenu2').attr('disabled', true);
    $('#TxtDetailMenu').attr('disabled', true);
    $('#cmbType').attr('disabled', true);
    $('#TxtUrl').attr('disabled', true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    if ($("#cmbMenu1").val() == '') {
        swal("Menu is empty");
        return false
    }
    if ($("#cmbMenu2").val() == '') {
        swal("Sub Menu Name is empty");
        return false
    }
    if ($("#TxtDetailMenu").val() == '') {
        swal("Detail Menu is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtDetailMenu").val())) {
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
    if ($("#TxtUrl").val() == '') {
        swal("Url is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtUrl").val())) {
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxMenuName: $("#cmbMenu1").val(), TrxSubMenuName: $("#cmbMenu2").val(), TrxDetailMenuName: $("#TxtDetailMenu").val(), TrxUrl: $("#TxtUrl").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionDetailMenuApplication",
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
                                    $("#cmbMenu1").val("");
                                    $("#cmbMenu2").val("");
                                    $("#TxtDetailMenu").val("");
                                    $("#TxtUrl").val("");
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
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxDetailMenuName: $("#TxtDetailMenu").val(), TrxUrl: $("#TxtUrl").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionDetailMenuApplication",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#cmbMenu1").val("");
                                    $("#cmbMenu2").val("");
                                    $("#TxtDetailMenu").val("");
                                    $("#TxtUrl").val("");
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
                url: "WebServiceGetDataMaster.asmx/DeleteTransactionDetailMenuApplication",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: form_data,
                success: function () {

                    var json = JSON.parse(data.d);
                    var i = "";
                    for (i = 0; i < json.length; i++) {
                        if (json[i].Result == "True") {
                            swal(
                                '',
                                'Update Data Has Been Success',
                                'success'
                            ).then(function () {
                                $("#cmbMenu1").val("");
                                $("#cmbMenu2").val("");
                                $("#TxtDetailMenu").val("");
                                $("#TxtUrl").val("");
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
function TrmSelect(TrxSubMenuID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxSubMenuID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK39'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#cmbMenu1").val(json[i].MenuID);
                $("#cmbMenu2").find("option:selected").text(json[i].SubMenuName)
                $("#TxtDetailMenu").val(json[i].MenuTreeName);
                $("#cmbType").val(json[i].Param);
                $("#TxtUrl").val(json[i].Url);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
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