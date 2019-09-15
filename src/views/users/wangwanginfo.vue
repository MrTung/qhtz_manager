<template>
  <el-dialog
    title="旺旺资料"
    :visible.sync="isShowDialog"
    width="50%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding:0px;">
      <el-form ref="form" :model="form" label-width="100px" class="formview">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="淘宝买家" class="form-item">
              <div>{{form.wangwang}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账号状态" class="form-item" prop="salary">
              <el-tag :type="form.status | statusFilter">{{ getStatusname(form.status) }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="买家等级" class="form-item" prop="salary">
              <div>{{form.buyerLevel}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="买家信用" class="form-item" prop="salary">
              <svg-icon icon-class="zan" style="font-size:22px;" />
              <span style="font-weight:bold;color:red;">{{form.buyerScore}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="是否实名" class="form-item" prop="salary">
              <span style="font-weight:bold;color:red;">{{form.realName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" class="form-item">
              <svg-icon icon-class="man" style="font-size:22px;" v-if="form.gender == 'M'" />
              <svg-icon icon-class="woman" style="font-size:22px;" v-else-if="form.gender == 'F'" />
              <span v-else>未知</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="给商家好评" class="form-item" prop="salary">
              <span>{{form.sentRate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收到商家好评" class="form-item" prop="salary">
              <span>{{form.receivedRate}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="给出中差评数" class="form-item" prop="salary">
              <svg-icon icon-class="cai" style="font-size:22px;" />
              <span style="font-weight:bold;color:red;">{{form.buyerTotalNum - form.buyerGoodNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册时间" class="form-item">
              <span>{{form.wwcreatedStr}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="降权信息" class="form-item" prop="jiangquan">
              <span style="font-weight:bold;color:red;">{{form.jiangquan}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="头像" class="form-item" prop="salary">
              <img :src="form.avatar" style="width:40px;height:40px;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="更新时间" class="form-item" prop="salary">
              <span>{{form.finishTsStr}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="周均信誉点数" class="form-item" prop="weekCreditAverage">
              <span>{{form.weekCreditAverage}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import Qs from "qs";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "info",
        2: "warning",
        3: "danger",
        4: "success",
        5: "success",
        6: "danger",
        7: "danger"
      };
      return statusMap[status];
    }
  },
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
      form: {}
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
    getStatusname(status) {
      const statusMap = {
        1: "info",
        2: "warning",
        3: "danger",
        4: "正常",
        5: "success",
        6: "danger",
        7: "danger"
      };
      return statusMap[status];
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

.hview {
  display: flex;
  flex-direction: row;
}
</style>

