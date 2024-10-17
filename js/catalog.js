export async function loadCatalog(products, cart, totalPriceElement) {
    const root = document.getElementById('product-container');
    const showMoreButton = document.createElement('button');
    let currentProductIndex = 0;

    showMoreButton.textContent = 'Show More';
    showMoreButton.classList.add('show-more-button');
    root.appendChild(showMoreButton);

    function loadMoreProducts() {
        const endIndex = Math.min(currentProductIndex + 9, products.length);
        for (let i = currentProductIndex; i < endIndex; i++) {
            const product = products[i];
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img
                    src="${product.thumbnail}"
                    class="product-image"
                    alt="${product.title}"
                />
                <h2 class="title">${product.title}</h2>
                <p class="desc">${product.description}</p>
                <div class="price-cart">
                    <p class="price">$${product.price}</p>
                    <button class="buy-button">
                        <img src="./img/cart-icon.png" alt="cart icon" />
                    </button>
                </div>
            `;

            const buyButton = card.querySelector('.buy-button');
            buyButton.addEventListener('click', () => {
                cart.addToCart(product, totalPriceElement);
            });

            root.insertBefore(card, showMoreButton);
        }
        currentProductIndex += 9;
        if (currentProductIndex >= products.length) {
            showMoreButton.style.display = 'none';
        }
    }

    loadMoreProducts();
    showMoreButton.addEventListener('click', loadMoreProducts);
}
