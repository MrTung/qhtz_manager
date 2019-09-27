<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form">
      <el-form-item label="用户状态" class="form-item" label-width="80px" prop="shopType">
        <!-- 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单 -->
        <el-select v-model="form.userStatusId" placeholder="请选择用户状态">
          <el-option label="全部" value />
          <el-option label="待完善资料" value="1" />
          <el-option label="待审核" value="2" />
          <el-option label="审核通过" value="6" />
          <el-option label="审核拒绝" value="5" />
          <el-option label="锁定" value="7" />
          <el-option label="黑名单" value="8" />
        </el-select>
      </el-form-item>
      <!-- 
      <el-form-item label="姓名" class="form-item" label-width="80px" prop="shopName">
        <el-input placeholder="请输入用户姓名" v-model="form.shopName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" class="form-item" label-width="80px" prop="shopUrl">
        <el-input placeholder="请输入用户手机号" v-model="form.shopUrl"></el-input>
      </el-form-item>-->
      <el-form-item label="日期范围" class="form-item" label-width="70px">
        <el-date-picker
          v-model="form.starttime"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="请选择开始日期"
        />
        <span>至</span>
        <el-date-picker
          v-model="form.endtime"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="请选择结束日期"
        />
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="fetchData('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column label="手机号" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.mobile}}</template>
      </el-table-column>
      <el-table-column label="微信名" align="center">
        <template slot-scope="scope">{{scope.row.show_name}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="成为客户时间"
        width="200"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="member_created_at"
        label="成为会员时间"
        width="200"
        :formatter="formatTime"
      ></el-table-column>

      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.gender | statusFilter">{{scope.row.gender == 1 ?'男' :'女'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否为会员" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_member | statusFilter">{{scope.row.is_member == 1 ?'是' :'否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="购买次数" align="center">
        <template slot-scope="scope">{{scope.row.trade_count}}</template>
      </el-table-column>
      <el-table-column label="客户姓名" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="用户积分" align="center">
        <template slot-scope="scope">{{scope.row.points}}</template>
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
import { getTimeDate } from "@/utils/index.js";

import UserInfo from "./userinfodialog";

import Qs from "qs";
// 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单
export default {
  components: { UserInfo },

  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "danger",
        1: "primary",
        2: "danger"
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

      list: null,
      listLoading: true,
      form: {
        _uiName_: "eleme"
      }
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.fetchData();
  },
  methods: {
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue * 1000);
    },
    resetForm(formName) {
      this.form.userStatusId = "";
      this.form.starttime = this.form.endtime = "";
    },

    //获取用户列表
    fetchData() {
      let page = { pageNumber: this.currentPage, pageSize: this.pageSize };

      this.form["_pagination"] = JSON.stringify(page);
      this.listLoading = true;
      this.axios
        .get(this.urls.getuserlist + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.record_list;
          this.listLoading = false;
          this.total = response.data.total;

          this.list.forEach(item => {
            item.loading = false;
          });
        });
    },
    operationHandle(index, row, type) {
      let param = {
        id: row.id,
        userStatusId: type
      };
      switch (type) {
        case 5:
          this.operationRemote(this.urls.editiusernfo, param); //拒绝
          break;
        case 6:
          this.operationRemote(this.urls.editiusernfo, param); //通过
          break;
        case 7:
          this.operationRemote(this.urls.editiusernfo, param); //拉黑
          break;
        case 9:
          // this.operationRemote(this.urls.ordersuccress, param); //查看资料
          break;
        case 2:
          this.operationRemote(this.urls.orderlist, param); //详情 TODO
          break;
        default:
          break;
      }
    },

    operationRemote(url, param) {
      this.axios.put(url + "?" + Qs.stringify(param)).then(response => {
        this.fetchData();
      });
    },

    //查询用户详情
    lookinfo(index, row) {
      this.dialogTableVisible = true;
      this.selectTaskData = row;
    },
    editDialogListener(bol) {
      this.dialogTableVisible = bol;
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
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