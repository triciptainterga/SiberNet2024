$(document).ready(function () {
    $("#LoaderPageCounting").hide();
    Counting();
    DataTable("0");
});
function Counting() {
    var messageDiv = $('#divCountingDataCall');
    $.ajax({
        type: "POST",
        url: "asmx/Coll_TrxTaskboard.asmx/TaskboardCounting",
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
    var myTable = $('#TrmCollHeader').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Coll_TrxTaskboard.asmx/CollTaskboard",
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

                    //var d = new Date(json[i].TrxDateCreate);
                    //var milisegundos = parseInt(json[i].TrxDateCreate.replace("/Date(", "").replace(")/", ""));
                    //var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    //var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    //var ConverTanggal = newDate + ' ' + newTime

                    var d = new Date(json[i].TrxJatuhTempo);
                    var milisegundos = parseInt(json[i].TrxJatuhTempo.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConvertJatuhTempo = newDate

                    var urlClick = "<div class='dropdown'>" +
                        "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                        "<div class='dropdown-menu dropdown-menu-right'>" +
                        "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].TrxID + "','Spam')><i class='fa fa-trash'></i> Remove</a>" +
                        "<div class='dropdown-divider'></div>" +
                        "<a class='dropdown-item' href='Coll_TrxTransaksi.aspx?id=" + json[i].TrxID + "&name=" + json[i].TrxName + "&ph=" + json[i].TrxTelepon + "&mail=" + json[i].TrxEmail + "&script=" + json[i].TrxProdukID +"'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                        "</div>" +
                        "</div>"

                    var JumlahTagihannya = "<span class='badge badge-pill badge-primary' style='width: 80px;'>" + json[i].TrxJumlahTagihan + "</span>"
                    if (json[i].TrxCounting == null) {
                        var CallCounting = "<span class='badge badge-pill badge-danger' style='width: 27px;'>0</span>"
                    } else {
                        var CallCounting = "<span class='badge badge-pill badge-danger' style='width: 27px;'>" + json[i].TrxCounting + "</span>"
                    }
                    myTable.row.add([json[i].TrxID, json[i].TrxName, json[i].TrxEmail, json[i].TrxTelepon, json[i].TrxTotalPinjaman, JumlahTagihannya, ConvertJatuhTempo, CallCounting, urlClick]).draw(false);

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
function ModalPending() {
    $("#Modal-Call-Pending").modal('show');
    DataTablePending("0");
}
function DataTablePending(sValue) {
    var result = "";
    var myTable = $('#TrmCollHeaderPending').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Coll_TrxTaskboard.asmx/CollTaskboardPending",
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

                    var d = new Date(json[i].JatuhTempo);
                    var milisegundos = parseInt(json[i].JatuhTempo.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConvertJatuhTempo = newDate

                    var urlClick = "<div class='dropdown'>" +
                        "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                        "<div class='dropdown-menu dropdown-menu-right'>" +
                        "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "','Spam')><i class='fa fa-trash'></i> Remove</a>" +
                        "<div class='dropdown-divider'></div>" +
                        "<a class='dropdown-item' href='Coll_TrxTransaksi.aspx?id=" + json[i].ID + "&name=" + json[i].Name + "&ph=" + json[i].Telepon + "&mail=" + json[i].Email + "&script=" + json[i].ProdukID + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                        "</div>" +
                        "</div>"

                    var JumlahTagihannya = "<span class='badge badge-pill badge-primary' style='width: 80px;'>" + json[i].JumlahTagihan + "</span>"
                    //if (json[i].TrxStatus == "Belum Bayar") {
                    //    var Status = "<span class='badge badge-pill badge-danger' style='width: 100px;'>" + json[i].TrxStatus + "</span>"
                    //} else {
                    //    var Status = "<span class='badge badge-pill badge-success' style='width: 100px;'>" + json[i].TrxStatus + "</span>"
                    //}
                    if (json[i].CountingCall == null) {
                        var CallCounting = "<span class='badge badge-pill badge-danger' style='width: 27px;'>0</span>"
                    } else {
                        var CallCounting = "<span class='badge badge-pill badge-danger' style='width: 27px;'>" + json[i].CountingCall + "</span>"
                    }
                    myTable.row.add([json[i].ID, json[i].Name, json[i].Email, json[i].Telepon, json[i].TotalPinjaman, JumlahTagihannya, ConvertJatuhTempo, CallCounting, urlClick]).draw(false);

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