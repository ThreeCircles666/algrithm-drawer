<template>
  <div class="visual">
    <div class="legend">
      <span><i class="dot default"></i>未排序</span>
      <span><i class="dot compare"></i>正在比较</span>
      <span><i class="dot swap"></i>正在交换</span>
      <span><i class="dot sorted"></i>已就位</span>
    </div>
    <div class="stage">
      <div
        v-for="(value, index) in state.array"
        :key="index"
        class="bar-wrap"
      >
        <div class="idx-tag" :class="{ show: state.i === index || state.j === index }">
          <span v-if="state.i === index">i</span>
          <span v-if="state.j === index">j</span>
        </div>
        <div
          class="bar"
          :class="barClass(index)"
          :style="{ height: barHeight(value) }"
        >
          {{ value }}
        </div>
        <div class="index">{{ index }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BubbleVisualState } from '@/types/algorithm'

const props = defineProps<{
  state: BubbleVisualState
}>()

const max = 50

function barHeight(value: number) {
  return `${Math.max(28, (value / max) * 220)}px`
}

function barClass(index: number) {
  if (props.state.sorted.includes(index)) return 'is-sorted'
  if (props.state.swapping && props.state.swapping.includes(index)) return 'is-swap'
  if (props.state.comparing && props.state.comparing.includes(index)) return 'is-compare'
  return ''
}
</script>

<style scoped>
.visual {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  font-size: 12px;
  color: var(--cv-text-secondary);
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

.default { background: #60a5fa; }
.compare { background: var(--cv-compare); }
.swap { background: var(--cv-swap); }
.sorted { background: var(--cv-sorted); }

.stage {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  padding: 12px 8px 0;
  min-height: 280px;
}

.bar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 52px;
}

.idx-tag {
  height: 22px;
  font-size: 12px;
  font-weight: 700;
  color: var(--cv-primary);
  display: flex;
  gap: 4px;
  opacity: 0;
}

.idx-tag.show {
  opacity: 1;
}

.bar {
  width: 100%;
  border-radius: 8px 8px 4px 4px;
  background: #60a5fa;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  font-weight: 700;
  font-size: 13px;
  transition: height 0.35s ease, background-color 0.25s ease, transform 0.25s ease;
}

.bar.is-compare {
  background: var(--cv-compare);
  transform: translateY(-6px);
}

.bar.is-swap {
  background: var(--cv-swap);
  transform: translateY(-10px);
}

.bar.is-sorted {
  background: var(--cv-sorted);
}

.index {
  margin-top: 8px;
  font-size: 12px;
  color: var(--cv-text-secondary);
}
</style>
