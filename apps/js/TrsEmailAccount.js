$(document).ready(function () {
    TrsEmailAccount();
    $("#LoaderPage").hide();
});
function TrsEmailAccount() {
    var myTable = $('#TrsEmailAccount').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK47'}",
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
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].rec_id + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].rec_id, json[i].name, json[i].incoming_account_name, "*******", json[i].incoming_server, json[i].incoming_port,
                json[i].encrypted_connection, json[i].outgoing_account_name, "*******", json[i].outgoing_server,
                json[i].outgoing_port, json[i].encrypted_connection_out, json[i].NeedLogin, json[i].incoming_back_up, json[i].outgoing_back_up,
                json[i].server_protocol, json[i].server_protocol_out, json[i].server_profile_id, json[i].email_signiture_id, json[i].email_service_method_id,
                json[i].Status, urlClick]).draw(false);
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
    //SelectEmailAccount($("#ContentPlaceHolder1_TrxID").val());
}
function ActionUpdate() {
    if ($("#TxtName").val() == '') {
        swal("Name is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
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
                    url: "asmx/TrsEmailServiceMethod.asmx/UpdateServiceMethod",
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
                        TrsSignature();

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
function SelectEmailAccount(rec_id) {
    $("#ModalChannel").modal('show')
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + rec_id + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK47'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {
       
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}