<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

const MAX_VISIBLE = 7;
const HALF = 3;
const FAN_POSITIONS = [
  { rotation: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rotation: -14, scale: 0.8498, x: -22, y: 4, zIndex: 2 },
  { rotation: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rotation: 0, scale: 1, x: 0, y: 0, zIndex: 10 },
  { rotation: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rotation: 14, scale: 0.8498, x: 22, y: 4, zIndex: 2 },
  { rotation: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
];

const cards = [
  {
    title: "A home in the making",
    category: "THE RESIDENCES",
    detail: "Six considered towers, each rising 17 floors in Yendada.",
    image: "https://images.unsplash.com/photo-1758193431351-68538bf55ec3?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Contemporary apartment building framed by greenery",
  },
  {
    title: "A slower kind of afternoon",
    category: "SWIMMING POOL",
    detail: "A refreshing pause, just a few steps from home.",
    image: "https://images.unsplash.com/photo-1768913573621-c411ebe8db9d?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Residential towers and swimming pools at dusk",
  },
  {
    title: "Move at your own pace",
    category: "FITNESS & WELLNESS",
    detail: "A dedicated gym to make everyday wellbeing easier.",
    image: "https://images.unsplash.com/photo-1775993167276-743bbcde77e1?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Modern gym with treadmills and exercise equipment",
  },
  {
    title: "Room for everyone",
    category: "TWO CLUBHOUSES",
    detail: "More than 50,000 sq. ft. for gathering, unwinding, and making memories.",
    image: "https://images.unsplash.com/photo-1772489342157-392673293090?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "High-rise residences beside a landscaped pool deck",
  },
  {
    title: "Make space to play",
    category: "INDOOR SPORTS",
    detail: "Indoor and outdoor sports facilities for a little friendly competition.",
    image: "https://images.unsplash.com/photo-1768554630751-6448593749eb?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Indoor basketball court with a timber floor",
  },
  {
    title: "A little more green",
    category: "LANDSCAPED GARDENS",
    detail: "Open, landscaped spaces bring nature closer to the everyday.",
    image: "https://images.unsplash.com/photo-1774161140968-1320b44a634c?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Green lawns and trees beside modern apartment buildings",
  },
  {
    title: "Movie night, downstairs",
    category: "PRIVATE THEATRE",
    detail: "A dedicated movie theatre for the stories worth sharing.",
    image: "https://images.unsplash.com/photo-1561722798-9a732d141027?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Interior of a cinema theatre",
  },
  {
    title: "Bring everyone together",
    category: "BANQUET HALL",
    detail: "A welcoming setting for celebrations and special occasions.",
    image: "https://images.unsplash.com/photo-1763429338698-439aa108e7fb?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Elegant event hall set for a banquet",
  },
];

const root = ref(null);
const centerIndex = ref(HALF);
const entered = ref(false);
const entering = ref(false);
const animating = ref(false);
const hoveredIndex = ref(null);
const direction = ref("right");
const previousVisible = ref(new Set());
const incomingIndex = ref(null);
const viewport = ref({ width: 1280, height: 800 });
const visibleMap = computed(() => {
  const map = new Map();
  if (cards.length <= MAX_VISIBLE) {
    cards.forEach((_, index) => map.set(index, index));
    return map;
  }
  for (let slot = 0; slot < MAX_VISIBLE; slot += 1) {
    const index = (centerIndex.value + slot - HALF + cards.length) % cards.length;
    map.set(index, slot);
  }
  return map;
});

const needsPagination = cards.length > MAX_VISIBLE;
const activeCount = computed(() => `${String(centerIndex.value + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`);
let resizeObserver;
let visibilityObserver;
let animationTimer;
let entryFrame = 0;
let touchStartX = null;

function getResponsiveMultiplier(width) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1;
}

function getHeightMultiplier(width, height) {
  const idealHeight = width < 480 ? 22 * 16 : width < 640 ? 26 * 16 : width < 768 ? 28 * 16 : width < 1024 ? 34 * 16 : 38 * 16;
  return Math.min(1, (height * 0.7) / idealHeight);
}

function getSlotConfig(slot) {
  return FAN_POSITIONS[slot];
}

function updateViewport() {
  viewport.value = { width: window.innerWidth, height: window.innerHeight };
}

function cardStyle(index) {
  const { width, height } = viewport.value;
  const xMultiplier = getResponsiveMultiplier(width);
  const yMultiplier = getHeightMultiplier(width, height);

  if (!entered.value) {
    return {
      transform: `translate3d(-50%, ${12 * yMultiplier}rem, 0) rotate(0deg) scale(.5)`,
      opacity: 0,
      zIndex: 0,
      transitionDelay: "0s",
    };
  }

  const slot = visibleMap.value.get(index);
  if (slot === undefined) {
    const isLeaving = previousVisible.value.has(index);
    const x = incomingIndex.value === index
      ? (direction.value === "right" ? 40 : -40)
      : isLeaving
        ? (direction.value === "right" ? -40 : 40)
        : (direction.value === "right" ? 40 : -40);
    const rotation = isLeaving ? (direction.value === "right" ? -30 : 30) : 0;
    return {
      transform: `translate3d(calc(-50% + ${x * xMultiplier}rem), 0, 0) rotate(${rotation}deg) scale(.5)`,
      opacity: 0,
      zIndex: 0,
      transitionDelay: "0s",
      pointerEvents: "none",
    };
  }

  const position = getSlotConfig(slot);
  let x = position.x * xMultiplier;
  let y = position.y * yMultiplier;
  let rotation = position.rotation;
  let scale = position.scale;
  const activeSlot = hoveredIndex.value === null ? null : visibleMap.value.get(hoveredIndex.value);

  if (activeSlot !== null && activeSlot !== undefined) {
    const distance = Math.abs(slot - activeSlot);
    if (slot === activeSlot) {
      y -= 2.5 * yMultiplier;
      scale *= 1.08;
    } else {
      const normalized = (slot - HALF) / HALF;
      const push = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));
      x += (slot < activeSlot ? -push : push) * xMultiplier;
      rotation += (slot < activeSlot ? -3 : 3) / (distance + 1);
    }
  }

  return {
    transform: `translate3d(calc(-50% + ${x}rem), ${y}rem, 0) rotate(${rotation}deg) scale(${scale})`,
    opacity: 1,
    zIndex: position.zIndex,
    transitionDelay: entering.value ? `${0.18 + slot * 0.06}s` : "0s",
  };
}

function beginEntry() {
  if (entered.value) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    entered.value = true;
    previousVisible.value = new Set(visibleMap.value.keys());
    return;
  }
  animating.value = true;
  entryFrame = requestAnimationFrame(() => {
    entered.value = true;
    entering.value = true;
    animationTimer = window.setTimeout(() => {
      entering.value = false;
      animating.value = false;
      previousVisible.value = new Set(visibleMap.value.keys());
    }, 1800);
  });
}

function stopAnimation() {
  window.clearTimeout(animationTimer);
  animating.value = false;
  entering.value = false;
}

async function cycle(nextDirection) {
  if (animating.value || !needsPagination) return;
  animating.value = true;
  hoveredIndex.value = null;
  direction.value = nextDirection;

  const delta = nextDirection === "right" ? 1 : -1;
  const nextCenter = (centerIndex.value + delta + cards.length) % cards.length;
  const nextIndex = (nextCenter + (nextDirection === "right" ? HALF + 1 : -HALF - 1) + cards.length) % cards.length;
  incomingIndex.value = nextIndex;
  await nextTick();
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  previousVisible.value = new Set(visibleMap.value.keys());
  centerIndex.value = nextCenter;
  incomingIndex.value = null;
  animationTimer = window.setTimeout(() => {
    animating.value = false;
    previousVisible.value = new Set(visibleMap.value.keys());
  }, 720);
}

function onTouchStart(event) {
  touchStartX = event.changedTouches[0]?.clientX ?? null;
}

function onTouchEnd(event) {
  if (touchStartX === null) return;
  const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
  touchStartX = null;
  if (Math.abs(delta) > 48) cycle(delta < 0 ? "right" : "left");
}

function setHovered(index) {
  if (!animating.value && visibleMap.value.has(index)) hoveredIndex.value = index;
}

function clearHovered() {
  hoveredIndex.value = null;
}

onMounted(() => {
  updateViewport();
  window.addEventListener("resize", updateViewport, { passive: true });
  resizeObserver = new ResizeObserver(updateViewport);
  if (root.value) resizeObserver.observe(root.value);

  visibilityObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visibilityObserver.disconnect();
      beginEntry();
    }
  }, { threshold: 0.18 });
  if (root.value) visibilityObserver.observe(root.value);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateViewport);
  resizeObserver?.disconnect();
  visibilityObserver?.disconnect();
  window.cancelAnimationFrame(entryFrame);
  stopAnimation();
});
</script>

<template>
  <section
    ref="root"
    class="estate-carousel"
    :aria-label="`Godha Towers amenities, ${activeCount}`"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
    @keydown.left.prevent="cycle('left')"
    @keydown.right.prevent="cycle('right')"
  >
    <div class="estate-carousel__meta" aria-hidden="true">
      <span>THE DETAILS OF DAILY LIFE</span>
      <span>{{ activeCount }} <i>·</i> DRAG OR USE ARROWS</span>
    </div>

    <div class="estate-carousel__stage" :class="{ 'is-entering': entering }" aria-live="polite">
      <article
        v-for="(card, index) in cards"
        :key="card.category"
        class="estate-card"
        :style="cardStyle(index)"
        :aria-hidden="!visibleMap.has(index)"
        :tabindex="visibleMap.has(index) ? 0 : -1"
        :aria-label="`${card.category}: ${card.title}. ${card.detail}`"
        @mouseenter="setHovered(index)"
        @mouseleave="clearHovered"
        @focusin="setHovered(index)"
        @focusout="clearHovered"
      >
        <img :src="card.image" :alt="card.imageAlt" loading="lazy" />
        <div class="estate-card__veil" />
        <div class="estate-card__index" aria-hidden="true">0{{ index + 1 }}</div>
        <div class="estate-card__content">
          <p class="estate-card__category">{{ card.category }}</p>
          <h3>{{ card.title }}</h3>
          <p class="estate-card__detail">{{ card.detail }}</p>
        </div>
        <span class="estate-card__arrow" aria-hidden="true">↗</span>
      </article>
    </div>

    <div v-if="needsPagination" class="estate-carousel__controls" aria-label="Carousel controls">
      <button class="estate-carousel__arrow" type="button" :disabled="animating" aria-label="Previous amenity" @click="cycle('left')">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <div class="estate-carousel__dots" aria-hidden="true">
        <span v-for="(_, index) in cards" :key="index" :class="{ 'is-active': index === centerIndex }" />
      </div>
      <span class="estate-carousel__count" aria-live="polite">{{ activeCount }}</span>
      <button class="estate-carousel__arrow" type="button" :disabled="animating" aria-label="Next amenity" @click="cycle('right')">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
      </button>
    </div>
  </section>
</template>
