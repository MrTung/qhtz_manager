<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('/mission/order')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新订单</div>
          <count-to :start-val="0" :end-val="totalOrders" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('/business/index')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新商家</div>
          <count-to
            :start-val="0"
            :end-val="totalBusiness"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('/users/index')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新用户</div>
          <count-to :start-val="0" :end-val="totalUsers" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('/account/rechargecheck')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日充值</div>
          <count-to
            :start-val="0"
            :end-val="totalRecharge"
            :duration="3200"
            :decimals="2"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import Qs from "qs";

export default {
  components: {
    CountTo
  },
  data() {
    return {
      //所有订单
      totalOrders: 0,
      //所有商家
      totalBusiness: 0,
      //所有用户
      totalUsers: 0,
      //所有充值
      totalRecharge: 0
    };
  },
  computed: {
    getbalance() {
      return 0;
    }
  },
  mounted() {
    this.getTodayOrders();

    this.getTodayBusiness();

    this.getTodayUser();

    this.getTodayRecharge();
  },
  methods: {
    //获取当前时间，格式YYYY-MM-DD
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getTomorrowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },

    handleSetLineChartData(type) {
      this.$router.push(type);
    },

    //今日订单
    getTodayOrders() {
      let param = {
        progress: "",
        name: "",
        starttime: this.getNowFormatDate(),
        endtime: this.getTomorrowFormatDate(),
        desc: "2",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
      };
      this.axios
        .get(this.urls.allorderlist + "?" + Qs.stringify(param))
        .then(response => {
          this.totalOrders = response.data.totalRow;
        });
    },
    //今日商家
    getTodayBusiness() {
      let param = {
        businessStatusId: "",
        starttime: this.getNowFormatDate(),
        endtime: this.getTomorrowFormatDate(),
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
      };
      this.axios
        .get(this.urls.getbusinesslist + "?" + Qs.stringify(param))
        .then(response => {
          this.totalBusiness = response.data.totalRow;
        });
    },
    //今日用户
    getTodayUser() {
      let param = {
        userStatusId: "",
        starttime: this.getNowFormatDate(),
        endtime: this.getTomorrowFormatDate(),
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
      };
      this.axios
        .get(this.urls.getuserlist + "?" + Qs.stringify(param))
        .then(response => {
          this.totalUsers = response.data.totalRow;
        });
    },

    //今日充值金额
    getTodayRecharge() {
      let param = {
        starttime: this.getNowFormatDate(),
        endtime: this.getTomorrowFormatDate(),
        shopType: "",
        shopAccount: "",
        shopName: "",
        shopUrl: "",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
      };
      this.axios
        .get(this.urls.rechargelist + "?" + Qs.stringify(param))
        .then(response => {
          let total = 0;
          response.data.list.forEach(row => {
            if (row.statusName == "充值成功") {
              total += row.money / 1;
            }
          });
          this.totalRecharge = total;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
