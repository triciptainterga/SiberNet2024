////$(document).ready(function () {
////    //alert("test")
////    dataSelect();

////    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
////        preventSubmit: false,
////        submitSuccess: function ($form, event) {
////            event.preventDefault();
////            alert("ss")
          
////        },
////    });


////});

////function insertThread() {
////    getParameterByName("idchannel")

////}
////function getParameterByName(name, url = window.location.href) {
////    name = name.replace(/[\[\]]/g, '\\$&');
////    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
////        results = regex.exec(url);
////    if (!results) return null;
////    if (!results[2]) return '';
////    return decodeURIComponent(results[2].replace(/\+/g, ' '));
////}
////    function ActionTransaction(){    
////        var cmdCustomer = $('#Select_Customer').val();
////        var cmdChannel = $('#Ticket_SourceChannel').val(); 
////        var cmdThreadID = $('#ContentPlaceHolder1_Text2').val();
////        var cmdNumberID = $('#ContentPlaceHolder1_Text3').val();
////        var cmdEmail = $('#Text0').val();
////        var cmdSubject = $('#ContentPlaceHolder1_Text4').val();
////        if ($('#selectCustomerType').val() == 'Non Customer'){
////            var cmdCallID = $('#Text1').val();
////        } else {
////            var cmdCallID = $('#selectAccountChannel').val();
////        }
////        //alert(cmdCallID)
////        var varCustomerIDGET = "";

////        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "SML_mCustomerChannel", paramQuery: "where ValueChannel='" + cmdCallID + "'" });
////        $.ajax({
////            type: "POST",
////            url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////            data: jsonText,
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            success: function (data) {
////                var json = JSON.parse(data.d);
////                var i, x, resultSourceCustomer = "", jenisKelamin;
////                if (json.length == 0) {
////                    console.log("data customer not found " + i);        
////                    window.location.href = "1_doticket.aspx?n=2&id=" + varCustomerIDGET + "&channel=" + cmdChannel + "&threadid=" + cmdThreadID + "&numberid=" + cmdNumberID + "&voice=" + cmdCallID + "&subject=" + cmdSubject;
////                } else {
////                    for (i = 0; i < json.length; i++) {       
////                        varCustomerIDGET = json[i].CustomerID;
////                        window.location.href = "1_doticket.aspx?n=2&id=" + varCustomerIDGET + "&channel=" + cmdChannel + "&threadid=" + cmdThreadID + "&numberid=" + cmdNumberID + "&voice=" + cmdCallID + "&subject=" + cmdSubject;
////                        console.log("data customer found " + varCustomerIDGET);
////                        //return false;

////                    }
////                }

////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            }
////        })
    
////    }
////    function CustomerType(){  
////        //alert($('#selectCustomerType').val())
////        if ($('#selectCustomerType').val() == 'Non Customer'){
////            //$('#Ticket_SourceChannel').attr("disabled", true); 
////            $('#selectAccountChannel').attr("disabled", true); 
////            $('#Select_Customer').attr("disabled", true);
////            $('#Text1').attr("disabled", false);
////        } else {
////            $('#Ticket_SourceChannel').attr("disabled", false); 
////            $('#selectAccountChannel').attr("disabled", false); 
////            $('#Select_Customer').attr("disabled", false);
////            $('#Text1').attr("disabled", true);
            
////        }
////        //$("#Ticket_SourceChannel").readonly();
////    }
////    function changeCustomer(){

////        //alert("test")
////        var selectedValue = $('#Select_Customer').val()
////        console.log("Selected Text: " + selectedValue + " Value: " + selectedValue);

////        //var listDataCustomer = $('#Ticket_ListCustomer');
////        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "mCustomer", paramQuery: "where NA='Y' and CustomerID ='" + selectedValue + "'" });
////        $.ajax({
////            type: "POST",
////            url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////            data: jsonText,
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            success: function (data) {
////                var json = JSON.parse(data.d);
////                var i, x, resultSourceCustomer = "", jenisKelamin;
////                if (json.length == 0) {
////                    console.log("data not found " + i);
           
////                } else {
////                    for (i = 0; i < json.length; i++) {
////                        //$("#Text1").val(json[i].HP);
////                        $("#Text0").val(json[i].Email);
////                        //alert(json[i].CustomerID);

////                        var JenisKondisi = "AllWhereData";
////                        var cmbDataAccountChannel = $('#selectAccountChannel');
////                        var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "SML_mCustomerChannel", paramQuery: "where CustomerID='" + json[i].CustomerID + "'" });
////                        $.ajax({
////                            type: "POST",
////                            url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////                            data: jsonText,
////                            contentType: "application/json; charset=utf-8",
////                            dataType: "json",
////                            success: function (data) {
////                                cmbDataAccountChannel.empty()
////                                var json = JSON.parse(data.d);
////                                var i, x, resultSourceChannel = "";
////                                for (i = 0; i < json.length; i++) {
////                                    //alert();
////                                    //alert();
////                                    //alert(json[i].Name);
////                                    resultSourceChannel = '<option value="' + json[i].ValueChannel + '">' + json[i].ValueChannel + '</option>';

////                                    cmbDataAccountChannel.append(resultSourceChannel);
////                                }

////                            },
////                            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                                console.log(xmlHttpRequest.responseText);
////                                console.log(textStatus);
////                                console.log(errorThrown);
////                            }
////                        })

////                    }
////                }

////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            }
////        })

       
        
////    }
////    function dataSelect(){
////        var JenisKondisi = "AllWhereData";
////        //var NamaTable = "BTN_mPenyebab";
////        var KondisiData = "where NA='Y'";
////        var cmdCustomer = $('#Select_Customer');
////        var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mCustomer", paramQuery: "where NA='Y'" });
////        console.log("dataSelect " + jsonText)
////        //alert("dataSelect " + jsonText)
////        $.ajax({
////            type: "POST",
////            url: "asmx/ServiceCustomer.asmx/GetWhereRecordsTop100",
////            data: jsonText,
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            success: function (data) {
////                var json = JSON.parse(data.d);
////                var i, x, resultSourceCustomer = "";
////                for (i = 0; i < json.length; i++) {
////                    //alert("SSS");
////                    //alert();
////                    //alert(json[i].TicketIDCode);
////                    resultSourceCustomer = '<option value="' + json[i].CustomerID + '">' + json[i].Name + '</option>';

////                    cmdCustomer.append(resultSourceCustomer);
////                }

////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            }
////        })
       
////        var cmbDataSourceChannel = $('#Ticket_SourceChannel');
////        var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mSourceType", paramQuery: "where NA='Y'" });
////        $.ajax({
////            type: "POST",
////            url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////            data: jsonText,
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            success: function (data) {
////                var json = JSON.parse(data.d);
////                var i, x, resultSourceChannel = "";
////                for (i = 0; i < json.length; i++) {
////                    //alert();
////                    //alert();
////                    //alert(json[i].UserCreate);
////                    resultSourceChannel = '<option value="' + json[i].TicketIDCode + '">' + json[i].Name + '</option>';

////                    cmbDataSourceChannel.append(resultSourceChannel);
////                }

////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            }
////        })
              
//// }

//// function sendmail(){    
////     var form_data = JSON.stringify({ toEmail: "rizal@invision-ap.com", subject: "Testing", body: "Testing Body"});
////     console.log("aa : " + form_data)
////     if (confirm("Do you want to process?")) {
////         $.ajax({
////             url: "asmx/MailSystemService.asmx/SendEmail",
////             method: "POST",
////             contentType: "application/json; charset=utf-8",
////             dataType: "json",
////             //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////             data: form_data,
////             success: function () {
////                 console.log(form_data)
////                 alert("sussecc")
////             },
////             error: function (xmlHttpRequest, textStatus, errorThrown) {
////                 console.log(xmlHttpRequest.responseText);
////                 console.log(textStatus);
////                 console.log(errorThrown);
////             },
////             complete: function () {

////             }
////         });
////     } else
////         return false;
////}