import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/auth' // 导入 Pinia store
import { TinyLoading } from '@opentiny/vue';

let loadingInstance: any = null;

// 创建 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 7000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
     // 显示加载动画
     loadingInstance = TinyLoading.service({
      text: '加载中...',
      customClass: 'new-loading', // 自定义类名
      background: 'rgba(0, 0, 0, 0.6)', // 半透明背景
    });
    // 获取 token
    const authStore = useAuthStore()
    const token = authStore.getToken // 从 Pinia 获取 token

    if (token) {
      // 如果 token 存在，则添加
      config.headers['token'] = `${token}`
    }

    return config;
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
     // 隐藏加载动画
     if (loadingInstance) loadingInstance.close();
    return response.data;
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    // 处理错误
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时，请重试！');
      return Promise.reject(error);
    }

    if (error.response && error.response.status == 403) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default instance;

