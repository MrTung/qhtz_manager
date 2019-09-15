<template>
  <el-dialog
    title="账户资料"
    :visible.sync="isShowDialog"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <el-form ref="form" :model="form" label-width="120px" class="formview">
        <el-form-item label="账号ID" class="form-item">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" class="form-item" prop="salary">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="账号名称" class="form-item" prop="salary">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="xiugai()">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import Qs from "qs";

export default {
  name: "taskInfo",
  components: {},
  props: {
    isShowDialog: Boolean,
    taskData: { type: Object }
  },
  watch: {
    taskData: function(newValue, oldValue) {
      this.taskInfo = newValue;

      this.form = this.taskInfo;
    }
  },
  data() {
    return {
      taskInfo: null,

      form: {
        id: "",
        userId: "",
        password: "",
        userName: "",
        phone: ""
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    //dialog关闭按钮
    handleClose() {
      // this.isNewDialog = false;
      this.$emit("editDialog", false);
    },
    xiugai() {
      let param = {
        base: JSON.stringify({
          id: this.form.id,
          userName: this.form.userName,
          userId: this.form.userId,
          password: this.form.password,
          checkPassword: this.form.password,
          wxNum: "",
          mail: "",
          phone: this.form.phone,
          region: ""
        }),
        roles: '[{ id: null, roleId: 1, status: "1" }]'
      };
      this.axios
        .post(this.urls.addadmin + "?" + Qs.stringify(param))
        .then(response => {
          this.$emit("editDialog", false);
        });
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

