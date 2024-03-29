// pages/main.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gridCol: 3,
    skin: false
  },
  showTopTips1 :function(){
    wx.navigateTo({
      url: '/pages/userinfo/userinfo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  showTopTips2: function () {
    wx.navigateTo({
      url: '/pages/kqlist/kqlist',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  showTopTips3: function () {
    wx.navigateTo({
      url: '/pages/ff/ff',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  showTopTips4: function () {
    wx.navigateTo({
      url: '/pages/guide/guide',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  showTopTips5: function () {
    wx.navigateTo({
      url: '/pages/map/map',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
})