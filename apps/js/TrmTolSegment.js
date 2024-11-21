$(document).ready(function () {
    DataTableNya();
    $("#LoaderPage").hide();
    $("#Update").hide();
    $("#Delete").hide();
});
function showAdd() {
    $("#ModalChannel").modal('show');
    $("#Update").hide();
    $("#Delete").hide();
    $("#Save").show();
    $('#Toll').val("")
    $("#cmbStatus").val();
}
function DataTableNya() {
    var myTable = $('#TrmMaxHandle').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmTolSegment.asmx/ExecuteToll",
        data: "{ID:'0', Name:'0', State:'0', UserCreate: '" + $("#hd_sessionLogin").val() + "', Action:'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=EditNya('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=DeleteNya('" + json[i].ID + "')><i class='fa fa-trash'></i> Delete</a>" +
                    "</div>" +
                    "</div>"

                if (json[i].State == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].Name, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DeleteNya(ID) {
    $("#Save").hide();
    $("#Delete").show();
    $("#Update").hide();
    $("#ContentPlaceHolder1_TrxID").val(ID);
    $("#ModalChannel").modal('show');
    SelectNya();
}
function EditNya(ID) {
    $("#Save").hide();
    $("#Delete").hide();
    $("#Update").show();
    $("#ContentPlaceHolder1_TrxID").val(ID);
    $("#ModalChannel").modal('show');
    SelectNya();
}
function SelectNya() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmTolSegment.asmx/ExecuteToll",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', Name:'0', State:'0', UserCreate: '" + $("#hd_sessionLogin").val() + "', Action:'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $('#Toll').val(json[i].Name)
                $("#cmbStatus").val(json[i].State);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionSave() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Username is empty, Please relogin',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Toll").val() == "") {
        swal(
            '',
            'Toll road segment is empty, Please relogin',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#cmbStatus").val() == "" || $("#cmbStatus").val() == "Select") {
        swal(
            '',
            'Status is empty, Please relogin',
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

                var form_data = JSON.stringify({ ID: "0", Name: $("#Toll").val(), State: $("#cmbStatus").val(), UserCreate: $("#hd_sessionLogin").val(), Action: "INSERT" });
                $.ajax({
                    url: "asmx/TrmTolSegment.asmx/ExecuteToll",
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
                                    window.location.href = "TrmTolSegment.aspx"
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
function ActionUpdate() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Username is empty, Please relogin',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Toll").val() == "") {
        swal(
            '',
            'Toll road segment is empty, Please relogin',
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), Name: $("#Toll").val(), State: $("#cmbStatus").val(), UserCreate: $("#hd_sessionLogin").val(), Action: "UPDATE" });
                $.ajax({
                    url: "asmx/TrmTolSegment.asmx/ExecuteToll",
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
                                    window.location.href = "TrmTolSegment.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed !',
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
function ActionDelete() {
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Username is empty, Please relogin',
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), Name: $("#Toll").val(), State: $("#cmbStatus").val(), UserCreate: $("#hd_sessionLogin").val(), Action: "DELETE" });
                $.ajax({
                    url: "asmx/TrmTolSegment.asmx/ExecuteToll",
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
                                    window.location.href = "TrmTolSegment.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed !',
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