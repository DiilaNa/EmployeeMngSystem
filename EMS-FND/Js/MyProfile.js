$('#updateProfileBTN').click(function () {
    $('#updateProfileModal').modal('show');
})


function updateProfile() {
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        department: document.getElementById('department').value,
        jobTitle: document.getElementById('jobTitle').value,
        employeeId: document.getElementById('employeeId').value,
        address: document.getElementById('address').value
    };

    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.department) {
        showModalAlert('Please fill in all required fields (Name, Email, Department)!', 'danger');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showModalAlert('Please enter a valid email address!', 'danger');
        return;
    }

    // Show loading
    const saveBtn = document.querySelector('.modal-footer .btn-primary');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Saving...';
    saveBtn.disabled = true;

}