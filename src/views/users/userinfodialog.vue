<template>
  <el-dialog
    title="分销商资料"
    :visible.sync="isShowDialog"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <el-form ref="form" :model="form" label-width="120px" class="formview">
        <el-form-item label="手机" class="form-item">
          <el-input v-model="form.userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" class="form-item" prop="salary">
          <el-input v-model="form.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="微信号" class="form-item" prop="salary">
          <el-input v-model="form.wxNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" class="form-item" prop="salary">
          <el-input v-model="form.idCardNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账户余额(积分)" class="form-item" prop="salary">
          <el-input v-model="form.points" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" class="form-item" prop="salary">
          <el-input v-model="form.bankNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="开户名称" class="form-item" prop="salary">
          <el-input v-model="form.bankName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="开户行" class="form-item" prop="salary">
          <el-input v-model="form.bankSubName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证照片" class="form-item" prop="salary">
          <a :href="fileurl1" target="_blank">
            <img :src="fileurl1" style="width: 100px; height: 100px;object-fit:contain;" />
          </a>
          <a :href="fileurl2" target="_blank">
            <img :src="fileurl2" style="width: 100px; height: 100px;object-fit:contain;" />
          </a>
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
      this.form = newValue;
      this.fileurl1 = "http://39.100.235.160:8011/upload/logo.jpeg";
      this.fileurl2 = "http://39.100.235.160:8011/upload/logo.jpeg";
      this.getFilesUrl(this.form.fileId);
    }
  },
  data() {
    return {
      fileurl1: "http://39.100.235.160:8011/upload/logo.jpeg",
      fileurl2: "http://39.100.235.160:8011/upload/logo.jpeg",
      fileurl3: "",
      form: {
        bankName: "",
        bankNo: "",
        bankSubName: "",
        dbCreateSysTime: "",
        dbUpdateSysTime: "",
        id: "",
        userName: "",
        isSalesman: "",
        openId: "",
        password: "",
        salt: "",
        sysStatus: "",
        token: "",
        userId: "",
        userStatus: "",
        wxNum: ""
      }
    };
  },
  computed: {
    getbalance() {
      let userinfo = this.$store.state.userinfo;
      return userinfo.balance;
    }
  },
  created() {},
  mounted() {},
  methods: {
    //获取用户资料
    getFilesUrl(item) {
      if (!item) return [];
      let arr = item.split(",");

      this.axios.get(this.urls.getFileurl + "?id=" + arr[0]).then(response => {
        if (response.code == 0) return this.$message.error(response.msg);
        this.fileurl1 =
          this.urls.imgbaseurl +
          response.data.substring(2, response.data.length);
      });

      this.axios.get(this.urls.getFileurl + "?id=" + arr[1]).then(response => {
        if (response.code == 0) return this.$message.error(response.msg);
        this.fileurl2 =
          this.urls.imgbaseurl +
          response.data.substring(2, response.data.length);
      });
    },
    //dialog关闭按钮
    handleClose() {
      // this.isNewDialog = false;
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

