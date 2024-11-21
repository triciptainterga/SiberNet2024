////$(document).ready(function () {
////    TrmCampaignScript();
////    functionDropdown();
////});
////function TrmCampaignScript() {
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "TrmCampaignScript";
////    var KondisiData = "";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    console.log("Table Campaign Script : " + jsonText)
////    var myTable = $('#TrmCampaignScript').DataTable();
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, result = "";

////            myTable.clear().draw();
////            for (i = 0; i < json.length; i++) {

////                var d = new Date(json[i].DateCreate);
////                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                var urlClick = "<div class='dropdown'>" +
////                                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
////                                    "<div class='dropdown-menu dropdown-menu-right'>" +
////                                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
////                                    "<a class='dropdown-item' href='#' onclick=showDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
////                                    "</div>" +
////                                "</div>"

////                myTable.row.add([json[i].ID, json[i].CampaignScript, json[i].CampaignScriptHeader, json[i].CampaignDesc, json[i].CampaignScriptFooter, json[i].Channel, json[i].StatusActive, json[i].UserCreate, newDate + ' ' + newTime, urlClick]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
//////* Function Dropdown *//
////function functionDropdown() {
////    var JenisKondisi = "AllWhereData";
////    var cmbChannel = $('#cmbChannel');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mSourceType", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultcmbChannel = "";
////            for (i = 0; i < json.length; i++) {

////                resultcmbChannel = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
////                cmbChannel.append(resultcmbChannel);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function ActionSimpan() {
////    if ($("#TxtCampaignScript").val() == '') {
////        alert("Campaign Script is empty");
////        return false
////    }
////    if ($("#TxtCampaignScriptHeader").val() == '') {
////        alert("Campaign Script Header is empty");
////        return false
////    }
////    if ($("#TxtCampaignScriptContent").val() == '') {
////        alert("Campaign Script Content is empty");
////        return false
////    }
////    if ($("#TxtCampaignScriptFooter").val() == '') {
////        alert("Campaign Script Footer is empty");
////        return false
////    }
////    if ($("#cmbChannel").val() == '') {
////        alert("Channel is empty");
////        return false
////    }
////    if ($("#cmbStatus").val() == '') {
////        alert("Status is empty");
////        return false
////    }
////    var form_data = JSON.stringify({
////        TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxCampaignScript: $("#TxtCampaignScript").val(), TrxCampaignScriptHeader: encodeData($("#TxtCampaignScriptHeader").val()),
////        TrxCampaignScriptContent: encodeData($("#TxtCampaignScriptContent").val()), TrxCampaignScriptFooter: encodeData($("#TxtCampaignScriptFooter").val()), TrxChannel: $("#cmbChannel").val(), TrxStatus: $("#cmbStatus").val()
////    });
////    console.log("Action Simpan Campaign Script : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCampaignScript",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#TxtCampaignScript").val() + '</b> has been save'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TxtCampaignScript").val("");
////                $("#TxtCampaignScriptHeader").val("");
////                $("#TxtCampaignScriptContent").val(""); 
////                $("#TxtCampaignScriptFooter").val("");
////                $("#cmbChannel").val("");
////                $("#cmbStatus").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCampaignScript();
////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            },
////            complete: function () {

////            }
////        });
////    } else
////        return false;
////}
////function ActionUpdate() {
////    var form_data = JSON.stringify({
////        TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxCampaignScript: $("#TxtCampaignScript").val(), TrxCampaignScriptHeader: encodeData($("#TxtCampaignScriptHeader").val()),
////        TrxCampaignScriptContent: encodeData($("#TxtCampaignScriptContent").val()), TrxCampaignScriptFooter: encodeData($("#TxtCampaignScriptFooter").val()), TrxChannel: $("#cmbChannel").val(), TrxStatus: $("#cmbStatus").val()
////    });
////    console.log("Action Update Campaign Script: " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCampaignScript",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#TxtCampaignScript").val() + '</b> has been update'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TxtCampaignScript").val("");
////                $("#TxtCampaignScriptHeader").val("");
////                $("#TxtCampaignScriptContent").val("");
////                $("#TxtCampaignScriptFooter").val("");
////                $("#cmbChannel").val("");
////                $("#cmbStatus").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCampaignScript();
////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            },
////            complete: function () {

////            }
////        });
////    } else
////        $("#ModalChannel").modal('hide');
////        return false;
////}
////function ActionDelete() {
////    var form_data = JSON.stringify({TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val()});
////    console.log("Action Delete Campaign Script : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/DeleteTransactionTrmCampaignScript",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#TxtCampaignScript").val() + '</b> has been update'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TxtCampaignScript").val("");
////                $("#TxtCampaignScriptHeader").val("");
////                $("#TxtCampaignScriptContent").val("");
////                $("#TxtCampaignScriptFooter").val("");
////                $("#cmbChannel").val("");
////                $("#cmbStatus").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCampaignScript();
////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            },
////            complete: function () {

////            }
////        });
////    } else
////        $("#ModalChannel").modal('hide');
////        return false;
////}
////function showAdd() {
////    //$('#TxtCategoryName').attr("disabled", false);
////    //$("#TxtCategoryName").val("");
////    $('#TxtCampaignScript').attr('disabled', false);
////    $('#TxtCampaignScriptHeader').attr('disabled', false);
////    $('#TxtCampaignScriptContent').attr('disabled', false);
////    $('#TxtCampaignScriptFooter').attr('disabled', false);
////    $('#cmbChannel').attr('disabled', false);
////    $('#cmbStatus').attr('disabled', false);
////    $('#TxtCampaignScript').val("");
////    $('#TxtCampaignScriptHeader').val("");
////    $('#TxtCampaignScriptContent').val("");
////    $('#TxtCampaignScriptFooter').val("");
////    $('#cmbChannel').val("");
////    $('#cmbStatus').val("");
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "block");
////    $("#Update").css("display", "none");
////    $("#Delete").css("display", "none");
////}
////function showUpdate(TrxID) {
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "none");
////    $("#Update").css("display", "block");
////    $("#Delete").css("display", "none");
////    $("#ContentPlaceHolder1_TrxID").val(TrxID);
////    $('#TxtCampaignScript').attr('disabled', false);
////    $('#TxtCampaignScriptHeader').attr('disabled', false);
////    $('#TxtCampaignScriptContent').attr('disabled', false);
////    $('#TxtCampaignScriptFooter').attr('disabled', false);
////    $('#cmbChannel').attr('disabled', false);
////    $('#cmbStatus').attr('disabled', false);
////    ReadingCampaignScript($("#ContentPlaceHolder1_TrxID").val())
////}
////function showDelete(TrxID) {
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "none");
////    $("#Update").css("display", "none");
////    $("#Delete").css("display", "block");
////    $("#ContentPlaceHolder1_TrxID").val(TrxID);
////    $('#TxtCampaignScript').attr('disabled', true);
////    $('#TxtCampaignScriptHeader').attr('disabled', true);
////    $('#TxtCampaignScriptContent').attr('disabled', true);
////    $('#TxtCampaignScriptFooter').attr('disabled', true);
////    $('#cmbChannel').attr('disabled', true);
////    $('#cmbStatus').attr('disabled', true);
////    ReadingCampaignScript($("#ContentPlaceHolder1_TrxID").val())
////}
////function ReadingCampaignScript(TrxID) {
////    var JenisKondisi = "AllWhereData";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "TrmCampaignScript", paramQuery: "where ID='" + TrxID + "'" });
////    console.log("Reading Campaign Script : " + jsonText)
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultSourceChannel = "";
////            for (i = 0; i < json.length; i++) {

////                $("#TxtCampaignScript").val(json[i].CampaignScript);
////                $("#TxtCampaignScriptHeader").val(json[i].CampaignScriptHeader);
////                $("#TxtCampaignScriptContent").val(json[i].CampaignDescription);
////                $("#TxtCampaignScriptFooter").val(json[i].CampaignScriptFooter);
////                $("#cmbChannel").val(json[i].Channel);
////                $("#cmbStatus").val(json[i].StatusActive);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function encodeData(s) {
////    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
////}
////function AutoValidasiSuccess(TrxCreatedby, Message) {
////    $.toast({
////        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
////        text: '' + Message + '',
////        position: 'top-right',
////        loaderBg: '#ff6849',
////        icon: 'success',
////        hideAfter: 3500,
////        stack: 6
////    });
////}
////function AutoValidasiWarning(TrxCreatedby, Message) {
////    $.toast({
////        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
////        text: '' + Message + '',
////        position: 'top-left',
////        loaderBg: '#ff6849',
////        icon: 'warning',
////        hideAfter: 3500,
////        stack: 6
////    });
////}