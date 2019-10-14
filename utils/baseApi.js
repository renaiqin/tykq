



var url = "http://192.168.0.64:88/SyncTj/TYKQsync.asp";//测试环境
//var url = "https://i.yd-jxt.com/SyncTj/TYKQsync.asp";//正式环境

//var url = "http://www.yd-jxt.com/SyncTj/TYKQsync.asp";//测试环境

 //var url = "http://www.yd-jxt.com/SyncTj/TYKQsync.asp";//测试环境


var urlImg = "https://i.yd-jxt.com/SyncTj/TYKQPicReceive.asp";//上传图片的地址

//var baseUrl = 'http://192.168.0.138:6011/api/'  //商机和订单的本地地址
//var baseUrl = 'https://i.yd-jxt.com/crmapi/api/'  //商机和订单的正式地址
var baseUrl = 'http://192.168.0.3:6011/api/'//商机和订单的测试地址
/*

/*
*url 接口地址
*methods 请求类型  get 或 post
*params 参数
*isLogin 是否是登录接口  如果是 则Entercode=md5(datatype + currentDate + miyao) 否则为Entercode=md5(Username + datatype + currentDate + miyao) 秘钥为 Miyao=HztyKQV1.0$20160113#CC
*datatype 接口类型（接口名称）
*/
import {hexMD5} from "./md5";
export function fetch(methods, params, datatype, isLogin, needUsername, hasPrefix) {
  return new Promise((res, rej) => {
    wx.request({
      url: hasPrefix ? (baseUrl + hasPrefix + datatype) : url, 
      method: methods,
      header: {
        'Content-Type': methods == "POST" ? "application/x-www-form-urlencoded" : "application/json" 
      },
      data: Object.assign(getMd5(datatype, isLogin, needUsername), params),  
      success: res,
      fail: rej
    })
  })
}


//post  请求
export function postFetch(methods, params, datatype,isLogin, needUsername) {
  return new Promise((res, rej) => {
    wx.request({
      url: url + '?datatype=' + datatype,
      method: "POST",
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: Object.assign(getMd5(datatype, isLogin, needUsername), params), 
      success: res,
      fail: rej
    })
  })
}





// 提交图片的接口
// params  接口参数
// path  图片路径
export function fetchImg (params,path) {
  var that = this;
  return new Promise((res, rej) => {
    wx.uploadFile({
      url: urlImg + `?Username=${wx.getStorageSync('userId')}&Entercode=${hexMD5(wx.getStorageSync('userId') + parseInt(new Date() / 1000) + "HztyKQV1.0$20160113#CC")}&currentDate=${parseInt(new Date() / 1000)}&Filenum=1`,
      filePath: path,
      name: 'file1', //这里根据自己的实际情况改
      header:"multipart/form-data",
      formData:params, //这里是上传图片时一起上传的数据
      success: res,
      fail: function(rej){
        console.log(rej,'error')
      }
    });
  })
}
/*
*datatype 接口类型（接口名称）
*isLogin 是否是登录接口  如果是 则Entercode=md5(datatype + currentDate + miyao) 否则为Entercode=md5(Username + datatype + currentDate + miyao) 秘钥为 Miyao=HztyKQV1.0$20160113#CC
*/ 
export function getMd5(datatype, isLogin,needUsername) {
  if (!isLogin) {
    var userId = wx.getStorageSync('userId')
  }
  if (datatype != ''){
    if (needUsername){
      return {
        Entercode: hexMD5((isLogin ? '' : userId) + datatype + parseInt(new Date() / 1000) + "HztyKQV1.0$20160113#CC"),
        datatype: datatype,
        currentDate: parseInt(new Date() / 1000),
      }
    }
    return {
      Entercode: hexMD5((isLogin ? '' : userId) + datatype + parseInt(new Date() / 1000) + "HztyKQV1.0$20160113#CC"),
      datatype: datatype,
      currentDate: parseInt(new Date() / 1000),
      Username: isLogin ? '' : userId
    }
  }else{
    return {
      Entercode: hexMD5(userId + parseInt(new Date() / 1000) + "HztyKQV1.0$20160113#CC"),
      currentDate: parseInt(new Date() / 1000),
      Username: isLogin ? '' : userId
    }
  }

  
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}


/*
*datatype 接口类型（接口名称）
*isLogin 是否是登录接口  如果是 则Entercode=md5(datatype + currentDate + miyao) 否则为Entercode=md5(Username + datatype + currentDate + miyao) 秘钥为 Miyao=HztyKQV1.0$20160113#CC
*/
// export function getParamsMd5(datatype, params) { 
//   let otherParams='';
//   console.log(params,7777777777)
//   for (let key in params) {

//     console.log(key, params[key]);
//     otherParams += `&${key}=${params[key]}`;
//   };
//   console.log(otherParams, 88888)
//   var userId = wx.getStorageSync('userId')
//   return `?Entercode=${hexMD5(userId + datatype + parseInt(new Date() / 1000) + "HztyKQV1.0$20160113#CC")}&datatype=${datatype}&currentDate=${parseInt(new Date() / 1000)}&Username=${userId}${otherParams}`
  
// }
    
