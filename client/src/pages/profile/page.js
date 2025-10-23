import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import { ProfileView } from "../../ui/profile/index.js";
import { AuthData } from "../../data/auth.js";

const C = {};

// Soumission du formulaire des informations de base
C.handleInfoFormSubmit = async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const form = e.target;
  const formData = new FormData(form);
  const data = {
    civ: formData.get('civ'),
    lastname: formData.get('lastname'),
    firstname: formData.get('firstname'),
    email: formData.get('email')
  };

  let result;
  try {
    result = await AuthData.updateProfile(data);
  } catch (err) {
    console.error("Erreur:", err);
    alert("Erreur réseau");
    return;
  }

  if (result && result.success) {
    alert("Profil mis à jour avec succès !");
  } else {
    const msg = (result && result.error) ? result.error : "Impossible de mettre à jour le profil";
    alert(msg);
  }
};

// Soumission du formulaire de changement de mot de passe
C.handlePasswordFormSubmit = async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const form = e.target;
  const formData = new FormData(form);
  const currentPassword = formData.get('current_password');
  const newPassword = formData.get('new_password');

  let result;
  try {
    result = await AuthData.changePassword(currentPassword, newPassword);
  } catch (err) {
    console.error("Erreur:", err);
    alert("Erreur réseau");
    return;
  }

  if (result && result.success) {
    alert("Mot de passe changé avec succès !");
    form.reset();
    // Réinitialiser les règles de validation
    const rules = form.querySelectorAll('[id^="rule-"]');
    rules.forEach(rule => {
      rule.classList.remove('password-rule-valid');
      rule.classList.add('password-rule-invalid');
    });
  } else {
    const msg = (result && result.error) ? result.error : "Impossible de changer le mot de passe";
    alert(msg);
  }
};

// Suppression du compte
C.handleDeleteAccount = async function (e) {
  e.preventDefault();
  
  const confirmed = confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte ?");
  
  if (!confirmed) {
    return;
  }
  
  let result;
  try {
    result = await AuthData.deleteAccount();
  } catch (err) {
    console.error("Erreur:", err);
    alert("Erreur réseau lors de la suppression du compte");
    return;
  }
  
  if (result) {
    alert("Votre compte a été supprimé avec succès");
    // Rediriger vers la page d'accueil
    window.location.href = "/";
  } else {
    alert("Erreur lors de la suppression du compte");
  }
};

// Afficher/masquer un champ mot de passe
C.togglePassword = function (e) {
  const button = e.currentTarget;
  const wrapper = button.closest('.relative');
  const input = wrapper ? wrapper.querySelector("input[type='password'], input[type='text']") : null;
  const eyeClosed = button.querySelector('.eye-icon:not(.hidden)');
  const eyeOpen = button.querySelector('.eye-icon.hidden');
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    if (eyeClosed) eyeClosed.classList.add("hidden");
    if (eyeOpen) eyeOpen.classList.remove("hidden");
  } else {
    input.type = "password";
    if (eyeOpen) eyeOpen.classList.add("hidden");
    if (eyeClosed) eyeClosed.classList.remove("hidden");
  }
};

// Validation visuelle du nouveau mot de passe
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

const V = {};

// Charge et affiche les données de l'utilisateur
V.loadUserData = async function(page) {
  try {
    const result = await AuthData.getCurrentUser();
    
    if (!result || !result.authenticated || !result.user) {
      console.error("Utilisateur non connecté");
      window.location.href = "/signin";
      return;
    }
    
    const user = result.user;
    
    // Remplir les champs du formulaire
    const civRadio = page.querySelector(`input[name="civ"][value="${user.civ}"]`);
    if (civRadio) civRadio.checked = true;
    
    const lastnameInput = page.querySelector('#lastname');
    if (lastnameInput) lastnameInput.value = user.lastname || '';
    
    const firstnameInput = page.querySelector('#firstname');
    if (firstnameInput) firstnameInput.value = user.firstname || '';
    
    const emailInput = page.querySelector('#email');
    if (emailInput) emailInput.value = user.email || '';
    
  } catch (err) {
    console.error("Erreur lors du chargement des données:", err);
  }
};

V.attachEvents = function (page) {
  // Formulaire des informations de base
  const formInfo = page.querySelector("#form-profile-info");
  if (formInfo) {
    formInfo.addEventListener("submit", C.handleInfoFormSubmit);
  }
  
  // Formulaire du mot de passe
  const formPassword = page.querySelector("#form-profile-password");
  if (formPassword) {
    formPassword.addEventListener("submit", C.handlePasswordFormSubmit);
  }

  // Toggle password pour mot de passe actuel
  const toggleCurrent = page.querySelector("#toggle-current-password");
  if (toggleCurrent) {
    toggleCurrent.addEventListener("click", C.togglePassword);
  }
  
  // Toggle password pour nouveau mot de passe
  const toggleNew = page.querySelector("#toggle-new-password");
  if (toggleNew) {
    toggleNew.addEventListener("click", C.togglePassword);
  }
  
  // Validation visuelle du nouveau mot de passe
  const newPasswordInput = page.querySelector("#new-password");
  if (newPasswordInput) {
    newPasswordInput.addEventListener("input", C.handlePasswordInput);
  }
  
  // Bouton de suppression de compte
  const deleteAccountBtn = page.querySelector("#delete-account");
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", C.handleDeleteAccount);
  }
};

V.init = async function () {
  // wrapper
  const frag = htmlToFragment(template);
  // injecte la vue formulaire dans le slot
  const slot = frag.querySelector('slot[name="form"]');
  if (slot) slot.replaceWith(ProfileView.dom());
  
  // Charger les données de l'utilisateur
  await V.loadUserData(frag);
  
  // attache les events
  V.attachEvents(frag);
  return frag;
};

export async function ProfilePage() {
  return await V.init();
}