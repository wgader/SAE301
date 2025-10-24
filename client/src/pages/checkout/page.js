import template from './template.html?raw';
import { CartData } from '../../data/cart.js';
import { AuthData } from '../../data/auth.js';
import { postRequest } from '../../lib/api-request.js';
import { htmlToFragment } from '../../lib/utils.js';
import { CheckoutSummaryView } from '../../ui/checkoutSummary/index.js';

let M = {
    cart: {}
};

let C = {};

C.handleValidate = async function() {
    const result = await AuthData.getCurrentUser();
    if (!result || !result.authenticated) {
        window.location.href = '/signin';
        return;
    }

    const orderData = {
        user_id: result.user.id,
        total: M.cart.total,
        items: M.cart.items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price
        }))
    };

    console.log('Envoi commande:', orderData);
    const order = await postRequest('orders', JSON.stringify(orderData));
    console.log('Réponse complète:', order);
    console.log('order.id:', order ? order.id : 'order est null');
    console.log('Type de order.id:', typeof (order ? order.id : null));
    
    if (order && order.id) {
        localStorage.setItem('lastOrderId', order.id);
        CartData.clear();
        window.location.href = '/order-confirmation';
    } else {
        console.error('Pas d\'ID dans la réponse!', order);
        alert('Erreur lors de la validation');
    }
};

C.init = async function() {
    M.cart = CartData.getState();
    
    if (M.cart.isEmpty) {
        window.location.href = '/cart';
        return;
    }
    
    return V.init();
};

let V = {};

V.init = function() {
    const fragment = htmlToFragment(template);
    
    const summaryContainer = fragment.getElementById('checkout-summary');
    summaryContainer.appendChild(CheckoutSummaryView.dom(M.cart.items));
    
    const validateBtn = fragment.getElementById('validate-order');
    validateBtn.addEventListener('click', C.handleValidate);
    
    return fragment;
};

export function CheckoutPage() {
    return C.init();
}
