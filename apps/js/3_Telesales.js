$(document).ready(function () {
    $("#LoaderPage").hide();
    loadCampaignData(getParameterByName('id'));

});
var countPage = 0;

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function loadCampaignData(id) {
    var myCallListData = $('#CallListData').DataTable();
    $("#LoaderPage").show();
    var JenisKondisi = "AllWhereData";
    var divListCampaigns = $('#ListCampaigns');
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "vw_campaigns_data", paramQuery: "where StatusBlast='New' and IDCampaigns="+ id +"" });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultStatus = "";
            myCallListData.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {
                    var urlAction = '<a href="#" onclick="callIframe(104)" data-toggle="modal" data-target="#modal-fill"><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i></a>';
                    myCallListData.row.add([i + 1, json[i].CustID, json[i].CustName, json[i].NoWA, json[i].GroupBlast, urlAction]).draw(false);
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

