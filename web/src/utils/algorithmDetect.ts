import type { AlgorithmId, AnalysisResult } from '@/types/algorithm'
import { ALGORITHM_METAS } from '@/mock/algorithms'

export function detectAlgorithm(code: string): AlgorithmId {
  const text = code.toLowerCase()

  if (
    text.includes('bubble_sort') ||
    text.includes('bubble sort') ||
    (text.includes('arr[j]') && text.includes('arr[j + 1]'))
  ) {
    return 'bubble-sort'
  }

  if (
    text.includes('binary_search') ||
    text.includes('binary search') ||
    (text.includes('left') && text.includes('right') && text.includes('mid'))
  ) {
    return 'binary-search'
  }

  if (
    text.includes('bfs') ||
    text.includes('breadth') ||
    (text.includes('queue') && text.includes('visited') && text.includes('neighbor'))
  ) {
    return 'bfs'
  }

  return 'bubble-sort'
}

export function buildAnalysisResult(algorithmId: AlgorithmId, language: string): AnalysisResult {
  const meta = ALGORITHM_METAS[algorithmId]
  return {
    language,
    algorithmId: meta.id,
    algorithmName: `${meta.name} / ${meta.nameZh}`,
    category: meta.category,
    timeComplexity: meta.timeComplexity,
    spaceComplexity: meta.spaceComplexity,
    vizType: meta.vizType,
    vizTypeKey: meta.vizTypeKey,
    confidence: 0.92,
    summary: `已识别为 ${meta.nameZh}，系统选择「${meta.vizType}」作为最适合课堂教学的可视化方案。`,
  }
}

export function formatVariableValue(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (Array.isArray(value)) return `[${value.join(', ')}]`
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}
