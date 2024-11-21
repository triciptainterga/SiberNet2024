$(document).ready(function () {
    //alert("test")
    getWS_2_taskboard();
    //getWS_DataTableTaskboard();
});

function getWS_2_taskboard() {
    var ValUserID = $("#hd_sessionLogin").val();
    var ValLayerID = "1";
    var ValSpv = "none";
    var result = "";
    var messageDiv = $('#2_TampungKotakAtas');
    //alert(ValUserID)
    $.ajax({
        type: "POST",
        url: "asmx/ServiceChannelWaBlastDashboard.asmx/ws_3_ChannelWaBlastDashboard",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
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
                    '<a class="box box-link-shadow text-center" href="javascript:void(0)"> ' +
                    '<div class="box-body"> ' +
                    '<div class="font-size-24">' + json[i].JumlahData + '</div> ' +
                    '<span>' + json[i].TemplateName + '</span> ' +
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

function getWS_DataTableTaskboard() {
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLoginTypeAngka = $("#TrxLoginTypeAngka").val();
    var TrxDivisi = $("#TrxDivisi").val();
    var TrxStatus = "Open";
    var result = "";
    //var messageDiv = $('#TaskboardTicket');
    //alert(ValUserID)

    var myTaskboardTicket = $('#TaskboardTicket').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/ServiceTaskboard.asmx/DataTableTaskboard",
        data: "{TrxUserName: '" + TrxUserName + "',TrxLoginTypeAngka: '" + TrxLoginTypeAngka + "',TrxDivisi: '" + TrxDivisi + "',TrxStatus: '" + TrxStatus + "'}",
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
                    //alert(json[i].TrxID);

                    //if (json[i].datecreate == "null") {
                    var ConverTanggal = "-";
                    //} else {
                    //    var d = new Date(json[i].datecreate);
                    //    var milisegundos = parseInt(json[i].datecreate.replace("/Date(", "").replace(")/", ""));
                    //    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    //    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    //    var ConverTanggal = newDate + ' ' + newTime
                    //}
                    var urlAction = "<a href='1_journey.aspx?ticketid=" + json[i].TicketNumber + "'><i class='si-arrow-right-circle si'></i></a>"
                    myTaskboardTicket.row.add([json[i].TicketNumber, json[i].NamePIC, json[i].NamePIC, json[i].CategoryName, json[i].Status, json[i].PHONE_PELAPOR, json[i].SLA, json[i].UsedDaySLAOK, ConverTanggal, urlAction]).draw(false);

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