$(document).ready(function () {
    $("#ReleaseFooter").hide();
    TrmTable()
});
function TrmTable() {
    var myTable = $('#TableTransaksi').DataTable();
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/Syn_CronisePhase2.asmx/DataTableTransaksi",
        data: "{Sync_UserName: '" + $("#ContentPlaceHolder1_TrxID").val() + "', Sync_Action: 'DataTable', Sync_Type: 'Ticket'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length > 0) {
                myTable.clear().draw();
                for (i = 0; i < json.length; i++) {

                    if (json[i].Sync_Status == "Completed") {
                        var IconTicket = "<i class='fa fa-check-circle text-primary'></i>"
                    } else {
                        var IconTicket = "<i class='fa fa-circle text-primary'></i>"
                    }
                    if (json[i].Sync_Status_Thread == "Completed") {
                        var IconThread = "<i class='fa fa-check-circle text-warning'></i>"
                    } else {
                        var IconThread = "<i class='fa fa-circle text-warning'></i>"
                    }
                    var Action = "<a href='#' style='color:white;' onclick=ActionSyncronise('" + json[i].Sync_UserName + "')>" + IconTicket + "</>&nbsp;<a href='#' style='color:white;' onclick=ActionSyncroniseThread('" + json[i].Sync_UserName + "')>" + IconThread +"</>"
                    if (json[i].Sync_Status == "Completed") {
                        var Status = "<span class='badge badge-pill badge-primary' style='width:100px;color:white;'><b>" + json[i].Sync_Status +"</b></span>"
                    } else {
                        var Status = "<span class='badge badge-pill badge-primary' style='width:100px;color:white;'><b>" + json[i].Sync_Status +"</b></span>"
                    }
                    if (json[i].Sync_Status_Thread == "Completed") {
                        var StatusThread = "<span class='badge badge-pill badge-warning' style='width:100px;color:white;'><b>" + json[i].Sync_Status + "</b></span>"
                    } else {
                        var StatusThread = "<span class='badge badge-pill badge-warning' style='width:100px;color:white;'><b>" + json[i].Sync_Status + "</b></span>"
                    }
                    if (json[i].Sync_Data == "0") {
                        var Data = "<span class='badge badge-pill badge-primary' style='width:90px;color:white;'><b>" + json[i].Sync_Data + "</b></span>"
                    } else {
                        var Data = "<span class='badge badge-pill badge-primary' style='width:90px;color:white;'><b>" + json[i].Sync_Data + "</b></span>"
                    }
                    if (json[i].Sync_Data_Thread == "0") {
                        var DataThread = "<span class='badge badge-pill badge-warning' style='width:90px;color:white;'><b>" + json[i].Sync_Data_Thread + "</b></span>"
                    } else {
                        var DataThread = "<span class='badge badge-pill badge-warning' style='width:90px;color:white;'><b>" + json[i].Sync_Data_Thread + "</b></span>"
                    }
                    myTable.row.add([json[i].Sync_UserName, json[i].Sync_Name, json[i].Sync_Group, json[i].Sync_Site, Status, Data, StatusThread, DataThread, Action]).draw(false);
                    //ti - comment - alt
                }
            } else {
                $("#ReleaseFooter").show();
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionSyncronise(Sync_UserName) {
    swal({
        title: "Do you want to process ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    type: "POST",
                    url: "asmx/Syn_CronisePhase2.asmx/ActionDataTableTransaksi",
                    data: "{Sync_UserName:'" + Sync_UserName + "', Sync_Action:'Syncronize', Sync_Type:'Ticket'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    '' + json[i].ResultMessage + '',
                                    'success'
                                ).then(function () {
                                    location.href = "Syn_CronisePhase2.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    '' + json[i].ResultMessage + '',
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
                    }
                })
                            
            }
        });
}
function ActionSyncroniseThread(Sync_UserName) {
    swal({
        title: "Do you want to process ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    type: "POST",
                    url: "asmx/Syn_CronisePhase2.asmx/ActionDataTableTransaksi",
                    data: "{Sync_UserName:'" + Sync_UserName + "', Sync_Action:'Syncronize', Sync_Type:'Thread'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    '' + json[i].ResultMessage + '',
                                    'success'
                                ).then(function () {
                                    location.href = "Syn_CronisePhase2.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    '' + json[i].ResultMessage + '',
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
                    }
                })

            }
        });
}
function GetAgent() {
    swal({
        title: "Do you want to process ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    type: "POST",
                    url: "asmx/Syn_CronisePhase2.asmx/ActionDataTableTransaksi",
                    data: "{Sync_UserName:'0', Sync_Action:'Generate', Sync_Type:'Ticket'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var json = JSON.parse(data.d);
                        var i = "";
                        
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Generate Data Agent Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Syn_CronisePhase2.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Generate Data Agent Failed',
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
                    }
                })

            }
        });
}
function CheckTicketAgent() {
    $.ajax({
        type: "POST",
        url: "asmx/Syn_CronisePhase2.asmx/ActionDataTableTransaksi",
        data: "{Sync_UserName:'0', Sync_Action:'Generate', Sync_Type:'Ticket'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            if (json[i].length == "" || json[i].length == "0") {
                swal(
                    '',
                    'Generate Data Agent Success',
                    'success'
                ).then(function () {
                    location.href = "Syn_CronisePhase2.aspx";
                });
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}