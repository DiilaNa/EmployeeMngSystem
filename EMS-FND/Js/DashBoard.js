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
    checkMailBeforeLogin();
});

/*----------------Log Out BTN Action---------------------------*/
$('#logout-btn').on('click', function() {
    localStorage.removeItem('email');
    window.location.href = '../Pages/SignIn.html';
});

function toggleSidebar() {
    $("#sidebar").toggleClass('show');
}

/*----------------Check if Log in with a Mail or Not ----------------*/
function checkMailBeforeLogin() {
    var email=localStorage.getItem('email');
    if (email === null) {
        window.location.href = '../Pages/SignIn.html';
    }else {
        alert('Welcome to the dashboard, ' + email);
    }
}