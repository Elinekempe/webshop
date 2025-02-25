document.addEventListener("DOMContentLoaded", function () {
    // Haal de opgeslagen gebruiker en 'stay logged in' status op
    const loggedInUser = localStorage.getItem("loggedInUser");
    const stayLoggedIn = localStorage.getItem("stayLoggedIn");

    // Verkrijg de relevante DOM-elementen voor logincheck
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");
    const userInfo = document.getElementById("user-info");
    const usernameDisplay = document.getElementById("username-display");
    const logoutButton = document.getElementById("logout");
    const cartCount = document.getElementById("cart-count"); // Aantal producten in winkelmand

    console.log("Logged in user: ", loggedInUser);
    console.log("Stay logged in: ", stayLoggedIn);
    
    // Functie om het winkelwagen-icoon bij te werken
    function updateCartIcon() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        console.log("Total items in cart: ", totalItems);
        cartCount.textContent = totalItems > 0 ? totalItems : "";
    }

    // Controleer of de gebruiker ingelogd is en of ze ingelogd willen blijven
    if (loggedInUser && (stayLoggedIn === "true" || stayLoggedIn === null)) {
        signupLink.style.display = "none";
        loginLink.style.display = "none";
        userInfo.style.display = "block";
        logoutButton.style.display = "block";
        usernameDisplay.textContent = loggedInUser;
    } else {
        signupLink.style.display = "block";
        loginLink.style.display = "block";
        userInfo.style.display = "none";
        logoutButton.style.display = "none";
    }

    // Logout functionaliteit
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("stayLoggedIn");
        window.location.reload(); // Herlaad de pagina om de status bij te werken
    });

    // Zorg ervoor dat het winkelwagen-icoon wordt bijgewerkt bij het laden van de pagina
    updateCartIcon();

    // Voeg event listener toe voor "Add to Cart"-knoppen
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            if (!loggedInUser) {
                alert("Je moet ingelogd zijn om producten aan de winkelwagen toe te voegen.");
                return;
            }

            const product = {
                id: event.target.getAttribute("data-id"),
                name: event.target.getAttribute("data-name"),
                price: parseFloat(event.target.getAttribute("data-price")),
                image: event.target.getAttribute("data-image"),
                quantity: 1
            };

            addToCart(product);
        }
    });

    // Voeg product toe aan winkelmand
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Controleer of het product al in de winkelmand zit
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(product);
        }

        // Sla de winkelmand op in localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartIcon(); // Bijwerken van het winkelwagen-icoon
    }
});
