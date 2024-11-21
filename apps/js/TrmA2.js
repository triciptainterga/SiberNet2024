$(document).ready(function () {
    TrmMenu();
    cmbMenuApplication();
});
function TrmMenu() {
    var myTable = $('#TrmMenu').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0002', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
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
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].SubMenuID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].SubMenuID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Param == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Yes</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>No</span>"
                }
                myTable.row.add([json[i].SubMenuID, json[i].MenuName, json[i].SubMenuName, json[i].Url, TrxParam, urlClick]).draw(false);
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
    var cmbMenu = $('#cmbMenu');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK36'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultMenu = "";

            for (i = 0; i < json.length; i++) {
                resultMenu = '<option value="' + json[i].MenuID + '">' + json[i].MenuName + '</option>';
                cmbMenu.append(resultMenu);
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
    if ($("#cmbMenu").val() == '3026') {
        $("#cmbChannel").css("display", "block");
        $("#TxtSubMenuName").css("display", "none");
    } else {
        $("#TxtSubMenuName").css("display", "block");
        $("#cmbChannel").css("display", "none");
    }
    var selectedText = $("#cmbMenu").find("option:selected").text();
    var selectedValue = $("#cmbMenu").val();
    var cmbChannel = $('#cmbChannel');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK32'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultChannel = "";

            cmbChannel.empty();
            cmbChannel.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultChannel = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
                cmbChannel.append(resultChannel);
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
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
    $('#cmbMenu').attr('disabled', false);
    $('#cmbMenu').val("");
    $('#TxtSubMenuName').val("");
    $('#cmbType').val("");
    $('#TxtUrl').val("");
}
function showUpdate(TrxID) {
    $('#cmbMenu').attr('disabled', true);
    $('#TxtSubMenuName').attr('disabled', false);
    $('#cmbType').attr('disabled', false);
    $('#TxtUrl').attr('disabled', false);
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#cmbChannel").css("display", "none");
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function showdDelete(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $('#cmbMenu').attr('disabled', true);
    $('#TxtSubMenuName').attr('disabled', true);
    $('#cmbType').attr('disabled', true);
    $('#TxtUrl').attr('disabled', true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    if ($("#cmbMenu").val() == '') {
        swal("Menu is empty");
        return false
    }
    if ($("#cmbMenu").val() == "3026") {
        if ($("#cmbChannel").val() == '') {
            swal("Sub Menu Name is empty");
            return false
        } else {
            var TrxSubName = $("#cmbChannel").val()
        }
    } else {
        if ($("#TxtSubMenuName").val() == '') {
            swal("Sub Menu Name is empty");
            return false
        } else {
            var TrxSubName = $("#TxtSubMenuName").val()
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
                var form_data = JSON.stringify({ TrxMenuName: $("#cmbMenu").val(), TrxSubMenuName: TrxSubName, TrxUrl: $("#TxtUrl").val(), TrxType: $("#cmbType").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionSubMenuApplication",
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
                                    $("#cmbMenu").val("");
                                    $("#TxtUrl").val("");
                                    $("#TxtSubMenuName").val("");
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
            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxSubMenuName: $("#TxtSubMenuName").val(), TrxUrl: $("#TxtUrl").val(), TrxType: $("#cmbType").val() });
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/UpdateTransactionSubMenuApplication",
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
                                $("#cmbMenu").val("");
                                $("#TxtUrl").val("");
                                $("#TxtSubMenuName").val("");
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
                url: "WebServiceGetDataMaster.asmx/DeleteTransactionSubMenuApplication",
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
                                $("#cmbMenu").val("");
                                $("#TxtUrl").val("");
                                $("#TxtSubMenuName").val("");
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
function TrmSelect(TrxSubMenuID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxSubMenuID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK37'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#cmbMenu").val(json[i].MenuID);
                $("#TxtUrl").val(json[i].Url);
                $("#TxtSubMenuName").val(json[i].SubMenuName);
                $("#cmbType").val(json[i].Param);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}