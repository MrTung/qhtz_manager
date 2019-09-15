<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <!-- <el-form-item label="选择店铺" class="form-item" label-width="80px" prop="shopId">
        <el-select v-model="form.shopid" placeholder="请选择您的店铺">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.shopName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>-->

      <el-form-item label="任务状态" class="form-item" label-width="80px" prop="shopId">
        <el-select v-model="form.taskStatusId" placeholder="请选择任务状态">
          <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
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
        <el-button type="primary" @click="fetchData">查询</el-button>
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column label="商品信息" align="center" width="350">
        <template slot-scope="scope">
          <div style="display:flex;width: 100%;flex-direction: row;">
            <div>
              <img
                :src="scope.row.goodsImg"
                style="width:100px;height: 100px;border: #EBEEF5 solid 1px;"
              />
            </div>
            <div style="display: inline-block;text-align: left; font-size: 15px;margin-left: 15px;">
              <a
                style="font-weight:bold;font-size:13px;line-height:20px;"
                :href="scope.row.goodsUrl"
                target="_blank"
              >{{ scope.row.goodsTitle }}</a>
              <div>
                <span
                  style="line-height: 30px;font-size:17px;color:red;font-weight:bold;"
                >￥{{ scope.row.unitPrice.toFixed(2) }}</span>
                &nbsp;
                <span
                  style="font-size:13px;"
                >佣金:￥{{ scope.row.salary.toFixed(2) }}</span>
              </div>
              <div style="line-height: 30px;display: flex;">
                <span>{{ scope.row.shopName }}</span>
                <svg-icon
                  v-if="scope.row.clientType == 'PC'"
                  icon-class="diannao"
                  style="width: 25px;height: 25px;margin-left:10px;margin-top:2px;"
                />

                <svg-icon
                  v-else
                  icon-class="shouji"
                  style="width: 25px;height: 25px;margin-left:10px;margin-top:2px;"
                />
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商家" align="center">
        <template slot-scope="scope">{{ scope.row.businessName }}</template>
      </el-table-column>
      <el-table-column label="收货要求" align="center">
        <template slot-scope="scope">{{ scope.row.deliverTime }}</template>
      </el-table-column>
      <el-table-column label="每单购买件数" align="center" width="130">
        <template slot-scope="scope">{{ scope.row.buyNum }}</template>
      </el-table-column>
      <!-- <el-table-column label="支付方式" align="center">
        <template slot-scope="scope">{{ scope.row.payMent }}</template>
      </el-table-column>-->
      <el-table-column label="总费用" width="130" align="center">
        <template slot-scope="scope">
          <div
            style="line-height:30px;font-size:15px;"
          >本金:{{ scope.row.unitPrice * scope.row.buyNum * scope.row.missionQuantity }}元</div>
          <div
            style="line-height:30px;font-size:15px;"
          >佣金:{{ scope.row.salary * scope.row.missionQuantity }}元</div>
        </template>
      </el-table-column>
      <el-table-column label="买手佣金" align="center">
        <template slot-scope="scope">{{ scope.row.salaryUser }}</template>
      </el-table-column>
      <el-table-column label="已接单/任务总数" width="150" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.missionQuantity -scope.row.residueQuantity}}/{{ scope.row.missionQuantity }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="dbCreateSysTime"
        label="发布时间"
        width="155"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.taskStatusName | statusFilter">{{ scope.row.taskStatusName }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="primary"
            @click="publish(scope.$index, scope.row)"
            v-if="scope.row.taskStatusId == 1"
          >发布</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="scope.row.taskStatusId == 1"
          >编辑</el-button>-->
          <el-button size="mini" type="primary" @click="operationHandle(scope.$index, scope.row)">详情</el-button>
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
    <TaskInfo
      ref="editUserDialog"
      :isShowDialog="dialogTableVisible"
      :taskData="selectTaskData"
      v-on:editDialog="editDialogListener"
    ></TaskInfo>
  </div>
</template>

<script>
import Qs from "qs";
import { getTimeDate } from "@/utils/index.js";
import TaskInfo from "./taskinfo";

export default {
  components: { TaskInfo },
  filters: {
    statusFilter(status) {
      const statusMap = {
        草稿: "info",
        待审核: "gray",
        审核中: "primary",
        发布成功: "success",
        任务完成: "danger"
      };
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
      statusList: [],
      list: null,
      listLoading: true,
      form: {
        shopid: "",
        taskStatusId: "",
        starttime: "",
        endtime: "",
        _uiName_: "eleme"
      }
    };
  },
  created() {
    this.fetchData();

    this.getStatusList();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //获取任务状态列表
    getStatusList() {
      this.axios.get(this.urls.statuslist).then(response => {
        this.statusList = response.data;
      });
    },
    //获取店铺列表

    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },

    onCancel() {
      this.form.shopid = "";
      this.form.taskStatusId = "";
      this.form.starttime = "";
      this.form.endtime = "";
    },
    fetchData() {
      let page = { pageNumber: this.currentPage, pageSize: this.pageSize };

      this.form["_pagination"] = JSON.stringify(page);
      this.listLoading = true;
      //获取任务列表
      this.axios
        .get(this.urls.getMissionList + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.list;
          this.total = response.data.totalRow;

          this.listLoading = false;
        });
    },

    //发布任务
    publish(index, row) {
      let g = 0;
      if (row.payMent == "商家远程代付") {
        g = 0;
      } else {
        g = row.unitPrice * row.buyNum * row.missionQuantity;
      }

      let s = row.salary * row.missionQuantity;

      if (this.getbalance < g + s)
        return this.$message.error(
          "您的账户余额不足以发布本次任务,请充值后再试"
        );

      const h = this.$createElement;

      let t = g + s;
      this.$msgbox({
        title: "提示",
        message: h("p", null, [
          h("span", null, "本次任务将从您的账户扣除 "),
          h(
            "span",
            { style: "color: red;font-size:19px;font-weight:bold" },
            "￥" + t
          ),
          h("span", null, ",是否发布?")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            let param = {
              id: row.id
            };
            this.axios
              .post(this.urls.changgeMissionstatus + "?" + Qs.stringify(param))
              .then(response => {
                this.fetchData();
                this.$message({
                  message: "发布成功!",
                  type: "success"
                });
              });
            done();
          } else {
            done();
          }
        }
      }).then(action => {});
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "newtask",
        params: {
          form: row
        }
      });
    },
    operationHandle(index, row) {
      this.dialogTableVisible = true;
      this.selectTaskData = row;
    },
    editDialogListener(bol) {
      this.dialogTableVisible = bol;
    },

    //修改任务状态
    editMisson() {
      // let param = {
      //   businessId: this.$store.state.userinfo.id,
      //   shopName: this.form.shopName,
      //   shopAccount: this.form.shopAccount,
      //   shopType: this.form.shopType,
      //   businessId: this.$store.state.userinfo.id,
      //   shopUrl: this.form.shopUrl
      // };
      // this.axios
      //   .post(this.urls.changgeMissionstatus + "?" + Qs.stringify(param))
      //   .then(response => {
      //     this.fetchData();
      //   });
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