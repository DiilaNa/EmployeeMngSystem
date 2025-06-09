$(Document).ready(function () {
    loadEmployees();
})
/*-------------show Employee Form------------------------*/
function showAddEmployeeModal() {
    $("#addEmployeeModal").modal('show');
}
function showEditEmployeeModal(emp) {
    $('#updateEmployeeModal').modal('show');
    $('#updateEmployeeId').val(emp.empid);  // hidden input
    $('#updateFirstName').val(emp.empName);
    $('#updateEmail').val(emp.empMail);
    $('#updateDepartment').val(emp.empDepartment);
    $('#updatePosition').val(emp.empPosition);
    $('#updatePhone').val(emp.empPhone);
    $('#updateSalary').val(emp.empSalary);
}

/*---------------Save Employee-------------------------------*/
function addEmployee() {
    const event = {
         name : $('#newFirstName').val(),
         email : $('#newEmail').val(),
         department : $('#newDepartment').val(),
         position : $('#newPosition').val(),
         phone : $('#newPhone').val(),
         salary : $('#newSalary').val(),
    };

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

/*------------Load Table----------------*/
function loadEmployees() {
    $.ajax({
        url: 'http://localhost:8080/EMSOne_Web_exploded/dashboard',
        method: 'GET',
        success: function (employees) {
            const tbody = $("#tbody");
            tbody.empty(); // Clear existing rows

            employees.forEach(emp => {
                const row = `
                    <tr>
                        <td>${emp.empName}</td>
                        <td>${emp.empMail}</td>
                        <td>${emp.empDepartment}</td>
                        <td>${emp.empPosition}</td>
                        <td>${emp.empPhone}</td>
                        <td>${emp.empSalary}</td>
                         <td>
                            <button class="btn btn-sm btn-warning" onclick='showEditEmployeeModal(${JSON.stringify(emp)})'> Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${emp.empid}')">Delete</button>
                         </td>
                    </tr>`;
                tbody.append(row);
            });
        },
        error: function () {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to load employee data!",
            });
        }
    });
}
/*-------------------------Update Employee-----------------------------*/
function updateEmployee() {
    const updatedEmployee = {
        empid: $('#updateEmployeeId').val(),
        name: $('#updateFirstName').val(),
        email: $('#updateEmail').val(),
        department: $('#updateDepartment').val(),
        position: $('#updatePosition').val(),
        salary: $('#updateSalary').val(),
        phone: $('#updatePhone').val()
    };
    console.log(updatedEmployee)
    $.ajax({
        url: 'http://localhost:8080/EMSOne_Web_exploded/dashboard',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedEmployee),
        success: function () {
            Swal.fire("Updated!", "Employee updated successfully.", "success");
            $('#updateEmployeeModal').modal('hide');
            loadEmployees(); // refresh the table
        },
        error: function () {
            Swal.fire("Error", "Update failed", "error");
        }
    });
}
/*---------------Delete Employee--------------------------*/
function deleteEmployee(empid) {
    Swal.fire({
        title: "Are you sure?",
        text: "This employee will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'http://localhost:8080/EMSOne_Web_exploded/dashboard?empid=' + empid,
                method: 'DELETE',
                success: function () {
                    Swal.fire("Deleted!", "Employee has been deleted.", "success");
                    loadEmployees();
                },
                error: function () {
                    Swal.fire("Error", "Delete failed", "error");
                }
            });
        }
    });
}


