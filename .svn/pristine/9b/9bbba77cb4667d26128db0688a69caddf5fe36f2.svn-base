Component({
  properties: {
    // 这里定义了list属性，属性值可以在组件使用时指定
    list: {
      type: Array,
      value: [],
    },
    key: {
      type: Number,
      value: 0,
    },
  },
  data: {
    // 这里是一些组件内部数据
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    index: -1 //选择的下拉列表下标-1,默认不选中
  },
  methods: {
    // 这里是一个自定义方法
    // 点击下拉显示框

    selectTap() {
      this.setData({
        show: !this.data.show
      });

    },

    // 点击下拉列表

    optionTap(e) {

      let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标

      this.setData({

        key: Index,

        show: !this.data.show

      });
      this.triggerEvent('getSelectedKey',Index) //getSelectedKey自定义名称事件，父组件中使用
    },
  }
})