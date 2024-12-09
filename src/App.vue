<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth' // 导入 Pinia store
import { Getkeepalive } from '@/api/login'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const authStore = useAuthStore()
const token = authStore.getToken // 从 Pinia 获取 token
const isOnline = ref(true) // 定义用户在线状态
const heartbeatTimer= ref(false) // 定时器引用

const getkeepalive = async () => {
  if (token) {
    try {
      // console.log('发送心跳请求...')
      const res = await Getkeepalive()
      console.log(res)
      isOnline.value = true // 如果请求成功，设置用户为在线
    } catch (error) {
      console.error( error)
      isOnline.value = false // 如果请求失败，标记为不在线
    }
  } else {
    // console.warn('未检测到有效 token，停止心跳')
    isOnline.value = false
  }
}

// 初始化轮询逻辑
const startHeartbeat = () => {
  // 每分钟发送心跳请求
  heartbeatTimer.value = setInterval(async () => {
    await getkeepalive()
  }, 60 * 1000)

  // 超过2分钟无响应则标记为离线
  setTimeout(() => {
    if (heartbeatTimer.value) {
      // console.log('超过2分钟无心跳响应，用户视为离线')
      isOnline.value = false
    }
  }, 2 * 60 * 1000)
}

// 组件挂载时启动心跳检测
onMounted(() => {
  getkeepalive() // 立即发送一次心跳请求
  startHeartbeat()
})

// 组件卸载时清除定时器
onBeforeUnmount(() => {
  if (heartbeatTimer.value) {
    clearInterval(heartbeatTimer)
    heartbeatTimer.value = null
  }
})
</script>

<style scoped>
</style>
