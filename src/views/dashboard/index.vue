<template>
  <div class="dashboard-container">
    <span>
      当前登录账号:
      <span style="color:orange;">{{getUser}}</span>
    </span>
    <panel-group />

    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-weight:bold;">最新公告</span>
      </div>
      <div>
        新更新： 增权单功能
        标签叠加单：只有最近7天完成该宝贝浏览任务打上标签的买手可以接单，所以保证每个付款的用户都有标签权重
        购物车增权单：只有最近7天完成该宝贝购物车任务的买手可以接单，从购物车付款
        如果该宝贝最近7天安排的浏览任务或者加购任务比较少，可接任务任务的买手也会变少，会导致任务完成延迟，请知晓~
      </div>

      <div style="color:#409eff;font-size:19px;font-weight:bold;margin-top:20px;">客服:</div>
      <div>QQ:12345678</div>
      <div>微信:hahahah</div>
    </el-card>-->

    <el-row :gutter="8" type="flex">
      <!-- <el-col style="margin-bottom:30px;" :span="11">
        <transaction-table style="height:100%" />
      </el-col>
      <el-col style="margin-bottom:30px;" :span="11">
        <user-table style="height:100%" />
      </el-col>-->
      <el-col style="margin-bottom:30px;" :span="6">
        <!-- <box-card /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import TransactionTable from "./components/TransactionTable";
import UserTable from "./components/UserTable";

import Info from "./components/Info";
import BoxCard from "./components/BoxCard";

import { mapGetters } from "vuex";
import { getTimeDate } from "@/utils/index.js";
import Qs from "qs";
import { getUserinfo } from "@/utils/auth";

export default {
  components: {
    PanelGroup,
    TransactionTable,
    UserTable,
    Info,
    BoxCard
  },
  data() {
    return {};
  },
  name: "shouye",
  computed: {
    getLastlogintime() {
      return getTimeDate(this.$store.state.userinfo.dbUpdateSysTime);
    },
    getUser() {
      let userinfo = JSON.parse(getUserinfo());
      return userinfo ? userinfo.userName : "";
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 100%;
}

.dashboard {
  &-container {
    padding: 30px;
    background-color: #f0f2f5;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 40%;
  min-width: 280px;
  display: inline-block;
  line-height: initial;
  margin-right: 20px;
}
</style>
