document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

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
            $("#signupSuccessModal").modal("show");
        });
    }

    // Redirect naar login pagina na sluiten van popup
    document.getElementById("redirectLogin")?.addEventListener("click", function () {
        window.location.href = "login.html";
    });

    // Controleer of gebruiker ingelogd moet blijven
    const stayLoggedIn = localStorage.getItem("stayLoggedIn");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (stayLoggedIn && loggedInUser) {
        window.location.href = "dashboard.html";
    }

    // ------------------------
    // Check of de gebruiker is ingelogd
    const loggedInUserDisplay = document.getElementById("username-display");
    const userInfo = document.getElementById("user-info");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");
    const logoutButton = document.getElementById("logout");

    if (loggedInUser && (stayLoggedIn || true)) { // Als ingelogd
        userInfo.style.display = "block";
        loggedInUserDisplay.textContent = loggedInUser; // Toon de gebruikersnaam
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
});

// Controleert of een gebruiker is ingelogd en past de navbar aan
document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");

    if (username) {
        document.getElementById("user-info").style.display = "block";
        document.getElementById("account-link").style.display = "block";
        document.getElementById("logout").style.display = "block";
        document.getElementById("username-display").textContent = username;

        // Verberg login- en signup-knoppen
        document.getElementById("login-link").style.display = "none";
        document.getElementById("signup-link").style.display = "none";
    }

    // Uitloggen
    document.getElementById("logout")?.addEventListener("click", function () {
        localStorage.removeItem("username");
        window.location.reload(); // Pagina verversen
    });
});
