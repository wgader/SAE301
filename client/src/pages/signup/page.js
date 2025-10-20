import { htmlToFragment } from "../../lib/utils.js";
import { SignUpView } from "../../ui/signup/index.js";
import template from "./template.html?raw";

let V = {};
V.init = function () {
  const page = htmlToFragment(template);
  const comp = SignUpView.dom();
  page.querySelector('slot[name="form"]').replaceWith(comp);
  return page;
};

export function SignUpPage() {
  return V.init();
}
