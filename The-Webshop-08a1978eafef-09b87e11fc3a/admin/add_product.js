const productData = JSON.parse(localStorage.getItem('products')) || [
    {
        "id": 1,
        "name": "Cola Cherry Mix",
        "description": "Heerlijke cola en kersen mix.",
        "price": 10.99,
        "image": "images/colacherry.jpg",
        "category": ["gummy", "cola", "kers", "500g"]
    },
];

document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productImage = document.getElementById('productImage').files[0];
    const productCategory = document.getElementById('productCategory').value.split(',').map(item => item.trim());

    if (productData.some(product => product.id == productId)) {
        alert('Een product met dit ID bestaat al! Kies een ander ID.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function () {
        const newProduct = {
            id: productId,
            name: productName,
            description: productDescription,
            price: productPrice,
            image: reader.result,
            category: productCategory
        };

        productData.push(newProduct);

        localStorage.setItem('products', JSON.stringify(productData));

        alert('Product toegevoegd!');
        document.getElementById('addProductForm').reset();
        document.getElementById('imagePreview').style.display = 'none';

        window.location.href = "products.html";
    };

    if (productImage) {
        reader.readAsDataURL(productImage);
    }
});

document.getElementById('productImage').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            preview.src = event.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
});
