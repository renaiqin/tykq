var app = getApp();
import formatTime from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diaryType:1,                           //1：日报   2：月报   3：周报
    partOne:'',                            //第一部分所写内容
    partTwo: '',                           //第二部分所写内容
    partThree: '',                         //第二部分所写内容
    partFour: '',                          //第二部分所写内容
    linkmanInfoText:'',                    //所选联系人显示字符串
    linkmanParams:'',                      //所选联系人要提交的参数
    submitButton:true,                     //是否可以提交 防止重复提交
    tomorrowTime:'',                       //明日时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let dd = new Date(); 
    dd.setDate(dd.getDate() + 1)
    if (options.diaryType){
      this.setData({
        diaryType: options.diaryType,
      })
    }
    this.setData({
      tomorrowTime: formatTime.formatTime(dd, false)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (wx.getStorageSync('partOne') != '') {
      this.setData({
        partOne: wx.getStorageSync('partOne')
      })
    } else {
      this.getData()
      
    }

    if (wx.getStorageSync('partTwo') != '') {
      this.setData({
        partTwo: wx.getStorageSync('partTwo')
      })
    }

    if (wx.getStorageSync('partThree') != '') {
      this.setData({
        partThree: wx.getStorageSync('partThree')
      })
    }

    if (wx.getStorageSync('partFour') != '') {
      this.setData({
        partFour: wx.getStorageSync('partFour')
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let linkmanStr = '',
      linkmanParams = '';
      
    app.globalData.writeDiary.linkMan.forEach(item => {
      if (item.checked) {
        linkmanStr += item.Xm + ',';
        linkmanParams += item.Username + ',';
      }
    })
    this.setData({
      linkmanInfoText: linkmanStr,
      linkmanParams: linkmanParams
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getPartone(e){
    this.setData({
      partOne: e.detail.value,
    })
    wx.setStorageSync('partOne', this.data.partOne)
  },
  getParttwo(e) {
    this.setData({
      partTwo : e.detail.value,
    })
    wx.setStorageSync('partTwo', this.data.partTwo)
  },
  getPartthree(e) {
    this.setData({
      partThree: e.detail.value,
    })
    wx.setStorageSync('partThree', this.data.partThree)
  },
  getPartfour(e) {
    this.setData({
      partFour: e.detail.value,
    })
    wx.setStorageSync('partFour', this.data.partFour)
  },
  //日报获取本人今日完成工作接口
  getMyQDWork(){
    app.wxApi.getMyQDWork({ Rdate: formatTime.formatTime(new Date())}).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          partOne: res.Value.FinishWork,
        })
      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 根据当前tab 请求相应的接口
  getData(){
   
    if (this.data.diaryType == 1){
      this.getMyQDWork()
    } else if (this.data.diaryType == 2){
      this.getMyDiaryWork();
    }
  },
  /**
 * 搜索
 */
  search(e) {
    this.setData({
      searchVal: e.detail.value
    })
    if (this.data.searchVal != '') {
      let resArr = [];
      this.data.addressList.find((item, index) => {
        if (item.Xm.indexOf(this.data.searchVal) > -1) {
          resArr.push(item)
        }
      })
      this.setData({
        addressList: resArr
      })
    } else {
      this.setData({
        addressList: this.data.baseAddressList
      })
    }

  },

  // 获取联系人 日报
  getMyAddressBook() {
    app.wxApi.getMyAddressBook().then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          addressList: res.Value,
          baseAddressList: res.Value
        })
      }
    })
  },
  //跳转到联系人
  renderlinkMan(){
    wx.redirectTo({
      url: '/pages/diary/linkMan/linkMan?diaryType=' + this.data.diaryType
    })
  },
  //提交
  submitDiary(e){
    app.wxApi.WeiXinUserFromIdAdd({ UserFromIdList: e.detail.formId }).then(res => {
      
    })
    this.setData({
      submitButton:false
    })
    if (this.data.partOne == '' || this.data.partTwo == '' || this.data.partThree == '' || this.data.partFour == ''){
      wx.showToast({
        title: '请填写内容',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        submitButton: true
      })
      return;
    }
    if (this.data.linkmanParams == '') {
      wx.showToast({
        title: '请选择联系人',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        submitButton: true
      })
      return;
    }
    if (this.data.diaryType == 1){//日报
      app.wxApi.SubmitDiary({
        Mail_num: wx.getStorageSync('mail_num'), 
        Xm: wx.getStorageSync('username'), 
        Rdate: formatTime.formatTime(new Date()), 
        FinishWork: this.data.partOne, 
        NoFinishWork: this.data.partTwo, 
        followUpWork: this.data.partThree, 
        subTotal: this.data.partFour,
        leadUsernames: this.data.linkmanParams,
        Num:0,
        Vid:'',
        Schoolname1:'',
        School:''
      }).then(res => {
        if (res.ResultCode == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: `/pages/diary/diaryDetail/diaryDetail?id=${res.Value}&tab=1`
          })
          wx.setStorageSync('partOne', '');
          wx.setStorageSync('partTwo', '');
          wx.setStorageSync('partThree', '');
          wx.setStorageSync('partFour', '');
          formatTime.initFun();
          this.setData({
            submitButton: true
          })
        }else{
          wx.showToast({
            title: res.ResultMessage,
            icon: 'none',
            duration: 2000
          })
          this.setData({
            submitButton: true
          })
        }
       
      })
    } else if (this.data.diaryType == 2){//周报
      app.wxApi.SubmitWeekReport({
        Mail_num: wx.getStorageSync('mail_num'),
        Xm: wx.getStorageSync('username'),
        RweekNum: this.getWeekOfYear(),
        Rdate: this.getMondy(),
        FinishWork: this.data.partOne,
        PlanNextWeek: this.data.partTwo,
        followUpWork: this.data.partThree,
        subTotal: this.data.partFour,
        leadUsernames: this.data.linkmanParams,
       
      }).then(res => {
        if (res.ResultCode == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: `/pages/diary/diaryDetail/diaryDetail?tab=2&id=${res.Value}`
          })
          wx.setStorageSync('partOne', '');
          wx.setStorageSync('partTwo', '');
          wx.setStorageSync('partThree', '');
          wx.setStorageSync('partFour', '');
          formatTime.initFun();
        } else {
          wx.showToast({
            title: res.ResultMessage,
            icon: 'none',
            duration: 2000
          })
        }
        this.setData({
          submitButton: true
        })
      })
    } else {//月报
      var myDate = new Date();
      app.wxApi.SubmitMonthReport({
        Mail_num: wx.getStorageSync('mail_num'),
        Xm: wx.getStorageSync('username'),
        Ryear: myDate.getFullYear(),
        Rmonth: myDate.getMonth()+1,
        Rdate: myDate.getFullYear() + '-' + (myDate.getMonth()+1) +'-' +'01',
        FinishWork: this.data.partOne,
        followUpWork: this.data.partTwo,
        questionDept: this.data.partThree,
        subTotal: this.data.partFour,
        leadUsernames: this.data.linkmanParams,

      }).then(res => {
        if (res.ResultCode == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: `/pages/diary/diaryDetail/diaryDetail?tab=3&id=${res.Value}`
          })
          wx.setStorageSync('partOne', '');
          wx.setStorageSync('partTwo', '');
          wx.setStorageSync('partThree', '');
          wx.setStorageSync('partFour', '');
          formatTime.initFun();
        } else {
          wx.showToast({
            title: res.ResultMessage,
            icon: 'none',
            duration: 2000
          })
        }

        this.setData({
          submitButton: true
        })
      })
    }
    
  },
  // 切换日志类型
  changeType(e){
    formatTime.initFun();
    this.setData({
      diaryType: e.currentTarget.dataset.type
    })
    let linkmanStr = '',
      linkmanParams = '';
    app.globalData.writeDiary.linkMan.forEach(item => {
      if (item.checked) {
        linkmanStr += item.Xm + ',';
        linkmanParams += item.Username + ',';
      }
    })
    this.setData({
      linkmanInfoText: linkmanStr,
      linkmanParams: linkmanParams
    })
    wx.setStorageSync('partOne', '');
    wx.setStorageSync('partTwo', '');
    wx.setStorageSync('partThree', '');
    wx.setStorageSync('partFour', '');
    this.setData({
      partOne: '',
      partTwo:'',
      partThree:'',
      partFour:''
    })
    this.getData();
    
  },
  //周报获取本人本周完成工作接口
  getMyDiaryWork(){
    app.wxApi.getMyDiaryWork({
      Rdate: this.getMondy()
    }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          partOne: res.Value.FinishWork,
        })
        
      } else {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  
  // getFirstDayOfWeek(month) {
    
  //   var now = new Date(); //当前日期 
  //   var nowDayOfWeek = now.getDay(); //今天本周的第几天 
    
  //   var nowDay = now.getDate(); //当前日 
  //   var nowMonth = now.getMonth(); //当前月
  //   console.log(nowDay, nowDayOfWeek, 777) 
  //   var nowYear = now.getFullYear(); //当前年 
  
  //   var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
  //   if (month) {
  //     return formatTime.formatTime(new Date(nowYear, nowMonth, '01'));
  //   }
  //   return formatTime.formatTime(weekStartDate);
  // },
  //获取周一日期
  getMondy(){
    var nowTemp = new Date();//当前时间
    var oneDayLong = 24 * 60 * 60 * 1000;//一天的毫秒数
    var c_time = nowTemp.getTime();//当前时间的毫秒时间
    var c_day = nowTemp.getDay() || 7;//当前时间的星期几
    var m_time = c_time - (c_day - 1) * oneDayLong;//当前周一的毫秒时间
    var monday = new Date(m_time);//设置周一时间对象
    var m_year = monday.getFullYear();
    var m_month = monday.getMonth() + 1;
    var m_date = monday.getDate();
    return m_year + '-' + m_month + '-' + m_date
  },
  //获取当前周
  getWeekOfYear(){
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), 0, 1);
    var dayOfWeek = firstDay.getDay();
    var spendDay = 1;
    if(dayOfWeek != 0) {
      spendDay = 7 - dayOfWeek + 1;
    }
    firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
    var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
    var result = Math.ceil(d / 7);
    return result + 1;
  },
  renderAdd(){
    wx.redirectTo({
      url: '/pages/diary/addPlan/addPlan'
    })
  }
})