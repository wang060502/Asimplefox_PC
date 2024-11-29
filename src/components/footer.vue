<template>
    <div class="footer-section">
  <div class="footer-container">
    <!-- Logo 名称 -->
    <div class="footer-logo">
      <!-- <img :src=Facebook alt="Logo" class="footer-logo-img" /> -->
      <p class="footer-logo-text">Asimplefox</p>
    </div>

    <!-- 联系我们 -->
    <div class="footer-contact">
      <h3>联系我们</h3>
      <p>邮箱：example@example.com</p>
      <p>电话：123-456-7890</p>
    </div>

    <!-- 关于我们 -->
    <div class="footer-about">
      <h3>关于我们</h3>
      <p>"我们致力于让精彩短剧走向全球，连接文化与观众，成为短剧出海的引领者"</p>
    </div>

      <!-- 支付图片列表 -->
      <div class="footer-payment">
      <h3>社交媒体</h3>
      <div class="payment-icons">
        <img :src=Facebook alt="Visa" class="payment-icon" />
        <img :src=Ins alt="MasterCard" class="payment-icon" />
        <img :src=Youtube alt="PayPal" class="payment-icon" />
        <img :src=Tiktok alt="PayPal" class="payment-icon" />
      </div>
    </div>

    <!-- 协议与条款 -->
    <div class="footer-terms">
      <h3>协议与条款</h3>
      <p @click="goTo('/useragreement')">用户协议</p>
      <p @click="goTo('/PrivacyPolicy')">隐私政策</p>
    </div>

    <!-- 支付图片列表 -->
    <div class="footer-payment">
      <h3>支付方式</h3>
      <div class="payment-icons">
        <img :src=visa alt="Visa" class="payment-icon" />
        <img :src=mastercard alt="mastercard" class="payment-icon" />
        <img :src=Paypal alt="PayPal" class="payment-icon" />
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import Facebook from "@/assets/Facebook.png";
import Ins from "@/assets/instagram.png";
import Youtube from "@/assets/youtube.png";
import Tiktok from "@/assets/Tiktok.png";
import Paypal from '@/assets/paypal.png'
import visa from '@/assets/visa.png'
import mastercard from '@/assets/mastercard.png'
import { useRouter } from "vue-router";
const router = useRouter();
// 导航跳转
const goTo = (path: string) => {
  router.push(path);

};
</script>

<style scoped>
.footer-section {
  cursor: pointer;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  color: white;
  padding: 40px 2px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-logo {
  flex: 1;
  display: flex;
  align-items: center;
}

.footer-logo-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.footer-logo-text {
  font-size: 20px;
  font-weight: bold;
}

.footer-contact,
.footer-about,
.footer-terms,
.footer-payment {
  flex: 1;
}

.footer-contact h3,
.footer-about h3,
.footer-social-media h3,
.footer-terms h3,
.footer-payment h3 {
  font-size: 18px;
  font-weight: bold;
}

.footer-contact p,
.footer-about p {
  font-size: 14px;
  margin: 5px 0;
}

.footer-social-media {
  display: flex;
  gap: 10px;
}

.social-icons img {
  width: 30px;
  height: 30px;
}

.footer-terms p {
  font-size: 14px;
}

.footer-payment .payment-icons {
  display: flex;
  gap: 10px;
}

.payment-icons img {
  width: 40px;
  height: 40px;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .footer-container {
    flex-direction: column; /* 从横向布局改为上下排列 */
    align-items: flex-start;
  }

  .footer-logo,
  .footer-contact,
  .footer-about,
  .footer-social-media,
  .footer-terms,
  .footer-payment {
    width: 100%; /* 每个模块宽度设置为 100% */
    margin-bottom: 20px; /* 模块之间增加间距 */
  }

  .footer-social-media {
    justify-content: flex-start; /* 左对齐社交媒体图标 */
  }

  .payment-icons {
    justify-content: flex-start; /* 左对齐支付方式图标 */
  }
}

</style>
