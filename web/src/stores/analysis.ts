import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AlgorithmId, AnalysisResult } from '@/types/algorithm'
import { SAMPLE_CODES } from '@/mock/sampleCodes'

export const useAnalysisStore = defineStore('analysis', () => {
  const code = ref<string>(SAMPLE_CODES['bubble-sort'])
  const filename = ref('')
  const result = ref<AnalysisResult | null>(null)
  const lastAlgorithmId = ref<AlgorithmId>('bubble-sort')

  function setCode(next: string, nextFilename = '') {
    code.value = next
    filename.value = nextFilename
  }

  function setResult(next: AnalysisResult) {
    result.value = next
    lastAlgorithmId.value = next.algorithmId
  }

  function resetResult() {
    result.value = null
  }

  return {
    code,
    filename,
    result,
    lastAlgorithmId,
    setCode,
    setResult,
    resetResult,
  }
})
