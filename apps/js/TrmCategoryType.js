$(document).ready(function () {
    cmbCategory();
    TrmCategoryType();
    $("#LoaderPage").hide();
});
function cmbCategory() {
    var cmbCategorySource = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            cmbCategorySource.empty();
            cmbCategorySource.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbCategorySource.append(resultCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmCategoryType() {
    var myTable = $('#TrmCategoryType').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmCategoryType",
        data: "{TrxID:'-', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '-', TrxStatus: '-'}",
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
                                "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                                "</div>" +
                    "</div>"

                if (json[i].Status == "Aktif") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                myTable.row.add([json[i].ID, json[i].CategoryName, json[i].SubName, TrxParam, urlClick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectCategoryType(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectedTransactionTrmCategoryType",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '-', TrxStatus: '-'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $('#cmbCategory option:selected').text(json[i].CategoryName);
                $('#TxtCategoryTypeName').val(json[i].SubName);
                $("#cmbStatus").val(json[i].NA);

                $("#ContentPlaceHolder1_Hd_CmbCategory").val(json[i].CategoryID);
                $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_cmbCategory(value){
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue)
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function showAdd() {
    $("#cmbStatus option:selected").val("");
    cmbCategory();
    $("#TxtCategoryTypeName").val("");
    $('#cmbCategory').attr('disabled', false);
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectCategoryType($("#ContentPlaceHolder1_TrxID").val())
}
function checkInput(string) {
    var regex = /^[^0-9*\\\^\/<>_#']+$/;
    if (regex.test(string)) {
        return string;
    } else {
        console.log(string)
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
function ActionSimpan() {
    var TrxName = $("#TxtCategoryTypeName").val();
    var selectedValue = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxStatus = $("#ContentPlaceHolder1_Hd_Status").val();
    if (selectedValue == '') {
        swal("Type is empty")
        return false;
    }
    if (TrxName == '') {
        swal("Category is empty")
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
             $("#LoaderPage").show();
            var form_data = JSON.stringify({ TrxCategoryID: selectedValue, TrxName: TrxName, TrxStatus: TrxStatus, TrxUserName: $("#hd_sessionLogin").val()});
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCategoryType",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: form_data,
                success: function (data) {
                    console.log(form_data)

                    var json = JSON.parse(data.d);
                    var i, x = "";
                    var result = "";

                    console.log("ddd" + JSON.stringify(data))
                    for (i = 0; i < json.length; i++) {
                        console.log("www" + json[i].Result)
                        if (json[i].Result == "True") {
                            swal(
                                '',
                                'Insert data has been successs',
                                'success'
                            ).then(function () {
                                $("#ModalChannel").modal('hide');
                                TrmCategoryType();
                                $("#LoaderPage").hide();
                            });
                        } else {
                            swal(
                                '',
                                'Insert data has been failed !',
                                'error'
                            ).then(function () {
                                $("#ModalChannel").modal('hide');
                                TrmCategoryType();
                                $("#LoaderPage").hide();
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
    });
}
function ActionUpdate() {
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();
    var TrxName = $("#TxtCategoryTypeName").val();
    if (TrxName != '') {
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
            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxCategoryID: TrxCmbCategory, TrxName: TrxName, TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val() });
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCategoryType",
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
                                'Update data has been successs',
                                'success'
                            ).then(function () {
                                $("#ModalChannel").modal('hide');
                                $("#LoaderPage").hide();
                                window.location.href = "TrmCategoryType.aspx";
                            });
                        } else {
                            swal(
                                '',
                                'Update data has been failed !',
                                'error'
                            ).then(function () {
                                $("#ModalChannel").modal('hide');
                                $("#LoaderPage").hide();
                                window.location.href = "TrmCategoryType.aspx";
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
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
