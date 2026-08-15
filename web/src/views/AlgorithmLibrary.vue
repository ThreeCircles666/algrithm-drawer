<template>
  <div class="page">
    <div>
      <h1 class="page-title">算法演示库</h1>
      <p class="page-subtitle">已生成与内置的算法可视化教学资源。点击即可进入完整交互动画。</p>
    </div>

    <div class="cards">
      <article v-for="item in library.items" :key="item.id + (item.savedAt ?? '')" class="surface card">
        <div class="card-top">
          <div>
            <div class="name">{{ item.nameZh }}</div>
            <div class="en">{{ item.name }}</div>
          </div>
          <el-tag :type="item.source === 'generated' ? 'success' : 'info'" effect="plain" size="small">
            {{ item.source === 'generated' ? '已保存' : '内置' }}
          </el-tag>
        </div>
        <p class="desc">{{ item.description }}</p>
        <div class="meta">
          <div><span>算法分类</span>{{ item.category }}</div>
          <div><span>编程语言</span>{{ item.language }}</div>
          <div><span>时间复杂度</span>{{ item.timeComplexity }}</div>
          <div><span>难度</span>{{ item.difficulty }}</div>
          <div class="full"><span>可视化类型</span>{{ item.vizType }}</div>
        </div>
        <el-button type="primary" @click="router.push(`/visualizer/${item.id}`)">查看演示</el-button>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLibraryStore } from '@/stores/library'

const router = useRouter()
const library = useLibraryStore()
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.name {
  font-size: 18px;
  font-weight: 700;
}

.en {
  margin-top: 4px;
  font-size: 13px;
  color: var(--cv-text-secondary);
}

.desc {
  margin: 0;
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
  min-height: 42px;
}

.meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
  font-size: 13px;
}

.meta span {
  display: block;
  font-size: 11px;
  color: var(--cv-text-secondary);
  margin-bottom: 2px;
}

.full {
  grid-column: 1 / -1;
}

@media (max-width: 1100px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
