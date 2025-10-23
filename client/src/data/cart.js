let CartData = {};

let items = [];

// Charger le panier
function load() {
    let stored = localStorage.getItem('cart');
    if (stored) {
        items = JSON.parse(stored);
    }
}

// Sauvegarder le panier
function save() {
    localStorage.setItem('cart', JSON.stringify(items));
}

// Calculer les totaux
function calcTotals() {
    let subtotal = 0;
    for (let item of items) {
        subtotal += item.price * item.quantity;
    }
    
    let shipping = subtotal >= 80 ? 0 : (items.length > 0 ? 4.90 : 0);
    let total = subtotal + shipping;
    
    return { subtotal, shipping, total };
}

// Ajouter un produit
CartData.addItem = function(product) {
    const existing = items.find(item => item.id === product.id);
    
    if (existing) {
        if (existing.quantity < 5) {
            existing.quantity++;
        }
    } else {
        items.push({
            id: product.id,
            name: product.name || 'Produit',
            description: product.description || '',
            image: product.image || 'default.png',
            price: product.price || 0,
            quantity: 1
        });
    }
    
    save();
    return true;
};

// Changer la quantité
CartData.updateQuantity = function(productId, quantity) {
    let item = items.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        save();
    }
};

// Supprimer un article
CartData.removeItem = function(productId) {
    items = items.filter(item => item.id !== productId);
    save();
};

// Vider le panier
CartData.clear = function() {
    items = [];
    save();
};

// Vider le panier (alias)
CartData.clearCart = function() {
    items = [];
    save();
};

// Récupérer les articles
CartData.getItems = function() {
    return items;
};

// Compter les articles
CartData.getItemCount = function() {
    let count = 0;
    for (let item of items) {
        count += item.quantity;
    }
    return count;
};

// Panier vide ?
CartData.isEmpty = function() {
    return items.length === 0;
};

// État complet
CartData.getState = function() {
    let totals = calcTotals();
    return {
        items: items,
        itemCount: CartData.getItemCount(),
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        total: totals.total,
        isEmpty: items.length === 0
    };
};

// Charger au démarrage
load();

export { CartData };
