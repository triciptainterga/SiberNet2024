$(document).ready(function () {
    $("#LoaderPageCounting").hide();
    TrmOutboundHeader();
});
function TrmOutboundHeader() {
    $("#LoaderPageCounting").show();
    var TsToday = new Date();
    var TsHari = TsToday.getDate();
    var TsBulan = TsToday.getMonth() + 1;
    var TsTahun = TsToday.getFullYear();
    var TsFulldate = TsTahun + "-" + TsBulan + "-" + TsHari + ""
    var JenisKondisi = "AllWhereData";
    var NamaView = "UIDESK_TrxOutboundHeader";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: "" });
    console.log("Table TrmOutboundHeader" + jsonText)
    var myTable = $('#TrmOutboundHeader').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecordsBigData",
        data: jsonText,
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