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
      <el-form-item label="姓名" class="form-item" label-width="80px" prop="shopName">
        <el-input placeholder="请输入用户姓名" v-model="form.shopName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" class="form-item" label-width="80px" prop="mobile">
        <el-input placeholder="请输入用户手机号" v-model="form.mobile"></el-input>
      </el-form-item>
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
      <!-- <el-table-column label="识别码" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.openId}}</template>
      </el-table-column>-->
      <el-table-column label="手机号" align="center" style="color:red">
        <template slot-scope="scope">
          <router-link
            style="color:blue"
            :to="'/mission/order?mobile=' + scope.row.userId"
          >{{scope.row.userId}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" align="center">
        <template slot-scope="scope">{{scope.row.userName}}</template>
      </el-table-column>
      <el-table-column label="微信号" align="center">
        <template slot-scope="scope">{{scope.row.wxNum}}</template>
      </el-table-column>
      <el-table-column label="分销等级" align="center">
        <template slot-scope="scope">
          <span>{{gradeFilter(scope.row.grade)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邀请方" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.masterInfo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="TA的客户" align="center" width="200">
        <template slot-scope="scope">
          <div
            @click="lookinfo(scope.$index, scope.row)"
            style="color:blue; cursor: pointer;"
          >{{scope.row.studentCount}}</div>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="160" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.userStatus | statusFilter"
          >{{ statusnameFilter(scope.row.userStatus) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="dbCreateSysTime"
        label="添加时间"
        width="200"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="userinfo(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="success" @click="edituserinfo(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            v-if="scope.row.userStatus == 1"
            @click="operationHandle(scope.$index, scope.row,3)"
          >清退</el-button>-->
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.userStatus == 2"
            @click="operationHandle(scope.$index, scope.row,1)"
          >通过</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.userStatus == 2"
            @click="operationHandle(scope.$index, scope.row,-1)"
          >拒绝</el-button>
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
        :page-sizes="[5, 10, 15, 20,50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <UserInfo
      ref="editUserDialog"
      :isShowDialog="dialogUserinfoVisible"
      :taskData="selectUserinfo"
      v-on:editDialog="userinfoDialogListener"
    ></UserInfo>

    <CustomersView
      ref="editUserDialog"
      :isShowDialog="dialogTableVisible"
      :taskData="selectTaskData"
      v-on:editDialog="editDialogListener"
    ></CustomersView>

    <Editinfo
      :isShowDialog="edituserVisible"
      :taskData="selectUserinfo"
      v-on:editDialog="editinfoDialogListener"
    ></Editinfo>
  </div>
</template>

<script>
import { getTimeDate } from "@/utils/index.js";

import CustomersView from "../business/customersDialog";
import UserInfo from "./userinfodialog";
import Editinfo from "./editDialog";

import Qs from "qs";
// 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单
export default {
  components: { CustomersView, UserInfo, Editinfo },

  filters: {
    statusFilter(status) {
      const statusMap = {
        "-1": "danger",
        1: "success",
        2: "gray",
        0: "info"
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
      selectTaskData: 0,

      dialogUserinfoVisible: false,
      selectUserinfo: {},

      edituserVisible: false,

      list: null,
      listLoading: true,
      form: {
        customer: "1",
        mobile: "",
        userStatusId: "",
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
  },
  methods: {
    statusnameFilter(status) {
      const statusMap = {
        "-1": "审核失败",
        0: "待提交资料",
        1: "审核通过",
        2: "待审核"
      };
      return statusMap[status];
    },
    gradeFilter(status) {
      const statusMap = {
        0: "普通会员",
        1: "高级分销员",
        2: "中级分销员",
        3: "初级分销员"
      };
      return statusMap[status];
    },
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
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
        .get(this.urls.getalladminlist + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.list;
          this.listLoading = false;
          this.total = response.data.totalRow;
        });
    },
    operationHandle(index, row, type) {
      let param = {
        id: row.id,
        status: type
      };
      switch (type) {
        case -1:
          this.operationRemote(this.urls.userinfostatus, param); //拒绝
          break;
        case 1:
          this.operationRemote(this.urls.userinfostatus, param); //通过
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

    //查询客户列表
    lookinfo(index, row) {
      this.dialogTableVisible = true;
      this.selectTaskData = row.id;
    },

    //查询用户详情
    userinfo(index, row) {
      this.dialogUserinfoVisible = true;
      this.selectUserinfo = row;
    },

    //编辑用户
    edituserinfo(index, row) {
      this.edituserVisible = true;
      this.selectUserinfo = row;
    },

    editDialogListener(bol) {
      this.dialogTableVisible = bol;
    },

    userinfoDialogListener(bol) {
      this.dialogUserinfoVisible = bol;
    },

    editinfoDialogListener(bol) {
      this.edituserVisible = bol;
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