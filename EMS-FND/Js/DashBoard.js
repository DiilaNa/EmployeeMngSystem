$(document).ready(function () {
    // Navigation functionality
    $("a.nav-link").click(function (e) {
        e.preventDefault();

        // Remove active class from all nav links
        $("a.nav-link").removeClass("active");

        // Add active class to clicked nav link
        $(this).addClass("active");

        // Get the target section
        const target = $(this).attr("href");
        const sectionName = $(this).data("section");

        if (!target || target === "#") return;

        // Hide all sections
        $(".section-content").hide();

        // Show target section
        $(target).show();

        // Update page title
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

    // Profile form submission
    $("#profileForm").submit(function(e) {
        e.preventDefault();
        alert("Profile updated successfully!");
    });
});

// Additional functions for employee management
function showAddEmployeeModal() {
    $("#addEmployeeModal").modal('show');
}

function addEmployee() {
    // Basic form validation
    const firstName = $("#newFirstName").val();
    const lastName = $("#newLastName").val();
    const email = $("#newEmail").val();
    const department = $("#newDepartment").val();
    const position = $("#newPosition").val();
    const salary = $("#newSalary").val();

    if (!firstName || !lastName || !email || !department || !position || !salary) {
        alert("Please fill in all required fields.");
        return;
    }

    // Here you would typically send the data to your backend
    alert("Employee added successfully!");
    $("#addEmployeeModal").modal('hide');

    // Reset form
    $("#addEmployeeForm")[0].reset();
    $("#newEmployeePic").attr('src', 'https://via.placeholder.com/80x80/6c757d/ffffff?text=+');
}

function toggleSidebar() {
    $("#sidebar").toggleClass('show');
}