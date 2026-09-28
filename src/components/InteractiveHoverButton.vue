<script setup>
defineProps({
  text: { type: String, default: "Get a quote" },
  href: { type: String, default: "/#contact" },
  wide: { type: Boolean, default: false },
});
</script>

<template>
  <a class="quote-link interactive-hover-button" :class="{ 'interactive-hover-button--wide': wide }" :href="href" :aria-label="text">
    <span class="interactive-hover-button__base">{{ text }}</span>
    <span class="interactive-hover-button__orb" aria-hidden="true"><i>↗</i></span>
  </a>
</template>
