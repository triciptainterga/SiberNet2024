////$(document).ready(function () {
////    TrmCampaignContent();
////});
////function TrmCampaignContent() {
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "TrmTemplateBlast";
////    var KondisiData = "";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    console.log("Table Campaign Content : " + jsonText)
////    var myTable = $('#TrmCampaignContent').DataTable();
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

////                myTable.row.add([json[i].ID, json[i].TemplateName, json[i].MsgBlastSubstring, json[i].UrlAttcach, json[i].UserCreate, newDate + ' ' + newTime, urlClick]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function showAdd() {
////    $('#TrxTemplateName').attr('disabled', false);
////    $('#TrxMessageBlast').attr('disabled', false);
////    $('#TrxUrlBlast').attr('disabled', false);
////    $('#TrxTemplateName').val("");
////    $('#TrxMessageBlast').val("");
////    $('#TrxUrlBlast').val("");
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
////    $('#TrxTemplateName').attr('disabled', false);
////    $('#TrxMessageBlast').attr('disabled', false);
////    $('#TrxUrlBlast').attr('disabled', false);
////    ReadingTemplateBlast($("#ContentPlaceHolder1_TrxID").val())
////}
////function showDelete(TrxID) {
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "none");
////    $("#Update").css("display", "none");
////    $("#Delete").css("display", "block");
////    $("#ContentPlaceHolder1_TrxID").val(TrxID);
////    $('#TrxTemplateName').attr('disabled', true);
////    $('#TrxMessageBlast').attr('disabled', true);
////    $('#TrxUrlBlast').attr('disabled', true);
////    ReadingTemplateBlast($("#ContentPlaceHolder1_TrxID").val())
////}
////function ActionSimpan() {
////    if ($("#TrxTemplateName").val() == '') {
////        alert("Template Name is empty");
////        return false
////    }
////    if ($("#TrxMessageBlast").val() == '') {
////        alert("Message Blast is empty");
////        return false
////    }
////    if ($("#TrxUrlBlast").val() == '') {
////        alert("Url Blast is empty");
////        return false
////    }
////    var form_data = JSON.stringify({
////        TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxTemplateName: $("#TrxTemplateName").val(), TrxMessageBlast: encodeData($("#TrxMessageBlast").val()), TrxUrlBlast: encodeData($("#TrxUrlBlast").val())});
////    console.log("Action Simpan Campaign Content : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCampaignContent",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#TrxTemplateName").val() + '</b> has been save'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TrxTemplateName").val("");
////                $("#TrxMessageBlast").val("");
////                $("#TrxUrlBlast").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCampaignContent();
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
////        TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxTemplateName: $("#TrxTemplateName").val(), TrxMessageBlast: encodeData($("#TrxMessageBlast").val()), TrxUrlBlast: encodeData($("#TrxUrlBlast").val())});
////    console.log("Action Update Campaign Content : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCampaignContent",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#TrxTemplateName").val() + '</b> has been update'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TrxTemplateName").val("");
////                $("#TrxMessageBlast").val("");
////                $("#TrxUrlBlast").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCampaignContent();
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
////function ActionDelete() {
////    var form_data = JSON.stringify({TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val()});
////    console.log("Action Delete Campaign Content : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/DeleteTransactionTrmCampaignContent",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#TrxTemplateName").val() + '</b> has been delete'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TrxTemplateName").val("");
////                $("#TrxMessageBlast").val("");
////                $("#TrxUrlBlast").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCampaignContent();
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
////function ReadingTemplateBlast(TrxID) {
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "templateBlast";
////    var KondisiData = "where ID='" + TrxID + "'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, result = "";
////            for (i = 0; i < json.length; i++) {
////                $("#TrxTemplateName").val(json[i].TemplateName);
////                $("#TrxMessageBlast").val(json[i].MsgBlast);
////                $("#TrxUrlBlast").val(json[i].UrlAttcach);
              
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
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
////function encodeData(s) {
////    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
////}