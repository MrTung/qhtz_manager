<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form" :rules="rules">
      <el-form-item label="账号类型" class="form-item" label-width="80px" prop="type">
        <el-select v-model="form.type" placeholder="请选择账号类型">
          <el-option label="商家管理员账号" value="2" />
          <el-option label="用户管理员账号" value="3" />
          <el-option label="财务管理员账号" value="4" />
          <el-option label="综合管理员账号" value="5" />
        </el-select>
      </el-form-item>
      <el-form-item label="账号ID(手机号码)" class="form-item" label-width="130px" prop="userId">
        <el-input placeholder="请输入账号名称" v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" class="form-item" label-width="80px" prop="userName">
        <el-input placeholder="请输入账号名称" v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="账号密码" class="form-item" label-width="80px" prop="password">
        <el-input placeholder="请输入账号密码" v-model="form.password"></el-input>
      </el-form-item>
      <!-- <el-form-item label="手机号码" class="form-item" label-width="80px" prop="phone">
        <el-input placeholder="请输入手机号码" v-model="form.phone"></el-input>
      </el-form-item>-->
      <el-form-item class="form-item">
        <el-button type="primary" @click="submitForm('ruleForm')">添加账号</el-button>
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
      <el-table-column label="账号ID" align="center">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column label="账号名称" align="center">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column label="账号权限" align="center">
        <template slot-scope="scope">{{ scope.row.rolename }}</template>
      </el-table-column>
      <!-- <el-table-column label="手机号码" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>-->
      <el-table-column class-name="status-col" label="账号状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sysStatus | statusFilter">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="dbCreateSysTime" label="创建时间" :formatter="formatTime"></el-table-column>
      <el-table-column align="center" prop="created_at" label="编辑" width="200">
        <template slot-scope="scope" v-if="scope.row.userId != 'admin'">
          <el-button type="primary" size="small" @click="lookinfo(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteh(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <UserInfo
      ref="editUserDialog"
      :isShowDialog="dialogTableVisible"
      :taskData="selectTaskData"
      v-on:editDialog="editDialogListener"
    ></UserInfo>
  </div>
</template>

<script>
import Qs from "qs";
import { getTimeDate } from "@/utils/index.js";
import UserInfo from "./infoDialog";

export default {
  components: { UserInfo },

  filters: {
    statusFilter(status) {
      const statusMap = {
        true: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      dialogTableVisible: false,

      selectTaskData: {},

      list: null,
      listLoading: true,
      form: {
        type: "",
        id: "",
        userId: "",
        password: "",
        userName: "",
        phone: ""
      },
      rules: {
        type: [{ required: true, trigger: "blur", message: "请选择账号类型" }],
        userId: [{ required: true, trigger: "blur", message: "请输入账号ID" }],
        userName: [
          { required: true, trigger: "blur", message: "请输入账号名称" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入账号密码" }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let rols = [{ id: null, roleId: this.form.type, status: "1" }];
          let param = {
            base: JSON.stringify({
              id: this.form.id,
              userName: this.form.userName,
              userId: this.form.userId,
              password: this.form.password,
              checkPassword: this.form.password,
              wxNum: "",
              mail: "",
              phone: this.form.userId,
              region: ""
            }),
            roles: JSON.stringify(rols)
          };

          this.axios
            .post(this.urls.addadmin + "?" + Qs.stringify(param))
            .then(response => {
              this.$refs[formName].resetFields();
              this.fetchData();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    fetchData() {
      this.listLoading = true;
      this.axios.get(this.urls.getalladminlist).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },

    deleteh(item) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = {
          id: item.id
        };
        this.axios
          .delete(this.urls.delateadmin + "?" + Qs.stringify(param))
          .then(response => {
            this.fetchData();
          });
      });
    },

    //查询
    lookinfo(row, index) {
      this.dialogTableVisible = true;
      this.selectTaskData = row;
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
