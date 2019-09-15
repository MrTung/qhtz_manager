<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form" :rules="rules">
      <el-form-item label="收款类型" class="form-item" label-width="80px" prop="bankType">
        <!-- 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单 -->
        <el-select v-model="form.bankType" placeholder="请选择收款类型">
          <el-option label="银行卡" value="1" />
          <el-option label="支付宝" value="2" />
          <el-option label="微信" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="账号" class="form-item" label-width="80px" prop="bankCardNo">
        <el-input placeholder="请输入账号" v-model="form.bankCardNo"></el-input>
      </el-form-item>
      <el-form-item label="收款人姓名" class="form-item" label-width="100px" prop="bankUserName">
        <el-input placeholder="请输入收款人姓名" v-model="form.bankUserName"></el-input>
      </el-form-item>
      <el-form-item
        label="银行名称"
        class="form-item"
        label-width="100px"
        prop="bankName"
        v-if="form.bankType == 1"
      >
        <el-input placeholder="请输入银行" v-model="form.bankName"></el-input>
      </el-form-item>
      <el-form-item
        label="开户行"
        class="form-item"
        label-width="80px"
        prop="subBranchName"
        v-if="form.bankType == 1"
      >
        <el-input placeholder="请输入开户行" v-model="form.subBranchName"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="submitForm('ruleForm')">添加收款账户</el-button>
        <el-button @click="fetchData()">刷新列表</el-button>
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
      <el-table-column label="账号类型" align="center" style="color:red">
        <template slot-scope="scope">{{statusFilter(scope.row.bankType)}}</template>
      </el-table-column>
      <el-table-column label="账号" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.bankCardNo}}</template>
      </el-table-column>
      <el-table-column label="收款人" align="center">
        <template slot-scope="scope">{{scope.row.bankUserName}}</template>
      </el-table-column>
      <el-table-column label="银行名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.bankName || '无'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开户行" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.subBranchName || '无'}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="默认收款账户" align="center" width="150">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.isPayAccount > 0">是</el-tag>
          <!-- <el-tag type="danger" v-else>否</el-tag> -->
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
          <el-button size="mini" type="danger" @click="carddel(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="setdefault(scope.$index, scope.row)"
            v-if="scope.row.isPayAccount == 0"
          >设为默认</el-button>
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
  data() {
    return {
      list: null,
      listLoading: false,
      form: {
        bankType: "",
        bankCardNo: "",
        bankUserName: "",

        bankName: "",
        subBranchName: "",
        id: ""
      },
      rules: {
        bankType: [
          { required: true, trigger: "blur", message: "请选择账号类型" }
        ],
        bankCardNo: [
          { required: true, trigger: "blur", message: "请输入账号" }
        ],
        bankUserName: [
          { required: true, trigger: "blur", message: "请输入收款人姓名" }
        ],
        bankName: [
          { required: true, trigger: "blur", message: "请输入银行名称" }
        ],
        subBranchName: [
          { required: true, trigger: "blur", message: "请输入开户行" }
        ]
      }
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.fetchData();
  },
  methods: {
    statusFilter(status) {
      const statusMap = {
        1: "银行卡",
        2: "支付宝",
        3: "微信"
      };
      return statusMap[status];
    },
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.cardadd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //获取收款卡列表
    fetchData() {
      let param = {
        bankname: "",
        bankUserName: "",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
      };

      this.listLoading = true;
      this.axios
        .get(this.urls.banklist + "?" + Qs.stringify(param))
        .then(response => {
          this.list = response.data.list;
          this.listLoading = false;
        });
    },

    //删除收款卡
    carddel(index, row) {
      console.log(index, row);
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = {
          id: row.id
        };
        this.axios
          .delete(this.urls.carddel + "?" + Qs.stringify(param))
          .then(response => {
            this.fetchData();
          });
      });
    },
    //新增收款卡
    cardadd() {
      let param = {
        bankName: this.form.bankName,
        subBranchName: this.form.subBranchName,
        bankCardNo: this.form.bankCardNo,
        bankUserName: this.form.bankUserName,
        bankType: this.form.bankType,
        isPayAccount: "1"
      };
      this.axios
        .post(this.urls.cardadd + "?" + Qs.stringify(param))
        .then(response => {
          this.$message.success("新增成功");
          this.fetchData();
        });
    },
    setdefault(index, row) {
      let param = {
        isPayAccount: "1",
        id: row.id
      };
      this.axios
        .post(this.urls.cardadd + "?" + Qs.stringify(param))
        .then(response => {
          this.$message.success("操作成功");
          this.fetchData();
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