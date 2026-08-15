<template>
  <div class="page">
    <div>
      <h1 class="page-title">代码分析</h1>
      <p class="page-subtitle">
        上传或粘贴代码 → AI 理解算法 → 自动选择可视化方案 → 生成可交互教学动画。
      </p>
    </div>

    <section class="surface body">
      <div class="toolbar">
        <div class="examples">
          <span class="label">预置示例</span>
          <el-button
            v-for="item in examples"
            :key="item.id"
            :type="activeExample === item.id ? 'primary' : 'default'"
            @click="loadExample(item.id)"
          >
            {{ item.label }}
          </el-button>
        </div>
        <el-upload :auto-upload="false" :show-file-list="false" accept=".py,.js,.ts,.java,.c,.cpp" :on-change="onUpload">
          <el-button>上传代码文件</el-button>
        </el-upload>
      </div>

      <CodeEditor v-model="code" :filename="filename" />

      <div class="run-row">
        <el-button type="primary" size="large" :loading="running" @click="analyze">
          开始分析
        </el-button>
        <span class="hint"></span>
      </div>
    </section>

    <section v-if="running" class="surface progress-box">
      <div class="section-label">Agent 正在工作</div>
      <ul class="agent-log">
        <li
          v-for="(item, index) in ANALYSIS_PROGRESS"
          :key="item"
          :class="{ done: index < progressIndex, current: index === progressIndex }"
        >
          {{ item }}
        </li>
      </ul>
    </section>

    <section v-if="result && !running" class="surface result">
      <div class="result-top">
        <div>
          <div class="section-label">AI 分析结果</div>
          <h2>{{ result.algorithmName }}</h2>
          <p>{{ result.summary }}</p>
        </div>
        <el-tag type="success">置信度 {{ Math.round(result.confidence * 100) }}%</el-tag>
      </div>

      <div class="kv">
        <div><span>编程语言</span><strong>{{ result.language }}</strong></div>
        <div><span>识别算法</span><strong>{{ result.algorithmName }}</strong></div>
        <div><span>算法类型</span><strong>{{ result.category }}</strong></div>
        <div><span>时间复杂度</span><strong>{{ result.timeComplexity }}</strong></div>
        <div><span>空间复杂度</span><strong>{{ result.spaceComplexity }}</strong></div>
        <div class="viz"><span>推荐可视化方式</span><strong>{{ result.vizType }}</strong></div>
      </div>

      <el-button type="primary" size="large" @click="goVisualize">
        生成算法动画
      </el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UploadFile } from 'element-plus'
import CodeEditor from '@/components/code/CodeEditor.vue'
import { SAMPLE_CODES } from '@/mock/sampleCodes'
import { ANALYSIS_PROGRESS } from '@/mock/lesson'
import { detectLanguage } from '@/utils/languageDetect'
import { buildAnalysisResult, detectAlgorithm } from '@/utils/algorithmDetect'
import { useAnalysisStore } from '@/stores/analysis'
import type { AlgorithmId, AnalysisResult } from '@/types/algorithm'

const router = useRouter()
const analysisStore = useAnalysisStore()

const examples: Array<{ id: AlgorithmId; label: string }> = [
  { id: 'bubble-sort', label: '冒泡排序' },
  { id: 'binary-search', label: '二分查找' },
  { id: 'bfs', label: 'BFS' },
]

const code = ref<string>(analysisStore.code)
const filename = ref(analysisStore.filename)
const activeExample = ref<AlgorithmId | ''>('bubble-sort')
const running = ref(false)
const progressIndex = ref(0)
const result = ref<AnalysisResult | null>(analysisStore.result)

function loadExample(id: AlgorithmId) {
  activeExample.value = id
  filename.value = ''
  code.value = SAMPLE_CODES[id]
  result.value = null
  analysisStore.resetResult()
}

async function onUpload(file: UploadFile) {
  const raw = file.raw
  if (!raw) return
  filename.value = raw.name
  activeExample.value = ''
  code.value = await raw.text()
  result.value = null
}

async function wait(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function analyze() {
  if (!code.value.trim()) return
  running.value = true
  result.value = null
  progressIndex.value = 0
  analysisStore.setCode(code.value, filename.value)

  for (let i = 0; i < ANALYSIS_PROGRESS.length; i++) {
    progressIndex.value = i
    await wait(260)
  }

  const language = detectLanguage(code.value, filename.value)
  const algorithmId = detectAlgorithm(code.value)
  const next = buildAnalysisResult(algorithmId, language)
  result.value = next
  analysisStore.setResult(next)
  running.value = false
}

function goVisualize() {
  if (!result.value) return
  router.push(`/visualizer/${result.value.algorithmId}`)
}
</script>

<style scoped>
.body {
  padding: 18px 20px 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.examples {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.label {
  font-size: 13px;
  color: var(--cv-text-secondary);
}

.run-row {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.hint {
  font-size: 12px;
  color: var(--cv-text-secondary);
}

.progress-box {
  padding: 18px 22px 20px;
}

.agent-log {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agent-log li {
  font-size: 14px;
  color: #94a3b8;
}

.agent-log li.done {
  color: var(--cv-success);
}

.agent-log li.current {
  color: var(--cv-primary);
  font-weight: 700;
}

.result {
  padding: 22px 24px 24px;
}

.result-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.result-top h2 {
  margin: 8px 0 6px;
  font-size: 22px;
}

.result-top p {
  margin: 0;
  color: var(--cv-text-secondary);
  font-size: 13px;
  max-width: 640px;
}

.kv {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 20px 0;
}

.kv > div {
  background: #f8fafc;
  border-radius: 10px;
  padding: 12px 14px;
}

.kv span {
  display: block;
  font-size: 12px;
  color: var(--cv-text-secondary);
  margin-bottom: 6px;
}

.kv strong {
  font-size: 15px;
}

.viz strong {
  color: var(--cv-primary);
}

@media (max-width: 900px) {
  .kv {
    grid-template-columns: 1fr;
  }
}
</style>
