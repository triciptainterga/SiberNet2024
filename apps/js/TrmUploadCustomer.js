$(document).ready(function () {
    TrmUploadCustomer();
});
function TrmUploadCustomer() {
    var myTable = $('#TrmUploadCustomer').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmCustomer.asmx/UIDESK_TrxCustomer",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSearching:'0', TrxAction:'Upload'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCustomer = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {
                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"

                myTable.row.add([json[i].ID, json[i].Name, json[i].Email, json[i].HP, json[i].JenisKelamin, json[i].PolisNumber, json[i].NIK]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
var countPage = 0;
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
$('#files').change(function () {
    var filename = $('#files').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='files']", function (e) {
    $(".hiddenX").show();

    var fileName = $('#file').val();
    var fileExtension = fileName.split('.').pop();
    if (fileExtension == "xlsx" || fileExtension == "xls") {
    } else {
        swal("Document Not Allow")
        $('#file').val("")
        return false;
    }

    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        var filesizing = this.files[0].size / 1024 / 1024
        if (filesizing > 2) {
            swal(
                '',
                'Please upload file less than 2 MB. Thanks!',
                'error'
            ).then(function () {
                $(this).val('');
                return false;
            });
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#ContentPlaceHolder1_TrxUserName").val());
        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/TrmUploadCustomer.asmx/UploadCustomer",
            data: data,
            // dataType: "json",
            contentType: false,
            processData: false,

        });
        request.done(function (response) {
            $(".hiddenX").hide();
            $("#removeUpload").show();
            // result = response.d;
            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());
            $("#ContentPlaceHolder1_TrxUploadID").val($(response).find("Guid").text())

            //moveFileToDatabase('FileCustomer/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx', 'FileCustomer/' + $("#ContentPlaceHolder1_TrxUploadID").val() + '.xlsx');

            swal({
                title: "Do you want to process?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        var form_data = JSON.stringify({
                            TrxUploadID: $("#ContentPlaceHolder1_TrxUploadID").val(), TrxUserName: $("#hd_sessionLogin").val()
                        });
                        $.ajax({
                            url: "asmx/TrmUploadCustomer.asmx/Upload_InsertCustomer",
                            method: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: form_data,
                            success: function (data) {
                                var json = JSON.parse(data.d);
                                var i, result = "";

                                for (i = 0; i < json.length; i++) {

                                }
                                listDataUploadCustomer();
                                TrmUploadCustomer();
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



        });
        request.fail(function (response) {

            console.log(response.responseText);
            alert(response.responseText);

        });
        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
function modalUpload() {
    $("#modalLeft").modal('show');
}
function listDataUploadCustomer() {
    var ListUpload = $('#ListUpload');
    $.ajax({
        type: "POST",
        url: "asmx/TrmCustomer.asmx/UIDESK_TrxCustomer",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxSearching:'0', TrxAction:'Upload'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultUpload = "";

            ListUpload.empty();
            if (json.length == 0) {
                console.log("data not found " + i);
                resultUpload = '<div class="media media-single" > No data found... </div>';
                ListUpload.append(resultUpload);
            } else {

                for (i = 0; i < json.length; i++) {
                    resultUpload = '<div class="media media-single">' +
                        '<a href="#"><img src="../images/icon/call.png" height="32" alt="..."></a>' +
                        '<div class="media-body">' +
                        '<small class="text-fader"></small>' +
                        '<h6><a href="#" onclick="Reading(' + json[i].ID + ')">' + json[i].Name + '</a></h6>' +
                        '<small class="text-fader">' + json[i].Email + '</small>' +
                        '<small class="text-fader">' + json[i].HP + '</small>' +
                        '</div>' +
                        '</div>'
                    ListUpload.append(resultUpload);
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
function CloseUpload() {
    window.location.reload();
}
function moveFileToDatabase(asalNya, tujuanNya) {
    var tujuanNya = asalNya;
    var jsonText = JSON.stringify({ asal: "http://10.28.2.222/bri_omnichannel/FileUploadOutbound/" + asalNya, tujuan: tujuanNya });
    console.log(jsonText);
    $.ajax({
        type: "POST",
        url: "http://10.28.2.224/copyfile/copy.php",
        data: jsonText,
        //crossDomain: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(data);


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}