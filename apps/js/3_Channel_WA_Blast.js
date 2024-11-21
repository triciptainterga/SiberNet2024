$(document).ready(function () {
    $("#removeUpload").hide();
    $("#LoaderPage").hide();
    loadDataTemplateBlast();
    
});
var countPage = 0;
//IG Monitoring
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
    //var valnoWA = "628119970460";//$('#tglKejadian').val();
    var files = $(this).prop("files");
    var data = new FormData();

    var request;
    var result;
    var modal = $(this).closest(".modal");
    var itemid = modal.data("itemid");

    for (var i = 0; i < files.length; i++) {

        data.append("id", "617367367613876138");
        data.append("file", files[i]);
        data.append("Username", $("#hidusername").val());

        request = $.ajax({

            type: "POST",
            enctype: 'multipart/form-data',
            url: "WebServiceTransaction.asmx/UploadFile",
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
            //alert(result.NameNya);
            location.reload();

        });

        request.fail(function (response) {

            console.log(response.responseText);
            //alert(response.responseText);

        });

        request.always(function () {

            data.delete(itemid);
            data.delete(files[i]);

        });

    }
});
function Blast_SaveData() {
    console.log("hai submit..." + $("#cmb_TemplateBlast").val());
    $("#LoaderPage").show();
    var agree = confirm("Are you sure you wish to continue?");
    if (agree) {
        //return true;
        console.log("hai true..." + $("#cmb_TemplateBlast").val());
        var jsonText = JSON.stringify({ Keterangan: 'Generate', idTable: $("#cmb_TemplateBlast").val() });
        //var valnoWA = "628119970460";//$('#tglKejadian').val();
        $.ajax({
            type: "POST",
            url: "asmx/ServiceChannelWaBlastDashboard.asmx/UpdateDataBlast",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                var json = JSON.parse(response.d);
                //alert(json.ResultNya);
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();
                window.location ="3_Channel_WA_Blast.aspx";
                console.log("Success Generate Phone Blast...");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(xhr.responseText);
                alert(thrownError);
            }
        });
    } else {
        console.log("hai false..." + $("#cmb_TemplateBlast").val());
        return false;
    }
    
};

//function Blast_Now() {
//    console.log("hai blast now...");
//    $("#LoaderPage").show();
//    //var jsonText = JSON.stringify({ Keterangan: 'Generate' });
//    //var valnoWA = "628119970460";//$('#tglKejadian').val();
//    var agree = confirm("Are you sure you wish to continue?");
//    if (agree) {
//        //return true;
//        console.log("hai blast true...");
//        $.ajax({
//            type: "GET",
//            url: "http://103.234.210.228:8001/send/blast",
//            contentType: "application/json; charset=utf-8",
//            //data: jsonText,
//            //dataType: "json",
//            success: function (response) {
//                var json = JSON.parse(response.d);
//                console.log("hai blast response..." + json);
//                //Update datetime
//                Blast_UpdateData();
//                //alert(json.ResultNya);
//            }, complete: function () {
//                //back to normal!

//                $("#LoaderPage").hide();
//                //window.location = "3_Channel_WA_Blast.aspx";
//                console.log("Success Blast Now...");
//            },
//            error: function (xhr, ajaxOptions, thrownError) {
//                alert(xhr.status);
//                alert(xhr.responseText);
//                alert(thrownError);
//            }
//        });
//    } else {
//        console.log("hai Blast Now false...");
//        return false;
//    }
//}

function Blast_UpdateData() {
    console.log("hai update...");
    $("#LoaderPage").show();
    var jsonText = JSON.stringify({ Keterangan: 'Updateblast', idTable: '0' });
    //var valnoWA = "628119970460";//$('#tglKejadian').val();
    var agree = confirm("Are you sure you wish to continue?");
    if (agree) {
        //return true;
        console.log("hai update true...");
        $.ajax({
            type: "POST",
            url: "asmx/ServiceChannelWaBlastDashboard.asmx/UpdateDataBlast",
            contentType: "application/json; charset=utf-8",
            data: jsonText,
            dataType: "json",
            success: function (response) {
                var json = JSON.parse(response.d);
                //alert(json.ResultNya);
            }, complete: function () {
                //back to normal!
                $("#LoaderPage").hide();
                //window.location = "3_Channel_WA_Blast.aspx";
                console.log("Success update data Phone Blast...");
                window.open('http://103.234.210.228:8001/send/blast', '_blank');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(xhr.responseText);
                alert(thrownError);
            }
        });
    } else {
        $("#LoaderPage").hide();
        console.log("hai generate false...");
       // return false;
    }
};

function Blast_GenerateData() {
    console.log("hai generate...");
    $("#LoaderPage").show();
    var jsonText = JSON.stringify({ Keterangan: 'Generate' });
    //var valnoWA = "628119970460";//$('#tglKejadian').val();
    var agree = confirm("Are you sure you wish to continue?");
    if (agree) {
        //return true;
        console.log("hai generate true...");
    $.ajax({
        type: "POST",
        url: "asmx/ServiceChannelWaBlastDashboard.asmx/GenerateDataBlast",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {
            var json = JSON.parse(response.d);
            //alert(json.ResultNya);
        }, complete: function () {
            //back to normal!
            $("#LoaderPage").hide();
            window.location = "3_Channel_WA_Blast.aspx";
            console.log("Success Generate Phone Blast...");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(xhr.responseText);
            alert(thrownError);
        }
        });
    } else {
        console.log("hai generate false...");
        return false;
    }
};

$("#removeUpload").click(function () {
    $("#removeUpload").hide();
    $(".hiddenX").show();
    var jsonText = JSON.stringify({ fileName: $("#txtFileName").val() });
    //var valnoWA = "628119970460";//$('#tglKejadian').val();
    $.ajax({
        type: "POST",
        url: "Action/WebService.asmx/GenerateDataBlast",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {
            var json = JSON.parse(response.d);
            //alert(json.ResultNya);
        }, complete: function () {
            //back to normal!
            $(".hiddenX").hide();
            $("label[for='file_default']").text('No File Choosen');
            $("label[for='file_name'] b").html('');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(xhr.responseText);
            alert(thrownError);
        }
    });

});

function loadDataTemplateBlast() {
    var JenisKondisi = "AllWhereData";
    var cmbDataBlast = $('#cmb_TemplateBlast');
    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "templateBlast", paramQuery: "where StatusMsg='YES'" });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/GetWhereRecords_WA",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultStatus = "";
            for (i = 0; i < json.length; i++) {
                //alert();
                //alert();
                //alert(json[i].UserCreate);
                resultStatus = '<option value="' + json[i].ID + '">' + json[i].TemplateName + '</option>';

                cmbDataBlast.append(resultStatus);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}