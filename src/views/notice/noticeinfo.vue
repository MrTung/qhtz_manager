<template>
  <el-dialog
    title="公告详情"
    :visible.sync="isShowDialog"
    width="25%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding:0px;min-height:200px;">
      <el-form ref="form" class="formview">
        <el-form-item label="公告类型" class="form-item" label-width="70px" v-if="!look">
          <el-select v-model="type" placeholder="请选择公告类型">
            <el-option label="买手" value="2" />
            <el-option label="商家" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item class="form-item">
          <el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" class="formview" v-if="!look">
        <el-form-item class="form-item" align="center">
          <el-button type="primary" @click="addNotice()">确认发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import Qs from "qs";

export default {
  name: "taskInfo",
  components: {},
  props: {
    isShowDialog: Boolean,
    taskData: { type: String }
  },
  watch: {
    taskData: function(newValue, oldValue) {
      if (newValue == "add") {
        this.look = false;
        this.textarea = "";
      } else {
        this.textarea = newValue;
        this.look = true;
      }
    }
  },
  data() {
    return {
      look: false,
      textarea: "",
      type: ""
    };
  },
  computed: {
    getbalance() {
      let userinfo = this.$store.state.userinfo;
      return userinfo.balance;
    }
  },
  created() {},
  mounted() {},
  methods: {
    addNotice() {
      let param = {
        memo: this.textarea,
        type: this.type
      };
      this.axios
        .post(this.urls.addnotice + "?" + Qs.stringify(param))
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

.hview {
  display: flex;
  flex-direction: row;
}
</style>

