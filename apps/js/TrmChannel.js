
$(document).ready(function () {
    TrmChannel();
    $("#LoaderPage").hide();
});
function TrmChannel() {
    var myTable = $('#TrmChannel').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmChannel",
        data: "{TrxID: '-', TrxName: '-', TrxStatus: '-', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
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
				
				//alert(json[i].Name);

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
					"<a class='dropdown-item' href='#' onclick='showUpdate(\"" + json[i].TypeID + "\", \"" + json[i].Name + "\", \"" + json[i].NA + "\")'><i class='fa fa-pencil'></i> Edit</a>" +
					"<a class='dropdown-item' href='#' onclick='showDelete(\"" + json[i].TypeID + "\", \"" + json[i].Name + "\", \"" + json[i].NA + "\")'><i class='fa fa-trash-o'></i> Delete</a>"              
			  "</div>" +
                    "</div>"
                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].TypeID, json[i].Name, TrxParam, urlClick]).draw(false);
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
    $("#ContentPlaceHolder1_TrxID").val("");
    $("#TxtChannel").val("");
    $("#cmbStatus option:selected").val("");
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function showUpdate(TrxID, Name, Status) {
    //alert(Status)
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
    $("#TxtChannel").val(Name);
    //$("#cmbStatus option:selected").val(Status);
    $("#cmbStatus").find("option:selected").text();
    $('#TxtChannel').attr("disabled", true);
}
function showdDelete(TrxID, Name, Status) {
    if (Status == 'N') {
        var TrxStatusjs = "Non Aktif";
    } else {
        var TrxStatusjs = "Aktif";
    }
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#TxtChannel").val(Name);
    $("#cmbStatus").find("option:selected").text();
    $("#cmbStatus").val(Status);
} 

function ActionUpdate() {
    var TrxName = $("#TxtChannel").val();
    var TrxStatus = $("#cmbStatus").val();
    if (TrxName == '') {
        swal("Category type is empty")
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
                url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmChannel",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: form_data,
                success: function () {
                    console.log(form_data)
                    var TrxMessage = 'Your data category <b>' + $("#TxtChannel").val() + '</b> has been Update'
                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                    $("#TxtChannel").val("");
                    $("#cmbStatus").val("");
                    $("#ModalChannel").modal('hide');
                    TrmChannel();
                    $("#LoaderPage").hide();

                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                complete: function () {

                }
            });
                swal("Done", {
                    icon: "success",
                });
                $("#ModalChannel").modal('hide');
            } else {
                //swal("Your imaginary file is safe!");
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
    //return false
}
function swalAction() {
    //swal("Good job!", "You clicked the button!", "success");
    swal({
        title: "Are you sure?",
        //text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
            if (willDelete) {
            swal("Data has been success", {
                icon: "success",
            });
        } else {
            //swal("Your imaginary file is safe!");
        }
    });

// * Function bener

    event.preventDefault(); // // Function sweat alert
    var form = document.forms["myForm"]; // // Function sweat alert
    swal({
        title: "Do you want to process?",
        //text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {        
           
        swal("save data has been success", {
        icon: "success",
    });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
            $("#ModalChannel").modal('hide');
        }
    });

}
function ActionSimpan() {
        var TrxName = $("#TxtChannel").val();
        var TrxStatus = $("#cmbStatus").val();
        if (TrxName == '') {
            swal("Category type is empty")
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
        if ($("#TxtChannel").val() == '') {
            swal("Channel Transaction is empty");
            return false
        } else {
            var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
            if (regex.test($("#TxtChannel").val())) {
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
                 $("#LoaderPage").show();
                var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxStatus: TrxStatus });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmChannel",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        var TrxMessage = 'Your data category <b>' + $("#TxtChannel").val() + '</b> has been save'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                        $("#TxtChannel").val("");
                        $("#cmbStatus").val("");
                        $("#ModalChannel").modal('hide');
                        TrmChannel();
                        $("#LoaderPage").hide();

                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });
                swal("save data has been success", {
                icon: "success",
            });
            } else {
                //swal("Your imaginary file is safe!");
                $("#ModalChannel").modal('hide');
            }
       });
}
function ActionDelete(){
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) { 
            $("#LoaderPage").show();
            
            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val()});
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/DeleteTransactionTrmChannel",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                data: form_data,
                success: function () {
                    console.log(form_data)
                    var TrxMessage = 'Your data category <b>' + $("#TxtChannel").val() + '</b> has been Update'
                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                    swal("Done", {
                        icon: "success",
                    });

                    $("#TxtChannel").val("");
                    $("#cmbStatus").val("");
                    $("#ModalChannel").modal('hide');
                    TrmChannel();
                    $("#LoaderPage").hide();

                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                complete: function () {

                }
            });

            $("#ModalChannel").modal('hide');

        } else{
           $("#ModalChannel").modal('hide');
        }
    });
}