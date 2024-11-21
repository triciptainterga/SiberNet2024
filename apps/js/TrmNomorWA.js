$(document).ready(function () {
    TrmWhatsApp();
    LoadingComboSite();
    $("#LoaderPage").hide();
});
function TrmWhatsApp() {
    var myTable = $('#TrmWhatsApp').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK109'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreated);
                var milisegundos = parseInt(json[i].DateCreated.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=UpdateModal('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=DeleteModal('" + json[i].ID + "')><i class='fa fa-trash'></i> Delete</a>" +
                    "</div>" +
                    "</div>"

                if (json[i].Status == "Yes") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].NomorWA, json[i].SiteName, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmWhatsAppSelected() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmNomorWA.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'UIDESK109'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $('#NomorTelepon').val(json[i].NomorWA);
                $("#ComboSite option:selected").text(json[i].SiteName);
                $("#ContentPlaceHolder1_Hd_Site").val(json[i].Site);
                //$('#ComboSite').val(json[i].Site);
                if (json[i].Status == "Yes") {
                    $("#cmbStatus option:selected").text("Aktif");
                    $("#cmbStatus").val("Yes");
                } else {
                    $("#cmbStatus option:selected").text("No Aktif");
                    $("#cmbStatus").val("No");
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
function LoadingComboSite() {
    var ComboSite = $('#ComboSite');
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK108'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, Site = "";

            ComboSite.empty();
            ComboSite.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                Site = '<option value="' + json[i].ID + '">' + json[i].Site + '</option>';
                ComboSite.append(Site);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function InsertModal() {
    $("#ModalSite").modal('show');
    $("#Save").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
    TrmWhatsAppSelected();
}
function UpdateModal(TrxID) {
    $("#ModalSite").modal('show');
    $("#Save").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmWhatsAppSelected();
}
function DeleteModal(TrxID) {
    $("#ModalSite").modal('show');
    $("#Save").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmWhatsAppSelected();
}
function ActionUpdate() {
    if ($("#hd_sessionLogin").val() == "" || $("#hd_sessionLogin").val() == null) {
        swal(
            '',
            'UserName Kosong, Please Relogin',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_TrxID").val() == "" || $("#ContentPlaceHolder1_TrxID").val() == null) {
        swal(
            '',
            'Data Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $("#LoaderPage").show();
                var form_data = JSON.stringify({
                    ID: $("#ContentPlaceHolder1_TrxID").val(), NomorTelepon: $("#NomorTelepon").val(),
                    Site: $("#ContentPlaceHolder1_Hd_Site").val(), Status: $("#cmbStatus").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UPDATE'
                });
                $.ajax({
                    url: "asmx/TrmNomorWA.asmx/UpdateTable",
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
                                    window.location.href = "TrmNomorWA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrmNomorWA.aspx";
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
function ActionSimpan() {
    if ($("#hd_sessionLogin").val() == "" || $("#hd_sessionLogin").val() == null) {
        swal(
            '',
            'UserName Kosong, Please Relogin',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#NomorTelepon").val() == "") {
        swal(
            '',
            'Nomor Telepon Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboSite").val() == "" || $("#ComboSite").val() == "Select" || $("#ComboSite").val() == null) {
        swal(
            '',
            'Site Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#cmbStatus").val() == "" || $("#cmbStatus").val() == "Select" || $("#cmbStatus").val() == null) {
        swal(
            '',
            'Status Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $("#LoaderPage").show();
                var form_data = JSON.stringify({
                    ID: "0", NomorTelepon: $("#NomorTelepon").val(),
                    Site: $("#ComboSite").val(), Status: $("#cmbStatus").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'INSERT'
                });
                $.ajax({
                    url: "asmx/TrmNomorWA.asmx/UpdateTable",
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
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrmNomorWA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrmNomorWA.aspx";
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
function ActionDelete() {
    if ($("#hd_sessionLogin").val() == "" || $("#hd_sessionLogin").val() == null) {
        swal(
            '',
            'UserName Kosong, Please Relogin',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_TrxID").val() == "" || $("#ContentPlaceHolder1_TrxID").val() == null) {
        swal(
            '',
            'Data Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $("#LoaderPage").show();
                var form_data = JSON.stringify({
                    ID: $("#ContentPlaceHolder1_TrxID").val(), NomorTelepon: $("#NomorTelepon").val(),
                    Site: $("#ComboSite").val(), Status: $("#cmbStatus").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'DELETE'
                });
                $.ajax({
                    url: "asmx/TrmNomorWA.asmx/UpdateTable",
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
                                    window.location.href = "TrmNomorWA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrmNomorWA.aspx";
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
function OnchangeSite(SiteID) {
    var selectedText = $("#ComboSite").find("option:selected").text();
    var selectedValue = $("#ComboSite").val();
    $("#ContentPlaceHolder1_Hd_Site").val(selectedValue);
}
