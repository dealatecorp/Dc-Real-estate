<script setup>
const linkedin = "https://in.linkedin.com/company/godha-developers";
const mapLink = "https://www.google.com/maps/search/?api=1&query=Yendada%2C+Visakhapatnam";

const principles = [
  { index: "01", title: "Clarity", body: "A distinct point of view guides each detail, from the first impression to the everyday experience." },
  { index: "02", title: "Culture", body: "A sense of place and cultural resonance help give a community its own character." },
  { index: "03", title: "Class", body: "Thoughtful design brings comfort, elegance, and a more considered standard of living." },
];

const approach = [
  { index: "01", title: "Start with a vision", body: "A shared idea of how a place should feel gives the project its direction." },
  { index: "02", title: "Shape the architecture", body: "Distinctive design and modern comforts come together in a clear identity." },
  { index: "03", title: "Make room to gather", body: "Clubhouses, sport, wellness, and gardens give community life more space." },
  { index: "04", title: "Think beyond the building", body: "The aim is a place that can hold stories, experiences, and a lasting sense of belonging." },
];

const journal = [
  { category: "PLACE & BELONGING", title: "A community is everything after", body: "The shared spaces around a home can become the setting for small rituals, celebrations, and time well spent.", image: "https://images.unsplash.com/photo-1774161140968-1320b44a634c?auto=format&fit=crop&w=900&q=82", alt: "Green garden spaces beside contemporary residences" },
  { category: "WELLBEING", title: "Make room for a slower afternoon", body: "A pool, a garden, or a quiet place to pause can change the rhythm of an ordinary day.", image: "https://images.unsplash.com/photo-1768913573621-c411ebe8db9d?auto=format&fit=crop&w=900&q=82", alt: "A shared swimming pool beside modern homes" },
  { category: "A VIZAG ADDRESS", title: "Finding your horizon in Yendada", body: "A home is shaped by more than its walls. Its setting becomes part of the story people make there.", image: "https://images.unsplash.com/photo-1758193431351-68538bf55ec3?auto=format&fit=crop&w=900&q=82", alt: "Contemporary apartment architecture framed by trees" },
];
</script>

<template>
  <section id="projects" class="project-overview section-pad" aria-labelledby="project-overview-title">
    <div class="project-overview__heading reveal">
      <div>
        <p class="eyebrow"><span class="eyebrow__line" /> 03 / THE FLAGSHIP ADDRESS</p>
        <h2 id="project-overview-title">Six towers.<br /><em>One shared horizon.</em></h2>
      </div>
      <p>Godha Towers brings premium residences and generous shared spaces together in Yendada, Visakhapatnam.</p>
    </div>
    <div class="project-overview__body">
      <figure class="project-overview__image reveal">
        <img src="https://images.unsplash.com/photo-1772489342157-392673293090?auto=format&fit=crop&w=1500&q=84" alt="Modern residences with landscaped outdoor space" loading="lazy" />
        <figcaption><span>GODHA TOWERS</span><span>YENDADA · VIZAG</span></figcaption>
      </figure>
      <div class="project-overview__facts reveal">
        <p class="eyebrow">A PROJECT AT A GLANCE</p>
        <div class="project-overview__fact"><strong>06</strong><span>elegant residential towers</span></div>
        <div class="project-overview__fact"><strong>17</strong><span>floors in each tower</span></div>
        <div class="project-overview__fact"><strong>50,000<span>+</span></strong><span>sq. ft. across two clubhouses</span></div>
        <a class="text-link" href="/projects/">Explore project details <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>

  <section id="why-us" class="principles-section section-pad" aria-labelledby="principles-title">
    <div class="principles-section__intro reveal">
      <p class="eyebrow"><span class="eyebrow__line" /> 04 / THE GODHA DIFFERENCE</p>
      <h2 id="principles-title">A point of view<br /><em>you can feel.</em></h2>
      <p>Godha Developers sees real estate as a chance to create identities, experiences, and communities that reach beyond construction.</p>
    </div>
    <div class="principles-section__grid">
      <article v-for="principle in principles" :key="principle.index" class="principle-card reveal">
        <span class="principle-card__index">{{ principle.index }}</span>
        <div><h3>{{ principle.title }}</h3><p>{{ principle.body }}</p></div>
        <span class="principle-card__mark" aria-hidden="true">✳</span>
      </article>
    </div>
  </section>

  <section id="process" class="approach-section section-pad" aria-labelledby="approach-title">
    <div class="approach-section__heading reveal">
      <p class="eyebrow"><span class="eyebrow__line" /> 05 / FROM VISION TO EVERYDAY</p>
      <h2 id="approach-title">A considered way<br /><em>to shape a place.</em></h2>
      <p>Each Godha address is guided by a shared vision: architectural excellence, cultural resonance, and a thoughtful experience of living.</p>
    </div>
    <div class="approach-timeline">
      <svg class="approach-timeline__connector" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 465 110 C 485 78 515 78 535 110 M 535 215 C 570 246 430 254 465 285 M 465 390 C 485 358 515 358 535 390" />
      </svg>
      <ol class="approach-timeline__list">
        <li
          v-for="(step, index) in approach"
          :key="step.index"
          class="approach-step reveal"
          :style="{ '--step-delay': `${index * 160}ms`, '--step-tilt': index % 2 === 0 ? '-2deg' : '2deg', '--step-accent': index % 2 === 0 ? 'var(--accent)' : 'var(--accent-light)' }"
        >
          <span class="approach-step__pin" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M9 4.5a3 3 0 0 1 6 0v1.2l2.2 2.1v1.5H6.8V7.8L9 5.7V4.5Zm-1.2 6.1h8.4l-1 3.4-2.4 1.2v4.3l-1.2 1.2-1.2-1.2v-4.3L9 14l-1.2-3.4Z" /></svg>
          </span>
          <span class="approach-step__index">{{ step.index }}</span>
          <div class="approach-step__copy"><h3>{{ step.title }}</h3><p>{{ step.body }}</p></div>
        </li>
      </ol>
    </div>
  </section>

  <section id="blogs" class="journal-section section-pad" aria-labelledby="journal-title">
    <div class="journal-section__heading reveal">
      <div><p class="eyebrow"><span class="eyebrow__line" /> 06 / NOTES ON LIVING WELL</p><h2 id="journal-title">A little more<br /><em>to think about.</em></h2></div>
      <p>Ideas inspired by the details that make a residence part of a wider community.</p>
    </div>
    <div class="journal-grid">
      <article v-for="(entry, index) in journal" :key="entry.title" class="journal-card reveal">
        <div class="journal-card__image"><img :src="entry.image" :alt="entry.alt" loading="lazy" /><span>0{{ index + 1 }}</span></div>
        <div class="journal-card__copy"><p class="eyebrow">{{ entry.category }}</p><h3>{{ entry.title }}</h3><p>{{ entry.body }}</p></div>
      </article>
    </div>
  </section>
</template>
