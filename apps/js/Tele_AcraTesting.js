function Simulasi() {
    alert("Gate 2")
    var browserName = navigator.appCodeName;
    alert("browserName : " + browserName)
    //return false;
    var jsonText = JSON.stringify({ name: "XXX", gender: "WWW"});
    $.ajax({
        url: "http://103.66.46.141:9009/api/v1/interaction/post",
        method: "POST",
        Authorization: "Basic VWlkZXNrMTIzOlVpZGVzazEyMw==",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        async: true,
        //data: jsonText,
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, result = "";

            for (i = 0; i < json.length; i++) {
                alert(json[i].status)
                //alert(json[i].responseMessage)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {

        }
    });
}