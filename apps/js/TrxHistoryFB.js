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
        url: "asmx/TrxHistoryFB.asmx/UIDESK_TrxHistoryFB",
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
                   
                    if (json[i].DateGetSosmed != null) {
                        var d = new Date(json[i].DateGetSosmed);
                        var milisegundos = parseInt(json[i].DateGetSosmed.replace("/Date(", "").replace(")/", ""));
                        var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                        var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                        var DateGetSosmed = newDate + newTime
                    } else {
                        var DateGetSosmed = "-"
                    }

                    if (json[i].DateComment != null) {
                        var d = new Date(json[i].DateComment);
                        var milisegundos = parseInt(json[i].DateComment.replace("/Date(", "").replace(")/", ""));
                        var newDateDateComment = new Date(milisegundos).toLocaleDateString("en-UE");
                        var newTimeDateComment = new Date(milisegundos).toLocaleTimeString("en-UE");

                        var DateComment = newDateDateComment + newTimeDateComment
                    } else {
                        var DateComment = "-"
                    }

                    if (json[i].DateReply != null) {
                        var d = new Date(json[i].DateReply);
                        var milisegundos = parseInt(json[i].DateReply.replace("/Date(", "").replace(")/", ""));
                        var newDateDateReply = new Date(milisegundos).toLocaleDateString("en-UE");
                        var newTimeDateReply = new Date(milisegundos).toLocaleTimeString("en-UE");

                        var DateReply = newDateDateReply + newTimeDateReply
                    } else {
                        var DateReply = "-"
                    }
                  

                    TrxHistory.row.add([json[i].HeaderSosmed, json[i].ProfileName, json[i].Messages, DateGetSosmed,
                        json[i].ProfileComment, json[i].MessageComment, DateComment,
                        json[i].ProfileReply, json[i].MessageReply, DateReply]).draw(false);

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