<template>
<div class="mian">
  <div class="blogDetails">
    <navbar></navbar>
    <el-card shadow="hover">
      <!-- 博客标题 -->
      <h1 class="blog-title">{{ blogData.title }}</h1>
      <!-- 博客日期 -->
      <p class="blog-date">发布日期：{{ blogData.created }}</p>
      <!-- 博客内容 -->
      <div class="blog-content" v-html="blogData.content"></div>
    </el-card>
    <FooterComponent></FooterComponent>
  </div>
</div>
</template>

<script lang="ts" setup>
import navbar from '@/components/header.vue'
import FooterComponent from "@/components/footer.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import{Getarticledetail} from '@/api/blog'

// 模拟博客数据（实际情况下可从后端接口获取数据）
const blogData = ref<any>([])

// 获取路由参数
const route = useRoute();
const id =route.params.id ; // 将字符串 id 转换为数字


const getarticledetail=async ()=>{
  const res = await Getarticledetail(id)
  // console.log(res);
  blogData.value=res
  // console.log(blogData.value);
}

onMounted(() => {
  // console.log(id);
  getarticledetail()

});
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.mian {
  width: 100%;
  height: auto;
  margin: 0;
  background-color: rgb(19, 22, 26);
}
.blogDetails {
  margin: 20px auto;
  max-width: 1200px;
  min-height: 100vh;
  line-height: 1.6;
  background-color: rgb(19, 22, 26);
  color: white;
}

.blog-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.blog-date {
  text-align: center;
  font-size: 0.9rem;
  color: white;
  margin-bottom: 20px;
}

.blog-content {
  width: 800px;
  height: auto;
  margin: auto;
  text-align: center;
  font-size: 1rem;
  min-height: 50vh;
}
</style>
