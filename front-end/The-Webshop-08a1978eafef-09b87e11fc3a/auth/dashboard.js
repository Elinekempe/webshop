document.addEventListener("DOMContentLoaded", function () {
    // Haal de ingelogde gebruiker op uit localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userNameDisplay = document.getElementById("username-display");
    const logoutButton = document.getElementById("logout");

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
});
