// router/index.ts

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth'  // 导入 Pinia store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/shortdrama',
      component: () => import('@/views/home/shortdrama.vue')
    },
    {
      path:'/comic',
      component:()=>import('@/views/home/comic.vue')
    },
    {
      path: '/subscribe',
      component: () => import('@/views/home/subscribe.vue')
    },
    {
      path: '/bloglist',
      component: () => import('@/views/home/bloglist.vue')
    },
    {
      path:'/blogDetails/:id',
      component:()=>import('@/views/home/blogDetails.vue')
    },
    {
      path: '/userinfo',
      component: () => import('@/views/home/userinfo.vue')
    },
    {
      path: '/Playpage/:id',
      component: () => import('@/views/Playpage/index.vue')
    },
    {
      path:'/search/:id',
      component:()=>import('@/views/home/search.vue')
    },{
      path:'/useragreement',
      component:()=>import('@/views/agreement/useragreement.vue')
    },
    {
      path:'/PrivacyPolicy',
      component:()=>import('@/views/agreement/PrivacyPolicy.vue')
    }
  ]
});

// 设置全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取 Pinia 中的 authStore 和 token
  const authStore = useAuthStore()
  const token = authStore.getToken

  // 如果访问的是需要权限的页面，并且没有 token，则跳转到登录页
  if (to.path === '/userinfo' && !token) {
    return next('/login')  // 没有 token 跳转到登录页面
  }

  // 允许访问其他页面
  next()
})

router.afterEach(() => {
  // 在路由切换后更新语言
  const selectedLanguage = localStorage.getItem('selectedLanguage');
  if (selectedLanguage) {
    window.translate.changeLanguage(selectedLanguage);
  }
});

export default router;
