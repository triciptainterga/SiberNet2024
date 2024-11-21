$(document).ready(function () {
    TrmDashboardVendor();
    DataTableTaskboard();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function TrmDashboardVendor() {
    var messageDiv = $('#BoxVendor');
    $.ajax({
        type: "POST",
        url: "asmx/ServiceCustomer.asmx/BoxDashbardVendor",
        data: "{TrxVendorID: '" + $("#ContentPlaceHolder1_TrxVendorID").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            messageDiv.empty();
            for (i = 0; i < json.length; i++) {
                //alert(json[i].statusIcon);
                //alert();
                //alert(json[i].JumlahData);
                result = '<div class="col-lg-3 col-6"> ' +
                        '<a class="box box-link-shadow text-center" href="TrmVendorDashboard.aspx?status=' + json[i].StatusData + '"> ' +
                            '<div class="box-body"> ' +
                                '<div class="font-size-24">' + json[i].JumlahData + '</div> ' +
                                '<span>' + json[i].StatusData + '</span> ' +
                                '</div> ' +
                                '<div class="box-body ' + json[i].statusColor + '"> ' +
                                '<center> ' +
                                '<span class="mdi ' + json[i].statusIcon + ' font-size-30"></span> ' +
                                '</center> ' +
                            '</div> ' +
                        '</a> ' +
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
function DataTableTaskboard() {
    var TrxStatus = getParameterByName("status");
    var result = "";
    var myTaskboardTicket = $('#TaskboardTicket').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/ServiceCustomer.asmx/DataTableDashbardVendor",
        data: "{TrxVendorID: '" + $("#ContentPlaceHolder1_TrxVendorID").val() + "',TrxStatus: '" + TrxStatus + "'}",
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

                    var d = new Date(json[i].CreatedDate);
                    var milisegundos = parseInt(json[i].CreatedDate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    if (json[i].Status == "Open") {
                        var TrxParam = "<span class='badge badge-pill badge-info' style='width: 100px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Pending") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 100px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Solved") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 100px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 100px;'>" + json[i].Status + "</span>"
                    }
                    myTaskboardTicket.row.add([json[i].TicketNumber, json[i].NamePIC, json[i].CategoryName, json[i].CreatedBy, json[i].SLA, json[i].UsedDaySLAOK, TrxParam, newDate + ' ' + newTime]).draw(false);

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