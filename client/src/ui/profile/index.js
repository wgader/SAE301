import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

const ProfileView = {
  dom() {
    return htmlToFragment(template);
  }
};

export { ProfileView };
