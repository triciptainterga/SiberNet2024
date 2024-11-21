$(document).ready(function () {
    $("#LoaderPage").hide();
    DataTables();
});
function DataTables() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_Setting",
        data: "{ID:'0', Template:'0', Account:'0', State:'0', User: '" + $("#hd_sessionLogin").val() + "', Action: 'TABLE'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].FLAG == "1") {
                    var Turn = "<div class='d-flex justify-content-center'><label class='switch switch-border switch-danger'>" +
                        "<input type='checkbox' data-layout='fixed' checked='checked' onclick=ReplyOn(this.checked)>" +
                        "<span class='switch-indicator'></span><span class='switch-description'></span>" +
                        "</label></div>"
                } else {
                    var Turn = "<div class='d-flex justify-content-center'><label class='switch switch-border switch-danger'>" +
                        "<input type='checkbox' data-layout='fixed' onclick=ReplyOff(this.checked)>" +
                        "<span class='switch-indicator'></span><span class='switch-description'></span>" +
                        "</label></div>"
                }
                myTable.row.add([json[i].ID, json[i].SETTING_TYPE, Turn]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ReplyOn(checked) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                if (checked) {
                    var Flaging = "1"
                } else {
                    var Flaging = "0"
                }
                var form_data = JSON.stringify({ ID: "0", Template: Flaging, Account: "", State: "", User: $("#hd_sessionLogin").val(), Action: "UPDATE" });
                $.ajax({
                    type: "POST",
                    url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_Setting",
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
        });
}
function ReplyOff(checked) {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                if (checked) {
                    var Flaging = "1"
                } else {
                    var Flaging = "0"
                }
                var form_data = JSON.stringify({ ID: "0", Template: Flaging, Account: "", State: "", User: $("#hd_sessionLogin").val(), Action: "UPDATE" });
                $.ajax({
                    type: "POST",
                    url: "asmx/TrmTemplateAutoReply.asmx/AHU_Uidesk_TrxEmailAutoReply_Setting",
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
        });
}