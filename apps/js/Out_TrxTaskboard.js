$(document).ready(function () {
    $("#LoaderPageCounting").hide();
    Counting();
    DataTable("0");
    $("#DropCalls").css("display", "none")
});
function Counting() {
    var messageDiv = $('#divCountingDataCall');
    $.ajax({
        type: "POST",
        url: "asmx/Out_TrxTaskboard.asmx/TaskboardCounting",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data)

            var json = JSON.parse(data.d);
            var i, x, ResultNya = "";

            messageDiv.empty();
            for (i = 0; i < json.length; i++) {
                ResultNya = ' <div class="col-12 col-lg-3" onclick="ClickdataTaskboard(' + json[i].Flag + ')" style="cursor:pointer;">' +
                    '<div class="box-body br-1 border-light">' +
                    '<div class="flexbox mb-1">' +
                    '<span>' +
                    '<i class="mdi ' + json[i].Icon + ' font-size-30"></i>' +
                    '<br>' +
                    '' + json[i].Type + '' +
                    '</span>' +
                    '<span class="text-' + json[i].Color + ' font-size-30">' + json[i].AdminCallCounting + '</span>' +
                    '</div>' +
                    '<div class="progress progress-xxs mt-10 mb-0">' +
                    '<div class="progress-bar bg-' + json[i].Color + '" role="progressbar" style="width: 50%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

                messageDiv.append(ResultNya);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DataTable(sValue) {
    var result = "";
    var myTable = $('#TrmTeleHeader').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Out_TrxTaskboard.asmx/OutTaskboard",
        data: "{TrxID:'" + sValue + "',TrxUserName: '" + $("#hd_sessionLogin").val() + "',TrxLevelUser: '" + $("#ContentPlaceHolder1_TrxLevelUser").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTable.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].TrxDateCreate);
                    var milisegundos = parseInt(json[i].TrxDateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime

                    //var urlClick = "<div class='dropdown'>" +
                    //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    //    "<div class='dropdown-menu dropdown-menu-right'>" +
                    //    "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].TrxID + "','Spam')><i class='fa fa-trash'></i> Remove</a>" +
                    //    "<div class='dropdown-divider'></div>" +
                    //    "<a class='dropdown-item' href='Out_TrxTaskboard.aspx?id=" + json[i].TrxID + "&name=" + json[i].TrxName + "&ph=" + json[i].TrxTelepon + "&mail=" + json[i].TrxEmail + "&script=" + json[i].TrxProdukID + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                    //    "</div>" +
                    //    "</div>"
                    var urlClick = "<a href='#' onclick=ModalShowing('" + json[i].TrxID + "','" + json[i].TrxTelepon + "')><i class='si-arrow-right-circle si text-warning'></i>"
                    if (json[i].TrxCounting == null) {
                        var CallCounting = "<span class='badge badge-pill badge-danger' style='width: 27px;'>0</span>"
                    } else {
                        var CallCounting = "<span class='badge badge-pill badge-danger' style='width: 27px;'>" + json[i].TrxCounting + "</span>"
                    }
                    myTable.row.add([json[i].TrxID, json[i].TrxName, json[i].TrxEmail, json[i].TrxTelepon, json[i].TrxJobTitle, json[i].TrxAddress, newDate + ' ' + newTime, CallCounting, urlClick]).draw(false);

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
function ClickdataTaskboard(sValue) {
    DataTable(sValue)
}
function ModalShowing(HeaderID, TrxTelepon) {
    $("#ContentPlaceHolder1_TrxID").val(HeaderID);
    $("#ContentPlaceHolder1_TrxTelepon").val(TrxTelepon);
    $("#Modal-Call").modal('show');
    LoadDataRelatedTicket();
}
function DialCall() {
    swal({
        title: "Do you want to call?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                console.log("Dial Call");
                const Http = new XMLHttpRequest();
                const url = "http://localhost:60024/dial/telp=" + $("#ContentPlaceHolder1_TrxTelepon").val()
                console.log("url" + url)
                Http.open("GET", url);
                Http.send();

                        $("#SimpanTransaksi").css("display", "none")
                        $("#DialCalls").css("display","none")
                        $("#DropCalls").css("display", "block")

            } else {
                window.location.reload();
            }
        });
}
function DropCall() {
    swal({
        title: "Do you want to drop?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                console.log("Drop Call");
                const Http = new XMLHttpRequest();
                const url = "http://localhost:60024/drop/telp=" + $("#ContentPlaceHolder1_TrxTelepon").val()
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText)
                    //window.close();
                }

                $("#DialCalls").css("display", "none")
                $("#DropCalls").css("display", "none")
                $("#SimpanTransaksi").css("display", "block")
                $("#BodyCall").css("display", "none")

            }
        });

}
function ActionSimpanTransaksi() {
    if ($("#ContentPlaceHolder1_TrxTelepon").val() == "") {
        swal(
            '',
            'Telepon Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var Keterangan = CKEDITOR.instances.Coll_Notes.getData();
    if (Keterangan == "") {
        swal(
            '',
            'Keterangan Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusCall").val() == "" || $("#ComboStatusCall").val() == null) {
        swal(
            '',
            'Status Call Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusData").val() == "" || $("#ComboStatusData").val() == null) {
        swal(
            '',
            'Status Transaksi Kosong',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Tanggal").val() == "") {
        swal(
            '',
            'Tanggal Transaksi Kosong',
            'info'
        ).then(function () {
            return false;
        });
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
                    HeaderID: $("#ContentPlaceHolder1_TrxID").val(), Telepon: $("#ContentPlaceHolder1_TrxTelepon").val(),
                    Keterangan: Keterangan, StatusTelepon: $("#ComboStatusCall").val(), StatusData: $("#ComboStatusData").val(),
                    Tanggal: $("#Tanggal").val(), UserName: $("#hd_sessionLogin").val()
                });
                $.ajax({
                    url: "asmx/Out_TrxTaskboard.asmx/SimpanTransaksi",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)
                        var json = JSON.parse(data.d);
                        var i = "";

                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Data Has Been Save Success',
                                    'success'
                                ).then(function () {
                                    LoadDataRelatedTicket();
                                    //window.location = "Out_TrxTaskboard.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Data Has Been Save Failed',
                                    'error'
                                ).then(function () {
                                    return false
                                    //window.location = "Out_TrxTaskboard.aspx";
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
    $("#SimpanTransaksi").css("display", "none")
    CKEDITOR.instances.Coll_Notes.setData()
}
function LoadDataRelatedTicket() {
    var storeDataInteractionInternal;
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK103'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var dataJourney = "";
            var json = JSON.parse(data.d);
            var i, x, resultSourceStatus = "";

            $('#Journey_ListOfTicket').empty()
            for (i = 0; i < json.length; i++) {

                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime
                    dataJourney += '<span class="timeline-label">' +
                        '<span class="badge badge-pill badge-primary badge-lg" style="margin-left:20px;">' + json[i].StatusTelepon + ' || ' + json[i].StatusData + '</span>' +
                        '</span>' +
                        '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].CreatedBy + '</p>' +
                        '<div class="timeline-body">' +
                        '' + json[i].Keterangan + '' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<p class="pull-left text-fade" style="font-size:12px;">' + json[i].CreatedBy + '</p>' +
                        '<p class="pull-right text-fade" style="font-size:12px;">' + ConverTanggal + '</p></br>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                }

                $('#Journey_ListOfTicket').append(dataJourney);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ModalPending() {
    $("#Modal-Call-Pending").modal('show');
    DataTablePending("0");
}
function DataTablePending(sValue) {
    var result = "";
    var myTable = $('#TrmOutHeaderPending').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Out_TrxTaskboard.asmx/OutTaskboardPending",
        data: "{UserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTable.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime

                    var urlClick = "<a href='#' onclick=ModalShowing('" + json[i].ID + "','" + json[i].Telepon + "')><i class='si-arrow-right-circle si text-warning'></i>"
                    if (json[i].CountingCall == null) {
                        var CallCounting = "<span class='badge badge-pill badge-danger' style='width: 27px;'>0</span>"
                    } else {
                        var CallCounting = "<span class='badge badge-pill badge-danger' style='width: 27px;'>" + json[i].CountingCall + "</span>"
                    }
                    myTable.row.add([json[i].ID, json[i].Name, json[i].Email, json[i].Telepon, newDate + ' ' + newTime, CallCounting, urlClick]).draw(false);

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