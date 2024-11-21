$(document).ready(function () {
    TrxHelpdeskTransaction();
    TrxHistoryOutbound();
    SelectOutboundReason();
    SelectOutboundStatus();
    SelectProfileCustomer(getParameterByName("phonenumber"))
    GetWS_JourneyOutboundNote();
    GetWS_JourneyOutboundReminder();
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
                    const url = "http://localhost:60024/dial/telp="+ getParameterByName("phonenumber")
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
        $("#btnCancelOutbound").css("display", "block")
        $("#btnSubmitOutbound").css("display", "block")
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
                    const url = "http://localhost:60024/drop/telp=" + getParameterByName("phonenumber")
                    Http.open("GET", url);
                    Http.send();

                    Http.onreadystatechange = (e) => {
                        console.log(Http.responseText)
						//window.close();
                    }
                    

                }
            });
			
       
    });
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function TrxHistoryOutbound() {
    //alert(getParameterByName("phonenumber"))
    var JenisKondisi = "AllWhereData";
    var NamaView = "UIDESK_TrxOutboundHeader";
    var KondisiData = "Where call_phone_number='" + getParameterByName("phonenumber") + "' and call_status <> '0'";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    var myTable = $('#TrxHistoryOutbound').DataTable();
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
                var d = new Date(json[i].call_created_date);
                var milisegundos = parseInt(json[i].call_created_date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].call_status == "Open") {
                    var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 70px;'>" + json[i].call_status + "</span>"
                } else if (json[i].call_status == "Pending") {
                    var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 70px;'>" + json[i].call_status + "</span>"
                } else if (json[i].call_status == "Progress") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 70px;'>" + json[i].call_status + "</span>"
                } else if (json[i].call_status == "Closed") {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 70px;'>" + json[i].call_status + "</span>"
                }
                myTable.row.add([json[i].id, json[i].call_product_campaign, reasoncallnya, TrxParam, json[i].call_agent, newDate + ' ' + newTime]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrxHelpdeskTransaction() {
    var JenisKondisi = "AllWhereData";
    var NamaView = "tticket";
    var KondisiData = "Where AccountInbound='" + getParameterByName("phonenumber") + "'";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    var myTable = $('#TrxHelpdeskTransaction').DataTable();
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
                if (json[i].Status == "Open") {
                    var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 70px;'>" + json[i].Status + "</span>"
                } else if (json[i].Status == "Pending") {
                    var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 70px;'>" + json[i].Status + "</span>"
                } else if (json[i].Status == "Solved") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 70px;'>" + json[i].Status + "</span>"
                } else if (json[i].Status == "Closed") {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 70px;'>" + json[i].Status + "</span>"
                }
                myTable.row.add([json[i].TicketNumber, json[i].CategoryName, TrxParam, json[i].SLA, json[i].UserCreate, newDate + ' ' + newTime]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SelectProfileCustomer() { 
    var form_data = JSON.stringify({ TrxID: getParameterByName("id"), TrxPhoneNumber: getParameterByName("phonenumber") });
    $.ajax({
        url: "asmx/TrxOutboundCall.asmx/TransactionOutboundHeader",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            console.log("SelectProfileCustomer : " + form_data)

            var json = JSON.parse(data.d);
            var i, x = "";
            for (i = 0; i < json.length; i++) {

                $("#Outbound_Fullname").val(json[i].call_name);
                $("#Outbound_Email").val(json[i].call_email);
                $("#Outbound_PhoneNumber").val(json[i].call_phone_number);
                $('#Gender' + json[i].call_jenis_kelamin + '_Outbound').prop('checked', true);
                $("#Outbound_PolisNumber").val(json[i].call_polis_number);
                $("#Outbound_NamaTertanggung").val(json[i].call_nama_tertanggung);
                $("#Outbound_UangPertanggungan").val(json[i].call_uang_pertanggungan_format);
                $("#CmbTypeNasabah").val(json[i].call_flaging_nasabah);
                $("#Outbound_TglPendebetan").val(json[i].call_tanggal_debet);
                $("#Outbound_NamaProduct").val(json[i].call_nama_product);
                if (json[i].call_premi_dasar_berkala == "0") {
                    $("#Outbound_PremiDasarBerkala").val("0");
                } else {
                    $("#Outbound_PremiDasarBerkala").val(json[i].call_premi_dasar_berkala_format);
                }
                if (json[i].call_premi_topup == "0") {
                    $("#Outbound_PremiTopUp").val("0");
                } else {
                    $("#Outbound_PremiTopUp").val(json[i].call_premi_topup_format);
                }
                $("#Outbound_CaraBayar").val(json[i].call_cara_bayar);
                $("#Outbound_NamaTenagaPenjualan").val(json[i].call_nama_tenaga_penjualan);
                var milisegundos = parseInt(json[i].call_nominal_COI.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var TglePolis = newDate.split('/');
                $("#Outbound_NominalCOI").val(TglePolis[2] + "-" + TglePolis[1] + "-" + TglePolis[0]);
                var milisegundos = parseInt(json[i].call_nominal_COR.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var TglTransaksi = newDate.split('/');
                $("#Outbound_NominalCOR").val(TglTransaksi[2] + "-" + TglTransaksi[1] + "-" + TglTransaksi[0]);
                $("#Outbound_BiayaAkuisisi1").val(json[i].call_biaya_akuisisi_1);
                $("#Outbound_BiayaAkuisisi2").val(json[i].call_biaya_akuisisi_2);
                $("#ContentPlaceHolder1_TrxPolisNumber").val(json[i].call_polis_number)
                $("#ContentPlaceHolder1_TrxUploadID").val(json[i].call_upload_id)
                if (json[i].call_biaya_akuisisi_1_add == "0") {
                    $("#Outbound_BiayaAkuisisi1add").val("0");
                } else {
                    $("#Outbound_BiayaAkuisisi1add").val(json[i].call_biaya_akuisisi_1_add_format);
                }
                if (json[i].call_biaya_akuisisi_2_add == "0") {
                    $("#Outbound_BiayaAkuisisi2add").val("0");
                } else {
                    $("#Outbound_BiayaAkuisisi2add").val(json[i].call_biaya_akuisisi_2_add_format);
                }
                if (json[i].call_biaya_akuisisi_3_add == "0") {
                    $("#Outbound_BiayaAkuisisi3add").val("0");
                } else {
                    $("#Outbound_BiayaAkuisisi3add").val(json[i].call_biaya_akuisisi_3_add_format);
                }
                if (json[i].call_biaya_akuisisi_4_add == "0") {
                    $("#Outbound_BiayaAkuisisi4add").val("0");
                } else {
                    $("#Outbound_BiayaAkuisisi4add").val(json[i].call_biaya_akuisisi_4_add_format);
                }
                if (json[i].call_biaya_akuisisi_5_add == "0") {
                    $("#Outbound_BiayaAkuisisi5add").val("0");
                } else {
                    $("#Outbound_BiayaAkuisisi5add").val(json[i].call_biaya_akuisisi_5_add_format);
                }
                TrmWaris(json[i].call_upload_id,json[i].call_polis_number);
                if (json[i].call_status == "Closed") {
                    $("#btnCancelOutbound").css("display", "none");
                    $("#btnSubmitOutbound").css("display", "none");
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
function SelectOutboundReason() {
    var Select_Outbound_Reason = $('#Select_Outbound_Reason');
    var JenisKondisi = "AllWhereData";
    var NamaTable = "UIDESK_TrmReasonCall";
    var KondisiData = "";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
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

                result = '<option value="' + json[i].ID + '">' + json[i].ReasonCall + '</option>';
                Select_Outbound_Reason.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SelectOutboundStatus() {
    var Select_Outbound_Status = $('#Select_Outbound_Status');
    var JenisKondisi = "AllWhereData";
    var NamaTable = "UIDESK_TrxOutboundCallStatus";
    var KondisiData = "";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
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

                result = '<option value="' + json[i].status + '">' + json[i].status + '</option>';
                Select_Outbound_Status.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function post_WS_OutboundCall() {
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxCallid = getParameterByName("id")
    var TrxPhoneNumber = getParameterByName("phonenumber")
    var TrxReasonCode = $("#Select_Outbound_Reason").val();
    var TrxCallStatus = $("#Select_Outbound_Status").val();
    var TrxEscalationTicket = $("#Select_Outbound_Ticaket").val();
    var TrxResponse = CKEDITOR.instances.Outbound_Callnote.getData();
    if (TrxUserName == "") {
        swal("UserName is empty, Please relogin your system")
        return false;
    }
    if (TrxCallid == "") {
        swal("Transaction is empty")
        return false;
    }
    if (TrxPhoneNumber == "") {
        swal("Phone Number is empty")
        return false;
    }
    if (TrxReasonCode == "" || TrxReasonCode == "Select") {
        swal("Reason Call is empty")
        return false;
    }
    if (TrxCallStatus == "" || TrxCallStatus == "Select") {
        swal("Call Status is empty")
        return false;
    }
    if (TrxEscalationTicket == "" || TrxEscalationTicket == "Select") {
        swal("Escalation ticket is empty")
        return false;
    }
    if (TrxResponse == "") {
        swal("Description Call is empty")
        return false;
    }
    event.preventDefault();
    var form = document.forms["myForm"];
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxUserName: TrxUserName, TrxCallid: TrxCallid, TrxPhoneNumber: TrxPhoneNumber, TrxReasonCode: TrxReasonCode, TrxCallStatus: TrxCallStatus, TrxEscalationTicket: TrxEscalationTicket, TrxResponse: encodeData(TrxResponse) });
                $.ajax({
                    url: "asmx/TrxOutboundCall.asmx/InsertTransactionOutboundCall",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i;

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Transaction Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#Select_Outbound_Reason").val("");
                                    $("#Select_Outbound_Status").val("");
                                    $("#Select_Outbound_Ticaket").val("");
                                    CKEDITOR.instances.Outbound_Callnote.setData("");
                                    window.close()
                                });
                            } else {
                                swal(
                                    '',
                                    'Transaction Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                            }
                        }                       
                        //swal("Done", {
                        //    icon: "success",
                        //});
                        //alert("sss")
                        //window.location.href = "TrxOutboundCall.aspx?id=" + getParameterByName("id") + "&phonenumber=" + getParameterByName("phonenumber") +""
                        //window.top.close();
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
function post_WS_CancelOutboundCall() {
    window.top.close();
}
function post_WS_OutboundReminder() {
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxCallid = getParameterByName("id")
    var TrxPhoneNumber = getParameterByName("phonenumber")
    var TrxReminderSubject = $("#Reminder_Subject").val();
    var TrxReminderStatus = $("#Select_Reminder_Status").val();
    var TrxReminderDate = $("#Reminder_Date").val();
    var TrxReminderDescription = CKEDITOR.instances.Reminder_Description.getData();
    if (TrxUserName == "") {
        swal("UserName is empty, Please relogin your system")
        return false;
    }
    if (TrxCallid == "") {
        swal("Transaction is empty")
        return false;
    }
    if (TrxPhoneNumber == "") {
        swal("Phone Number is empty")
        return false;
    }
    if (TrxReminderSubject == "") {
        swal("Subject is empty")
        return false;
    }
    if (TrxReminderStatus == "") {
        swal("Status is empty")
        return false;
    }
    if (TrxReminderDate == "") {
        swal("Date is empty")
        return false;
    }
    if (TrxReminderDescription == "") {
        swal("Description is empty")
        return false;
    }
    event.preventDefault();
    var form = document.forms["myForm"];
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxUserName: TrxUserName, TrxCallid: TrxCallid, TrxPhoneNumber: TrxPhoneNumber, TrxReminderSubject: TrxReminderSubject, TrxReminderStatus: TrxReminderStatus, TrxReminderDate: TrxReminderDate, TrxReminderDescription: encodeData(TrxReminderDescription) });
                $.ajax({
                    url: "asmx/TrxOutboundCall.asmx/InsertTransactionReminderOutbound",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        swal("Done", {
                            icon: "success",
                        });

                        $("#Reminder_Subject").val("");
                        $("#Select_Reminder_Status").val("");
                        $("#Reminder_Date").val("");
                        CKEDITOR.instances.Reminder_Description.setData("");
                        window.location.href = "TrxOutboundCall.aspx?id=" + getParameterByName("id") + "&phonenumber=" + getParameterByName("phonenumber") + ""
                        //window.top.close();

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
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function GetWS_JourneyOutboundNote() {
    var JenisKondisi = "AllWhereData";
    var dataJourney = "";
    var iconChannel = "";
    var channelDesc = "";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "TrmViewTransaksiOutboundDetail", paramQuery: "where call_outbound_id='" + getParameterByName("id") + "' order by call_date Asc" });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";
            if (json.length == 0) {               
                $("#usertimeline").css("display", "none");
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].call_date);
                    var milisegundos = parseInt(json[i].call_date.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    dataJourney += '<span class="timeline-label">' +
                        //'<span class="badge badge-pill badge-primary badge-lg">'+ json[i].AgentCreateX +'</span>' +
                        '<img alt="Profile" src="../images/icon/call.png" class="avatar mr-10">' +
                        '</span>' +
                        '<span class="timeline-label">' +
                        '<span class="badge badge-pill badge-primary badge-lg">' + json[i].call_reason_detail + '</span>' +
                        '</span>' +
                        '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].call_agent_name + '</p>' +
                        '<div class="timeline-body">' +
                        '' + json[i].call_description_detail + '' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + "-" + newTime + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                console.log(dataJourney);
                //$("#P_TicketNumberJourney").append("<i class='fa fa-ticket'></i> " + getParameterByName("phonenumber"));
                $('#Journey_OutboundNote').append(dataJourney);
            }       
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log("Response " + xmlHttpRequest.responseText);
            console.log("Text " + textStatus);
            console.log("Err " + errorThrown);
        }
    })
}
function GetWS_JourneyOutboundReminder() {
    var JenisKondisi = "AllWhereData";
    var dataJourney = "";
    var iconChannel = "";
    var channelDesc = "";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "TrmViewTransaksiOutboundReminder", paramQuery: "where call_outbound_id='" + getParameterByName("id") + "' order by call_reminder_date Asc" });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";
            
            if (json.length == 0) {
                    $("#divReminder").css("display", "none");
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].call_reminder_date);
                    var milisegundos = parseInt(json[i].call_reminder_date.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    dataJourney += '<span class="timeline-label">' +
                        '<img alt="Profile" src="../images/icon/call.png" class="avatar mr-10">' +
                        '</span>' +
                        '<span class="timeline-label">' +
                        '<span class="badge badge-pill badge-primary badge-lg">' + json[i].call_reminder_subject + '</span>' +
                        '</span>' +
                        '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].call_agent_name + '</p>' +
                        '<div class="timeline-body">' +
                        '' + json[i].call_reminder_description + '' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + "-" + newTime + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                console.log(dataJourney);
                $('#Journey_ReminderNote').append(dataJourney);

            }
          
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log("Response " + xmlHttpRequest.responseText);
            console.log("Text " + textStatus);
            console.log("Err " + errorThrown);
        }
    })
}
function get_OutboundStatus() {
    if ($("#Select_Outbound_Status").val() != "Closed") {
        $("#Select_Outbound_Ticaket").val("No");
        $('#Select_Outbound_Ticaket').attr("disabled", true);
    } else {
        $("#Select_Outbound_Ticaket").val("");
        $('#Select_Outbound_Ticaket').attr("disabled", false);
    }
}
function action_call() {
    //var call = 'javascript: var server = "localhost:60024"; void 0; { return "http://" + server + "/" + a + "/Telp=' + getParameterByName("phonenumber") + '/id=' + getParameterByName("id") + '" };';
    //var call = "http://localhost:60024/dial/telp=" + getParameterByName("phonenumber")
    //console.log(call)
    //document.location.href = call;

    var call = 'javascript: var server = "localhost:60024"; _dial(); void 0; function _dial() { var a = new Image(1, 1); a.src = _formatCommand("dial") } function _formatCommand(a) { return "http://" + server + "/dial/telp=' + getParameterByName("phonenumber") + '" };';
    document.location.href = call;

    var drop = ""
    drop ='<div id="chat-box-body" onclick="action_drop()">' +
        '<div id ="chat-circle" class="waves-effect waves-circle btn btn-circle btn-lg btn-danger l-h-70">' +
            '<div id="chat-overlay"></div>' +
        '<span class="mdi mdi-phone-locked font-size-30"></span>' +
        '</div>' +
    '</div>'
    $("#divdrop").append(drop)  
}
function action_drop() {
    var calldrop = "http://localhost:60024/drop/telp=" + getParameterByName("phonenumber")
    console.log(calldrop)
    document.location.href = calldrop;
    //var dropcall = 'javascript: var server = "localhost:60024"; _dial(); void 0; function _dial() { var a = new Image(1, 1); a.src = _formatCommand("dial") } function _formatCommand(a) { return "http://" + server + "/" + a + "/Telp=' + getParameterByName("phonenumber") + '/id=' + getParameterByName("id") + '" };';
    //document.location.href = dropcall;
}
function TrmWaris(upload_id, PolisNumber) {
    var JenisKondisi = "AllWhereData";
    var NamaView = "UIDESK_TrxOutbound_NamaAhliWaris";
    var KondisiData = "Where call_upload_id='" + upload_id +"' and call_polis_number = '" + PolisNumber + "' order by id asc"
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    console.log("Table TrmWaris " + jsonText)
    var myTable = $('#TrmWaris').DataTable();
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

                myTable.row.add([json[i].call_nama_ahli_waris]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionRider() {  
    TrmRider($("#ContentPlaceHolder1_TrxUploadID").val(),$("#ContentPlaceHolder1_TrxPolisNumber").val());
}
function ActionFund() {
    TrmFund($("#ContentPlaceHolder1_TrxUploadID").val(),$("#ContentPlaceHolder1_TrxPolisNumber").val());
}
function TrmRider(upload_id, PolisNumber) {
    var JenisKondisi = "AllWhereData";
    var NamaView = "TrmViewOutboundRider";
    var KondisiData = "Where call_upload_id='" + upload_id +"' and call_polis_number = '" + PolisNumber + "' order by id asc"
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    console.log("Table TrmRider " + jsonText)
    var myTable = $('#TrmRider').DataTable();
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

                myTable.row.add([json[i].call_manfaat, json[i].call_nominal_format]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmFund(upload_id, PolisNumber) {
    var JenisKondisi = "AllWhereData";
    var NamaView = "UIDESK_TrxOutbound_Fund";
    var KondisiData = "Where call_upload_id='" + upload_id +"' and call_polis_number = '" + PolisNumber + "' order by id asc"
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    console.log("Table TrmFund " + jsonText)
    var myTable = $('#TrmFund').DataTable();
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

                myTable.row.add([json[i].call_jenis_investasi, json[i].call_persentase_alokasi +  "%"]).draw(false);

            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//$(document).ready(function () {
//    $('#link1').click(function (e) {
//        console.log("Adad");
//        const Http = new XMLHttpRequest();
//        const url = 'http://localhost:60024/dial/telp=08119970461';
//        Http.open("GET", url);
//        Http.send();

//        Http.onreadystatechange = (e) => {
//            console.log(Http.responseText)
//        }
//        //window.location= "http://google.com";

//        /*var dropcall = 'javascript: var server = "localhost:60024"; _dial(); void 0; function _dial() { var a = new Image(1, 1); a.src = _formatCommand("dial") } function _formatCommand(a) { return "http://" + server + "/" + a + "/Telp=' + getParameterByName("phonenumber") + '/id=' + getParameterByName("id") + '" };';
//        window.location= dropcall;*/
//    });
//});