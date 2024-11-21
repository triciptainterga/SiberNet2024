$(document).ready(function () {

});
function OnChange_Profile() {
    $("#API_FilterValue").attr("disabled", false);
    if ($("#ComboFilter").val() != "1") {
        $("#Div_ListNomorPolis").css("display", "block")
        $("#HR_ListNomorPolis").css("display", "block")
    } else {
        $('#Div_ListNomorPolis').css("display", "block");
        $("#HR_ListNomorPolis").css("display", "block")
    }
    if ($("#API_FilterValue").val() != "") {
        CleasingObject();
    }
}
function TestingNoPolis() {
    var settings = {
        "url": "https://cc-api-dev.brilife.co.id/contactserviceapi/profiling/profilingPolisSearch",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "NIK": "\"\"",
            "NoPolis": "" + $("#API_FilterValue").val() + ""
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        var json = response;
        console.log(json)
        console.log("Success POST...");
        var i, x;
        if (json.ResponseMessage == "Success") {
            for (i = 0; i < json.ResponseData.length; i++) {
                $("#API_FullName").val(json.ResponseData[i].FullName)
                $("#API_EmailAddress").val(json.ResponseData[i].EmailAddress)
                $("#API_PhoneNumber").val(json.ResponseData[i].PhoneNumber)
                $("#API_DateOfBirth").val(json.ResponseData[i].DateOfBirth)
                $("#API_GenderTest").val(json.ResponseData[i].Gender)
                $("#API_Address").val(json.ResponseData[i].Address)
            }
        } else {
            swal(json.ResponseMessage)
        }
    });
}
function Get_ProfileAPI() {
    TrmListPolisNumber()
    if ($("#ComboFilter").val() == "Select" || $("#ComboFilter").val() == "") {
        swal("Filter is not emtpy")
        return false
    }  
    if ($("#ComboFilter").val() == "1") {
        if ($("#API_FilterValue").val() == "" || $("#API_FilterValue").val() == null) {
            swal(
                '',
                'NIK is not empty',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
        var FormatNumber = /^[0-9]+$/;
        if ($("#API_FilterValue").val().match(FormatNumber)) {
            var NIKLengt = $("#API_FilterValue").val().toString().length;
            if (NIKLengt == '16') {

            } else {
                swal(
                    '',
                    'Format NIK Number is 16 Digit',
                    'error'
                ).then(function () {
                    $("#API_FilterValue").val("");
                    return false;
                });
                return false;
            }
        } else {
            swal(
                '',
                'Format NIK Number is Numeric',
                'error'
            ).then(function () {
                $("#API_FilterValue").val("");
                return false;
            });
            return false;
        }
        var jsonText = JSON.stringify({ NIK: $("#API_FilterValue").val(), NoPolis: "" });
        console.log("jsonText 1" + jsonText)
        $.ajax({
            type: "POST",
            url: "https://cc-api-dev.brilife.co.id/contactserviceapi/profiling/profilingPolisSearch",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                var json = response;
                console.log(json)
                console.log("Success POST...");
                var i, x;

                if (json.ResponseMessage == "Success") {
                    for (i = 0; i < json.ResponseData.length; i++) {
                        $("#API_FullName").val(json.ResponseData[i].FullName)
                        $("#API_EmailAddress").val(json.ResponseData[i].EmailAddress)
                        $("#API_PhoneNumber").val(json.ResponseData[i].PhoneNumber)
                        $("#API_DateOfBirth").val(json.ResponseData[i].DateOfBirth)
                        $("#API_GenderTest").val(json.ResponseData[i].Gender)
                        $("#API_Address").val(json.ResponseData[i].Address)
                    }
                    TrmListPolisNumber();
                } else {
                    swal(json.ResponseMessage)
                }

            }, complete: function () {
                //back to normal!               			
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(xhr.responseText);
                alert(thrownError);
            }
        });

    } else {

        if ($("#API_FilterValue").val() == "" || $("#API_FilterValue").val() == null) {
            swal(
                '',
                'Nomor Polis is not empty',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
        var FormatNumber = /^[0-9]+$/;
        if ($("#API_FilterValue").val().match(FormatNumber)) {
            var NIKLengt = $("#API_FilterValue").val().toString().length;
            if (NIKLengt < '8') {
                swal(
                    '',
                    'Format Nomor Polis must be greater than 8 Digits',
                    'error'
                ).then(function () {
                    $("#API_FilterValue").val("");
                    return false;
                });
                return false;
            } else if (NIKLengt > '16') {
                swal(
                    '',
                    'Format Nomor Polis cannot be bigger than 16 Digits',
                    'error'
                ).then(function () {
                    $("#API_FilterValue").val("");
                    return false;
                });
                return false;
            }
        } else {
            swal(
                '',
                'Format NIK Number is Numeric',
                'error'
            ).then(function () {
                $("#API_FilterValue").val("");
                return false;
            });
            return false;
        }

        var settings = {
            "url": "https://cc-api-dev.brilife.co.id/contactserviceapi/profiling/profilingPolisSearch",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "NIK": "\"\"",
                "NoPolis": "" + $("#API_FilterValue").val() + ""
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            var json = response;
            console.log(json)
            console.log("Success POST...");
            var i, x;
            if (json.ResponseMessage == "Success") {
                for (i = 0; i < json.ResponseData.length; i++) {
                    $("#API_FullName").val(json.ResponseData[i].FullName)
                    $("#API_EmailAddress").val(json.ResponseData[i].EmailAddress)
                    $("#API_PhoneNumber").val(json.ResponseData[i].PhoneNumber)
                    $("#API_DateOfBirth").val(json.ResponseData[i].DateOfBirth)
                    $("#API_GenderTest").val(json.ResponseData[i].Gender)
                    $("#API_Address").val(json.ResponseData[i].Address)
                }
            } else {
                swal(json.ResponseDescription)
            }
        });

        Click_DetailNomorPolis($("#API_FilterValue").val())
    }
}
function TrmListPolisNumber() {
    if ($("#ComboFilter").val() == "1") {
        var jsonText = JSON.stringify({ NIK: $("#API_FilterValue").val()});
    } else {
        var jsonText = JSON.stringify({ NoPolis: $("#API_FilterValue").val()  });
    }
    console.log("TrmListPolisNumber " + jsonText);
    //var jsonText = JSON.stringify({ NIK: "", NoPolis: $("#API_FilterValue").val() });
    var myTable = $('#TrmPolisNumber').DataTable();
    $.ajax({
        type: "POST",
        url: "https://cc-api-dev.brilife.co.id/contactserviceapi/profiling/profilingPolisList",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {
            var json = response;
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.ResponseData.length; i++) {

                var TrxAction = "<a href='#' style='cursor: pointer;' class='text-primary' data-toggle='tooltip' data-original-title='Delete' onclick=Click_DetailNomorPolis('" + json.ResponseData[i].NomorPolis + "')><i class='ti-arrow-right' aria-hidden='true'></i></a>"
                //var TrxRowsAPI = "<span class='badge badge-pill badge-danger' style='width:70px;font-weight:bold;'>" + json[i].call_api_rows + "</span>"
                //var TrxRows = "<span class='badge badge-pill badge-warning' style='width:70px;font-weight:bold;'>" + json[i].call_upload_rows + "</span>"
                myTable.row.add([TrxAction, json.ResponseData[i].NomorPolis, json.ResponseData[i].NomorSPAJ, json.ResponseData[i].NamaPempol, json.ResponseData[i].NamaProduk]).draw(false);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Click_DetailNomorPolis(NomorPolis) {
    var jsonText = JSON.stringify({ NoPolis: NomorPolis });
    $.ajax({
        type: "POST",
        url: "https://cc-api-dev.brilife.co.id/contactserviceapi/profiling/profilingPolisDetail",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {
            var json = response;
            console.log(json)
            console.log("Success POST...");
            var i, x;

            if (json.ResponseMessage == "Success") {
                for (i = 0; i < json.ResponseData.length; i++) {
                    $("#API_Nama").val(json.ResponseData[i].NamaPempol)
                    $("#API_StatusPolis").val(json.ResponseData[i].StatusPolis)
                    $("#API_PremiDasar").val(json.ResponseData[i].PremiDasar)
                    $("#API_FlaggingNasabah").val(json.ResponseData[i].FlagingNasabah)
                    $("#API_Gender").val(json.ResponseData[i].JenisKelaminPempol)
                    $("#API_UangPertanggungan").val(json.ResponseData[i].UangPertanggungan)
                    $("#API_PremiDasarTopup").val(json.ResponseData[i].PremiTopup)
                    $("#API_NomorHPPemegangPolis").val(json.ResponseData[i].UangPertanggungan)
                    $("#API_DOB").val(json.ResponseData[i].TglLahirPempol)
                    $("#API_TglMulaiPolis").val(json.ResponseData[i].TglMulaiPolis)
                    $("#API_MasaBayar").val(json.ResponseData[i].MasaBayar)
                    $("#API_EmailPemegangPolis").val(json.ResponseData[i].UangPertanggungan)
                    $("#API_NIK").val(json.ResponseData[i].NIKPempol)
                    $("#API_TglBerakhirPolis").val(json.ResponseData[i].TglBerakhirPolis)
                    $("#API_CaraBayar").val(json.ResponseData[i].CaraBayar)
                    $("#API_AlamatIdentitasPemegangPolis").val(json.ResponseData[i].TglBerakhirPolis)
                    $("#API_IbuKandung").val(json.ResponseData[i].NamaGadisIbuKandung)
                    $("#API_TglKirimEPolis").val(json.ResponseData[i].TglBerakhirPolis)
                    $("#API_JenisPembayaran").val(json.ResponseData[i].JenisPembayaran)
                    $("#API_Core").val(json.ResponseData[i].Core)
                    $("#API_NamaTertanggung").val(json.ResponseData[i].NamaTertanggung)
                    $("#API_MasaAsuransi").val(json.ResponseData[i].MasaAsuransi)
                    $("#API_NomorRekening").val(json.ResponseData[i].MasaAsuransi)
                    $("#API_AccountsMyAccess").val(json.ResponseData[i].MasaAsuransi)
                    $("#API_TglLahirTertanggung").val(json.ResponseData[i].TglLahirTertanggung)
                    $("#API_NomorVirtualAccount").val(json.ResponseData[i].MasaAsuransi)
                    $("#API_NamaBank").val(json.ResponseData[i].MasaAsuransi)
                    $("#API_JenisKelaminTertanggung").val(json.ResponseData[i].JenisKelaminTertanggung)
                    $("#API_NamaTenagaPenjualan").val(json.ResponseData[i].NamaTenagaPenjual)
                    $("#API_NamaPemilikRekening").val(json.ResponseData[i].MasaAsuransi)

                    var myTrmWaris = $('#TrmWaris').DataTable();
                    myTrmWaris.clear().draw();
                    for (j = 0; j < json.ResponseData[i].AhliWaris.length; j++) {
                        myTrmWaris.row.add([json.ResponseData[i].AhliWaris[j].NamaAhliWaris, json.ResponseData[i].AhliWaris[j].Persentase]).draw(false);
                    }

                    var myTrmManfaat = $('#TrmManfaat').DataTable();
                    myTrmManfaat.clear().draw();
                    for (j = 0; j < json.ResponseData[i].ManfaatAsuransi.length; j++) {
                        myTrmManfaat.row.add([json.ResponseData[i].ManfaatAsuransi[j].NamaManfaat, json.ResponseData[i].ManfaatAsuransi[j].UP]).draw(false);
                    }

                    var myTrmDarlink = $('#TrmDarlink').DataTable();
                    myTrmDarlink.clear().draw();
                    for (j = 0; j < json.ResponseData[i].AlokasiInvestasi.length; j++) {
                        myTrmDarlink.row.add([json.ResponseData[i].AlokasiInvestasi[j].JenisInvestasi, json.ResponseData[i].AlokasiInvestasi[j].PersenAlokasi,
                            json.ResponseData[i].AlokasiInvestasi[j].SaldoUnit, json.ResponseData[i].AlokasiInvestasi[j].NilaiNAB,
                            json.ResponseData[i].AlokasiInvestasi[j].SaldoRupiah, json.ResponseData[i].AlokasiInvestasi[j].TanggalNAB]).draw(false);
                    }

                    var myTrmTunai = $('#TrmTunai').DataTable();
                    myTrmTunai.clear().draw();
                    for (j = 0; j < json.ResponseData[i].AlokasiInvestasi.length; j++) {
                        myTrmTunai.row.add([json.ResponseData[i].AlokasiInvestasi[j].JenisInvestasi, json.ResponseData[i].AlokasiInvestasi[j].PersenAlokasi,
                        json.ResponseData[i].AlokasiInvestasi[j].SaldoUnit, json.ResponseData[i].AlokasiInvestasi[j].NilaiNAB,
                        json.ResponseData[i].AlokasiInvestasi[j].SaldoRupiah, json.ResponseData[i].AlokasiInvestasi[j].TanggalNAB]).draw(false);
                    }

                    var myTrmPremi = $('#TrmPremi').DataTable();
                    myTrmPremi.clear().draw();
                    for (j = 0; j < json.ResponseData[i].HistorisPremi.length; j++) {
                        myTrmPremi.row.add([json.ResponseData[i].HistorisPremi[j].KuitansiKe, json.ResponseData[i].HistorisPremi[j].TglJatuhTempo,
                            json.ResponseData[i].HistorisPremi[j].TglPelunasan, json.ResponseData[i].HistorisPremi[j].Nominal]).draw(false);
                    }
                }
            } else {
                swal(json.ResponseMessage)
            }
        }, complete: function () {
            //back to normal!               			
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(xhr.responseText);
            alert(thrownError);
        }
    });
}
function CleasingObject() {
    $("#API_FilterValue").val("");
    $("#API_FullName").val("")
    $("#API_EmailAddress").val("")
    $("#API_PhoneNumber").val("")
    $("#API_DateOfBirth").val("")
    $("#API_GenderTest").val("")
    $("#API_Address").val("")
    var myListPolisNumber = $('#TrmPolisNumber').DataTable();
    myListPolisNumber.clear().draw();

    // Detail Polis Number
    $("#API_Nama").val("")
    $("#API_StatusPolis").val("")
    $("#API_PremiDasar").val("")
    $("#API_FlaggingNasabah").val("")
    $("#API_Gender").val("")
    $("#API_UangPertanggungan").val("")
    $("#API_PremiDasarTopup").val("")
    $("#API_NomorHPPemegangPolis").val("")
    $("#API_DOB").val("")
    $("#API_TglMulaiPolis").val("")
    $("#API_MasaBayar").val("")
    $("#API_EmailPemegangPolis").val("")
    $("#API_NIK").val("")
    $("#API_TglBerakhirPolis").val("")
    $("#API_CaraBayar").val("")
    $("#API_AlamatIdentitasPemegangPolis").val("")
    $("#API_IbuKandung").val("")
    $("#API_TglKirimEPolis").val("")
    $("#API_JenisPembayaran").val("")
    $("#API_Core").val("")
    $("#API_NamaTertanggung").val("")
    $("#API_MasaAsuransi").val("")
    $("#API_NomorRekening").val("")
    $("#API_AccountsMyAccess").val("")
    $("#API_TglLahirTertanggung").val("")
    $("#API_NomorVirtualAccount").val("")
    $("#API_NamaBank").val("")
    $("#API_JenisKelaminTertanggung").val("")
    $("#API_NamaTenagaPenjualan").val("")
    $("#API_NamaPemilikRekening").val("")
    var myTrmWaris = $('#TrmWaris').DataTable();
    myTrmWaris.clear().draw();
    var myTrmManfaat = $('#TrmManfaat').DataTable();
    myTrmManfaat.clear().draw();
    var myTrmDarlink = $('#TrmDarlink').DataTable();
    myTrmDarlink.clear().draw();
    var myTrmTunai = $('#TrmTunai').DataTable();
    myTrmTunai.clear().draw();
    var myTrmPremi = $('#TrmPremi').DataTable();
    myTrmPremi.clear().draw();
}