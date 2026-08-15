<template>
  <div class="panel">
    <div class="section-label">AI 讲解</div>
    <p class="text">{{ description || '播放或单步执行后，这里会同步解释当前步骤。' }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  description?: string
}>()
</script>

<style scoped>
.panel {
  background: var(--cv-primary-soft);
  border: 1px solid #dbeafe;
  border-radius: var(--cv-radius);
  padding: 16px;
  flex: 1;
}

.text {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: #1e3a8a;
}
</style>
