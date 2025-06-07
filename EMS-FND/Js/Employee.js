
function showAddEmployeeModal() {
    $("#addEmployeeModal").modal('show');
}

function addEmployee() {

    let firstName = $("#newFirstName").val();
    let email = $("#newEmail").val();
    let department = $("#newDepartment").val();
    let position = $("#newPosition").val();
    let salary = $("#newSalary").val();

    if (!firstName  || !email || !department || !position || !salary) {
        alert("Please fill in all required fields.");
        return;
    }

    alert("Employee added successfully!");
    $("#addEmployeeModal").modal('hide');

    $("#addEmployeeForm")[0].reset();
    $("#newEmployeePic").attr('src', 'https://via.placeholder.com/80x80/6c757d/ffffff?text=+');
}
