// pages/device/wx/wxlist/wxList.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,// 0：待接单 1：接单 2：已完成 ,
    pageSize:10,
    pageIndex:1,
    totalCount:0,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
      pageIndex: 1,
      totalCount: 0,
      list: [],
    })
    this.MaintainEquipmentList();
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
  // 跳转到接单界面
  orderReceiving(e) {
    if(this.data.tab == 0){
      wx.navigateTo({
        url: `/pages/device/wx/orderReceiving/orderReceiving?id=${e.currentTarget.dataset.id}`,
      })
    } else if (this.data.tab == 1){
      wx.navigateTo({
        url: `/pages/device/wx/wxEnter/wxEnter?id=${e.currentTarget.dataset.id}`,
      })
    }
    
  },
  changeTab(e){
    this.setData({
      tab: e.target.dataset.tab,
      list:[],
      pageIndex:1,
    })
    this.MaintainEquipmentList();
  },
  //获取维修列表
  MaintainEquipmentList(){
    const {pageIndex,pageSize,tab} = this.data
    app.device.MaintainEquipmentList({ PageIndex: pageIndex, pageSize: pageSize, TakeOrderState:tab}).then(res=>{
      const { Value, ResultCode, ResultMessage} = res;
      if (ResultCode == 1){
        this.setData({
          list: this.data.list.concat(Value.List),
          totalCount: Value.TotalItemCount
        })
      }else{
        wx.showToast({
          title: ResultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //加载更多
  addMore(){
    if (this.data.totalCount <= this.data.list.length) return;
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    this.MaintainEquipmentList()
  },
  //跳转到详情
  deviceDetail(e){
    wx.navigateTo({
      url: `/pages/device/wx/wxDetail/wxDetail?id=${e.currentTarget.dataset.id}`,
    })
  }
})