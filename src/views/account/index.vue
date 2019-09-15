<template>
  <div class="app-container">
    <!-- <div class="topview">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日</span>
        </div>
        <div class="text item">{{'收入 ' }}</div>
        <div class="text item">{{'支出 ' }}</div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>历史</span>
        </div>
        <div class="text item">{{'收入 ' }}</div>
        <div class="text item">{{'支出 ' }}</div>
      </el-card>
    </div>-->

    <el-form ref="ruleForm" :model="form">
      <el-form-item label="类别" class="form-item" label-width="80px" prop="shopType">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="全部" value />
          <el-option label="返现" value="1" />
          <el-option label="提现" value="2" />
          <el-option label="充值" value="3" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="用户" class="form-item" label-width="80px" prop="shopAccount">
        <el-input placeholder="请输入用户信息" v-model="form.shopAccount"></el-input>
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
      <el-table-column label="流水号" align="center" width="115">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <!-- <el-table-column label="结算账户" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.collentMoney.bankCardNo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="往来账户" width="210" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.payInfo.payCardNo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="往来姓名" width="210" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.payInfo.payUserName}}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          <span
            style="font-size:16px;font-weight:bold;color:rgb(95, 162, 7);"
            v-if="scope.row.type == '收入'"
          >+ {{scope.row.money.toFixed(2)}}</span>
          <span
            style="font-size:17px;font-weight:bold;color:red;"
            v-else
          >-{{scope.row.money.toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="dbCreateSysTime" label="时间" :formatter="formatTime"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTimeDate } from "@/utils/index.js";

import Qs from "qs";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "info",
        2: "primary",
        3: "success",
        4: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      form: {
        status: "",
        userId: "",
        starttime: "",
        endtime: "",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':100}"
      },
      list: null,
      listLoading: true
    };
  },
  created() {
    this.fetchData();
    // admin/capital/flow
  },
  methods: {
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },
    fetchData() {
      this.listLoading = true;

      this.axios
        .get(this.urls.accountinfo + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.list;
          this.listLoading = false;
        });
    }
  }
};
</script>

<style>
.form-item {
  display: inline-block;
  margin-right: 20px;
}
.topview {
  display: flex;
  flex-direction: row;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 300px;
  margin-bottom: 30px;
  margin-right: 20px;
}
</style>

