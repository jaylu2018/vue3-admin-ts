<template>
  <div>
    <a-row>
      <a-col :span="10">
        <a-card title="修改密码" style="width: 400px; margin: 10px 0">
          <a-form ref="frm" :model="pwdInfo">
            <a-form-item
              style="margin: 0"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 15 }"
              label="原密码"
            >
              <a-input type="password" v-model:value="pwdInfo.password" />
            </a-form-item>
            <a-form-item
              style="margin: 0"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 15 }"
              label="新密码"
            >
              <a-input type="password" v-model:value="pwdInfo.newpassword" />
            </a-form-item>
            <a-form-item
              style="margin: 0"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 15 }"
              label="确认密码"
            >
              <a-input type="password" v-model:value="pwdInfo.newpassword2" />
            </a-form-item>
          </a-form>
          <template #extra>
            <sb-btn type="danger" @click="savePassword" size="small" icon="save"
              >保存</sb-btn
            >
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { $post } from "~mixins/useRequest";
import { $encrypt } from "~mixins/useUtils";
import { $ms, $me, $mw } from "~mixins/useMsg";
import { useStore } from "vuex";

export default {
  setup(props, context) {
    let frm = ref(null);
    let store = useStore();

    let pwdInfo = reactive({
      password: "",
      newpassword: "",
      newpassword2: "",
    });

    async function savePassword() {
      if (pwdInfo.newpassword !== pwdInfo.newpassword2)
        return $mw("密码与确认密码输入不一致！");

      await $ms("假装修改成功");
      store.dispatch("account/logOut");

      // let { success } = await $post("/account/updatePassword", {
      //   password: $encrypt(pwdInfo.password),
      //   newpassword: $encrypt(pwdInfo.newpassword),
      // });

      // if (success) {
      //   await $ms("修改成功，请重新登录");
      //   store.dispatch("account/logOut");
      // } else $me("原密码不正确！");

      frm.value.resetFields();
    }

    return { savePassword, pwdInfo, frm };
  },
};
</script>

<style scoped lang="scss"></style>
