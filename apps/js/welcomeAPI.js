$(document).ready(function () {
    $("#LoaderPageCounting").hide();
    CmbProductCampaign();
    SelectUploadID("1");
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function GetAPI_PolisNumber() {
    if ($("#CmbProductCampaign").val() == "" || $("#CmbProductCampaign").val() == "Select") {
        swal("Product campaign is empty")
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
                $("#LoaderPageCounting").show();
                var jsonText = JSON.stringify();
                $.ajax({
                    type: "GET",
                    //url: "asmx/json/SampleAPI.json",
                    url: "https://cc-api.brilife.co.id/contactserviceapi/wellcomeCall",
                    //url: "https://cc-api-dev.brilife.co.id/contactserviceapi/wellcomeCall",
                    contentType: "application/json; charset=utf-8",
                    data: jsonText,
                    dataType: "json",
                    success: function (response) {
                        var json = response;
                        var i, j, k, x;
                        console.log(json.ResponseData.object)
                        console.log(json.ResponseData.IdTrx)
                        console.log(json.ResponseData.JumlahData)
                        console.log(json.ResponseData.Tanggal)
                        console.log("JumlahData " + json.ResponseData.length)
                        $("#ContentPlaceHolder1_TrxUploadID").val(json.ResponseData.IdTrx)
                        $("#ContentPlaceHolder1_TrxJumlahData").val(json.ResponseData.JumlahData)
                        
                        // Check data header hari ini sudah ada atau belum
                        var jsonText = JSON.stringify({ TrxUploadID: $("#ContentPlaceHolder1_TrxUploadID").val(), TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val() });
                        $.ajax({
                            url: "asmx/welcomeAPI.asmx/CheckingHeaderTanggal",
                            method: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: jsonText,
                            success: function (data) {

                                var jsonCheck = JSON.parse(data.d);
                                if (jsonCheck.length != 0) {
                                    console.log("Data not found " + i);
                                    $("#LoaderPageCounting").hide();
                                    swal(
                                        '',
                                        'Transaksi API failed, data hari ini sudah tersedia!',
                                        'error'
                                    ).then(function () {
                                        $("#GetAPI").css("display", "block");
                                        $("#CheckAPI").css("display", "none");
                                        window.location = "welcomeAPI.aspx";
                                    });
                                    return false;
                                } else {

                                    for (i = 0; i < json.ResponseData.DataPolis.length; i++) {
                                        if (json.ResponseData.DataPolis[i].EmailPempol == null || json.ResponseData.DataPolis[i].EmailPempol == "") {
                                            var call_email_api = "-";
                                        } else {
                                            var call_email_api = json.ResponseData.DataPolis[i].EmailPempol;
                                        }
                                        //console.log(json.ResponseData.DataPolis[i].NamaPemegangPolis)
                                        var form_data = JSON.stringify({
                                            call_name: json.ResponseData.DataPolis[i].NamaPemegangPolis, call_jenis_kelamin: json.ResponseData.DataPolis[i].JenisKelaminPempol,
                                            call_nama_product: json.ResponseData.DataPolis[i].NamaProduk, call_polis_number: json.ResponseData.DataPolis[i].NomorPolis,
                                            call_nama_tertanggung: json.ResponseData.DataPolis[i].NamaTertanggung, call_uang_pertanggungan: json.ResponseData.DataPolis[i].UangPertanggungan,
                                            call_premi_dasar_berkala: json.ResponseData.DataPolis[i].PremiDasar, call_premi_topup: json.ResponseData.DataPolis[i].PremiTopup,
                                            call_cara_bayar: json.ResponseData.DataPolis[i].CaraBayar, call_tanggal_debet: json.ResponseData.DataPolis[i].TanggalPendebetan,
                                            call_nama_tenaga_penjualan: json.ResponseData.DataPolis[i].NamaTenagaPenjualan, call_biaya_akuisisi_1: json.ResponseData.DataPolis[i].NoRekeningPendebetan,
                                            call_biaya_akuisisi_2: json.ResponseData.DataPolis[i].NoBriva, call_nominal_COI: json.ResponseData.DataPolis[i].TglKirimEPolis,
                                            call_nominal_COR: json.ResponseData.DataPolis[i].TanggalTransaksi, call_email: call_email_api, call_phone_number: json.ResponseData.DataPolis[i].HPPempol,
                                            call_flaging_nasabah: json.ResponseData.DataPolis[i].FlagingNasabah, call_biaya_akuisisi_1_add: json.ResponseData.DataPolis[i].BiayaAkuisisi1,
                                            call_biaya_akuisisi_2_add: json.ResponseData.DataPolis[i].BiayaAkuisisi2, call_biaya_akuisisi_3_add: json.ResponseData.DataPolis[i].BiayaAkuisisi3,
                                            call_biaya_akuisisi_4_add: json.ResponseData.DataPolis[i].BiayaAkuisisi4, call_biaya_akuisisi_5_add: json.ResponseData.DataPolis[i].BiayaAkuisisi5,
                                            call_product_id: $("#CmbProductCampaign").val(), call_username: $("#hd_sessionLogin").val(),
                                            call_upload_id: $("#ContentPlaceHolder1_TrxUploadID").val(), call_jumlah_data: $("#ContentPlaceHolder1_TrxJumlahData").val()
                                        });
                                        $.ajax({
                                            url: "asmx/welcomeAPI.asmx/API_InsertHeader",
                                            method: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "json",
                                            data: form_data,
                                            success: function () {
                                                console.log(form_data)

                                            },
                                            error: function (xmlHttpRequest, textStatus, errorThrown) {
                                                console.log(xmlHttpRequest.responseText);
                                                console.log(textStatus);
                                                console.log(errorThrown);
                                            },
                                            complete: function () {
                                                //TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                                            }
                                        });

                                        //if (json.ResponseData.DataPolis[i].AhliWaris == "") {
                                        //    swal("kosong")
                                        //}
                                        for (j = 0; j < json.ResponseData.DataPolis[i].AhliWaris.length; j++) {

                                            console.log(json.ResponseData.DataPolis[i].AhliWaris[j].NomorPolis)
                                            console.log(json.ResponseData.DataPolis[i].AhliWaris[j].NamaAhliwaris)

                                            var form_data = JSON.stringify({
                                                call_upload_id: json.ResponseData.IdTrx, call_polis_number: json.ResponseData.DataPolis[i].AhliWaris[j].NomorPolis,
                                                call_nama_ahli_waris: json.ResponseData.DataPolis[i].AhliWaris[j].NamaAhliwaris, call_username: $("#hd_sessionLogin").val()
                                            });
                                            $.ajax({
                                                url: "asmx/welcomeAPI.asmx/API_InsertWaris",
                                                method: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                data: form_data,
                                                success: function () {
                                                    console.log(form_data)
                                                },
                                                error: function (xmlHttpRequest, textStatus, errorThrown) {
                                                    console.log(xmlHttpRequest.responseText);
                                                    console.log(textStatus);
                                                    console.log(errorThrown);
                                                },
                                                complete: function () {
                                                    //TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                                                }
                                            });

                                        }

                                        for (j = 0; j < json.ResponseData.DataPolis[i].DataManfaat.length; j++) {

                                            var form_data = JSON.stringify({
                                                call_upload_id: json.ResponseData.IdTrx, call_polis_number_rider: json.ResponseData.DataPolis[i].DataManfaat[j].NomorPolis,
                                                call_manfaat: json.ResponseData.DataPolis[i].DataManfaat[j].NamaManfaat, call_nominal: json.ResponseData.DataPolis[i].DataManfaat[j].BiayaAsuransi,
                                                call_username: $("#hd_sessionLogin").val()
                                            });
                                            $.ajax({
                                                url: "asmx/welcomeAPI.asmx/API_InsertRider",
                                                method: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                data: form_data,
                                                success: function () {
                                                    console.log(form_data)
                                                },
                                                error: function (xmlHttpRequest, textStatus, errorThrown) {
                                                    console.log(xmlHttpRequest.responseText);
                                                    console.log(textStatus);
                                                    console.log(errorThrown);
                                                },
                                                complete: function () {
                                                    //TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                                                }
                                            });

                                        }
                                        for (j = 0; j < json.ResponseData.DataPolis[i].JenisDarlink.length; j++) {

                                            var form_data = JSON.stringify({
                                                call_upload_id: json.ResponseData.IdTrx, call_polis_number: json.ResponseData.DataPolis[i].JenisDarlink[j].NomorPolis,
                                                call_jenis_investasi: json.ResponseData.DataPolis[i].JenisDarlink[j].NamaDarlink,
                                                call_persentase: json.ResponseData.DataPolis[i].JenisDarlink[j].Persentase, call_username: $("#hd_sessionLogin").val()
                                            });
                                            $.ajax({
                                                url: "asmx/welcomeAPI.asmx/API_InsertFund",
                                                method: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                data: form_data,
                                                success: function () {
                                                    console.log(form_data)
                                                },
                                                error: function (xmlHttpRequest, textStatus, errorThrown) {
                                                    console.log(xmlHttpRequest.responseText);
                                                    console.log(textStatus);
                                                    console.log(errorThrown);
                                                },
                                                complete: function () {
                                                    //TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())

                                                }
                                            });

                                        }
                                       
                                    }
                                }

                            },
                            error: function (xmlHttpRequest, textStatus, errorThrown) {
                                console.log(xmlHttpRequest.responseText);
                                console.log(textStatus);
                                console.log(errorThrown);
                            },
                            complete: function () {
                                //await sleep(5000);
                                //checkCountingHeader();
                                TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                               
                            }
                        });


                    }, complete: function () {


                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert("xhr.status " + xhr.status);
                        alert(xhr.responseText);
                        alert(thrownError);
                    }
                });

            }
        });
}
function ExecuteSummary(TrxGetID, TrxType, Summary) {
    var jsonText = JSON.stringify({ call_upload_id: TrxGetID, call_username: $("#hd_sessionLogin").val(), call_type: TrxType, call_summary: Summary });
    $.ajax({
        url: "asmx/welcomeAPI.asmx/API_HeaderSummary",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonText,
        success: function (data) {

            var json = JSON.parse(data.d);
            var u, result = "";

            for (u = 0; u < json.length; u++) {
                alert(json[u].Result)
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
function TrmSummary(sValue) {
    var myTable = $('#TrmSummary').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + sValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK23'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {
                if (json[i].call_upload_type == "Data Polis Number") {
                    var ColorAPI = "primary"
                    var ColorRows = "primary"
                } else {
                    var ColorAPI = "danger"
                    var ColorRows = "warning"
                }
                myTable.row.add([json[i].call_upload_type, json[i].call_upload_id, "<span class='badge badge-pill badge-" + ColorAPI + "' style='width:70px;font-weight:bold;'>" + json[i].call_api_rows + "</span>", "<span class='badge badge-pill badge-" + ColorRows + "' style='width:70px;font-weight:bold;'>" + json[i].call_upload_rows + "</span>"]).draw(false);
            }
            $("#LoaderPageCounting").hide();
            $("#GetAPI").css("display", "none");
            $("#CheckAPI").css("display", "block");

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbProductCampaign(UploadID) {
    var CmbProductCampaign = $('#CmbProductCampaign');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK16'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].ID + '">' + json[i].CampaignName + '</option>';
                CmbProductCampaign.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ProductCampaign_AgentLogin() {
    var selectedText = $("#CmbProductCampaign").find("option:selected").text();
    var selectedValue = $("#CmbProductCampaign").val();
    if (selectedValue == "") {
        searchingAgentLogin("defaultSystem");
    } else {
        searchingAgentLogin(selectedValue);
    }
    $("#modalright").modal('show');
}
function searchingAgentLogin(sValue) {
    var selectedValue = sValue;
    var ListSearching = $('#ListSearching');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK18'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultCallCampaigns = "";
            ListSearching.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultSearching = '<div class="media media-single" > No data found... </div>';
                ListSearching.append(resultCallCampaigns);
            } else {
                for (i = 0; i < json.length; i++) {

                    if (json[i].Login == '1') {
                        var statusAgent = "<i class='fa fa-circle-o text-success'></i>"
                    } else {
                        var statusAgent = "<i class='fa fa-circle-o text-danger'></i>"
                    }
                    resultSearching = '<div class="media media-single">' +
                        '<a href="#"><img src="../images/avatar/5.jpg" height="32" alt="..."></a>' +
                        '<div class="media-body">' +
                        '<small class="text-fader"></small>' +
                        '<h6><a href="#" onclick="Reading(' + json[i].agent_id + ')">' + statusAgent + '&nbsp;' + json[i].NAME + '</a></h6>' +
                        '<small class="text-fader">Max Handle ' + json[i].maxhandle + ' Data Call</small><br/>' +
                        '</div>' +
                        '</div>'
                    ListSearching.append(resultSearching);
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
function doneUpload() {
    if ($("#CmbProductCampaign").val() == "" || $("#CmbProductCampaign").val() == "Select") {
        swal("Product campaign is empty")
        return false;
    }
    if ($("#ContentPlaceHolder1_TrxUploadID").val() == "") {
        swal("Data is empty")
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

                $("#LoaderPageCounting").show();
                var form_data = JSON.stringify({ call_upload_id: $("#ContentPlaceHolder1_TrxUploadID").val(), call_approve_by: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/welcomeAPI.asmx/UpdateUploadOutboundCall",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        swal(
                            '',
                            'Distribution Data Success',
                            'success'
                        ).then(function () {
                            $("#btn_done").css("display", "none");
                            $("#btn_cancel").css("display", "none");
                            window.location = "TrxUploadOutboundCall.aspx";
                        });

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {
                        $("#LoaderPageCounting").hide();
                    }
                });

            }

        });
}
function cancelUpload() {
    if ($("#CmbProductCampaign").val() == "" || $("#CmbProductCampaign").val() == "Select") {
        swal("Product campaign is empty")
        return false;
    }
    if ($("#ContentPlaceHolder1_TrxUploadID").val() == "") {
        swal("Data is empty")
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

                $("#LoaderPageCounting").show();
                var form_data = JSON.stringify({ call_upload_id: $("#ContentPlaceHolder1_TrxUploadID").val() });
                $.ajax({
                    url: "asmx/welcomeAPI.asmx/CancelUploadOutboundCall",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        swal(
                            '',
                            'Transaction has been cancel, Proccess Get Data API Againt',
                            'success'
                        ).then(function () {
                            window.location = "welcomeAPI.aspx";
                        });

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {
                        $("#LoaderPageCounting").hide();
                    }
                });

            }

        });
}
function checkCountingHeader() {
    //setTimeout("alert('this alert is timedout and should be the first');", 20000);
    //await sleep(30000);
    var jsonTextCounting = JSON.stringify({ TrxUploadID: $("#ContentPlaceHolder1_TrxUploadID").val(), TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val() });
    console.log("jsonTextCounting " + jsonTextCounting)
    $.ajax({
        url: "asmx/welcomeAPI.asmx/CheckingHeaderCounting",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonTextCounting,
        success: function (data) {

            var jsonCounting = JSON.parse(data.d);
            var p, x, result = "";
            for (p = 0; p < jsonCounting.length; p++) {
                //alert(jsonCounting[p].call_upload_rows)
                //if (JumlahData == jsonCounting[p].TotalRows) {
                if ($("#ContentPlaceHolder1_TrxJumlahData").val() == jsonCounting[p].call_upload_rows) {
                    swal('',
                        'Data API ' + $("#ContentPlaceHolder1_TrxJumlahData").val() + ' - Data Row ' + jsonCounting[p].call_upload_rows +', Transaction Success',
                        'success')
                    //TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                    $("#GetAPI").css("display", "block");
                    $("#CheckAPI").css("display", "none");
                    $("#divButton").css("display", "block");
                } else {
                    if ($("#ContentPlaceHolder1_TrxJumlahData").val() == "") {
                        swal("Data already in system, Please distribution to agent")
                        return false
                    }
                    swal('',
                        'Data API ' + $("#ContentPlaceHolder1_TrxJumlahData").val() + ' - Data Row ' + jsonCounting[p].call_upload_rows +', Transaction no match',
                        'error'
                         )
                        .then((willDelete) => {
                            if (willDelete) {
                                var form_data = JSON.stringify({ call_upload_id: $("#ContentPlaceHolder1_TrxUploadID").val() });
                                $.ajax({
                                    url: "asmx/welcomeAPI.asmx/CancelUploadOutboundCall",
                                    method: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    data: form_data,
                                    success: function () {
                                        console.log(form_data)

                                        swal(
                                            '',
                                            'Data has been remove, Please Proccess Get Data API againt',
                                            'success'
                                        ).then(function () {
                                            window.location = "welcomeAPI.aspx";
                                        });

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
function SelectUploadID(UploadID) {
    var CmbUploadID = $('#CmbUploadID');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + UploadID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK20'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if (UploadID == "1") {
                    result = '<option value="' + json[i].call_upload_id + '">' + json[i].call_upload_id + '</option>';
                } else {
                    result = '<option value="' + json[i].call_upload_id + '" selected=true>' + json[i].call_upload_id + '</option>';
                    $('#CmbUploadID').attr('disabled', true);
                }
                CmbUploadID.append(result);
                if (UploadID != "1") {
                    $("#divButton").css("display", "block");
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
function get_CmbUploadID(UploadID) {
    var selectedText = $("#CmbUploadID").find("option:selected").text();
    var selectedValue = $("#CmbUploadID").val();
    TrmSummary(selectedValue);
    ($("#ContentPlaceHolder1_TrxUploadID").val(selectedValue))
    $("#GetAPI").css("display", "block");
    $("#CheckAPI").css("display", "none");
    $("#divButton").css("display", "block");
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function demo() {
    setTimeout("alert('this alert is timedout and should be the first');", 5000);
    await sleep(5000);
    alert('this should be the second one');
}
