<template>
<div class="mian">
  <navbar></navbar>
  <div class="subscribe-page">
    <h1 class="title">会员订阅</h1>
    <div class="plans-container">
      <!-- 使用 v-for 渲染套餐 -->
      <div v-for="(plan, index) in plans" :key="index" class="plan">
        <h2 class="plan-title">{{ plan.title }}</h2>
        <p class="price">{{ plan.price }}</p>
        <ul class="features">
          <li v-for="(feature, featureIndex) in plan.features" :key="featureIndex">{{ feature }}</li>
        </ul>
        <button class="subscribe-btn" @click="getpayment">订阅</button>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>

  <tiny-dialog-box v-model:visible="boxVisibility" title="会员充值" width="30%" @close="closeOrder">
    <div class="dialog-content">
      <h2 class="dialog-title">🎉 恭喜您！订单创建成功</h2>
      <p class="dialog-text">
        立即支付，解锁VIP 专属剧集，享受无广告畅看体验，开启独家观影特权！<br />
        加入会员，尊享更多精彩内容！
      </p>
    </div>
      <template #footer>
        <tiny-button type="primary" @click="boxVisibility = true">去支付</tiny-button>
        <tiny-button type="primary" @click="boxVisibility = false">取消订单</tiny-button>
      </template>
    </tiny-dialog-box>
</div>
</template>

<script lang="ts" setup>
import navbar from '@/components/header.vue'
import FooterComponent from "@/components/footer.vue";
import { ref } from 'vue';
import {getCreateOrder,CloseOrder } from '@/api/payment'
import { TinyNotify } from '@opentiny/vue'

// 定义套餐数据
const plans = ref([
  {
    title: '月会员',
    price: '¥19.9/月',
    features: ['享受高清画质', '优先观看特权', '无广告体验'],
  },
  {
    title: '季度会员',
    price: '¥49.9/季度',
    features: ['享受高清画质', '优先观看特权', '无广告体验', '3个月一次结算'],
  },
  {
    title: '年会员',
    price: '¥199/年',
    features: ['享受高清画质', '优先观看特权', '无广告体验', '全年订阅优惠', '专属客服支持'],
  },
]);

const boxVisibility =ref(false)
const token = ref('')
//创建订单
const getpayment=async ()=>{
  const res = await getCreateOrder()
  console.log(res);
  if (res.code ===200) {
    TinyNotify({
    type: 'success',
    title: '订单创建成功！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
  token.value = res.pay_id
  boxVisibility.value=true
  }else{
    return TinyNotify({
    type: 'error',
    title: '订单创建失败！！！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
  }
}

const closeOrder =async ()=>{
  const res = await CloseOrder(token.value)
  console.log(res);
  if (res.code ===200) {
    TinyNotify({
    type: 'success',
    title: '订单取消成功！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
  }else{
    return TinyNotify({
    type: 'error',
    title: '订单取消失败！！！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
  }
}
</script>

<style scoped>
.mian{
  width: 100%;
  height: auto;
  margin: 0;
  background-color: rgb(19, 22, 26);
}
/* 页面整体样式 */
.subscribe-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  min-height: 7%;
  /* background-color: #f5f5f5; */
  padding: 20px;
  min-height: 70vh;
  text-align: center;
  box-sizing: border-box;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
}

/* 套餐容器 */
.plans-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;

  width: 100%;
}

/* 单个套餐样式 */
.plan {
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.plan:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.plan-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #e14232;
}

.price {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 15px;
}

/* 功能列表样式 */
.features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

.features li {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 8px;
}

/* 按钮样式 */
.subscribe-btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #e14232;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.subscribe-btn:hover {
  background-color: #c73628;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .title {
    font-size: 1.75rem;
  }

  .price {
    font-size: 1rem;
  }

  .features li {
    font-size: 0.85rem;
  }
}

@media screen and (max-width: 480px) {
  .plan {
    padding: 15px;
  }

  .subscribe-btn {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
}

.dialog-content {
  text-align: center;
  padding: 10px 20px;
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ff5722;
}

.dialog-text {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}

.pay-button {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 4px;
}

.pay-button:hover {
  background-color: #e64a19;
  border-color: #e64a19;
}

.cancel-button {
  background-color: #ccc;
  border-color: #ccc;
  color: #666;
  padding: 10px 20px;
  border-radius: 4px;
}

.cancel-button:hover {
  background-color: #bdbdbd;
  border-color: #bdbdbd;
}
</style>
