import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/auth.js";
import template from "./template.html?raw";

const SignUpView = {
  dom() {
    const frag = htmlToFragment(template);
    const form = frag.querySelector('form');
    const errorDiv = frag.querySelector('#error-message');
    
    form.onsubmit = async (e) => {
      e.preventDefault();
      
      // Cacher le message d'erreur précédent
      errorDiv.classList.add('hidden');
      errorDiv.textContent = '';
      
      const firstname = form.firstname.value;
      const lastname = form.lastname.value;
      const email = form.email.value;
      const password = form.password.value;
      const civ = form.civ.value;
      
      const result = await AuthData.signup(firstname, lastname, civ, email, password);
      
      if (result && result.id) {
        window.location.href = '/signin';
      } else if (result && result.error) {
        errorDiv.textContent = result.error;
        errorDiv.classList.remove('hidden');
      } else {
        errorDiv.textContent = 'Erreur lors de la création du compte';
        errorDiv.classList.remove('hidden');
      }
    };
    
    return frag;
  }
};

export { SignUpView };