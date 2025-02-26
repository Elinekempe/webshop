document.addEventListener("DOMContentLoaded", function () {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error('Fout bij het laden van de JSON:', error);
        });

    function displayProducts(products) {
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = "";

        products.forEach(product => {
            const productCol = document.createElement('div');
            productCol.className = 'col-md-3 col-sm-6 col-xs-12';
            productCol.innerHTML = `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}" class="img-responsive">
                    <h4>${product.name}</h4>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">€${product.price.toFixed(2)}</p>
                    <button class="add-to-cart">Voeg toe aan winkelwagen</button>
                </div>
            `;
            productGrid.appendChild(productCol);
        });
    }
});