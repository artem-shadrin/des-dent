import {requireAll} from "../js/utils/requireAll";

import "reset-css";

import "./vars.pcss";
import "./media.pcss";
import "./utils.pcss";
import "./animations.pcss";
import "./icons.pcss";
import "./globals.pcss";
import "./fonts.pcss";
import "./typo.pcss";

requireAll(require.context("./blocks", false, /\.(pcss|css)$/i));
