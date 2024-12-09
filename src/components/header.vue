<template>
    <div class="sticky-wrap">
    <tiny-sticky :z-index="203">
         <!-- 顶部导航栏 -->
         <div class="navbar">
      <!-- 左侧 LOGO -->
      <div class="navbar-left" @click="goTo('/')">Asimplefox</div>

      <!-- 中间导航菜单 -->
      <div class="navbar-list">
        <ul>
          <li :class="{ active: isActive('/') }" @click="goTo('/')">首页</li>
          <li :class="{ active: isActive('/shortdrama') }" @click="goTo('/shortdrama')">短剧分类</li>
          <li :class="{ active: isActive('/comic') }" @click="goTo('/comic')">动漫</li>
          <li :class="{ active: isActive('/bloglist') }" @click="goTo('/bloglist')">博客</li>
          <li :class="{ active: isActive('/userinfo') }" @click="goTo('/userinfo')">个人中心</li>
          <!-- <li :class="{ active: isActive('/subscribe') }" @click="goTo('/subscribe')">会员订阅</li> -->
        </ul>
      </div>

      <!-- 右侧操作项 -->
      <div class="navbar-right">
        <!-- 语言选择 -->
        <tiny-select v-model="value" class="language-select" @change="getoptions">
          <tiny-option
            v-for="item in options"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </tiny-option>
        </tiny-select>
        <!-- 搜索框 -->
        <tiny-search  v-model="search" class="custom-search" placeholder="请输入关键词" @change="getsearch"></tiny-search>
      </div>
    </div>
    </tiny-sticky>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const options = ref([
  { text: '中文', value: 'chinese_simplified' },
  { text: 'English', value: 'english' },
  { text: 'Francais', value: 'french' },
  { text: 'Espanol', value: 'spanish' },
  { text: '日本語', value: 'japanese' },
  { text: '한국어', value: 'korean' },
  { text: 'Русский', value: 'russian' },
  { text: 'italiano', value: 'italian' },
]);
// 默认选择的语言
const value = ref("chinese_simplified");


const search = ref("")

// 页面加载时恢复选择的语言
onMounted(() => {

  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
    value.value = savedLanguage;  // 将本地存储的语言值赋给 v-model 绑定的变量
  }

});

// 监听选择的语言变化
const getoptions = () => {
  console.log("当前选择的语言:", value.value);
  localStorage.setItem('selectedLanguage', value.value);
  window.translate.changeLanguage(value.value);
};



// Vue Router hooks
const route = useRoute();
const router = useRouter();

// 判断当前路由是否为指定的路径
const isActive = (path: string) => {

  return route.path === path;
};

// 导航跳转
const goTo = (path: string) => {
  router.push(path);

};

const getsearch =()=>{
  console.log(search.value);
  router.push('/search/'+search.value)
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  height: 80px;
  margin: auto;
  padding: 0 20px;
  background-color: rgb(19, 22, 26);
  color: white;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */
}

/* LOGO 样式 */
.navbar-left {
  font-weight: bold;
  font-size: 25px;
  cursor: pointer;
}

/* 导航菜单 */
.navbar-list ul {
  display: flex;
  font-weight: bold;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-list ul li {
  cursor: pointer;
  transition: color 0.3s ease;
}
/* 设置默认选中项 */
.navbar-list ul li.active {
  color: #e1442e;  /* 高亮颜色 */
  font-weight: bold;
}
.navbar-list ul li:hover {
  color: rgb(207, 64, 44); /* 悬停变色 */
}

/* 右侧语言选择和搜索框 */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Tiny-select 样式 */
.language-select {
  width: 220px;
}

/* 自定义 Tiny-search */
:deep(.tiny-search.custom-search.collapse .tiny-search__line) {
  border: none;
}

:deep(.tiny-search__input) {
  border-radius: 4px;
  height: 32px;
}
/* 媒体查询: 响应式设计 */
@media screen and (max-width: 1024px){
  .carousel {
    width: 90%;
    height: 300px; /* 在小屏幕上减小高度 */
  }
  .title-list li.active {
  font-size: 16px;
  background: linear-gradient(
    90deg,
    rgba(225, 68, 46, 0),
    rgba(225, 68, 46, 0.3) 67%,
    rgba(225, 68, 46, 0.04)
  );
  color: white;
  transform: scale(1.1);
}
}
@media screen and (max-width: 912px) {
  .navbar {
    flex-direction: column;
    width: auto;
    height: auto;
    padding: 10px;
  }

  .navbar-left {
    font-size: 18px;
  }

  .navbar-list ul {
    margin-top: 20px;
    gap: 10px;
  }

  .navbar-right {
    margin-top: 20px;
    gap: 10px;
    align-items: flex-start;
  }

  .carousel {
    width: 90%;
    height: 300px; /* 在小屏幕上减小高度 */
  }

  .title-list {
    right: 10px;
    top: 40%;
  }

  .main-content .text {
    bottom: 20px;
    left: 20px;
  }
}

@media screen and (max-width: 480px) {
  .navbar-left {
    font-size: 16px;
  }

  .navbar-list ul li {
    font-size: 14px;
  }

  .carousel {
    width: 100%;
    height: 250px;
  }

  .title-list {
    right: 5px;
    top: 30%;
  }

  .main-content .text {
    font-size: 12px;
    bottom: 15px;
    left: 10px;
  }
}

</style>
