
import { fetch, fetchImg, postFetch} from "./baseApi";

// 登录接口
export function loginIn(params){
  return fetch("GET", params, "login", true,true).then( res =>{
    return res.data;
  });
}


// 获取通讯录
export function getMyAddressBook(params) {
  return fetch("GET", params, "getMyAddressBook").then(res => {
    return res.data;
  });
}

// 获取消息列表
export function getMyMessage(params) {
  return fetch("GET", params, "getMyMessage").then(res => {
    return res.data;
  });
}

//获取我的签到信息
export function getMyQD(params){
  return fetch("GET", params, "getMyQD").then(res => {
    return res.data;
  });
}


//获取团队签到信息
export function getTeamQdCount(params) {
  return fetch("GET", params, "getTeamQdCount").then(res => {
    return res.data;
  });
}


//获取团队签到信息
export function getOne(params) {
  return fetch("GET", params, "getOne").then(res => {
    return res.data;
  });
}



//获取团队签到记录统计接口
export function getMyTeamQDTJ(params) {
  return fetch("POST", params, "getMyTeamQDTJ").then(res => {
    return res.data;
  });
}



//获取团队签到记录接口
export function getMyTeamQD(params) {
  return fetch("POST", params, "getMyTeamQD").then(res => {
    return res.data;
  });
}



//根据登录人username取得权限范围内的学校地区
export function getCity(params) {
  return fetch("POST", params, "getCity").then(res => {
    return res.data;
  });
}


//根据登录人username取得权限范围内的学校
export function getSchool(params) {
  return fetch("GET", params, "getSchool").then(res => {
    return res.data;
  });
}


//签到获取拜访目的接口
export function getPurpuse(params) {
  return fetch("POST", params, "getPurpuse").then(res => {
    return res.data;
  });
}

//签到获取学校联系人接口
export function getSchoolLnkman(params){
  return fetch("GET", params, "getSchoolLnkman").then(res => {
    return res.data;
  });
}


//签到获取维护分类接口
export function getClass(params) {
  return fetch("POST", params, "getClass").then(res => {
    return res.data;
  });
}

//上传图片
export function uploadImg(params,path) {
  return fetchImg(params, path).then(res => {
    return JSON.parse(res.data);
  });
} 

//提交签到
export function SubmitQD(params) {
  return fetch("POST", params, "SubmitQD",false,false).then(res => {
    return res.data;
  });
}

// 获取日报
export function getMyDiary(params) {
  return fetch("GET", params, "getMyDiary").then(res => {
    return res.data;
  });
}

//获取周报
export function getMyWeekReport(params) {
  return fetch("GET", params, "getMyWeekReport").then(res => {
    return res.data;
  });
}

//获取月报
export function getMyMonthReport(params) {
  return fetch("GET", params, "getMyMonthReport").then(res => {
    return res.data;
  });
}


//给某个日志写回复
export function SubmitReplay(params) {
  return fetch("GET", params, "SubmitReplay").then(res => {
    return res.data;
  });
}

//日报获取本人今日完成工作接口
export function getMyQDWork(params) {
  return fetch("GET", params, "getMyQDWork").then(res => {
    return res.data;
  });
}


//日报获取本人今日完成工作接口
export function SubmitDiary(params) {
  return postFetch("POSt", params, "SubmitDiary").then(res => {
    return res.data;
  });
}



//周报获取本人本周完成工作接口
export function getMyDiaryWork(params) {
  return fetch("GET", params, "getMyDiaryWork").then(res => {
    return res.data;
  });
}


//提交周报接口
export function SubmitWeekReport(params) {
  return postFetch("POST", params, "SubmitWeekReport").then(res => {
    return res.data;
  });
}
//提交月报接口
export function SubmitMonthReport(params) {
  return postFetch("POST", params, "SubmitMonthReport").then(res => {
    return res.data;
  });
}

//提交月报接口
export function getDiaryReport(params) {
  return postFetch("GET", params, "getDiaryReport").then(res => {
    return res.data;
  });
}


//获取学校签到/未签到统计接口
export function geSchoolQDCount(params) {
  return postFetch("GET", params, "geSchoolQDCount").then(res => {
    return res.data;
  });
}


//获取部门接口
export function getBumeng(params) {
  return postFetch("GET", params, "getBumeng").then(res => {
    return res.data;
  });
}

//获取客户经理使用统计接口
export function geKhjlQDCount(params) {
  return postFetch("GET", params, "geKhjlQDCount").then(res => {
    return res.data;
  });
}

//账号解绑
export function loginout(params) {
  return postFetch("GET", params, "loginout").then(res => {
    return res.data;
  });
}


/**
 * 用户权限start
 */
export function CommentFlag(params) {
  return fetch("POST", params, "CommentFlag", false, false, "Commen/").then(res => {
    return res.data;
  });
}
/**
 * 用户权限end
 */
/**
 * 商机相关start
 */

//获取商机列表
export function BusinessList(params) {
  return fetch("POST", params, "BusinessList", false, false, "Business/").then(res => {
    return res.data;
  });
}

//搜索所需的商机列表
export function BusinessListBySelect(params) {
  return fetch("POST", params, "BusinessListBySelect", false, false, "Business/").then(res => {
    return res.data;
  });
}

// 获取数据字典
export function GetDictionary(params) {
  return fetch("POST", params, "GetDictionary", false, false, "Dictionary/").then(res => {
    return res.data;
  });
}

//获取商机编号
export function GetBusinessNum(params) {
  return fetch("POST", params, "GetBusinessNum", false, false, "Business/").then(res => {
    return res.data;
  });
}


//商机分类列表
export function BusinessTypeList(params) {
  return fetch("POST", params, "BusinessTypeList", false, false, "Business/").then(res => {
    return res.data;
  });
}

//验证学校是否存在
export function VerifySchool(params) {
  return fetch("POST", params, "VerifySchool", false, false, "Business/").then(res => {
    return res.data;
  });
}

//商机联系人列表
export function LinkUserList(params={}) {
  return fetch("POST", params, "LinkUserList", false, false, "Business/").then(res => {
    return res.data;
  });
}

//获取商机详情
export function GetBusiness(params = {}) {
  return fetch("POST", params, "GetBusiness", false, false, "Business/").then(res => {
    return res.data;
  });
}

//新增商机
export function AddBusiness(params = {}) {
  return fetch("POST", params, "AddBusiness", false, false, "Business/").then(res => {
    return res.data;
  });
}

//修改商机
export function UpdateBusiness(params = {}) {
  return fetch("POST", params, "UpdateBusiness", false, false, "Business/").then(res => {
    return res.data;
  });
}

//删除商机
export function DeleteBusiness(params = {}) {
  return fetch("POST", params, "DeleteBusiness", false, false, "Business/").then(res => {
    return res.data;
  });
}

//商机跟进处理
export function BusinessFollowUp(params = {}) {
  return fetch("POST", params, "BusinessFollowUp", false, false, "Business/").then(res => {
    return res.data;
  });
}

//商机跟进列表
export function BusinessFollowUpList(params = {}) {
  return fetch("POST", params, "BusinessFollowUpList", false, false, "Business/").then(res => {
    return res.data;
  });
}

//添加商机联系人
export function AddLinkUser(params = {}) {
  return fetch("POST", params, "AddLinkUser", false, false, "Business/").then(res => {
    return res.data;
  });
}

/**
 * 商机相关end
 */


/**
 * 订单相关start
 */

//订单列表
export function OrderList(params = {}) {
  return fetch("POST", params, "OrderList", false, false, "Order/").then(res => {
    return res.data;
  }); 
}

//获取收货地址
export function GetSchoolReceive(params = {}) {
  return fetch("POST", params, "GetSchoolReceive", false, false, "Order/").then(res => {
    return res.data;
  });
}


//添加订单
export function AddOrder(params = {}) {
  return fetch("POST", params, "AddOrder", false, false, "Order/").then(res => {
    return res.data;
  });
}

//修改订单
export function UpdateOrder(params = {}) {
  return fetch("POST", params, "UpdateOrder", false, false, "Order/").then(res => {
    return res.data;
  });
}

//删除订单
export function DeleteOrder(params = {}) {
  return fetch("POST", params, "DeleteOrder", false, false, "Order/").then(res => {
    return res.data;
  });
}

//订单详情
export function OrderDetails(params = {}) {
  return fetch("POST", params, "OrderDetails", false, false, "Order/").then(res => {
    return res.data;
  });
}

//订单编号
export function GetOrderNum(params = {}) {
  return fetch("POST", params, "GetOrderNum", false, false, "Order/").then(res => {
    return res.data;
  });
}

//订单审批
export function OrderAudit(params = {}) {
  return fetch("POST", params, "OrderAudit", false, false, "Order/").then(res => {
    return res.data;
  });
}

//获取审批人
export function GetOrderAuditUser(params = {}) {
  return fetch("POST", params, "GetOrderAuditUser", false, false, "Order/").then(res => {
    return res.data;
  });
}

//订单审批流程配置
export function OrderAuditSet(params = {}) {
  return fetch("POST", params, "OrderAuditSet", false, false, "Order/").then(res => {
    return res.data;
  });
}

/**
 * 订单相关end
 */

/**
 * 产品相关start
 */

//获取产品类型
export function ProductTypeList(params = {}) {
  return fetch("POST", params, "ProductTypeList", false, false, "Product/").then(res => {
    return res.data;
  });
}

//获取产品列表
export function ProductList(params = {}) {
  return fetch("POST", params, "ProductList", false, false, "Product/").then(res => {
    return res.data;
  });
}

/**
 * 产品相关end
 */


/**
 * 合同相关start
 */

//搜索所需的合同列表
export function ContractListBySelect(params = {}) {
  return fetch("POST", params, "ContractListBySelect", false, false, "Contract/").then(res => {
    return res.data;
  });
}

/**
 * 合同相关end
 */


// 提交考勤
export function SubmitKQ(params = {}) {
  return fetch("GET", params, "SubmitKQ").then(res => {
    return res.data;
  });
}

//获取考勤记录
export function getMyKQ(params){
  return fetch("GET", params, "getMyKQ").then(res => {
    return res.data;
  });
}
//团队考勤记录
export function getMyTeamKQTJ(params){
  return fetch("GET", params, "getMyTeamKQTJ").then(res => {
    return res.data;
  });
}


//订单编号
export function GetSchoolIntroInfo(params = {}) {
  return fetch("POST", params, "GetSchoolIntroInfo", false, false, "SchoolIntro/").then(res => {
    return res.data;
  });
}
//微信推送消息
export function WeiXinSendTemplate(params = {}) {
  return fetch("POST", params, "WeiXinSendTemplate", false, false, "WeiXin/").then(res => {
    return res.data;
  });
}

//微信保存form-id
export function WeiXinUserFromIdAdd(params = {}) {
  return fetch("POST", params, "WeiXinUserFromIdAdd", false, false, "WeiXin/").then(res => {
    return res.data;
  });
}
//获取未签到数据
export function getMyTeamWQDTJ(params = {}) {
  return fetch("GET", params, "getMyTeamWQDTJ").then(res => {
    return res.data;
  });
}



//提交修改签到接口
export function SubmitModifyQD(params = {}) {
  return fetch("POST", params, "SubmitModifyQD").then(res => {
    return res.data;
  });
}

//提交修改日报接口
export function SubmitModifyDiary(params = {}) {
  return fetch("POST", params, "SubmitModifyDiary").then(res => {
    return res.data;
  });
}

//提交修改周报接口
export function SubmitModifyWeekReport(params = {}) {
  return fetch("POST", params, "SubmitModifyWeekReport").then(res => {
    return res.data;
  });
}
//提交修改月报接口
export function SubmitModifyMonthReport(params = {}) {
  return fetch("POST", params, "SubmitModifyMonthReport").then(res => {
    return res.data;
  });
}
//提交某条日报/周报/月报已读接口
export function SubmitIfRead(params = {}) {
  return fetch("GET", params, "SubmitIfRead").then(res => {
    return res.data;
  });
}


