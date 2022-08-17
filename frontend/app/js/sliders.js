import Swiper, {Navigation} from "swiper";
import "swiper/css/bundle";
import Collection from "./collection";

Swiper.use([Navigation]);

export class Slider {

  constructor(instance, options) {
    this.instance = instance;
    this.params = options;
    this.swiper = null;

    this.init();
  }

  init() {
    this.swiper = new Swiper(this.instance, this.params);
  }
}

export default class SlidersCollection extends Collection {
  defaultCfg = {
    speed: 800,
  };
  sliders = [
    {
      selector: "#slider-hero",
      options: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      }
    },
    {
      selector: "#slider-feedback",
      options: {
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        slidesPerView: 1,

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 1000,
        },
      }
    },
    {
      selector: "#slider-about",
      options: {
        direction: "vertical",
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        slidesPerView: 1,
      }
    },
  ];

  constructor() {
    super();
    this.init();
  }

  init(context = document) {
    this.sliders.forEach(slider => {
      const sliderDOMEls = context.querySelectorAll(slider.selector);
      sliderDOMEls.forEach(el => {
        this.collection = new Slider(el, {...this.defaultCfg, ...slider.options});
      });
    });
  }


}