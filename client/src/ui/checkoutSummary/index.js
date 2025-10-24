import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from './template.html?raw';

let CheckoutSummaryView = {
    html: function (cartData) {
        const total = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const data = {
            'cart-count': cartData.length,
            'cart-total': total.toFixed(2)
        };
        
        return genericRenderer(template, data);
    },
    
    dom: function (cartData) {
        return htmlToFragment(CheckoutSummaryView.html(cartData));
    }
};

export { CheckoutSummaryView };
