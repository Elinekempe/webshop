// Voeg een product toe aan de bestaande JSON-array
const productData = JSON.parse(localStorage.getItem('products')) || [
    {
        "id": 1,
        "name": "Cola Cherry Mix",
        "description": "Heerlijke cola en kersen mix.",
        "price": 10.99,
        "image": "images/colacherry.jpg",
        "category": ["gummy", "cola", "kers", "500g"]
    },
    // Voeg hier je andere producten toe ...
];

document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Verkrijg waarden van het formulier
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productImage = document.getElementById('productImage').files[0]; // Verkrijg het bestand
    const productCategory = document.getElementById('productCategory').value.split(',').map(item => item.trim());

    // Controleer of het product-ID al bestaat
    if (productData.some(product => product.id == productId)) {
        alert('Een product met dit ID bestaat al! Kies een ander ID.');
        return;
    }

    // Verwerk de afbeelding als een base64-gecodeerde string (voor tijdelijke opslag)
    const reader = new FileReader();
    reader.onloadend = function () {
        const newProduct = {
            id: productId,
            name: productName,
            description: productDescription,
            price: productPrice,
            image: reader.result, // Gebruik de base64 afbeelding hier
            category: productCategory
        };

        // Voeg het nieuwe product **achteraan** toe aan de array
        productData.push(newProduct);

        // Bewaar de nieuwe array in localStorage
        localStorage.setItem('products', JSON.stringify(productData));

        alert('Product toegevoegd!');
        document.getElementById('addProductForm').reset();
        document.getElementById('imagePreview').style.display = 'none'; // Verberg de preview na toevoeging

        // Ga terug naar de productpagina
        window.location.href = "products.html";
    };

    if (productImage) {
        reader.readAsDataURL(productImage); // Converteer de afbeelding naar base64
    }
});

// Laat een preview zien van de afbeelding als deze wordt geselecteerd
document.getElementById('productImage').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            preview.src = event.target.result;
            preview.style.display = 'block'; // Toon de afbeelding
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none'; // Verberg de preview als er geen bestand is geselecteerd
    }
});
