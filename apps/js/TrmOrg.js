$(document).ready(function () {
    TrmDepartment();
    $("#LoaderPage").hide();
});
function TrmDepartment() {
    var myTable = $('#TrmDepatment').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmDepartment",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxEmail: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DATECREATE);
                var milisegundos = parseInt(json[i].DATECREATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ORGANIZATION_ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ORGANIZATION_ID, json[i].ORGANIZATION_NAME, json[i].EMAIL, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectDepartment(TrxID) {
    $.ajax({
        type: "POST",
        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxID +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK09'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#TxtEmail').val(json[i].EMAIL);
                $("#cmbStatus").val(json[i].NA);
                $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA)
                $('#TxtDepartment').val(json[i].ORGANIZATION_NAME);

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
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#TxtDepartment").val("");
    $("#TxtEmail").val("");
    $("#cmbStatus").val("");
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectDepartment($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    var TrxName = $("#TxtDepartment").val();
    var TrxEmail = $("#TxtEmail").val();
    if (TrxName == '') {
        swal("Department is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
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
    if (TrxEmail != '') {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (TrxEmail.match(mailformat)) {

        } else {
            swal("Format email address is not valid")
            return false
        }
    } else {
        swal("Email address is empty")
        return false
    }
    if ($("#ContentPlaceHolder1_Hd_Status").val() == '') {
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
            $("#LoaderPage").show();
            var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxEmail: TrxEmail, TrxStatus: $("#ContentPlaceHolder1_Hd_Status").val() });
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmDepartment",
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
                                $("#TxtDepartment").val("");
                                $("#TxtEmail").val("");
                                $("#cmbStatus").val("");
                                $("#ModalChannel").modal('hide');
                                TrmDepartment();
                                $("#LoaderPage").hide();
                                window.location.href = "TrmOrg.aspx";
                            });
                        } else {
                            swal(
                                '',
                                'Insert Data Has Been Failed',
                                'error'
                            ).then(function () {
                                $("#ModalChannel").modal('hide');
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

        } else {
            $("#ModalChannel").modal('hide');
        }
    });
}
function ActionUpdate() {
    var TrxName = $("#TxtDepartment").val();
    var TrxEmail = $("#TxtEmail").val();
    if (TrxName == '') {
        swal("Department is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
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
    if (TrxEmail != '') {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (TrxEmail.match(mailformat)) {

        } else {
            swal("Format email address is not valid")
            return false
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
            $("#LoaderPage").show();
            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxEmail: TrxEmail, TrxStatus: $("#ContentPlaceHolder1_Hd_Status").val() });
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmDepartment",
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
                                $("#TxtDepartment").val("");
                                $("#TxtEmail").val("");
                                $("#cmbStatus").val("");
                                $("#ModalChannel").modal('hide');
                                TrmDepartment();
                                $("#LoaderPage").hide();
                            });
                        } else {
                            swal(
                                '',
                                'Update Data Has Been Failed',
                                'error'
                            ).then(function () {
                                $("#ModalChannel").modal('hide');
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
        } else {
            $("#ModalChannel").modal('hide');
            window.location.href = "TrmOrg.aspx";
        }
    });
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
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
}