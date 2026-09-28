<script setup>
import { computed, reactive, ref } from "vue";

const submitted = ref(false);
const details = reactive({
  name: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
});

const firstName = computed(() => details.name.trim().split(/\s+/)[0] || "there");
const emailHref = computed(() => {
  const subject = `Godha Towers enquiry — ${details.name}`;
  const body = [
    "Godha Towers project enquiry",
    "",
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
    `Project interest: ${details.interest}`,
    `Message: ${details.message || "Not provided"}`,
  ].join("\n");

  return `mailto:chaitu4765@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

function sendEnquiry() {
  submitted.value = true;
  window.location.href = emailHref.value;
}

function editEnquiry() {
  submitted.value = false;
}
</script>

<template>
  <section id="quote-request-form" class="quote-request section-pad" aria-labelledby="quote-request-title">
    <div class="quote-request__layout">
      <div class="quote-request__story reveal">
        <p class="eyebrow"><span class="eyebrow__line" /> 08 / A CONVERSATION ABOUT HOME</p>
        <h2 id="quote-request-title">A few details.<br /><em>A clearer picture.</em></h2>
        <p class="quote-request__intro">Tell us what you’d like to know about Godha Towers. Add your contact details and the project information you’re looking for.</p>

        <div class="quote-orb" role="img" aria-label="Animated wireframe globe marking Godha Towers in Yendada, Visakhapatnam">
          <div class="quote-orb__halo" />
          <svg class="quote-orb__sphere" viewBox="0 0 360 360" aria-hidden="true">
            <defs>
              <radialGradient id="quote-orb-fill" cx="35%" cy="30%" r="78%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=".98" />
                <stop offset="68%" stop-color="#dceaf4" stop-opacity=".74" />
                <stop offset="100%" stop-color="#cddcef" stop-opacity=".18" />
              </radialGradient>
              <clipPath id="quote-orb-clip"><circle cx="180" cy="180" r="132" /></clipPath>
            </defs>
            <circle class="quote-orb__surface" cx="180" cy="180" r="132" fill="url(#quote-orb-fill)" />
            <g class="quote-orb__grid" clip-path="url(#quote-orb-clip)">
              <ellipse cx="180" cy="180" rx="132" ry="42" />
              <ellipse cx="180" cy="180" rx="132" ry="82" />
              <ellipse cx="180" cy="180" rx="132" ry="112" />
              <ellipse cx="180" cy="180" rx="38" ry="132" />
              <ellipse cx="180" cy="180" rx="82" ry="132" />
              <ellipse cx="180" cy="180" rx="112" ry="132" />
              <path d="M48 180h264M62 132c67 34 129 34 236 0M62 228c67-34 129-34 236 0" />
            </g>
            <circle class="quote-orb__outline" cx="180" cy="180" r="132" />
          </svg>
          <div class="quote-orb__orbit quote-orb__orbit--one" />
          <div class="quote-orb__orbit quote-orb__orbit--two" />
          <div class="quote-orb__marker"><span /><small>YENDADA · VIZAG</small></div>
          <span class="quote-orb__caption">A PLACE TO BELONG</span>
        </div>

        <div class="quote-request__location">
          <span>THE FLAGSHIP ADDRESS</span>
          <strong>Yendada, Visakhapatnam</strong>
          <span>ANDHRA PRADESH · INDIA</span>
        </div>
      </div>

      <div class="quote-request__panel reveal">
        <template v-if="!submitted">
          <div class="quote-request__panel-heading">
            <span class="quote-request__step">01 — 02</span>
            <h3>What can we help you explore?</h3>
            <p>Fields marked with an asterisk are required.</p>
          </div>

          <form class="quote-form" @submit.prevent="sendEnquiry">
            <div class="quote-form__grid">
              <label class="quote-form__field">
                <span>Full name <i>*</i></span>
                <input v-model.trim="details.name" autocomplete="name" name="name" type="text" placeholder="Your name" required />
              </label>
              <label class="quote-form__field">
                <span>Email address <i>*</i></span>
                <input v-model.trim="details.email" autocomplete="email" name="email" type="email" placeholder="you@example.com" required />
              </label>
              <label class="quote-form__field">
                <span>Phone number <i>*</i></span>
                <input v-model.trim="details.phone" autocomplete="tel" name="phone" type="tel" placeholder="Your phone number" required />
              </label>
              <label class="quote-form__field">
                <span>Project details <i>*</i></span>
                <select v-model="details.interest" name="interest" required>
                  <option disabled value="">Choose a topic</option>
                  <option>Residences and floor plans</option>
                  <option>Pricing and availability</option>
                  <option>Amenities and clubhouses</option>
                  <option>Arrange a project visit</option>
                  <option>Other project information</option>
                </select>
              </label>
              <label class="quote-form__field quote-form__field--wide">
                <span>Your message</span>
                <textarea v-model.trim="details.message" name="message" rows="4" placeholder="Tell us a little about what you have in mind" />
              </label>
            </div>

            <button class="quote-form__submit" type="submit">
              <span>Continue in email</span>
              <span class="quote-form__submit-icon" aria-hidden="true">↗</span>
            </button>
            <p class="quote-form__note">This opens a draft addressed to chaitu4765@gmail.com. Review it in your email app and press Send to share your enquiry.</p>
          </form>
        </template>

        <div v-else class="quote-request__success" role="status" aria-live="polite">
          <span class="quote-request__step">ENQUIRY SUMMARY · READY</span>
          <h3>Thank you, {{ firstName }}.</h3>
          <p>Your email draft is addressed to <strong>chaitu4765@gmail.com</strong>.</p>
          <dl class="quote-request__summary">
            <div><dt>CONTACT</dt><dd>{{ details.email }} · {{ details.phone }}</dd></div>
            <div><dt>PROJECT INTEREST</dt><dd>{{ details.interest }}</dd></div>
            <div v-if="details.message"><dt>YOUR NOTE</dt><dd>{{ details.message }}</dd></div>
          </dl>
          <p class="quote-request__notice">Your email app should open with these details filled in. Review the draft and press Send; the website cannot send it on its own.</p>
          <a class="quote-request__developer-link" :href="emailHref">
            Open email draft again <span aria-hidden="true">↗</span>
          </a>
          <button class="quote-request__edit" type="button" @click="editEnquiry">Edit your details</button>
        </div>
      </div>
    </div>
  </section>
</template>
