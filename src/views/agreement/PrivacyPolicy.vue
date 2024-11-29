<template>
  <div class="privacypolicy">
    <navbar></navbar>
    <div class="container">
      <h1>Asimplefox 隐私政策</h1>

      <p class="notice">
        <strong>重要声明：</strong>
        您的隐私对我们至关重要。通过使用 Asimplefox 的服务，即表示您已阅读并同意本隐私政策。如果您不同意其中任何条款，请立即停止使用我们的服务。
      </p>

      <section>
        <h2>1. 我们收集的信息</h2>
        <p>为了向您提供更好的服务，我们可能会收集以下信息：</p>
        <ul>
          <li><strong>个人信息：</strong>例如姓名、电子邮件地址、手机号码等，用于注册和账户管理。</li>
          <li><strong>支付信息：</strong>例如信用卡信息和支付记录，用于处理会员充值。</li>
          <li><strong>设备信息：</strong>例如设备型号、操作系统、IP 地址和浏览器类型，用于优化服务和防止欺诈。</li>
          <li><strong>使用行为信息：</strong>例如观看记录和偏好设置，用于推荐内容。</li>
        </ul>
        <p>我们严格按照相关法律法规处理您的信息。</p>
      </section>

      <section>
        <h2>2. 我们如何使用信息</h2>
        <p>我们收集的信息将用于以下目的：</p>
        <ul>
          <li>提供和优化服务，例如推荐您可能感兴趣的短剧。</li>
          <li>处理支付和会员充值，确保交易的安全性。</li>
          <li>改进用户体验，例如解决技术问题和优化播放效果。</li>
          <li>履行法律义务，例如处理法律请求或防止违法行为。</li>
        </ul>
        <p>我们不会将您的信息用于本政策未说明的用途。</p>
      </section>

      <section>
        <h2>3. 信息的共享与披露</h2>
        <p>在以下情况下，我们可能会与第三方共享您的信息：</p>
        <ul>
          <li>与支付处理方共享支付信息，以完成交易。</li>
          <li>与服务合作方共享必要数据，例如用于内容推荐或广告分析。</li>
          <li>根据法律要求向监管部门或执法机关提供信息。</li>
          <li>为了保护 Asimplefox 或用户的合法权益。</li>
        </ul>
        <p>我们将尽可能采取措施确保第三方对信息的安全保护。</p>
      </section>

      <section>
        <h2>4. 信息的存储与保护</h2>
        <p>我们将采取合理措施保护您的信息安全，防止未经授权的访问、泄露或损失：</p>
        <ul>
          <li>使用加密技术保护敏感信息，例如支付信息。</li>
          <li>限制员工对用户信息的访问，仅允许必要的人员访问。</li>
          <li>定期更新和测试系统以防止安全漏洞。</li>
        </ul>
        <p>但由于互联网的开放性，我们无法保证信息的绝对安全，请您理解并谨慎使用我们的服务。</p>
      </section>

      <section>
        <h2>5. 用户的权利</h2>
        <p>您对您的个人信息拥有以下权利：</p>
        <ul>
          <li>访问权：您可以随时查看我们收集的关于您的信息。</li>
          <li>更正权：如果信息有误，您可以要求我们更新或更正。</li>
          <li>删除权：在法律允许的情况下，您可以要求删除您的个人信息。</li>
          <li>撤回同意权：您可以随时撤回对信息使用的同意。</li>
        </ul>
        <p>如需行使以上权利，请通过我们的<a href="/contact" class="link">联系方式</a>与我们联系。</p>
      </section>

      <section>
        <h2>6. 未成年人保护</h2>
        <p>我们非常重视未成年人的隐私保护：</p>
        <ul>
          <li>若您未满 18 岁，请在父母或监护人的同意下使用我们的服务。</li>
          <li>如我们发现未成年人未经监护人同意提供个人信息，我们将采取措施删除相关数据。</li>
        </ul>
      </section>

      <section>
        <h2>7. 政策变更</h2>
        <p>我们可能会不时更新隐私政策。变更后的政策将在网站上公示，并立即生效。</p>
        <p>请定期查看隐私政策，以了解最新信息。</p>
      </section>

      <section>
        <h2>8. 联系我们</h2>
        <p>如果您对本政策有任何疑问或建议，请通过以下方式联系我们：</p>
        <ul>
          <li><strong>Email：</strong>support@asimplefox.com</li>
          <li><strong>联系电话：</strong>+1-800-123-4567</li>
        </ul>
      </section>

      <p class="footer">
        感谢您对 Asimplefox 的信任！我们将一如既往地致力于保护您的隐私和数据安全。
      </p>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script lang="ts" setup>
import navbar from '@/components/header.vue';
import FooterComponent from '@/components/footer.vue';
</script>

<style scoped>
.privacypolicy {
  background-color: rgb(19, 22, 26);
  padding: 20px;
  color: #333;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  color: white;
  padding: 20px 30px;
  border-radius: 8px;
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
