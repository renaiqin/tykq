// pages/sj/addSj/addSj.js
import formatTime from "../../../utils/util.js"
var app = getApp();
var timer = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Id: null, // 商机id
    SJBH: null, // 商机编号
    SJlxid: null, // 商机分类id
    sjClassify: [], // 商机分类
    keyInfo: { key1: 0, key2: null, key3: null, key4: 0, key5: 0, }, // 用来纪录每个下拉框选中的索引
    SJName: '', // 商机名称
    ifHaveSchool: 1, // 是否现有学校
    schoolCode: '', // 学校编号
    schoolName: '', // 学校名称
    LinkMan1: '',
    LinkMan2: '',
    contactsList: [],
    SellStepEnum: [], // 销售阶段
    SellLinkWayEnum: [], // 联系情况
    SFTime: formatTime.formatTime(new Date()),
    SFAmount: 0, // 金额
    IfOK: 0, // 是否成单0，未成单，1，成单
    IfOKHidden: 0,
    Bz: '', // 商机备注
    showModal: false, // 显示modal弹窗
    single: false, // false 只显示一个按钮，如果想显示两个改为true即可
    TrueName: '', // 添加联系人---名称
    Tel: '', // 联系方式
    Intro: '', // 联系情况
    active: true, // 页面卡顿防止重复提交
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var { id } = options;
    if (!id) return;
    app.globalData.schoolInfo = {}; // 初始化学校信息
    this.setData({Id:id});
    this.getBusiness(id); // 获取商机详情
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getBusinessTypeList(); // 获取商机分类
    this.getLinkUserList(); // 获取商机联系人列表
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setStorageSync("sjAddOrEdit", false);
    var { schoolInfo } = app.globalData;
    if (schoolInfo.schoolname) {
      this.setData({
        schoolName: schoolInfo.schoolname,
        schoolCode: schoolInfo.school || '',
      })
      this.getLinkUserList();
    }
  },

  // 获取商机详情
  getBusiness: function (Id=0) {
    var newKeyInfo = this.data.keyInfo;
    var { SellStepEnum, SellLinkWayEnum, } = app.globalData;
    app.wxApi.GetBusiness({Id}).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        this.setData({
          SJBH: Value.SJBH,
          Bz: Value.Bz,
          SJName: Value.SJName,
          ifHaveSchool: Value.ifHaveSchool,
          SFTime: formatTime.formatTime(new Date(Value.SFTime)),
          schoolCode: Value.School || '',
          schoolName: Value.Schoolname,
          LinkMan1: Value.LinkMan1,
          LinkMan2: Value.LinkMan2,
          SJlxid: Value.SJlxid,
          SFAmount: Value.SFAmount,
          IfOK: Value.IfOK,
          IfOKHidden: Value.IfOK,
        })
        
        this.isNeddHttp(SellLinkWayEnum, 'SellLinkWayEnum', Value.SellLinkWay);// 联系情况
        this.isNeddHttp(SellStepEnum, 'SellStepEnum', Value.SellStep);// 销售阶段
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  // 跟进订单详情展示下拉框被选中的数据
  getSelectedKey: function (value, data, target) {
    var { keyInfo, } = this.data;
    var newKeyInfo = keyInfo;
    if (data.length == 0) return;
    var _obj = {
      'SellStepEnum': () => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].Value == value) {
            newKeyInfo['key4'] = i;
          }
        }
      },
      'SellLinkWayEnum': () => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].Value == value) {
            newKeyInfo['key5'] = i;
          }
        }
      },
    };
    _obj[target]();
    this.setData({
      keyInfo: newKeyInfo,
    })
  },

  // 获取可枚举的属性
  getDictionary: function (key,value) {
    app.wxApi.GetDictionary({ key, }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      if (ResultCode == 1) {
        Value.unshift({ Des: '请选择', Value: 0 })
        this.setData({ [key]: Value, });
        app.globalData[key] = Value;
        this.getSelectedKey(value, Value, key);
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  // 获取商机分类
  getBusinessTypeList: function () {
    app.wxApi.BusinessTypeList().then(res => {
      var { Value, ResultMessage, ResultCode } = res;
      var newKeyInfo = this.data.keyInfo;
      if (ResultCode == 1) {
        var sjClassify = [];
        Value.forEach((c,i) => {
          if (c.Id == this.data.SJlxid) {
            newKeyInfo['key1'] = i;
          }
          sjClassify.push({ name: `[${c.PType}]${c.PName}`, id: c.Id, });
        })
        this.setData({
          sjClassify,
          keyInfo: newKeyInfo,
        });
      } else {
        app.showToast(ResultMessage);
      }
    })
  },

  //避免多次请求造成资源浪费
  isNeddHttp: function (data, target,value) {
    if (data.length > 0) {
      this.setData({
        [target]: data,
      })
      this.getSelectedKey(value, data, target);
    } else {
      var info = {
        'SellStepEnum': () => {
          this.getDictionary('SellStepEnum',value);
        },
        'SellLinkWayEnum': () => {
          this.getDictionary('SellLinkWayEnum', value); 
        },
      }
      info[target]();
    }
  },

  // input键盘输入时触发
  bindInput: function (e) {
    var key = e.target.dataset.value,
      value = e.detail.value;
    this.setData({
      [key]: value,
    })
  },

  // 添加商机联系人
  addLinkUser: function () {
    var { schoolCode, TrueName, Tel, Intro, } = this.data;
    var data = {
      SchoolCode: schoolCode,
      TrueName,
      Tel,
      Intro,
    };
    if (TrueName == '') {
      app.showToast('请填写姓名!');
      return;
    }
    if (Tel == '') {
      app.showToast('请填写联系方式!');
      return;
    }
    if (Intro.length > 100) {
      app.showToast('输入的情况字数限制为100字!');
      return;
    }
    app.wxApi.AddLinkUser(data).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      app.showToast(res.ResultMessage);
      if (ResultCode == 1) {
        this.closeModal();
        this.initAddLinker();
        if (typeof (newKeyInfo.key2) == 'number') {
          newKeyInfo.key2++;
        }
        if (typeof (newKeyInfo.key3) == 'number') {
          newKeyInfo.key3++;
        }
        this.getLinkUserList();
      }
    })
  },

  // 获取商机联系人列表
  getLinkUserList: function () {
    app.wxApi.LinkUserList({ School: this.data.schoolCode }).then(res => {
      var { Value, ResultMessage, ResultCode, } = res;
      var newKeyInfo = this.data.keyInfo;
      if (ResultCode == 1) {
        var contactsList = [];
        Value.forEach((c,i) => {
          if (c.TrueName == this.data.LinkMan1) {
            newKeyInfo['key2'] = i;
          } else if (c.TrueName == this.data.LinkMan2) {
            newKeyInfo['key3'] = i;
          }
          contactsList.push({ name: `[${c.SchoolCode}]` + ' ' + c.TrueName + ' ' + c.Tel, TrueName: c.TrueName, Tel: c.Tel, });
        })
        this.setData({
          contactsList,
          keyInfo: newKeyInfo,
        });
      } else if (ResultCode == -2) {
        this.setData({ contactsList: [] });
      } else {
        app.showToast(res.ResultMessage);
      }
    })
  },

  // 是否现有学校 switch
  switchChange: function (e) {
    this.setData({
      ifHaveSchool: e.detail.value ? 1 : 0,
      schoolName: '',
    })
    if (!e.detail.value) {
      this.getLinkUserList();
    }
  },

  // 跳转学校列表页用于选择学校
  goToUrl: function (e) {
    var { url } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/components/${url}/${url}`
    })
  },

  // 选中下拉框
  bindPickerChange: function (e) {
    var newKeyInfo = this.data.keyInfo;
    var key = parseInt(e.detail.value);
    var target = {
      'classify': () => {
        this.regExpSjName(this.data.sjClassify[key].name);
        newKeyInfo['key1'] = key;
        return newKeyInfo;
      },
      'LinkMan1': () => {
        newKeyInfo['key2'] = key;
        return newKeyInfo;
      },
      'LinkMan2': () => {
        newKeyInfo['key3'] = key;
        return newKeyInfo;
      },
      'SellStepEnum': () => {
        newKeyInfo['key4'] = key;
        return newKeyInfo;
      },
      'SellLinkWayEnum': () => {
        newKeyInfo['key5'] = key;
        this.syncIFOK(key);
        return newKeyInfo;
      },
    }
    var info = target[e.target.dataset.type]();
    this.setData({
      keyInfo: info,
    })
  },

  // 正则匹配商机名称
  regExpSjName: function (name) {
    var SJName = name.match(/](\S*)/)[1];
    this.setData({
      SJName,
    });
  },

  // 当联系情况选择了已成单，是否成单也要同步成已成单
  syncIFOK: function (key) {
    this.setData({
      IfOKHidden: key == 11 ? 1: 0,
      IfOK: key == 11 ? 1 : 0,
    })
  },

  // 选择日期
  chooseDate: function (e) {
    this.setData({
      SFTime: e.detail.value,
    })
  },
  cancleDate: function () {
    console.log(2)
  },

  // 点击确定按钮的回调函数
  modalConfirm(e) {
    // 这里面处理点击确定按钮业务逻辑
    this.addLinkUser();
  },

  closeModal: function () {
    this.setData({
      showModal: false,
    })
  },

  showModal: function () {
    this.setData({
      showModal: true,
    })
  },

  // 初始化新增联系人参数
  initAddLinker: function () {
    this.setData({
      TrueName: '',
      Tel: '',
      Intro: '',
    })
  },
  
  // 是否成单
  radioChange: function (e) {
    this.setData({ IfOK: e.detail.value, });
  },

  // 提交商机
  formSubmit: function (e) {
    var {
      Id, SJBH, keyInfo,
      sjClassify, SJName,
      ifHaveSchool, schoolCode,
      schoolName, contactsList,
      SellStepEnum, SellLinkWayEnum,
      SFTime, SFAmount, Bz, IfOK,
    } = this.data;

    if (!SJBH) {
      app.showToast('请输入商机编号');
      return;
    }
    if (SJName == '') {
      app.showToast('请输入商机名称');
      return;
    }
    if (schoolName == '') {
      app.showToast('学校不存在');
      return;
    }
    if (Bz.length > 100) {
      app.showToast('备注字数不能大于100');
      return;
    }
    console.log(contactsList)

    let info = {
      Id,
      SJBH,
      SJlxid: typeof (keyInfo.key1) == 'number' ? sjClassify[keyInfo.key1].id : 0,
      SJName,
      ifHaveSchool,
      School: schoolCode, // 学校编号
      SchoolName: schoolName,
      LinkMan1: (typeof (keyInfo.key2) == 'number' && contactsList.length > 0) ? contactsList[keyInfo.key2].TrueName : '',
      LinkWay1: (typeof (keyInfo.key2) == 'number' && contactsList.length > 0) ? contactsList[keyInfo.key2].Tel : '',
      LinkMan2:(typeof (keyInfo.key3) == 'number' && contactsList.length > 0) ? contactsList[keyInfo.key3].TrueName : '',
      LinkWay2:(typeof (keyInfo.key3) == 'number' && contactsList.length > 0) ? contactsList[keyInfo.key3].Tel : '',
      SellStep: typeof (keyInfo.key4) == 'number' ? SellStepEnum[keyInfo.key4].Value : '',
      SellLinkWay: typeof (keyInfo.key5) == 'number' ? SellLinkWayEnum[keyInfo.key5].Value : '',
      SFTime, // 预测时间
      SFAmount, // 销售预测金额
      Bz, // 商机描述
      IfOK, // 是否成单
    };
    !!timer && clearTimeout(timer);
    timer = setTimeout(() => {
      if (this.data.active) {
        this.setData({
          active: false,
        })
        app.wxApi.UpdateBusiness(info).then(res => {
          var { ResultMessage, ResultCode, } = res;
          app.showToast(ResultMessage);
          if (ResultCode == 1) {
            wx.setStorageSync("sjAddOrEdit", true);
            setTimeout(() => {
              wx.navigateBack();
            }, 300)
          } else if (ResultCode == -99) { // 编号重复，重新获取
            this.getBusinessNum();
          }
          setTimeout(() => {
            this.setData({ active: true, })
          }, 300)
        })
      }
    },500)
  },
})