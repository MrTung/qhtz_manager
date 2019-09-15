<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="用户编号" align="center">
      <!-- <template slot-scope="scope">{{ scope.row.order_no | orderNoFilter }}</template> -->
      <template slot-scope="scope">NO.{{ scope.row.id }}</template>
    </el-table-column>

    <el-table-column label="姓名" align="center">
      <template slot-scope="scope">{{ scope.row.trueName }}</template>
    </el-table-column>
    <el-table-column label="旺旺" align="center">
      <template slot-scope="scope">{{ scope.row.tbName }}</template>
    </el-table-column>
    <el-table-column label="状态" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.statusName | statusFilter">{{ row.statusName }}</el-tag>
      </template>
    </el-table-column>
    <!-- <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          v-if="scope.row.userStatusId > 1 && scope.row.userStatusId <4"
          @click="operationHandle(scope.$index, scope.row,6)"
        >通过</el-button>
        <el-button
          size="mini"
          type="danger"
          v-if="scope.row.userStatusId > 1 && scope.row.userStatusId <4"
          @click="operationHandle(scope.$index, scope.row,5)"
        >拒绝</el-button>
      </template>
    </el-table-column>-->
  </el-table>
</template>

<script>
import Qs from "qs";
import { getTimeDate } from "@/utils/index.js";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        待完善资料: "info",
        审核通过: "warning",
        审核失败: "danger",
        已付款: "primary",
        正常: "success",
        任务完成: "danger",
        交易取消: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,

      form: {
        progress: "0",
        name: "",
        starttime: "",
        endtime: "",
        desc: "2",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':5}"
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.axios
        .get(this.urls.getuserlist + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.list;
        });
    }
  }
};
</script>
