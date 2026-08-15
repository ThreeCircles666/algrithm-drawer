import type { AlgorithmId, AlgorithmStep } from '@/types/algorithm'
import { generateBubbleSortSteps } from '@/algorithms/bubbleSort'
import { generateBinarySearchSteps } from '@/algorithms/binarySearch'
import { generateBfsSteps } from '@/algorithms/bfs'

export function generateSteps(id: AlgorithmId): AlgorithmStep[] {
  switch (id) {
    case 'bubble-sort':
      return generateBubbleSortSteps()
    case 'binary-search':
      return generateBinarySearchSteps()
    case 'bfs':
      return generateBfsSteps()
  }
}
