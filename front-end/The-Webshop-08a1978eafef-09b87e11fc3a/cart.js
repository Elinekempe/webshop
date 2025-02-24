document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
    updateCart();
    updateCartCount();
});

// Laad producten en toon ze op de homepage
function fetchProducts() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error("Fout bij het laden van producten:", error);
        });
}

function displayProducts(products) {
    const productContainer = document.getElementById('product-list');

    products.forEach(product => {
        const productHtml = `
            <div class="col-md-3">
                <div class="product-item">
                    <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="btn btn-success add-to-cart" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.price}" 
                        data-image="${product.image}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productContainer.innerHTML += productHtml;
    });

    // Voeg event listeners toe
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const product = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                price: parseFloat(this.getAttribute('data-price')),
                image: this.getAttribute('data-image'),
                quantity: 1
            };
            addToCart(product);
            showPopupMessage(product.name);
        });
    });
}

// Voeg product toe aan winkelmand
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id == product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount();
}

// Winkelmand bijwerken
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (!cartItemsContainer || !totalPriceEl) return;

    cartItemsContainer.innerHTML = cart.length === 0 
        ? "<tr><td colspan='5'>Your cart is empty.</td></tr>" 
        : "";

    cart.forEach(product => {
        total += product.price * product.quantity;
        cartItemsContainer.innerHTML += `
            <tr>
                <td><img src="${product.image}" style="width: 50px;"> ${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>$${(product.price * product.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger remove-item" data-id="${product.id}">Remove</button></td>
            </tr>
        `;
    });

    totalPriceEl.textContent = total.toFixed(2);
    addRemoveEventListeners();
}

// Bijwerken van het aantal producten in de winkelmand (navbar)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((acc, product) => acc + product.quantity, 0);
    document.getElementById('cart-count').innerHTML = `
        <a href="cart.html"><span class="glyphicon glyphicon-shopping-cart"></span> Cart (${cartCount})</a>
    `;
}

// Product verwijderen uit winkelmand
function addRemoveEventListeners() {
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCount();
}

// Winkelmand legen
document.getElementById('clear-cart')?.addEventListener('click', function () {
    localStorage.removeItem('cart');
    updateCart();
    updateCartCount();
});

// Pop-up bericht tonen
function showPopupMessage(productName) {
    const popup = document.getElementById('added-to-cart-message');
    if (popup) {
        popup.textContent = `${productName} is toegevoegd aan je winkelmand!`;
        popup.classList.add('show');

        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000);
    }
}
