<script setup lang="ts">
interface Props {
  emoji: string
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '1.2em',
})
</script>

<template>
  <span class="emoji-text">
    <span class="emoji" :style="{ fontSize: size }">{{ emoji }}</span>
    <slot />
  </span>
</template>

<style scoped>
.emoji-text {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
}

.emoji {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
  vertical-align: middle;
}
</style>
