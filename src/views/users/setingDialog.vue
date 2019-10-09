<template>
  <el-dialog
    title="分销比例设置"
    :visible.sync="isShowDialog"
    width="28%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <el-row :gutter="34" type="flex">
        <el-col style="margin-bottom:30px;" :span="10">
          <span class="text">一级分销比例</span>
          <el-input-number
            v-model="form.one"
            size="small"
            :precision="1"
            :step="0.1"
            controls-position="right"
            :min="0.01"
            :max="50"
          ></el-input-number>
        </el-col>
        <el-col style="margin-bottom:30px;" :span="10">
          <span class="text">二级分销比例</span>
          <el-input-number
            v-model="form.two"
            :precision="1"
            size="small"
            :step="0.1"
            controls-position="right"
            :min="0.01"
            :max="50"
          ></el-input-number>
        </el-col>
        <el-col style="margin-bottom:30px;" :span="10">
          <span class="text">三级分销比例</span>
          <el-input-number
            v-model="form.tree"
            :precision="1"
            size="small"
            :step="0.1"
            controls-position="right"
            :min="0.01"
            :max="50"
          ></el-input-number>
        </el-col>
      </el-row>
      <div>说明:分成比例修改不影响历史订单,新订单将按照此比例结算</div>
      <el-button
        size="small"
        style="float:right;margin-top:10px;"
        type="primary"
        @click="submit"
      >确认修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Qs from "qs";

export default {
  name: "orderinfo",
  components: {},
  props: {
    isShowDialog: Boolean,
    taskData: { type: Object }
  },
  watch: {
    taskData: function(newValue, oldValue) {
      this.form = JSON.parse(JSON.stringify(newValue));
    }
  },
  data() {
    return {
      listLoading: false,
      form: {}
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    //确认修改
    submit() {
      //     let param = {
      //     id: row.id,
      //     status: type
      //   };
      this.axios
        .post(this.urls.platformnew + "?" + Qs.stringify(this.form))
        .then(response => {
          this.handleClose();
        });
    },

    //dialog关闭按钮
    handleClose() {
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

.text {
  display: block;
  width: 100%;
  text-align: center;
  height: 30px;
}
</style>

