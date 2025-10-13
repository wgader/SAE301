import { ProductData } from "../data/product.js";
import { ProductView } from "../ui/product/index.js";


let M = {
    products: []
};


let C = {};

C.init = async function(){
    M.products = await ProductData.fetchAll();
    V.init( M.products );
}


let V = {};

V.init = function( data ){
    let app = document.querySelector("#app");
    app.innerHTML = ProductView.render(data);
}

export function ProductPage() {
    C.init();
}