$(document).ready(function () {
    Profiling();
    CampaignScript();
    $("#NamaUser").append($("#hd_NameKaryawan").val())
    //$("#ContentPlaceHolder1_TrxTelepon").val(getParameterByName("ph"))
    $('#chat-box-body').click(function (e) {
        swal({
            title: "Do you want to call?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log("Dial Call");
                    const Http = new XMLHttpRequest();
                    const url = "http://localhost:60024/dial/telp=" + getParameterByName("ph")
                    console.log("url" + url)
                    Http.open("GET", url);
                    Http.send();

                    Http.onreadystatechange = (e) => {
                        console.log(Http.responseText)
                        var drop = ""
                        drop = '<div id="chat-box-bodyDrop">' +
                            '<div id ="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-danger l-h-70">' +
                            '<div id="chat-overlay"></div>' +
                            '<span class="mdi mdi-phone-locked font-size-30"></span>' +
                            '</div>' +
                            '</div>'
                        $("#chat-box-bodyDrop").append(drop)
                    }
                } else {
                    window.location.reload();
                }
            });
    });
    $('#chat-box-bodyDrop').click(function (e) {
        swal({
            title: "Do you want to drop?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    console.log("Drop Call");
                    const Http = new XMLHttpRequest();
                    const url = "http://localhost:60024/drop/telp=" + getParameterByName("ph")
                    Http.open("GET", url);
                    Http.send();

                    Http.onreadystatechange = (e) => {
                        console.log(Http.responseText)
                        location.reload();
                    }

                } else {
                    location.reload();
                }
            });

    });
    $("#ContentPlaceHolder1_TrxTransaksiID").val(getParameterByName("id"))
});
function Profiling() {
    var selectedValue = getParameterByName("ph");
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK73'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

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
                $("#ContentPlaceHolder1_TrxTransaksiID").val(json[i].ID)
                $("#ContentPlaceHolder1_TrxScript").val(json[i].ProdukID)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SimpanNotes() {
    var TeleNote = CKEDITOR.instances.Tele_Notes.getData();
    if (TeleNote == "") {
        swal(
            '',
            'Note Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Notes_ComboStatus").val() == "" || $("#Notes_ComboStatus").val() == null) {
        swal(
            '',
            'Status Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Notes_EskalasiTicket").val() == "" || $("#Notes_EskalasiTicket").val() == null) {
        swal(
            '',
            'Eskalasi Ticket Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (getParameterByName("id") == null || getParameterByName("id") == "") {
        var TrxID = $("#ContentPlaceHolder1_TrxTransaksiID").val()
    } else {
        var TrxID = getParameterByName("id")
    }
    var form_data = JSON.stringify({
        TrxID: $("#ContentPlaceHolder1_TrxTransaksiID").val(), TrxNote: TeleNote,
        TrxStatus: $("#Notes_ComboStatus").val(), TrxTicket: $("#Notes_EskalasiTicket").val(), TrxCreateBy: $("#hd_sessionLogin").val()
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
                    url: "asmx/Tele_TrxTransaksi.asmx/SimpanNotes",
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
                                    'Insert Note Has Been Success',
                                    'success'
                                ).then(function () {
                                    ClearNote()
                                    GetWS_JourneyNote()
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Note Has Been Failed',
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
function CancelNotes() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                
            }
        });
}
function SimpanTask() {
    if ($("#NamaTask").val() == "") {
        swal(
            '',
            'Nama Task Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TaskDetail = CKEDITOR.instances.Task_Detail.getData();
    if (TaskDetail == "") {
        swal(
            '',
            'Detail Task Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var LangkahSelanjutnya = CKEDITOR.instances.Langkah_Selanjutnya.getData();
    if (LangkahSelanjutnya == "") {
        swal(
            '',
            'Langkah Selanjutnya Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }    
    if ($("#ComboKategori").val() == "" || $("#ComboKategori").val() == null) {
        swal(
            '',
            'Kategori Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusNya").val() == "" || $("#ComboStatusNya").val() == null) {
        swal(
            '',
            'Status Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboPriority").val() == "" || $("#ComboPriority").val() == null) {
        swal(
            '',
            'Priority Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboReminder").val() == "" || $("#ComboReminder").val() == null) {
        swal(
            '',
            'Reminder Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#DueDate_Task").val() == "" || $("#DueDate_Task").val() == null) {
        swal(
            '',
            'Due Date Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        TrxID: $("#ContentPlaceHolder1_TrxTransaksiID").val(), TrxNamaTask: $("#NamaTask").val(), TrxDetailTask: TaskDetail,
        TrxSelanjutnya: LangkahSelanjutnya, TrxKategori: $("#ComboKategori").val(),
        TrxStatus: $("#ComboStatusNya").val(), TrxPriority: $("#ComboPriority").val(), TrxReminder: $("#ComboReminder").val(),
        TrxDueDate: $("#DueDate_Task").val(), TrxCreateBy: $("#hd_sessionLogin").val(), TrxAction:"INSERT"
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
                    url: "asmx/Tele_TrxTransaksi.asmx/SimpanTask",
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
                                    'Insert Task Has Been Success',
                                    'success'
                                ).then(function () {
                                    ClearTask();
                                    GetWS_JourneyTask()
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Task Has Been Failed',
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
function CancelTask() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

            }
        });
}
function ClearNote() {
    CKEDITOR.instances.Tele_Notes.setData("")
    $("#Notes_ComboStatus").val("");
    $("#Notes_EskalasiTicket").val("");
    
}
function ClearTask() {
    CKEDITOR.instances.Task_Detail.setData("")
    CKEDITOR.instances.Langkah_Selanjutnya.setData("")
    $("#NamaTask").val("");
    $("#ComboKategori").val("");
    $("#ComboStatusNya").val("");
    $("#ComboPriority").val("");
    $("#ComboReminder").val("");
    $("#DueDate_Task").val("");
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function PlayAudio() {
    $("#modal-audio").modal('show');
    document.getElementById("FrameAudio").src = "http://studio.uidesk.id:4430/stream.php?file=/var/spool/asterisk/monitor/2023/02/15/exten-10001-10002-20230215-162441-1676453081.269.wav"
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
function AddProduk() {
    $("#modal-produk").modal('show');
    $("#SimpanProduk").show();
    $("#UpdateProduk").hide();
    $("#DeleteProduk").hide();
}
function ActionCall() {
    //var TrxID = getParameterByName("id")
    if (getParameterByName("id") == null || getParameterByName("id") == "") {
        var TrxID = $("#ContentPlaceHolder1_TrxTransaksiID").val()
    } else {
        var TrxID = getParameterByName("id")
    }
    var TrxTelepon = getParameterByName("ph")
    var myTable = $('#TrmHistoryCall').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/TableHistoryCall",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxTransaksiID").val() + "', TrxTelepon: '" + TrxTelepon + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
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
function ActionNotes() {
    GetWS_JourneyNote();
}
function ActionTask() {
    GetWS_JourneyTask();
}
function ActionScript() {
    CampaignScript();
}
function ActionQuestion() {
}
function CampaignScript() {
    if (getParameterByName("script") == null || getParameterByName("script") == "") {
        var selectedValue = $("#ContentPlaceHolder1_TrxScript").val()
    } else {
        var selectedValue = getParameterByName("script")
    }
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/UIDESK_TrmMaster",
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
function GetWS_JourneyNote() {
    //if (getParameterByName("id") == null || getParameterByName("id") == "") {
    //    var selectedValue = $("#ContentPlaceHolder1_TrxTransaksiID").val()
    //} else {
    //    var selectedValue = getParameterByName("id")
    //}
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTransaksiID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK88'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";

            if (json.length == 0) {

                $("#Note_usertimeline").css("display", "none");

            } else {

                $('#Note_Journey').empty()
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    DataListInteraction += '<span class="timeline-label">' +
                        //'<span class="badge badge-pill badge-primary badge-lg">'+ json[i].AgentCreateX +'</span>' +
                        //'<img alt="Profile" src="../images/icon/call.png" class="avatar mr-10">' +
                        '</span>' +
                        '<span class="timeline-label">' +
                        '<span class="badge badge-pill badge-primary badge-lg">' + json[i].Status + '</span>' +
                        '</span>' +
                        '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle text-warning"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].NAME + '</p>' +
                        '<div class="timeline-body">' +
                        '' + json[i].Note + '' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<p class="pull-right text-fade" style="font-size:12px;"><i class="fa fa-calendar"></i> ' + json[i].Tanggal + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<span class="timeline-label" style="margin-left:220px;">' +
                        '<audio controls="">' +
                        //'<source src = "//studio.uidesk.id:4430/stream.php?file=/var/spool/asterisk/monitor/2023/02/15/exten-10001-10002-20230215-162441-1676453081.269.wav" type = "audio/wav">' +
                        '<source src = ' + json[i].RecordingURL + ' type = "audio/wav">' +
                        'Your browser does not support the audio element.' +
                        '</audio>' +
                        '</span>';

                   
                }
                console.log(DataListInteraction);
                //$("#P_TicketNumberJourney").append("<i class='fa fa-ticket'></i> " + getParameterByName("phonenumber"));
                $('#Note_Journey').append(DataListInteraction);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function GetWS_JourneyTask() {
    //if (getParameterByName("id") == null || getParameterByName("id") == "") {
    //    var selectedValue = $("#ContentPlaceHolder1_TrxTransaksiID").val()
    //} else {
    //    var selectedValue = getParameterByName("id")
    //}
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTransaksiID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK89'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var Task_DataListInteraction = "";

            if (json.length == 0) {

                $("#Task_usertimeline").css("display", "none");

            } else {

                $('#Task_Journey').empty()
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    Task_DataListInteraction += '<span class="timeline-label">' +
                        //'<span class="badge badge-pill badge-primary badge-lg">'+ json[i].AgentCreateX +'</span>' +
                        //'<img alt="Profile" src="../images/icon/call.png" class="avatar mr-10">' +
                        '</span>' +
                        '<span class="timeline-label">' +
                        '<span style="margin-left:70px;" class="badge badge-pill badge-primary badge-lg"><i class="fa fa-calendar"></i> ' + json[i].Tanggal + ' </span>' +
                        '</span>' +
                        '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle text-warning"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<br>' +
                        //'<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].NamaTask + '</p>' +
                        '<div class="timeline-body">' +
                        'Nama Task : <b>' + json[i].NamaTask +'</b>' +
                        '<hr/>' +
                        '</div>' +
                        '<div class="timeline-body">' +
                        ' Detail Task : ' +
                        '<hr/>' +
                        '<b>' + json[i].DetailTask + '</b>' +
                        '</div>' +
                        '<div class="timeline-body">' +
                        '<hr/>' +
                        ' Langkah Selanjutnya  : '+
                        '<hr/>' +
                        '<b>' + json[i].NextTask + '</b>' +
                        '</div>' +
                        '<div class="timeline-body">' +
                        '<hr/>' +
                        ' Kategori : <b>' + json[i].Kategori + '</b>' +
                        '<hr/>' +
                        ' Status   : <b>' + json[i].Status + '</b>' +
                        '<hr/>' +
                        ' Priority : <b>' + json[i].Priority + '</b>' +
                        '<hr/>' +
                        ' Reminder : <b>' + json[i].Reminder + '</b>' +
                        '<hr/>' +
                        ' Due Date : <b>' + json[i].Reminder + '</b>' +
                        '<hr/>' +
                        '</div>' +
                        '<br>' +
                        //'<div class="timeline-footer">' +
                        //'<button type="button" class="btn btn-rounded btn-primary float-right" onclick="ButtonSimpanHeader()">Edit</button><button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Delete</button>' +
                        //'<p class="pull-right text-fade" style="font-size:12px;"><i class="fa fa-calendar"></i> ' + newDate + "-" + newTime + '</p>' +
                        //'<br>' +
                        //'</div>' +
                        //'<div class="box-footer"><button type="button" class="btn btn-rounded btn-primary float-right" onclick="ButtonSimpanHeader()">Edit</button><button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Delete</button></div>'+
                        '</div>' +
                        '</div>';
                        
                }
                console.log(Task_DataListInteraction);
                $('#Task_Journey').append(Task_DataListInteraction);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DataTableProduk() {
    var myTable = $('#TrmProduk').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/WS_DataTable",
        data: "{TrxTelepon: '" + getParameterByName("ph") + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
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

                    var d = new Date(json[i].JatuhTempo);
                    var milisegundos = parseInt(json[i].JatuhTempo.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime

                    if (json[i].StatusData == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 60px;'>" + json[i].StatusData +"</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>" + json[i].StatusData +"</span>"
                    }
                    var urlClick = "<div class='dropdown'>" +
                        "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                        "<div class='dropdown-menu dropdown-menu-right'>" +
                        "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                        "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "')><i class='fa fa-trash'></i> Delete</a>" +
                        "<div class='dropdown-divider'></div>" +
                        "</div>" +
                        "</div>"
                    myTable.row.add([json[i].ID, json[i].ProdukName, json[i].DetailProdukName, json[i].TeleponHubungan, ConverTanggal, TrxParam, urlClick]).draw(false);

                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    LoadComboProduk();
}
function LoadComboProduk() {
    var ComboProduk = $('#ComboProduk');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK90'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            ComboProduk.empty()
            for (i = 0; i < json.length; i++) {
                //if (getParameterByName("id") == "" || getParameterByName("id") == null) {
                result = '<option value="' + json[i].ID + '">' + json[i].Produk + '</option>';
                //} else {
                //    result = '<option value="' + getParameterByName("id") + '" selected=true>' + getParameterByName("id") + '</option>';
                //}
                ComboProduk.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ChangeComboProduk() {
    var selectedText = $("#ComboProduk").find("option:selected").text();
    var selectedValue = $("#ComboProduk").val();
    var VariabelComboDetailProduk = $('#ComboDetailProduk');
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK92'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultDetailProduk = "";

            VariabelComboDetailProduk.empty();
            for (i = 0; i < json.length; i++) {

                ResultDetailProduk = '<option value="' + json[i].ID + '">' + json[i].ProdukDetailName + '</option>';
                VariabelComboDetailProduk.append(ResultDetailProduk);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionSimpanProduk() {
    var HeaderID = getParameterByName("id")
    var Telepon = getParameterByName("ph")
    var form_data = JSON.stringify({
        Telepon: Telepon, HeaderID: $("#ContentPlaceHolder1_TrxTransaksiID").val(), ProdukID: $("#ComboProduk").val(), DetailProdukID: $("#ComboDetailProduk").val(),
        JatuhTempo: $("#JatuhTempo").val(), TeleponHubungan: $("#NomorTeleponKeluarga").val(), Hubungan: $("#ComboHubungan").val(),
        Status: $("#ComboStatus").val(), Keterangan: $("#KeteranganProduk").val(), UserName: $("#hd_sessionLogin").val()
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
                    url: "asmx/Tele_TrxTransaksi.asmx/SimpanProduk",
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
                                    'Insert Produk Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-produk").modal('hide');
                                    DataTableProduk();
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Produk Has Been Failed',
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
function DialCall() {
    swal({
        title: "Do you want to call?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                console.log("Dial Call");
                const Http = new XMLHttpRequest();
                const url = "https://cloud.uidesk.id:60024/dial/telp=" + $("#ContentPlaceHolder1_TrxTelepon").val()
                console.log("url" + url)
                Http.open("GET", url);
                Http.send();

                $("#SimpanTransaksi").css("display", "none")
                $("#DialCalls").css("display", "none")
                $("#DropCalls").css("display", "block")

            } else {
                window.location.reload();
            }
        });
}
function EditNasabah() {
    $("#modal-customer").modal('show');
    var selectedValue = getParameterByName("id");
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTransaksi.asmx/UIDESK_TrmMaster",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxTransaksiID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK73'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                $('#UpdateNama').val(json[i].Name);
                $('#UpdateEmail').val(json[i].Email);
                $('#UpdateTelpon').val(json[i].Telepon);
                if (json[i].Gender == "Pria") {
                    $("#UpdateComboGender option:selected").val("1");
                } else {
                    $("#UpdateComboGender option:selected").val("2");
                }
                $('#UpdateJobTittle').val(json[i].JobTitle);
                $('#UpdateAlamat').val(json[i].Address);
                $('#UpdateNegara').val(json[i].Negara);
                $('#UpdateProvinsi').val(json[i].Provinsi);
                $('#UpdateKota').val(json[i].Kota);
                $('#UpdateZipCode').val(json[i].KodePos);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}