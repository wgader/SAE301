import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProductView = {
  html: function (data) {
    let htmlString = '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">';
    for (let obj of data) {
      obj.image = (obj.images && obj.images.length > 0) ? obj.images[0] : 'default.png';
      htmlString  += genericRenderer(template, obj);
    }
    return htmlString + '</div>';
  },

  dom: function (data) {
    return htmlToFragment( ProductView.html(data) );
  }

};

export { ProductView };
