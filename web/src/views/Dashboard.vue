<template>
  <div class="page">
    <section class="hero surface">
      <div class="hero-kicker">面向编程课程教师的教学 Agent</div>
      <h1 class="hero-title">让代码自动变成可交互的算法教学动画</h1>
      <p class="hero-desc">
        上传或粘贴代码后，Agent 会识别算法、选择可视化方案，并生成可单步讲解的课堂动画。
      </p>
      <div class="hero-actions">
        <el-button type="primary" size="large" @click="router.push('/lesson')">
          上传课件生成备课建议
        </el-button>
        <el-button size="large" @click="router.push('/analysis')">
          上传代码生成算法动画
        </el-button>
      </div>
    </section>

    <section class="stats">
      <div class="stat surface">
        <div class="stat-num">{{ DASHBOARD_STATS.analyzed }}</div>
        <div class="stat-label">已分析代码</div>
      </div>
      <div class="stat surface">
        <div class="stat-num">{{ DASHBOARD_STATS.animations }}</div>
        <div class="stat-label">已生成动画</div>
      </div>
      <div class="stat surface">
        <div class="stat-num">{{ resourceCount }}</div>
        <div class="stat-label">算法资源</div>
      </div>
    </section>

    <section>
      <div class="block-head">
        <h2 class="page-title">最近生成的算法资源</h2>
        <el-button text type="primary" @click="router.push('/library')">查看全部</el-button>
      </div>
      <div class="recent">
        <button
          v-for="item in recent"
          :key="item.id"
          class="recent-item surface"
          type="button"
          @click="router.push(`/visualizer/${item.id}`)"
        >
          <div class="recent-name">{{ item.nameZh }}</div>
          <div class="recent-en">{{ item.name }}</div>
          <div class="recent-meta">{{ item.category }} · {{ item.vizType }}</div>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ALGORITHM_METAS, DASHBOARD_STATS } from '@/mock/algorithms'
import { useLibraryStore } from '@/stores/library'

const router = useRouter()
const library = useLibraryStore()

const recent = [
  ALGORITHM_METAS['bubble-sort'],
  ALGORITHM_METAS['binary-search'],
  ALGORITHM_METAS.bfs,
]

const resourceCount = computed(() => Math.max(DASHBOARD_STATS.resources, library.items.length))
</script>

<style scoped>
.hero {
  padding: 28px 32px;
}

.hero-kicker {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cv-primary);
}

.hero-title {
  margin: 10px 0 0;
  font-size: 28px;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.hero-desc {
  margin: 10px 0 0;
  max-width: 640px;
  color: var(--cv-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.hero-actions {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat {
  padding: 18px 20px;
}

.stat-num {
  font-size: 28px;
  font-weight: 700;
  color: var(--cv-primary);
}

.stat-label {
  margin-top: 4px;
  font-size: 13px;
  color: var(--cv-text-secondary);
}

.block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.recent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.recent-item {
  text-align: left;
  padding: 18px 20px;
  cursor: pointer;
}

.recent-item:hover {
  border-color: #93c5fd;
}

.recent-name {
  font-size: 18px;
  font-weight: 700;
}

.recent-en {
  margin-top: 4px;
  font-size: 13px;
  color: var(--cv-text-secondary);
}

.recent-meta {
  margin-top: 14px;
  font-size: 12px;
  color: var(--cv-primary);
}

@media (max-width: 900px) {
  .stats,
  .recent {
    grid-template-columns: 1fr;
  }
}
</style>
