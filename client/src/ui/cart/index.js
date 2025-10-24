import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import itemTemplate from "./item.template.html?raw";
import emptyTemplate from "./empty.template.html?raw";

let CartView = {
  html: function (cartData) {
    if (!cartData || !cartData.items || cartData.items.length === 0) {
      return emptyTemplate;
    }

    const itemsCount = cartData.items.length;
    const itemsCountLabel = itemsCount > 1 ? 'articles' : 'article';
    const subtotal = cartData.total.toFixed(2);
    const shippingLabel = cartData.total >= 50 ? 'Offerts' : '5,00 €';
    const shipping = cartData.total >= 50 ? 0 : 5;
    const total = (cartData.total + shipping).toFixed(2);

    const itemsHtml = cartData.items.map(item => CartItemView.html(item)).join('');

    const data = {
      itemsCount: itemsCount,
      itemsCountLabel: itemsCountLabel,
      subtotal: subtotal,
      shippingLabel: shippingLabel,
      total: total
    };

    let html = genericRenderer(template, data);
    const fragment = htmlToFragment(html);
    const slot = fragment.querySelector('slot[name="items"]');
    if (slot) {
      const itemsFragment = htmlToFragment(itemsHtml);
      slot.replaceWith(itemsFragment);
    }
    return fragment.innerHTML || html;
  },

  dom: function (cartData) {
    return htmlToFragment(CartView.html(cartData));
  }
};

let CartItemView = {
  html: function (item) {
    const unitPrice = parseFloat(item.price).toFixed(2);
    const lineTotal = (item.price * item.quantity).toFixed(2);

    const data = {
      id: item.id,
      image: item.image || 'default.png',
      name: item.name,
      description: item.description || '',
      unitPrice: unitPrice,
      lineTotal: lineTotal,
      q1: item.quantity === 1 ? ' selected' : '',
      q2: item.quantity === 2 ? ' selected' : '',
      q3: item.quantity === 3 ? ' selected' : '',
      q4: item.quantity === 4 ? ' selected' : '',
      q5: item.quantity === 5 ? ' selected' : ''
    };

    return genericRenderer(itemTemplate, data);
  }
};

export { CartView, CartItemView };
