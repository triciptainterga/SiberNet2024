$(document).ready(function () {
    DataTableNya();
    $("#LoaderPage").hide();
});
function DataTableNya() {
    var myTable = $('#TrmMaxHandle').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/DataFilterEmail",
        data: "{ID:'0', JumlahFilter:'0', UserName: '" + $("#hd_sessionLogin").val() + "', Action:'TABLE'}",
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
                    "<a class='dropdown-item' href='#' onclick=Rubah('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"

                myTable.row.add([json[i].ID, json[i].JUMLAH, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Tambah() {
    $("#ModalChannel").modal('show');
}
function Rubah(TrxID) {
    $("#ModalChannel").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelected();
}
function TrmSelected() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmMailSystem.asmx/DataFilterEmail",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() +"', JumlahFilter:'0', UserName: '" + $("#hd_sessionLogin").val() + "', Action:'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
                $("#Jumlah").val(json[i].JUMLAH);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
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
    if ($("#Jumlah").val() == "") {
        swal(
            '',
            'Jumlah is empty',
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

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), JumlahFilter: $("#Jumlah").val(), UserName: $("#hd_sessionLogin").val(), Action: "UPDATE" });
                $.ajax({
                    url: "asmx/TrmMailSystem.asmx/DataFilterEmail",
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
                                    window.location.href = "TrmJumlahFilter.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
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