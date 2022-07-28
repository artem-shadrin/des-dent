export class BurgerButton {
    els = {
        instance: '[data-js-burger-button]'
    }

    stateClasses = {
        isActive: 'is-active'
    }

    constructor() {
        this.instance = document.querySelector(this.els.instance)
        this.state = {
            isActive: false
        }
        this.bindEvents()
    }

    setIsActive() {
        this.state.isActive = true
        this.instance.classList.add(this.stateClasses.isActive)
    }

    removeIsActive() {
        this.state.isActive = false
        this.instance.classList.remove(this.stateClasses.isActive)
    }

    toggle() {
        if (this.state.isActive) {
            this.removeIsActive()
            App.MobileMenu.close()
        } else {
            this.setIsActive()
            App.MobileMenu.open()
        }
    }

    handleClick(event) {
        event.preventDefault()
        this.toggle()
    }

    bindEvents() {
        this.instance.addEventListener('click', (event) => this.handleClick(event))
    }
}

 export class MobileMenu {
    els = {
        instance: '[data-js-mobile-menu]'
    }

    stateClasses = {
        isOpen: 'is-open'
    }

    constructor() {
        this.instance = document.querySelector(this.els.instance)
        this.innerEl = this.instance.querySelector(this.els.innerEl)
        this.state = {
            isOpen: false
        }
        this.bindEvents()
    }

    open() {
        this.state.isOpen = true
        this.instance.classList.add(this.stateClasses.isOpen)
    }

    close() {
        this.state.isOpen = false
        this.instance.classList.remove(this.stateClasses.isOpen)
    }

    handleClick(event) {
        const {target} = event

        if (!target.closest(this.els.innerEl)) {
            this.close()
        }
    }

    bindEvents() {
        this.instance.addEventListener('click', (event) => this.handleClick(event))
    }
}

