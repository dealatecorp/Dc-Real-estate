<script setup>
import { computed } from "vue";
import QuoteRequestForm from "./QuoteRequestForm.vue";

const props = defineProps({ page: { type: String, required: true } });
const linkedin = "https://in.linkedin.com/company/godha-developers";
const mapLink = "https://www.google.com/maps/search/?api=1&query=Yendada%2C+Visakhapatnam";

const pages = {
  "about-us": {
    number: "01",
    kicker: "THE GODHA STORY",
    title: "Beyond the act of building,",
    emphasis: "a place to belong.",
    intro: "Godha Developers brings decades of experience and a shared vision to create communities with character, clarity, and a sense of place.",
    image: "https://images.unsplash.com/photo-1758193431351-68538bf55ec3?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "A contemporary apartment building set among greenery",
    imageCaption: "A GODHA DEVELOPERS ADDRESS · VIZAG",
    sectionKicker: "A SHARED POINT OF VIEW",
    sectionTitle: "Clarity in the vision.\nCare in the details.",
    sectionIntro: "The people behind Godha Developers bring a shared point of view to every place they shape.",
    items: [
      { label: "MANAGING PARTNER", title: "Dharmender Varada", body: "A shared vision for communities that offer more than a place to live." },
      { label: "MANAGING PARTNER", title: "Govinda Raju Chaganti", body: "Decades of experience brought together around thoughtful living." },
      { label: "OUR PHILOSOPHY", title: "Clarity · Culture · Class", body: "A design outlook rooted in identity, cultural resonance, and a considered standard of living." },
    ],
    cta: "Meet Godha Developers",
    ctaHref: linkedin,
  },
  "our-services": {
    number: "02",
    kicker: "WHAT WE DO",
    title: "Real estate shaped around",
    emphasis: "the way people live.",
    intro: "From architectural direction to generous shared spaces, Godha Developers brings a considered point of view to residential development.",
    image: "https://images.unsplash.com/photo-1772489342157-392673293090?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "A residential tower and pool deck in a landscaped setting",
    imageCaption: "GODHA TOWERS · YENDADA",
    sectionKicker: "A THOUGHTFUL SCOPE",
    sectionTitle: "Spaces made to\nwork beautifully.",
    sectionIntro: "The Godha approach brings architectural expression and everyday use into one considered development vision.",
    items: [
      { label: "01 / DEVELOPMENT", title: "Residential places", body: "Premium residences planned as part of a wider, connected community." },
      { label: "02 / DESIGN", title: "Distinctive identity", body: "Architectural excellence with a distinctive aesthetic and cultural resonance." },
      { label: "03 / COMMUNITY", title: "Shared experiences", body: "Clubhouses, wellness, sport, gardens, and gathering places that give a community room to grow." },
    ],
    cta: "Explore Godha Towers",
    ctaHref: "/projects/",
  },
  projects: {
    number: "03",
    kicker: "THE GODHA PORTFOLIO",
    title: "One address, many ways",
    emphasis: "to feel at home.",
    intro: "Godha Towers is the flagship Godha Developers project in Yendada, Visakhapatnam: six elegant towers with thoughtfully planned residences and shared spaces.",
    image: "https://images.unsplash.com/photo-1768913573621-c411ebe8db9d?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "Modern apartment towers and a shared swimming pool at dusk",
    imageCaption: "ARCHITECTURAL STUDY · YENDADA",
    sectionKicker: "GODHA TOWERS · VIZAG",
    sectionTitle: "The project\nat a glance.",
    sectionIntro: "A residential address planned around scale, comfort, and shared experiences.",
    items: [
      { label: "01 / THE DEVELOPMENT", title: "Six elegant towers", body: "Each tower rises 17 floors, with premium residences shaped around modern comforts." },
      { label: "02 / SHARED SPACE", title: "Two clubhouses", body: "More than 50,000 sq. ft. across two expansive clubhouses." },
      { label: "03 / THE ADDRESS", title: "Yendada, Vizag", body: "A distinctive residential setting in Visakhapatnam, Andhra Pradesh." },
    ],
    cta: "Ask about Godha Towers",
    ctaHref: "/get-a-quote/",
  },
  "why-choose-us": {
    number: "04",
    kicker: "THE GODHA DIFFERENCE",
    title: "A considered standard,",
    emphasis: "from arrival onward.",
    intro: "Godha Developers believes real estate can create stories, experiences, and identities—not only buildings.",
    image: "https://images.unsplash.com/photo-1774161140968-1320b44a634c?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "Green lawns and mature trees beside contemporary apartment buildings",
    imageCaption: "COMMUNITY, WITH ROOM TO BREATHE",
    sectionKicker: "CLARITY · CULTURE · CLASS",
    sectionTitle: "A philosophy with\na point of view.",
    sectionIntro: "Three principles guide the distinctive identity and experience of a Godha address.",
    items: [
      { label: "01 / CLARITY", title: "An iconic identity", body: "A clear architectural vision carried through from arrival to the shared spaces." },
      { label: "02 / CULTURE", title: "A sense of place", body: "Design that values cultural resonance and the character of its setting." },
      { label: "03 / CLASS", title: "Thoughtful living", body: "Sustainable design intent and an elevated standard of everyday living." },
    ],
    cta: "Discover the project",
    ctaHref: "/projects/",
  },
  "our-process": {
    number: "05",
    kicker: "FROM VISION TO EVERYDAY",
    title: "Good places begin with",
    emphasis: "careful thinking.",
    intro: "A Godha development starts with a clear point of view, then gives equal attention to architecture, shared spaces, and the experience of living there.",
    image: "https://images.unsplash.com/photo-1758193431351-68538bf55ec3?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "Architectural details in a contemporary residential development",
    imageCaption: "DESIGN · PLACE · COMMUNITY",
    sectionKicker: "A GUIDING SEQUENCE",
    sectionTitle: "Consider the place.\nShape the experience.",
    sectionIntro: "The following principles reflect the vision Godha Developers describes for its communities.",
    items: [
      { label: "01 / VISION", title: "Start with clarity", body: "Set a distinctive identity and understand the experience a place should offer." },
      { label: "02 / DESIGN", title: "Respect context", body: "Bring architectural excellence and cultural resonance into the design approach." },
      { label: "03 / COMMUNITY", title: "Plan shared life", body: "Make room for wellness, sport, gathering, and landscaped open spaces." },
      { label: "04 / EXPERIENCE", title: "Think beyond walls", body: "Consider the moments, stories, and sense of belonging a community can create." },
    ],
    cta: "See the Godha Towers vision",
    ctaHref: "/projects/",
  },
  blogs: {
    number: "06",
    kicker: "THE GODHA JOURNAL",
    title: "Ideas for living,",
    emphasis: "and living well.",
    intro: "A journal of places, shared experiences, and the details that make a home feel like part of something larger.",
    image: "https://images.unsplash.com/photo-1758193431351-68538bf55ec3?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "Contemporary residential architecture surrounded by trees",
    imageCaption: "NOTES ON PLACE AND POSSIBILITY",
    sectionKicker: "READ THE JOURNAL",
    sectionTitle: "A few thoughts\nto take with you.",
    sectionIntro: "Short reads inspired by the Godha Developers approach to residential life.",
    items: [
      { label: "DESIGNING FOR BELONGING", title: "A community is everything after", body: "Shared places turn a group of homes into the backdrop for everyday rituals, milestones, and chance encounters." },
      { label: "SPACE & WELLBEING", title: "Make room for a slower afternoon", body: "A pool, a garden, or a quiet corner to pause can change the rhythm of a day at home." },
      { label: "A VIZAG ADDRESS", title: "Finding a point of view in Yendada", body: "A sense of place is part of the experience: where a home sits matters as much as how it is shaped." },
    ],
    cta: "Explore Godha Towers",
    ctaHref: "/projects/",
  },
  contact: {
    number: "07",
    kicker: "FIND YOUR WAY TO GODHA",
    title: "A Vizag address,",
    emphasis: "a conversation away.",
    intro: "Godha Towers is in Yendada, Visakhapatnam. For project information, connect with Godha Developers through its company page.",
    image: "https://images.unsplash.com/photo-1774161140968-1320b44a634c?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "Landscaped green space beside apartment buildings",
    imageCaption: "YENDADA · VISAKHAPATNAM · ANDHRA PRADESH",
    sectionKicker: "GET IN TOUCH",
    sectionTitle: "Start with the\nright details.",
    sectionIntro: "Use the official Godha Developers page for enquiries, and view the project area in Yendada.",
    items: [
      { label: "THE PROJECT", title: "Yendada, Visakhapatnam", body: "Andhra Pradesh, India. The Godha Towers project is located in Yendada." },
      { label: "THE DEVELOPER", title: "Godha Developers", body: "Find the company profile and current updates on LinkedIn." },
      { label: "THE NEXT STEP", title: "Ask about a residence", body: "For current plans and availability, reach out to the Godha Developers team directly." },
    ],
    cta: "Open Godha Developers on LinkedIn",
    ctaHref: linkedin,
    secondaryCta: "View Yendada on the map",
    secondaryHref: mapLink,
  },
  "get-a-quote": {
    number: "08",
    kicker: "YOUR NEXT ADDRESS",
    title: "Let’s talk about",
    emphasis: "what feels like home.",
    intro: "For current plans, pricing, and availability at Godha Towers, start with the details you’d like to explore.",
    image: "https://images.unsplash.com/photo-1768913573621-c411ebe8db9d?auto=format&fit=crop&w=1400&q=82",
    imageAlt: "Residential towers with a swimming pool at dusk",
    imageCaption: "GODHA TOWERS · YENDADA, VIZAG",
    sectionKicker: "REQUEST PROJECT INFORMATION",
    sectionTitle: "Get the details\nyou need.",
    sectionIntro: "Pricing and availability can change. Connect with the developer for up-to-date information about the residences.",
    items: [
      { label: "01 / EXPLORE", title: "Share what you’re looking for", body: "Tell the Godha Developers team which details would help you make an informed decision." },
      { label: "02 / CONNECT", title: "Speak with the developer", body: "Use the official company page to start a conversation and request current project information." },
      { label: "03 / VISIT", title: "Get to know Yendada", body: "Explore the project setting in Visakhapatnam and see if the address feels right for you." },
    ],
    cta: "Start your enquiry",
    ctaHref: "#quote-request-form",
    secondaryCta: "Explore the project",
    secondaryHref: "/projects/",
  },
};

const content = computed(() => pages[props.page] ?? pages.projects);
const isExternal = (href) => href.startsWith("http");
</script>

<template>
  <div class="editorial-page">
    <section id="top" class="editorial-page__hero" aria-labelledby="page-title">
      <div class="editorial-page__copy">
        <p class="eyebrow"><span class="eyebrow__line" /> {{ content.number }} / {{ content.kicker }}</p>
        <h1 id="page-title">{{ content.title }}<br /><em>{{ content.emphasis }}</em></h1>
        <p class="editorial-page__intro">{{ content.intro }}</p>
        <a class="button button--dark" :href="content.ctaHref" :target="isExternal(content.ctaHref) ? '_blank' : undefined" :rel="isExternal(content.ctaHref) ? 'noreferrer' : undefined">
          {{ content.cta }} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <figure class="editorial-page__visual">
        <img :src="content.image" :alt="content.imageAlt" />
        <div class="editorial-page__visual-wash" />
        <figcaption><span>{{ content.imageCaption }}</span><span>{{ content.number }} / 08</span></figcaption>
      </figure>
    </section>

    <QuoteRequestForm v-if="page === 'get-a-quote'" />

    <section v-else class="editorial-page__details section-pad" aria-labelledby="page-details-title">
      <div class="editorial-page__heading">
        <div>
          <p class="eyebrow">{{ content.number }} / {{ content.sectionKicker }}</p>
          <h2 id="page-details-title">{{ content.sectionTitle }}</h2>
        </div>
        <p>{{ content.sectionIntro }}</p>
      </div>

      <div class="editorial-page__items">
        <article v-for="(item, index) in content.items" :key="item.title" class="editorial-page__item">
          <span class="editorial-page__item-label">{{ item.label }}</span>
          <span class="editorial-page__item-number">0{{ index + 1 }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="editorial-page__closing section-pad">
      <p class="eyebrow">GODHA TOWERS · YENDADA, VIZAG</p>
      <h2>A little closer to<br /><em>your horizon.</em></h2>
      <div class="editorial-page__closing-actions">
        <a class="button button--dark" :href="content.ctaHref" :target="isExternal(content.ctaHref) ? '_blank' : undefined" :rel="isExternal(content.ctaHref) ? 'noreferrer' : undefined">
          {{ content.cta }} <span aria-hidden="true">↗</span>
        </a>
        <a v-if="content.secondaryCta" class="text-link" :href="content.secondaryHref" :target="isExternal(content.secondaryHref) ? '_blank' : undefined" :rel="isExternal(content.secondaryHref) ? 'noreferrer' : undefined">
          {{ content.secondaryCta }} <span aria-hidden="true">↗</span>
        </a>
        <a v-else class="text-link" href="/">Back to the home page <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </div>
</template>
