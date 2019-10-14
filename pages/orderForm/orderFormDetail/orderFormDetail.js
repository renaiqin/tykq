// pages/orderForm/orderFormDetail/orderFormDetail.js
import formatTime from "../../../utils/util.js"
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Id: null, // 订单id
    type: 1, // // 1，我的，2，待审批，3，学校
    userName: '', // 用户code
    Index: 0, // tab
    info: {},
    title: '订单详情',
    swiperH: 400,
    Reason: '',// 备注
    IfAudit: 0, // 0,审批中，1，已同意，2，已拒绝
    hidden: true, // 控制modal的显隐
    orderAuditListBool: true, // 审批记录中有已同意的流程将不能在编辑此订单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var { id,type } = options;
    if (!id) return;
    this.setData({ Id: id, userName: wx.getStorageSync('userId'), type, });
    this.getOrderDetail(id);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var DDAddOrEdit = wx.getStorageSync('DDAddOrEdit');
    if (!!DDAddOrEdit) {
      this.getOrderDetail(this.data.Id);
    }
  },

  // swiper高度自适应
  autoSwiperHeight: function (i) {
    //创建节点选择器
    const query = wx.createSelectorQuery()
    query.select(`#demo${i}`).boundingClientRect()
    query.exec((res) => {
      this.setData({
        swiperH: res[0] ? res[0].height : 1320,
      })
    })
  },

  // 获取订单详情
  getOrderDetail: function (Id = 0) {
    wx.showLoading();
    app.wxApi.OrderDetails({ Id }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        this.setData({ info: Value })
        wx.setNavigationBarTitle({ title: Value.DDName })
        app.globalData.DDDetailInfo = Value;
        wx.hideLoading();
        setTimeout(() => {
          this.autoSwiperHeight(0);
        }, 1000)
        if (Value.OrderAuditList && Value.OrderAuditList.length > 0) {
          for (var i = 0, list = Value.OrderAuditList; i < list.length; i++){
            if (list[i].IfAudit == 1) {
              this.setData({ orderAuditListBool: false })
              return;
            }
          }
        }
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  // tab切换
  switchTab: function (e) {
    var Index = e.currentTarget.dataset.type;
    this.autoSwiperHeight(Index);
    this.setData({
      Index,
    })
  },

  bindchange: function (e) {
    var Index = e.detail.current;
    this.autoSwiperHeight(Index);
    this.setData({
      Index,
    })
  },

  // 跳转路由
  goToUrl: function (e) {
    var { url } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/orderForm/${url}/${url}?id=${this.data.Id}`
    })
  },

  // 同意，拒绝
  toggleModal: function (e) {
    var { audit } = e.currentTarget.dataset;
    this.setData({
      hidden: !this.data.hidden,
      IfAudit: parseInt(audit),
    }); 
  },

  confirm: function () {
    var { info, IfAudit, Reason, } = this.data;
    var data  = {
      DDBH: info.DDBH,
      id: info.OrderAuditNow.Id,
      IfAudit: IfAudit,
      Reason: Reason,
    };
    if (IfAudit == 2 && Reason == '') {
      app.showToast('请输入拒绝理由!');
      return;
    }
    var newInfo = info;
    app.wxApi.OrderAudit(data).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      app.showToast(ResultMessage);
      if (ResultCode == 1) {
        newInfo['IfAudit'] = IfAudit;
        this.setData({
          hidden: !this.data.hidde,
          info: newInfo,
        });
        wx.setStorageSync('DDAddOrEdit',true)
      }
    })
  },

  bindInput: function (e) {
    var key = e.target.dataset.value,
       value = e.detail.value;
    this.setData({
      [key]: value,
    })
  },
})