<template>
  <div>
    <a-layout-header class="flex j-s a-c" style="background: #fff; padding: 0">
      <div class="flex a-c">
        <component
          class="trigger"
          :is="collapsed ? 'i-MenuUnfold' : 'i-MenuFold'"
          @click="TOGGLE_COLLAPSED"
        ></component>
        <BreadCrumb />
      </div>
      <div class="flex a-c">
        <i @click="changeLocaleLang" class="iconfont icon-i18n icon" />
        <component
          @click="isFull = !isFull"
          :is="isFull ? 'i-fullscreenExit' : 'i-fullscreen'"
          class="icon"
        ></component>
        <a-dropdown>
          <a class="ant-dropdown-link" style="padding-right: 30px">
            <i-user type="user" />
            &nbsp;{{ nickname }}
            <i-down />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link to="/sys/updatepwd">
                  <i-tool />&nbsp;修改密码
                </router-link>
              </a-menu-item>
              <a-menu-item @click="logout">
                <i-poweroff />&nbsp;注销登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <TagsView />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import BreadCrumb from "./BreadCrumb";
import TagsView from "./TagsView";

export default {
  data() {
    return {
      isFull: false,
    };
  },
  watch: {
    isFull(val) {
      if (!val) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        let element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
    },
  },
  components: {
    BreadCrumb,
    TagsView,
  },
  methods: {
    async changeLocaleLang() {
      await this.$ml("订单详情页语言切换中..", 0.5);
      this.$i18n.locale = this.$i18n.locale === "en" ? "cn" : "en";
      this.$ms("语言切换完成");
    },
    logout() {
      this.logOut();
      this.$router.push({
        path: `/login?redirect=${this.$route.fullPath}`,
        replace: true,
      });
    },
    ...mapMutations("system", ["TOGGLE_COLLAPSED"]),
    ...mapActions("account", ["logOut"]),
  },
  computed: {
    ...mapState("system", ["collapsed"]),
    ...mapGetters(["nickname"]),
  },
};
</script>

<style scoped lang='scss'>
@import "//at.alicdn.com/t/font_2183549_y8iqwmhqyg.css";
.icon {
  margin: 0 10px;
  font-size: 18px;
  cursor: pointer;
}

.trigger {
  font-size: 18px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}
</style>