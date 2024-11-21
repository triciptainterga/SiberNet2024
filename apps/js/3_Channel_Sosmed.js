var idWA = "3";
var noWA = "08170154444";
var apiKeyWA = "qRbkioekrn2xVSUwQWWiBzet03ysIhhUZZD";
var urlDatakelola;
var companyToken;

$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    companyToken = $("#SM_CompanyToken").val();
    console.log("URL:" + urlDatakelola);
    /*tinymce.init({
      selector: "#ReasonWhy",
      plugins: "emoticons autoresize",
      toolbar: "emoticons",
      toolbar_location: "bottom",
      menubar: false,
      statusbar: false
    });
    tinymce.init({
      selector: "#txtReplyMessenger",
      plugins: "emoticons autoresize",
      toolbar: "emoticons",
      toolbar_location: "bottom",
      menubar: false,
      statusbar: false
    });*/
    $("#LoaderPage").hide();
    $("#LoaderPageChat").hide();
    $("#commentsDiv").hide();
    $("#messagesDiv").hide();
    $("#SaveCust").hide();
    $("#multichatIframe").hide();

    if (getParameterByName('flagto') == "msg") {
        $("#socialMediaFooter").hide();
        $("#messagesDiv").hide();
    } else {
        $("#socialMediaFooter").hide();
    }
    $("#SM_Webhook").val("https://cloud.uidesk.id/webhuk/WebService.asmx/Webhuk_rawdata_social")
    //getWS_DataInbox(getParameterByName('flagto'), getParameterByName('agentlogin'));
    getWS_DataInbox(getParameterByName('flagto'), $("#hd_sessionLogin").val());
    if (getParameterByName('flagto') == "FB") {
        $("#txtLabelChannel").val("Facebook");
    } else if (getParameterByName('flagto') == "IG") {
        $("#txtLabelChannel").val("Instagram");
    } else if (getParameterByName('flagto') == "TW") {
        $("#txtLabelChannel").val("Twitter");
    } else if (getParameterByName('flagto') == "wa") {
        $("#txtLabelChannel").val("Whatsapp");
    }

    showDivContent(getParameterByName('flagto'));

    $("#txtKeySearch").on("input", function () {
        // Print entered value in a div box
        var jumlahString = $(this).val().length;
        //console.log(jumlahString);
        if (jumlahString >= 4) {
            //getWS_MasterCustomer($(this).val());
            getWS_MasterCustomerSelected($(this).val())

        }
    });
    console.log("FlagTo " + getParameterByName('flagto'));
    console.log("AgentLogin " + $("#hd_sessionLogin").val());
});

//Restu Dev 10-10-2021
function cancelChannel() {
    console.log("Hide add channel");

    $('#txtAddChannel').css('visibility', 'hidden');
}
function nl2br(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
}
function addToChannel() {
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxCustomerID = $("#txtCustID").val();
    var TrxChannelVal = $("#txtChannelValue").val();
    var TrxChannelNya = $("#txtSourceChannel").val();
    //var TrxNumberid = $("#txtConvID").val(); //ConversationID / PostID 
    //UIDESK_Temp_InsertOtherChannel
    //$("#txtDescriptionThread").val();
    console.log("user : " + TrxUsername + "CustID : " + TrxCustomerID + "Val Channel : " + TrxChannelVal + "Channel : " + TrxChannelNya)

    var form_data = JSON.stringify({ strTrxUserName: TrxUsername, strTrxCustomerID: TrxCustomerID, strTrxChannelValue: TrxChannelVal, strTrxChannelType: TrxChannelNya });
    //console.log("aa : " + form_data)
    $.ajax({
        url: "asmx/3_Channel_Sosmed.asmx/insertDataChannel",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
        data: form_data,
        success: function (data) {
            var json = JSON.parse(data.d);

            console.log("Server Response : " + json[0].Result)
            if (json[0].Result == "Already Exits") {
                $.toast({
                    heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
                    text: 'Your data already exists',
                    position: 'top-right',
                    loaderBg: '#ff6849',
                    icon: 'warning',
                    hideAfter: 3500,
                    stack: 6
                });
            } else if (json[0].Result == "Failed") {
                $.toast({
                    heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
                    text: 'Your data already exists',
                    position: 'top-right',
                    loaderBg: '#ff6849',
                    icon: 'warning',
                    hideAfter: 3500,
                    stack: 6
                });
            } else {
                $.toast({
                    heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
                    text: 'Your data channel has been save',
                    position: 'top-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 3500,
                    stack: 6
                });
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
function addChannel(channelNya, value) {
    console.log(channelNya);
    $('#txtSourceChannel').val(channelNya);
    $('#labelForChannel').text("Add channel : " + channelNya);
    $('#txtAddChannel').css('visibility', 'visible');
    getWS_CustomerProfile(channelNya, value);
}
// * Pentest *
function getWS_ProfileSocialMedia(socialAccountID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
        data: "{TrxID:'" + socialAccountID + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK400'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "", jenisKelamin;

            if (json.length == 0) {

            } else {

                for (i = 0; i < json.length; i++) {
                    $('#SM_AccountName').val(" from @" + json[i].AccountName);
                    $('#SM_AccountURL').val(json[i].AccountURL);
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //var HasilNya = "";  
    //console.log("Selected Text: " + socialAccountID + " Value: " + socialAccountID);
    //var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_SOCIAL_ACCOUNT", paramQuery: "where (AccountID = '" + socialAccountID + "')" });
    //console.log("jsonText: " + jsonText);
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultSourceCustomer = "", jenisKelamin;
    //        console.log("Jumlah data Profile " + json.length);       
    //        if (json.length == 0) {
    //            console.log("data social media not found " + i);
    //        } else {				
    //            for (i = 0; i < json.length; i++) {
    //	console.log("Data Profile found" + json[i].AccountName);
    //	$('#SM_AccountName').val(" from @"+json[i].AccountName);
    //	$('#SM_AccountURL').val(json[i].AccountURL);
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
// * Pentest *
function getWS_MasterCustomerSelected(custSearch) {
    var selectedValue = custSearch;
    var HasilNya = "";
    var listCustomerMaster = $("#listCustomerMaster");
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK401'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceCustomer = "", jenisKelamin;

            listCustomerMaster.empty();
            if (json.length == 0) {
                console.log("data not found " + i);

            } else {
                for (i = 0; i < json.length; i++) {

                    HasilNya = '<div class="media align-items-center"> ' +
                        '<div class="custom-control custom-checkbox"> ' +
                        '<input type="checkbox" class="custom-control-input"> ' +
                        '</div> ' +
                        '<a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview"> ' +
                        '<img class="avatar" src="../images/avatar/1.jpg" alt="..."> ' +
                        '<div class="media-body text-truncate"> ' +
                        '<h6>' + json[i].CustomerName + '</h6> ' +
                        '<small> ' +
                        '<span>' + json[i].FlagChannel + '</span> ' +
                        '<span class="divider-dash">' + json[i].ValueChannel + '</span> ' +
                        '</small> ' +
                        '</div> ' +
                        '</a> ' +
                        '<div class="dropdown"> ' +
                        '<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a> ' +
                        '<div class="dropdown-menu dropdown-menu-right"> ' +
                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Phone\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-phone"></i> Phone</a> ' +
                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Whatsapp\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-commenting"></i> Whatsapp</a> ' +
                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Email\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-envelope"></i> Email</a> ' +
                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Facebook\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-facebook"></i> Facebook</a> ' +
                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Instagram\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-instagram"></i> Instagram</a> ' +
                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Twitter\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-twitter"></i> Twitter</a> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>';
                    listCustomerMaster.append(HasilNya);

                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //var selectedValue = custSearch;
    //var HasilNya = "";
    //var listCustomerMaster = $("#listCustomerMaster");
    //console.log("Selected Text: " + custSearch + " Value: " + custSearch);
    //var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "v_AllCustomerChannel", paramQuery: "where (CustomerName like '%" + selectedValue + "%' or ValueChannel like '%" + selectedValue + "%')" });
    //console.log("jsonText: " + jsonText);
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {

    //        var json = JSON.parse(data.d);
    //        var i, x, resultSourceCustomer = "", jenisKelamin;

    //        console.log("Jumlah XX" + json.length);
    //        listCustomerMaster.empty();
    //        if (json.length == 0) {
    //            console.log("data not found " + i);

    //        } else {
    //            for (i = 0; i < json.length; i++) {

    //                HasilNya = '<div class="media align-items-center"> ' +
    //                    '<div class="custom-control custom-checkbox"> ' +
    //                    '<input type="checkbox" class="custom-control-input"> ' +
    //                    '</div> ' +
    //                    '<a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview"> ' +
    //                    '<img class="avatar" src="../images/avatar/1.jpg" alt="..."> ' +
    //                    '<div class="media-body text-truncate"> ' +
    //                    '<h6>' + json[i].CustomerName + '</h6> ' +
    //                    '<small> ' +
    //                    '<span>' + json[i].FlagChannel + '</span> ' +
    //                    '<span class="divider-dash">' + json[i].ValueChannel + '</span> ' +
    //                    '</small> ' +
    //                    '</div> ' +
    //                    '</a> ' +
    //                    '<div class="dropdown"> ' +
    //                    '<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a> ' +
    //                    '<div class="dropdown-menu dropdown-menu-right"> ' +
    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Phone\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-phone"></i> Phone</a> ' +
    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Whatsapp\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-commenting"></i> Whatsapp</a> ' +
    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Email\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-envelope"></i> Email</a> ' +
    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Facebook\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-facebook"></i> Facebook</a> ' +
    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Instagram\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-instagram"></i> Instagram</a> ' +
    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Twitter\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-twitter"></i> Twitter</a> ' +
    //                    '</div> ' +
    //                    '</div> ' +
    //                    '</div>';
    //                listCustomerMaster.append(HasilNya);

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
function getWS_CustomerProfile(actionDo, value) {
    console.log("Go to Customer Profile Value: " + value);
    $("#LoaderPage").show();
    var jsonText;
    jsonText = JSON.stringify({ ValueChannel: value });
    $.ajax({
        type: "POST",
        url: "asmx/3_Channel_Sosmed.asmx/GetDataProfileCustSM",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListContentInboxCommentSocialMedia = "";
            $("#LoaderPage").hide();
            for (i = 0; i < json.length; i++) {
                //alert(json[i].UserCreate);
                var strResult = json[i].Result;
                var strCustomerID = json[i].CustomerID;
                var strProfileName = json[i].ProfileName;
                var strCompanyName = json[i].CompanyName;
                var strProfileAlamat = json[i].ProfileAlamat;
                var strProfileChannel = json[i].ProfileChannel;
                var strProfileValue = json[i].ProfileValue;
                $("#txtCustID").val(strCustomerID);
                if (strProfileChannel == "Email") {
                    $("#txtEmailSM").val(strProfileValue);
                }
            }
            if (actionDo == "Ticket") {
                if (json.length == "0") {
                    //$("#modal-sendtothread").modal('hide');
                    $.toast({
                        heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
                        text: 'You must add this channel to your customer channel!',
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'warning',
                        hideAfter: 3500,
                        stack: 6
                    });
                    alert("You must add this channel to your customer channel!");
                    console.log("Belum Sync")

                    location.reload();
                    return false;
                } else {
                    show_Thread('SM', value);
                    console.log("Gk kena")
                }
            }
            const myJSON = JSON.stringify(json);
            console.log(myJSON)
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
//End
// Rizal Dev 11 Juni 2021
function ActionInsertThread() {
    $("#SaveThread").hide();
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxCustomerID = $("#txtCustID").val();
    var TrxNumberid = $("#txtConvID").val(); //ConversationID / PostID 
    var TrxThreadID = $("#txtSourceSM").val(); //GenerateUniq
    var TrxChannel = $("#txtLabelChannel").val(); //Didgtal Channel
    var TrxAccount = $("#txtLabelProfileID").val();
    var TrxSubject = $("#txtStatusSM").val() + " _ " + TrxCustomerID;
    var TrxDescription = CKEDITOR.instances.txtDescriptionThread.getData();
    console.log("cusTomerid : " + TrxCustomerID)
    var form_data = JSON.stringify({ TrxUsername: TrxUsername, TrxCustomerID: TrxCustomerID, TrxNumberid: TrxNumberid, TrxThreadID: TrxThreadID, TrxChannel: TrxChannel, TrxAccount: TrxAccount, TrxSubject: TrxSubject, TrxDescription: TrxDescription });
    $.ajax({
        url: "WebServiceTransaction.asmx/InsertTransactionThread",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
        data: form_data,
        success: function () {
            console.log("Exec ActionInsertThread : " + form_data)
            $.toast({
                heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
                text: 'Your data call has been save',
                position: 'top-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
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
function showDivContent(flagto) {
    if (flagto == "msg") {
        //Model Chat Conversation
        // $("#messagesDiv").hide();
        //End"https://multichat-2.uidesk.id/facebook/pages?with-header=1&with-sidebar=0&with-footer=0&token=104|0McqDL2FPndh3Rkec1m3PIkEmEHBJzHWDOsTGSEF#"
        //getWS_GetDataListMessage(getParameterByName('flagto'), ge
        $("#commentsDiv").hide();
        $("#multichatIframe").show();
        console.log("Data Token Multichat : " + $("#SM_MultiChatToken").val());
        //document.getElementById('iframe_channel').src = ;
        //$('#iframe_channel').attr('src', "https://multichat.uidesk.id/chat?token=" + $("#SM_MultiChatToken").val());
        document.getElementById("iframe_channel").src = urlDatakelola + "chat/v3?with-header=0&with-sidebar=0&with-footer=0&token=" + $("#SM_MultiChatToken").val();
        //getWS_GetDataListMessage(getParameterByName('flagto'), getParameterByName('agentlogin'));
    } else if (flagto == "comment") {
        //Model Chat Conversation
        // $("#messagesDiv").hide();
        //Endhttps://multichat-2.uidesk.id/chat/view?token=96|oIpVLcLtMr2FwtCjcVjiQdJrW5sHV32JDe6wmtmq&with-header=1&with-sidebar=0&with-footer=0
        $("#commentsDiv").hide();
        $("#multichatIframe").show();
        console.log("Data Token Multichat : " + $("#SM_MultiChatToken").val());
        //document.getElementById('iframe_channel').src = ;
        //$('#iframe_channel').attr('src', "https://multichat.uidesk.id/chat?token=" + $("#SM_MultiChatToken").val());
        document.getElementById("iframe_channel").src = urlDatakelola +"facebook/v3/pages?with-header=0&with-sidebar=0&with-footer=0&screen=iframe";
        //document.getElementById("iframe_channel").src = tParameterByName('agentlogin'));
    } else if (flagto == "mp") {
        //Model Chat Conversation
        //$("#messagesDiv").hide();
        //End
        $("#commentsDiv").hide();
        $("#multichatIframe").show();
        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: "{TrxID:'1', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESKBOOSTR'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";

                console.log(json);
                console.log("Data Token Boostr : " + json);
                for (i = 0; i < json.length; i++) {
                    document.getElementById('iframe_channel').src = json[i].BoostrURL;

                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })

        //document.getElementById('iframe_channel').src = ;
        //$('#iframe_channel').attr('src', "https://multichat.uidesk.id/chat?token=" + $("#SM_MultiChatToken").val());
        //document.getElementById("iframe_channel").src = "https://multichat.uidesk.id/chat?token=" + $("#SM_MultiChatToken").val();
        //getWS_GetDataListMessage(getParameterByName('flagto'), getParameterByName('agentlogin'));
    } else if (flagto == "wa") {
        $("#messagesDiv").show();
        getWS_GetDataListMessage(getParameterByName('flagto'), $("#hd_sessionLogin").val());
    } else {
        //$("#commentsDiv").show();
		//Model Chat Conversation
        // $("#messagesDiv").hide();
        //End"https://multichat-2.uidesk.id/facebook/pages?with-header=1&with-sidebar=0&with-footer=0&token=104|0McqDL2FPndh3Rkec1m3PIkEmEHBJzHWDOsTGSEF#"
        //getWS_GetDataListMessage(getParameterByName('flagto'), ge
        $("#commentsDiv").hide();
        $("#multichatIframe").show();
        console.log("Data Token Multichat : " + $("#SM_MultiChatToken").val());
        //document.getElementById('iframe_channel').src = ;
        //$('#iframe_channel').attr('src', "https://multichat.uidesk.id/chat?token=" + $("#SM_MultiChatToken").val());
        document.getElementById("iframe_channel").src = urlDatakelola + "chat/v3?with-header=0&with-sidebar=0&with-footer=0&token=" + $("#SM_MultiChatToken").val();
        //getWS_GetDataListMessage(getParameterByName('flagto'), getParameterByName('agentlogin'));

    }
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// * Pentest *
function getWS_DataProfile(value) {
    var selectedValue = value;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK402'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceEnquiryReason = "";

            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

                $("#lblNama").text(json[i].Name);
                $("#lblJK").text(json[i].JenisKelamin);
                $("#lblEmail").text(json[i].Email);
                $("#lblPhone").text(json[i].HP);
                $("#lblAlamat").text(json[i].Alamat);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "mCustomer", paramQuery: "where CustomerID='" + selectedValue + "'" });
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultSourceEnquiryReason = "";

    //        for (i = 0; i < json.length; i++) {

    //            var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
    //            var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
    //            var getDateBirth = newDate.split('/');

    //            $("#lblNama").text(json[i].Name);
    //            $("#lblJK").text(json[i].JenisKelamin);
    //            $("#lblEmail").text(json[i].Email);
    //            $("#lblPhone").text(json[i].HP);
    //            $("#lblAlamat").text(json[i].Alamat);

    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
//Messenger Function
function getWS_GetDataListMessage(flagto, agentlogin) {
    console.log("Start Go to Data Messages User yes");
    //var HTMLresultListInboxSocialMedia = $('#HTMLcontent_listuser_inbox');
    //var jsonText = JSON.stringify({ FlagTo: flagto, postid: agentlogin });

    //$.ajax({
    //    type: "POST",
    //    url: "3_Channel_Sosmed.asmx/GetDataListMessage",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultListInboxSocialMedia = "";
    //        HTMLresultListInboxSocialMedia.empty();
    //        for (i = 0; i < json.length; i++) {

    //            //var milisegundos = parseInt(json[i].DateGetSosmed.replace("/Date(", "").replace(")/", ""));
    //            //var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
    //            //var getDateBirth = newDate.split('/');
    //            console.log(json[i]);
    //            var stringSenderID = json[i].ProfileID;
    //            var stringProfileName = json[i].ProfileName;
    //            var StringIcon = json[i].Messages;
    //            var StringPIC = json[i].FileURL;

    //            var lengthName = 11;
    //            var length = 20;

    //            var trimmedStringMessages = stringProfileName.length > length ?
    //                stringProfileName.substring(0, length - 3) + "..." :
    //                stringProfileName;



    //            var flagToNya = "";
    //            if (StringIcon == "FacebookMsg") {
    //                StringIcon = "messengerfb.png";
    //                flagToNya = "FB";
    //            } else if (StringIcon == "message_create") {
    //                StringIcon = "twicon.png";
    //                flagToNya = "TW";
    //            } else if (StringIcon == "Wa") {
    //                StringIcon = "waicon.png";
    //                flagToNya = "WA";
    //            }

    //            resultListInboxSocialMedia = '<div class="media py-10 px-0 align-items-center"> ' +
    //                '<a class="" onclick="getWS_ContentInboxMessage(\'' + flagToNya + '\',\'' + stringSenderID + '\')"> ' +
    //                '<img src="' + StringIcon + '"  alt="..." width="24px"> ' +
    //                '</a> ' +
    //                '<div class="media-body"> ' +
    //                '<p class="font-size-16"> ' +
    //                '<a class="hover-primary" onclick="getWS_ContentInboxMessage(\'' + flagToNya + '\',\'' + stringSenderID + '\')">' + trimmedStringMessages + '</a> ' +
    //                '</p> ' +
    //                '</div> ' +
    //                '<!--<div class="media-right"> ' +
    //                '<img src="' + StringIcon + '"  alt="..." width="24px">' +
    //                '</div>--> ' +
    //                '</div>'

    //            HTMLresultListInboxSocialMedia.append(resultListInboxSocialMedia);

    //            //End
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function getWS_MasterLeadsAPI(custName) {
    var jsonText = JSON.stringify({ keySearch: custName });
    console.log(jsonText);
    //var valnoWA = "628119970460";//$('#tglKejadian').val();
    $.ajax({
        type: "POST",
        url: "https://triciptaintegra.com/graphapi/apiicon/apiicon_leads.php",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {
            var json = response;
            //alert(json.ResultNya);
            console.log(json)
            console.log("Success POST...");
            var i, x, resultSourceCustomer = "", jenisKelamin;

            //cmbDataSourceEnquiryReason.append('<option value="">Select</option>');
            //console.log("Jumlah" + json.length);
            if (json.status == false) {
                console.log("data Leads not found ");
                $("#SaveLeads").show();
                $("#txtCustID").val("");
                $("#txtName").val("");
                $("#txtEmail").val("");
                $("#txtPhone").val(custName);
                $("#txtDescription").val("");
                $("#SaveCust").hide();
                getWS_MasterCustomerAPI(custName);
            } else {
                for (i = 0; i < json.length; i++) {
                    //alert();
                    //alert();
                    $("#txtCustID").val(json[i].id);
                    $("#txtName").val(json[i].name);
                    $("#txtEmail").val(json[i].email);
                    $("#txtPhone").val(json[i].phonenumber);
                    $("#txtDescription").val(json[i].description);
                    $("#SaveLeads").hide();
                    $("#SaveCust").show();
                    console.log("data Leads found " + i);
                }
            }
        }, complete: function () {
            //back to normal!


        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#LoaderPage").hide();
            console.log(xhr.status);
            alert(xhr.responseText);
            console.log(thrownError);
            //console.log(xhr.status);
        }
    });

    return false;

}
function getWS_MasterCustomerAPI(custName) {

    var jsonText = JSON.stringify({ keySearch: custName });
    console.log(jsonText);
    //var valnoWA = "628119970460";//$('#tglKejadian').val();
    $.ajax({
        type: "POST",
        url: "https://triciptaintegra.com/graphapi/apiicon/apiicon.php",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {
            var json = response;
            //alert(json.ResultNya);
            console.log(json)
            console.log("Success POST...");
            var i, x, resultSourceCustomer = "", jenisKelamin;

            //cmbDataSourceEnquiryReason.append('<option value="">Select</option>');
            //console.log("Jumlah" + json.length);
            if (json.status == false) {
                console.log("data customer not found ");
                $("#SaveLeads").show("");
                $("#txtCustID").val("");
                $("#txtName").val("");
                $("#txtEmail").val("");
                $("#txtPhone").val(custName);
                $("#txtDescription").val("");
                $("#SaveCust").hide();
            } else {
                for (i = 0; i < json.length; i++) {
                    //alert();
                    //alert();
                    console.log("data customer found " + i);
                    $("#txtCustID").val(json[i].id);
                    $("#txtName").val(json[i].company);
                    $("#txtEmail").val(json[i].email);
                    $("#txtPhone").val(json[i].phonenumber);
                    $("#txtDescription").val(json[i].description);
                    $("#SaveLeads").hide();
                    $("#SaveCust").show();
                }
            }
        }, complete: function () {
            //back to normal!


        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#LoaderPage").hide();
            console.log(xhr.status);
            alert(xhr.responseText);
            console.log(thrownError);
            //console.log(xhr.status);
        }
    });

    return false;

}
//End
function show_CustSync(id) {
    $("#txtPhone").val(id);
    $("#txtSourceChannel").val("WA");
    $("#txtLabelProfileID").val(id);
    getWS_MasterLeadsAPI(id);
    //$("#ContentPlaceHolder1_TrxTicketID").val(id);
    $("#modal-syncAccount").modal('show');

    console.log("WA Number : " + id);
}
function show_CustSyncSM(source, id) {
    $("#txtPhone").val(id);
    $("#txtSourceChannel").val(source);
    //getWS_MasterLeadsAPI(id);
    //$("#ContentPlaceHolder1_TrxTicketID").val(id);
    $("#modal-syncAccountSM").modal('show');

    console.log("WA Number : " + id);
}
function show_Thread(channel, id) {
    $("#txtPhone").val(id);
    console.log("Start Check Conversation Status");
    if (channel == "WA") {
        $("#txtSourceChannel").val("WA");
        $("#txtLabelProfileID").val(id);
        //getWS_MasterLeadsAPI(id);
        getWS_CustomerProfile("Phone", id);
    }
    var idContact = $("#txtConvID").val();
    var jsonText = JSON.stringify({ ChannelNya: channel, ConvID: idContact });
    /*if (channel == "SM") {
        $("#modal-sendtothread").modal('show');
    } else {*/
    $.ajax({
        type: "POST",
        url: "asmx/3_Channel_Sosmed.asmx/CheckConversationStatus",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListInboxSocialMedia = "";

            for (i = 0; i < json.length; i++) {
                //$("#ContentPlaceHolder1_TrxTicketID").val(id);

                if (json[i].Result == "True-SM") {
                    //if (json.length <= 0) {
                    swal("Thread sudah dibuat")
                    AutoValidasiWarning($("#hd_sessionLogin").val(), "Silahkan tambahan interaksi <b>dengan customer dari menu Ticket</b>...")
                    i = 100;
                    //}
                    // $("#modal-sendtothread").modal('show');
                } else {
                    $("#SaveThread").show();
                    $("#modal-sendtothread").modal('show');
                }
                //End
            }

            if (json.length <= 0) {
                if (channel == "SM") {
                    $("#modal-sendtothread").modal('show');
                } else {
                    swal("Percakapan masih berlangsung")
                    AutoValidasiWarning($("#hd_sessionLogin").val(), "Anda masih dalam <b>percakapan dengan customer</b>...")
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //}
    //End

    console.log("WA Number : " + id);
}
function getCheckboxScript(id) {
    var getTemplate = $("#script_" + id).text();
    console.log("get chekbox : " + id)
    $("#txtMessageAgent").empty();
    $("#txtMessageAgent").val(getTemplate);
}
function show_ScriptWA(id) {

    //$("#ContentPlaceHolder1_TrxTicketID").val(id);
    $("#modal-scriptwa").modal('show');

    console.log("WA Script : " + id);
}
function ActionLeadsToCust() {
    //Update name to DB WA
    console.log($("#txtPhone").val(), 'LEAD', $("#txtEmail").val(), $("#txtCustID").val())
    updateToDbWA($("#txtPhone").val(), 'LEAD', $("#txtEmail").val(), $("#txtCustID").val());
    $("#SaveCust").hide();
}
function ActionLeadsToCustSM() {
    //Update name to DB WA
    console.log($("#txtPhoneSM").val(), 'LEAD', $("#txtEmailSM").val(), $("#txtCustIDSM").val())
    var form_data = JSON.stringify({ sourcedo: $("#txtSourceChannel").val(), valuechannel: $("#txtProfileID").val(), namauser: $("#txtNameSM").val(), flagdata: 'FB', emaildata: $("#txtEmailSM").val(), leadsid: $("#txtProfileID").val() });
    console.log("form_data : " + form_data);
    event.preventDefault(); // // Function sweat alert
    var form = document.forms["myForm"]; // // Function sweat alert
    swal({
        title: "Do you want to process?",
        //text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "asmx/3_Channel_Sosmed.asmx/SyncDatabaseChannelCust",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        console.log("Function sync data CustCHannel : " + form_data)
                        console.log("Function sync result Cust ID : " + json[0].msgSystem)

                        //CHeck Customer Exist
                        getWS_CustomerProfile($("#txtSourceChannel").val(), $("#txtProfileID").val());
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

                swal("Sync data has been update", {
                    icon: "success",
                });
            } else {
                //swal("Your imaginary file is safe!");
                console.log("cancel sync");
                $("#modal-syncAccount").modal('hide');
            }
        });
    $("#SaveCust").hide();
}
function ActionPostToLeads() {
    if ($("#txtName").val() == "") {
        swal("Name is empty")
        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>Name</b> is empty")
        return false
    }
    if ($("#txtDescription").val() == "") {
        swal("Description is empty")
        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>Description</b> is empty")
        return false
    }
    if ($("#txtEmail").val() == "") {
        swal("Email is empty")
        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>Email</b> is empty")
        return false
    }

    event.preventDefault(); // // Function sweat alert
    var form = document.forms["myForm"]; // // Function sweat alert
    swal({
        title: "Do you want to process?",
        //text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ name: $("#txtName").val(), source: 11, status: 8, phonenumber: $("#txtPhone").val(), email: $("#txtEmail").val(), description: encodeData($("#txtDescription").val()) });
                console.log("form_data : " + form_data);
                $.ajax({
                    url: "https://triciptaintegra.com/graphapi/apiicon/post_leads.php",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function (results) {
                        console.log("Function PostToLeads : " + form_data)
                        console.log("Return : " + results.status)

                        var TrxMessage = 'Your data <b>Leads</b> has been save'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                        $("#modal-syncAccount").modal('hide');
                        //Get Back Leads ID
                        $("#SaveCust").show();
                        $("#SaveLeads").hide();
                        getWS_MasterLeadsAPI($("#txtPhone").val());

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                        $("#SaveCust").hide();
                        $("#SaveLeads").show();
                    },
                    complete: function () {

                    }
                });

                swal("save data has been success", {
                    icon: "success",
                });
            } else {
                //swal("Your imaginary file is safe!");
                $("#modal-syncAccount").modal('hide');
            }
        });
}
function updateToDbWA(id, dataNya, emailNya, leadsID) {
    var form_data = JSON.stringify({ waaccount: id, namauser: $("#txtName").val(), flagdata: dataNya, emaildata: emailNya, leadsid: leadsID });
    console.log("form_data : " + form_data);
    event.preventDefault(); // // Function sweat alert
    var form = document.forms["myForm"]; // // Function sweat alert
    swal({
        title: "Do you want to process?",
        //text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "asmx/3_Channel_Sosmed.asmx/UpdateDataDBWA",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log("Function update data WA Account : " + form_data)

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

                swal("Sync data has been update", {
                    icon: "success",
                });
            } else {
                //swal("Your imaginary file is safe!");
                console.log("cancel sync");
                $("#modal-syncAccount").modal('hide');
            }
        });
}
function goToBottom() {
    var height;
    $('#chat_box .direct-chat-msg').each(function (i, value) {
        height += parseInt($(this).height());
    });

    height += 0;

    $('#chat_box').animate({ scrollTop: height });
}
function getWS_ProfileMessages(imagesURL, Name) {
    var ProfileMessagesCustomer = "";
    $("#HTMLcontent_inboxCommentMessageProfile").empty();
    var HTMLcontent_inboxProfileCustomer = $("#HTMLcontent_inboxCommentMessageProfile");
    ProfileMessagesCustomer = '<div class="box p-30 pt-50 text-center"> ' +
        '<div> ' +
        '<a class="avatar avatar-xxl mb-3 bg-transparent" href="#"> ' +
        '<img src="' + imagesURL + '" class="rounded-circle" alt="..."> ' +
        '</a> ' +
        '</div> ' +
        '<h5 class="mt-5 "><a class="text-default hover-primary" href="#">' + Name + '</a></h5> ' +
        '<p><small class="font-size-12">Designer</small></p> ' +
        '<p class="text-fade font-size-12 mb-50">Hello everyone.</p> ' +
        '<div class="gap-items font-size-16"> ' +
        '<a class="text-facebook" href="#"><i class="fa fa-facebook"></i></a> ' +
        '<a class="text-instagram" href="#"><i class="fa fa-instagram"></i></a> ' +
        '<a class="text-google" href="#"><i class="fa fa-google"></i></a> ' +
        '<a class="text-twitter" href="#"><i class="fa fa-twitter"></i></a> ' +
        '</div> ' +
        '</div>';
    HTMLcontent_inboxProfileCustomer.append(ProfileMessagesCustomer)
}
function getWS_PhotoSocialMedia(val) {
    console.log("Photo Media : " + val);
    jsonText = JSON.stringify({ postid: val });
    var i, x, PhotoCarousel = "", PhotoCarouselHeader = "", CarouselSambung = "", CarouselEnd = "";
    var CarouselIndicators = "", CarouselFileURL = "";
    $("#HTMLContent_Photo").empty();
    var HTMLcontent_Photo = $("#HTMLContent_Photo");
    $.ajax({
        type: "POST",
        url: "asmx/3_Channel_Sosmed.asmx/GetDataContentCommentPhoto",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            console.log(json);
            PhotoCarouselHeader += '<div id="carousel-example-generic-Indicators" class="carousel slide" data-ride="carousel"> ' +
                '<!-- Indicators --> ' +
                '<ol class="carousel-indicators"> '
            CarouselSambung += '</ol> ' +
                '<!-- Wrapper for slides --> ' +
                '<div class="carousel-inner" role="listbox">'
            CarouselEnd += '</div> ' +
                '</div>'
            var activeImage;
            for (i = 0; i < json.length; i++) {
                //alert(json[i].UserCreate);
                if (i == 0) {
                    activeImage = "active";
                } else {
                    activeImage = "";
                }
                CarouselIndicators += '<li data-target="#carousel-example-generic-Indicators" data-slide-to="' + i + '" class="' + activeImage + '"></li>';
                if (json[i].StatusType == "photo" || json[i].StatusType == "image" || json[i].StatusType == "IMAGE" || json[i].StatusType == "CAROUSEL_ALBUM") {
                    CarouselFileURL += '<div class="carousel-item ' + activeImage + '"> ' +
                        '<img src="' + json[i].FileURL + '" class="img-fluid" alt="slide-' + i + '"> ' +
                        '</div> '
                } else {
                    CarouselFileURL += '<div class="carousel-item ' + activeImage + '"> ' +
                        '<video width="100%" height="270" controls src="' + json[i].FileURL + '"> ' +
                        'Your browser does not support the video tag. ' +
                        '</video>' +
                        '</div> '
                }

                //var stringMessages = json[i].Messages;


            }
            PhotoCarousel = PhotoCarouselHeader +
                CarouselIndicators +
                CarouselSambung +
                CarouselFileURL +
                CarouselEnd;
            console.log(PhotoCarousel)
            HTMLcontent_Photo.show();
            HTMLcontent_Photo.append(PhotoCarousel);
            //HTMLcontent_Photo.append(PhotoCarousel);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //return PhotoCarousel;
}
//End
//Comments Function
function getWS_DataInbox(flagto, agentlogin) {

    var HTMLresultListInboxSocialMedia = $('#HTMLresultListInboxSocialMedia');
    var jsonText = JSON.stringify({ FlagTo: flagto, AgentLogin: agentlogin });
    console.log("Start Go to Data Inbox data : " + jsonText);
    $.ajax({
        type: "POST",
        url: "asmx/3_Channel_Sosmed.asmx/SelectInboxSocialMedia",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListInboxSocialMedia = "";
            HTMLresultListInboxSocialMedia.empty();

            console.log(json);
            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].DateGetSosmed.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

                var stringMessages = json[i].Messages;
                var stringProfileName = json[i].ProfileName;
                var StringIcon = json[i].FlagTo;

                var lengthName = 11;
                var length = 20;

                var trimmedStringMessages = stringMessages.length > length ?
                    stringMessages.substring(0, length - 3) + "..." :
                    stringMessages;
                var trimmedStringProfileName = stringProfileName.length > lengthName ?
                    stringProfileName.substring(0, lengthName - 3) + "..." :
                    stringProfileName;

                var flagForMentions = "";
                if (StringIcon == "Facebook") {
                    StringIcon = "fbicon.png";
                } else if (StringIcon == "Twitter") {
                    StringIcon = "twicon.png";
                } else if (StringIcon == "FacebookMsg") {
                    StringIcon = "fbm.png";
                    flagForMentions = "msg";
                } else if (StringIcon == "TwitterMsg") {
                    StringIcon = "twicon.png";
                    flagForMentions = "msgtw";
                } else {
                    StringIcon = "igicon.png";
                    flagForMentions = "msg";
                }
                var flagSourceSosmed = "";
                var HeaderSosmedID = "";
                var CommentSosmedID = "";
                if (json[i].StatusType == "MentionsComment") {
                    flagSourceSosmed = "IGmentionsPublic";
                    HeaderSosmedID = json[i].Active + '_' + json[i].HeaderSosmed;
                    CommentSosmedID = json[i].IDTable;
                } else if (json[i].StatusType == "MentionsMedia") {
                    flagSourceSosmed = "IGmentionsPublic";
                    HeaderSosmedID = json[i].Active;
                    CommentSosmedID = json[i].HeaderSosmed;
                } else {
                    flagSourceSosmed = getParameterByName('flagto');
                    HeaderSosmedID = json[i].HeaderSosmed;
                    CommentSosmedID = json[i].HeaderSosmed;
                }

                //$("#SM_AccountID").val('17841449081721593');
                if (getParameterByName('flagto') == "msg") {
                    /*resultListInboxSocialMedia = '<div class="media bg-white box-shadowed mb-15" onclick="getWS_ContentInbox(\'' + getParameterByName('flagto') + '\',\'' + $("#SM_AccountID").val() + '_' + json[i].HeaderSosmed + '\',\'' + json[i].HeaderSosmed + '\')"> ' +
                        '<a class="align-self-center mr-0" href="#" onclick="getWS_ContentInbox(\'' + getParameterByName('flagto') + '\',\'' + $("#SM_AccountID").val() + '_' + json[i].HeaderSosmed + '\',\'' + json[i].HeaderSosmed + '\')"><img src="' + StringIcon + '"  alt="..."></a> ' +
                        '<div class="media-body"> ' +
                        '<p> ' +
                        '<a class="hover-primary" href="#" onclick="getWS_ContentInbox(\'' + getParameterByName('flagto') + '\',\'' + $("#SM_AccountID").val() + '_' + json[i].HeaderSosmed + '\',\'' + json[i].HeaderSosmed + '\')"><strong>' + trimmedStringProfileName + '</strong></a> ' +
                        '<span class="float-right font-size-10">' + json[i].DateGetSosmed + '</span> ' +
                        '</p> ' +
                        '<p>' + trimmedStringMessages + '</p> ' +
                        '</div> ' +
                        '</div>';*/
                    resultListInboxSocialMedia = '<div class="media bg-white box-shadowed mb-15" onclick="getWS_ContentInbox(\'' + flagForMentions + '\',\'' + json[i].IDTable + '\',\'' + json[i].HeaderSosmed + '\')"> ' +
                        '<a class="align-self-center mr-0" href="#" onclick="getWS_ContentInbox(\'' + flagForMentions + '\',\'' + json[i].IDTable + '\',\'' + json[i].HeaderSosmed + '\')"><img src="' + StringIcon + '"  alt="..." width="28"></a> ' +
                        '<div class="media-body"> ' +
                        '<p> ' +
                        '<a class="hover-primary" href="#" onclick="getWS_ContentInbox(\'' + flagForMentions + '\',\'' + json[i].IDTable + '\',\'' + json[i].HeaderSosmed + '\')"><strong>' + trimmedStringProfileName + '</strong></a> ' +
                        '<span class="float-right font-size-10">' + json[i].DateGetSosmed + '</span> ' +
                        '</p> ' +
                        '<p>' + nl2br(trimmedStringMessages) + '</p> ' +
                        '</div> ' +
                        '</div>';
                } else {
                    resultListInboxSocialMedia = '<div class="media bg-white box-shadowed mb-15" onclick="getWS_ContentInbox(\'' + flagSourceSosmed + '\',\'' + HeaderSosmedID + '\',\'' + CommentSosmedID + '\')"> ' +
                        '<a class="align-self-center mr-0" href="#" onclick="getWS_ContentInbox(\'' + flagSourceSosmed + '\',\'' + HeaderSosmedID + '\',\'' + CommentSosmedID + '\')"><img src="' + StringIcon + '"  alt="..."></a> ' +
                        '<div class="media-body"> ' +
                        '<p> ' +
                        '<a class="hover-primary" href="#" onclick="getWS_ContentInbox(\'' + flagSourceSosmed + '\',\'' + HeaderSosmedID + '\',\'' + CommentSosmedID + '\')"><strong>' + trimmedStringProfileName + '</strong></a> ' +
                        '<span class="float-right font-size-10">' + json[i].DateGetSosmed + '</span> ' +
                        '</p> ' +
                        '<p>' + nl2br(trimmedStringMessages) + '</p> ' +
                        '</div> ' +
                        '</div>';
                }


                HTMLresultListInboxSocialMedia.append(resultListInboxSocialMedia);

                //End
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })



    //End

}
var xxx;
function getWS_ContentInbox(flagto, value, singleID) {

    console.log("Go to ContentInbox Value: " + value);
    $("#LoaderPage").show();
    $("#HTMLcontent_inbox").hide();
    $("#HTMLcontent_inboxComment").empty();

    $("#txtRecipientID").val(singleID);
    var getPageNow = value.split('_');
    $("#SM_AccountID").val(getPageNow[0]);
    //GET Profile name untuk di mentions
    getWS_ProfileSocialMedia(getPageNow[0]);

    var valueProses = ""
    if (flagto == "IGmentionsPublic") {
        valueProses = singleID;
    } else {
        valueProses = value
    }

    if (flagto == "msgtw") {
        $("#TxtActionDo").val("Messenger");
        $("#TxtSource").val("msgtw");
    } else {
        $("#TxtSource").val(flagto);
    }


    var jsonText;

    var HTMLcontent_header_inbox = $("#HTMLcontent_header_inbox");
    var HTMLcontent_inbox = $("#HTMLcontent_inbox");

    /*console.log("Nama Channel : " & "");
    $("#txtNameSM").val("");*/
    jsonText = JSON.stringify({ FlagTo: flagto, postid: valueProses });
    console.log("Nama Channel : " + jsonText + "");
    $.ajax({
        type: "POST",
        url: "asmx/3_Channel_Sosmed.asmx/GetDataContentInbox",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListContentInboxSocialMedia = "", resultListContentHeaderSocialMedia = "";
            HTMLcontent_header_inbox.empty();
            HTMLcontent_inbox.empty();
            x = 0;
            console.log(json);
            for (i = 0; i < json.length; i++) {
                //alert(json[i].UserCreate);
                //x=0;
                var isActive = json[i].Active;
                var flaggingActive = "";
                if (isActive == "N") {
                    flaggingActive = "this messages has been unsend : ";
                } else {
                    flaggingActive = "";
                }

                var stringMessages = flaggingActive + ' ' + json[i].Messages;
                var stringName = json[i].ProfileName;
                var stringDate = json[i].DateGetSosmed;
                var stringStatusType = json[i].StatusType;
                var stringTotal = json[i].Total;
                var stringAccountID = json[i].Total;
                var likes_count = 0;
                var accessToken = json[i].Likes;

                if (likes_count == "") {
                    likes_count = 0;
                } else {
                    likes_count = likes_count;
                }

                console.log("Nama Channel : " + stringAccountID);
                console.log("Nama Profile : " + json[i].ProfileID);
                console.log("Nama Flag : " + json[i].FlagTo);
                console.log("Nama Media : " + json[i].StatusType);
                console.log("Access Token : " + accessToken);
                $("#SM_AccountToken").val(accessToken);
                $("#txtNameSM").val(stringName);
                $("#txtIGaccountID").val(json[i].ProfileID);
                var iconMessage = "";
                if (getParameterByName('flagto') == "FB") {
                    iconMessage = "messengerfb.png";
                } else if (getParameterByName('flagto') == "IG") {
                    iconMessage = "igicon.png";
                } else {
                    iconMessage = "messengerfb.png";
                }

                var flagMentions = "";
                if (json[i].FlagTo == "Public") {
                    flagMentions = "MentionsPublic";
                } else if (json[i].FlagTo == "Instagram") {
                    flagMentions = "IG";
                } else {
                    flagMentions = "";
                }

                var PostIDorCommentID = "";
                console.log("Cek dia comments mentions");
                if (json[i].StatusType == "comment") {
                    PostIDorCommentID = json[i].IDTable;
                } else if (json[i].StatusType == "MentionsComment") {
                    PostIDorCommentID = json[i].HeaderSosmed;
                } else {
                    PostIDorCommentID = json[i].HeaderSosmed;
                }

                if (flagto == "msg" || flagto == "msgtw") {
                    if (x == 0) {
                        resultListContentHeaderSocialMedia = '<div class="media align-items-top p-0">' +
                            '<a class="avatar avatar-lg status-success mx-0" href="#">' +
                            '<img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">' +
                            '</a>' +
                            '<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">' +
                            '<div class="media-body mb-lg-0 mb-20">' +
                            '<p class="font-size-16">' +
                            '<a class="hover-primary" href="#"><strong>' + stringName + '</strong></a>' +
                            '</p>' +
                            '<p class="font-size-12">' + stringDate + '</p>' +
                            '</div>' +
                            '<div>' +
                            '<ul class="list-inline mb-0 font-size-18">' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Done\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>' +
                            '<li class="list-inline-item"><a onclick="showActionDo(\'Trash\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>-->' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Spam\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>-->' +
                            '<li class="list-inline-item"><a onclick="EndChat(/' + encodeURI(json[i].HeaderSosmed) + '/)" class="hover-primary"><img src="done.png" alt="End Chat"></a></li>' +
                            '<li class="list-inline-item"><a onclick="showHistoryData(\'History\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].ProfileName + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>' +
                            '<li class="list-inline-item"><a onclick="showActionDo(\'Messenger\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="' + iconMessage + '"  width="24" alt="Send Inbox"></a></li>' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Ticket\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="ticket.png" alt="Create Ticket"></a></li>-->' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        x = json.length;
                        HTMLcontent_header_inbox.append(resultListContentHeaderSocialMedia);
                    }
                } else {
                    if (getParameterByName('flagto') == "FB") {
                        resultListContentHeaderSocialMedia = '<div class="media align-items-top p-0">' +
                            '<a class="avatar avatar-lg status-success mx-0" href="#">' +
                            '<img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">' +
                            '</a>' +
                            '<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">' +
                            '<div class="media-body mb-lg-0 mb-20">' +
                            '<p class="font-size-16">' +
                            '<a class="hover-primary" href="#"><strong>' + stringName + '</strong></a>' +
                            '</p>' +
                            '<p class="font-size-12">' + stringDate + '</p>' +
                            '</div>' +
                            '<div>' +
                            '<ul class="list-inline mb-0 font-size-18">' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Done\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>' +
                            '<li class="list-inline-item"><a onclick="showActionDo(\'Trash\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>-->' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Spam\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>-->' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Star\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>-->' +
                            '<li class="list-inline-item"><a onclick="showActionDo(\'Messenger\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="' + iconMessage + '" width="24" alt="Send Inbox"></a></li>' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Ticket\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="ticket.png" alt="Create Ticket"></a></li>-->' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    } if (getParameterByName('flagto') == "IG") {
                        resultListContentHeaderSocialMedia = '<div class="media align-items-top p-0">' +
                            '<a class="avatar avatar-lg status-success mx-0" href="#">' +
                            '<img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">' +
                            '</a>' +
                            '<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">' +
                            '<div class="media-body mb-lg-0 mb-20">' +
                            '<p class="font-size-16">' +
                            '<a class="hover-primary" href="#"><strong>' + stringName + '</strong></a>' +
                            '</p>' +
                            '<p class="font-size-12">' + stringDate + '</p>' +
                            '</div>' +
                            '<div>' +
                            '<ul class="list-inline mb-0 font-size-18">' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Done\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>' +
                            '<li class="list-inline-item"><a onclick="showActionDo(\'Trash\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>-->' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Spam\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>-->' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Star\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>-->' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Messenger\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="' + iconMessage + '" width="24" alt="Send Inbox"></a></li>-->' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Ticket\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="ticket.png" alt="Create Ticket"></a></li>-->' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                    if (getParameterByName('flagto') == "mentions") {
                        resultListContentHeaderSocialMedia = '<div class="media align-items-top p-0">' +
                            '<a class="avatar avatar-lg status-success mx-0" href="#">' +
                            '<img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">' +
                            '</a>' +
                            '<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">' +
                            '<div class="media-body mb-lg-0 mb-20">' +
                            '<p class="font-size-16">' +
                            '<a class="hover-primary" href="#"><strong>' + stringName + '</strong></a>' +
                            '</p>' +
                            '<p class="font-size-12">' + stringDate + '</p>' +
                            '</div>' +
                            '<div>' +
                            '<ul class="list-inline mb-0 font-size-18">' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Done\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>' +
                            '<li class="list-inline-item"><a onclick="showActionDo(\'Trash\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>-->' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Spam\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>-->' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Star\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>-->' +
                            '<li class="list-inline-item"><a onclick="showActionDo(\'Messenger\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="' + iconMessage + '" width="24" alt="Send Inbox"></a></li>' +
                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Ticket\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="ticket.png" alt="Create Ticket"></a></li>-->' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                    HTMLcontent_header_inbox.append(resultListContentHeaderSocialMedia);
                }

                if (flagto == "msg" || flagto == "msgtw") {
                    if (json[i].StatusType == "FacebookMsg" || json[i].StatusType == "InstagramMsg" || json[i].StatusType == "TwitterMsg") {
                        if (json[i].ProfileID == stringAccountID) {
                            console.log("Hai cocok");
                            resultListContentInboxSocialMedia =
                                '<div class="card d-inline-block mb-3 float-right mr-2 no-shadow bg-lighter max-w-p80">' +
                                '<div class="position-absolute pt-1 pr-2 r-0">' +
                                '<span class="text-extra-small text-muted">' + json[i].DateGetSosmed + '</span>' +
                                '</div>' +
                                '<div class="card-body">' +
                                '<div class="d-flex flex-row pb-2">' +
                                '<div class="d-flex flex-grow-1 min-width-zero">' +
                                '<div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">' +
                                '<div class="min-width-zero">' +
                                '<p class="mb-0 font-size-16 text-dark">Agent</p>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="chat-text-left pl-5">' +
                                '<p class="mb-0 text-semi-muted">' + nl2br(stringMessages) + '</p>' +
                                '</div>' +
                                '</div>' +
                                '</div><div class="clearfix"></div>';
                        } else {
                            resultListContentInboxSocialMedia =
                                '<div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80">' +
                                '<div class="position-absolute pt-1 pr-2 r-0">' +
                                '<span class="text-extra-small text-muted">' + json[i].DateGetSosmed + '</span>' +
                                '</div>' +
                                '<div class="card-body">' +
                                '<div class="d-flex flex-row pb-2">' +
                                '<div class="d-flex flex-grow-1 min-width-zero">' +
                                '<div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">' +
                                '<div class="min-width-zero">' +
                                '<p class="mb-0 font-size-16 text-dark">Customer</p>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="chat-text-left pl-5">' +
                                '<p class="mb-0 text-semi-muted">' + nl2br(stringMessages) + '</p>' +
                                '</div>' +
                                '</div>' +
                                '</div><div class="clearfix"></div>';
                        }
                    } else {
                        resultListContentInboxSocialMedia =
                            '<div class="box-body bb-1 border-fade"> ' +
                            '<img style="width:350px" src="' + nl2br(stringMessages) + '" class="img-fluid""> ' +
                            '</div>';
                    }

                } else {
                    resultListContentInboxSocialMedia =
                        '<div class="box-body bb-1 border-fade"> ' +
                        '<p class="lead font-size-16">' + nl2br(stringMessages) + '</p> ' +
                        '<div style="width:350px" id="HTMLContent_Photo"></div>' +
                        '<div class="gap-items-4 mt-10"> ' +
                        '<!--<a class="text-fade hover-light" href="#"> ' +
                        '<i class="fa fa-heart mr-1"></i> ' + likes_count + ' ' +
                        '</a>--> ' +
                        '<a class="text-fade hover-light" href="#" onclick="getWS_ContentInboxComment(\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\')"> ' +
                        '<i class="fa fa-comment mr-1"></i> View' +
                        '</a>' +
                        '<a onclick="showActionDo(\'Comments\',\'' + getParameterByName('flagto') + flagMentions + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\')" class="text-fade hover-light" href="#">' +
                        '<i class="fa fa-reply mr-1"></i>' +
                        '</a>' +
                        '</div>' +
                        '</div>';
                }
                $("#LoaderPage").hide();
                HTMLcontent_inbox.show();
                HTMLcontent_inbox.append(resultListContentInboxSocialMedia);

            }
            if (flagto != "msg") {
                getWS_PhotoSocialMedia(value);
            }
            generateLinkLoad(singleID);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //GET Comment from Customer Posting Facebook Page 
    //openNewBackgroundTabGETComment(value);
    //window.open("https://triciptaintegra.com/graphapi/cronsjob_comment.php?postid=" + value, '_blank');
    //End
}
function openNewBackgroundTabGETComment(valNya) {
    var a = document.createElement("a");
    a.href = "https://triciptaintegra.com/graphapi/cronsjob_comment.php?postid=" + valNya;
    var evt = document.createEvent("MouseEvents");
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
        true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}
function openNewBackgroundTabGETCommentReply(valNya) {
    var a = document.createElement("a");
    a.href = "https://triciptaintegra.com/graphapi/cronsjob_reply.php?commentid=" + valNya;
    var evt = document.createEvent("MouseEvents");
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
        true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}
function getWS_ContentInboxComment(flagto, value) {

    console.log("Go to ContentInboxComment Value: " + value);
    $("#LoaderPage").show();
    $("#HTMLcontent_inboxComment").hide();

    var jsonText;

    var HTMLcontent_inboxComment = $("#HTMLcontent_inboxComment");


    jsonText = JSON.stringify({ FlagTo: flagto, postid: value });
    $.ajax({
        type: "POST",
        url: "asmx/3_Channel_Sosmed.asmx/GetDataContentCommentInbox",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListContentInboxCommentSocialMedia = "";
            HTMLcontent_inboxComment.empty();

            console.log(json);
            for (i = 0; i < json.length; i++) {
                //alert(json[i].UserCreate);

                var stringTotal = json[i].ID;
                var stringMessages = json[i].Messages;
                var stringName = json[i].ProfileName;
                var stringDate = json[i].DateGetSosmed;
                var stringStatusType = json[i].StatusType;

                var flagSourceSosmed = "";
                var idReplyForMentionsPublic = "";
                if (json[i].StatusType == "MentionsComment") {
                    flagSourceSosmed = "IGmentionsPublic";
                    idReplyForMentionsPublic = json[i].HeaderSosmed;
                } else {
                    flagSourceSosmed = getParameterByName('flagto');
                    idReplyForMentionsPublic = json[i].IDTable;
                }

                var privateAccountID = ""
                if (getParameterByName('flagto') == "IG") {
                    privateAccountID = json[i].ProfileID;

                } else {
                    privateAccountID = json[i].DetailSosmed;

                }

                if (stringMessages != "") {
                    resultListContentInboxCommentSocialMedia = '<div class="media-list media-list-divided bg-lighter">' +
                        '<div class="media">' +
                        '<a class="avatar" href="#">' +
                        '<img src="../images/avatar/6.jpg" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<p>' +
                        '<a href="#"><strong>' + stringName + '</strong></a>' +
                        '<time class="float-right text-fade" datetime="2017-07-14 20:00">' + json[i].DateGetSosmed + '</time>' +
                        '</p>' +
                        '<p>' + nl2br(stringMessages) + '</p>' +
                        '<div class="gap-items-4 mt-10">' +
                        '<!--<a class="text-fade hover-light" href="#">' +
                        '<i class="fa fa-thumbs-up mr-1"></i> 0' +
                        '</a>-->' +
                        '<a class="text-fade hover-light" href= "#" onclick="getWS_ContentInboxCommentReply(\'' + getParameterByName('flagto') + '\',\'' + json[i].DetailSosmed + '\',\'' + json[i].IDTable + '\')"> ' +
                        '<i class="fa fa-comment mr-1" ></i> ' + json[i].Total + '' +
                        '</a> ' +
                        '<a onclick="showActionDo(\'Reply\',\'' + flagSourceSosmed + '\',\'' + json[i].DetailSosmed + '\',\'' + idReplyForMentionsPublic + '\')" class="text-fade hover-light" href="#">' +
                        '<i class="fa fa-reply mr-1"></i>' +
                        '</a>' +
                        '<a onclick="showActionDo(\'Reply\',\'' + flagSourceSosmed + 'PRIVATE\',\'' + privateAccountID + '\',\'' + idReplyForMentionsPublic + '\')" class="text-fade hover-light" href="#">' +
                        '<img src="messengerfb.png"  width="16" alt="Send Inbox">' +
                        '</a>' +
                        '<a class="text-fade hover-light" onclick="showActionDo(\'Delete\',\'' + getParameterByName('flagto') + 'PRIVATE\',\'' + json[i].DetailSosmed + '\',\'' + json[i].IDTable + '\')" class="text-fade hover-light" href="#" > ' +
                        'Delete' +
                        '</a>' +
                        '</div>' +
                        '<div id="HTMLcontent_inboxCommentReply_' + json[i].IDTable + '">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    HTMLcontent_inboxComment.show();
                    HTMLcontent_inboxComment.append(resultListContentInboxCommentSocialMedia);
                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#LoaderPage").hide();
}
function generateLink() {
    console.log("Sent to WA Click");
    var formatWa = "https://api.whatsapp.com/send?phone=6289515244686"
    var paramKey = "[" + $("#TxtSource").val() + "]" + $("#txtRecipientID").val() + "[/" + $("#TxtSource").val() + "]";
    var valueParam = encodeURI(" Tolong teruskan pesan ini jangan diubah");
    $("#txtReplyMessenger").val(formatWa + "&text=" + paramKey + valueParam);

}
function generateLinkFromComments() {
    console.log("Sent to WA Click");
    var formatWa = "https://api.whatsapp.com/send?phone=6289515244686"
    var paramKey = "[" + $("#TxtSource").val() + "]" + $("#txtRecipientID").val() + "[/" + $("#TxtSource").val() + "]";
    var valueParam = encodeURI(" Tolong teruskan pesan ini jangan diubah");
    $("#ReasonWhy").val(formatWa + "&text=" + paramKey + valueParam);

}
function generateLinkLoad(valid) {
    console.log("Sent to WA Load");
    $("#txtCustID").val(valid);
    var formatWa = "https://api.whatsapp.com/send?phone=6289515244686"
    var paramKey = "[" + $("#TxtSource").val() + "]" + $("#txtRecipientID").val() + "[/" + $("#TxtSource").val() + "]";
    var valueParam = encodeURI(" Tolong teruskan pesan ini jangan diubah");
    //$("#txtReplyMessenger").val(formatWa + "&text=" + paramKey + valueParam);

}
function generateLinkHistory(source, val) {
    console.log("Sent to WA Click " + val.toString());
    var formatWa = "https://api.whatsapp.com/send?phone=6289515244686"
    var paramKey = "[" + source + "]" + val.toString() + "[/" + source + "]";
    var valueParam = encodeURI(" Tolong teruskan pesan ini jangan diubah");
    $("#txtReplyMessenger").val(formatWa + "&text=" + paramKey + valueParam);

}
function directTicket(source, val) {
    var TrxUsername = $("#hd_sessionLogin").val();
    var paramKey = "[" + source + "]" + val + "[/" + source + "]";
    //exec[UIDESK_DIRECT_TICKET] '[FBcommentpost]108013364840736_286811820294222[/FBcommentpost]', 'Agent1'
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxParam: paramKey,
                    TrxSource: source, TrxValue: val, TrxUserName: TrxUsername
                });
                //alert(form_data)
                $.ajax({
                    type: "POST",
                    url: "asmx/3_Channel_Sosmed.asmx/DirectTicketPage",
                    data: "{TrxParam:'" + paramKey + "', TrxSource:'" + source + "', TrxValue: '" + val + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //url: "apps/3_Channel_Sosmed.asmx/DirectTicketPage",
                    //method: "POST",
                    //contentType: "application/json; charset=utf-8",
                    //dataType: "json",
                    ////data: form_data,
                    //data: "{TrxParam:'" + paramKey + "', TrxSource:'" + source + "', TrxValue: '" + val + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
                    success: function (data) {
                        console.log("DirectTicketXX " + form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Direct Ticket Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.reload();
                                });
                            } else {
                                swal(
                                    '',
                                    'Direct Ticket Has Been Failed',
                                    'error'
                                ).then(function () {
                                    //$("#ModalChannel").modal('hide');
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
    console.log("Sent to Thread Click " + val.toString());
}
function EndChat(Value) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxValue: Value, TrxUserName: $("#hd_sessionLogin").val()
                });
                //alert(form_data)
                $.ajax({
                    type: "POST",
                    url: "asmx/3_Channel_Sosmed.asmx/EndChat",
                    data: "{TrxValue:'" + Value + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        console.log("End Chat " + form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'End Chat Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.reload();
                                });
                            } else {
                                swal(
                                    '',
                                    'End Chat Has Been Failed',
                                    'error'
                                ).then(function () {
                                    //$("#ModalChannel").modal('hide');
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
    console.log("Sent to Thread Click " + Value.toString());
}
function getWS_ContentInboxCommentReply(value, valcommentid, idtable) {
    console.log("Go to ContentInboxCommentReply Comment ID: " + valcommentid);
    $("#LoaderPage").show();
    //$("#HTMLcontent_inboxComment").hide();
    var jsonText;
    //var HTMLcontent_inboxComment = $("#HTMLcontent_inboxComment");
    var HTMLcontent_inboxCommentReply = $("#HTMLcontent_inboxCommentReply_" + idtable);
    jsonText = JSON.stringify({ postid: value, commentid: valcommentid });
    $.ajax({
        type: "POST",
        url: "asmx/3_Channel_Sosmed.asmx/GetDataContentCommentReplyInbox",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListContentInboxCommentReplySocialMedia = "";
            HTMLcontent_inboxCommentReply.empty();

            console.log(json);

            for (i = 0; i < json.length; i++) {
                //alert(json[i].UserCreate);

                var stringTotal = json[i].ID;
                var stringMessages = json[i].Messages;
                var stringName = json[i].ProfileName;
                var stringDate = json[i].DateGetSosmed;
                var stringStatusType = json[i].StatusType;
                var DetailReplyID = json[i].DetailSosmed;

                $("#txtConvID").val(DetailReplyID);
                if (stringMessages != "") {
                    resultListContentInboxCommentReplySocialMedia = '<div class="media px-0 mt-20">' +
                        '<a class="avatar" href="#">' +
                        '<img src="../images/avatar/8.jpg" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<p>' +
                        '<a href="#"><strong>' + stringName + '</strong></a>' +
                        '<time class="float-right text-fade" datetime="' + stringDate + '">' + stringDate + '</time>' +
                        '</p>' +
                        '<p>' + nl2br(stringMessages) + '</p>' +
                        '<div class="gap-items-4 mt-10"><a class="text-fade hover-light" onclick = "showActionDoReplyComment(\'Reply\',\'' + getParameterByName('flagto') + '\',\'' + valcommentid + '\',\'' + json[i].IDTable + '\',\'' + stringName + '\')" class="text-fade hover-light" href = "#" > ' +
                        '<i class="fa fa-reply mr-1"></i>' +
                        '</a>' +
                        '<a class="text-fade hover-light" onclick="showActionDo(\'Reply\',\'' + getParameterByName('flagto') + 'PRIVATE\',\'' + json[i].DetailSosmed + '\',\'' + json[i].IDTable + '\')" class="text-fade hover-light" href="#">' +
                        '<img src="messengerfb.png"  width="16" alt="Send Inbox">' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    HTMLcontent_inboxCommentReply.show();
                    HTMLcontent_inboxCommentReply.append(resultListContentInboxCommentReplySocialMedia);
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
    //openNewBackgroundTabGETCommentReply(valcommentid);
}
function post_WS_DataInteraction() {
    var TrxTicketNumber = $("#hd_TicketNumber").val();
    var TrxResponse = $("textarea#Journey_Response").val();
    var TrxStatus = $("#Journey_Status").val();
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxChannel = $("#Journey_EscalationChannel").val();
    var TrxThreadID = $("#hd_ThreadSystem").val();
    var TrxGenesysID = $("#hd_OtherSystem").val();
    var TrxEscalasiType = $("#hd_Journey_EscalationType").val();
    var TrxEscalasiValue = $("#hd_Journey_EscalationValue").val();
    var TrxDispatchToLayer = $("#hd_EscalationTo").val();
    if (TrxResponse === '') {
        $.toast({
            heading: 'Hi lovely agent...',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    if (confirm("Do you want to process?")) {
        $.ajax({
            type: "POST",
            url: "WebServiceTransaction.asmx/Update_TransactionTicket",
            data: "{ TrxTicketNumber: '" + TrxTicketNumber + "',TrxResponse: '" + TrxResponse + "',TrxStatus: '" + TrxStatus + "',TrxUsername: '" + TrxUsername + "',TrxChannel: '" + TrxChannel + "', TrxThreadID: '" + TrxThreadID + "', TrxGenesysID: '" + TrxGenesysID + "', TrxEscalasiUnit:'" + TrxEscalasiValue + "', DispatchType:'" + TrxEscalasiType + "',TrxDispatchToLayer:'" + TrxDispatchToLayer + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var json = JSON.parse(data.d);
                var i, x = "";
                var tblTickets = "";

                for (i = 0; i < json.length; i++) {
                    //alert(json[i].Result)
                    if (json[i].Result === 'True') {
                        console.log(json[i].msgSystem)
                        //window.location.href = "?status=<%=Request.QueryString("status")%>&action=Edit";
                        $.toast({
                            heading: 'Hi lovely agent...',
                            text: 'Your interaction has been added...',
                            position: 'top-right',
                            loaderBg: '#ff6849',
                            icon: 'success',
                            hideAfter: 3500,
                            stack: 6
                        });
                    } else {
                        return false;
                    }

                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    } else {
        return false;
    }
}
function getWS_EscalationChannel(value) {
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
//All End
// * Pentest *
function showHistoryData(actionDo, sourceDo, socmedID, tableID, profileID) {
    $("#modal-center-history").modal('show');
    var divDataListHistory = $('#dataListHistory');
    if (actionDo == "History") {
        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
            data: "{TrxID:'" + tableID + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK403'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, resultSourceChannel = "", dataHistoryResult = "", dataTag = "";
                divDataListHistory.empty();
                dataTag = "IGmentions";

                for (i = 0; i < json.length; i++) {
                    dataHistoryResult = '<div class="col-md-6 col-12"> ' +
                        '<div class="media bg-primary mb-20"> ' +
                        '<span class="avatar status-success"> ' +
                        '<img class="avatar" src="' + json[i].MediaURL + '" alt="..."> ' +
                        '</span> ' +
                        '<div class="media-body"> ' +
                        '<p><strong>' + json[i].FlagData + '-' + json[i].Username + '</strong> <time class="float-right" datetime="' + json[i].DateGetSosmed + '">' + json[i].DateGetSosmed + '</time></p> ' +
                        '<p>' + json[i].Messages + '</p> ' +
                        '<div class="d-inline-block pull-right mt-10"> ' +
                        '<a href="#" onclick="generateLinkHistory(\'' + json[i].FlagData + '\',\'' + json[i].CommentID + '\')" class="btn btn-rounded btn-sm btn-success m-5">Generate</a> ' +
                        '</div> ' +
                        '<div class="d-inline-block pull-right mt-10"> ' +
                        '<a href="#" onclick="directTicket(\'' + json[i].FlagData + '\',\'' + json[i].CommentID + '\')" class="btn btn-rounded btn-sm btn-info m-5">Direct Ticket</a> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>';
                    divDataListHistory.append(dataHistoryResult);
                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })

        //var JenisKondisi = "AllWhereData";
        //var divDataListHistory = $('#dataListHistory');
        //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "Sosmed_GetHistoryData", paramQuery: "where Username='"+ tableID +"'" });
        //$.ajax({
        //	type: "POST",
        //	url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        //	data: jsonText,
        //	contentType: "application/json; charset=utf-8",
        //	dataType: "json",
        //	success: function (data) {
        //		var json = JSON.parse(data.d);
        //		var i, x, resultSourceChannel = "", dataHistoryResult = "", dataTag="";
        //		divDataListHistory.empty();
        //		dataTag="IGmentions";
        //		for (i = 0; i < json.length; i++) {
        //			dataHistoryResult = '<div class="col-md-6 col-12"> ' +
        //									'<div class="media bg-primary mb-20"> ' +
        //									  '<span class="avatar status-success"> ' +
        //										'<img class="avatar" src="'+ json[i].MediaURL +'" alt="..."> ' +
        //									  '</span> ' +
        //									  '<div class="media-body"> ' +
        //										'<p><strong>'+ json[i].FlagData +'-'+ json[i].Username +'</strong> <time class="float-right" datetime="'+ json[i].DateGetSosmed +'">'+ json[i].DateGetSosmed +'</time></p> ' +
        //										'<p>'+ json[i].Messages +'</p> ' +
        //										'<div class="d-inline-block pull-right mt-10"> ' +
        //										  '<a href="#" onclick="generateLinkHistory(\''+ json[i].FlagData +'\',\''+ json[i].CommentID +'\')" class="btn btn-rounded btn-sm btn-success m-5">Generate</a> ' +
        //										'</div> ' +
        //										'<div class="d-inline-block pull-right mt-10"> ' +
        //										  '<a href="#" onclick="directTicket(\''+ json[i].FlagData +'\',\''+ json[i].CommentID +'\')" class="btn btn-rounded btn-sm btn-info m-5">Direct Ticket</a> ' +
        //										'</div> ' +
        //									  '</div> ' +
        //									'</div> ' +				
        //								'</div>';
        //			divDataListHistory.append(dataHistoryResult);
        //		}

        //	},
        //	error: function (xmlHttpRequest, textStatus, errorThrown) {
        //		console.log(xmlHttpRequest.responseText);
        //		console.log(textStatus);
        //		console.log(errorThrown);
        //	}
        //      })

    } else {
        console.log("Empty function condition!");
    }
}
function showActionDo(actionDo, sourceDo, socmedID, tableID, profileID) {
    //empty
    //$("#txtNameSM").val("");
    //$("#txtStatusSM").val("");
    $("#txtProfileID").val("");
    $("#txtEmailSM").val("");
    //$("#txtSourceSM").val("");
    $("#txtDescriptionSM").val("");
    //end

    $("#TxtSource").val(sourceDo);
    $("#TxtActionDo").val(actionDo);
    $("#TxtSocialID").val(socmedID);
    $("#TxtTableID").val(tableID);
    $("#txtConvID").val(socmedID);
    $("#txtCustID").val(profileID);
    $("#txtLabelProfileID").val(profileID)
    $("#txtProfileID").val(profileID);
    console.log("ID : " + socmedID);
    console.log("Source : " + sourceDo);
    console.log("Action : " + actionDo);

    if (actionDo == "Ticket") {
        getWS_CustomerProfile(actionDo, profileID);

    } else if (actionDo == "Done") {

        show_CustSyncSM(sourceDo, socmedID);
    } else if (actionDo == "Messenger") {
        generateLinkFromComments();
        $("#modal-center").modal('show');

    } else if (actionDo == "Delete") {
        $("#modal-center").modal('show');

    } else {

        $("#modal-center").modal('show');
    }

}
function PostPopup(val, val1) {
    if (val1 == "hide") {
        $("#modal-post").modal('hide');
    } else {

        if (val == "FBpost") {
            cmbAccountSosmed();
            $("#TxtActionDo_Post").val("FBpost");
        } else {
            cmbAccountSosmedIG();
            $("#TxtActionDo_Post").val("IGpost");
        }
        $("#modal-post").modal('show');
        $("#TxtSource_Post").val(0);

        $("#TxtSocialID_Post").val(0);
        $("#TxtTableID_Post").val(0);

    }
}
// * Pentest *
function cmbAccountSosmed() {
    var cmbDataOtherChannel = $('#cmbAccountSosmed');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
        data: "{TrxID:'FB', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK400'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceChannel = "", resultSourceChannelType = "";
            for (i = 0; i < json.length; i++) {

                resultSourceChannelType = '<option value="' + json[i].AccountID + '_' + json[i].AccountToken + '">' + json[i].AccountName + '</option>';
                cmbDataOtherChannel.append(resultSourceChannelType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //var JenisKondisi = "AllWhereData";
    //var cmbDataOtherChannel = $('#cmbAccountSosmed');
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "UIDESK_SOCIAL_ACCOUNT", paramQuery: "where SocialMedia='FB'" });
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultSourceChannel = "", resultSourceChannelType = "";
    //        for (i = 0; i < json.length; i++) {

    //            resultSourceChannelType = '<option value="' + json[i].AccountID + '_' + json[i].AccountToken + '">' + json[i].AccountName + '</option>';
    //            cmbDataOtherChannel.append(resultSourceChannelType);
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
// * Pentest *
function cmbAccountSosmedIG() {
    var cmbDataOtherChannel = $('#cmbAccountSosmed');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
        data: "{TrxID:'IG', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK400'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultSourceChannel = "", resultSourceChannelType = "";
            for (i = 0; i < json.length; i++) {

                resultSourceChannelType = '<option value="' + json[i].AccountID + '_' + json[i].AccountToken + '">' + json[i].AccountName + '</option>';
                cmbDataOtherChannel.append(resultSourceChannelType);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //var cmbDataOtherChannel = $('#cmbAccountSosmed');
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "UIDESK_SOCIAL_ACCOUNT", paramQuery: "where SocialMedia='IG'" });
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultSourceChannel = "", resultSourceChannelType = "";
    //        for (i = 0; i < json.length; i++) {

    //            resultSourceChannelType = '<option value="' + json[i].AccountID + '_' + json[i].AccountToken + '">' + json[i].AccountName + '</option>';
    //            cmbDataOtherChannel.append(resultSourceChannelType);
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function showActionDoReplyComment(actionDo, sourceDo, socmedID, tableID, userComment) {
    $("#TxtSource").val(sourceDo);
    $("#TxtActionDo").val(actionDo);
    $("#TxtSocialID").val(socmedID);
    $("#TxtTableID").val(tableID);
    console.log("ID : " + socmedID);
    console.log("Source : " + sourceDo);
    console.log("Action : " + actionDo);
    console.log("userReplyTo : @" + userComment);
    $("#ReasonWhy").val("userReplyTo : @" + userComment);
    $("#modal-center").modal('show');
}
function ActionSaveActionDoMulti() {
    var TxtActionDo = $("#TxtActionDo").val();
    var TxtSource = $("#TxtSource").val();
    if (TxtActionDo == "Reply") {
        if (TxtSource == "FB") {
            ActionReplyComments();
        } else if (TxtSource == "FBPRIVATE") {
            ActionReplyCommentsPrivateDM();
        } else if (TxtSource == "IGPRIVATE") {
            ActionReplyCommentsPrivateIG();
        } else if (TxtSource == "IG") {
            ActionReplyCommentsIG();
        } else if (TxtSource == "IGmentionsPublic") {
            ActionPostReplyIGmentionsPublic();
        } else if (TxtSource == "mentions") {
            console.log("Ini FB Mentions");
            ActionReplyCommentsMentions();
        }
    } else if (TxtActionDo == "Comments") {
        if (TxtSource == "FB") {
            ActionReplyComments();
        } else if (TxtSource == "IG") {
            ActionPostCommentsIG();
        } else if (TxtSource == "IGMentionsPublic") {
            ActionPostCommentsIGmentions();
        } else if (TxtSource == "mentionsIG") {
            console.log("Ini IG Mentions");
            ActionPostCommentsIGmentionsPublic();
        } else if (TxtSource == "mentions") {
            console.log("Ini FB Mentions");
            ActionReplyCommentsMentions();
        } else if (TxtSource == "TW") {
            console.log("Ini TW Mentions");
            ActionReplyComments_TW();
        }
    } else if (TxtActionDo == "Messenger") {
        console.log("Now Send Inox to facebook customer header");
        if (TxtSource == "FB") {
            ActionReplyInboxMessages();
        } else if (TxtSource == "mentions") {
            console.log("send PM to FB");
            ActionReplyInboxMessages();
        } else if (TxtSource == "IG") {
            ActionReplyInboxDM();
        } else if (TxtSource == "TW") {
            ActionReplyInboxDM_TW();
        }
    } else if (TxtActionDo == "Delete") {

        if (TxtSource == "FBPRIVATE") {
            console.log("Now Send To delete conversation!");
            ActionDeleteComments();
        }
    } else {
        ActionSaveActionDo();
    }
}
function ActionPostCommentsFBmentions() {
    console.log("Ini FB Mentions");
}
function ActionReplyCommentsPrivateIG() {
    $("#LoaderPage").show();
    var agree = confirm("Great, lets reply IG To DM this ?");
    var jsonText = "";
    var urlPost = "";
    if (agree) {
        console.log("Success post...");

        console.log("Ini send message from All Messages");
        jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), recipientID: $("#txtConvID").val(), msgNya: encodeURIComponent($("#ReasonWhy").val()), tokenNya: $("#SM_AccountToken").val() });
        urlPost = "apireplyinbox.php"

        console.log($("#txtMessageAgent").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/" + urlPost,
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                //var json = JSON.parse(response.d);
                //alert(json.ResultNya);
                var json = JSON.parse(response.d);
                console.log(json[0].Result);
                if (json[0].Result == "True") {
                    console.log("Do_Log_Reply");
                    ActionLogSocialMedia();
                }
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
        return false;
    }
}
function ActionPostSocialMedia() {
    console.log("hai submit Post..." + $("#cmbAccountSosmed").val());
    let text = $("#cmbAccountSosmed").val();
    const myArray = text.split("_");
    var channelID = $("#TxtActionDo_Post").val();
    console.log("flag " + $("#TxtActionDo_Post").val());
    if (channelID == "FBpost") {
        $("#LoaderPage").show();
        var agree = confirm("Great, lets post this FB?");
        var jsonText = "";
        var urlPost = "";
        if (agree) {
            console.log("true go...");

            console.log("Ini send post from uidesk");
            jsonText = JSON.stringify({ accountIDNya: myArray[0], msgNya: $("#ReasonWhy_Post").val(), tokenNya: myArray[1] });
            urlPost = "apipostfb.php"

            console.log(myArray[0]);
            console.log(myArray[1]);
            //var valnoWA = "628119970460";//$('#tglKejadian').val();
            $.ajax({
                type: "POST",
                url: "https://triciptaintegra.com/graphapi/" + urlPost,
                contentType: "application/json; charset=utf-8",
                data: jsonText,
                dataType: "json",
                success: function (response) {
                    var json = JSON.parse(response.d);
                    //alert(json.ResultNya);
                    console.log(response.d);
                }, complete: function () {
                    //back to normal!
                    $("#LoaderPage").hide();

                    console.log("Success Post...");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $("#LoaderPage").hide();
                    console.log(xhr.status);
                    alert(xhr.responseText);
                    console.log(thrownError);
                }
            });
            $("#LoaderPage").hide();
            return false;
        } else {
            console.log("Ups Canceling POST..." + myArray[0]);
            return false;
        }
    } else {
        $("#LoaderPage").show();
        var agree = confirm("Great, lets post this IG ?");
        var jsonText = "";
        var urlPost = "";
        if (agree) {
            console.log("true go...");

            console.log("Ini send post from uidesk");
            jsonText = JSON.stringify({ accountIDNya: myArray[0], msgNya: $("#ReasonWhy_Post").val(), tokenNya: myArray[1] });
            urlPost = "apipostig.php"

            console.log(myArray[0]);
            console.log(myArray[1]);
            //var valnoWA = "628119970460";//$('#tglKejadian').val();
            $.ajax({
                type: "POST",
                url: "https://triciptaintegra.com/graphapi/" + urlPost,
                contentType: "application/json; charset=utf-8",
                data: jsonText,
                dataType: "json",
                success: function (response) {
                    var json = JSON.parse(response.d);
                    //alert(json.ResultNya);
                    console.log("allJson : " + json);
                }, complete: function () {
                    //back to normal!
                    $("#LoaderPage").hide();

                    console.log("Success Post...");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $("#LoaderPage").hide();
                    alert(xhr.status);
                    alert(xhr.responseText);
                    alert(thrownError);
                }
            });
            $("#LoaderPage").hide();
            return false;
        } else {
            console.log("Ups Canceling POST..." + myArray[0]);
            return false;
        }
    }
}
function ActionReplyCommentsPrivateDM() {
    console.log("hai submit Reply Inbox..." + $("#txtRecipientID").val() + "-" + $("#SM_AccountToken").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets reply this ?");
    var jsonText = "";
    var urlPost = "";
    if (agree) {
        console.log("Success post...");

        console.log("Ini send message from comments & More visitors to private");
        jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#SM_AccountID").val(), recipientID: $("#txtConvID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
        urlPost = "apireplyinboxcommentsprivate.php"

        console.log($("#txtMessageAgent").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/" + urlPost,
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                //var json = JSON.parse(response.d);
                //alert(json.ResultNya);
                var json = JSON.parse(response.d);
                console.log(json[0].Result);
                if (json[0].Result == "True") {
                    console.log("Do_Log_Reply");
                    ActionLogSocialMedia();
                }
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                console.log(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
        return false;
    }
}
function escapeJSON(string) {
    return string.replace(/[\n"\&\r\t\b\f]/g, '\\n');
}
function ActionDeleteComments() {
    console.log("hai submit delete comments..." + $("#txtConvID").val() + "-" + $("#SM_AccountToken").val() + "-" + $("#TxtActionDo").val() + "-" + $("#TxtSource").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets delete this ?");
    var jsonText = "";
    var urlPost = "";
    if (agree) {
        console.log("Success delete...");
        console.log("Ini send delete from comments FB");
        jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), commentID: $("#txtConvID").val(), tokenNya: $("#SM_AccountToken").val() });
        urlPost = "graphapi/fb_Deletecomments.php"
        //console.log($("#txtMessageAgent").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        var json;
        console.log("https://triciptaintegra.com/" + urlPost);
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/" + urlPost,
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                json = response;
                console.log(json);
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
        return false;
    }
}
function ActionReplyInboxMessages() {
    console.log("hai submit Reply Inbox..." + $("#txtRecipientID").val() + "-" + $("#SM_AccountToken").val() + "-" + $("#TxtActionDo").val() + "-" + $("#TxtSource").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets reply this ?");
    var jsonText = "";
    var urlPost = "";
    if (agree) {
        console.log("Success post...");
        if ($("#TxtActionDo").val() == "Messenger" && $("#TxtSource").val() == "mentionsXXXX") {
            console.log("Ini send message from comments & More IG");
            jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), recipientID: $("#txtRecipientID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
            urlPost = "graphapi/apireplyinboxcomments.php"
        } else if ($("#TxtActionDo").val() == "Messenger" && $("#TxtSource").val() == "mentions") {
            console.log("Ini send message from Mentions FB");
            var getAccountIDCust = $("#TxtSocialID").val().split('_');
            $("#TxtSocialID").val(getAccountIDCust[0]);
            //#txtRecipientID <- sebelumnya pake ini
            jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), recipientID: getAccountIDCust[0], msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
            console.log(escapeJSON($("#ReasonWhy").val()));
            urlPost = "graphapi/apireplyinbox.php"
        } else if ($("#TxtActionDo").val() == "Messenger" && $("#TxtSource").val() == "msgtw") {
            console.log("Ini send message from TW");
            jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), user_id: $("#txtRecipientID").val(), message: $("#txtReplyMessenger").val(), tokenNya: $("#SM_AccountToken").val() });
            urlPost = "graphapi/twitapi/dm/send.php";
        } else {
            console.log("Ini send message from All Messages Yes");
            jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#SM_AccountID").val(), recipientID: $("#txtRecipientID").val(), msgNya: $("#txtReplyMessenger").val(), tokenNya: $("#SM_AccountToken").val() });
            console.log(escapeJSON($("#txtReplyMessenger").val()));
            urlPost = "graphapi/apireplyinbox.php";
        }
        //console.log($("#txtMessageAgent").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        var json;
        console.log("https://triciptaintegra.com/" + urlPost);
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/" + urlPost,
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                json = response;
                console.log(json);
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
        return false;
    }
}
function ActionReplyInboxDM_TW() {
    console.log("hai submit Reply Inbox TW..." + $("#txtRecipientID").val() + "-" + $("#SM_AccountToken").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets reply DM this ?");
    var jsonText = "";
    var urlPost = "";
    if (agree) {
        console.log("Ini send message from All Messages");
        jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), user_id: $("#txtRecipientID").val(), message: encodeURIComponent($("#ReasonWhy").val()), tokenNya: $("#SM_AccountToken").val() });


        console.log($("#txtMessageAgent").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/twitapi/dm/send.php ",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                var json = JSON.parse(response.d);
                //alert(json.ResultNya);
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
        return false;
    }
}
function ActionReplyInboxDM() {
    console.log("hai submit Reply Inbox..." + $("#txtRecipientID").val() + "-" + $("#SM_AccountToken").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets reply DM this ?");
    var jsonText = "";
    var urlPost = "";
    if (agree) {
        console.log("Ini send message from All Messages");
        jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), recipientID: $("#txtRecipientID").val(), msgNya: encodeURIComponent($("#ReasonWhy").val()), tokenNya: $("#SM_AccountToken").val() });
        urlPost = "apireplyinbox.php"

        console.log($("#txtMessageAgent").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/" + urlPost,
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                var json = JSON.parse(response.d);
                //alert(json.ResultNya);
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
        return false;
    }
}
function ActionReplyCommentsMentions() {
    console.log("hai submit Reply mentions..." + $("#TxtActionDo").val() + "-" + $("#TxtSocialID").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets post your campaign ?");
    if (agree) {
        console.log("Success post...");
        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), PostID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
        //console.log($("#TxtMsgNya").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/apireplyfbmentions.php",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                //var json = JSON.parse(response.d);
                //alert(json);
                var json = JSON.parse(response.d);
                console.log(json[0].Result);
                if (json[0].Result == "True") {
                    console.log("Do_Log_Reply");
                    ActionLogSocialMedia();
                }
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
        return false;
    }
}
function ActionReplyComments_TW() {
    console.log("hai submit Reply TW..." + $("#TxtActionDo").val() + "-" + $("#TxtSocialID").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets post your tweet ?");
    if (agree) {
        console.log("Success post...");
        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), tweet_id: $("#TxtSocialID").val(), PostID: $("#TxtSocialID").val(), status: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
        //console.log($("#TxtMsgNya").val()); in_reply_to_tweet_id msgNya
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            //url: "https://triciptaintegra.com/graphapi/apireplytw_tweet.php",
            url: "https://triciptaintegra.com/graphapi/twitapi/tweet/reply.php",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                var json = response;
                console.log(json);
                //alert(json.ResultNya);
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
        return false;
    }
}
//tinyMCE.get('ReasonWhy').getContent()
function ActionLogSocialMedia() {
    var form_data = JSON.stringify({ TrxIDSocialMedia: $("#txtConvID").val(), TrxChannel: $("#TxtSource").val(), TrxChannelDesc: $("#TxtActionDo").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAccount: $("#SM_AccountID").val(), TrxStatus: $("#ReasonWhy").val() });
    console.log("form_data : " + form_data);
    $.ajax({
        url: "asmx/3_Channel_Sosmed_Log.asmx/InsertLogSocialMediaInteraction",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
        data: form_data,
        success: function (data) {
            console.log("Function Log Data : " + form_data)

            var json = JSON.parse(data.d);
            console.log(data.d);
            console.log(json[0].ResultNya);
            console.log(json[0].Valuenya);


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
function ActionReplyComments() {
    console.log("hai submit Reply..." + $("#ReasonWhy").val() + "-" + $("#TxtSocialID").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets reply this ?");
    if (agree) {
        console.log("Success post...");
        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), PostID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
        //console.log($("#TxtMsgNya").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/apireplyfb.php",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                //console.log(response.d.Result);
                var json = JSON.parse(response.d);
                console.log(json[0].Result);
                if (json[0].Result == "True") {
                    console.log("Do_Log_Reply");
                    ActionLogSocialMedia();
                }
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
        return false;
    }
}
function ActionPostReplyIGmentionsPublic() {
    console.log("hai submit Reply Mentions Public..." + $("#txtIGaccountID").val() + "-Comment ID : " + $("#TxtSocialID").val() + "-Media ID : " + $("#TxtTableID").val() + "-" + $("#TxtSource").val() + "-" + $("#SM_AccountToken").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets post your comments ?");
    if (agree) {
        console.log("Success post...");
        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), AccountID: $("#SM_AccountID").val(), MediaID: $("#TxtTableID").val(), CommentID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val() + $("#SM_AccountName").val(), tokenNya: $("#SM_AccountToken").val() });
        //console.log($("#TxtMsgNya").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/apireplyigmentionspublic.php",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                //var json = JSON.parse(response.d);
                //alert(json.ResultNya);
                var json = JSON.parse(response.d);
                console.log(json[0].Result);
                if (json[0].Result == "True") {
                    console.log("Do_Log_Reply");
                    ActionLogSocialMedia();
                }
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
        return false;
    }
}
function ActionPostCommentsIGmentionsPublic() {
    console.log("hai submit Comments Mentions Public..." + $("#txtIGaccountID").val() + "-" + $("#TxtSocialID").val() + "-" + $("#TxtSource").val() + "-" + $("#SM_AccountToken").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets post your comments ?");
    if (agree) {
        console.log("Success post...");
        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), AccountID: $("#SM_AccountID").val(), MediaID: $("#TxtSocialID").val(), CommentID: $("#TxtTableID").val(), msgNya: $("#ReasonWhy").val() + $("#SM_AccountName").val(), tokenNya: $("#SM_AccountToken").val() });
        //console.log($("#TxtMsgNya").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/apireplyigmentionspublic.php",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                //var json = JSON.parse(response.d);
                //alert(json.ResultNya);
                var json = JSON.parse(response.d);
                console.log(json[0].Result);
                if (json[0].Result == "True") {
                    console.log("Do_Log_Reply");
                    ActionLogSocialMedia();
                }
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
        return false;
    }
}
function ActionPostCommentsIGmentions() {
    console.log("hai submit Comments Mentions Public..." + $("#txtIGaccountID").val() + "-" + $("#TxtSocialID").val() + "-" + $("#TxtSource").val() + "-" + $("#SM_AccountToken").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets post your comments ?");
    if (agree) {
        console.log("Success post...");
        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), AccountID: $("#txtIGaccountID").val(), MediaID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
        //console.log($("#TxtMsgNya").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/apireplyigmentions.php",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                //var json = JSON.parse(response.d);
                //alert(json.ResultNya);
                var json = JSON.parse(response.d);
                console.log(json[0].Result);
                if (json[0].Result == "True") {
                    console.log("Do_Log_Reply");
                    ActionLogSocialMedia();
                }
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
        return false;
    }
}
function ActionPostCommentsIG() {
    console.log("hai submit Comments..." + $("#TxtActionDo").val() + "-" + $("#TxtSocialID").val() + "-" + $("#TxtSource").val() + "-" + $("#SM_AccountToken").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets post your comments ?");
    if (agree) {
        console.log("Success post...");
        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), PostID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
        console.log($("#TxtMsgNya").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/apicommentsig.php",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                //var json = JSON.parse(response.d);
                //alert(json.ResultNya);
                var json = JSON.parse(response.d);
                console.log(json[0].Result);
                if (json[0].Result == "True") {
                    console.log("Do_Log_Reply");
                    ActionLogSocialMedia();
                }
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
        return false;
    }
}
function ActionReplyCommentsIG() {
    console.log("hai submit Reply..." + $("#TxtActionDo").val() + "-" + $("#TxtSocialID").val() + "-" + $("#TxtSource").val() + "-" + $("#SM_AccountToken").val());

    $("#LoaderPage").show();
    var agree = confirm("Great, lets post your campaign ?");
    if (agree) {
        console.log("Success post...");
        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), PostID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
        //console.log($("#TxtMsgNya").val());
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "https://triciptaintegra.com/graphapi/apireplyig.php",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                //var json = JSON.parse(response.d);
                //alert(json.ResultNya);
                var json = JSON.parse(response.d);
                console.log(json[0].Result);
                if (json[0].Result == "True") {
                    console.log("Do_Log_Reply");
                    ActionLogSocialMedia();
                }
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();

                console.log("Success Post...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#LoaderPage").hide();
                alert(xhr.status);
                alert(xhr.responseText);
                console.log(thrownError);
            }
        });
        $("#LoaderPage").hide();
        return false;
    } else {
        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
        return false;
    }
}
function ActionSaveActionDo() {
    console.log("hai submit Post..." + $("#cmb_TemplateBlast").val());
    var reasonWhy = $("#ReasonWhy").val();
    var userCreate = $("#hd_sessionLogin").val();
    var TxtSource = $("#TxtSource").val();
    var TxtActionDo = $("#TxtActionDo").val();
    var TxtSocialID = $("#TxtSocialID").val();
    console.log(reasonWhy);
    console.log(userCreate);
    console.log(TxtSource);
    console.log(TxtActionDo);
    console.log(TxtSocialID);

    if ($("#ReasonWhy").val() == "") {
        swal("Reason note is empty")
        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>Internal note</b> is empty")
        return false
    }
    swal({
        title: "Do you want to process?",
        //text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxReason: reasonWhy, TrxSocmedID: TxtSocialID, TrxSocmed: TxtSource, TrxSocmedSource: '', TrxSocmedSourceDetail: '', TrxSocmedActionDo: TxtActionDo, TrxUserName: userCreate });
                console.log("form_data : " + form_data);
                $.ajax({
                    url: "asmx/3_Channel_Sosmed.asmx/InsertSocialMediaReason",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function (data) {
                        console.log("Function ActionInternalNote : " + form_data)

                        var json = JSON.parse(data.d);
                        console.log(json[0].Result);
                        console.log(json[0].msgSystem);
                        if (json[0].Result == "False Data Note Reason Social") {
                            var TrxMessage = json[0].msgSystem;
                            AutoValidasiWarningErr($("#hd_sessionLogin").val(), TrxMessage);
                            $("#modal-center").modal('hide');
                        } else {
                            var TrxMessage = 'Your data <b>Social Media Reason</b> has been save';
                            AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                            $("#modal-center").modal('hide');
                            swal("save data has been success", {
                                icon: "success",
                            });
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


            } else {
                //swal("Your imaginary file is safe!");
                $("#modal-center").modal('hide');
            }
        });
}
//Send Message WA
function WA_ActionReply(varNomor, varMsgNya, varToUser, varMediaUrl) {

    console.log("hai submit Reply WA...");
    $("#LoaderPage").show();
    console.log("Success post...");

    var jsonText = JSON.stringify({ nomor: varNomor, msgbody: varMsgNya, toUser: varToUser, mediaURL: varMediaUrl });
    $.ajax({
        type: "POST",
        url: "asmx/3_Channel_Sosmed.asmx/MessageWAreply",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {
            var json = JSON.parse(response.d);
            //alert(json.ResultNya);
        }, complete: function () {
            //back to normal!
            $("#LoaderPage").hide();
            $('#txtFileName').val("");
            $('#txtMessageAgent').val("");
            console.log("Success Post...User" + varToUser + "-nomor" + varNomor);
            getWS_ContentInboxMessage('WA', varToUser);
            $("#slimScrollDiv").animate({ scrollTop: $('#slimScrollDiv').prop("scrollHeight") }, 1000);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#LoaderPage").hide();
            alert(xhr.status);
            alert(xhr.responseText);
            console.log(thrownError);
        }
    });
    $("#LoaderPage").hide();
    return false;

}
function SendMessagesNya() {
    var messageBody = $("#txtMessageAgent").val();
    var messageTo = $("#txtMessageTo").val();
    var mediaURL = "http://omni.uidesk.id/publishomni/" + $("#txtFileName").val();
    console.log("Send Message Go..." + messageBody + "-" + messageTo + " File URL : " + mediaURL);
    var myHeaders = new Headers();
    myHeaders.append("Api-key", apiKeyWA);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var mediaKondisi = 0;
    if (mediaURL == "http://omni.uidesk.id/publishomni/") {
        console.log("tanpa Media");
        mediaKondisi = "";
        mediaURL = "NO";
    } else {
        console.log("dengan Media")
        mediaKondisi = "&media_url=" + mediaURL;
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://omni.uidesk.id/wagent/api/whatsapp/send/message?id=" + idWA + "&nomor=" + noWA + "&msg=" + messageBody + "&to=" + messageTo + mediaKondisi + "", requestOptions)
        .then(response => response.text())
        .then(
            result => console.log(result),
            WA_ActionReply("UIDESK", messageBody, messageTo, mediaURL)
        )
        .catch(error => console.log('error', error));
}
function thisFileUpload() {
    document.getElementById("files").click();
};
//* Upload Attachment Ticket *//
$('#files').change(function () {
    var filename = $('#files').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='files']", function (e) {
    $(".hiddenX").show();
    //var valnoWA = "628119970460";//$('#tglKejadian').val();

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 2) {
            swal(
                '',
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP" || fileextension == "rar" || fileextension == "zip" || fileextension == "txt") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#hd_sessionLogin").val());
        data.append("numberid", getParameterByName('numberid'));
        data.append("customerid", $("#hd_customerID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/3_Channel_Sosmed.asmx/UploadFileAttachmentTicket",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            $("#txtFileName").val($(response).find("FilePath").text() + $(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());
            console.log($(response).find("FilePath").text());

        });

        request.fail(function (response) {

            console.log(response.responseText);
            //alert(response.responseText);

        });

        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
//End
function AutoValidasiWarningErr(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>System Error ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-left',
        loaderBg: '#ff6849',
        icon: 'warning',
        hideAfter: 20500,
        stack: 6
    });
}
function AutoValidasiWarning(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-left',
        loaderBg: '#ff6849',
        icon: 'warning',
        hideAfter: 3500,
        stack: 6
    });
}
function AutoValidasiSuccess(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: 'success',
        hideAfter: 3500,
        stack: 6
    });
    //return false
}





////var idWA = "3";
////var noWA = "08170154444";
////var apiKeyWA = "qRbkioekrn2xVSUwQWWiBzet03ysIhhUZZD";
////$(document).ready(function () {

////    /*tinymce.init({
////	  selector: "#ReasonWhy",
////	  plugins: "emoticons autoresize",
////	  toolbar: "emoticons",
////	  toolbar_location: "bottom",
////	  menubar: false,
////	  statusbar: false
////	});
////	tinymce.init({
////	  selector: "#txtReplyMessenger",
////	  plugins: "emoticons autoresize",
////	  toolbar: "emoticons",
////	  toolbar_location: "bottom",
////	  menubar: false,
////	  statusbar: false
////	});*/
////    $("#LoaderPage").hide();
////    $("#LoaderPageChat").hide();
////    $("#commentsDiv").hide();
////    $("#messagesDiv").hide();
////    $("#SaveCust").hide();

////	if (getParameterByName('flagto') == "msg") {
////        $("#socialMediaFooter").show();
////    } else {
////        $("#socialMediaFooter").hide();
////    }
////	$("#SM_Webhook").val("https://omnichannel.uidesk.id/webhuk/WebService.asmx/Webhuk_rawdata_social")
////    //getWS_DataInbox(getParameterByName('flagto'), getParameterByName('agentlogin'));
////    getWS_DataInbox(getParameterByName('flagto'), $("#hd_sessionLogin").val());
////    if (getParameterByName('flagto') == "FB") {
////        $("#txtLabelChannel").val("Facebook");
////    } else if (getParameterByName('flagto') == "IG") {
////        $("#txtLabelChannel").val("Instagram");
////    } else if (getParameterByName('flagto') == "TW") {
////        $("#txtLabelChannel").val("Twitter");
////    } else if (getParameterByName('flagto') == "wa") {
////        $("#txtLabelChannel").val("Whatsapp");
////    }

////    showDivContent(getParameterByName('flagto'));

////    $("#txtKeySearch").on("input", function () {
////        // Print entered value in a div box
////        var jumlahString = $(this).val().length;
////        //console.log(jumlahString);
////        if (jumlahString >= 4) {
////            //getWS_MasterCustomer($(this).val());
////            getWS_MasterCustomerSelected($(this).val())

////        }
////    });
////    console.log("FlagTo " + getParameterByName('flagto'));
////    console.log("AgentLogin " + $("#hd_sessionLogin").val());
////});

//////Restu Dev 10-10-2021
////function cancelChannel() {
////    console.log("Hide add channel");

////    $('#txtAddChannel').css('visibility', 'hidden');
////}
////function nl2br(str){
//// return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
////}
////function addToChannel() {
////    var TrxUsername = $("#hd_sessionLogin").val();
////    var TrxCustomerID = $("#txtCustID").val();
////    var TrxChannelVal = $("#txtChannelValue").val();
////    var TrxChannelNya = $("#txtSourceChannel").val();
////    //var TrxNumberid = $("#txtConvID").val(); //ConversationID / PostID 
////    //UIDESK_Temp_InsertOtherChannel
////    //$("#txtDescriptionThread").val();
////    console.log("user : " + TrxUsername + "CustID : " + TrxCustomerID + "Val Channel : " + TrxChannelVal + "Channel : " + TrxChannelNya)

////    var form_data = JSON.stringify({ strTrxUserName: TrxUsername, strTrxCustomerID: TrxCustomerID, strTrxChannelValue: TrxChannelVal, strTrxChannelType: TrxChannelNya });
////    //console.log("aa : " + form_data)
////    $.ajax({
////        url: "3_Channel_Sosmed.asmx/insertDataChannel",
////        method: "POST",
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////        data: form_data,
////        success: function (data) {
////            var json = JSON.parse(data.d);

////            console.log("Server Response : " + json[0].Result)
////            if (json[0].Result == "Already Exits") {
////                $.toast({
////                    heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
////                    text: 'Your data already exists',
////                    position: 'top-right',
////                    loaderBg: '#ff6849',
////                    icon: 'warning',
////                    hideAfter: 3500,
////                    stack: 6
////                });
////            } else if (json[0].Result == "Failed") {
////                $.toast({
////                    heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
////                    text: 'Your data already exists',
////                    position: 'top-right',
////                    loaderBg: '#ff6849',
////                    icon: 'warning',
////                    hideAfter: 3500,
////                    stack: 6
////                });
////            } else {
////                $.toast({
////                    heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
////                    text: 'Your data channel has been save',
////                    position: 'top-right',
////                    loaderBg: '#ff6849',
////                    icon: 'success',
////                    hideAfter: 3500,
////                    stack: 6
////                });
////            }
////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        },
////        complete: function () {

////        }
////    });
////}
////function addChannel(channelNya, value) {
////    console.log(channelNya);
////    $('#txtSourceChannel').val(channelNya);
////    $('#labelForChannel').text("Add channel : " + channelNya);
////    $('#txtAddChannel').css('visibility', 'visible');
////    getWS_CustomerProfile(channelNya, value);
////}
////// * Pentest *
////function getWS_ProfileSocialMedia(socialAccountID){
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
////        data: "{TrxID:'" + socialAccountID + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK400'}",
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {

////            var json = JSON.parse(data.d);
////            var i, x, resultSourceCustomer = "", jenisKelamin;

////            if (json.length == 0) {

////            } else {

////                for (i = 0; i < json.length; i++) {
////                    $('#SM_AccountName').val(" from @" + json[i].AccountName);
////                    $('#SM_AccountURL').val(json[i].AccountURL);
////                }
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////    //var HasilNya = "";  
////    //console.log("Selected Text: " + socialAccountID + " Value: " + socialAccountID);
////    //var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_SOCIAL_ACCOUNT", paramQuery: "where (AccountID = '" + socialAccountID + "')" });
////    //console.log("jsonText: " + jsonText);
////    //$.ajax({
////    //    type: "POST",
////    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////    //    data: jsonText,
////    //    contentType: "application/json; charset=utf-8",
////    //    dataType: "json",
////    //    success: function (data) {
////    //        var json = JSON.parse(data.d);
////    //        var i, x, resultSourceCustomer = "", jenisKelamin;
////    //        console.log("Jumlah data Profile " + json.length);       
////    //        if (json.length == 0) {
////    //            console.log("data social media not found " + i);
////    //        } else {				
////    //            for (i = 0; i < json.length; i++) {
////				//	console.log("Data Profile found" + json[i].AccountName);
////				//	$('#SM_AccountName').val(" from @"+json[i].AccountName);
////				//	$('#SM_AccountURL').val(json[i].AccountURL);
////    //            }
////    //        }

////    //    },
////    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
////    //        console.log(xmlHttpRequest.responseText);
////    //        console.log(textStatus);
////    //        console.log(errorThrown);
////    //    }
////    //})
////}
////// * Pentest *
////function getWS_MasterCustomerSelected(custSearch) {
////    var selectedValue = custSearch;
////    var HasilNya = "";
////    var listCustomerMaster = $("#listCustomerMaster");
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
////        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK401'}",
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {

////            var json = JSON.parse(data.d);
////            var i, x, resultSourceCustomer = "", jenisKelamin;

////            listCustomerMaster.empty();
////            if (json.length == 0) {
////                console.log("data not found " + i);

////            } else {
////                for (i = 0; i < json.length; i++) {

////                    HasilNya = '<div class="media align-items-center"> ' +
////                        '<div class="custom-control custom-checkbox"> ' +
////                        '<input type="checkbox" class="custom-control-input"> ' +
////                        '</div> ' +
////                        '<a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview"> ' +
////                        '<img class="avatar" src="../images/avatar/1.jpg" alt="..."> ' +
////                        '<div class="media-body text-truncate"> ' +
////                        '<h6>' + json[i].CustomerName + '</h6> ' +
////                        '<small> ' +
////                        '<span>' + json[i].FlagChannel + '</span> ' +
////                        '<span class="divider-dash">' + json[i].ValueChannel + '</span> ' +
////                        '</small> ' +
////                        '</div> ' +
////                        '</a> ' +
////                        '<div class="dropdown"> ' +
////                        '<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a> ' +
////                        '<div class="dropdown-menu dropdown-menu-right"> ' +
////                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Phone\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-phone"></i> Phone</a> ' +
////                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Whatsapp\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-commenting"></i> Whatsapp</a> ' +
////                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Email\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-envelope"></i> Email</a> ' +
////                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Facebook\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-facebook"></i> Facebook</a> ' +
////                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Instagram\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-instagram"></i> Instagram</a> ' +
////                        '<a class="dropdown-item" href="#" onclick="addChannel(\'Twitter\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-twitter"></i> Twitter</a> ' +
////                        '</div> ' +
////                        '</div> ' +
////                        '</div>';
////                    listCustomerMaster.append(HasilNya);

////                }
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////    //var selectedValue = custSearch;
////    //var HasilNya = "";
////    //var listCustomerMaster = $("#listCustomerMaster");
////    //console.log("Selected Text: " + custSearch + " Value: " + custSearch);
////    //var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "v_AllCustomerChannel", paramQuery: "where (CustomerName like '%" + selectedValue + "%' or ValueChannel like '%" + selectedValue + "%')" });
////    //console.log("jsonText: " + jsonText);
////    //$.ajax({
////    //    type: "POST",
////    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////    //    data: jsonText,
////    //    contentType: "application/json; charset=utf-8",
////    //    dataType: "json",
////    //    success: function (data) {

////    //        var json = JSON.parse(data.d);
////    //        var i, x, resultSourceCustomer = "", jenisKelamin;

////    //        console.log("Jumlah XX" + json.length);
////    //        listCustomerMaster.empty();
////    //        if (json.length == 0) {
////    //            console.log("data not found " + i);

////    //        } else {
////    //            for (i = 0; i < json.length; i++) {

////    //                HasilNya = '<div class="media align-items-center"> ' +
////    //                    '<div class="custom-control custom-checkbox"> ' +
////    //                    '<input type="checkbox" class="custom-control-input"> ' +
////    //                    '</div> ' +
////    //                    '<a class="flexbox flex-grow gap-items text-truncate" href="#qv-user-details" data-toggle="quickview"> ' +
////    //                    '<img class="avatar" src="../images/avatar/1.jpg" alt="..."> ' +
////    //                    '<div class="media-body text-truncate"> ' +
////    //                    '<h6>' + json[i].CustomerName + '</h6> ' +
////    //                    '<small> ' +
////    //                    '<span>' + json[i].FlagChannel + '</span> ' +
////    //                    '<span class="divider-dash">' + json[i].ValueChannel + '</span> ' +
////    //                    '</small> ' +
////    //                    '</div> ' +
////    //                    '</a> ' +
////    //                    '<div class="dropdown"> ' +
////    //                    '<a class="text-fade" href="#" data-toggle="dropdown"><i class="ti-more-alt rotate-90"></i></a> ' +
////    //                    '<div class="dropdown-menu dropdown-menu-right"> ' +
////    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Phone\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-phone"></i> Phone</a> ' +
////    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Whatsapp\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-commenting"></i> Whatsapp</a> ' +
////    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Email\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-envelope"></i> Email</a> ' +
////    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Facebook\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-facebook"></i> Facebook</a> ' +
////    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Instagram\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-instagram"></i> Instagram</a> ' +
////    //                    '<a class="dropdown-item" href="#" onclick="addChannel(\'Twitter\',\'' + json[i].ValueChannel + '\')"><i class="fa fa-fw fa-twitter"></i> Twitter</a> ' +
////    //                    '</div> ' +
////    //                    '</div> ' +
////    //                    '</div>';
////    //                listCustomerMaster.append(HasilNya);

////    //            }
////    //        }

////    //    },
////    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
////    //        console.log(xmlHttpRequest.responseText);
////    //        console.log(textStatus);
////    //        console.log(errorThrown);
////    //    }
////    //})
////}
////function getWS_CustomerProfile(actionDo, value) {
////    console.log("Go to Customer Profile Value: " + value);
////    $("#LoaderPage").show();
////    var jsonText;
////    jsonText = JSON.stringify({ ValueChannel: value });
////    $.ajax({
////        type: "POST",
////        url: "3_Channel_Sosmed.asmx/GetDataProfileCustSM",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultListContentInboxCommentSocialMedia = "";
////            $("#LoaderPage").hide();
////            for (i = 0; i < json.length; i++) {
////                //alert(json[i].UserCreate);
////                var strResult = json[i].Result;
////                var strCustomerID = json[i].CustomerID;
////                var strProfileName = json[i].ProfileName;
////                var strCompanyName = json[i].CompanyName;
////                var strProfileAlamat = json[i].ProfileAlamat;
////                var strProfileChannel = json[i].ProfileChannel;
////                var strProfileValue = json[i].ProfileValue;
////                $("#txtCustID").val(strCustomerID);
////                if (strProfileChannel == "Email") {
////                    $("#txtEmailSM").val(strProfileValue);
////                }
////            }
////            if (actionDo == "Ticket") {
////                if (json.length == "0") {
////                    //$("#modal-sendtothread").modal('hide');
////                    $.toast({
////                        heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
////                        text: 'You must add this channel to your customer channel!',
////                        position: 'top-right',
////                        loaderBg: '#ff6849',
////                        icon: 'warning',
////                        hideAfter: 3500,
////                        stack: 6
////                    });
////                    alert("You must add this channel to your customer channel!");
////                    console.log("Belum Sync")

////                    location.reload();
////                    return false;
////                } else {
////                    show_Thread('SM', value);
////                    console.log("Gk kena")
////                }
////            }
////            const myJSON = JSON.stringify(json);
////            console.log(myJSON)
////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
//////End
////// Rizal Dev 11 Juni 2021
////function ActionInsertThread() {
////    $("#SaveThread").hide();
////    var TrxUsername = $("#hd_sessionLogin").val();
////    var TrxCustomerID = $("#txtCustID").val();
////    var TrxNumberid = $("#txtConvID").val(); //ConversationID / PostID 
////    var TrxThreadID = $("#txtSourceSM").val(); //GenerateUniq
////    var TrxChannel = $("#txtLabelChannel").val(); //Didgtal Channel
////    var TrxAccount = $("#txtLabelProfileID").val();
////    var TrxSubject = $("#txtStatusSM").val() + " _ " + TrxCustomerID;
////    var TrxDescription = CKEDITOR.instances.txtDescriptionThread.getData();
////    console.log("cusTomerid : " + TrxCustomerID)
////    var form_data = JSON.stringify({ TrxUsername: TrxUsername, TrxCustomerID: TrxCustomerID, TrxNumberid: TrxNumberid, TrxThreadID: TrxThreadID, TrxChannel: TrxChannel, TrxAccount: TrxAccount, TrxSubject: TrxSubject, TrxDescription: TrxDescription });
////    $.ajax({
////        url: "WebServiceTransaction.asmx/InsertTransactionThread",
////        method: "POST",
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////        data: form_data,
////        success: function () {
////            console.log("Exec ActionInsertThread : " + form_data)
////            $.toast({
////                heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
////                text: 'Your data call has been save',
////                position: 'top-right',
////                loaderBg: '#ff6849',
////                icon: 'success',
////                hideAfter: 3500,
////                stack: 6
////            });
////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        },
////        complete: function () {

////        }
////    });
////}
////function showDivContent(flagto) {
////    if (flagto == "msg") {
////        //Model Chat Conversation
////       // $("#messagesDiv").hide();
////        //End
////        $("#commentsDiv").show();
////        //getWS_GetDataListMessage(getParameterByName('flagto'), getParameterByName('agentlogin'));
////    } else if (flagto == "wa") {
////        $("#messagesDiv").show();
////        getWS_GetDataListMessage(getParameterByName('flagto'), $("#hd_sessionLogin").val());
////    } else {
////        $("#commentsDiv").show();

////    }
////}
////function getParameterByName(name, url = window.location.href) {
////    name = name.replace(/[\[\]]/g, '\\$&');
////    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
////        results = regex.exec(url);
////    if (!results) return null;
////    if (!results[2]) return '';
////    return decodeURIComponent(results[2].replace(/\+/g, ' '));
////}
////// * Pentest *
////function getWS_DataProfile(value) {
////    var selectedValue = value;
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
////        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK402'}",
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {

////            var json = JSON.parse(data.d);
////            var i, x, resultSourceEnquiryReason = "";

////            for (i = 0; i < json.length; i++) {

////                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
////                var getDateBirth = newDate.split('/');

////                $("#lblNama").text(json[i].Name);
////                $("#lblJK").text(json[i].JenisKelamin);
////                $("#lblEmail").text(json[i].Email);
////                $("#lblPhone").text(json[i].HP);
////                $("#lblAlamat").text(json[i].Alamat);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })

////    //var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "mCustomer", paramQuery: "where CustomerID='" + selectedValue + "'" });
////    //$.ajax({
////    //    type: "POST",
////    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////    //    data: jsonText,
////    //    contentType: "application/json; charset=utf-8",
////    //    dataType: "json",
////    //    success: function (data) {
////    //        var json = JSON.parse(data.d);
////    //        var i, x, resultSourceEnquiryReason = "";

////    //        for (i = 0; i < json.length; i++) {

////    //            var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
////    //            var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
////    //            var getDateBirth = newDate.split('/');

////    //            $("#lblNama").text(json[i].Name);
////    //            $("#lblJK").text(json[i].JenisKelamin);
////    //            $("#lblEmail").text(json[i].Email);
////    //            $("#lblPhone").text(json[i].HP);
////    //            $("#lblAlamat").text(json[i].Alamat);

////    //        }

////    //    },
////    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
////    //        console.log(xmlHttpRequest.responseText);
////    //        console.log(textStatus);
////    //        console.log(errorThrown);
////    //    }
////    //})
////}
//////Messenger Function
////function getWS_GetDataListMessage(flagto, agentlogin) {
////    console.log("Start Go to Data Messages User yes");
////    //var HTMLresultListInboxSocialMedia = $('#HTMLcontent_listuser_inbox');
////    //var jsonText = JSON.stringify({ FlagTo: flagto, postid: agentlogin });

////    //$.ajax({
////    //    type: "POST",
////    //    url: "3_Channel_Sosmed.asmx/GetDataListMessage",
////    //    data: jsonText,
////    //    contentType: "application/json; charset=utf-8",
////    //    dataType: "json",
////    //    success: function (data) {
////    //        var json = JSON.parse(data.d);
////    //        var i, x, resultListInboxSocialMedia = "";
////    //        HTMLresultListInboxSocialMedia.empty();
////    //        for (i = 0; i < json.length; i++) {

////    //            //var milisegundos = parseInt(json[i].DateGetSosmed.replace("/Date(", "").replace(")/", ""));
////    //            //var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
////    //            //var getDateBirth = newDate.split('/');
////    //            console.log(json[i]);
////    //            var stringSenderID = json[i].ProfileID;
////    //            var stringProfileName = json[i].ProfileName;
////    //            var StringIcon = json[i].Messages;
////    //            var StringPIC = json[i].FileURL;

////    //            var lengthName = 11;
////    //            var length = 20;

////    //            var trimmedStringMessages = stringProfileName.length > length ?
////    //                stringProfileName.substring(0, length - 3) + "..." :
////    //                stringProfileName;



////    //            var flagToNya = "";
////    //            if (StringIcon == "FacebookMsg") {
////    //                StringIcon = "messengerfb.png";
////    //                flagToNya = "FB";
////    //            } else if (StringIcon == "message_create") {
////    //                StringIcon = "twicon.png";
////    //                flagToNya = "TW";
////    //            } else if (StringIcon == "Wa") {
////    //                StringIcon = "waicon.png";
////    //                flagToNya = "WA";
////    //            }

////    //            resultListInboxSocialMedia = '<div class="media py-10 px-0 align-items-center"> ' +
////    //                '<a class="" onclick="getWS_ContentInboxMessage(\'' + flagToNya + '\',\'' + stringSenderID + '\')"> ' +
////    //                '<img src="' + StringIcon + '"  alt="..." width="24px"> ' +
////    //                '</a> ' +
////    //                '<div class="media-body"> ' +
////    //                '<p class="font-size-16"> ' +
////    //                '<a class="hover-primary" onclick="getWS_ContentInboxMessage(\'' + flagToNya + '\',\'' + stringSenderID + '\')">' + trimmedStringMessages + '</a> ' +
////    //                '</p> ' +
////    //                '</div> ' +
////    //                '<!--<div class="media-right"> ' +
////    //                '<img src="' + StringIcon + '"  alt="..." width="24px">' +
////    //                '</div>--> ' +
////    //                '</div>'

////    //            HTMLresultListInboxSocialMedia.append(resultListInboxSocialMedia);

////    //            //End
////    //        }

////    //    },
////    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
////    //        console.log(xmlHttpRequest.responseText);
////    //        console.log(textStatus);
////    //        console.log(errorThrown);
////    //    }
////    //})
////}
////function getWS_MasterLeadsAPI(custName) {
////    var jsonText = JSON.stringify({ keySearch: custName });
////    console.log(jsonText);
////    //var valnoWA = "628119970460";//$('#tglKejadian').val();
////    $.ajax({
////        type: "POST",
////        url: "https://triciptaintegra.com/graphapi/apiicon/apiicon_leads.php",
////        contentType: "application/json; charset=utf-8",
////        data: jsonText,
////        dataType: "json",
////        success: function (response) {
////            var json = response;
////            //alert(json.ResultNya);
////            console.log(json)
////            console.log("Success POST...");
////            var i, x, resultSourceCustomer = "", jenisKelamin;

////            //cmbDataSourceEnquiryReason.append('<option value="">Select</option>');
////            //console.log("Jumlah" + json.length);
////            if (json.status == false) {
////                console.log("data Leads not found ");
////                $("#SaveLeads").show();
////                $("#txtCustID").val("");
////                $("#txtName").val("");
////                $("#txtEmail").val("");
////                $("#txtPhone").val(custName);
////                $("#txtDescription").val("");
////                $("#SaveCust").hide();
////                getWS_MasterCustomerAPI(custName);
////            } else {
////                for (i = 0; i < json.length; i++) {
////                    //alert();
////                    //alert();
////                    $("#txtCustID").val(json[i].id);
////                    $("#txtName").val(json[i].name);
////                    $("#txtEmail").val(json[i].email);
////                    $("#txtPhone").val(json[i].phonenumber);
////                    $("#txtDescription").val(json[i].description);
////                    $("#SaveLeads").hide();
////                    $("#SaveCust").show();
////                    console.log("data Leads found " + i);
////                }
////            }
////        }, complete: function () {
////            //back to normal!


////        },
////        error: function (xhr, ajaxOptions, thrownError) {
////            $("#LoaderPage").hide();
////            console.log(xhr.status);
////            alert(xhr.responseText);
////            console.log(thrownError);
////            //console.log(xhr.status);
////        }
////    });

////    return false;

////}
////function getWS_MasterCustomerAPI(custName) {

////    var jsonText = JSON.stringify({ keySearch: custName });
////    console.log(jsonText);
////    //var valnoWA = "628119970460";//$('#tglKejadian').val();
////    $.ajax({
////        type: "POST",
////        url: "https://triciptaintegra.com/graphapi/apiicon/apiicon.php",
////        contentType: "application/json; charset=utf-8",
////        data: jsonText,
////        dataType: "json",
////        success: function (response) {
////            var json = response;
////            //alert(json.ResultNya);
////            console.log(json)
////            console.log("Success POST...");
////            var i, x, resultSourceCustomer = "", jenisKelamin;

////            //cmbDataSourceEnquiryReason.append('<option value="">Select</option>');
////            //console.log("Jumlah" + json.length);
////            if (json.status == false) {
////                console.log("data customer not found ");
////                $("#SaveLeads").show("");
////                $("#txtCustID").val("");
////                $("#txtName").val("");
////                $("#txtEmail").val("");
////                $("#txtPhone").val(custName);
////                $("#txtDescription").val("");
////                $("#SaveCust").hide();
////            } else {
////                for (i = 0; i < json.length; i++) {
////                    //alert();
////                    //alert();
////                    console.log("data customer found " + i);
////                    $("#txtCustID").val(json[i].id);
////                    $("#txtName").val(json[i].company);
////                    $("#txtEmail").val(json[i].email);
////                    $("#txtPhone").val(json[i].phonenumber);
////                    $("#txtDescription").val(json[i].description);
////                    $("#SaveLeads").hide();
////                    $("#SaveCust").show();
////                }
////            }
////        }, complete: function () {
////            //back to normal!


////        },
////        error: function (xhr, ajaxOptions, thrownError) {
////            $("#LoaderPage").hide();
////            console.log(xhr.status);
////            alert(xhr.responseText);
////            console.log(thrownError);
////            //console.log(xhr.status);
////        }
////    });

////    return false;

////}
//////End
////function show_CustSync(id) {
////    $("#txtPhone").val(id);
////    $("#txtSourceChannel").val("WA");
////    $("#txtLabelProfileID").val(id);
////    getWS_MasterLeadsAPI(id);
////    //$("#ContentPlaceHolder1_TrxTicketID").val(id);
////    $("#modal-syncAccount").modal('show');

////    console.log("WA Number : " + id);
////}
////function show_CustSyncSM(source, id) {
////    $("#txtPhone").val(id);
////    $("#txtSourceChannel").val(source);
////    //getWS_MasterLeadsAPI(id);
////    //$("#ContentPlaceHolder1_TrxTicketID").val(id);
////    $("#modal-syncAccountSM").modal('show');

////    console.log("WA Number : " + id);
////}
////function show_Thread(channel, id) {
////    $("#txtPhone").val(id);
////    console.log("Start Check Conversation Status");
////    if (channel=="WA") {
////        $("#txtSourceChannel").val("WA");
////        $("#txtLabelProfileID").val(id);
////        //getWS_MasterLeadsAPI(id);
////        getWS_CustomerProfile("Phone", id);
////    }
////    var idContact = $("#txtConvID").val();
////    var jsonText = JSON.stringify({ ChannelNya: channel,ConvID: idContact });
////    /*if (channel == "SM") {
////        $("#modal-sendtothread").modal('show');
////    } else {*/
////        $.ajax({
////            type: "POST",
////            url: "3_Channel_Sosmed.asmx/CheckConversationStatus",
////            data: jsonText,
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            success: function (data) {
////                var json = JSON.parse(data.d);
////                var i, x, resultListInboxSocialMedia = "";

////                for (i = 0; i < json.length; i++) {
////                    //$("#ContentPlaceHolder1_TrxTicketID").val(id);

////                    if (json[i].Result == "True-SM") {
////                        //if (json.length <= 0) {
////                            swal("Thread sudah dibuat")
////                            AutoValidasiWarning($("#hd_sessionLogin").val(), "Silahkan tambahan interaksi <b>dengan customer dari menu Ticket</b>...")
////                            i = 100;
////                        //}
////                       // $("#modal-sendtothread").modal('show');
////                    } else {
////                        $("#SaveThread").show();
////                        $("#modal-sendtothread").modal('show');
////                    }
////                    //End
////                }

////                if (json.length <= 0) {
////                    if (channel == "SM") {
////                        $("#modal-sendtothread").modal('show');
////                    } else {
////                        swal("Percakapan masih berlangsung")
////                        AutoValidasiWarning($("#hd_sessionLogin").val(), "Anda masih dalam <b>percakapan dengan customer</b>...")
////                    }
////                }

////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            }
////        })
////    //}
////    //End

////    console.log("WA Number : " + id);
////}
////function getCheckboxScript(id) {
////    var getTemplate = $("#script_" + id).text();
////    console.log("get chekbox : " + id)
////    $("#txtMessageAgent").empty();
////    $("#txtMessageAgent").val(getTemplate);
////}
////function show_ScriptWA(id) {

////    //$("#ContentPlaceHolder1_TrxTicketID").val(id);
////    $("#modal-scriptwa").modal('show');

////    console.log("WA Script : " + id);
////}
////function ActionLeadsToCust() {
////    //Update name to DB WA
////    console.log($("#txtPhone").val(), 'LEAD', $("#txtEmail").val(), $("#txtCustID").val())
////    updateToDbWA($("#txtPhone").val(), 'LEAD', $("#txtEmail").val(), $("#txtCustID").val());
////    $("#SaveCust").hide();
////}
////function ActionLeadsToCustSM() {
////    //Update name to DB WA
////    console.log($("#txtPhoneSM").val(), 'LEAD', $("#txtEmailSM").val(), $("#txtCustIDSM").val())
////    var form_data = JSON.stringify({ sourcedo: $("#txtSourceChannel").val(), valuechannel: $("#txtProfileID").val(), namauser: $("#txtNameSM").val(), flagdata: 'FB', emaildata: $("#txtEmailSM").val(), leadsid: $("#txtProfileID").val() });
////    console.log("form_data : " + form_data);
////    event.preventDefault(); // // Function sweat alert
////    var form = document.forms["myForm"]; // // Function sweat alert
////    swal({
////        title: "Do you want to process?",
////        //text: "Once deleted, you will not be able to recover this imaginary file!",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////        .then((willDelete) => {
////            if (willDelete) {
////                $.ajax({
////                    url: "3_Channel_Sosmed.asmx/SyncDatabaseChannelCust",
////                    method: "POST",
////                    contentType: "application/json; charset=utf-8",
////                    dataType: "json",
////                    data: form_data,
////                    success: function (data) {
////                        var json = JSON.parse(data.d);
////                        console.log("Function sync data CustCHannel : " + form_data)
////                        console.log("Function sync result Cust ID : " + json[0].msgSystem)

////                        //CHeck Customer Exist
////                        getWS_CustomerProfile($("#txtSourceChannel").val(), $("#txtProfileID").val());
////                    },
////                    error: function (xmlHttpRequest, textStatus, errorThrown) {
////                        console.log(xmlHttpRequest.responseText);
////                        console.log(textStatus);
////                        console.log(errorThrown);
////                    },
////                    complete: function () {

////                    }
////                });

////                swal("Sync data has been update", {
////                    icon: "success",
////                });
////            } else {
////                //swal("Your imaginary file is safe!");
////                console.log("cancel sync");
////                $("#modal-syncAccount").modal('hide');
////            }
////        });
////    $("#SaveCust").hide();
////}
////function ActionPostToLeads() {
////    if ($("#txtName").val() == "") {
////        swal("Name is empty")
////        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>Name</b> is empty")
////        return false
////    }
////    if ($("#txtDescription").val() == "") {
////        swal("Description is empty")
////        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>Description</b> is empty")
////        return false
////    }
////    if ($("#txtEmail").val() == "") {
////        swal("Email is empty")
////        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>Email</b> is empty")
////        return false
////    }

////    event.preventDefault(); // // Function sweat alert
////    var form = document.forms["myForm"]; // // Function sweat alert
////    swal({
////        title: "Do you want to process?",
////        //text: "Once deleted, you will not be able to recover this imaginary file!",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////        .then((willDelete) => {
////            if (willDelete) {

////                var form_data = JSON.stringify({ name: $("#txtName").val(), source: 11, status: 8, phonenumber: $("#txtPhone").val(), email: $("#txtEmail").val(), description: encodeData($("#txtDescription").val()) });
////                console.log("form_data : " + form_data);
////                $.ajax({
////                    url: "https://triciptaintegra.com/graphapi/apiicon/post_leads.php",
////                    method: "POST",
////                    contentType: "application/json; charset=utf-8",
////                    dataType: "json",
////                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////                    data: form_data,
////                    success: function (results) {
////                        console.log("Function PostToLeads : " + form_data)
////                        console.log("Return : " + results.status)

////                        var TrxMessage = 'Your data <b>Leads</b> has been save'
////                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
////                        $("#modal-syncAccount").modal('hide');
////                        //Get Back Leads ID
////                        $("#SaveCust").show();
////                        $("#SaveLeads").hide();
////                        getWS_MasterLeadsAPI($("#txtPhone").val());

////                    },
////                    error: function (xmlHttpRequest, textStatus, errorThrown) {
////                        console.log(xmlHttpRequest.responseText);
////                        console.log(textStatus);
////                        console.log(errorThrown);
////                        $("#SaveCust").hide();
////                        $("#SaveLeads").show();
////                    },
////                    complete: function () {

////                    }
////                });

////                swal("save data has been success", {
////                    icon: "success",
////                });
////            } else {
////                //swal("Your imaginary file is safe!");
////                $("#modal-syncAccount").modal('hide');
////            }
////        });
////}
////function updateToDbWA(id, dataNya, emailNya, leadsID) {
////    var form_data = JSON.stringify({ waaccount: id, namauser: $("#txtName").val(), flagdata: dataNya, emaildata: emailNya, leadsid: leadsID });
////    console.log("form_data : " + form_data);
////    event.preventDefault(); // // Function sweat alert
////    var form = document.forms["myForm"]; // // Function sweat alert
////    swal({
////        title: "Do you want to process?",
////        //text: "Once deleted, you will not be able to recover this imaginary file!",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////        .then((willDelete) => {
////            if (willDelete) {
////                $.ajax({
////                    url: "3_Channel_Sosmed.asmx/UpdateDataDBWA",
////                    method: "POST",
////                    contentType: "application/json; charset=utf-8",
////                    dataType: "json",
////                    data: form_data,
////                    success: function (data) {
////                        console.log("Function update data WA Account : " + form_data)

////                    },
////                    error: function (xmlHttpRequest, textStatus, errorThrown) {
////                        console.log(xmlHttpRequest.responseText);
////                        console.log(textStatus);
////                        console.log(errorThrown);
////                    },
////                    complete: function () {

////                    }
////                });

////                swal("Sync data has been update", {
////                    icon: "success",
////                });
////            } else {
////                //swal("Your imaginary file is safe!");
////                console.log("cancel sync");
////                $("#modal-syncAccount").modal('hide');
////            }
////        });
////}
////function goToBottom() {
////    var height;
////    $('#chat_box .direct-chat-msg').each(function (i, value) {
////        height += parseInt($(this).height());
////    });

////    height += 0;

////    $('#chat_box').animate({ scrollTop: height });
////}
////function getWS_ProfileMessages(imagesURL, Name) {
////    var ProfileMessagesCustomer = "";
////    $("#HTMLcontent_inboxCommentMessageProfile").empty();
////    var HTMLcontent_inboxProfileCustomer = $("#HTMLcontent_inboxCommentMessageProfile");
////    ProfileMessagesCustomer = '<div class="box p-30 pt-50 text-center"> ' +
////        '<div> ' +
////        '<a class="avatar avatar-xxl mb-3 bg-transparent" href="#"> ' +
////        '<img src="' + imagesURL + '" class="rounded-circle" alt="..."> ' +
////        '</a> ' +
////        '</div> ' +
////        '<h5 class="mt-5 "><a class="text-default hover-primary" href="#">' + Name + '</a></h5> ' +
////        '<p><small class="font-size-12">Designer</small></p> ' +
////        '<p class="text-fade font-size-12 mb-50">Hello everyone.</p> ' +
////        '<div class="gap-items font-size-16"> ' +
////        '<a class="text-facebook" href="#"><i class="fa fa-facebook"></i></a> ' +
////        '<a class="text-instagram" href="#"><i class="fa fa-instagram"></i></a> ' +
////        '<a class="text-google" href="#"><i class="fa fa-google"></i></a> ' +
////        '<a class="text-twitter" href="#"><i class="fa fa-twitter"></i></a> ' +
////        '</div> ' +
////        '</div>';
////    HTMLcontent_inboxProfileCustomer.append(ProfileMessagesCustomer)
////}
////function getWS_PhotoSocialMedia(val) {
////    console.log("Photo Media : " + val);
////    jsonText = JSON.stringify({ postid: val });
////    var i, x, PhotoCarousel = "", PhotoCarouselHeader = "", CarouselSambung = "", CarouselEnd = "";
////    var CarouselIndicators = "", CarouselFileURL = "";
////    $("#HTMLContent_Photo").empty();
////    var HTMLcontent_Photo = $("#HTMLContent_Photo");
////    $.ajax({
////        type: "POST",
////        url: "3_Channel_Sosmed.asmx/GetDataContentCommentPhoto",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            console.log(json);
////            PhotoCarouselHeader += '<div id="carousel-example-generic-Indicators" class="carousel slide" data-ride="carousel"> ' +
////                '<!-- Indicators --> ' +
////                '<ol class="carousel-indicators"> '
////            CarouselSambung += '</ol> ' +
////                '<!-- Wrapper for slides --> ' +
////                '<div class="carousel-inner" role="listbox">'
////            CarouselEnd += '</div> ' +
////                '</div>'
////            var activeImage;
////            for (i = 0; i < json.length; i++) {
////                //alert(json[i].UserCreate);
////                if (i == 0) {
////                    activeImage = "active";
////                } else {
////                    activeImage = "";
////                }
////                CarouselIndicators += '<li data-target="#carousel-example-generic-Indicators" data-slide-to="' + i + '" class="' + activeImage + '"></li>';
////                if (json[i].StatusType == "photo" || json[i].StatusType == "image" || json[i].StatusType == "IMAGE" || json[i].StatusType == "CAROUSEL_ALBUM") {
////                    CarouselFileURL += '<div class="carousel-item ' + activeImage + '"> ' +
////                        '<img src="' + json[i].FileURL + '" class="img-fluid" alt="slide-' + i + '"> ' +
////                        '</div> '
////                } else {
////                    CarouselFileURL += '<div class="carousel-item ' + activeImage + '"> ' +
////                        '<video width="100%" height="270" controls src="' + json[i].FileURL + '"> ' +
////                        'Your browser does not support the video tag. ' +
////                        '</video>' +
////                        '</div> '
////                }

////                //var stringMessages = json[i].Messages;


////            }
////            PhotoCarousel = PhotoCarouselHeader +
////                CarouselIndicators +
////                CarouselSambung +
////                CarouselFileURL +
////                CarouselEnd;
////            console.log(PhotoCarousel)
////            HTMLcontent_Photo.show();
////            HTMLcontent_Photo.append(PhotoCarousel);
////            //HTMLcontent_Photo.append(PhotoCarousel);
////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })

////    //return PhotoCarousel;
////}
//////End
//////Comments Function
////function getWS_DataInbox(flagto, agentlogin) {

////    var HTMLresultListInboxSocialMedia = $('#HTMLresultListInboxSocialMedia');  
////    var jsonText = JSON.stringify({ FlagTo: flagto, AgentLogin: agentlogin });
////	 console.log("Start Go to Data Inbox data : " + jsonText);
////    $.ajax({
////        type: "POST",
////        url: "3_Channel_Sosmed.asmx/SelectInboxSocialMedia",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultListInboxSocialMedia = "";
////            HTMLresultListInboxSocialMedia.empty();

////            console.log(json);
////            for (i = 0; i < json.length; i++) {

////                var milisegundos = parseInt(json[i].DateGetSosmed.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
////                var getDateBirth = newDate.split('/');

////                var stringMessages = json[i].Messages;
////                var stringProfileName = json[i].ProfileName;
////                var StringIcon = json[i].FlagTo;

////                var lengthName = 11;
////                var length = 20;

////                var trimmedStringMessages = stringMessages.length > length ?
////                    stringMessages.substring(0, length - 3) + "..." :
////                    stringMessages;
////                var trimmedStringProfileName = stringProfileName.length > lengthName ?
////                    stringProfileName.substring(0, lengthName - 3) + "..." :
////                    stringProfileName;

////				var flagForMentions="";
////                if (StringIcon == "Facebook") {
////                    StringIcon = "fbicon.png";
////                } else if (StringIcon == "Twitter") {
////                    StringIcon = "twicon.png";
////                } else if (StringIcon == "FacebookMsg") {
////                    StringIcon = "fbm.png";
////					flagForMentions = "msg";
////                }else if (StringIcon == "TwitterMsg") {
////                    StringIcon = "twicon.png";
////					flagForMentions = "msgtw";
////                }else {
////                    StringIcon = "igicon.png";
////					flagForMentions = "msg";
////                }
////				var flagSourceSosmed = "";
////				var HeaderSosmedID = "";
////				var CommentSosmedID = "";
////				if(json[i].StatusType=="MentionsComment"){
////					flagSourceSosmed="IGmentionsPublic";
////					HeaderSosmedID=json[i].Active +'_'+ json[i].HeaderSosmed;
////					CommentSosmedID=json[i].IDTable;
////				}else{
////					flagSourceSosmed=getParameterByName('flagto');
////					HeaderSosmedID=json[i].HeaderSosmed;
////					CommentSosmedID=json[i].HeaderSosmed;
////				}

////				//$("#SM_AccountID").val('17841449081721593');
////                if (getParameterByName('flagto') == "msg") {
////                    /*resultListInboxSocialMedia = '<div class="media bg-white box-shadowed mb-15" onclick="getWS_ContentInbox(\'' + getParameterByName('flagto') + '\',\'' + $("#SM_AccountID").val() + '_' + json[i].HeaderSosmed + '\',\'' + json[i].HeaderSosmed + '\')"> ' +
////                        '<a class="align-self-center mr-0" href="#" onclick="getWS_ContentInbox(\'' + getParameterByName('flagto') + '\',\'' + $("#SM_AccountID").val() + '_' + json[i].HeaderSosmed + '\',\'' + json[i].HeaderSosmed + '\')"><img src="' + StringIcon + '"  alt="..."></a> ' +
////                        '<div class="media-body"> ' +
////                        '<p> ' +
////                        '<a class="hover-primary" href="#" onclick="getWS_ContentInbox(\'' + getParameterByName('flagto') + '\',\'' + $("#SM_AccountID").val() + '_' + json[i].HeaderSosmed + '\',\'' + json[i].HeaderSosmed + '\')"><strong>' + trimmedStringProfileName + '</strong></a> ' +
////                        '<span class="float-right font-size-10">' + json[i].DateGetSosmed + '</span> ' +
////                        '</p> ' +
////                        '<p>' + trimmedStringMessages + '</p> ' +
////                        '</div> ' +
////                        '</div>';*/
////                        resultListInboxSocialMedia = '<div class="media bg-white box-shadowed mb-15" onclick="getWS_ContentInbox(\'' + flagForMentions + '\',\'' + json[i].IDTable + '\',\'' + json[i].HeaderSosmed + '\')"> ' +
////                        '<a class="align-self-center mr-0" href="#" onclick="getWS_ContentInbox(\'' + flagForMentions + '\',\'' + json[i].IDTable + '\',\'' + json[i].HeaderSosmed + '\')"><img src="' + StringIcon + '"  alt="..." width="28"></a> ' +
////                        '<div class="media-body"> ' +
////                        '<p> ' +
////                        '<a class="hover-primary" href="#" onclick="getWS_ContentInbox(\'' + flagForMentions + '\',\'' + json[i].IDTable + '\',\'' + json[i].HeaderSosmed + '\')"><strong>' + trimmedStringProfileName + '</strong></a> ' +
////                        '<span class="float-right font-size-10">' + json[i].DateGetSosmed + '</span> ' +
////                        '</p> ' +
////                        '<p>' + nl2br(trimmedStringMessages) + '</p> ' +
////                        '</div> ' +
////                        '</div>';
////                } else {
////                        resultListInboxSocialMedia = '<div class="media bg-white box-shadowed mb-15" onclick="getWS_ContentInbox(\'' + flagSourceSosmed + '\',\'' + HeaderSosmedID + '\',\'' + CommentSosmedID + '\')"> ' +
////                        '<a class="align-self-center mr-0" href="#" onclick="getWS_ContentInbox(\'' + flagSourceSosmed + '\',\'' + HeaderSosmedID + '\',\'' + CommentSosmedID+ '\')"><img src="' + StringIcon + '"  alt="..."></a> ' +
////                        '<div class="media-body"> ' +
////                        '<p> ' +
////                        '<a class="hover-primary" href="#" onclick="getWS_ContentInbox(\'' + flagSourceSosmed + '\',\'' + HeaderSosmedID + '\',\'' + CommentSosmedID + '\')"><strong>' + trimmedStringProfileName + '</strong></a> ' +
////                        '<span class="float-right font-size-10">' + json[i].DateGetSosmed + '</span> ' +
////                        '</p> ' +
////                        '<p>' + nl2br(trimmedStringMessages) + '</p> ' +
////                        '</div> ' +
////                        '</div>';
////                }


////                HTMLresultListInboxSocialMedia.append(resultListInboxSocialMedia);

////                //End
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })



////    //End

////}
////var xxx;
////function getWS_ContentInbox(flagto, value, singleID) {

////    console.log("Go to ContentInbox Value: " + value);
////    $("#LoaderPage").show();
////    $("#HTMLcontent_inbox").hide();
////    $("#HTMLcontent_inboxComment").empty();

////    $("#txtRecipientID").val(singleID);
////	var getPageNow = value.split('_');
////	$("#SM_AccountID").val(getPageNow[0]);
////	//GET Profile name untuk di mentions
////	getWS_ProfileSocialMedia(getPageNow[0]);

////	var valueProses = ""
////	if(flagto=="IGmentionsPublic"){
////		valueProses = singleID;
////	}else{
////		valueProses = value
////	}

////	if(flagto=="msgtw"){
////		$("#TxtActionDo").val("Messenger");
////		$("#TxtSource").val("msgtw");
////	}else{
////		$("#TxtSource").val(flagto);
////	}


////    var jsonText;

////    var HTMLcontent_header_inbox = $("#HTMLcontent_header_inbox");
////    var HTMLcontent_inbox = $("#HTMLcontent_inbox");

////    /*console.log("Nama Channel : " & "");
////    $("#txtNameSM").val("");*/
////    jsonText = JSON.stringify({ FlagTo: flagto, postid: valueProses });
////	console.log("Nama Channel : " + jsonText + "");
////    $.ajax({
////        type: "POST",
////        url: "3_Channel_Sosmed.asmx/GetDataContentInbox",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultListContentInboxSocialMedia = "", resultListContentHeaderSocialMedia = "";
////            HTMLcontent_header_inbox.empty();
////            HTMLcontent_inbox.empty();
////            x = 0;
////			console.log(json);
////            for (i = 0; i < json.length; i++) {
////                //alert(json[i].UserCreate);
////                //x=0;
////                var isActive = json[i].Active;
////                var flaggingActive = "";
////                if(isActive =="N"){
////                    flaggingActive = "this messages has been unsend : ";
////                }else{
////                    flaggingActive = "";
////                }

////                var stringMessages = flaggingActive + ' ' + json[i].Messages;
////                var stringName = json[i].ProfileName;
////                var stringDate = json[i].DateGetSosmed;
////                var stringStatusType = json[i].StatusType;
////                var stringTotal = json[i].Total;
////                var stringAccountID = json[i].Total;
////                var likes_count = 0;
////                var accessToken = json[i].Likes;

////                if (likes_count == "") {
////                    likes_count = 0;
////                } else {
////                    likes_count = likes_count;
////                }

////                console.log("Nama Channel : " + stringAccountID);
////				console.log("Nama Profile : " + json[i].ProfileID);
////                console.log("Nama Flag : " + json[i].FlagTo);
////                console.log("Nama Media : " + json[i].StatusType);
////                console.log("Access Token : " + accessToken);
////                $("#SM_AccountToken").val(accessToken);
////                $("#txtNameSM").val(stringName);
////				$("#txtIGaccountID").val(json[i].ProfileID);
////				var iconMessage="";
////				if(getParameterByName('flagto')=="FB"){
////					iconMessage="messengerfb.png";
////				}else if(getParameterByName('flagto')=="IG"){
////					iconMessage="igicon.png";
////				}else{
////					iconMessage="messengerfb.png";
////				}

////				var flagMentions="";
////				if(json[i].FlagTo=="Public"){
////					flagMentions="MentionsPublic";
////				}else if(json[i].FlagTo=="Instagram"){
////					flagMentions="IG";
////				}else{
////					flagMentions="";
////				}

////				var PostIDorCommentID = "";
////				console.log("Cek dia comments mentions");
////				if(json[i].StatusType=="comment"){
////					PostIDorCommentID = json[i].IDTable;
////				}else if(json[i].StatusType=="MentionsComment"){
////					PostIDorCommentID = json[i].HeaderSosmed;
////				}else{
////					PostIDorCommentID = json[i].HeaderSosmed;
////				}

////                if (flagto == "msg" || flagto == "msgtw") {
////                    if (x==0) {
////                        resultListContentHeaderSocialMedia = '<div class="media align-items-top p-0">' +
////                            '<a class="avatar avatar-lg status-success mx-0" href="#">' +
////                            '<img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">' +
////                            '</a>' +
////                            '<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">' +
////                            '<div class="media-body mb-lg-0 mb-20">' +
////                            '<p class="font-size-16">' +
////                            '<a class="hover-primary" href="#"><strong>' + stringName + '</strong></a>' +
////                            '</p>' +
////                            '<p class="font-size-12">' + stringDate + '</p>' +
////                            '</div>' +
////                            '<div>' +
////                            '<ul class="list-inline mb-0 font-size-18">' +
////                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Done\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>' +
////                            '<li class="list-inline-item"><a onclick="showActionDo(\'Trash\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>-->' +
////                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Spam\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>-->' +
////                            '<li class="list-inline-item"><a onclick="EndChat(/' + encodeURI(json[i].HeaderSosmed) + '/)" class="hover-primary"><img src="done.png" alt="End Chat"></a></li>' +
////                            '<li class="list-inline-item"><a onclick="showHistoryData(\'History\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].ProfileName + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>' +
////                            '<li class="list-inline-item"><a onclick="showActionDo(\'Messenger\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="' + iconMessage + '"  width="24" alt="Send Inbox"></a></li>' +
////                            '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Ticket\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="ticket.png" alt="Create Ticket"></a></li>-->' +
////                            '</ul>' +
////                            '</div>' +
////                            '</div>' +
////                            '</div>';
////                        x = json.length;
////                        HTMLcontent_header_inbox.append(resultListContentHeaderSocialMedia);
////                    }
////                } else {
////					if(getParameterByName('flagto')=="FB"){
////						resultListContentHeaderSocialMedia = '<div class="media align-items-top p-0">' +
////							'<a class="avatar avatar-lg status-success mx-0" href="#">' +
////							'<img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">' +
////							'</a>' +
////							'<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">' +
////							'<div class="media-body mb-lg-0 mb-20">' +
////							'<p class="font-size-16">' +
////							'<a class="hover-primary" href="#"><strong>' + stringName + '</strong></a>' +
////							'</p>' +
////							'<p class="font-size-12">' + stringDate + '</p>' +
////							'</div>' +
////							'<div>' +
////							'<ul class="list-inline mb-0 font-size-18">' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Done\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>' +
////							'<li class="list-inline-item"><a onclick="showActionDo(\'Trash\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>-->' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Spam\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>-->' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Star\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>-->' +
////							'<li class="list-inline-item"><a onclick="showActionDo(\'Messenger\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="' + iconMessage + '" width="24" alt="Send Inbox"></a></li>' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Ticket\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="ticket.png" alt="Create Ticket"></a></li>-->' +
////							'</ul>' +
////							'</div>' +
////							'</div>' +
////							'</div>';
////					}if(getParameterByName('flagto')=="IG"){
////						resultListContentHeaderSocialMedia = '<div class="media align-items-top p-0">' +
////							'<a class="avatar avatar-lg status-success mx-0" href="#">' +
////							'<img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">' +
////							'</a>' +
////							'<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">' +
////							'<div class="media-body mb-lg-0 mb-20">' +
////							'<p class="font-size-16">' +
////							'<a class="hover-primary" href="#"><strong>' + stringName + '</strong></a>' +
////							'</p>' +
////							'<p class="font-size-12">' + stringDate + '</p>' +
////							'</div>' +
////							'<div>' +
////							'<ul class="list-inline mb-0 font-size-18">' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Done\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>' +
////							'<li class="list-inline-item"><a onclick="showActionDo(\'Trash\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>-->' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Spam\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>-->' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Star\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>-->' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Messenger\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="' + iconMessage + '" width="24" alt="Send Inbox"></a></li>-->' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Ticket\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="ticket.png" alt="Create Ticket"></a></li>-->' +
////							'</ul>' +
////							'</div>' +
////							'</div>' +
////							'</div>';
////					}
////					if(getParameterByName('flagto')=="mentions"){
////						resultListContentHeaderSocialMedia = '<div class="media align-items-top p-0">' +
////							'<a class="avatar avatar-lg status-success mx-0" href="#">' +
////							'<img src="../images/avatar/2.jpg" class="rounded-circle" alt="...">' +
////							'</a>' +
////							'<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">' +
////							'<div class="media-body mb-lg-0 mb-20">' +
////							'<p class="font-size-16">' +
////							'<a class="hover-primary" href="#"><strong>' + stringName + '</strong></a>' +
////							'</p>' +
////							'<p class="font-size-12">' + stringDate + '</p>' +
////							'</div>' +
////							'<div>' +
////							'<ul class="list-inline mb-0 font-size-18">' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Done\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>' +
////							'<li class="list-inline-item"><a onclick="showActionDo(\'Trash\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>-->' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Spam\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>-->' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Star\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>-->' +
////							'<li class="list-inline-item"><a onclick="showActionDo(\'Messenger\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="' + iconMessage + '" width="24" alt="Send Inbox"></a></li>' +
////							'<!--<li class="list-inline-item"><a onclick="showActionDo(\'Ticket\',\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\',\'' + json[i].ProfileID + '\')" class="hover-primary"><img src="ticket.png" alt="Create Ticket"></a></li>-->' +
////							'</ul>' +
////							'</div>' +
////							'</div>' +
////							'</div>';
////					}
////						HTMLcontent_header_inbox.append(resultListContentHeaderSocialMedia);
////                }

////                if (flagto == "msg" || flagto == "msgtw") {
////                    if (json[i].StatusType == "FacebookMsg" || json[i].StatusType == "InstagramMsg" || json[i].StatusType == "TwitterMsg") {
////                        if (json[i].ProfileID == stringAccountID) {
////							console.log("Hai cocok");
////                            resultListContentInboxSocialMedia =
////                                '<div class="card d-inline-block mb-3 float-right mr-2 no-shadow bg-lighter max-w-p80">' +
////                                '<div class="position-absolute pt-1 pr-2 r-0">' +
////                                '<span class="text-extra-small text-muted">' + json[i].DateGetSosmed +'</span>' +
////                                '</div>' +
////                                '<div class="card-body">' +
////                                '<div class="d-flex flex-row pb-2">' +
////                                '<div class="d-flex flex-grow-1 min-width-zero">' +
////                                '<div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">' +
////                                '<div class="min-width-zero">' +
////                                '<p class="mb-0 font-size-16 text-dark">Agent</p>' +
////                                '</div>' +
////                                '</div>' +
////                                '</div>' +
////                                '</div>' +
////                                '<div class="chat-text-left pl-5">' +
////                                '<p class="mb-0 text-semi-muted">' + nl2br(stringMessages) + '</p>' +
////                                '</div>' +
////                                '</div>' +
////                                '</div><div class="clearfix"></div>';
////                        } else {
////                            resultListContentInboxSocialMedia =
////                                '<div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80">' +
////                                '<div class="position-absolute pt-1 pr-2 r-0">' +
////                                '<span class="text-extra-small text-muted">' + json[i].DateGetSosmed +'</span>' +
////                                '</div>' +
////                                '<div class="card-body">' +
////                                '<div class="d-flex flex-row pb-2">' +
////                                '<div class="d-flex flex-grow-1 min-width-zero">' +
////                                '<div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">' +
////                                '<div class="min-width-zero">' +
////                                '<p class="mb-0 font-size-16 text-dark">Customer</p>' +
////                                '</div>' +
////                                '</div>' +
////                                '</div>' +
////                                '</div>' +
////                                '<div class="chat-text-left pl-5">' +
////                                '<p class="mb-0 text-semi-muted">' + nl2br(stringMessages) + '</p>' +
////                                '</div>' +
////                                '</div>' +
////                                '</div><div class="clearfix"></div>';
////                        }
////                    } else {
////                        resultListContentInboxSocialMedia =
////                            '<div class="box-body bb-1 border-fade"> ' +
////                            '<img style="width:350px" src="' + nl2br(stringMessages) + '" class="img-fluid""> ' +
////                            '</div>';
////                    }

////                } else {
////                    resultListContentInboxSocialMedia =
////                        '<div class="box-body bb-1 border-fade"> ' +
////                        '<p class="lead font-size-16">' + nl2br(stringMessages) + '</p> ' +
////                        '<div style="width:350px" id="HTMLContent_Photo"></div>' +
////                        '<div class="gap-items-4 mt-10"> ' +
////                        '<!--<a class="text-fade hover-light" href="#"> ' +
////                        '<i class="fa fa-heart mr-1"></i> ' + likes_count + ' ' +
////                        '</a>--> ' +
////                        '<a class="text-fade hover-light" href="#" onclick="getWS_ContentInboxComment(\'' + getParameterByName('flagto') + '\',\'' + PostIDorCommentID + '\')"> ' +
////                        '<i class="fa fa-comment mr-1"></i> View' +
////                        '</a>' +
////                        '<a onclick="showActionDo(\'Comments\',\'' + getParameterByName('flagto') + flagMentions +  '\',\'' + PostIDorCommentID + '\',\'' + json[i].IDTable + '\')" class="text-fade hover-light" href="#">' +
////                        '<i class="fa fa-reply mr-1"></i>' +
////                        '</a>' +
////                        '</div>' +
////                        '</div>';
////                }
////                $("#LoaderPage").hide();
////                HTMLcontent_inbox.show();
////                HTMLcontent_inbox.append(resultListContentInboxSocialMedia);

////            }
////            if (flagto!="msg") {
////            getWS_PhotoSocialMedia(value);
////            }
////            generateLinkLoad(singleID);
////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })

////    //GET Comment from Customer Posting Facebook Page 
////    //openNewBackgroundTabGETComment(value);
////    //window.open("https://triciptaintegra.com/graphapi/cronsjob_comment.php?postid=" + value, '_blank');
////    //End
////}
////function openNewBackgroundTabGETComment(valNya) {
////    var a = document.createElement("a");
////    a.href = "https://triciptaintegra.com/graphapi/cronsjob_comment.php?postid=" + valNya;
////    var evt = document.createEvent("MouseEvents");
////    //the tenth parameter of initMouseEvent sets ctrl key
////    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
////        true, false, false, false, 0, null);
////    a.dispatchEvent(evt);
////}
////function openNewBackgroundTabGETCommentReply(valNya) {
////    var a = document.createElement("a");
////    a.href = "https://triciptaintegra.com/graphapi/cronsjob_reply.php?commentid=" + valNya;
////    var evt = document.createEvent("MouseEvents");
////    //the tenth parameter of initMouseEvent sets ctrl key
////    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
////        true, false, false, false, 0, null);
////    a.dispatchEvent(evt);
////}
////function getWS_ContentInboxComment(flagto, value) {

////    console.log("Go to ContentInboxComment Value: " + value);
////    $("#LoaderPage").show();
////    $("#HTMLcontent_inboxComment").hide();

////    var jsonText;

////    var HTMLcontent_inboxComment = $("#HTMLcontent_inboxComment");


////    jsonText = JSON.stringify({ FlagTo: flagto, postid: value });
////    $.ajax({
////        type: "POST",
////        url: "3_Channel_Sosmed.asmx/GetDataContentCommentInbox",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultListContentInboxCommentSocialMedia = "";
////            HTMLcontent_inboxComment.empty();

////			console.log(json);
////            for (i = 0; i < json.length; i++) {
////                //alert(json[i].UserCreate);

////                var stringTotal = json[i].ID;
////                var stringMessages = json[i].Messages;
////                var stringName = json[i].ProfileName;
////                var stringDate = json[i].DateGetSosmed;
////                var stringStatusType = json[i].StatusType;

////				var flagSourceSosmed = "";
////				var idReplyForMentionsPublic= "";
////				if(json[i].StatusType=="MentionsComment"){
////					flagSourceSosmed="IGmentionsPublic";
////					idReplyForMentionsPublic = json[i].HeaderSosmed; 
////				}else{
////					flagSourceSosmed=getParameterByName('flagto');
////					idReplyForMentionsPublic = json[i].IDTable;
////				}

////				var privateAccountID = ""
////				if(getParameterByName('flagto')=="IG"){
////					privateAccountID=json[i].ProfileID;

////				}else{
////					privateAccountID=json[i].DetailSosmed;

////				}

////                if (stringMessages != "") {
////                    resultListContentInboxCommentSocialMedia = '<div class="media-list media-list-divided bg-lighter">' +
////                        '<div class="media">' +
////                        '<a class="avatar" href="#">' +
////                        '<img src="../images/avatar/6.jpg" alt="...">' +
////                        '</a>' +
////                        '<div class="media-body">' +
////                        '<p>' +
////                        '<a href="#"><strong>' + stringName + '</strong></a>' +
////                        '<time class="float-right text-fade" datetime="2017-07-14 20:00">' + json[i].DateGetSosmed + '</time>' +
////                        '</p>' +
////                        '<p>' + nl2br(stringMessages) + '</p>' +
////                        '<div class="gap-items-4 mt-10">' +
////                        '<!--<a class="text-fade hover-light" href="#">' +
////                        '<i class="fa fa-thumbs-up mr-1"></i> 0' +
////                        '</a>-->' +
////                        '<a class="text-fade hover-light" href= "#" onclick="getWS_ContentInboxCommentReply(\'' + getParameterByName('flagto') + '\',\'' + json[i].DetailSosmed + '\',\'' + json[i].IDTable + '\')"> ' +
////                        '<i class="fa fa-comment mr-1" ></i> ' + json[i].Total + '' +
////                        '</a> ' +
////                        '<a onclick="showActionDo(\'Reply\',\'' + flagSourceSosmed + '\',\'' + json[i].DetailSosmed + '\',\'' + idReplyForMentionsPublic + '\')" class="text-fade hover-light" href="#">' +
////                        '<i class="fa fa-reply mr-1"></i>' +
////                        '</a>' +
////						'<a onclick="showActionDo(\'Reply\',\'' + flagSourceSosmed + 'PRIVATE\',\'' + privateAccountID + '\',\'' + idReplyForMentionsPublic + '\')" class="text-fade hover-light" href="#">' +
////                        '<img src="messengerfb.png"  width="16" alt="Send Inbox">' +
////                        '</a>' +
////                        '</div>' +
////                        '<div id="HTMLcontent_inboxCommentReply_' + json[i].IDTable + '">' +
////                        '</div>' +
////                        '</div>' +
////                        '</div>' +
////                        '</div>';

////                    HTMLcontent_inboxComment.show();
////                    HTMLcontent_inboxComment.append(resultListContentInboxCommentSocialMedia);
////                }

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////    $("#LoaderPage").hide();
////}
////function generateLink() {
////    console.log("Sent to WA Click");
////    var formatWa = "https://api.whatsapp.com/send?phone=6289515244686"
////    var paramKey = "["+ $("#TxtSource").val()+"]" + $("#txtRecipientID").val() + "[/"+ $("#TxtSource").val()+"]";
////    var valueParam = encodeURI(" Tolong teruskan pesan ini jangan diubah");
////    $("#txtReplyMessenger").val(formatWa + "&text=" + paramKey + valueParam);

////}
////function generateLinkFromComments() {
////    console.log("Sent to WA Click");
////    var formatWa = "https://api.whatsapp.com/send?phone=6289515244686"
////    var paramKey = "["+ $("#TxtSource").val()+"]" + $("#txtRecipientID").val() + "[/"+ $("#TxtSource").val()+"]";
////    var valueParam = encodeURI(" Tolong teruskan pesan ini jangan diubah");
////    $("#ReasonWhy").val(formatWa + "&text=" + paramKey + valueParam);

////}
////function generateLinkLoad(valid) {
////    console.log("Sent to WA Load");
////    $("#txtCustID").val(valid);
////    var formatWa = "https://api.whatsapp.com/send?phone=6289515244686"
////    var paramKey = "["+ $("#TxtSource").val()+"]" + $("#txtRecipientID").val() + "[/"+ $("#TxtSource").val()+"]";
////    var valueParam = encodeURI(" Tolong teruskan pesan ini jangan diubah");
////    //$("#txtReplyMessenger").val(formatWa + "&text=" + paramKey + valueParam);

////}
////function generateLinkHistory(source,val) {
////    console.log("Sent to WA Click " + val.toString());
////    var formatWa = "https://api.whatsapp.com/send?phone=6289515244686"
////    var paramKey = "["+ source+"]" + val.toString() + "[/"+ source +"]";
////    var valueParam = encodeURI(" Tolong teruskan pesan ini jangan diubah");
////    $("#txtReplyMessenger").val(formatWa + "&text=" + paramKey + valueParam);

////}
////function directTicket(source,val) {
////    var TrxUsername = $("#hd_sessionLogin").val();
////    var paramKey = "[" + source + "]" + val + "[/" + source + "]";
////    //exec[UIDESK_DIRECT_TICKET] '[FBcommentpost]108013364840736_286811820294222[/FBcommentpost]', 'Agent1'
////    swal({
////        title: "Do you want to process?",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////        .then((willDelete) => {
////            if (willDelete) {
////                var form_data = JSON.stringify({TrxParam: paramKey,
////                    TrxSource: source, TrxValue: val, TrxUserName: TrxUsername
////                });
////				//alert(form_data)
////                $.ajax({
////                    type: "POST",
////                    url: "3_Channel_Sosmed.asmx/DirectTicketPage",
////                    data: "{TrxParam:'" + paramKey + "', TrxSource:'" + source + "', TrxValue: '" + val + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
////                    contentType: "application/json; charset=utf-8",
////                    dataType: "json",
////                    //url: "apps/3_Channel_Sosmed.asmx/DirectTicketPage",
////                    //method: "POST",
////                    //contentType: "application/json; charset=utf-8",
////                    //dataType: "json",
////                    ////data: form_data,
////                    //data: "{TrxParam:'" + paramKey + "', TrxSource:'" + source + "', TrxValue: '" + val + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
////                     success: function (data) {
////                        console.log("DirectTicketXX " + form_data)

////                        var json = JSON.parse(data.d);
////                        var i = "";
////                        for (i = 0; i < json.length; i++) {

////                            if (json[i].Result == "True") {
////                                swal(
////                                    '',
////                                    'Direct Ticket Has Been Success',
////                                    'success'
////                                ).then(function () {
////                                    location.reload();
////                                });
////                            } else {
////                                swal(
////                                    '',
////                                    'Direct Ticket Has Been Failed',
////                                    'error'
////                                ).then(function () {
////                                    //$("#ModalChannel").modal('hide');
////                                });
////                            }

////                        }

////                    },
////                    error: function (xmlHttpRequest, textStatus, errorThrown) {
////                        console.log(xmlHttpRequest.responseText);
////                        console.log(textStatus);
////                        console.log(errorThrown);
////                    },
////                    complete: function () {

////                    }
////                });
////            }
////        });
////    console.log("Sent to Thread Click " + val.toString());
////}
////function EndChat(Value) {
////    swal({
////        title: "Do you want to process?",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////        .then((willDelete) => {
////            if (willDelete) {
////                var form_data = JSON.stringify({
////                    TrxValue: Value, TrxUserName: $("#hd_sessionLogin").val()
////                });
////                //alert(form_data)
////                $.ajax({
////                    type: "POST",
////                    url: "3_Channel_Sosmed.asmx/EndChat",
////                    data: "{TrxValue:'" + Value + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
////                    contentType: "application/json; charset=utf-8",
////                    dataType: "json",
////                    success: function (data) {
////                        console.log("End Chat " + form_data)

////                        var json = JSON.parse(data.d);
////                        var i = "";
////                        for (i = 0; i < json.length; i++) {

////                            if (json[i].Result == "True") {
////                                swal(
////                                    '',
////                                    'End Chat Has Been Success',
////                                    'success'
////                                ).then(function () {
////                                    location.reload();
////                                });
////                            } else {
////                                swal(
////                                    '',
////                                    'End Chat Has Been Failed',
////                                    'error'
////                                ).then(function () {
////                                    //$("#ModalChannel").modal('hide');
////                                });
////                            }

////                        }

////                    },
////                    error: function (xmlHttpRequest, textStatus, errorThrown) {
////                        console.log(xmlHttpRequest.responseText);
////                        console.log(textStatus);
////                        console.log(errorThrown);
////                    },
////                    complete: function () {

////                    }
////                });
////            }
////        });
////    console.log("Sent to Thread Click " + Value.toString());
////}
////function getWS_ContentInboxCommentReply(value, valcommentid, idtable) {
////    console.log("Go to ContentInboxCommentReply Comment ID: " + valcommentid);
////    $("#LoaderPage").show();
////    //$("#HTMLcontent_inboxComment").hide();
////    var jsonText;
////    //var HTMLcontent_inboxComment = $("#HTMLcontent_inboxComment");
////    var HTMLcontent_inboxCommentReply = $("#HTMLcontent_inboxCommentReply_" + idtable);
////    jsonText = JSON.stringify({ postid: value, commentid: valcommentid });
////    $.ajax({
////        type: "POST",
////        url: "3_Channel_Sosmed.asmx/GetDataContentCommentReplyInbox",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultListContentInboxCommentReplySocialMedia = "";
////            HTMLcontent_inboxCommentReply.empty();

////			console.log(json);

////            for (i = 0; i < json.length; i++) {
////                //alert(json[i].UserCreate);

////                var stringTotal = json[i].ID;
////                var stringMessages = json[i].Messages;
////                var stringName = json[i].ProfileName;
////                var stringDate = json[i].DateGetSosmed;
////                var stringStatusType = json[i].StatusType;
////				var DetailReplyID = json[i].DetailSosmed;

////				$("#txtConvID").val(DetailReplyID);
////                if (stringMessages != "") {
////                    resultListContentInboxCommentReplySocialMedia = '<div class="media px-0 mt-20">' +
////                        '<a class="avatar" href="#">' +
////                        '<img src="../images/avatar/8.jpg" alt="...">' +
////                        '</a>' +
////                        '<div class="media-body">' +
////                        '<p>' +
////                        '<a href="#"><strong>' + stringName + '</strong></a>' +
////                        '<time class="float-right text-fade" datetime="' + stringDate + '">' + stringDate + '</time>' +
////                        '</p>' +
////                        '<p>' + nl2br(stringMessages) + '</p>' +
////						'<div class="gap-items-4 mt-10"><a class="text-fade hover-light" onclick = "showActionDoReplyComment(\'Reply\',\'' + getParameterByName('flagto') + '\',\'' + valcommentid + '\',\'' + json[i].IDTable + '\',\'' + stringName + '\')" class="text-fade hover-light" href = "#" > ' +
////                        '<i class="fa fa-reply mr-1"></i>' +
////                        '</a>' +
////						'<a class="text-fade hover-light" onclick="showActionDo(\'Reply\',\'' + getParameterByName('flagto') + 'PRIVATE\',\'' + json[i].DetailSosmed + '\',\'' + json[i].IDTable + '\')" class="text-fade hover-light" href="#">' +
////                        '<img src="messengerfb.png"  width="16" alt="Send Inbox">' +
////                        '</a></div>' +
////                        '</div>' +
////                        '</div>';

////                    HTMLcontent_inboxCommentReply.show();
////                    HTMLcontent_inboxCommentReply.append(resultListContentInboxCommentReplySocialMedia);
////                }

////            }
////            $("#LoaderPage").hide();
////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////    //openNewBackgroundTabGETCommentReply(valcommentid);
////}
////function post_WS_DataInteraction() {
////    var TrxTicketNumber = $("#hd_TicketNumber").val();
////    var TrxResponse = $("textarea#Journey_Response").val();
////    var TrxStatus = $("#Journey_Status").val();
////    var TrxUsername = $("#hd_sessionLogin").val();
////    var TrxChannel = $("#Journey_EscalationChannel").val();
////    var TrxThreadID = $("#hd_ThreadSystem").val();
////    var TrxGenesysID = $("#hd_OtherSystem").val();
////    var TrxEscalasiType = $("#hd_Journey_EscalationType").val();
////    var TrxEscalasiValue = $("#hd_Journey_EscalationValue").val();
////    var TrxDispatchToLayer = $("#hd_EscalationTo").val();
////    if (TrxResponse === '') {
////        $.toast({
////            heading: 'Hi lovely agent...',
////            text: 'Please fill in completely, and check again ya...',
////            position: 'top-right',
////            loaderBg: '#ff6849',
////            icon: 'error',
////            hideAfter: 3500

////        });
////        return false;
////    }
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            type: "POST",
////            url: "WebServiceTransaction.asmx/Update_TransactionTicket",
////            data: "{ TrxTicketNumber: '" + TrxTicketNumber + "',TrxResponse: '" + TrxResponse + "',TrxStatus: '" + TrxStatus + "',TrxUsername: '" + TrxUsername + "',TrxChannel: '" + TrxChannel + "', TrxThreadID: '" + TrxThreadID + "', TrxGenesysID: '" + TrxGenesysID + "', TrxEscalasiUnit:'" + TrxEscalasiValue + "', DispatchType:'" + TrxEscalasiType + "',TrxDispatchToLayer:'" + TrxDispatchToLayer + "'}",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            success: function (data) {
////                var json = JSON.parse(data.d);
////                var i, x = "";
////                var tblTickets = "";

////                for (i = 0; i < json.length; i++) {
////                    //alert(json[i].Result)
////                    if (json[i].Result === 'True') {
////                        console.log(json[i].msgSystem)
////                        //window.location.href = "?status=<%=Request.QueryString("status")%>&action=Edit";
////                        $.toast({
////                            heading: 'Hi lovely agent...',
////                            text: 'Your interaction has been added...',
////                            position: 'top-right',
////                            loaderBg: '#ff6849',
////                            icon: 'success',
////                            hideAfter: 3500,
////                            stack: 6
////                        });
////                    } else {
////                        return false;
////                    }

////                }
////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            }
////        })
////    } else {
////        return false;
////    }
////}
////function getWS_EscalationChannel(value) {
////}
////function encodeData(s) {
////    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
////}
//////All End
////// * Pentest *
////function showHistoryData(actionDo, sourceDo, socmedID, tableID, profileID){
////	$("#modal-center-history").modal('show');
////	var divDataListHistory = $('#dataListHistory');
////    if (actionDo == "History") {
////        $.ajax({
////            type: "POST",
////            url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
////            data: "{TrxID:'" + tableID + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK403'}",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            success: function (data) {

////                var json = JSON.parse(data.d);
////                var i, x, resultSourceChannel = "", dataHistoryResult = "", dataTag = "";
////                divDataListHistory.empty();
////                dataTag = "IGmentions";

////                for (i = 0; i < json.length; i++) {
////                    dataHistoryResult = '<div class="col-md-6 col-12"> ' +
////                        '<div class="media bg-primary mb-20"> ' +
////                        '<span class="avatar status-success"> ' +
////                        '<img class="avatar" src="' + json[i].MediaURL + '" alt="..."> ' +
////                        '</span> ' +
////                        '<div class="media-body"> ' +
////                        '<p><strong>' + json[i].FlagData + '-' + json[i].Username + '</strong> <time class="float-right" datetime="' + json[i].DateGetSosmed + '">' + json[i].DateGetSosmed + '</time></p> ' +
////                        '<p>' + json[i].Messages + '</p> ' +
////                        '<div class="d-inline-block pull-right mt-10"> ' +
////                        '<a href="#" onclick="generateLinkHistory(\'' + json[i].FlagData + '\',\'' + json[i].CommentID + '\')" class="btn btn-rounded btn-sm btn-success m-5">Generate</a> ' +
////                        '</div> ' +
////                        '<div class="d-inline-block pull-right mt-10"> ' +
////                        '<a href="#" onclick="directTicket(\'' + json[i].FlagData + '\',\'' + json[i].CommentID + '\')" class="btn btn-rounded btn-sm btn-info m-5">Direct Ticket</a> ' +
////                        '</div> ' +
////                        '</div> ' +
////                        '</div> ' +
////                        '</div>';
////                    divDataListHistory.append(dataHistoryResult);
////                }

////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            }
////        })

////		//var JenisKondisi = "AllWhereData";
////		//var divDataListHistory = $('#dataListHistory');
////		//var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "Sosmed_GetHistoryData", paramQuery: "where Username='"+ tableID +"'" });
////		//$.ajax({
////		//	type: "POST",
////		//	url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////		//	data: jsonText,
////		//	contentType: "application/json; charset=utf-8",
////		//	dataType: "json",
////		//	success: function (data) {
////		//		var json = JSON.parse(data.d);
////		//		var i, x, resultSourceChannel = "", dataHistoryResult = "", dataTag="";
////		//		divDataListHistory.empty();
////		//		dataTag="IGmentions";
////		//		for (i = 0; i < json.length; i++) {
////		//			dataHistoryResult = '<div class="col-md-6 col-12"> ' +
////		//									'<div class="media bg-primary mb-20"> ' +
////		//									  '<span class="avatar status-success"> ' +
////		//										'<img class="avatar" src="'+ json[i].MediaURL +'" alt="..."> ' +
////		//									  '</span> ' +
////		//									  '<div class="media-body"> ' +
////		//										'<p><strong>'+ json[i].FlagData +'-'+ json[i].Username +'</strong> <time class="float-right" datetime="'+ json[i].DateGetSosmed +'">'+ json[i].DateGetSosmed +'</time></p> ' +
////		//										'<p>'+ json[i].Messages +'</p> ' +
////		//										'<div class="d-inline-block pull-right mt-10"> ' +
////		//										  '<a href="#" onclick="generateLinkHistory(\''+ json[i].FlagData +'\',\''+ json[i].CommentID +'\')" class="btn btn-rounded btn-sm btn-success m-5">Generate</a> ' +
////		//										'</div> ' +
////		//										'<div class="d-inline-block pull-right mt-10"> ' +
////		//										  '<a href="#" onclick="directTicket(\''+ json[i].FlagData +'\',\''+ json[i].CommentID +'\')" class="btn btn-rounded btn-sm btn-info m-5">Direct Ticket</a> ' +
////		//										'</div> ' +
////		//									  '</div> ' +
////		//									'</div> ' +				
////		//								'</div>';
////		//			divDataListHistory.append(dataHistoryResult);
////		//		}

////		//	},
////		//	error: function (xmlHttpRequest, textStatus, errorThrown) {
////		//		console.log(xmlHttpRequest.responseText);
////		//		console.log(textStatus);
////		//		console.log(errorThrown);
////		//	}
////  //      })

////	}else{
////		console.log("Empty function condition!");
////	}
////}
////function showActionDo(actionDo, sourceDo, socmedID, tableID, profileID) {
////    //empty
////    //$("#txtNameSM").val("");
////    //$("#txtStatusSM").val("");
////    $("#txtProfileID").val("");
////    $("#txtEmailSM").val("");
////    //$("#txtSourceSM").val("");
////    $("#txtDescriptionSM").val("");
////    //end

////    $("#TxtSource").val(sourceDo);
////    $("#TxtActionDo").val(actionDo);
////    $("#TxtSocialID").val(socmedID);
////    $("#TxtTableID").val(tableID);
////    $("#txtConvID").val(socmedID);
////    $("#txtCustID").val(profileID);
////    $("#txtLabelProfileID").val(profileID)
////    $("#txtProfileID").val(profileID);
////    console.log("ID : " + socmedID);
////    console.log("Source : " + sourceDo);
////    console.log("Action : " + actionDo);

////    if (actionDo == "Ticket") {
////        getWS_CustomerProfile(actionDo, profileID);

////    } else if (actionDo == "Done") {

////        show_CustSyncSM(sourceDo, socmedID);
////    }else if (actionDo == "Messenger") {
////		generateLinkFromComments();
////		$("#modal-center").modal('show');

////    } else {

////        $("#modal-center").modal('show');
////    }

////}
////function PostPopup(val,val1){
////	if(val1=="hide"){
////		$("#modal-post").modal('hide');
////	}else{

////		if(val=="FBpost"){
////			cmbAccountSosmed();
////			$("#TxtActionDo_Post").val("FBpost");
////		}else{
////			cmbAccountSosmedIG();
////			$("#TxtActionDo_Post").val("IGpost");
////		}
////		$("#modal-post").modal('show');
////		$("#TxtSource_Post").val(0);

////		$("#TxtSocialID_Post").val(0);
////		$("#TxtTableID_Post").val(0);

////	}
////}
////// * Pentest *
////function cmbAccountSosmed() {
////    var cmbDataOtherChannel = $('#cmbAccountSosmed');
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
////        data: "{TrxID:'FB', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK400'}",
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {

////            var json = JSON.parse(data.d);
////            var i, x, resultSourceChannel = "", resultSourceChannelType = "";
////            for (i = 0; i < json.length; i++) {

////                resultSourceChannelType = '<option value="' + json[i].AccountID + '_' + json[i].AccountToken + '">' + json[i].AccountName + '</option>';
////                cmbDataOtherChannel.append(resultSourceChannelType);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////    //var JenisKondisi = "AllWhereData";
////    //var cmbDataOtherChannel = $('#cmbAccountSosmed');
////    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "UIDESK_SOCIAL_ACCOUNT", paramQuery: "where SocialMedia='FB'" });
////    //$.ajax({
////    //    type: "POST",
////    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////    //    data: jsonText,
////    //    contentType: "application/json; charset=utf-8",
////    //    dataType: "json",
////    //    success: function (data) {
////    //        var json = JSON.parse(data.d);
////    //        var i, x, resultSourceChannel = "", resultSourceChannelType = "";
////    //        for (i = 0; i < json.length; i++) {

////    //            resultSourceChannelType = '<option value="' + json[i].AccountID + '_' + json[i].AccountToken + '">' + json[i].AccountName + '</option>';
////    //            cmbDataOtherChannel.append(resultSourceChannelType);
////    //        }

////    //    },
////    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
////    //        console.log(xmlHttpRequest.responseText);
////    //        console.log(textStatus);
////    //        console.log(errorThrown);
////    //    }
////    //})
////}
////// * Pentest *
////function cmbAccountSosmedIG(){
////    var cmbDataOtherChannel = $('#cmbAccountSosmed');
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxSosialMedia",
////        data: "{TrxID:'IG', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK400'}",
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {

////            var json = JSON.parse(data.d);
////            var i, x, resultSourceChannel = "", resultSourceChannelType = "";
////            for (i = 0; i < json.length; i++) {

////                resultSourceChannelType = '<option value="' + json[i].AccountID + '_' + json[i].AccountToken + '">' + json[i].AccountName + '</option>';
////                cmbDataOtherChannel.append(resultSourceChannelType);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////    //var cmbDataOtherChannel = $('#cmbAccountSosmed');
////    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "UIDESK_SOCIAL_ACCOUNT", paramQuery: "where SocialMedia='IG'" });
////    //$.ajax({
////    //    type: "POST",
////    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////    //    data: jsonText,
////    //    contentType: "application/json; charset=utf-8",
////    //    dataType: "json",
////    //    success: function (data) {
////    //        var json = JSON.parse(data.d);
////    //        var i, x, resultSourceChannel = "", resultSourceChannelType = "";
////    //        for (i = 0; i < json.length; i++) {

////    //            resultSourceChannelType = '<option value="' + json[i].AccountID + '_' + json[i].AccountToken + '">' + json[i].AccountName + '</option>';
////    //            cmbDataOtherChannel.append(resultSourceChannelType);
////    //        }

////    //    },
////    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
////    //        console.log(xmlHttpRequest.responseText);
////    //        console.log(textStatus);
////    //        console.log(errorThrown);
////    //    }
////    //})
////}
////function showActionDoReplyComment(actionDo, sourceDo, socmedID, tableID, userComment) {
////    $("#TxtSource").val(sourceDo);
////    $("#TxtActionDo").val(actionDo);
////    $("#TxtSocialID").val(socmedID);
////    $("#TxtTableID").val(tableID);
////    console.log("ID : " + socmedID);
////    console.log("Source : " + sourceDo);
////    console.log("Action : " + actionDo);
////    console.log("userReplyTo : @" + userComment);
////    $("#ReasonWhy").val("userReplyTo : @" + userComment);
////    $("#modal-center").modal('show');
////}
////function ActionSaveActionDoMulti() {
////    var TxtActionDo = $("#TxtActionDo").val();
////	var TxtSource = $("#TxtSource").val();
////    if (TxtActionDo == "Reply") {
////		if(TxtSource=="FB"){
////			ActionReplyComments();
////		}else if(TxtSource=="FBPRIVATE"){
////			ActionReplyCommentsPrivateDM();
////		}else if(TxtSource=="IGPRIVATE"){
////			ActionReplyCommentsPrivateIG();
////		}else if(TxtSource=="IG"){
////			ActionReplyCommentsIG();
////		}else if(TxtSource=="IGmentionsPublic"){
////			ActionPostReplyIGmentionsPublic();
////		}else if(TxtSource=="mentions"){
////			console.log("Ini FB Mentions");
////			ActionReplyCommentsMentions();
////		}
////    }else if (TxtActionDo == "Comments") {
////		if(TxtSource=="FB"){
////			ActionReplyComments();
////		}else if(TxtSource=="IG"){
////			ActionPostCommentsIG();
////		}else if(TxtSource=="IGMentionsPublic"){
////			ActionPostCommentsIGmentions();
////		}else if(TxtSource=="mentionsIG"){
////			console.log("Ini IG Mentions");
////			ActionPostCommentsIGmentionsPublic();
////		}else if(TxtSource=="mentions"){
////			console.log("Ini FB Mentions");
////			ActionReplyCommentsMentions();
////		}else if(TxtSource=="TW"){
////			console.log("Ini TW Mentions");
////			ActionReplyComments_TW();
////		}
////    }else if (TxtActionDo == "Messenger") {
////		console.log("Now Send Inox to facebook customer header");
////		if(TxtSource=="FB"){
////			ActionReplyInboxMessages();
////		}else if(TxtSource=="mentions"){
////			 console.log("send PM to FB");
////			ActionReplyInboxMessages();
////		}else if(TxtSource=="IG"){
////			ActionReplyInboxDM();
////		}else if(TxtSource=="TW"){
////			ActionReplyInboxDM_TW();
////		}
////	}else {
////        ActionSaveActionDo();
////    }
////}
////function ActionPostCommentsFBmentions(){
////	console.log("Ini FB Mentions");
////}
////function ActionReplyCommentsPrivateIG(){	
////	$("#LoaderPage").show();
////    var agree = confirm("Great, lets reply IG To DM this ?");
////	var jsonText="";
////	var urlPost="";
////    if (agree) {
////        console.log("Success post...");

////			console.log("Ini send message from All Messages");
////			jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), recipientID: $("#txtConvID").val(), msgNya: encodeURIComponent($("#ReasonWhy").val()), tokenNya: $("#SM_AccountToken").val() });
////			urlPost = "apireplyinbox.php"

////		console.log($("#txtMessageAgent").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/"+urlPost,
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                //var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////				var json = JSON.parse(response.d);
////                console.log(json[0].Result);
////				if(json[0].Result=="True"){
////					console.log("Do_Log_Reply");
////					ActionLogSocialMedia();
////				}
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
////        return false;
////    }
////}
////function ActionPostSocialMedia(){
////	console.log("hai submit Post..." + $("#cmbAccountSosmed").val());
////	let text = $("#cmbAccountSosmed").val();
////	const myArray = text.split("_");
////	var channelID = $("#TxtActionDo_Post").val();
////	console.log("flag " + $("#TxtActionDo_Post").val());
////	if(channelID=="FBpost"){
////	$("#LoaderPage").show();
////		var agree = confirm("Great, lets post this FB?");
////		var jsonText="";
////		var urlPost="";
////		if (agree) {
////			console.log("true go...");

////				console.log("Ini send post from uidesk");
////				jsonText = JSON.stringify({accountIDNya: myArray[0], msgNya: $("#ReasonWhy_Post").val(), tokenNya: myArray[1]});
////				urlPost = "apipostfb.php"

////			console.log(myArray[0]);
////			console.log(myArray[1]);
////			//var valnoWA = "628119970460";//$('#tglKejadian').val();
////			$.ajax({
////				type: "POST",
////				url: "https://triciptaintegra.com/graphapi/"+urlPost,
////				contentType: "application/json; charset=utf-8",
////				data: jsonText,
////				dataType: "json",
////				success: function (response) {
////					var json = JSON.parse(response.d);
////					//alert(json.ResultNya);
////					console.log(response.d);
////				}, complete: function () {
////					//back to normal!
////					$("#LoaderPage").hide();

////					console.log("Success Post...");
////				},
////				error: function (xhr, ajaxOptions, thrownError) {
////					$("#LoaderPage").hide();
////					console.log(xhr.status);
////					alert(xhr.responseText);
////					console.log(thrownError);
////				}
////			});
////			$("#LoaderPage").hide();
////			return false;
////		} else {
////			console.log("Ups Canceling POST..." + myArray[0]);
////			return false;
////		}
////	}else{
////		$("#LoaderPage").show();
////		var agree = confirm("Great, lets post this IG ?");
////		var jsonText="";
////		var urlPost="";
////		if (agree) {
////			console.log("true go...");

////				console.log("Ini send post from uidesk");
////				jsonText = JSON.stringify({accountIDNya: myArray[0], msgNya: $("#ReasonWhy_Post").val(), tokenNya: myArray[1]});
////				urlPost = "apipostig.php"

////			console.log(myArray[0]);
////			console.log(myArray[1]);
////			//var valnoWA = "628119970460";//$('#tglKejadian').val();
////			$.ajax({
////				type: "POST",
////				url: "https://triciptaintegra.com/graphapi/"+urlPost,
////				contentType: "application/json; charset=utf-8",
////				data: jsonText,
////				dataType: "json",
////				success: function (response) {
////					var json = JSON.parse(response.d);
////					//alert(json.ResultNya);
////					console.log("allJson : " + json);
////				}, complete: function () {
////					//back to normal!
////					$("#LoaderPage").hide();

////					console.log("Success Post...");
////				},
////				error: function (xhr, ajaxOptions, thrownError) {
////					$("#LoaderPage").hide();
////					alert(xhr.status);
////					alert(xhr.responseText);
////					alert(thrownError);
////				}
////			});
////			$("#LoaderPage").hide();
////			return false;
////		} else {
////			console.log("Ups Canceling POST..." + myArray[0]);
////			return false;
////		}
////	}
////}
////function ActionReplyCommentsPrivateDM(){
////    console.log("hai submit Reply Inbox..." + $("#txtRecipientID").val() + "-" + $("#SM_AccountToken").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets reply this ?");
////	var jsonText="";
////	var urlPost="";
////    if (agree) {
////        console.log("Success post...");

////			console.log("Ini send message from comments & More visitors to private");
////			jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#SM_AccountID").val(), recipientID: $("#txtConvID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
////			urlPost = "apireplyinboxcommentsprivate.php"

////		console.log($("#txtMessageAgent").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/"+urlPost,
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                //var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////				var json = JSON.parse(response.d);
////                console.log(json[0].Result);
////				if(json[0].Result=="True"){
////					console.log("Do_Log_Reply");
////					ActionLogSocialMedia();
////				}
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                console.log(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
////        return false;
////    }
////}
////function escapeJSON(string) {
////    return string.replace(/[\n"\&\r\t\b\f]/g, '\\n');
////}
////function ActionReplyInboxMessages(){
////    console.log("hai submit Reply Inbox..." + $("#txtRecipientID").val() + "-" + $("#SM_AccountToken").val() + "-" + $("#TxtActionDo").val() + "-" + $("#TxtSource").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets reply this ?");
////	var jsonText="";
////	var urlPost="";
////    if (agree) {
////        console.log("Success post...");
////        if($("#TxtActionDo").val()=="Messenger" && $("#TxtSource").val()=="mentionsXXXX"){
////			console.log("Ini send message from comments & More IG");
////			jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), recipientID: $("#txtRecipientID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
////			urlPost = "graphapi/apireplyinboxcomments.php"
////		}else if($("#TxtActionDo").val()=="Messenger" && $("#TxtSource").val()=="mentions"){
////			console.log("Ini send message from Mentions FB");
////			var getAccountIDCust = $("#TxtSocialID").val().split('_');
////			$("#TxtSocialID").val(getAccountIDCust[0]);
////			//#txtRecipientID <- sebelumnya pake ini
////			jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), recipientID: getAccountIDCust[0], msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
////			console.log(escapeJSON($("#ReasonWhy").val()));
////			urlPost = "graphapi/apireplyinbox.php"
////		}else if($("#TxtActionDo").val()=="Messenger" && $("#TxtSource").val()=="msgtw"){
////			console.log("Ini send message from TW");
////			jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), user_id: $("#txtRecipientID").val(), message: $("#txtReplyMessenger").val(), tokenNya: $("#SM_AccountToken").val() });
////			urlPost = "graphapi/twitapi/dm/send.php";
////		}else{
////			console.log("Ini send message from All Messages Yes");
////			jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#SM_AccountID").val(), recipientID: $("#txtRecipientID").val(), msgNya: $("#txtReplyMessenger").val(), tokenNya: $("#SM_AccountToken").val() });
////			console.log(escapeJSON($("#txtReplyMessenger").val()));
////			urlPost = "graphapi/apireplyinbox.php";
////		}
////		//console.log($("#txtMessageAgent").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////		var json;
////		console.log("https://triciptaintegra.com/"+urlPost);
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/"+urlPost,
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                json = response;
////               console.log(json);
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
////        return false;
////    }
////}
////function ActionReplyInboxDM_TW(){
////    console.log("hai submit Reply Inbox TW..." + $("#txtRecipientID").val() + "-" + $("#SM_AccountToken").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets reply DM this ?");
////	var jsonText="";
////	var urlPost="";
////    if (agree) {
////			console.log("Ini send message from All Messages");
////			jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), user_id: $("#txtRecipientID").val(), message: encodeURIComponent($("#ReasonWhy").val()), tokenNya: $("#SM_AccountToken").val() });


////		console.log($("#txtMessageAgent").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/twitapi/dm/send.php ",
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
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
////        return false;
////    }
////}
////function ActionReplyInboxDM(){
////    console.log("hai submit Reply Inbox..." + $("#txtRecipientID").val() + "-" + $("#SM_AccountToken").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets reply DM this ?");
////	var jsonText="";
////	var urlPost="";
////    if (agree) {
////			console.log("Ini send message from All Messages");
////			jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), recipientID: $("#txtRecipientID").val(), msgNya: encodeURIComponent($("#ReasonWhy").val()), tokenNya: $("#SM_AccountToken").val() });
////			urlPost = "apireplyinbox.php"

////		console.log($("#txtMessageAgent").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/"+urlPost,
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
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling Reply..." + $("#txtRecipientID").val());
////        return false;
////    }
////}
////function ActionReplyCommentsMentions(){
////	console.log("hai submit Reply mentions..." + $("#TxtActionDo").val() + "-" + $("#TxtSocialID").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets post your campaign ?");
////    if (agree) {
////        console.log("Success post...");
////        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), PostID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
////        //console.log($("#TxtMsgNya").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/apireplyfbmentions.php",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                //var json = JSON.parse(response.d);
////                //alert(json);
////				var json = JSON.parse(response.d);
////                console.log(json[0].Result);
////				if(json[0].Result=="True"){
////					console.log("Do_Log_Reply");
////					ActionLogSocialMedia();
////				}
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
////}
////function ActionReplyComments_TW() {
////    console.log("hai submit Reply TW..." + $("#TxtActionDo").val() + "-" + $("#TxtSocialID").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets post your tweet ?");
////    if (agree) {
////        console.log("Success post...");
////        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), tweet_id: $("#TxtSocialID").val(), PostID: $("#TxtSocialID").val(), status: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
////        //console.log($("#TxtMsgNya").val()); in_reply_to_tweet_id msgNya
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            //url: "https://triciptaintegra.com/graphapi/apireplytw_tweet.php",
////			url: "https://triciptaintegra.com/graphapi/twitapi/tweet/reply.php",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                var json = response;
////				console.log(json);
////                //alert(json.ResultNya);
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
////}
//////tinyMCE.get('ReasonWhy').getContent()
////function ActionLogSocialMedia(){
////	var form_data = JSON.stringify({ TrxIDSocialMedia: $("#txtConvID").val(), TrxChannel: $("#TxtSource").val(), TrxChannelDesc: $("#TxtActionDo").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAccount: $("#SM_AccountID").val(), TrxStatus: $("#ReasonWhy").val()});
////                console.log("form_data : " + form_data);
////                $.ajax({
////                    url: "asmx/3_Channel_Sosmed_Log.asmx/InsertLogSocialMediaInteraction",
////                    method: "POST",
////                    contentType: "application/json; charset=utf-8",
////                    dataType: "json",
////                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////                    data: form_data,
////                    success: function (data) {
////                        console.log("Function Log Data : " + form_data)

////                        var json = JSON.parse(data.d);
////						console.log(data.d);
////                        console.log(json[0].ResultNya);
////                        console.log(json[0].Valuenya);


////                    },
////                    error: function (xmlHttpRequest, textStatus, errorThrown) {
////                        console.log(xmlHttpRequest.responseText);
////                        console.log(textStatus);
////                        console.log(errorThrown);
////                    },
////                    complete: function () {

////                    }
////                });
////}
////function ActionReplyComments() {
////    console.log("hai submit Reply..." + $("#ReasonWhy").val() + "-" + $("#TxtSocialID").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets reply this ?");
////    if (agree) {
////        console.log("Success post...");
////        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), PostID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
////        //console.log($("#TxtMsgNya").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/apireplyfb.php",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////				//console.log(response.d.Result);
////                var json = JSON.parse(response.d);
////                console.log(json[0].Result);
////				if(json[0].Result=="True"){
////					console.log("Do_Log_Reply");
////					ActionLogSocialMedia();
////				}
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
////}
////function ActionPostReplyIGmentionsPublic(){
////	console.log("hai submit Reply Mentions Public..." + $("#txtIGaccountID").val() + "-Comment ID : " + $("#TxtSocialID").val() +"-Media ID : " + $("#TxtTableID").val() + "-" + $("#TxtSource").val() +"-"+ $("#SM_AccountToken").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets post your comments ?");
////    if (agree) {
////        console.log("Success post...");
////        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), AccountID: $("#SM_AccountID").val(), MediaID: $("#TxtTableID").val(), CommentID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val() + $("#SM_AccountName").val(), tokenNya: $("#SM_AccountToken").val() });
////        //console.log($("#TxtMsgNya").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/apireplyigmentionspublic.php",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                //var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////				var json = JSON.parse(response.d);
////                console.log(json[0].Result);
////				if(json[0].Result=="True"){
////					console.log("Do_Log_Reply");
////					ActionLogSocialMedia();
////				}
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
////}
////function ActionPostCommentsIGmentionsPublic(){
////	console.log("hai submit Comments Mentions Public..." + $("#txtIGaccountID").val() + "-" + $("#TxtSocialID").val() + "-" + $("#TxtSource").val() +"-"+ $("#SM_AccountToken").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets post your comments ?");
////    if (agree) {
////        console.log("Success post...");
////        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), AccountID: $("#SM_AccountID").val(), MediaID: $("#TxtSocialID").val(),CommentID: $("#TxtTableID").val(), msgNya: $("#ReasonWhy").val() + $("#SM_AccountName").val(), tokenNya: $("#SM_AccountToken").val() });
////        //console.log($("#TxtMsgNya").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/apireplyigmentionspublic.php",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                //var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////				var json = JSON.parse(response.d);
////                console.log(json[0].Result);
////				if(json[0].Result=="True"){
////					console.log("Do_Log_Reply");
////					ActionLogSocialMedia();
////				}
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
////}
////function ActionPostCommentsIGmentions(){
////	console.log("hai submit Comments Mentions Public..." + $("#txtIGaccountID").val() + "-" + $("#TxtSocialID").val() + "-" + $("#TxtSource").val() +"-"+ $("#SM_AccountToken").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets post your comments ?");
////    if (agree) {
////        console.log("Success post...");
////        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), AccountID: $("#txtIGaccountID").val(), MediaID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
////        //console.log($("#TxtMsgNya").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/apireplyigmentions.php",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                //var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////				var json = JSON.parse(response.d);
////                console.log(json[0].Result);
////				if(json[0].Result=="True"){
////					console.log("Do_Log_Reply");
////					ActionLogSocialMedia();
////				}
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
////}
////function ActionPostCommentsIG() {
////    console.log("hai submit Comments..." + $("#TxtActionDo").val() + "-" + $("#TxtSocialID").val() + "-" + $("#TxtSource").val() +"-"+ $("#SM_AccountToken").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets post your comments ?");
////    if (agree) {
////        console.log("Success post...");
////        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), PostID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
////        console.log($("#TxtMsgNya").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/apicommentsig.php",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                //var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////				var json = JSON.parse(response.d);
////                console.log(json[0].Result);
////				if(json[0].Result=="True"){
////					console.log("Do_Log_Reply");
////					ActionLogSocialMedia();
////				}
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
////}
////function ActionReplyCommentsIG() {
////    console.log("hai submit Reply..." + $("#TxtActionDo").val() + "-" + $("#TxtSocialID").val() + "-" + $("#TxtSource").val() +"-"+ $("#SM_AccountToken").val());

////    $("#LoaderPage").show();
////    var agree = confirm("Great, lets post your campaign ?");
////    if (agree) {
////        console.log("Success post...");
////        var jsonText = JSON.stringify({ hookNya: $("#SM_Webhook").val(), IdTable: $("#TxtTableID").val(), PostID: $("#TxtSocialID").val(), msgNya: $("#ReasonWhy").val(), tokenNya: $("#SM_AccountToken").val() });
////        //console.log($("#TxtMsgNya").val());
////        //var valnoWA = "628119970460";//$('#tglKejadian').val();
////        $.ajax({
////            type: "POST",
////            url: "https://triciptaintegra.com/graphapi/apireplyig.php",
////            contentType: "application/json; charset=utf-8",
////            data: jsonText,
////            dataType: "json",
////            success: function (response) {
////                //var json = JSON.parse(response.d);
////                //alert(json.ResultNya);
////				var json = JSON.parse(response.d);
////                console.log(json[0].Result);
////				if(json[0].Result=="True"){
////					console.log("Do_Log_Reply");
////					ActionLogSocialMedia();
////				}
////            }, complete: function () {
////                //back to normal!
////                $("#LoaderPage").hide();

////                console.log("Success Post...");
////            },
////            error: function (xhr, ajaxOptions, thrownError) {
////                $("#LoaderPage").hide();
////                alert(xhr.status);
////                alert(xhr.responseText);
////                console.log(thrownError);
////            }
////        });
////        $("#LoaderPage").hide();
////        return false;
////    } else {
////        console.log("Ups Canceling post..." + $("#cmb_TemplateBlast").val());
////        return false;
////    }
////}
////function ActionSaveActionDo() {
////    console.log("hai submit Post..." + $("#cmb_TemplateBlast").val());
////    var reasonWhy = $("#ReasonWhy").val();
////    var userCreate = $("#hd_sessionLogin").val();
////    var TxtSource = $("#TxtSource").val();
////    var TxtActionDo = $("#TxtActionDo").val();
////    var TxtSocialID = $("#TxtSocialID").val();
////    console.log(reasonWhy);
////    console.log(userCreate);
////    console.log(TxtSource);
////    console.log(TxtActionDo);
////    console.log(TxtSocialID);

////    if ($("#ReasonWhy").val() == "") {
////        swal("Reason note is empty")
////        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>Internal note</b> is empty")
////        return false
////    }
////    swal({
////        title: "Do you want to process?",
////        //text: "Once deleted, you will not be able to recover this imaginary file!",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////        .then((willDelete) => {
////            if (willDelete) {

////                var form_data = JSON.stringify({ TrxReason: reasonWhy, TrxSocmedID: TxtSocialID, TrxSocmed: TxtSource, TrxSocmedSource: '', TrxSocmedSourceDetail: '', TrxSocmedActionDo: TxtActionDo, TrxUserName: userCreate });
////                console.log("form_data : " + form_data);
////                $.ajax({
////                    url: "3_Channel_Sosmed.asmx/InsertSocialMediaReason",
////                    method: "POST",
////                    contentType: "application/json; charset=utf-8",
////                    dataType: "json",
////                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////                    data: form_data,
////                    success: function (data) {
////                        console.log("Function ActionInternalNote : " + form_data)

////                        var json = JSON.parse(data.d);
////                        console.log(json[0].Result);
////                        console.log(json[0].msgSystem);
////                        if (json[0].Result == "False Data Note Reason Social") {
////                            var TrxMessage = json[0].msgSystem;
////                            AutoValidasiWarningErr($("#hd_sessionLogin").val(), TrxMessage);
////                            $("#modal-center").modal('hide');
////                        } else {
////                            var TrxMessage = 'Your data <b>Social Media Reason</b> has been save';
////                            AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
////                            $("#modal-center").modal('hide');
////                            swal("save data has been success", {
////                                icon: "success",
////                            });
////                        }

////                    },
////                    error: function (xmlHttpRequest, textStatus, errorThrown) {
////                        console.log(xmlHttpRequest.responseText);
////                        console.log(textStatus);
////                        console.log(errorThrown);
////                    },
////                    complete: function () {

////                    }
////                });


////            } else {
////                //swal("Your imaginary file is safe!");
////                $("#modal-center").modal('hide');
////            }
////        });
////}
//////Send Message WA
////function WA_ActionReply(varNomor, varMsgNya, varToUser, varMediaUrl) {

////    console.log("hai submit Reply WA...");
////    $("#LoaderPage").show();
////    console.log("Success post...");

////    var jsonText = JSON.stringify({ nomor: varNomor, msgbody: varMsgNya, toUser: varToUser, mediaURL: varMediaUrl });
////    $.ajax({
////        type: "POST",
////        url: "3_Channel_Sosmed.asmx/MessageWAreply",
////        contentType: "application/json; charset=utf-8",
////        data: jsonText,
////        dataType: "json",
////        success: function (response) {
////            var json = JSON.parse(response.d);
////            //alert(json.ResultNya);
////        }, complete: function () {
////            //back to normal!
////            $("#LoaderPage").hide();
////            $('#txtFileName').val("");
////            $('#txtMessageAgent').val("");
////            console.log("Success Post...User" + varToUser + "-nomor" + varNomor);
////            getWS_ContentInboxMessage('WA', varToUser);
////            $("#slimScrollDiv").animate({ scrollTop: $('#slimScrollDiv').prop("scrollHeight") }, 1000);
////        },
////        error: function (xhr, ajaxOptions, thrownError) {
////            $("#LoaderPage").hide();
////            alert(xhr.status);
////            alert(xhr.responseText);
////            console.log(thrownError);
////        }
////    });
////    $("#LoaderPage").hide();
////    return false;

////}
////function SendMessagesNya() {
////    var messageBody = $("#txtMessageAgent").val();
////    var messageTo = $("#txtMessageTo").val();
////    var mediaURL = "http://omni.uidesk.id/publishomni/" + $("#txtFileName").val();
////    console.log("Send Message Go..." + messageBody + "-" + messageTo + " File URL : " + mediaURL);
////    var myHeaders = new Headers();
////    myHeaders.append("Api-key", apiKeyWA);
////    myHeaders.append("Content-Type", "application/json");
////    myHeaders.append("Accept", "application/json");
////    var mediaKondisi = 0;
////    if (mediaURL == "http://omni.uidesk.id/publishomni/") {
////        console.log("tanpa Media");
////        mediaKondisi = "";
////        mediaURL = "NO";
////    } else {
////        console.log("dengan Media")
////        mediaKondisi = "&media_url=" + mediaURL;
////    }

////    var requestOptions = {
////        method: 'POST',
////        headers: myHeaders,
////        redirect: 'follow'
////    };

////    fetch("http://omni.uidesk.id/wagent/api/whatsapp/send/message?id="+ idWA +"&nomor="+ noWA +"&msg=" + messageBody + "&to=" + messageTo + mediaKondisi + "", requestOptions)
////        .then(response => response.text())
////        .then(
////            result => console.log(result),
////            WA_ActionReply("UIDESK", messageBody, messageTo, mediaURL)
////        )
////        .catch(error => console.log('error', error));
////}
////function thisFileUpload() {
////    document.getElementById("files").click();
////};
//////* Upload Attachment Ticket *//
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

////    var files = $(this).prop("files");
////    var data = new FormData();

////    var request;
////    var result;
////    var modal = $(this).closest(".modal");
////    var itemid = modal.data("itemid");

////    for (var i = 0; i < files.length; i++) {

////        var filesizing = this.files[0].size / 1024 / 1024
////        if (filesizing > 2) {
////            swal(
////                '',
////                'Please upload file less than 2 MB. Thanks!',
////                'error'
////            ).then(function () {
////                $(this).val('');
////                return false;
////            });
////            return false;
////        }

////        var filename = this.files[0].name
////        var fileextension = filename.split('.').pop();
////        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP" || fileextension == "rar" || fileextension == "zip" || fileextension == "txt") {

////        } else {
////            swal(
////                '',
////                'File extension not allowed !',
////                'error'
////            ).then(function () {
////                return false;
////            });
////            return false;
////        }

////        data.append("id", "617367367613876138");
////        data.append("file", files[i]);
////        data.append("Username", $("#hd_sessionLogin").val());
////        data.append("numberid", getParameterByName('numberid'));
////        data.append("customerid", $("#hd_customerID").val());

////        request = $.ajax({

////            type: "POST",
////            enctype: 'multipart/form-data',
////            url: "3_Channel_Sosmed.asmx/UploadFileAttachmentTicket",
////            data: data,
////            // dataType: "json",
////            contentType: false,
////            processData: false,

////        });
////        request.done(function (response) {
////            $(".hiddenX").hide();
////            $("#removeUpload").show();
////            // result = response.d;
////            $("#txtFileName").val($(response).find("FilePath").text() + $(response).find("Guid").text() + $(response).find("FileExt").text());
////            console.log("Success");
////            console.log($(response).find("Guid").text());
////            console.log($(response).find("FileExt").text());
////            console.log($(response).find("FilePath").text());

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
//////End
////function AutoValidasiWarningErr(TrxCreatedby, Message) {
////    $.toast({
////        heading: '<b>System Error ' + TrxCreatedby + '</b>',
////        text: '' + Message + '',
////        position: 'top-left',
////        loaderBg: '#ff6849',
////        icon: 'warning',
////        hideAfter: 20500,
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