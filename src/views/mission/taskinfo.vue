<template>
  <el-dialog
    title="编辑用户"
    :visible.sync="isShowDialog"
    width="80%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <div
        style="width: 100%;line-height: 60px;text-align:right; background-color: #eef1f6; margin-bottom: 10px;padding-right:20px;;"
      >
        本次任务所需商品本金:&nbsp;
        <count-to
          :start-val="0"
          :end-val="getGoodsprice"
          :duration="300"
          :decimals="2"
          style="color:red;font-size:18px;font-weight:bold"
        />&nbsp;元
        &nbsp;&nbsp;&nbsp;&nbsp;
        佣金&nbsp;
        <span
          style="color:red;font-size:18px;font-weight:bold"
        >{{(this.mainForm.salary * this.mainForm.missionQuantity).toFixed(2)}}</span>
        &nbsp;元
      </div>
      <div style="display: inline-flex;width: 100%;margin-top:10px;">
        <el-form
          ref="mainForm"
          :model="mainForm"
          label-width="110px"
          class="formview"
          :validate-on-rule-change="false"
        >
          <span
            style="display: block;line-height: 50px;font-size: 20px;font-weight: bold; color: orange;"
          >任务基本信息:</span>
          <!-- 任务基础信息模块 -->
           <el-form-item label="发布任务的店铺" class="form-item" prop="shopId">
            <el-input v-model="mainForm.shopName" disabled></el-input>
          </el-form-item>

          <el-form-item label="任务分类" class="form-item" prop="missionType">
            <el-select v-model="mainForm.missionType" placeholder="请选择任务类型" disabled>
              <el-option
                v-for="item in shoptypelist"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终端类型" class="form-item" prop="clientType">
            <el-radio-group v-model="mainForm.clientType" disabled>
              <el-radio label="PC" border>电脑下单</el-radio>
              <el-radio label="APP" border>APP下单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品链接" class="form-item" prop="goodsUrl">
            <el-input placeholder="请输入商品链接,手机端复制淘口令即可" v-model="mainForm.goodsUrl" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品标题" class="form-item" prop="goodsTitle">
            <el-input placeholder="请输入商品标题" v-model="mainForm.goodsTitle" disabled></el-input>
          </el-form-item>
          <el-form-item label="搜索关键词" class="form-item" prop="keyWords">
            <el-input placeholder="请输入关键词" v-model="mainForm.keyWords" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品主图" class="form-item" prop="goodsImg">
            <el-input
              placeholder="请输入商品主图,电脑打开商品详情,主图右键复制图片地址即可"
              v-model="mainForm.goodsImg"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="付款方式" class="form-item" prop="payMent">
            <el-radio-group v-model="mainForm.payMent" disabled>
              <el-radio label="平台担保" border>平台担保</el-radio>
              <!-- <el-radio label="平台担保 + 隔日返" border>平台担保 + 隔日返</el-radio> -->
              <el-radio label="商家远程代付" border>商家远程代付</el-radio>
            </el-radio-group>
          </el-form-item>
           <el-form-item label="搜索显示金额" class="form-item" prop="showMoney">
            <el-input placeholder="请输入搜索显示金额" v-model="mainForm.showMoney" disabled></el-input>
          </el-form-item>
          <el-form-item label="下单sku付款金额" class="form-item" prop="unitPrice">
            <el-input
              placeholder="请输入商品单价"
              type="number"
              v-model.number="mainForm.unitPrice"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="每单购买商品数" class="form-item" prop="buyNum">
            <el-input
              placeholder="请输入用户购买商品的数量"
              type="number"
              v-model.number="mainForm.buyNum"
              disabled
            ></el-input>
          </el-form-item>
           <el-form-item label="佣金折扣" class="form-item" prop="basePrice">
          <el-input
            placeholder="您和平台协议好的基础价格"
            type="number"
            v-model.number="getbasePrice"
           disabled
          ></el-input>
        </el-form-item>
          </el-form-item>
          <el-form-item label="商品类型" class="form-item" prop="goodsType">
            <el-radio-group v-model="mainForm.goodsType" disabled>
              <el-radio label="实物" border>实物</el-radio>
              <el-radio label="虚拟商品" border>虚拟商品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="收货时间" class="form-item" prop="deliverTime">
            <el-select v-model="mainForm.deliverTime" placeholder="请选择" disabled>
              <el-option
                v-for="item in deliveroptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="好评要求" class="form-item" prop="evaluateRequire">
            <el-radio-group v-model="mainForm.evaluateRequire" disabled>
              <el-radio label="默认好评" border>默认好评</el-radio>
              <el-radio label="文字好评" border>文字好评</el-radio>
              <el-radio label="带图好评" border>带图好评</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="好评图片" class="form-item" v-if="mainForm.evaluateRequire == '带图好评'">
            <a
              :href="item"
              target="_blank"
              v-for="item in commentImages"
              :key="item"
              :v-if="commentImages.length > 0"
            >
              <img :src="item" style="width: 100px;margin-left:10px" />
            </a>
          </el-form-item>

          <el-form-item
            label="指定好评内容"
            class="form-item"
            prop="assess"
            v-if="mainForm.evaluateRequire == '文字好评'"
          >
            <el-input placeholder="请输入指定好评内容" v-model="mainForm.assess" type="textarea" disabled></el-input>
          </el-form-item>

          <el-form-item label="发布数量" class="form-item" prop="missionQuantity">
            <el-input v-model.numbe="mainForm.missionQuantity" disabled></el-input>
          </el-form-item>
          <el-form-item label="其他备注" class="form-item" prop="message">
            <el-input v-model="mainForm.message" disabled></el-input>
          </el-form-item>
        </el-form>

        <!-- 其他任务要求模块 -->
        <el-form
          ref="otherForm"
          :model="otherForm"
          label-width="120px"
          class="formview"
          style="margin-left:20px;"
        >
          <span
            style="display: block;line-height: 50px;font-size: 20px;font-weight: bold; color: #409EFF;"
          >重标签加权:</span>
          <el-form-item
            v-for="(formitem,index) in formList"
            :key="formitem.id"
            :label="formitem.label"
            :prop="formitem.field"
          >
            <el-checkbox
              v-model="otherForm[formitem.field]"
              v-if="formitem.type == 'Checkbox'"
              disabled
            ></el-checkbox>
            <el-select v-model="otherForm[formitem.field]" placeholder="请选择" v-else disabled>
              <el-option
                v-for="item in formitem.dataProvider"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import CountTo from "vue-count-to";
import { getFormList, getDeliveroptions, getFormRules } from "./form.js";
import Qs from "qs";

export default {
  name: "taskInfo",
  components: { CountTo },
  props: {
    isShowDialog: Boolean,
    taskData: { type: Object }
  },
  watch: {
    taskData: function(newValue, oldValue) {
      this.taskInfo = newValue;

      this.mainForm = this.taskInfo;
      this.formList = JSON.parse(this.mainForm.content);

      let form = {};
      this.formList.forEach(item => {
        form[item.field] = item.value;
      });
      this.otherForm = form;

      this.getCommentImgurl();
    }
  },
  data() {
    return {
      dialogImageUrl: "",

      additionSalary: 0, //重标签的金额
      fileList: [],
      taskInfo: null,
      dialogVisible: false,
      commentImages: [], //好评图片

      shopList: [],
      formList: [],
      shoptypelist: [],
      loading: false,
      deliveroptions: [],
      formRules: {},
      otherForm: {},
      mainForm: {
        id: "", //任务id
        shopId: "", //店铺
        missionType: "", //任务类型 淘宝京东
        clientType: "PC", //终端类型  手机端  pc
        goodsUrl: "", //商品链接
        goodsTitle: "", //商品名称
        commentUrl: "", //带图好评
        keyWords: "", //关键词
        goodsImg: "", //商品主图   url
        payMent: "平台担保", // 付款方式  平台担保  立返  远程代付
        unitPrice: "", //商品单价
        buyNum: "1", //每单购买数量
        showMoney:"",
        salary: "", //每单佣金
        goodsType: "实物", //商品类型  虚拟 实物
        deliverTime: "发货3天后好评", //收货时间   1天后 2天后
        evaluateRequire: "默认好评", //评价要求 文字好评  五星好评 带图评价
        missionQuantity: "1", //任务数量
        assess: "", //指定好评内容
        message: "" //商家备注留言
      }
    };
  },
  computed: {
    getbalance() {
      let userinfo = this.$store.state.userinfo;
      return userinfo.balance;
    },
    getbasePrice() {
      let userinfo = this.$store.state.userinfo;
      return userinfo.basePrice;
    },
    getGoodsprice() {
      if (this.mainForm.payMent == "商家远程代付") return 0;
      let total =
        this.mainForm.unitPrice *
        this.mainForm.buyNum *
        this.mainForm.missionQuantity;
      return total;
    },
    getSalary() {
      let total = this.mainForm.salary * this.mainForm.missionQuantity;
      return total.toFixed(2);
    },
    getAlltakeoff() {
      let t = this.getSalary * 1 + this.getGoodsprice * 1;
      return t.toFixed(2);
    }
  },
  created() {
    //获取店铺类型
    this.axios.get(this.urls.shoptypelist).then(response => {
      this.shoptypelist = response.data;
    });

    //获取店铺列表
    this.getShopList();

    //获取动态form
    this.formList = getFormList();

    //获取收货时间数据
    this.deliveroptions = getDeliveroptions();

    //获取校验表单规则数据
    this.formRules = getFormRules();
  },
  mounted() {
    if (this.taskInfo) {
      this.mainForm = this.taskInfo;
      this.formList = JSON.parse(this.mainForm.content);

      let form = {};
      this.formList.forEach(item => {
        form[item.field] = item.value;
      });
      this.otherForm = form;
    } else {
      //新增任务
      let form = {};
      this.formList.forEach(item => {
        form[item.field] = item.value;
      });
      this.otherForm = form;
    }
  },
  methods: {
    //根据好评图片的数据获取好评图片的地址
    getCommentImgurl() {
      if (this.mainForm.commentUrl) {
        let arr = this.mainForm.commentUrl.split(",");

        let _that = this;
        _that.commentImages = [];
        arr.forEach(item => {
          if (item) {
            this.axios
              .get(this.urls.getFileurl + "?id=" + item)
              .then(response => {
                if (response.code == 0)
                  return this.$message.error(response.msg);
                _that.commentImages.push(
                  this.urls.imgbaseurl +
                    response.data.substring(2, response.data.length)
                );
              });
          }
        });
      }
    },
    //获取店铺列表
    getShopList() {
      let param = {
        businessId: this.$store.state.userinfo
          ? this.$store.state.userinfo.id
          : "",
        name: "",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
      };
      this.axios
        .get(this.urls.shoplist + "?" + Qs.stringify(param))
        .then(response => {
          this.shopList = response.data.list;
        });
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
  width: 50%;
  // margin: auto;
  padding: 0 30px;
  border: #4dd9d5 solid 3px;
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

