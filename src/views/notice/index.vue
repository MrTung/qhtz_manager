<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form">
      <!-- <el-form-item label="公告类型" class="form-item" label-width="70px">
        <el-select v-model="form.type" placeholder="请选择公告类型">
          <el-option label="买手" value="2" />
          <el-option label="商家" value="1" />
        </el-select>
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
        <el-button type="primary" @click="fetchData()">刷新</el-button>
        <el-button type="success" @click="addNotice()">新增公告</el-button>
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
      <el-table-column label="公告内容" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="95">
        <template slot-scope="scope">{{ scope.row.type == '1' ? '商家' :'买手'}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="dbCreateSysTime"
        label="发布时间"
        width="200"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="lookinfo(scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="delede(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Noticeinfo
      ref="wangwangInfo"
      :isShowDialog="infoVisible"
      :taskData="selectData"
      v-on:editDialog="wangwangListener"
    ></Noticeinfo>
  </div>
</template>

<script>
import { getTimeDate } from "@/utils/index.js";
import Noticeinfo from "./noticeinfo";

import Qs from "qs";
// 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单
export default {
  components: { Noticeinfo },

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
      infoVisible: false,

      selectData: "",

      shoptypelist: [],
      list: null,
      listLoading: true,
      form: {
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

    addNotice() {
      this.selectData = "add";
      this.infoVisible = true;
    },
    lookinfo(row) {
      this.selectData = row.memo;
      this.infoVisible = true;
    },

    fetchData() {
      this.listLoading = true;
      this.axios
        .get(this.urls.noticelist + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.list;
          this.listLoading = false;
        });
    },

    //删除
    delede(index, row) {
      console.log(index, row);
      this.$confirm("是否确认删除该公告?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = {
          id: row.id
        };
        this.axios
          .delete(this.urls.deletenotice + "?" + Qs.stringify(param))
          .then(response => {
            this.fetchData();
          });
      });
    },

    wangwangListener(bol) {
      this.infoVisible = bol;
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