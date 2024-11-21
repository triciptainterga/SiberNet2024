$(document).ready(function () {
    $("#LoaderPage").hide();
    $("#myLabel").text("Data History Email");
});
function TrxHistoryInbox() {
    $("#myLabel").text("Data History Email Inbox");
    var TimeStartDate = $("#startdate").val();
    var TimeEndDate = $("#enddate").val();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLayerUser = $("#TrxLayerUser").val();

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
            CheckSummaryDay()
        }
    } else {
        if (TimeEndDate != "") {
            swal("Start Date is empty");
            return false;
        }
    }
    var myTable = $('#TrxHistory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrxHistoryEmail.asmx/UIDESK_TrxHistoryEmail",
        data: "{TrxID:'0', TrxStartDate:'" + TimeStartDate + "', TrxEnddate:'" + TimeEndDate + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAddress: '" + $("#EmailAddress").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            if (json.length == 0) {

                swal("Data history email is empty");
                $("#LoaderPage").hide();
                return false

            } else {

                for (i = 0; i < json.length; i++) {
                    var urlClick = "<div class='dropdown'>" +
                        "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                        "<div class='dropdown-menu dropdown-menu-right'>" +
                        "<a class='dropdown-item' href='https://crm.uidesk.id/roatex/FileEmail/INBOX/" + json[i].EMAIL_ID + "/file.html' target='_blank'><i class='mdi mdi-book-open'></i> File Email</a>" +
                        "<a class='dropdown-item' href='#' onclick=PreviewAttachmnent('" + json[i].EMAIL_ID + "')><i class='mdi mdi-paperclip'></i> Attachment</a>" +
                        "</div>" +
                        "</div>"

                    var d = new Date(json[i].Email_Date);
                    var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    myTable.row.add([json[i].ETO, json[i].EFROM, json[i].ESUBJECT, json[i].NAME, newDate + newTime, json[i].DIRECTION, urlClick]).draw(false);

                    $("#modal-history").modal('hide')
                    $("#LoaderPage").hide();

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
function TrxHistoryOutbox() {
    $("#myLabel").text("Data History Email Outbox");
    var TimeStartDate = $("#startdate").val();
    var TimeEndDate = $("#enddate").val();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLayerUser = $("#TrxLayerUser").val();

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
            CheckSummaryDay()
        }
    } else {
        if (TimeEndDate != "") {
            swal("Start Date is empty");
            return false;
        }
    }
    var myTable = $('#TrxHistory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrxHistoryEmail.asmx/UIDESK_TrxHistoryEmail",
        data: "{TrxID:'1', TrxStartDate:'" + TimeStartDate + "', TrxEnddate:'" + TimeEndDate + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAddress: '" + $("#EmailAddress").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            if (json.length == 0) {
                swal("Data history email is empty");
                $("#LoaderPage").hide();
                return false

            } else {

                for (i = 0; i < json.length; i++) {
                    var urlClick = "<div class='dropdown'>" +
                        "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-primary'></i></a>" +
                        "<div class='dropdown-menu dropdown-menu-right'>" +
                        "<a class='dropdown-item' href='https://crm.uidesk.id/roatex/FileEmail/OUTBOX/" + json[i].EMAIL_ID + "/file.html' target='_blank'><i class='mdi mdi-book-open'></i> File Email</a>" +
                        "<a class='dropdown-item' href='#' onclick=PreviewAttachmnent('" + json[i].EMAIL_ID + "')><i class='mdi mdi-paperclip'></i> Attachment</a>" +
                        "</div>" +
                        "</div>"

                    var d = new Date(json[i].Email_Date);
                    var milisegundos = parseInt(json[i].Email_Date.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    myTable.row.add([json[i].EFROM, json[i].ETO, json[i].ESUBJECT, json[i].NAME, newDate + newTime, json[i].DIRECTION, urlClick]).draw(false);

                    $("#modal-history").modal('hide')
                    $("#LoaderPage").hide();
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
function ActionHistory() {
    $("#LoaderPage").show();
    if ($("#cmbFeature").val() == "1") {
        TrxHistoryInbox();
    } else {
        TrxHistoryOutbox();
    }
}
function showAdd() {
    $("#cmbFeature").val("");
    $("#startdate").val("");
    $("#enddate").val("");
    $("#EmailAddress").val("");
    $("#modal-history").modal('show')
}
function CheckSummaryDay() {
    var jsonTextTanggal = JSON.stringify({ TrxID: "0", StartDate: $("#startdate").val(), EndDate: $("#enddate").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "CheckDay" });
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

                if (json[i].SummaryDay > 3) {

                    swal(
                        '',
                        'Date more than 3 days',
                        'error'
                    ).then(function () {
                        window.location = "TrxHistoryEmail.aspx";
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
function PreviewAttachmnent(EmailID) {
    $("#modal-interaction-attachment").modal('show')
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/UIDESK_TrmMasterDropdown",
        data: "{TrxID: '" + EmailID + "', TrxEvent: 'PreviewAttachmnent', TrxStartDate: '0', TrxEnddate: '0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultInteractionAttachment = "";

            $('#InteractionAttachment').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].DIRECTION == "IN") {
                    var FileAttachment = "https://crm.uidesk.id/roatex/FileEmail/INBOX/"
                } else if (json[i].DIRECTION == "OUT") {
                    var FileAttachment = "https://crm.uidesk.id/roatex/FileEmail/OUTBOX/"
                }
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
                else if (json[i].FILETYPE == ".png" || json[i].FILETYPE == ".PNG" || json[i].FILETYPE == "png" || json[i].FILETYPE == "PNG" || json[i].FILETYPE == ".JPG" || json[i].FILETYPE == ".jpeg" || json[i].FILETYPE == ".jpg" || json[i].FILETYPE == "JPG" || json[i].FILETYPE == "jpeg" || json[i].FILETYPE == "jpg" || json[i].FILETYPE == ".GIF" || json[i].FILETYPE == ".gif" || json[i].FILETYPE == "GIF" || json[i].FILETYPE == "gif" || json[i].FILETYPE == ".BMP" || json[i].FILETYPE == ".bmp" || json[i].FILETYPE == "BMP" || json[i].FILETYPE == "bmp") {
                    var FileTypes = "image";
                }

                if (json[i].FILESIZE == null) {
                    var TrxFILESIZE = "-";
                }

                resultInteractionAttachment = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>' +
                    '<span class="mailbox-attachment-size">' + TrxFILESIZE + '' +
                    '<a href=' + FileAttachment + '/' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>' +
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