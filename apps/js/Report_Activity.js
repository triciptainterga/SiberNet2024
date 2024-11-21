$(document).ready(function () {
    getWS_1_Thread_select();
    getWS_DataTableTaskboard();
    WSActionTransactionKotak();
    $("#gabungMergeButton").hide();
    $("#gabungKeterangan").hide();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getWS_DataTableTaskboard() {
    $("#LoaderPageCounting").show();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLoginTypeAngka = $("#TrxLoginTypeAngka").val();
    var TrxDivisi = $("#TrxDivisi").val();
    var TrxStatus = getParameterByName("status");
    var XStartDate = getParameterByName("ds");
    var XEndDate = getParameterByName("de");

    var result = "";
    var myTaskboardTicket = $('#TaskboardTicket').DataTable(
        {
            "order": [[0, "desc"]]
        },
        {
            "processing": true,
            "language": {
                processing: '<i class="spinner-border text-warning"></i><span>Loading...</span> '
            },
            //"serverSide": true,
        });
    $.fn.dataTable.ext.errMode = 'none';
    if (getParameterByName("agent") == "All") {
        TrxUserName = "Admin";
        TrxLoginTypeAngka = 1;
        TrxStatus = getParameterByName("line");
    } else {
        TrxUserName = getParameterByName("agent");
        TrxStatus = getParameterByName("line");
    }
    if (TrxStatus == "allchannel") {
        console.log("Visible False Untuk Thread true untuk taskboard")
        $('#dataTableThread').css('display', 'none');
        $('#dataTableTicket').toggleClass('col-6', 'col-12');
        console.log("{TrxUserName: '" + TrxUserName + "',TrxLoginTypeAngka: '" + TrxLoginTypeAngka + "',TrxDivisi: 'Ticket',TrxStatus: '" + TrxStatus + "',XStartDate: '" + XStartDate + "',XEndDate: '" + XEndDate + "'}");
    } else {
        console.log("Visible False Untuk Thread true untuk taskboard")
    }
    console.log("{TrxUserName: '" + TrxUserName + "',TrxLoginTypeAngka: '" + TrxLoginTypeAngka + "',TrxDivisi: 'Ticket',TrxStatus: '" + TrxStatus + "',XStartDate: '" + XStartDate + "',XEndDate: '" + XEndDate + "'}");
    $.ajax({
        type: "POST",
        url: "asmx/5_Report_Activity.asmx/DataTableTaskboard",
        data: "{TrxUserName: '" + TrxUserName + "',TrxLoginTypeAngka: '" + TrxLoginTypeAngka + "',TrxDivisi: 'Ticket',TrxStatus: '" + TrxStatus + "',XStartDate: '" + XStartDate + "',XEndDate: '" + XEndDate + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            //messageDiv.empty();
            myTaskboardTicket.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {
                    var urlAction = "<div class='dropdown'>" +
                        "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                        "<div class='dropdown-menu dropdown-menu-right'>" +
                        "<a class='dropdown-item' href='#' onclick=showInternalNote('" + json[i].TicketNumber + "')><i class='fa fa-plus'></i> Internal Note</a>" +
                        "<div class='dropdown-divider'></div>" +
                        "<a class='dropdown-item' href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "&numberid=0&threadid=0&status=" + json[i].Status + "'><i class='si-arrow-right-circle si'></i> Follow up</a>" +
                        "</div>" +
                        "</div>"
                    //alert(json[i].TrxID);

                    //if (json[i].datecreate == "null") {
                    //var ConverTanggal = "-";
                    //} else {
                    var d = new Date(json[i].datecreate);
                    var milisegundos = parseInt(json[i].datecreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime
                    //}
                    //var urlAction = "<a href='1_journey.aspx?ticketid=" + json[i].TicketNumber + "'><i class='si-arrow-right-circle si'></i></a>"
                    if (json[i].Status == "Open") {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Solved") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 70px;'>" + json[i].Status + "</span>"
                    }
                    if (json[i].TicketPosition == "1") {
                        var TrxPosition = "Layer 1"
                    } else if (json[i].TicketPosition == "2") {
                        var TrxPosition = "Layer 2"
                    } else if (json[i].TicketPosition == "3") {
                        var TrxPosition = "Layer 3"
                    } else if (json[i].TicketPosition == "4") {
                        var TrxPosition = "Eksternal/Vendor"
                    }
                    myTaskboardTicket.row.add([json[i].TicketNumber, json[i].NamePIC, json[i].CategoryName, json[i].SLA, json[i].UsedDaySLAOK, TrxPosition, TrxParam, ConverTanggal, urlAction]).draw(false);

                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {
            $("#LoaderPageCounting").hide();
        }
    })
}
function getWS_1_Thread_select() {
    //alert("test")
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxUnitKerja = $("#ContentPlaceHolder1_TrxUnitKerja").val();
    var TrxLevelUser = $("#ContentPlaceHolder1_TrxLevelUser").val();
    var XStartDate = getParameterByName("ds");
    var XEndDate = getParameterByName("de");
    var result = "";

    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxUnitKerja : " + $("#ContentPlaceHolder1_TrxUnitKerja").val());
    console.log("TrxLevelUser : " + $("#ContentPlaceHolder1_TrxLevelUser").val());

    //Exec TR_DataThread
    var myTable = $('#ticketThread').DataTable(
        {
            "order": [[8, "desc"]]
        }
    );
    if (getParameterByName("name") != null) {
        myTable.search(getParameterByName("name")).draw();
    }

    if (getParameterByName("agent") == "All") {
        TrxUserName = "Admin";
        TrxLoginTypeAngka = 1;
        TrxStatus = getParameterByName("line");
    } else {
        TrxUserName = getParameterByName("agent");
        TrxStatus = getParameterByName("line");
    }
    $.ajax({
        type: "POST",
        url: "asmx/5_Report_Activity.asmx/DataTableThread",
        data: "{TrxUserName: '" + TrxUserName + "',TrxLoginTypeAngka: '" + TrxLoginTypeAngka + "',TrxDivisi: 'Thread',TrxStatus: '" + TrxStatus + "',XStartDate: '" + XStartDate + "',XEndDate: '" + XEndDate + "'}",
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

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime

                    //alert(json[i].TrxIconThreadChannel)
                    if (json[i].ValueThread == "FBcommentcomment" || json[i].ValueThread == "FBcommentpost" || json[i].ValueThread == "FBcommentreply" || json[i].ValueThread == "FBmentions") {
                        var FollowThread = "Facebook"
                    } else {
                        var FollowThread = json[i].ValueThread
                    }
                    //if (json[i].ValueThread == "IGcommentsmore" || json[i].ValueThread == "IGmentions") {
                    //    var FollowThread = "Instagram"
                    //} else {
                    //    var FollowThread = json[i].ValueThread
                    //}
                    //if (json[i].ValueThread == "TWmentionpage") {
                    //    var FollowThread = "Twitter"
                    //} else {
                    //    var FollowThread = json[i].ValueThread
                    //}
                    if (json[i].ValueThread == "Email" || json[i].ValueThread == "EMAIL") {
                        var TrxColor = "info";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Solved')><i class='si-check si'></i> Solved</a>" +
                            "<a class='dropdown-item' href='#' onclick=PreviewEmail('" + json[i].ThreadID + "')><i class='fa fa-folder-open-o'></i> Preview</a>" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/email.png'>";
                    } else if (json[i].ValueThread == "Call" || json[i].ValueThread == "call") {
                        var TrxColor = "danger";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Prank&nbsp;Call')><i class='si-call-end si'></i> Prank Call</a>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Ignore')><i class='fa fa-trash-o'></i> Ignore</a>" +
                            //"<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].TrxID + "','Delete')><i class='si-close si'></i> Delete</a>" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else if (json[i].ValueThread == "Facebook") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Instagram") {
                        var TrxColor = "warning";
                    } else if (json[i].ValueThread == "Facebook") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Whatsapp") {
                        var TrxColor = "success";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
                            "<a class='dropdown-item' href='#' onclick=PreviewWhatsApp('" + json[i].GenesysNumber + "','" + getParameterByName("name") + "')><i class='fa fa-folder-open-o'></i> Preview WA</a>" +
                            "<a class='dropdown-item' href='#' onclick=PreviewSosmed('" + json[i].GenesysNumber + "')><i class='fa fa-folder-open-o'></i> Preview Sosmed</a>" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else if (json[i].ValueThread == "Twitter") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Outbound Call") {
                        var TrxColor = "danger";
                    } else {
                        var TrxColor = "success";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
                            "<a class='dropdown-item' href='#' onclick=PreviewWhatsApp('" + json[i].ThreadID + "','" + getParameterByName("name") + "')><i class='fa fa-folder-open-o'></i> Preview</a>" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    }

                    if (json[i].IconValueThread == "" || json[i].IconValueThread == null) {
                        var TrxIcon = "<span class='badge badge-pill badge-" + TrxColor + "' style='width: 100%;'><a style='color:white;' href='1_doticket.aspx?n=1&id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "'>" + json[i].ValueThread + "</a></span>"
                    } else {
                        if (json[i].ThreadCustomerName == "" || json[i].ThreadCustomerName == null) {
                            var TrxIcon = "<span class='badge badge-pill badge-" + TrxColor + "' style='width: 90px;'><a style='color:white;' href='1_doticket.aspx?n=1&id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "'>" + json[i].ValueThread + "</a></span>"
                        } else {
                            var TrxIcon = "<span class='badge badge-pill badge-" + TrxColor + "' style='width: 90px;'><a style='color:white;' href='1_doticket.aspx?n=1&id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "'>" + json[i].ValueThread + "</a></span>"
                        }
                    }
                    if (json[i].AgentName == "" || json[i].AgentName == null) {
                        var TrxAgent = "<center>-</center>";
                    } else {
                        var TrxAgent = "<span class='badge badge-pill badge-warning' style='width: 100px;color:white;'>" + json[i].AgentName + "</span>";
                    }

                    if (json[i].ThreadCategory == "" || json[i].ThreadCategory == null) {
                        if (json[i].ValueThread == "Email" || json[i].ValueThread == "EMAIL") {
                            var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/email.png'>";
                        } else if (json[i].ValueThread == "Multichat") {
                            var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/messenger.png'>";
                        } else if (json[i].ValueThread == "Call" || json[i].ValueThread == "call") {
                            var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/inbound.png'>";
                        } else {
                            var ThreadCategoryImg = "<center>-</center>";
                        }
                    } else if (json[i].ThreadCategory == "ig") {
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/instagram.png'>";
                    } else if (json[i].ThreadCategory == "fb") {
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/facebook.png'>";
                    } else if (json[i].ThreadCategory == "whatsapp") {
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/whatsapp.png'>";
                    } else if (json[i].ThreadCategory == "chat-widget") {
                        var ThreadCategoryImg = "<img width='32px' src='../images/icon/channel/LiveChat.png'>";
                    }

                    myTable.row.add([ThreadCategoryImg, TrxIcon, json[i].ThreadCustomerName, json[i].GenesysNumber, json[i].Account, json[i].Subject, TrxAgent, newDate + ' ' + newTime, urlClick]).draw(false);
                    //alert(myTable)


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
function ActionType(TrxID, TrxType) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#ContentPlaceHolder1_TrxType").val(TrxType);
    $("#hd_sessionLogin").val();
    $("#modal-center-reason").modal('show');
    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxID : " + $("#ContentPlaceHolder1_TrxID").val());
    console.log("TrxType : " + $("#ContentPlaceHolder1_TrxType").val());

    var result = "";
    var messageDiv = $('#divInstanNote');
    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxType: 'Thread' });
    $.ajax({
        url: "asmx/ServiceThread.asmx/ThreadDataSelectInstanNote",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
        data: form_data,
        success: function (data) {
            console.log("Action Select Instan Note : " + form_data)

            messageDiv.empty();
            var json = JSON.parse(data.d);
            var i, x = "";
            for (i = 0; i < json.length; i++) {
                //alert(json[i].TrxNote)
                //$("#divInstanNote").val(json[i].TrxNote);
                result = '<div class="post clearfix">' +
                    '<div class="user-block">' +
                    '<img class="img-bordered-sm rounded-circle" src="../images/user7-128x128.jpg" alt="user image">' +
                    '<span class="username">' +
                    '<a href="#">' + json[i].TrxUserCreate + '</a>' +
                    '</span>' +
                    '<span class="description" style="font-size:11px;">' + json[i].TrxDateView + '</span>' +
                    '</div>' +
                    '<div class="activitytimeline">' +
                    '<p>' +
                    '' + json[i].TrxNote + '' +
                    '</p>' +
                    '<div class="form-horizontal form-element">' +
                    '<div class="form-group row no-gutters">' +
                    '</div>' +
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
        },
        complete: function () {

        }
    });
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function ActionReasonThread() {
    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxID : " + $("#ContentPlaceHolder1_TrxID").val());
    console.log("TrxType : " + $("#ContentPlaceHolder1_TrxType").val());
    var ReasonThread = CKEDITOR.instances.ReasonThread.getData();
    if (ReasonThread == "") {
        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>thread reason</b> is empty ")
        return false
    }
    var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxType: $("#ContentPlaceHolder1_TrxType").val(), TrxReason: ReasonThread });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }) // Function event sweat alert
        .then((willDelete) => { // Function event sweat alert
            if (willDelete) {
                /*UIDESK_Temp_UpdateThread*/
                $.ajax({
                    url: "asmx/ServiceThread.asmx/UpdateDataThread",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log("Action UpdateDataThread : " + form_data)
                        var TrxMessage = 'Your data thread has been <b>' + $("#ContentPlaceHolder1_TrxType").val() + '</b>'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                        $("#ReasonThread").val("");
                        $("#modal-center-reason").modal('hide');
                        getWS_1_Thread_select()
                        WSActionTransactionKotak()
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
function AutoValidasiWarning(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-left',
        loaderBg: '#ff6849',
        icon: 'warning',
        hideAfter: 3500,
        stack: 6
    });
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
function WSActionTransactionKotak() {
    var ValUserID = $("#hd_sessionLogin").val();
    var ValLayerID = $("#TrxLoginTypeAngka").val();
    var ValSpv = $("#TrxLayerUser").val();
    var result = "";
    var resultStart = "";
    var resultEnd = "";
    var messageDiv = $('#1_TampungKotakAtas');
    //alert(ValUserID)
    //Exec SP_TempKotakThread
    console.log("{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}");
    $.ajax({
        type: "POST",
        url: "asmx/ServiceThread.asmx/ActionTransactionKotak",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;
            var x = 0;
            messageDiv.empty();
            console.log(json);
            for (x = 0; x < 1; x++) {

                result += "<div class='row'>";
                for (i = 0; i < json.length; i++) {
                    if (json[i].ChannelData == "Email") {
                        var TrxColor = "primary";
                        var imgChannel = "email.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Call") {
                        var TrxColor = "primary";
                        var imgChannel = "inbound.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Instagram") {
                        var TrxColor = "primary";
                        var imgChannel = "instagram.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Facebook") {
                        var TrxColor = "primary";
                        var imgChannel = "facebook.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Whatsapp") {
                        var TrxColor = "primary";
                        var imgChannel = "whatsapp.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Twitter") {
                        var TrxColor = "primary";
                        var imgChannel = "twitter.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Outbound") {
                        var TrxColor = "primary";
                        var imgChannel = "outgoingcall.png";
                        var sizeImg = "36";
                    } else if (json[i].ChannelData == "Tokopedia") {
                        var TrxColor = "primary";
                        var imgChannel = "tokopedia.png";
                        var sizeImg = "46";
                    } else if (json[i].ChannelData == "Shopee") {
                        var TrxColor = "primary";
                        var imgChannel = "shopee.png";
                        var sizeImg = "46";
                    } else if (json[i].ChannelData == "Lazada") {
                        var TrxColor = "primary";
                        var imgChannel = "lazada.png";
                        var sizeImg = "46";
                    } else if (json[i].ChannelData == "WalkIN") {
                        var TrxColor = "primary";
                        var imgChannel = "walkin.png";
                        var sizeImg = "46";
                    } else if (json[i].ChannelData == "Multichat") {
                        var TrxColor = "primary";
                        var imgChannel = "messenger.png";
                        var sizeImg = "46";
                    }

                    result += '<div class="col-12 col-lg-3"><a href="1_Thread.aspx?mid=1009&name=' + json[i].ChannelData + '">' +
                        '<div class="box-body br-1 border-light">' +
                        '<div class="flexbox mb-1">' +
                        '<span>' +
                        '<img class="img-bordered-sm" src="../images/icon/channel/' + imgChannel + '" alt="' + json[i].ChannelData + '" height="' + sizeImg + '"><!--<i class="' + json[i].statusIcon + ' font-size-46"></i>-->' +
                        '<!--<br>' +
                        json[i].ChannelData +
                        '--></span>' +
                        '<span class="text-' + TrxColor + ' font-size-40">' + json[i].JumlahData + '</span>' +
                        '</div>' +
                        '<div class="progress progress-xxs mt-10 mb-0">' +
                        '<div class="progress-bar bg-' + TrxColor + '" role="progressbar" style="width: 100%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>' +
                        '</div>' +
                        '</div>' +
                        '</a></div>';

                }
                result += "</div>";
            }
            messageDiv.append(result);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function PreviewEmail(TrxEmailID) {
    $("#ThreadNumber").val(TrxWhatsAppID);
    document.getElementById("framefile_html").src = "https://show.uidesk.id/mbai/FileEmail/INBOX/" + TrxEmailID + "/file.html"
    $("#modal-center-email").modal('show')
}
function PreviewWhatsApp(TrxWhatsAppID, nameChannel) {
    //document.getElementById("framefile_html").src = "http://10.28.2.222/brilifecc/apps/template/wa.html?convid=" + TrxWhatsAppID + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=" + TrxWhatsAppID.replace("WA-", "") + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=51"
    //$("#modal-center-email").modal('show')
    $("#ThreadNumber").val(TrxWhatsAppID);
    if (nameChannel == "Multichat") {
        document.getElementById("framefile_html").src = "https://multichat-2.uidesk.id/chat/" + TrxWhatsAppID + "/history?token=" + $("#SM_MultiChatToken").val() + "";
    } else {
        document.getElementById("framefile_html").src = "template/index.html?channel=" + nameChannel + "&convid=" + TrxWhatsAppID + "";
    }

    $("#modal-center-email").modal('show');
}
function PreviewSosmed(TrxWhatsAppID) {
    document.getElementById("framefile_html").src = "https://omnichannel.uidesk.id/omnichannel_dev/apps/template/socialmedia.html?convid=" + TrxWhatsAppID + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=" + TrxWhatsAppID.replace("WA-", "") + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=51"
    $("#modal-center-email").modal('show')
}
//New Restu Merge ticket
function getWS_DataTicketYangAkanDigabung(value) {
    var selectedValue = value;

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#Cari_TicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK55'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";
            console.log(json);
            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].TglKejadian.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');


                $("#gabungTicketDari").text($("#Cari_TicketNumber").val());
                $("#gabungCategoryDari").text(json[i].CategoryName);
                $("#gabungKeluhanDari").html(json[i].ExtractComplaint + "<br>" + json[i].ExtractResponse);
                $("#gabungTanggalDari").text(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $("#gabungNamaDari").text(json[i].NAMA_PELAPOR);
                $("#gabungMergeButton").show();
                $("#gabungKeterangan").show();

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function popupMergeTicket() {
    var ticketid = getParameterByName("ticketid");
    var ticketcategory = $("#Ticket_Category").text();
    var ticketkeluhanasal = $("#Ticket_Complaints").text();
    var ticketnamaasal = $("#TxtName").val();
    var tickettanggalasal = $("#Ticket_DateofTransaction").text();
    console.log(ticketnamaasal);
    console.log(ticketkeluhanasal);
    $("#gabungTicketAsal").text(ticketid);
    $("#gabungCategory").text(ticketcategory);
    $("#gabungKeluhanAsal").html(ticketkeluhanasal);
    $("#gabungTanggalAsal").text(tickettanggalasal);
    $("#gabungNamaAsal").text(ticketnamaasal);
}
function SearchDataTicket() {
    console.log("Mulai Cari Ticket");
    getWS_DataTicketYangAkanDigabung($("#Cari_TicketNumber").val());
}
function MergeThisTicket() {
    console.log("Merge This Thread");
    //var form_data = JSON.stringify({ TrxTicketAsal: $("#ThreadNumber").val(), TrxTicketDari: $("#gabungTicketDari").text(), TrxMergeDescription: encodeData($("#gabungKeteranganEditor").val()), TrxAgentCreate: $("#hd_sessionLogin").val() });

    //console.log(form_data);
    swal({
        title: "Do you want to process merge?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxTicketAsal: $("#ThreadNumber").val(), TrxTicketDari: $("#gabungTicketDari").text(), TrxMergeDescription: encodeData($("#gabungKeteranganEditor").val()), TrxAgentCreate: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrxMergeTicket.asmx/InsertTransactionMergeThread",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        swal("Done!", {
                            icon: "success",
                        });
                        //window.location.reload();
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

                //window.location.reload();
            } else {
                //swal("Your imaginary file is safe!");          
            }
        });
    //getWS_DataTicketYangAkanDigabung($("#Cari_TicketNumber").val());
}
//End