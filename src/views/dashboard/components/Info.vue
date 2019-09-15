<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span style="font-weight:bold;">验号登录:</span>
      <span style="font-size:14px;">
        <span style="color:red;">每次重新登录谦恒之后也需要重新登录验号系统</span>
      </span>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号" prop="userId">
        <el-input v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="onSubmit">确认提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        userId: "13353333734",
        pwd: "qwe1230."
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit() {
      let params = {
        userName: this.form.userId,
        password: this.form.pwd,
        remember: "false"
      };
    }
  }
};
</script>

<style lang="scss" >
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>
<style lang="scss" scoped>
</style>
