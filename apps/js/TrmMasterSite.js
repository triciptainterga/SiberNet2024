$(document).ready(function () {
    TrmSite();
    $("#LoaderPage").hide();
});
function TrmSite() {
    var myTable = $('#TrmSite').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmSite",
        data: "{ID: '0', Site: '" + $("#TxtSite").val() + "', Location: '" + $("#TxtLocation").val() + "', Status: '" + $("#cmbStatus").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].CreatedDate);
                var milisegundos = parseInt(json[i].CreatedDate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=UpdateModal('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Status == "Yes") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].Site, json[i].Location, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSiteSelected() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmSite",
        data: "{ID: '" + $("#ContentPlaceHolder1_TrxID").val() + "', Site: '" + $("#TxtSite").val() + "', Location: '" + $("#TxtLocation").val() + "', Status: '" + $("#cmbStatus").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $('#TxtSite').val(json[i].Site);
                $('#TxtLocation').val(json[i].Location);
                $("#cmbStatus option:selected").text(json[i].Status);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UpdateModal(TrxID) {
    $("#ModalSite").modal('show');
    $("#Save").css("display", "none");
    $("#Update").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSiteSelected();
}
function InsertModal() {
    $("#ModalSite").modal('show');
    $("#Save").css("display", "block");
    $("#Update").css("display", "none");
    TrmSiteSelected();
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
                    ID: $("#ContentPlaceHolder1_TrxID").val(), Site: $("#TxtSite").val(),
                    Location: $("#TxtLocation").val(), Status: $("#cmbStatus").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UPDATE'
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmSite",
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
                                    window.location.href = "TrmMasterSite.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrmMasterSite.aspx";
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
    if ($("#TxtSite").val() == "") {
        swal(
            '',
            'Site Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#TxtLocation").val() == "") {
        swal(
            '',
            'Location Kosong',
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
                    ID: "0", Site: $("#TxtSite").val(),
                    Location: $("#TxtLocation").val(), Status: $("#cmbStatus").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'INSERT'
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmSite",
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
                                    window.location.href = "TrmMasterSite.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrmMasterSite.aspx";
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