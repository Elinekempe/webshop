async function loadFilteredProducts() {
    try {
        let products = JSON.parse(localStorage.getItem('products'));

        if (!products) {
            const response = await fetch('products.json');
            products = await response.json();
            localStorage.setItem('products', JSON.stringify(products));
        }

        console.log("Producten geladen:", products);

        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        const filteredProducts = category 
            ? products.filter(product => product.category.includes(category))
            : products;

        const productListContainer = document.getElementById('product-list');
        productListContainer.innerHTMaL = '';

        let rowElement = document.createElement('div');
        rowElement.classList.add('row');

        filteredProducts.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-xs-12', 'product-container');
            productElement.innerHTML = `
                <div class="product card">
                    <img src="${product.image}" alt="${product.name}" class="product-image img-responsive" />
                    <div class="card-body text-center">
                        <h4 class="product-title">${product.name}</h4>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price"><strong>€${product.price.toFixed(2)}</strong></p>
                        <button class="btn btn-primary add-to-cart" 
                            data-id="${product.id}" 
                            data-name="${product.name}"
                            data-price="${product.price}" 
                            data-image="${product.image}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;

            rowElement.appendChild(productElement);

            if ((index + 1) % 4 === 0) {
                productListContainer.appendChild(rowElement);
                rowElement = document.createElement('div');
                rowElement.classList.add('row');
            }
        });

        if (rowElement.children.length > 0) {
            productListContainer.appendChild(rowElement);
        }

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const product = {
                    id: e.target.getAttribute('data-id'),
                    name: e.target.getAttribute('data-name'),
                    price: parseFloat(e.target.getAttribute('data-price')),
                    image: e.target.getAttribute('data-image'),
                    quantity: 1
                };
                addToCart(product);
            });
        });

    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`✅ ${product.name} toegevoegd aan winkelwagen!`, cart);

    showPopupMessage(product.name);
}


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

window.onload = loadFilteredProducts;
