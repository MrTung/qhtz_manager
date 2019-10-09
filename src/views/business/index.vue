<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form">
      <el-form-item label="用户状态" class="form-item" label-width="80px" prop="shopType">
        <!-- 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单 -->
        <el-select v-model="form.businessStatusId" placeholder="请选择用户状态">
          <el-option label="全部" value />
          <el-option label="待完善资料" value="1" />
          <el-option label="待审核" value="2" />
          <el-option label="审核通过" value="6" />
          <el-option label="审核拒绝" value="5" />
          <el-option label="锁定" value="7" />
          <el-option label="黑名单" value="8" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="旺旺账号" class="form-item" label-width="80px" prop="shopAccount">
        <el-input placeholder="请输入旺旺账号" v-model="form.shopAccount"></el-input>
      </el-form-item>
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
      <el-table-column label="手机号" align="center" width="110" style="color:red">
        <template slot-scope="scope">{{scope.row.mobile}}</template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">{{scope.row.nickname}}</template>
      </el-table-column>
      <el-table-column label="累计成交额" align="center">
        <template slot-scope="scope">{{scope.row.money}}</template>
      </el-table-column>
      <el-table-column label="邀请方手机号" align="center">
        <template slot-scope="scope">{{scope.row.from_buyer_mobile}}</template>
      </el-table-column>
      <el-table-column label="分销商标识符" align="center">
        <template slot-scope="scope">{{scope.row.seller}}</template>
      </el-table-column>
      <el-table-column label="成交订单比数" align="center">
        <template slot-scope="scope">
          <router-link
            style="color:blue"
            :to="'/mission/order?mobile=' + scope.row.mobile"
          >{{scope.row.order_num}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="TA的客户" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="lookinfo(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="分销商创建时间" align="center">
        <template slot-scope="scope">{{scope.row.create_at}}</template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="userinfo(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.businessStatusId > 1 && scope.row.businessStatusId <4"
            @click="operationHandle(scope.$index, scope.row,6)"
          >通过</el-button>
          <el-button
            size="mini"
            type="info"
            v-if="scope.row.businessStatusId == 6"
            @click="operationHandle(scope.$index, scope.row,7)"
          >拉黑</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.businessStatusId > 1 && scope.row.businessStatusId <4"
            @click="operationHandle(scope.$index, scope.row,5)"
          >拒绝</el-button>
        </template>
      </el-table-column>-->
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
    <CustomersView
      ref="editUserDialog"
      :isShowDialog="dialogTableVisible"
      :taskData="selectTaskData"
      v-on:editDialog="editDialogListener"
    ></CustomersView>
  </div>
</template>

<script>
import { getTimeDate } from "@/utils/index.js";
import CustomersView from "./customersDialog";

import Qs from "qs";
// 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单
export default {
  components: { CustomersView },

  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "info",
        2: "gray",
        3: "gray",
        4: "success",
        5: "danger",
        6: "success",
        7: "danger",
        8: "danger"
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
      selectTaskData: "",

      list: null,
      listLoading: true,
      form: {
        businessStatusId: "",
        starttime: "",
        endtime: "",
        _uiName_: "eleme"
      }
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.fetchData();

    // this.fetchCustomers();
  },
  methods: {
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },
    resetForm(formName) {
      this.form.businessStatusId = "";
      this.form.starttime = this.form.endtime = "";
    },

    //获取用户列表
    fetchData() {
      let page = { pageNumber: this.currentPage, pageSize: this.pageSize };

      this.form["_pagination"] = JSON.stringify(page);
      this.listLoading = true;
      this.axios
        .get(this.urls.getbusinesslist + "?" + Qs.stringify(this.form))
        .then(response => {
          if (response.data.errcode == 0)
            return this.$message.error(response.data.errmsg);
          this.list = response.data.accounts;
          this.total = response.data.total_results;

          this.listLoading = false;
        });
    },

    //获取分销商客户列表
    fetchCustomers() {
      let params = {
        mobile: "15385890202",
        _uiName_: "eleme"
      };

      let page = { pageNumber: this.currentPage, pageSize: this.pageSize };

      params["_pagination"] = JSON.stringify(page);

      // this.listLoading = true;
      this.axios
        .get(this.urls.getyzsalescustomers + "?" + Qs.stringify(params))
        .then(response => {
          if (response.data.errcode == 0)
            return this.$message.error(response.data.errmsg);

          // this.listLoading = false;
        });
    },

    operationHandle(index, row, type) {
      this.$confirm("是否确认执行此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = {
          businessId: row.id,
          businessStatusId: type
        };
        switch (type) {
          case 5:
            this.operationRemote(this.urls.businessstatus, param); //拒绝
            break;
          case 6:
            this.operationRemote(this.urls.businessstatus, param); //通过
            break;
          case 7:
            this.operationRemote(this.urls.businessstatus, param); //拉黑
            break;
          default:
            break;
        }
      });
    },

    operationRemote(url, param) {
      this.axios.put(url + "?" + Qs.stringify(param)).then(response => {
        this.fetchData();
      });
    },
    lookinfo(index, row) {
      this.dialogTableVisible = true;
      this.selectTaskData = row.mobile;
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