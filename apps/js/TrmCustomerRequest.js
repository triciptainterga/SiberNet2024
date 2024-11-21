////$(document).ready(function () {
////    //$("#TxtSearchingCustomer").on("input", function () {
////    //    var jumlahString = $(this).val().length;
////    //    if (jumlahString >= 3) {
////    //        searchingCustomer($(this).val());
////    //    } else if (jumlahString == 0) {
////    //        searchingCustomer($(this).val(""));
////    //    }
////    //});
////    TrmCustomer();
////    //selectedCustomer();
////    comboBox();
////});
////function TrmCustomer() {
////    var JenisKondisi = "AllWhereData";
////    var divCustomer = $('#divCustomer');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mcustomer", paramQuery: "where Email='"+ $("#hd_sessionLogin").val() +"' order by name asc" });
////    $.ajax({
////        type: "POST",
////        url: "asmx/ServiceCustomer.asmx/GetWhereRecordsTop100",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultCustomer = "";

////            for (i = 0; i < json.length; i++) {
////                if (json[i].JenisKelamin == 'Male') {
////                    var TrxGender = "3"
////                } else if (json[i].JenisKelamin == 'Female'){
////                    var TrxGender = "2"
////                } else{
////                    var TrxGender = "2"
////                }
////                resultCustomer = "<div class='media bg-white box-shadowed mb-15'>" +
////                                               "<a class='align-self-center mr-0' href='#'><img class='avatar avatar-lg' src=../images/avatar/" + TrxGender + ".jpg></a>" +
////                                               "<div class='media-body'>" +
////                                                   "<p><a class='hover-primary' href='#' onclick=selectedCustomer('" + json[i].CustomerID + "','" + encodeURI(json[i].Email) + "')><strong>" + json[i].Name + "</strong></a></p>" +
////                                                   "<p class='font-size-12'>" + json[i].Email + "</p>" +
////                                                   "<p class='font-size-12'>" + json[i].HP + "</p>" +
////                                               "</div>" +
////                                   "</div>"
////                divCustomer.append(resultCustomer);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
//////function searchingCustomer(TrxCustomer) {
//////    var JenisKondisi = "AllWhereData";

//////    var selectedValue = TrxCustomer;
//////    console.log("Selected Text: " + selectedValue + " Value: " + selectedValue);

//////    var divCustomer = $('#divCustomer');
//////    if (selectedValue == '') {
//////        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "mcustomer", paramQuery: "" });
//////    } else {
//////        var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "mcustomer", paramQuery: "where Name like '%" + selectedValue + "%'" });
//////    }
//////    $.ajax({
//////        type: "POST",
//////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
//////        data: jsonText,
//////        contentType: "application/json; charset=utf-8",
//////        dataType: "json",
//////        success: function (data) {
//////            var json = JSON.parse(data.d);
//////            var i, x, resultCustomer = "";
            
//////            divCustomer.empty();
//////            if (json.length == 0) {
//////                console.log("data not found " + i);
//////                resultCustomer = '<div class="media media-single" > No data found... </div>';
//////                divCustomer.append(resultCustomer);
//////            } else {
//////                for (i = 0; i < json.length; i++) {
//////                    if (json[i].JenisKelamin == 'Male') {
//////                        var TrxGender = "3"
//////                    } else {
//////                        var TrxGender = "2"
//////                    }
//////                    resultCustomer = '<div class="media bg-white box-shadowed mb-15">' +
//////                                                   '<a class="align-self-center mr-0" href="#"><img class="avatar avatar-lg" src="../images/avatar/' + TrxGender + '.jpg" alt="..."></a>' +
//////                                                   '<div class="media-body">' +
//////                                                       '<p><a class="hover-primary" href="#" onclick="selectedCustomer(' + json[i].CustomerID + ')"><strong>' + json[i].Name + '</strong></a></p>' +
//////                                                       '<p>' + json[i].Email + '</p>' +
//////                                                   '</div>' +
//////                                       '</div>'
//////                    divCustomer.append(resultCustomer);
//////                }
//////            }
//////        },
//////        error: function (xmlHttpRequest, textStatus, errorThrown) {
//////            console.log(xmlHttpRequest.responseText);
//////            console.log(textStatus);
//////            console.log(errorThrown);
//////        }
//////    })
//////}
////function selectedCustomer(TrxCustomerID, TrxEmail) {
////    $("#ContentPlaceHolder1_TrxCustomerID").val(TrxCustomerID)
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "mcustomer";
////    var KondisiData = "where CustomerID='" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, result = "";
////            for (i = 0; i < json.length; i++) {

////                $("#Customer_Name").val(json[i].Name);
////                $("#Customer_Email").val(json[i].Email);
////                $("#Customer_Phone").val(json[i].HP);
////                $("#Customer_Perusahaan").val(json[i].NamaPerusahaan);
////                //$("#Ticket_FullName").text(json[i].Name);
////                ////$("#Ticket_FullName").append(json[i].Name);
////                //$("#Ticket_Phone").val(json[i].TrxPhone);
////                //$("#Ticket_Email").val(json[i].Email);
////                //$("#Ticket_Mobile").val(json[i].HP);
////                //$("#GenderMale_Ticket").val(json[i].JenisKelamin);
////                ////$("#Ticket_CIF").val(json[i].CIF);
////                //$("#Ticket_NIK").val(json[i].TrxCusTomerNIK);
////                //$("#Ticket_Address").val(json[i].TrxCusTomerAlamat);
////                ////$("#Profile_Email").val(json[i].Email);
////                ////$("#Profile_Phone").val(json[i].HP);

////                //alert(TrxEmail)
////                //cmb_Product($("#ContentPlaceHolder1_TrxCustomerID").val());
////                //TrmProductName($("#ContentPlaceHolder1_TrxCustomerID").val());
////                TrmHistoryTicket($("#ContentPlaceHolder1_TrxCustomerID").val());
////                TrmChannelInformation($("#ContentPlaceHolder1_TrxCustomerID").val());
////                getProductsCustomer(TrxEmail)
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function cmb_Product(TrxCustomerID) {
////    var cmbDataAssetsProblem = $('#cmb_Assets_Problem');
////    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_TrmProductName", paramQuery: "where CustomerID='" + TrxCustomerID + "' And Status='YES'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultAssetsProblem = "";

////            cmbDataAssetsProblem.empty();
////            cmbDataAssetsProblem.append('<option value="">Select</option>');
////            cmbDataAssetsProblem.append('<option value="0">None</option>');
////            for (i = 0; i < json.length; i++) {

////                resultAssetsProblem = '<option value="' + json[i].ID + '">' + json[i].ProductName + '</option>';
////                cmbDataAssetsProblem.append(resultAssetsProblem);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function comboBox() {
////    var JenisKondisi = "AllWhereData";
////    var cmbDataSourceCategory = $('#cmb_Category');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mCategory", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultSourceCategory = "";
////            for (i = 0; i < json.length; i++) {

////                resultSourceCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
////                cmbDataSourceCategory.append(resultSourceCategory);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })

////    var cmbDataSourceProblem = $('#cmb_Problem');
////    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "mSubCategoryLv3", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultSourceProblem = "";

////            cmbDataSourceProblem.empty();
////            cmbDataSourceProblem.append('<option value="">Select</option>');
////            for (i = 0; i < json.length; i++) {

////                resultSourceProblem = '<option value="' + json[i].SubCategory3ID + '">' + json[i].SubName + '</option>';
////                cmbDataSourceProblem.append(resultSourceProblem);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })

////    //var cmbDataSourceChannel = $('#cmb_Source_Information');
////    //var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mSourceType", paramQuery: "where NA='Y'" });
////    //$.ajax({
////    //    type: "POST",
////    //    url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////    //    data: jsonText,
////    //    contentType: "application/json; charset=utf-8",
////    //    dataType: "json",
////    //    success: function (data) {
////    //        var json = JSON.parse(data.d);
////    //        var i, x, resultSourceChannel = "";
////    //        for (i = 0; i < json.length; i++) {

////    //            resultSourceChannel = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
////    //            cmbDataSourceChannel.append(resultSourceChannel);

////    //        }

////    //    },
////    //    error: function (xmlHttpRequest, textStatus, errorThrown) {
////    //        console.log(xmlHttpRequest.responseText);
////    //        console.log(textStatus);
////    //        console.log(errorThrown);
////    //    }
////    //})

////    var cmbDataPriority = $('#cmb_Priority_Problem');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "BTN_SkalaPrioritas", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultPriority = "";
////            for (i = 0; i < json.length; i++) {

////                resultPriority = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
////                cmbDataPriority.append(resultPriority);

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })

////    var JenisKondisi = "AllWhereData";
////    var cmbDataOtherChannel = $('#cmbOtherChannel');
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: "mSourceType", paramQuery: "where NA='Y'" });
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultSourceChannel = "", resultSourceChannelType = "";
////            for (i = 0; i < json.length; i++) {

////                resultSourceChannelType = '<option value="' + json[i].Name + '">' + json[i].Name + '</option>';
////                cmbDataOtherChannel.append(resultSourceChannelType);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function TrmProductName(TrxCustomerID) {
////    var JenisKondisi = "AllWhereData";
////    var KondisiData = "";
////    var jsonText = JSON.stringify({ tableType: 'AllWhereData', tableName: "UIDESK_TrmProductName", paramQuery: "where CustomerID='" + TrxCustomerID + "' And Status='YES'" });
////    var jsonText = JSON.stringify({ keySearch: TrxCustomerID });
////    console.log("CUstomer API " + TrxCustomerID);
////    var myTable = $('#Table1').DataTable();
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, result = "";

////            myTable.clear().draw();
////            for (i = 0; i < json.length; i++) {
////                var d = new Date(json[i].DateCreate);
////                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
////                var urlClick = "<div class='dropdown'>" +
////                                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
////                                    "<div class='dropdown-menu dropdown-menu-right'>" +
////                                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
////                                    "<a class='dropdown-item' href='#' onclick=showdDelete('" + json[i].ID + "')><i class='fa fa-trash-o'></i> Delete</a>" +
////                                    "</div>" +
////                                "</div>"
////                if (json[i].Status == "YES") {
////                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Yes</span>"
////                } else {
////                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>No</span>"
////                }
////                myTable.row.add([json[i].ID, json[i].ProductName, json[i].Description, json[i].Type, TrxParam, newDate + ' ' + newTime, urlClick]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function TrmHistoryTicket(TrxCustomerID) {
////    var JenisKondisi = "AllWhereData";
////    var NamaTable = "TrmThread";
////    var KondisiData = "Where CustomerID='" + TrxCustomerID + "'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
////    console.log("Table History Thread " + NamaTable + KondisiData + jsonText)
////    var myTable = $('#TableHistoryTicket').DataTable();
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, result = "";

////            myTable.clear().draw();
////            for (i = 0; i < json.length; i++) {

////                var d = new Date(json[i].DateCreate);
////                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                //var urlClick = " <a href='1_journey.aspx?ticketid=" + json[i].TicketNumber + "&numberid=" + getParameterByName('numberid') + "&threadid=" + getParameterByName('threadid') + "' class='text-success' data-toggle='tooltip' data-original-title='Follow up'><i class='ti-arrow-circle-right' aria-hidden='true'></i></a>"
////                if (json[i].ValueThread == 'Portal') {
////                    var StatusColor = "primary"
////                } else if (json[i].ValueThread == 'Whatsapp') {
////                    var StatusColor = "success"
////                } else if (json[i].ValueThread == 'Email') {
////                    var StatusColor = "warning"
////                }
////                var Status = "<span class='badge badge-pill badge-" + StatusColor + "' style='width: 60px;'>" + json[i].ValueThread + "</span>"
////                myTable.row.add([json[i].TicketNumber, json[i].Account, Status, json[i].AgentID, newDate + ' ' + newTime]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function TrmChannelInformation(TrxCustomerID) {
////    //History Transaction Outbound
////    var JenisKondisi = "AllWhereData";
////    var NamaTable = "TrmCustomerChannel";
////    var KondisiData = "Where CustomerID='" + TrxCustomerID + "'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaTable, paramQuery: KondisiData });
////    console.log("Table Channel Information " + NamaTable + KondisiData + jsonText)
////    var myTable = $('#TableChannelInformation').DataTable();
////    $.ajax({
////        type: "POST",
////        url: "WebServiceGetDataMaster.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, result = "";

////            myTable.clear().draw();
////            for (i = 0; i < json.length; i++) {

////                var d = new Date(json[i].DateCreate);
////                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
////                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
////                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

////                var urlClick = "<div class='dropdown'>" +
////                                         "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
////                                         "<div class='dropdown-menu dropdown-menu-right'>" +
////                                         "<a class='dropdown-item' href='#' onclick=ShowOtherChannel('" + json[i].CustomerID + "','" + json[i].ValueChannel + "','" + json[i].FlagChannel + "')><i class='fa fa-pencil'></i>Edit</a>" +
////                                         "<a class='dropdown-item' href='#' onclick=ShowDeleteOtherChannel('" + json[i].CustomerID + "','" + json[i].ValueChannel + "','" + json[i].FlagChannel + "')><i class='fa fa-trash-o'></i>Delete</a>" +
////                                      "</div>" +
////                                "</div>"
////                var Status = "<span class='badge badge-pill badge-" + json[i].StatusColor + "' style='width: 60px;'>" + json[i].StatusNya + "</span>"
////                myTable.row.add([json[i].FlagChannel, json[i].ValueChannel, Status, json[i].UserCreate, newDate + ' ' + newTime, urlClick]).draw(false);
////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
//////* Upload Attachment Thread *//
////$('#files').change(function () {
////    var filename = $('#files').val();
////    if (filename.substring(3, 11) == 'fakepath') {
////        filename = filename.substring(12);
////    } // For Remove fakepath
////    $("label[for='file_name'] b").html(filename);
////    $("label[for='file_default']").text('Selected File: ');
////    if (filename == "") {
////        $("label[for='file_default']").text('No File Choosen');
////    }
////});
////$(document).on("change", "input[name='files']", function (e) {
////    $(".hiddenX").show();
////    //var valnoWA = "628119970460";//$('#tglKejadian').val();

////    var files = $(this).prop("files");
////    var data = new FormData();
////    var request;
////    var result;
////    var modal = $(this).closest(".modal");
////    var itemid = modal.data("itemid");
   
////    for (var i = 0; i < files.length; i++) {

////        if(this.files[0].size > 500000) {
////            //alert("Please upload file less than 2MB. Thanks!!");
////            swal("Please upload file less than 2MB. Thanks!!");
////            $(this).val('');
////            return false;
////        }

////        data.append("id", "617367367613876138");
////        data.append("file", files[i]);
////        data.append("Username", $("#hd_sessionLogin").val());
////        data.append("numberid", "0");
////        data.append("customerid", $("#ContentPlaceHolder1_TrxCustomerID").val());

////        request = $.ajax({

////            type: "POST",
////            enctype: 'multipart/form-data',
////            url: "WebServiceTransaction.asmx/UploadFileAttachmentTicket",
////            data: data,
////            // dataType: "json",
////            contentType: false,
////            processData: false,

////        });
////        request.done(function (response) {

////            $(".hiddenX").hide();
////            $("#removeUpload").show();
////            // result = response.d;
////            $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
////            console.log("Success");
////            console.log($(response).find("Guid").text());
////            console.log($(response).find("FileExt").text());
////            $("#divFooter").css("display", "block");
////            TrxThreadAttachment($("#hd_sessionLogin").val());

////        });

////        request.fail(function (response) {

////            console.log(response.responseText);
////            //alert(response.responseText);

////        });

////        request.always(function () {

////            data.delete(itemid);
////            data.delete(files[i]);

////        });

////    }
////});
////function TrxThreadAttachment(TrxUserName) {
////    $('#divfile').css('display', 'block');
////    var JenisKondisi = "AllWhereData";
////    var NamaView = "UIDESK_TicketAttachment";
////    var KondisiData = "where Usercreate='" + TrxUserName + "' And CustomerID='" + $("#ContentPlaceHolder1_TrxCustomerID").val() + "' And GenesysNumber='0'";
////    var jsonText = JSON.stringify({ tableType: JenisKondisi, tableName: NamaView, paramQuery: KondisiData });
////    console.log("TrxAttachmentThread :" + jsonText)
////    $.ajax({
////        type: "POST",
////        url: "WebServiceTransaction.asmx/GetWhereRecords",
////        data: jsonText,
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (data) {
////            var json = JSON.parse(data.d);
////            var i, x, resultComposeBodyAttachment = "";

////            $('#divThreadAttachment').empty();
////            for (i = 0; i < json.length; i++) {

////                if (json[i].FileType == "doc") {
////                    var FileTypes = "word";
////                } else if (json[i].FileType == "pdf") {
////                    var FileTypes = "pdf";
////                }
////                else if (json[i].FileType == "xls") {
////                    var FileTypes = "excel";
////                }
////                else if (json[i].FileType == "xlsx") {
////                    var FileTypes = "excel";
////                }
////                else if (json[i].FileType == "zip") {
////                    var FileTypes = "zip";
////                }
////                else if (json[i].FileType == "txt") {
////                    var FileTypes = "code";
////                }
////                else if (json[i].FileType == "rar") {
////                    var FileTypes = "zip";
////                }
////                else if (json[i].FileType == "png" || json[i].FileType == "jpg" || json[i].FileType == "gif" || json[i].FileType == "bmp") {
////                    var FileTypes = "image";
////                }

////                resultComposeBodyAttachment = '<ul class="mailbox-attachments clearfix">' +
////                                                    '<li>' +
////                                                        '<span class="mailbox-attachment-icon"><i class="fa fa-file-' + FileTypes + '-o"></i></span>' +
////                                                        '<div class="mailbox-attachment-info">' +
////                                                            '<a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i>' + json[i].Filename + '</a>' +
////                                                            '<span class="mailbox-attachment-size">' + json[i].FileSize + '' +
////                                                        '<a href=' + json[i].Path + ' target="_blank" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a><a href="#" target="_blank" class="btn btn-default btn-xs pull-right" onclick=deleteAttachment(' + json[i].ID + ')><i class="fa fa-trash-o"></i></a>' +
////                                                            '</span>' +
////                                                        '</div>' +
////                                                    '</li>' +
////                                               '<ul>'
////                $('#divThreadAttachment').append(resultComposeBodyAttachment)

////            }

////        },
////        error: function (xmlHttpRequest, textStatus, errorThrown) {
////            console.log(xmlHttpRequest.responseText);
////            console.log(textStatus);
////            console.log(errorThrown);
////        }
////    })
////}
////function addChannel() {
////    $("#ModalOtherChannelCustomer").modal('show');
////}
////function AddChannel() {
////    $("#ModalOtherChannelCustomer").modal('show');
////    $("#SimpanOtherChannel").css("display", "block");
////    //$("#UpdateOtherChannel").css("display", "none");
////    //$("#DeleteOtherChannel").css("display", "none");
////}
////function ActionOtherChannel(Action) {
////    console.log("ActionOtherChannel : " + $("#ContentPlaceHolder1_TrxCustomerID").val());
////    if (Action == 'Simpan') {
////        if ($("#TrxCustomerID").val() == "") {
////            AutoValidasiWarning($("#hd_sessionLogin").val(), "Your data <b>customer</b> is empty ")
////            return false
////        }
////        if ($("#TxtChannelValue").val() == "") {
////            AutoValidasiWarning($("#TxtChannelValue").val(), "Your data <b>value channel</b> is empty ")
////            return false
////        }
////        if ($("#cmbOtherChannel").val() == "") {
////            AutoValidasiWarning($("#TxtChannelValue").val(), "Your data <b>channel type</b> is empty ")
////            return false
////        }
////        var TrxChannelType = $("#cmbOtherChannel").val();
////        var ActionSP = "InsertOtherChannel"
////    } else if (Action == 'Update') {
////        var TrxChannelType = $("#cmbOtherChannel option:selected").text();
////        var ActionSP = "UpdateOtherChannel"
////    } else {
////        var TrxChannelType = "Delete";
////        var ActionSP = "DeleteOtherChannel"
////    }
////    var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxCustomerID: $("#ContentPlaceHolder1_TrxCustomerID").val(), TrxChannelValue: $("#TxtChannelValue").val(), TrxChannelType: TrxChannelType });
////    //console.log("aa : " + form_data)
////    if (confirm("Do you want to process?")) {
////        $.ajax({
////            url: "asmx/ServiceCustomer.asmx/" + ActionSP + "",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(ActionSP + form_data)

////                var TrxMessage = 'Your data channel <b>' + $("#TxtChannelValue").val() + '</b> has been ' + Action
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
////                $("#TxtChannelValue").val("");
////                $("#cmbOtherChannel").val("");
////                $("#ModalOtherChannelCustomer").modal('hide');
////                TrmChannelInformation($("#ContentPlaceHolder1_TrxCustomerID").val());

////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            },
////            complete: function () {

////            }
////        });
////    } else
////        return false;
////}
////function AutoValidasiSuccess(TrxCreatedby, Message) {
////    $.toast({
////        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
////        text: '' + Message + '',
////        position: 'top-right',
////        loaderBg: '#ff6849',
////        icon: 'success',
////        hideAfter: 3500,
////        stack: 6
////    });
////}
////function addProduct() {
////    $("#ModalProduct").modal('show');
////    $("#SimpanProduct").css("display", "block");
////}
////function ActionProduct() {
////    var TrxProduct = $("#Product_Name").val();
////    var TrxDescription = $("#Textarea_Description").val();
////    var TrxType = $("#Product_Type").val();
////    var TrxStatus = $("#cmb_Status").val();
////    if ($("#Product_Name").val() == '') {
////        swal("Product Name is empty");
////        return false
////    }
////    if ($("#Textarea_Description").val() == '') {
////        swal("Description is empty");
////        return false
////    }
////    if ($("#Product_Type").val() == '') {
////        swal("Product Type is empty");
////        return false
////    }
////    if ($("#cmb_Status").val() == '') {
////        swal("Status is empty");
////        return false
////    }
////    event.preventDefault(); // prevent form submit
////    var form = document.forms["myForm"]; // storing the form
////    swal({
////        title: "Do you want to process?",
////        //text: "Once deleted, you will not be able to recover this imaginary file!",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////    .then((willDelete) => {
////        if (willDelete) {        
////            var form_data = JSON.stringify({ TrxCustomerID: $("#ContentPlaceHolder1_TrxCustomerID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxProduct: TrxProduct, 
////            TrxDescription: TrxDescription, TrxType: TrxType, TrxStatus: TrxStatus });
////        $.ajax({
////            url: "WebServiceGetDataMaster.asmx/InsertProductName",
////            method: "POST",
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////            data: form_data,
////            success: function () {
////                console.log(form_data)
////                var TrxMessage = 'Your data <b>' + $("#Product_Name").val() + '</b> has been Update'
////                AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);

////                $("#Product_Name").val("");
////                $("#Textarea_Description").val("");
////                $("#Product_Type").val("");
////                $("#cmb_Status").val("");
////                $("#ModalProduct").modal('hide');
////                TrmProductName($("#ContentPlaceHolder1_TrxCustomerID").val());
////            },
////            error: function (xmlHttpRequest, textStatus, errorThrown) {
////                console.log(xmlHttpRequest.responseText);
////                console.log(textStatus);
////                console.log(errorThrown);
////            },
////            complete: function () {

////            }
////        });
////            swal("Done", {
////                icon: "success",
////            });
////            $("#ModalChannel").modal('hide');
////        } else {
////            //swal("Your imaginary file is safe!");
////            $("#ModalChannel").modal('hide');
////        }
////   });
////}
////function ThreadSimpan(){
////    var TrxUsername = $("#hd_sessionLogin").val();
////    var TrxCustomerID = $("#ContentPlaceHolder1_TrxCustomerID").val();
////    //var TrxAccount = $("#Ticket_Email").val();
////    //var TrxCategory = $("#cmb_Category").val();
////    var TrxProduct = $("#cmb_Assets_Problem").val();
////    //var TrxProblem = $("#cmb_Problem").val();
////    //var TrxDescription = $("#compose-textarea").val();
////    //TrxDescription = TrxDescription.replace(/\r?\n/g, '<br />');
////    //var TrxChannel = $("#cmb_Source_Information").val();
////    //var TrxPriority = $("#cmb_Priority_Problem").val();
////    //var TrxPhone = $("#Ticket_Mobile").val();
   
////    if ($("#Customer_Name").val() != ''){
////        var TrxCustomerName = $("#Customer_Name").val();
////    }else{
////        var TrxCustomerName = "-"
////    }
////    var TrxDescription = CKEDITOR.instances.composetextarea.getData();
////    var TrxDateTransaction = $("#DateofTransaction").val();
////    if ($("#hd_sessionLogin").val() == '') {
////        swal("Session login is empty");
////        window.location.href = 'http://localhost/2021uidesk';
////    }
////    if ($("#ContentPlaceHolder1_TrxCustomerID").val() == '') {
////        swal("Customer is empty, please select customer");
////        return false
////    }
////    //if ($("#cmb_Category").val() == 'Select' || $("#cmb_Category").val() == '') {
////    //    swal("Category is empty!");
////    //    return false
////    //}
////    if ($("#cmb_Assets_Problem").val() == '') {
////        swal("Product is empty!");
////        return false
////    }
////    //if ($("#cmb_Problem").val() == '') {
////    //    swal("Problem is empty!");
////    //    return false
////    //}

////    if (TrxDescription == '') {
////        swal("Description is empty!");
////        return false
////    }
////    //if ($("#cmb_Source_Information").val() == 'Select' || $("#cmb_Source_Information").val() == '') {
////    //    swal("Source innformation or channel is empty!");
////    //    return false
////    //}
////    //if ($("#cmb_Priority_Problem").val() == 'Select' || $("#cmb_Priority_Problem").val() == '') {
////    //    swal("Priority is empty!");
////    //    return false
////    //}
////    if ($("#DateofTransaction").val() == '') {
////        swal("Date of Transaction is empty!");
////        return false
////    }
////    var form_data = JSON.stringify({ TrxUsername: TrxUsername, TrxCustomerID: TrxCustomerID, TrxAccount: "-",
////        TrxProduct:TrxProduct, TrxDescription:encodeData(TrxDescription),
////        TrxPhone: "-", TrxChannel: "-", TrxCustomerName: TrxCustomerName, TrxDateTransaction:TrxDateTransaction});
////    console.log("ThreadSimpanPortalCustomer : " + form_data)

////    event.preventDefault(); // // Function sweat alert
////    var form = document.forms["myForm"]; // // Function sweat alert
////    swal({
////        title: "Do you want to process?",
////        //text: "Once deleted, you will not be able to recover this imaginary file!",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////    .then((willDelete) => {
////        if (willDelete) {                
////             $.ajax({
////                url: "WebServiceTransaction.asmx/InsertTransactionThreadPortal",
////                method: "POST",
////                contentType: "application/json; charset=utf-8",
////                dataType: "json",
////                //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////                data: form_data,
////                success: function () {
////                    console.log("exec ActionInsertThread : " + form_data)
////                    $.toast({
////                        heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
////                        text: 'Your data call has been save',
////                        position: 'top-right',
////                        loaderBg: '#ff6849',
////                        icon: 'success',
////                        hideAfter: 3500,
////                        stack: 6
////                    });
////                    window.location = "TrmCustomerRequest.aspx";
////                },
////                error: function (xmlHttpRequest, textStatus, errorThrown) {
////                    console.log(xmlHttpRequest.responseText);
////                    console.log(textStatus);
////                    console.log(errorThrown);
////                },
////                complete: function () {

////                }
////            });
////                swal("Done", {
////                    icon: "success",
////                });
////                window.location = "TrmCustomerRequest.aspx";
////            } else {
////                //swal("Your imaginary file is safe!");
////                //$("#modal-center").modal('hide');
////            }
////      });      
////}
////function AddCustomer(){
////    $("#modal-customer").modal('show');
////} 
////function ActionInsertCustomer(){
////    var TrxUsername = $("#hd_sessionLogin").val();
////    var TrxCusTomerName = $("#cusTomerName").val();
////    var TrxCusTomerEmail = $("#cusTomerEmail").val();
////    var TrxCusTomerPhone = $("#cusTomerPhone").val();
////    var TrxCusTomerGender = $("#addcusTomerGender").val();
////    var TrxCusTomerDate = $("#cusTomerDate").val();
////    var TrxCusTomerNIK = $("#cusTomerNIK").val();
////    var TrxFacebook = $("#cusTomerFacebook").val();
////    var TrxInstagram = $("#cusTomerInstagram").val();
////    var TrxTwitter = $("#cusTomerTwitter").val();
////    var TrxCusTomerAlamat = $("#cusTomerAlamat").val();

////    console.log("TrxUsername : " + TrxUsername)
////    if (TrxCusTomerName === '') {
////        AutoValidasiWarning($("#hd_sessionLogin").val(),"<b>Name</b> is empty")
////        return false
////    }
////    if (TrxCusTomerEmail != '') {
////        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
////        if (TrxCusTomerEmail.match(mailformat)) {
////        }
////        else {
////            AutoValidasiWarning($("#hd_sessionLogin").val(),"Format <b>email address</b> not valid")
////            return false
////        }
////    } else {
////        AutoValidasiWarning($("#hd_sessionLogin").val(),"<b>Email Address</b> is mandatory")
////        return false;
////    }
////    if (TrxCusTomerPhone != '') {
////        var numberNya = /^[0-9]+$/;
////        if (TrxCusTomerPhone.match(numberNya)) {
////            var PhoneLengt = TrxCusTomerPhone.toString().length;
////            if (PhoneLengt > '6') {

////            } else {
////                AutoValidasiWarning($("#hd_sessionLogin").val(),"Format <b>phone number</b> not valid")
////                return false
////            }
////        } else {
////            AutoValidasiWarning($("#hd_sessionLogin").val(),"Format <b>Phone Number</b> format is numeric")
////            return false;
////        }
////    }
////    if (TrxCusTomerGender == '--Select--' || TrxCusTomerGender == '' || TrxCusTomerGender == '0') {
////        AutoValidasiWarning($("#hd_sessionLogin").val(),"<b>Gender</b> is empty")
////        return false;
////    }
////    if (TrxCusTomerNIK == '' || TrxCusTomerNIK == '0') {
////    } else {
////        var numberNya = /^[0-9]+$/;
////        if (TrxCusTomerNIK.match(numberNya)) {
////            var NIKLengt = TrxCusTomerNIK.toString().length;
////            if (NIKLengt == '16') {

////            } else {
////                AutoValidasiWarning($("#hd_sessionLogin").val(),"<b>NIK Number</b> format is 16 digit")
////                return false;
////            }
////        } else {
////            AutoValidasiWarning($("#hd_sessionLogin").val(),"<b>NIK Number</b> format is numeric")
////            return false;
////        }
////    }
////    if (TrxCusTomerAlamat == '') {
////        AutoValidasiWarning($("#hd_sessionLogin").val(),"<b>Address</b> is empty")
////        return false;
////    }
////    if (TrxFacebook == '') {
////        TrxFacebook = "-";
////    }
////    if (TrxInstagram == '') {
////        TrxInstagram = "-";
////    }
////    if (TrxTwitter == '') {
////        TrxTwitter = "-";
////    }
////    event.preventDefault(); // // Function sweat alert
////    var form = document.forms["myForm"]; // // Function sweat alert
////    swal({
////        title: "Do you want to process?",
////        //text: "Once deleted, you will not be able to recover this imaginary file!",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////    .then((willDelete) => {
////        if (willDelete) {        
////                var form_data = JSON.stringify({ TrxUsername: TrxUsername, TrxCusTomerName: encodeData(TrxCusTomerName), TrxCusTomerEmail: TrxCusTomerEmail, TrxCusTomerPhone: TrxCusTomerPhone, TrxCusTomerGender: TrxCusTomerGender, TrxCusTomerDate: TrxCusTomerDate, TrxCusTomerNIK: TrxCusTomerNIK, TrxCusTomerAlamat:encodeData(TrxCusTomerAlamat), TrxNumberID: "0", TrxFacebook: TrxFacebook, TrxInstagram: TrxInstagram, TrxTwitter: TrxTwitter});
////console.log("ActionInsertCustomer" + form_data)
////$.ajax({
////    url: "asmx/ServiceCustomer.asmx/InsertTransactionCustomer",
////    method: "POST",
////    contentType: "application/json; charset=utf-8",
////    dataType: "json",
////    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////    data: form_data,
////    success: function (data) {
////        var json = JSON.parse(data.d);
////        var i, x = "";
////        var result = "";
////        console.log("Exec InsertTransactionCustomer : " + form_data)
////        for (i = 0; i < json.length; i++) {
////            if (json[i].Result == "True") {
////                $.toast({
////                    heading: 'Hi agent ' + $("#hd_sessionLogin").val(),
////                    text: 'Your data customer has been save',
////                    position: 'top-right',
////                    loaderBg: '#ff6849',
////                    icon: 'success',
////                    hideAfter: 3500,
////                    stack: 6
////                });
////                ClearTextBoxt();
////                swal("Done", {
////                    icon: "success",
////                });
////                $("#modal-customer").modal('hide');
////                TrmCustomer();
////                window.location.reload();
////            } else {
////                //alert(json[i].msgSystem)
////                $.toast({
////                    heading: 'Hi agent ' + $("#hd_sessionLogin").val(),
////                    text: json[i].msgSystem,
////                    position: 'top-right',
////                    loaderBg: '#ff6849',
////                    icon: 'warning',
////                    hideAfter: 3500,
////                    stack: 6
////                });
////                return false;
////            }   
////        }
                                    
////    },
////    error: function (xmlHttpRequest, textStatus, errorThrown) {
////        console.log(xmlHttpRequest.responseText);
////        console.log(textStatus);
////        console.log(errorThrown);
////    },
////    complete: function () {

////    }
////});
                
////} else {
////    //swal("Your imaginary file is safe!");
////    $("#modal-customer").modal('hide');
////}
////});
////}
////function AutoValidasiWarning(TrxCreatedby, Message) {
////    $.toast({
////        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
////        text: '' + Message + '',
////        position: 'top-left',
////        loaderBg: '#ff6849',
////        icon: 'warning',
////        hideAfter: 3500,
////        stack: 6
////    });
////}
////function encodeData(s) {
////    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
////}
////function ClearTextBoxt(){
////    $("#cusTomerName").val("");
////    $("#cusTomerEmail").val("");
////    $("#cusTomerPhone").val("");
////    $("#addcusTomerGender").val("");
////    $("#cusTomerDate").val("");
////    $("#cusTomerNIK").val("");
////    $("#cusTomerFacebook").val("");
////    $("#cusTomerInstagram").val("");
////    $("#cusTomerTwitter").val("");
////    $("#cusTomerAlamat").val("");
////}
////function deleteAttachment(TrxID){
////    event.preventDefault(); // prevent form submit
////    var form = document.forms["myForm"]; // storing the form
////    swal({
////        title: "Do you want to process?",
////        //text: "Once deleted, you will not be able to recover this imaginary file!",
////        icon: "warning",
////        buttons: true,
////        dangerMode: true,
////    })
////    .then((willDelete) => {
////        if (willDelete) {        
////            var form_data = JSON.stringify({ TrxID: TrxID});
////            $.ajax({
////                url: "WebServiceTransaction.asmx/DeleteAttachmentTicket",
////                method: "POST",
////                contentType: "application/json; charset=utf-8",
////                dataType: "json",
////                //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
////                data: form_data,
////                success: function () {
////                    console.log(form_data)
////                    swal("Done", {
////                        icon: "success",
////                    });
////                    TrxThreadAttachment($("#hd_sessionLogin").val());
////                },
////                error: function (xmlHttpRequest, textStatus, errorThrown) {
////                    console.log(xmlHttpRequest.responseText);
////                    console.log(textStatus);
////                    console.log(errorThrown);
////                },
////                complete: function () {

////                }
////            });
////                swal("Done", {
////                    icon: "success",
////                });
////                TrxThreadAttachment($("#hd_sessionLogin").val());
////            } else {
////                //swal("Your imaginary file is safe!");
////                //$("#ModalChannel").modal('hide');
////            }
////      });
////}
////function getProductsCustomer(custName){
////    var jsonText = JSON.stringify({ keySearch: custName });
////    console.log("CUstomer API " + custName);
////    //var valnoWA = "628119970460";//$('#tglKejadian').val();
////    $.ajax({
////        type: "POST",
////        url: "https://triciptaintegra.com/graphapi/apiicon/apiicon.php",
////        contentType: "application/json; charset=utf-8",
////        data: jsonText,
////        dataType: "json",
////        success: function (response) {
////            var json = response;
////            //alert(json.ResultNya);
////            console.log(json)
////            console.log("Success POST...");
////            var i, x, resultProductName = "", jenisKelamin;
////            var cmbDataProducts = $('#cmb_Assets_Problem');
////            var isiCmbProducts;
            
////            if (json.status == false) {
////                console.log("false products empty!");  
////                cmbDataProducts.empty();
////                isiCmbProducts = '<option value="0">None</option>';
////                cmbDataProducts.append(isiCmbProducts);
////            } else {
////                for (i = 0; i < json.length; i++) {

////                    var jsonProducts = json[i].products;
                   
////                    ////isiCmbProducts = '<option value="">Select</option>';
////                    //cmbDataProducts.empty();
////                    //for(x=0; x < jsonProducts.length; x++){
////                    //    console.log("Products : " + jsonProducts[x].description)
							
////                    //    isiCmbProducts = '<option value="' + jsonProducts[x].description + '">' + jsonProducts[x].description + '</option>';
////                    //    cmbDataProducts.append(isiCmbProducts);

////                    //}
////                    ////end
////                    cmbDataProducts.empty();
////                    if (json.length == 0) {  
////                        isiCmbProducts = '<option value="0">None</option>';
////                        cmbDataProducts.append(isiCmbProducts);
////                    } else{
////                        cmbDataProducts.empty();
////                        for(x=0; x < jsonProducts.length; x++){
////                            console.log("Products : " + jsonProducts[x].description)
							
////                            isiCmbProducts = '<option value="' + jsonProducts[x].description + '">' + jsonProducts[x].description + '</option>';
////                            cmbDataProducts.append(isiCmbProducts);

////                        }

////                    }

											
////                }
////            }
////        }, complete: function () {
////            console.log("back to normal!");              			
////        },
////        error: function (xhr, ajaxOptions, thrownError) {
////            $("#LoaderPage").hide();
////            alert(xhr.status);
////            alert(xhr.responseText);
////            alert(thrownError);
////        }
////    });	
	
////}
