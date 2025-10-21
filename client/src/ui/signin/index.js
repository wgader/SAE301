import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/auth.js";
import template from "./template.html?raw";

const SignInView = {
  dom() {
    const frag = htmlToFragment(template);
    const form = frag.querySelector('form');
    const errorDiv = frag.querySelector('#error-message');
    
    form.onsubmit = async (e) => {
      e.preventDefault();
      
      // Cacher le message d'erreur précédent
      errorDiv.classList.add('hidden');
      errorDiv.textContent = '';
      
      const email = form.email.value;
      const password = form.password.value;
      
      const result = await AuthData.login(email, password);
      
      if (result && result.success) {
        window.location.href = '/profile';
      } else if (result && result.error) {
        errorDiv.textContent = result.error;
        errorDiv.classList.remove('hidden');
      } else {
        errorDiv.textContent = 'Erreur de connexion';
        errorDiv.classList.remove('hidden');
      }
    };
    
    return frag;
  }
};

export { SignInView };
