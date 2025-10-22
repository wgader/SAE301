import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/auth.js";
import template from "./template.html?raw";

let V = {};

V.render = function(user) {
  let html = template.replace('{{name}}', user.firstname);
  const frag = htmlToFragment(html);

  const logoutBtn = frag.querySelector('#logout-btn');
  
  logoutBtn.addEventListener('click', async () => {
    await AuthData.logout();
    window.location.href = '/signin';
  });
  return frag;
};

export async function ProfilePage() {
  const result = await AuthData.getCurrentUser();
  
  if (!result || !result.authenticated) {
    window.location.href = '/signin';
    return;
  }
  
  return V.render(result.user);
}
