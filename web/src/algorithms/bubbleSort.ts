import type { AlgorithmStep, BubbleVisualState } from '@/types/algorithm'
import { BUBBLE_ARRAY } from '@/mock/algorithms'

interface PushInput {
  line: number
  description: string
  variables: Record<string, unknown>
  extra?: Partial<Omit<BubbleVisualState, 'type' | 'array' | 'sorted'>>
}

export function generateBubbleSortSteps(
  source: number[] = BUBBLE_ARRAY,
): AlgorithmStep<BubbleVisualState>[] {
  const arr = [...source]
  const n = arr.length
  const sorted: number[] = []
  const steps: AlgorithmStep<BubbleVisualState>[] = []
  let id = 0

  const snapshot = (
    extra: Partial<Omit<BubbleVisualState, 'type' | 'array' | 'sorted'>> = {},
  ): BubbleVisualState => ({
    type: 'array-bar',
    array: [...arr],
    comparing: extra.comparing ?? null,
    swapping: extra.swapping ?? null,
    sorted: [...sorted],
    i: extra.i ?? null,
    j: extra.j ?? null,
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
    description: `读取数组长度 n = ${n}，准备开始冒泡排序。`,
    variables: { n, arr: [...arr] },
  })

  for (let i = 0; i < n; i++) {
    push({
      line: 4,
      description: `开始第 ${i + 1} 轮，i = ${i}。本轮会把未排序区间的最大值移动到末尾。`,
      variables: { i, n },
      extra: { i },
    })

    for (let j = 0; j < n - i - 1; j++) {
      const left = arr[j]
      const right = arr[j + 1]

      push({
        line: 7,
        description: `当前比较 ${left} 和 ${right}。`,
        variables: { i, j, 'arr[j]': left, 'arr[j + 1]': right },
        extra: { i, j, comparing: [j, j + 1] },
      })

      if (left > right) {
        arr[j] = right
        arr[j + 1] = left
        push({
          line: 8,
          description: `由于 ${left} > ${right}，因此交换两个元素的位置。`,
          variables: { i, j, 'arr[j]': arr[j], 'arr[j + 1]': arr[j + 1] },
          extra: { i, j, comparing: [j, j + 1], swapping: [j, j + 1] },
        })
      } else {
        push({
          line: 7,
          description: `${left} ≤ ${right}，顺序已经正确，无需交换。`,
          variables: { i, j, 'arr[j]': left, 'arr[j + 1]': right },
          extra: { i, j, comparing: [j, j + 1] },
        })
      }
    }

    const settled = n - 1 - i
    if (!sorted.includes(settled)) sorted.push(settled)

    push({
      line: 4,
      description: `第 ${i + 1} 轮结束，下标 ${settled} 的元素已就位。`,
      variables: { i, settledIndex: settled, arr: [...arr] },
      extra: { i },
    })
  }

  push({
    line: 10,
    description: '全部轮次完成，数组已有序，返回结果。',
    variables: { result: [...arr] },
  })

  return steps
}
