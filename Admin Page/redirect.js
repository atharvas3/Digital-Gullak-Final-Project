function redirectToUpdate() {
    const fields = ['fname', 'lname', 'date', 'total_balance', 'amount', 'duration', 'transaction_id'];

    let formData = {};
    fields.forEach(id => {
        formData[id] = document.getElementById(id).value;
    });

    localStorage.setItem("formData", JSON.stringify(formData));

    window.location.href = "update.html";
}
