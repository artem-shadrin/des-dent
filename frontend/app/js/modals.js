import {getConfig} from "./utils/getConfig";
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

export const els = {
  modal: "[data-js-modal]",
  openButton: "[data-js-modal-open-button]",
  closeButton: "[data-js-modal-close-button]"
};

export default class Modals {
  constructor() {
    this.bindEvents();
  }

  static closeLastModal() {
    const allOpenedModals = document.querySelectorAll(`[id^="fancybox-"]`);
    const lastModal = [...allOpenedModals].at(-1);
    if (!lastModal) return;
    const lastModalFancyboxInstance = lastModal.Fancybox;
    if (lastModalFancyboxInstance) {
      lastModalFancyboxInstance.close();
    }
  }

  handleOpenButtonClick(event) {
    event.preventDefault();
    const config = getConfig(event.target, els.openButton);
    const {src} = config;

    if (!src) {
      console.debug("Selector is not found in data-js attribute of element:");
      console.debug(event.target);
      return;
    }

    const modalElement = document.querySelector(src);
    if (!modalElement) {
      console.debug(`Modal element by '${src}' selector is not found!`);
      return;
    }

    Fancybox.show([{src, type: "inline"}], config);
    if (config.id) {
      const select = modalElement.querySelector("select");
      select.disabled = true;
      select.innerHTML = `<option value="${config.id}" selected>${config.id}</option>`;
      console.debug(select, config.id);
    }

    if (config.id_service) {
      const select = modalElement.querySelector("#service-id");
      select.value = config.id_service;
      console.debug(select, config.id);
    }
  }

  handleCloseButtonClick(event) {
    event.preventDefault();
    Modals.closeLastModal();
  }

  handleClick(event) {
    const {target} = event;
    const isMatches = (selector) => target.matches(selector);

    switch (true) {
      case isMatches(els.openButton): {
        this.handleOpenButtonClick(event);
        break;
      }
      case isMatches(els.closeButton): {
        this.handleCloseButtonClick(event);
        break;
      }
      default: {
        break;
      }
    }
  }

  bindEvents() {
    document.addEventListener("click", (event) => {
      this.handleClick(event);
    });
  }
}