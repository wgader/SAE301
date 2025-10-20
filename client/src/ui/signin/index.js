import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const SignInView = {
  dom() {
    return htmlToFragment(template);
  }
};

export { SignInView };