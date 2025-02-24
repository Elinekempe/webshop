document.addEventListener("DOMContentLoaded", function () {
    // Controleer of we op de loginpagina zijn
    if (document.getElementById("adminLoginForm")) {
        document.getElementById("adminLoginForm").addEventListener("submit", handleLogin);
    }

    // Controleer of we op het dashboard zijn
    if (document.getElementById("productList")) {
        checkAdminLogin();
        loadProducts();

        const productForm = document.getElementById("productForm");
        if (productForm) {
            productForm.addEventListener("submit", addProduct);
        }

        const resetButton = document.getElementById("resetProducts");
        if (resetButton) {
            resetButton.addEventListener("click", resetProducts);
        }

        // Logout-knop functionaliteit
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function () {
                sessionStorage.removeItem("isAdmin"); // Verwijder admin-sessie
                window.location.href = "index.html"; // Stuur door naar de homepage
            });
        }

        // Toon admin status als ingelogd
        if (sessionStorage.getItem("isAdmin") === "true") {
            document.getElementById("adminStatus").style.display = "block";
        }
    }
});

/** 🔐 Login-functionaliteit */
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "1234"
};

// Verwerkt login
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem("isAdmin", "true");
        window.location.href = "admin_dashboard.html"; // Doorsturen naar dashboard
    } else {
        errorMsg.style.display = "block"; // Toon foutmelding
    }
}
