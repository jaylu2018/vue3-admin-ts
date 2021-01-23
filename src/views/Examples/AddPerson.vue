<template>
  <div>
    <ul>
      <template v-for="(form, i) in personList" :key="form.id">
        <li class="item">
          <a-row>
            <a-col :span="22">
              <h1>家庭成员.{{ i + 1 }}</h1>
            </a-col>
            <a-col :span="1">
              <sb-btn
                v-if="personList.length > 1"
                type="danger"
                size="small"
                @click="removeOption(i)"
                icon="delete"
                ghost
                >移除此项</sb-btn
              >
            </a-col>
          </a-row>
          <a-form
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-row>
              <a-col :span="12">
                <a-form-item label="姓名" name="name">
                  <a-input v-model:value="form.name" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="与户主关系" name="relation">
                  <a-select
                    v-model:value="form.relation"
                    placeholder="请选择与户主关系"
                  >
                    <a-select-option :value="0">父亲</a-select-option>
                    <a-select-option :value="1">母亲</a-select-option>
                    <a-select-option :value="2">儿子</a-select-option>
                    <a-select-option :value="3">女儿</a-select-option>
                    <a-select-option :value="4">孙子</a-select-option>
                    <a-select-option :value="5">孙女</a-select-option>
                    <a-select-option :value="6">外孙</a-select-option>
                    <a-select-option :value="7">外孙女</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item label="身份证号" name="idcard">
                  <a-input v-model:value="form.idcard" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="年龄" name="age">
                  <a-input-number v-model:value="form.age" :min="1" :max="10" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item label="性别" name="gender">
                  <a-radio-group
                    v-model:value="form.gender"
                    button-style="solid"
                  >
                    <a-radio-button :value="0"> 男 </a-radio-button>
                    <a-radio-button :value="1"> 女 </a-radio-button>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="手机号" name="tel">
                  <a-input v-model:value="form.tel" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item label="文化程度" name="whcd">
                  <a-select
                    v-model:value="form.whcd"
                    placeholder="请选择文化程度"
                  >
                    <a-select-option :value="0">初中及以下</a-select-option>
                    <a-select-option :value="1">高中/中专</a-select-option>
                    <a-select-option :value="2">大专</a-select-option>
                    <a-select-option :value="3">本科及以上</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="婚姻状况" name="isMarried">
                  <a-radio-group
                    v-model:value="form.isMarried"
                    button-style="solid"
                  >
                    <a-radio-button :value="0"> 已婚 </a-radio-button>
                    <a-radio-button :value="2"> 未婚 </a-radio-button>
                    <a-radio-button :value="3"> 离异 </a-radio-button>
                    <a-radio-button :value="4"> 丧偶 </a-radio-button>
                    <a-radio-button :value="5"> 其他 </a-radio-button>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item label="政治面貌" name="zzmm">
                  <a-radio-group v-model:value="form.zzmm" button-style="solid">
                    <a-radio-button :value="0"> 党员 </a-radio-button>
                    <a-radio-button :value="1"> 团员 </a-radio-button>
                    <a-radio-button :value="2"> 群众 </a-radio-button>
                    <a-radio-button :value="3"> 其他党派/组织 </a-radio-button>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item label="是否参保" name="isProtected">
                  <a-switch
                    checked-children="开"
                    un-checked-children="关"
                    v-model:checked="form.isProtected"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </li>
      </template>
    </ul>

    <div class="more_box flex flex-col j-c a-c" @click="addOption">
      <i-plus class="icon"></i-plus>
      添加更多
    </div>
    <div class="flex j-c" style="padding: 20px 0">
      <sb-btn block style="width: 300px" size="large" @click="save" icon="save"
        >保存并提交</sb-btn
      >
    </div>
  </div>
</template>
<script>
import { $mc } from "~mixins/useMsg";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      personList: [
        {
          id: +new Date(), //相当于new Date().getTime()距离1970-1-1的总毫秒数
          name: "",
          gender: 0,
          tel: "",
          idcard: "",
          age: "",
          whcd: 0,
          isMarried: 0,
          relation: 0,
          zzmm: 0,
          isProtected: true,
        },
      ],
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "姓名必须在2位到10位之间",
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1\d{10}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addOption() {
      this.personList.push({
        id: +new Date(),
        name: "",
        gender: 0,
        tel: "",
        idcard: "",
        age: "",
        whcd: 0,
        isMarried: 0,
        relation: 0,
        zzmm: 0,
        isProtected: true,
      });
    },
    async removeOption(i) {
      await $mc("确认移除?");
      this.personList.splice(i, 1);
    },
    async save() {
      console.log(this.$refs.ruleForm);
      await this.$refs.ruleForm.validate();
      console.log(this.personList);
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  padding: 20px 0;
  border-bottom: 1px dotted #ccc;
}
.item:last-of-type {
  border-bottom: none !important;
}
.more_box {
  color: #ccc;
  margin: 20px;
  padding: 15px 0;
  border: 1px dashed #ccc;
  user-select: none;
  cursor: pointer;
  .icon {
    font-size: 22px;
  }
}
</style>