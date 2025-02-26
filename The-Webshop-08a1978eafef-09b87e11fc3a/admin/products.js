function displayProducts(products) {
    const productListContainer = document.getElementById('productList');
    productListContainer.innerHTML = '';

    products.forEach(product => {
        const productRow = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>€${product.price}</td>
                <td><img src="${product.image}" alt="${product.name}" width="100"></td>
                <td>
                    <button class="btn btn-warning btn-sm editBtn" data-id="${product.id}">Bewerken</button>
                    <button class="btn btn-danger btn-sm deleteBtn" data-id="${product.id}">Verwijderen</button>
                </td>
            </tr>
        `;
        productListContainer.innerHTML += productRow;
    });

    document.querySelectorAll('.editBtn').forEach(button => {
        button.addEventListener('click', editProduct);
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', deleteProduct);
    });
}

function loadProducts() {
    fetch('../products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Netwerkfout bij het ophalen van products.json');
            }
            return response.json();
        })
        .then(productsFromJson => {
            let productsInLocalStorage = JSON.parse(localStorage.getItem('products')) || [];

            let existingProductIds = new Set(productsInLocalStorage.map(p => p.id));

            let newProducts = productsFromJson.filter(p => !existingProductIds.has(p.id));

            let updatedProducts = [...productsInLocalStorage, ...newProducts];
            localStorage.setItem('products', JSON.stringify(updatedProducts));

            displayProducts(updatedProducts);
        })
        .catch(error => {
            console.error('Fout bij het laden van de producten:', error);
            alert('Er was een probleem met het laden van de producten. Probeer het later opnieuw.');
        });
}

document.addEventListener("DOMContentLoaded", loadProducts);

function editProduct(event) {
    const productId = event.target.getAttribute('data-id');
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id == productId);

    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.image;

    const imagePreview = document.getElementById('editProductImagePreview');
    imagePreview.src = product.image;
    imagePreview.style.display = 'block';

    document.getElementById('editProductModal').style.display = 'block';
    document.getElementById('saveEdit').onclick = () => saveEdit(productId);
}

function saveEdit(productId) {
    let products = JSON.parse(localStorage.getItem('products'));
    let productIndex = products.findIndex(p => p.id == productId);

    if (productIndex !== -1) {
        products[productIndex].id = document.getElementById('editProductId').value;
        products[productIndex].name = document.getElementById('editProductName').value;
        products[productIndex].price = document.getElementById('editProductPrice').value;
        products[productIndex].image = document.getElementById('editProductImage').value;

        localStorage.setItem('products', JSON.stringify(products));
        document.getElementById('editProductModal').style.display = 'none';
        displayProducts(products);
    }
}

function deleteProduct(event) {
    const productId = event.target.getAttribute('data-id');
    let products = JSON.parse(localStorage.getItem('products'));
    products = products.filter(p => p.id != productId);

    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(products);
}

document.getElementById('cancelEdit').onclick = function () {
    document.getElementById('editProductModal').style.display = 'none';
};

document.getElementById('resetProducts').addEventListener('click', function() {
    if (confirm('Weet je zeker dat je de producten wilt resetten naar de originele staat?')) {
        fetch('../products.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Netwerkfout bij het ophalen van products.json');
                }
                return response.json();
            })
            .then(productsFromJson => {
                displayProducts(productsFromJson);

               
            })
            .catch(error => {
                console.error('Fout bij het opnieuw laden van de producten:', error);
                alert('Er was een probleem met het opnieuw laden van de producten. Probeer het later opnieuw.');
            });
    }
});
