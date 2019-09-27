<template>
  <el-dialog
    title="客户列表"
    :visible.sync="isShowDialog"
    width="60%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        v-loading="listLoading"
      >
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">{{ scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="客户头像" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:60px;height: 60px;border: #EBEEF5 solid 1px;" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="粉丝id" width="295">
          <template slot-scope="scope">{{ scope.row.fans_id}}</template>
        </el-table-column>
        <el-table-column label="客户昵称" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="粉丝类型" align="center">
          <template slot-scope="scope">{{ scope.row.fans_type }}</template>
        </el-table-column>
      </el-table>
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
    taskData: { type: String }
  },
  watch: {
    taskData: function(newValue, oldValue) {
      this.fetchCustomers(newValue);
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 100,
      total: 0
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    //获取分销商客户列表
    fetchCustomers(mobile) {
      let params = {
        mobile: mobile,
        _uiName_: "eleme"
      };

      let page = { pageNumber: this.currentPage, pageSize: this.pageSize };

      params["_pagination"] = JSON.stringify(page);

      this.listLoading = true;
      this.axios
        .get(this.urls.getyzsalescustomers + "?" + Qs.stringify(params))
        .then(response => {
          if (response.data.errcode == 0)
            return this.$message.error(response.data.errmsg);
          this.list = response.data.customers;
          this.listLoading = false;
        });
    },
    formatTime(cellValue) {
      return getTimeDate(cellValue);
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

