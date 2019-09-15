<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form" :rules="rules">
      <el-form-item label="账号类型" class="form-item" label-width="80px" prop="status">
        <el-select v-model="form.status" placeholder="请选择邀请码状态">
          <!-- <el-option label="全部" value /> -->
          <el-option label="未使用" value="未使用" />
          <el-option label="已使用" value="已使用" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="邀请码数量" class="form-item" label-width="100px" prop="num">
        <el-input placeholder="请输入本次生成邀请码数量" v-model="form.num"></el-input>
      </el-form-item>-->
      <el-form-item class="form-item">
        <el-button @click="fetchData()">刷新列表</el-button>
        <el-button type="primary" @click="submitForm()">新增邀请码</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="邀请码" align="center">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="dbCreateSysTime" label="创建时间" :formatter="formatTime"></el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="lookinfo(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right;height: 50px;padding-top: 10px;padding-right:50px;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <UserInfo
      ref="editUserDialog"
      :isShowDialog="dialogTableVisible"
      :taskData="selectTaskData"
      v-on:editDialog="editDialogListener"
    ></UserInfo>
  </div>
</template>

<script>
import Qs from "qs";
import { getTimeDate } from "@/utils/index.js";
import UserInfo from "./infoDialog";

export default {
  components: { UserInfo },

  filters: {
    statusFilter(status) {
      const statusMap = {
        未使用: "success",
        已使用: "gray"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,

      dialogTableVisible: false,
      selectTaskData: {},
      list: [],
      listLoading: true,
      form: {
        num: "",
        status: "未使用"
      },

      rules: {
        userId: [{ required: true, trigger: "blur", message: "请输入账号ID" }]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },
    submitForm(formName) {
      this.$prompt("请输入生成数量", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\+?[1-9]\d*$/,
        inputErrorMessage: "请输入数字"
      })
        .then(({ value }) => {
          let param = {
            num: value
          };
          this.axios
            .post(this.urls.addinvitation + "?" + Qs.stringify(param))
            .then(response => {
              this.fetchData();
            });
        })
        .catch(() => {});
    },

    fetchData() {
      this.listLoading = true;

      let page = { pageNumber: this.currentPage, pageSize: this.pageSize };

      let param = {
        status: this.form.status,
        _uiName_: "eleme",
        _pagination: JSON.stringify(page)
      };
      this.axios
        .get(this.urls.invitationlist + "?" + Qs.stringify(param))
        .then(response => {
          this.list = response.data.list;

          this.total = response.data.totalRow;

          this.listLoading = false;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },

    //查询
    lookinfo(row, index) {
      this.dialogTableVisible = true;
      this.selectTaskData = row;
    },
    editDialogListener(bol) {
      this.dialogTableVisible = bol;
    }
  }
};
</script>
<style scoped>
.form-item {
  display: inline-block;
  margin-right: 20px;
}
</style>
