$(document).ready(function () {
    $("#LoaderPage").hide();
    TrmTaskboardCounting();
    TrxTaskboardCall("0");
    //ListCallPendingAgent;
    ListCallPreviousDays();
    $("#Searching_Previous").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            SearchingCallPreviousDays($(this).val());
        } else if (jumlahString == 0) {
            SearchingCallPreviousDays($(this).val(""));
        }
    });
    //ListCallTodayNotClosed();
    $("#Searching_TodayNotClosed").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            SearchingCallTodayNotClosed($(this).val());
        } else if (jumlahString == 0) {
            SearchingCallTodayNotClosed($(this).val(""));
        }
    });
    ListCallActivity()
    $("#searching_activity").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            SearchingCallActivity($(this).val());
        } else if (jumlahString == 0) {
            SearchingCallActivity($(this).val(""));
        }
    });
    
    $("#Agent_Name").append("Welcome To " + $("#hd_NameKaryawan").val());
    //TrmPendingCounting();
    $("#Reminder_Searching").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            SearchingOutboundReminder($(this).val());
        } else if (jumlahString == 0) {
            SearchingOutboundReminder($(this).val(""));
        }
    });
});
function TrmTaskboardCounting() {
    var TrxUserName = $("#hd_sessionLogin").val();
    var messageDiv = $('#divcountingCall');
    $.ajax({
        type: "POST",
        url: "asmx/TrxTaskboardCall.asmx/AgentCountingCall",
        data: "{TrxUserName: '" + TrxUserName + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            messageDiv.empty();
            for (i = 0; i < json.length; i++) {

                result = ' <div class="col-12 col-lg-3" onclick="ClickdataTaskboard(' + json[i].Flag + ')" style="cursor:pointer;">' +
                            '<div class="box-body br-1 border-light">' +
                                '<div class="flexbox mb-1">' +
                                    '<span>' +
                                        '<i class="mdi ' + json[i].Icon + ' font-size-30"></i>' +
                                        '<br>' +
                                        '' + json[i].Type + '' +
                                    '</span>' +
                               '<span class="text-' + json[i].Color + ' font-size-30">' + json[i].AgentCallCounting + '</span>' +
                               '</div>' +
                               '<div class="progress progress-xxs mt-10 mb-0">' +
                               '<div class="progress-bar bg-' + json[i].Color + '" role="progressbar" style="width: 50%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>' +
                               '</div>' +
                           '</div>' +
                        '</div>'

                messageDiv.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrxTaskboardCall(sValue) {
    var TsToday = new Date();
    var TsHari = TsToday.getDate();
    var TsBulan = TsToday.getMonth() + 1;
    var TsTahun = TsToday.getFullYear();
    var TsFulldate = TsTahun + "-" + TsBulan + "-" + TsHari + ""

    var TrxUserName = $("#hd_sessionLogin").val();
    if (sValue == "0") {
        var KondisiData = "Where call_agent='" + TrxUserName + "' and (call_reason <> 'Done' and call_reason <> 'Done Approved' and call_reason <> 'Done Not Approved' and call_reason <> 'Unregistered' and call_reason <> 'Wrong Number' or call_reason is null) and call_counting < (select call_jumlah from UIDESK_TrmReasonCallParamater) and call_upload_status='1' And call_created_date between '" + TsFulldate + " 00:01' And '" + TsFulldate +" 23:59'";
    } else if (sValue == "1") {
        var KondisiData = "Where call_agent='" + TrxUserName + "' and (call_reason <> 'Done' and call_reason <> 'Done Approved' and call_reason <> 'Done Not Approved' and call_reason <> 'Unregistered' and call_reason <> 'Wrong Number' or call_reason is null) and call_counting < (select call_jumlah from UIDESK_TrmReasonCallParamater) and call_upload_status='1' And call_created_date between '" + TsFulldate + " 00:01' And '" + TsFulldate +" 23:59'";
    } else if (sValue == "2") {
        var KondisiData = "Where call_agent='" + TrxUserName + "' And call_status <> '0' And call_created_date between '" + TsFulldate + " 00:01' And '" + TsFulldate +" 23:59'";
    } else if (sValue == "3") {
        var KondisiData = "Where call_agent='" + TrxUserName + "' and call_status = '0' and call_upload_status = '1' And call_created_date between '" + TsFulldate + " 00:01' And '" + TsFulldate +" 23:59'";
    } else if (sValue == "4") {
        var KondisiData = "Where call_agent='" + TrxUserName + "' and call_selesai = '1' And call_created_date between '" + TsFulldate + " 00:01' And '" + TsFulldate +" 23:59'";
    }
    var JenisKondisi = "AllWhereData";
    var NamaView = "TrmViewUIDESK_TrxOutboundHeader";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    var myTable = $('#TrxTaskboardCall').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecordsBigData",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";
            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {
                var urlClick = "<a href='TrxOutboundCall.aspx?id=" + json[i].id + "&phonenumber=" + json[i].call_phone_number_trim + "' target='_blank' class='text-success' data-toggle='tooltip' data-original-title='Follow up'><i class='mdi mdi-phone-log font-size-20' aria-hidden='true'></i></a>"

                if (json[i].call_status == "Open") {
                    var TrxParam = "<span class='badge badge-pill badge-info' style='width: 70px;'>" + json[i].call_status + "</span>"
                } else if (json[i].call_status == "Progress") {
                    var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 70px;'>" + json[i].call_status + "</span>"
                } else if (json[i].call_status == "Pending") {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 70px;'>" + json[i].call_status + "</span>"
                } else if (json[i].call_status == "Closed") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 70px;'>" + json[i].call_status + "</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 70px;'>Ready</span>"
                } 

                myTable.row.add([json[i].id, json[i].call_name, json[i].call_polis_number, json[i].call_email, json[i].call_phone_number,
                    json[i].call_product_campaign, TrxParam, urlClick]).draw(false);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#LoaderPage").hide();
}
function ListCallPendingAgent() {
    //var selectedValue = sValue;
    //console.log("Selected Text: " + selectedValue + " Value: " + selectedValue);
    var TrxUserName = $("#hd_sessionLogin").val();
    var ListCallPending = $('#ListCallPending');
    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_TrxOutboundHeader", paramQuery: "Where call_agent='" + TrxUserName +"' And (call_status<>'1' or call_status<>'2')" });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecordsBigData",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCallPending = "";
            ListCallPending.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultCallPending = '<div class="media media-single" > No data found... </div>';
                ListCallPending.append(resultCallPending);
            } else {
                //ListSearching.append(
                //    '<div class="media media-single">' +
                //    '<a href="#" onclick="Reading(0)"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
                //    '<div class="media-body">' +
                //    '<small class="text-fader"></small>' +
                //    '<h6><a href="#" onclick="Reading(0)">All Campaign Name</a></h6>' +
                //    '<small class="text-fader">All Channel</small>' +
                //    '</div>' +
                //    '</div>');
                for (i = 0; i < json.length; i++) {
                    resultCallPending = '<div class="media media-single">' +
                        '<a href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
                        '<div class="media-body">' +
                        '<small class="text-fader"></small>' +
                        '<h6><a href="#" onclick="Reading(' + json[i].id + ')">' + json[i].call_name + '</a></h6>' +
                        '<small class="text-fader">' + json[i].call_phone_number + '</small> - ' +
                        '<small class="text-fader">' + json[i].call_product_campaign + '</small>' +
                        '</div>' +
                        '</div>'
                    ListCallPending.append(resultCallPending);
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
function SearchingCallPendingAgent(sValue) {
    var selectedValue = sValue;
    console.log("Selected Text: " + selectedValue + " Value: " + selectedValue);
    var ListCallPending = $('#ListCallPending');
    if (selectedValue == "") {
        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_TrxOutboundHeader", paramQuery: "Where call_upload_status='0'" }); 
    } else {
        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_TrxOutboundHeader", paramQuery: "Where (call_name like'%" + selectedValue + "%' or call_phone_number like'%" + selectedValue + "%' or call_product_campaign like'%" + selectedValue + "%' or call_email like'%" + selectedValue +"%') and call_upload_status='0'" });
    }
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCallPending = "";
            ListCallPending.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultCallPending = '<div class="media media-single" > No data found... </div>';
                ListCallPending.append(resultCallPending);
            } else {
                //ListSearching.append(
                //    '<div class="media media-single">' +
                //    '<a href="#" onclick="Reading(0)"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
                //    '<div class="media-body">' +
                //    '<small class="text-fader"></small>' +
                //    '<h6><a href="#" onclick="Reading(0)">All Campaign Name</a></h6>' +
                //    '<small class="text-fader">All Channel</small>' +
                //    '</div>' +
                //    '</div>');
                for (i = 0; i < json.length; i++) {
                    resultCallPending = '<div class="media media-single">' +
                        '<a href="#"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
                        '<div class="media-body">' +
                        '<small class="text-fader"></small>' +
                        '<h6><a href="#" onclick="Reading(' + json[i].id + ')">' + json[i].call_name + '</a></h6>' +
                        '<small class="text-fader">' + json[i].call_phone_number + '</small>-' +
                        '<small class="text-fader">' + json[i].call_product_campaign + '</small>' +
                        '</div>' +
                        '</div>'
                    ListCallPending.append(resultCallPending);
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
function modulReminder() {
    $("#modal-right").modal('show')
    ListCallReminder();
}
//function ListOutboundReminder() {
//    var TrxUserName = $("#hd_sessionLogin").val();
//    var ListCallReminder = $('#ListCallReminder');
//    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_TrxOutboundReminder", paramQuery: "Where call_agent='" + TrxUserName + "'" });
//    $.ajax({
//        type: "POST",
//        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
//        data: jsonText,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            var json = JSON.parse(data.d);
//            var i, x, resultCallReminder = "";

//            ListCallReminder.empty();
//            if (json.length == 0) {
//                console.log("data not found " + i);
//                resultCallReminder = '<div class="media media-single" > No data found... </div>';
//                ListCallReminder.append(resultCallReminder);
//            } else {
//                for (i = 0; i < json.length; i++) {

//                    resultCallReminder = '<div class="media media-single">' +
//                        '<a href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
//                        '<div class="media-body">' +
//                        '<small class="text-fader"></small>' +
//                        '<h6><a href="#" onclick="Reading(' + json[i].id + ')">' + json[i].call_name + '</a></h6>' +
//                        '<small class="text-fader">' + json[i].call_phone_number + '</small> <br> ' +
//                        '<small class="text-fader">' + json[i].call_reminder_subject + '</small>' +
//                        '</div>' +
//                        '</div>'
//                    ListCallReminder.append(resultCallReminder);
//                }
//            }

//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    })
//    $("#LoaderPage").hide();
//}
function SearchingOutboundReminder(sValue) {
    var selectedValue = sValue;
    console.log("Selected Text: " + selectedValue + " Value: " + selectedValue);
    var TrxUserName = $("#hd_sessionLogin").val();
    var ListCallReminder = $('#ListCallReminder');
    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_TrxOutboundReminder", paramQuery: "Where call_agent='" + TrxUserName + "' And (call_name like'%" + selectedValue + "%' or call_reminder_subject like'%" + selectedValue + "%' or call_phone_number like'%" + selectedValue + "%')" });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCallReminder = "";

            ListCallReminder.empty();
            if (json.length == 0) {
                console.log("data not found " + i);
                resultCallReminder = '<div class="media media-single" > No data found... </div>';
                ListCallReminder.append(resultCallReminder);
            } else {
                for (i = 0; i < json.length; i++) {
                    resultCallReminder = '<div class="media media-single">' +
                        '<a href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
                        '<div class="media-body">' +
                        '<small class="text-fader"></small>' +
                        '<h6><a href="#" onclick="Reading(' + json[i].id + ')">' + json[i].call_name + '</a></h6>' +
                        '<small class="text-fader">' + json[i].call_phone_number + '</small><br> ' +
                        '<small class="text-fader">' + json[i].call_reminder_subject + '</small>' +
                        '</div>' +
                        '</div>'
                    ListCallReminder.append(resultCallReminder);
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
function ClickdataTaskboard(sValue) {
    $("#LoaderPage").show();
    TrxTaskboardCall(sValue);
}
function ListCallPreviousDays() {
    var FUtoday = new Date();
    var FUhari = FUtoday.getDate();
    var FUbulan = FUtoday.getMonth() + 1;
    var FUtahun = FUtoday.getFullYear();
    var FUfulldate = FUtahun + "-" + FUbulan + "-" + FUhari + ""

    var TrxUserName = $("#hd_sessionLogin").val();
    var ListCallPrevious = $('#previous_day_call');
    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "TrmViewOutboundHeader", paramQuery: "Where call_agent='" + TrxUserName + "' and (call_reason <> 'Done' and call_reason <> 'Done Approved' and call_reason <> 'Done Not Approved' and call_reason <> 'Unregistered' and call_reason <> 'Wrong Number' or call_reason is null) and call_counting < (select call_jumlah from UIDESK_TrmReasonCallParamater) And (call_status = '0' or call_status <> 'Closed') And call_created_date < '" + FUfulldate + "'" });
    console.log("ListCallPreviousDays " + jsonText)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecordsBigData",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCallPrevious = "";
            ListCallPrevious.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultCallPrevious = '<div class="media media-single" > No data found... </div>';
                ListCallPrevious.append(resultCallPrevious);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].call_jenis_kelamin == "Wanita") {
                        var JenisKelamin = "<img src ='../images/avatar/1.jpg' alt='...'> "
                    } else {
                        var JenisKelamin = "<img src ='../images/avatar/8.jpg' alt='...'> "
                    }
                    if (json[i].call_status == "Open") {
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    }
                    resultCallPrevious = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
                                            '<div class="media py-10 px-0">' +
                                            '<a class="avatar avatar-lg status-success" href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank">' +
                                            '' + JenisKelamin + '' +
                                            '</a> ' +
                                            '<div class="media-body"> ' +
                                            '<p class="font-size-16"> ' +
                                            '<a class="hover-primary" href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank"> <strong>' + json[i].call_name + '</strong></a> ' +
                                            '</p> ' +
                                            '<p> ' + json[i].call_polis_number + '</p> ' +
                                            '<p> ' + json[i].call_phone_number + '</p> ' +
                                            '' + TrxParam + '' +
                                            '</div> ' +
                                         '</div> '
                        ListCallPrevious.append(resultCallPrevious);
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
function SearchingCallPreviousDays() {
    var FUtoday = new Date();
    var FUhari = FUtoday.getDate();
    var FUbulan = FUtoday.getMonth() + 1;
    var FUtahun = FUtoday.getFullYear();
    var FUfulldate = FUtahun + "-" + FUbulan + "-" + FUhari + ""

    var TrxUserName = $("#hd_sessionLogin").val();
    var ListCallPrevious = $('#previous_day_call');
    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "TrmViewOutboundHeader", paramQuery: "Where call_agent='" + TrxUserName + "' and (call_reason <> 'Done' and call_reason <> 'Done Approved' and call_reason <> 'Done Not Approved' and call_reason <> 'Unregistered' and call_reason <> 'Wrong Number' or call_reason is null) And call_counting < (select call_jumlah from UIDESK_TrmReasonCallParamater) And (call_status<>'0' or call_status<>'Closed') And call_created_date < '" + FUfulldate + "' And (Call_name like'%" + $("#Searching_Previous").val() + "%' or call_phone_number like'%" + $("#Searching_Previous").val() + "%' or call_status like'%" + $("#Searching_Previous").val() + "%' or call_polis_number like'%" + $("#Searching_Previous").val() + "%')" });
    console.log("ListCallPreviousDays " + jsonText)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCallPrevious = "";
            ListCallPrevious.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultCallPrevious = "<div class='media media-single'> No data found... </div>";
                ListCallPrevious.append(resultCallPrevious);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].call_status == "Open") {
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    }
                    resultCallPrevious = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
                                        '<div class="media py-10 px-0">' +
                                        '<a class="avatar avatar-lg status-success" href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank">' +
                                        '<img src = "../images/avatar/1.jpg" alt = "..."> ' +
                                        '</a> ' +
                                        '<div class="media-body"> ' +
                                        '<p class="font-size-16"> ' +
                                        '<a class="hover-primary" href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank"> <strong>' + json[i].call_name + '</strong></a> ' +
                                        '</p> ' +
                                        '<p> ' + json[i].call_phone_number + '</p> ' +
                                        '' + TrxParam + '' +
                                        '</div> ' +
                                        '</div> '
                    ListCallPrevious.append(resultCallPrevious);
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
function ListCallTodayNotClosed() {
    var today = new Date();
    var hari = today.getDate();
    var bulan = today.getMonth() + 1;
    var tahun = today.getFullYear();
    var fulldate = tahun + "-" + bulan + "-" + hari + ""

    var TrxUserName = $("#hd_sessionLogin").val();
    var ListCallTodayNotClosed = $('#today_not_closed');
    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "TrmViewOutboundHeader", paramQuery: "Where call_agent='" + TrxUserName + "' and (call_reason <> 'Done' and call_reason <> 'Done Approved' and call_reason <> 'Done Not Approved' and call_reason <> 'Unregistered' and call_reason <> 'Wrong Number' or call_reason is null) And call_counting < (select call_jumlah from UIDESK_TrmReasonCallParamater) And (call_status='0' or call_status<>'Closed') And call_created_date between '" + fulldate + " 00:01' And '" + fulldate +" 23:59'" });
    console.log("ListCallTodayNotClosed " + jsonText)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultTodayNotClosed = "";
            ListCallTodayNotClosed.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultTodayNotClosed = '<div class="media media-single" > No data found... </div>';
                ListCallTodayNotClosed.append(resultTodayNotClosed);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].call_jenis_kelamin == "Wanita") {
                        var JenisKelamin = "<img src ='../images/avatar/1.jpg' alt='...'> "
                    } else {
                        var JenisKelamin = "<img src ='../images/avatar/8.jpg' alt='...'> "
                    }
                    if (json[i].call_status == "Open") {
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    }
                    resultTodayNotClosed = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
                                            '<div class="media py-10 px-0">' +
                                            '<a class="avatar avatar-lg status-success" href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank">' +
                                            '' + JenisKelamin + '' +
                                            '</a> ' +
                                            '<div class="media-body"> ' +
                                            '<p class="font-size-16"> ' +
                                            '<a class="hover-primary" href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank"> <strong>' + json[i].call_name + '</strong></a> ' +
                                            '</p> ' +
                                            '<p> ' + json[i].call_polis_number + '</p> ' +
                                            '<p> ' + json[i].call_phone_number + '</p> ' +
                                            '' + TrxParam + '' +
                                            '</div> ' +
                                            '</div> '
                    ListCallTodayNotClosed.append(resultTodayNotClosed);
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
function SearchingCallTodayNotClosed() {
    var today = new Date();
    var hari = today.getDate();
    var bulan = today.getMonth() + 1;
    var tahun = today.getFullYear();
    var fulldate = tahun + "-" + bulan + "-" + hari + ""

    var TrxUserName = $("#hd_sessionLogin").val();
    var ListCallTodayNotClosed = $('#today_not_closed');
    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "TrmViewOutboundHeader", paramQuery: "Where call_agent='" + TrxUserName + "' and (call_reason <> 'Done' and call_reason <> 'Done Approved' and call_reason <> 'Done Not Approved' and call_reason <> 'Unregistered' and call_reason <> 'Wrong Number' or call_reason is null) And call_counting < (select call_jumlah from UIDESK_TrmReasonCallParamater) And (call_status<>'0' or call_status<>'Closed') And call_created_date between '" + fulldate + " 00:01' And '" + fulldate + " 23:59' And (Call_name like'%" + $("#Searching_TodayNotClosed").val() + "%' or call_phone_number like'%" + $("#Searching_TodayNotClosed").val() + "%' or call_status like'%" + $("#Searching_TodayNotClosed").val() + "%' or call_polis_number like'%" + $("#Searching_TodayNotClosed").val() + "%')" });
    console.log("ListCallTodayNotClosed " + jsonText)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultTodayNotClosed = "";
            ListCallTodayNotClosed.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultTodayNotClosed = '<div class="media media-single" > No data found... </div>';
                ListCallTodayNotClosed.append(resultTodayNotClosed);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].call_status == "Open") {
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-success'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    }
                    resultTodayNotClosed = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
                                            '<div class="media py-10 px-0">' +
                                            '<a class="avatar avatar-lg status-success" href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank">' +
                                            '<img src = "../images/avatar/1.jpg" alt = "..."> ' +
                                            '</a> ' +
                                            '<div class="media-body"> ' +
                                            '<p class="font-size-16"> ' +
                                            '<a class="hover-primary" href="TrxOutboundCall.aspx?id=' + json[i].id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank"> <strong>' + json[i].call_name + '</strong></a> ' +
                                            '</p> ' +
                                            '<p> ' + json[i].call_phone_number + '</p> ' +
                                            '' + TrxParam + '' +
                                            '</div> ' +
                                            '</div> '
                    ListCallTodayNotClosed.append(resultTodayNotClosed);
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
function ListCallActivity() {
    var Acttoday = new Date();
    var Acthari = Acttoday.getDate();
    var Actbulan = Acttoday.getMonth() + 1;
    var Acttahun = Acttoday.getFullYear();
    var Actfulldate = Acttahun + "-" + Actbulan + "-" + Acthari + ""

    var TrxUserName = $("#hd_sessionLogin").val();
    var ListActivity = $('#divsearching_activity');
    //var tableName = "UIDESK_TrxOutboundDetail"
    var tableName = "TrmViewTransaksiOutboundDetailHeader"
    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: tableName, paramQuery: "Where call_agent='" + TrxUserName + "' And call_date between '" + Actfulldate + " 00:01' And '" + Actfulldate +" 23:59'" });
    console.log("ListCallActivity " + jsonText)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultActivity = "";
            ListActivity.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultActivity = '<div class="media media-single" > No data found... </div>';
                ListActivity.append(resultActivity);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].call_jenis_kelamin == "Wanita") {
                        var JenisKelamin = "<img src ='../images/avatar/1.jpg' alt='...'> "
                    } else {
                        var JenisKelamin = "<img src ='../images/avatar/8.jpg' alt='...'> "
                    }
                    resultActivity = '<div class="media-list media-list-hover">' +
                        '<div class="media py-10 px-0">' +
                        '<a class="avatar avatar-lg status-success" href="#"> ' +
                        '' + JenisKelamin + '' +
                        '</a> ' +
                        '<div class="media-body"> ' +
                        '<p class="font-size-16"> ' +
                        '<a class="hover-primary" href = "#"> <strong>' + json[i].call_name + '</strong></a> ' +
                        '</p> ' +
                        '<p> ' + json[i].call_phone_number + '</p> ' +
                        '<span> ' + json[i].call_reason_detail + '</span> ' +
                        '</div> ' +
                        '</div> '
                    ListActivity.append(resultActivity);
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
function ListCallReminder() {
    var TrxUserName = $("#hd_sessionLogin").val();
    var ListReminder = $('#divsearching_reminder');
    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "TrmViewTransaksiOutboundReminder", paramQuery: "Where call_agent='" + TrxUserName + "'" });
    console.log("ListReminder " + jsonText)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultReminder = "";
            ListReminder.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultReminder = '<div class="media media-single" > No data found... </div>';
                ListReminder.append(resultReminder);
            } else {
                for (i = 0; i < json.length; i++) {
                    if (json[i].call_jenis_kelamin == "Wanita") {
                        var JenisKelamin = "<img src ='../images/avatar/1.jpg' alt='...'> "
                    } else {
                        var JenisKelamin = "<img src ='../images/avatar/8.jpg' alt='...'> "
                    }
                    resultReminder = '<div class="media-list media-list-hover">' +
                                        '<div class="media py-10 px-0">' +
                                        '<a class="avatar avatar-lg status-success" href="TrxOutboundCall.aspx?id=' + json[i].call_outbound_id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank">' +
                                        '' + JenisKelamin + '' +
                                        '</a> ' +
                                        '<div class="media-body"> ' +
                                        '<p class="font-size-16"> ' +
                        '<a class="hover-primary" href="TrxOutboundCall.aspx?id=' + json[i].call_outbound_id + '&phonenumber=' + json[i].call_phone_number + '" target="_blank"> <strong>' + json[i].call_name + '</strong></a> ' +
                                        '</p> ' +
                                        '<p> ' + json[i].call_phone_number + '</p> ' +
                                        '<span> ' + json[i].call_reminder_subject + '</span> ' +
                                        '</div> ' +
                                        '</div> '
                                    ListReminder.append(resultReminder);
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
function SearchingCallActivity() {
    var Acttoday = new Date();
    var Acthari = Acttoday.getDate();
    var Actbulan = Acttoday.getMonth() + 1;
    var Acttahun = Acttoday.getFullYear();
    var Actfulldate = Acttahun + "-" + Actbulan + "-" + Acthari + ""

    var TrxUserName = $("#hd_sessionLogin").val();
    var ListActivity = $('#divsearching_activity');
    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_TrxOutboundDetail", paramQuery: "Where call_agent='" + TrxUserName + "' And call_date between '" + Actfulldate + " 00:01' And '" + Actfulldate + " 23:59' And (Call_name like'%" + $("#searching_activity").val() + "%' or call_phone_number like'%" + $("#searching_activity").val() + "%' or call_reason_detail like'%" + $("#searching_activity").val() + "%')" });
    console.log("ListCallPreviousDays " + jsonText)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultActivity = "";
            ListActivity.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultActivity = '<div class="media media-single" > No data found... </div>';
                ListActivity.append(resultActivity);
            } else {
                for (i = 0; i < json.length; i++) {
                    resultActivity = '<div class="media-list media-list-hover">' +
                        '<div class="media py-10 px-0">' +
                        '<a class="avatar avatar-lg status-success" href="#"> ' +
                        '<img src="../images/avatar/1.jpg" alt="..."> ' +
                        '</a> ' +
                        '<div class="media-body"> ' +
                        '<p class="font-size-16"> ' +
                        '<a class="hover-primary" href = "#"> <strong>' + json[i].call_name + '</strong></a> ' +
                        '</p> ' +
                        '<p> ' + json[i].call_phone_number + '</p> ' +
                        '<span> ' + json[i].call_reason_detail + '</span> ' +
                        '</div> ' +
                        '</div> '
                    ListActivity.append(resultActivity);
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
//function TrmPendingCounting() {
//    var TrxUserName = $("#hd_sessionLogin").val();
//    $.ajax({
//        type: "POST",
//        url: "asmx/TrxTaskboardCall.asmx/AgentCountingCallPending",
//        data: "{TrxUserName: '" + TrxUserName + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            var json = JSON.parse(data.d);
//            var i, x = "";

//            for (i = 0; i < json.length; i++) {
//                $("#Pending_Counting").append(json[i].PendingCallCounting);
//            }

//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    })
//}