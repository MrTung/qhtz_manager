<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form">
      <el-form-item label="状态" class="form-item" label-width="80px" prop="shopType">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="全部" value />
          <el-option label="待转账" value="1" />
          <el-option label="转账中" value="2" />
          <el-option label="转账成功" value="3" />
          <el-option label="转账失败" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户" class="form-item" label-width="80px" prop="shopAccount">
        <el-input placeholder="请输入用户信息" v-model="form.shopAccount"></el-input>
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

    <el-button
      :loading="exporting"
      type="primary"
      style="margin-bottom:10px;"
      @click="exportTxt()"
    >导出已选择项</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column label="资金类别" align="center">
        <template slot-scope="scope">{{scope.row.cashType}}</template>
      </el-table-column>
      <el-table-column label="金额" align="center" style="color:red">
        <template slot-scope="scope">
          <span style="font-size:16px;font-weight:bold;color:red;">{{scope.row.money.toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" align="center">
        <template slot-scope="scope">{{scope.row.userInfo.trueName}}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.cashStatusId | statusFilter"
          >{{ getStatusname(scope.row.cashStatusId)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="dbCreateSysTime"
        label="申请时间"
        width="200"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="dbUpdateSysTime"
        label="操作时间"
        width="200"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="lookinfo(scope.$index, scope.row,)">详情</el-button> -->
          <el-button
            size="mini"
            type="success"
            @click="operationHandle(scope.$index, scope.row,1)"
            v-if="scope.row.cashStatusId == 2"
          >提现成功</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.cashStatusId == 2"
            @click="operationHandle(scope.$index, scope.row,0)"
          >提现失败</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTimeDate } from "@/utils/index.js";

import Qs from "qs";
// 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单
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
      fileurl: "",
      list: null,
      multipleSelection: [],
      listLoading: true,
      exporting: false,
      form: {
        status: "",
        userId: "",
        starttime: "",
        endtime: "",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
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
      return getTimeDate(cellValue);
    },
    getStatusname(statusid) {
      const statusMap = {
        1: "待转账",
        2: "转账中",
        3: "转账成功",
        4: "转账失败"
      };
      return statusMap[statusid];
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //获取充值申请列表
    fetchData() {
      this.listLoading = true;
      this.axios
        .get(this.urls.cashoutlist + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.list;
          this.listLoading = false;
        });
    },

    operationHandle(index, row, type) {
      // let ids = "";
      // this.multipleSelection.forEach(row => {
      //   ids = ids + row.id + ",";
      // });
      let param = {
        ids: row.id
      };
      switch (type) {
        case 1:
          this.operationRemote(this.urls.cashoutsuccess, param); // 提现成功
          break;
        case 0:
          this.operationRemote(this.urls.cashoutfail, param); // 提现失败
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    lookinfo() {},
    exportTxt() {
      if (this.multipleSelection.length == 0)
        return this.$message.error("请选择需要导出的数据");

      this.exporting = true;
      let ids = "";
      this.multipleSelection.forEach(row => {
        ids = ids + row.id + ",";
      });
      this.axios
        .post(this.urls.cashoutexport + "?" + Qs.stringify({ ids: ids }))
        .then(response => {
          this.fetchData();

          this.fileurl =
            this.urls.imgbaseurl +
            response.data.substring(2, response.data.length);

          this.exporting = false;

          this.axios.get(this.fileurl).then(response => {
            let blob = new Blob([response.data], {
              type: "application/txt"
            });

            let fileName =
              "谦恒提现申请表" +
              "-" +
              getTimeDate(Date.parse(new Date())) +
              ".txt";
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, fileName);
            } else {
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          });
        });
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
