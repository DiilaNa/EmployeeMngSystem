
function showAddEmployeeModal() {
    $("#addEmployeeModal").modal('show');
}

function addEmployee() {

    let name = $("#newFirstName").val();
    let email = $("#newEmail").val();
    let department = $("#newDepartment").val();
    let position = $("#newPosition").val();
    let salary = $("#newSalary").val();
    let phone = $("#newPhone").val();

    if (!name  || !email || !department || !position || !salary || !phone) {
        Swal.fire({
            icon: "warning",
            title: "Missing Info",
            text: "Please fill in all fields",
        });
        return;
    }

    $.ajax({
        url: '',

    })




}
