$(document).ready(function () {
    $("a.nav-link").click(function (e) {
        e.preventDefault();
        $("a.nav-link").removeClass("active");

        $(this).addClass("active");
        const target = $(this).attr("href");

        if (!target || target === "#") return;

        $(".section-content").hide();
        $(target).show();

        const linkText = $(this).find("span").text();
        $("#pageTitle").text(linkText);
    });

    // Profile image upload functionality
    $("#navProfilePic").click(function() {
        $("#navProfileInput").click();
    });

    $("#profilePicLarge").click(function() {
        $("#profileImageInput").click();
    });

    $("#newEmployeePic").click(function() {
        $("#newEmployeeImageInput").click();
    });

    var email=localStorage.getItem('email');
    console.log(email)
    if (email === null) {
        console.log("email is null")
        window.location.href = '../Pages/SignIn.html';
    }else {
        alert('Welcome to the dashboard, ' + email);
    }

    // Handle image uploads
    $("#navProfileInput, #profileImageInput, #newEmployeeImageInput").change(function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const targetId = $(e.target).attr('id');
                if (targetId === 'navProfileInput') {
                    $("#navProfilePic").attr('src', e.target.result);
                } else if (targetId === 'profileImageInput') {
                    $("#profilePicLarge").attr('src', e.target.result);
                } else if (targetId === 'newEmployeeImageInput') {
                    $("#newEmployeePic").attr('src', e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    });
});

$('#logout-btn').on('click', function() {
    localStorage.removeItem('email');
    window.location.href = '../Pages/SignIn.html';
});

function toggleSidebar() {
    $("#sidebar").toggleClass('show');
}