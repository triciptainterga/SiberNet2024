$(document).ready(function () {
    $("#LoaderPage").hide();
    TrxTableBucket()
});
function TrxTableBucket() {
    var TimeStartDate = $("#startdate").val();
    var TimeEndDate = $("#enddate").val();
    var TrxUserName = $("#hd_sessionLogin").val();
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
    var myTable = $('#TrxTableBucket').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxBucket",
        data: "{TrxStartDate:'" + TimeStartDate + "', TrxEnddate:'" + TimeEndDate + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            if (json.length == 0) {

                swal("Data Table Bucket is empty");
                $("#LoaderPage").hide();
                return false

            } else {
                for (i = 0; i < json.length; i++) {

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

                    myTable.row.add([json[i].ID, json[i].call_name, json[i].call_polis_number, json[i].call_email, json[i].call_phone_number,
                    newDate + newTime]).draw(false);

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
    TrxTableBucket()
}
function CheckSummaryDay() {
    var jsonText = JSON.stringify({ StartDate: $("#startdate").val(), EndDate: $("#enddate").val(), TrxUserName: $("#hd_sessionLogin").val() });
    console.log("CheckSummaryDay" + jsonText)
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
                    window.location.href = "TrmBucket.aspx"
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