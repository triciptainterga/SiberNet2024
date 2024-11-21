$(document).ready(function () {
    $("#Ticket_SearchCustomer").on("input", function () {
        // Print entered value in a div box
        var jumlahString = $(this).val().length;
        //console.log(jumlahString);
        if (jumlahString >= 4) {
            //getWS_MasterCustomer($(this).val());
            getWS_MasterLeadAPI($(this).val())
        }
    });
});

function getWS_MasterLeadAPI(custName) {
    var listDataCustomer = $('#Ticket_ListCustomer');
    var jsonText = JSON.stringify({ keySearch: custName });
    console.log(custName);
    //var valnoWA = "628119970460";//$('#tglKejadian').val();
    $.ajax({
        type: "POST",
        url: "https://triciptaintegra.com/graphapi/apiicon/apiicon_leads.php",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {
            var json = response;
            //alert(json.ResultNya);
            console.log(json)
            console.log("Success POST...");
            var i, x, resultSourceCustomer = "", jenisKelamin;
            listDataCustomer.empty();
            //cmbDataSourceEnquiryReason.append('<option value="">Select</option>');
            //console.log("Jumlah" + json.length);
            //alert(json.status)
            if (json.status == false) {
                getWS_MasterCustomerAPI(custName);
                //alert("data kosong")
                //console.log("data not found " + i);
                //resultSourceCustomer = '<div class="media media-single" > No data found... </div>';
                //listDataCustomer.append(resultSourceCustomer);
            } else {
                for (i = 0; i < json.length; i++) {
                    //alert();
                    //alert();

                    if (json[i].client_id == "0") {
                        jenisKelamin = '5.jpg';
                    } else {
                        jenisKelamin = '2.jpg';
                    }
                    resultSourceCustomer = "<div class='media media-single' > " +
                        "<a href='#'>" +
                        "<img class='avatar avatar-lg' src='../images/avatar/" + jenisKelamin + "' alt='...'>" +
                        "</a>" +
                        "<div class='media-body'>" +
                        "<h6><a href='#' onclick=showHistoryTicket(" + json[i].id + ")>" + json[i].name + "</a></h6>" +
                        "<small class='text-fader'>" + json[i].email + "</small><br>" +
                        "<small class='text-fader'>" + json[i].phonenumber + "</small>" +
                        "</div>" +
                        "<div class='media-right'>" +
                        //'<a onclick="showHistoryTicket(' + json[i].id + ')" class="btn btn-block btn-default btn-sm">Submit</a>' +
                        "<a onclick=getWS_MasterLeadSubmitAPI('" + json[i].email + "') class='btn btn-block btn-default btn-sm'>Submit</a>" +
                        "</div>" +
                        "</div>";

                    listDataCustomer.append(resultSourceCustomer);

                }
            }
        }, complete: function () {
            //back to normal!              				
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#LoaderPage").hide();
            alert(xhr.status);
            alert(xhr.responseText);
            alert(thrownError);
        }
    });
}

function getWS_MasterCustomerAPI(custName) {
    var listDataCustomer = $('#Ticket_ListCustomer');
    var jsonText = JSON.stringify({ keySearch: custName });
    console.log(custName);
    //var valnoWA = "628119970460";//$('#tglKejadian').val();
    $.ajax({
        type: "POST",
        url: "https://triciptaintegra.com/graphapi/apiicon/apiicon.php",
        contentType: "application/json; charset=utf-8",
        data: jsonText,
        dataType: "json",
        success: function (response) {
            var json = response;
            //alert(json.ResultNya);
            console.log(json)
            console.log("Success POST...");
            var i, x, resultSourceCustomer = "", jenisKelamin;
            listDataCustomer.empty();
            //cmbDataSourceEnquiryReason.append('<option value="">Select</option>');
            //console.log("Jumlah" + json.length);
            if (json.status == false) {
                //alert(json.status)
                //$("#modal-lead").modal('show')
                //console.log("data not found " + i);
                resultSourceCustomer = '<div class="media media-single"><div class="media-body">' +
                    '<h6>Data not found</h6>' +
                    '</div>' +
                    '<div class="media-right">' +
                    '<a onclick="showLead()" class="btn btn-block btn-default btn-sm">Add Lead</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                listDataCustomer.append(resultSourceCustomer);
            } else {
                for (i = 0; i < json.length; i++) {


                    if (json[i].saldo == "0") {
                        jenisKelamin = '5.jpg';
                    } else {
                        jenisKelamin = '2.jpg';
                    }
                    resultSourceCustomer = '<div class="media media-single" > ' +
                        '<a href="#">' +
                        '<img class="avatar avatar-lg" src="../images/avatar/' + jenisKelamin + '" alt="...">' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h6><a href="#" onclick="showHistoryTicket(' + json[i].company.userid + ')">' + json[i].company.company + '</a></h6>' +
                        '<small class="text-fader">' + json[i].company.phonenumber + '</small><br>' +
                        '<small class="text-fader">' + json[i].company.address + '</small>' +
                        '</div>' +
                        '<div class="media-right">' +
                        '<a onclick="showHistoryTicket(' + json[i].company.userid + ')" class="btn btn-block btn-default btn-sm">Submit</a>' +
                        '</div>' +
                        '</div>';

                    listDataCustomer.append(resultSourceCustomer);


                }
            }
        }, complete: function () {
            //back to normal!               			
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#LoaderPage").hide();
            alert(xhr.status);
            alert(xhr.responseText);
            alert(thrownError);
        }
    });
}