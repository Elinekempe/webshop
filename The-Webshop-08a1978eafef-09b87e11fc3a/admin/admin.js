// admin.js

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("adminLoginForm")) {
        document.getElementById("adminLoginForm").addEventListener("submit", handleLogin);
    }
    if (document.getElementById("productList")) {
        checkAdminLogin();
        loadProducts();
        
        document.getElementById("resetProducts")?.addEventListener("click", resetProducts);
        document.getElementById("logoutBtn")?.addEventListener("click", () => {
            sessionStorage.removeItem("isAdmin");
            window.location.href = "index.html";
        });
    }
});

const ADMIN_CREDENTIALS = { username: "admin", password: "1234" };

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem("isAdmin", "true");
        window.location.href = "products.html";
    } else {
        errorMsg.style.display = "block";
    }
}

function checkAdminLogin() {
    if (!sessionStorage.getItem("isAdmin")) {
        window.location.href = "admin_login.html";
    } else {
        document.getElementById("adminStatus").style.display = "block";
    }
}

function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) {
        fetch("../products.json")
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("products", JSON.stringify(data));
                displayProducts(data);
            })
            .catch(error => console.error("Fout bij laden van producten:", error));
    } else {
        displayProducts(products);
    }
}

function resetProducts() {
    fetch("../products.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("products", JSON.stringify(data));
            displayProducts(data);
            alert("Producten zijn gereset naar originele staat.");
        })
        .catch(error => console.error("Fout bij resetten van producten:", error));
}
