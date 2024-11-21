$(document).ready(function () {
    TrmMonitoring();
    TrmMonitoring_DataTable();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function TrmMonitoring() {
    var ValUserID = $("#hd_sessionLogin").val();
    var ValLayerID = $("#TrxLoginTypeAngka").val();
    var ValSpv = $("#TrxLayerUser").val();
    var result = "";
    var messageDiv = $('#2_TampungKotakAtas');
    $.ajax({
        type: "POST",
        url: "asmx/TrmMonitoring.asmx/ws_counting_login",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            messageDiv.empty();
            for (i = 0; i < json.length; i++) {

                result = '<div class="col-lg-3 col-6"> ' +
                    '<a class="box box-link-shadow text-center" href="TrmMonitoring.aspx?flag=' + json[i].Flag + '"> ' +
                    '<div class="box-body"> ' +
                    '<div class="font-size-24">' + json[i].AgentCounting + '</div> ' +
                    '<span>' + json[i].Type + '</span> ' +
                    '</div> ' +
                    '<div class="box-body ' + json[i].Color + '"> ' +
                    '<center> ' +
                    '<span class="mdi ' + json[i].Icon + ' font-size-30"></span> ' +
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
function TrmMonitoring_DataTable() {
    var TrxFlag = getParameterByName("flag");
    var result = "";
    var myTaskboardTicket = $('#TaskboardMonitoring').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMonitoring.asmx/DataTableMonitoring",
        data: "{TrxFlag: '" + TrxFlag + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTaskboardTicket.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    if (json[i].LEVELUSER == "Layer 1") {
                        var Action = "<a href='#' class='text-warning' onclick=ReleaseLogin('" + json[i].USERNAME + "')><i class='ti-arrow-circle-right' aria-hidden='true'></i></a>"
                    } else {
                        var Action = "-"
                    }
                    myTaskboardTicket.row.add([json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].EMAIL_ADDRESS, json[i].LEVELUSER, json[i].DescAUX, Action]).draw(false);

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
function ReleaseLogin(TrxID) {
    $("#ContentPlaceHolder1_TrxTicketID").val(TrxID)
    if (getParameterByName("flag") != "2" && getParameterByName("flag") != "4") {
        swal("Release Login Not Access")
        return false
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxTicketID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxType: getParameterByName("flag") });
                $.ajax({
                    url: "asmx/TrmMonitoring.asmx/ReleaseLogin",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Release Login Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrmMonitoring.aspx?flag=" + getParameterByName("flag") + ""
                                });
                            } else {
                                swal(
                                    '',
                                    'Release Login Failed',
                                    'error'
                                ).then(function () {
                                    return false
                                });
                                return false
                            }
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
        });
}