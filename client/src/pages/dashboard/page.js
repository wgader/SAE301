import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/auth.js";
import template from "./template.html?raw";
import { DashboardView } from "../../ui/dashboard/index.js";

let V = {};

V.render = function(user) {
  let html = template.replace('{{name}}', user.firstname);  
  const frag = htmlToFragment(html);
  // Insérer les cartes du dashboard
  const slot = frag.querySelector('slot[name="dashboard-cards"]');
  if (slot) {
    slot.replaceWith(DashboardView.dom());
  }

  // Gérer la déconnexion
  const logoutBtn = frag.querySelector('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await AuthData.logout();
      window.location.href = '/signin';
    });
  }

  return frag;
};

export async function DashboardPage() {
  const result = await AuthData.getCurrentUser();
  
  if (!result || !result.authenticated) {
    window.location.href = '/signin';
    return;
  }
  
  return V.render(result.user);
}
