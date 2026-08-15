import type { AlgorithmId, AlgorithmMeta, LibraryItem } from '@/types/algorithm'
import { SAMPLE_CODES } from '@/mock/sampleCodes'

export const BUBBLE_ARRAY = [38, 12, 45, 7, 26, 19]
export const BINARY_ARRAY = [3, 8, 12, 17, 23, 31, 42, 56, 68]
export const BINARY_TARGET = 42

export const BFS_GRAPH: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: [],
  F: [],
}

export const BFS_START = 'A'

export const ALGORITHM_METAS: Record<AlgorithmId, AlgorithmMeta> = {
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    nameZh: '冒泡排序',
    category: '排序算法',
    language: 'Python',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    difficulty: '入门',
    vizType: 'Array Bar Animation',
    vizTypeKey: 'array-bar',
    description: '通过相邻元素比较与交换，将较大值逐步“冒泡”到数组末尾。',
  },
  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    nameZh: '二分查找',
    category: '查找算法',
    language: 'Python',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    difficulty: '入门',
    vizType: 'Search Range Animation',
    vizTypeKey: 'search-range',
    description: '在有序数组中不断取中点比较，将搜索区间缩小一半。',
  },
  bfs: {
    id: 'bfs',
    name: 'Breadth First Search',
    nameZh: '广度优先搜索',
    category: '图遍历算法',
    language: 'Python',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    difficulty: '进阶',
    vizType: 'Graph Traversal Animation',
    vizTypeKey: 'graph-traversal',
    description: '从起点出发，按层次依次访问相邻节点，适合最短路径教学。',
  },
}

export const BUILTIN_LIBRARY: LibraryItem[] = (
  Object.values(ALGORITHM_METAS) as AlgorithmMeta[]
).map((meta) => ({
  ...meta,
  source: 'builtin' as const,
}))

export function getAlgorithmCode(id: AlgorithmId): string {
  return SAMPLE_CODES[id]
}

export const DASHBOARD_STATS = {
  analyzed: 18,
  animations: 12,
  resources: 3,
}
