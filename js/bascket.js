export class Cart {
    constructor() {
        this.cartItems = {};
        this.total = 0;
        this.cart = document.querySelector('.product-cart-bascket');
    }

    initFromLocalStorage() {
        if (localStorage.getItem('cartItems')) {
            this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
            Object.values(this.cartItems).forEach(item => {
                this.displayCartItem(item.product, item.quantity);
                this.total += item.quantity * item.product.price;
            });
        }
    }

    addToCart(product, totalPriceElement) {
        if (this.cartItems[product.id]) {
            this.cartItems[product.id].quantity++;
            const itemElement = this.cart.querySelector(`.cart-item-${product.id}`);
            const quantityElement = itemElement.querySelector('.quantity');
            const priceElement = itemElement.querySelector('.price');
            quantityElement.textContent = `x${this.cartItems[product.id].quantity}`;
            priceElement.textContent = `$${(this.cartItems[product.id].quantity * product.price).toFixed(2)}`;
        } else {
            this.cartItems[product.id] = { product, quantity: 1 };
            this.displayCartItem(product, 1);
        }

        this.total += product.price;
        this.updateTotalPrice(totalPriceElement);
        this.saveToLocalStorage();
    }

    displayCartItem(product, quantity) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('product-card', `cart-item-${product.id}`);

        cartItem.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" />
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="quantity">x${quantity}</p>
                <p class="price">$${(quantity * product.price).toFixed(2)}</p>
            </div>
            <span class="close-btn">&times;</span>
        `;

        const closeBtn = cartItem.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            this.removeFromCart(product.id);
        });

        this.cart.appendChild(cartItem);
    }

    removeFromCart(productId) {
        const cartItem = this.cart.querySelector(`.cart-item-${productId}`);
        const quantity = this.cartItems[productId].quantity;
        const productPrice = this.cartItems[productId].product.price;

        this.total -= productPrice * quantity;
        cartItem.remove();
        delete this.cartItems[productId];

        this.updateTotalPrice(document.querySelector('.total__price'));
        this.saveToLocalStorage();
    }

    updateTotalPrice(totalPriceElement) {
        totalPriceElement.textContent = `$${this.total.toFixed(2)}`;
    }

    saveToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }

    checkout(totalPriceElement) {
        this.cartItems = {};
        this.total = 0;
        this.cart.innerHTML = '';
        this.updateTotalPrice(totalPriceElement);
        localStorage.removeItem('cartItems');
    }
}
