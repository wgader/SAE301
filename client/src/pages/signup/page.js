import { htmlToFragment } from "../../lib/utils.js";
import { SignUpView } from "../../ui/signup/index.js";
import { AuthData } from "../../data/auth.js";
import template from "./template.html?raw";

let C = {};

C.handleFormSubmit = async function(e) {
  e.preventDefault();
  e.stopPropagation();

  const form = e.target;
  const errorDiv = form.querySelector('#error-message');
  
  errorDiv.classList.add('hidden');
  errorDiv.textContent = '';
  
  const password = form.password.value;
  
  // Validation mot de passe
  if (password.length < 12) {
    errorDiv.textContent = 'Le mot de passe doit contenir au moins 12 caractères';
    errorDiv.classList.remove('hidden');
    return;
  }
  if (!/[A-Z]/.test(password)) {
    errorDiv.textContent = 'Le mot de passe doit contenir au moins une majuscule';
    errorDiv.classList.remove('hidden');
    return;
  }
  if (!/[a-z]/.test(password)) {
    errorDiv.textContent = 'Le mot de passe doit contenir au moins une minuscule';
    errorDiv.classList.remove('hidden');
    return;
  }
  if (!/[0-9]/.test(password)) {
    errorDiv.textContent = 'Le mot de passe doit contenir au moins un chiffre';
    errorDiv.classList.remove('hidden');
    return;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errorDiv.textContent = 'Le mot de passe doit contenir au moins un caractère spécial';
    errorDiv.classList.remove('hidden');
    return;
  }
  
  let formData = new FormData(form);
  const data = {
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
    civ: formData.get('civ'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  const result = await AuthData.signup(data);
  
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

C.handlePasswordInput = function(e) {
  const password = e.target.value;
  const form = e.target.closest('form');
  
  const length = form.querySelector('#rule-length');
  const uppercase = form.querySelector('#rule-uppercase');
  const lowercase = form.querySelector('#rule-lowercase');
  const number = form.querySelector('#rule-number');
  const special = form.querySelector('#rule-special');
  
  // Longueur
  if (password.length >= 12) {
    length.classList.add('password-rule-valid');
    length.classList.remove('password-rule-invalid');
  } else {
    length.classList.remove('password-rule-valid');
    length.classList.add('password-rule-invalid');
  }
  
  // Majuscule
  if (/[A-Z]/.test(password)) {
    uppercase.classList.add('password-rule-valid');
    uppercase.classList.remove('password-rule-invalid');
  } else {
    uppercase.classList.remove('password-rule-valid');
    uppercase.classList.add('password-rule-invalid');
  }
  
  // Minuscule
  if (/[a-z]/.test(password)) {
    lowercase.classList.add('password-rule-valid');
    lowercase.classList.remove('password-rule-invalid');
  } else {
    lowercase.classList.remove('password-rule-valid');
    lowercase.classList.add('password-rule-invalid');
  }
  
  // Chiffre
  if (/[0-9]/.test(password)) {
    number.classList.add('password-rule-valid');
    number.classList.remove('password-rule-invalid');
  } else {
    number.classList.remove('password-rule-valid');
    number.classList.add('password-rule-invalid');
  }
  
  // Spécial
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    special.classList.add('password-rule-valid');
    special.classList.remove('password-rule-invalid');
  } else {
    special.classList.remove('password-rule-valid');
    special.classList.add('password-rule-invalid');
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
  const passwordInput = page.querySelector('#sn-pass');
  const toggleButton = page.querySelector('#toggle-password');
  
  if (form) {
    form.addEventListener('submit', C.handleFormSubmit);
  }
  if (passwordInput) {
    passwordInput.addEventListener('input', C.handlePasswordInput);
  }
  if (toggleButton) {
    toggleButton.addEventListener('click', C.togglePassword);
  }
};


V.init = function () {
  const page = htmlToFragment(template);
  const comp = SignUpView.dom();
  page.querySelector('slot[name="form"]').replaceWith(comp);
  // Important: attacher les événements APRÈS avoir remplacé le slot
  V.attachEvents(page);
  return page;
};

export function SignUpPage() {
  return V.init();
}
