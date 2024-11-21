$(document).ready(function () {
    $("#LoaderPage").hide();
});
function TrxHistory() {
    $("#LoaderPage").show();
    var TimeStartDate = $("#startdate").val();
    var TimeEndDate = $("#enddate").val();
    var TrxUserName = $("#hd_sessionLogin").val();

    var TrxHistory = $('#TrxHistory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrxHistoryMention.asmx/UIDESK_TrxHistoryMention",
        data: "{TrxStartDate: '" + TimeStartDate + "',TrxEndDate: '" + TimeEndDate + "',TrxUserName: '" + TrxUserName + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            TrxHistory.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateMention);
                    var milisegundos = parseInt(json[i].DateMention.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");


                    TrxHistory.row.add([json[i].HeaderSosmed, json[i].ProfileAccount, json[i].MessageMention, json[i].MentionType, newDate + newTime]).draw(false);
                }

            }

            $("#LoaderPage").hide();
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
    $("#modal-history").modal('show')
}
function ActionHistory() {
    $("#LoaderPage").show();
    TrxHistory()
    $("#modal-history").modal('hide')
}