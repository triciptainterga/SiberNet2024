$(document).ready(function () {
    $("#LoaderPageCounting").hide();
    DataTable();
});
function DataTable(sValue) {
    var result = "";
    var myTable = $('#TrmTeleHeader').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTaskboard.asmx/Tele_AI_Sample",
        data: "{ValueName:'All'}",
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

                    var d = new Date(json[i].date_start);
                    var milisegundos = parseInt(json[i].date_start.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime

                    var dX = new Date(json[i].date_end);
                    var milisegundosX = parseInt(json[i].date_end.replace("/Date(", "").replace(")/", ""));
                    var newDateX = new Date(milisegundosX).toLocaleDateString("en-UE");
                    var newTimeX = new Date(milisegundosX).toLocaleTimeString("en-UE");
                    var ConverTanggalX = newDateX + ' ' + newTimeX
               
                    myTable.row.add([json[i].Telepon, json[i].CallReason, ConverTanggal, ConverTanggalX, json[i].records_in_interval]).draw(false);

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