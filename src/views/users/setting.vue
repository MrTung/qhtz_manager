<template>
  <div class="app-container">
    <div style="height:50px;">提成比例设置</div>

    <span style="margin-right:10px;">一级分销</span>
    <span style="font-size: 28px; color: rgb(51, 51, 51);font-weight: bold;">{{form.one}}%</span>
    <span style="margin-right:10px;">二级分销</span>
    <span style="font-size: 28px; color: rgb(51, 51, 51);font-weight: bold;">{{form.two}}%</span>
    <span style="margin-right:10px;">三级分销</span>
    <span style="font-size: 28px; color: rgb(51, 51, 51);font-weight: bold;">{{form.tree}}%</span>

    <el-button size="small" type="primary" @click="edit">修改</el-button>

    <SettingDialog
      ref="editUserDialog"
      :isShowDialog="dialogTableVisible"
      :taskData="selectTaskData"
      v-on:editDialog="editDialogListener"
    ></SettingDialog>
  </div>
</template>

<script>
import { getTimeDate } from "@/utils/index.js";
import SettingDialog from "./setingDialog";

import Qs from "qs";
// 1，未完善资料，2、已提交资料，待平台审核，3、审核中，4、审核通过，5、审核失败，6、正常，7、锁定，8，黑名单
export default {
  components: { SettingDialog },

  data() {
    return {
      dialogTableVisible: false,

      selectTaskData: {},

      form: {
        appId: "d3be2ba50a59b29381",
        dbCreateSysTime: 1570589468000,
        grantId: "42259662",
        id: "1",
        name: "有赞",
        one: 0,
        secretId: "46568671804492e0aa15c82ee20647bc",
        sysStatus: 1,
        tree: 0,
        two: 0
      }
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.fetchData();
  },
  methods: {
    //获取用户列表
    fetchData() {
      this.axios.get(this.urls.platforminfo).then(response => {
        this.form = response.data;
      });
    },
    operationHandle(index, row, type) {
      let param = {
        id: row.id,
        status: type
      };
      this.axios.put(url + "?" + Qs.stringify(param)).then(response => {
        this.fetchData();
      });
    },

    //查询用户详情
    edit(index, row) {
      this.dialogTableVisible = true;
      this.selectTaskData = this.form;
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