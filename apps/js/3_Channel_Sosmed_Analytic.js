$(document).ready(function () {

    $("#LoaderPage").hide();
    $("#LoaderPageChat").hide();
    $("#commentsDiv").hide();
    $("#messagesDiv").hide();
    getWS_DataInbox(getParameterByName('flagto'), getParameterByName('agentlogin'));
    showDivContent(getParameterByName('flagto')); 
    console.log("FlagTo " + getParameterByName('flagto'));
    console.log("AgentLogin " + getParameterByName('agentlogin'));

});
function showDivContent(flagto) {
    if (flagto == "msg") {
        $("#messagesDiv").show();
        getWS_GetDataListMessage(getParameterByName('flagto'), getParameterByName('agentlogin'));
    } else {
        $("#commentsDiv").show();

    }
}
function getDataChartBarPostID(id) {
    var jsonText = JSON.stringify({ postid: id, FlagTo: 'FB' });
     $.ajax({
        type: "POST",
         url: "asmx/3_Channel_Sosmed_Analytic.asmx/GetDataChartBarHashtags",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListInboxSocialMedia = "";
            //var jsonText = [{ FlagTo: '10', AgentLogin: 'y' }, { FlagToX: '12', AgentLogin: 'y' }];
            var jsonText = 0;
            var data = [];
            
            for (i = 0; i < json.length; i++) {

                //var milisegundos = parseInt(json[i].DateGetSosmed.replace("/Date(", "").replace(")/", ""));
                //var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                //var getDateBirth = newDate.split('/');
               // console.log(json[i]);
                //jsonText.push(json[i]);
                data.push(json[i]);
            }
            console.log(data);
            //UIDESK Create Chart for POST Get Response #(Hashtag)
               
                /*['#suka', 3],
                ['#tidakSuka', 20],
                ['#biasaSaja', 30]*/
            //console.log(jsonText);
            jsonText = data;
                var a = c3.generate({
                    bindto: "#data-post-chart",
                    size: { height: 350 },
                    data: {
                        json: jsonText,
                        keys: {
                            //               x: 'name', // it's possible to specify 'x' when category axis
                            x: 'Hashtags',
                            value: ['TotalNya'],
                        },
                        type: 'bar',
                        color: function (color, d) {
                            var lst = ['#81c784', '#a5d6a7', '#c8e6c9', '#f44336', '#1b5e20', '#388e3c', '#4caf50']
                            return (lst[d.index]);

                        }
                    },
                    legend: {
                        show: false
                    },
                    axis: {
                        x: {
                            type: 'category',
                            tick: { centered: true },

                        }
                    },

                    bar: {
                        width: {
                            ratio: 1
                        }
                    },

                    tooltip: {
                        format: {
                            title: function (d) { return 'Test'; },
                            value: function (value, ratio, id) {
                                return value;
                            }
                        }
                    }

                });
	        //End
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getWS_DataProfile(value) {
    var selectedValue = value;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK53'}",
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
}
function getWS_GetDataListMessage(flagto, agentlogin) {
  console.log("Start Go to Data Messages User");
    var HTMLresultListInboxSocialMedia = $('#HTMLcontent_listuser_inbox');
    var jsonText = JSON.stringify({ FlagTo: flagto, postid: agentlogin });

    $.ajax({
        type: "POST",
        url: "3_Channel_Sosmed.asmx/GetDataListMessage",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListInboxSocialMedia = "";
            HTMLresultListInboxSocialMedia.empty();
            for (i = 0; i < json.length; i++) {

                //var milisegundos = parseInt(json[i].DateGetSosmed.replace("/Date(", "").replace(")/", ""));
                //var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                //var getDateBirth = newDate.split('/');
                console.log(json[i]);
                var stringSenderID = json[i].ProfileID;
                var stringProfileName = json[i].ProfileName;
                var StringIcon = json[i].Messages;
                var StringPIC = json[i].FileURL;

                var lengthName = 11;
                var length = 20;

                var trimmedStringMessages = stringProfileName.length > length ?
                    stringProfileName.substring(0, length - 3) + "..." :
                    stringProfileName;

                var flagToNya = "";
                if (StringIcon == "FacebookMsg") {
                    StringIcon = "messengerfb.png";
                    flagToNya = "FB";
                } else if (StringIcon == "message_create") {
                    StringIcon = "twicon.png";
                    flagToNya = "TW";
                }

                resultListInboxSocialMedia = '<div class="media py-10 px-0 align-items-center"> ' +
                    '<a class="avatar avatar-lg" onclick="getWS_ContentInboxMessage(\'' + flagToNya + '\',\'' + stringSenderID + '\')"> ' +
                    '<img src="' + StringPIC + '" alt="..." width="32"> ' +
                    '</a> ' +
                    '<div class="media-body"> ' +
                    '<p class="font-size-16"> ' +
                    '<a class="hover-primary" onclick="getWS_ContentInboxMessage(\'' + flagToNya + '\',\'' + stringSenderID + '\')">' + trimmedStringMessages + '</a> ' +
                    '</p> ' +
                    '</div> ' +
                    '<div class="media-right"> ' +
                    '<img src="' + StringIcon + '"  alt="..." width="24px">' +
                    '</div> ' +
                    '</div>'

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




}
function getWS_ContentInboxMessage(flagto, value) {
    console.log("Go to ContentInboxMessage Value: " + value);
    $("#LoaderPageChat").show();
    $("#HTMLcontent_inboxMessage").hide();
    $("#HTMLcontent_inboxCommentMessage").empty();

    var jsonText;
    var HTMLcontent_header_inbox = $("#HTMLcontent_header_inboxMessage");
    var HTMLcontent_inbox = $("#HTMLcontent_inboxMessage");
    jsonText = JSON.stringify({ FlagTo: flagto, postid: value });
    $.ajax({
        type: "POST",
        url: "3_Channel_Sosmed.asmx/GetDataContentInboxMessage",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListContentInboxSocialMedia = "", resultListContentHeaderSocialMedia = "";
            HTMLcontent_header_inbox.empty();
            HTMLcontent_inbox.empty();
            for (i = 0; i < 1; i++) {
                var stringMessages = json[i].Messages;
                var stringName = json[i].ProfileName;
                var stringDate = json[i].DateGetSosmed;
                var stringStatusType = json[i].StatusType;
                var stringTotal = json[i].Total;
                var profilePIC = json[i].DetailSosmed;
                getWS_ProfileMessages(profilePIC, stringName);
                resultListContentHeaderSocialMedia = '<div class="media align-items-top p-0">' +
                    '<a class="avatar avatar-lg status-success mx-0" href="#">' +
                    '<img src="' + profilePIC + '" class="rounded-circle" alt="...">' +
                    '</a>' +
                    '<div class="d-lg-flex d-block justify-content-between align-items-center w-p100">' +
                    '<div class="media-body mb-lg-0 mb-20">' +
                    '<p class="font-size-16">' +
                    '<a class="hover-primary" href="#"><strong>' + stringName + '</strong></a>' +
                    '</p>' +
                    '<p class="font-size-12">' + stringDate + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<ul class="list-inline mb-0 font-size-18"> ' +
                    '<li class="list-inline-item"><a href="#" class="hover-primary"><i class="fa fa-phone"></i></a></li> ' +
                    '<li class="list-inline-item" > <a href="#" class="hover-primary" data-toggle="modal" data-target="#modal-right"><i class="fa fa-info-circle"></i></a></li > ' +
                    '<li class="list-inline-item" > <a href="#" class="hover-primary"><i class="fa fa-cog"></i></a></li > ' +
                    '<li class="list-inline-item" > <a href="#" class="hover-primary"><i class="fa fa-star"></i></a></li > ' +
                    '<li class="list-inline-item" > <a href="#" class="hover-primary"><i class="fa fa-flag-o"></i></a></li > ' +
                    '</ul> ' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                HTMLcontent_header_inbox.append(resultListContentHeaderSocialMedia);
            }
            for (i = 0; i < json.length; i++) {
                //alert(json[i].UserCreate);
                console.log(json[i]);
                var stringMessages = json[i].Messages;
                var stringName = json[i].ProfileName;
                var stringDate = json[i].DateGetSosmed;
                var stringStatusType = json[i].StatusType;
                var stringTotal = json[i].Total;
                var flagToChat = json[i].FlagTo;
                var profilePIC = json[i].DetailSosmed;
                if (flagToChat == "Customer") {
                    resultListContentInboxSocialMedia =
                        '<div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80"> ' +
                        '<div class="position-absolute pt-1 pr-2 r-0"> ' +
                        '<span class="text-extra-small text-muted">' + stringDate + '</span> ' +
                        '</div> ' +
                        '<div class="card-body"> ' +
                        '<div class="d-flex flex-row pb-2"> ' +
                        '<a class="d-flex" href="#"> ' +
                        '<img alt="Profile" src="' + profilePIC + '" class="avatar mr-10"> ' +
                        '</a> ' +
                        '<div class="d-flex flex-grow-1 min-width-zero"> ' +
                        '<div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between"> ' +
                        '<div class="min-width-zero"> ' +
                        '<p class="mb-0 font-size-16 text-dark">' + stringName + '</p> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div> ' +
                        '<div class="chat-text-left pl-55"> ' +
                        '<p class="mb-0 text-semi-muted">' + stringMessages + '</p> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div><div class="clearfix"></div>';
                } else if (flagToChat == "Company") {
                    resultListContentInboxSocialMedia =
                        '<div class="card d-inline-block mb-3 float-right mr-2 bg-primary max-w-p80"> ' +
                        '<div class="position-absolute pt-1 pl-2 l-0"> ' +
                        '<span class="text-extra-small">' + stringDate + '</span> ' +
                        '</div> ' +
                        '<div class="card-body"> ' +
                        '<div class="d-flex flex-row pb-2"> ' +
                        '<div class="d-flex flex-grow-1 justify-content-end"> ' +
                        '<div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between"> ' +
                        '<div> ' +
                        '<p class="mb-0 font-size-16">' + stringName + '</p> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div> ' +
                        '<a class="d-flex" href="#"> ' +
                        '<img alt="Profile" src="' + profilePIC + '" class="avatar ml-10"> ' +
                        '</a> ' +
                        '</div> ' +
                        '<div class="chat-text-left pr-50"> ' +
                        '<p class="mb-0 text-semi-muted">' + stringMessages + '</p> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div><div class="clearfix"></div>';
                }
                $("#LoaderPageChat").hide();
                HTMLcontent_inbox.show();
                HTMLcontent_inbox.append(resultListContentInboxSocialMedia);
            }

            //getWS_PhotoSocialMedia(value);

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
        url: "3_Channel_Sosmed.asmx/GetDataContentCommentPhoto",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

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
                CarouselFileURL += '<div class="carousel-item ' + activeImage + '"> ' +
                    '<img src="' + json[i].FileURL + '" class="img-fluid" alt="slide-' + i + '"> ' +
                    '</div> '

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
function getWS_DataInbox(flagto, agentlogin) {
    console.log("Start Go to Data Inbox");
    var HTMLresultListInboxSocialMedia = $('#HTMLresultListInboxSocialMedia');
    var jsonText = JSON.stringify({ FlagTo: flagto, AgentLogin: agentlogin });

    $.ajax({
        type: "POST",
        url: "asmx/3_Channel_Sosmed_Analytic.asmx/SelectInboxSocialMediaPost",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListInboxSocialMedia = "";
            HTMLresultListInboxSocialMedia.empty();
            for (i = 0; i < json.length; i++) {

                var milisegundos = parseInt(json[i].DateGetSosmed.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var getDateBirth = newDate.split('/');

                var stringMessages = json[i].Messages;
                var stringProfileName = json[i].ProfileName;
                var StringIcon = json[i].FlagTo;

                var lengthName = 11;
                var length = 50;

                var trimmedStringMessages = stringMessages.length > length ?
                    stringMessages.substring(0, length - 3) + "..." :
                    stringMessages;
                var trimmedStringProfileName = stringProfileName.length > lengthName ?
                    stringProfileName.substring(0, lengthName - 3) + "..." :
                    stringProfileName;

                if (StringIcon == "Facebook") {
                    StringIcon = "fbicon.png";
                } else if (StringIcon == "Twitter") {
                    StringIcon = "twicon.png";
                } else {
                    StringIcon = "igicon.png";
                }

                resultListInboxSocialMedia = '<div class="media bg-white box-shadowed mb-15" onclick="getWS_ContentInbox(\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')"> ' +
                    '<!--<a class="align-self-center mr-0" href="#" onclick="getWS_ContentInbox(\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')"><img src="' + StringIcon + '"  alt="..."></a>--> ' +
                    '<div class="media-body"> ' +
                    '<p> ' +
                    '<!--<a class="hover-primary" href="#" onclick="getWS_ContentInbox(\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')"><strong>' + trimmedStringProfileName + '</strong></a>--> ' +
                    '<span class="float-right font-size-10">' + json[i].DateGetSosmed + '</span> ' +
                    '</p> ' +
                    '<p>' + trimmedStringMessages + '</p> ' +
                    '</div> ' +
                    '</div>';

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
function getWS_ContentInbox(flagto, value) {
    console.log("Go to ContentInbox Value: " + value);
    $("#LoaderPage").show();
    $("#HTMLcontent_inbox").hide();
    $("#HTMLcontent_inboxComment").empty();

    var jsonText;
    var HTMLcontent_header_inbox = $("#HTMLcontent_header_inbox");
    var HTMLcontent_inbox = $("#HTMLcontent_inbox");
    getDataChartBarPostID(value);
    jsonText = JSON.stringify({ FlagTo: flagto, postid: value });
    $.ajax({
        type: "POST",
        url: "3_Channel_Sosmed.asmx/GetDataContentInbox",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListContentInboxSocialMedia = "", resultListContentHeaderSocialMedia = "";
            HTMLcontent_header_inbox.empty();
            HTMLcontent_inbox.empty();

            for (i = 0; i < json.length; i++) {
                //alert(json[i].UserCreate);

                var stringMessages = json[i].Messages;
                var stringName = json[i].ProfileName;
                var stringDate = json[i].DateGetSosmed;
                var stringStatusType = json[i].StatusType;
                var stringTotal = json[i].Total;
                var likes_count = json[i].Likes;
                if (likes_count == "") {
                    likes_count = 0;
                } else {
                    likes_count = likes_count;
                }

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
                    '<li class="list-inline-item"><a onclick="showActionDo(\'Done\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')" class="hover-primary"><img src="done.png" alt="Mark as done"></a></li>' +
                    '<!--<li class="list-inline-item"><a onclick="showActionDo(\'Trash\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')" class="hover-primary"><img src="trash.png" alt="Delete conversation"></a></li>' +
                    '<li class="list-inline-item"><a onclick="showActionDo(\'Spam\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')" class="hover-primary"><img src="spam.png" alt="Mark as spam"></a></li>' +
                    '<li class="list-inline-item"><a onclick="showActionDo(\'Unread\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')" class="hover-primary"><img src="unread.png" alt="Mark as unread"></a></li>' +
                    '--><li class="list-inline-item"><a onclick="showActionDo(\'Star\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')" class="hover-primary"><img src="star.png" alt="Mark as follow up"></a></li>' +
                    '<li class="list-inline-item"><a onclick="showActionDo(\'Blocked\',\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')" class="hover-primary"><img src="blocked.png" alt="Mark as block"></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                HTMLcontent_header_inbox.append(resultListContentHeaderSocialMedia);

                resultListContentInboxSocialMedia =
                    '<div class="box-body bb-1 border-fade"> ' +
                    '<p class="lead font-size-16">' + stringMessages + '</p> ' +
                    '<div id="HTMLContent_Photo"></div>' +
                    '<div class="gap-items-4 mt-10"> ' +
                    '<a class="text-fade hover-light" href="#"> ' +
                    '<i class="fa fa-heart mr-1"></i> ' + likes_count + ' ' +
                    '</a> ' +
                    '<a class="text-fade hover-light" href="#" onclick="getWS_ContentInboxComment(\'' + getParameterByName('flagto') + '\',\'' + json[i].HeaderSosmed + '\')"> ' +
                    '<i class="fa fa-comment mr-1"></i> ' + stringTotal + ' ' +
                    '</a> ' +
                    '</div> ' +
                    '</div>';
                $("#LoaderPage").hide();
                HTMLcontent_inbox.show();
                HTMLcontent_inbox.append(resultListContentInboxSocialMedia);
            }

            getWS_PhotoSocialMedia(value);

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
        url: "3_Channel_Sosmed.asmx/GetDataContentCommentInbox",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListContentInboxCommentSocialMedia = "";
            HTMLcontent_inboxComment.empty();


            for (i = 0; i < json.length; i++) {
                //alert(json[i].UserCreate);

                var stringTotal = json[i].ID;
                var stringMessages = json[i].Messages;
                var stringName = json[i].ProfileName;
                var stringDate = json[i].DateGetSosmed;
                var stringStatusType = json[i].StatusType;


                if (stringMessages != "") {

                    //Get Sentani
                    /*var jsonTextSentani;
                    jsonTextSentani = JSON.stringify({ Token: "12345", User: "tester", Command: "RECOG_SENTANI_EMOT", Session: "ses", Sentence: stringMessages });
                    $.ajax({
                        type: "POST",
                        url: "http://202.157.176.212:8080/vibo/app/api/sentani",
                        data: jsonTextSentani,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var i, x, resultListContentInboxCommentSocialMedia = "";

                            for (i = 0; i < json.length; i++) {
                                //alert(json[i].UserCreate);

                                console.log(json[i].Predicted);


                            }

                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    })*/
                    //End


                    resultListContentInboxCommentSocialMedia = '<div class="media-list media-list-divided bg-lighter">' +
                        '<div class="media">' +
                        '<div class="media-body">' +
                        '<p>' +
                        '<a href="#"><strong>' + stringName + '</strong></a>' +
                        '<time class="float-right text-fade" datetime="2017-07-14 20:00">' + json[i].DateGetSosmed + '</time>' +
                        '</p>' +
                        '<p>' + stringMessages + '</p>' +
                        '<div class="gap-items-4 mt-10">' +
                        '<a class="text-fade hover-light" href="#">' +
                        '<i class="fa fa-thumbs-up mr-1"></i> 0' +
                        '</a>' +
                        '<a class="text-fade hover-light" href= "#" onclick="getWS_ContentInboxCommentReply(\'' + json[i].HeaderSosmed + '\',\'' + json[i].DetailSosmed + '\')"> ' +
                        '<i class="fa fa-comment mr-1" ></i> ' + json[i].Total + '' +
                        '</a> ' +
                        '<!--<a>happy</a>--> ' +
                        '</div>' +
                        '<div id="HTMLcontent_inboxCommentReply">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    HTMLcontent_inboxComment.show();
                    HTMLcontent_inboxComment.append(resultListContentInboxCommentSocialMedia);
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
function getWS_ContentInboxCommentReply(value, valcommentid) {
    console.log("Go to ContentInboxCommentReply Comment ID: " + valcommentid);
    $("#LoaderPage").show();
    //$("#HTMLcontent_inboxComment").hide();
    var jsonText;
    //var HTMLcontent_inboxComment = $("#HTMLcontent_inboxComment");
    var HTMLcontent_inboxCommentReply = $("#HTMLcontent_inboxCommentReply");
    jsonText = JSON.stringify({ postid: value, commentid: valcommentid });
    $.ajax({
        type: "POST",
        url: "3_Channel_Sosmed.asmx/GetDataContentCommentReplyInbox",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultListContentInboxCommentReplySocialMedia = "";
            HTMLcontent_inboxCommentReply.empty();


            for (i = 0; i < json.length; i++) {
                //alert(json[i].UserCreate);

                var stringTotal = json[i].ID;
                var stringMessages = json[i].Messages;
                var stringName = json[i].ProfileName;
                var stringDate = json[i].DateGetSosmed;
                var stringStatusType = json[i].StatusType;


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
                        '<p>' + stringMessages + '</p>' +
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
            data: "{ TrxTicketNumber: '" + TrxTicketNumber + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxStatus: '" + TrxStatus + "',TrxUsername: '" + TrxUsername + "',TrxChannel: '" + TrxChannel + "', TrxThreadID: '" + TrxThreadID + "', TrxGenesysID: '" + TrxGenesysID + "', TrxEscalasiUnit:'" + TrxEscalasiValue + "', DispatchType:'" + TrxEscalasiType + "',TrxDispatchToLayer:'" + TrxDispatchToLayer + "'}",
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
function showActionDo(actionDo, sourceDo, socmedID) {
    $("#TxtSource").val(sourceDo);
    $("#TxtActionDo").val(actionDo);
    $("#TxtSocialID").val(socmedID);
    console.log("ID : " + socmedID);
    console.log("Source : " + sourceDo);
    console.log("Action : " + actionDo);
    $("#modal-center").modal('show');
}
function ActionSaveActionDo() {
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

                var form_data = JSON.stringify({ TrxReason: encodeData(reasonWhy), TrxSocmedID: TxtSocialID, TrxSocmed: TxtSource, TrxSocmedSource: '', TrxSocmedSourceDetail: '', TrxSocmedActionDo: TxtActionDo, TrxUserName: userCreate });
                console.log("form_data : " + form_data);
                $.ajax({
                    url: "3_Channel_Sosmed.asmx/InsertSocialMediaReason",
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