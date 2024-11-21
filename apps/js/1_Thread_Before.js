$(document).ready(function () {
    getWS_1_Thread_select();
    WSActionTransactionKotak();
});
function getWS_1_Thread_select() {
    //alert("test")
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxUnitKerja = $("#ContentPlaceHolder1_TrxUnitKerja").val();
    var TrxLevelUser = $("#ContentPlaceHolder1_TrxLevelUser").val();
    var result = "";

    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxUnitKerja : " + $("#ContentPlaceHolder1_TrxUnitKerja").val());
    console.log("TrxLevelUser : " + $("#ContentPlaceHolder1_TrxLevelUser").val());

    //Exec TR_DataThread
    var myTable = $('#ticketThread').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/ServiceThread.asmx/DataTableThread",
        data: "{TrxUserName: '" + TrxUserName + "',TrxUnitKerja: '" + TrxUnitKerja + "',TrxLevelUser: '" + TrxLevelUser + "'}",
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
                    if (json[i].CustomerID == null) {
                        var CustomerID = "-"
                    } else {
                        var CustomerID = json[i].CustomerID
                    }
                    if (json[i].ThreadCustomerName == null) {
                        var CustomerName = "-"
                    } else {
                        var CustomerName = json[i].ThreadCustomerName
                    }
                    if (json[i].Subject == null) {
                        var CustomerSubject = "-"
                    } else {
                        var CustomerSubject = json[i].Subject
                    }
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
                            "<a class='dropdown-item' href='#' onclick=PreviewWhatsApp('" + json[i].GenesysNumber + "')><i class='fa fa-folder-open-o'></i> Preview WA</a>" +
                            "<a class='dropdown-item' href='#' onclick=PreviewSosmed('" + json[i].GenesysNumber + "')><i class='fa fa-folder-open-o'></i> Preview Sosmed</a>" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else if (json[i].ValueThread == "Twitter") {
                        var TrxColor = "primary";
                    } else if (json[i].ValueThread == "Outbound Call") {
                        var FollowThread = "Outbound Call"
                        var TrxColor = "danger";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='1_doticket.aspx?id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "' title='" + json[i].ValueThread + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                            "</div>" +
                            "</div>"
                    } else {
                        var TrxColor = "success";
                        var urlClick = "<div class='dropdown'>" +
                            "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                            "<div class='dropdown-menu dropdown-menu-right'>" +
                            "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-ban'></i> Spam</a>" +
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
                        }else{
                            var TrxIcon = "<span class='badge badge-pill badge-" + TrxColor + "' style='width: 90px;'><a style='color:white;' href='1_doticket.aspx?n=1&id=" + json[i].CustomerID + "&channel=" + FollowThread + "&n=1&threadid=" + json[i].ThreadID + "&numberid=" + json[i].GenesysNumber + "&account=" + json[i].Account + "'>" + json[i].ValueThread + "</a></span>"
                        }
                    }
                    if (json[i].AgentName == "" || json[i].AgentName == null) {
                        var TrxAgent = "<center>-</center>";
                    } else {
                        var TrxAgent = "<span class='badge badge-pill badge-warning' style='width: 100px;color:white;'>" + json[i].AgentName + "</span>";
                    }
                    myTable.row.add([CustomerID, CustomerName, TrxIcon, json[i].GenesysNumber, json[i].Account, CustomerSubject, TrxAgent, newDate + ' ' + newTime, urlClick]).draw(false);
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
    var messageDiv = $('#1_TampungKotakAtas');
    //alert(ValUserID)
    //Exec SP_TempKotakThread
    $.ajax({
        type: "POST",
        url: "asmx/ServiceThread.asmx/ActionTransactionKotak",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = 0;
            messageDiv.empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].ChannelData == "Email") {
                    var TrxColor = "info";
                } else if (json[i].ChannelData == "call") {
                    var TrxColor = "danger";
                } else if (json[i].ChannelData == "Facebook") {
                    var TrxColor = "primary";
                } else if (json[i].ChannelData == "Instagram") {
                    var TrxColor = "warning";
                } else if (json[i].ChannelData == "Facebook") {
                    var TrxColor = "primary";
                } else if (json[i].ChannelData == "Whatsapp") {
                    var TrxColor = "success";
                } else if (json[i].ChannelData == "Twitter") {
                    var TrxColor = "primary";
                } else if (json[i].ChannelData == "Outbound Call") {
                    var TrxColor = "danger";
                }
                
                result = '<div class="col-12 col-lg-3">' +
                    '<div class="box-body br-1 border-light">' +
                    '<div class="flexbox mb-1">' +
                    '<span>' +
                    '<i class="' + json[i].statusIcon + ' font-size-26"></i>' +
                    '<br>' +
                    json[i].ChannelData +
                    '</span>' +
                    '<span class="text-' + TrxColor +' font-size-40">' + json[i].JumlahData + '</span>' +
                    '</div>' +
                    '<div class="progress progress-xxs mt-10 mb-0">' +
                    '<div class="progress-bar bg-' + TrxColor +'" role="progressbar" style="width: 50%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
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
function PreviewEmail(TrxEmailID) {
    document.getElementById("framefile_html").src = "http://10.28.2.222/brilifecc/FileEmail/INBOX/" + TrxEmailID + "/file.html"
    $("#modal-center-email").modal('show')
}
function PreviewWhatsApp(TrxWhatsAppID) {
    document.getElementById("framefile_html").src = "http://10.28.2.222/brilifecc/apps/template/wa.html?convid=" + TrxWhatsAppID + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=" + TrxWhatsAppID.replace("WA-", "") + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=51"
    $("#modal-center-email").modal('show')
}
function PreviewSosmed(TrxWhatsAppID) {
    document.getElementById("framefile_html").src = "https://omnichannel.uidesk.id/omnichannel_dev/apps/template/socialmedia.html?convid=" + TrxWhatsAppID + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=" + TrxWhatsAppID.replace("WA-", "") + ""
    //document.getElementById("framefile_html").src = "http://omnichannel.uidesk.id/omnichannel_dev/apps/template/wa.html?convid=51"
    $("#modal-center-email").modal('show')
}