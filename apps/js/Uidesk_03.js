$(document).ready(function () {
    TrmTransaksi();
    Company();
    Partner();
    Application();
});
function TrmTransaksi() {
    var myTable = $('#DataTables').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'0', TableID: '004', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DATE_CREATE);
                var milisegundos = parseInt(json[i].DATE_CREATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=AddQuatation('" + json[i].TRANSAKSI_ID + "')><i class='fa fa-file-word-o'></i>Add Quotation</a>" +
                    "<a class='dropdown-item' href='#' onclick=AddInteraction('" + json[i].TRANSAKSI_ID + "')><i class='fa fa-plus'></i>Add Interaction</a>" +
                    "</div>" +
                    "</div>"

                if (json[i].STATUS_TRANSAKSI == "New") {
                    var Status = "<span class='badge badge-pill badge-success' style='width: 80px;'>" + json[i].STATUS_TRANSAKSI +"</span>"
                } else if (json[i].STATUS_TRANSAKSI == "Progress"){
                    var Status = "<span class='badge badge-pill badge-primary' style='width: 80px;'>" + json[i].STATUS_TRANSAKSI + "</span>"
                } else if (json[i].STATUS_TRANSAKSI == "Pending"){
                    var Status = "<span class='badge badge-pill badge-warning' style='width: 80px;'>" + json[i].STATUS_TRANSAKSI + "</span>"
                } else {
                    var Status = "<span class='badge badge-pill badge-danger' style='width: 80px;'>" + json[i].STATUS_TRANSAKSI + "</span>"
                }
                if (json[i].FILES == "1") {
                    var attachment = "<a href='#' onclick=PreviewTransaksiAttachmentSide('" + json[i].TRANSAKSI_ID + "')><i class='fa fa-file'></i></a>";
                } else {
                    var attachment = "-";
                }
                myTable.row.add([json[i].TRANSAKSI_ID, json[i].SUBJECT, "<span class='badge badge-pill badge-info' style='width: 100%;'>" + json[i].COMPANY_NAME + "</span>", json[i].APPLICATION_NAME, json[i].PARTNER_NAME, json[i].PARTNER_COMPANY, json[i].FOLLOW_STATE, Status, attachment,urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TransactionModal() {
    ClearTransaksi();
    $("#modal-apps").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#Delete").css("display", "none");
}
function ActionSimpan() {
    if ($("#TransaksiSubject").val() == "") {
        swal(
            '',
            'Subject Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Combo_Company").val() == "" || $("#Combo_Company").val() == null || $("#Combo_Company").val() == "Select") {
        swal(
            '',
            'Company Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Combo_Partner").val() == "" || $("#Combo_Partner").val() == null || $("#Combo_Partner").val() == "Select") {
        swal(
            '',
            'Partner Name Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Combo_Application").val() == "" || $("#Combo_Application").val() == null || $("#Combo_Application").val() == "Select") {
        swal(
            '',
            'Application Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Combo_Follow").val() == "" || $("#Combo_Follow").val() == null || $("#Combo_Follow").val() == "Select") {
        swal(
            '',
            'Follow Up State Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Combo_Status").val() == "" || $("#Combo_Status").val() == null || $("#Combo_Status").val() == "Select") {
        swal(
            '',
            'Status Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TransactionNote = CKEDITOR.instances.UIDESK_Request.getData();
    if (TransactionNote == "") {
        swal(
            '',
            'Transaction Note Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#DateTransaction").val() == "" || $("#DateTransaction").val() == null) {
        swal(
            '',
            'Date Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Combo_UIDESK").val() == "" || $("#Combo_UIDESK").val() == null || $("#Combo_UIDESK").val() == "Select") {
        swal(
            '',
            'PIC Uidesk Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    
    var form_data = JSON.stringify({
        Subject: $("#TransaksiSubject").val(), CompanyID: $("#Combo_Company").val(), PartnerID: $("#Combo_Partner").val(), ApplicationID: $("#Combo_Application").val(),
        FollowState: $("#Combo_Follow").val(), Status: $("#Combo_Status").val(), Note: TransactionNote,
        DateTransaksi: $("#DateTransaction").val(), Uidesk: $("#Combo_UIDESK").val(), UserName: $("#hd_sessionLogin").val(),
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Uidesk_01.asmx/APPS_UIDESK_TRANSAKSI_PROCESS",
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
                                    'Insert Transaction Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-apps").modal('hide');
                                    window.location.reload();
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Transaction Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false
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
function ActionSimpanInteraction() {
    if ($("#Subject_Interaction").val() == "") {
        swal(
            '',
            'Subject Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var InteractionNotes = CKEDITOR.instances.Interaction_Notes.getData();
    if (InteractionNotes == "") {
        swal(
            '',
            'Interaction Note Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboState").val() == "" || $("#ComboState").val() == "Select") {
        swal(
            '',
            'Follow Up State Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboStatusTransaksi").val() == "" || $("#ComboStatusTransaksi").val() == "Select") {
        swal(
            '',
            'Status Transaksi Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        TransaksiID: $("#ContentPlaceHolder1_TrxID").val(), Subject: $("#Subject_Interaction").val(), FollowState: $("#ComboState").val(), Note: InteractionNotes,
        StatusTransaksi: $("#ComboStatusTransaksi").val(), UserName: $("#hd_sessionLogin").val(),
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Uidesk_01.asmx/APPS_UIDESK_TRANSAKSI_INTERACTION",
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
                                    'Insert Transaction Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-interaction").modal('hide');
                                    ClearInteraction()
                                    window.location.reload();
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Transaction Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false
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
function ActionSimpanQuatation() {
    if ($("#Quo_Subject").val() == "") {
        swal(
            '',
            'Subject Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Quo_Number").val() == "") {
        swal(
            '',
            'Number Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var QuatationNotes = CKEDITOR.instances.QUO_Notes.getData();
    if (QuatationNotes == "") {
        swal(
            '',
            'Note Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }  
    if ($("#Quo_Versi").val() == "") {
        swal(
            '',
            'Version Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Quo_Total").val() == "") {
        swal(
            '',
            'Total Empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var form_data = JSON.stringify({
        TransaksiID: $("#ContentPlaceHolder1_TrxID").val(), Subject: $("#Quo_Subject").val(), Number: $("#Quo_Number").val(), Note: QuatationNotes,
        Versi: $("#Quo_Versi").val(), Total: $("#Quo_Total").val(), UserName: $("#hd_sessionLogin").val(),
    });
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Uidesk_01.asmx/APPS_UIDESK_TRANSAKSI_QUOTATION",
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
                                    'Insert Transaction Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#modal-quatation").modal('hide');
                                    ClearQuatation()
                                    window.location.reload();
                                });
                            } else {
                                swal(
                                    '',
                                    'Insert Transaction Has Been Failed',
                                    'error'
                                ).then(function () {
                                    return false
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
function Company() {
    var Company = $('#Combo_Company');
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'0', TableID: '001', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, R_Company = "";

            for (i = 0; i < json.length; i++) {

                R_Company = '<option value="' + json[i].ID + '">' + json[i].COMPANY + '</option>';
                Company.append(R_Company);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Partner() {
    var Partner = $('#Combo_Partner');
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'0', TableID: '002', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, R_Partner = "";

            for (i = 0; i < json.length; i++) {

                R_Partner = '<option value="' + json[i].ID + '">' + json[i].PARTNER_NAME + '</option>';
                Partner.append(R_Partner);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Application() {
    var Application = $('#Combo_Application');
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'0', TableID: '003', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, R_Application = "";

            for (i = 0; i < json.length; i++) {

                R_Application = '<option value="' + json[i].ID + '">' + json[i].APPLICATION + '</option>';
                Application.append(R_Application);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function AddQuatation(ID) {
    ClearQuatation()
    $("#ContentPlaceHolder1_TrxID").val(ID)
    $("#modal-quatation").modal('show');
    JourNeyQuotation();
}
function AddInteraction(ID) {
    ClearInteraction()
    $("#ContentPlaceHolder1_TrxID").val(ID)
    $("#modal-interaction").modal('show');
    JourNeyInteraction();
}
function JourNeyInteraction() {
    $("#JourNeyInteraction").show()
    var dataJourNeyInteraction = "";
    var iconChannel = "";
    var channelDesc = "";
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() +"', TableID: '005', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            $('#JourNeyInteraction').empty();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DATE_CREATE);
                var milisegundos = parseInt(json[i].DATE_CREATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].FILES == "1") {
                    var file = "<span class='mailbox-attachment-icon pull-left' style='margin-left:-10px;cursor:pointer;' onclick=PreviewInteractionAttachmentSide('" + json[i].ID + "')><i class='fa fa-file-image-o text-primary'></i></span>"
                } else {
                    var file = ""
                }

                if (json[i].STATUS_TRANSAKSI == "New") {
                    var Color = "success"
                } else if (json[i].STATUS_TRANSAKSI == "Progress") {
                    var Color = "info"
                } else if (json[i].STATUS_TRANSAKSI == "Pending") {
                    var Color = "primary"
                } else if (json[i].STATUS_TRANSAKSI == "Completed") {
                    var Color = "warning"
                }
                if (json[i].INTERACTION_NOTE == null) {
                    var interaction = "";
                } else {
                    var interaction = '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<div class="timeline-body">' +
                        '' + json[i].INTERACTION_NOTE + '' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + ' ' + newTime + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                dataJourNeyInteraction +=
                    '<span class="timeline-label">' +
                '<span class="badge badge-pill badge-' + Color + ' badge-lg" style="margin-left:28px;"><i class="fa fa-circle mr-5 text-white"></i>' + json[i].STATUS_TRANSAKSI + '</span>' +
                    '</span>' +
                    '<div class="timeline-item">' +
                    '<div class="timeline-point">' +
                    '<i class="ion ion-chatbubble-working"></i>' +
                    '</div>' +
                    '<div class="timeline-event">' +
                    '<p class="font-size-16"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].USER_CREATE + '</p>' +
                    '<div class="timeline-body">' +
                    '<p class="font-size-16">Subject : ' + json[i].SUBJECT + '</p>' +
                    '</br>' +
                    '' + json[i].INTERACTION_NOTE + '' +
                    '</div>' +
                    '<div class="timeline-footer">' +
                    '' + file + '' +
                    '</br>' +
                    '</br>' +
                    '</br>' +
                    '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + ' ' + newTime + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

            }
            $('#JourNeyInteraction').append(dataJourNeyInteraction);
            //$("#LoaderJourNeyInteraction").hide();

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function JourNeyQuotation() {
    $("#JourNeyQuotation").show()
    var dataJourNeyQuotation = "";
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TableID: '006', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            $('#JourNeyQuotation').empty();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DATE_CREATE);
                var milisegundos = parseInt(json[i].DATE_CREATE.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].FILES == "1") {
                    var file = "<span class='mailbox-attachment-icon pull-left' style='margin-left:-10px;cursor:pointer;' onclick=PreviewQuotationAttachmentSide('" + json[i].ID + "')><i class='fa fa-file-image-o text-primary'></i></span>"
                } else {
                    var file = ""
                }
                //var file = ""
                if (json[i].INTERACTION_NOTE == null) {
                    var interaction = "";
                } else {
                    var interaction = '<div class="timeline-item">' +
                        '<div class="timeline-point">' +
                        '<i class="fa fa-circle"></i>' +
                        '</div>' +
                        '<div class="timeline-event">' +
                        '<div class="timeline-body">' +
                        '' + json[i].NOTE + '' +
                        '</div>' +
                        '<div class="timeline-footer">' +
                        '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + ' ' + newTime + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                dataJourNeyQuotation +=
                    '<span class="timeline-label">' +
                    '<span class="badge badge-pill badge-success badge-lg" style="margin-left:28px;"><i class="fa fa-circle mr-5 text-white"></i>' + json[i].NUMBER + '</span>' +
                    '</span>' +
                    '<div class="timeline-item">' +
                    '<div class="timeline-point">' +
                    '<i class="ion ion-chatbubble-working"></i>' +
                    '</div>' +
                    '<div class="timeline-event">' +
                    '<p class="font-size-14"><img alt="Profile" src="../images/avatar/6.jpg" class="avatar"/>' + json[i].USER_CREATE + '</p>' +
                    '<div class="timeline-body">' +
                    '<p class="font-size-14">Subject : ' + json[i].SUBJECT + '</p>' +
                    '</br>' +
                    '' + json[i].NOTE + '' +
                    '</br>' +
                    '<p class="font-size-14">Versi : ' + json[i].VERSI + '</p>' +
                    '<p class="font-size-14">Total : ' + json[i].TOTAL + '</p>' +
                    '</div>' +
                    '<div class="timeline-footer">' +
                    '' + file + '' +
                    '</br>' +
                    '</br>' +
                    '</br>' +
                    '<p class="pull-right text-fade" style="font-size:12px;">' + newDate + ' ' + newTime + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

            }
            $('#JourNeyQuotation').append(dataJourNeyQuotation);

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ClearTransaksi() {
    $("#TransaksiSubject").val("")
    $("#Combo_Company").val("")
    $("#Combo_Partner").val("")
    $("#Combo_Application").val("")
    $("#Combo_Follow").val("")
    $("#Combo_Status").val("")
    CKEDITOR.instances.UIDESK_Request.setData("");
    $("#DateTransaction").val("")
    $("#Combo_UIDESK").val("")
}
function ClearInteraction() {
    $("#Subject_Interaction").val("")
    CKEDITOR.instances.Interaction_Notes.setData("");
    $("#ComboState").val("")
    $("#ComboStatusTransaksi").val("")
}
function ClearQuatation() {
    $("#Quo_Subject").val("")
    $("#Quo_Number").val("")
    $("#Quo_Versi").val("")
    $("#Quo_Total").val("")
    CKEDITOR.instances.QUO_Notes.setData("");
}
$('#filesTransaksinya').change(function () {
    var filename = $('#filesTransaksinya').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filesTransaksinya']", function (e) {
    $(".hiddenX").show();

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
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("UserName", $("#hd_sessionLogin").val());
        //data.append("numberid", getParameterByName('numberid'));
        data.append("TransaksiID", "0");

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/Uidesk_01.asmx/FileTransaksi",
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
            PreviewTransaksiAttachmentSide("0")
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());

        });

        request.fail(function (response) {
            console.log(response.responseText);
        });
        request.always(function () {
            data.delete(itemid);
            data.delete(files[i]);
        });
    }
});

$('#filesInteractionnya').change(function () {
    var filename = $('#filesInteractionnya').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filesInteractionnya']", function (e) {
    $(".hiddenX").show();

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
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("UserName", $("#hd_sessionLogin").val());
        //data.append("numberid", getParameterByName('numberid'));
        data.append("TransaksiID", $("#ContentPlaceHolder1_TrxID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/Uidesk_01.asmx/FileInteraction",
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
            PreviewInteractionAttachmentSide("0")
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());

        });

        request.fail(function (response) {
            console.log(response.responseText);
        });
        request.always(function () {
            data.delete(itemid);
            data.delete(files[i]);
        });
    }
});

$('#filesQuotation').change(function () {
    var filename = $('#filesQuotation').val();
    if (filename.substring(3, 11) == 'fakepath') {
        filename = filename.substring(12);
    } // For Remove fakepath
    $("label[for='file_name'] b").html(filename);
    $("label[for='file_default']").text('Selected File: ');
    if (filename == "") {
        $("label[for='file_default']").text('No File Choosen');
    }
});
$(document).on("change", "input[name='filesQuotation']", function (e) {
    $(".hiddenX").show();

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
            return false;
        }

        var filename = this.files[0].name
        var fileextension = filename.split('.').pop();
        if (fileextension == "xls" || fileextension == "xlsx" || fileextension == "doc" || fileextension == "docx" || fileextension == "pdf" || fileextension == "png" || fileextension == "PNG" || fileextension == "jpg" || fileextension == "JPG" || fileextension == "jpeg" || fileextension == "gif" || fileextension == "GIF" || fileextension == "bmp" || fileextension == "BMP") {

        } else {
            swal(
                '',
                'File extension not allowed !',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("UserName", $("#hd_sessionLogin").val());
        //data.append("numberid", getParameterByName('numberid'));
        data.append("TransaksiID", $("#ContentPlaceHolder1_TrxID").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "asmx/Uidesk_01.asmx/FileQuotation",
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
            PreviewQuotationAttachmentSide("0")
            console.log("Success");
            console.log($(response).find("Guid").text());
            console.log($(response).find("FileExt").text());

        });

        request.fail(function (response) {
            console.log(response.responseText);
        });
        request.always(function () {
            data.delete(itemid);
            data.delete(files[i]);
        });
    }
});

function PreviewTransaksiAttachmentSide(TransaksiID) {
    //var URLInteraction = "http://localhost/2022briqm/FileTransaction/FileInteraction/"
    var URLQuotation = "http://" + IPSERVER + "/"
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'" + TransaksiID + "', TableID: '009', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultInteractionAttachmentSide = "";

            $('#PreviewInteractionAttachmentSide').empty();
            for (i = 0; i < json.length; i++) {

                if (json[i].EXTENSION == ".doc") {
                    var FileTypes = "word";
                }
                else if (json[i].EXTENSION == ".docx") {
                    var FileTypes = "word";
                }
                else if (json[i].EXTENSION == ".pdf" || json[i].EXTENSION == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].EXTENSION == ".xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].EXTENSION == ".xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].EXTENSION == ".zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].EXTENSION == ".txt") {
                    var FileTypes = "code";
                }
                else if (json[i].EXTENSION == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].EXTENSION == ".png" || json[i].EXTENSION == ".PNG" || json[i].EXTENSION == ".jpg" || json[i].EXTENSION == ".JPG" || json[i].EXTENSION == ".jpeg" || json[i].EXTENSION == ".JPEG" || json[i].EXTENSION == ".gif" || json[i].EXTENSION == ".GIF" || json[i].EXTENSION == ".BMP" || json[i].EXTENSION == ".bmp") {
                    var FileTypes = "image";
                }
                resultInteractionAttachmentSide = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-primary"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>' +
                    '<a href=' + URLQuotation + '' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#PreviewInteractionAttachmentSide').append(resultInteractionAttachmentSide)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#modal-preview-interactionattachment").modal('show');
}
function PreviewQuotationAttachmentSide(QuotationID) {
    //var URLInteraction = "http://localhost/2022briqm/FileTransaction/FileInteraction/"
    var URLQuotation = "http://" + IPSERVER + "/"
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'" + QuotationID + "', TableID: '007', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultInteractionAttachmentSide = "";

            $('#PreviewInteractionAttachmentSide').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].EXTENSION == ".doc") {
                    var FileTypes = "word";
                }
                else if (json[i].EXTENSION == ".docx") {
                    var FileTypes = "word";
                }
                else if (json[i].EXTENSION == ".pdf" || json[i].EXTENSION == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].EXTENSION == ".xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].EXTENSION == ".xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].EXTENSION == ".zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].EXTENSION == ".txt") {
                    var FileTypes = "code";
                }
                else if (json[i].EXTENSION == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].EXTENSION == ".png" || json[i].EXTENSION == ".PNG" || json[i].EXTENSION == ".jpg" || json[i].EXTENSION == ".JPG" || json[i].EXTENSION == ".jpeg" || json[i].EXTENSION == ".JPEG" || json[i].EXTENSION == ".gif" || json[i].EXTENSION == ".GIF" || json[i].EXTENSION == ".BMP" || json[i].EXTENSION == ".bmp") {
                    var FileTypes = "image";
                }
                resultInteractionAttachmentSide = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-primary"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>' +
                    '<a href=' + URLQuotation + '' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#PreviewInteractionAttachmentSide').append(resultInteractionAttachmentSide)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#modal-preview-interactionattachment").modal('show');
}
function PreviewInteractionAttachmentSide(InteractionID) {
    //var URLInteraction = "http://localhost/2022briqm/FileTransaction/FileInteraction/"
    var URLQuotation = "http://" + IPSERVER + "/"
    $.ajax({
        type: "POST",
        url: "asmx/Uidesk_01.asmx/APPS_UIDESK_QUERY",
        data: "{ID:'" + InteractionID + "', TableID: '008', UserName:'" + $("#hd_sessionLogin").val() + "', Action: 'SELECT'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultInteractionAttachmentSide = "";

            $('#PreviewInteractionAttachmentSide').empty();
            for (i = 0; i < json.length; i++) {
                if (json[i].EXTENSION == ".doc") {
                    var FileTypes = "word";
                }
                else if (json[i].EXTENSION == ".docx") {
                    var FileTypes = "word";
                }
                else if (json[i].EXTENSION == ".pdf" || json[i].EXTENSION == "pdf") {
                    var FileTypes = "pdf";
                }
                else if (json[i].EXTENSION == ".xls") {
                    var FileTypes = "excel";
                }
                else if (json[i].EXTENSION == ".xlsx") {
                    var FileTypes = "excel";
                }
                else if (json[i].EXTENSION == ".zip") {
                    var FileTypes = "zip";
                }
                else if (json[i].EXTENSION == ".txt") {
                    var FileTypes = "code";
                }
                else if (json[i].EXTENSION == ".rar") {
                    var FileTypes = "zip";
                }
                else if (json[i].EXTENSION == ".png" || json[i].EXTENSION == ".PNG" || json[i].EXTENSION == ".jpg" || json[i].EXTENSION == ".JPG" || json[i].EXTENSION == ".jpeg" || json[i].EXTENSION == ".JPEG" || json[i].EXTENSION == ".gif" || json[i].EXTENSION == ".GIF" || json[i].EXTENSION == ".BMP" || json[i].EXTENSION == ".bmp") {
                    var FileTypes = "image";
                }
                resultInteractionAttachmentSide = '<ul class="mailbox-attachments clearfix">' +
                    '<li>' +
                    '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o text-primary"></i></span>' +
                    '<div class="mailbox-attachment-info">' +
                    '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].FILENAME.substring(0, 15) + '</a>' +
                    '<a href=' + URLQuotation + '' + json[i].URL + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>' +
                    '</span>' +
                    '</div>' +
                    '</li>' +
                    '<ul>'
                $('#PreviewInteractionAttachmentSide').append(resultInteractionAttachmentSide)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#modal-preview-interactionattachment").modal('show');
}