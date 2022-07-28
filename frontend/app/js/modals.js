import {getConfig} from "./utils/getConfig"
import {Fancybox} from "@fancyapps/ui"
import '@fancyapps/ui/dist/fancybox.css'

export const els = {
  modal: '[data-js-modal]',
  openButton: '[data-js-modal-open-button]',
  closeButton: '[data-js-modal-close-button]'
}

export default class Modals {
  constructor() {
    this.bindEvents()
  }

  static closeLastModal() {
    const allOpenedModals = document.querySelectorAll(`[id^="fancybox-"]`)
    const lastModal = [...allOpenedModals].at(-1)
    if (!lastModal) return
    const lastModalFancyboxInstance = lastModal.Fancybox
    if (lastModalFancyboxInstance) {
      lastModalFancyboxInstance.close()
    }
  }

  handleOpenButtonClick(event) {
    event.preventDefault()
    const config = getConfig(event.target, els.openButton)
    const {src} = config

    if (!src) {
      console.debug("Selector is not found in data-js attribute of element:")
      console.debug(event.target)
      return
    }

    const modalElement = document.querySelector(src)
    if (!modalElement) {
      console.debug(`Modal element by '${src}' selector is not found!`)
      return
    }

    Fancybox.show([{src, type: 'inline'}], config)
  }

  handleCloseButtonClick(event) {
    event.preventDefault()
    Modals.closeLastModal()
  }

  handleClick(event) {
    const {target} = event
    const isMatches = (selector) => target.matches(selector)

    switch (true) {
      case isMatches(els.openButton): {
        this.handleOpenButtonClick(event)
        break
      }
      case isMatches(els.closeButton): {
        this.handleCloseButtonClick(event)
        break
      }
      default: {
        break
      }
    }
  }

  bindEvents() {
    document.addEventListener('click', (event) => {
      this.handleClick(event)
    })
  }
}