<template>
  <div class="player">
    <div class="actions">
      <el-button :disabled="isFirst" @click="emit('prev')">上一步</el-button>
      <el-button v-if="!isPlaying" type="primary" @click="emit('play')">播放</el-button>
      <el-button v-else type="warning" @click="emit('pause')">暂停</el-button>
      <el-button :disabled="isLast" @click="emit('next')">下一步</el-button>
      <el-button @click="emit('reset')">重新开始</el-button>
    </div>
    <div class="meta">
      <span class="step-count">Step {{ currentIndex + 1 }} / {{ total || 0 }}</span>
      <div class="speeds">
        <button
          v-for="option in SPEED_OPTIONS"
          :key="option"
          class="speed-btn"
          :class="{ active: speed === option }"
          type="button"
          @click="emit('setSpeed', option)"
        >
          {{ option }}x
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SPEED_OPTIONS } from '@/composables/useAlgorithmPlayer'

defineProps<{
  isPlaying: boolean
  isFirst: boolean
  isLast: boolean
  currentIndex: number
  total: number
  speed: number
}>()

const emit = defineEmits<{
  play: []
  pause: []
  prev: []
  next: []
  reset: []
  setSpeed: [value: number]
}>()
</script>

<style scoped>
.player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 12px 16px;
  background: var(--cv-surface);
  border: 1px solid var(--cv-border);
  border-radius: var(--cv-radius);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.step-count {
  font-size: 13px;
  color: var(--cv-text-secondary);
  font-variant-numeric: tabular-nums;
}

.speeds {
  display: flex;
  background: var(--cv-bg);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.speed-btn {
  border: 0;
  background: transparent;
  color: var(--cv-text-secondary);
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.speed-btn.active {
  background: #fff;
  color: var(--cv-primary);
  box-shadow: var(--cv-shadow);
}
</style>
