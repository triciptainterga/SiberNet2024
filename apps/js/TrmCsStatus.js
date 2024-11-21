$(document).ready(function () {
    TrmCustomerStatus();
    $("#LoaderPage").hide();
});
function TrmCustomerStatus() {
    var myTable = $('#TrmCustomerStatus').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmCsStatus",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "',TrxName:'0',TrxStatus:'0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].datecreate);
                var milisegundos = parseInt(json[i].datecreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "','" + json[i].StatusName + "','" + json[i].NA + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    //"<a class='dropdown-item' href='#' onclick=showDelete('" + json[i].ID + "','" + json[i].StatusName + "','" + json[i].NA + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].StatusName, TrxParam, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var JenisKondisi = "AllWhereData";
    //var NamaView = "TrmCsStatus";
    //var KondisiData = "";
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    //var myTable = $('#TrmCustomerStatus').DataTable();
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

    //            var d = new Date(json[i].datecreate);
    //            var milisegundos = parseInt(json[i].datecreate.replace("/Date(", "").replace(")/", ""));
    //            var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
    //            var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

    //            var urlClick = "<div class='dropdown'>" +
    //                               "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
    //                               "<div class='dropdown-menu dropdown-menu-right'>" +
    //                               "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "','" + json[i].StatusName + "','" + json[i].NA + "')><i class='fa fa-pencil'></i> Edit</a>" +
    //                               //"<a class='dropdown-item' href='#' onclick=showDelete('" + json[i].ID + "','" + json[i].StatusName + "','" + json[i].NA + "')><i class='fa fa-trash-o'></i> Delete</a>" +
    //                               "</div>" +
    //                           "</div>"
    //            if (json[i].Status == "Aktif") {
    //                var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
    //            } else {
    //                var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
    //            }
    //            myTable.row.add([json[i].ID, json[i].StatusName, TrxParam, json[i].Usercreate, newDate + ' ' + newTime, urlClick]).draw(false);
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function showAdd() {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
    $("#TxtStatusCustomer").val("")
    $('#TxtStatusCustomer').attr("disabled", false);
    $("#cmbStatus").attr("disabled", false);
}
function showUpdate(TrxID, Name, Status) {
    //alert(Name)
    if (Status == 'N') {
        var TrxStatusjs = "Non Aktif";
    } else {
        var TrxStatusjs = "Aktif";
    }
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    //$('#TxtChannel').attr("disabled", true);
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#TxtStatusCustomer").val(Name);
    $('#TxtStatusCustomer').attr("disabled", false);
    $("#cmbStatus").attr("disabled", false);
    $("#cmbStatus").find("option:selected").text();
    $("#cmbStatus").val(Status);
}
function showDelete(TrxID, Name, Status) {
    //alert(Name)
    if (Status == 'N') {
        var TrxStatusjs = "Non Aktif";
    } else {
        var TrxStatusjs = "Aktif";
    }
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $('#TxtStatusCustomer').attr("disabled", true);
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#TxtStatusCustomer").val(Name);
    $("#cmbStatus").find("option:selected").text();
    $("#cmbStatus").val(Status);
    $("#cmbStatus").attr("disabled", true);
}
function ActionSimpan() {
    var TrxName = $("#TxtStatusCustomer").val();
    var TrxStatus = $("#cmbStatus").val();
    if (TrxName == '') {
        swal("Category type is empty")
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
    if ($("#TxtStatusCustomer").val() == '') {
        swal("Status customer is empty");
        return false
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
        $("#LoaderPage").show();
            var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxStatus: TrxStatus });
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCsStatus",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: form_data,
                success: function () {
                    console.log(form_data)
                    var TrxMessage = 'Your data status customer <b>' + $("#TxtStatusCustomer").val() + '</b> has been save'
                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                    $("#TxtStatusCustomer").val("");
                    $("#cmbStatus").val("");
                    $("#ModalChannel").modal('hide');
                    $("#LoaderPage").hide();
                    TrmCustomerStatus();
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
    var TrxName = $("#TxtStatusCustomer").val();
    var TrxStatus = $("#cmbStatus").val();
    if (TrxName == '') {
        swal("Category type is empty")
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
            $("#LoaderPage").show();
            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxStatus: TrxStatus });
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCsStatus",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                data: form_data,
                success: function () {
                    console.log(form_data)
                    var TrxMessage = 'Your data customer status <b>' + $("#TxtStatusCustomer").val() + '</b> has been Update'
                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                    $("#TxtStatusCustomer").val("");
                    $("#cmbStatus").val("");
                    $("#ModalChannel").modal('hide');
                    $("#LoaderPage").hide();
                    TrmCustomerStatus();

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
        else{            
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