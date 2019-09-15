<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form">
      <el-form-item label="状态" class="form-item" label-width="40px" prop="shopType">
        <el-select v-model="form.shopType" placeholder="请选择充值状态">
          <el-option label="全部" value></el-option>
          <el-option label="待审核" value="1"></el-option>
          <el-option label="审核通过" value="2"></el-option>
          <el-option label="审核拒绝" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="充值商家" class="form-item" label-width="80px" prop="shopAccount">
        <el-input placeholder="请输入充值商家" v-model="form.shopAccount"></el-input>
      </el-form-item>
      <el-form-item label="充值金额" class="form-item" label-width="80px" prop="shopName">
        <el-input placeholder="请输入充值金额" v-model="form.shopName"></el-input>
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
        <el-button type="primary" @click="fetchData()">查询</el-button>
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
      <el-table-column label="充值商家" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.businessInfo.name}}</template>
      </el-table-column>
      <el-table-column label="充值金额" width="300" align="center">
        <template slot-scope="scope">
          <span style="font-size:16px;font-weight:bold;color:rgb(95, 162, 7);">{{scope.row.money}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="充值方式" width="210" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.shopAccount}}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="充值账号" width="210" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.payCardNo}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="180" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.fundsTypeId | statusFilter">{{ scope.row.statusName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="dbCreateSysTime"
        label="提交时间"
        width="200"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="dbUpdateSysTime"
        label="审核时间"
        width="200"
        :formatter="formatTime"
      ></el-table-column>

      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="lookinfo(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.fundsTypeId == 1"
            @click="operationHandle(scope.$index, scope.row,1)"
          >通过</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.fundsTypeId == 1"
            @click="operationHandle(scope.$index, scope.row,0)"
          >拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <RechargeDeatil
      ref="editUserDialog"
      :isShowDialog="dialogTableVisible"
      :selectItem="selectItem"
      v-on:editDialog="editDialogListener"
    ></RechargeDeatil>
  </div>
</template>

<script>
import { getTimeDate } from "@/utils/index.js";
import RechargeDeatil from "./rechargeDeatilinfo";

import Qs from "qs";
// 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单
export default {
  components: { RechargeDeatil },

  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "info",
        2: "success",
        3: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      selectItem: {},
      dialogTableVisible: false,
      shoptypelist: [],
      list: null,
      listLoading: true,
      form: {
        shopType: "",
        shopAccount: "",
        shopName: "",
        shopUrl: "",
        starttime: "",
        endtime: "",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
      }
    };
  },
  created() {
    //获取店铺类型
    this.axios.get(this.urls.shoptypelist).then(response => {
      this.shoptypelist = response.data;
    });
  },
  computed: {},
  mounted() {
    this.fetchData();
  },
  methods: {
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //获取充值申请列表
    fetchData() {
      this.listLoading = true;
      this.axios
        .get(this.urls.rechargelist + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.list;
          this.listLoading = false;
        });
    },

    operationHandle(index, row, type) {
      let param = {
        type: type,
        fundsNo: row.fundsNo
      };
      switch (type) {
        case 0:
        case 1:
          this.operationRemote(this.urls.rechargesuccess, param); //拒绝 通过
          break;
        case 2:
          //查看详情
          break;

        default:
          break;
      }
    },
    operationRemote(url, param) {
      this.$confirm("是否确认操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios.post(url + "?" + Qs.stringify(param)).then(response => {
          this.fetchData();
        });
      });
    },
    lookinfo(index, row) {
      this.dialogTableVisible = true;
      this.selectItem = row;
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