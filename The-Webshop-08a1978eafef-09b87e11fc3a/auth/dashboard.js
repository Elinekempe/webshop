document.addEventListener("DOMContentLoaded", function () {
    // Haal de ingelogde gebruiker op uit localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userNameDisplay = document.getElementById("username-display");
    const logoutButton = document.getElementById("logout");

    // Controleer of de gebruiker is ingelogd
    if (loggedInUser) {
        // Weergeven van gebruikersnaam op het dashboard
        userNameDisplay.textContent = loggedInUser;
    } else {
        // Als geen gebruiker is ingelogd, doorsturen naar loginpagina
        window.location.href = "login.html";
    }

    // Uitlogfunctie
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            // Verwijder de ingelogde gebruiker uit localStorage
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("stayLoggedIn");

            // Doorsturen naar de homepage of loginpagina
            window.location.href = "../index.html";
        });
    }

    // Verder winkelen knop functionaliteit
    const continueShoppingButton = document.getElementById('continue-shopping-btn');
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener('click', function (e) {
            // Controleer of de gebruiker is ingelogd
            if (!loggedInUser) {
                window.location.href = "login.html"; // Verwijs naar de loginpagina als de gebruiker niet is ingelogd
            } else {
                window.location.href = "../index.html"; // Als ingelogd, naar de productpagina
            }
        });
    }
});
