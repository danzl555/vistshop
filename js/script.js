import { loadCatalog } from './catalog.js';
import { Cart } from './bascket.js';
import '../card/style.css';
import '../bascket/style.css';
import '../style.css';



async function loadProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const products = data.products;

        const cart = new Cart();
        const totalPriceElement = document.querySelector('.total__price');
        const checkoutButton = document.querySelector('.checkout-btn');

        cart.initFromLocalStorage();
        loadCatalog(products, cart, totalPriceElement);

        checkoutButton.addEventListener('click', () => {
            cart.checkout(totalPriceElement);
        });
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    }
}

//window.onload = loadProducts;
window.addEventListener("DOMContentLoaded",(event) => {
    loadProducts();
    console.log('load')
});