$(document).ready(function () {
    TrmVendor();
    //$("#LoaderPage").hide();
});
function TrmVendor() {
    var JenisKondisi = "AllWhereData";
    var NamaView = "Taurus_mEksternal";
    var KondisiData = "";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });

    var myTable = $('#TrmVendor').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                                    "<div class='dropdown-menu dropdown-menu-right'>" +
                                    "<a class='dropdown-item' href='#' onclick=editVendor('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                                    "<a class='dropdown-item' href='#' onclick=deleteVendor('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
                                    "</div>" +
                                "</div>"
                if (json[i].NA == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].NameEksternal, json[i].CompanyEmail, json[i].CompanyContact, json[i].WA, json[i].PIC_HP, TrxParam, json[i].UserCreate, newDate + ' ' + newTime, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectVendor(TrxVendorID){
    $("#ContentPlaceHolder1_TrxID").val(TrxVendorID)
    var JenisKondisi = "AllWhereData";
    var NamaView = "Taurus_mEksternal";
    var KondisiData = "where ID='" + $("#ContentPlaceHolder1_TrxID").val() + "'";
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                $("#Txt_CompanyName").val(json[i].NameEksternal);
                $("#Txt_Email").val(json[i].CompanyEmail);
                $("#Txt_PhoneNumber").val(json[i].CompanyContact);
                $("#Txt_WA_Number").val(json[i].WA);
                $("#Txt_PIC_PhoneNumber").val(json[i].PIC_HP);
                $("#cmbStatus").val(json[i].NA);
                CKEDITOR.instances.Txt_Address.setData(json[i].CompanyAddress)
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function addVendor() {
    $("#Txt_CompanyName").val("");
    $("#Txt_Email").val("");
    $("#Txt_PhoneNumber").val("");
    $("#Txt_WA_Number").val("");
    $("#Txt_PIC_PhoneNumber").val("");
    $("#cmbStatus").val("");
    CKEDITOR.instances.Txt_Address.setData("")
    $("#ModalVendor").modal('show')
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function editVendor(TrxVendorID) {
    $("#ModalVendor").modal('show')
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    TrmSelectVendor(TrxVendorID);
}
function deleteVendor() {
    $("#ModalVendor").modal('show')
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    TrmSelectVendor(TrxVendorID);
}
function ActionSimpan() {
    if ($("#Txt_CompanyName").val() == '') {
        swal("Company Name is empty");
        return false
    }
    if ($("#Txt_PhoneNumber").val() == '') {
        swal("Phone Number is empty");
        return false
    }
    if ($("#Txt_Email").val() == '') {
        swal("Email is empty");
        return false
    }
    if ($("#Txt_WA_Number").val() == '') {
        swal("WA Number is empty");
        return false
    }
    var TrxAddress = CKEDITOR.instances.Txt_Address.getData();
    if (TrxAddress == '') {
        swal("Address is empty");
        return false
    }
    if ($("#Txt_PIC_PhoneNumber").val() == '') {
        swal("PIC Phone Number is empty");
        return false
    }
    if ($("#cmbStatus").val() == '') {
        swal("Status is empty");
        return false
    }
    event.preventDefault(); // prevent form submit
    var form = document.forms["myForm"]; // storing the form
    swal({
        title: "Do you want to process?",
        //text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {    
            //$("#LoaderPage").show();
                var form_data = JSON.stringify({ TrxCompanyName: $("#Txt_CompanyName").val(), TrxPhoneNumber: $("#Txt_PhoneNumber").val(), TrxEmail: $("#Txt_Email").val(), 
    TrxWANumber: $("#Txt_WA_Number").val(), TrxAddress:encodeData(TrxAddress), TrxPICPhoneNumber: $("#Txt_PIC_PhoneNumber").val(), TrxStatus: $("#cmbStatus").val(), TrxUserName:$("#hd_sessionLogin").val() });
                $.ajax({
                url: "asmx/ServiceVendor.asmx/InsertTransactionVendor",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                data: form_data,
                success: function () {
                    console.log(form_data)
                    var TrxMessage = 'Your data <b>' + $("#Txt_CompanyName").val() + '</b> has been success'
                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                    $("#Txt_CompanyName").val("");
                    $("#Txt_PhoneNumber").val("");
                    $("#Txt_Email").val("");
                    $("#Txt_WA_Number").val("");
                    CKEDITOR.instances.Txt_Address.setData("")
                    $("#Txt_PIC_PhoneNumber").val("");
                    $("#cmbStatus").val("");
                    $("#ModalVendor").modal('hide');
                    //$("#LoaderPage").hide();
                    TrmVendor();

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
                $("#ModalVendor").modal('hide');
            } else {
                //swal("Your imaginary file is safe!");
                $("#ModalVendor").modal('hide');
            }
      });
}
function ActionUpdate() {   
    var TrxAddress = CKEDITOR.instances.Txt_Address.getData();    
    event.preventDefault(); // prevent form submit
    var form = document.forms["myForm"]; // storing the form
    swal({
        title: "Do you want to process?",
        //text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {  
            //$("#LoaderPage").show();
            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxCompanyName: $("#Txt_CompanyName").val(), TrxPhoneNumber: $("#Txt_PhoneNumber").val(), TrxEmail: $("#Txt_Email").val(), 
                TrxWANumber: $("#Txt_WA_Number").val(), TrxAddress: encodeData(TrxAddress), TrxPICPhoneNumber: $("#Txt_PIC_PhoneNumber").val(), TrxStatus: $("#cmbStatus").val(),  TrxUserName:$("#hd_sessionLogin").val() });
            $.ajax({
            url: "asmx/ServiceVendor.asmx/UpdateTransactionVendor",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
            data: form_data,
            success: function () {
                console.log(form_data)
                var TrxMessage = 'Your data <b>' + $("#Txt_CompanyName").val() + '</b> has been success'
                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                $("#Txt_CompanyName").val("");
                $("#Txt_PhoneNumber").val("");
                $("#Txt_Email").val("");
                $("#Txt_WA_Number").val("");
                CKEDITOR.instances.Txt_Address.setData("")
                $("#Txt_PIC_PhoneNumber").val("");
                $("#cmbStatus").val("");
                $("#ModalVendor").modal('hide');
                //$("#LoaderPage").hide();
                TrmVendor();

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
            $("#ModalVendor").modal('hide');
        } else {
            //swal("Your imaginary file is safe!");
            $("#ModalVendor").modal('hide');
        }
    });
}
function ActionDelete() {
    event.preventDefault(); // prevent form submit
    var form = document.forms["myForm"]; // storing the form
    swal({
        title: "Do you want to process?",
        //text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {  
            //$("#LoaderPage").show();
            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName:$("#hd_sessionLogin").val()});
            $.ajax({
            url: "asmx/ServiceVendor.asmx/DeleteTransactionVendor",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
            data: form_data,
            success: function () {
                console.log(form_data)
                var TrxMessage = 'Your data <b>' + $("#Txt_CompanyName").val() + '</b> has been success'
                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                //$("#LoaderPage").hide();
                TrmVendor();

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
            $("#ModalVendor").modal('hide');
        } else {
            //swal("Your imaginary file is safe!");
            $("#ModalVendor").modal('hide');
        }
    });
}
function AutoValidasiSuccess(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-left',
        loaderBg: '#ff6849',
        icon: 'warning',
        hideAfter: 3500,
        stack: 6
    });
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}