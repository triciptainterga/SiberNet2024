$(document).ready(function () {
    TrmCounting();
});
function TrmCounting() {
    var ValUserID = $("#hd_sessionLogin").val();
    var result = "";
    $.ajax({
        type: "POST",
        url: "asmx/TrmLevelUser.asmx/LevelUserCounting",
        data: "{UserID: '" + ValUserID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            for (i = 0; i < json.length; i++) {
                if (json[i].LevelUser == "Layer 1") {
                    //$("#ContentPlaceHolder1_layer1").val(json[i].LevelLayer);
                    $("#layer1").append(json[i].LevelLayer + " Data User");
                    console.log("layer 1 " + json[i].LevelLayer)
                } else if (json[i].LevelUser == "Layer 2") {
                    $("#layer2").append(json[i].LevelLayer + " Data User");
                    console.log("layer 2 " + json[i].LevelLayer)
                } else if (json[i].LevelUser == "Layer 3") {
                    $("#layer3").append(json[i].LevelLayer + " Data User");
                    console.log("layer 3 " + json[i].LevelLayer)
                } else if (json[i].LevelUser == "Supervisor") {
                    $("#layerSpv").append(json[i].LevelLayer + " Data User");
                    console.log("Supervisor " + json[i].LevelLayer)
                } else if (json[i].LevelUser == "Administrator") {
                    $("#layerAdm").append(json[i].LevelLayer + " Data User");
                    console.log("Administrator " + json[i].LevelLayer)
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