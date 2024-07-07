document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');

    const cartItems = [
        {
            name: 'Shirt',
            price: 899,
            quantity: 1,
            image: './assests/shirt1.jpeg'
        },
        {
            name: 'Trousers',
            price: 999,
            quantity: 1,
            image: './assests/trouser5.jpeg'
        }
    ];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <label for="quantity-${item.name}">Quantity:</label>
                    <input type="number" id="quantity-${item.name}" name="quantity" min="1" value="${item.quantity}" data-name="${item.name}">
                    <button class="btn btn-remove" data-name="${item.name}">Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.10;
        const shipping = subtotal > 1000 ? 0 : 50;
        const total = subtotal + tax + shipping;

        subtotalElement.textContent = subtotal.toFixed(2);
        taxElement.textContent = tax.toFixed(2);
        shippingElement.textContent = shipping.toFixed(2);
        totalElement.textContent = total.toFixed(2);
        cartCount.textContent = cartItems.length;
    }

    cartItemsContainer.addEventListener('input', function(event) {
        if (event.target.name === 'quantity') {
            const itemName = event.target.dataset.name;
            const newQuantity = parseInt(event.target.value);
            const itemIndex = cartItems.findIndex(item => item.name === itemName);
            if (itemIndex !== -1 && newQuantity > 0) {
                cartItems[itemIndex].quantity = newQuantity;
                updateCart();
            }
        }
    });

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-remove')) {
            const itemName = event.target.dataset.name;
            const itemIndex = cartItems.findIndex(item => item.name === itemName);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
                updateCart();
            }
        }
    });

    updateCart();
});
