document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userNameDisplay = document.getElementById("username-display");
    const logoutButton = document.getElementById("logout");

    if (loggedInUser) {
        userNameDisplay.textContent = loggedInUser;
    } else {
        window.location.href = "login.html";
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("stayLoggedIn");

            window.location.href = "../index.html";
        });
    }

    const continueShoppingButton = document.getElementById('continue-shopping-btn');
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener('click', function (e) {
            if (!loggedInUser) {
                window.location.href = "login.html";
            } else {
                window.location.href = "../index.html";
            }
        });
    }
});
