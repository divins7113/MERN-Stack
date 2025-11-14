document.getElementById("addButton").addEventListener("click", addEmployee);

function addEmployee() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let position = document.getElementById("position").value;
    let department = document.getElementById("department").value;


    if (name === "" || age === "" || position === "" || department === "") {
        alert("Please fill all fields!");
        return;
    }

    let table = document.getElementById("employeeTable");

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${age}</td>
        <td>${position}</td>
        <td>${department}</td>
    `;

    table.appendChild(row);

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("position").value = "";
}
