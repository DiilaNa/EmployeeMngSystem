

$("#signIN").click(() => {

    let email = $("#email").val();
    let password = $("#password").val();
    console.log(email)
    console.log(password)

    $.ajax({
        url: "http://localhost:8080/EMSOne_Web_exploded/signIn",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({email: email, password: password}),
        success: function(resp) {
            if(resp === "Success") {
                console.log("success whotto")
                Swal.fire({
                    icon: "success",
                    title: "super.",
                });

                window.location.href = '../index.html'
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User Credentials are wrong!",
                });
            }
        }
    })
});
