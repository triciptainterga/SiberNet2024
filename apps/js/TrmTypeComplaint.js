$(document).ready(function () {
    TrmTypeComplaint();
    CmbData();
});
function TrmTypeComplaint() {
    var JenisKondisi = "AllWhereData";
    var NamaView = "TrmTypeComplaint";
    var KondisiData = "";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });

    var myTable = $('#TrmTypeComplaint').DataTable();
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

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                                   "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                                   "<div class='dropdown-menu dropdown-menu-right'>" +
                                   "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "','" + json[i].Name + "','" + json[i].NameExtend + "','" + json[i].SLA + "','" + json[i].NA + "')><i class='fa fa-pencil'></i> Edit</a>" +
                                   "</div>" +
                               "</div>"
                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].Name, json[i].NameExtend, json[i].SLA, TrxParam, json[i].UserCreate, newDate + ' ' + newTime, urlClick]).draw(false);
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
    $("#ContentPlaceHolder1_TrxID").val("");
    $("#cmbTypeComplaintCategory").attr("disabled", false);
    $("#cmbTypeComplaintCategory option:selected").text("Select");
    $("#TxtTypeComplaint").val("");
    $("#TxtSLA").val("");
    $("#cmbStatus").find("option:selected").text();
    $("#cmbStatus").val("");
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
}
function showUpdate(TrxID, Name, NameExtend, SLA, Status) {
    //alert(Name)
    if (Status == 'N') {
        var TrxStatusjs = "Non Aktif";
    } else {
        var TrxStatusjs = "Aktif";
    }
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    //$('#TxtChannel').attr("disabled", true);
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $('#cmbTypeComplaintCategory').attr("disabled", true);
    $("#cmbTypeComplaintCategory option:selected").text(Name);
    $("#TxtTypeComplaint").val(NameExtend);
    $("#TxtSLA").val(SLA);
    $("#cmbStatus").find("option:selected").text();
    $("#cmbStatus").val(Status);
}
function ActionSimpan() {
    var TrxCategory = $("#cmbTypeComplaintCategory").val();
    var TrxName = $("#TxtTypeComplaint").val();
    var TrxSLA = $("#TxtSLA").val();
    var TrxStatus = $("#cmbStatus").val();
    if ($("#cmbTypeComplaintCategory").val() == '') {
        alert("Category is empty");
        return false
    }
    if ($("#TxtTypeComplaint").val() == '') {
        alert("Type Complaint is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtTypeComplaint").val())) {
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
    if ($("#TxtSLA").val() == '') {
        alert("SLA is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtSLA").val())) {
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
    if ($("#cmbStatus").val() == '') {
        alert("Status is empty");
        return false
    }
    var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxCategory: TrxCategory, TrxName: TrxName, TrxSLA: TrxSLA, TrxStatus: TrxStatus });
    if (confirm("Do you want to process?")) {
        $.ajax({
            url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmTypeComplaint",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: form_data,
            success: function () {
                console.log(form_data)
                var TrxMessage = 'Your data <b>' + $("#TxtTypeComplaint").val() + '</b> has been save'
                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                $("#TxtTypeComplaint").val("");
                $("#TxtSLA").val("");
                $("#cmbStatus").val("");
                $("#ModalChannel").modal('hide');
                TrmTypeComplaint();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: function () {

            }
        });
    } else
        return false;
}
function ActionUpdate() {
    var TrxCategory = $("#cmbTypeComplaintCategory").val();
    var TrxName = $("#TxtTypeComplaint").val();
    var TrxSLA = $("#TxtSLA").val();
    var TrxStatus = $("#cmbStatus").val();
    if ($("#TxtTypeComplaint").val() == '') {
        alert("Type Complaint is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtTypeComplaint").val())) {
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
    if ($("#TxtSLA").val() == '') {
        alert("SLA is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtSLA").val())) {
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
    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxCategory: TrxCategory, TrxName: TrxName, TrxSLA: TrxSLA, TrxStatus: TrxStatus });
    if (confirm("Do you want to process?")) {
        $.ajax({
            url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmTypeComplaint",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
            data: form_data,
            success: function () {
                console.log(form_data)
                var TrxMessage = 'Your data <b>' + $("#TxtTypeComplaint").val() + '</b> has been Update'
                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                $("#TxtTypeComplaint").val("");
                $("#TxtSLA").val("");
                $("#cmbStatus").val("");
                $("#ModalChannel").modal('hide');
                TrmTypeComplaint();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: function () {

            }
        });
    } else
        return false;
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
    //return false
}
function CmbData() {
    var JenisKondisi = "AllWhereData";
    var cmbTypeComplaintCategory = $('#cmbTypeComplaintCategory');
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mCategory", paramQuery: "where NA='Y'" });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultTypeComplaintCategory = "";
            for (i = 0; i < json.length; i++) {

                resultTypeComplaintCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbTypeComplaintCategory.append(resultTypeComplaintCategory);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
