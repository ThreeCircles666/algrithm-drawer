<template>
  <div class="visual">
    <div class="target">
      target = <strong>{{ state.target }}</strong>
    </div>
    <div class="legend">
      <span><i class="dot range"></i>当前搜索区间</span>
      <span><i class="dot mid"></i>mid</span>
      <span><i class="dot found"></i>已找到</span>
      <span><i class="dot out"></i>已排除</span>
    </div>
    <div class="cells">
      <div v-for="(value, index) in state.array" :key="index" class="cell-wrap">
        <div class="pointer">
          <span v-if="state.left === index" class="tag left">L</span>
          <span v-if="state.mid === index" class="tag mid">M</span>
          <span v-if="state.right === index" class="tag right">R</span>
        </div>
        <div
          class="cell"
          :class="{
            eliminated: state.eliminated[index] && state.foundIndex !== index,
            'in-range': !state.eliminated[index],
            'is-mid': state.mid === index,
            'is-found': state.foundIndex === index,
          }"
        >
          {{ value }}
        </div>
        <div class="index">{{ index }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BinaryVisualState } from '@/types/algorithm'

defineProps<{
  state: BinaryVisualState
}>()
</script>

<style scoped>
.visual {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}

.target {
  font-size: 14px;
  color: var(--cv-text-secondary);
}

.target strong {
  color: var(--cv-primary);
  font-size: 18px;
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

.range { background: #93c5fd; }
.mid { background: var(--cv-compare); }
.found { background: var(--cv-sorted); }
.out { background: #cbd5e1; }

.cells {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.cell-wrap {
  width: 56px;
  text-align: center;
}

.pointer {
  height: 28px;
  display: flex;
  justify-content: center;
  gap: 4px;
}

.tag {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  color: #fff;
}

.tag.left { background: #2563eb; }
.tag.mid { background: #d97706; }
.tag.right { background: #7c3aed; }

.cell {
  height: 56px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-weight: 700;
  border: 2px solid transparent;
  transition: all 0.25s ease;
  background: #e2e8f0;
  color: #94a3b8;
}

.cell.in-range {
  background: #dbeafe;
  color: #1e3a8a;
  border-color: #93c5fd;
}

.cell.is-mid {
  background: #fef3c7;
  color: #92400e;
  border-color: #f59e0b;
  transform: translateY(-6px);
}

.cell.is-found {
  background: #d1fae5;
  color: #065f46;
  border-color: #10b981;
  transform: scale(1.08);
}

.cell.eliminated {
  background: #f1f5f9;
  color: #cbd5e1;
  border-color: transparent;
  opacity: 0.55;
}

.index {
  margin-top: 8px;
  font-size: 12px;
  color: var(--cv-text-secondary);
}
</style>
