
export const getFormList = function () {
  return [
    // {
    //   field: "huobisanjia", //表字段 根据这个字段来取值 动态计算任务总金额等数据
    //   label: "货比三家", //标题，控件显示的文字
    //   type: "Checkbox", //控件类型，  文本、单选框、下拉框等等
    //   value: false, //用户填的值
    //   dataProvider: "" //数据源   如果是单选或者多选，需要提供数据源。比如任务类型 需要提供 拼多多、淘宝天猫、京东等
    // },
    {
      field: "category",
      label: "类目",
      type: "select",
      value: "",
      dataProvider: [
        {
          value: "0",
          label: "不限",
          money: 0,
        },
        {
          value: "1",
          label: "食品 (加1.0元)",
          money: 1.0,
        },
        {
          value: "2",
          label: "百货 (加1.0元)",
          money: 1.0,
        },
        {
          value: "3",
          label: "男装 (加1.0元)",
          money: 1.0,
        },
        {
          value: "4",
          label: "运动 (加1.0元)",
          money: 1.0,
        },
        {
          value: "5",
          label: "生鲜 (加1.0元)",
          money: 1.0,
        },
        {
          value: "6",
          label: "箱包 (加1.0元)",
          money: 1.0,
        },
        {
          value: "7",
          label: "鞋靴 (加1.0元)",
          money: 1.0,
        },
        {
          value: "8",
          label: "女装 (加1.0元)",
          money: 1.0,
        },
        {
          value: "9",
          label: "耳机 (加1.0元)",
          money: 1.0,
        },
        {
          value: "10",
          label: "母婴 (加1.0元)",
          money: 1.0,
        },
        {
          value: "11",
          label: "饰品 (加1.0元)",
          money: 1.0,
        },
        {
          value: "12",
          label: "内衣 (加1.0元)",
          money: 1.0,
        },
        {
          value: "13",
          label: "美妆 (加1.0元)",
          money: 1.0,
        },
        {
          value: "14",
          label: "家装 (加1.0元)",
          money: 1.0,
        },
        {
          value: "15",
          label: "洗护 (加1.0元)",
          money: 1.0,
        },
        {
          value: "16",
          label: "电器 (加1.0元)",
          money: 1.0,
        },
        {
          value: "17",
          label: "数码 (加1.0元)",
          money: 1.0,
        },
        {
          value: "18",
          label: "车品 (加1.0元)",
          money: 1.0,
        },
        {
          value: "19",
          label: "保健 (加1.0元)",
          money: 1.0,
        }
      ]
    },
    {
      field: "sex",
      label: "买家性别",
      type: "select",
      value: "",
      dataProvider: [
        {
          value: "0",
          label: "不限",
          money: 0,
        },
        {
          value: "1",
          label: "男 (加0.5元)",
          money: 0.5,
        },
        {
          value: "2",
          label: "女 (加0.5元)",
          money: 0.5,
        }
      ]
    },
    {
      field: "age",
      label: "买家年龄",
      type: "select",
      value: "",
      dataProvider: [
        {
          value: "0",
          label: "不限",
          money: 0,
        },
        {
          value: "1",
          label: "20岁以下",
          money: 0,
        },
        {
          value: "2",
          label: "20-30岁",
          money: 0,
        },
        {
          value: "3",
          label: "30-40岁",
          money: 0,
        },
        {
          value: "4",
          label: "40-50岁",
          money: 0,
        }
      ]
    },

    {
      field: "leimudanbi",
      label: "类目单笔价",
      type: "select",
      value: "",
      dataProvider: [
        {
          value: "0",
          label: "不限",
          money: 0,
        },
        {
          value: "1",
          label: "0-50 (加1.0元)",
          money: 1,
        },
        {
          value: "2",
          label: "50-100 (加1元)",
          money: 1,
        },
        {
          value: "3",
          label: "100-300 (加1元)",
          money: 1,
        },
        {
          value: "4",
          label: "300-500 (加1元)",
          money: 1,

        },
        {
          value: "5",
          label: "500以上 (加1元)",
          money: 1,

        },
      ]
    },
    {
      field: "huobisanjia",
      label: "货比",
      type: "select",
      value: "",
      dataProvider: [
        {
          value: "0",
          label: "不限",
          money: 0,
        },
        {
          value: "1",
          label: "货比三家 (加0.5元)",
          money: 0.5,
        },
        {
          value: "2",
          label: "货比五家 (加0.5元)",
          money: 0.5,
        },
      ]
    },
    {
      field: "level",
      label: "账号等级要求",
      type: "select",
      value: "",
      dataProvider: [
        {
          value: "0",
          label: "不限",
          money: 0,
        },
        {
          value: "1",
          label: "心级买手 (加0.5元)",
          money: 0.5,
        },
        {
          value: "2",
          label: "钻级买手 (加1元)",
          money: 1,
        },
      ]
    },

    {
      field: "paytime",
      label: "付款时间",
      type: "select",
      value: "",
      dataProvider: [
        {
          value: "0",
          label: "立即付款",
          money: 0,
        },
        {
          value: "1",
          label: "2小时后付款 (加0.5元)",
          money: 0.5,
        },
        {
          value: "2",
          label: "12小时后付款 (加1.0元)",
          money: 1,
        },
        {
          value: "3",
          label: "24小时后付款 (加1.5元)",
          money: 1.5,
        },
        {
          value: "4",
          label: "36小时后付款 (加2.0元)",
          money: 2,
        },
      ]
    },
    {
      field: "shoppinglevel",
      label: "买手月消费等级",
      type: "select",
      value: "",
      dataProvider: [
        {
          value: "0",
          label: "不限",
          money: 0,
        },
        {
          value: "1",
          label: "300元以下",
          money: 0,
        },
        {
          value: "2",
          label: "300~399元",
          money: 0,
        },
        {
          value: "3",
          label: "400~549元 (加1元)",
          money: 1,
        },
        {
          value: "4",
          label: "550~579元 (加2元)",
          money: 2,
        },
        {
          value: "5",
          label: "750~1049元",
          money: 0,
        },
        {
          value: "6",
          label: "1050~1749元",
          money: 0,
        },
        {
          value: "7",
          label: "1750元以上",
          money: 0,
        },
      ]
    },
    {
      field: "rebuytime",
      label: "复购时间",
      type: "select",
      value: "",
      dataProvider: [
        {
          value: "0",
          label: "不限",
          money: 0,
        },
        {
          value: "1",
          label: "7天",
          money: 0,
        },
        {
          value: "2",
          label: "14天 (加0.5元)",
          money: 0.5,
        },
        {
          value: "3",
          label: "30天 (加1.0元)",
          money: 1,

        },
      ]
    },
    {
      field: "collection",
      label: "收藏店铺和商品",
      type: "Checkbox",
      value: false,
      dataProvider: "",
      money: 0,

    },
    {
      field: "addcart",
      label: "加购物车后购买",
      type: "Checkbox",
      value: false,
      dataProvider: "",
      money: 0,

    },



    {
      field: "chat",
      label: "拍前咨询客服",
      type: "Checkbox",
      value: false,
      dataProvider: "",
      money: 0,

    },

    // {
    //   field: "zhuijiahaoping",
    //   label: "追加好评",
    //   type: "Checkbox",
    //   value: false,
    //   dataProvider: ""
    // },
    // {
    //   field: "yemiantingliu",
    //   label: "购买前页面停留",
    //   type: "Checkbox",
    //   value: false,
    //   dataProvider: ["平台担保", "立返本金", "远程代付"]
    // },

    // {
    //   field: "liulanqita",
    //   label: "浏览其他商品",
    //   type: "Checkbox",
    //   value: false,
    //   dataProvider: ""
    // },


    // {
    //   field: "allview",
    //   label: "完整浏览商品",
    //   type: "Checkbox",
    //   value: false,
    //   dataProvider: ""
    // },
  ];
}


export const getDeliveroptions = function () {
  return [
    {
      value: "1",
      label: "立即好评"
    },
    {
      value: "2",
      label: "发货30分钟后好评"
    },
    {
      value: "3",
      label: "发货1天后好评"
    },
    {
      value: "4",
      label: "发货2天后好评"
    },
    {
      value: "5",
      label: "发货3天后好评"
    },
    {
      value: "6",
      label: "发货4天后好评"
    },
    {
      value: "7",
      label: "发货5天后好评"
    },
    {
      value: "8",
      label: "发货6天后好评"
    }
  ];
}


export const getFormRules = function () {
  return {
    shopId: [
      { required: true, trigger: ["blur", 'change'], message: "请选择您的店铺" }
    ],
    missionType: [
      { required: true, trigger: ["blur", 'change'], message: "请选择任务类型" }
    ],
    clientType: [
      { required: true, trigger: ["blur", 'change'], message: "请选择终端类型" }
    ],
    goodsUrl: [
      { required: true, trigger: ["blur", 'change'], message: "请输入商品链接" }
    ],
    goodsTitle: [
      { required: true, trigger: ["blur", 'change'], message: "请输入商品标题" }
    ],
    goodsImg: [
      {
        required: true,
        trigger: ["blur", 'change'],
        message:
          "请输入商品主图链接,可以找到淘宝或者京东的主图右键复制图片地址"
      }
    ],
    payMent: [
      { required: true, trigger: ["blur", 'change'], message: "请选择支付方式" }
    ],
    unitPrice: [
      { required: true, trigger: ["blur", 'change'], message: "请输入商品单价" },
      { type: "number", message: "单价必须为数字值" }
    ],
    buyNum: [
      { required: true, trigger: ["blur", 'change'], message: "请输入每单购买数量" },
      { type: "number", message: "数量必须为数字值" }
    ],
    salary: [
      { required: true, trigger: ["blur", 'change'], message: "请输入用户完成所得报酬" },
      { type: "number", message: "佣金必须大于1" }
    ],
    goodsType: [
      { required: true, trigger: ["blur", 'change'], message: "请选择商品类型" }
    ],
    deliverTime: [
      { required: true, trigger: ["blur", 'change'], message: "请选择收货事件要求" }
    ],
    evaluateRequire: [
      { required: true, trigger: ["blur", 'change'], message: "请选择评价要求" }
    ],
    missionQuantity: [
      {
        required: true,
        trigger: ["blur", 'change'],
        message: "请输入您想发布的任务数量"
      }
    ]
  };
}