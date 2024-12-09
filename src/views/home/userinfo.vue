<template>
  <div class="mian">
    <navbar></navbar>
    <div class="userinfo">
      <!-- 个人信息和已邀请部分 -->
      <div class="user-info-container">
          <!-- 个人中心标题移动到个人信息部分上方 -->
      <div class="title">个人中心</div>
        <!-- 个人信息部分 -->
        <div class="profile-info">
          <div class="avatar">
            <img :src="user.avatar || 'https://via.placeholder.com/150'" alt="Asimplefox" class="avatar-img" />
          </div>
          <div class="user-details">
            <h2>{{ user.name }}</h2>
            <p><strong>名称：</strong>{{ user.username }}</p>
            <p><strong>注册方式：</strong>{{ user.reg }}</p>
            <p><strong>VIP状态：</strong>{{ isVip ? '是' : '否' }}</p>
            <!-- <p><strong>注册日期：</strong>{{ user.registerDate }}</p> -->
            <p><strong>邀请码：</strong>{{ inviteCode }}</p>
            <!-- <p>提示：邀请用户注册完成后会获得一天会员</p> -->

            <button @click="triggerFileInput" class="btn-edit">修改头像</button>
            <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
            <button @click="loginout" class="btn-logout">退出登录</button>
            <button @click="shareWebsite" class="btn-share">分享网站链接</button>
          </div>
        </div>

        <!-- 已邀请列表 -->
        <div class="invited-list">
          <h3>已邀请朋友</h3>
          <div class="invited-list-container">
            <ul>
              <li v-for="(invitee, index) in invitedUsers" :key="index" class="invitee-item">
              <img :src="invitee.avatar || 'https://via.placeholder.com/50'" alt="头像" class="invitee-avatar" />
              <div class="invitee-details">
                <p><strong>名称：</strong>{{ invitee.username }}</p>
                <p><strong>注册方式：</strong>{{ invitee.reg }}</p>
              </div>
            </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 历史记录 -->

      <div class="recommend-section">
    <!-- 最新短剧标题 -->
    <h2 class="title">历史记录</h2>

    <!-- 宫格列表 -->
    <div class="grid-container">
      <div class="grid-item" v-for="(item, index) in newlist" :key="index" @click="goplaypage(item.id,item.ftype)">
        <img :src="item.icon" :alt="item.name" class="grid-image" loading="lazy"/>
        <div class="item-title">{{ item.name }}</div>
      </div>
    </div>
  </div>

    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>


<script lang="ts" setup>
import navbar from '@/components/header.vue'
import FooterComponent from "@/components/footer.vue";
import { onMounted, ref,watch } from 'vue';
import { TinyNotify } from '@opentiny/vue'
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import {getuserInfo,getinviteall,PostAvatar} from '@/api/login'
import image3 from "@/assets/image3.jpg";
const authStore = useAuthStore();
const router = useRouter();

// 模拟用户数据
const user = ref({
  name: '张三',
  account: 'zhangsan123',
  email: 'zhangsan@example.com',
  avatar: 'https://via.placeholder.com/150',
  registerDate: '2023-01-01',
});
const inviteCode =ref('')
const isVip =ref(false)
const newlist = ref([
  { icon: image3, name: '至尊丐婿' },
  { icon: image3, name: '至尊丐婿' },
  { icon: image3, name: '至尊丐婿' },
  { icon: image3, name: '至尊丐婿' },
  { icon: image3, name: '至尊丐婿' },
  { icon: image3, name: '至尊丐婿' },
  { icon: image3, name: '至尊丐婿' },
  { icon: image3, name: '至尊丐婿' },
  { icon: image3, name: '至尊丐婿' },
  { icon: image3, name: '至尊丐婿' },
]);
const getuserinfo =async ()=>{
  const res = await getuserInfo()
  console.log(res)
  user.value=res.user
  isVip.value=res.vipd
  getinvite()
}

// 模拟已邀请用户列表
const invitedUsers = ref([
  { name: '李四', email: 'lisi@example.com', registerDate: '2023-05-12' },
  { name: '王五', email: 'wangwu@example.com', registerDate: '2023-06-15' },
  { name: '赵六', email: 'zhaoliu@example.com', registerDate: '2023-07-20' },
  { name: '李四', email: 'lisi@example.com', registerDate: '2023-05-12' },
  { name: '王五', email: 'wangwu@example.com', registerDate: '2023-06-15' },
  { name: '李四', email: 'lisi@example.com', registerDate: '2023-05-12' },
  { name: '王五', email: 'wangwu@example.com', registerDate: '2023-06-15' },
  { name: '李四', email: 'lisi@example.com', registerDate: '2023-05-12' },
  { name: '王五', email: 'wangwu@example.com', registerDate: '2023-06-15' },
  { name: '李四', email: 'lisi@example.com', registerDate: '2023-05-12' },
  { name: '王五', email: 'wangwu@example.com', registerDate: '2023-06-15' }, { name: '李四', email: 'lisi@example.com', registerDate: '2023-05-12' },
  { name: '王五', email: 'wangwu@example.com', registerDate: '2023-06-15' },
  { name: '李四', email: 'lisi@example.com', registerDate: '2023-05-12' },
  { name: '王五', email: 'wangwu@example.com', registerDate: '2023-06-15' },
]);



const shareWebsite = () => {
  // 获取网站的根 URL
  const websiteUrl = window.location.origin;
  navigator.clipboard.writeText(websiteUrl).then(() => {
    TinyNotify({
    type: 'success',
    title: '网站链接已复制 快去分享给好友吧！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
  }).catch(() => {
    TinyNotify({
    type: 'error',
    title: '复制链接失败，请手动复制！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
  });
};
// 触发文件选择器
const fileInput = ref<HTMLInputElement | null>(null);
//修改头像
const triggerFileInput = () => {
  fileInput.value?.click();
};
// 处理头像变化
const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    // console.log('上传的 FormData:', Array.from(formData.entries()));
    // console.log('上传的文件:', file);
    const res = await PostAvatar(formData)
    // console.log(res)
    if (res.code ===200) {
        TinyNotify({
        type: 'success',
        title: '修改头像成功！！',
        position: 'top-right',
        customClass: 'my-custom-cls'
      })
      user.value = {}; // 清空数据
      await getuserinfo(); // 重新获取数据
    }
  }
  }
//获取邀请码
const getinvite =async ()=>{
  const res = await getinviteall()
  console.log(res)
  inviteCode.value=res.code
  invitedUsers.value=res.susers
}
const loginout =()=>{
  authStore.logout();
  TinyNotify({
    type: 'success',
    title: '退出登录成功！！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
  router.push('/');
}
onMounted(()=>{
  getuserinfo()
})
</script>

<style scoped>
html{
  background-color: rgb(19, 22, 26);
}
.mian {
  width: 100%;
  /* height: 100vh; */
  margin: 0;
  background-color: rgb(19, 22, 26);
}

.userinfo {
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(19, 22, 26);
  color: white;
}

/* 添加标题的样式 */
.title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px; /* 给标题下方加点间距 */
  color: #fff;
}

.user-info-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap; /* 允许换行 */
  gap: 20px; /* 加间距 */
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.user-details p {
  font-size: 1rem;
  margin-bottom: 10px;
}

.user-details strong {
  font-weight: bold;
}

.btn-edit, .btn-copy {
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-edit:hover, .btn-copy:hover {
  background-color: #0056b3;
}
.btn-logout{
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 1rem;
  background-color: rgb(219, 47, 30); /* 绿色按钮 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
.btn-share {
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #28a745; /* 绿色按钮 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-share:hover {
  background-color: #218838; /* 按钮悬停效果 */
}


.invited-list {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.invited-list-container {
  max-height: 300px; /* 设置最大高度 */
  overflow-y: auto; /* 启用垂直滚动条 */
  padding: 10px;
  /* border: 1px solid #ddd;  */
  border-radius: 5px;
  /* background-color: #fff;  */
  color: #333; /* 字体颜色 */
}

.invited-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.invited-list li {
  padding: 10px;
  margin-bottom: 10px;
  color: white;
  /* background-color: #f9f9f9; */
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.invitee-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  /* background-color: #f9f9f9; */
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.invitee-item:hover {
  /* background-color: #f0f0f0; */
}

.invitee-avatar {
  width: 50px; /* 头像宽度 */
  height: 50px; /* 头像高度 */
  border-radius: 50%; /* 圆形头像 */
  object-fit: cover; /* 确保图片适配 */
  margin-right: 15px; /* 与详情内容间距 */
}

.invitee-details {
  display: flex;
  flex-direction: column; /* 竖直排列文本 */
}





/* 响应式布局 */
@media screen and (max-width: 768px) {
  .mian {
  width: 100%;
  height: auto;
  margin: 0;
  background-color: rgb(19, 22, 26);
}
  .user-info-container {
    flex-direction: column; /* 小屏幕下改为上下排列 */
    align-items: center;
  }

  .profile-info {
    margin-bottom: 20px;
  }

  .user-details h2 {
    font-size: 1.25rem;
  }

  .user-details p {
    font-size: 0.875rem;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }
}

@media screen and (max-width: 480px) {
  .profile-info {
    margin-bottom: 20px;
  }

  .user-details h2 {
    font-size: 1.125rem;
  }

  .user-details p {
    font-size: 0.75rem;
  }
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
</style>

