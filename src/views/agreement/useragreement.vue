<template>
  <div class="useragreement">
    <navbar></navbar>
    <div class="container">
      <h1>Asimplefox 用户协议</h1>

      <p class="notice">
        <strong>重要声明：</strong>
        用户通过注册或使用 Asimplefox 网站服务，即表示您已阅读并同意本协议的所有条款，包括但不限于服务内容、会员政策和隐私保护条款。如您不同意本协议内容，请勿注册或使用我们的服务。
      </p>

      <section>
        <h2>1. 服务内容</h2>
        <p>Asimplefox 提供以下服务：</p>
        <ul>
          <li>短剧的在线播放服务。</li>
          <li>用户注册与登录功能。</li>
          <li>会员充值与专属会员服务。</li>
          <li>其他由 Asimplefox 不时提供的增值服务。</li>
        </ul>
        <p>我们可能会根据需要对服务内容进行调整，更新的服务条款将在网站上予以公示。</p>
      </section>

      <section>
        <h2>2. 用户注册</h2>
        <p>注册即代表用户同意本协议的所有条款。用户需要提供准确的信息，并自行承担因信息不准确导致的后果。</p>
        <ul>
          <li>用户必须为年满 18 岁的自然人。</li>
          <li>用户应妥善保管账户和密码信息，防止账户被盗用。</li>
          <li>若发现账户存在异常，用户应立即通知我们。</li>
        </ul>
      </section>

      <section>
        <h2>3. 会员服务</h2>
        <p>Asimplefox 提供会员专属服务，包括但不限于：</p>
        <ul>
          <li>短剧无广告播放。</li>
          <li>高清画质和更快播放速度。</li>
          <li>提前观看独家剧集的权益。</li>
        </ul>
        <p>会员充值后不得转让或退款，除法律另有规定外。</p>
      </section>

      <section>
        <h2>4. 用户行为规范</h2>
        <p>在使用 Asimplefox 服务时，用户不得进行以下行为：</p>
        <ul>
          <li>传播侵犯版权或其他知识产权的内容。</li>
          <li>发布违法、有害、诽谤、淫秽等不当内容。</li>
          <li>尝试未经授权访问我们的系统或其他用户账户。</li>
          <li>任何其他违反法律法规或本协议的行为。</li>
        </ul>
        <p>若违反上述规定，Asimplefox 有权暂停或终止用户的账户。</p>
      </section>

      <section>
        <h2>5. 隐私政策</h2>
        <p>Asimplefox 高度重视您的隐私保护。我们将按照法律要求收集、使用和存储您的个人信息。</p>
        <p>请阅读我们的<a href="/privacy-policy" class="link">隐私政策</a>以了解详细信息。</p>
      </section>

      <section>
        <h2>6. 免责声明</h2>
        <p>我们尽力确保服务的稳定和准确，但对于因不可抗力或其他非 Asimplefox 可控因素导致的服务中断或数据丢失，Asimplefox 不承担责任。</p>
      </section>

      <section>
        <h2>7. 修改与终止</h2>
        <p>Asimplefox 保留随时修改本协议或终止服务的权利。若协议条款发生变更，我们将通过网站公告或其他方式通知用户。</p>
      </section>

      <section>
        <h2>8. 法律适用与争议解决</h2>
        <p>本协议受相关法律管辖，任何争议应提交至 Asimplefox 所在地法院解决。</p>
      </section>

      <p class="footer">
        感谢您选择 Asimplefox！通过注册，您即默认同意此用户协议和我们的<a href="/privacy-policy" class="link">隐私政策</a>。如有任何疑问，请通过我们的<a href="/contact" class="link">联系方式</a>与我们联系。
      </p>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script lang="ts" setup>
import navbar from '@/components/header.vue'
import FooterComponent from "@/components/footer.vue";
</script>

<style scoped>
.useragreement {
  background-color: rgb(19, 22, 26);
  padding: 20px;
  color: #333;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  /* background: #fff; */
  color: white;
  padding: 20px 30px;
  border-radius: 8px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: white;
}

.notice {
  background: #ffe9e9;
  border-left: 4px solid #ff5f5f;
  padding: 10px 15px;
  margin-bottom: 20px;
  color: #d9534f;
  font-size: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 10px;
  color: white;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 10px;
}

ul {
  list-style-type: disc;
  margin: 10px 20px;
}

ul li {
  margin-bottom: 8px;
}

.link {
  color: #0056b3;
  text-decoration: underline;
  cursor: pointer;
}

.link:hover {
  color: #003d82;
}

.footer {
  margin-top: 20px;
  font-size: 0.9rem;
  color: white;
}
</style>
