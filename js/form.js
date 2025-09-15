// Switch between forms
function showLoginForm() {
    document.getElementById('formTitle').textContent = "Login";
    document.getElementById('loginForm').style.display = "block";
    document.getElementById('registerForm').style.display = "none";
    document.getElementById('forgotPasswordForm').style.display = "none";
}

function showRegisterForm() {
    document.getElementById('formTitle').textContent = "Register";
    document.getElementById('loginForm').style.display = "none";
    document.getElementById('registerForm').style.display = "block";
    document.getElementById('forgotPasswordForm').style.display = "none";
}

function showForgotPassword() {
    document.getElementById('formTitle').textContent = "Forgot Password";
    document.getElementById('loginForm').style.display = "none";
    document.getElementById('registerForm').style.display = "none";
    document.getElementById('forgotPasswordForm').style.display = "block";
}

// Handle login
function handleLogin(event) {
    event.preventDefault();  // Prevent the form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    // Check if the user is an admin (modify the username/password as needed)
    if (username === 'admin' && password === 'admin123') {
        alert(`Welcome Admin! You have logged in successfully.`);
        // Redirect to admin dashboard (change URL as needed)
        window.location.href = "html/admin.html";  // Admin dashboard
    }
    else if (user) {
        alert(`Welcome ${username}! You have logged in successfully.`);
        // Redirect to user dashboard
        window.location.href = "html/index.html";  // User dashboard
    } else {
        alert("Invalid username or password!");
    }
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();  // Prevent form submission

    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;
    const regConfirmPassword = document.getElementById('regConfirmPassword').value;

    // Validate that passwords match
    if (regPassword !== regConfirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Retrieve stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username is already taken
    const existingUser = users.find(user => user.username === regUsername);
    if (existingUser) {
        alert("Username is already taken. Please choose another one.");
        return;
    }

    // Add the new user to the array
    const newUser = {
        username: regUsername,
        password: regPassword
    };

    users.push(newUser);

    // Save the updated user list to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert("Account created successfully. Please log in.");
    showLoginForm();
}

// Handle forgot password
function handleForgotPassword(event) {
    event.preventDefault();  // Prevent form submission

    const email = document.getElementById('forgotEmail').value;
    alert("Password reset link has been sent to: " + email);
    showLoginForm();
}