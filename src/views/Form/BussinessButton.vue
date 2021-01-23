<template>
  <div>
    <sb-tip>
      一个项目中每个页面的按钮通常都是要求风格统一的，既然需要重复写，何不封装起来？
    </sb-tip>
    <a-row>
      <a-col :span="2" @click="test">
        <sb-btn-c />
      </a-col>
      <a-col :span="2">
        <sb-btn-r/>
      </a-col>
      <a-col :span="2">
        <sb-btn-u/>
      </a-col>
      <a-col :span="2">
        <sb-btn-d/>
      </a-col>
      <a-col :span="2">
        <sb-btn-print />
      </a-col>
    </a-row>
    <a-divider></a-divider>
    <a-row>
      <a-col :span="3">
        <sb-btn-zip />
      </a-col>
      <a-col :span="3">
        <sb-btn-img />
      </a-col>
      <a-col :span="3">
        <sb-btn-excel></sb-btn-excel>
      </a-col>
    </a-row>
    <a-divider></a-divider>
    <a-row>
      <a-col :span="3">
        <sb-btn-zip>点击获取验证码，其实还没做</sb-btn-zip>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  methods: {
    test(){
      this.$ms("click me ?")
    }
  },
}
</script>
    