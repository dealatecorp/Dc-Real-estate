<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import Marquee from "./components/Marquee.vue";
import ResidenceScene from "./components/ResidenceScene.vue";
import EstateCardCarousel from "./components/EstateCardCarousel.vue";
import HomeEditorialSections from "./components/HomeEditorialSections.vue";
import InteractiveHoverButton from "./components/InteractiveHoverButton.vue";
import EditorialPage from "./components/EditorialPage.vue";

const props = defineProps({ page: { type: String, default: "home" } });
const page = props.page;
const linkedin = "https://in.linkedin.com/company/godha-developers";
const contactEmail = "chaitu4765@gmail.com";
const contactPhone = "+91 1234567891";
const contactPhoneHref = "tel:+911234567891";
const activeSection = ref(window.location.hash.slice(1) || "top");
const menuOpen = ref(false);
const sectionHref = (target) => page === "home" ? `#${target}` : `/#${target}`;
const menuItems = [
  { label: "Home", slug: "home", target: "top", glow: "rgba(33,164,196,.17)" },
  { label: "About Us", slug: "about-us", target: "about", glow: "rgba(101,84,191,.16)" },
  { label: "Our Services", slug: "our-services", target: "services", glow: "rgba(33,164,196,.16)" },
  { label: "Projects", slug: "projects", target: "projects", glow: "rgba(101,84,191,.17)" },
  { label: "Why Choose Us", slug: "why-choose-us", target: "why-us", glow: "rgba(33,164,196,.16)" },
  { label: "Our Process", slug: "our-process", target: "process", glow: "rgba(101,84,191,.16)" },
  { label: "Blogs", slug: "blogs", target: "blogs", glow: "rgba(33,164,196,.17)" },
  { label: "Contact", slug: "contact", target: "contact", glow: "rgba(101,84,191,.16)" },
];
let observer;
let sectionObserver;

function navigateTo(target) {
  activeSection.value = target;
  menuOpen.value = false;
}

function closeMenuOnEscape(event) {
  if (event.key === "Escape") menuOpen.value = false;
}

function syncHashSection() {
  activeSection.value = window.location.hash.slice(1) || "top";
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  sectionObserver = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];
    if (current) activeSection.value = current.target.id;
  }, { rootMargin: "-18% 0px -66% 0px", threshold: 0 });
  document.querySelectorAll("#top, #about, #services, #projects, #why-us, #process, #blogs, #contact").forEach((section) => sectionObserver.observe(section));
  window.addEventListener("hashchange", syncHashSection);
  window.addEventListener("keydown", closeMenuOnEscape);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  sectionObserver?.disconnect();
  window.removeEventListener("hashchange", syncHashSection);
  window.removeEventListener("keydown", closeMenuOnEscape);
});
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="site-shell">
    <div v-if="page === 'home'" class="scene-wrap" aria-hidden="true">
      <ResidenceScene />
      <div class="scene-wrap__wash" />
    </div>

    <header class="site-header">
      <div class="topbar">
        <a class="brand-lockup" href="/" aria-label="DC Real-estate — Godha Developers">
          <span class="godha-logo-crop"><img src="/godha-logo-clean.png" alt="Godha Developers" /></span>
          <span class="brand-lockup__site-name"><strong>DC</strong><span>REAL-ESTATE</span></span>
        </a>
        <div class="topbar__actions">
          <a class="topbar__link" :href="linkedin" target="_blank" rel="noreferrer">
            <span>GODHA DEVELOPERS</span>
            <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M5 15 15 5M6 5h9v9" /></svg>
          </a>
        </div>
      </div>
    </header>
    <nav id="main-navigation" class="primary-nav" aria-label="Main navigation">
      <button class="primary-nav__toggle" type="button" :aria-expanded="menuOpen" aria-controls="primary-nav-links" :aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'" @click="menuOpen = !menuOpen">
        <span class="primary-nav__toggle-icon" :class="{ 'is-open': menuOpen }" aria-hidden="true"><i /><i /><i /></span>
        <span>{{ menuOpen ? "Close" : "Menu" }}</span>
      </button>
      <ul id="primary-nav-links" class="primary-nav__list" :class="{ 'is-open': menuOpen }">
        <li v-for="(item, index) in menuItems" :key="item.slug" class="primary-nav__item" :style="{ '--menu-index': index, '--menu-delay': `${index * 38}ms`, '--menu-glow': item.glow }">
          <a class="primary-nav__link" :href="sectionHref(item.target)" :aria-current="item.target === activeSection ? 'location' : undefined" @click="navigateTo(item.target)">
            <span class="primary-nav__flip">
              <span class="primary-nav__face">{{ item.label }}</span>
              <span class="primary-nav__face primary-nav__face--back">{{ item.label }} <i aria-hidden="true">↗</i></span>
            </span>
          </a>
        </li>
      </ul>
      <InteractiveHoverButton text="Get a quote" :href="page === 'get-a-quote' ? '#quote-request-form' : '/get-a-quote/'" />
    </nav>

    <main id="main">
      <template v-if="page === 'home'">
      <section id="top" class="hero" aria-labelledby="hero-title">
        <div class="hero__copy">
          <p class="eyebrow"><span class="eyebrow__line" /> A GODHA DEVELOPERS ADDRESS</p>
          <h1 id="hero-title">A little closer<br />to <em>your horizon.</em></h1>
          <p class="hero__intro">Godha Towers brings a new sense of space to Yendada, Vizag: considered homes, generous shared places, and room for life to unfold.</p>
          <div class="hero__actions">
            <a class="button button--dark" href="#services" @click="navigateTo('services')">Discover the residences <span aria-hidden="true">↘</span></a>
            <span class="hero__note">YENDADA <i>·</i> VISAKHAPATNAM</span>
          </div>
        </div>

        <div class="hero__caption hero__caption--top">
          <span>ARCHITECTURAL STUDY</span>
          <span>01 / 06</span>
        </div>
        <div class="hero__caption hero__caption--bottom">
          <span>Illustrative massing, based on the stated six-tower, 17-floor programme.</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>

        <div class="hero__edition" aria-hidden="true">A PLACE TO<br /><em>belong.</em></div>
      </section>

      <div class="fact-strip" aria-label="Project highlights">
        <div class="fact-strip__intro"><span>THE PROJECT AT A GLANCE</span><span>01 — 04</span></div>
        <div class="fact"><strong>06</strong><span>considered towers</span></div>
        <div class="fact"><strong>17</strong><span>floors in each tower</span></div>
        <div class="fact"><strong>50,000<span>+</span></strong><span>sq. ft. across two clubhouses</span></div>
      </div>

      <section id="about" class="story section-pad" aria-labelledby="story-title">
        <div class="story__meta reveal">
          <span class="eyebrow">01 / A SHARED POINT OF VIEW</span>
          <span class="section-index">GODHA DEVELOPERS · VIZAG</span>
        </div>
        <div class="story__body reveal">
          <h2 id="story-title">A home is a beginning.<br /><em>A community is everything after.</em></h2>
          <p>Godha Developers brings decades of experience and a shared vision to each project. The aim is to make more than a collection of residences: to create a place with its own character, where the everyday feels thoughtfully considered.</p>
          <a class="text-link" :href="linkedin" target="_blank" rel="noreferrer">Meet Godha Developers <span aria-hidden="true">↗</span></a>
        </div>
        <div class="story__stamp" aria-hidden="true"><span>CLARITY</span><span>CULTURE</span><span>CLASS</span></div>
      </section>

      <div class="values-band" aria-label="Godha design philosophy">
        <Marquee :repeat="4" :pause-on-hover="true" duration="30s">
          <span class="values-band__word">CLARITY <i>✳</i></span>
          <span class="values-band__word">CULTURE <i>✳</i></span>
          <span class="values-band__word">CLASS <i>✳</i></span>
          <span class="values-band__word">COMMUNITY <i>✳</i></span>
        </Marquee>
      </div>

      <section id="services" class="residences section-pad" aria-labelledby="residences-title">
        <div class="section-heading reveal">
          <div>
            <span class="eyebrow">02 / THE ART OF LIVING WELL</span>
            <h2 id="residences-title">Space for<br /><em>the good things.</em></h2>
          </div>
          <p>Every shared space has a purpose: to make time for movement, a slower afternoon, or a memorable evening with your people.</p>
        </div>

        <EstateCardCarousel class="reveal" />
      </section>

      <HomeEditorialSections />

      <section id="location" class="location" aria-labelledby="location-title">
        <div class="location__label"><span class="eyebrow">03 / A VIZAG ADDRESS</span><span class="section-index">ANDHRA PRADESH · INDIA</span></div>
        <div class="location__content reveal">
          <p class="location__overline">WELL PLACED, WELL CONNECTED</p>
          <h2 id="location-title">Yendada,<br /><em>Visakhapatnam.</em></h2>
          <p class="location__description">Yendada, in Visakhapatnam, gives Godha Towers a clear sense of place and a considered setting for everyday life.</p>
          <a class="location__link" href="https://www.google.com/maps/search/?api=1&query=Yendada%2C+Visakhapatnam" target="_blank" rel="noreferrer">Explore Yendada <span aria-hidden="true">↗</span></a>
        </div>
        <div class="location__coordinates" aria-hidden="true"><span>YENDADA</span><span>VISAKHAPATNAM</span><span>ANDHRA PRADESH</span></div>
        <div class="location__seal" aria-hidden="true"><span>VIZAG</span><i>✳</i><span>YENDADA</span></div>
      </section>

      <section class="partners section-pad" aria-labelledby="partners-title">
        <div class="partners__head reveal">
          <span class="eyebrow">04 / EXPERIENCE, IN PARTNERSHIP</span>
          <h2 id="partners-title">The people behind<br /><em>the place.</em></h2>
          <p>Led by Managing Partners Dharmender Varada and Govinda Raju Chaganti, Godha Developers brings a shared sense of purpose to the project.</p>
        </div>
        <div class="partners__list reveal">
          <article class="partner"><span>MANAGING PARTNER</span><h3>Dharmender<br />Varada</h3><span class="partner__index">01</span></article>
          <article class="partner"><span>MANAGING PARTNER</span><h3>Govinda Raju<br />Chaganti</h3><span class="partner__index">02</span></article>
          <a class="partner partner--link" :href="linkedin" target="_blank" rel="noreferrer"><span>DISCOVER THE DEVELOPER</span><h3>Meet the<br /><em>Godha team.</em></h3><span class="partner__index">↗</span></a>
        </div>
      </section>

      <section id="contact" class="home-contact section-pad" aria-labelledby="contact-title">
        <div class="home-contact__copy reveal">
          <p class="eyebrow"><span class="eyebrow__line" /> 07 / BEGIN A CONVERSATION</p>
          <h2 id="contact-title">Your next chapter<br /><em>starts with a question.</em></h2>
          <p>For current plans, pricing, and availability at Godha Towers, connect with Godha Developers directly.</p>
        </div>
        <div class="home-contact__actions reveal">
          <a class="button button--dark" :href="linkedin" target="_blank" rel="noreferrer">Contact Godha Developers <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="/get-a-quote/">Request project information <span aria-hidden="true">↗</span></a>
          <div class="home-contact__details" aria-label="Contact details">
            <a class="home-contact__detail" :href="contactPhoneHref">
              <span class="home-contact__detail-label">MOBILE</span>
              <strong>{{ contactPhone }}</strong>
              <span class="home-contact__detail-arrow" aria-hidden="true">↗</span>
            </a>
            <a class="home-contact__detail" :href="`mailto:${contactEmail}`">
              <span class="home-contact__detail-label">EMAIL</span>
              <strong>{{ contactEmail }}</strong>
              <span class="home-contact__detail-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section class="closing section-pad">
        <div class="closing__rule" />
        <p class="eyebrow">A NEW ADDRESS FOR WHAT COMES NEXT</p>
        <h2>Make room for<br /><em>your next chapter.</em></h2>
        <a class="button button--dark" href="/get-a-quote/">Connect with Godha Developers <span aria-hidden="true">↗</span></a>
      </section>
      </template>
      <EditorialPage v-else :page="page" />
    </main>

    <footer class="footer">
      <a class="brand-lockup" href="/" aria-label="DC Real-estate — Godha Developers">
        <span class="godha-logo-crop"><img src="/godha-logo-clean.png" alt="Godha Developers" /></span>
        <span class="brand-lockup__site-name"><strong>DC</strong><span>REAL-ESTATE</span></span>
      </a>
      <p>GODHA TOWERS <span>·</span> YENDADA, VIZAG</p>
      <a :href="linkedin" target="_blank" rel="noreferrer">GODHA DEVELOPERS ON LINKEDIN ↗</a>
      <small>Project details supplied by Godha Developers. The animated architectural massing is illustrative.</small>
      <small>© 2026 DC Real-estate</small>
    </footer>
  </div>
</template>
