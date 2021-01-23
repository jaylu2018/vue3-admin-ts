<template>
  <div class="login-bg flex a-c j-c">
    <div id="particles"></div>

    <div
      class="login-container flex flex-col a-c animate__animated animate__bounceInDown"
    >
      <h1 class="title">{{ GLOBAL_TITLE }}</h1>

      <a-form
        :rules="login_rules"
        ref="loginForm"
        :model="loginModel"
        class="login-form"
        :wrapper-col="{ span: 24 }"
        @keydown.enter="handleLogin"
      >
        <a-form-item name="username">
          <a-input
            autocomplete="off"
            v-model:value="loginModel.username"
            placeholder="请输入用户名/admin"
          >
            <template #prefix>
              <i-User style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input
            autocomplete="off"
            v-model:value="loginModel.password"
            type="password"
            placeholder="请输入密码/123123"
          >
            <template #prefix>
              <i-Lock style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-model:checked="loginModel.remember">
            <span class="remember-me">24小时内免登录</span>
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <sb-btn
            :loading="loading"
            @click="handleLogin"
            type="primary"
            class="login-form-button"
            >登 录</sb-btn
          >
        </a-form-item>
      </a-form>
    </div>
    <ul
      class="account_list animate__animated animate__bounceInRight"
      v-if="is_dev"
    >
      <li>你是否初出茅庐，看公司的框架如同天书？</li>
      <li>你是否工作两年，却一直在重复调用接口增删改查？</li>
      <li>你是否在面试时，发现除了名词外什么都说不出来？</li>
      <li>那么，夜深人静的时候，打开Simba-Admin-Vue3</li>
      <li>偷偷努力吧。</li>
      <li>这个框架的定位是帮助新手向成手转变</li>
      <li>你可以直接基于她开始开发，减少重复的劳动</li>
      <li>也可以阅读源码，从中学到如何更好地写代码</li>
      <li>她不是组件的大杂烩，而是项目实战的编程范式</li>
      <li>拒绝代码堆砌，体验封装美学</li>
      <li>价格：<count-to :endVal="2021"></count-to>/R&nbsp;&nbsp;&nbsp;&nbsp;一次付费，长期服务</li>
      <li>1.本框架的完整代码及后续迭代 vue3+eggjs</li>
      <li>2.比B站更完整的vue2-vue3的视频教程</li>
      <li>3.本框架的上手及原理教程，向高手进阶</li>
      <li>4.SVIP服务，免费咨询实际项目问题，尽力解决</li>
    </ul>
    <footer class="fixed">&copy;{{ COMPANY_NAME }}</footer>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { CountTo } from "~components";
import { $post } from "~mixins/useRequest";
import { $ms, $me } from "~mixins/useMsg";
import { $encrypt } from "~mixins/useUtils";
import { GLOBAL_TITLE, COMPANY_NAME } from "~config";
import login_rules from "./login_rule";
export default {
  components: { CountTo },
  setup() {
    let store = useStore();
    let router = useRouter();
    let route = useRoute();
    let loginForm = ref(null);
    let is_dev = process.env.NODE_ENV === "development";
    let data = reactive({
      loading: false,
      loginModel: {
        remember: false,
        username: "",
        password: "",
      },
      login_rules,
    });

    onMounted(() => {
      if (is_dev) {
        data.loginModel.username = "admin";
        data.loginModel.password = "123123";
      }
    });

    //todo setup目前似乎还不支持辅助函数 20201121
    let login = (loginModel) => store.dispatch("account/login", loginModel);

    let handleLogin = async (e) => {
      await loginForm.value.validate();
      data.loading = true;
      try {
        data.loginModel.password = $encrypt(data.loginModel.password);
        let success = await login(data.loginModel);
        if (success) {
          $ms("登录成功");
          router.push(route.query.redirect || "/");
        } else $me("用户名或密码错误");
      } catch (error) {
        console.fakeLog(error);
        data.loading = false;
      }

      loginForm.value.resetFields();
      data.loading = false;
    };
    return {
      loginForm,
      ...toRefs(data),
      handleLogin,
      is_dev,
      GLOBAL_TITLE,
      COMPANY_NAME,
    };
  },
};
</script>

<style scoped lang='scss'>
.login-bg {
  background: rgb(40, 86, 172);
  height: 100vh;
  overflow: hidden;
  .title {
    text-align: center;
    font-family: 微软雅黑;
    color: #fff;
    font-size: 40px;
    user-select: none;
  }
  #particles {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .login-container {
    padding: 50px 0;
    font-style: italic;
    text-shadow: 2px 2px 5px skyblue;
    .login-form {
      width: 20vw;
      min-width: 300px;
      border-radius: 20px;
      .remember-me {
        color: #fff;
        user-select: none;
      }

      &:v-deep {
        .anticon {
          color: #fff !important;
        }
        input {
          background: transparent;
          color: #fff;
        }
      }

      .login-form-button {
        min-width: 300px;
        width: 100%;
      }
    }
  }
}
footer {
  color: #fff;
  bottom: 50px;
  width: 100vw;
  text-align: center;
}
.account_list {
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  right: 20px;
  top: 20px;
  li {
    padding: 5px 10px;
  }
}
</style>