$(document).ready(function () {
    if (getParameterByName("signout") == "yes") {
        UrlLogoutSystem();
    } else {
        SelectAUX();
        CheckingLogin();
    }
    if (getParameterByName("user") != "") {
        UrlLogoutSystemEPIC();
    }
    CheckingState();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function SelectAUX() {
    var cmbAux = $('#cmbAux');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK66'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].ID + '">' + json[i].Deskripsi + '</option>';
                cmbAux.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionAux() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Username is empty, Please relogin',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if ($("#cmbAux").val() == "" || $("#cmbAux").val() == "Select") {
        swal(
            '',
            'Aux reason is empty',
            'info'
        ).then(function () {
            return false
        });
        return false
    }
    if ($("#cmbAux").val() != "9") {
        const Http = new XMLHttpRequest();
        const url = "http://localhost:60024/dndon"
        console.log("url" + url)
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            console.log(Http.responseText)
        }
        updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
    } else {
        const Http = new XMLHttpRequest();
        const url = "http://localhost:60024/dndoff"
        console.log("url" + url)
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            console.log(Http.responseText)
        }
        updateAuxDatakelola($("#SM_MultiChatToken").val(), "ready", $("#SM_CompanyToken").val());
    }

    if ($("#cmbAux").val() == "9") {
        swal({
            title: "Do you want to process?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    var form_data = JSON.stringify({ TrxAux: $("#cmbAux").val(), TrxUserName: $("#hd_sessionLogin").val() });
                    $.ajax({
                        url: "asmx/TrmAux.asmx/InsertAgentAux",
                        method: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: form_data,
                        success: function (data) {
                            console.log(form_data)

                            var jsonX = JSON.parse(data.d);
                            var i, x = "";
                            var result = "";
                            for (i = 0; i < jsonX.length; i++) {
                                if (jsonX[i].Result == "True") {
                                    swal(
                                        '',
                                        'Insert Data Has Been Success',
                                        'success'
                                    ).then(function () {
                                        $("#cmbAux").val("");
                                        window.location.href = "2_taskboard.aspx?idpage=1009&idtable=4815&status=Open"
                                    });

                                } else {
                                    swal(
                                        '',
                                        'Insert Data Has Been Failed !',
                                        'error'
                                    ).then(function () {
                                        return false
                                    });
                                    return false
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
    } else {

        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";

                for (i = 0; i < json.length; i++) {
                    if (json[i].DescAUX != "Ready") {

                        swal(
                            '',
                            'The user is already in aux position',
                            'info'
                        ).then(function () {
                            return false
                        });
                        return false

                    } else {

                        swal({
                            title: "Do you want to process?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then((willDelete) => {
                                if (willDelete) {

                                    var form_data = JSON.stringify({ TrxAux: $("#cmbAux").val(), TrxUserName: $("#hd_sessionLogin").val() });
                                    $.ajax({
                                        url: "asmx/TrmAux.asmx/InsertAgentAux",
                                        method: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        data: form_data,
                                        success: function (data) {
                                            console.log(form_data)

                                            var jsonX = JSON.parse(data.d);
                                            var i, x = "";
                                            var result = "";
                                            for (i = 0; i < jsonX.length; i++) {
                                                if (jsonX[i].Result == "True") {
                                                    swal(
                                                        '',
                                                        'Insert Data Has Been Success',
                                                        'success'
                                                    ).then(function () {
                                                        $("#cmbAux").val("");
                                                        window.location.href = "2_taskboard.aspx?idpage=1009&idtable=4815&status=Open"
                                                    });

                                                } else {
                                                    swal(
                                                        '',
                                                        'Insert Data Has Been Failed !',
                                                        'error'
                                                    ).then(function () {
                                                        return false
                                                    });
                                                    return false
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

                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })

    }  
}
function CheckingLogin() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#Aux_State").append(json[i].DescAUX)
                
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
async function updateAuxDatakelola(token_agent, value, token_company) {
    await fetch("https://datakelola.com/api/agent/aux", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token_agent: token_agent,
            aux: value,
            token: token_company,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //alert("updateAuxDatakelola says: " + data.message);
        });
}
function LogoutSystem() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmAux.asmx/InsertLogoutActivity",
        data: "{TrxLoginID:'9', TrxLoginUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'Logout'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {
                    updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                    location.href = "../auth_login.aspx?signout=api";
                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UrlLogoutSystem() {
    $.ajax({
        type: "POST",
        url: "apps/asmx/TrmAux.asmx/InsertLogoutActivity",
        data: "{TrxLoginID:'9', TrxLoginUserName: '" + getParameterByName("user") + "', TrxAction: 'Logout'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].Result == "True") {
                    updateAuxDatakelola(getParameterByName("token_agent"), getParameterByName("value"), getParameterByName("token_company"));
                    location.href = "auth_login.aspx?signout=api";
                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UrlLogoutSystemEPIC() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + getParameterByName("user") + "', TrxAction: 'UIDESK125'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                updateAuxDatakelola(json[i].TokenMeta, "logout", json[i].TokenCompany);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CheckingState() {
    console.log("State Checking...");
    var isiNya = "";
    var imageState = "";
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK132'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#dataState").empty();
            var json = JSON.parse(data.d);
            console.log(json);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {
                //isiNya += '<li class="btn-group nav-item d-none d-lg-inline-block">' &
                //      '<a href="#" title="">' &
                //      '<img src="../images/state/wamax.png" width="32" alt="">&nbsp;' &
                //      '</a>' &
                //      '</li>' &
                //      '<li class="btn-group nav-item d-none d-lg-inline-block">' &
                //      '<a href="#"> ' &
                //      '<img src="../images/state/callon.png" width ="32">& nbsp;' &
                //      '</a> ' &
                //      '</li> ' &
                //      '<li class="btn-group nav-item d-none d-lg-inline-block">' &
                //      '<a href="mailbox_inbox.html"> ' &
                //      '<img src="../images/state/emailoff.png" width ="32">& nbsp;' &
                //      '</a>'&
                //      '</li>';
                //  console.log(isiNya);
                //Mapping Image Name

                if (json[i].ChannelName == "E-mail") {
                    imageState = "email";
                    if (json[i].ConditionResult == "READYLOGIN") {
                        imageState = imageState + "on";
                    } else if (json[i].ConditionResult == "READYLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGIN") {
                        imageState = imageState + "max";
                    }
                } else if (json[i].ChannelName == "INBOUND") {
                    imageState = "call";
                    if (json[i].ConditionResult == "READYLOGIN") {
                        imageState = imageState + "on";
                    } else if (json[i].ConditionResult == "READYLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGIN") {
                        imageState = imageState + "max";
                    }
                } else if (json[i].ChannelName == "WhatsApp") {
                    imageState = "wa";
                    if (json[i].ConditionResult == "READYLOGIN") {
                        imageState = imageState + "on";
                    } else if (json[i].ConditionResult == "READYLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGOUT") {
                        imageState = imageState + "off";
                    } else if (json[i].ConditionResult == "OFFLOGIN") {
                        imageState = imageState + "max";
                    }
                }
                //End
                isiNya += '<li class="btn-group nav-item d-none d-lg-inline-block"><a href="#" title=""><img src="../images/state/' + imageState + '.png" width="32" alt="">&nbsp;</a></li>';

            }
            isiNya += '<li class="btn-group nav-item d-none d-lg-inline-block"><a href="#" onclick="CheckingState()" title=""><img src="../images/state/refresh.png" width="32" alt="">&nbsp;</a></li>';
            $("#dataState").append(isiNya);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function generateDetailsString(data, name) {
    let detailsString = "";
    const filteredPersons = data.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));

    data.forEach((person, index) => {
        const firstName = person.name.split(' ')[0];
        if (firstName == name) {
            //detailsString += `Person ${index + 1}:\n`;
            //detailsString += `Name: ${person.name}\n`;
            //detailsString += `Local: ${person.local}\n`;
            detailsString += `${person.statuscall}`;
            //detailsString += `Calls Taken: ${person.callstaken}\n`;
            //detailsString += `Last Call Time: ${person.lastcalltime}\n\n`;
        }

    });



    return detailsString;
}