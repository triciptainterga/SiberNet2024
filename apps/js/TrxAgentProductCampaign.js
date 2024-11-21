$(document).ready(function () {
    TrxAgent();
    CmbProductCampaign();
    CmbMaximalHandle();
    TrmAgentCampaign("0");
    //$("#TrxSearching").on("input", function () {
    //    var jumlahString = $(this).val().length;
    //    if (jumlahString >= 4) {
    //        SearchingProductCampaign($(this).val());
    //    } else if (jumlahString == 0) {
    //        SearchingProductCampaign($(this).val(""));
    //    }
    //});
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 4) {
            SearchingAgentCampaign($(this).val());
        } else if (jumlahString == 0) {
            SearchingAgentCampaign($(this).val(""));
        }
    });
    $('#Agent_Checkbox').click(function () {
        if ($(this).is(':checked')) {
            $("#ContentPlaceHolder1_HDAgent_Checkbox").val("1")
        } else {
            $("#ContentPlaceHolder1_HDAgent_Checkbox").val("0")
        }
    });
});
function AgentProductCampaign() {
    $("#modal-agent").modal('show')
}
function TrxAgent() {
    var myTable = $('#TrxAgent').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'2', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var TrxParam = "<input type = 'checkbox' class='checkbox' name='checkbox" + json[i].USERID + "' id = 'checkbox" + json[i].USERID + "' onclick=AgentCheck('" + json[i].USERID + "')>" +
                    "<label class='checkbox' for='checkbox" + json[i].USERID + "'></label>"
                var urlClick = "<a href='TrxOutboundCall.aspx?id=" + json[i].USERID + "&phonenumber=" + json[i].USERNAME + "' target='_blank' class='text-success' data-toggle='tooltip' data-original-title='Follow up'><i class='mdi mdi-phone-in-talk font-size-20' aria-hidden='true'></i></a>"
                myTable.row.add([TrxParam, json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].EMAIL_ADDRESS, urlClick]).draw(false);


            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function CmbProductCampaign(UploadID) {
    var CmbProductCampaign = $('#CmbProductCampaign');
    var CmbUpdateProductCampaign = $('#CmbUpdateProductCampaign');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK16'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                if (UploadID == "1") {
                    result = '<option value="' + json[i].ID + '">' + json[i].CampaignName + '</option>';
                } else {
                    result = '<option value="' + json[i].ID + '" selected=true>' + json[i].CampaignName + '</option>';
                }
                CmbProductCampaign.append(result);
                CmbUpdateProductCampaign.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbMaximalHandle() {
    var CmbMaximalHandle = $('#CmbMaxCampaign');
    var CmbUpdateMaxCampaign = $('#CmbUpdateMaxCampaign');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK25'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].max_handle + '">' + json[i].max_handle + '</option>';
                CmbMaximalHandle.append(result);
                CmbUpdateMaxCampaign.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmAgentCampaign(campaign_id) {
    if (campaign_id == "0") {
        var KondisiData = "0";
    } else {
        var KondisiData = campaign_id;
    }
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + KondisiData +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK26'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultUserNotification = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].GENDER == "Wanita") {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/7.jpg' alt='...'> "
                } else {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/2.jpg' alt='...'> "
                }
                if (json.length > 2) {
                    var columns = "2"
                } else {
                    var columns = "6"
                }
                resultUserNotification = '<div class="col-md-12 col-lg-' + columns +'">' +
                    '<div class="box box-default">' +
                    '<div class="fx-card-item">' +
                    '<div class="fx-card-avatar fx-overlay-1">' +
                    '' + JenisKelamin + '' +
                    '<div class="fx-overlay">' +
                    '<ul class="fx-info">' +
                    '<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="ButtonUpdate(' + json[i].id + ');"><i class="fa fa-pencil"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ButtonDelete(' + json[i].id + ');"><i class="fa fa-trash-o"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ButtonNowhandle(' + json[i].id + ');"><i class="fa fa-refresh"></i></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="fx-card-content">' +
                    '<h4 class="box-title">' + json[i].NAME + '</h4></br>' +
                    '<small>' + json[i].product_campaign + '</small><br>' +
                    '<span class="badge badge-pill badge-primary badge-lg"><small>Max Handle ' + json[i].maxhandle + ' - Now Handle ' + json[i].nowhandle + '</small></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SearchingAgentCampaign(AgentName) {
    if (AgentName == '') {
        var jsonText = "11";
    } else {
        var jsonText = AgentName
    }
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + jsonText + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK26'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultUserNotification = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].GENDER == "Wanita") {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/7.jpg' alt='...'> "
                } else {
                    var JenisKelamin = "<img src ='../images/avatar/375x200/2.jpg' alt='...'> "
                }
                if (json.length > 2) {
                    var columns = "2"
                } else {
                    var columns = "6"
                }
                resultUserNotification = '<div class="col-md-12 col-lg-' + columns +'">' +
                    '<div class="box box-default">' +
                    '<div class="fx-card-item">' +
                    '<div class="fx-card-avatar fx-overlay-1">' +
                    '' + JenisKelamin + '' +
                    '<div class="fx-overlay">' +
                    '<ul class="fx-info">' +
                    /*//*/'<li><a class="btn default btn-outline" href="#" onclick="ButtonDelete(' + json[i].id + ');"><i class="fa fa-trash-o"></i></a></li>' +
                    '<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="ButtonUpdate(' + json[i].id + ');"><i class="fa fa-pencil"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ButtonDelete(' + json[i].id + ');"><i class="fa fa-trash-o"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="ButtonNowhandle(' + json[i].id + ');"><i class="fa fa-refresh"></i></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="fx-card-content">' +
                    '<h4 class="box-title">' + json[i].NAME + '</h4></br>' +
                    '<small>' + json[i].product_campaign + '</small><br>' +
                    '<span class="badge badge-pill badge-primary badge-lg"><small>Max Handle ' + json[i].maxhandle + ' - Now Handle ' + json[i].nowhandle + '</small></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ButtonDelete(rec_id) {
    event.preventDefault();
    var form = document.forms["myForm"];
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: rec_id, TrxUserName: $("#hd_sessionLogin").val()});
                $.ajax({
                    url: "asmx/TrxAgentProductCampaign.asmx/DeleteAgentProductCampaign",
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
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrxAgentProductCampaign.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrxAgentProductCampaign.aspx"
                                });
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
function detailCampaign(campaign_id) {
    TrmAgentCampaign(campaign_id);
}
function ButtonUpdate(rec_id) {
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    SelectDetailProduct();
    $("#modalright").modal('show');
}
function SelectDetailProduct() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK27'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#CmbUpdateProductCampaign').val(json[i].product_id);
                $('#CmbUpdateProductCampaign').attr("disabled", true);
                $('#CmbUpdateMaxCampaign').val(json[i].maxhandle);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionUpdate() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Agent is empty")
        return false;
    }
    if ($("#CmbUpdateProductCampaign").val() == "Select" || $("#CmbUpdateProductCampaign").val() == "") {
        swal("Product campaign is empty")
        return false;
    }
    if ($("#CmbUpdateMaxCampaign").val() == "" || $("#CmbUpdateMaxCampaign").val() == "Select") {
        swal("Maximal distribution data is empty")
        return false;
    }
    var TrxFlag = $("#ContentPlaceHolder1_HDAgent_Checkbox").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxCampaign: $("#CmbUpdateProductCampaign").val(),
                    TrxData: $("#CmbUpdateMaxCampaign").val(), TrxFlag: TrxFlag
                });
                console.log("Action update " + form_data)
                $.ajax({
                    url: "asmx/TrxAgentProductCampaign.asmx/UpdateAgentDistributionData",
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
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#CmbUpdateProductCampaign").val("");
                                    $("#CmbUpdateMaxCampaign").val("")
                                    $("#ContentPlaceHolder1_HDAgent_Checkbox").val("")
                                    $("#modalright").modal('hide');
                                    window.location.href = "TrxAgentProductCampaign.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#CmbUpdateProductCampaign").val("");
                                    $("#CmbUpdateMaxCampaign").val("")
                                    $("#ContentPlaceHolder1_HDAgent_Checkbox").val("")
                                    $("#modalright").modal('hide');
                                    window.location.href = "TrxAgentProductCampaign.aspx";
                                });
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
function AgentCheck(TrxAgentID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxAgentID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK28'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length == 0) {

            } else {
                for (i = 0; i < json.length; i++) {
                    swal(json[i].agent_name + " already exits in " + json[i].product_campaign)
                    TrxAgent()
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //var KondisiData = "Where Channelid='11' and agent_id='" + TrxAgentID + "' and Product_id='" + $("#CmbProductCampaign").val() +"'";
    //var JenisKondisi = "AllWhereData";
    //var NamaView = "UIDESK_TrxAgentProductCampaign";
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    //console.log("AgentCheck " + jsonText)
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, result = "";

    //        console.log("Jumlah XX" + json.length);
    //        if (json.length == 0) {

    //        } else {
    //            for (i = 0; i < json.length; i++) {
    //                swal(json[i].agent_name + " already exits in " + json[i].product_campaign)
    //                TrxAgent()
    //            }
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function ButtonNowhandle(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrxAgentProductCampaign.asmx/ReleaseNowhandle",
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
                                    'Release Now Handle Success',
                                    'success'
                                ).then(function () {
                                    window.location = "TrxAgentProductCampaign.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Release Now Handle Failed',
                                    'error'
                                ).then(function () {
                                    window.location = "TrxAgentProductCampaign.aspx";
                                });
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
$(function () {
    //Assign Click event to Button.
    $("#btnSimpan").click(function () {
        //var message = "Id Name                  Country\n";
        var message = ""
        //Loop through all checked CheckBoxes in GridView.
        $("#TrxAgent input[type=checkbox]:checked").each(function () {
            var row = $(this).closest("tr")[0];
            message += row.cells[1].innerHTML + ",";
            //message += "   " + row.cells[2].innerHTML;
            //message += "   " + row.cells[3].innerHTML;
            //message += "\n";
        });
        //Display selected Row data in Alert Box.
        //alert(message);
        //return false;
        $("#ContentPlaceHolder1_TrxAgentId").val(message)
       
        if ($("#CmbProductCampaign").val() == "Select" || $("#CmbProductCampaign").val() == "") {
            swal("Product campaign is empty")
            return false;
        }
        if ($("#CmbMaxCampaign").val() == "Select" || $("#CmbMaxCampaign").val() == "") {
            swal("Maximal campaign is empty")
            return false;
        }
        if ($("#ContentPlaceHolder1_TrxAgentId").val() == "") {
            swal("Agent is empty")
            return false;
        }
        event.preventDefault();
        var form = document.forms["myForm"];
        swal({
            title: "Do you want to process?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxData: encodeData($("#ContentPlaceHolder1_TrxAgentId").val()), TrxCampaign: $("#CmbProductCampaign").val(), MaxCampaign: $("#CmbMaxCampaign").val() });
                $.ajax({
                    url: "asmx/TrxAgentProductCampaign.asmx/InsertAgentProductCampaign",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        swal("Done", {
                            icon: "success",
                        });
                        window.location.href = "TrxAgentProductCampaign.aspx"

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
      
    });
});
