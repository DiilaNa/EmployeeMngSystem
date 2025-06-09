$(Document).ready(function () {
    loadEmployees();
})
/*-------------show Employee Form------------------------*/
function showAddEmployeeModal() {
    $("#addEmployeeModal").modal('show');
}
function showEditEmployeeModal(emp) {
    $('#updateEmployeeModal').modal('show');
    $('#editEmpId').val(emp.empid);  // hidden input
    $('#editFirstName').val(emp.name);
    $('#editEmail').val(emp.email);
    $('#editDepartment').val(emp.department);
    $('#editPosition').val(emp.position);
    $('#editPhone').val(emp.phone);
    $('#editSalary').val(emp.salary);
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

