import { htmlToFragment } from "../../lib/utils.js";
import { SignInView } from "../../ui/signin/index.js";
import { AuthData } from "../../data/auth.js";
import template from "./template.html?raw";

let C = {};

C.handleFormSubmit = async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const form = e.target;
  const errorDiv = form.querySelector("#error-message"); 
  errorDiv.classList.add("hidden");
  errorDiv.textContent = "";
  
  let formData = new FormData(form);
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  };
  
  const result = await AuthData.login(data);
  
  if (result && result.success) {
    window.location.href = "/profile";
  } else if (result && result.error) {
    errorDiv.textContent = result.error;
    errorDiv.classList.remove("hidden");
  } else {
    errorDiv.textContent = "Erreur de connexion";
    errorDiv.classList.remove("hidden");
  }
};

C.togglePassword = function(e) {
  const button = e.currentTarget;
  const passwordInput = button.closest('.relative').querySelector('input');
  const eyeClosed = button.querySelector('#eye-closed');
  const eyeOpen = button.querySelector('#eye-open');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeClosed.classList.add('hidden');
    eyeOpen.classList.remove('hidden');
  } else {
    passwordInput.type = 'password';
    eyeClosed.classList.remove('hidden');
    eyeOpen.classList.add('hidden');
  }
};

let V = {};

V.attachEvents = function(page) {
  const form = page.querySelector('form');
  const toggleButton = page.querySelector('#toggle-password');
  
  form.addEventListener('submit', C.handleFormSubmit);
  toggleButton.addEventListener('click', C.togglePassword);
};

V.init = function () {
  const page = htmlToFragment(template);
  const comp = SignInView.dom();
  page.querySelector('slot[name="form"]').replaceWith(comp);
  V.attachEvents(page);
  return page;
};

export function SignInPage() {
  return V.init();
}

