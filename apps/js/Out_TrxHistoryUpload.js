$(document).ready(function () {

});
function FunctionDelete(UploadID) {
    $("#ContentPlaceHolder1_TrxID").val(UploadID)
    var form_data = JSON.stringify({ Action: "DELETE", UploadID: $("#ContentPlaceHolder1_TrxID").val()});
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "asmx/Out_TrxHistoryUpload.asmx/DeleteDataUpload",
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
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    location.href = "Out_TrxHistoryUpload.aspx?";
                                    //location.href = "Tele_TrxUpload.aspx?p_re=1&id=" + getParameterByName("id") + "";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
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