document.addEventListener("DOMContentLoaded", function () {
    // Controleer of er een gebruiker is ingelogd
    let currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        // Als er geen gebruiker is ingelogd, vraag dan niet opnieuw om in te loggen
        currentUser = "Gast";
        localStorage.setItem('currentUser', currentUser);
    }

    updateCart();
    updateCartCount();
    updateNavbar();

    // Voeg event listener toe voor de checkout-knop
    document.getElementById('checkout-btn')?.addEventListener('click', function () {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log("Cart before checkout:", cart); // Debug: Controleer de inhoud van de winkelwagen

        if (cart.length === 0) {
            alert("Je winkelwagen is leeg!");
            return;
        }

        let user = localStorage.getItem('currentUser') || "Gast";
        let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        let order = {
            id: Date.now(),
            user: user,
            items: cart,
            totalPrice: totalPrice.toFixed(2),
            date: new Date().toLocaleString(),
            status: "In behandeling"
        };

        let existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        existingOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        console.log("Orders after adding new order:", existingOrders); // Debug: Controleer de bestellingen in localStorage

        localStorage.removeItem('cart');
        console.log("Cart after checkout:", localStorage.getItem('cart')); // Debug: Controleer of de winkelwagen is geleegd

        updateCart();
        updateCartCount();
        alert("Je bestelling is geplaatst!");

        // Doorsturen naar orders.html
        window.location.href = "auth/orders.html";
    });

    // Voeg event listener toe voor de logout-knop
    document.getElementById("logout")?.addEventListener("click", function () {
        localStorage.removeItem("currentUser"); // Verwijder gebruiker uit localStorage
        updateNavbar(); // Navbar updaten
        window.location.href = "index.html"; // Terug naar de homepagina
    });
});

// Functie om de winkelwagen bij te werken
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let totalContainer = document.getElementById('total-price');

    if (!cartItemsContainer || !totalContainer) return;

    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        let cartRow = document.createElement("tr");
        cartRow.innerHTML = `
            <td>${item.name}</td>
            <td>€${item.price.toFixed(2)}</td>
            <td>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>€${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Verwijderen</button></td>
        `;
        cartItemsContainer.appendChild(cartRow);
    });

    totalContainer.textContent = `€${totalPrice.toFixed(2)}`;
}

// Functie om de winkelwagen telling bij te werken
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Functie om hoeveelheid te wijzigen
window.changeQuantity = function(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount();
};

// Functie om een item te verwijderen
window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount();
};

// Functie om de navbar bij te werken
function updateNavbar() {
    let currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        // ✅ Gebruiker is ingelogd: Toon gebruikersnaam en logout-knop
        document.getElementById("user-info").style.display = "block";
        document.getElementById("logout").style.display = "block";
        document.getElementById("username-display").textContent = currentUser;

        // Verberg login/signup knoppen
        document.getElementById("signup-link").style.display = "none";
        document.getElementById("login-link").style.display = "none";
    } else {
        // ❌ Gebruiker niet ingelogd: Toon login/signup en verberg gebruikersinfo
        document.getElementById("user-info").style.display = "none";
        document.getElementById("logout").style.display = "none";

        document.getElementById("signup-link").style.display = "block";
        document.getElementById("login-link").style.display = "block";
    }
}