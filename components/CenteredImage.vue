<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  width?: string
  caption?: string
  rounded?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  width: 'auto',
  rounded: 'xl',
})
</script>

<template>
  <div class="centered-image-container">
    <div class="flex justify-center">
      <img
        :src="src"
        :alt="alt"
        :class="[`rounded-${rounded}`, 'shadow-lg']"
        :style="{ width: width, maxWidth: '100%' }"
      >
    </div>

    <div v-if="caption" class="text-center mt-4 text-sm text-gray-500">
      {{ caption }}
    </div>
  </div>
</template>

<style scoped>
img {
  height: auto;
}
</style>
