$(document).ready(function () {
    TrmApplication();
});
function TrmApplication() {
    var myTable = $('#DataTables').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'0', TableID: '003', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DATE_CREATE);
                var milisegundos = parseInt(json[i].DATE_CREATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=UpdateClick('" + json[i].ID + "')><i class='fa fa-pencil'></i>Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=DeleteClick('" + json[i].ID + "')><i class='fa fa-trash'></i>Delete</a>" +
                    "</div>" +
                    "</div>"

                myTable.row.add([json[i].ID, json[i].APPLICATION, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TransactionModal() {
    ClearTextboxt();
    $("#modal-apps").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function DetailApplication() {
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() +"', TableID:'003', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#Application").val(json[i].APPLICATION)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function UpdateClick(ID){
    $("#ContentPlaceHolder1_TrxID").val(ID)
    $("#modal-apps").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    DetailApplication();
}
function DeleteClick(ID) {
    $("#ContentPlaceHolder1_TrxID").val(ID)
    $("#modal-apps").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    DetailApplication();
}
function ActionSimpan() {
    if ($("#Application").val() == "" || $("#Application").val() == null) {
        swal(
            '',
            'Application Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        TransaksiID: "0", Application: $("#Application").val(), Status: "0", UserName: $("#hd_sessionLogin").val(), Action: "SUBMIT",
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
                    url: "asmx/Uidesk_01.asmx/APPS_UIDESK_MASTER_003",
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
                                    'Insert Transaction Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-apps").modal('hide');
                                    window.location.reload();
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Transaction Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false
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
function ActionUpdate() {
    var form_data = JSON.stringify({
        TransaksiID: $("#ContentPlaceHolder1_TrxID").val(), Application: $("#Application").val(), Status: "0", UserName: $("#hd_sessionLogin").val(), Action: "UPDATE",
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
                    url: "asmx/Uidesk_01.asmx/APPS_UIDESK_MASTER_003",
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
                                    'Update Transaction Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-apps").modal('hide');
                                    window.location.reload();
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Transaction Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false
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
    var form_data = JSON.stringify({
        TransaksiID: $("#ContentPlaceHolder1_TrxID").val(), Application: $("#Application").val(), Status: "0", UserName: $("#hd_sessionLogin").val(), Action: "DELETE",
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
                    url: "asmx/Uidesk_01.asmx/APPS_UIDESK_MASTER_003",
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
                                    'Delete Transaction Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-apps").modal('hide');
                                    window.location.reload();
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Transaction Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false
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
function ClearTextboxt() {
    $("#Application").val("")
}