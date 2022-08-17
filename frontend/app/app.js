// Load icons

const requireAll = (r) => r.keys().forEach(r);
requireAll(require.context("./icons", true, /\.svg$/));
import svg4everybody from "svg4everybody";
import SvgUse from "./js/svgUse";
import "./styles/icons.pcss";

import "./styles";

// Load components
import "./components/button";
import "./components/header";
import "./components/event-card";
import "./components/checkbox";
import "./components/footer";
import "./components/grecaptcha";
import "./components/input";
import "./components/lang-switcher";
import "./components/logo";
import "./components/share";
import "./components/map";


import "./components/about-card";
import "./components/service-card";
import "./components/feedback-card";
import "./components/specialist-card";


import Modals from "../app/js/modals";
import SlidersCollection from "./js/sliders";
import Forms from "./js/forms";
import MapCollection from "./components/map";
import {BurgerButton, MobileMenu} from "./js/burgerMenu";
import Masks from "./js/forms/mask";
//Load modules

window.App = {
  debug: !!window.location.port,
};

window.svg4everybody = svg4everybody;

document.addEventListener("DOMContentLoaded", () => {
  new SvgUse();
  document.body.classList.add("dom-is-ready");
  window.App.Modals = new Modals();
  window.App.Sliders = new SlidersCollection();
  window.App.Forms = new Forms();
  window.App.Masks = new Masks();
  window.App.MapCollection = new MapCollection();
  window.App.BurgerButton = new BurgerButton();
  window.App.MobileMenu = new MobileMenu();
});
