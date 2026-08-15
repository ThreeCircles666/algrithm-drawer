export type AlgorithmId = 'bubble-sort' | 'binary-search' | 'bfs'

export type VizTypeKey = 'array-bar' | 'search-range' | 'graph-traversal'

export interface AlgorithmMeta {
  id: AlgorithmId
  name: string
  nameZh: string
  category: string
  language: string
  timeComplexity: string
  spaceComplexity: string
  difficulty: string
  vizType: string
  vizTypeKey: VizTypeKey
  description: string
}

export interface AlgorithmStep<T = unknown> {
  id: number
  line: number
  description: string
  variables: Record<string, unknown>
  visualState: T
}

export interface BubbleVisualState {
  type: 'array-bar'
  array: number[]
  comparing: [number, number] | null
  swapping: [number, number] | null
  sorted: number[]
  i: number | null
  j: number | null
}

export interface BinaryVisualState {
  type: 'search-range'
  array: number[]
  left: number
  right: number
  mid: number | null
  target: number
  foundIndex: number | null
  eliminated: boolean[]
}

export interface GraphNode {
  id: string
  x: number
  y: number
}

export interface GraphEdge {
  from: string
  to: string
}

export interface BfsVisualState {
  type: 'graph-traversal'
  current: string | null
  visited: string[]
  queue: string[]
  path: string[]
  activeEdge: [string, string] | null
  neighbor: string | null
}

export interface LibraryItem extends AlgorithmMeta {
  savedAt?: string
  source: 'builtin' | 'generated'
}

export interface AnalysisResult {
  language: string
  algorithmId: AlgorithmId
  algorithmName: string
  category: string
  timeComplexity: string
  spaceComplexity: string
  vizType: string
  vizTypeKey: VizTypeKey
  confidence: number
  summary: string
}
