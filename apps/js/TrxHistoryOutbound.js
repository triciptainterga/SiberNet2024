$(document).ready(function () {
    $("#LoaderPage").hide();
});
function TrxHistory() {
    var TimeStartDate = $("#startdate").val();
    var TimeEndDate = $("#enddate").val();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLayerUser = $("#TrxLayerUser").val();
    if ($("#PolisNumber").val() == "") {
        var TrxPolisNumber = "0"
    } else {
        var TrxPolisNumber = $("#PolisNumber").val();
    }
    if ($("#PhoneNumber").val() == "") {
        var TrxPhoneNumber = "0"
    } else {
        var TrxPhoneNumber = $("#PhoneNumber").val();
    }
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
        url: "asmx/TrxHistoryOutbound.asmx/UIDESK_TrxHistoryOutbound",
        data: "{TrxStartDate:'" + TimeStartDate + "', TrxEnddate:'" + TimeEndDate + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxPolisNumber: '" + TrxPolisNumber + "', TrxPhoneNumber: '" + TrxPhoneNumber +"'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            if (json.length == 0) {

                swal("Data history call is empty");
                $("#LoaderPage").hide();
                return false

            } else {

                for (i = 0; i < json.length; i++) {
                    var urlClick = "<a href='TrxHistoryOutboundCall.aspx?id=" + json[i].id + "&phonenumber=" + json[i].call_phone_number_trim + "' target='_blank' class='text-success' data-toggle='tooltip' data-original-title='Follow up'><i class='mdi mdi-book-open font-size-20' aria-hidden='true'></i></a>"
                    var d = new Date(json[i].call_created_date);
                    var milisegundos = parseInt(json[i].call_created_date.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

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
                    newDate + newTime, TrxParam, urlClick]).draw(false);

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
function showAdd() {
    $("#startdate").val("");
    $("#enddate").val("");
    $("#PolisNumber").val("");
    $("#PhoneNumber").val("");
    $("#modal-history").modal('show')
}
function ActionHistory() {
    $("#LoaderPage").show();
    TrxHistory()
}
function CheckSummaryDay() {
    var jsonText = JSON.stringify({ StartDate: $("#startdate").val(), EndDate: $("#enddate").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UIDESK01' });
    $.ajax({
        url: "asmx/TrxHistoryOutbound.asmx/CheckSummaryDay",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonText,
        success: function (data) {

            var json = JSON.parse(data.d);
            var j, result = "";

            for (j = 0; j < json.length; j++) {
                if (json[j].SummaryDay > 3) {
                    swal(" Date more than 3 days ");
                    window.location.href = "TrxHistoryOutbound.aspx"
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