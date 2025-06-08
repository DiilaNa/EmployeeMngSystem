function showAddEmployeeModal() {
    $("#addEmployeeModal").modal('show');
}

function addEmployee() {
    const event = {
         name : $('#newFirstName').val(),
         email : $('#newEmail').val(),
         department : $('#newDepartment').val(),
         position : $('#newPosition').val(),
         phone : $('#newPhone').val(),
         salary : $('#newSalary').val(),
    };

    console.log(event.name)

    if (!event.name  || !event.email || !event.department || !event.position || !event.salary || !event.phone) {
        Swal.fire({
            icon: "warning",
            title: "Missing Info",
            text: "Please fill in all fields",
            showConfirmButton: false,
        });
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/EMSOne_Web_exploded/dashboard',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(event),
        success: function (response) {
            if (response.code === '201'){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Employee saved",
                    showConfirmButton: true
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
    })
}
