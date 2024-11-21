////$(document).ready(function () {
////    var recorder = new RecordRTC_Extension();
////    TrmProfileSelect(getParameterByName("account"));
////    ActionScriptOutbound()
////    cmbPriorityScale();
////    cmbCallStatus();
////    cmbChannel();
////    //Start Record Screen & Voice
////    //captureAudioPlusScreen(commonConfig);
////    //End
////    //RTC ini yang dipake
////    if (typeof RecordRTC_Extension === 'undefined') {
////        alert('RecordRTC chrome extension is either disabled or not installed.');
////        alert('Go to https://chrome.google.com/webstore/detail/recordrtc/ndcljioonkecdnaaihodjgiliohngojp');
////    }
////    var options = recorder.getSupoortedFormats()[3];

////    // second step
////    recorder.startRecording(options, function () {
////        //document.getElementById('btn-stop-recording').disabled = false;
////    });
////    //End
////    // first step
    

////    //var video = document.querySelector('video');
////    function getRandomString() {
////        if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
////            var a = window.crypto.getRandomValues(new Uint32Array(3)),
////                token = '';
////            for (var i = 0, l = a.length; i < l; i++) {
////                token += a[i].toString(36);
////            }
////            return token;
////        } else {
////            return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
////        }
////    }
////    var fileNameRecording;
////    var d = new Date();
////        var year = d.getUTCFullYear();
////        var month = d.getUTCMonth();
////        var date = d.getUTCDate();
////        var fileExtension = 'webm';
////        fileNameRecording = 'RecordRTC-' + year + month + date + '-' + getRandomString() + '.' + fileExtension;
////    function stopRecordingCallbackX(blob) {
////        //video.src = video.srcObject = null;
////        //video.src = URL.createObjectURL(blob);
        
////        invokeSaveAsDialog(blob, fileNameRecording);
////        recorder = null;

////        var fileType = 'video'; // or "audio"
////        var fileName = fileNameRecording;  // or "wav"

////        var formData = new FormData();
////        formData.append(fileType + '-filename', fileName);
////        formData.append(fileType + '-blob', blob);
////        xhr('https://triciptaintegra.com/graphapi/recordingfile/save.php', formData, function (fName) {
////            window.open(location.href + fName);
////        });
////    }

    

////    function xhr(url, data, callback) {
////        var request = new XMLHttpRequest();
////        request.onreadystatechange = function () {
////            if (request.readyState == 4 && request.status == 200) {
////                callback(location.href + request.responseText);
////            }
////        };
////        request.open('POST', url);
////        request.send(data);
////    }

////    document.getElementById('btn-stop-recording').onclick = function () {
////        this.disabled = true;

////        // third and last step
////        ActionSimpanOutbound(fileNameRecording);
////        recorder.stopRecording(stopRecordingCallbackX);
////    };

//////End
////});

//////RTC

//////var commonConfig = {
//////    onMediaCaptured: function (stream) {
//////        console.log("Stop Recording A");
//////    },
//////    onMediaStopped: function () {
//////        console.log("Start Recording A");
//////    },
//////    onMediaCapturingFailed: function (error) {
//////        console.error('onMediaCapturingFailed:', error);

//////        if (error.toString().indexOf('no audio or video tracks available') !== -1) {
//////            alert('RecordRTC failed to start because there are no audio or video tracks available.');
//////        }

//////        if (error.name === 'PermissionDeniedError' && DetectRTC.browser.name === 'Firefox') {
//////            alert('Firefox requires version >= 52. Firefox also requires HTTPs.');
//////        }

//////        commonConfig.onMediaStopped();
//////    }
//////};
//////function captureAudioPlusScreen(config) {
//////    if (navigator.getDisplayMedia) {
//////        navigator.getDisplayMedia({
//////            video: true
//////        }).then(screenStream => {
//////            navigator.mediaDevices.getUserMedia({ audio: true }).then(function (mic) {
//////                screenStream.addTrack(mic.getTracks()[0]);

//////                config.onMediaCaptured(screenStream);

//////                addStreamStopListener(screenStream, function () {
//////                    // config.onMediaStopped();

//////                    //btnStartRecording.onclick();
//////                });

//////                setVideoURL(screenStream, true);
//////            });
//////        }).catch(function (error) {
//////            config.onMediaCapturingFailed(error);
//////        });
//////    } else if (navigator.mediaDevices.getDisplayMedia) {
//////        navigator.mediaDevices.getDisplayMedia({
//////            video: true
//////        }).then(screenStream => {
//////            navigator.mediaDevices.getUserMedia({ audio: true }).then(function (mic) {
//////                screenStream.addTrack(mic.getTracks()[0]);

//////                config.onMediaCaptured(screenStream);

//////                addStreamStopListener(screenStream, function () {
//////                    // config.onMediaStopped();
//////                    //startRecording("1");
//////                    //btnStartRecording.onclick();
//////                });

//////                //setVideoURL(screenStream, true);
//////            });
//////        }).catch(function (error) {
//////            config.onMediaCapturingFailed(error);
//////        });
//////    } else {
//////        var error = 'getDisplayMedia API are not supported in this browser.';
//////        config.onMediaCapturingFailed(error);
//////        alert(error);
//////    }
//////}
//////function getURL(arg) {
//////    var url = arg;

//////    if (arg instanceof Blob || arg instanceof File) {
//////        url = URL.createObjectURL(arg);
//////    }

//////    if (arg instanceof RecordRTC || arg.getBlob) {
//////        url = URL.createObjectURL(arg.getBlob());
//////    }

//////    if (arg instanceof MediaStream || arg.getTracks) {
//////        // url = URL.createObjectURL(arg);
//////    }

//////    return url;
//////}
//////function captureCamera(callback) {
//////    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function (camera) {
//////        callback(camera);
//////    }).catch(function (error) {
//////        alert('Unable to capture your camera. Please check console logs.');
//////        console.error(error);
//////    });
//////}
//////function stopRecordingCallback() {

//////    recorder.camera.stop();
//////    recorder.destroy();
//////    recorder = null;
//////}

//////var recorder;
//////function startRecording(setupFor) {
//////    var mimeType = 'video/webm';

//////    var type = 'video';
//////    navigator.mediaDevices.getUserMedia({
//////        video: true,
//////        audio: true
//////    }).then(async function (stream) {
//////        let recorder = RecordRTC(stream, {
//////            type: type,
//////            mimeType: mimeType
//////        });
//////        recorder.startRecording();

//////        const sleep = m => new Promise(r => setTimeout(r, m));
//////        await sleep(3000);
//////        var d = new Date();
//////            var year = d.getUTCFullYear();
//////            var month = d.getUTCMonth();
//////            var date = d.getUTCDate();
//////            var fileExtension = 'webm';
//////            var fileNameRecording = 'RecordRTC-' + year + month + date + '-' + getRandomString() + '.' + fileExtension;
//////        recorder.stopRecording(function () {
//////            let blob = recorder.getBlob();
//////            invokeSaveAsDialog(blob, fileNameRecording);
//////        });
//////    }); 
//////}
//////function getRandomString() {
//////    if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
//////        var a = window.crypto.getRandomValues(new Uint32Array(3)),
//////            token = '';
//////        for (var i = 0, l = a.length; i < l; i++) {
//////            token += a[i].toString(36);
//////        }
//////        return token;
//////    } else {
//////        return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
//////    }
//////}
//////function addStreamStopListener(stream, callback) {
//////    stream.addEventListener('ended', function () {
//////        callback();
//////        callback = function () { };
//////    }, false);
//////    stream.addEventListener('inactive', function () {
//////        callback();
//////        callback = function () { };
//////    }, false);
//////    stream.getTracks().forEach(function (track) {
//////        track.addEventListener('ended', function () {
//////            callback();
//////            callback = function () { };
//////        }, false);
//////        track.addEventListener('inactive', function () {
//////            callback();
//////            callback = function () { };
//////        }, false);
//////    });
//////}



////function getParameterByName(name, url = window.location.href) {
////    name = name.replace(/[\[\]]/g, '\\$&');
////    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
////        results = regex.exec(url);
////    if (!results) return null;
////    if (!results[2]) return '';
////    return decodeURIComponent(results[2].replace(/\+/g, ' '));
////}

////function TrmProfileSelect(TrxAccount) {
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "TrmCustomer";
////    var KondisiData = "where ValueChannel='" + TrxAccount + "'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    console.log("jsonText :" + jsonText)
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
                
////                var d = new Date(json[i].Birth);
////                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                $('#TxtName').val(json[i].Name);
////                $('#TxtGender').val(json[i].JenisKelamin);
////                $('#TxtBirth').val(newDate + ' ' + newTime);
////                $('#TxtAddress').val(json[i].Alamat);
////                $('#TxtProfileNIK').val(json[i].NIK);
////                $('#TxtTwitter').val(json[i].Twitter);
////                $('#TxtProfileFacebook').val(json[i].Facebook);
////                $('#TxtProfileInstagram').val(json[i].Instagram);
////                if(json[i].FlagChannel == 'Email'){
////                    $('#TxtProfileEmail').val(json[i].ValueChannel);
////                } else{
////                    $('#TxtProfilePhone').val(json[i].ValueChannel);
////                }
////                $('#ContentPlaceHolder1_TrxCustomerID').val(json[i].CustomerID);

////                $("#cusTomerName").val(json[i].Name);
////                $("#cusTomerPhone").val(json[i].HP);
////                $("#cusTomerEmail").val(json[i].Email);
////                $("#cusTomerFacebook").val(json[i].Facebook);
////                $("#cusTomerInstagram").val(json[i].Instagram);
////                $("#cusTomerTwitter").val(json[i].Twitter);
////                var milisegundos = parseInt(json[i].Birth.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
////                var getDateBirth = newDate.split('/');
////                $("#cusTomerDate").val(getDateBirth[2] + "-" + getDateBirth[1] + "-" + getDateBirth[0]);
////                console.log(newDate);
////                console.log(getDateBirth[2] + "-" + getDateBirth[0] + "-" + getDateBirth[1]);
////                $("#cusTomerGender").val(json[i].JenisKelamin);
////                $("#Ticket_CIF").val(json[i].CIF);
////                $("#cusTomerNIK").val(json[i].NIK);
////                $("#cusTomerAlamat").val(json[i].Alamat);
                
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function cmbPriorityScale() {
////    var JenisKondisi = "AllWhereData";
////    var cmbPriorityScale = $('#cmbPriorityScale');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "BTN_SkalaPrioritas", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultPriorityScale = "";
////            for (i = 0; i < json.length; i++) {

////                resultPriorityScale = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
////                cmbPriorityScale.append(resultPriorityScale);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function cmbCallStatus() {
////    var JenisKondisi = "AllWhereData";
////    var cmbCallStatus = $('#cmbCallStatus');
////    var cmbReminderStatus = $('#cmbReminderStatus');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "BTN_ReasonCall", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultCallStatus = "";
////            for (i = 0; i < json.length; i++) {

////                resultCallStatus = '<option value="' + json[i].ReasonCall + '">' + json[i].ReasonCall + '</option>';
////                cmbCallStatus.append(resultCallStatus);
////                cmbReminderStatus.append(resultCallStatus);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

////function cmbChannel(){
////    var JenisKondisi = "AllWhereData";
////    var cmbDataOtherChannel = $('#cmbOtherChannel');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mSourceType", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultSourceChannel = "", resultSourceChannelType = "";
////            for (i = 0; i < json.length; i++) {

////                resultSourceChannelType = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
////                cmbDataOtherChannel.append(resultSourceChannelType);
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

//// //*Script Outbound
////function playMedia(fileRecording) {
////    $("#modal-video").modal('show');
////}
////function ActionScriptOutbound(){   
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "campaigns_script";
////    var KondisiData = "where StatusActive='YES' And Channel='"+ getParameterByName("channel") +"'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    console.log("Script Outbound " + NamaTable + KondisiData + jsonText)
////    console.log("jsonText" + jsonText)
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultScript = "";

////            $('#divScript').empty();
////            for (i = 0; i < json.length; i++) {

////                resultScript = '<p>' + json[i].CampaignScriptHeader + '</p>' +
////                                '<br>' +
////                                '<br>' +
////                                '<br>' +
////                                '<p>' + json[i].CampaignDescription + '</p>' +
////                                '<br>' +
////                                '<br>' +
////                                '<br>' +
////						        '<p>' + json[i].CampaignScriptFooter + '</p>'
////                $('#divScript').append(resultScript)

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })

////    //History Transaction Outbound
////    var JenisKondisi = "AllWhereData";
////    var NamaTable = "campaigns_data";
////    var KondisiData = "Where Agent='" + $("#ContentPlaceHolder1_TrxUserName").val() + "' And StatusBlast='Call' And NoWA='" + getParameterByName("account") + "'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
////    console.log("History Transaction Outbound " + NamaTable + KondisiData + jsonText)
////    var myTable = $('#TrmHistoryOutbound').DataTable();
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

////                var urlClick = "<a href='TrmCallProfile.aspx?id="+ json[i].ID +"&account="+ json[i].NoWA +"&channel="+ json[i].TypeChannel +"'>"+ json[i].NoWA +"</a>";
////                myTable.row.add([json[i].ID, urlClick, json[i].GroupBlast, json[i].TypeChannel, json[i].StatusBlast, newDate + ' ' + newTime]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

////function ActionNoteOutbound(){
////    //Interaction Outbound
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "campaigns_data_detail";
////    var KondisiData = "where CampaignDataID='"+ getParameterByName("id") +"' order by datecreate desc";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    console.log("ActionNoteOutbound " + jsonText)
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultHistoryNote = "";

////            $('#divHistoryNote').empty();
////            for (i = 0; i < json.length; i++) {

////                var d = new Date(json[i].DateCreate);
////                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                resultHistoryNote = "<div class='media media-single'>" +
////                                        "<div class='media-body'>" +
////                                              "<h6><a href='3_Telesales.aspx?id=" + json[i].ID + "'>" + json[i].Description + "</a></h6>" +
////                                              "<small class='text-fader'>" + json[i].UserCreate + " - " + newDate + " " + newTime + "</small>" +
////                                                "</div>" +
////                    "<img src='recording.png' onclick='playMedia(&quot;" + json[i].RecordingFile + "&quot;)' width='24'></img>"
////                                    "</div>"
////                //'" + json[i].RecordingFile + "'
////                $('#divHistoryNote').append(resultHistoryNote)

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function ActionHelpdeskTransaction(){
////    //History Helpdesk Transaction
////    var JenisKondisi = "AllWhereData";
////    var NamaTable = "tticket";
////    var KondisiData = "Where NIK='" + $('#ContentPlaceHolder1_TrxCustomerID').val() + "'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
////    console.log("ActionHelpdeskTransaction " + jsonText)
////    var myTable = $('#example5').DataTable();
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

////                myTable.row.add(["<a href='#' onclick=readingTicket('"+ json[i].TicketNumber +"')>"+ json[i].TicketNumber +"</a>", json[i].CategoryName, json[i].SubCategory3Name, json[i].SLA, json[i].UserCreate, newDate + ' ' + newTime]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })

////}

//////History Interaction Ticket
////function readingTicket(TrxTicketNumber){
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "tinteraction";
////    var KondisiData = "where TicketNumber='"+ TrxTicketNumber +"' order by datecreate desc";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    console.log("readingTicket " + jsonText)
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultHistoryInteractionTicket = "";

////            $('#divHistoryInteractionTicket').empty();
////            for (i = 0; i < json.length; i++) {

////                var d = new Date(json[i].DateCreate);
////                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                resultHistoryInteractionTicket = '<div class="media media-single">' +
////                                        '<div class="media-body">' +
////                                              '<h6><a href="3_Telesales.aspx?id=' + json[i].ID + '">' + json[i].ResponseComplaint + '</a></h6>' +
////                                              '<small class="text-fader">' + json[i].AgentCreate + ' - ' + newDate + ' ' + newTime + '</small>' +
////                                        '</div>' +
////                                    '</div>'
////                $('#divHistoryInteractionTicket').append(resultHistoryInteractionTicket)

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })  
////}

////    //* Reminder Note* //
////function readingReminder(TrxID){
////    $("#ContentPlaceHolder1_TrxID").val(TrxID);
////    $("#UpdateReminder").css("display", "block");
////    $("#SaveReminder").css("display", "none");
////    var JenisKondisi = "AllWhereData";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "TrmReminder", paramQuery: "where ID='"+ TrxID +"'" });
////    console.log("readingReminder " + jsonText)
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

////                var d = new Date(json[i].DateCreate);
////                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
////                console.log("ReminderDate " + newDate + ' ' + newTime)

////                var yourDateValue = new Date(newDate + ' ' + newTime);
////                var formattedDate = yourDateValue.toISOString().substr(0, 10)
////                $("#TxtReminderDate").val(formattedDate);

////                $("#TxtReminderSubject").val(json[i].Subject);
////                $("#cmbReminderStatus").val(json[i].StatusReminder);
////                $("#TxtReminderDescription").val(json[i].Description);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function ActionReminderOutbound(){
////    $("#UpdateReminder").css("display", "none");
////    $("#SaveReminder").css("display", "block");
////    $("#TxtReminderSubject").val("");
////    $("#TxtReminderDate").val("");
////    $("#TxtReminderDescription").val("");
////    $("#cmbReminderStatus").val("");

////    var JenisKondisi = "AllWhereData";
////    var NamaView = "campaigns_data_reminder";
////    var KondisiData = "where CampaignDataID='"+ getParameterByName("id") +"' order by datecreate desc";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    console.log("ActionReminderOutbound " + jsonText)
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultHistoryReminderNote = "";

////            $('#divHistoryReminderNote').empty();
////            for (i = 0; i < json.length; i++) {

////                var d = new Date(json[i].DateCreate);
////                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                resultHistoryReminderNote = '<div class="mailbox-read-info">' +
////                                                 '<h3><a href="#" onclick=readingReminder(' + json[i].ID + ')>' + json[i].Subject + '</a></h3>' +
////                                            '</div>' +
////                                            '<div class="mailbox-read-info bb-0 clearfix">' +
////                                                 '<div class="float-left mr-5">' +
////                                                    '<a href="#"><img src="../images/1.jpg" alt="user" width="40" class="rounded-circle"></a>' +
////                                                 '</div>' +
////                                                 '<h6 class="no-margin">' + json[i].UserCreate + '<br>' + 
////                                                 '<small>'+ json[i].StatusReminder +'</small>' +
////                                                 '<span class="mailbox-read-time pull-right">' + newDate + ' ' + newTime + '</span></h6>' +
////                                            '</div>' +
////                                            '<div class="mailbox-read-message">' + 
////                                            '<p> ' + json[i].Description + ' </p>' +
////                                            '</div>' +
////                                            '<hr />'

////                $('#divHistoryReminderNote').append(resultHistoryReminderNote)

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })  
////}

////function ActionSimpanReminder(){
////    if($("#TxtReminderSubject").val() == ''){
////        swal("Subject is empty")
////        return false;
////    }
////    if($("#TxtReminderDate").val() == ''){
////        swal("Date is empty")
////        return false;
////    }
////    if($("#cmbReminderStatus").val() == null){
////        swal("Status is empty")
////        return false;
////    }
////    if($("#TxtReminderDescription").val() == ''){
////        swal("Description is empty")
////        return false;
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
           
////            var form_data = JSON.stringify({ TrxTableID:"0", TrxCampaignDataID: getParameterByName("id"), TrxUserName: $("#hd_sessionLogin").val(), TrxSubject: $("#TxtReminderSubject").val(), TrxDescription: encodeData($("#TxtReminderDescription").val()), 
////            TrxDate: $("#TxtReminderDate").val(), TrxAccount: getParameterByName("account"), TrxChannel: getParameterByName("channel"), TrxStatus: $("#cmbReminderStatus").val()});
////            console.log("ActionSimpanReminder : " + form_data)
////            $.ajax({
////                url: "asmx/TrmCallProfile.asmx/InsertTransactionCampaignReminder",
////                method: "POST",
////                contentType: "application/json; charset=utf-8",
////                dataType: "json",
////                //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////                data: form_data,
////                success: function () {
////                    console.log(form_data)
////                    var TrxMessage = 'Your data has been save'
////                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                    $("#TxtReminderSubject").val("");
////                    $("#TxtReminderDate").val("");
////                    $("#TxtReminderDescription").val("");
////                    ActionReminderOutbound();

////                },
////                error: function (xmlHttpRequest, textStatus, errorThrown) {
////                    console.log(xmlHttpRequest.responseText);
////                    console.log(textStatus);
////                    console.log(errorThrown);
////                },
////                complete: function () {

////                }
////            });
////            swal("save data has been success", {
////                icon: "success",
////            });
////        } else {
////            //swal("Your imaginary file is safe!");
////             //$("#ModalChannel").modal('hide');
////        }
////    });
////}

////function ActionUpdateReminder(){
////    if($("#TxtReminderSubject").val() == ''){
////        alert("Subject is empty")
////        return false;
////    }
////    if($("#TxtReminderDate").val() == ''){
////        alert("Date is empty")
////        return false;
////    }
////    if($("#TxtReminderDescription").val() == ''){
////        alert("Description is empty")
////        return false;
////    }
////    if($("#cmbReminderStatus").val() == ''){
////        alert("Status is empty")
////        return false;
////    }
////    var form_data = JSON.stringify({ TrxTableID: $("#ContentPlaceHolder1_TrxID").val(), TrxCampaignDataID: getParameterByName("id"), TrxUserName: $("#hd_sessionLogin").val(), TrxSubject: $("#TxtReminderSubject").val(), TrxDescription: encodeData($("#TxtReminderDescription").val()), 
////        TrxDate: $("#TxtReminderDate").val(), TrxAccount: getParameterByName("account"), TrxChannel: getParameterByName("channel"), TrxStatus: $("#cmbReminderStatus").val()});
////    console.log("ActionSimpanReminder : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "asmx/TrmCallProfile.asmx/InsertTransactionCampaignReminder",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data has been save'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#TxtReminderSubject").val("");
////                $("#TxtReminderDate").val("");
////                $("#TxtReminderDescription").val("");
////                ActionReminderOutbound();

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
////function ActionSimpanOutbound(fileNameRecording) {
////    //Stop Recording
    
////    //End
////    if($("#cmbPriorityScale").val() == "Select"){
////        swal("Priority Scale is empty");
////        return false;
////    }
////    if($("#cmbCallback").val() == ''){
////        swal("Callback Reminder is empty")
////        return false;
////    }
////    if($("#cmbCallStatus").val() == ''){
////        swal("Call Status is empty")
////        return false;
////    }
////    if($("#TrxNoteOutbound").val() == ''){
////        swal("Note outbound is empty")
////        return false;
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
            
////                var form_data = JSON.stringify({ TrxCampaignDataID: getParameterByName("id"), TrxUserName: $("#hd_sessionLogin").val(), TrxPriority: $("#cmbPriorityScale").val(), TrxCallback: $("#cmbCallback").val(), TrxStatus: $("#cmbCallStatus").val(), TrxNote: encodeData($("#TrxNoteOutbound").val()), RecordingFile: fileNameRecording });
////            console.log("form_data ActionSimpanOutbound : " + form_data)
////            $.ajax({
////                url: "asmx/TrmCallProfile.asmx/InsertTransactionAddNoteOutbound",
////                method: "POST",
////                contentType: "application/json; charset=utf-8",
////                dataType: "json",
////                //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////                data: form_data,
////                success: function () {
////                    console.log(form_data)
////                    var TrxMessage = 'Your data has been save'
////                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                    $("#cmbCallback").val("");
////                    $("#cmbPriorityScale").find("option:selected").val();
////                    //$("#cmbPriorityScale").val("");
////                    $("#cmbCallStatus").find("option:selected").val();
////                    //$("#cmbCallStatus").val("");
////                    $("#TrxNoteOutbound").val("");
////                    TrmHistoryInteractionNote();

////                },
////                error: function (xmlHttpRequest, textStatus, errorThrown) {
////                    console.log(xmlHttpRequest.responseText);
////                    console.log(textStatus);
////                    console.log(errorThrown);
////                },
////                complete: function () {

////                }
////            });

////            swal("save data has been success", {
////                icon: "success",
////            });
////        } else {
////            //swal("Your imaginary file is safe!");
////            //$("#ModalChannel").modal('hide');
////        }
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
////function AddChannel(){
////    $("#ModalOtherChannelCustomer").modal('show');
////    $("#SimpanOtherChannel").css("display", "block");
////    $("#UpdateOtherChannel").css("display", "none");
////    $("#DeleteOtherChannel").css("display", "none");
////    TrmAddChannel();
////}
////function ActionOtherChannel(Action) {
////    console.log("ActionOtherChannel : " + $("#ContentPlaceHolder1_TrxCustomerID").val());
////    if (Action == 'Simpan'){           
////        if ($("#TrxCustomerID").val() == "") {
////            AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>customer</b> is empty ")
////            return false
////        }
////        if ($("#TxtChannelValue").val() == "") {
////            AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>value channel</b> is empty ")
////            return false
////        }
////        if ($("#cmbOtherChannel").val() == "") {
////            AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>channel type</b> is empty ")
////            return false
////        }
////        var TrxChannelType = $("#cmbOtherChannel").val();
////        var ActionSP = "InsertOtherChannel"
////    } else if(Action == 'Update'){
////        var TrxChannelType = $( "#cmbOtherChannel option:selected" ).text();
////        var ActionSP = "UpdateOtherChannel"
////    } else {
////        var TrxChannelType = "Delete";
////        var ActionSP = "DeleteOtherChannel"
////    }
////    var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxCustomerID: $("#ContentPlaceHolder1_TrxCustomerID").val(), TrxChannelValue: $("#TxtChannelValue").val(), TrxChannelType: TrxChannelType });
////    //console.log("aa : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "asmx/ServiceCustomer.asmx/"+ ActionSP +"",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(ActionSP + form_data)
////                var TrxMessage = 'Your data channel <b>' + $("#TxtChannelValue").val() + '</b> has been ' + Action
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
////                $("#TxtChannelValue").val("");
////                $("#cmbOtherChannel").val("");
////                TrmAddChannel();
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

////function TrmAddChannel(){
////    //History Helpdesk Transaction
////    var JenisKondisi = "AllWhereData";
////    var NamaTable = "SML_mCustomerChannel";
////    var KondisiData = "Where CustomerID='" + $('#ContentPlaceHolder1_TrxCustomerID').val() + "'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
////    console.log("AddChannel " + jsonText)
////    var myTable = $('#TrmAddChannel').DataTable();
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

////                myTable.row.add([json[i].ID, json[i].ValueChannel, json[i].FlagChannel]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}

////function showCustomer(){
////    $("#modal-center").modal('show');
////}

////function ActionUpdateCustomer(){ 
////    //alert("xxx")
////    if($("#ContentPlaceHolder1_TrxCustomerID").val() == ''){
////       alert("Customer is empty")
////    }   
////    var TrxUsername = $("#hd_sessionLogin").val();
////    var TrxCusTomerName = $("#cusTomerName").val();
////    var TrxCusTomerEmail = $("#cusTomerEmail").val();
////    var TrxCusTomerPhone = $("#cusTomerPhone").val();
////    var TrxCusTomerGender = $("#cusTomerGender").val();
////    var TrxCusTomerDate = $("#cusTomerDate").val();
////    var TrxCusTomerNIK = $("#cusTomerNIK").val();
////    var TrxFacebook = $("#cusTomerFacebook").val();
////    var TrxInstagram = $("#cusTomerInstagram").val();
////    var TrxTwitter = $("#cusTomerTwitter").val();
////    var TrxCusTomerAlamat = $("#cusTomerAlamat").val();
////    var form_data = JSON.stringify({ TrxCustomerID: $("#ContentPlaceHolder1_TrxCustomerID").val(), TrxUsername: TrxUsername, TrxCusTomerName: encodeData(TrxCusTomerName), TrxCusTomerEmail: TrxCusTomerEmail, TrxCusTomerPhone: TrxCusTomerPhone, TrxCusTomerGender: TrxCusTomerGender, TrxCusTomerDate: TrxCusTomerDate, TrxCusTomerNIK: TrxCusTomerNIK, TrxCusTomerAlamat:encodeData(TrxCusTomerAlamat), TrxFacebook: TrxFacebook, TrxInstagram: TrxInstagram, TrxTwitter: TrxTwitter});
////    console.log("exec Action Update Customer : " + form_data)

////    if (TrxCusTomerName === '') {
////        alert("Name is empty")
////        return false;
////    }
////    if (TrxCusTomerEmail != '') {
////        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
////        if (TrxCusTomerEmail.match(mailformat)) {

////        }
////        else {
////            alert("Format email address not valid");
////            return false;
////        }

////    }
////    if (TrxCusTomerPhone != '') {
////        var numberNya = /^[0-9]+$/;
////        if (TrxCusTomerPhone.match(numberNya)) {
////            var PhoneLengt = TrxCusTomerPhone.toString().length;
////            if (PhoneLengt > '6') {

////            } else {
////                alert("Format phone number is not valid")
////                return false;
////            }
////        } else {
////            alert("Phone Number format is numeric")
////            return false;
////        }
////    }
////    var numberNya = /^[0-9]+$/;
////    if (TrxCusTomerNIK.match(numberNya)) {
////        var NIKLengt = TrxCusTomerNIK.toString().length;
////        if (NIKLengt == '16') {

////        } else {
////            alert("NIK Number format is 16 digit")
////            return false;
////        }
////    } else {
////        alert("NIK Number format is numeric")
////        return false;
////    }

////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "asmx/ServiceCustomer.asmx/UpdateTransactionCustomer",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function (data) {
////                var json = JSON.parse(data.d);
////                var i, x = "";
////                var result = "";
////                console.log("Exec UpdateTransactionCustomer : " + form_data)
////                for (i = 0; i < json.length; i++) {
////                    if (json[i].Result == "True") {                           
////                        //$.toast({
////                        //    heading: 'Hi agent ' + $("#hd_sessionLogin").val(),
////                        //    text: 'Your data customer has been update',
////                        //    position: 'top-right',
////                        //    loaderBg: '#ff6849',
////                        //    icon: 'success',
////                        //    hideAfter: 3500,
////                        //    stack: 6
////                        //});
////                        var TrxMessage = 'Your data channel <b>' + $("#cusTomerName").val() + '</b> has been update'
////                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
////                        $("#modal-center").modal('hide');
////                    } else {
////                        //alert(json[i].msgSystem)
////                        //$.toast({
////                        //    heading: 'Hi agent ' + $("#hd_sessionLogin").val(),
////                        //    text: json[i].msgSystem,
////                        //    position: 'top-right',
////                        //    loaderBg: '#ff6849',
////                        //    icon: 'warning',
////                        //    hideAfter: 3500,
////                        //    stack: 6
////                        //});
////                        var TrxMessage = 'Your data channel <b>' + $("#cusTomerName").val() + '</b> failed update'
////                        AutoValidasiWarning($("#hd_sessionLogin").val(), TrxMessage);
////                        return false;
////                    }   

////                }
                    
////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            },
////            complete: function () {

////            }
////        });
////    }
   
////}