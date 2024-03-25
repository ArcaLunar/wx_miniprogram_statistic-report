Component({
  methods: {
    redirectToPage: function () {
      wx.navigateTo({
        url: "/pages/fillin/fillin",
      });
      console.log("redirecting");
    },
    exportExcel: function () {
      // 导出Excel的逻辑代码
      // ...
    },
  },
});
