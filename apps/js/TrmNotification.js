$(document).ready(function () {
    cmbUserName();
    TrmUserAddress();
    $("#TxtSearchingEmail").on("input", function () {
        // Print entered value in a div box
        var jumlahString = $(this).val().length;
        //console.log(jumlahString);
        //alert(jumlahString)
        if (jumlahString >= 4) {
            SearchingUserAddress($(this).val());
        } else if (jumlahString == 0) {
            SearchingUserAddress($(this).val(""));
        }
    });
    TrmSettingNotification();
    TrmNotificationTemplate();
});
function TrmUserAddress() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK40'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultUserNotification = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {

                if (json.length > 2) {
                    var columns = "2"
                } else {
                    var columns = "3"
                }
                resultUserNotification = '<div class="col-md-12 col-lg-' + columns +'">' +
                    '<div class="box box-default">' +
                    '<div class="fx-card-item">' +
                    '<div class="fx-card-avatar fx-overlay-1">' +
                    '<img src="../images/card/2.jpg" alt="user">' +
                    '<div class="fx-overlay">' +
                    '<ul class="fx-info">' +
                    '<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="showUpdate(' + json[i].ID + ');"><i class="fa fa-pencil"></i></a></li>' +
                    '<li><a class="btn default btn-outline" href="#" onclick="showDelete(' + json[i].ID + ');"><i class="fa fa-trash-o"></i></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="fx-card-content">' +
                    '<h4 class="box-title">' + json[i].USERNAME + ' - ' + json[i].NAME + '</h4></br>' +
                    '<small>' + json[i].EMAIL_ADDRESS + '</small>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SearchingUserAddress(TrxEmailAddress) {
    var selectedValue = TrxEmailAddress;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK40'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultUserNotification = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {

                if (json.length > 2) {
                    var columns = "2"
                } else {
                    var columns = "3"
                }
                resultUserNotification = '<div class="col-md-12 col-lg-' + columns +'">' +
                                        '<div class="box box-default">' +
                                        '<div class="fx-card-item">' +
                                        '<div class="fx-card-avatar fx-overlay-1">' +
                                        '<img src="../images/card/2.jpg" alt="user">' +
                                        '<div class="fx-overlay">' +
                                        '<ul class="fx-info">' +
                                        '<li><a class="btn default btn-outline image-popup-vertical-fit" href="#" onclick="showUpdate(' + json[i].ID + ');"><i class="fa fa-pencil"></i></a></li>' +
                                        '<li><a class="btn default btn-outline" href="#" onclick="showDelete(' + json[i].ID + ');"><i class="fa fa-trash-o"></i></a></li>' +
                                        '</ul>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="fx-card-content">' +
                                        '<h4 class="box-title">' + json[i].USERNAME + '</h4></br>' +
                                        '<small>' + json[i].EMAIL_ADDRESS + '</small>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbUserName() {
    var cmbUserName = $('#cmbUserName');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK07'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultUserName = "";
            for (i = 0; i < json.length; i++) {

                resultUserName = '<option value="' + json[i].USERNAME + '">' + json[i].USERNAME + ' - ' + json[i].NAME + '</option>';
                cmbUserName.append(resultUserName);

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
    //$("#cmbUserName").val("")
    var selectedText = $("#cmbUserName").find("option:selected").text();
    var selectedValue = $("#cmbUserName").val();
    //alert(selectedValue)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK112'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(selectedValue)
            var json = JSON.parse(data.d);
            var i, x, resultMenuLevel2 = "";

            for (i = 0; i < json.length; i++) {

                $("#TxtLevelUser").val(json[i].LEVELUSER)
                alert(json[i].LEVELUSER)
                if (json[i].EMAIL_ADDRESS == null || json[i].EMAIL_ADDRESS == "") {
                    $("#TxtEmailAddress").val("")
                    swal("Email address is empty, Please check data user management");
                    return false
                } else {
                    $("#TxtEmailAddress").val(json[i].EMAIL_ADDRESS)
                }
                if (json[i].LEVELUSER == "Layer 3") {
                    $("#Div_Department").css("display", "block")
                    $("#TxtDepartment").attr("disabled", false);
                    $("#TxtVendor").attr("disabled", true);
                    $("#TxtVendor").val("");
                    if (json[i].ORGANIZATION_NAME == null || json[i].ORGANIZATION_NAME == "") {
                        swal("Department is empty, Please check data user management");
                        return false
                    } else {
                        $("#ContentPlaceHolder1_TrxDepartmentID").val(json[i].ORGANIZATION)
                        $("#TxtDepartment").val(json[i].ORGANIZATION_NAME)
                        $("#TxtDepartment").attr("disabled", true);
                        $("#checkboxCreate").attr("disabled", true);
                        $("#checkboxOver").attr("disabled", true);
                        $("#checkboxClosed").attr("disabled", true);
                        $("#checkboxEscalation").attr("disabled", false);

                    }
                } else if (json[i].LEVELUSER == "Layer 2") {
                 
                    $("#TxtVendor").val(json[i].NamaGrup);
                    $("#TxtDepartment").val("");
                    $("#ContentPlaceHolder1_TrxDepartmentID").val("0")
                    $("#TxtDepartment").attr("disabled", true);
                    $("#TxtVendor").attr("disabled", false);
                    $("#checkboxCreate").attr("disabled", false);
                    $("#checkboxOver").attr("disabled", false);
                    $("#checkboxClosed").attr("disabled", false);
                    $("#checkboxEscalation").attr("disabled", false);

                } else if (json[i].LEVELUSER == "Layer 1") {
                    $("#TxtVendor").attr("disabled", true);
                    $("#TxtVendor").val(json[i].NamaGrup);
                    $("#TxtDepartment").attr("disabled", true);
                    $("#TxtDepartment").val("");
                    $("#ContentPlaceHolder1_TrxDepartmentID").val("0")
                    $("#checkboxCreate").attr("disabled", false);
                    $("#checkboxOver").attr("disabled", false);
                    $("#checkboxClosed").attr("disabled", false);
                    $("#checkboxEscalation").attr("disabled", false);

                } else if (json[i].LEVELUSER == "Supervisor") {
                    $("#TxtVendor").attr("disabled", true);
                    $("#ContentPlaceHolder1_TrxDepartmentID").val(json[i].ORGANIZATION)
                    $("#TxtDepartment").val(json[i].ORGANIZATION_NAME)
                    $("#TxtDepartment").attr("disabled", true);
                    $("#checkboxCreate").attr("disabled", true);
                    $("#checkboxOver").attr("disabled", true);
                    $("#checkboxClosed").attr("disabled", true);
                    $("#checkboxEscalation").attr("disabled", false);
                }
                else {
                    $("#TxtDepartment").val("");
                    $("#TxtVendor").val("");
                    $("#TxtDepartment").attr("disabled", true);
                    $("#TxtVendor").attr("disabled", true);
                    $("#checkboxCreate").attr("disabled", false);
                    $("#checkboxOver").attr("disabled", false);
                    $("#checkboxClosed").attr("disabled", false);
                    $("#checkboxEscalation").attr("disabled", false);
                }
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
    $("#Delete").css("display", "none");
    $("#ContentPlaceHolder1_HdTicketCreate").val("");
    $("#ContentPlaceHolder1_HdTicketOverSLA").val("");
    $("#ContentPlaceHolder1_HdTicketClosed").val("");
    $("#ContentPlaceHolder1_HdTicketEscalation").val("");
    $('#cmbUserName').val("");
    $('#TxtEmailAddress').val("");
    $('#cmbStatus').val("");
    $("#TxtLevelUser").val("");
    $("#TxtDepartment").val("");
    $("#TxtVendor").val("");
    $('#cmbUserName').attr("disabled", false);
    $('#TxtEmailAddress').attr("disabled", false);
}
function showUpdate(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#Delete").css("display", "none");
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ContentPlaceHolder1_HdTicketCreate").val("");
    $("#ContentPlaceHolder1_HdTicketOverSLA").val("");
    $("#ContentPlaceHolder1_HdTicketClosed").val("");
    $("#ContentPlaceHolder1_HdTicketEscalation").val("");
    $('#cmbUserName').attr("disabled", true);
    $('#TxtEmailAddress').attr("disabled", true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function showDelete(TrxID) {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ContentPlaceHolder1_HdTicketCreate").val("");
    $("#ContentPlaceHolder1_HdTicketOverSLA").val("");
    $("#ContentPlaceHolder1_HdTicketClosed").val("");
    $("#ContentPlaceHolder1_HdTicketEscalation").val("");
    $('#cmbUserName').attr("disabled", true);
    $('#TxtEmailAddress').attr("disabled", true);
    $('#cmbStatus').attr("disabled", true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan() {
    if ($("#cmbUserName").val() == '') {
        swal("User Name is empty");
        return false
    }
    if ($("#TxtEmailAddress").val() == '') {
        swal("Email address is empty");
        return false
    }
    //else {
    //    var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
    //    if (regex.test($("#TxtEmailAddress").val())) {
    //    } else {
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    if ($("#cmbStatus").val() == '') {
        swal("Status is empty");
        return false
    }  
    if ($("#ContentPlaceHolder1_HdTicketCreate").val() == ""){
        var TrxTicketCreate = "NO";
    } else{
        var TrxTicketCreate = $("#ContentPlaceHolder1_HdTicketCreate").val();
    }
    if ($("#ContentPlaceHolder1_HdTicketOverSLA").val() == ""){
        var TrxTicketOver = "NO";
    } else{
        var TrxTicketOver = $("#ContentPlaceHolder1_HdTicketOverSLA").val();
    }
    if ($("#ContentPlaceHolder1_HdTicketClosed").val() == ""){
        var TrxTicketClose = "NO";
    } else{
        var TrxTicketClose = $("#ContentPlaceHolder1_HdTicketClosed").val();
    }
    if ($("#ContentPlaceHolder1_HdTicketEscalation").val() == ""){
        var TrxTicketEscalation = "NO";
    } else{
        var TrxTicketEscalation = $("#ContentPlaceHolder1_HdTicketEscalation").val();
    }

    if ($("#TxtDepartment").val() == '') {
        $("#ContentPlaceHolder1_TrxDepartmentID").val("0")
    }
    if ($("#TxtVendor").val() == '') {
        $("#ContentPlaceHolder1_TrxVendorID").val("0")
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {        
            var form_data = JSON.stringify({ TrxUserCreate: $("#hd_sessionLogin").val(), TrxUserName: $("#cmbUserName").val(), TrxEmailAddress: $("#TxtEmailAddress").val(), TrxStatus: $("#cmbStatus").val(), 
                TrxCreate: TrxTicketCreate, TrxOver: TrxTicketOver, TrxClose: TrxTicketClose, TrxEscalation: TrxTicketEscalation, TrxDepartment: $("#ContentPlaceHolder1_TrxDepartmentID").val(), TrxVendor: $("#TxtVendor").val()});
            console.log("Insert Data " & form_data)
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/InsertSettingNotificationAddress",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: form_data,
                success: function (data) {

                    var json = JSON.parse(data.d);
                    var i, x, result = "";
                    for (i = 0; i < json.length; i++) {
                        
                        if(json[i].Result == "False"){
                            swal((json[i].TrxmsgSystem))
                            $("#ModalChannel").modal('hide');
                        } else {
                            swal("Done", {
                                icon: "success",
                            });
                            console.log(form_data)
                            var TrxMessage = 'Your <b>' + $("#TxtEmailAddress").val() + '</b> has been save'
                            AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                            $("#cmbUserName").val("");
                            $("#TxtEmailAddress").val("");
                            $("#cmbStatus").val("");
                            $("#ModalChannel").modal('hide');
                            TrmUserAddress();
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
                
            } else {
                //swal("Your imaginary file is safe!");
                $("#ModalChannel").modal('hide');
            }
     });
}
function ActionUpdate() {  
    var TrxTicketCreate = $("#ContentPlaceHolder1_HdTicketCreate").val();
    var TrxTicketOver = $("#ContentPlaceHolder1_HdTicketOverSLA").val();
    var TrxTicketClose = $("#ContentPlaceHolder1_HdTicketClosed").val();
    var TrxTicketEscalation = $("#ContentPlaceHolder1_HdTicketEscalation").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {        
            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserCreate: $("#hd_sessionLogin").val(), TrxUserName: $("#cmbUserName").val(), TrxStatus: $("#cmbStatus").val(), 
                TrxCreate: TrxTicketCreate, TrxOver: TrxTicketOver,  TrxClose: TrxTicketClose, TrxEscalation:TrxTicketEscalation, TrxDepartment:"-", TrxVendor:"-"});
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/UpdateSettingNotificationAddress",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: form_data,
                success: function () {
                    console.log(form_data)
                    var TrxMessage = 'Your <b>' + $("#TxtEmailAddress").val() + '</b> has been update'
                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                    $("#cmbUserName").val("");
                    $("#TxtEmailAddress").val("");
                    $("#cmbStatus").val("");
                    $("#ModalChannel").modal('hide');
                    TrmUserAddress();
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
function ActionDelete() {  
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            if ($("#cmbUserName").val() == "" || $("#cmbUserName").val() == null) {
                var TrxUserName = "-"
            } else {
                var TrxUserName = $("#cmbUserName").val()
            }
            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserCreate: $("#hd_sessionLogin").val(), TrxUserName: TrxUserName});
            console.log("delete user " + form_data)
            $.ajax({
                url: "WebServiceGetDataMaster.asmx/DeleteSettingNotificationAddress",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: form_data,
                success: function () {
                    console.log(form_data)
                    var TrxMessage = 'Your <b>' + $("#TxtEmailAddress").val() + '</b> has been delete'
                    AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

                    $("#cmbUserName").val("");
                    $("#TxtEmailAddress").val("");
                    $("#cmbStatus").val("");
                    $("#ModalChannel").modal('hide');
                    TrmUserAddress();
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
function TrmSelect(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK41'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].LEVELUSER == "Layer 3") {
                    $("#TxtDepartment").val(json[i].ORGANIZATION_NAME);
                    $("#TxtVendor").val("");
                } else if (json[i].LEVELUSER == "Layer 2") {
                    $("#TxtDepartment").val("");
                    $("#TxtVendor").val(json[i].NamaGrup);
                } else {
                    $("#TxtDepartment").val("");
                    $("#TxtVendor").val("");
                }

                $("#cmbUserName").val(json[i].USERNAME);
                $("#TxtEmailAddress").val(json[i].EMAIL_ADDRESS);
                $("#TxtLevelUser").val(json[i].LEVELUSER);
                $("#cmbStatus").find("option:selected").text();
                $("#cmbStatus").val(json[i].STATUS);
                $("#cmbStatus").val(json[i].STATUS);

                if (json[i].TICKET_CREATE == 'YES') {
                    $("#checkboxCreate").prop('checked', true);
                    $("#ContentPlaceHolder1_HdTicketCreate").val("YES");
                } else {
                    $("#checkboxCreate").prop('checked', false);
                    $("#ContentPlaceHolder1_HdTicketCreate").val("NO");
                }
                if (json[i].TICKET_OVER_SLA == 'YES') {
                    $("#checkboxOver").prop('checked', true);
                    $("#ContentPlaceHolder1_HdTicketOverSLA").val("YES");
                } else {
                    $("#checkboxOver").prop('checked', false);
                    $("#ContentPlaceHolder1_HdTicketOverSLA").val("NO");
                }
                if (json[i].TICKET_CLOSED == 'YES') {
                    $("#checkboxClosed").prop('checked', true);
                    $("#ContentPlaceHolder1_HdTicketClosed").val("YES");
                } else {
                    $("#checkboxClosed").prop('checked', false);
                    $("#ContentPlaceHolder1_HdTicketClosed").val("NO");
                }
                if (json[i].TICKET_ESKALASI == 'YES') {
                    $("#checkboxEscalation").prop('checked', true);
                    $("#ContentPlaceHolder1_HdTicketEscalation").val("YES");
                } else {
                    $("#checkboxEscalation").prop('checked', false);
                    $("#ContentPlaceHolder1_HdTicketEscalation").val("NO");
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CheckCreate(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HdTicketCreate").val("YES")
    } else {
        $("#ContentPlaceHolder1_HdTicketCreate").val("NO")
    }
};
function CheckOver(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HdTicketOverSLA").val("YES")
    } else {
        $("#ContentPlaceHolder1_HdTicketOverSLA").val("NO")
    }
};
function CheckClosed(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HdTicketClosed").val("YES")
    } else {
        $("#ContentPlaceHolder1_HdTicketClosed").val("NO")
    }
};
function CheckEscalation(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HdTicketEscalation").val("YES")
    } else {
        $("#ContentPlaceHolder1_HdTicketEscalation").val("NO")
    }
};
function TicketCreate(checked){
    if (checked) {
        var TrxTicketCreate = "YES"
    } else {
        var TrxTicketCreate = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "1", TrxUserName: $("#hd_sessionLogin").val(), TrxValue:TrxTicketCreate});
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
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
function TicketOver(checked){
    if (checked) {
        var TrxTicketOver = "YES"
    } else {
        var TrxTicketOver = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "2", TrxUserName: $("#hd_sessionLogin").val(), TrxValue:TrxTicketOver});
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
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
function TicketClosed(checked){
    if (checked) {
        var TrxTicketClosed = "YES"
    } else {
        var TrxTicketClosed = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "3", TrxUserName: $("#hd_sessionLogin").val(), TrxValue:TrxTicketClosed});
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
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
function TicketEskalasi(checked){
    if (checked) {
        var TicketEskalasi = "YES"
    } else {
        var TicketEskalasi = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "4", TrxUserName: $("#hd_sessionLogin").val(), TrxValue:TicketEskalasi});
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
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
function CustomerTicketCreate(checked){
    if (checked) {
        var CustomerTicketCreate = "YES"
    } else {
        var CustomerTicketCreate = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "5", TrxUserName: $("#hd_sessionLogin").val(), TrxValue:CustomerTicketCreate});
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
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
function CustomerTicketClosed(checked){
    if (checked) {
        var CustomerTicketClosed = "YES"
    } else {
        var CustomerTicketClosed = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "6", TrxUserName: $("#hd_sessionLogin").val(), TrxValue:CustomerTicketClosed});
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
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
function TrmSettingNotification() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK42'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                if (json[i].TYPE == "TICKET_CREATE" && json[i].CATEGORY == 'SYSTEM') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingTicketCreate").prop('checked', true);
                    } else {
                        $("#SettingTicketCreate").prop('checked', false);
                    }
                }
                if (json[i].TYPE == "TICKET_OVER_SLA" && json[i].CATEGORY == 'SYSTEM') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingTicketOver").prop('checked', true);
                    } else {
                        $("#SettingTicketOver").prop('checked', false);
                    }
                }
                if (json[i].TYPE == "TICKET_CLOSED" && json[i].CATEGORY == 'SYSTEM') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingTicketClosed").prop('checked', true);
                    } else {
                        $("#SettingTicketClosed").prop('checked', false);
                    }
                }
                if (json[i].TYPE == "TICKET_ESKALASI" && json[i].CATEGORY == 'SYSTEM') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingTicketEskalasi").prop('checked', true);
                    } else {
                        $("#SettingTicketEskalasi").prop('checked', false);
                    }
                }
                if (json[i].TYPE == "TICKET_CREATE" && json[i].CATEGORY == 'CUSTOMER') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingCustomerCreate").prop('checked', true);
                    } else {
                        $("#SettingCustomerCreate").prop('checked', false);
                    }
                }
                if (json[i].TYPE == "TICKET_CLOSED" && json[i].CATEGORY == 'CUSTOMER') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingCustomerClosed").prop('checked', true);
                    } else {
                        $("#SettingCustomerClosed").prop('checked', false);
                    }
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmNotificationTemplate() {
    var divNotificationTemplate = $('#divNotificationTemplate');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK43'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultNotificationTemplate = "";

            for (i = 0; i < json.length; i++) {
                resultNotificationTemplate = '<div class="media media-single">' +
                    '<a href="TrmNotificationTemplate.aspx" target="_blank"><span class="badge badge-success badge-pill"><i class="fa fa-envelope"></i></span></a>' +
                    '<div class="media-body">' +
                    '<h6><a href="TrmNotificationTemplate.aspx" target="_blank">' + json[i].SUBJECT + '</a></h6>' +
                    '<p class="font-size-10"><a href="TrmNotificationTemplate.aspx" target="_blank">Template ' + json[i].CATEGORY + '</a></p>' +
                    '</div>' +
                    '</div>'
                divNotificationTemplate.append(resultNotificationTemplate);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}