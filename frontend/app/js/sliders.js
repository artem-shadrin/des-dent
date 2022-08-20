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
        spaceBetween: 10,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        slidesPerView: 2,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 1000,
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 30
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
      }
    },
    {
      selector: "#slider-about",
      options: {
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
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