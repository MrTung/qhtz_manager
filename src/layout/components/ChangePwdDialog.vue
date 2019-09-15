<template>
  <el-dialog
    title="修改密码"
    :visible.sync="isShowDialog"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <el-form ref="form" :model="form" label-width="120px" class="formview">
        <el-form-item label="旧密码" class="form-item" prop="oldPwd">
          <el-input v-model="form.oldPwd" type="password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" class="form-item" prop="pwd">
          <el-input v-model="form.pwd" type="password" placeholder="请输入6-20位新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" class="form-item" prop="comfirPwd">
          <el-input v-model="form.comfirPwd" type="password" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submit">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import Qs from "qs";
import { removeUserinfo } from "@/utils/auth"; // get token from cookie

export default {
  name: "taskInfo",
  components: {},
  props: {
    isShowDialog: Boolean
  },
  watch: {},
  data() {
    return {
      form: {
        oldPwd: "",
        pwd: "",
        comfirPwd: ""
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    submit() {
      if (
        this.form.oldPwd.length == 0 ||
        this.form.pwd.length == 0 ||
        this.form.comfirPwd.length == 0
      )
        return this.$message.error("请输入完整信息");

      if (this.form.oldPwd == this.form.pwd)
        return this.$message.error("新密码和旧密码不能一样");

      if (this.form.pwd != this.form.comfirPwd)
        return this.$message.error("两次输入密码不一样,请重新输入");

      this.axios
        .put(this.urls.changepwd + "?" + Qs.stringify(this.form))
        .then(response => {
          if (response.code == 0) return this.$message.error(response.msg);

          this.$message({
            message: "密码修改成功,请重新登录",
            type: "success"
          });
          this.$emit("loginOut");
        });
    },
    //dialog关闭按钮
    handleClose() {
      this.$emit("editDialog", false);
    }
  }
};
</script>

<style scoped lang="scss">
.line {
  text-align: center;
}

.formview {
  padding: 0 30px;
  padding-top: 0px;
}

.sub-navbar {
  height: 50px;
  line-height: 50px;
  position: relative;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  transition: 600ms ease position;
  background: linear-gradient(
    90deg,
    rgba(32, 182, 249, 1) 0%,
    rgba(32, 182, 249, 1) 0%,
    rgba(33, 120, 241, 1) 100%,
    rgba(33, 120, 241, 1) 100%
  );

  .subtitle {
    font-size: 20px;
    color: #fff;
  }

  &.draft {
    background: #d0d0d0;
  }

  &.deleted {
    background: #d0d0d0;
  }
}
</style>

