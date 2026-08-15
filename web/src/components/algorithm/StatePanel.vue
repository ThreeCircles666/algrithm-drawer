<template>
  <div class="panel">
    <div class="section-label">当前状态</div>
    <div v-if="entries.length" class="vars">
      <div v-for="item in entries" :key="item.key" class="row">
        <span class="key">{{ item.key }}</span>
        <span class="val mono">{{ item.value }}</span>
      </div>
    </div>
    <div v-else class="empty">等待算法开始执行</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatVariableValue } from '@/utils/algorithmDetect'

const props = defineProps<{
  variables: Record<string, unknown>
}>()

const entries = computed(() =>
  Object.entries(props.variables).map(([key, value]) => ({
    key,
    value: formatVariableValue(value),
  })),
)
</script>

<style scoped>
.panel {
  background: var(--cv-surface);
  border: 1px solid var(--cv-border);
  border-radius: var(--cv-radius);
  padding: 16px;
}

.vars {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 10px;
  background: #f8fafc;
  border-radius: 8px;
}

.key {
  color: var(--cv-text-secondary);
  font-size: 13px;
}

.val {
  font-size: 13px;
  font-weight: 600;
  text-align: right;
  word-break: break-all;
}

.empty {
  margin-top: 12px;
  color: var(--cv-text-secondary);
  font-size: 13px;
}
</style>
