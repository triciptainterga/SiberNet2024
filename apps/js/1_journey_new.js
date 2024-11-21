// JavaScript source code
var idWA = "3";
var noWA = "08170154444";
var apiKeyWA = "qRbkioekrn2xVSUwQWWiBzet03ysIhhUZZD";
var urlDatakelola;
var urlEmail;
var companyToken;
$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    companyToken = $("#SM_CompanyToken").val();
    if ($("#TrxLoginTypeAngka").val() == "3") {
        $("#escalationto").css("display", "none");
        $("#P_Escalation").append("Re Assign");
    } else {
        $("#P_Escalation").append("Escalation");
    }

    getWS_MasterLoad();
    getWS_DataTicket(getParameterByName('ticketid'));
    getWS_JourneyTicketLoad(getParameterByName('ticketid'));
    console.log("Ticket ID " + getParameterByName('ticketid'));

    $("#TxtSearchingEscalation").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingEscalation($(this).val());
        } else if (jumlahString == 0) {
            SearchingEscalation($(this).val(""));
        }
    });
    $("#JiraForm").hide()
    $("#JiraFormLabel").hide()
    //fetchDataFlatform();
    //fetchDataProduct();
    //GetDataBrowser();
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
function click2Call() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let phonenumber = $('#TxtProfilePhone').val();
    if ($("#ContentPlaceHolder1_PhoneNumberReported").val() == "") {
        if ($('#TxtProfilePhone').val() == "") {
            swal(
                '',
                'Phone Number Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        } else {
            var PhoneNumber = $('#TxtProfilePhone').val()
        }
    } else {
        var PhoneNumber = $('#ContentPlaceHolder1_PhoneNumberReported').val()
    }
    $("#newCall").css('visibility', 'hidden');
    $("#newWaktuCall").css('visibility', 'visible');
    $("#newDropCall").css('visibility', 'visible');
    $("#newTransferCall").css('visibility', 'visible');
    $("#newHoldCall").css('visibility', 'visible');
    swal({
        title: "Outgoing call!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                
                console.log("Dial Call");
                const Http = new XMLHttpRequest();
                const url = "http://localhost:60024/dial/telp=" + PhoneNumber;
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
                    $("#chat-box-body").append(drop)
                }

                
            } else {
                window.location.reload();
            }
        }); 
}
function ShowEmailCompose() {
    $("#modal-composeGlobal").modal('show');
    $('#ComposeETO').val($('#TxtProfileEmail').val());
    $('#ComposeESUBJECT').val("#"+getParameterByName("ticketid")+" Add_Interaction_Email");
    $('#ComposeESUBJECT').attr('readonly', 'true');
    //$('#TxtProfilePhone').val(json[i].HP);
}
function clickdropCall() {
    if ($("#ContentPlaceHolder1_PhoneNumberReported").val() == "") {
        if ($('#TxtProfilePhone').val() == "") {
            swal(
                '',
                'Phone Number Empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        } else {
            var PhoneNumber = $('#TxtProfilePhone').val()
        }
    } else {
        var PhoneNumber = $('#ContentPlaceHolder1_PhoneNumberReported').val()
    }
    $("#newCall").css('visibility', 'visible');
    $("#newWaktuCall").css('visibility', 'hidden');
    $("#newDropCall").css('visibility', 'hidden');
    $("#newTransferCall").css('visibility', 'hidden');
    $("#newHoldCall").css('visibility', 'hidden');
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
                const url = "http://localhost:60024/drop/telp=" + PhoneNumber
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText)
                    //window.close();
                }


            }
        });


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
                $('#newNamaCustomer').append(json[i].Name);
                $('#TxtProfileEmail').val(json[i].Email);
                $('#TxtProfilePhone').val(json[i].HP);
                CKEDITOR.instances.TxtAddress.setData(json[i].Alamat)
                $('#Journey_PolisNumber').val(json[i].PolisNumber);
                $('#Journey_NIK').val(json[i].NIK);
                $('#Journey_UserName').val(json[i].CusStatus);
                $('#Journey_Password').val(json[i].Password);
                $('#Ticket_Province').val(json[i].Provinsi);
                $('#Ticket_City').val(json[i].Kota);
                $('#Ticket_District').val(json[i].Kecamatan);
                $('#Ticket_Zip_Code').val(json[i].Kelurahan);
                $('#Ticket_KodePos').val(json[i].KodePos);

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
                        '<p class="pull-right" style="font-size:12px;">' + json[i].DateThread + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                if (json[i].ValueThread == "Outbound Call") {
                    var IconChannel = "Call"
                    var IconChannelSosialMedia = ""
                } else if (json[i].ValueThread == "EMAIL") {
                    var FileHTML = "../FileEmail/INBOX/" + json[i].ThreadID + "/file.html"
                    var IconChannel = json[i].ValueThread
                    var IconChannelSosialMedia = ""
                } else if (json[i].ValueThread == "Whatsapp") {
                    //var FileHTML = "http://10.28.2.222/dev_brilife//apps/template/wa.html?convid=" + json[i].GenesysNumber + ""
                    var IconChannel = json[i].ValueThread
                    //var FileHTMLSosialMedia = "http://10.28.2.222/dev_brilife/apps/template/socialmedia.html?convid=" + json[i].GenesysNumber + ""
                    var FileHTMLSosialMedia = urlDatakelola + "chat/" + json[i].GenesysNumber + "/history?token=" + $("#SM_MultiChatToken").val() + "";
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
                    '<p class="pull-left" style="font-size:12px;">' + TrxInteractionID + '</p>' +
                    '<p class="pull-right" style="font-size:12px;">' + json[i].DateCreate + '</p></br>' +
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

                $("#ContentPlaceHolder1_PhoneNumberReported").val(json[i].PHONE_PELAPOR)
                $("#Ticket_Contact_Reported").append(json[i].PHONE_PELAPOR);
                ContentPlaceHolder1_PhoneNumberReported
                $("#Ticket_DateofTransaction").append(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
                $("#Ticket_ProductType").append(json[i].NamaPenyebab);
                $("#Ticket_ProductName").append(json[i].ProductName);
                $("#Ticket_AgentName").append(json[i].NAME);
                $("#Ticket_UserStatus").append(json[i].StatusName);
                $("#Ticket_Priority").append(json[i].SkalaPrioritas);
                $("#Ticket_UserCategory").append(json[i].JenisNasabah);
                $("#Ticket_BankAccount").append(json[i].NomorRekening);
                $("#Ticket_SourceChannel").append(json[i].SumberInformasi);
                //$("#Ticket_Brand").append(json[i].Channel_Code);
                $("#Ticket_Category").append(json[i].CategoryName);
                $("#Ticket_Enquiry").append(json[i].SubCategory1Name);
                $("#Ticket_EnquiryDetail").append(json[i].SubCategory2Name);
                $("#Ticket_EnquiryReason").append(json[i].SubCategory3Name);
                $("#Ticket_ComplaintType").append(json[i].CompID);
                if (json[i].JiraID == "" || json[i].JiraID == null) {
                    $("#Ticket_JiraID").append("-");
                } else {
                    $("#Ticket_JiraID").append(json[i].JiraID);
                }
                if (json[i].JiraKey == "" || json[i].JiraKey == null) {
                    $("#Ticket_JiraKey").append("-");
                } else {
                    $("#Ticket_JiraKey").append(json[i].JiraKey);
                }
                if (json[i].JiraSelf == "" || json[i].JiraSelf == null) {
                    $("#Ticket_JiraSelf").append("-");
                } else {
                    $("#Ticket_JiraSelf").append(json[i].JiraSelf);
                }
                if (json[i].Product == "" || json[i].Product == null) {
                    $("#Ticket_Product").append("-");
                } else {
                    $("#Ticket_Product").append(json[i].Product);
                }
                if (json[i].Mobile == "" || json[i].Mobile == null) {
                    $("#Ticket_Mobile").append("-");
                } else {
                    $("#Ticket_Mobile").append(json[i].Mobile);
                }
                if (json[i].Platform == "" || json[i].Platform == null) {
                    $("#Ticket_Platform").append("-");
                } else {
                    $("#Ticket_Platform").append(json[i].Platform);
                }
                if (json[i].Browser == "" || json[i].Browser == null) {
                    $("#Ticket_Browser").append("-");
                } else {
                    $("#Ticket_Browser").append(json[i].Browser);
                }
                if (json[i].DateCreateJira == "" || json[i].DateCreateJira == null) {
                    $("#Ticket_JiraDate").append("-")
                } else {
                    var milisegundosJira = parseInt(json[i].DateCreateJira.replace("/Date(", "").replace(")/", ""));
                    var newDateJira = new Date(milisegundosJira).toLocaleDateString("en-GB");
                    var getDateBirthJira = newDateJira.split('/');
                    $("#Ticket_JiraDate").append(json[i].DateCreateJira);
                }             
                              
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
                if (json[i].Layer == null) {
                    var LayerType = "1"
                } else {
                    var LayerType = json[i].Layer
                }
                $("#Ticket_Layer_Eskalasi").append("Layer " + LayerType);
                $("#hd_Journey_EscalationValue").val(json[i].Divisi)
                $("#ContentPlaceHolder1_TrxLayerEskalasi").val(LayerType)

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
                $("#ContentPlaceHolder1_Hd_TicketPosition").val(json[i].TicketPosition)

                if ($("#TrxLoginTypeAngka").val() != json[i].TicketPosition) {
                    $("#btnInteraction").css("display", "none")
                    $("#btnAttachment").css("display", "none")
                    $("#escalationto").css("display", "none");
                    $("#ahref_Escalationto").css("display", "none");
                } else {
                    $("#btnInteraction").css("display", "block")
                    $("#btnAttachment").css("display", "block")
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

                //$("#Journey_Status").val(getParameterByName("status"))
                //$("#Journey_Status option:selected").text(getParameterByName("status"))
                //$("#Journey_Status option:selected").val(getParameterByName("status"))
                $("#Journey_Status").find("option:selected").text();
                $("#Journey_Status").val(getParameterByName("status"));

                var ParamAccess = getParameterByName("access")
                if (ParamAccess == "1" && getParameterByName("status") != "Closed" || getParameterByName("status") != "Solved") {
                    $("#btnInteraction").css("display", "block")
                    $("#btnAttachment").css("display", "block")
                    $("#Journey_EscalationChannel").val("No");
                    $('#Journey_EscalationChannel').attr('disabled', true);
                    $("#DivActionJourney").show()
                } else if (getParameterByName("status") == "Closed" || getParameterByName("status") == "closed" || getParameterByName("status") == "Solved") {
                    $("#btnInteraction").css("display", "none");
                    $("#btnAttachment").css("display", "none");
                    $("#Journey_Status").attr('disabled', true);
                    $("#DivActionJourney").hide()
                }

                if (getParameterByName("status") == "Closed" || getParameterByName("status") == "Solved") {
                    $("#DivActionJourney").hide()
                } else {
                    $("#DivActionJourney").show()
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
                if (json[i].Channel == "call") {
                    var TrxVoiceRecording = '<p class="pull-right" style="font-size:12px;"><img data-toggle="modal" data-target="#modal-recording" src="../images/icon/voice.png" width="30"></p>';
                } else {
                    var TrxVoiceRecording = "";
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
                DataListInteraction = 
                    '<span class="timeline-label">' +
                    '</span>' +
                    '<div class="timeline-item">' +
                    '<div class="timeline-point">' +
                    '<img alt="Profile" src="../images/icon/' + TrxChannel + '.png" class="">' +
                    '</div>' +
                    '<div class="timeline-event">' +
                    TrxVoiceRecording +                    
                    '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].AgentCreateX + '</p>' +
                    '<div class="timeline-body">' +
                    '' + TrxResponseComplaint + '' +
                    '' + TrxReadmore + '' +
                    
                    '<br>' +
                    '<div class="timeline-footer">' +
                    '<span class="btn btn-' + TrxColor + ' btn-sm btn-rounded">' + json[i].InteractionType + '-' + json[i].Status + '</span>&nbsp;' + TrxInteractionID + '' +
                    '<p class="pull-right" style="font-size:12px;">' + json[i].TanggalNya + '</p>' +
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
        data: "{TrxID:'" + $("#TrxLoginTypeAngka").val() + "', TrxUserName: '" + getParameterByName("status") + "', TrxAction: 'UIDESK57'}",
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
        swal(
            '',
            'Description is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if (TrxStatus === '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if (TrxChannel === '') {
        swal(
            '',
            'Channel is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if ($("#hd_Journey_EscalationType").val() === '') {
        var TrxEscalasiType = "2";
    } else {
        var TrxEscalasiType = $("#hd_Journey_EscalationType").val();
    }
    if ($("#ContentPlaceHolder1_Hd_TicketPosition").val() == "1") {
        if ($("#Journey_EscalationChannel").val() == "Yes") {
            if ($("#IdProduct").val() == "" || $("#IdProduct").val() == "Select") {
                swal(
                    '',
                    'Data Product is empty',
                    'info'
                ).then(function () {
                    return false
                });
                return false
            }
            if ($("#MobileApp").val() == "" || $("#MobileApp").val() == "Select") {
                swal(
                    '',
                    'Data Mobile App is empty',
                    'info'
                ).then(function () {
                    return false
                });
                return false
            }
            if ($("#IdFlatform").val() == "" || $("#IdFlatform").val() == "Select") {
                swal(
                    '',
                    'Data Platform is empty',
                    'info'
                ).then(function () {
                    return false
                });
                return false
            }
            if ($("#IdBrowser").val() == "" || $("#IdBrowser").val() == "Select") {
                swal(
                    '',
                    'Data Browser is empty',
                    'info'
                ).then(function () {
                    return false
                });
                return false
            }
            var TrxJiraProduct = $("#IdProduct").val() + " - " + $("#IdProduct option:selected").text();
            var TrxJiraMobile = $("#MobileApp").val()
            var TrxJiraPlatform = $("#IdFlatform").val() + " - " + $("#IdFlatform option:selected").text();
            var TrxJiraBrowser = $("#IdBrowser").val() + " - " + $("#IdBrowser option:selected").text();
        } else {
            var TrxJiraProduct = "-";
            var TrxJiraMobile = "-";
            var TrxJiraPlatform = "-";
            var TrxJiraBrowser = "-";
        }
    } else {
        var TrxJiraProduct = "-";
        var TrxJiraMobile = "-";
        var TrxJiraPlatform = "-";
        var TrxJiraBrowser = "-";
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
                    data: "{ TrxTicketNumber: '" + TrxTicketNumber + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxStatus: '" + TrxStatus + "',TrxUsername: '" + TrxUsername + "',TrxChannel: '" + TrxChannel + "', TrxThreadID: '" + TrxThreadID + "', TrxGenesysID: '" + TrxGenesysID + "', TrxEscalasiUnit:'" + TrxEscalasiValue + "', DispatchType:'" + TrxEscalasiType + "', TrxDispatchToLayer:'" + TrxDispatchToLayer + "', TrxJiraProduct:'" + TrxJiraProduct + "', TrxJiraMobile:'" + TrxJiraMobile + "', TrxJiraPlatform:'" + TrxJiraPlatform + "', TrxJiraBrowser:'" + TrxJiraBrowser + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var tblTickets = "";

                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result === 'True') {
                                console.log(json[i].msgSystem)
                                location.href = "1_journey_new.aspx?ticketid=" + getParameterByName("ticketid") + "&status=" + TrxStatus + ""
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

            if (json.length != "" || json.length != "0") {

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
                    else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "jpeg" || json[i].FileType == "JPG" || json[i].FileType == "gif" || json[i].FileType == "bmp") {
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
                        var TrxFILENAME = '<a href=http://wagent.uidesk.id/omnichannel_dev/FILeEmail/INBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>'
                        var TrxDIRECTION = '<a href=http://wagent.uidesk.id/omnichannel_dev/FILeEmail/INBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>'
                    } else if (json[i].DIRECTION == "OUT") {
                        var TrxFILENAME = '<a href=http://wagent.uidesk.id/omnichannel_dev/FILeEmail/OUTBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>'
                        var TrxDIRECTION = '<a href=http://wagent.uidesk.id/omnichannel_dev/FILeEmail/OUTBOX/' + encodeURI(json[i].URL) + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>'
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
$('#filesinteraction').change(function () {
    var filename = $('#filesinteraction').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filesinteraction']", function (e) {
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
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "mp4" || fileextension == "Mp4" || fileextension == "MP4" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

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
                    '<a href=' + json[i].Path + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachmentInteraction(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
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
                                    //TrxAttachmentTicket($("#hd_TicketNumber").val());
                                    TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    //TrxAttachmentTicket($("#hd_TicketNumber").val());
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
                else if (json[i].FileType == "png" || json[i].FileType == "PNG" || json[i].FileType == "jpg" || json[i].FileType == "jpeg" || json[i].FileType == "JPG" || json[i].FileType == "gif" || json[i].FileType == "bmp") {
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
function deleteAttachmentInteraction(TrxID) {
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
                                    TrxAttachmentInteractionTicket($("#hd_sessionLogin").val());
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
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
    if ($("#Journey_Status").val() == "Closed" || $("#Journey_Status").val() == "Solved") {
        $("#Journey_EscalationChannel").val("No");
        $('#Journey_EscalationChannel').attr('disabled', true);
        $("#JiraForm").hide()
    } else {
        $("#Journey_EscalationChannel").val("");
        $('#Journey_EscalationChannel').attr('disabled', false);
    }
}
function get_SelectEscalation(TrxValues) {
    if ($("#Journey_EscalationChannel").val() == "Yes") {
        $('#modal-escalation').modal('show');
        if ($("#ContentPlaceHolder1_Hd_TicketPosition").val() == "1") {
            $("#JiraForm").show()
        } else {
            $("#JiraForm").hide()
        }
    } else {
        $("#JiraForm").hide()
    }
}
function fetchDataFlatform() {
    try {
        $.ajax({
            type: "POST",
            url: "asmx/JiraData.asmx/GetDataFlatform",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log("GetDataFlatform" + response)
                var values = response.d;
                $.each(values, function (index, item) {
                    var option = $('<option>');
                    option.attr('value', item.id);
                    option.text(item.value);
                    $('#IdFlatform').append(option);
                });
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function fetchDataProduct() {
    try {

        $.ajax({
            type: "POST",
            url: "asmx/JiraData.asmx/GetDataProduct",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var values = response.d;
                $.each(values, function (index, item) {
                    var option = $('<option>');
                    option.attr('value', item.id);
                    option.text(item.value);
                    $('#IdProduct').append(option);
                });
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function GetDataBrowser() {
    try {

        $.ajax({
            type: "POST",
            url: "asmx/JiraData.asmx/GetDataBrowser",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var values = response.d;
                $.each(values, function (index, item) {
                    var option = $('<option>');
                    option.attr('value', item.id);
                    option.text(item.value);
                    $('#IdBrowser').append(option);
                });
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}