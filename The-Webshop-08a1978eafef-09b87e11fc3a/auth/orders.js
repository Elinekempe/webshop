document.addEventListener("DOMContentLoaded", function () {
    displayOrders();
});

function displayOrders() {
    const ordersList = document.getElementById('orders-list');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        ordersList.innerHTML = "<p>Je hebt nog geen bestellingen geplaatst.</p>";
        return;
    }

    orders.forEach(order => {
        let orderHtml = `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <strong>Bestelling #${order.id}</strong> - ${order.date} 
                </div>
                <div class="panel-body">
                    <ul class="list-group">
        `;

        order.items.forEach(item => {
            orderHtml += `
                <li class="list-group-item">
                    <img src="${item.image}" style="width: 50px;"> 
                    ${item.name} - ${item.quantity} x $${item.price.toFixed(2)} 
                    <strong>Subtotaal: $${(item.price * item.quantity).toFixed(2)}</strong>
                </li>
            `;
        });

        orderHtml += `
                    </ul>
                    <strong>Totaalbedrag: $${order.totalPrice}</strong>
                </div>
            </div>
        `;

        ordersList.innerHTML += orderHtml;
    });
}
