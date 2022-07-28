import Validation from "./validation";
import FormSend from "./send";
import { getJs } from "../utils/getJs";

export default class Forms {
  static instance = "[data-js-form]";
  static els = {
    input: "[data-js-input-validate]",
    captcha: "[data-js-input-captcha]",
  };
  static stateClasses = {
    invalid: "is-valid",
  };

  constructor() {
    this.load();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    if (e.target.matches(Forms.instance)) {
      e.preventDefault();
      if (Validation.isValid(e.target)) {
        FormSend.send(e.target)
          .then((json) => FormSend.onSuccess(json))
          .catch((err) => FormSend.onError(err));
      }
    }
  }

  load() {
    if (window.grecaptcha) {
      this.init();
    } else {
      getJs({ src: Forms.grecaptchaUrlAPI })
        .then((res) => {
          this.init();
        })
        .catch((err) => console.debug(err));
    }
  }
  loadImask() {}

  static grecaptchaUrlAPI = "https://www.google.com/recaptcha/api.js";
}
