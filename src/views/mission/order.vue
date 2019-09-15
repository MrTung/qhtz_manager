<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <!-- <el-form-item label="订单状态" class="form-item" label-width="70px">
        <el-select v-model="form.progress" placeholder="请选择资金类型">
          <el-option label="全部" value />
          <el-option label="待审核" value="1" />
          <el-option label="审核通过" value="2" />
          <el-option label="已付款" value="3" />
          <el-option label="交易完成" value="6" />
          <el-option label="审核失败" value="7" />
          <el-option label="交易取消" value="8" />
        </el-select>
      </el-form-item>-->
      <el-form-item label="分销员手机号" class="form-item" prop="mobile" label-width="130px">
        <el-input placeholder="请输入分销员手机号码" v-model="form.mobile"></el-input>
      </el-form-item>
      <!-- <el-form-item label="日期范围" class="form-item" label-width="70px">
        <el-date-picker
          v-model="form.starttime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="请选择开始日期"
        />
        <span>至</span>
        <el-date-picker
          v-model="form.endtime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="请选择结束日期"
        />
      </el-form-item>-->
      <el-form-item class="form-item">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onCancel">重置</el-button>
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
      <el-table-column align="center" label="订单ID" width="295">
        <template slot-scope="scope">{{ scope.row.order_no}}</template>
      </el-table-column>
      <el-table-column label="商品" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="lookinfo(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="订单费用" align="center">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="订单状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag
            style="margin-bottom:5px;"
            :type="scope.row.state | orderFilter"
          >{{ getOrdername(scope.row.state) }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="结算状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag
            style="margin-bottom:5px;"
            :type="scope.row.settle_state | statusFilter"
          >{{ getSettlename(scope.row.settle_state) }}</el-tag>
        </template>
      </el-table-column>-->
      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">{{ scope.row.created_at }}</template>
      </el-table-column>
      <el-table-column label="分销员手机号" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="提成金额(元)" align="center">
        <template slot-scope="scope">{{ scope.row.cps_money }}</template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="260">
      <template slot-scope="scope">-->
      <!-- <el-button
            size="mini"
            type="success"
            @click="operationHandle(scope.$index, scope.row,1)"
            v-if="scope.row.orderStatusId == 1"
          >通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="operationHandle(scope.$index, scope.row,2)"
            v-if="scope.row.orderStatusId == 1"
          >拒绝</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="operationHandle(scope.$index, scope.row,3)"
            v-if="(scope.row.orderStatusId > 2 && scope.row.orderStatusId > 7)&& scope.row.payReturn == 0"
          >返本金</el-button>
          <el-button
            size="mini"
            type="success"
            @click="operationHandle(scope.$index, scope.row,4)"
            v-if="scope.row.orderStatusId == 5"
      >交易完成</el-button>-->
      <!-- <el-button size="mini" @click="lookinfo(scope.$index, scope.row)">详情</el-button>
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
    <OrderInfo
      ref="editUserDialog"
      :isShowDialog="dialogTableVisible"
      :taskData="selectTaskData"
      v-on:editDialog="editDialogListener"
    ></OrderInfo>
  </div>
</template>

<script>
import Qs from "qs";
import { getTimeDate } from "@/utils/index.js";
import OrderInfo from "./orderinfodialog";

export default {
  components: { OrderInfo },
  filters: {
    orderFilter(status) {
      const statusMap = {
        1: "info",
        2: "warning",
        3: "danger",
        4: "primary",
        5: "success",
        6: "success",
        100: "success"
      };
      // 3：待付款，5：已付款，6：已发货，100：交易完成
      return statusMap[status];
    },

    statusFilter(status) {
      const statusMap = {
        1: "info",
        2: "warning",
        3: "danger",
        4: "primary",
        5: "success",
        6: "success",
        100: "danger"
      };
      // 1 待结算 2 已结算 3 余额不足 4 结算异常，等待重试 5 货到付款
      return statusMap[status];
    }
  },
  computed: {
    getbalance() {
      let userinfo = this.$store.state.userinfo;
      return userinfo.balance;
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,

      selectTaskData: {},
      dialogTableVisible: false,
      list: null,
      listLoading: false,
      form: {
        // progress: "",
        // name: "",
        // starttime: "",
        endtime: "",
        mobile: "13575784241",
        _uiName_: "eleme"
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    getOrdername(type) {
      const statusMap = {
        3: "待付款",
        5: "已付款",
        6: "已发货",
        100: "交易完成"
      };
      return statusMap[type];
    },
    getSettlename(type) {
      const statusMap = {
        1: "待付款",
        2: "已结算",
        3: "余额不足",
        4: "结算异常，等待重试",
        5: "货到付款"
      };
      return statusMap[type];
    },
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },
    onSubmit() {
      this.fetchData();
    },
    onCancel() {
      this.form.starttime = "";
      this.form.endtime = "";
    },
    fetchData() {
      if (this.form.mobile.length != 11) return;
      let page = { pageNumber: this.currentPage, pageSize: this.pageSize };

      this.form["_pagination"] = JSON.stringify(page);

      this.listLoading = true;
      this.axios
        .get(this.urls.allorderlist + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
        });
    },
    operationHandle(index, row, type) {
      let param = {
        orderId: row.id,
        userId: this.$store.state.userinfo.id
      };
      switch (type) {
        case 1:
          this.operationRemote(this.urls.orderapproval, param); //通过
          break;
        case 2:
          this.operationRemote(this.urls.orderreject, param); //拒绝
          break;
        case 3:
          this.operationRemote(this.urls.orderlist, param); //返本金 TODO
          break;
        case 4:
          this.operationRemote(this.urls.ordersuccress, param); //交易完成
          break;
        case 5:
          this.operationRemote(this.urls.orderlist, param); //详情 TODO
          break;
        default:
          break;
      }
    },

    operationRemote(url, param) {
      this.axios.post(url + "?" + Qs.stringify(param)).then(response => {
        this.fetchData();
      });
    },

    lookinfo(index, row) {
      this.dialogTableVisible = true;
      this.selectTaskData = row;
    },
    editDialogListener(bol) {
      this.dialogTableVisible = bol;
    },
    //查看用户信息
    queryUserinfo(item) {
      console.log(item);
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