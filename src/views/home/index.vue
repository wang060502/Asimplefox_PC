<template>
  <div class="home">
    <navbar></navbar>
    <!-- 轮播图 -->
    <div class="carousel">
    <!-- 主图区域 -->
    <div class="main-content">
      <div class="main-top"></div>
      <div class="main-left"></div>
      <img :src="currentImage.url" alt="主图" class="main-image" loading="lazy"/>
      <div class="title-list">
        <ul>
          <li
            v-for="(item, index) in images"
            :key="index"
            :data-index="index"
            :class="{ active: currentIndex === index }"
            @mouseenter="onHover(index)"
            @mouseleave="onLeave"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="text">
        <h2>{{ currentImage.title }}</h2>
        <p>{{ currentImage.desc }}</p>
      </div>
      <div class="main-right"></div>
      <div class="main-buttom"></div>
    </div>
  </div>

  <div class="recommend-section">
    <!-- 每日推荐标题 -->
    <h2 class="title">首页推荐</h2>

    <!-- 宫格列表 -->
    <div class="grid-container">
      <div class="grid-item" v-for="item in recommendedItems" :key="item.id" @click="goplaypage(item.id,item.ftype)">
        <img :src="item.icon" :alt="item.name" class="grid-image" loading="lazy"/>
        <div class="item-title">{{ item.name }}</div>
      </div>
    </div>
  </div>

   <!-- 每周推荐 -->
   <div class="weekly-recommend">
      <h2 class="title">每周推荐</h2>
      <div class="weekly-container">
        <div class="weekly-image">
          <img :src="weeklyImage.icon" :alt="weeklyImage.name" loading="lazy"/>
        </div>
        <div class="weekly-content">
          <h3 class="weekly-title">{{ weeklyImage.name }}</h3>
          <p class="weekly-description">{{ weeklyImage.desc }}</p>
          <button class="play-button" @click="goplaypage(weeklyImage.id,weeklyImage.ftype)">点击播放</button>
        </div>
      </div>
    </div>

  <div class="recommend-section">
    <!-- 猜你喜欢标题 -->
    <h2 class="title">热门推荐</h2>

    <!-- 宫格列表 -->
    <div class="grid-container">
      <div class="grid-item" v-for="(item, index) in hostlist" :key="index" @click="goplaypage(item.id,item.ftype)">
        <img :src="item.icon" :alt="item.name" class="grid-image" loading="lazy"/>
        <div class="item-title">{{ item.name }}</div>
      </div>
    </div>
  </div>


  <div class="recommend-section">
    <!-- 最新短剧标题 -->
    <h2 class="title">最新短剧</h2>

    <!-- 宫格列表 -->
    <div class="grid-container">
      <div class="grid-item" v-for="(item, index) in newlist" :key="index" @click="goplaypage(item.id,item.ftype)">
        <img :src="item.icon" :alt="item.name" class="grid-image" loading="lazy"/>
        <div class="item-title">{{ item.name }}</div>
      </div>
    </div>
  </div>

  <FooterComponent></FooterComponent>
  </div>
</template>

<script lang="ts" setup>
import image2 from "@/assets/image2.png";
import image3 from "@/assets/image3.jpg";
import navbar from '@/components/header.vue'
import FooterComponent from "@/components/footer.vue";
import { ref, onMounted ,computed } from "vue";
import{GetBannerList,Getreclist,Getweekone,Gethotlist,Getnewlist} from '@/api/home'
import { useRouter } from 'vue-router';
const router = useRouter();

// 轮播图数据
const images = ref([
  {
    url: image2,
    title: "闪婚老公是豪门",
    desc: "萌娃强势撮合互不相识的爸妈在一起!这个家没了他都得散!",
  }
]);

const recommendedItems = ref([
  { image: image3, title: '至尊丐婿' },
  { image: image3, title: '再世为王' },
  { image: image3, title: '顾总，太太又把你拉黑了顾总，太太又把你拉黑了顾总，太太又把你拉黑了顾总，太太又把你拉黑了' },
  { image: image3, title: '悠悠情丝绣良缘' },
  { image: image3, title: '至尊金瞳神医' },
]);
const hostlist = ref([
  { image: image3, title: '至尊丐婿' }
]);

const newlist = ref([
  { image: image3, title: '至尊丐婿' }
]);

// 每周推荐数据
const weeklyImage = ref({
  icon: image3,
  name: "偏执温少的大佬夫人",
  desc: "许念替双胞胎姐姐许初嫁给温家残废，许初三年后强势归来，拥有众多马甲，先替换回许念，然后打脸那些欺负许念的人。再拿回许氏集团，和男主温时瑾强强联手，夺回属于自己的一切。",
});
const currentIndex = ref(0);
let interval: number | null = null; // 定义定时器

// 获取当前显示的图片数据
const currentImage = computed(() => images.value[currentIndex.value]);

// 自动轮播
const autoPlay = () => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
  }, 3000);
};

// 清除定时器（用于鼠标悬停停止轮播）
const stopAutoPlay = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

// 鼠标悬停切换图片
const onHover = (index: number) => {
  stopAutoPlay(); // 停止自动轮播
  currentIndex.value = index;
};

// 鼠标移开继续轮播
const onLeave = () => {
  autoPlay();
};

//获取轮播图
const getbanner = async ()=>{
  const res = await GetBannerList()
  // console.log(res)
  images.value=res
}

//获取推荐列表
const getreclist =async ()=>{
  const res = await Getreclist()
  // console.log(res);
  recommendedItems.value=res
}
//获取每周推荐
const getweekone =async ()=>{
  const res = await Getweekone()
  // console.log(res)
  weeklyImage.value=res
}

//热门推荐
const gethotlist =async ()=>{
  const res = await Gethotlist()
  // console.log(res)
  hostlist.value=res
}
//最新短剧
const getnewlist =async ()=>{
  const res = await Getnewlist()
  console.log(res);
  newlist.value=res
}

const goplaypage =(id: number,ftype:number)=>{
  const data={
    id:id,ftype:ftype
  }
  console.log(data);
  const params = JSON.stringify(data)
  console.log(params);

  router.push('/Playpage/'+params)

}

// 初始化
onMounted(() => {
  autoPlay();
  getbanner()
  getreclist()
  getweekone()
  gethotlist()
  getnewlist()
});

</script>

<style scoped>
* {
    box-sizing: border-box;
}
.home {
  width: 100%;
  height: auto;
  margin: 0;
  background-color: rgb(19, 22, 26);
}

/* 基础样式 */
.carousel {
  position: relative;
  width: 1200px;
  height: 500px;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.main-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.main-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title-list {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-40%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: transparent;
}

.title-list ul {
  list-style: none;
}

.title-list li {
  font-weight: bold;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.title-list li.active {
  font-size: 24px;
  background: linear-gradient(
    90deg,
    rgba(225, 68, 46, 0),
    rgba(225, 68, 46, 0.3) 67%,
    rgba(225, 68, 46, 0.04)
  );
  color: white;
  transform: scale(1.1);
}

.title-list li:hover {
  transform: scale(1.1);
}

.main-content .text {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.main-top {
  width: 100%;
  height: 1.4rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: linear-gradient(180deg, #13161a, transparent);
}

.main-buttom {
  width: 100%;
  height: 1rem;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: linear-gradient(0deg, #13161a, transparent);
}

.main-left {
  content: "";
  display: block;
  height: 100%;
  width: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: linear-gradient(90deg, #13161a, transparent);
}

.main-right {
  content: "";
  display: block;
  height: 100%;
  width: 1.2rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  background: linear-gradient(270deg, #13161a, transparent);
}

.recommend-section {
  max-width: 1200px;
  height: auto;
  margin: 0px auto; /* 上下各20px，左右自动居中 */
  padding: 20px;
}


.title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 每行6个 */
  gap: 20px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.grid-image {
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 8px;
}

.item-title {
  width: 100%;
  height: auto;
  margin-top: 10px;
  font-size: 14px;
  color: white;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

/* 媒体查询: 响应式设计 */
@media screen and (max-width: 1024px){
  .carousel {
    width: 90%;
    height: 300px; /* 在小屏幕上减小高度 */
  }
}
@media screen and (max-width: 912px) {
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

/* 宫格 */
@media screen and (max-width: 1200px) {
  .grid-container {

  }
  .grid-image {
    object-fit: cover;
  }
}

@media screen and (max-width: 992px) {
  .grid-container {
  margin: 0 auto;  /* 居中对齐 */
}
.grid-item {
  color: white;
  text-align: center;
  word-wrap: break-word;
  word-break: break-word;
  border-radius: 8px;
  box-sizing: border-box; /* 确保内边距不会影响网格大小 */
}


  .grid-image {
    width: 100%;
    height: 80%;
    object-fit: cover;
  }
}

@media screen and (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr); /* 每行显示3个 */
  }
  .grid-image {
    width: 100%;
    height: 80%;
    object-fit: cover;
  }
}

@media screen and (max-width: 480px) {
  .grid-container {
    width: 315px;
    grid-template-columns: repeat(3, 1fr); /* 每行显示2个 */
  }
  .grid-image {
    object-fit: cover;
  }
}

@media screen and (max-width: 360px) {
  .grid-container {
    width: 260px;
    grid-template-columns: repeat(2, 1fr); /* 每行显示1个 */
  }
  .grid-image {
    width: 100%;
    height: 80%;
    object-fit: cover;
  }
}
/* 每周推荐样式 */
.weekly-recommend {
  width: 1200px;
  margin: 20px auto;
  padding: 20px;
  /* background-color: #1c1f22; */
  border-radius: 8px;
}
.weekly-container{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  }
.weekly-image {
  width: 40%; /* 图片占据 40% */
  margin-right: 20px; /* 图片与文字之间的间距 */
}

.weekly-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.weekly-content {
  margin-left: 50px;
  width: 55%; /* 文字内容占据 55% */
  color: white;
}

.weekly-title {
  font-size: 24px;
  font-weight: bold;
}

.weekly-description {
  font-size: 16px;
  margin-top: 10px;
  color: #ccc;
}

.play-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e1442e;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.play-button:hover {
  background-color: #b12b1b;
}

/* 媒体查询: 响应式设计 */
@media screen and (max-width: 1024px) {
  .weekly-recommend {
    width: 100%;
    flex-direction: row; /* 保持左右布局 */
    align-items: flex-start; /* 顶部对齐 */
  }
.weekly-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 内容从顶部对齐 */
  align-items: flex-start; /* 图片居中 */
  text-align: left; /* 确保文字左对齐 */
}

  .weekly-image img{
    width: 50%;
    height: 50%;
    margin-left:50px ;
    /* width: 40%; 图片占据 50% */
    margin-right: 0px; /* 图片与文字之间的间距 */
  }

  .weekly-content {
    width: 60%; /* 文字内容占据 50% */
  }

  .weekly-title {
    font-size: 20px;
  }

  .weekly-description {
    font-size: 14px;
  }

  .play-button {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .weekly-recommend {
    flex-direction: column; /* 在屏幕更小的情况下改为上下布局 */
    align-items: flex-start; /* 顶部对齐 */
  }

  .weekly-image {
    width: 100%;
    margin-bottom: 15px; /* 图片和文字之间的间距 */
  }

  .weekly-title {
    font-size: 18px;
  }

  .weekly-description {
    font-size: 14px;
  }
}

</style>
