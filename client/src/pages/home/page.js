import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import { AuthData } from "../../data/auth.js";

const V = {};

V.init = async function() {
    const frag = htmlToFragment(template);
    
    // Récupérer l'utilisateur connecté
    try {
        const result = await AuthData.getCurrentUser();
        
        if (result && result.authenticated && result.user) {
            const user = result.user;
            const firstname = user.firstname || '';
            
            // Modifier le titre pour afficher le prénom
            const title = frag.querySelector('h1');
            if (title && firstname) {
                title.textContent = `Ravie de vous revoir ${firstname}`;
            }
        }
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur:", err);
    }
    
    return frag;
};

export async function HomePage(){
    return await V.init();
}
