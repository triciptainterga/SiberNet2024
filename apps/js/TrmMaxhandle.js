$(document).ready(function () {
    TrmMaxHandle();
    $("#LoaderPage").hide();
});
function TrmMaxHandle() {
    var myTable = $('#TrmMaxHandle').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMaxhandle.asmx/TableMaxHandle",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
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
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].id + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].id + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"

                myTable.row.add([json[i].id, json[i].max_handle, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var JenisKondisi = "AllWhereData";
    //var NamaView = "UIDESK_TrmMaxHandle";
    //var KondisiData = "";
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    //var myTable = $('#TrmMaxHandle').DataTable();
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, result = "";

    //        myTable.clear().draw();
    //        for (i = 0; i < json.length; i++) {

    //            var urlClick = "<div class='dropdown'>" +
    //                "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
    //                "<div class='dropdown-menu dropdown-menu-right'>" +
    //                "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].id + "')><i class='fa fa-pencil'></i> Edit</a>" +
    //                "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].id + "')><i class='fa fa-trash-o'></i> Delete</a>" +
    //                "</div>" +
    //                "</div>"

    //            myTable.row.add([json[i].id, json[i].max_handle, urlClick]).draw(false);
    //        }
    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function ActionSimpan() {
    if ($("#hd_sessionLogin").val() == "") {
        swal("Username is empty, Please relogin")
        return false;
    }
    if ($("#max_handle").val() == "") {
        swal("Max Handle is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#max_handle").val())) {
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID:"0", TrxMaxHandle: $("#max_handle").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction:"Insert" });
                $.ajax({
                    url: "asmx/TrmMaxhandle.asmx/TransactionMaxHandle",
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
                                    window.location.href = "TrmMaxhandle.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrmMaxhandle.aspx"
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
    if ($("#hd_sessionLogin").val() == "") {
        swal("Username is empty, Please relogin")
        return false;
    }
    if ($("#max_handle").val() == "") {
        swal("Max Handle is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#max_handle").val())) {
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
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxMaxHandle: $("#max_handle").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "Update" });
                $.ajax({
                    url: "asmx/TrmMaxhandle.asmx/TransactionMaxHandle",
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
                                    window.location.href = "TrmMaxhandle.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrmMaxhandle.aspx"
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
    if ($("#hd_sessionLogin").val() == "") {
        swal("Username is empty, Please relogin")
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxMaxHandle: $("#max_handle").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxAction: "Delete" });
                $.ajax({
                    url: "asmx/TrmMaxhandle.asmx/TransactionMaxHandle",
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
                                    window.location.href = "TrmMaxhandle.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "TrmMaxhandle.aspx"
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
function showAdd() {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectMaxHandle($("#ContentPlaceHolder1_TrxID").val());
}
function showdDelete(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectMaxHandle($("#ContentPlaceHolder1_TrxID").val());
}
function TrmSelectMaxHandle(TrxID) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmMaxhandle.asmx/SelectMaxHandle",
        data: "{TrxID:'" + TrxID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $("#max_handle").val(json[i].max_handle);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var JenisKondisi = "AllWhereData";
    //var NamaView = "UIDESK_TrmMaxHandle";
    //var KondisiData = "Where id='" + TrxID + "'";
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, result = "";

    //        for (i = 0; i < json.length; i++) {

    //            $("#max_handle").val(json[i].max_handle);

    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}