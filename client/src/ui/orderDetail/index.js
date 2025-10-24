import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from './template.html?raw';

let OrderDetailView = {
    html: function (order) {
        const date = new Date(order.created_at);
        const total = parseFloat(order.total).toFixed(2);
        
        let itemsHtml = '';
        if (order.items && order.items.length > 0) {
            itemsHtml = order.items.map(item => `
                <p class="flex justify-between py-2 border-t border-black/10">
                    <span>${item.product_name || 'Produit'} x ${item.quantity}</span>
                    <span class="font-semibold">${parseFloat(item.unit_price).toFixed(2)} €</span>
                </p>
            `).join('');
        }
        
        const data = {
            'order-number': order.id,
            'order-date': date.toLocaleDateString('fr-FR'),
            'order-status': order.status,
            'order-total': total
        };
        
        let html = genericRenderer(template, data);
        const fragment = htmlToFragment(html);
        const slot = fragment.querySelector('section[id="order-items"]');
        if (slot && itemsHtml) {
            slot.innerHTML = itemsHtml;
        }
        return fragment.innerHTML || html;
    },
    
    dom: function (order) {
        return htmlToFragment(OrderDetailView.html(order));
    }
};

export { OrderDetailView };

