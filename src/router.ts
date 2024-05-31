import type { RouteRecordRaw } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'

import Landing from './pages/index.vue'
import User from './pages/user/index.vue'
import Admin from './pages/admin/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { layout: 'empty' }
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { layout: 'admin' }
  },
  ...setupLayouts(generatedRoutes)
]
const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
