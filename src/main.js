import { createApp } from "vue";
import App from "./App.vue";
import NotFound from "./NotFound.vue";
import "./styles.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const slug = path === "/" || path === "/index.html" ? "home" : path.split("/").filter(Boolean)[0];
const pageTitles = {
  home: "DC Real-estate — Godha Towers, Yendada",
  "about-us": "About Godha — DC Real-estate",
  "our-services": "Our Services — DC Real-estate",
  projects: "Godha Towers — DC Real-estate",
  "why-choose-us": "Why Godha — DC Real-estate",
  "our-process": "Our Process — DC Real-estate",
  blogs: "The Godha Journal — DC Real-estate",
  contact: "Contact Godha Developers — DC Real-estate",
  "get-a-quote": "Request Project Information — DC Real-estate",
};
const isKnownPage = Object.hasOwn(pageTitles, slug);

if (!isKnownPage) {
  document.title = "Page not found — DC Real-estate";
  document.querySelector('meta[name="description"]')?.setAttribute("content", "This page could not be found. Return to DC Real-estate and discover Godha Towers in Yendada, Vizag.");
  document.querySelector('meta[name="robots"]')?.setAttribute("content", "noindex");
} else {
  document.title = pageTitles[slug];
}

createApp(isKnownPage ? App : NotFound, isKnownPage ? { page: slug } : {}).mount("#app");
