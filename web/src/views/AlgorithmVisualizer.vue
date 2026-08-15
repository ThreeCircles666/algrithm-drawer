<template>
  <div class="page">
    <div class="head">
      <div>
        <h1 class="page-title">{{ meta.nameZh }} · {{ meta.name }}</h1>
        <p class="page-subtitle">
          识别算法后自动选择 {{ meta.vizType }}。可播放、暂停、单步执行，并同步代码、变量与讲解。
        </p>
      </div>
      <el-button :type="saved ? 'success' : 'primary'" @click="save">
        {{ saved ? '已保存到算法演示库' : '保存到算法演示库' }}
      </el-button>
    </div>

    <div class="workspace">
      <CodePanel :code="code" :language="meta.language" :highlight-line="currentStep?.line ?? null" />

      <div class="center surface">
        <div class="viz-head">
          <span class="section-label">动画区域</span>
          <el-tag size="small" effect="plain">{{ meta.vizType }}</el-tag>
        </div>
        <div class="viz-body">
          <BubbleSortVisual v-if="algorithmId === 'bubble-sort'" :state="bubbleState" />
          <BinarySearchVisual v-else-if="algorithmId === 'binary-search'" :state="binaryState" />
          <BfsVisual v-else :state="bfsState" />
        </div>
      </div>

      <div class="right">
        <StatePanel :variables="currentStep?.variables ?? {}" />
        <ExplainPanel :description="currentStep?.description" />
      </div>
    </div>

    <PlayerControls
      :is-playing="isPlaying"
      :is-first="isFirst"
      :is-last="isLast"
      :current-index="currentIndex"
      :total="total"
      :speed="speed"
      @play="play"
      @pause="pause"
      @prev="prev"
      @next="next"
      @reset="reset"
      @set-speed="setSpeed"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import CodePanel from '@/components/algorithm/CodePanel.vue'
import PlayerControls from '@/components/algorithm/PlayerControls.vue'
import StatePanel from '@/components/algorithm/StatePanel.vue'
import ExplainPanel from '@/components/algorithm/ExplainPanel.vue'
import BubbleSortVisual from '@/components/algorithm/BubbleSortVisual.vue'
import BinarySearchVisual from '@/components/algorithm/BinarySearchVisual.vue'
import BfsVisual from '@/components/algorithm/BfsVisual.vue'
import {
  ALGORITHM_METAS,
  BUBBLE_ARRAY,
  BINARY_ARRAY,
  BINARY_TARGET,
  getAlgorithmCode,
} from '@/mock/algorithms'
import { generateSteps } from '@/algorithms'
import { useAlgorithmPlayer } from '@/composables/useAlgorithmPlayer'
import { useLibraryStore } from '@/stores/library'
import { useAnalysisStore } from '@/stores/analysis'
import type {
  AlgorithmId,
  AlgorithmStep,
  BinaryVisualState,
  BfsVisualState,
  BubbleVisualState,
} from '@/types/algorithm'

const VALID_IDS: AlgorithmId[] = ['bubble-sort', 'binary-search', 'bfs']

const route = useRoute()
const router = useRouter()
const library = useLibraryStore()
const analysisStore = useAnalysisStore()

const algorithmId = computed<AlgorithmId>(() => {
  const id = String(route.params.id)
  return VALID_IDS.includes(id as AlgorithmId) ? (id as AlgorithmId) : 'bubble-sort'
})

const meta = computed(() => ALGORITHM_METAS[algorithmId.value])
const code = computed(() => analysisStore.code && analysisStore.lastAlgorithmId === algorithmId.value
  ? analysisStore.code
  : getAlgorithmCode(algorithmId.value))

const steps = ref<AlgorithmStep[]>([])
const { currentIndex, currentStep, isPlaying, speed, total, isFirst, isLast, play, pause, next, prev, reset, setSpeed } =
  useAlgorithmPlayer(steps)

watch(
  algorithmId,
  (id) => {
    if (!VALID_IDS.includes(id)) {
      router.replace('/visualizer/bubble-sort')
      return
    }
    steps.value = generateSteps(id)
  },
  { immediate: true },
)

const bubbleState = computed<BubbleVisualState>(() => {
  const visual = currentStep.value?.visualState as BubbleVisualState | undefined
  return visual?.type === 'array-bar'
    ? visual
    : {
        type: 'array-bar',
        array: BUBBLE_ARRAY,
        comparing: null,
        swapping: null,
        sorted: [],
        i: null,
        j: null,
      }
})

const binaryState = computed<BinaryVisualState>(() => {
  const visual = currentStep.value?.visualState as BinaryVisualState | undefined
  return visual?.type === 'search-range'
    ? visual
    : {
        type: 'search-range',
        array: BINARY_ARRAY,
        left: 0,
        right: BINARY_ARRAY.length - 1,
        mid: null,
        target: BINARY_TARGET,
        foundIndex: null,
        eliminated: BINARY_ARRAY.map(() => false),
      }
})

const bfsState = computed<BfsVisualState>(() => {
  const visual = currentStep.value?.visualState as BfsVisualState | undefined
  return visual?.type === 'graph-traversal'
    ? visual
    : {
        type: 'graph-traversal',
        current: null,
        visited: [],
        queue: [],
        path: [],
        activeEdge: null,
        neighbor: null,
      }
})

const saved = computed(() => library.isSaved(algorithmId.value))

function save() {
  library.saveAlgorithm(algorithmId.value)
  ElMessage.success('已保存到算法演示库')
}
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.workspace {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 260px;
  gap: 16px;
  min-height: 540px;
}

.center {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.viz-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.viz-body {
  flex: 1;
  min-height: 360px;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

@media (max-width: 1200px) {
  .workspace {
    grid-template-columns: 1fr;
    min-height: 0;
  }
}
</style>
