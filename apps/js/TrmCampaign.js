////$(document).ready(function () {
////    TrmCreateCampaign();
////    loadChannel();
////});
////function TrmCreateCampaign() {
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "campaigns_header";
////    var KondisiData = "";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });

////    var myTable = $('#TrmCreateCampaign').DataTable();
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
////                                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
////                                    "</div>" +
////                                "</div>"

////                myTable.row.add([json[i].ID, json[i].CampaignName, json[i].CampaignDescription, json[i].Channel, json[i].StatusActive, json[i].UserCreate, newDate + ' ' + newTime, urlClick]).draw(false);
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
////    $('#TrxCampaignDescription').attr("disabled", false);
////    $("#TrxCampaignDescription").val("");
////    $('#TrxCampaignName').attr("disabled", false);
////    $("#TrxCampaignName").val("");
////    $('#cmbChannel').attr("disabled", false);
////    $("#cmbChannel").val();
////    $('#cmbStatus').attr("disabled", false);
////    $("#cmbStatus").val();
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "block");
////    $("#Update").css("display", "none");
////    $("#Delete").css("display", "none");
////}
////function showUpdate(TrxID) {
////    TrxCampaignSelect(TrxID)
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "none");
////    $("#Update").css("display", "block");
////    $("#Delete").css("display", "none");
////    $("#ContentPlaceHolder1_TrxID").val(TrxID);
////    $('#TrxCampaignDescription').attr("disabled", false);
////    $('#TrxCampaignName').attr("disabled", false);
////    $('#cmbChannel').attr("disabled", false);
////    $('#cmbStatus').attr("disabled", false);
////    $("#cmbStatus").find("option:selected").text();
////    $("#cmbStatus").val();
////}
////function showdDelete(TrxID) {
////    TrxCampaignSelect(TrxID)
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "none");
////    $("#Update").css("display", "none");
////    $("#Delete").css("display", "block");
////    $("#ContentPlaceHolder1_TrxID").val(TrxID);
////    $('#TrxCampaignDescription').attr("disabled", true);
////    $('#TrxCampaignName').attr("disabled", true);
////    $('#cmbChannel').attr("disabled", true);
////    $('#cmbStatus').attr("disabled", true);
////}
////function TrxCampaignSelect(TrxID) {
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "campaigns_header";
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

////                $("#TrxCampaignName").val(json[i].CampaignName);
////                $("#TrxCampaignDescription").val(json[i].CampaignDescription);
////                $("#cmbChannel").find("option:selected").text();
////                $("#cmbChannel").val(json[i].Channel);
////                $("#cmbStatus").find("option:selected").text();
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
////function loadChannel() {
////    var JenisKondisi = "AllWhereData";
////    var cmbChannel = $('#cmbChannel');
////    jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mSourceType", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultChannel = "";
////            for (i = 0; i < json.length; i++) {
////                resultChannel = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
////                cmbChannel.append(resultChannel);
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
////    //var TrxCampaignName = $("#TrxCampaignName").val();
////    //var cmbChannel = $("#cmbChannel").val();
////    //var cmbStatus = $("#cmbStatus").val();
////    //var TrxCampaignDescription = $("#TrxCampaignDescription").val();
    
////    if ($("#TrxCampaignName").val() == '') {
////        alert("Campaign Name is empty");
////        return false
////    }
////    if ($("#cmbChannel").val() == '') {
////        alert("Status is empty");
////        return false
////    }
////    if ($("#cmbStatus").val() == '') {
////        alert("Status is empty");
////        return false
////    }
////    if ($("#TrxCampaignDescription").val() == '') {
////        alert("Campaign Description is empty");
////        return false
////    }
////    var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxCampaignName: $("#TrxCampaignName").val(), TrxCampaignChannel: $("#cmbChannel").val(), TrxCampaignDescription: $("#TrxCampaignDescription").val(), TrxStatus: $("#cmbStatus").val() });
////    //console.log("aa : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCampaign",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data category <b>' + $("#TrxCampaignName").val() + '</b> has been save'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TrxCampaignName").val("");
////                $("#cmbChannel").val("");
////                $("#TrxCampaignDescription").val("");
////                $("#cmbStatus").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCreateCampaign();
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
////    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val() });
////    console.log("aa : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/DeleteTransactionTrmCampaign",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data category <b>' + $("#TrxCampaignName").val() + '</b> has been delete'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#ModalChannel").modal('hide');
////                TrmCreateCampaign();
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
////    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
////        alert("Please select your data");
////        return false
////    }
////    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxCampaignName: $("#TrxCampaignName").val(), TrxCampaignChannel: $("#cmbChannel").val(), TrxCampaignDescription: $("#TrxCampaignDescription").val(), TrxStatus: $("#cmbStatus").val() });
////    //console.log("aa : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCampaign",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data category <b>' + $("#TrxCampaignName").val() + '</b> has been save'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TrxCampaignName").val("");
////                $("#cmbChannel").val("");
////                $("#TrxCampaignDescription").val("");
////                $("#cmbStatus").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCreateCampaign();
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