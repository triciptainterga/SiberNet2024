$(document).ready(function () {
   
});
function Simpan() {
        event.preventDefault(); // // Function sweat alert
        var form = document.forms["myForm"]; // // Function sweat alert
        swal({
            title: "Do you want to process?",
            //text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {        
           
            swal("Done", {
                icon: "success",
            });
        } else {
        //swal("Your imaginary file is safe!");
                    $("#ModalChannel").modal('hide');
        }
    });
}