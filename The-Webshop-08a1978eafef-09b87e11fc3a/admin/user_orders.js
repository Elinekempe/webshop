document.addEventListener("DOMContentLoaded", function () {
    displayAllOrders();
});

// Functie om alle bestellingen weer te geven
function displayAllOrders() {
    const orderList = document.getElementById('orderList');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        orderList.innerHTML = "<tr><td colspan='5'>Er zijn nog geen bestellingen geplaatst.</td></tr>";
        return;
    }

    orderList.innerHTML = "";

    orders.forEach(order => {
        let productDetails = order.items.map(item => `
            <div>
                <img src="${item.image}" style="width: 40px;"> 
                ${item.quantity}x ${item.name} - €${item.price.toFixed(2)}
            </div>
        `).join("");

        const statusOptions = ["In behandeling", "Verzonden", "Afgeleverd"];
        const statusDropdown = `
            <select class="form-control order-status" data-id="${order.id}">
                ${statusOptions.map(status => `
                    <option value="${status}" ${order.status === status ? "selected" : ""}>${status}</option>
                `).join("")}
            </select>
        `;

        orderList.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${productDetails}</td>
                <td>€${order.totalPrice}</td>
                <td>${statusDropdown}</td>
                <td><button class="btn btn-danger delete-order" data-id="${order.id}">Verwijderen</button></td>
            </tr>
        `;
    });

    addOrderEventListeners();
}

// Eventlisteners voor het bijwerken van de status en het verwijderen van bestellingen
function addOrderEventListeners() {
    document.querySelectorAll('.order-status').forEach(select => {
        select.addEventListener('change', function () {
            updateOrderStatus(this.getAttribute('data-id'), this.value);
        });
    });

    document.querySelectorAll('.delete-order').forEach(button => {
        button.addEventListener('click', function () {
            deleteOrder(this.getAttribute('data-id'));
        });
    });
}

// Functie om de status van een bestelling bij te werken
function updateOrderStatus(orderId, newStatus) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = orders.findIndex(order => order.id == orderId);

    if (orderIndex > -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
    }
}

// Functie om een bestelling te verwijderen
function deleteOrder(orderId) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(order => order.id != orderId);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayAllOrders(); // Werk de weergave van de bestellingen bij
}

// Functie om een nieuwe bestelling toe te voegen aan de localStorage
function addNewOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayAllOrders();  // Werk de weergave van de orders bij
}