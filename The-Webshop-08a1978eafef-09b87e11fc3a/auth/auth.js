document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const usernameDisplay = document.getElementById("username-display");
    const userInfo = document.getElementById("user-info");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");
    const logoutButton = document.getElementById("logout");

    // Functie om gebruiker in te loggen
    function loginUser(username, password, rememberMe) {
        let users = JSON.parse(localStorage.getItem("users")) || {};

        if (!users[username] || users[username].password !== password) {
            alert("Invalid username or password.");
            return;
        }

        localStorage.setItem("loggedInUser", username);
        if (rememberMe) {
            localStorage.setItem("stayLoggedIn", "true");
        } else {
            localStorage.removeItem("stayLoggedIn");
        }

        alert("Login successful! Redirecting to your dashboard...");
        window.location.href = "dashboard.html";
    }

    // Login formulier verwerking
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value.trim();
            const rememberMe = document.getElementById("remember-me").checked;

            if (!username || !password) {
                alert("Both username and password are required.");
                return;
            }

            loginUser(username, password, rememberMe);
        });
    }

    // Registratie formulier verwerking
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("signup-username").value.trim();
            const password = document.getElementById("signup-password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[username]) {
                alert("Username already exists. Choose another.");
                return;
            }

            users[username] = { password: password };
            localStorage.setItem("users", JSON.stringify(users));

            // Toon de popup
            if (typeof $("#signupSuccessModal") !== "undefined") {
                $("#signupSuccessModal").modal("show");
            }
        });
    }

    // Controleer of de gebruiker ingelogd moet blijven
    const stayLoggedIn = localStorage.getItem("stayLoggedIn");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (stayLoggedIn && loggedInUser) {
        window.location.href = "dashboard.html";
    }

    // Update de navbar op basis van inlogstatus
    if (loggedInUser && (stayLoggedIn || true)) { // Als ingelogd
        userInfo.style.display = "block";
        usernameDisplay.textContent = loggedInUser; // Toon de gebruikersnaam
        signupLink.style.display = "none";
        loginLink.style.display = "none";
        logoutButton.style.display = "block";

        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("stayLoggedIn");
            window.location.reload();
        });
    } else {
        // Als niet ingelogd, toon de signup en login links
        userInfo.style.display = "none";
        signupLink.style.display = "block";
        loginLink.style.display = "block";
        logoutButton.style.display = "none";
    }

    // Uitloggen
    logoutButton?.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("stayLoggedIn");
        window.location.reload(); // Pagina verversen
    });
});
