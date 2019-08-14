
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userinfo: wx.getStorageSync("user")
    });
  },
  jiesuo: function(){
    var thas = this;
    wx.showModal({
      title: '取消用户绑定？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          thas.removeUser();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  removeUser: function(){
    wx.removeStorage({
      key: 'user',
      success: function (res) { 
        wx.redirectTo({
          url: '/pages/index/index',
        })
      },
    })
  }

})