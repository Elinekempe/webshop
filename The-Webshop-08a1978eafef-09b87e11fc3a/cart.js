document.addEventListener("DOMContentLoaded", function () {
    let currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        currentUser = "Gast";
        localStorage.setItem('currentUser', currentUser);
    }

    updateCart();
    updateCartCount();
    updateNavbar();

    document.getElementById('checkout-btn')?.addEventListener('click', function () {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log("Cart before checkout:", cart);

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
        console.log("Orders after adding new order:", existingOrders);

        localStorage.removeItem('cart');
        console.log("Cart after checkout:", localStorage.getItem('cart'));

        updateCart();
        updateCartCount();
        alert("Je bestelling is geplaatst!");

        window.location.href = "auth/orders.html";
    });

    document.getElementById("logout")?.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        updateNavbar();
        window.location.href = "index.html";
    });
});

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

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

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

window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount();
};

function updateNavbar() {
    let currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        document.getElementById("user-info").style.display = "block";
        document.getElementById("logout").style.display = "block";
        document.getElementById("username-display").textContent = currentUser;

        document.getElementById("signup-link").style.display = "none";
        document.getElementById("login-link").style.display = "none";
    } else {
        document.getElementById("user-info").style.display = "none";
        document.getElementById("logout").style.display = "none";

        document.getElementById("signup-link").style.display = "block";
        document.getElementById("login-link").style.display = "block";
    }
}