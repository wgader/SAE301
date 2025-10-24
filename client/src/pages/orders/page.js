import template from './template.html?raw';
import { getRequest } from '../../lib/api-request.js';
import { AuthData } from '../../data/auth.js';
import { htmlToFragment } from '../../lib/utils.js';
import { OrderView } from '../../ui/order/index.js';

let M = {
    orders: []
};

let C = {};

C.init = async function(params) {
    const result = await AuthData.getCurrentUser();
    
    if (!result || !result.authenticated) {
        window.location.href = '/signin';
        return;
    }
    
    M.orders = await getRequest('orders?user_id=' + result.user.id);
    
    if (!M.orders || M.orders.length === 0) {
        return V.initEmpty();
    }
    
    return V.init();
};

C.handleOrderClick = function(e) {
    const orderId = e.currentTarget.dataset.orderId;
    localStorage.setItem('lastOrderId', orderId);
    window.location.href = '/order-confirmation';
};

let V = {};

V.init = function() {
    const fragment = htmlToFragment(template);
    const ordersList = fragment.getElementById('orders-list');
    
    M.orders.forEach(order => {
        ordersList.appendChild(OrderView.dom(order));
    });
    
    ordersList.querySelectorAll('.order-card').forEach(card => {
        card.addEventListener('click', C.handleOrderClick);
    });
    
    return fragment;
};

V.initEmpty = function() {
    const fragment = htmlToFragment(template);
    fragment.getElementById('orders-list').classList.add('hidden');
    fragment.getElementById('no-orders').classList.remove('hidden');
    return fragment;
};

export function OrdersPage(params) {
    return C.init(params);
}