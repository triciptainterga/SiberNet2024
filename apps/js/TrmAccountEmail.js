$(document).ready(function () {
    DataTableAccount();
    ComboSite()
    $("#LoaderPage").hide();
});
function DataTableAccount() {
    var myTable = $('#TableEmailAccount').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmAccountEmail.asmx/DataTableEmailAccounts",
        data: "{TrxID: '0',TrxAccount:'0',TrxSite:'0',TrxUserName: '" + $("#hd_sessionLogin").val() + "',TrxAction: 'DataTable'}",
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
                    "<a class='dropdown-item' href='#' onclick=ModalUpdate('" + json[i].rec_id + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"

                myTable.row.add([json[i].incoming_account_name, json[i].NamaGrup, urlClick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelect() {
    $.ajax({
        type: "POST",
        url: "asmx/TrmAccountEmail.asmx/DataTableEmailAccounts",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxAccount:'0', TrxSite:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'Select'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#Account_Email_Corporate").val(json[i].incoming_account_name);
                $('#ComboSite option:selected').text(json[i].NamaGrup);

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
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Data is empty")
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

                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxAccount: $("#Account_Email_Corporate").val(), TrxSite: $("#ComboSite").val(),
                    TrxUserName: $("#hd_sessionLogin").val(),TrxAction: 'Update'
                });
                $.ajax({
                    url: "asmx/TrmAccountEmail.asmx/UpdateDataTableEmailAccounts",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i, x = "";
                        var result = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data Has Been Update Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "TrmAccountEmail.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Update failed !',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                               return false;
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
function ComboSite() {
    var ComboSiteName = $('#ComboSite');
    $.ajax({
        type: "POST",
        url: "asmx/TrmAccountEmail.asmx/DataTableEmailAccounts",
        data: "{TrxID: '0',TrxAccount:'0',TrxSite:'0',TrxUserName: '" + $("#hd_sessionLogin").val() + "',TrxAction: 'Combo'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultNya = "";

            for (i = 0; i < json.length; i++) {

                ResultNya = '<option value="' + json[i].IdGrup + '">' + json[i].NamaGrup + '</option>';
                ComboSiteName.append(ResultNya);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ModalUpdate(rec_id) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    TrmSelect();
}