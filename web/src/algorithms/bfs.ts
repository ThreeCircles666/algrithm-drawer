import type { AlgorithmStep, BfsVisualState } from '@/types/algorithm'
import { BFS_GRAPH, BFS_START } from '@/mock/algorithms'

interface PushInput {
  line: number
  description: string
  variables: Record<string, unknown>
  extra: Omit<BfsVisualState, 'type'>
}

export function generateBfsSteps(
  graph: Record<string, string[]> = BFS_GRAPH,
  start: string = BFS_START,
): AlgorithmStep<BfsVisualState>[] {
  const steps: AlgorithmStep<BfsVisualState>[] = []
  let id = 0
  const visited: string[] = []
  const queue: string[] = []
  const path: string[] = []

  const push = ({ line, description, variables, extra }: PushInput) => {
    steps.push({
      id: id++,
      line,
      description,
      variables,
      visualState: { type: 'graph-traversal', ...extra },
    })
  }

  push({
    line: 2,
    description: '初始化 visited 为空列表，用于记录已经访问过的节点。',
    variables: { start, visited: [], queue: [] },
    extra: {
      current: null,
      visited: [],
      queue: [],
      path: [],
      activeEdge: null,
      neighbor: null,
    },
  })

  queue.push(start)
  visited.push(start)

  push({
    line: 3,
    description: `将起点 ${start} 放入队列，准备按层次向外扩展。`,
    variables: { start, queue: [...queue], visited: [...visited] },
    extra: {
      current: null,
      visited: [...visited],
      queue: [...queue],
      path: [],
      activeEdge: null,
      neighbor: null,
    },
  })

  push({
    line: 4,
    description: `把起点 ${start} 标记为已访问，避免重复入队。`,
    variables: { start, queue: [...queue], visited: [...visited] },
    extra: {
      current: start,
      visited: [...visited],
      queue: [...queue],
      path: [],
      activeEdge: null,
      neighbor: null,
    },
  })

  while (queue.length > 0) {
    const current = queue.shift() as string
    path.push(current)

    push({
      line: 7,
      description: `从队列取出当前节点 ${current}，开始访问。`,
      variables: {
        current,
        queue: [...queue],
        visited: [...visited],
        path: [...path],
      },
      extra: {
        current,
        visited: [...visited],
        queue: [...queue],
        path: [...path],
        activeEdge: null,
        neighbor: null,
      },
    })

    const neighbors = graph[current] ?? []
    for (const neighbor of neighbors) {
      push({
        line: 9,
        description: `检查 ${current} 的相邻节点 ${neighbor}。`,
        variables: {
          current,
          neighbor,
          queue: [...queue],
          visited: [...visited],
        },
        extra: {
          current,
          visited: [...visited],
          queue: [...queue],
          path: [...path],
          activeEdge: [current, neighbor],
          neighbor,
        },
      })

      if (!visited.includes(neighbor)) {
        visited.push(neighbor)
        queue.push(neighbor)
        push({
          line: 11,
          description: `当前访问节点 ${current}，并将尚未访问的相邻节点 ${neighbor} 加入队列。`,
          variables: {
            current,
            neighbor,
            queue: [...queue],
            visited: [...visited],
          },
          extra: {
            current,
            visited: [...visited],
            queue: [...queue],
            path: [...path],
            activeEdge: [current, neighbor],
            neighbor,
          },
        })
      } else {
        push({
          line: 10,
          description: `节点 ${neighbor} 已经访问过，跳过。`,
          variables: {
            current,
            neighbor,
            queue: [...queue],
            visited: [...visited],
          },
          extra: {
            current,
            visited: [...visited],
            queue: [...queue],
            path: [...path],
            activeEdge: [current, neighbor],
            neighbor,
          },
        })
      }
    }
  }

  push({
    line: 14,
    description: `广度优先遍历完成，访问顺序为 ${path.join(' → ')}。`,
    variables: {
      current: null,
      queue: [],
      visited: [...visited],
      path: [...path],
    },
    extra: {
      current: null,
      visited: [...visited],
      queue: [],
      path: [...path],
      activeEdge: null,
      neighbor: null,
    },
  })

  return steps
}
