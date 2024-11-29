<template>
<div class="mian">
  <navbar></navbar>
  <div class="search-page">
    <!-- 搜索框 -->
    <div class="search-bar">
      <input
        v-model="query"
        type="text"
        placeholder="搜索"
        class="search-input"
        @keydown.enter="search"
      />
      <button @click="search" class="search-button">搜索</button>
    </div>

    <!-- 搜索结果统计 -->
    <div v-if="results.length > 0" class="result-count">
      共 <span style="color: rgb(225, 68, 46);">{{ results.length }}</span> 条搜索结果
    </div>

    <!-- 搜索结果列表 -->
    <div v-if="results.length > 0" class="result-list">
      <div v-for="(result, index) in results" :key="index" class="result-item">
        <img :src="result.icon" alt="封面" class="result-image" />
        <div class="result-info">
          <h2 class="result-title">{{ result.name }}</h2>
          <div class="result-tags">
            <span class="tag">
              {{ result?.ftype === 0 ? '短剧' : '动漫' }}
            </span>
          </div>
          <p class="result-description">{{ result.desc }}</p>
          <div class="result-tags">
            <span v-for="(tag, idx) in result.types" :key="idx" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <tiny-pager mode="fixed" :current-page="currentPage" :page-size="3"  :page-sizes="[12, 18, 24,30]" :total="total" hide-on-single-page @current-change="handleCurrentChange"> </tiny-pager>
    </div>

    <!-- 无结果提示 -->
    <div v-else class="no-result">暂无搜索结果, 请重新试试吧</div>
  </div>
  <FooterComponent></FooterComponent>
</div>
</template>


<script lang="ts" setup>
import navbar from '@/components/header.vue'
import FooterComponent from "@/components/footer.vue";
import { ref,onMounted } from 'vue';
import { useRoute } from "vue-router";
import{GetSearch} from '@/api/home'
const route = useRoute();
// const router = useRouter();

const id = route.params.id
interface SearchResult {
  image: string;
  title: string;
  description: string;
  tags: string[];
}

const query = ref(""); // 搜索框内容
const results = ref<SearchResult[]>([]); // 搜索结果


const Searchlist =async ()=>{
  query.value=id
  const res = await GetSearch(query.value)
  console.log(res)
  results.value=res
}

const currentPage = ref(1);

const search = async () => {
  const res = await GetSearch(query.value)
  console.log(res)
  results.value=res
};

onMounted(() => {
  console.log(id);
  Searchlist()
});
</script>

<style scoped>
.mian {
  width: 100%;
  height: auto;
  margin: 0;
  background-color: rgb(19, 22, 26);
}
.search-page {
  max-width: 800px;
  min-height: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(19, 22, 26);
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  width: 60%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button {
  padding: 10px 20px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.result-count {
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-item {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.result-image {
  width: 150px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.result-info {
  flex: 1;
}

.result-title {
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.result-description {
  font-size: 14px;
  color: white;
  margin-bottom: 10px;
}

.result-tags {
  display: flex;
  gap: 5px;
}

.tag {
  background-color: rgb(255, 240, 235);
  font-weight: bold;
  color: rgb(225, 68, 46);
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 12px;
}

.no-result {
  height: 45vh;
  text-align: center;
  font-size: 16px;
  color: white;
}
</style>

