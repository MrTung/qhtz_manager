<template>
  <el-dialog
    title="订单详情"
    :visible.sync="isShowDialog"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <el-form ref="form" :model="form" label-width="120px" class="formview">
        <el-form-item label="订单ID" class="form-item">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="接单时间" class="form-item" prop="dbCreateSysTime">
          <el-input v-model="form.dbCreateSysTime"></el-input>
        </el-form-item>
        <el-form-item label="审核时间" class="form-item" prop="approvalTime" v-if="form.approvalTime">
          <el-input v-model="form.approvalTime"></el-input>
        </el-form-item>
        <el-form-item
          label="取消时间"
          class="form-item"
          prop="dbUpdateSysTime"
          v-if="form.orderStatusId > 6"
        >
          <el-input v-model="form.dbUpdateSysTime"></el-input>
        </el-form-item>
        <el-form-item label="支付时间" class="form-item" prop="payTime" v-if="form.payTime">
          <el-input v-model="form.payTime"></el-input>
        </el-form-item>
        <el-form-item label="支付凭证" class="form-item" prop="salary" v-if="form.payTime">
          <a v-for="item in payImages" :key="item" :href="item" target="_blank">
            <img :src="item" style="width: 100px; height: 100px;object-fit:contain;" />
          </a>
        </el-form-item>
        <el-form-item label="好评时间" class="form-item" prop="commentTime" v-if="form.commentTime">
          <el-input v-model="form.commentTime"></el-input>
        </el-form-item>
        <el-form-item label="好评凭证" class="form-item" prop="salary" v-if="form.commentTime">
          <a :href="fileurl2" target="_blank">
            <img :src="fileurl2" style="width: 100px; height: 100px;object-fit:contain;" />
          </a>
        </el-form-item>
        <el-form-item label="返还本金时间" class="form-item" prop="salary" v-if="form.payReturn == 1">
          <el-input v-model="form.dbUpdateSysTime"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import Qs from "qs";
import { getTimeDate } from "@/utils/index.js";

export default {
  name: "orderinfo",
  components: {},
  props: {
    isShowDialog: Boolean,
    taskData: { type: Object }
  },
  watch: {
    taskData: function(newValue, oldValue) {
      this.orderinfo = newValue;

      this.orderinfo.dbCreateSysTime = this.formatTime(
        this.orderinfo.dbCreateSysTime
      );
      this.orderinfo.approvalTime = this.formatTime(
        this.orderinfo.approvalTime
      );
      this.orderinfo.payTime = this.formatTime(this.orderinfo.payTime);
      this.orderinfo.dbUpdateSysTime = this.formatTime(
        this.orderinfo.dbUpdateSysTime
      );
      this.orderinfo.commentTime = this.formatTime(this.orderinfo.commentTime);
      this.form = this.orderinfo;

      if (this.form.payFiles) this.getFilesUrl(this.form.payFiles);

      if (this.form.commentFiles) this.getFilesUrl1(this.form.commentFiles);
    }
  },
  data() {
    return {
      orderinfo: null,
      payImages: [],
      fileurl1: "",
      fileurl2: "",
      form: {
        id: "11",

        address: "",
        balance: "4980352",
        businessStatusId: "",
        contact1: "",
        contact2: "",
        contact3: "",
        dbCreateSysTime: "",
        dbUpdateSysTime: "",
        files: "",
        id: "",
        idCard: "",
        lastIp: "",
        name: "",
        qq: "",
        roleId: "",
        statusName: "",
        sysStatus: "",
        sysUserId: "",
        trueName: "",
        userId: "",
        wechat: ""
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
    formatTime(cellValue) {
      return getTimeDate(cellValue);
    },
    //获取付款凭证
    getFilesUrl(payFiles) {
      // this.axios.get(this.urls.getFileurl + "?id=" + item).then(response => {
      //   if (response.code == 0) return this.$message.error(response.msg);
      //   this.fileurl1 =
      //     this.urls.imgbaseurl +
      //     response.data.substring(2, response.data.length);
      // });

      let arr = payFiles.split(",");

      let _that = this;
      arr.forEach(item => {
        if (item) {
          this.axios
            .get(this.urls.getFileurl + "?id=" + item)
            .then(response => {
              if (response.code == 0) return this.$message.error(response.msg);
              _that.payImages.push(
                this.urls.imgbaseurl +
                  response.data.substring(2, response.data.length)
              );
            });
        }
      });
    },
    //获取好评凭证
    getFilesUrl1(item) {
      this.axios.get(this.urls.getFileurl + "?id=" + item).then(response => {
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

