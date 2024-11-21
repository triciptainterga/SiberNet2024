$(document).ready(function () {
    TrmGroupAgent();
});
function TrmGroupAgent() {
    var myTable = $('#TrmGroupAgent').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmGroupAgent",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                                  "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                                  "<div class='dropdown-menu dropdown-menu-right'>" +
                                  "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].IdGrup + "')><i class='fa fa-pencil'></i> Edit</a>" +
                                  "</div>" +
                              "</div>"
                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].IdGrup, json[i].NamaGrup, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectGroupAgent(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectTransactionTrmGroupAgent",
        data: "{TrxID:'" + TrxID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $("#TxtGroupAgent").val(json[i].NamaGrup);
                $("#cmbStatus").val(json[i].NA);

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
    $("#cmbStatus").find("option:selected").text();
    $("#cmbStatus").val("");
    $("#TxtGroupAgent").val("");
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectGroupAgent($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    var TrxName = $("#TxtGroupAgent").val();
    var TrxStatus = $("#cmbStatus").val();
    if (TrxName == '') {
        swal("Group Agent is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
        } else {
            console.log(TrxName)
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
    if (TrxStatus == '') {
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
             var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxStatus: TrxStatus });
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmGroupAgent",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: form_data,
                success: function () {
                    console.log(form_data)
                    var TrxMessage = 'Your data category <b>' + $("#TxtGroupAgent").val() + '</b> has been save'
                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                    $("#TxtGroupAgent").val("");
                    $("#cmbStatus").val("");
                    $("#ModalChannel").modal('hide');
                    TrmGroupAgent();
                    window.location.href = "TrmGroupAgent.aspx";
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                complete: function () {

                }
            });
        }else{
            
            $("#ModalChannel").modal('hide');
        }
     });
}
function ActionUpdate() {
    var TrxName = $("#TxtGroupAgent").val();
    var TrxStatus = $("#cmbStatus").val();
    if (TrxName == '') {
        swal("Group Agent is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
        } else {
            console.log(TrxName)
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
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxStatus: TrxStatus });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmGroupAgent",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        var TrxMessage = 'Your data category <b>' + $("#TxtGroupAgent").val() + '</b> has been Update'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                        $("#TxtGroupAgent").val("");
                        $("#cmbStatus").val("");
                        $("#ModalChannel").modal('hide');
                        TrmGroupAgent();
                        window.location.href = "TrmGroupAgent.aspx";
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });
            }else{
            
                $("#ModalChannel").modal('hide');
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