$(document).ready(function () {
    TrmLDAP();
});
function TrmLDAP() {
    var myTable = $('#TrmChannel').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK44'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].Datecreate);
                var milisegundos = parseInt(json[i].Datecreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit Configuration</a>" +
                    "<a class='dropdown-item' href='#' onclick=showConnect('" + json[i].ID + "')><i class='fa fa-plug'></i> Check Connection</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].NA == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].LDAPServer, json[i].Username, json[i].Password, TrxParam, newDate + ' ' + newTime, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Update").css("display", "block");
    $("#Connect").css("display", "none");
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK44'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#LDAP_Server").val(json[i].LDAPServer);
                $("#LDAP_User").val(json[i].Username);
                $("#LDAP_Password").val(json[i].Password);
                $("#cmbStatus").val(json[i].NA);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function showConnect(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Connect").css("display", "block");
    $("#Update").css("display", "none");
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK44'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#LDAP_Server").val(json[i].LDAPServer);
                $("#LDAP_User").val(json[i].Username);
                $("#LDAP_Password").val(json[i].Password);
                $("#cmbStatus").val(json[i].NA);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UpdateLDAP() {
    if ($("#LDAP_Server").val() == "") {
        swal("LDAP Server is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#LDAP_Server").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#LDAP_User").val() == "") {
        swal("LDAP User is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#LDAP_User").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#LDAP_Password").val() == "") {
        swal("LDAP Password is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#LDAP_Password").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    var form_data = JSON.stringify({
        TrxUsername: $("#hd_sessionLogin").val(), TrxLDAPServer: $("#LDAP_Server").val(), TrxLDAPUser: $("#LDAP_User").val(),
        TrxLDAPPassword: $("#LDAP_Password").val(), TrxLDAPStatus: $("#cmbStatus").val(), TrxID:"1"
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "asmx/TrmLDAP.asmx/UpdateConfigurationLDAP",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log("exec UpdateConfigurasiLDAP : " + form_data)
                        $.toast({
                            heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
                            text: 'Your data call has been save',
                            position: 'top-right',
                            loaderBg: '#ff6849',
                            icon: 'success',
                            hideAfter: 3500,
                            stack: 6
                        });
                        swal("Done", {
                            icon: "success",
                        });
                        $("#ModalChannel").modal('hide');
                        window.location = "TrmLDAP.aspx";
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });
                
                /*window.location = "TrmLDAP.aspx";*/
            }
        });
}
function ConnectLDAP() {
    if ($("#LDAP_Server").val() == "") {
        swal("LDAP Server is empty")
        return false;
    } else {
        var regex = /^[^0-9*\\\^\/<>_#']+$/;
        if (regex.test($("#LDAP_Server").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#LDAP_User").val() == "") {
        swal("LDAP User is empty")
        return false;
    } else {
        var regex = /^[^0-9*\\\^\/<>_#']+$/;
        if (regex.test($("#LDAP_User").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if ($("#LDAP_Password").val() == "") {
        swal("LDAP Password is empty")
        return false;
    } else {
        var regex = /^[^0-9*\\\^\/<>_#']+$/;
        if (regex.test($("#LDAP_Password").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    var form_data = JSON.stringify({
        TrxLDAPServer: $("#LDAP_Server").val(), TrxLDAPUser: $("#LDAP_User").val(),
        TrxLDAPPassword: $("#LDAP_Password").val()
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "asmx/TrmLDAP.asmx/ConnectConfigurationLDAP",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log("exec UpdateConfigurasiLDAP : " + form_data)
                        alert(Response.data)
                        //$("#ModalChannel").modal('hide');
                        //window.location = "TrmLDAP.aspx";
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

                /*window.location = "TrmLDAP.aspx";*/
            } else {
                //swal("Your imaginary file is safe!");
                //$("#modal-center").modal('hide');
            }
        });
}
