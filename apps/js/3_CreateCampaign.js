
$(document).ready(function () {
    loadCampaignList();
});
//var countPage = 0;
function loadCampaignList() {
    var JenisKondisi = "AllWhereData";
    var divListCampaigns = $('#ListCampaigns');
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "campaigns_header", paramQuery: "where StatusActive='YES'" });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultStatus = "";
            for (i = 0; i < json.length; i++) {
                //alert();
                //alert();
                //alert(json[i].UserCreate);
                //resultStatus = '<option value="' + json[i].ID + '">' + json[i].TemplateName + '</option>';
                resultStatus = '<div class="media media-single">' +
                                    '<a href= "3_Telesales.aspx?id=' + json[i].ID + '" ><img src="../images/icon/' + json[i].Channel + '.png" height="32" alt="..."></a>' +
                                    '<div class="media-body">' +
                                        '<h6><a href="3_Telesales.aspx?id=' + json[i].ID + '">' + json[i].CampaignName + '</a></h6>' +
                                        '<small class="text-fader">' + json[i].Channel + '</small>' +
                                    '</div>' +
						       '</div>'
                divListCampaigns.append(resultStatus);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

