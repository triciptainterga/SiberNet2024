////$(document).ready(function () {
////    $("#TxtSearchingCampaignName").on("input", function () {
////        // Print entered value in a div box
////        var jumlahString = $(this).val().length;
////        //console.log(jumlahString);
////        //alert(jumlahString)
////        if (jumlahString >= 4) {
////            SearchingCampaignName($(this).val());
////        } else if (jumlahString == 0) {
////            SearchingCampaignName($(this).val(""));
////        }
////    });
////    $("#TxtSearchingChannel").on("input", function () {
////        // Print entered value in a div box
////        var jumlahStringChannel = $(this).val().length;
////        //console.log(jumlahString);
////        //alert(jumlahString)
////        if (jumlahStringChannel >= 3) {
////            SearchingCampaignChannel($(this).val());
////        } else if (jumlahStringChannel == 0) {
////            SearchingCampaignChannel($(this).val(""));
////        }
////    });
////    TrmCallCampaign($("#ContentPlaceHolder1_TrxID").val("0"));
////    TrmReminder();
////    TrmOutboundCallStatus();
////    TrmOutboundCallAgent();
////});

//////* Table Campaign Name
////function TrmCallCampaign(TrxID) {
////    //alert(TrxID)
////    var JenisKondisi = "AllWhereData";
////    var NamaTable = "campaigns_data";
////    //if ($("#ContentPlaceHolder1_TrxID").val() == "undefined") {
////    //    $("#ContentPlaceHolder1_TrxID").val("0")
////    //}
////    if ($("#ContentPlaceHolder1_TrxID").val() == '0') {
////        var KondisiData = "Where Agent='" + $("#ContentPlaceHolder1_TrxUserName").val() + "'";
////    } else {
////        //if (TrxWhere == '1') {
////        var KondisiData = "Where Agent='" + $("#ContentPlaceHolder1_TrxUserName").val() + "' And (IDGroupBlast=" + $("#ContentPlaceHolder1_TrxID").val() + " or NoWA='" + $("#ContentPlaceHolder1_TrxID").val() + "')";
////        //} else {
////        //    var KondisiData = "Where Agent='" + $("#ContentPlaceHolder1_TrxUserName").val() + "' And NoWA='" + $("#ContentPlaceHolder1_TrxID").val() + "'";
////        //}
////    }
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
////    console.log("TrmCallCampaign jsonText " + jsonText)
////    var myTable = $('#TrmCallCampaign').DataTable();
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, result = "";

////            myTable.clear().draw();
////            for (i = 0; i < json.length; i++) {

////                var d = new Date(json[i].DateCreate);
////                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                var urlClick = "<a class='dropdown-item' target='_blank' href='TrmCallProfile.aspx?id=" + json[i].ID + "&account=" + json[i].NoWA + "&channel=" + json[i].TypeChannel + "'><i class='glyphicon glyphicon-earphone' aria-hidden='true'></i></a>"
////                myTable.row.add([json[i].ID, json[i].NoWA, json[i].GroupBlast, json[i].TypeChannel, json[i].StatusBlast, newDate + ' ' + newTime, urlClick]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

//////* Table Reminder *//
////function TrmReminder() {
////    var JenisKondisi = "AllWhereData";
////    var NamaTable = "TrmReminder";
////    var KondisiData = "Where UserCreate='" + $("#ContentPlaceHolder1_TrxUserName").val() + "' And StatusReminder <> 'Done'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
////    var myTable = $('#TrmReminder').DataTable();
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, result = "";

////            myTable.clear().draw();
////            for (i = 0; i < json.length; i++) {

////                var d = new Date(json[i].ReminderDate);
////                var milisegundos = parseInt(json[i].ReminderDate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                var urlClick = "<a class='dropdown-item' target='_blank' href='TrmCallProfile.aspx?id=" + json[i].CampaignDataID + "&account=" + json[i].Account + "&channel=" + json[i].Channel + "'><i class='glyphicon glyphicon-earphone' aria-hidden='true'></i></a>"
////                myTable.row.add([json[i].ID, json[i].Account, json[i].CampaignName, json[i].Subject, json[i].DescriptionReminder, "<span class='badge badge-warning'><b>" + newDate + ' ' + newTime + "</b></span>", urlClick]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

//////* Outbound Call Status *//
////function TrmOutboundCallStatus() {
////    var JenisKondisi = "AllWhereData";
////    var divOutboundStatus = $('#divOutboundStatus');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "TrmCountingOutboundCallStatus", paramQuery: "" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultOutboundStatus = "";
////            divOutboundStatus.empty();
////            for (i = 0; i < json.length; i++) {
////                resultOutboundStatus = '<ul class="list-inline">' +
////                                            '<li class="flexbox mb-5" style="margin-top:-12px;">' +
////                                                '<div>' +
////                                                    '<span class="badge badge-dot badge-' + json[i].color + '"></span>' +
////                                                    '<span>&nbsp;' + json[i].callstatus + '</span>' +
////                                                '</div>' +
////                                                '<div>' + json[i].JumlahCounting + '</div' +
////                                            '</li>' +
////                                         '</ul>'
////                divOutboundStatus.append(resultOutboundStatus);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

//////* Outbound Call Agent *//
////function TrmOutboundCallAgent() {
////    var JenisKondisi = "AllWhereData";
////    var divOutboundAgent = $('#divOutboundAgent');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "TrmCountingOutboundCallAgent", paramQuery: "" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultOutboundAgent = "";
////            divOutboundAgent.empty();
////            for (i = 0; i < json.length; i++) {
////                resultOutboundAgent = '<ul class="list-inline align-self-end text-muted text-right mb-0">' +
////                                                '<li>' + json[i].Agent + '<span class="badge badge-' + json[i].color + ' ml-2">' + json[i].JumlahCounting + '</span></li>' +
////                                      '</ul>'
////                divOutboundAgent.append(resultOutboundAgent);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

//////* List Campaign Name
////function AddCampaignName() {
////    //* Campaigns_Header
////    var JenisKondisi = "AllWhereData";
////    var ListCallCampaigns = $('#ListCallCampaigns');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "campaigns_header", paramQuery: "where StatusActive='YES'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultCallCampaigns = "";

////            ListCallCampaigns.append(
////                   '<div class="media media-single">' +
////                                               '<a href="#" onclick="Reading(0)"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
////                                               '<div class="media-body">' +
////                                                   '<small class="text-fader"></small>' +
////                                                   '<h6><a href="#" onclick="Reading(0)">All Campaign Name</a></h6>' +
////                                                   '<small class="text-fader">All Channel</small>' +
////                                               '</div>' +
////                                          '</div>');
////            for (i = 0; i < json.length; i++) {
////                resultCallCampaigns = '<div class="media media-single">' +
////                                            '<a href="#" onclick="Reading(' + json[i].ID + ')"><img src="../images/icon/' + json[i].Channel + '.png" height="32" alt="..."></a>' +
////                                            '<div class="media-body">' +
////                                                '<small class="text-fader"></small>' +
////                                                '<h6><a href="#" onclick="Reading(' + json[i].ID + ')">' + json[i].CampaignName + '</a></h6>' +
////                                                '<small class="text-fader">' + json[i].Channel + '</small>' +
////                                            '</div>' +
////						               '</div>'
////                ListCallCampaigns.append(resultCallCampaigns);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })

////    //* Account Channel Campaigns_Data
////    var JenisKondisi1 = "AllWhereData";
////    var listCallChannel = $('#listCallChannel');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi1, tableName: "TrmAccountChannel", paramQuery: "" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultCallChannel = "";

////            //listCallChannel.append();
////            for (i = 0; i < json.length; i++) {
////                resultCallChannel = "<div class='media media-single'>" +
////                                            "<a href='#' onclick=Reading('" + json[i].NoWA + "')><img src='../images/icon/" + json[i].Channel + ".png' height='32'></a>" +
////                                            "<div class='media-body'>" +
////                                                "<small class='text-fader'></small>" +
////                                                "<h6><a href='#' onclick=Reading('" + json[i].NoWA + "')>" + json[i].NoWA + "</a></h6>" +
////                                                "<small class='text-fader'>" + json[i].Channel + "</small>" +
////                                            "</div>" +
////						               "</div>"
////                listCallChannel.append(resultCallChannel);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

//////* Hanya Campaign Data tertentu
////function Reading(TrxID,TrxSource) {
////    //alert(TrxSource)
////    $("#ContentPlaceHolder1_TrxID").val( decodeURI(TrxID));
////    TrmCallCampaign($("#ContentPlaceHolder1_TrxID").val(), TrxSource)
////}

//////* Searching Campaign Name
////function SearchingCampaignName(TrxCampaign) {
////    //alert(TrxCampaign)
////    var selectedValue = TrxCampaign;
////    console.log("Selected Text: " + selectedValue + " Value: " + selectedValue);

////    var ListCallCampaigns = $('#ListCallCampaigns');
////    if (selectedValue == '') {
////        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "campaigns_header", paramQuery: "Where StatusActive='YES'" });
////    } else {
////        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "campaigns_header", paramQuery: "where CampaignName like '%" + selectedValue + "%' And StatusActive='YES'" });
////    }
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultCallCampaigns = "";
////            ListCallCampaigns.empty();
////            //cmbDataSourceEnquiryReason.append('<option value="">Select</option>');
////            //console.log("Jumlah" + json.length);
////            if (json.length == 0) {
////                console.log("data not found " + i);
////                resultCallCampaigns = '<div class="media media-single" > No data found... </div>';
////                ListCallCampaigns.append(resultCallCampaigns);
////            } else {
////                ListCallCampaigns.append(
////                   '<div class="media media-single">' +
////                                               '<a href="#" onclick="Reading(0)"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
////                                               '<div class="media-body">' +
////                                                   '<small class="text-fader"></small>' +
////                                                   '<h6><a href="#" onclick="Reading(0)">All Campaign Name</a></h6>' +
////                                                   '<small class="text-fader">All Channel</small>' +
////                                               '</div>' +
////                                          '</div>');
////                for (i = 0; i < json.length; i++) {
////                    resultCallCampaigns = '<div class="media media-single">' +
////                                                '<a href="#" onclick="Reading(' + json[i].ID + ')"><img src="../images/icon/' + json[i].Channel + '.png" height="32" alt="..."></a>' +
////                                                '<div class="media-body">' +
////                                                    '<small class="text-fader"></small>' +
////                                                    '<h6><a href="#" onclick="Reading(' + json[i].ID + ')">' + json[i].CampaignName + '</a></h6>' +
////                                                    '<small class="text-fader">' + json[i].Channel + '</small>' +
////                                                '</div>' +
////                                           '</div>'
////                    ListCallCampaigns.append(resultCallCampaigns);
////                }
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

//////* Searching Campaign Channel
////function SearchingCampaignChannel(TrxChannel) {
////    //alert(TrxChannel)
////    var selectedChannel = TrxChannel;
////    console.log("Selected Text: " + selectedChannel + " Value: " + selectedChannel);
////    var ListCallChannel = $('#listCallChannel');
////    if (selectedChannel == '') {
////        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "campaigns_data", paramQuery: "" });
////    } else {
////        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "campaigns_data", paramQuery: "where NoWA like '%" + selectedChannel + "%'" });
////    }
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultCallChannel = "";
////            ListCallChannel.empty();
////            //cmbDataSourceEnquiryReason.append('<option value="">Select</option>');
////            //console.log("Jumlah" + json.length);
////            if (json.length == 0) {
////                console.log("data not found " + i);
////                resultCallChannel = '<div class="media media-single" > No data found... </div>';
////                ListCallChannel.append(resultCallChannel);
////            } else {
////                //ListCallChannel.append('<h6><a href="#" onclick="Reading()" class="pull-right" style="margin-top:5px;">All Channel</a></h6><br><hr style="margin-top:-5px;">');
////                for (i = 0; i < json.length; i++) {
////                    resultCallChannel = "<div class='media media-single'>" +
////                                            "<a href='#' onclick=Reading('" + json[i].NoWA + "')><img src='../images/icon/" + json[i].Channel + ".png' height='32'></a>" +
////                                            "<div class='media-body'>" +
////                                                "<small class='text-fader'></small>" +
////                                                "<h6><a href='#' onclick=Reading('" + json[i].NoWA + "')>" + json[i].NoWA + "</a></h6>" +
////                                                "<small class='text-fader'>" + json[i].Channel + "</small>" +
////                                            "</div>" +
////						               "</div>"
////                    ListCallChannel.append(resultCallChannel);
////                }
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}