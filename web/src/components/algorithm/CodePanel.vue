<template>
  <div class="code-panel">
    <div class="code-head">
      <span class="section-label">源代码</span>
      <span class="lang">{{ language }}</span>
    </div>
    <div class="code-body">
      <div
        v-for="(line, index) in lines"
        :key="index"
        class="code-line"
        :class="{ active: highlightLine === index + 1 }"
      >
        <span class="gutter">{{ index + 1 }}</span>
        <pre>{{ line || ' ' }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: string
  language?: string
  highlightLine?: number | null
}>()

const lines = computed(() => props.code.replace(/\r\n/g, '\n').split('\n'))
</script>

<style scoped>
.code-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  background: #0f172a;
  border-radius: var(--cv-radius);
  overflow: hidden;
  border: 1px solid #1e293b;
}

.code-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid #1e293b;
}

.section-label {
  color: #94a3b8;
}

.lang {
  font-size: 12px;
  color: #93c5fd;
}

.code-body {
  overflow: auto;
  padding: 8px 0 16px;
  flex: 1;
}

.code-line {
  display: grid;
  grid-template-columns: 44px 1fr;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.7;
  color: #cbd5e1;
}

.code-line.active {
  background: rgba(37, 99, 235, 0.28);
  box-shadow: inset 3px 0 0 #60a5fa;
  color: #fff;
}

.gutter {
  text-align: right;
  padding-right: 10px;
  color: #64748b;
  user-select: none;
}

.code-line.active .gutter {
  color: #93c5fd;
}

pre {
  margin: 0;
  padding-right: 12px;
  white-space: pre;
}
</style>
