$(document).ready(function () {
    cmbCategory();
    cmbEscalationUnit();
    ComboEskalasiLayer();
    TrmCategoryReason();
    $("#LoaderPage").hide();
});
function cmbCategory() {
    //var JenisKondisi = "AllWhereData";
    //var NamaView = "TrmCategory";
    //var cmbCategory = $('#cmbCategory');
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: "where NA='Y'" });
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultCategory = "";
    //        for (i = 0; i < json.length; i++) {
    //            //alert();
    //            //alert();
    //            //alert(json[i].UserCreate);
    //            resultCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
    //            cmbCategory.append(resultCategory);
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})

    var cmbCategory = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            cmbCategory.empty();
            cmbCategory.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbCategory.append(resultCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_CategoryType(value) {
    var JenisKondisi = "AllWhereData";
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);

    var cmbCategoryType = $('#cmbCategoryType');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/OnChangeTransactionTrmCategoryType",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryType.empty();
            cmbCategoryType.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbCategoryType.append(resultCategoryType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var cmbCategoryType = $('#cmbCategoryType');
    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "TrmCategoryType", paramQuery: "where NA='Y' and CategoryID='" + selectedValue + "'" });
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultCategoryType = "";

    //        cmbCategoryType.empty();
    //        cmbCategoryType.append('<option value="">Select</option>');
    //        for (i = 0; i < json.length; i++) {

    //            resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
    //            cmbCategoryType.append(resultCategoryType);
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function getWS_CategoryTypeDetail(value) {
    var selectedText = $("#cmbCategoryType").find("option:selected").text();
    var selectedValue = $("#cmbCategoryType").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryType").val())

    var cmbCategoryDetail = $('#cmbCategoryDetail');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/OnChangeTransactionTrmCategoryDetail",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryDetail = "";

            cmbCategoryDetail.empty();
            cmbCategoryDetail.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultCategoryDetail = '<option value="' + json[i].SubCategory2ID + '">' + json[i].SubName + '</option>';
                cmbCategoryDetail.append(resultCategoryDetail);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    //var cmbCategoryDetail = $('#cmbCategoryDetail');
    //var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "mSubCategoryLv2", paramQuery: "where NA='Y' and SubCategory1ID='" + selectedValue + "'" });
    //$.ajax({
    //    type: "POST",
    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
    //    data: jsonText,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var json = JSON.parse(data.d);
    //        var i, x, resultSourceEnquiryDetail = "";
    //        cmbCategoryDetail.empty();
    //        cmbCategoryDetail.append('<option value="">Select</option>');
    //        for (i = 0; i < json.length; i++) {

    //            resultCategoryDetail = '<option value="' + json[i].SubCategory2ID + '">' + json[i].SubName + '</option>';
    //            cmbCategoryDetail.append(resultCategoryDetail);
    //        }

    //    },
    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
    //        console.log(xmlHttpRequest.responseText);
    //        console.log(textStatus);
    //        console.log(errorThrown);
    //    }
    //})
}
function getWS_CategoryTypeDetail_Value(value) {
    var selectedText = $("#cmbCategoryDetail").find("option:selected").text();
    var selectedValue = $("#cmbCategoryDetail").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function getWS_EscalationUnit(value) {
    var selectedText = $("#cmbEscalationUnit").find("option:selected").text();
    var selectedValue = $("#cmbEscalationUnit").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_EscalationUnit").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function getWS_ComboLayer(value) {
    var selectedText = $("#ComboLayer").find("option:selected").text();
    var selectedValue = $("#ComboLayer").val();
    $("#ContentPlaceHolder1_Hd_ComboLayer").val(selectedValue);
}
function cmbEscalationUnit() {
    var cmbEscalationUnit = $('#cmbEscalationUnit');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmEscalationUnit",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultEscalationUnit = "";

            cmbEscalationUnit.empty();
            cmbEscalationUnit.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultEscalationUnit = '<option value="' + json[i].ORGANIZATION_ID + '">' + json[i].ORGANIZATION_NAME + '</option>';
                cmbEscalationUnit.append(resultEscalationUnit);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ComboEskalasiLayer() {
    var ComboLayer = $('#ComboLayer');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/V2_UIDESK_TrxLayer",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, ResultLayer = "";

            ComboLayer.empty();
            ComboLayer.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                ResultLayer = '<option value="' + json[i].Layer + '">' + json[i].Layer + '</option>';
                ComboLayer.append(ResultLayer);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmCategoryReason() {
    var myTable = $('#TrmCategoryReason').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmCategoryReason",
        data: "{ TrxID:  '-', TrxCategoryID: '0', TrxSubCategory1ID: '0', TrxSubCategory2ID: '0', TrxName: '0', TrxEscalationUnit: '0', TrxLayer: '0', TrxSLA: '0', TrxStatus: '0', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
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
                myTable.row.add([json[i].ID, json[i].CategoryName, json[i].CategoryType, json[i].CategoryDetail, json[i].SubName, json[i].ReasonCode, json[i].Priority, json[i].TujuanEscalation, json[i].IDKamus, json[i].Layer, json[i].SLA, TrxParam, json[i].UserCreate, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectCategoryReason(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectTransactionTrmCategoryReason",
        data: "{ TrxID:  '" + TrxID + "', TrxCategoryID: '0', TrxSubCategory1ID: '0', TrxSubCategory2ID: '0', TrxName: '0', TrxEscalationUnit: '0', TrxLayer: '0', TrxSLA: '0', TrxStatus: '0', TrxUserName: '" + $("#HD_CookiesVariabel").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $('#cmbCategory option:selected').text(json[i].CategoryName);
                $("#cmbCategoryType option:selected").text(json[i].CategoryType);
                //$('#cmbCategoryType').attr('disabled', true);
                $("#cmbCategoryDetail option:selected").text(json[i].CategoryDetail);
                //$('#cmbCategoryDetail').attr('disabled', true);
                $('#TxtCategoryReasonName').val(json[i].SubName);
                $("#cmbEscalationUnit option:selected").text(json[i].TujuanEscalation);
                $("#ComboLayer option:selected").text(json[i].Layer);
                $('#TxtSLA').val(json[i].SLA);
                $("#cmbStatus option:selected").text(json[i].Status);
                $("#ContentPlaceHolder1_Hd_CmbCategory").val(json[i].CategoryID);
                $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(json[i].SubCategory1ID);
                $("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val(json[i].SubCategory2ID);
                $("#ContentPlaceHolder1_Hd_EscalationUnit").val(json[i].TujuanEskalasi);
                $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA);
                $("#ContentPlaceHolder1_Hd_ComboLayer").val(json[i].Layer);
                $("#cmbEscalationTicket").val(json[i].IDKamus);
                $("#TxtTag").val(json[i].ReasonCode);
                $("#cmbPriorityScale").val(json[i].Priority);
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
    $('#cmbCategory option:selected').text("Select");
    $('#cmbCategory').attr('disabled', false);
    $('#cmbCategoryType option:selected').text("Select");
    $('#cmbCategoryType').attr('disabled', false);
    $('#cmbCategoryDetail option:selected').text("Select");
    $('#cmbCategoryDetail').attr('disabled', false);
    $("#TxtCategoryReasonName").val("");
    $('#cmbEscalationUnit option:selected').text("Select");
    $("#TxtSLA").val("");
    $("#cmbStatus").val("");
    $("#cmbEscalationTicket").val("");
    $("#TxtTag").val("");
    $("#cmbPriorityScale").val("");

}
function showUpdate(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    TrmSelectCategoryReason(TrxID);
}
function ActionSimpan() {
    var CmbCategoryText = $("#cmbCategory").find("option:selected").text();
    var CmbCategoryValue = $("#cmbCategory").val();
    var CmbCategoryTypeText = $("#cmbCategoryType").find("option:selected").text();
    var CmbCategoryTypeValue = $("#cmbCategoryType").val();
    var CmbCategoryDetailText = $("#cmbCategoryDetail").find("option:selected").text();
    var CmbCategoryDetailValue = $("#cmbCategoryDetail").val();
    var cmbEscalationUnit = $("#cmbEscalationUnit").find("option:selected").text();
    var cmbEscalationUnit = $("#cmbEscalationUnit").val();
    var cmbLayerText = $("#ComboLayer").find("option:selected").text();
    var cmbLayerValue = $("#ComboLayer").val();
    var TxtCategoryReasonName = $("#TxtCategoryReasonName").val();
    var TrxSLA = $("#TxtSLA").val();
    var TrxStatus = $("#cmbStatus").val();
    if (CmbCategoryValue == '') {
        swal("Type is empty")
        return false;
    }
    if (CmbCategoryTypeValue == '') {
        swal("Category is empty")
        return false;
    }
    if (CmbCategoryDetailValue == '') {
        swal("Topic is empty")
        return false;
    }
    if (TxtCategoryReasonName == '') {
        swal("Subtopic is empty")
        return false;
    } else {
        //var regex = /^[^0-9*\\\^\/<>_#']+$/;
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TxtCategoryReasonName)) {
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
    if ($("#TxtTag").val() == '') {
        swal("Tag is empty")
        return false;
    }  
    if (cmbEscalationUnit == '') {
        swal("Escalation team is empty")
        return false;
    }
    if ($("#cmbEscalationTicket").val() == '') {
        swal("Escalation Ticket is empty")
        return false;
    }
    if (cmbLayerValue == '') {
        swal("Layer is empty")
        return false;
    }
    if (TrxSLA == '') {
        swal("SLA is empty")
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxSLA)) {
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
                var form_data = JSON.stringify({
                    TrxCategoryID: CmbCategoryValue, TrxSubCategory1ID: CmbCategoryTypeValue, TrxSubCategory2ID: CmbCategoryDetailValue,
                    TrxName: TxtCategoryReasonName, TrxEscalationUnit: cmbEscalationUnit, TrxLayer: cmbLayerValue, TrxSLA: TrxSLA,
                    TrxStatus: TrxStatus, TrxUserName: $("#hd_sessionLogin").val(), TrxReasonCode: $("#TxtTag").val(), TrxEscalationTicket: $("#cmbEscalationTicket").val(),
                    TrxPriority: $("#cmbPriorityScale").val()
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCategoryReason",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
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
                                    $("#LoaderPage").hide();
                                    window.location.href = "TrmCategoryReason.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Data Has Been Failed !',
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
function ActionUpdate() {
    var CmbCategoryText = $("#cmbCategory").find("option:selected").text();
    var CmbCategoryValue = $("#cmbCategory").val();
    var CmbCategoryTypeText = $("#cmbCategoryType").find("option:selected").text();
    var CmbCategoryTypeValue = $("#cmbCategoryType").val();
    var CmbCategoryDetailText = $("#cmbCategoryDetail").find("option:selected").text();
    var CmbCategoryDetailValue = $("#cmbCategoryDetail").val();
    var cmbEscalationUnitText = $("#cmbEscalationUnit").find("option:selected").text();
    var cmbEscalationUnitValue = $("#cmbEscalationUnit").val();
    var cmbLayerText = $("#ComboLayer").find("option:selected").text();
    var cmbLayerValue = $("#ComboLayer").val();
    var TxtCategoryReasonName = $("#TxtCategoryReasonName").val();
    var TrxSLA = $("#TxtSLA").val();
    if (TxtCategoryReasonName == "") {
    } else {
        //var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        //if (regex.test(TxtCategoryReasonName)) {
        //} else {
        //    swal(
        //        '',
        //        'Data has been block',
        //        'error'
        //    ).then(function () {
        //        return false;
        //    });
        //    return false;
        //}
    }
    if (TrxSLA == "") {
    }
    var TrxCmbCategory = $("#ContentPlaceHolder1_Hd_CmbCategory").val();
    var TrxCmbCategoryType = $("#ContentPlaceHolder1_Hd_CmbCategoryType").val();
    var TrxCmbCategoryDetail = $("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val();
    //return false
    var TrxCmbEscalationUnit = $("#ContentPlaceHolder1_Hd_EscalationUnit").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();
    var TrxCmbLayer = $("#ContentPlaceHolder1_Hd_ComboLayer").val();

    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $("#LoaderPage").show();
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxCategoryID: TrxCmbCategory, TrxSubCategory1ID: TrxCmbCategoryType,
                    TrxSubCategory2ID: TrxCmbCategoryDetail, TrxName: TxtCategoryReasonName, TrxEscalationUnit: TrxCmbEscalationUnit,
                    TrxLayer: TrxCmbLayer, TrxSLA: TrxSLA, TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val(),
                    TrxReasonCode: $("#TxtTag").val(), TrxEscalationTicket: $("#cmbEscalationTicket").val(), TrxPriority: $("#cmbPriorityScale").val()
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmCategoryReason",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
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
                                    $("#LoaderPage").hide();
                                    window.location.href = "TrmCategoryReason.aspx";
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