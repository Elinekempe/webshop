document.addEventListener("DOMContentLoaded", function () {
    // Deel 1: Producten ophalen en weergeven
    let products = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function fetchProducts() {
        fetch('products.json') 
            .then(response => response.json())
            .then(data => {
                products = data;
                displayProducts(products);
            })
            .catch(error => console.error("Error loading products:", error));
    }

    function displayProducts(filteredProducts) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ""; 

        filteredProducts.forEach(product => {
            const productHtml = `
                <div class="col-md-4">
                    <div class="thumbnail">
                        <img src="${product.image}" alt="${product.name}" class="img-responsive">
                        <div class="caption">
                            <h4>${product.name}</h4>
                            <p>${product.description}</p>
                            <p>Price: $${product.price.toFixed(2)}</p>
<button class="add-to-cart" data-id="${product.id}" data-name="${product.name}"
data-price="10.00" data-image="${product.image}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += productHtml;
        });

        addCartEventListeners();
    }

    function filterProducts() {
        const selectedFilters = Array.from(document.querySelectorAll('.filter:checked')).map(cb => cb.value);

        if (selectedFilters.length === 0) {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product =>
                selectedFilters.some(filter => product.category.includes(filter))
            );
            displayProducts(filteredProducts);
        }
    }

    function addCartEventListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        let product = products.find(p => p.id == productId);
        let existingProduct = cart.find(p => p.id == productId);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Toon de melding bovenaan het scherm
        showAddedToCartMessage(product.name);
    }

    // Functie om een melding bovenaan het scherm te tonen
    function showAddedToCartMessage(productName) {
        const message = document.getElementById('added-to-cart-message');
        if (message) {
            message.textContent = `${productName} is toegevoegd aan je winkelmand!`;
            message.style.display = 'block'; // Toon de melding

            // Verberg de melding na 5 seconden
            setTimeout(() => {
                message.style.display = 'none';
            }, 5000);
        }
    }

    document.querySelectorAll('.filter').forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    fetchProducts();

    // Deel 2: Login/log-out functionaliteit
    const loggedInUser = localStorage.getItem("loggedInUser");

    const accountLink = document.getElementById("account-link");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");
    const userInfo = document.getElementById("user-info");
    const usernameDisplay = document.getElementById("username-display");
    const logoutButton = document.getElementById("logout");

    // Check of de gebruiker ingelogd is
    if (loggedInUser) {
        // Als ingelogd, laat account en logout knoppen zien
        accountLink.style.display = "block";
        signupLink.style.display = "none";
        loginLink.style.display = "none";
        userInfo.style.display = "block";
        usernameDisplay.textContent = loggedInUser; // Toon de gebruikersnaam in de welkomstboodschap

        // Logout functionaliteit
        logoutButton.addEventListener("click", function () {
            // Verwijder de ingelogde gebruiker uit localStorage
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("stayLoggedIn"); // Verwijder ook de "stayLoggedIn" instelling indien aanwezig

            // Laad de pagina opnieuw om de veranderingen door te voeren
            window.location.reload();
        });
    } else {
        // Als niet ingelogd, laat de login en signup knoppen zien
        accountLink.style.display = "none";
        userInfo.style.display = "none";
        signupLink.style.display = "block";
        loginLink.style.display = "block";
    }
});
