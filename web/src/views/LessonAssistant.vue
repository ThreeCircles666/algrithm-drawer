<template>
  <div class="page">
    <div>
      <h1 class="page-title">AI 备课</h1>
      <p class="page-subtitle">上传课件后，Agent 会模拟分析知识点并生成备课建议。当前为演示流程，不解析真实文件。</p>
    </div>

    <section class="surface upload">
      <div class="upload-title">上传课件</div>
      <div class="types">
        <span v-for="type in fileTypes" :key="type" class="type-tag">{{ type }}</span>
      </div>
      <el-upload
        :auto-upload="false"
        :show-file-list="false"
        accept=".pdf,.ppt,.pptx,.docx"
        :on-change="onFileChange"
      >
        <el-button type="primary">选择课件文件</el-button>
      </el-upload>
      <div v-if="fileName" class="file-name">已选择：{{ fileName }}</div>
    </section>

    <section v-if="running" class="surface progress-box">
      <el-icon class="spin" :size="18"><Loading /></el-icon>
      <span>{{ currentProgress }}</span>
    </section>

    <section v-if="showResult" class="result">
      <div class="surface result-head">
        <div>
          <div class="course">{{ LESSON_RESULT.course }}</div>
          <div class="chapter">——{{ LESSON_RESULT.chapter }}</div>
        </div>
        <el-tag type="success" effect="plain">Mock 分析结果</el-tag>
      </div>

      <div class="grid">
        <article class="surface block">
          <h3>教学目标</h3>
          <ul>
            <li v-for="item in LESSON_RESULT.objectives" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="surface block">
          <h3>核心知识点</h3>
          <ul>
            <li v-for="item in LESSON_RESULT.knowledge" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="surface block">
          <h3>教学重点</h3>
          <ul>
            <li v-for="item in LESSON_RESULT.focus" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="surface block">
          <h3>教学难点</h3>
          <ul>
            <li v-for="item in LESSON_RESULT.difficulty" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="surface block">
          <h3>学生易错点</h3>
          <ul>
            <li v-for="item in LESSON_RESULT.mistakes" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="surface block">
          <h3>教学建议</h3>
          <ul>
            <li v-for="item in LESSON_RESULT.suggestions" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>

      <div class="surface recommend">
        <h3>推荐算法演示</h3>
        <p>根据课件主题，建议在课堂上使用以下可视化资源。</p>
        <div class="rec-actions">
          <el-button
            v-for="item in LESSON_RESULT.recommended"
            :key="item.id"
            type="primary"
            plain
            @click="router.push(`/visualizer/${item.id}`)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UploadFile } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { LESSON_PROGRESS, LESSON_RESULT } from '@/mock/lesson'

const router = useRouter()
const fileTypes = ['PDF', 'PPT', 'PPTX', 'DOCX']
const fileName = ref('')
const running = ref(false)
const showResult = ref(false)
const currentProgress = ref('')

async function wait(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function onFileChange(file: UploadFile) {
  fileName.value = file.name
  showResult.value = false
  running.value = true

  for (const text of LESSON_PROGRESS) {
    currentProgress.value = text
    await wait(380)
  }

  running.value = false
  showResult.value = true
}
</script>

<style scoped>
.upload {
  padding: 22px 24px;
}

.upload-title {
  font-weight: 700;
  margin-bottom: 10px;
}

.types {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.type-tag {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--cv-primary-soft);
  color: var(--cv-primary);
  font-weight: 600;
}

.file-name {
  margin-top: 12px;
  font-size: 13px;
  color: var(--cv-text-secondary);
}

.progress-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  color: var(--cv-primary);
  font-weight: 600;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.result-head {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course {
  font-size: 20px;
  font-weight: 700;
}

.chapter {
  margin-top: 4px;
  color: var(--cv-text-secondary);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

.block {
  padding: 18px 20px;
}

.block h3,
.recommend h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.block ul {
  margin: 0;
  padding-left: 18px;
  color: #334155;
  font-size: 13px;
  line-height: 1.8;
}

.recommend {
  margin-top: 16px;
  padding: 18px 20px;
}

.recommend p {
  margin: 0 0 14px;
  color: var(--cv-text-secondary);
  font-size: 13px;
}

.rec-actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
