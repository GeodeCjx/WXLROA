//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    index:1
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      index: this.data.data+10
    })
  }
})
