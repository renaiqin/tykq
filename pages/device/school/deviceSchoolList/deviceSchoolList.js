// pages/device/school/deviceSchoolList/deviceSchoolList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolCode: '',//学校代码
    schoolname: '',//学校名称
    deviceList: [],//学校概况
    pageindex: 1,//页数
    pagesize: 10,//条数
    tyValus:'',//
    totalCount:'',//总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      schoolCode: options.schoolcode,
      schoolname: options.schoolname,
      tyValus: options.tyValus
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      deviceList:[],
      pageindex:1,
      totalCount:0
    })
    this.SchoolEquipmentList();
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
  //添加设备
  addDevice(){
    wx.navigateTo({
      url: `/pages/device/school/addDevice/addDevice?schoolcode=${this.data.tyValus}&schoolname=${this.data.schoolname}`
    })
  },
  //跳转到报修
  repairs(e){
    console.log(e.currentTarget)
    wx.navigateTo({
      url: `/pages/device/school/repairsDevice/repairsDevice?schoolcode=${this.data.schoolCode}&schoolname=${this.data.schoolname}&kqjid=${e.currentTarget.dataset.kqjid}`
    })
  },
  deviceDetail(e) {
    wx.navigateTo({
      url: `/pages/device/school/deviceDetail/deviceDetail?kqjid=${e.currentTarget.dataset.kqjid}&type=2&schoolcode=${this.data.tyValus}&schoolname=${this.data.schoolname}`
    })
  },
  deviceEdit(e) {
    wx.navigateTo({
      url: `/pages/device/school/deviceDetail/deviceDetail?schoolcode=${this.data.tyValus}&schoolname=${this.data.schoolname}&kqjid=${e.currentTarget.dataset.kqjid}&type=1`
    })
  },
  //跳转到帮助
  deviceHelp(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: `/pages/device/noteBook/noteBook?schoolcode=${this.data.tyValus}&schoolname=${this.data.schoolname}&kqjid=${e.currentTarget.dataset.kqjid}&typename=${e.currentTarget.dataset.typename}&equipmentCode=${e.currentTarget.dataset.equipmentcode}`
    })
  },
  // 获取设备列表
  SchoolEquipmentList(){
    app.device.SchoolEquipmentList({ SchoolCode: this.data.tyValus, PageIndex: this.data.pageindex, PageSize :this.data.pagesize }).then(res => {
      if (res.ResultCode == 1) {
        this.setData({
          deviceList: this.data.deviceList.concat(res.Value.List),
          totalCount: res.Value.TotalItemCount,
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
  addMore(){
   
    if (this.data.totalCount <= this.data.deviceList.length) return;
    this.setData({
      pageindex: this.data.pageindex + 1
    })
    this.SchoolEquipmentList()
  }
})