<template>
  <div class="visual">
    <div class="legend">
      <span><i class="dot current"></i>当前访问</span>
      <span><i class="dot queued"></i>等待访问</span>
      <span><i class="dot visited"></i>已访问</span>
    </div>

    <svg viewBox="0 0 420 300" class="graph">
      <line
        v-for="(edge, index) in edges"
        :key="`e-${index}`"
        :x1="pos[edge.from].x"
        :y1="pos[edge.from].y"
        :x2="pos[edge.to].x"
        :y2="pos[edge.to].y"
        class="edge"
        :class="{ active: isActiveEdge(edge.from, edge.to) }"
      />
      <g v-for="node in nodes" :key="node">
        <circle
          :cx="pos[node].x"
          :cy="pos[node].y"
          r="22"
          class="node"
          :class="nodeClass(node)"
        />
        <text :x="pos[node].x" :y="pos[node].y + 5" class="node-label">{{ node }}</text>
      </g>
    </svg>

    <div class="boards">
      <div class="board">
        <div class="board-label">Queue</div>
        <div class="chips">
          <span v-if="!state.queue.length" class="empty">[]</span>
          <span v-for="item in state.queue" :key="`q-${item}`" class="chip queue">{{ item }}</span>
        </div>
      </div>
      <div class="board">
        <div class="board-label">Visited</div>
        <div class="chips">
          <span v-if="!state.visited.length" class="empty">[]</span>
          <span v-for="item in state.visited" :key="`v-${item}`" class="chip visited">{{ item }}</span>
        </div>
      </div>
    </div>

    <div class="path">
      遍历路径：
      <strong>{{ state.path.length ? state.path.join(' → ') : '—' }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BfsVisualState } from '@/types/algorithm'

const props = defineProps<{
  state: BfsVisualState
}>()

const nodes = ['A', 'B', 'C', 'D', 'E', 'F']

const pos: Record<string, { x: number; y: number }> = {
  A: { x: 210, y: 42 },
  B: { x: 110, y: 130 },
  C: { x: 310, y: 130 },
  D: { x: 50, y: 230 },
  E: { x: 170, y: 230 },
  F: { x: 310, y: 230 },
}

const edges = [
  { from: 'A', to: 'B' },
  { from: 'A', to: 'C' },
  { from: 'B', to: 'D' },
  { from: 'B', to: 'E' },
  { from: 'C', to: 'F' },
]

function isActiveEdge(from: string, to: string) {
  const edge = props.state.activeEdge
  if (!edge) return false
  return (edge[0] === from && edge[1] === to) || (edge[0] === to && edge[1] === from)
}

function nodeClass(node: string) {
  if (props.state.current === node) return 'is-current'
  if (props.state.queue.includes(node)) return 'is-queued'
  if (props.state.visited.includes(node) || props.state.path.includes(node)) return 'is-visited'
  return ''
}
</script>

<style scoped>
.visual {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend {
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: var(--cv-text-secondary);
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

.current { background: var(--cv-current); }
.queued { background: var(--cv-queued); }
.visited { background: var(--cv-visited); }

.graph {
  width: 100%;
  max-height: 280px;
}

.edge {
  stroke: #cbd5e1;
  stroke-width: 3;
  transition: stroke 0.25s ease;
}

.edge.active {
  stroke: var(--cv-primary);
  stroke-width: 4;
}

.node {
  fill: #e2e8f0;
  stroke: #94a3b8;
  stroke-width: 2;
  transition: all 0.25s ease;
}

.node.is-queued {
  fill: #fef3c7;
  stroke: #d97706;
}

.node.is-visited {
  fill: #d1fae5;
  stroke: #059669;
}

.node.is-current {
  fill: #2563eb;
  stroke: #1d4ed8;
}

.node-label {
  fill: #0f172a;
  font-size: 14px;
  font-weight: 700;
  text-anchor: middle;
}

.node-label {
  pointer-events: none;
}

.node.is-current + .node-label {
  fill: #fff;
}

.boards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.board {
  background: #f8fafc;
  border-radius: 10px;
  padding: 10px 12px;
}

.board-label {
  font-size: 12px;
  color: var(--cv-text-secondary);
  margin-bottom: 8px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 28px;
}

.chip {
  min-width: 28px;
  text-align: center;
  border-radius: 6px;
  padding: 3px 8px;
  font-weight: 700;
  font-size: 13px;
}

.chip.queue {
  background: #fef3c7;
  color: #92400e;
}

.chip.visited {
  background: #d1fae5;
  color: #065f46;
}

.empty {
  color: #94a3b8;
  font-family: var(--mono);
}

.path {
  font-size: 13px;
  color: var(--cv-text-secondary);
}

.path strong {
  color: var(--cv-text);
}
</style>
