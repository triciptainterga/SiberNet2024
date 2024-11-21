$(document).ready(function () {
    TrmHolidays();
    $("#LoaderPage").hide();
});
function TrmHolidays() {
    var myTable = $('#TrmHolidays').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmHolidays.asmx/TableHolidays",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].START_DATE);
                var milisegundos = parseInt(json[i].START_DATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var vs_endate = new Date(json[i].END_DATE);
                var enddate_milisegundos = parseInt(json[i].END_DATE.replace("/Date(", "").replace(")/", ""));
                var endate_Date = new Date(enddate_milisegundos).toLocaleDateString("en-UE");
                var endate_Time = new Date(enddate_milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"

                if (json[i].STATUS == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].NAME, newDate + ' ' + newTime, endate_Date + ' ' + endate_Time, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectHolidays(rec_id) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmHolidays.asmx/SelectHolidays",
        data: "{TrxID:'" + rec_id + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                var milisegundos = parseInt(json[i].START_DATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-GB");
                var Holiday_Start = newDate.split('/');

                var milisegundos_end = parseInt(json[i].END_DATE.replace("/Date(", "").replace(")/", ""));
                var newDate_end = new Date(milisegundos_end).toLocaleDateString("en-GB");
                var Holiday_End = newDate_end.split('/');
                $("#Holiday_Start").val(Holiday_Start[2] + "-" + Holiday_Start[1] + "-" + Holiday_Start[0]);
                $("#Holiday_End").val(Holiday_End[2] + "-" + Holiday_End[1] + "-" + Holiday_End[0]);
                $("#Holiday_Name").val(json[i].NAME);
                $("#cmbStatus").val(json[i].STATUS);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function showAdd() {
    $("#ContentPlaceHolder1_TrxID").val("");
    $("#Holiday_Name").val("");
    $("#Holiday_Start").val("");
    $("#Holiday_End").val("");
    $("#cmbStatus option:selected").val("");
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function showUpdate(rec_id) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    TrmSelectHolidays($("#ContentPlaceHolder1_TrxID").val());
}
function showdDelete(rec_id) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    TrmSelectHolidays($("#ContentPlaceHolder1_TrxID").val());
}
function ActionSimpan() {
    if ($("#Holiday_Name").val() == "") {
        swal("Holiday is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#Holiday_Name").val())) {
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
    if ($("#Holiday_Start").val() == "") {
        swal("Holiday Start Date")
        return false;
    }
    if ($("#Holiday_End").val() == "") {
        swal("Holiday End Date")
        return false;
    }
    if ($("#cmbStatus").val() == "" || $("#cmbStatus").val() == "Select") {
        swal("Status is empty")
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

                var form_data = JSON.stringify({ TrxID: "0", TrxUserName: $("#hd_sessionLogin").val(), TrxName: $("#Holiday_Name").val(), TrxStart: $("#Holiday_Start").val(), TrxEnd: $("#Holiday_End").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: 'INSERT' });
                $.ajax({
                    url: "asmx/TrmHolidays.asmx/InsertHolidays",
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
                                    $("#ModalChannel").modal('hide');
                                    TrmHolidays();
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    TrmHolidays();
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
    if ($("#Holiday_Name").val() == "") {
        swal("Holiday is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#Holiday_Name").val())) {
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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Data Holiday is empty")
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: $("#Holiday_Name").val(), TrxStart: $("#Holiday_Start").val(), TrxEnd: $("#Holiday_End").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: 'UPDATE' });
                $.ajax({
                    url: "asmx/TrmHolidays.asmx/UpdateHolidays",
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
                                    $("#ModalChannel").modal('hide');
                                    TrmHolidays();
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    TrmHolidays();
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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Data Holiday is empty")
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: $("#Holiday_Name").val(), TrxStart: $("#Holiday_Start").val(), TrxEnd: $("#Holiday_End").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: 'DELETE' });
                $.ajax({
                    url: "asmx/TrmHolidays.asmx/DeleteHolidays",
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
                                    $("#ModalChannel").modal('hide');
                                    TrmHolidays();
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#ModalChannel").modal('hide');
                                    TrmHolidays();
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