import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 获取本地存储的 token
  const token = ref<string | null>(localStorage.getItem('token') || null)

  // 登录方法
  function login(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken) // 保存到 localStorage
  }

  // 登出方法
  function logout() {
    token.value = null
    localStorage.removeItem('token') // 从 localStorage 移除
  }

  // 检查用户是否已登录
  const isLoggedIn = computed(() => token.value !== null)

  // 获取 token
  const getToken = computed(() => token.value)

  return { token, login, logout, isLoggedIn, getToken }
})
