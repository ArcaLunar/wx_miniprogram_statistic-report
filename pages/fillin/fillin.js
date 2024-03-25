Component({
  data: {
    photoList: [
      {
        url: "https://img.yzcdn.cn/vant/leaf.jpg",
        name: "图片1",
      },
    ],
  },
  methods: {
    afterRead(event) {
      const { file } = event.detail;
      var upTask = wx.uploadFile({
        url: "",
        filePath: file.url,
        name: "pic",
        formData: { user: "test" },
        success: (result) => {
          const { photoList = [] } = this.data;
          photoList.push({ ...file, url: result.data, deletable: true });
          this.setData({ photoList });
        },
        fail: () => {},
        complete: () => {},
      });
    },
  },
});
