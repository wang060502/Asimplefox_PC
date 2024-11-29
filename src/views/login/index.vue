<template>
  <div class="main">
    <div class="login-container">
      <!-- 左侧部分 -->
      <div class="left-section">
        <h1 class="site-title">Asimplefox</h1>
        <p class="slogan">
          "我们致力于让精彩短剧走向全球，连接文化与观众，成为短剧出海的引领者"
        </p>
      </div>

      <!-- 右侧部分 -->
      <div class="right-section">
        <div class="login-form">
          <h2>{{ isLogin ? "账号登录" : "账号注册" }}</h2>
          <transition name="fade">
            <form
              @submit.prevent="isLogin ? handleLogin() : handleRegister()"
              key="form"
            >
              <!-- 登录表单 -->
              <div v-if="isLogin" key="login">
                <div class="form-item">
                  <label for="account">账号</label>
                  <input
                    type="text"
                    id="account"
                    v-model="account"
                    placeholder="请输入账号"
                    required
                  />
                </div>
                <div class="form-item">
                  <label for="password">密码</label>
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="请输入密码"
                    required
                  />
                </div>
              </div>

              <!-- 注册表单 -->
              <div v-else key="register">
                <div class="form-item">
                  <label for="account">账号</label>
                  <input
                    type="text"
                    id="account"
                    v-model="account"
                    placeholder="请输入账号"
                    required
                  />
                </div>
                <div class="form-item">
                  <label for="password">密码</label>
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="请输入密码"
                    required
                  />
                </div>
                <div class="form-item">
                  <label for="email">邮箱</label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="请输入邮箱"
                    required
                  />
                </div>
                <div class="form-item captcha-wrapper">
                  <div class="captcha-input">
                    <label for="captcha">验证码</label>
                    <input
                      type="text"
                      id="captcha"
                      v-model="captcha"
                      placeholder="请输入验证码"
                      required
                    />
                  </div>
                  <button
                    class="btn-captcha"
                    type="button"
                    @click="handleGetCaptcha"
                  >
                  {{captchaText}}
                  </button>
                </div>
                <div class="form-item">
                  <label for="invitation">邀请码（可选）</label>
                  <input
                    type="text"
                    id="invitation"
                    v-model="invitation"
                    placeholder="请输入邀请码"
                  />
                </div>
              </div>

              <!-- 提交按钮 -->
              <div class="form-actions">
                <button type="submit" class="btn-login">
                  {{ isLogin ? "登录" : "注册" }}
                </button>
              </div>
            </form>
          </transition>

          <!-- 切换表单 -->
          <div class="register-link">
          <span v-if="isLogin">
            没有账号？<a @click="toggleForm">请注册</a>
            <div class="third-party-login">
              <p>其他登录方式：</p>
              <button @click="googleLogin" class="google-login-btn">
                <img :src=google alt="Google 登录" class="google-icon" />
                使用 Google 登录
              </button>
            </div>
          </span>
          <span v-else>
            已有账号？<a @click="toggleForm">前往登录</a>
          </span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { TinyNotify } from '@opentiny/vue'
import { getLogin ,getVerificationCode,Postregisnlogin,getname,getloginGoogle} from '../../api/login'
import { useAuthStore } from '../../stores/auth'
import google from "@/assets/google.png";
const router = useRouter();
const isLogin = ref(true); // 控制表单切换
const account = ref("");
const password = ref("");
const email = ref("");
const captcha = ref("");
const invitation = ref("");
const captchaText = ref("获取验证码"); // 验证码按钮文本
const isCaptchaDisabled = ref(false); // 验证码按钮是否禁用
const countdown = ref(120); // 倒计时时间
// 获取 store
const authStore = useAuthStore()
// 切换登录/注册表单
const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

// 登录函数
const handleLogin = async () => {
  if (account.value && password.value) {
    const res = await getLogin(account.value,password.value)
    if (res.code !==200) {
      TinyNotify({
    type: 'error',
    title: '登录失败！请重新再试',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
  }else{
    const token = res.token
    authStore.login(token)
    TinyNotify({
    type: 'success',
    title: '登录成功！！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
    router.push('/')
  }

  }
};

//  Google 登录函数
const googleLogin = async () => {
  try {
    console.log('点击了 Google 登录按钮');
    const res = await getloginGoogle(); // 获取登录地址
    console.log(res);

    if (res.url) {
      // 打开弹窗
      const popupWindow = window.open(
        res.url,
        'GoogleLogin',
        'width=500,height=600,scrollbars=no,resizable=no'
      );

      if (!popupWindow) {
        TinyNotify({
          type: 'error',
          title: '无法打开 Google 登录窗口，请检查浏览器设置！',
          position: 'top-right',
          customClass: 'my-custom-cls',
        });
        return;
      }

      TinyNotify({
        type: 'info',
        title: '正在打开 Google 登录窗口...',
        position: 'top-right',
        customClass: 'my-custom-cls',
      });

      // 实时检测窗口关闭或 URL 变化
      const checkPopup = setInterval(() => {
        try {
          if (popupWindow.closed) {
            clearInterval(checkPopup);
            console.log('窗口已关闭！');
            TinyNotify({
              type: 'success',
              title: 'Google 登录窗口已关闭！',
              position: 'top-right',
              customClass: 'my-custom-cls',
            });
          } else {
            // 检查弹窗的 URL 是否包含回调信息
            const popupURL = popupWindow.location.href;

            if (popupURL.includes('oauth/callback')) {
              // 假设回调 URL 包含参数 ?code=AUTH_CODE
              const urlParams = new URLSearchParams(popupWindow.location.search);
              const authCode = urlParams.get('code');

              if (authCode) {
                console.log('捕获到授权码:', authCode);
                clearInterval(checkPopup); // 停止检测
                popupWindow.close(); // 关闭窗口
                handleAuthCode(authCode); // 处理授权码
              }
            }
          }
        } catch (e) {
          // 跨域限制时，浏览器会抛出错误，忽略即可
        }
      }, 200); // 每 200 毫秒检测一次
    }
  } catch (error) {
    console.error('Google 登录失败:', error);
    TinyNotify({
      type: 'error',
      title: 'Google 登录失败，请稍后再试！',
      position: 'top-right',
      customClass: 'my-custom-cls',
    });
  }
};


// 登录后的逻辑
const handleAuthCode = (authCode:string) => {
  console.log('处理登录后逻辑，例如刷新用户状态。',authCode);
  // 例如重新拉取用户数据或刷新页面
};



// 注册函数
const handleRegister = async () => {
  if (account.value && password.value && email.value && captcha.value) {
    if (account.value) {
      const res = await getname(account.value)
      console.log(res)
          if (res) {
          invitation.value = invitation.value || '';
          const res = await Postregisnlogin(account.value,password.value,email.value,captcha.value,invitation.value)
          if (res.code===200) {
                TinyNotify({
              type: 'success',
              title: '账号注册成功，请前往登录！',
              position: 'top-right',
              customClass: 'my-custom-cls'
            })
            router.push('/')
          }else{
          return TinyNotify({
              type: 'error',
              title: '账号注册失败，请重新再试！',
              position: 'top-right',
              customClass: 'my-custom-cls'
            })
        }
        }else{
      return TinyNotify({
              type: 'error',
              title: '名称重复，请更换名称！',
              position: 'top-right',
              customClass: 'my-custom-cls'
            })
    }
    // alert(
    //   `账号: ${account.value}, 密码: ${password.value}, 邮箱: ${email.value}, 邀请码: ${invitation.value}`
    // );
}else {
          return TinyNotify({
          type: 'error',
          title: '请填写完整注册信息',
          position: 'top-right',
          customClass: 'my-custom-cls'
        })

        }
}
}

// 获取验证码函数
const handleGetCaptcha = async () => {
  if (!email.value) {
    TinyNotify({
    type: 'error',
    title: '请先填写邮箱地址！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
    return;
  }

  const res = await getVerificationCode(email.value)
  console.log(res)
  if (res.code ===200) {
    // 模拟发送验证码的接口
  TinyNotify({
    type: 'success',
    title: '验证码已发送！',
    position: 'top-right',
    customClass: 'my-custom-cls'
  })
  // 开始倒计时
  isCaptchaDisabled.value = true;
  captchaText.value = `${countdown.value}秒后重新获取`;

  const timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value > 0) {
      captchaText.value = `${countdown.value}秒后重新获取`;
    } else {
      clearInterval(timer);
      captchaText.value = "获取验证码";
      isCaptchaDisabled.value = false;
      countdown.value = 120; // 重置倒计时
    }
  }, 1000);
  }
};

</script>

<style scoped>
.mian {
  width: 100%;
  height: auto;
  margin: 0;
  background-color: rgb(19, 22, 26);
}

/* 整体布局 */
.login-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 115vh;
  background-color: rgb(19, 22, 26);
}

.left-section,
.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* 左侧部分 */
.left-section {
  background-color: rgb(19, 22, 26);
  color: white;
  cursor: pointer;
}

.site-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.slogan {
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.5;
}

/* 右侧部分 */
.right-section {
  background-color: rgb(19, 22, 26);
}

/* 登录表单样式 */
.login-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.login-form h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
}

.form-item {
  margin-bottom: 15px;
}

.form-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-item input {
  width: 95%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.form-item input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* 登录按钮样式 */
.form-actions {
  text-align: center;
}

.btn-login {
  width: 100%;
  padding: 10px 0;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #0056b3;
}

/* 第三方登录样式 */
.third-party-login {
  text-align: center;
  margin: 20px 0;
}

.google-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  font-size: 1rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  color: #333;
}

.google-login-btn img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.google-login-btn:hover {
  background-color: #f0f0f0;
}

/* 注册跳转样式 */
.register-link {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 10px;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
/* 表单切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 验证码布局 */
.captcha-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.captcha-input {
  flex: 1;
  margin-right: 10px;
}

.btn-captcha {
  margin-top: 27px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-captcha:hover {
  background-color: #0056b3;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main{
    height: 100vh; /* 确保设置全局的高度 */
    width: 100%;
    background-color: rgb(19, 22, 26);
  }
  .login-container {
    flex-direction: column;
    height: auto;
  }

  .left-section,
  .right-section {
    flex: none;
    /* width: 100%; */
    padding: 20px;
  }

  .login-form {
    max-width: 90%;
    padding: 15px;
  }

  .site-title {
    font-size: 1.8rem;
  }

  .slogan {
    font-size: 1rem;
  }
  .form-item input{
    width: 95%;
  }
}
</style>
