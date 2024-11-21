$(document).ready(function () {
    TrmAccountEmail();
});
function TrmAccountEmail() {
    var JenisKondisi = "AllWhereData";
    var NamaView = "UIDESK_TrmEmailAccount";
    var KondisiData = "";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });

    var myTable = $('#TrmChannel').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmConfigurationEmail.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DATE_CREATE);
                var milisegundos = parseInt(json[i].DATE_CREATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    //"<a class='dropdown-item' href='#' onclick=showConnect('" + json[i].ID + "')><i class='fa fa-plug'></i> Check Connection</a>" +
                    "</div>" +
                    "</div>"
                myTable.row.add([json[i].ID, json[i].EMAIL_ACCOUNT, json[i].EMAIL_SMTP, json[i].EMAIL_PORT, json[i].EMAIL_USERNAME, json[i].EMAIL_PASSWORD, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Update").css("display", "block");
    $("#Connect").css("display", "none");
    var JenisKondisi = "AllWhereData";
    var NamaView = "UIDESK_TrmEmailAccount";
    var KondisiData = "where ID='" + TrxID + "'";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    $.ajax({
        type: "POST",
        url: "asmx/TrmConfigurationEmail.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#Account").val(json[i].EMAIL_ACCOUNT);
                $("#SMTP").val(json[i].EMAIL_SMTP);
                $("#Port").val(json[i].EMAIL_PORT);
                $("#Username").val(json[i].EMAIL_USERNAME);
                $("#Password").val(json[i].EMAIL_PASSWORD);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}