$('#saveBTN').click(function () {
    const event = {
        name: $('#name').val(),
        address: $('#email').val(),
        password: $('#password').val(),
    };
    $.ajax({
        url: 'http://localhost:8080/EMSOne_Web_exploded/signup',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(event),
        success: function (response) {
           /* $('#getAllEvents').click();*/
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been Saved",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function () {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "save went wrong!",
            });
        }
    });
});