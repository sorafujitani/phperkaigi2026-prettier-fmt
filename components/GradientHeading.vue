<script setup lang="ts">
interface Props {
  tag?: 'h1' | 'h2' | 'h3'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h1',
  animated: false,
})
</script>

<template>
  <component
    :is="tag"
    class="gradient-heading"
    :class="{ 'animated-shadow': animated }"
  >
    <slot />
  </component>
</template>

<style scoped>
/* スタイルは既に style.css に定義されているため、追加の定義は不要 */
</style>
