/*------------Pass word Eye Icon Toggle---------------------*/
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

/*------------------Save BTN Action--------------------------------*/
$('#saveBTN').click(function () {
    const event = {
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val(),
    };
    if (!event.name || !event.email || !event.password) {
        Swal.fire({
            icon: "warning",
            title: "Missing Info",
            text: "Please fill in all fields",
        });
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/EMSOne_Web_exploded/signup',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(event),
        success: function (response) {
            if (response.code === '201'){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully SignUP",
                    showConfirmButton: true,
                }).then((result)=>{
                    if (result.isConfirmed){
                        window.location.href = '../Pages/SignIn.html'
                    }

                })
            }
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
