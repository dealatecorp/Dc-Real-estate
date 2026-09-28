<!--
  Local Vue source adapted from Inspira UI's open-source Marquee component.
  API and motion pattern: https://inspira-ui.com/docs/en/components/miscellaneous/marquee
-->
<script setup>
import { computed } from "vue";

const props = defineProps({
  reverse: { type: Boolean, default: false },
  pauseOnHover: { type: Boolean, default: false },
  repeat: { type: Number, default: 4 },
  duration: { type: String, default: "28s" },
});

const copies = computed(() => Math.max(2, props.repeat));
</script>

<template>
  <div
    class="inspira-marquee"
    :class="{ 'is-reverse': reverse, 'pause-on-hover': pauseOnHover }"
    :style="{ '--marquee-duration': duration }"
    aria-hidden="true"
  >
    <div v-for="copy in copies" :key="copy" class="inspira-marquee__row">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.inspira-marquee {
  --marquee-gap: clamp(1.5rem, 4vw, 4.5rem);
  display: flex;
  overflow: hidden;
  gap: var(--marquee-gap);
  width: 100%;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.inspira-marquee__row {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-around;
  gap: var(--marquee-gap);
  min-width: 100%;
  animation: inspira-marquee var(--marquee-duration) linear infinite;
}

.inspira-marquee.is-reverse .inspira-marquee__row {
  animation-direction: reverse;
}

.inspira-marquee.pause-on-hover:hover .inspira-marquee__row {
  animation-play-state: paused;
}

@keyframes inspira-marquee {
  to { transform: translateX(calc(-100% - var(--marquee-gap))); }
}

@media (prefers-reduced-motion: reduce) {
  .inspira-marquee__row { animation-play-state: paused; }
}
</style>
