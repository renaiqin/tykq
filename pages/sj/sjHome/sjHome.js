// pages/sj/sjHome/sjHome.js
var app = getApp();
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SelectType: 1, // 1，我的商机，2，团队商机
    KeyWord: "", // 搜索框内容
    SellStepEnum: [], // 销售阶段
    list: [], // 商机列表
    PageIndex: 1, // 分页页数
    PageSize: 20, // 分页条数
    loadMore: true, // 用来控制分页加载频率
    keyInfo: { key1: null,}, // 用来纪录每个下拉框选中的索引
    listHeight: wx.getSystemInfoSync().windowHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDictionary('SellStepEnum'); // 销售阶段
    if (options.KeyWord) {
      this.setData({
        KeyWord: options.KeyWord
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSjList(1);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var sjAddOrEdit = wx.getStorageSync('sjAddOrEdit');
    if (!!sjAddOrEdit) {
      this.setData({
        loadMore: true,
        list: [],
      })
      this.getSjList(1);
    }
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
    console.log("滑动加载")
    this.getSjList();
  },

  /**
   * 获取商机列表
   */
  getSjList: function(page,type) {
    var { list, PageSize, PageIndex, KeyWord, loadMore, SellStepEnum, keyInfo, SelectType, } = this.data;
    if (!loadMore) {return;}
    wx.showLoading();
    let info = {
      KeyWord,
      PageSize,
      PageIndex: page || PageIndex,
      SelectType: type || SelectType,
    };
    if (typeof (keyInfo.key1) == 'number') {
      info['SellStep'] = [];
      info['SellStep'].push(SellStepEnum[keyInfo.key1].Value)
    }
    
    app.wxApi.BusinessList(info).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var page = info.PageIndex;
      if (ResultCode == 1) {
        wx.setStorageSync("sjAddOrEdit", false);
        this.setData({
          list: [...list,...Value.List]
        })
        if (Value.List.length >= this.data.PageSize) {
          page++;
          this.setData({
            PageIndex: page,
            loadMore: true,
          });
        } else {
          this.setData({
            loadMore: false,
          });
        }
      } else {
        app.showToast(ResultMessage);
      }
      setTimeout(() => {
        wx.hideLoading()
      },350)
    })
  },

  // 获取可枚举的属性
  getDictionary: function (key) {
    app.wxApi.GetDictionary({ key, }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        Value.unshift({ Des:'请选择',Value: 0})
        this.setData({ [key]: Value, });
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  /**
   * 商机列表tab切换
   */
  switchTab: function (e) {
    var SelectType = e.target.dataset.type;
    var keyInfo = { key1: null }
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setData({
        SelectType,
        keyInfo,
        loadMore: true,
        list: [],
      })
      this.getSjList(1, SelectType);
    },300)
  },

  /**
   * 搜索商机名称start
   */
  inputTyping: function (e) {
    this.setData({
      KeyWord: e.detail.value,
    })
  },

  toSearch: function () {
    this.setData({
      loadMore: true,
      list: [],
    })
    this.getSjList(1, this.data.SelectType);
  },
  /**
   * 搜索商机名称end
   */

  // 选中下拉框
  bindPickerChange: function (e) {
    var newKeyInfo = this.data.keyInfo;
    var key = parseInt(e.detail.value);
    var target = {
      'SellStepEnum': () => {
        newKeyInfo['key1'] = key;
        return newKeyInfo;
      },
    }
    var info = target[e.target.dataset.type]();
    this.setData({
      keyInfo: info,
      loadMore: true,
      PageIndex: 1,
      list: [],
    })
    this.getSjList();
  },

  // 跳转商机详情页面
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/sj/sjDetail/sjDetail?id=" + e.currentTarget.dataset.id
    })
  },

  // 跳转新建商机页面
  toAddSj: function () {
    wx.navigateTo({
      url: "/pages/sj/addSj/addSj"
    })
  },

  // 跟进商机
  followUpSj: function (e) {
    wx.navigateTo({
      url: "/pages/sj/followUp/followUp?id=" + e.currentTarget.dataset.id
    })
  },

  // 修改商机
  editSj: function (e) {
    wx.navigateTo({
      url: "/pages/sj/sjEdit/sjEdit?id=" + e.currentTarget.dataset.id
    })
  },


  // 删除商机
  delSj: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (sm) => {
        if (sm.confirm) {
          this.delSjSub(e.target.dataset.id);
        }
      }
    })
  },

  delSjSub: function (id) {
    wx.showLoading();
    app.wxApi.DeleteBusiness({id}).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var page = this.data.PageIndex;
      if (ResultCode == 1) {
        this.setData({
          loadMore: true,
          list: [],
        })
        this.getSjList(1);
      } else {
        app.showToast(ResultMessage);
      }
      setTimeout(() => {
        wx.hideLoading()
      }, 350)
    })
  },
})