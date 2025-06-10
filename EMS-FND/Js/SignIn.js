$("#signIN").click(() => {

    let email = $("#email").val();
    let password = $("#password").val();

    $.ajax({
        url: "http://localhost:8080/EMSOne_Web_exploded/signIn",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({email: email, password: password}),
        success: function(resp) {
            if(resp.code === '200') {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been Saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                localStorage.setItem('email', email);
                window.location.href = '../Pages/DashBoard.html'
            }else{
                if (resp ==='401'){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "User Credentials are wrong!",
                    });
                }else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "User Credentials are wrong!",
                    });

                }
            }
        }
    })
});
