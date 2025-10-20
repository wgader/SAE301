import { htmlToFragment } from "../../lib/utils.js";
import { SignInView } from "../../ui/signin/index.js";
import template from "./template.html?raw";

let V = {};
V.create = function () {
  const page = htmlToFragment(template);
  const comp = SignInView.dom();
  page.querySelector('slot[name="form"]').replaceWith(comp);
  return page;
};

export function SignInPage() {
  return V.create();
}

