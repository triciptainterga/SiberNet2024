$(document).ready(function () {
    getWS_2_taskboard();
});

function postEmail_Notif(){
	$.ajax({
        type: "POST",
        url: "http://localhost:3000/sendemail",
        "data": JSON.stringify({"emailAccountTo":"resturamadhika@gmail.com","emailAccountSubject":"UIDESK_#20201203101555032 Bank ABC Tiket Komplain Terbuat","emailAccountBody":"<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>          <html xmlns='http://www.w3.org/1999/xhtml'>           <head>            <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />            <title>Bank BKE Create Ticket</title>            <style type='text/css'>body {margin: 0;padding: 0;min-width: 100% !important;}img {height: auto;}.content {width: 100%;max-width: 600px;}.header {padding: 40px 30px 20px 30px;}.innerpadding {padding: 30px 30px 30px 30px;}.borderbottom {border-bottom: 1px solid #f2eeed;}.subhead {font-size: 15px;color: #ffffff;font-family: sans-serif;letter-spacing: 10px;}.h1, .h2, .bodycopy {color: #153643;font-family: sans-serif;}.h1 {font-size: 33px;line-height: 38px;font-weight: bold;}.h2 {padding: 0 0 15px 0;font-size: 24px;line-height: 28px;font-weight: bold;}.bodycopy {font-size: 16px;line-height: 22px;}.button {text-align: center;font-size: 18px;font-family: sans-serif;font-weight: bold;padding: 0 30px 0 30px;}.button a {color: #ffffff;text-decoration: none;}.footer {padding: 20px 30px 15px 30px;}.footercopy {font-family: sans-serif;font-size: 14px;color: #ffffff;}.footercopy a {color: #ffffff;text-decoration: underline;}@media only screen and (max-width: 550px), screen and (max-device-width: 550px) {body[yahoo] .hide {display: none !important;}body[yahoo] .buttonwrapper {background-color: transparent !important;}body[yahoo] .button {padding: 0px !important;}body[yahoo] .button a {background-color: #e05443;padding: 15px 15px 13px !important;}body[yahoo] .unsubscribe {display: block;margin-top: 20px;padding: 10px 50px;background: #2f3942;border-radius: 5px;text-decoration: none !important;font-weight: bold;}}/*@media only screen and (min-device-width: 601px) {.content {width: 600px !important;}.col425 {width: 425px!important;}.col380 {width: 380px!important;}}*/</style>           </head>           <body yahoo bgcolor='#f6f8f1'>           <br><br>            <table width='100%' bgcolor='#f6f8f1' border='0' cellpadding='0' cellspacing='0'>             <tr>              <td>               <!--[if (gte mso 9)|(IE)]>              <table width='600' align='center' cellpadding='0' cellspacing='0' border='0'>               <tr>                <td>                 <![endif]-->               <table bgcolor='#ffffff' class='content' align='center' cellpadding='0' cellspacing='0' border='0'>                                          <tr>                 <td class='innerpadding borderbottom'><center>                  <table width='100%' border='0' cellspacing='0' cellpadding='0'>                   <tr>                    <td height='70' style='padding: 0 20px 0px 0;'>                    <center>                    <img class='fix' src='http://103.66.46.141/wagent/assets/images/wagent/wagent.png' width='100' border='0' alt='' />                    </center>                    </td>                   </tr>                  </table>                           </td>                </tr>                <tr>                 <td class='innerpadding borderbottom'>                  <!--[if (gte mso 9)|(IE)]>                    <table width='380' align='left' cellpadding='0' cellspacing='0' border='0'>                     <tr>                      <td>                       <![endif]-->                  <table class='col380' align='center' border='0' cellpadding='0' cellspacing='0' style='width: 100%; max-width: 580px;'>                   <tr>                    <td>                     <table width='100%' border='0' cellspacing='0' cellpadding='0'>                      <tr>                       <td class='bodycopy'>                        Hi <b>(Nurmansyah)</b> <br>                        Permintaan Anda telah kami terima dan sedang diproses, nomor tiket permintaan Anda adalah <b>20201203101555032</b>.                        Staff kami akan segera menangani pertanyaan Anda dalam waktu 1 hari kerja.<br>                        <br />                       </td>                      </tr>                      <tr>                       <td class='bodycopy'>                        <div>Terima kasih telah menggunakan aplikasi Bank BKE</div><div><br /></div><div>Salam Hangat,</div><div>Tim Bank BKE</div>                       </td>                      </tr>                     </table>                    </td>                   </tr>                  </table>                  <!--[if (gte mso 9)|(IE)]>                      </td>                     </tr>                    </table>                    <![endif]-->                 </td>                </tr>               </table>               <!--[if (gte mso 9)|(IE)]>                </td>               </tr>              </table>              <![endif]-->              </td>             </tr>            </table>           </body>          </html>","emailAccountNameFile":"BPJS_Keluarga.doc","emailAccountPathFile":"Attachfile/BPJS_Keluarga.doc"}),
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

function getWS_2_taskboard() {
    var ValUserID = $("#hd_sessionLogin").val();
    var ValLayerID = "1";
    var ValSpv = "none";
    var result = "";
    var messageDiv = $('#2_TampungKotakAtas');
   
    $.ajax({
        type: "POST",
        url: "WebServiceTransaction.asmx/ws_2_taskboard",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            messageDiv.empty();
            for (i = 0; i < json.length; i++) {
                //alert();
                //alert();
                //alert(json[i].UserCreate);
                result = '<div class="col-lg-3 col-6"> ' +
                        '<a class="box box-link-shadow text-center" href="javascript:void(0)"> ' +
                            '<div class="box-body"> ' +
                                '<div class="font-size-24">' + json[i].JumlahData +'</div> ' +
                                '<span>' + json[i].StatusData +'</span> ' +
                                '</div> ' +
                                '<div class="box-body ' + json[i].statusColor + '"> ' +
                                '<center> ' +
                                '<span class="mdi ' + json[i].statusIcon + ' font-size-30"></span> ' +
                                '</center> ' +
                            '</div> ' +
                        '</a> ' +
                    '</div>';
                
                messageDiv.append(result);
            }
            
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}