$(document).ready(function () {
    if ($("#TrxLoginTypeAngka").val() == "3") {
        $("#escalationto").css("display", "none");
        $("#P_Escalation").append("Re Assign");
    } else {
        $("#P_Escalation").append("Escalation");
    }

    getWS_DataTicket(getParameterByName('ticketid'));
    getWS_JourneyTicketLoad(getParameterByName('ticketid'));
    getWS_MasterLoad();
    console.log("Ticket ID " + getParameterByName('ticketid'));

    $("#TxtSearchingEscalation").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingEscalation($(this).val());
        } else if (jumlahString == 0) {
            SearchingEscalation($(this).val(""));
        }
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
function getWS_EscalationChannel(value) {

}
function getWS_DataProfile(value) {
    var selectedValue = value;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');
                $("#Journey_DateofBirth").val(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $('#Gender' + json[i].JenisKelamin + '_Journey').prop('checked', true);
                $('#TxtName').val(json[i].Name);
                $('#TxtProfileEmail').val(json[i].Email);
                $('#TxtProfilePhone').val(json[i].HP);
                CKEDITOR.instances.TxtAddress.setData(json[i].Alamat)
                $('#Journey_PolisNumber').val(json[i].PolisNumber);
                $('#Journey_NIK').val(json[i].NIK);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_JourneyTicketLoad(value) {
    var dataJourney = "";
    var iconChannel = "";
    var channelDesc = "";
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + value + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK54'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";
            for (i = 0; i < json.length; i++) {

                var HeaderTicketNumber = json[i].TicketNumber
                if (json[i].ThreadDescription == null) {
                    var TrxThreadDescription = "";
                } else {
                    var TrxThreadDescription = '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<div class="timeline-body">' +
                        '' + json[i].ThreadDescription + '' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<p class="pull-right text-fade" style="font-size:12px;">' + json[i].DateThread + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                if (json[i].ValueThread == "Outbound Call") {
                    var IconChannel = "Call"
                    var IconChannelSosialMedia = ""
                } else if (json[i].ValueThread == "EMAIL") {
                    var FileHTML = "https://crm.uidesk.id/roatex/FileEmail/INBOX/" + json[i].ThreadID + "/file.html"
                    var IconChannel = json[i].ValueThread
                    var IconChannelSosialMedia = ""
                } else if (json[i].ValueThread == "Whatsapp") {
                    var FileHTML = "https://crm.uidesk.id/roatex/apps/template/wa.html?convid=" + json[i].GenesysNumber + ""
                    var IconChannel = json[i].ValueThread
                    var FileHTMLSosialMedia = "https://crm.uidesk.id/roatex/apps/template/socialmedia.html?convid=" + json[i].GenesysNumber + ""
                    var IconChannelSosialMedia = '<a href=' + FileHTMLSosialMedia + ' target="_blank"><span class="timeline-label">' +
                        '<img alt="Profile" src="../images/icon/Information1.png" class="avatar mr-10">' +
                        '</span></a>'

                } else {
                    var FileHTML = ""
                    var IconChannel = json[i].ValueThread
                    var IconChannelSosialMedia = ""
                }
                if (json[i].InteractionID == "" || json[i].InteractionID == null) {
                    var TrxInteractionID = ""
                } else {
                    var TrxInteractionID = "<span class='btn btn-default btn-sm btn-rounded' style='width:100px' onclick=previewInteractionAttachmnent('" + json[i].InteractionID + "')><i class='fa fa-paperclip'></i>&nbsp;Attachment</span>"
                }
                dataJourney += '<a href=' + FileHTML + ' target="_blank"><span class="timeline-label">' +
                    '<img alt="Profile" src="../images/icon/' + IconChannel + '.png" class="avatar mr-10">' +
                    '</span></a>' +
                    '' + IconChannelSosialMedia + '' +
                    '<span class="timeline-label" style="margin-left:80px;">' +
                    '<span class="badge badge-pill badge-primary badge-lg">' + json[i].Account + '</span>' +
                    '</span>' +
                    '' + TrxThreadDescription + '' +
                    '<div class="timeline-item">' +
                    '<div class="timeline-point">' +
                    '<i class="fa fa-circle"></i>' +
                    '</div>' +
                    '<div class="timeline-event">' +
                    '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].AgentCreate + '</p>' +
                    '<div class="timeline-body">' +
                    '' + json[i].ResponseComplaint + '' +
                    '</div>' +
                    '<div class="timeline-footer">' +
                    '<p class="pull-left text-fade" style="font-size:12px;">' + TrxInteractionID + '</p>' +
                    '<p class="pull-right text-fade" style="font-size:12px;">' + json[i].DateCreate + '</p></br>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            }

            $("#P_TicketNumberJourney").append("<i class='fa fa-ticket'></i> " + HeaderTicketNumber);
            $('#Journey_ListOfTicket').append(dataJourney);

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_DataTicket(value) {
    var selectedValue = value;
    $("#hd_TicketNumber").val(selectedValue);
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#hd_TicketNumber").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK55'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].TglKejadian.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

                $("#Ticket_DateofTransaction").append(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $("#Ticket_ProductType").append(json[i].NamaPenyebab);
                $("#Ticket_ProductName").append(json[i].ProductName);
                $("#Ticket_AgentName").append(json[i].NAME);
                $("#Ticket_UserStatus").append(json[i].StatusName);
                $("#Ticket_Priority").append(json[i].SkalaPrioritas);
                $("#Ticket_UserCategory").append(json[i].JenisNasabah);
                $("#Ticket_BankAccount").append(json[i].NomorRekening);
                $("#Ticket_SourceChannel").append(json[i].SumberInformasi);
                $("#Ticket_Category").append(json[i].CategoryName);
                $("#Ticket_Enquiry").append(json[i].SubCategory1Name);
                $("#Ticket_EnquiryDetail").append(json[i].SubCategory2Name);
                $("#Ticket_EnquiryReason").append(json[i].SubCategory3Name);
                if (json[i].lengthComplaint > 300) {
                    $("#Ticket_Complaints").append(json[i].ExtractComplaint + "</br><a href='#' class='badge badge-pill badge-primary' onclick=ScriptFormated('" + $("#hd_TicketNumber").val() + "',1)>Read more</a>");
                } else {
                    $("#Ticket_Complaints").append(json[i].DetailComplaint);
                }
                if (json[i].lengthResponse > 300) {
                    $("#Ticket_NoteAgent").append(json[i].ExtractResponse + "</br><a href='#' class='badge badge-pill badge-primary' onclick=ScriptFormated('" + $("#hd_TicketNumber").val() + "',2)>Read more</a>");
                } else {
                    $("#Ticket_NoteAgent").append(json[i].ResponComplaint);
                }
                $("#Ticket_Status").append(json[i].Status);
                $("#Ticket_Escalation").append(json[i].ORGANIZATION_NAME);
                $('#Ticket_SLA').append("<i class='mdi mdi-timer'>" + json[i].SLA + "</i>");
                $("#Ticket_Layer_Eskalasi").append("Layer " + json[i].Layer);
                $("#hd_Journey_EscalationValue").val(json[i].Divisi)
                $("#ContentPlaceHolder1_TrxLayerEskalasi").val(json[i].Layer)

                if (json[i].DispatchType == "1") {
                    $("#P_TypeEscalation").append("Eksternal")
                    $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].VendorName + "</label></span>");
                } else if (json[i].DispatchType == "2") {
                    if (json[i].Dispatch_user != "" && json[i].Dispatch_user != null) {
                        $("#P_TypeEscalation").append("Individu");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'><a href='#' onclick=detailIndividu() style='color:white;cursor:pointer;'>Detail Individu</a></label></span>");
                    } else {
                        $("#P_TypeEscalation").append("Department");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].ORGANIZATION_NAME + "</label></span>");
                    }
                } else if (json[i].DispatchType == "3") {
                    if (json[i].Dispatch_user != "" && json[i].Dispatch_user != null) {
                        $("#P_TypeEscalation").append("Individu");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'><a href='#' onclick=detailIndividu() style='color:white;cursor:pointer;'>Detail Individu</a></label></span>");
                    } else {
                        $("#P_TypeEscalation").append("Department");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].ORGANIZATION_NAME + "</label></span>");
                    }
                } else {
                    if (json[i].TicketPosition == "1") {
                        $("#P_TypeEscalation").append("Department");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].ORGANIZATION_NAME + "</label></span>");
                    } else {
                        $("#P_TypeEscalation").append("Department");
                        $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;margin-top:-5px;'><label style='margin-top:5px;'>" + json[i].ORGANIZATION_NAME + "</label></span>");
                    }
                }

                $("#P_TicketNumber").append("<i class='fa fa-ticket'></i> " + json[i].TicketNumber);
                $("#P_Complaint").append(json[i].CategoryName);
                $("#P_Reason").append(json[i].SubCategory3Name);

                TrxAttachmentTicket($("#hd_TicketNumber").val());
                TrxAttachmentEmail($("#hd_TicketNumber").val());

                $("#ContentPlaceHolder1_TrxCustomerID").val(json[i].NIK)
                getWS_DataProfile(json[i].NIK);

                if ($("#TrxLoginTypeAngka").val() != json[i].TicketPosition) {
                    $("#btnInteraction").css("display", "none")
                    $("#btnAttachment").css("display", "none")
                    $("#escalationto").css("display", "none");
                    $("#ahref_Escalationto").css("display", "none");
                }

                if ($("#TrxLoginTypeAngka").val() == "3") {
                    $("#escalationto").css("display", "none");
                    $("#ahref_Escalationto").css("display", "none");
                }

                var TrxTicketPosition = json[i].TicketPosition
                if (TrxTicketPosition == "3") {
                    if ($("#TrxDivisi").val() == json[i].Divisi && json[i].Status != "Closed") {
                        $("#btnInteraction").css("display", "block")
                        $("#btnAttachment").css("display", "block")
                    } else {
                        $("#btnInteraction").css("display", "none")
                        $("#btnAttachment").css("display", "none")
                    }
                    if ($("#TrxLoginTypeAngka").val() != json[i].TicketPosition) {
                        $("#btnInteraction").css("display", "none")
                        $("#btnAttachment").css("display", "none")
                        $("#escalationto").css("display", "none");
                        $("#ahref_Escalationto").css("display", "none");
                    }

                }

                var ParamAccess = getParameterByName("access")
                if (ParamAccess == "1" && getParameterByName("status") != "Closed") {
                    $("#btnInteraction").css("display", "block")
                    $("#btnAttachment").css("display", "block")
                    $("#Journey_EscalationChannel").val("No");
                    $('#Journey_EscalationChannel').attr('disabled', true);
                } else if (getParameterByName("status") == "Closed" || getParameterByName("status") == "closed") {
                    $("#btnInteraction").css("display", "none");
                    $("#btnAttachment").css("display", "none");
                    $("#Journey_Status").attr('disabled', true);
                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK56'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;
            var DataListInteraction = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Channel == "No") {
                    var TrxChannel = $("#Ticket_SourceChannel").append()
                } else if (json[i].Channel == "Yes") {
                    var TrxChannel = "Walk-IN"
                } else {
                    var TrxChannel = json[i].Channel
                }
                if (json[i].lengthResponse > 2000) {
                    var TrxResponseComplaint = '<p class="font-size-12">' + json[i].ResponseComplaint + '</p>';
                    var TrxReadmore = "<a href='#' class='btn btn-flat btn-primary btn-sm' onclick='ScriptFormatedInteraction(" + json[i].ID + ")'><p class='font-size-12'>Read more</p></a>"
                } else {
                    var TrxResponseComplaint = '<p class="font-size-12">' + json[i].ExtractResponse + '</p>';
                    var TrxReadmore = ""
                }
                if (json[i].DispatchTypeName == null) {
                    var TrxDispatchTypeName = "Internal "
                } else {
                    var TrxDispatchTypeName = json[i].DispatchTypeName
                }
                if (json[i].DispatchValueName == null) {
                    var TrxDispatchValueName = "Internal "
                } else {
                    var TrxDispatchValueName = json[i].DispatchValueName
                }

                if (json[i].Status == "Open") {
                    var TrxColor = "primary"
                } else if (json[i].Status == "Pending") {
                    var TrxColor = "warning"
                } else if (json[i].Status == "Solved") {
                    var TrxColor = "success"
                } else {
                    var TrxColor = "danger"
                }
                if (json[i].InteractionID == "" || json[i].InteractionID == null) {
                    var TrxInteractionID = ""
                } else {
                    var TrxInteractionID = "<span class='btn btn-default btn-sm btn-rounded' style='width:100px' onclick=previewInteractionAttachmnent('" + json[i].InteractionID + "')><i class='fa fa-paperclip'></i>&nbsp;Attachment</span>"
                }
                DataListInteraction = '<span class="timeline-label">' +
                    '<img alt="Profile" src="../images/icon/' + TrxChannel + '.png" class="avatar mr-10">' +
                    '</span>' +
                    '<span class="timeline-label">' +
                    '<span class="badge badge-pill badge-primary badge-lg">' + json[i].InteractionType + '</span>' +
                    '</span>' +
                    '<div class="timeline-item">' +
                    '<div class="timeline-point">' +
                    '<i class="fa fa-circle"></i>' +
                    '</div>' +
                    '<div class="timeline-event">' +
                    '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].AgentCreateX + '</p>' +
                    '<div class="timeline-body">' +
                    '' + TrxResponseComplaint + '' +
                    '' + TrxReadmore + '' +
                    '</div>' +
                    '<br>' +
                    '<div class="timeline-footer">' +
                    '<span class="btn btn-' + TrxColor + ' btn-sm btn-rounded" style="width:100px;cursor:none;">' + json[i].Status + '</span>&nbsp;' + TrxInteractionID + '' +
                    '<p class="pull-right text-fade" style="font-size:12px;">' + json[i].TanggalNya + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('#Ticket_ListInteraction').append(DataListInteraction);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_MasterLoad() {
    var cmbDataSourceStatus = $('#Journey_Status');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#TrxLoginTypeAngka").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK57'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceStatus = "";

            for (i = 0; i < json.length; i++) {

                resultSourceStatus = '<option value="' + json[i].lblStatus + '">' + json[i].lblStatus + '</option>';
                cmbDataSourceStatus.append(resultSourceStatus);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_SelectedEscalationType(type, value, typeName, valueName) {
    //alert("hd_Journey_EscalationType " + type)
    //alert("hd_Journey_EscalationValue " + value)
    //alert("P_TypeEscalation " + typeName)
    //alert("Journey_EscalationValue " + valueName)
    $("#modal-ShowEscalation").modal('hide');
    $("#hd_Journey_EscalationType").val(type);
    $("#hd_Journey_EscalationValue").val(value);
    $("#Journey_EscalationValue").empty();
    //$("#Journey_EscalationValue").append(typeName + '-' + valueName);
    $("#P_TypeEscalation").empty();
    $("#P_TypeEscalation").append(typeName);
    $("#Journey_EscalationValue").append("<span class='badge badge-pill badge-primary' style='width:100%;height:33px;font-weight:bold;'><label style='margin-top:5px;'>" + valueName + "</label></span>");
    $("#Journey_EscalationChannel").val("Yes");
}
function post_WS_DataInteraction() {
    var TrxTicketNumber = $("#hd_TicketNumber").val();
    var TrxResponse = CKEDITOR.instances.Journey_Response.getData();
    var TrxStatus = $("#Journey_Status").val();
    var TrxUsername = $("#hd_sessionLogin").val();
    if (getParameterByName('channel') != null) {
        var TrxChannel = getParameterByName('channel');
    } else {
        var TrxChannel = $("#Journey_EscalationChannel").val();
    }
    var TrxThreadID = getParameterByName('threadid');
    var TrxGenesysID = getParameterByName('numberid');
    var TrxEscalasiType = $("#hd_Journey_EscalationType").val();
    var TrxEscalasiValue = $("#hd_Journey_EscalationValue").val();
    var TrxEscalasiText = $("#Journey_EscalationValue").text();

    if ($("#TrxLayerUser").val() == "layer1") {
        if ($("#Journey_EscalationChannel").val() == "Yes") {
            var TrxDispatchToLayer = $("#ContentPlaceHolder1_TrxLayerEskalasi").val()
        } else {
            var TrxDispatchToLayer = $("#hd_EscalationIdentity").val();
        }
    } else {
        var TrxDispatchToLayer = $("#hd_EscalationIdentity").val();
    }
    //alert($("#Journey_EscalationChannel").val())
    //alert(TrxDispatchToLayer)
    //return false
    if (TrxResponse === '') {
        swal("Description is empty");
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    if (TrxStatus === '') {
        swal("Status is empty");
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    if (TrxChannel === '') {
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    if ($("#hd_Journey_EscalationType").val() === '') {
        var TrxEscalasiType = "2";
    } else {
        var TrxEscalasiType = $("#hd_Journey_EscalationType").val();
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

                $.ajax({
                    type: "POST",
                    url: "WebServiceTransaction.asmx/Update_TransactionTicket",
                    data: "{ TrxTicketNumber: '" + TrxTicketNumber + "',TrxResponse: '" + TrxResponse + "',TrxStatus: '" + TrxStatus + "',TrxUsername: '" + TrxUsername + "',TrxChannel: '" + TrxChannel + "', TrxThreadID: '" + TrxThreadID + "', TrxGenesysID: '" + TrxGenesysID + "', TrxEscalasiUnit:'" + TrxEscalasiValue + "', DispatchType:'" + TrxEscalasiType + "',TrxDispatchToLayer:'" + TrxDispatchToLayer + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {
                            
                            if (json[i].Result === 'True') {
                                console.log(json[i].msgSystem)
                                location.href = "1_journey.aspx?ticketid=" + getParameterByName("ticketid") + "&status=" + TrxStatus +""
                                $.toast({
                                    heading: 'Hi lovely agent...',
                                    text: 'Your interaction has been added...',
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'success',
                                    hideAfter: 3500,
                                    stack: 6
                                });

                            } else {
                                return false;
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
        })

}
function LoadDataRelatedTicket() {
    var TicketNumber = getParameterByName('ticketid')
    var cmbDataSourceStatus = $('#Journey_Status');
    var storeDataInteractionInternal;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK58'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceStatus = "";
            for (i = 0; i < json.length; i++) {

                if (json[i].lengthResponse > 2000) {
                    var TrxResponseComplaint = "<p class='box-text'>'" + json[i].ExtractResponse + "'</br><a href='#' class='btn btn-rounded btn-sm btn-primary' onclick='ScriptFormatedInteraction(" + json[i].ID + ")'>Read more</a></p>"
                } else {
                    var TrxResponseComplaint = json[i].NOTE
                }

                var d = new Date(json[i].DATECREATE);
                var milisegundos = parseInt(json[i].DATECREATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                storeDataInteractionInternal = '<div class="post clearfix"> ' +
                    '<div class="user-block"> ' +
                    '<img class="img-bordered-sm rounded-circle" src="../images/user7-128x128.jpg" alt="user image"> ' +
                    '<span class="username"> ' +
                    '<a href="#">' + json[i].USERCREATE + '</a> ' +
                    '</span> ' +
                    '<span class="description"><p class="font-size-10">' + newDate + newTime + '</p></span> ' +
                    '</div> ' +
                    '<div class="activitytimeline"> ' +
                    '<p class="font-size-12">' + TrxResponseComplaint + '</p> ' +
                    '</div> ' +
                    '</div>'

                $('#Journey_InternalNote').append(storeDataInteractionInternal);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrxAttachmentTicket(TrxTicketNumber) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxTicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK59'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            if (json.length != "" || json.length != "0" ) {

                $('#divAttachmentTicket').empty();
                for (i = 0; i < json.length; i++) {

                    if (json[i].FileType == "doc") {
                        var FileTypes = "word";
                    } else if (json[i].FileType == "pdf") {
                        var FileTypes = "pdf";
                    }
                    else if (json[i].FileType == "xls") {
                        var FileTypes = "excel";
                    }
                    else if (json[i].FileType == "xlsx") {
                        var FileTypes = "excel";
                    }
                    else if (json[i].FileType == "zip") {
                        var FileTypes = "zip";
                    }
                    else if (json[i].FileType == "txt") {
                        var FileTypes = "code";
                    }
                    else if (json[i].FileType == "rar") {
                        var FileTypes = "zip";
                    }
                    else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "gif" || json[i].FileType == "bmp") {
                        var FileTypes = "image";
                    }

                    resultComposeBodyAttachment = '<ul class="mailbox-attachments clearfix">' +
                        '<li>' +
                        '<center style="font-size:10px;"><span class="badge badge-pill badge-default">' + json[i].Usercreate + '</span></center>' +
                        '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o"></i></span>' +
                        '<div class="mailbox-attachment-info">' +
                        '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].Filename.substring(0, 15) + '</a>' +
                        '<span class="mailbox-attachment-size">' + json[i].FileSize + '' +
                        '<a href=' + json[i].Path + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                        '</span>' +
                        '</div>' +
                        '</li>' +
                        '<ul>'
                    $('#divAttachmentTicket').append(resultComposeBodyAttachment)

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
function TrxAttachmentEmail(TrxTicketNumber) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxTicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK60'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            if (json.length != "" || json.length != "0") {

                $('#divAttachmentEmail').empty();
                for (i = 0; i < json.length; i++) {

                    if (json[i].FILETYPE == ".doc" || json[i].FILETYPE == "doc") {
                        var FileTypes = "word";
                    } else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                        var FileTypes = "pdf";
                    }
                    else if (json[i].FILETYPE == ".xls" || json[i].FILETYPE == "xls") {
                        var FileTypes = "excel";
                    }
                    else if (json[i].FILETYPE == ".xlsx" || json[i].FILETYPE == "xlsx") {
                        var FileTypes = "excel";
                    }
                    else if (json[i].FILETYPE == ".zip" || json[i].FILETYPE == "zip") {
                        var FileTypes = "zip";
                    }
                    else if (json[i].FILETYPE == ".txt" || json[i].FILETYPE == "txt") {
                        var FileTypes = "code";
                    }
                    else if (json[i].FILETYPE == ".rar" || json[i].FILETYPE == "rar") {
                        var FileTypes = "zip";
                    }
                    else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == ".bmp") {
                        var FileTypes = "image";
                    }

                    if (json[i].FILESIZE == null) {
                        var TrxFILESIZE = "-";
                    }

                    if (json[i].DIRECTION == "IN") {
                        var TrxFILENAME = '<a href=https://crm.uidesk.id/roatex/FILeEmail/INBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>'
                        var TrxDIRECTION = '<a href=https://crm.uidesk.id/roatex/FILeEmail/INBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>'
                    } else if (json[i].DIRECTION == "OUT") {
                        var TrxFILENAME = '<a href=https://crm.uidesk.id/roatex/FILeEmail/OUTBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>'
                        var TrxDIRECTION = '<a href=https://crm.uidesk.id/roatex/FILeEmail/OUTBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>'
                    }
                    resultComposeBodyAttachment = '<ul class="mailbox-attachments clearfix">' +
                        '<li>' +
                        '<center style="font-size:10px;"><span class="badge badge-pill badge-default">' + $("#TxtProfileEmail").val() + '</span></center>' +
                        '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o"></i></span>' +
                        '<div class="mailbox-attachment-info">' +
                        '' + TrxFILENAME + '' +
                        '<span class="mailbox-attachment-size">' + TrxFILESIZE + '' +
                        '' + TrxDIRECTION + '' +
                        '</span>' +
                        '</div>' +
                        '</li>' +
                        '<ul>'
                    $('#divAttachmentEmail').append(resultComposeBodyAttachment)

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
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function modalEscalation() {
    $('#modal-ShowEscalation').modal('show');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK61'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, varListOfEscalation = "";

            $('#Journey_ListEscalation').empty();
            for (i = 0; i < json.length; i++) {

                varListOfEscalation = '<div class="col-12 col-lg-3"> ' +
                    '<div class="box ribbon-box"> ' +
                    '<!--<div class="ribbon-two ribbon-two-primary"><span>' + json[i].LEVELUSER + '</span></div>--> ' +
                    '<div class="box-header no-border p-0"> ' +
                    '<a onclick="getWS_SelectedEscalationType(&#39;2&#39;,&#39;' + json[i].ORGANIZATION_ID + '&#39;,&#39;Internal&#39;,&#39;' + json[i].ORGANIZATION_NAME + '&#39;)" style="cursor:pointer;"> ' +
                    '<img class="img-fluid" src="../images/card/4.jpg" alt=""> ' +
                    '</a> ' +
                    '</div> ' +
                    '<div class="box-body"> ' +
                    '<div class="user-contact list-inline text-center"> ' +
                    '<a href="#" class="btn btn-circle btn-success mb-5"><i class="fa fa-whatsapp"></i></a> ' +
                    '<a href="#" class="btn btn-circle mb-5 btn-warning" title=' + json[i].EMAIL + '><i class="fa fa-envelope"></i></a> ' +
                    '</div> ' +
                    '<div class="text-center"> ' +
                    '<h3 class="my-10"><a href="#" style="cursor:none;">' + json[i].ORGANIZATION_NAME + '</a></h3> ' +
                    '<!--<h6 class="user-info mt-0 mb-10 text-fade">' + json[i].EMAIL + '</h6>-->' +
                    '<!--<p class="text-fade w-p85 mx-auto">125 Ipsum Lorem Ave, Suite 458 New York, USA 154875 </p>-->' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>';

                $('#Journey_ListEscalation').append(varListOfEscalation);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//* Upload Attachment Ticket *//
$('#files').change(function () {
    var filename = $('#files').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='files']", function (e) {
    $(".hiddenX").show();

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 10) {
            swal(
                '',
                'Please upload file less than 10 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "mp4" || fileextension == "mp3" || fileextension == "Mp4" || fileextension == "Mp3" ||fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#hd_sessionLogin").val());
        data.append("numberid", getParameterByName('numberid'));
        data.append("customerid", $("#ContentPlaceHolder1_TrxCustomerID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "WebServiceTransaction.asmx/UploadFileAttachmentTicket",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());
            $("#divFooter").css("display", "block");
            TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());

        });
        request.fail(function (response) {
            console.log(response.responseText);
        });
        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
function TrxAttachmentInteractionTicket(TrxUserName) {
    $('#divfile').css('display', 'block');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "', TrxUserName: '" + TrxUserName + "', TrxAction: 'UIDESK62'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            $('#divAttachmentInteractionTicket').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].FileType == "doc") {
                    var FileTypes = "word";
                } else if (json[i].FileType == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].FileType == "xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].FileType == "xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].FileType == "zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FileType == "txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FileType == "rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "gif" || json[i].FileType == "bmp") {
                    var FileTypes = "image";
                }

                resultComposeBodyAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<center style="font-size:10px;"><span class="badge badge-pill badge-default">' + json[i].Usercreate + '</span></center>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].Filename + '</a>' +
                    '<span class="mailbox-attachment-size">' + json[i].FileSize + '' +
                    '<a href=' + json[i].Path + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#divAttachmentInteractionTicket').append(resultComposeBodyAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteAttachment(TrxID) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: TrxID });
                $.ajax({
                    url: "WebServiceTransaction.asmx/DeleteAttachmentTicket",
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
                                    TrxAttachmentTicket($("#hd_TicketNumber").val());
                                    TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    TrxAttachmentTicket($("#hd_TicketNumber").val());
                                    TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());
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
function SearchingEscalation(TrxSearchText) {
    var selectedText = $("#Journey_EscalationType").find("option:selected").text();
    var selectedValue = $("#Journey_EscalationType").val();
    var JourneyEscalationTo = $("#hd_EscalationTo").val();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxJourneyEscalation",
        data: "{TrxID:'" + $("#hd_Journey_EscalationValue").val() + "', TrxSearching:'" + TrxSearchText + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK200'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, varListOfEscalation = "";

            $('#Journey_ListEscalation').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].ORGANIZATION_NAME != null) {
                    var TrxDetail = json[i].ORGANIZATION_NAME
                } else {
                    var TrxDetail = json[i].EMAIL_ADDRESS
                }
                if (json[i].LOGIN == null) {
                    var Trxlogin = "danger"
                } else if (json[i].LOGIN == "1") {
                    var Trxlogin = "success"
                } else {
                    var Trxlogin = "danger"
                }
                varListOfEscalation = '<div class="col-12 col-lg-3"> ' +
                    '<div class="box ribbon-box"> ' +
                    '<div class="ribbon-two ribbon-two-primary"><span>' + json[i].LEVELUSER + '</span></div> ' +
                    '<div class="box-header no-border p-0"> ' +
                    '<img class="img-fluid" src="../images/card/4.jpg" alt=""> ' +
                    '</a> ' +
                    '</div> ' +
                    '<div class="box-body"> ' +
                    '<div class="user-contact list-inline text-center"> ' +
                    '<a href="#" class="btn btn-circle btn-' + Trxlogin + ' mb-5" onclick="selectedIndividual(' + json[i].USERID + ')"></a> ' +
                    '<a href="#" class="btn btn-circle mb-5 btn-warning" title="' + json[i].EMAIL_ADDRESS + '"><i class="fa fa-envelope"></i></a> ' +
                    '</div> ' +
                    '<div class="text-center"> ' +
                    '<h5 class="my-10"><a href="#">' + json[i].USERNAME + '</a></h5> ' +
                    '<h6 class="user-info mt-0 mb-10 text-fade">' + TrxDetail + '</h6>' +
                    '<!--<p class="text-fade w-p85 mx-auto">125 Ipsum Lorem Ave, Suite 458 New York, USA 154875 </p>-->' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>';

                $('#Journey_ListEscalation').append(varListOfEscalation);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    if (selectedText != 'NO') {
        $('#modal-ShowEscalation').modal('show');
    } else {
        getWS_SelectedEscalationType(0, 0, 'NO', 'NO');
    }
}
function ScriptFormated(TrxTicketNumber, TrxFormated) {
    $("#modal-description").modal('show')
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxTicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK63'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {

                if (TrxFormated == "1") {
                    document.getElementById("Pre_Ticket_Detail").innerHTML = json[i].DetailComplaint;
                } else {
                    document.getElementById("Pre_Ticket_Detail").innerHTML = json[i].ResponComplaint;
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
function ScriptFormatedInteraction(TrxInteractionID) {
    $("#modal-interaction").modal('show')
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxInteractionID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK64'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {
                document.getElementById("Pre_Ticket_Interaction").innerHTML = json[i].ResponseComplaint;
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function post_WS_TicketReminder() {
    if ($("#Reminder_Ticket").val() == "") {
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    if ($("#Reminder_Date").val() == "") {
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    var TrxDescription = CKEDITOR.instances.Reminder_Description.getData();
    if (TrxDescription == "") {
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    var TrxTicketNumber = getParameterByName("ticketid")
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TicketNumber: TrxTicketNumber, TrxJudul: $("#Reminder_Ticket").val(), TrxTanggal: $("#Reminder_Date").val(), TrxDescription: encodeData(TrxDescription), TrxUserCreate: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceTransaction.asmx/InsertTransactionTicketReminder",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        $("#Reminder_Ticket").val("");
                        $("#Reminder_Date").val("");
                        CKEDITOR.instances.Reminder_Description.setData("")
                        TrmTicketReminder();
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
                swal("Done", {
                    icon: "success",
                });
                $("#Reminder_Ticket").val("");
                $("#Reminder_Date").val("");
                CKEDITOR.instances.Reminder_Description.setData("")
                $("#reminder_display").css("display", "block");
                TrmTicketReminder();
                //window.location.reload();
            } else {
                //swal("Your imaginary file is safe!");          
            }
        });
}
function TrmTicketReminder() {
    var TicketNumber = getParameterByName("ticketid")
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK65'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultReminderListTransaction = "";

            $('#Reminder_ListTransaction').empty();
            if (json.length == 0) {
                $("#reminder_display").css("display", "none");
            }
            else {
                for (i = 0; i < json.length; i++) {
                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    resultReminderListTransaction = '<span class="timeline-label">' +
                        '<span class="badge badge-pill badge-primary badge-lg">' + json[i].UserCreate + '</span>' +
                        '</span>' +
                        '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<div class="timeline-heading">' +
                        '<h6 class="timeline-title">' + json[i].JudulReminder + '</h6>' +
                        '</div>' +
                        '<div class="timeline-body">' +
                        '<p class="font-size-12">' + json[i].DescriptionReminder + '</p>' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<time class="float-left text-fade" datetime="2017">' + newDate + newTime + '</time>' +
                        '<p class="text-right"><span class="btn btn-success btn-sm btn-rounded">' + json[i].Tanggal + '</span></p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    $('#Reminder_ListTransaction').append(resultReminderListTransaction)
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
function display_setting() {
    TrmTicketReminder();
}
function display_internal() {
    LoadDataRelatedTicket();
}
function previewInteractionAttachmnent(valueid) {
    $("#modal-interaction-attachment").modal('show')
    var TicketNumber = getParameterByName("ticketid")
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxJourneyEscalation",
        data: "{TrxID:'" + TicketNumber + "', TrxSearching:'" + valueid + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK201'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultInteractionAttachment = "";

            $('#InteractionAttachment').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].FileType == "doc") {
                    var FileTypes = "word";
                } else if (json[i].FileType == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].FileType == "xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].FileType == "xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].FileType == "zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FileType == "txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FileType == "rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "JPG" || json[i].FileType == "gif" || json[i].FileType == "bmp") {
                    var FileTypes = "image";
                }

                resultInteractionAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<center style="font-size:10px;margin-top:5px;"><span class="badge badge-pill badge-default">' + json[i].Usercreate + '</span></center>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].Filename + '</a>' +
                    '<span class="mailbox-attachment-size">' + json[i].FileSize + '' +
                    '<a href=' + json[i].Path + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachmentInteraction(' + json[i].ID + ',' + json[i].InteractionID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#InteractionAttachment').append(resultInteractionAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function deleteAttachmentInteraction(TrxID, InteractionID) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({ TrxID: TrxID });
                $.ajax({
                    url: "WebServiceTransaction.asmx/DeleteAttachmentTicket",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    previewInteractionAttachmnent(InteractionID);
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    previewInteractionAttachmnent(InteractionID);
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
function detailIndividu() {
    var TicketNumber = getParameterByName("ticketid")
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxJourneyEscalation",
        data: "{TrxID:'" + TicketNumber + "', TrxSearching:'" + TicketNumber + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK202'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x = "", varListOfEscalationIndividu = "";

            $('#Journey_Escalation_Individual').empty();
            for (i = 0; i < json.length; i++) {

                varListOfEscalationIndividu = '<div class="media media-single">' +
                    '<a href="#">' +
                    '<img class="avatar avatar-lg" src="../images/avatar/2.jpg" alt="...">' +
                    '</a>' +
                    '<div class="media-body">' +
                    '<h6><a href="#">' + json[i].TrxUserName + '</a></h6>' +
                    '<small class="text-fader" style="width:200px;">' + json[i].TrxDepartment + '</small>' +
                    '</div>' +
                    '</div>';

                $('#Journey_Escalation_Individual').append(varListOfEscalationIndividu);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $('#modal-individual').modal('show');
    $("#BTN_SubmitIndividual").css("display", "none")
}
function get_EscalationStatus(TrxValues) {
    if ($("#Journey_Status").val() == "Closed") {
        $("#Journey_EscalationChannel").val("No");
        $('#Journey_EscalationChannel').attr('disabled', true);
    } else {
        $("#Journey_EscalationChannel").val("");
        $('#Journey_EscalationChannel').attr('disabled', false);
    }
}