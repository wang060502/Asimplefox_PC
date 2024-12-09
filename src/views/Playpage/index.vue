<template>
  <div class="mian">
    <navbar></navbar>
    <div class="Playpage">
      <div class="content-container">
        <!-- 左侧视频播放器部分 -->
        <div class="left-section">
           <!-- 视频播放器 -->
            <video
              class="video-player"
              controls
              :poster="poster"
              @ended="playNextEpisode"
            >
            <source :src="video" type="video/mp4" />
            <track
              kind="subtitles"
              :src="subtitleUrl1"
              srclang="en"
              label="English"
              ref="trackElement"
              default
            />
          </video>
        </div>

        <!-- 右侧内容部分 -->
        <div class="right-section">
          <!-- 标题和更新信息 -->
          <div class="title-section">
            <h1 class="title">{{ titlename }}</h1>
            <p class="update-info">
              {{ type === '连载' ?  '更新至' + videoList.length + '集' : '全'+videoList.length + '集' }}
            </p>
             <!-- 分类标签 -->
            <div class="categories">
              <span v-for="category in categories" :key="category" class="category-badge">{{ category }}</span>
            </div>


          </div>

          <!-- 剧情详情 -->
          <div class="description-section">
            <h2 class="section-title">剧情详情</h2>
            <p class="description">
              {{ desc }}
            </p>
          </div>
           <!-- 分享按钮 -->
           <button class="share-button" @click="sharePage">想知道完整版？联系我们，马上为您提供！</button>

          <!-- 剧集列表 -->
          <div class="episodes-section">
            <h2 class="section-title">剧集列表</h2>
            <div class="episodes-grid">
              <div
                v-for="(episode,index) in videoList"
                :key="episode.id"
                class="episode-item"
                :style="{
              backgroundColor: selectedEpisode === index ? 'rgba(47, 47, 55)' : '',
              color: selectedEpisode === index ? 'rgba(200, 74, 49)' : ''
            }"
                @click="playEpisode(index)"
              >
                <div class="episode-title">{{ index + 1 }}</div>
                <span v-if="episode.isVip" class="vip-badge">vip</span>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
        <!-- 猜你喜欢 -->
    <div class="like-section">
      <h2 class="section-title">猜你喜欢</h2>
      <div class="carousel-container">
        <button class="arrow left-arrow" @click="scrollCarousel('left')">&lt;</button>
        <div class="carousel" ref="carousel">
          <div v-for="item in likeItems" :key="item.id" class="like-item" @click="getplaypage(item.id,item.ftype)">
            <img :src="item.icon" :alt="item.name" class="like-image" loading="lazy"/>
            <div class="like-title">{{ item.name }}</div>
          </div>
        </div>
        <button class="arrow right-arrow" @click="scrollCarousel('right')">&gt;</button>
      </div>
    </div>


    <FooterComponent></FooterComponent>

    <tiny-dialog-box v-model:visible="vipshow" title="温馨提示" width="30%">
      <!-- 引导用户完成充值 -->
      <p>请充值成为 VIP 以解锁更多剧集。</p>
      <template #footer>
        <tiny-button type="primary" @click="router.push('/subscribe')">前往充值</tiny-button>
        <tiny-button type="primary" @click="vipshow = false">取消</tiny-button>
      </template>
    </tiny-dialog-box>
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted,watch } from "vue";
import navbar from '@/components/header.vue';
import FooterComponent from "@/components/footer.vue";
import image3 from "@/assets/image3.jpg";
import { useRoute ,useRouter} from 'vue-router';
import { TinyNotify } from '@opentiny/vue'
import { GetOneVedioList ,SelVediodetail,GetVedioList} from '@/api/vedio'
const route = useRoute();
const router = useRouter();
// 猜你喜欢列表数据
const likeItems = ref([
  { id: 1, title: '推荐电影1', image: image3 }]);
const categories = ref(["玄幻", "古装"]);

// 存储视频信息
const videoInfo = ref<any[]>([]);
//视频剧集
const videoList = ref<any[]>([]);
  const video = ref('')
const titlename = ref('');
const desc = ref('');
const type = ref('')
const poster = ref('')
const trackElement = ref<HTMLTrackElement | null>(null); // 引用 track 字幕元素
const subtitleUrl1 = ref('');
const vipshow = ref(false)
// 当前播放剧集的索引
const selectedEpisode = ref<number | null>(null);


// 滚动控制函数
const carousel = ref<HTMLDivElement | null>(null);

const scrollCarousel = (direction: 'left' | 'right') => {
  if (carousel.value) {
    const scrollAmount = 400; // 每次滚动的距离
    carousel.value.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
  }
};

// 分享页面
const sharePage = () => {
  const pageUrl = window.location.href;
  const title = titlename.value+" - Asimplefox";

  // 如果支持 Navigator Share API
  if (navigator.share) {
    navigator.share({
      title,
      url: pageUrl,
    }).then(() => {
      TinyNotify({
    type: 'success',
    title: '网站页面分享成功',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
    }).catch((err) => {
      TinyNotify({
    type: 'error',
    title: '页面分享失败',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
      console.error(err);
    });
  } else {
    // 备用方式：复制到剪贴板
    navigator.clipboard.writeText(pageUrl).then(() => {
      TinyNotify({
    type: 'success',
    title: '网站链接已复制 快去分享给好友吧！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
    }).catch(() => {
      TinyNotify({
    type: 'error',
    title: '复制链接失败，请手动复制',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
    });
  }
};

// 获取路由参数（视频ID）
const getid = () => {
  const id = route.params.id;
  const decodedId = decodeURIComponent(id as string);
  const ids = JSON.parse(decodedId);  // 解析ID对象
  console.log(ids)
  vedioinfo(ids)
  getVediodetail(ids.id)
};

//获取单个视频信息
const vedioinfo =async (item) =>{
  const res = await GetOneVedioList(item.id,item.ftype)
  console.log(res)
  if (res && res.records && res.records.length > 0) {
      videoInfo.value = res.records[0];  // 设置视频信息
      titlename.value = res.records[0].name; // 设置标题
      desc.value = res.records[0].desc; // 设置描述
      type.value=res.records[0].type
      poster.value=res.records[0].icon
      categories.value=res.records[0].types
    } else {
      console.log("未找到视频数据");
    }
}

//获取视频剧集
async function getVediodetail(id:number){
  const res = await SelVediodetail(id)
  // console.log('视频列表',res)
  videoList.value=res
  if (videoList.value.length > 0)
    playEpisode(0);  // 播放第一个剧集
  // console.log(videoList.value);
}

const loadSubtitles = async(videoUrl:string)=>{
  const subtitleUrl = videoUrl.replace('.mp4', '-en.json');
  const currentOrigin = window.location.origin; // 获取当前环境的域名
  const proxyUrl = subtitleUrl.replace('http://139.196.195.212:8081', `${currentOrigin}/api`);
  console.log(proxyUrl);

  // console.log(subtitleUrl);
  // 使用 fetch 请求字幕文件
  const response = await fetch(proxyUrl);
  // 获取响应的 JSON 数据
  const subtitles = await response.json();
    // console.log('字幕内容:', subtitles);
     // 转换字幕内容为 VTT 格式
  const vttContent = convertToVTT(subtitles);
  // console.log('VTT 格式字幕:', vttContent);

  // 创建 Blob URL（VTT 格式字幕文件）
  const vttBlob = new Blob([vttContent], { type: 'vtt' });
  const vttBlobUrl = URL.createObjectURL(vttBlob);
  subtitleUrl1.value = vttBlobUrl;  // 将生成的 URL 赋值给 subtitleUrl
  // console.log('生成的 Blob URL:', subtitleUrl1.value);
  const trackElement = document.querySelector('track');
  trackElement.src=subtitleUrl1.value
  // console.log('Track Element src:', trackElement.src);
}

// 转换字幕为 VTT 格式
const convertToVTT = (subtitleData: any) => {
  const vttLines: string[] = ["WEBVTT\n\n"];  // VTT 文件头

  subtitleData.task_result.detailed_result.forEach((item: any, index: number) => {
    // console.log(item.begin_time,item.end_time);

    const beginTime = formatVTTTime(item.begin_time/1000);
    const endTime = formatVTTTime(item.end_time/1000);
    const subtitleText = item.res.join(' ');  // 将字幕文本合并为一行

    // 每个字幕块格式：时间，字幕文本
    vttLines.push(`${beginTime} --> ${endTime}`);
    vttLines.push(subtitleText);
    vttLines.push("");  // 每个字幕段之间有一个空行
  });

  return vttLines.join("\n");
};

// 时间格式化函数，将秒数转换为 VTT 格式的时间字符串
const formatVTTTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor((timeInSeconds % 1) * 1000);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
};

// 补零函数，确保时间段的数字符合格式
const pad = (num: number, length: number = 2) => num.toString().padStart(length, "0");


const playEpisode = (index: number) => {
  const episode = videoList.value[index]; // 获取剧集对象
  // console.log(episode);

  if (episode.astrict) {
    console.log('是会员剧集');
    return vipshow.value = true;
  } else {
    console.log('不是会员剧集');
    video.value = episode.url;
    loadSubtitles(episode.url)
    selectedEpisode.value = index;
    // console.log(episode.url);
    // console.log(video.value);
    const videoElement = document.querySelector('.video-player') as HTMLVideoElement;
    videoElement.load();
    videoElement.play();
  }
};

// 播放下一集
const playNextEpisode = () => {
  if (selectedEpisode.value !== null && selectedEpisode.value < videoList.value.length - 1) {
    // 如果不是最后一集
    playEpisode(selectedEpisode.value + 1);  // 播放下一集
  }
};

const Getlikelist=async ()=>{
  const res = await GetVedioList()
  // console.log(res)
  likeItems.value=res
}

//跳转至播放页
const getplaypage = (id: number,ftype:number) => {
  // console.log(id,ftype);
  const data={
    id:id,ftype:ftype
  }
  // console.log(data);

  const params = JSON.stringify(data)
  router.push('/playpage/'+params)
};
// 在组件挂载后获取视频信息
onMounted(() => {
  getid(); // 获取路由参数，并加载视频信息
  Getlikelist()
});
//监听页面路由参数变化，变化后立即更新
watch(getid, (newValue) => {
  getid();
  console.log( newValue);
});
</script>


<style scoped>
.mian {
  width: 100%;
  height: auto;
  margin: 0;
  background-color: rgb(19, 22, 26);
}
.Playpage {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 65vh;
  background-color: rgb(19, 22, 26);
  padding: 20px;
}

.content-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  background-color: rgb(19, 22, 26);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex-direction: row;
}

.left-section {
  flex: 1;
  padding: 20px;
}

.video-player {
  width: 100%;
  height: 100%;
  max-height: 620px;
  border-radius: 10px;
}

.right-section {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.title-section {
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: white;
}

.update-info {
  font-size: 1rem;
  color: white;
}

.description-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: white;
}

.episodes-section {
  margin-top: 20px;
}

.episodes-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
  width: auto;
  max-height: 150px;
  overflow-y: auto;
}

.episode-item {
  font-weight: bold;
  position: relative;
  overflow: hidden;
  background-color: rgb(32, 32, 38);
  color: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.episode-item:hover {
  background-color: rgb(47, 47, 55);
}

.selected {
  background-color: rgb(47, 47, 55);
  color: rgb(229, 84, 54);
}

.vip-badge {
  position: absolute;
  top: -10px;
  left: 40px;
  width: 50px;
  line-height: 20px;
  display: block;
  border-radius: 0 0 0 15px;
  /* background-color: rgb(244, 206, 102); */
  /* color: white; */
  color: rgb(244, 206, 102);
  padding: 5px;
  font-size: 0.9rem;
}

.like-section {
  max-width: 1200px;
  margin: auto;
  margin-bottom: 40px;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 0;
  scroll-behavior: smooth;
}
/* 隐藏滚动条 */
.carousel::-webkit-scrollbar {
  display: none;
}

.carousel {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.like-item {
  flex: 0 0 150px;
  /* background-color: rgb(47, 47, 55); */
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: background-color 0.3s;
  cursor: pointer;
}

.like-item:hover {
  background-color: rgb(62, 62, 70);
}

.like-image {
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 8px;
}

.like-title {
  font-size: 1rem;
  color: white;
  margin-top: 10px;
  width: 100%;
  height: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 超出文本显示省略号 */
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2rem;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}

.categories {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}

.category-badge {
  padding: 5px 10px;
  background-color: rgb(255, 240, 235);
  color: rgb(225, 68, 46);
  border-radius: 2px;
  font-size: 0.9rem;
}

.share-button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: rgb(229, 84, 54);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.share-button:hover {
  background-color: rgb(200, 74, 49);
}

@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .like-section {
  width: 85%;
  margin: auto;
  margin-bottom: 40px;
}
  .left-section {
    order: 1;
    padding: 10px;
  }

  .right-section {
    order: 2;
    padding: 10px;
  }

  .episodes-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .episodes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  width:20rem;
  overflow-y: auto;
}

.vip-badge {
  position: absolute;
  top: -10px;
  left: 10px;
  width: 50px;
  line-height: 20px;
  display: block;
  border-radius: 0 0 0 15px;
  /* background-color: rgb(244, 206, 102); */
  /* color: white; */
  color: rgb(244, 206, 102);
  padding: 5px;
  font-size: 0.8rem;
}

  .video-player {
    max-height: 300px;
  }

  .title {
    font-size: 1.5rem;
  }

  .description {
    font-size: 0.9rem;
  }

  .episode-item {
    padding: 8px;
  }
  .like-item {
  flex: 0 0 110px;
  /* background-color: rgb(47, 47, 55); */
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: background-color 0.3s;
  cursor: pointer;
}
  .like-image {
  width: 85%;
  height: 80%;
  object-fit: cover;
  border-radius: 8px;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.carousel {
  display: flex;
  gap: 0px;
  overflow-x: auto;
  padding: 10px 0;
  scroll-behavior: smooth;
}

}
@media (max-width: 1150px) {
  .episodes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  width:20rem;
  overflow-y: auto;
}

.vip-badge {
  position: absolute;
  top: -10px;
  left: 20px;
  width: 50px;
  line-height: 20px;
  display: block;
  border-radius: 0 0 0 15px;
  /* background-color: rgb(244, 206, 102); */
  /* color: white; */
  color: rgb(244, 206, 102);
  padding: 5px;
  font-size: 0.8rem;
}
.like-section {
  max-width: 1200px;
  margin: auto 20px;
  margin-bottom: 40px;
}

}
</style>

