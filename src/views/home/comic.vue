<template>
  <div class="main">
   <navbar></navbar>
   <div class="shortdrama-container">
     <div class="shortdrama">
       <!-- 分类选择 -->
       <div class="categories">
         <div class="main-categories">
           <button
             v-for="item in mainCategories"
             :key="item"
             :class="{ active: selectedMainCategory === item }"
             @click="selectMainCategory(item)"
           >
             {{ item }}
           </button>
         </div>
       </div>

       <!-- 宫格展示 -->
       <div class="grid-container">
         <div class="grid-item" v-for="item in ClassifyList" :key="item.id" @click="getplaypage(item.id,item.ftype)">
           <img :src="item.icon" :alt="item.name" />
           <span class="grid-text">{{ item.name }}</span>
         </div>
       </div>

       <!-- 分页 -->
       <div class="pagination">
         <tiny-pager mode="fixed" :current-page="currentPage" :page-size="3"  :page-sizes="[12, 18, 24,30]" :total="total" hide-on-single-page @current-change="handleCurrentChange"> </tiny-pager>
       </div>
     </div>
   </div>
   <FooterComponent></FooterComponent>
  </div>
 </template>

 <script lang="ts" setup>
 import navbar from '@/components/header.vue'
 import FooterComponent from "@/components/footer.vue";
 import { ref,onMounted } from "vue";
 import { GetClassifyTag,GetClassify } from '@/api/home'
 import {useRouter} from 'vue-router';
 const rawCategories = ref<string[]>([]);
 const mainCategories = ref<string[]>(["全部"]);
 const ClassifyList =ref<string[]>([])
 const ftype = ref(1) //0是短剧，1是动漫
 const total= ref(0)
 const router = useRouter();

 //获取分类标签
 const gettag=async ()=>{
   const res = await GetClassifyTag()
   // console.log(res)
   rawCategories.value=res
   mainCategories.value = ["全部", ...rawCategories.value];
 }

 // 默认选中“全部”
 const selectedMainCategory = ref("全部");
 // const selectedSubCategory = ref("全部");

 const currentPage = ref(1);

 // 切换分类时的逻辑
 const selectMainCategory = (category: string) => {
   selectedMainCategory.value = category;
   console.log(selectedMainCategory.value);
   getclassify()
 };

 //获取分类
 const getclassify =async ()=>{
   const categoryToSend = selectedMainCategory.value === '全部' ? '' : selectedMainCategory.value;
   const res = await GetClassify(currentPage.value, ftype.value, categoryToSend);
  //  console.log(res);
   ClassifyList.value=res.records
   total.value=res.total
 }

 const handleCurrentChange = (val)=>{
   currentPage.value=val
  //  getclassify()
   console.log(currentPage.value);
 }
 const getplaypage = (id: number,ftype:number) => {
  // console.log(id,ftype);
  const data={
    id:id,ftype:ftype
  }
  // console.log(data);

  const params = JSON.stringify(data)
  router.push('/playpage/'+params)
};

 onMounted(()=>{
   gettag()
   getclassify()
 })

 </script>

 <style scoped>
 .main{
   width: 100%;
   height: auto;
   margin: 0;
   background-color: rgb(19, 22, 26);
 }
 .shortdrama-container {
   display: flex;
   justify-content: center;
   min-height: 100vh;
   background-color: rgb(19, 22, 26);
 }

 .shortdrama {
   margin-top: 10px;
   width: 80%;
   max-width: 1200px;
   padding: 16px;
   font-family: Arial, sans-serif;
   background-color: rgb(19, 22, 26);
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
   border-radius: 8px;
 }

 .categories {
   margin-bottom: 16px;
 }

 .main-categories,
 .sub-categories {
   display: flex;
   flex-wrap: wrap;
   gap: 8px;
   margin-bottom: 8px;
 }

 button {
   padding: 8px 16px;
   border: none;
   background-color: rgb(19, 22, 26);
   color: white;
   border-radius: 4px;
   cursor: pointer;
 }

 button.active {
   background-color: rgb(225, 68, 46);
   font-weight: bold;
   color: white;
 }

 .grid-container {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
   gap: 16px;
   margin-bottom: 16px;
 }

 @media screen and (max-width: 768px) {
   .grid-container {
     grid-template-columns: repeat(2, 1fr); /* 小屏幕时固定为两列 */
   }
 }

 @media screen and (max-width: 480px) {
   .grid-container {
     grid-template-columns: repeat(3, 1fr); /* 更小屏幕仍保持两列 */
     gap: 6px; /* 缩小间距 */
   }
 }


 .grid-item {
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   /* background-color: #f9f9f9; */
   /* border: 1px solid #ddd; */
   border-radius: 4px;
   padding: 5px;
   cursor: pointer;
   overflow: hidden; /* 防止内容溢出 */
 }

 .grid-item img {
   width: 100%;
   height: 270px;
   object-fit: cover;
   border-radius: 4px;
   margin-bottom: 8px;
 }

 .grid-text {
   font-size: 14px;
   color: white;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis; /* 超出部分显示省略号 */
   width: 100%;
 }

 .pagination {
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 16px; /* 调整默认间距 */
   flex-wrap: wrap; /* 当空间不足时自动换行 */
   margin-top: 16px;
 }
 .pagination .tiny-pager {
   text-align: center !important; /* 强制覆盖 text-align */
 }
 :deep( .tiny-pager .tiny-pager__pages ){
   display: block !important; /* 强制修改为 block */
   font-size: var(--tv-Pager-font-size) !important;
 }
 @media screen and (max-width: 768px) {
   .pagination {
     gap: 12px; /* 缩小间距 */
     flex-direction: column; /* 小屏幕下改为竖向布局 */
     align-items: flex-start; /* 左对齐分页组件 */
   }

   .pagination tiny-pager {
     width: 100%; /* 宽度自适应屏幕 */
   }
   .grid-item img {
   width: 100%;
   height: 80%;
   object-fit: cover;
   border-radius: 4px;
   margin-bottom: 8px;
 }
 }

 @media screen and (max-width: 480px) {
   .pagination {
     gap: 8px; /* 缩小间距，节约空间 */
   }

   .pagination tiny-pager {
     font-size: 14px; /* 调整字体大小以适配小屏幕 */
     width: 100%; /* 保证分页组件占满可用宽度 */
   }
   .grid-item img {
   width: 100%;
   height: 80%;
   object-fit: cover;
   border-radius: 4px;
   margin-bottom: 8px;
 }
 }
 </style>
