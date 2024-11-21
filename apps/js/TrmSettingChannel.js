$(document).ready(function () {
    MasterCombo()
    TrmSettingChannel();
    $("#LoaderPage").hide();
});
function TrmSettingChannel() {
    var myTable = $('#TrmSettingChannel').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK45'}",
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
                    "<a class='dropdown-item' href='#' onclick=Update('" + json[i].ID + "')><i class='fa fa-pencil text-primary'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=Delete('" + json[i].ID + "')><i class='fa fa-trash-o text-danger'></i> Delete</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Status == "YES") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].UserName, json[i].SubMenuName, json[i].DetailMenuName, json[i].Url, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Add() {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function ActionSimpan() {
    if ($("#Cmb_UserName").val() == '') {
        swal("UserName is empty");
        return false
    }
    if ($("#Cmb_Menu").val() == '') {
        swal("Menu is empty");
        return false
    }
    if ($("#Cmb_SubMenu").val() == '') {
        swal("Sub Menu is empty");
        return false
    }
    if ($("#Cmb_DetailMenu").val() == '') {
        swal("Detail Menu is empty");
        return false
    }
    var TrxURL = $("#Txt_Url").val();
    if (TrxURL == '') {
        swal("URL is empty");
        return false;
    }
    //else {
    //    var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
    //    if (regex.test(TrxURL)) {
    //    } else {
    //        console.log(TrxURL)
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
    if ($("#cmbStatus").val() == '') {
        swal("Status is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxID: "0", TrxUserName: $("#Cmb_UserName").val(), TrxMenu: $("#Cmb_Menu").val(), TrxSubMenu: $("#Cmb_SubMenu").val(), TrxDetailMenu: $("#Cmb_DetailMenu").val(),
        TrxUrl: $("#Txt_Url").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "INSERT"
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
                    url: "asmx/TrmSettingChannel.asmx/UIDESK_TrxSettingChannelAgent",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been save',
                                    'success'
                                ).then(function () {
                                    window.location = "TrmSettingChannel.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been failed !',
                                    'error'
                                ).then(function () {
                                    window.location = "TrmSettingChannel.aspx";
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
function Update(UpdateID) {
    $("#ContentPlaceHolder1_TrxID").val(UpdateID);
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
}
function ActionUpdate() {
    if ($("#Cmb_UserName").val() == '') {
        swal("UserName is empty");
        return false
    }
    if ($("#Cmb_Menu").val() == '') {
        swal("Menu is empty");
        return false
    }
    if ($("#Cmb_SubMenu").val() == '') {
        swal("Sub Menu is empty");
        return false
    }
    if ($("#Cmb_DetailMenu").val() == '') {
        swal("Detail Menu is empty");
        return false
    }
    if ($("#cmbStatus").val() == '') {
        swal("Status is empty");
        return false
    }
    var TrxURL = $("#Txt_Url").val()
    if (TrxURL == '') {
        swal("URL is empty");
        return false
    }
    //else {
    //    var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
    //    if (regex.test(TrxURL)) {
    //        $("#Txt_Url").val("");
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
    var form_data = JSON.stringify({
        TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxMenu: $("#Cmb_Menu").val(), TrxSubMenu: $("#Cmb_SubMenu").val(), TrxDetailMenu: $("#Cmb_DetailMenu").val(),
        TrxUrl: $("#Txt_Url").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "UPDATE"
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
                    url: "asmx/TrmSettingChannel.asmx/UIDESK_TrxSettingChannelAgent",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been update',
                                    'success'
                                ).then(function () {
                                    window.location = "TrmSettingChannel.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been failed !',
                                    'error'
                                ).then(function () {
                                    window.location = "TrmSettingChannel.aspx";
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
function Delete(DeleteID) {
    $("#ContentPlaceHolder1_TrxID").val(DeleteID);
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
}
function ActionDelete() {
    var form_data = JSON.stringify({
        TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxMenu: $("#Cmb_Menu").val(), TrxSubMenu: $("#Cmb_SubMenu").val(), TrxDetailMenu: $("#Cmb_DetailMenu").val(),
        TrxUrl: $("#Txt_Url").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "DELETE"
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
                    url: "asmx/TrmSettingChannel.asmx/UIDESK_TrxSettingChannelAgent",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been delete',
                                    'success'
                                ).then(function () {
                                    window.location = "TrmSettingChannel.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been failed !',
                                    'error'
                                ).then(function () {
                                    window.location = "TrmSettingChannel.aspx";
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
function MasterCombo() {
    var Cmb_UserName = $('#Cmb_UserName');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'5', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultAgent = "";

            for (i = 0; i < json.length; i++) {

                ResultAgent = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                Cmb_UserName.append(ResultAgent);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var Cmb_Menu = $('#Cmb_Menu');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK70'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].MenuID + '">' + json[i].MenuName + '</option>';
                Cmb_Menu.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var Cmb_SubMenu = $('#Cmb_SubMenu');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK03'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].SubMenuID + '">' + json[i].SubMenuName + '</option>';
                Cmb_SubMenu.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var Cmb_DetailMenu = $('#Cmb_DetailMenu');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK04'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].SubMenuIDTree + '">' + json[i].MenuTreeName + '</option>';
                Cmb_DetailMenu.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}