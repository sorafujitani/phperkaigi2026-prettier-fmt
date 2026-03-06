<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  github?: string
  twitter?: string
  linkedin?: string
  size?: string
  gap?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: '2xl',
  gap: 2,
})

const sizeClass = computed(() => `text-${props.size}`)
const gapClass = computed(() => `gap-${props.gap}`)
</script>

<template>
  <div class="social-links flex" :class="[gapClass, sizeClass]">
    <a
      v-if="github"
      :href="`https://github.com/${github}`"
      target="_blank"
      class="slidev-icon-btn"
      aria-label="GitHub"
    >
      <carbon-logo-github />
    </a>
    <a
      v-if="twitter"
      :href="`https://x.com/${twitter}`"
      target="_blank"
      class="slidev-icon-btn"
      aria-label="Twitter/X"
    >
      <carbon-logo-twitter />
    </a>
    <a
      v-if="linkedin"
      :href="`https://linkedin.com/in/${linkedin}`"
      target="_blank"
      class="slidev-icon-btn"
      aria-label="LinkedIn"
    >
      <carbon-logo-linkedin />
    </a>
  </div>
</template>

<style scoped>
.social-links a {
  transition: opacity 0.2s;
}

.social-links a:hover {
  opacity: 0.7;
}
</style>
