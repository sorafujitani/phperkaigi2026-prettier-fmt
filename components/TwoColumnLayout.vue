<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  gap?: number
  leftRatio?: number
  rightRatio?: number
}

const props = withDefaults(defineProps<Props>(), {
  gap: 8,
  leftRatio: 1,
  rightRatio: 1,
})

const gridCols = computed(() => {
  const total = props.leftRatio + props.rightRatio
  return `${props.leftRatio}fr ${props.rightRatio}fr`
})

const gapClass = computed(() => `gap-${props.gap}`)
</script>

<template>
  <div class="two-column-layout" :class="gapClass">
    <div class="column-left">
      <slot name="left" />
    </div>
    <div class="column-right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.two-column-layout {
  display: grid;
  grid-template-columns: v-bind(gridCols);
  width: 100%;
}

.column-left,
.column-right {
  display: flex;
  flex-direction: column;
}
</style>
