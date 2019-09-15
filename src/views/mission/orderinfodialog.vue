<template>
  <el-dialog
    title="商品列表"
    :visible.sync="isShowDialog"
    width="60%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="商品名称" width="295">
          <template slot-scope="scope">{{ scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="商品价格（元）" align="center">
          <template slot-scope="scope">{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="商品数量" align="center">
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column label="商品提成奖励(元)" align="center">
          <template slot-scope="scope">{{ scope.row.i_cps_money }}</template>
        </el-table-column>
        <el-table-column label="商品提成比例(%)" align="center">
          <template slot-scope="scope">{{ scope.row.pi_ratehone }}</template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import Qs from "qs";
import { getTimeDate } from "@/utils/index.js";

export default {
  name: "orderinfo",
  components: {},
  props: {
    isShowDialog: Boolean,
    taskData: { type: Object }
  },
  watch: {
    taskData: function(newValue, oldValue) {
      this.list = newValue.items;
    }
  },
  data() {
    return {
      list: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    formatTime(cellValue) {
      return getTimeDate(cellValue);
    },

    //dialog关闭按钮
    handleClose() {
      // this.isNewDialog = false;
      this.$emit("editDialog", false);
    }
  }
};
</script>

<style scoped lang="scss">
.line {
  text-align: center;
}

.formview {
  padding: 0 30px;
  padding-top: 0px;
}

.sub-navbar {
  height: 50px;
  line-height: 50px;
  position: relative;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  transition: 600ms ease position;
  background: linear-gradient(
    90deg,
    rgba(32, 182, 249, 1) 0%,
    rgba(32, 182, 249, 1) 0%,
    rgba(33, 120, 241, 1) 100%,
    rgba(33, 120, 241, 1) 100%
  );

  .subtitle {
    font-size: 20px;
    color: #fff;
  }

  &.draft {
    background: #d0d0d0;
  }

  &.deleted {
    background: #d0d0d0;
  }
}
</style>

