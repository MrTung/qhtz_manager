<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单编号" min-width="100" align="center">
      <!-- <template slot-scope="scope">{{ scope.row.order_no | orderNoFilter }}</template> -->
      <template slot-scope="scope">NO.{{ scope.row.id }}</template>
    </el-table-column>
    <el-table-column label="商品缩略图" min-width="200" align="center">
      <template slot-scope="scope">
        <div>
          <img :src="scope.row.goodsImg" style="height: 100px;border: #EBEEF5 solid 1px;" />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="订单价格" width="100" align="center">
      <template slot-scope="scope">￥{{ scope.row.unitPrice.toFixed(2) }}</template>
    </el-table-column>
    <el-table-column label="平台" width="100" align="center">
      <template slot-scope="scope">{{ scope.row.missionType }}</template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag
          style="margin-bottom:5px;"
          :type="row.statusName | statusFilter"
        >{{ row.statusName }}</el-tag>
        <el-tag type="success" v-if="row.payReturn == 1">已返本金</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Qs from "qs";
import { getTimeDate } from "@/utils/index.js";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        待审核: "info",
        审核通过: "warning",
        审核失败: "danger",
        已付款: "primary",
        发布成功: "success",
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
        .get(this.urls.orderlist + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.list;
        });
    }
  }
};
</script>
