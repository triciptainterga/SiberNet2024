$(document).ready(function () {
    TrsServerProtocol();
    $("#LoaderPage").hide();
});
function TrsServerProtocol() {
    var myTable = $('#TrsServerProtocol').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'3', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK49'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].rec_id + "','" + json[i].name + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"
                myTable.row.add([json[i].rec_id, json[i].name, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function showUpdate(rec_id, name) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    $("#TxtName").val(name);
}
function ActionUpdate() {
    if ($("#TxtName").val() == '') {
        swal("Name is empty")
        return false;
    } else {
        var regex = /^[^0-9*\\\^\/<>_#']+$/;
        if (regex.test($("#TxtName").val())) {
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

                $("#LoaderPage").show();
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxName: $("#TxtName").val(), TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/TrsServerProtocol.asmx/UpdateServerProtokol",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        swal("update data has been success", {
                            icon: "success",
                        });

                        var TrxMessage = 'Your data <b>' + $("#TxtName").val() + '</b> has been update'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                        $("#ModalChannel").modal('hide');
                        $("#LoaderPage").hide();
                        TrsServerProtocol();

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