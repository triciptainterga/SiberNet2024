$(document).ready(function () {
    TrmUploadCountingDataCall();
    $("#LoaderPageCounting").hide();
    $("#LoaderToday").hide();
    TrmOutboundHeader("0");
    $("#LoaderPage").hide();
    $("#TrxSearching_Outbound").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            if ($("#ContentPlaceHolder1_TrxSearchingFlag").val() == "5") {
                searchingAgentLogin($(this).val());
            }
        } else if (jumlahString == 0) {
            if ($("#ContentPlaceHolder1_TrxSearchingFlag").val() == "5") {
                searchingAgentLogin($(this).val(""));
            }
        }
    });
    SelectUploadID("1");
    CmbProductCampaign("1");
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
});
function TrmUploadCountingDataCall() {
    var TrxUserName = $("#hd_sessionLogin").val();
    var messageDiv = $('#divCountingDataCall');
    $.ajax({
        type: "POST",
        url: "asmx/TrxUploadOutboundCall.asmx/AdminCountingDataCall",
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
                    '<span class="text-' + json[i].Color + ' font-size-30">' + json[i].AdminCallCounting + '</span>' +
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
function TrmOutboundHeader(sValue) {
    $("#LoaderPageCounting").show();
    var myTable = $('#TrmOutboundHeader').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + sValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK17'}",
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
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].id + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"

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
                    TrxParam, json[i].call_agent]).draw(false);

            }
            $("#LoaderPageCounting").hide();

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function AgentLogin() {
    $("#ContentPlaceHolder1_TrxSearchingFlag").val("5")
    $("#modalright").modal('show');
    searchingAgentLogin("defaultSystem");
}
function TodayNotCall() {
    $("#ContentPlaceHolder1_TrxSearchingFlag").val("3")
    $("#modalright").modal('show');
    searchingTodayNotCall("defaultSystem");
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
function modalUpload() {
    TrmOutboundHeader("1");
    $('#ListUpload').empty();
    $("#divButton").css("display", "none");
    $("#CmbUploadID").val("Select")
    $("#modalLeft").modal('show');
}
function listDataUploadOutbound(sValue) {
    var selectedValue = sValue;
    var ListUpload = $('#ListUpload');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK19'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultUpload = "";

            ListUpload.empty();
            if (json.length == 0) {
                console.log("data not found " + i);
                resultUpload = '<div class="media media-single" > No data found... </div>';
                ListUpload.append(resultUpload);
            } else {
                for (i = 0; i < json.length; i++) {
                    resultUpload = '<div class="media media-single">' +
                        '<a href="#"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
                        '<div class="media-body">' +
                        '<small class="text-fader"></small>' +
                        '<h6><a href="#" onclick="Reading(' + json[i].id + ')">' + json[i].call_name + '</a></h6>' +
                        '<small class="text-fader">' + json[i].call_phone_number + '</small><br>' +
                        '<small class="text-fader">' + json[i].call_product_campaign + '</small>' +
                        '</div>' +
                        '</div>'
                    ListUpload.append(resultUpload);
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
    if ($("#ContentPlaceHolder1_TrxUploadID").val() == "") {
        var UploadID = $("#CmbUploadID").val();
    } else {
        var UploadID = $("#ContentPlaceHolder1_TrxUploadID").val();
    }
    if (UploadID == "Select") {
        swal("Data Upload is empty")
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
            var form_data = JSON.stringify({ call_upload_id: encodeData(UploadID), call_approve_by: $("#ContentPlaceHolder1_TrxUserName").val() });
            $.ajax({
                url: "asmx/TrxUploadOutboundCall.asmx/UpdateUploadOutboundCall",
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
                                'Distribution Data Success',
                                'success'
                            ).then(function () {
                                $("#btn_done").css("display", "none");
                                $("#btn_cancel").css("display", "none");
                                window.location = "TrxUploadOutboundCall.aspx";
                            });
                        } else {
                            swal(
                                '',
                                'Distribution Data Failed',
                                'error'
                            ).then(function () {
                                window.location = "TrxUploadOutboundCall.aspx";
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
function cancelUpload() {
    if ($("#ContentPlaceHolder1_TrxUploadID").val() == "") {
        var UploadID = $("#CmbUploadID").val();
    } else {
        var UploadID = $("#ContentPlaceHolder1_TrxUploadID").val();
    }
    if (UploadID == "Select") {
        swal("Data Upload is empty")
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
            var form_data = JSON.stringify({ call_upload_id: encodeData(UploadID) });
            $.ajax({
                url: "asmx/TrxUploadOutboundCall.asmx/CancelUploadOutboundCall",
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
                                'Transaction has been cancel success, Proccess Upload File Againt',
                                'success'
                            ).then(function () {
                                window.location = "TrxUploadOutboundCall.aspx";
                            });
                        } else {
                            swal(
                                '',
                                'Transaction has been cancel failed',
                                'error'
                            ).then(function () {
                                window.location = "TrxUploadOutboundCall.aspx";
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
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
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
    TrmOutboundHeader(selectedValue);
    TrmSummary(selectedValue);
    ($("#ContentPlaceHolder1_TrxUploadID").val(selectedValue))
    $("#divButton").css("display", "block");
}
function ClickdataTaskboard(sValue) {
    $("#LoaderPageCounting").show();
    TrmOutboundHeader(sValue)
}
function CmbProductCampaign(UploadID) {
    var CmbProductCampaign = $('#CmbProductCampaign');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK75'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            CmbProductCampaign.empty()
            for (i = 0; i < json.length; i++) {

                if (UploadID == "1") {
                    result = '<option value="' + json[i].ID + '">' + json[i].CampaignName + '</option>';
                } else {
                    result = '<option value="' + json[i].ID + '" selected=true>' + json[i].CampaignName + '</option>';
                }
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
function ListCallPreviousDays() {
    var ListCallPrevious = $('#previous_day_call');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK21'}",
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
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    }
                    resultCallPrevious = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
                        '<div class="media py-10 px-0">' +
                        '<a class="avatar avatar-lg status-success" href="#"> ' +
                        '' + JenisKelamin + '' +
                        '</a> ' +
                        '<div class="media-body"> ' +
                        '<p class="font-size-16"> ' +
                        '<a class="hover-primary" href = "#"> <strong>' + json[i].call_name + '</strong></a> ' +
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
    ////$("#LoaderTomorrow").show();
    //var FUtoday = new Date();
    //var FUhari = FUtoday.getDate();
    //var FUbulan = FUtoday.getMonth() + 1;
    //var FUtahun = FUtoday.getFullYear();
    //var FUfulldate = FUtahun + "-" + FUbulan + "-" + FUhari + ""
    //var TrxUserName = $("#hd_sessionLogin").val();
    //var ListCallPrevious = $('#previous_day_call');
    //var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "TrmViewOutboundHeader", paramQuery: "Where (call_reason <> 'Done' and call_reason <> 'Done Approved' and call_reason <> 'Done Not Approved' and call_reason <> 'Unregistered' and call_reason <> 'Wrong Number' or call_reason is null) and call_counting < (select call_jumlah from UIDESK_TrmReasonCallParamater) And (call_status = '0' or call_status <> 'Closed') And call_created_date < '" + FUfulldate + "' order by call_created_date asc" });
    //console.log("ListCallPreviousDays " + jsonText)
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecordsBigData",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultCallPrevious = "";
    //        ListCallPrevious.empty();

    //        if (json.length == 0) {
    //            console.log("data not found " + i);
    //            resultCallPrevious = '<div class="media media-single" > No data found... </div>';
    //            ListCallPrevious.append(resultCallPrevious);
    //        } else {
    //            for (i = 0; i < json.length; i++) {

    //                if (json[i].call_jenis_kelamin == "Wanita") {
    //                    var JenisKelamin = "<img src ='../images/avatar/1.jpg' alt='...'> "
    //                } else {
    //                    var JenisKelamin = "<img src ='../images/avatar/8.jpg' alt='...'> "
    //                }
    //                if (json[i].call_status == "Open") {
    //                    var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                } else if (json[i].call_status == "Progress") {
    //                    var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                } else if (json[i].call_status == "Pending") {
    //                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                } else if (json[i].call_status == "Closed") {
    //                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                } else {
    //                    var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                }
    //                resultCallPrevious = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
    //                    '<div class="media py-10 px-0">' +
    //                    '<a class="avatar avatar-lg status-success" href="#"> ' +
    //                    '' + JenisKelamin + '' +
    //                    '</a> ' +
    //                    '<div class="media-body"> ' +
    //                    '<p class="font-size-16"> ' +
    //                    '<a class="hover-primary" href = "#"> <strong>' + json[i].call_name + '</strong></a> ' +
    //                    '</p> ' +
    //                    '<p> ' + json[i].call_phone_number + '</p> ' +
    //                    '' + TrxParam + '' +
    //                    '</div> ' +
    //                    '</div> '
    //                ListCallPrevious.append(resultCallPrevious);
    //            }
    //        }
    //        //$("#LoaderTomorrow").hide();
    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function SearchingCallPreviousDays() {
    var ListCallPrevious = $('#previous_day_call');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#Searching_Previous").val() +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK21'}",
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
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    }
                    resultCallPrevious = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
                        '<div class="media py-10 px-0">' +
                        '<a class="avatar avatar-lg status-success" href="#"> ' +
                        '' + JenisKelamin + '' +
                        '</a> ' +
                        '<div class="media-body"> ' +
                        '<p class="font-size-16"> ' +
                        '<a class="hover-primary" href = "#"> <strong>' + json[i].call_name + '</strong></a> ' +
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
    //var FUtoday = new Date();
    //var FUhari = FUtoday.getDate();
    //var FUbulan = FUtoday.getMonth() + 1;
    //var FUtahun = FUtoday.getFullYear();
    //var FUfulldate = FUtahun + "-" + FUbulan + "-" + FUhari + ""
    //var TrxUserName = $("#hd_sessionLogin").val();
    //var ListCallPrevious = $('#previous_day_call');
    //var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "TrmViewOutboundHeader", paramQuery: "Where (call_reason <> 'Done' and call_reason <> 'Done Approved' and call_reason <> 'Done Not Approved' and call_reason <> 'Unregistered' and call_reason <> 'Wrong Number' or call_reason is null) and call_counting < (select call_jumlah from UIDESK_TrmReasonCallParamater) And (call_status = '0' or call_status <> 'Closed') And call_created_date < '" + FUfulldate + "' And (Call_name like'%" + $("#Searching_Previous").val() + "%' or call_phone_number like'%" + $("#Searching_Previous").val() + "%' or call_status like'%" + $("#Searching_Previous").val() + "%')" });
    //console.log("ListCallPreviousDays " + jsonText)
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultCallPrevious = "";
    //        ListCallPrevious.empty();

    //        if (json.length == 0) {
    //            console.log("data not found " + i);
    //            resultCallPrevious = '<div class="media media-single" > No data found... </div>';
    //            ListCallPrevious.append(resultCallPrevious);
    //        } else {
    //            for (i = 0; i < json.length; i++) {
    //                if (json[i].call_jenis_kelamin == "Wanita") {
    //                    var JenisKelamin = "<img src ='../images/avatar/1.jpg' alt='...'> "
    //                } else {
    //                    var JenisKelamin = "<img src ='../images/avatar/8.jpg' alt='...'> "
    //                }
    //                if (json[i].call_status == "Open") {
    //                    var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                } else if (json[i].call_status == "Progress") {
    //                    var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                } else if (json[i].call_status == "Pending") {
    //                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                } else if (json[i].call_status == "Closed") {
    //                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                } else {
    //                    var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
    //                }
    //                resultCallPrevious = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
    //                    '<div class="media py-10 px-0">' +
    //                    '<a class="avatar avatar-lg status-success" href="#"> ' +
    //                    '' + JenisKelamin + '' +
    //                    '</a> ' +
    //                    '<div class="media-body"> ' +
    //                    '<p class="font-size-16"> ' +
    //                    '<a class="hover-primary" href = "#"> <strong>' + json[i].call_name + '</strong></a> ' +
    //                    '</p> ' +
    //                    '<p> ' + json[i].call_phone_number + '</p> ' +
    //                    '' + TrxParam + '' +
    //                    '</div> ' +
    //                    '</div> '
    //                ListCallPrevious.append(resultCallPrevious);
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
function ListCallTodayNotClosed() {
    $("#LoaderToday").show();
    var ListCallTodayNotClosed = $('#today_not_closed');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK22'}",
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
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    }
                    resultTodayNotClosed = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
                        '<div class="media py-10 px-0">' +
                        '<a class="avatar avatar-lg status-success" href="#"> ' +
                        '' + JenisKelamin + '' +
                        '</a> ' +
                        '<div class="media-body"> ' +
                        '<p class="font-size-16"> ' +
                        '<a class="hover-primary" href = "#"> <strong>' + json[i].call_name + '</strong></a> ' +
                        '</p> ' +
                        '<p> ' + json[i].call_phone_number + '</p> ' +
                        '' + TrxParam + '' +
                        '</div> ' +
                        '</div> '
                    ListCallTodayNotClosed.append(resultTodayNotClosed);
                }
            }
            $("#LoaderToday").hide();

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SearchingCallTodayNotClosed() {
    var ListCallTodayNotClosed = $('#today_not_closed');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#Searching_TodayNotClosed").val() +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK22'}",
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
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else if (json[i].call_status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;" + json[i].call_status + "&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 190px;'><i class='fa fa-circle-o text-danger'></i>&nbsp;Ready&nbsp;<i class='fa fa-calendar'></i>&nbsp;" + json[i].DateCreate + "</span>"
                    }
                    resultTodayNotClosed = '<div class="media-list media-list-hover" style="cursor:pointer;width:100%;">' +
                        '<div class="media py-10 px-0">' +
                        '<a class="avatar avatar-lg status-success" href="#"> ' +
                        '' + JenisKelamin + '' +
                        '</a> ' +
                        '<div class="media-body"> ' +
                        '<p class="font-size-16"> ' +
                        '<a class="hover-primary" href = "#"> <strong>' + json[i].call_name + '</strong></a> ' +
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
function TrmSummary(sValue) {
    var myTable = $('#TrmSummary').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + sValue +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK23'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var TrxAction  = "<a href='#' class='text-warning' data-toggle='tooltip' data-original-title='Delete' onclick=DeleteSummary('" + json[i].id + "')><i class='ti-trash' aria-hidden='true'></i></a>"
                var TrxRowsAPI = "<span class='badge badge-pill badge-danger' style='width:70px;font-weight:bold;'>" + json[i].call_api_rows + "</span>"
                var TrxRows    = "<span class='badge badge-pill badge-warning' style='width:70px;font-weight:bold;'>" + json[i].call_upload_rows + "</span>"
                myTable.row.add([json[i].call_upload_type, json[i].call_upload_id, TrxRowsAPI, TrxRows, TrxAction]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DeleteSummary(SummaryID) {
    $("#ContentPlaceHolder1_TrxID").val(SummaryID)
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Data delete is empty");
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

                var form_data = JSON.stringify({ SummaryID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val() });
                $.ajax({
                    url: "asmx/TrxUploadOutboundCall.asmx/DeleteSummary",
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
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    if ($("#CmbUploadID").val() != "") {
                                        TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                                    } else {
                                        TrmSummary($("#CmbUploadID").val())
                                    }
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    if ($("#CmbUploadID").val() != "") {
                                        TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                                    } else {
                                        TrmSummary($("#CmbUploadID").val())
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

        });
}

//* Upload Data Polis Number *//
$('#files').change(function () {
    var filename = $('#files').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');

    if (filename == "" || filename == "undefined") {
        $("label[for='file_default']").text('No File Choosen');
    }

});
$(document).on("change", "input[name='files']", function (e) {
    $(".hiddenX").show();

    var fileName = $('#file').val();
    var fileExtension = fileName.split('.').pop();

    if (fileExtension == "xlsx" || fileExtension == "xls") {
    } else {
        swal(
            '',
            'File extension not allowed !',
            'error'
        ).then(function () {
            $('#file').val("")
            return false;
        });
        return false;
    }

    // Check data header hari ini sudah ada atau belum
    var jsonText = JSON.stringify({ TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val() });
    $.ajax({
        url: "asmx/TrxUploadOutboundCall.asmx/CheckingHeader",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonText,
        success: function (data) {

            var json = JSON.parse(data.d);
            var u, result = "";
            if (json.length != 0) {
                console.log("Data not found " + i);
                swal('',
                    'Data hari ini sudah tersedia!',
                    'error')
                $('#file').val("")
                return false;
            } else {
                for (var u = 0; u < files.length; u++) {

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


    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    $("#LoaderPage").show();

    if ($("#CmbProductCampaign").val() == "" || $("#CmbProductCampaign").val() == "Select") {
        swal("Product campaign is empty")
        return false;
    }

    for (var i = 0; i < files.length; i++) {

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        data.append("ProductCampaignID", $("#CmbProductCampaign").val());

        request = $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrxUploadOutboundCall.asmx/UploadOutboundCall",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            // $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            $("#CmbUploadID").val($(response).find("Guid").text());
            //console.log("Success");
            //console.log($(response).find("Guid").text());
            //console.log($(response).find("FileExt").text());
            $("#ContentPlaceHolder1_TrxUploadID").val($(response).find("Guid").text())

            //moveFileToDatabase('FileNasabah/' + $(response).find("Guid").text() + '.xlsx', 'FileNasabah/' + $(response).find("Guid").text() + '.xlsx');
      
            swal({
                title: "Do you want to process?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        var form_data = JSON.stringify({
                            TrxUploadID: $("#ContentPlaceHolder1_TrxUploadID").val(), ProductCampaignID: $("#CmbProductCampaign").val(),
                            TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val()
                        });
                        $.ajax({
                            url: "asmx/TrxUploadOutboundCall.asmx/Upload_InsertHeader",
                            method: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: form_data,
                            success: function (data) {
                                var json = JSON.parse(data.d);
                                var i, result = "";

                                for (i = 0; i < json.length; i++) {

                                }

                                TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val());
                                SelectUploadID($("#ContentPlaceHolder1_TrxUploadID").val());

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

        });

        request.fail(function (response) {
            console.log(response.responseText);
            alert(response.responseText);

        });

        request.always(function () {
            data.delete(itemid);
            data.delete(files[i]);

        });

    }

    $("#LoaderPage").hide();
});

//* Upload Data Ahli Waris *//
$('#file_ahli_waris').change(function () {
    var filename = $('#file_ahli_waris').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name_ahli_waris'] b").html(filename);
    $("label[for='file_default_ahli_waris']").text('Selected File: ');

    if (filename == "" || filename == "undefined") {
        $("label[for='file_default_ahli_waris']").text('No File Choosen');
    }

});
$(document).on("change", "input[name='file_ahli_waris']", function (e) {
    $(".hiddenX").show();

    var fileName = $('#file_ahli_waris').val();
    var fileExtension = fileName.split('.').pop();

    if (fileExtension == "xlsx" || fileExtension == "xls") {
    } else {
        swal(
            '',
            'File extension not allowed !',
            'error'
        ).then(function () {
            $('#file_ahli_waris').val("")
            return false;
        });
        return false;
    }

    // Check data nama waris hari ini sudah ada atau belum
    var jsonText = JSON.stringify({ TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val() });
    $.ajax({
        url: "asmx/TrxUploadOutboundCall.asmx/CheckingWaris",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonText,
        success: function (data) {

            var json = JSON.parse(data.d);
            var h, result = "";
            //alert(json.length )
            if (json.length != 0) {
                console.log("Data not found " + i);
                //alert("Data hari ini sudah tersedia!")
                swal('',
                    'Data hari ini sudah tersedia!',
                    'error')
                $('#file_ahli_waris').val("");
                return false;
            } else {
                for (var h = 0; h < files.length; h++) {

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

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    $("#LoaderPage").show();

    if ($("#ContentPlaceHolder1_TrxUploadID").val() == "") {
        if ($("#CmbUploadID").val() == "" || $("#CmbUploadID").val() == "Select") {
            swal("Data Polis Number empty")
            $('#file_ahli_waris').val("")
            $("#LoaderPage").hide();
            return false;
        }
    }

    for (var i = 0; i < files.length; i++) {

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        if ($("#ContentPlaceHolder1_TrxUploadID").val() != "") {
            data.append("UploadID", $("#ContentPlaceHolder1_TrxUploadID").val());
        } else {
            data.append("UploadID", $("#CmbUploadID").val());
        }

        request = $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrxUploadOutboundCall.asmx/UploadNamaAhliWaris",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,
        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            // $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            $("#CmbUploadID").val($(response).find("Guid").text());
            //console.log("Success");
            //console.log($(response).find("Guid").text());
            //console.log($(response).find("FileExt").text());

            //moveFileToDatabase('FileWaris/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx', 'FileWaris/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx');

            swal({
                title: "Do you want to process?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        var form_data = JSON.stringify({
                            TrxUploadID: $("#ContentPlaceHolder1_TrxUploadID").val(), TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val()
                        });
                        $.ajax({
                            url: "asmx/TrxUploadOutboundCall.asmx/Upload_InsertWaris",
                            method: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: form_data,
                            success: function (data) {
                                var json = JSON.parse(data.d);
                                var i, result = "";

                                for (i = 0; i < json.length; i++) {

                                }

                                if ($("#CmbUploadID").val() != "") {
                                    TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                                } else {
                                    TrmSummary($("#CmbUploadID").val())
                                }
                                SelectUploadID($("#ContentPlaceHolder1_TrxUploadID").val());

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


        });

        request.fail(function (response) {
            console.log(response.responseText);
            alert(response.responseText);

        });

        request.always(function () {
            data.delete(itemid);
            data.delete(files[i]);

        });

    }

    $("#LoaderPage").hide();
});

//* Upload Data Rider *//
$('#file_rider').change(function () {
    var filename = $('#file_rider').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name_rider'] b").html(filename);
    $("label[for='file_default_rider']").text('Selected File: ');

    if (filename == "" || filename == "undefined") {
        $("label[for='file_default_rider']").text('No File Choosen');
    }

});
$(document).on("change", "input[name='file_rider']", function (e) {
    $(".hiddenX").show();

    var fileName = $('#file_rider').val();
    var fileExtension = fileName.split('.').pop();

    if (fileExtension == "xlsx" || fileExtension == "xls") {
    } else {
        swal(
            '',
            'File extension not allowed !',
            'error'
        ).then(function () {
            $('#file_rider').val("")
            return false;
        });
        return false;
    }

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    $("#LoaderPage").show();
    if ($("#ContentPlaceHolder1_TrxUploadID").val() == "") {
        if ($("#CmbUploadID").val() == "" || $("#CmbUploadID").val() == "Select") {
            swal("Data Polis Number empty")
            $('#file_rider').val("")
            $("#LoaderPage").hide();
            return false;
        }
    }

    for (var i = 0; i < files.length; i++) {

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        if ($("#ContentPlaceHolder1_TrxUploadID").val() != "") {
            data.append("UploadID", $("#ContentPlaceHolder1_TrxUploadID").val());
        } else {
            data.append("UploadID", $("#CmbUploadID").val());
        }

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrxUploadOutboundCall.asmx/UploadDataRider",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            // $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            $("#CmbUploadID").val($(response).find("Guid").text());
            //console.log("Success");
            //console.log($(response).find("Guid").text());
            //console.log($(response).find("FileExt").text());

            //moveFileToDatabase('FileRider/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx', 'FileRider/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx');

            swal({
                title: "Do you want to process?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        var form_data = JSON.stringify({
                            TrxUploadID: $("#ContentPlaceHolder1_TrxUploadID").val(), TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val()
                        });
                        $.ajax({
                            url: "asmx/TrxUploadOutboundCall.asmx/Upload_InsertRider",
                            method: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: form_data,
                            success: function (data) {
                                var json = JSON.parse(data.d);
                                var i, result = "";

                                for (i = 0; i < json.length; i++) {

                                }

                                if ($("#CmbUploadID").val() != "") {
                                    TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                                } else {
                                    TrmSummary($("#CmbUploadID").val())
                                }
                                SelectUploadID($("#ContentPlaceHolder1_TrxUploadID").val());

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

        });

        request.fail(function (response) {
            console.log(response.responseText);
            alert(response.responseText);

        });

        request.always(function () {
            data.delete(itemid);
            data.delete(files[i]);

        });

    }

    $("#LoaderPage").hide();
});

//* Upload Data Fund *//
$('#file_jenis_darlink').change(function () {
    var filename = $('#file_rider').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name_jenis_darlink'] b").html(filename);
    $("label[for='file_default_jenis_darlink']").text('Selected File: ');

    if (filename == "" || filename == "undefined") {
        $("label[for='file_default_jenis_darlink']").text('No File Choosen');
    }

});
$(document).on("change", "input[name='file_jenis_darlink']", function (e) {
    $(".hiddenX").show();

    var fileName = $('#file_jenis_darlink').val();
    var fileExtension = fileName.split('.').pop();

    if (fileExtension == "xlsx" || fileExtension == "xls") {
    } else {
        swal(
            '',
            'File extension not allowed !',
            'error'
        ).then(function () {
            $('#file_jenis_darlink').val("")
            return false;
        });
        return false;
    }

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    $("#LoaderPage").show();

    if ($("#ContentPlaceHolder1_TrxUploadID").val() == "") {
        if ($("#CmbUploadID").val() == "" || $("#CmbUploadID").val() == "Select") {
            swal("Data Polis Number empty")
            $('#file_jenis_darlink').val("")
            $("#LoaderPage").hide();
            return false;
        }
    }

    for (var i = 0; i < files.length; i++) {

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());

        if ($("#ContentPlaceHolder1_TrxUploadID").val() != "") {
            data.append("UploadID", $("#ContentPlaceHolder1_TrxUploadID").val());
        } else {
            data.append("UploadID", $("#CmbUploadID").val());
        }

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrxUploadOutboundCall.asmx/UploadDataFund",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            // $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            $("#CmbUploadID").val($(response).find("Guid").text());
            //console.log("Success");
            //console.log($(response).find("Guid").text());
            //console.log($(response).find("FileExt").text());

            //moveFileToDatabase('FileFund/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx', 'FileFund/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx');

            swal({
                title: "Do you want to process?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        var form_data = JSON.stringify({
                            TrxUploadID: $("#ContentPlaceHolder1_TrxUploadID").val(), TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val()
                        });
                        $.ajax({
                            url: "asmx/TrxUploadOutboundCall.asmx/Upload_InsertFund",
                            method: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: form_data,
                            success: function (data) {
                                var json = JSON.parse(data.d);
                                var i, result = "";

                                for (i = 0; i < json.length; i++) {

                                }

                                if ($("#CmbUploadID").val() != "") {
                                    TrmSummary($("#ContentPlaceHolder1_TrxUploadID").val())
                                } else {
                                    TrmSummary($("#CmbUploadID").val())
                                }
                                SelectUploadID($("#ContentPlaceHolder1_TrxUploadID").val());

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


        });

        request.fail(function (response) {
            console.log(response.responseText);
            alert(response.responseText);

        });

        request.always(function () {
            data.delete(itemid);
            data.delete(files[i]);

        });

    }

    $("#LoaderPage").hide();
});
function GetAPI_PolisNumber() {
    if ($("#CmbProductCampaign").val() == "" || $("#CmbProductCampaign").val() == "Select") {
        swal("Product Campaign is empty");
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

                var jsonText = JSON.stringify();
                $.ajax({
                    type: "GET",
                    url: "asmx/json/welcomecall.json",
                    contentType: "application/json; charset=utf-8",
                    data: jsonText,
                    dataType: "json",
                    success: function (response) {
                        var json = response;
                        var i, j, k, x;
                        //alert(json.object)
                        //alert(json.IdTrx)
                        //alert(json.TotalTrx)
                        for (i = 0; i < json.DataPolis.length; i++) {
                            //alert("DataPolis");
                            //alert(json.DataPolis[i].Nama)
                            //alert(json.DataPolis[i].NomorPolis)
                            var form_data = JSON.stringify({
                                call_name: json.DataPolis[i].Nama, call_email: json.DataPolis[i].Email, call_polis_number: json.DataPolis[i].NomorPolis,
                                call_phone_number: json.DataPolis[i].PhoneNumber, call_nama_product: json.DataPolis[i].NamaProduct,
                                call_flaging_nasabah: json.DataPolis[i].Flaging, call_product_id: $("#CmbProductCampaign").val(),
                                call_username: $("#ContentPlaceHolder1_TrxUserName").val(), call_upload_id: json.IdTrx
                            });
                            $.ajax({
                                url: "asmx/TrxUploadOutboundCall.asmx/API_InsertHeader",
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

                                }
                            });

                            for (j = 0; j < json.DataPolis[i].Detail.length; j++) {

                                for (k = 0; k < json.DataPolis[i].Detail[j].Ahliwaris.length; k++) {

                                    var form_data = JSON.stringify({ call_upload_id: json.IdTrx, call_polis_number: json.DataPolis[i].Detail[j].Ahliwaris[k].call_polis_number, call_nama_ahli_waris: json.DataPolis[i].Detail[j].Ahliwaris[k].call_nama_ahli_waris, call_username: $("#ContentPlaceHolder1_TrxUserName").val() });
                                    $.ajax({
                                        url: "asmx/TrxUploadOutboundCall.asmx/API_InsertWaris",
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

                                        }
                                    });

                                }


                                for (k = 0; k < json.DataPolis[i].Detail[j].Rider.length; k++) {

                                    var form_data = JSON.stringify({ call_upload_id: json.IdTrx, call_polis_number_rider: json.DataPolis[i].Detail[j].Rider[k].call_polis_number, call_manfaat: json.DataPolis[i].Detail[j].Rider[k].call_manfaat, call_username: $("#ContentPlaceHolder1_TrxUserName").val() });
                                    $.ajax({
                                        url: "asmx/TrxUploadOutboundCall.asmx/API_InsertRider",
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

                                        }
                                    });

                                }


                                for (k = 0; k < json.DataPolis[i].Detail[j].Fund.length; k++) {

                                    var form_data = JSON.stringify({ call_upload_id: json.IdTrx, call_polis_number: json.DataPolis[i].Detail[j].Fund[k].call_polis_number, call_jenis_investasi: json.DataPolis[i].Detail[j].Fund[k].call_jenis_investasi, call_username: $("#ContentPlaceHolder1_TrxUserName").val() });
                                    $.ajax({
                                        url: "asmx/TrxUploadOutboundCall.asmx/API_InsertFund",
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

                                        }
                                    });

                                }


                            }

                        }

                        ExecuteSummary(json.IdTrx, "Polis", json.TotalTrx)
                        ExecuteSummary(json.IdTrx, "waris", "0")
                        ExecuteSummary(json.IdTrx, "rider", "0")
                        ExecuteSummary(json.IdTrx, "fund", "0")
                        SelectUploadID(json.IdTrx);
                        TrmSummary(json.IdTrx)

                    }, complete: function () {

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert("ss" + xhr.status);
                        alert(xhr.responseText);
                        alert(thrownError);
                    }
                });

            }
        });
}
//function moveFileToDatabase(asalNya,tujuanNya){
//	var tujuanNya = asalNya;
//    var jsonText = JSON.stringify({ asal: "http://10.28.2.222/brilifecc/FileUploadOutbound/" + asalNya, tujuan: tujuanNya });
//    console.log(jsonText);
//    $.ajax({
//        type: "POST",
//        url: "http://10.28.2.224/copyfile/copy.php",
//        data: jsonText,
//        //crossDomain: true,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {

//            console.log(data);


//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    })
//}
function moveFileToDatabase(asalNya, tujuanNya) {
    var tujuanNya = asalNya;
    var jsonText = JSON.stringify({ asal: "http://10.28.2.222/dev_brilife/FileUploadOutbound/" + asalNya, tujuan: tujuanNya });
    //var jsonText = JSON.stringify({ asal: "http://10.28.2.222/brilifecc/FileUploadOutbound/" + asalNya, tujuan: tujuanNya });
    var uuu = "uidesk";
    var aaa = "uidesk12345";
    console.log(jsonText);
    $.ajax({
        type: "POST",
        url: "copyfile.php",
        data: jsonText,
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + btoa(uuu + ":" + aaa));
        },
        success: function (data) {

            console.log(data);

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ExecuteSummary(TrxGetID, TrxType, Summary) {
    var jsonText = JSON.stringify({ call_upload_id: TrxGetID, call_username: $("#ContentPlaceHolder1_TrxUserName").val(), call_type: TrxType, call_summary: Summary });
    $.ajax({
        url: "asmx/TrxUploadOutboundCall.asmx/API_HeaderSummary",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonText,
        success: function (data) {

            var json = JSON.parse(data.d);
            var u, result = "";

            for (u = 0; u < json.length; u++) {

                if (json[u].Result == "True") {

                    if (Summary == json[u].msgSystem) {
                        alert("Data Sesuai");
                        // Post ke WS BL bahwa data sudah sesuai
                        swal("Done", {
                            icon: "success",
                        });
                    } else {
                        alert("Data Tidak Sesuai");
                        // Delete data yg sudah di input kemudian, kasih alert ke user untuk get ulang 
                        //datanya dan dilakukan terus menerus sampai data antara API dan Database jumlahnya sama
                    }

                } else {
                    // Error transaction
                    alert(json[u].msgSystem);
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
function CheckTodayWelcomeCall() {
    var jsonText = JSON.stringify({ TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val() });
    $.ajax({
        url: "asmx/TrxUploadOutboundCall.asmx/CountingWelcomeCall",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonText,
        success: function (data) {

            var json = JSON.parse(data.d);
            var u, result = "";

            for (u = 0; u < json.length; u++) {

                if (json[u].Result == "True") {
                    //alert(json[u].Counting);
                } else {
                    //alert(json[u].Counting);
                    swal("Data hari ini sudah tersedia")
                    return false;
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