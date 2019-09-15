<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form">
      <el-form-item label="商铺类型" class="form-item" label-width="80px" prop="shopType">
        <el-select v-model="form.shopType" placeholder="请选择店铺类型">
          <el-option
            v-for="item in shoptypelist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="旺旺账号" class="form-item" label-width="80px" prop="shopAccount">
        <el-input placeholder="请输入旺旺账号" v-model="form.shopAccount"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" class="form-item" label-width="80px" prop="shopName">
        <el-input placeholder="请输入店铺名称" v-model="form.shopName"></el-input>
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
      <el-table-column label="店铺名称" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.shopName}}</template>
      </el-table-column>
      <el-table-column label="店铺网址" width="300" align="center">
        <template slot-scope="scope">{{scope.row.shopUrl}}</template>
      </el-table-column>
      <el-table-column label="旺旺名称" width="210" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.shopAccount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺类型"
        width="210"
        align="center"
        prop="shopType"
        :formatter="getShoptype"
      ></el-table-column>
      <el-table-column class-name="status-col" label="所属商家" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.businessId}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="dbCreateSysTime"
        label="添加时间"
        width="200"
        :formatter="formatTime"
      ></el-table-column>
      <!-- <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.shopStatus == 1"
            @click="operationHandle(scope.$index, scope.row)"
          >通过</el-button>
          <el-button size="mini" type="danger" @click="deleteShop(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>-->
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
        1: "gray",
        2: "gray",
        3: "danger",
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
      shoptypelist: [],
      list: null,
      listLoading: true,
      form: {
        shopType: "",
        shopAccount: "",
        shopName: "",
        shopUrl: ""
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
    getShoptype(row, column, cellValue) {
      let label = "未知";
      this.shoptypelist.forEach(p => {
        if (p.id == cellValue) {
          label = p.name;
        }
      });
      return label;
    },
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //获取店铺列表
    fetchData() {
      console.log(JSON.stringify(this.$store.state.userinfo));
      let param = {
        name: "",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
      };
      this.listLoading = true;
      this.axios
        .get(this.urls.shoplist + "?" + Qs.stringify(param))
        .then(response => {
          this.list = response.data.list;
          this.listLoading = false;
        });
    },

    //删除店铺
    deleteShop(index, row) {
      console.log(index, row);
      this.$confirm("是否确认删除该店铺?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = {
          id: row.id
        };
        this.axios
          .delete(this.urls.delshop + "?" + Qs.stringify(param))
          .then(response => {
            this.fetchData();
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