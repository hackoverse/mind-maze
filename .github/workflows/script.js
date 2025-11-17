function addStudent() {
    let name = document.getElementById("name").value;
    let math = parseInt(document.getElementById("math").value);
    let science = parseInt(document.getElementById("science").value);
    let english = parseInt(document.getElementById("english").value);

    if (!name || isNaN(math) || isNaN(science) || isNaN(english)) {
        alert("Please fill all fields correctly!");
        return;
    }

    let total = math + science + english;
    let percentage = ((total / 300) * 100).toFixed(2);

    let table = document.getElementById("studentTable").getElementsByTagName("tbody")[0];

    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${math}</td>
        <td>${science}</td>
        <td>${english}</td>
        <td>${total}</td>
        <td>${percentage}%</td>
    `;

    document.getElementById("name").value = "";
    document.getElementById("math").value = "";
    document.getElementById("science").value = "";
    document.getElementById("english").value = "";
}
