$(document).ready(function () {
    ProfilingTagihan();
    CampaignScript();
    //GetWS_JourneyTagihan();
    $('#DivKeterangan').hide()
    $('#DivAttachment').hide()
    $('#DataKeterangan').hide()
    $("#NamaUser").append($("#hd_NameKaryawan").val())
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function ProfilingTagihan() {
    var CollectionID = getParameterByName("id");
    $.ajax({
        type: "POST",
        url: "asmx/Coll_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + CollectionID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK94'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].JatuhTempo);
                var milisegundos = parseInt(json[i].JatuhTempo.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                var ConverTanggal = newDate + ' ' + newTime

                $('#TeleNama').val(json[i].Name);
                $('#TeleEmail').val(json[i].Email);
                $('#TeleTelpon').val(json[i].Telepon);
                if (json[i].Gender == "Pria") {
                    $("#ComboGender option:selected").val("1");
                } else {
                    $("#ComboGender option:selected").val("2");
                }
                $('#TeleJobTittle').val(json[i].JobTitle);
                $('#TeleAlamat').val(json[i].Address);
                $('#TeleNegara').val(json[i].Negara);
                $('#TeleProvinsi').val(json[i].Provinsi);
                $('#TeleKota').val(json[i].Kota);
                $('#TeleZipCode').val(json[i].KodePos);
                $('#TypePinjaman').val(json[i].TypePinjaman);
                $('#NamaPinjaman').val(json[i].NamaPinjaman);
                $('#TotalPinjaman').val(json[i].TotalPinjaman);
                $('#PeriodeTotalTagihan').val(json[i].PeriodePinjaman);
                $('#JumlahTagihan').val(json[i].JumlahTagihan);
                $('#PeriodeTagihanKe').val(json[i].PeriodeFrom);
                $('#PeriodeTagihanSampaiDengan').val(json[i].PeriodeTo);
                $('#JatuhTempoBayar').val(ConverTanggal);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CampaignScript() {
    var selectedValue = getParameterByName("script");
    $.ajax({
        type: "POST",
        url: "asmx/Coll_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK87'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                $("#HeaderScript").append(json[i].CampaignScript)
                $("#campaignScript").append(json[i].CampaignDescription)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionNoteTagihan() {
    alert("1")
    GetWS_JourneyTagihan()
    alert("2")
}
function SimpanTagihan() {
    var HeaderID = getParameterByName("id")
    if (HeaderID == "") {
        swal(
            '',
            'Data Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var NotesTagihan = CKEDITOR.instances.Coll_NotesTagihan.getData();
    if (NotesTagihan == "") {
        swal(
            '',
            'Keterangan Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TanggalBayar").val() == "" || $("#TanggalBayar").val() == null) {
        swal(
            '',
            'Tanggal Bayar Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusTagihan").val() == "" || $("#ComboStatusTagihan").val() == null || $("#ComboStatusTagihan").val() == "Select") {
        swal(
            '',
            'Status Tagihan Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusTelepon").val() == "" || $("#ComboStatusTelepon").val() == null || $("#ComboStatusTelepon").val() == "Select") {
        swal(
            '',
            'Status Telepon Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#EskalasiTicket").val() == "" || $("#EskalasiTicket").val() == null || $("#EskalasiTicket").val() == "Select") {
        swal(
            '',
            'Eskalasi Ticket Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'UserName Kosong, Please Login',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        HeaderID: HeaderID, Keterangan: NotesTagihan, TanggalBayar: $("#TanggalBayar").val(), StatusTagihan: $("#ComboStatusTagihan").val(),
        StatusTelepon: $("#ComboStatusTelepon").val(), EskalasiTicket: $("#EskalasiTicket").val(), CreateBy: $("#hd_sessionLogin").val(), Action:"INSERT"
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
                    url: "asmx/Coll_TrxTransaksi.asmx/SimpanTagihan",
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
                                    'Insert Tagihan Has Been Success',
                                    'success'
                                ).then(function () {
                                    ClearTagihan();
                                    GetWS_JourneyTagihan()
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Tagihan Has Been Failed',
                                    'error'
                                ).then(function () {
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
function HistoryTagihan() {

}
function HistoryCall() {
    var TrxID = getParameterByName("id")
    var TrxTelepon = getParameterByName("ph")
    var myTable = $('#TrmHistoryCall').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Coll_TrxTransaksi.asmx/TableHistoryCall",
        data: "{TrxID: '" + TrxID + "', TrxTelepon: '" + TrxTelepon + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTable.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].STARTCALL);
                    var milisegundos = parseInt(json[i].STARTCALL.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConvertStart = newDate + ' ' + newTime

                    var d = new Date(json[i].ENDCALL);
                    var milisegundos = parseInt(json[i].ENDCALL.replace("/Date(", "").replace(")/", ""));
                    var newDateENDCALL = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTimeENDCALL = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConvertEnd = newDateENDCALL + ' ' + newTimeENDCALL

                    var urlClick = "<a href='#' onclick=PlayAudio()><span class='badge badge-pill badge-success'><i class='fa fa-play'></i></span></a>"
                    myTable.row.add([json[i].CALLID, json[i].PHONENO, ConvertStart, ConvertEnd, json[i].EXT, json[i].DURATION, urlClick]).draw(false);

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
function GetWS_JourneyTagihan() {
    var HeaderID = getParameterByName("id");
    var myTable = $('#TableNotesTagihan').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Coll_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + HeaderID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK96'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";
            var newRowContent = "";
            if (json.length == 0) {
                 console.log("Display Not Found")
            } else {
                $('#Note_JourneyKeterangan').empty()
                $('#TableNotesTagihan').find("tr:gt(0)").remove();
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDateENDCALL = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTimeENDCALL = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConvertDateCreate = newDateENDCALL + ' ' + newTimeENDCALL

                    var d = new Date(json[i].TanggalBayar);
                    var milisegundos = parseInt(json[i].TanggalBayar.replace("/Date(", "").replace(")/", ""));
                    var newDateENDCALL = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTimeENDCALL = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConvertTanggalBayar = newDateENDCALL + ' ' + newTimeENDCALL

                    var VariabelKeterangan = json[i].Keterangan
                    newRowContent += '<tr><td>' + json[i].JumlahTagihan + '</td><td>' + json[i].PeriodeFrom + '</td><td>' + json[i].PeriodeTo + '</td><td>' + json[i].StatusTagihan + '</td><td>' + json[i].StatusTelepon + '</td><td>' + json[i].TanggalBayarnya + '</td><td>' + ConvertDateCreate + '</td><td style="text-align:center;"><a href="#" onclick=InteractionNote(' + json[i].ID + ')><i class="fa fa-dot-circle-o"></i></a></td></tr>'
                    //newRowContent = "<tr><td>" + json[i].TotalPinjaman + "</td><td>" + json[i].JumlahTagihan + "</td><td>" + json[i].PeriodeFrom + "</td><td>" + json[i].PeriodeTo + "</td><td>" + json[i].StatusTagihan + "</td><td>" + json[i].StatusTelepon + "</td><td>" + ConvertTanggalBayar + "</td></tr>"
                    //$('#TableNotesTagihan tr:last').after();
                    //$('#TableNotesTagihan').append("<tr><td>" + json[i].Name + "</td><td>" + json[i].Telepon + "</td><td>" + json[i].StatusTagihan + "</td><td>" + json[i].StatusTelepon + "</td><td>" + ConvertTanggalBayar + "</td><td>" + json[i].StatusData +"</td></tr>")
                    //myTable.row.add([json[i].Name, json[i].Telepon, json[i].StatusTagihan, json[i].StatusTelepon, json[i].StatusData, ConvertTanggalBayar]).draw(false);

                }
                $("#Note_JourneyKeterangan").append(VariabelKeterangan)
                $("#TableNotesTagihan tbody").append(newRowContent);
            }
          
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function GetWS_JourneyPembayaran() {
    var Telepon = getParameterByName("ph");
    var myTable = $('#TableNotesPembayaran').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Coll_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + Telepon + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK98'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";
            var newRowPembayaran = "";
            if (json.length == 0) {
                console.log("Display Not Found")
            } else {
               
                $('#TableNotesPembayaran').find("tr:gt(0)").remove();
                for (i = 0; i < json.length; i++) {

                    //var d = new Date(json[i].DateCreate);
                    //var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    //var newDateENDCALL = new Date(milisegundos).toLocaleDateString("en-UE");
                    //var newTimeENDCALL = new Date(milisegundos).toLocaleTimeString("en-UE");
                    //var ConvertDateCreate = newDateENDCALL + ' ' + newTimeENDCALL

                    //var d = new Date(json[i].TanggalBayar);
                    //var milisegundos = parseInt(json[i].TanggalBayar.replace("/Date(", "").replace(")/", ""));
                    //var newDateENDCALL = new Date(milisegundos).toLocaleDateString("en-UE");
                    //var newTimeENDCALL = new Date(milisegundos).toLocaleTimeString("en-UE");
                    //var ConvertTanggalBayar = newDateENDCALL + ' ' + newTimeENDCALL

                    newRowPembayaran += '<tr><td>' + json[i].JumlahTagihan + '</td><td>' + json[i].PeriodeTagihan + '</td><td>' + json[i].MetodePembayaran + '</td><td>' + json[i].Status + '</td><td>' + json[i].TanggalBayarNya + '</td></tr>'
                    //newRowContent = "<tr><td>" + json[i].TotalPinjaman + "</td><td>" + json[i].JumlahTagihan + "</td><td>" + json[i].PeriodeFrom + "</td><td>" + json[i].PeriodeTo + "</td><td>" + json[i].StatusTagihan + "</td><td>" + json[i].StatusTelepon + "</td><td>" + ConvertTanggalBayar + "</td></tr>"
                    //$('#TableNotesTagihan tr:last').after();
                    //$('#TableNotesTagihan').append("<tr><td>" + json[i].Name + "</td><td>" + json[i].Telepon + "</td><td>" + json[i].StatusTagihan + "</td><td>" + json[i].StatusTelepon + "</td><td>" + ConvertTanggalBayar + "</td><td>" + json[i].StatusData +"</td></tr>")
                    //myTable.row.add([json[i].Name, json[i].Telepon, json[i].StatusTagihan, json[i].StatusTelepon, json[i].StatusData, ConvertTanggalBayar]).draw(false);

                }
                $("#TableNotesPembayaran tbody").append(newRowPembayaran);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ClearTagihan() {
    $("#TanggalBayar").val("");
    $("#ComboStatusTagihan").val("");
    $("#ComboStatusTelepon").val("");
    $("#EskalasiTicket").val("");
    CKEDITOR.instances.Coll_NotesTagihan.setData("");
}
function PlayAudio() {
    $("#modal-audio").modal('show');
    document.getElementById("FrameAudio").src = "http://localhost/BPO/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=2022021411080365004838329434002701_lebih4menit"
    //$.ajax({
    //    type: "POST",
    //    url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
    //    data: "{TrxID:'" + getParameterByName("acraid") + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK049', TrxActionType: 'CMB-01'}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {

    //        var json = JSON.parse(data.d);
    //        var i, x, result = "";

    //        for (i = 0; i < json.length; i++) {

    //            if (json[i].FileExist == "True") {
    //                $("#modal-audio").modal('show');
    //                document.getElementById("FrameAudio").src = "http://wagent.uidesk.id/dev_briqm/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=2022021411080365004838329434002701_lebih4menit"
    //                //document.getElementById("FrameAudio").src = "http://wagent.uidesk.id/dev_briqm/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + ""
    //            } else {
    //                swal(
    //                    '',
    //                    'File Not Exits',
    //                    'error'
    //                ).then(function () {
    //                    $("#modal-audio").modal('hide');
    //                });

    //            }

    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function InteractionNote(ID) {
    $('#DivKeterangan').show()
    $('#DivAttachment').show()
    $('#DataKeterangan').show()
    var DetailID = ID;
    $.ajax({
        type: "POST",
        url: "asmx/Coll_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + DetailID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK97'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";
            var newRowContent = "";

            $('#Note_JourneyKeterangan').empty();
            $("#TanggalKeterangan").empty();
            $('#DataKeterangan').empty();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].TanggalBayar);
                var milisegundos = parseInt(json[i].TanggalBayar.replace("/Date(", "").replace(")/", ""));
                var newDateENDCALL = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTimeENDCALL = new Date(milisegundos).toLocaleTimeString("en-UE");
                var ConvertTanggalBayar = newDateENDCALL + ' ' + newTimeENDCALL

                var VariabelKeterangan = json[i].Keterangan
                $("#TanggalKeterangan").append(json[i].TanggalCreate + " " + json[i].JamCreate);
                $('#DataKeterangan').append("<span class='timeline-label'><span class='badge badge-pill badge-primary badge-lg'>Keterangan</span></span></br>")

            }
            $("#Note_JourneyKeterangan").append(VariabelKeterangan)
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}