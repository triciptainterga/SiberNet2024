////$(document).ready(function () {
////    $("#removeUpload").hide();
////    $("#LoaderPage").hide();
////    $("#PostingStatus").hide();
////    $("#Update").hide();
////    if (getParameterByName('type') == "Whatsapp") {
////        $("#PostingStatus").hide();
////        $("#Update").show();
////    } else {
////        $("#PostingStatus").show();
////        $("#Update").hide();
////    }
    

////    loadDataTemplateBlast();
////    loadCampaignHeader();
////    TrmCreateCampaignData();
////    loadCampaignChannel();
////});
////var countPage = 0;
//////getParameterByName('id')
////function getParameterByName(name, url = window.location.href) {
////    name = name.replace(/[\[\]]/g, '\\$&');
////    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
////        results = regex.exec(url);
////    if (!results) return null;
////    if (!results[2]) return '';
////    return decodeURIComponent(results[2].replace(/\+/g, ' '));
////}
//////IG Monitoring
////$('#files').change(function () {
////    var filename = $('#files').val();
////    if (filename.substring(3, 11) == 'fakepath') {
////        filename = filename.substring(12);
////    } // For Remove fakepath
////    $("label[for='file_name'] b").html(filename);
////    $("label[for='file_default']").text('Selected File: ');
////    if (filename == "") {
////        $("label[for='file_default']").text('No File Choosen');
////    }
////});
////$(document).on("change", "input[name='files']", function (e) {
////    $(".hiddenX").show();
////    //var valnoWA = "628119970460";//$('#tglKejadian').val();

////    if ($("#cmb_CampaignHeader").val() ==""){
////        alert("Please Select Campaign Group")
////        return false
////    }
////    if ($("#cmb_TemplateBlast").val() ==""){
////        alert("Please Select Campaign Content")
////        return false
////    }
////    var files = $(this).prop("files");
////    var data = new FormData();

////    var request;
////    var result;
////    var modal = $(this).closest(".modal");
////    var itemid = modal.data("itemid");

////    for (var i = 0; i < files.length; i++) {

////        data.append("id", "617367367613876138");
////        data.append("file", files[i]);
////        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
////        data.append("TypeChannel", getParameterByName('type'));
////        data.append("idHeader", $("#cmb_CampaignHeader").val());
////        data.append("idTable", $("#cmb_TemplateBlast").val());

////        request = $.ajax({

////            type: "POST",
////            enctype: 'multipart/form-data',
////            url: "asmx/3_CreateCampaign_Grid.asmx/UploadFile",
////            data: data,
////            // dataType: "json",
////            contentType: false,
////            processData: false,

////        });
////        request.done(function (response) {
////            $(".hiddenX").hide();
////            $("#removeUpload").show();
////            // result = response.d;
////            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
////            console.log("Success");
////            console.log($(response).find("Guid").text());
////            console.log($(response).find("FileExt").text());
////            //alert(result.NameNya);
////            window.location = "TrmCreateCampaignData.aspx?type=" + getParameterByName("type") + "";

////        });

////        request.fail(function (response) {

////            console.log(response.responseText);
////            //alert(response.responseText);

////        });

////        request.always(function () {

////            data.delete(itemid);
////            data.delete(files[i]);

////        });

////    }
////});

////function getval(sel) {
////    GetContentSocialPost(sel.value);
////}

////function GetContentSocialPost(id) {
////    var JenisKondisi = "AllWhereData";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "templateBlast", paramQuery: "where ID='"+ id +"'" });
////    let templateBlast = 0;
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultStatus = "";
////            for (i = 0; i < json.length; i++) {
               
////                templateBlast = json[i].MsgBlast;
                
////            }
////            $("#TxtMsgNya").val(templateBlast);
////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////    //alert(templateBlast);
////    //return templateBlast;
////}
////function Blast_PostData() {
////    console.log("hai submit..." + $("#cmb_TemplateBlast").val());
////    GetContentSocialPost($("#cmb_TemplateBlast").val());
    
////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets post your campaign ?");
////    if (agree) {
////        console.log("Success post..." + $("#cmb_TemplateBlast").val());
////        var jsonText = JSON.stringify({ msgNya: $("#TxtMsgNya").val() });
////        console.log($("#TxtMsgNya").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/apipostfb.php",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();
                
////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                alert(xhr.status);
////                alert(xhr.responseText);
////                alert(thrownError);
////            }
////        });
////        return false;
////    } else {
////        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
////}
////function Blast_SaveData() {
////    console.log("hai submit..." + $("#cmb_TemplateBlast").val());
    
////    //if ($('#cmb_TemplateBlast').val() == '') {
////    //    alert('Template Blast can not be left blank');
////    //    exit;
////    //} else if ($('#cmb_CampaignHeader').val() == '') {
////    //    alert('Campaign Group can not be left blank');
////    //    exit;
////    //}
////    $("#LoaderPage").show();
////    var agree = confirm("Are you sure you wish to continue?");
////    if (agree) {
////        //return true;
////        console.log("hai true..." + $("#cmb_TemplateBlast").val());
////        var jsonText = JSON.stringify({ Keterangan: 'Generate', type: getParameterByName('type'), TrxUserName: $("#ContentPlaceHolder1_TrxUserName").val()});
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "asmx/3_CreateCampaign_Grid.asmx/UpdateDataBlast",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();
////                window.location = "TrmCreateCampaignData.aspx?type=" + getParameterByName('type') + "";
////                console.log("Success Generate Phone Blast...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                alert(xhr.status);
////                alert(xhr.responseText);
////                alert(thrownError);
////            }
////        });
////    } else {
////        console.log("hai false..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
    
////};

/////*function Blast_UpdateData() {
////    console.log("hai update...");
////    $("#LoaderPage").show();
////    var jsonText = JSON.stringify({ Keterangan: 'Updateblast', idTable: '0' });
////    //var valnoWA = "628119970460";//$('#tglKejadian').val();
////    var agree = confirm("Are you sure you wish to continue?");
////    if (agree) {
////        //return true;
////        console.log("hai update true...");
////        $.ajax({
////            type: "POST",
////            url: "asmx/3_CreateCampaign_Grid.asmx/UpdateDataBlast",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();
////                //window.location = "3_Channel_WA_Blast.aspx";
////                console.log("Success update data Phone Blast...");
////                window.open('http://103.234.210.228:8001/send/blast', '_blank');
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                alert(xhr.status);
////                alert(xhr.responseText);
////                alert(thrownError);
////            }
////        });
////    } else {
////        $("#LoaderPage").hide();
////        console.log("hai generate false...");
////       // return false;
////    }
////};*/

////function Blast_GenerateData() {
////    console.log("hai generate...");
////    $("#LoaderPage").show();
////    var jsonText = JSON.stringify({ Keterangan: 'Generate' });
////    //var valnoWA = "628119970460";//$('#tglKejadian').val();
////    var agree = confirm("Are you sure you wish to continue?");
////    if (agree) {
////        //return true;
////        console.log("hai generate true...");
////    $.ajax({
////        type: "POST",
////        url: "asmx/3_CreateCampaign_Grid.asmx/GenerateDataBlast",
////        contentType: "application/json; charset=utf-8",
////        data: jsonText,
////        dataType: "json",
////        success: function (response) {
////            var json = JSON.parse(response.d);
////            //alert(json.ResultNya);
////        }, complete: function () {
////            //back to normal!
////            $("#LoaderPage").hide();
////            window.location = "3_CreateCampaign_Grid.aspx?type=" + getParameterByName('type') +"";
////            console.log("Success Generate Phone Blast...");
////        },
////        error: function (xhr, ajaxOptions, thrownError) {
////            alert(xhr.status);
////            alert(xhr.responseText);
////            alert(thrownError);
////        }
////        });
////    } else {
////        console.log("hai generate false...");
////        return false;
////    }
////};

////$("#removeUpload").click(function () {
////    $("#removeUpload").hide();
////    $(".hiddenX").show();
////    var jsonText = JSON.stringify({ fileName: $("#txtFileName").val() });
////    //var valnoWA = "628119970460";//$('#tglKejadian').val();
////    $.ajax({
////        type: "POST",
////        url: "asmx/3_CreateCampaign_Grid.asmx/GenerateDataBlast",
////        contentType: "application/json; charset=utf-8",
////        data: jsonText,
////        dataType: "json",
////        success: function (response) {
////            var json = JSON.parse(response.d);
////            //alert(json.ResultNya);
////        }, complete: function () {
////            //back to normal!
////            $(".hiddenX").hide();
////            $("label[for='file_default']").text('No File Choosen');
////            $("label[for='file_name'] b").html('');
////        },
////        error: function (xhr, ajaxOptions, thrownError) {
////            alert(xhr.status);
////            alert(xhr.responseText);
////            alert(thrownError);
////        }
////    });

////});

////function loadDataTemplateBlast() {
////    var JenisKondisi = "AllWhereData";
////    var cmbDataBlast = $('#cmb_TemplateBlast');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "templateBlast", paramQuery: "where StatusMsg='YES'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultStatus = "";
////            for (i = 0; i < json.length; i++) {
////                //alert();
////                //alert();
////                //alert(json[i].UserCreate);
////                resultStatus = '<option value="' + json[i].ID + '">' + json[i].TemplateName + '</option>';

////                cmbDataBlast.append(resultStatus);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

////function loadCampaignHeader() {
////    var JenisKondisi = "AllWhereData";
////    var cmbCampaignHeader = $('#cmb_CampaignHeader');
////    var cmbCampaign = $('#cmbCampaign');
////    var jsonText;
////    if (getParameterByName('type') == "call") {
////        jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "campaigns_header", paramQuery: "where StatusActive='YES' and (Channel='Call' or Channel='Outbound' or Channel='Inbound')" });
////    } else if (getParameterByName('type') == "Email") {
////        jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "campaigns_header", paramQuery: "where StatusActive='YES' and (Channel='Email')" });
////    } else if (getParameterByName('type') == "Whatsapp") {
////        jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "campaigns_header", paramQuery: "where StatusActive='YES' and (Channel='Whatsapp')" });
////    } else if (getParameterByName('type') == "Sms") {
////        jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "campaigns_header", paramQuery: "where StatusActive='YES' and (Channel='SMS')" });
////    } else if (getParameterByName('type') == "Facebook") {
////        jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "campaigns_header", paramQuery: "where StatusActive='YES' and (Channel='Facebook')" });
////    }
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultStatus = "";
////            for (i = 0; i < json.length; i++) {
////                //alert();
////                //alert();
////                //alert(json[i].UserCreate);
////                resultStatus = '<option value="' + json[i].ID + '">' + json[i].Channel + '-' + json[i].CampaignName + '</option>';

////                cmbCampaignHeader.append(resultStatus);
////                cmbCampaign.append(resultStatus);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function TrmCreateCampaignData() {
////    var JenisKondisi = "AllWhereData";
////    var NamaTable = "campaigns_data";
////    var KondisiData = "Where StatusBlast='New' And UserCreate='"+ $("#ContentPlaceHolder1_TrxUserName").val() +"'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });

////    var myTable = $('#TrmCreateCampaignData').DataTable();
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

////                //var d = new Date(json[i].DateCreate);
////                //var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                //var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                //var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                var urlClick = "<div class='dropdown'>" +
////                                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
////                                    "<div class='dropdown-menu dropdown-menu-right'>" +
////                                    "<a class='dropdown-item' href='#' onclick=showAdd()><i class='fa fa-plus'></i> New</a>" +
////                                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
////                                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
////                                    "</div>" +
////                                "</div>"

////                myTable.row.add([json[i].ID, json[i].NoWA, json[i].GroupBlast, json[i].TypeChannel, json[i].StatusBlast, urlClick]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

////function showBack(){
////    window.location = "TrmCreateCampaign.aspx";
////}
////function loadCampaignChannel() {
////    var JenisKondisi = "AllWhereData";
////    var cmbCampaignChannel = $('#cmbCampaignChannel');
////    jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mSourceType", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultStatus = "";
////            for (i = 0; i < json.length; i++) {
////                resultStatus = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
////                cmbCampaignChannel.append(resultStatus);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function loadCampaignList() {
////    var JenisKondisi = "AllWhereData";
////    var divListCampaigns = $('#ListCampaigns');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "campaigns_header", paramQuery: "where StatusActive='YES'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultStatus = "";
////            for (i = 0; i < json.length; i++) {
////                //alert();
////                //alert();
////                //alert(json[i].UserCreate);
////                //resultStatus = '<option value="' + json[i].ID + '">' + json[i].TemplateName + '</option>';
////                resultStatus = '<div class="media media-single">' +
////                                    '<a href= "3_Telesales.aspx?id=' + json[i].ID + '" ><img src="../images/icon/' + json[i].Channel + '.png" height="32" alt="..."></a>' +
////                                    '<div class="media-body">' +
////                                        '<h6><a href="3_Telesales.aspx?id=' + json[i].ID + '">' + json[i].CampaignName + '</a></h6>' +
////                                        '<small class="text-fader">' + json[i].Channel + '</small>' +
////                                    '</div>' +
////						       '</div>'
////                divListCampaigns.append(resultStatus);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function showAdd(){
////    $("#TrxChannelAccount").val("");
////    $("#cmbCampaign").val("");
////    $("#cmbCampaignChannel").val("");
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "block");
////    $("#UpdateCampaign").css("display", "none");
////    $("#Delete").css("display", "none");
////    $('#TrxChannelAccount').attr("disabled", false);
////    $('#cmbCampaign').attr("disabled", false);
////    $('#cmbCampaignChannel').attr("disabled", false);
////}
////function showUpdate(TrxID){
////    //alert(TrxID)
////    $("#ContentPlaceHolder1_TrxID").val(TrxID);
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "none");
////    $("#UpdateCampaign").css("display", "block");
////    $("#Delete").css("display", "none");
////    $("#TrxChannelAccount").val("");
////    $("#cmbCampaign").val("");
////    $("#cmbCampaignChannel").val("");
////    $('#TrxChannelAccount').attr("disabled", false);
////    $('#cmbCampaign').attr("disabled", false);
////    $('#cmbCampaignChannel').attr("disabled", false);
////    ReadingCampaignData(TrxID);
////}
////function showdDelete(TrxID){
////    $("#TrxChannelAccount").val("");
////    $("#cmbCampaign").val("");
////    $("#cmbCampaignChannel").val("");
////    $("#ModalChannel").modal('show');
////    $("#Simpan").css("display", "none");
////    $("#UpdateCampaign").css("display", "none");
////    $("#Delete").css("display", "block");
////    $('#TrxChannelAccount').attr("disabled", true);
////    $('#cmbCampaign').attr("disabled", true);
////    $('#cmbCampaignChannel').attr("disabled", true);
////    ReadingCampaignData(TrxID);
////}
////function ActionSimpan() {
////    var TrxChannelAccount = $("#TrxChannelAccount").val();
////    var TrxCampaignName = $("#cmbCampaign").val();
////    var TrxCampaignChannel = $("#cmbCampaignChannel").val();
////    if (TrxChannelAccount == '') {
////        alert("Channel Account is empty")
////        return false;
////    }
////    if (TrxCampaignName == '') {
////        alert("Campaign Name is empty")
////        return false;
////    }
////    if (TrxCampaignChannel == '') {
////        alert("Campaign Channel is empty")
////        return false;
////    }
////    var form_data = JSON.stringify({ TrxID:"0", TrxUserName: $("#hd_sessionLogin").val(), TrxChannelAccount: TrxChannelAccount, TrxCampaignName: TrxCampaignName, TrxCampaignChannel: TrxCampaignChannel });
////    //console.log("aa : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "asmx/3_CreateCampaign_Grid.asmx/InsertTransactionTrmCampaignData",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#TrxChannelAccount").val() + '</b> has been save'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TrxChannelAccount").val("");
////                $("#cmbCampaign").val("");
////                $("#cmbCampaignChannel").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCreateCampaignData();
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
////    var TrxChannelAccount = $("#TrxChannelAccount").val();
////    var TrxCampaignName = $("#cmbCampaign").val();
////    var TrxCampaignChannel = $("#cmbCampaignChannel").val();
////    $("#cmbCampaign").find("option:selected").text();
////    $("#cmbCampaignChannel").find("option:selected").text();
////    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxChannelAccount: TrxChannelAccount, TrxCampaignName: TrxCampaignName, TrxCampaignChannel: TrxCampaignChannel });
////    //console.log("aa : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "asmx/3_CreateCampaign_Grid.asmx/UpdateTransactionTrmCampaignData",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#TrxChannelAccount").val() + '</b> has been update'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TrxChannelAccount").val("");
////                $("#cmbCampaign").val("");
////                $("#cmbCampaignChannel").val("");
////                $("#ModalChannel").modal('hide');
////                TrmCreateCampaignData();
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
////    var TrxChannelAccount = $("#TrxChannelAccount").val();
////    var TrxCampaignName = $("#cmbCampaign").val();
////    var TrxCampaignChannel = $("#cmbCampaignChannel").val();
////    $("#cmbCampaign").find("option:selected").text();
////    $("#cmbCampaignChannel").find("option:selected").text();
////    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val()});
////    //console.log("aa : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "asmx/3_CreateCampaign_Grid.asmx/DeleteTransactionTrmCampaignData",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#TrxChannelAccount").val() + '</b> has been update'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#ModalChannel").modal('hide');
////                TrmCreateCampaignData();
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
////function ReadingCampaignData(TrxID){
////    $("#ContentPlaceHolder1_TrxID").val(TrxID);
////    var JenisKondisi = "AllWhereData";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "Campaigns_data", paramQuery: "where ID='"+ $("#ContentPlaceHolder1_TrxID").val() +"'" });
////    console.log("ReadingCampaignData " + jsonText)
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
              
////                //alert(json[i].Channel)
////                $("#TrxChannelAccount").val(json[i].NoWA);
////                //$("#cmbCampaign").val(json[i].IDGroupBlast);
////                $("#cmbCampaign").find("option:selected").val();
////                $("#cmbCampaign").val(json[i].IDGroupBlast);
////                $("#cmbCampaignChannel").find("option:selected").val();
////                $("#cmbCampaignChannel").val(json[i].Channel);
////                //alert(json[i].IDGroupBlast)
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
////    //return false
////}