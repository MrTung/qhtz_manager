<template>
  <el-dialog
    title="编辑分销员"
    :visible.sync="isShowDialog"
    width="24%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;text-align:center">
      <el-form ref="form" :model="form" label-width="80px" class="formview">
        <el-form-item label="用户手机:" class="form-item">
          <el-input v-model="form.userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" class="form-item">
          <el-input v-model="form.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分销等级:" class="form-item">
          <el-select v-model="form.grade" placeholder="请选择分销员等级" style="width: 100%;">
            <el-option label="初级分销员" value="1" />
            <el-option label="中级分销员" value="2" />
            <el-option label="高级分销员" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        size="small"
        style="float:center;margin-top:10px;"
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
      form: {
        grade: ""
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    //确认修改
    submit() {
      let param = {
        id: this.form.id,
        grade: this.form.grade
      };
      this.axios
        .put(this.urls.setgrade + "?" + Qs.stringify(param))
        .then(response => {
          this.$message({
            message: "设置成功",
            type: "success"
          });
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
  padding: 0px;
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

