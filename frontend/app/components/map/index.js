import './style.pcss';
import Collection from "../../js/collection";
import {getJs} from "../../js/utils/getJs";
import {getConfig} from "../../js/utils/getConfig";

export class Map {
    constructor(instance) {
        this.instance = instance
        this.map = null;
        this.clusterer = null;
        this.cfg = getConfig(this.instance, MapCollection.instance)
        this.bindEvents()
    }

    init() {

        this.map = new ymaps.Map(this.instance, this.cfg, {suppressMapOpenBlock: true})
        this.clusterer = new ymaps.Clusterer()
        this.clusterer.add(this.getPoints())
        this.map.geoObjects.add(this.clusterer)

    }

    getPoints() {
        return this.cfg.points.map(({coords, properties, options}) => {
            const hintLayout = ymaps.templateLayoutFactory
                .createClass(`<div class="map-hint"><span class="map-hint__title">{{properties.hintTitle}}</span><span class="map-hint__location">{{properties.hintLocation}}</span></div>`)
            options.hintLayout = hintLayout
            const point = new ymaps.Placemark(coords, properties, options)

            point.events.add('mouseenter', function (e) {
                point.options.set({iconImageSize: [42, 50]})
            });
            point.events.add('mouseleave', () => {
                point.options.set({iconImageSize: [32, 37]})
            });
            return point
        })
    }

    bindEvents() {
        window.ymaps.ready(() => {
            this.init()
        })


    }

}

export default class MapCollection extends Collection {
    static instance = "[data-js-map]"

    constructor() {
        super();
        this.load()
    }

    init() {
        document.querySelectorAll(MapCollection.instance).forEach(el => {
            this.collection = new Map(el)
        })
    }

    load() {
        if (typeof window.ymaps === 'function') {
            this.init()
        } else {
            getJs({src: MapCollection.urlAPI})
                .then(res => {
                    this.init()
                })
                .catch(err => console.debug(err))
        }
    }

    static urlAPI = "https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU"


}