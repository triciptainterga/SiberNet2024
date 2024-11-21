$(document).ready(function () {
    TrmEpicSystem();
    $("#LoaderPage").hide();
});
function TrmEpicSystem() {
    var myTable = $('#TrmEpicSystem').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK46'}",
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
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"

                myTable.row.add([json[i].ID, json[i].AES, json[i].AesUser, json[i].AesPassword, json[i].port, json[i].iPDb, json[i].dbUser,
                json[i].dbPassword, json[i].dbName, json[i].dialCode, json[i].callHistoryEndpoint, json[i].agentEndpoint, json[i].inboundEndpoint,
                json[i].outboundEndpoint, json[i].browserPath, json[i].Theme, json[i].ACW, json[i].pbxLogin,
                json[i].pbxLogOut, json[i].pbxAux, json[i].pbxAutoIn, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}