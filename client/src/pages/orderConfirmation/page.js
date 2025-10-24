import template from './template.html?raw';
import { getRequest } from '../../lib/api-request.js';
import { htmlToFragment } from '../../lib/utils.js';
import { OrderDetailView } from '../../ui/orderDetail/index.js';

let M = {
    order: null
};

let C = {};

C.init = async function(params) {
    const orderId = localStorage.getItem('lastOrderId');
    
    if (!orderId) {
        return V.initError();
    }
    
    M.order = await getRequest('orders/' + orderId);
    
    localStorage.removeItem('lastOrderId');
    
    if (!M.order) {
        return V.initError();
    }
    
    return V.init();
};

let V = {};

V.init = function() {
    const fragment = htmlToFragment(template);
    const slot = fragment.getElementById('order-detail');
    
    slot.appendChild(OrderDetailView.dom(M.order));
    
    return fragment;
};

V.initError = function() {
    const fragment = htmlToFragment(template);
    const slot = fragment.getElementById('order-detail');
    slot.innerHTML = '<p class="text-error">Commande introuvable</p>';
    return fragment;
};

export function OrderConfirmationPage(params) {
    return C.init(params);
}
