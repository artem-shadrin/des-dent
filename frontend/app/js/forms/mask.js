import { getJs } from "../utils/getJs";

export default class Masks {
  constructor() {
    this.load();
  }

  init() {
    this.mask("phone", {
      mask: "+{7}(000)000-00-00",
    });
    this.mask("email", {
      mask: function (value) {
        if (/^[a-z0-9_\.-]+$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
          return true;
        return false;
      },
    });
  }

  mask(dataValue, options) {
      const elements = document.querySelectorAll(`[data-mask="${dataValue}"]`);
    if (!elements) return;

    elements.forEach((el) => {
      window.IMask(el, options); 
    });
  }

  load() {
    if (window.IMask === "function") {
      this.init();
    } else {
      getJs({ src: Masks.urlAPI })
        .then((res) => {
          this.init();
        })
        .catch((err) => console.debug(err));
    }
  }

  static urlAPI = "https://unpkg.com/imask";
}
