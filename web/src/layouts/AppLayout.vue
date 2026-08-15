<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand">
        <div class="logo">CV</div>
        <div>
          <div class="brand-name">CodeViz Agent</div>
          <div class="brand-sub">编程教学智能辅助平台</div>
        </div>
      </div>

      <nav class="nav">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: isActive(item.to) }"
        >
          <el-icon :size="18"><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-foot">
        Demo MVP · 纯前端模拟
      </div>
    </aside>

    <div class="main">
      <header class="topbar">
        <div>
          <div class="top-title">CodeViz Agent</div>
          <div class="top-sub">编程教学智能辅助平台</div>
        </div>
        <div class="top-badge">AI Agent Demo</div>
      </header>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Monitor, Reading, MagicStick, Collection } from '@element-plus/icons-vue'

const route = useRoute()

const navItems = [
  { to: '/', label: '工作台', icon: Monitor },
  { to: '/lesson', label: 'AI 备课', icon: Reading },
  { to: '/analysis', label: '代码分析', icon: MagicStick },
  { to: '/library', label: '算法演示库', icon: Collection },
]

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 232px;
  flex-shrink: 0;
  background: var(--cv-sidebar);
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 20px 14px;
}

.brand {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 4px 8px 20px;
}

.logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--cv-primary);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 13px;
}

.brand-name {
  font-weight: 700;
  font-size: 14px;
  color: #fff;
}

.brand-sub {
  margin-top: 2px;
  font-size: 11px;
  color: #94a3b8;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #cbd5e1;
  font-size: 14px;
}

.nav-item:hover {
  background: var(--cv-sidebar-hover);
  color: #fff;
}

.nav-item.active {
  background: var(--cv-sidebar-active);
  color: #fff;
}

.sidebar-foot {
  margin-top: auto;
  padding: 12px 8px 4px;
  font-size: 11px;
  color: #64748b;
}

.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 64px;
  background: var(--cv-surface);
  border-bottom: 1px solid var(--cv-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
}

.top-title {
  font-size: 16px;
  font-weight: 700;
}

.top-sub {
  font-size: 12px;
  color: var(--cv-text-secondary);
  margin-top: 2px;
}

.top-badge {
  font-size: 12px;
  color: var(--cv-primary);
  background: var(--cv-primary-soft);
  border: 1px solid #dbeafe;
  border-radius: 999px;
  padding: 4px 10px;
  font-weight: 600;
}

.content {
  padding: 24px 28px 32px;
  flex: 1;
}

@media (max-width: 960px) {
  .sidebar {
    width: 76px;
    padding: 16px 8px;
  }

  .brand > div:last-child,
  .nav-item span,
  .sidebar-foot,
  .brand-sub {
    display: none;
  }

  .nav-item {
    justify-content: center;
  }

  .content {
    padding: 16px;
  }
}
</style>
