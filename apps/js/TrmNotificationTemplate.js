$(document).ready(function () {
    TrmNotificationTemplate();
    //cmbType();
});
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function TrmNotificationTemplate() {
    var JenisKondisi = "AllWhereData";
    var NamaTable = "UIDESK_NotificationTemplate";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: "WHERE TYPE <> 'TICKET_ESKALASI_VENDOR'" });
    var myTable = $('#TrmNotificationTemplate').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DATECREATE);
                var milisegundos = parseInt(json[i].DATECREATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].STATUS == "YES") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].SUBJECT, json[i].BODY, json[i].CATEGORY, json[i].TYPE, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbTypeOnchange(value) {
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();

    var JenisKondisi = "AllWhereData";
    var NamaView = "UIDESK_NotificationSetting";
    var cmbType = $('#cmbType');
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: "WHERE CATEGORY='" + selectedValue + "'" });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultType = "";

            cmbType.empty();
            cmbType.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultType = '<option value="' + json[i].TYPE + '">' + json[i].TYPE + '</option>';
                cmbType.append(resultType);

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
    $('#cmbType').attr("disabled", false);
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#cmbCategory").attr("disabled", true);
    $('#cmbType').attr("disabled", true);
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function showdDelete(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $("#TrxSubject").attr("disabled", true);
    $("#TrxBody").attr("disabled", true);
    $("#cmbCategory").attr("disabled", true);
    $('#cmbType').attr("disabled", true);
    $("#cmbStatus").attr("disabled", true);
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    if ($("#TrxSubject").val() == '') {
        swal("Subject is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TrxSubject").val())) {
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
    var TrxBody = CKEDITOR.instances.TrxBody.getData();
    if (TrxBody == '') {
        swal("Body is empty");
        return false
    } else {
        var regex = /^[^0-9*\\\^\/<>_#']+$/;
        if (regex.test(TrxBody)) {
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
    if ($("#cmbCategory").val() == '') {
        swal("Category is empty");
        return false
    }
    if ($("#cmbType").val() == '') {
        swal("Type is empty");
        return false
    }
    if ($("#cmbStatus").val() == '') {
        swal("Status is empty");
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
                var form_data = JSON.stringify({
                    TrxUserName: $("#hd_sessionLogin").val(), TrxSubject: encodeData($("#TrxSubject").val()),
                    TrxBody: encodeData(TrxBody), TrxFooter: encodeData($("#cmbCategory").val()), TrxType: $("#cmbType").val(), TrxStatus: $("#cmbStatus").val()
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertNotificationTemplate",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        var TrxMessage = 'Your <b>' + $("#TrxSubject").val() + '</b> has been save'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                        $("#TrxSubject").val("");
                        CKEDITOR.instances.TrxBody.setData("");
                        $("#cmbCategory").val("");
                        $("#cmbType").val("");
                        $("#cmbStatus").val("");
                        $("#ModalChannel").modal('hide');
                        TrmNotificationTemplate();
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
    var TrxBody = CKEDITOR.instances.TrxBody.getData();
    if (TrxBody == '') {
        swal("Body is empty")
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
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxSubject: encodeData($("#TrxSubject").val()),
                    TrxBody: encodeData(TrxBody), TrxFooter: encodeData($("#cmbCategory").val()), TrxType: $("#cmbType").val(), TrxStatus: $("#cmbStatus").val()
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateNotificationTemplate",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        var TrxMessage = 'Your <b>' + $("#TrxSubject").val() + '</b> has been update'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                        $("#TrxSubject").val("");
                        CKEDITOR.instances.TrxBody.setData("");
                        $("#cmbCategory").val("");
                        $("#cmbType").val("");
                        $("#cmbStatus").val("");
                        $("#ModalChannel").modal('hide');
                        TrmNotificationTemplate();
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });
                swal("Done", {
                    icon: "success",
                });
                $("#ModalChannel").modal('hide');
            } else {
                //swal("Your imaginary file is safe!");
                $("#ModalChannel").modal('hide');
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
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/DeleteNotificationTemplate",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        var TrxMessage = 'Your <b>' + $("#TrxSubject").val() + '</b> has been delete'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                        $("#TrxSubject").val("");
                        //$("#TrxBody").val("");
                        CKEDITOR.instances.TrxBody.setData("");
                        $("#cmbCategory").val("");
                        $("#cmbType").val("");
                        $("#cmbStatus").val("");
                        $("#ModalChannel").modal('hide');
                        TrmNotificationTemplate();
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });
                swal("Done", {
                    icon: "success",
                });
                $("#ModalChannel").modal('hide');
            } else {
                //swal("Your imaginary file is safe!");
                $("#ModalChannel").modal('hide');
            }
        });
}
function TrmSelect(TrxID) {
    var JenisKondisi = "AllWhereData";
    var NamaView = "UIDESK_NotificationTemplate";
    var KondisiData = "where ID='" + TrxID + "'";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#TrxSubject").val(json[i].SUBJECT);
                //$("#TrxBody").val(json[i].BODY);
                CKEDITOR.instances.TrxBody.setData(json[i].BODY);
                $("#cmbCategory").val(json[i].CATEGORY);
                $("#cmbType").find("option:selected").text(json[i].TYPE);
                $("#cmbStatus").val(json[i].STATUS);

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