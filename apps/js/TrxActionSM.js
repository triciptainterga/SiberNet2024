$(document).ready(function () {

});

function ActionSaveNewPages() {

    console.log("hai submit Post..." + $("#cmb_TemplateBlast").val());
    var reasonWhy = $("#ReasonWhy").val();
    var userCreate = $("#hd_sessionLogin").val();
    var TxtSource = $("#TxtSource").val();
    var TxtActionDo = $("#TxtActionDo").val();
    var TxtSocialID = $("#TxtSocialID").val();
    console.log(reasonWhy);
    console.log(userCreate);
    console.log(TxtSource);
    console.log(TxtActionDo);
    console.log(TxtSocialID);

    if ($("#ReasonWhy").val() == "") {
        swal("Reason note is empty")
        AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>Internal note</b> is empty")
        return false
    } else {
        var regex = /^[^0-9*\\\^\/<>_#']+$/;
        if (regex.test($("#ReasonWhy").val())) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }

    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxReason: encodeData(reasonWhy), TrxSocmedID: TxtSocialID, TrxSocmed: TxtSource, TrxSocmedSource: '', TrxSocmedSourceDetail: '', TrxSocmedActionDo: TxtActionDo, TrxUserName: userCreate });
                console.log("form_data : " + form_data);
                $.ajax({
                    url: "3_Channel_Sosmed.asmx/InsertSocialMediaReason",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function (data) {
                        console.log("Function ActionInternalNote : " + form_data)

                        var json = JSON.parse(data.d);
                        console.log(json[0].Result);
                        console.log(json[0].msgSystem);
                        if (json[0].Result == "False Data Note Reason Social") {
                            var TrxMessage = json[0].msgSystem;
                            AutoValidasiWarningErr($("#hd_sessionLogin").val(), TrxMessage);
                            $("#modal-center").modal('hide');
                        } else {
                            var TrxMessage = 'Your data <b>Social Media Reason</b> has been save';
                            AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                            $("#modal-center").modal('hide');
                            swal("save data has been success", {
                                icon: "success",
                            });
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
                $("#modal-center").modal('hide');
            }
        });
}

function ActionReplyInboxMessages() {

}