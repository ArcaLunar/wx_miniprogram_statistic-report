Component({
  data: {
    date: "", // 日期
    show: false,
  },
  methods: {
    /**
     * 日历相关
     */
    // 点击按钮显示日历
    onDisplay() {
      this.setData({ show: true });
    },
    // 关闭日历
    onClose() {
      this.setData({ show: false });
    },
    // 按年/月/日格式化日期
    formatDate(date) {
      date = new Date(date);
      return `${date.getYear() + 1900}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
    },
    // 确认选择日期，更新 page 的数据
    onConfirm(event) {
      this.setData({
        show: false,
        date: this.formatDate(event.detail),
      });
      console.log(this.data.date);
    },
  },
});
