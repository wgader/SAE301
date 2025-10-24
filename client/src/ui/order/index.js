import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from './template.html?raw';

let OrderView = {
    html: function (order) {
        const date = new Date(order.created_at);
        const total = parseFloat(order.total).toFixed(2);
        
        const data = {
            'order-id': order.id,
            'order-number': order.id,
            'order-date': date.toLocaleDateString('fr-FR'),
            'order-total': total,
            'order-status': order.status
        };
        
        return genericRenderer(template, data);
    },
    
    dom: function (order) {
        const fragment = htmlToFragment(OrderView.html(order));
        
        const card = fragment.querySelector('.order-card');
        if (card) {
            let statusColor = '';
            if (order.status === 'En Cours') {
                statusColor = 'background-color: var(--clr-purple); color: var(--clr-white);';
            } else if (order.status === 'Validé') {
                statusColor = 'background-color: var(--clr-green); color: var(--clr-white);';
            } else if (order.status === 'Annulé') {
                statusColor = 'background-color: var(--clr-red); color: var(--clr-white);';
            }
            
            const statusSpan = card.querySelector('.order-status');
            if (statusSpan && statusColor) {
                statusSpan.setAttribute('style', statusColor);
            }
        }
        
        return fragment;
    }
};

export { OrderView };
