<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  gap?: string
  leftRatio?: number
  rightRatio?: number
}

const props = withDefaults(defineProps<Props>(), {
  gap: '3rem',
  leftRatio: 1,
  rightRatio: 1,
})

const gridCols = computed(() => {
  return `${props.leftRatio}fr ${props.rightRatio}fr`
})
</script>

<template>
  <div class="two-column-layout">
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
  gap: v-bind('props.gap');
  width: 100%;
}

.column-left,
.column-right {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}
</style>
