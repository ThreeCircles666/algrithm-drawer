<template>
  <div class="editor">
    <div class="editor-head">
      <span>代码编辑区</span>
      <span v-if="filename" class="file">{{ filename }}</span>
    </div>
    <textarea
      :value="modelValue"
      spellcheck="false"
      placeholder="粘贴代码，或点击上方示例自动填入"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  filename?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.editor {
  border: 1px solid var(--cv-border);
  border-radius: var(--cv-radius);
  overflow: hidden;
  background: #fff;
}

.editor-head {
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  background: #f8fafc;
  border-bottom: 1px solid var(--cv-border);
  font-size: 13px;
  color: var(--cv-text-secondary);
}

.file {
  color: var(--cv-primary);
  font-family: var(--mono);
}

textarea {
  width: 100%;
  min-height: 320px;
  border: 0;
  outline: none;
  resize: vertical;
  padding: 14px 16px;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.65;
  color: var(--cv-text);
  background: #fff;
}
</style>
