document.addEventListener("DOMContentLoaded", function () {
    
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.text();

                if (result === "Login successful") {
                    localStorage.setItem("username", username); 
                    window.location.href = "dashboard.html"; 
                } else {
                    alert("Invalid credentials");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                alert("Server error. Please try again.");
            }
        });
    } else {
        console.warn("Warning: 'loginForm' not found in HTML.");
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("username"); 
            window.location.href = "index.html";
        });
    } else {
        console.warn("Warning: 'logoutBtn' not found in HTML.");
    }

    fetchEmployees();
});

// Fetch employees from server
async function fetchEmployees() {

    try {
        const response = await fetch("http://localhost:8080/employees");
        const employees = await response.json();
        

        const tableBody = document.getElementById("employeeTableBody");
        if (!tableBody) return;
        tableBody.innerHTML = "";

        employees.forEach(emp => {
            const row = `<tr>
                <td>${emp.id}</td>
                <td>${emp.firstName}</td>
                <td>${emp.lastName}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>
                    <button class="edit" onclick="editEmployee(${emp.id})">Edit</button>
                    <button class="delete" onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to load employees.");
    }
}

// Logout function
function logout() {
    localStorage.removeItem("username"); // Clear session
    window.location.href = "index.html"; // Redirect to login
}



//for adding employee
async function addEmployee() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;

    //  Check if all fields are filled
    if (!firstName || !lastName || !email || !department) {
        alert("All fields are required!");
        return;
    }

    const employee = { firstName, lastName, email, department };

    try {
        const response = await fetch("http://localhost:8080/employees", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        });

       
        if (response.ok) {
            alert("Employee added successfully!");

            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("department").value = "";
            
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            const errorMessage = await response.text();
            alert("Failed to add employee. Server response: " + errorMessage);
        }
    } catch (error) {
        console.error("Error adding employee:", error);
        alert("Server error. Please check console logs.");
    }
}


//editing employee
function showEditForm(employee) {
    document.getElementById("editEmployeeForm").style.display = "block";
    document.getElementById("editEmployeeId").value = employee.id;
    document.getElementById("editFirstName").value = employee.firstName;
    document.getElementById("editLastName").value = employee.lastName;
    document.getElementById("editEmail").value = employee.email;
    document.getElementById("editDepartment").value = employee.department;
}

function hideEditForm() {
    document.getElementById("editEmployeeForm").style.display = "none";
}


async function editEmployee(id) {
    try {
        const response = await fetch(`http://localhost:8080/employees/${id}`);
        console.log("Response Status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error Response:", errorText); 
            alert("Failed to fetch employee details: " + errorText);
            return;
        }
        
        const employee = await response.json();
        showEditForm(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        alert("Error connecting to server.");
    }
}


// Update employee details
async function updateEmployee() {
    const id = document.getElementById("editEmployeeId").value;
    const updatedEmployee = {
        firstName: document.getElementById("editFirstName").value,
        lastName: document.getElementById("editLastName").value,
        email: document.getElementById("editEmail").value,
        department: document.getElementById("editDepartment").value
    };

    try {
        const response = await fetch(`http://localhost:8080/employees/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEmployee)
        });

        if (response.ok) {
            alert("Employee updated successfully!");
            hideEditForm();
            fetchEmployees(); // Reload the employee list
        } else {
            alert("Failed to update employee.");
        }
    } catch (error) {
        console.error("Error updating employee:", error);
    }
}


//for deleting employee
async function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
        const response = await fetch(`http://localhost:8080/employees/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Employee deleted successfully!");
            fetchEmployees(); 
        } else {
            alert("Failed to delete employee.");
        }
    } catch (error) {
        console.error("Error deleting employee:", error);
    }
}
