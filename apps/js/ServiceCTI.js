

function SetTimeNya() {
    setInterval(getWS_LoadList(), 1000);
}
function getWS_LoadList() {
    console.log("Session CTI login : " + $("#hd_sessionLogin").val());
    var jsonText = JSON.stringify({Param1: 'sip:102@love.uidesk.id'});
    $.ajax({
        type: "POST",
        url: "asmx/ServiceCTI.asmx/DataTableEventCTI",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {
                console.log("Incoming Call " + json[i].call_id)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}