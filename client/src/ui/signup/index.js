import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const SignUpView = {
  dom() {
    const frag = htmlToFragment(template);
    return frag;
  }
};

export { SignUpView };