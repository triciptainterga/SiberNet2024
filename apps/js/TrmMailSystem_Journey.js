$(document).ready(function () {
    $("#LoaderPage").hide();
    $("#Div_Conversation").hide();
    //$("#LoaderPageCounting").hide();
    DisplayFilterDate()
    TrmInboxEmail();
    LoginAgent();
    $("#Agent_Name").html($("#hd_NameKaryawan").val())
    $("#Agent_Email").html($("#UserName_EmailAdress").text())
    $("#InboxCount").append(0);
    $("#DraftCount").append(0);
    $("#SpamCount").append(0);
    ComboFromEmail();
    ComboForwardFromEmail();
    ComboForwardTypeCompose();
    TrmDataCounting();
});
function EmailCounting() {
    //$("#LoaderPage").show();
    ////TrmDataCounting();
    //$("#LoaderPage").hide();
    location.href = "TrmMailSystem.aspx"
}
function TrmDataCounting() {
    $("#LoaderPageCounting").show();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLevelUser = $("#TrxLayerUser").val();
    var result = "";
    var messageFolder = $('#FolderEmail');
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/DataTransactionEmailCounting",
        data: "{TrxUserName: '" + TrxUserName + "', TrxLevelUser: '" + TrxLevelUser + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "", resultfolder = "";
            console.log("TrmDataCounting " + data)

            $("#InboxCount").empty();
            $("#DraftCount").empty();
            $("#SpamCount").empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].Folder == "Inbox") {
                    $("#InboxCount").append(json[i].Jumlah);
                    console.log("InboxCount " + json[i].Jumlah)
                } else if (json[i].Folder == "Draft") {
                    $("#DraftCount").append(json[i].Jumlah);
                    console.log("DraftCount " + json[i].Jumlah)
                } else if (json[i].Folder == "Spam") {
                    $("#SpamCount").append(json[i].Jumlah);
                    console.log("SpamCount " + json[i].Jumlah)
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#LoaderPageCounting").hide();
}
function TrmInboxEmailSelected() {
    var FileInboxHTML = "../FileEmail/INBOX"
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxEvent: 'InboxSelected', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "", resultReplyBody = "", resultReplyBody1 = "", resultReplyBodyFinish = "";

            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                $("#ReplyEmailService").val(json[i].account);
                $("#ReplyTo").val(ReplaceEmailCC(json[i].EFROM + ";" + json[i].ETO));
                $("#ReplySubject").val("RE :" + json[i].ESUBJECT);
                if (json[i].ECC == "cs@brilife.co.id;" || json[i].ECC == "helpdesk.distribution@brilife.co.id;") {
                    $("#ReplyECC").val("");
                } else {
                    $("#ReplyECC").val(json[i].ECC);
                }
                $("#ContentPlaceHolder1_TrxEmailID").val(json[i].EMAIL_ID);
                ReplyAttachmentInboxEmail(json[i].EMAIL_ID);
                document.getElementById("Reply_FrameHTML").src = "" + FileInboxHTML + "/" + json[i].EMAIL_ID + "/file.html"

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmInboxEmail() {
    $("#DivTrmInboxEmail").css("display", "block");
    $("#DivTrmSpamEmail").css("display", "none");
    $("#DivTrmSendingEmail").css("display", "none");
    $("#DivTrmDraftEmail").css("display", "none");

    $("#myLabel").text("Inbox Email");
    var myTable = $('#TrmInboxEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxEvent: 'InboxTable', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log("TrmInboxEmail " + data)
            myTable.clear().draw();
          /*  *//*myTable.clear().draw();*/
            for (i = 0; i < json.length; i++) {

 
                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                var TicketAction = "";
                if (json[i].TicketNumber != '') {
                    TicketAction = "<a class='dropdown-item' href='#' onclick=PreviewJourneyTicket('" + json[i].TicketNumber + "')><i class='si-arrow-right-circle si'></i> Preview Journey</a>";
                } else {
                    TicketAction = "<a class='dropdown-item' href='#' onclick=PreviewCreateTicket('" + json[i].CUSTOMER_ID + "','" + json[i].EMAIL_ID + "','" + json[i].IVC_ID + "','" + json[i].EFROM + "')><i class='si-arrow-right-circle si'></i> Popup Ticket</a>";
                }
                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=Spam_Inbox('" + json[i].IVC_ID + "')><i class='fa fa-pencil'></i> Spam</a>" +
                    "<a class='dropdown-item' href='#' onclick=Reply_Inbox('" + json[i].IVC_ID + "')><i class='fa fa-reply'></i> Reply</a>" +
                    "<a class='dropdown-item' href='#' onclick=Forward_Inbox('" + json[i].IVC_ID + "')><i class='fa fa-share'></i> Forward</a>" +
                    "<a class='dropdown-item' href='#' onclick=PreviewTableInbox('" + json[i].EMAIL_ID + "')><i class='si-arrow-right-circle si'></i> Preview</a>" +
                    "<a class='dropdown-item' href='#' onclick=EmailConversation('" + json[i].RefID + "')><i class='fa fa-commenting'></i> Conversation</a>" +
                    "<div class='dropdown-divider'></div>" + TicketAction
                    "</div>" +
                    "</div>"
                var ResponseStatus = "";
                if (json[i].FLAG_HANDLING == "1") {
                    if (json[i].TicketNumber != '') {
                        ResponseStatus = "<span class='badge badge-pill badge-success' style='width: 145px;'>Response <img width='22' src='../Images/icon/ticket.png'></span>"
                    } else {
                        ResponseStatus = "<span class='badge badge-pill badge-success' style='width: 85px;'>Response</span>"
                    }
                     
                } else {
                     ResponseStatus = "<span class='badge badge-pill badge-danger' style='width: 85px;'>Not Response</span>"
                }
                if (json[i].Reading == 0 || json[i].Reading == null) {
                    var EmailService = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + json[i].account.substring(0, 15) + "..</b></a>"
                    var EFROM = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + json[i].EFROM.substring(0, 40) + "..</b></a>"
                    var subject = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + json[i].ESUBJECT.substring(0, 25) + "..</b></a>"
                    var DateRead = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                } else {
                    var EmailService = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + json[i].account.substring(0, 15) + "..</a>"
                    var EFROM = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + json[i].EFROM.substring(0, 40) + "..</a>"
                    var subject = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + newDate + ' ' + newTime + "</a>"
                }
                myTable.row.add([EmailService, EFROM, subject, ResponseStatus, DateRead, urlClick]).draw(false);

                $("#LoaderPageCounting").hide();
            }


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
  
}
function TrmSendingEmail() {
    $("#LoaderPageCounting").show();
    $("#DivTrmInboxEmail").css("display", "none");
    $("#DivTrmSpamEmail").css("display", "none");
    $("#DivTrmSendingEmail").css("display", "block");
    $("#DivTrmDraftEmail").css("display", "none");

    $("#myLabel").text("Email Sending");
    var myTable = $('#TrmSendingEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'OutboxTable', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=PreviewTableSending('" + json[i].EMAIL_ID + "')><i class='si-arrow-right-circle si'></i> Preview</a>" +
                    "</div>" +
                    "</div>"

                var EmailService = "<a href='#' style='color:black;' onclick=Reading_Sending('" + json[i].IVC_ID + "')>" + json[i].EFROM + "</a>"
                var ETO = "<a href='#' style='color:black;' onclick=Reading_Sending('" + json[i].IVC_ID + "')>" + json[i].ETO + "</a>"
                var subject = "<a href='#' style='color:black;' onclick=Reading_Sending('" + json[i].IVC_ID + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                var DateRead = "<a href='#' style='color:black;' onclick=Reading_Sending('" + json[i].IVC_ID + "')>" + newDate + ' ' + newTime + "</a>"

                myTable.row.add([EmailService, ETO, subject, DateRead, urlClick]).draw(false);
                $("#LoaderPageCounting").hide();
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmDraftEmail() {
    $("#DivTrmInboxEmail").css("display", "none");
    $("#DivTrmSpamEmail").css("display", "none");
    $("#DivTrmSendingEmail").css("display", "none");
    $("#DivTrmDraftEmail").css("display", "block");
    $("#myLabel").text("Email Draft");
    var myTable = $('#TrmDraftEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'DraftTable', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=DraftSend('" + json[i].IVC_ID + "')><i class='fa fa-share'></i> Send</a>" +
                    "<a class='dropdown-item' href='#' onclick=DraftDelete('" + json[i].IVC_ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "<div class='dropdown-divider'></div>" +
                    "<a class='dropdown-item' href='#' onclick=DraftPreview('" + json[i].IVC_ID + "')><i class='si-arrow-right-circle si'></i> Preview</a>" +
                    "</div>" +
                    "</div>"
                myTable.row.add([json[i].EFROM, json[i].ETO, json[i].ESUBJECT.substring(0, 20) + "..", newDate + ' ' + newTime, urlClick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSpamEmail() {
    $("#DivTrmInboxEmail").css("display", "none");
    $("#DivTrmSpamEmail").css("display", "block");
    $("#DivTrmSendingEmail").css("display", "none");
    $("#DivTrmDraftEmail").css("display", "none");

    $("#myLabel").text("Email Spam");
    var myTable = $('#TrmSpamEmail').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEvent: 'SpamTable', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=Spam_Reply('" + json[i].IVC_ID + "')><i class='fa fa-reply'></i> Reply</a>" +
                    "<a class='dropdown-item' href='#' onclick=Spam_Forward('" + json[i].IVC_ID + "')><i class='fa fa-share'></i> Forward</a>" +
                    "<div class='dropdown-divider'></div>" +
                    "<a class='dropdown-item' href='#' onclick=PreviewTableInbox('" + json[i].EMAIL_ID + "')><i class='si-arrow-right-circle si'></i> Preview</a>" +
                    "</div>" +
                    "</div>"

                if (json[i].Reading == 0 || json[i].Reading == null) {
                    var EmailService = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')><b>" + json[i].ETO + "</b></a>"
                    var EFROM = "<a href='#' style='color:black;' onclick=Reading_Spam('" + json[i].IVC_ID + "')><b>" + json[i].EFROM + "</b></a>"
                    var subject = "<a href='#' style='color:black;' onclick=Reading_Spam('" + json[i].IVC_ID + "')><b>" + json[i].ESUBJECT.substring(0, 20) + "..</b></a>"
                    var DateRead = "<a href='#' style='color:black;' onclick=Reading_Spam('" + json[i].IVC_ID + "')><b>" + newDate + ' ' + newTime + "</b></a>"
                } else {
                    var EmailService = "<a href='#' style='color:black;' onclick=ReadingEmail('" + json[i].IVC_ID + "')>" + json[i].ETO + "</a>"
                    var EFROM = "<a href='#' style='color:black;' onclick=Reading_Spam('" + json[i].IVC_ID + "')>" + json[i].EFROM + "</a>"
                    var subject = "<a href='#' style='color:black;' onclick=Reading_Spam('" + json[i].IVC_ID + "')>" + json[i].ESUBJECT.substring(0, 20) + "..</a>"
                    var DateRead = "<a href='#' style='color:black;' onclick=Reading_Spam('" + json[i].IVC_ID + "')>" + newDate + ' ' + newTime + "</a>"
                }
                myTable.row.add([EmailService, EFROM, subject, DateRead, urlClick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ReadingEmail(ReadingID) {
    $("#ContentPlaceHolder1_TrxID").val(ReadingID)
    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxLayerUser: $("#TrxLayerUser").val() });
    console.log("ReadingEmail : " + form_data)
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/UpdateReadingEmail",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                TrmInboxEmail();
                TrmDataCounting();

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
function Compose_Add() {
    $("#ComboFrom").val("");
    $("#ComposeETO").val("");
    $("#ComposeESUBJECT").val("");
    $("#ComposeECC").val("");
    //CKEDITOR.instances.Compose_Body.setData("")
    TrmSignature("1")
    $("#ComposeActionButton").show()
    $("#DraftActionButton").show()
    $("#DraftSendActionButton").hide()
    $("#modal-compose").modal('show');
    $("#LoaderPageAttachment").hide();
}
function Compose_ActionButton() {
    if ($("#ComboFrom").val() == 'Select' || $("#ComboFrom").val() == '') {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComposeETO").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var CompESubject = $('#ComposeESUBJECT').val();
    if (CompESubject == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()    
    if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var maxlength = "7500"
        if (TrxBodyCompose.length > maxlength) {
            swal(
                '',
                'Character Length is over, Maximum Length 7500 Character',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    var form_data = JSON.stringify({
        TrxUserName: $("#hd_sessionLogin").val(), TrxEmailFrom: $("#ComboFrom").val(), TrxTO: $("#ComposeETO").val(), TrxSubject: $("#hd_TicketNumber").val(),
        TrxCC: $("#ComposeECC").val(), TrxBody: TrxBodyCompose, TrxDirection: "OUT", TrxType: "compose_email", TicketNumber: $("#hd_TicketNumber").val()
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
                    url: "asmx/TrmMailSystem.asmx/InsertComposeEmail_Interaction",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send',
                                    'success'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been send'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been failed !',
                                    'error'
                                ).then(function () {
                                    var TrxMessage = 'Your send data has been failed !'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
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
            } else {
                $("#ComposeETO").val("");
                $("#ComposeESUBJECT").val("");
                $("#ComposeECC").val("");
                $("#modal-compose").modal('hide');
            }
        });
}
function TrmAttachmentEmailCompose(TrxUserName) {
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    $("#LoaderPageCounting").show();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: 'UideskIndonesia', TrxEvent: 'TrmAttachmentEmailCompose', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultComposeBodyAttachment = "";

            $('#Div_Compose_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                }
                resultComposeBodyAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-danger"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 10) + '</a>' +
                    '<a href=' + FileOutboxHTML +'/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#Div_Compose_Attachment').append(resultComposeBodyAttachment)

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

//* Upload Attachment Compose *//
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
    //var valnoWA = "628119970460";//$('#tglKejadian').val();

    $("#LoaderPageCounting").show();

    if ($("#ComposeETO").val() == '') {
        swal("To is empty");
        $("#LoaderPageCounting").hide();
        return false
    }

    if ($("#ComposeESUBJECT").val() == '') {
        swal("Subject is empty");
        $("#LoaderPageCounting").hide();
        return false
    }

    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    if (TrxBodyCompose == '') {
        swal("Body is empty");
        $("#LoaderPageCounting").hide();
        return false
    }

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
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

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
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        data.append("Emailid", $("#ContentPlaceHolder1_TrxEmailID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmMailSystem.asmx/UploadFile",
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

            //var TrxMessage = 'Your file has been upload'
            //AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
            TrmAttachmentEmailCompose($("#hd_sessionLogin").val());

        });

        request.fail(function (response) {

            console.log(response.responseText);
            //alert(response.responseText);

        });

        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});

function CloseEvent() {
    var form_data = JSON.stringify({
        TrxUserName: $("#hd_sessionLogin").val()
    });
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            console.log(form_data)
            window.location = "TrmMailSystem.aspx";
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
function DraftEvent() {
    if ($("#ComposeETO").val() != '') {
        if ($("#ComposeESUBJECT").val() != '') {
            var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
            var maxlength = "7500"
            if (TrxBodyCompose.length > maxlength) {
                swal(
                    '',
                    'Character Length is over, Maximum Length 7500 Character',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }
            if (TrxBodyCompose != '') {
                if ($("#ContentPlaceHolder1_DraftID").val() == "") {
                    Draft_ActionClose_Insert()
                } else {
                    Draft_ActionClose_Update()
                    //if ($("#ContentPlaceHolder1_TrxID").val() == "") {
                    //    Draft_ActionClose_Insert()
                    //} else {
                    //    Draft_ActionClose_Update()
                    //}
                    //    $("#modal-compose").modal('hide');
                }
            } else {
                $("#modal-compose").modal('hide');
            }
        } else {
            $("#modal-compose").modal('hide');
        }
    } else {
        var form_data = JSON.stringify({
            TrxUserName: $("#hd_sessionLogin").val()
        });
        $.ajax({
            url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: form_data,
            success: function (data) {
                console.log(form_data)
                window.location = "TrmMailSystem.aspx";
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: function () {

            }
        });
        $("#modal-compose").modal('hide');
    }
}
function DraftSend(DraftID) {
    $("#ContentPlaceHolder1_DraftID").val(DraftID)
    $("#modal-compose").modal('show');
    $("#DraftSendActionButton").show()
    $("#ComposeActionButton").hide()
    $("#DraftActionButton").hide()
    $("#LoaderPage").hide();
    TrmSignature("1")
    DraftEmailSelected(DraftID)
}
function DraftPreview(PreviewID) {
    TrmSignature("1")
    $("#DraftSendActionButton").hide()
    $("#ComposeActionButton").hide()
    $("#modal-compose").modal('show');
    $("#ContentPlaceHolder1_DraftID").val(PreviewID)
    DraftEmailSelected(PreviewID)
}
function DraftEmailSelected(DraftID) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + DraftID + "', TrxEvent: 'DraftSelected', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "", resultReplyBody = "", resultReplyBody1 = "", resultReplyBodyFinish = "";

            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                //$("#ComboFrom").val(json[i].EFROM);
                $("#ComboFrom option:selected").text(json[i].EFROM);
                $("#ComposeETO").val(json[i].ETO);
                $("#ComposeESUBJECT").val(json[i].ESUBJECT);
                $("#ComposeECC").val(json[i].ECC);
                CKEDITOR.instances.Compose_Body.setData(json[i].EBODY_TEXT)
                PreviewAttachmentReplyEmail(json[i].EMAIL_ID)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Draft_ActionButton() {
    if ($("#ComboFrom").val() == 'Select' || $("#ComboFrom").val() == '') {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComposeETO").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ComposeESUBJECT = $("#ComposeESUBJECT").val()
    if (ComposeESUBJECT == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    var maxlength = "7500"
    if (TrxBodyCompose.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        TrxUserName: $("#hd_sessionLogin").val(), TrxEmailFrom: $("#ComboFrom").val(), TrxTO: $("#ComposeETO").val(), TrxSubject: $("#ComposeESUBJECT").val(),
        TrxCC: $("#ComposeECC").val(), TrxBody: TrxBodyCompose, TrxDirection: "DRAFT", TrxType: "draft_email",
    });
    swal({
        title: "Do you want to continue this email as a draft?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraft",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send to draft',
                                    'success'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been send to draft'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been send to draft failed !',
                                    'error'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been send to draft failed !'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
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
            } else {
                $("#ComposeETO").val("");
                $("#ComposeESUBJECT").val("");
                $("#ComposeECC").val("");
                $("#modal-compose").modal('hide');
            }
        });
}
function Draft_ActionClose_Insert() {
    if ($("#ComboFrom").val() == 'Select' || $("#ComboFrom").val() == '') {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComposeETO").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ComposeESUBJECT = $("#ComposeESUBJECT").val()
    if (ComposeESUBJECT == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    var maxlength = "7500"
    if (TrxBodyCompose.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to continue this email as a draft ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraft",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: "{ TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEmailFrom: ' " + $("#ComboFrom").val() + "', TrxTO: '" + $("#ComposeETO").val() + "', TrxSubject: '" + $("#ComposeESUBJECT").val() + "',TrxCC: '" + $("#ComposeECC").val() + "',TrxBody: '" + TrxBodyCompose + "',TrxDirection: 'DRAFT',TrxType: 'draft_email'}",
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send to draft success',
                                    'success'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been draft success'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been send to draft failed !',
                                    'error'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been send to draft failed !'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
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

            } else {

                var form_data = JSON.stringify({
                    TrxUserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)
                        window.location = "TrmMailSystem.aspx";
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
function Draft_ActionClose_Update() {
    if ($("#ComboFrom").text() == 'Select' || $("#ComboFrom").text() == '') {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComposeETO").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ComposeESUBJECT = $("#ComposeESUBJECT").val()
    if (ComposeESUBJECT == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    var maxlength = "7500"
    if (TrxBodyCompose.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to continue this email as a draft ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraft_Update",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: "{ TrxIvcID: '" + $("#ContentPlaceHolder1_DraftID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxEmailFrom: '" + $("#ComboFrom").val() + "', TrxTO: '" + $("#ComposeETO").val() + "',TrxSubject: '" + $("#ComposeESUBJECT").val() + "',TrxCC: '" + $("#ComposeECC").val() + "',TrxBody: '" + TrxBodyCompose + "',TrxDirection: 'DRAFT',TrxType: 'draft_email'}",
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send to draft success',
                                    'success'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been draft success'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    $("#ContentPlaceHolder1_DraftID").val("");
                                    window.location = "TrmMailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been send to draft failed !',
                                    'error'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been send to draft failed !'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
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

            } else {

                var form_data = JSON.stringify({
                    TrxUserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)
                        window.location = "TrmMailSystem.aspx";
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
function DraftSend_ActionButton() {
    if ($("#ComboFrom").text() == 'Select' || $("#ComboFrom").text() == '') {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComposeETO").val() == '') {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ComposeESUBJECT = $("#ComposeESUBJECT").val()
    if (ComposeESUBJECT == '') {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBodyCompose = CKEDITOR.instances.Compose_Body.getData()
    var maxlength = "7500"
    if (TrxBodyCompose.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBodyCompose == '') {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        TrxDraftID: $("#ContentPlaceHolder1_DraftID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxEmailFrom: $("#ComboFrom").val(), TrxTO: $("#ComposeETO").val(), TrxSubject: $("#ComposeESUBJECT").val(),
        TrxCC: $("#ComposeECC").val(), TrxBody: TrxBodyCompose, TrxDirection: "OUT", TrxType: "compose_email"
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
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraftSending",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send',
                                    'success'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been send'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been failed !',
                                    'error'
                                ).then(function () {
                                    var TrxMessage = 'Your send data has been failed !'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ComposeETO").val("");
                                    $("#ComposeESUBJECT").val("");
                                    $("#ComposeECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
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
            } else {
                $("#ComposeETO").val("");
                $("#ComposeESUBJECT").val("");
                $("#ComposeECC").val("");
                $("#modal-compose").modal('hide');
            }
        });
}
function DraftDelete(DraftID) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxIvcID: DraftID, TrxUserName: $("#hd_sessionLogin").val(),
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraft_Delete",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)
                        window.location = "TrmMailSystem.aspx";
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

function ReplyEvent() {
    var form_data = JSON.stringify({
        TrxUserName: $("#hd_sessionLogin").val()
    });
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            console.log(form_data)
            window.location = "TrmMailSystem.aspx";
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
function Reply_Inbox(ReplyID) {
    ReadingEmail(ReplyID)
    $("#ContentPlaceHolder1_TrxID").val(ReplyID);
    $("#modal-reply").modal('show');
    $("#LabelFormReplyEmail").text("");
    $("#LabelFormReplyEmail").text("Form Reply Email");
    TrmInboxEmailSelected();
    TrmSignature("2");
}
function Reply_ActionButton() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Email is empty");
    }
    if ($("#ReplyTo").val() == "") {
        swal("To is empty");
    }
    var ReplySubject = $("#ReplySubject").val()
    if (ReplySubject == "") {
        swal("Subject is empty");
    }
    //else {
    //    var regex = /^[^0-9*\\\^\/<>_#']+$/;
    //    if (regex.test(ReplySubject)) {
    //    } else {
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    var TrxBody = CKEDITOR.instances.Reply_BodyEmail.getData();
    var maxlength = "7500"
    if (TrxBody.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBody == "") {
        swal("Body is empty");
        return false;
    }
    //else {
    //    var regex = /^[^0-9*\\\^\/<>_#']+$/;
    //    if (regex.test(TrxBody)) {
    //    } else {
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxInboxEmailID: $("#ContentPlaceHolder1_TrxID").val(), TrxGenerateEmailID: $("#ContentPlaceHolder1_TrxGenerateEmailID").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxTO: $("#ReplyTo").val(), TrxSubject: $("#ReplySubject").val(),
                    TrxCC: $("#ReplyECC").val(), TrxBody: TrxBody, TrxDirection: "OUT", TrxLayerUser: $("#TrxLayerUser").val()
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailReply_New",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send to reply',
                                    'success'
                                ).then(function () {
                                    $("#ReplyTo").val("");
                                    $("#ReplySubject").val("");
                                    $("#ReplyECC").val("");
                                    $("#ContentPlaceHolder1_TrxEmailID").val("");
                                    $("#ContentPlaceHolder1_TrxID").val("");
                                    window.location = "TrmMailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been send to reply failed !',
                                    'error'
                                ).then(function () {
                                    $("#ReplyTo").val("");
                                    $("#ReplySubject").val("");
                                    $("#ReplyECC").val("");
                                    $("#ContentPlaceHolder1_TrxEmailID").val("");
                                    $("#ContentPlaceHolder1_TrxID").val("");
                                    window.location = "TrmMailSystem.aspx";
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

            } else {
                $("#ReplyTo").val("");
                $("#ReplySubject").val("");
                $("#ReplyECC").val("");
                $("#ContentPlaceHolder1_TrxEmailID").val("");
            }
        });
}
function ReplyAttachmentInboxEmail(TrxEmailID) {
    $("#divInboxAttachment").css("display", "block");
    var FileInboxHTML = "../FileEmail/INBOX"
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'ReplyAttachmentInboxEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultInboxAttachment = "";

            $('#Div_Inbox_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                }
                if (json[i].DIRECTION = "IN") {
                    var URLFile = FileInboxHTML
                } else if (json[i].DIRECTION = "out") {
                    var URLFile = FileOutboxHTML
                }
                resultInboxAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-success"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 10) + '</a>' +
                    '<a href=' + URLFile + '/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ',' + json[i].EMAIL_ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#Div_Inbox_Attachment').append(resultInboxAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ReplyAttachmentReplyEmail(TrxEmailID) {
    var FileInboxHTML = "../FileEmail/INBOX"
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'ReplyAttachmentReplyEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultReplyAttachment = "";

            $('#Div_Reply_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                }
                if (json[i].DIRECTION == "IN") {
                    var URLFile = FileInboxHTML
                } else if (json[i].DIRECTION == "OUT") {
                    var URLFile = FileOutboxHTML
                }
                resultReplyAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-danger"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 10) + '</a>' +
                    '<a href=' + URLFile + '/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachmentReply(' + json[i].ID + ',' + json[i].EMAIL_ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#Div_Reply_Attachment').append(resultReplyAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Reply_DraftEvent() {
    if ($("#ReplyTo").val() != '') {
        if ($("#ReplySubject").val() != '') {
            var TrxBody = CKEDITOR.instances.Reply_BodyEmail.getData();
            var maxlength = "7500"
            if (TrxBody.length > maxlength) {
                swal(
                    '',
                    'Character Length is over, Maximum Length 7500 Character',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }
            if (TrxBody != '') {
                Reply_DraftActionClose()
            } else {
                $("#modal-reply").modal('hide');
            }
        } else {
            $("#modal-reply").modal('hide');
        }
    } else {
        $("#modal-reply").modal('hide');
    }
}
function Reply_DraftActionClose() {
    var TrxBodyReply = CKEDITOR.instances.Reply_BodyEmail.getData()
    var maxlength = "7500"
    if (TrxBodyReply.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBodyReply == '') {
        swal("Body is empty");
        return false
    }
    swal({
        title: "Do you want to continue this email as a draft ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxUserName: $("#hd_sessionLogin").val(), TrxTO: $("#ReplyTo").val(), TrxSubject: $("#ReplySubject").val(),
                    TrxCC: $("#ReplyECC").val(), TrxBody: TrxBodyReply, TrxDirection: "DRAFT", TrxType: "draft_email",
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraft",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send to draft success',
                                    'success'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been draft success'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ReplyTo").val("");
                                    $("#ReplySubject").val("");
                                    $("#ReplyECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been send to draft failed !',
                                    'error'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been send to draft failed !'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ReplyTo").val("");
                                    $("#ReplySubject").val("");
                                    $("#ReplyECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
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
            } else {

                var form_data = JSON.stringify({
                    TrxUserName: $("#hd_sessionLogin").val(),
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)
                        window.location = "TrmMailSystem.aspx";
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

/* Upload Attachment Reply */
$('#attachmentreply').change(function () {
    var filename = $('#attachmentreply').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='attachmentreply']", function (e) {
    $(".hiddenX").show();
    //var valnoWA = "628119970460";//$('#tglKejadian').val();

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
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

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
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        data.append("Emailid", $("#ContentPlaceHolder1_TrxGenerateEmailID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmMailSystem.asmx/UploadFile",
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
            ReplyAttachmentReplyEmail($("#ContentPlaceHolder1_TrxGenerateEmailID").val())

        });

        request.fail(function (response) {

            console.log(response.responseText);
            //alert(response.responseText);

        });

        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});

function Spam_Inbox(SpamID) {
    if (SpamID == '') {
        swal("Email is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxID: SpamID, TrxUserName: $("#hd_sessionLogin").val(), TrxLayerUser: $("#TrxLayerUser").val()
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
                    url: "asmx/TrmMailSystem.asmx/UpdateEmailSpam",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been update to Spam',
                                    'success'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been update to spam'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    TrmDataCounting();
                                    TrmInboxEmail();
                                });
                            } else {
                                swal(
                                    '',
                                    'Data update to Spam failed !',
                                    'error'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been update to spam failed !'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    TrmDataCounting();
                                    TrmInboxEmail();
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
function Spam_Reply(ReplyID) {
    $("#ContentPlaceHolder1_TrxID").val(ReplyID);
    $("#modal-reply").modal('show');
    $("#LabelFormReplyEmail").text("");
    $("#LabelFormReplyEmail").text("Form Reply Email");
    TrmInboxEmailSelected();
    TrmSignature("2");
}
function Spam_Forward(ReplyID) {
    $("#ContentPlaceHolder1_TrxID").val(ReplyID);
    $("#modal-forward").modal('show');
    $("#LabelFormReplyEmail").text("");
    $("#LabelFormReplyEmail").text("Form Reply Email");
    TrmSignature("3");
    var FileInboxHTML = "../FileEmail/INBOX"
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxEvent: 'Spam_Forward', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "", resultReplyBody = "", resultReplyBody1 = "", resultReplyBodyFinish = "";

            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                $("#ContentPlaceHolder1_HdForward_From").val(json[i].ETO);
                $("#ForwardComboFrom option:selected").text(json[i].ETO);
                //$("#ForwardTo").val(json[i].EFROM);
                $("#ForwardSubject").val("FWD :" + json[i].ESUBJECT);
                $("#ForwardECC").val(json[i].ECC);
                $("#ContentPlaceHolder1_TrxEmailID").val(json[i].EMAIL_ID);
                ReplyAttachmentInboxEmail(json[i].EMAIL_ID);
                document.getElementById("Forward_FrameHTML").src = "" + FileInboxHTML + "/" + json[i].EMAIL_ID + "/file.html"

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function ForwardEvent() {
    var form_data = JSON.stringify({
        TrxUserName: $("#hd_sessionLogin").val()
    });
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {
            console.log(form_data)
            window.location = "TrmMailSystem.aspx";
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
function Forward_Inbox(ForwardID) {
    ReadingEmail(ForwardID)
    $("#ContentPlaceHolder1_TrxID").val(ForwardID)
    $("#modal-forward").modal('show');
    ForwardEmailSelected(ForwardID);
    TrmSignature("3")
}
function ForwardEmailSelected(ForwardID) {
    var FileInboxHTML = "../FileEmail/INBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + ForwardID + "', TrxEvent: 'ForwardEmailSelected', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "", resultReplyBody = "", resultReplyBody1 = "", resultReplyBodyFinish = "";

            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Email_Date);
                var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                $("#ContentPlaceHolder1_HdForward_From").val(json[i].account);
                $("#ForwardComboFrom option:selected").text(json[i].account);
                //$("#ForwardComboFrom").val(json[i].ETO);
                //$("#ForwardTo").val(json[i].EFROM);
                $("#ForwardSubject").val("FWD :" + json[i].ESUBJECT);
                if (json[i].ECC == "cs@brilife.co.id" || json[i].ECC == "helpdesk.distribution@brilife.co.id") {
                    $("#ForwardECC").val("");
                } else {
                    $("#ForwardECC").val(json[i].ECC);
                }
                PreviewAttachmentInboxEmail(json[i].EMAIL_ID)
                document.getElementById("Forward_FrameHTML").src = "" + FileInboxHTML + "/" + json[i].EMAIL_ID + "/file.html"

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ForwardPreviewAttachment() {
    $("#modal-preview-file").modal('show');
}
function Forward_ActionButton() {
    if ($("#ForwardComboFrom").text() == "") {
        swal(
            '',
            'From is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ForwardTo").val() == "") {
        swal(
            '',
            'To is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var ForwardSubject = $("#ForwardSubject").val()
    if (ForwardSubject == "") {
        swal(
            '',
            'Subject is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxBody = CKEDITOR.instances.Forward_BodyEmail.getData();
    var maxlength = "7500"
    if (TrxBody.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBody == "") {
        swal(
            '',
            'Body is empty',
            'info'
        ).then(function () {
            return false;
        });
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

                var form_data = JSON.stringify({
                    TrxInboxEmailID: $("#ContentPlaceHolder1_TrxID").val(), TrxGenerateEmailID: $("#ContentPlaceHolder1_TrxGenerateEmailID").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxEmailFrom: $("#ContentPlaceHolder1_HdForward_From").val(), TrxTO: $("#ForwardTo").val(), TrxSubject: $("#ForwardSubject").val(),
                    TrxCC: $("#ForwardECC").val(), TrxBody: TrxBody, TrxDirection: "OUT", TrxLayerUser: $("#TrxLayerUser").val()
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailForward",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been forward',
                                    'success'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been forward'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    TrmDataCounting();
                                    TrmInboxEmail();
                                    window.location.href = "TrmMailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data send to forward failed !',
                                    'error'
                                ).then(function () {
                                    var TrxMessage = 'Your data send to forward failed !'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    TrmDataCounting();
                                    TrmInboxEmail();
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

            } else {
                $("#ForwardTo").val("");
                $("#ForwardSubject").val("");
                $("#ForwardECC").val("");
            }
        });
}
function ForwardAttachment(ForwardAttachmentID) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + ForwardAttachmentID + "', TrxEvent: 'ForwardAttachment', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultForwardAttachment = "";

            $('#Div_ForwardAttachment').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                }
                ResultForwardAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-danger"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 10) + '</a>' +
                    '<a href=../FileEmail/OUTBOX/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#Div_ForwardAttachment').append(ResultForwardAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Forward_DraftEvent() {
    if ($("#ForwardTo").val() != '') {
        if ($("#ForwardSubject").val() != '') {
            var TrxBody = CKEDITOR.instances.Forward_BodyEmail.getData();
            var maxlength = "7500"
            if (TrxBody.length > maxlength) {
                swal(
                    '',
                    'Character Length is over, Maximum Length 7500 Character',
                    'error'
                ).then(function () {
                    return false;
                });
                return false;
            }
            if (TrxBody != '') {
                Forward_DraftActionClose()
            } else {
                $("#modal-forward").modal('hide');
            }
        } else {
            $("#modal-forward").modal('hide');
        }
    } else {
        $("#modal-forward").modal('hide');
    }
}
function Forward_DraftActionClose() {
    var TrxBodyForward = CKEDITOR.instances.Forward_BodyEmail.getData()
    var maxlength = "7500"
    if (TrxBodyForward.length > maxlength) {
        swal(
            '',
            'Character Length is over, Maximum Length 7500 Character',
            'error'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxBodyForward == '') {
        swal("Body is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxUserName: $("#hd_sessionLogin").val(), TrxTO: $("#ForwardTo").val(), TrxSubject: $("#ForwardSubject").val(),
        TrxCC: $("#ForwardECC").val(), TrxBody: TrxBodyForward, TrxDirection: "DRAFT", TrxType: "draft_email",
    });
    swal({
        title: "Do you want to continue this email as a draft ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/UIDESK_TrxEmailDraft",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data has been send to draft success',
                                    'success'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been draft success'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ReplyTo").val("");
                                    $("#ReplySubject").val("");
                                    $("#ReplyECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data has been send to draft failed !',
                                    'error'
                                ).then(function () {
                                    var TrxMessage = 'Your data has been send to draft failed !'
                                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                                    $("#ReplyTo").val("");
                                    $("#ReplySubject").val("");
                                    $("#ReplyECC").val("");
                                    CKEDITOR.instances.Compose_Body.setData("");
                                    window.location = "TrmMailSystem.aspx";
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
            } else {

                var form_data = JSON.stringify({
                    TrxUserName: $("#hd_sessionLogin").val(),
                });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/CleansingDraftAttachment",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)
                        window.location = "TrmMailSystem.aspx";
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

$('#attachmentforward').change(function () {
    var filename = $('#attachmentforward').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='attachmentforward']", function (e) {
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
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

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
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        data.append("Emailid", $("#ContentPlaceHolder1_TrxGenerateEmailID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmMailSystem.asmx/UploadFile",
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

            ForwardAttachment($("#ContentPlaceHolder1_TrxGenerateEmailID").val())

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

function PreviewCreateTicket(id,threadid,numberid,account) {
    var UrlType = "1";
    $("#modal-ticket").modal('show');
    document.getElementById("Ticket_FrameHTML").src = "1_doticket.aspx?header=0&footer=0&id=" + id + "&channel=EMAIL&n=1&threadid=" + threadid + "&numberid=EMAIL-" + numberid + "&account=" + account + "";
   
   
}
function PreviewJourneyTicket(ticketid) {
    var UrlType = "1";
    $("#modal-ticket").modal('show');
    
    document.getElementById("Ticket_FrameHTML").src = "1_journey.aspx?ticketid=" + ticketid + "&numberid=0&threadid=0&header=0&footer=0";

}

function PreviewTableInbox(PreviewID) {
    var FileInboxHTML = "../FileEmail/INBOX"
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    var UrlType = "1";
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/ValidasikFolderFileHTML",
        data: "{Url: '" + UrlType + "', EmailID: '" + PreviewID +"'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {

                    $("#modal-preview").modal('show');
                    document.getElementById("Preview_FrameHTML").src = "" + FileInboxHTML + "/" + PreviewID + "/file.html"
                    PreviewAttachmentInboxEmail(PreviewID)
                    PreviewAttachmentReplyEmail(PreviewID)

                } else {
                    swal(
                        '',
                        'Data Not Found',
                        'info'
                    ).then(function () {
                        return false;
                    });
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
function PreviewTableSending(PreviewID) {
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    var UrlType = "2";
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/ValidasikFolderFileHTML",
        data: "{Url: '" + UrlType + "', EmailID: '" + PreviewID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {

                    $("#modal-preview").modal('show');
                    document.getElementById("Preview_FrameHTML").src = "" + FileOutboxHTML + "/" + PreviewID + "/file.html"
                    PreviewAttachmentReplyEmail(PreviewID)

                } else {
                    swal(
                        '',
                        'Data Not Found',
                        'info'
                    ).then(function () {
                        return false;
                    });
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
function PreviewAttachment() {
    $("#modal-preview-file").modal('show');
}
function PreviewAttachmentInboxEmail(TrxEmailID) {
    $("#LoaderPageAttachment").hide();
    var FileInboxHTML = "../FileEmail/INBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'PreviewAttachmentInboxEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultPreviewInboxAttachment = "";

            $('#Div_PreviewInbox_Attachment').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                }
                ResultPreviewInboxAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-success"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 10) + '</a>' +
                    '<a href=' + FileInboxHTML + '/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#Div_PreviewInbox_Attachment').append(ResultPreviewInboxAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#LoaderPageAttachment").hide();
}
function PreviewAttachmentReplyEmail(TrxEmailID) {
    $("#LoaderPageAttachment").hide();
    var FileOutboxHTML = "../FileEmail/OUTBOX"
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + TrxEmailID + "', TrxEvent: 'PreviewAttachmentReplyEmail', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultPreviewReplyAttachment = "";

            $('#Div_PreviewReply_Attachment').empty();
            for (i = 0; i < json.length; i++) {

                PreviewAttachmentInboxEmail(json[i].ATTACHMENT_ID)

                if (json[i].FILETYPE == ".doc") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".docx") {
                    var FileTypes = "word";
                }
                else if (json[i].FILETYPE == ".pdf" || json[i].FILETYPE == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].FILETYPE == ".xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].FILETYPE == ".zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".txt") {
                    var FileTypes = "code";
                }
                else if (json[i].FILETYPE == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == "png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == ".JPEG" || json[i].FILETYPE == "JPEG" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp" || json[i].FILETYPE == ".bmp") {
                    var FileTypes = "image";
                }

                ResultPreviewReplyAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-danger"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 10) + '</a>' +
                    '<a href=' + FileOutboxHTML + '/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#Div_PreviewReply_Attachment').append(ResultPreviewReplyAttachment)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#LoaderPageAttachment").hide();
}
function deleteAttachment(DeleteID) {
    if (DeleteID == '') {
        swal("Attachment is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxID: DeleteID, TrxUserName: $("#hd_sessionLogin").val()
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
                    url: "asmx/TrmMailSystem.asmx/DeleteAttachmentEmail",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        var TrxMessage = 'Your file has been delete'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                        TrmAttachmentEmailCompose($("#hd_sessionLogin").val());

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
function deleteAttachmentReply(DeleteID, TrxEmailID) {
    if (DeleteID == '') {
        swal("Attachment is empty");
        return false
    }
    var form_data = JSON.stringify({
        TrxID: DeleteID, TrxUserName: $("#hd_sessionLogin").val()
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
                    url: "asmx/TrmMailSystem.asmx/DeleteAttachmentEmail",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        var TrxMessage = 'Your file has been delete'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                        ReplyAttachmentReplyEmail()

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
function DisplayData() {
    $("#startdate").val("");
    $("#enddate").val("");
    $("#ContentPlaceHolder1_Hd_StartDate").val("");
    $("#ContentPlaceHolder1_Hd_FinishDate").val("");
    $("#modal-history").modal('show');
}
function ActionHistory() {
    var TimeStartDate = $("#startdate").val();
    var TimeEndDate = $("#enddate").val();
    if (TimeStartDate != "") {
        if (TimeEndDate == "") {
            swal("End Date is empty");
            return false;
        } else {
            if (TimeEndDate < TimeStartDate) {
                swal("End date smaller than start date")
                $("#LoaderPage").hide();
                return false
            }
           
            // Untuk Checking Filtering Tanggal
            var jsonTextTanggal = JSON.stringify({ TrxID: "0", StartDate: TimeStartDate, EndDate: TimeEndDate, TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "CheckDay" });
            $.ajax({
                url: "asmx/TrmMailSystem.asmx/UIDESK_TrxFilterDate",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: jsonTextTanggal,
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, result = "";

                    for (i = 0; i < json.length; i++) {

                        if (json[i].ResultNya == "Failed") {
                            swal(
                                '',
                                'Date more than days',
                                'error'
                            ).then(function () {
                                return false;
                                //window.location = "TrmMailSystem.aspx";
                            });
                            return false;
                        } else {

                            // Untuk Filtering Email
                            var jsonText = JSON.stringify({ TrxID: "0", StartDate: TimeStartDate, EndDate: TimeEndDate, TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "INSERT" });
                            $.ajax({
                                url: "asmx/TrmMailSystem.asmx/UIDESK_TrxFilterDate",
                                method: "POST",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: jsonText,
                                success: function (data) {

                                    var json = JSON.parse(data.d);
                                    var j, result = "";

                                    for (j = 0; j < json.length; j++) {
                                        window.location = "TrmMailSystem.aspx";
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
    } else {
        swal("Filter Date is empty");
        return false;
        //var KondisiData = "Where DateCreate between '" + TimeData + " 00:01' And '" + TimeData + " 23:59'";
    }
    $("#modal-history").modal('hide');
}
function ActionToday() {
    window.location.href = "TrmMailSystem.aspx";
}
function TrmSignature(TrxEventID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK79'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultCallCampaigns = "";

            for (i = 0; i < json.length; i++) {

                if (TrxEventID == "1") {
                    CKEDITOR.instances.Compose_Body.setData(json[i].signature);
                } else if (TrxEventID == "2") {
                    CKEDITOR.instances.Reply_BodyEmail.setData(json[i].signature);
                } else {
                    CKEDITOR.instances.Forward_BodyEmail.setData(json[i].signature);
                }

                $("#ContentPlaceHolder1_HDSignature").val(json[i].signature)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function LoginAgent() {
    var divLisAgent = $('#divLisAgent');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'6', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultAgentLogin = "";
            divLisAgent.empty();

            if (json.length == 0) {
                console.log("data not found " + i);
                resultAgentLogin = '<div class="media media-single" > No data found... </div>';
                divLisAgent.append(resultAgentLogin);

            } else {

                for (i = 0; i < json.length; i++) {
                    if (json[i].LOGIN == "1") {
                        var ColorLogin = "success"
                    } else {
                        var ColorLogin = "danger"
                    }
                    resultAgentLogin = '<ul class="nav nav-pills flex-column">' +
                        '<li class="nav-item"><a class="nav-link" href="#"><i class="fa fa-circle text-' + ColorLogin + '"></i>' + json[i].NAME + '</a></li>' +
                        '</ul>'
                    divLisAgent.append(resultAgentLogin);
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
function FilterDateToday() {
    var jsonTextTanggal = JSON.stringify({ TrxID: "0", StartDate: "0", EndDate: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "FilterDateToday" });
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrxFilterDate",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonTextTanggal,
        success: function (data) {

            var json = JSON.parse(data.d);
            var j, result = "";

            for (j = 0; j < json.length; j++) {

                var milisegundos = parseInt(json[j].TodayQuery.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var ConvertTodayQuery = newDate.split('/');

                $("#FilterDate").empty()
                $("#FilterDate").append(json[j].FilterTodays)
                $("#ContentPlaceHolder1_Hd_StartDate").val(ConvertTodayQuery[2] + "-" + ConvertTodayQuery[1] + "-" + ConvertTodayQuery[0])
                $("#ContentPlaceHolder1_Hd_FinishDate").val(ConvertTodayQuery[2] + "-" + ConvertTodayQuery[1] + "-" + ConvertTodayQuery[0])

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
function DisplayFilterDate() {
    var jsonTextTanggal = JSON.stringify({ TrxID: "0", StartDate: "0", EndDate: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "FilterDate" });
    $.ajax({
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrxFilterDate",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonTextTanggal,
        success: function (data) {

            var json = JSON.parse(data.d);
            var j, result = "";

            for (j = 0; j < json.length; j++) {

                $("#FilterDate").empty()
                $("#FilterDate").append(json[j].StartDate + " s/d " + json[j].FinishDate)

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
}
function ComboFromEmail() {
    if ($("#TrxLayerUser").val() == "Admin") {
        var Code = "UIDESK116"
    } else if ($("#TrxLayerUser").val() == "layer2" ) {
        var Code = "UIDESK116"
    } else {
        var Code = "UIDESK116"
    }
    var ComboFrom = $('#ComboFrom');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'4', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: '" + Code +"'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultFrom = "";

            for (i = 0; i < json.length; i++) {

                if ($("#TrxLayerUser").val() == "layer2" || $("#TrxLayerUser").val() == "layer1" || $("#TrxLayerUser").val() == "Admin") {
                    ResultFrom = '<option value="' + json[i].incoming_account_name + '">' + json[i].incoming_account_name + '</option>';
                } else {
                    ResultFrom = '<option value="' + json[i].product_campaign + '">' + json[i].product_campaign + '</option>';
                }
                ComboFrom.append(ResultFrom);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboForwardFromEmail() {
    var ComboForwardFrom = $('#ForwardComboFrom');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'4', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK73'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultForwardFrom = "";

            for (i = 0; i < json.length; i++) {

                ResultForwardFrom = '<option value="' + json[i].product_campaign + '">' + json[i].product_campaign + '</option>';
                ComboForwardFrom.append(ResultForwardFrom);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ChangeComboSignature(val) {
    if ($("#TrxLayerUser").val() === "Admin") {
        CKEDITOR.instances.Compose_Body.setData("");
        CKEDITOR.instances.Reply_BodyEmail.setData("")
        CKEDITOR.instances.Forward_BodyEmail.setData("");
        //alert(val)
        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: "{TrxID:'" + $("#ComboFrom").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK79'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i = "0";

                for (i = 0; i < json.length; i++) {

                    if (val == "1") {
                        CKEDITOR.instances.Compose_Body.setData(json[i].signature);
                    } else if (val == "2") {
                        CKEDITOR.instances.Reply_BodyEmail.setData(json[i].signature);
                    } else {
                        CKEDITOR.instances.Forward_BodyEmail.setData(json[i].signature);
                    }
                    $("#ContentPlaceHolder1_HDSignature").val(json[i].signature)
                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }else{
        TrmSignature(val)
    }
}
function ComboForwardTypeCompose() {
    var ComboFormatCompose = $('#FormatTypeCompose');
    var ComboFormatReply = $('#FormatTypeReply');
    var ComboFormatForward = $('#FormatTypeForward');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK115'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultTypeForward = "";

            for (i = 0; i < json.length; i++) {

                ResultTypeForward = '<option value="' + json[i].ID + '">' + json[i].FORMAT + '</option>';
                ComboFormatCompose.append(ResultTypeForward);
                ComboFormatReply.append(ResultTypeForward);
                ComboFormatForward.append(ResultTypeForward);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function OnchangeFormatTypeCompose(FormatID) {
    if ($('#FormatTypeCompose').val() == "" || $('#FormatTypeCompose').val() == "Select" || $('#FormatTypeCompose').val() == null) {
        TrmSignature("1")
    } else {
        $.ajax({
            type: "POST",
            url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
            data: "{ID:'" + $('#FormatTypeCompose').val() + "', Template:'0', Format:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                var i = "";

                for (i = 0; i < json.length; i++) {

                    var TemplateCompose = json[i].TEMPLATE_RESPONSE + "</br>" + $("#ContentPlaceHolder1_HDSignature").val()
                    CKEDITOR.instances.Compose_Body.setData(TemplateCompose)

                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
}
function OnchangeFormatTypeReply(FormatID) {
    if ($('#FormatTypeReply').val() == "" || $('#FormatTypeReply').val() == "Select" || $('#FormatTypeReply').val() == null) {
        TrmSignature("2")
    } else {
        $.ajax({
            type: "POST",
            url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
            data: "{ID:'" + $('#FormatTypeReply').val() + "', Template:'0', Format:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                var i = "";

                for (i = 0; i < json.length; i++) {

                    var TemplateCompose = json[i].TEMPLATE_RESPONSE + "</br>" + $("#ContentPlaceHolder1_HDSignature").val()
                    CKEDITOR.instances.Reply_BodyEmail.setData(TemplateCompose)

                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
}
function OnchangeFormatTypeForward(FormatID) {
    if ($('#FormatTypeForward').val() == "" || $('#FormatTypeForward').val() == "Select" || $('#FormatTypeForward').val() == null) {
        TrmSignature("3")
    } else {
        $.ajax({
            type: "POST",
            url: "asmx/TrmTemplateResponseEmail.asmx/AHU_Uidesk_TrxFormatResponseEmail_TSIUD",
            data: "{ID:'" + $('#FormatTypeForward').val() + "', Template:'0', Format:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                var i = "";

                for (i = 0; i < json.length; i++) {

                    var TemplateCompose = json[i].TEMPLATE_RESPONSE + "</br>" + $("#ContentPlaceHolder1_HDSignature").val()
                    CKEDITOR.instances.Forward_BodyEmail.setData(TemplateCompose)

                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
}
function ReplaceEmailCC(AddressEmail) {
    //alert(AddressEmail)
    let dummyString = AddressEmail;
    newString = dummyString.replace('helpdesk.distribution@brilife.co.id;', '').replace('cs@brilife.co.id;', '').replace('Helpdesk.distribution@brilife.co.id;', '').replace('CS@brilife.co.id;', '').replace('Helpdesk.Distribution@brilife.co.id;', '');
    //alert(newString);
    return newString
}
function EmailConversation(RefID) {
    //alert(RefID)
    $("#Div_Conversation").show();
    var FileInboxHTML = "../FileEmail/Inbox"
    var FileOutboxHTML = "../FileEmail/Outbox"
    var filenameimage = "";
    var result = "";
    var result_in = ""
    var messageDiv = $('#Journeymailconversation');
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailConversation",
        data: "{RefID: '" + RefID + "', UserName: '" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: async function (data) {
            var json = JSON.parse(data.d);
            var i = 0;

            messageDiv.empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].DIRECTION == "IN") {

                    let imagein = ""
                    await $.ajax({
                        type: "POST",
                        url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailAttachment",
                        data: "{RefID: '" + RefID + "', EmailID: '" + json[i].EMAIL_ID + "', Direction: 'IN', UserName: '" + $("#hd_sessionLogin").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var j = 0;

                            for (j = 0; j < json.length; j++) {

                                imagein += "" +
                                    "<li>" +
                                    "<span class='mailbox-attachment-icon'><i class='fa fa-file-pdf-o'></i></span>" +
                                    "<div class='mailbox-attachment-info'>" +
                                    "<a href='#' class='mailbox-attachment-name'><i class='fa fa-paperclip'></i>" + json[j].FILENAME + "</a>" +
                                    "<span class='mailbox-attachment-size'>5,215 KB" +
                                    "<a href='" + FileInboxHTML + "/" + json[j].URL + "' class='btn btn-default btn-xs pull-right' target='_blank'><i class='fa fa-cloud-download'></i></a>" +
                                    "</span>" +
                                    "</div>" +
                                    "</li>"

                            }
                            console.log(imagein)
                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });

                    result = "<div class='timeline'> " +
                        "<div class='timeline-item timeline-item-left'>" +
                        "<div class='timeline-point timeline-point-blank'></div> " +
                        "<div class='timeline-event timeline-event-default'>" +
                        "<div class='timeline-heading'>" +
                        "<h4 class='timeline-title'><img alt='Profile' src='../images/avatar/6.jpg' class='avatar'></h4>" +
                        "</div>" +
                        "<div class='timeline-body'>" +
                        "<p>" +
                        "" + json[i].EBODY_HTML + "" +
                        "</p> " +
                        "</div>" +
                        "<div class='timeline-footer'>" +
                        "<ul class='mailbox-attachments clearfix' >" +
                        "" + imagein + "" +
                        "</ul>" +
                        "</div>"

                } else {

                    let imageout = ""
                    await $.ajax({
                        type: "POST",
                        url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailAttachment",
                        data: "{RefID: '" + RefID + "', EmailID: '" + json[i].EMAIL_ID + "', Direction: 'OUT', UserName: '" + $("#hd_sessionLogin").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var j = 0;

                            for (j = 0; j < json.length; j++) {

                                imageout += "" +
                                    "<li>" +
                                    "<span class='mailbox-attachment-icon'><i class='fa fa-file-pdf-o'></i></span>" +
                                    "<div class='mailbox-attachment-info'>" +
                                    "<a href='#' class='mailbox-attachment-name'><i class='fa fa-paperclip'></i>" + json[j].FILENAME + "</a>" +
                                    "<span class='mailbox-attachment-size'>5,215 KB" +
                                    "<a href='" + FileOutboxHTML + "/" + json[j].URL + "' class='btn btn-default btn-xs pull-right' target='_blank'><i class='fa fa-cloud-download'></i></a>" +
                                    "</span>" +
                                    "</div>" +
                                    "</li>"

                            }
                            console.log(imageout)
                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });

                    result = "<div class='timeline'> " +
                        "<div class='timeline-item timeline-item-right'>" +
                        "<div class='timeline-point timeline-point-blank'></div> " +
                        "<div class='timeline-event timeline-event-default'>" +
                        "<div class='timeline-heading'>" +
                        "<h4 class='timeline-title'><img alt='Profile' src='../images/avatar/6.jpg' class='avatar'></h4>" +
                        "</div>" +
                        "<div class='timeline-body'>" +
                        "<p>" +
                        "" + json[i].EBODY_HTML + "" +
                        "</p> " +
                        "</div>" +
                        "<div class='timeline-footer'>" +
                        "<ul class='mailbox-attachments clearfix' >" +
                        "" + imageout + "" +
                        "</ul>" +
                        "</div>"

                }
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