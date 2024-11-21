$(document).ready(function () {
    DropdownCmbproductType();
    TrmProductName();
});
function TrmProductName() {
    var myTable = $('#TrmProductName').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmProductName.asmx/TableProductName",
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
                    "<a class='dropdown-item' href='#' onclick=showUpdate(" + json[i].ID + ")><i class='fa fa-pencil'></i> Edit</a>" +
                    "<a class='dropdown-item' href='#' onclick=showdDelete(" + json[i].ID + ")><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Product_Status == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].NamaPenyebab, json[i].Product_Name, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectProductName(TrxID) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmProductName.asmx/SelectProductName",
        data: "{TrxID:'" + TrxID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $("#cmbproductType").val(json[i].Product_TypeID);
                $("#TxtProductName").val(json[i].Product_Name);
                $("#cmbStatus").val(json[i].Product_Status);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DropdownCmbproductType() {
    var cmbproductType = $('#cmbproductType');
    $.ajax({
        type: "POST",
        url: "asmx/TrmProductName.asmx/BTN_mPenyebab",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {
                result = '<option value="' + json[i].ID + '">' + json[i].NamaPenyebab + '</option>';
                cmbproductType.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionSimpan() {
    if ($("#cmbproductType").val() == '') {
        swal("Product Type is empty");
        return false
    }
    if ($("#TxtProductName").val() == '') {
        swal("Product Name is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtProductName").val())) {
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
    if ($("#cmbStatus").val() == '') {
        swal("Status is empty");
        return false
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID:"0", TrxUserName: $("#hd_sessionLogin").val(), TrxProductType: $("#cmbproductType").val(), TrxProductName: $("#TxtProductName").val(), TrxStatus: $("#cmbStatus").val(), TrxAction:"Insert" });
                $.ajax({
                    url: "asmx/TrmProductName.asmx/InsertProductNameBL",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Insert Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#cmbproductType").val("");
                                    $("#TxtProductName").val("");
                                    $("#cmbStatus").val("");
                                    $("#cmbStatus").text("");
                                    $("#ModalChannel").modal('hide');
                                    window.location.href = "TrmProductName.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed',
                                    'error'
                                ).then(function () {
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
            else {
                $("#ModalChannel").modal('hide');
            }
        });
}
function ActionUpdate() {
    if ($("#TxtProductName").val() == '') {
        swal("Product Name is empty");
        return false
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test($("#TxtProductName").val())) {
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxProductType: $("#cmbproductType").val(), TrxProductName: $("#TxtProductName").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Update" });
                $.ajax({
                    url: "asmx/TrmProductName.asmx/UpdateProductNameBL",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#cmbproductType").val("");
                                    $("#TxtProductName").val("");
                                    $("#cmbStatus").val("");
                                    $("#cmbStatus").text("");
                                    $("#ModalChannel").modal('hide');
                                    window.location.href = "TrmProductName.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
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
            else {
                $("#ModalChannel").modal('hide');
            }
        });
}
function ActionDelete() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxProductType: $("#cmbproductType").val(), TrxProductName: $("#TxtProductName").val(), TrxStatus: $("#cmbStatus").val(), TrxAction: "Delete" });
                $.ajax({
                    url: "asmx/TrmProductName.asmx/DeleteProductNameBL",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#cmbproductType").val("");
                                    $("#TxtProductName").val("");
                                    $("#cmbStatus").val("");
                                    $("#cmbStatus").text("");
                                    $("#ModalChannel").modal('hide');
                                    window.location.href = "TrmProductName.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
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
            else {
                $("#ModalChannel").modal('hide');
            }
        });
}
function showAdd() {
    $("#ContentPlaceHolder1_TrxID").val("");
    $("#cmbproductType").find("option:selected").text();
    $("#cmbproductType").val("");
    $("#TxtProductName").val("");
    $("#cmbStatus").find("option:selected").text();
    $("#cmbStatus").val("");
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
    $("#ModalChannel").modal('show');
}
function showUpdate(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    TrmSelectProductName($("#ContentPlaceHolder1_TrxID").val())
}
function showdDelete(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    TrmSelectProductName($("#ContentPlaceHolder1_TrxID").val())
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
}