import type { AlgorithmStep, BinaryVisualState } from '@/types/algorithm'
import { BINARY_ARRAY, BINARY_TARGET } from '@/mock/algorithms'

interface PushInput {
  line: number
  description: string
  variables: Record<string, unknown>
  extra: Omit<BinaryVisualState, 'type' | 'array' | 'target' | 'eliminated'>
}

export function generateBinarySearchSteps(
  source: number[] = BINARY_ARRAY,
  target: number = BINARY_TARGET,
): AlgorithmStep<BinaryVisualState>[] {
  const arr = [...source]
  const n = arr.length
  const steps: AlgorithmStep<BinaryVisualState>[] = []
  let id = 0
  let left = 0
  let right = n - 1

  const eliminatedOf = (l: number, r: number): boolean[] =>
    arr.map((_, index) => index < l || index > r)

  const snapshot = (
    extra: Omit<BinaryVisualState, 'type' | 'array' | 'target' | 'eliminated'>,
  ): BinaryVisualState => ({
    type: 'search-range',
    array: arr,
    target,
    left: extra.left,
    right: extra.right,
    mid: extra.mid,
    foundIndex: extra.foundIndex,
    eliminated: eliminatedOf(extra.left, extra.right),
  })

  const push = ({ line, description, variables, extra }: PushInput) => {
    steps.push({
      id: id++,
      line,
      description,
      variables,
      visualState: snapshot(extra),
    })
  }

  push({
    line: 2,
    description: `初始化 left = 0，搜索区间从数组左端开始。目标值 target = ${target}。`,
    variables: { left: 0, target },
    extra: { left: 0, right: n - 1, mid: null, foundIndex: null },
  })

  push({
    line: 3,
    description: `初始化 right = ${n - 1}，当前搜索区间为整段有序数组。`,
    variables: { left: 0, right: n - 1, target },
    extra: { left: 0, right: n - 1, mid: null, foundIndex: null },
  })

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const midValue = arr[mid]

    push({
      line: 6,
      description: `计算中间位置 mid = (${left} + ${right}) // 2 = ${mid}，中间值为 ${midValue}。`,
      variables: { left, right, mid, target, 'arr[mid]': midValue },
      extra: { left, right, mid, foundIndex: null },
    })

    if (midValue === target) {
      push({
        line: 9,
        description: `中间值 ${midValue} 等于目标 ${target}，查找成功，返回下标 ${mid}。`,
        variables: { left, right, mid, target, found: mid },
        extra: { left, right, mid, foundIndex: mid },
      })
      return steps
    }

    if (midValue < target) {
      push({
        line: 11,
        description: `目标值 ${target} 大于中间值 ${midValue}，因此可以排除左半部分。`,
        variables: { left, right, mid, target, 'arr[mid]': midValue },
        extra: { left, right, mid, foundIndex: null },
      })
      left = mid + 1
      push({
        line: 12,
        description: `将 left 更新为 ${left}，搜索区间缩小为 [${left}, ${right}]。`,
        variables: { left, right, mid, target },
        extra: { left, right, mid: null, foundIndex: null },
      })
    } else {
      push({
        line: 14,
        description: `目标值 ${target} 小于中间值 ${midValue}，因此可以排除右半部分。`,
        variables: { left, right, mid, target, 'arr[mid]': midValue },
        extra: { left, right, mid, foundIndex: null },
      })
      right = mid - 1
      push({
        line: 15,
        description: `将 right 更新为 ${right}，搜索区间缩小为 [${left}, ${right}]。`,
        variables: { left, right, mid, target },
        extra: { left, right, mid: null, foundIndex: null },
      })
    }
  }

  push({
    line: 17,
    description: `搜索区间已空，未找到目标 ${target}，返回 -1。`,
    variables: { left, right, target, found: -1 },
    extra: { left, right, mid: null, foundIndex: null },
  })

  return steps
}
