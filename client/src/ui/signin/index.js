import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const SignInView = {
  dom() {
    const frag = htmlToFragment(template);
    return frag;
  }
};

export { SignInView };
