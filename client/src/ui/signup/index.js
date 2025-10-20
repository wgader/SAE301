import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const SignUpView = {
  dom() {
    return htmlToFragment(template);
  }
};

export { SignUpView };