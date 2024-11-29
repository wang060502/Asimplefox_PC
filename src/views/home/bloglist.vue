<template>
<div class="mian">
  <navbar></navbar>
  <div class="bloglist">
    <h1 class="title">博客列表</h1>

    <!-- 博客列表容器 -->
    <div class="blogs-container">
      <!-- 使用 v-for 渲染每篇博客 -->
      <div v-for="(blog, index) in blogs" :key="index" class="blog-item" @click="goblog(blog.id)">
        <img :src="blog.imageUrl" :alt="blog.title" class="blog-image" />
        <h3 class="blog-title">{{ blog.title }}</h3>
        <p class="blog-description">{{ blog.created }}</p>
        <a @click="goblog(blog.id)" class="read-more">阅读更多</a>
      </div>
    </div>

    <!-- 分页组件 -->
    <div class="pagination">
      <tiny-pager mode="fixed" :current-page="currentPage" :page-size="1"  :page-sizes="[8, 18, 24,30]" :total="total" hide-on-single-page @current-change="handleCurrentChange"> </tiny-pager>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import navbar from '@/components/header.vue'
import FooterComponent from "@/components/footer.vue";
import { GetarticleList } from '@/api/blog'
import { useRouter } from 'vue-router';
const router =useRouter()
const blogs = ref([
  { title: 'Do you know what to pay attention to when customizing furniture?', description: 'Before customizing furniture, you must first clarify your needs. This includes how many pieces of furniture you need, which rooms the furniture needs to be placed in, your budget, your preferences for furniture materials, colors, and styles, etc. At this stage, you can first make a detailed list and then communicate with professional custom furniture designers to help them help you better understand your needs.', image: '1', link: '/blog/1' },
]);

const currentPage = ref(1);
const total = ref(1)
const Getarticlelist = async ()=>{
  const res = await GetarticleList(currentPage.value)
  // console.log(res);
  blogs.value=res.records
  total.value=res.total

}
const handleCurrentChange = (val)=>{
  currentPage.value=val
  Getarticlelist()
  // console.log(currentPage.value);
}
const goblog =(id)=>{
  console.log(id);
  router.push('/blogDetails/'+id)
}
onMounted(()=>{
  Getarticlelist()
})
</script>

<style scoped>
.mian{
  width: 100%;
  height: auto;
  margin: 0;
  background-color: rgb(19, 22, 26);
}
.bloglist {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  background-color: rgb(19, 22, 26);
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}

/* 标题样式 */
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
}

/* 宫格布局样式 */
.blogs-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 20px;
}

/* 单个博客项样式 */
.blog-item {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  padding: 15px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.blog-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.blog-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 15px;
}

.blog-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #e14232;
  margin-bottom: 10px;
  white-space: nowrap; /* 不换行 */
  overflow: hidden;   /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.blog-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
  display: -webkit-box;           /* 必须设置为 flexbox 才能使用 line-clamp */
  -webkit-line-clamp: 2;         /* 限制最大显示两行 */
  -webkit-box-orient: vertical;  /* 垂直排列子元素 */
  overflow: hidden;              /* 隐藏超出部分 */
}

.read-more {
  font-size: 1rem;
  color: black;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

/* 分页样式 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 16px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1rem;
  color: #333;
}

/* 响应式调整 */
@media screen and (max-width: 1024px) {
  .blogs-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .blogs-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 480px) {
  .blogs-container {
    grid-template-columns: 1fr;
  }
}
</style>
