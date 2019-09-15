/**
 * Created by PanJiaChen on 16/11/18.
 */
import axios from 'axios'
import Qs from "qs";

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 检测淘宝账户的等级
 * @param {string} str
 * @returns {Boolean}
 */
export const yanhaologin = function (params) {
  axios
    // .get("http://120.77.176.144:3003/yanhaologin")
    .get("/yan/yanhaologin")
    .then(function (response) {
      if (response.data) {
        console.log("验号1登录成功");
      } else {
        console.log("登录失败");
      }
    });
}

export const yanhaoPush = function (username) {
  let params = {
    wangwang: username,
  };

  return new Promise((resolve, reject) => {
    axios
      // .post("http://120.77.176.144:3003/yanhaoPush", params)
      .post("/yan/yanhaoPush", params)
      .then(function (response) {
        if (response.data && response.data.ok) {
          resolve(1)
        } else {
          resolve(0)
        }
      });
  });

}

export const yanhaoQuery = function () {
  let params = {
    status: 4,
    startDate: 1561564800000,
    endDate: 1961564800000,
    ps: 2,
    pn: 1,
  };

  axios
    // .get("http://120.77.176.144:3003/yanhaoQuery", params)
    .get("/yan/yanhaoQuery", params)
    .then(function (response) {

      if (response.data && response.data.res.length > 0) {

        var targetArr = [];
        for (var i = 0; i < response.data.res.length; i++) {
          if (targetArr.indexOf(response.data.res[i].wangwang) == -1)
            targetArr.push(response.data.res[i].wangwang);
          else
            delete response.data.res[i];
        }
        response.data.res.forEach(item => {
          addTaobao(item);
        });
        // console.log(JSON.stringify(response.data));
      } else {
        console.log("未查询到用户");
      }
    });
}

const addTaobao = (item) => {
  if (item) {
    axios
      // .post('/admin/user/taobao/update' + "?" + Qs.stringify(item))
      .post('/api/user/taobao/update' + "?" + Qs.stringify(item))
      .then(response => {
      });
  }
}

//////---------------------------魔盒验号-------------------------

//登录
export const yanhaoBoxlogin = function () {
  axios
    // .get("http://dxw.toolmall.com:3003/yanhaoBoxlogin")
    .get("/yan/yanhaoBoxlogin")
    .then(function (response) {
      if (response) {
        console.log("验号2登录成功");
      } else {
        console.log("登录失败");
      }
    });
}

//查询
export const yanhaoBoxQuery = function (username) {
  let params = {
    wangwang: username,
  };

  return new Promise((resolve, reject) => {
    axios
      // .post("http://dxw.toolmall.com:3003/yanhaoQuerybox", params)
      .post("/yan/yanhaoQuerybox", params)
      .then(function (response) {
        if (response.data) {
          let item = {};
          item.wangwang = username;
          item.status = response.data.result == '正常' ? '4' : '3';
          item.buyerLevel = response.data.vip_info;
          item.buyerScore = response.data.buyerCre;
          item.realName = response.data.nameconform == 1 ? '支付宝实名' : '未实名';
          item.gender = response.data.sex == '男' ? "M" : 'F';
          item.sentRate = response.data.sent_rate;
          item.receivedRate = response.data.received_rate;
          item.buyerTotalNum = response.data.badNum + response.data.goodNum;
          item.buyerGoodNum = response.data.goodNum;
          item.wwcreatedStr = response.data.created;
          item.jiangquan = response.data.type6;
          item.avatar = '';
          item.finishTsStr = response.data.queryTime;
          item.weekCreditAverage = response.data.buyerAvg;
          addTaobao(item);
          resolve(1)
        } else {
          resolve(0)
        }
      });
  });
}

