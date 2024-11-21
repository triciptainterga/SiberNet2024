$(document).ready(function () {
    TrmBoxCreateCampaign();
    TrmCreateCampaign();
    loadCampaignList();
    loadCampaignTemplate();
});
function TrmBoxCreateCampaign() {
    var divCreateCampaignData = $('#divCreateCampaignData');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UIDESK0001', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK32'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultCreateCampaignData = "";

            divCreateCampaignData.empty();
            for (i = 0; i < json.length; i++) {
                resultCreateCampaignData = '<div class="col-3"><div class="box">' +
                    '<div class="box-header with-border bg-' + json[i].color + '">' +
                    '<img src="../images/icon/' + json[i].Name + '.png" height="48" alt="...">' +
                    '</div>' +
                    '<div class="box-body">' +
                    '<div class="row">' +
                    '<div class="col-6 text-left">' +
                    '<a href="TrmCreateCampaignData.aspx?type=' + json[i].Name + '" class="btn btn-rounded btn-' + json[i].color + ' btn-outline">Create</a>' +
                    '</div>' +
                    '<div class="col-6">' +
                    '<p class="text-right">' +
                    '<h6>' + json[i].Name + ' Campaign </h6>' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                divCreateCampaignData.append(resultCreateCampaignData);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmCreateCampaign(TrxID) {
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        var TrxID = "0"
    } else {
        var TrxID = $("#ContentPlaceHolder1_TrxID").val()
    }
    var myTable = $('#TrmCreateCampaign').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxID +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK67'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"

                myTable.row.add([json[i].ID, json[i].NoWA, json[i].GroupBlast, json[i].TypeChannel, json[i].StatusBlast, newDate + ' ' + newTime]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function loadCampaignList() {
    var divListCampaigns = $('#ListCampaigns');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK16'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultStatus = "";

            divListCampaigns.append(
                '<div class="media media-single">' +
                '<a href="#" onclick="Reading()"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
                '<div class="media-body">' +
                '<small class="text-fader"></small>' +
                '<h6><a href="#" onclick="Reading()">All Campaign Name</a></h6>' +
                '<small class="text-fader">All Channel</small>' +
                '</div>' +
                '</div>');
            for (i = 0; i < json.length; i++) {
                resultStatus = '<div class="media media-single">' +
                    '<a href= "#" onclick="Reading(' + json[i].ID + ')" ><img src="../images/icon/' + json[i].Channel + '.png" height="32" alt="..."></a>' +
                    '<div class="media-body">' +
                    '<h6><a href="#" onclick="Reading(' + json[i].ID + ')">' + json[i].CampaignName + '</a></h6>' +
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
function loadCampaignTemplate() {
    var divListCampaignTemplate = $('#ListCampaignTemplate');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK68'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultStatus = "";

            divListCampaigns.append(
                '<div class="media media-single">' +
                '<a href="#" onclick="Reading()"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
                '<div class="media-body">' +
                '<small class="text-fader"></small>' +
                '<h6><a href="#" onclick="Reading()">All Campaign Name</a></h6>' +
                '<small class="text-fader">All Channel</small>' +
                '</div>' +
                '</div>');
            for (i = 0; i < json.length; i++) {
                resultStatus = '<div class="media media-single">' +
                    '<a href= "#" onclick="Reading(' + json[i].ID + ')" ><img src="../images/icon/' + json[i].Channel + '.png" height="32" alt="..."></a>' +
                    '<div class="media-body">' +
                    '<h6><a href="#" onclick="Reading(' + json[i].ID + ')">' + json[i].CampaignName + '</a></h6>' +
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
function Reading(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmCreateCampaign($("#ContentPlaceHolder1_TrxID").val())
}
function addCampaign() {
    window.location = "TrmCampaign.aspx";
}
function addContent() {
    window.location = "TrmCampaignContent.aspx";
}