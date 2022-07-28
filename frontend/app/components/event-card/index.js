import './style.pcss';
import Collection from "../../js/collection";
import {getConfig} from "../../js/utils/getConfig";
import {addZero} from "../../js/addZero";
//капчи в коллекцию
//validate captcha textarea
//validation method for captcha


export class EventTimer {

    constructor(DomElement) {
        this.instance = DomElement;
        this.containerEl = null;
        this.outputFieldEl = null;
        this.titleEl = null;
        this.dateEnd = null;
        this.timer = null;
        this.title = null;

        this.init()
    }

    init() {
        const {timer, title = "До конца таймера осталось:"} = getConfig(this.instance, EventTimerCollection.instance)
        if (typeof new Date(timer) === 'object') {
            this.dateEnd = new Date(timer);
            this.containerEl = this.createTimerContainer()
            this.titleEl = this.createTimerTitle(title)
            this.outputFieldEl = this.createTimerField()
            this.containerEl.append(this.titleEl, this.outputFieldEl)
            this.start()
            this.update()
        } else
            console.debug(`This Date not correct, ${timer}`)
    }


    start() {
        this.instance.append(this.containerEl)
        this.timer = setInterval(() => this.update(), 60 * 1000)
    }

    clear() {
        clearInterval(this.timer);
    }

    render(str) {
        this.outputFieldEl.textContent = str
    }

    update() {
        const date = this.remainingDate();
        const {total, minutes, hours, days} = date;
        if (total > 0) {
            this.render(`${addZero(minutes)} м : ${addZero(hours)} ч : ${days} д`);
        } else {
            this.clear()
            console.debug(`Timer is over in ${this.instance}`)
        }

    }

    createTimerField() {
        const el = document.createElement('div');
        el.classList.add(EventTimerCollection.selectors.timerField.slice(1));
        return el;
    }

    createTimerContainer() {
        const el = document.createElement('div');
        el.classList.add(EventTimerCollection.selectors.timerContainer.slice(1));
        return el;
    }

    createTimerTitle(title) {
        const el = document.createElement('div');
        el.classList.add(EventTimerCollection.selectors.timerTitle.slice(1));
        el.textContent = title;
        return el;
    }

    remainingDate() {
        const total = this.dateEnd - new Date();
        return {
            total,
            minutes: Math.floor((total / 1000 / 60) % 60),
            hours: Math.floor((total / 1000 / 60 / 60) % 24),
            days: Math.floor(total / 1000 / 60 / 60 / 24)
        }
    }

}

export default class EventTimerCollection extends Collection {
    static instance = "[data-js-timer]"
    static selectors = {
        timerContainer: '.event-card__timer',
        timerField: '.event-card__timer-date',
        timerTitle: '.event-card__timer-title'
    }

    constructor() {
        super();
        this.init();
    }

    init() {
        const timerEls = document.querySelectorAll(EventTimerCollection.instance)
        if (timerEls)
            timerEls.forEach(el => {
                this.collection = new EventTimer(el)
            })
    }
}