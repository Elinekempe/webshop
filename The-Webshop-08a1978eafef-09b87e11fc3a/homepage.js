document.addEventListener('DOMContentLoaded', function () {
    const productListContainer = document.getElementById('product-list');

    // Producten weergeven op de pagina
    products.forEach(product => {
        const productHtml = `
            <div class="col-md-4">
                <div class="thumbnail">
                    <img src="${product.image}" alt="${product.name}" class="img-responsive">
                    <div class="caption">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <p>Price: $${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productListContainer.innerHTML += productHtml;
    });

    // Voeg product toe aan winkelmand
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Controleer of het product al in de winkelmand zit
        const existingProductIndex = cart.findIndex(p => p.id === product.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // Bewaar de winkelmand in localStorage

        // Toon melding bovenaan het scherm (optioneel)
        showAddedToCartMessage(product.name);
    }

    // Gebruik event delegation om de knoppen "Add to Cart" te verwerken
    productListContainer.addEventListener('click', function (event) {
        // Controleer of de geklikte knop een "add-to-cart" knop is
        if (event.target && event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            if (product) {
                addToCart(product);
            }
        }
    });
});
