<template>
  <el-dialog
    title="详情"
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
        <el-form-item label="提交时间" class="form-item" prop="dbCreateSysTime">
          <el-input v-model="form.dbCreateSysTime"></el-input>
        </el-form-item>
         <el-form-item label="收款名称" class="form-item" prop="payTime">
          <el-input v-model="form.bankName"></el-input>
        </el-form-item>
        <el-form-item label="收款账号" class="form-item" prop="payTime">
          <el-input v-model="form.bankCardNo"></el-input>
        </el-form-item>
        <el-form-item label="充值金额" class="form-item" prop="payTime">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="打款账户" class="form-item" prop="payTime">
          <el-input v-model="form.payCardNo"></el-input>
        </el-form-item>
        <el-form-item label="打款姓名" class="form-item" prop="payTime">
          <el-input v-model="form.payUserName"></el-input>
        </el-form-item>
        <el-form-item label="支付凭证" class="form-item" prop="salary">
          <a :href="fileurl" target="_blank">
            <img :src="fileurl" style="width: 100px; height: 100px;object-fit:contain;" />
          </a>
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
    selectItem: { type: Object }
  },
  watch: {
    selectItem: function(newValue, oldValue) {
      this.orderinfo = newValue;

      this.orderinfo.dbCreateSysTime = this.formatTime(
        this.orderinfo.dbCreateSysTime
      );

      this.form = this.orderinfo;

      if (this.form.payFileId) this.getFilesUrl(this.form.payFileId);
    }
  },
  data() {
    return {
      fileurl: "",
      form: {}
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    formatTime(cellValue) {
      return getTimeDate(cellValue);
    },
    //获取付款凭证
    getFilesUrl(item) {
      this.axios.get(this.urls.getFileurl + "?id=" + item).then(response => {
        if (response.code == 0) return this.$message.error(response.msg);
        this.fileurl =
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

