import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: { title: '工作台' },
        },
        {
          path: 'lesson',
          name: 'lesson',
          component: () => import('@/views/LessonAssistant.vue'),
          meta: { title: 'AI 备课' },
        },
        {
          path: 'analysis',
          name: 'analysis',
          component: () => import('@/views/CodeAnalysis.vue'),
          meta: { title: '代码分析' },
        },
        {
          path: 'library',
          name: 'library',
          component: () => import('@/views/AlgorithmLibrary.vue'),
          meta: { title: '算法演示库' },
        },
        {
          path: 'visualizer/:id',
          name: 'visualizer',
          component: () => import('@/views/AlgorithmVisualizer.vue'),
          meta: { title: '算法演示' },
        },
      ],
    },
  ],
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : '工作台'
  document.title = `${title} · CodeViz Agent`
})

export default router
