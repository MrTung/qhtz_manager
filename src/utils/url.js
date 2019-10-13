let Baseurl = '';
if (process.env.NODE_ENV == 'development') {
    // Baseurl = "http://120.77.176.144:8011/admin"
    Baseurl = "/api"

} else if (process.env.NODE_ENV == 'production') {
    Baseurl = "/admin"
}


const imgbaseurl = 'http://39.100.235.160:8011'

//获取用户列表
// const getuserlist = Baseurl + "/yzdata/list"
const getuserlist = Baseurl + "/getcustomer"

//获取分销列表
const getbusinesslist = Baseurl + "/getfenxiao"

//获取分销商的客户列表
const getyzsalescustomers = Baseurl + "/getyzsalescustomers"

//获取订单列表
const allorderlist = Baseurl + "/getyzsalesmantrades"

//查询管理员账号列表
const getalladminlist = Baseurl + "/user/info/list"

//角色列表
const rolelist = Baseurl + "/role/list"

//新增用户
const addadmin = Baseurl + "/user/info/new"

//修改用户状态
const userinfostatus = Baseurl + "/wechat/userinfo/status"

//获取分销提成比例信息
const platforminfo = Baseurl + "/platform/info"

//修改分销提成比例信息
const platformnew = Baseurl + "/platform/new"

//获取商品列表
const onsalelist = Baseurl + "/items/onsale/list"

//设置商品折扣信息
const discount = Baseurl + "/items/onsale/discount"

//设置分销员等级
const setgrade = Baseurl + "/user/info/grade"

//获取客户列表
const relationshiplist = Baseurl + "/userinfo/relationship/list/uid"






//上传文件地址 http://120.77.176.144:8011/admin
const uploadurl = Baseurl + '/sys/file/'

//根据id获取文件路径
const getFileurl = Baseurl + "/sys/file/url"

//获取短信验证码
const getSmsurl = Baseurl + "/sendSms"

//登录
const loginurl = Baseurl + "/login"

//修改密码
const changepwd = Baseurl + "/user/pwd"


//验证账号是否可用
const checkurl = Baseurl + "/business/register/check"


//获取商户基本信息
const businessinfo = Baseurl + "/business/info"

//修改商户基本信息
const editinfo = Baseurl + "/business/edit"

//修改商户状态
const businessstatus = Baseurl + "/business/status"

//获取店铺类型
const shoptypelist = Baseurl + "/shop/type/list"

//获取店铺列表
const shoplist = Baseurl + "/shop/list"

//新增店铺
const addshop = Baseurl + "/shop/new"

//删除店铺
const delshop = Baseurl + "/shop/del"

//获取店铺详情
const shopinfo = Baseurl + "/shop/info"


//获取账号列表
const banklist = Baseurl + "/bank/card/list"

//获取默认充值账号
const bankinfo = Baseurl + "/bank/info/info"

//新增收款卡
const cardadd = Baseurl + "/bank/card/add"

//删除收款卡
const carddel = Baseurl + "/bank/del"

//充值审核通过
const rechargesuccess = Baseurl + "/business/recharge/success"

//获取资金情况
const accountinfo = Baseurl + "/capital/flow"

//获取充值申请列表
const rechargelist = Baseurl + "/business/recharge/list"



//新增任务
const addMission = Baseurl + "/task/add"

//获取任务列表
const getMissionList = Baseurl + "/business/task/list"

//发布任务
const changgeMissionstatus = Baseurl + "/task/publish"

//获取任务状态类型
const statuslist = Baseurl + "/task/status/list"


//获取订单提现列表
const cashoutlist = Baseurl + "/cashout/list"

//确认提现成功
const cashoutsuccess = Baseurl + "/user/cashout/success"

//提现失败
const cashoutfail = Baseurl + "/cashout/fail"

//导出提现列表
const cashoutexport = Baseurl + "/cashout/export"

//获取订单列表
const orderlist = Baseurl + "/user/order/list"

//审核通过
const orderapproval = Baseurl + "/user/order/approval"

//审核拒绝
const orderreject = Baseurl + "/user/order/approval/rejection"

//交易成功
const ordersuccress = Baseurl + "/user/order/approval/succress"


//修改用户的信息
const editiusernfo = Baseurl + "/user/info/edit"

//更新旺旺信息
const taobaoupdate = Baseurl + "/user/taobao/update"

//查询旺旺信息
const taobaoquery = Baseurl + "/user/taobao/info"




//邀请码列表
const invitationlist = Baseurl + "/invitation/list"

//邀请码生成
const addinvitation = Baseurl + "/invitation/new"


// //获取所有权限
// const rolelist = Baseurl + "/all/role/list"


//历史公告列表
const noticelist = Baseurl + "/notice/list"

//新增公告
const addnotice = Baseurl + "/notice/new"

//获取当前公告
const noticeinfo = Baseurl + "/notice/info"

//删除公告
const deletenotice = Baseurl + "/notice/del"


export const urls = {
    relationshiplist,
    setgrade,
    discount,
    onsalelist,
    platformnew,
    platforminfo,
    userinfostatus,
    getyzsalescustomers,
    cashoutfail,
    noticelist,
    addnotice,
    noticeinfo,
    deletenotice,
    rolelist,
    invitationlist,
    addinvitation,
    changepwd,
    addadmin,
    getalladminlist,
    taobaoquery,
    taobaoupdate,
    cashoutexport,
    cashoutsuccess,
    cashoutlist,
    rechargelist,
    banklist,
    carddel,
    cardadd,
    getbusinesslist,
    businessstatus,
    editiusernfo,
    ordersuccress,
    orderreject,
    orderapproval,
    orderlist,
    allorderlist,
    imgbaseurl,
    getFileurl,
    statuslist,
    addMission,
    getMissionList,
    changgeMissionstatus,
    uploadurl,
    getSmsurl,
    loginurl,
    getuserlist,
    checkurl,
    businessinfo,
    editinfo,
    shoplist,
    addshop,
    delshop,
    shoptypelist,
    shopinfo,
    bankinfo,
    rechargesuccess,
    accountinfo
}

