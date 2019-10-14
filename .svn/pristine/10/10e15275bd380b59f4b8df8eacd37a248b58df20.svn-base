var app = getApp();
import formatTime from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 操作方式
    handelArr:[],
    handelIndex:0,
    //负责人数组
    principalIndex:0,
    linkMan: [],

    //完成情况
    items: [
      { name: '1', value: '已完成', checked: true },
      { name: '0', value: '未完成', checked: false },
    ],
    startTime: formatTime.formatTime(new Date()),      //开始时间
    endTime: formatTime.formatTime(new Date()),        //结束时间
    SchoolFlowLinkId: '',
    flowDetail:[],
    ycReason:'',//延迟原因
    sm:'',//说明
    sjday:'',//实际完成天数
    yjday:'',//预计完成天数
    handelType:'',//操作方式
    pic:'',//图片信息
    fzr:{},//负责人
    nextLink:[],//下一环节数组
    ifEnd :1,//是否完成
    NextFlowLinkList:[],//预计后续环节数组
    SchoolFlowId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      SchoolFlowLinkId: options.id,
      SchoolFlowId: options.SchoolFlowId
    })
    this.TaskTeacherList();
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.TaskFlowLinkDetails();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  radioChange: function (e) {
    this.setData({
      ifEnd:e.detail.value
    })
  },
  //组件调用的返回图片信息
  getPicList(pic) {
    this.setData({
      pic:pic.detail[0].val
    })
  },
  chooseDate(e) {
    let dateType = e.target.dataset.datetype;
    if (dateType == 1) {  //开始时间
      this.setData({
        startTime: e.detail.value,
      })
    } else {
      if (this.compareDate(this.data.startTime, e.detail.value)) {
        wx.showToast({
          title: '结束时间不能小于开始时间',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      this.setData({
        endTime: e.detail.value,
        currentPage: 1
      })
    }
   
  },
  // 两个日期进行比较
  compareDate(date1, date2) {
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if (oDate1.getTime() > oDate2.getTime()) {
      return true;
    } else {
      return false;
    }
  },
  //提交
  submitButton(){
    if (this.data.handelType == '') {
      wx.showToast({
        title: '操作方式不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
   
    let params = {
      SchoolFlowLinkId: this.data.SchoolFlowLinkId ,
      OpMode: this.data.handelType ,
      HjFj :this.data.pic,
      Fzr: this.data.fzr.Fzr,
      FzrUsername: this.data.fzr.FzrUsername,
      Stime: this.data.startTime,
      Etime: this.data.ifEnd == 0 ? '' : this.data.endTime,
      SjFDays: this.data.ifEnd == 0 ? '' : this.data.flowDetail.SjFDays,
      IfEnd :this.data.ifEnd,
      Reason: this.data.ycReason,
      Bz: this.data.sm,
      NextFlowLinkList: this.data.ifEnd == 0 ? '[]' : JSON.stringify(this.data.nextLink),
      PredictFlowLinkList: JSON.stringify(this.data.PredictFlowLinkList),
    }
    app.task.TaskFlowLinkCheckIn(params).then(res => {
      if (res.ResultCode == 1) {
        wx.showToast({
          title: res.ResultMessage,
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: `/pages/task/taskDetail/taskDetail?id=${this.data.SchoolFlowId}`,
        })
      }else{
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //操作方式改变
  bindPickerhandel(e){
    this.setData({
      handelIndex: e.detail.value,
      handelType: this.data.handelArr[e.detail.value]
    })
  },
  //选择负责人
  bindPickerfzr(e) {
    this.setData({
      ['fzr.FzrUsername']: e.detail.value == 0 ? '' : this.data.linkMan[e.detail.value].Code,
      ['fzr.Fzr']: e.detail.value == 0 ? '' : this.data.linkMan[e.detail.value].MailNum + ',' + this.data.linkMan[e.detail.value].Name,
      principalIndex: e.detail.value,
    })
  },
   //选择下一环节负责人
  bindPickerNextFzr(e){
    let index = e.currentTarget.dataset.index,
      arrIndex = e.detail.value;
    this.setData({
      [`nextLink[${index}].Fzr`]:arrIndex == 0 ? '' : this.data.linkMan[arrIndex].MailNum + ',' + this.data.linkMan[arrIndex].Name, 
      [`nextLink[${index}].FzrUsername`]: arrIndex == 0 ? '' : this.data.linkMan[arrIndex].Code,
      [`nextLink[${index}].index`]: arrIndex,
    })
  },
  //列表流程详情
  TaskFlowLinkDetails() {
    app.task.TaskFlowLinkDetails({ SchoolFlowLinkId: this.data.SchoolFlowLinkId }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          flowDetail: res.Value,
          nextLink:[],
          PredictFlowLinkList: res.Value.PredictFlowLinkList == null ? [] : res.Value.PredictFlowLinkList
        })
        let temp = [];
        this.data.PredictFlowLinkList.forEach((item, index) => {
          if (item.YjStime == '') {
            this.setData({
              [`PredictFlowLinkList[${index}].YjStime`]: formatTime.formatTime(new Date())
            })
          }
          if (item.YjEtime == '') {
            this.setData({
              [`PredictFlowLinkList[${index}].YjEtime`]: formatTime.formatTime(new Date())
            })
          }
        })
        if (res.Value.NextFlowLinkList != null){
          res.Value.NextFlowLinkList.forEach((item, index) => {
            for (let i = 0; i < this.data.linkMan.length; i++) {
              if (item.FzrUsername != '' && item.FzrUsername != null) {//当下一环节有值时  找出对应负责人的index
                if (this.data.linkMan[i].Code == item.FzrUsername) {
                  temp.push({ index: i, Fzr: item.Fzr, nexthjName: item.NextHjName, NextId: item.NextId, FzrUsername: item.FzrUsername })
                
                  return;
                }
                
              } else {
                temp.push({ index: 0, Fzr: '', nexthjName: item.NextHjName, NextId: item.NextId, FzrUsername: '' })
                return;
              }
            }
          })
        }
        this.setData({
          ['fzr.FzrUsername']: res.Value.Fzr == '' ? this.data.linkMan[0].Code : res.Value.FzrUsername,
          ['fzr.Fzr']: res.Value.Fzr == '' ? this.data.linkMan[0].MailNum + ',' + this.data.linkMan[0].Name : res.Value.Fzr,
          handelArr: res.Value.OpMode == '' || res.Value.OpMode == null ? '' : res.Value.OpMode.split('|'),
          nextLink: temp,
          handelType: res.Value.OpMode == '' || res.Value.OpMode == null ? '' : res.Value.OpMode.split('|')[0],
        })
        for (let i = 0; i < this.data.linkMan.length;i++){
          if (this.data.linkMan[i].Code == res.Value.FzrUsername) {
            this.setData({
              ['fzr.FzrUsername']: res.Value.FzrUsername,
              ['fzr.Fzr']: res.Value.Fzr,
              principalIndex: i
            })
            return;
          } else {
            this.setData({
              ['fzr.FzrUsername']: this.data.linkMan[0].Code,
              ['fzr.Fzr']: this.data.linkMan[0].MailNum + ',' + this.data.linkMan[0].Name,
              principalIndex: 0
            })
          }
        }
       
      }else{
        wx.showToast({
          title: res.ResultMessage,
          icon: 'none',
          duration: 2000
        })
        setTimeout( ()=>{
          wx.redirectTo({
            url: `/pages/task/taskDetail/taskDetail?id=${this.data.SchoolFlowId}`,
          })
        },2000)
         
       
      }
    })
  },
  // input/textarea键盘输入时触发
  bindInput: function (e) {
    var key = e.target.dataset.value,
      value = e.detail.value;
    this.setData({
      [key]: value,
    })
  },
   

  //获取流程负责人
  TaskTeacherList(){
    app.task.TaskTeacherList().then(res => {
      if (res.ResultCode == 1) {
        res.Value.unshift({
          Code: "",
          Dept: "",
          MailNum: "",
          Name: "请选择（非必选）"
        })
        this.setData({
          linkMan: res.Value
        })
      }
    })
  },
  //预计流程输入完成天数
  bindInputYj(e){
    let index = e.currentTarget.dataset.id;
    this.setData({
      [`PredictFlowLinkList[${index}].YjFDays`]: e.detail.value
    })
  },
  chooseDateYj(e){
    let index = e.currentTarget.dataset.id,
      value = e.detail.value,
      dateType = e.currentTarget.dataset.datetype;

    if (dateType == 1){
      this.setData({
        [`PredictFlowLinkList[${index}].YjStime`]: value 
      })
    }else{
      if (this.compareDate(this.data.PredictFlowLinkList[index].YjStime, e.detail.value)) {
        wx.showToast({
          title: '结束时间不能小于开始时间',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      this.setData({
        [`PredictFlowLinkList[${index}].YjEtime`]: value
      })
    }
   
  }
})