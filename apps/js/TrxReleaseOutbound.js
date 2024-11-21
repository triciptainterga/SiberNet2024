$(document).ready(function () {
    $("#DisplayAgent").hide();
    $("#HeaderTransaksi").hide();
    $("#DetailTransaksi").hide();
    $("#ReleaseFooter").hide();
    $("#LoaderRelease").hide();
    $("#LoaderReleaseTransaksi").hide();
    $("#ActionEdit").hide();
    ComboAgentOutbound();
    //ComboStatusNya()
});
function Searching() {
    $("#modal-searching").modal('show');
}
function ModalAction() {
    $("#modal-detail").modal('show');
}
function ChangeRelease(vals) {
    if ($("#ComboAction").val() == "Change") {
        $("#DisplayAgent").show();
        $("#DisplayTelepon").hide();
        //$("#HeaderTransaksi").show();
        //$("#DetailTransaksi").hide();
    } else {
        $("#DisplayAgent").hide();
        $("#DisplayTelepon").show();
        //$("#HeaderTransaksi").hide();
        //$("#DetailTransaksi").show();
    }
}
function ChangeAgent(vals) {
    if (vals == "1") {
        $("#ReleaseFooter").show();
    } else {
        $("#ReleaseFooter").hide();
    }
}
function ActionSubmit() {
    if ($("#ComboAction").val() == "Change") {
        $("#DisplayAgent").show();
        $("#DisplayTelepon").hide();
        $("#HeaderTransaksi").show();
        $("#DetailTransaksi").hide();
        $("#ReleaseFooter").show();
    } else {
        $("#DisplayAgent").hide();
        $("#DisplayTelepon").show();
        $("#HeaderTransaksi").hide();
        $("#DetailTransaksi").show();
        $("#ReleaseFooter").hide();
    }
    if ($("#ComboAction").val() == 'Select' || $("#ComboAction").val() == '') {
        swal(
            '',
            'Action is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboAction").val() == "Change") {
        if ($("#ComboAgent").val() == '' || $("#ComboAgent").val() == 'Select') {
            swal(
                '',
                'Agent Name is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    } else {
        if ($("#TxtSearching").val() == '') {
            swal(
                '',
                'Nomor Polis Atau Nomor Telepon is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    swal({
        title: "Do you want to process ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                if ($("#ComboAction").val() == "Change") {
                    $("#HeaderTransaksi").show();
                    $("#DetailTransaksi").hide();

                    $("#LoaderRelease").show();
                    $("#ByName").empty();
                    $.ajax({
                        type: "POST",
                        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
                        data: "{TrxID:'" + $("#ComboAgent").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK08'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var i = "";

                            for (i = 0; i < json.length; i++) {

                                $("#ByName").append(json[i].NAME);

                            }

                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    })

                    var myTable = $('#TableHeaderTransaksi').DataTable();
                    $.ajax({
                        type: "POST",
                        url: "asmx/TrxReleaseOutbound.asmx/DataTableHeaderTransaksi",
                        data: "{ParameterID: '0', UserName: '" + $("#hd_sessionLogin").val() + "', ParameterType: '0', ParameterValue: '" + $("#ComboAgent").val() + "', ParameterAction: '" + $("#ComboAction").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                            var json = JSON.parse(data.d);
                            var i, x, result = "";

                            myTable.clear().draw();
                            if (json.length > 0) {
                                for (i = 0; i < json.length; i++) {

                                    var d = new Date(json[i].call_distribution_date);
                                    var milisegundos = parseInt(json[i].call_distribution_date.replace("/Date(", "").replace(")/", ""));
                                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                                    myTable.row.add([json[i].id, json[i].call_name, json[i].call_polis_number, json[i].call_phone_number, json[i].call_status, newDate + ' ' + newTime]).draw(false);

                                }
                            } else {
                                $("#ReleaseFooter").hide();
                                swal(
                                    '',
                                    'Data Outbound Empty',
                                    'info'
                                ).then(function () {
                                    location.href = "TrxReleaseOutbound.aspx";
                                });
                            }
                            
                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        },
                        complete: function () {
                            $("#LoaderRelease").hide();
                            $("#modal-searching").modal('hide');
                        }
                    })

                } else {

                    $("#LoaderRelease").show();
                    $("#HeaderTransaksi").hide();
                    $("#DetailTransaksi").show();
                    $("#ActionEdit").show();

                    $("#ByName").empty();
                    $.ajax({
                        type: "POST",
                        url: "asmx/TrmUserManagement.asmx/UIDESK_TrmMasterCombo",
                        data: "{TrxID:'" + $("#TxtSearching").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK111'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var i, comboresult = "";
                           
                            for (i = 0; i < json.length; i++) {

                                $("#ContentPlaceHolder1_TrxOutboundID").val(json[i].id);
                                $("#ByName").append(json[i].call_name);
                                $("#ComboCallCounting").val(json[i].call_counting);
                                $("#ComboCallStatus option:selected").text(json[i].call_status);

                                //comboresult = '<option value="' + json[i].call_status + '">' + json[i].call_status + '</option>';
                                //$('#ComboCallStatus').append(comboresult);

                            }

                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    })

                    var myTable = $('#TableDetailTransaksi').DataTable();
                    $.ajax({
                        type: "POST",
                        url: "asmx/TrxReleaseOutbound.asmx/DataTableDetailTransaksi",
                        data: "{ParameterID: '0', UserName: '" + $("#hd_sessionLogin").val() + "', ParameterType: '0', ParameterValue: '" + $("#TxtSearching").val() + "', ParameterAction: '" + $("#ComboAction").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                            var json = JSON.parse(data.d);
                            var i, x, result = "";

                            //alert("3")
                            myTable.clear().draw();
                            for (i = 0; i < json.length; i++) {

                                var d = new Date(json[i].call_date);
                                var milisegundos = parseInt(json[i].call_date.replace("/Date(", "").replace(")/", ""));
                                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                                myTable.row.add([json[i].call_outbound_id, json[i].call_name, json[i].call_polis_number, json[i].call_phone_number, json[i].call_reason_detail, json[i].call_agent, json[i].call_status, newDate + ' ' + newTime]).draw(false);

                            }

                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        },
                        complete: function () {
                            $("#LoaderRelease").hide();
                            $("#modal-searching").modal('hide');
                        }
                    })
                }

            }
        });
}
function ComboAgentOutbound() {
    var ComboAgent = $('#ComboAgent');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK110'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultAgent = "";

            for (i = 0; i < json.length; i++) {

                ResultAgent = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                ComboAgent.append(ResultAgent);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionEditModal() {
    if ($("#ComboAction").val() == "Change") {
        swal(
            '',
            'Release Data Change Skill Not Access',
            'error'
        ).then(function () {
            return false
        });
        return false
    } else {
        $("#modal-release").modal('show');
    }
}

function ActionRelease() { 
    swal({
        title: "Do you want to process ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $("#LoaderReleaseTransaksi").show();
                $.ajax({
                    type: "POST",
                    url: "asmx/TrxReleaseOutbound.asmx/ReleaseOutboundCall",
                    data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxOutboundID").val() + "', TrxAgent:'" + $("#TxtSearching").val() + "', TrxCounting:'" + $("#ComboCallCounting").val() + "', TrxStatus: '" + $('#ComboCallStatus').val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'" + $('#ComboAction').val() +"'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Release Data Outbound Success',
                                    'success'
                                ).then(function () {
                                    location.href = "TrxReleaseOutbound.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Release Data Outbound Failed',
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
                        $("#LoaderReleaseTransaksi").hide();
                    }
                })

            }
        });
}
function ActionDistribute() {
    swal({
        title: "Do you want to process ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $("#LoaderRelease").show();
                $.ajax({
                    type: "POST",
                    url: "asmx/TrxReleaseOutbound.asmx/ReleaseOutboundCall",
                    data: "{TrxID:'0', TrxAgent:'" + $("#ComboAgent").val() + "', TrxCounting:'0', TrxStatus: '0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction:'Distribute'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Release Data Outbound Success',
                                    'success'
                                ).then(function () {
                                    location.href = "TrxReleaseOutbound.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Release Data Outbound Failed',
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
                        $("#LoaderRelease").hide();
                    }
                })

            }
        });
}