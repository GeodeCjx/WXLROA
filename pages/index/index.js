//index.js
//获取应用实例
const app = getApp()
var md5 = require('../marks/md5.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],

  },

  //提交
  formSubmit: function(e) {
    console.log(1111 + e.detail.value);
    let value = e.detail.value;
    if (value == "" || value == undefined || value == null) {
      console.log("请输入账号密码");
    }
    let username = value.username;
    let password = value.password;
    password = md5.getmd5Value(password);

    wx.request({
      url: app.globalData.httpurlrest +"StudioRest/app_LoginByWeChart/query",
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userFlag: username,
        passWord: password,
        systemname: "longriseOA",
        systemAreaID: "00",

      },
      success: function(res) {
        console.log(res);
        if (res && res.data) {
          let result = res.data.result;
          if (result == 1) {
            let user = res.data.userifno;
            let userworkno = user.userworkno;
            let userflag = user.userflag;
            let facepicture = user.facepicture;
            let mobilephone = user.mobilephone;
            let emails = user.emails;
            let id = user.id;
            let bean = {
              userworkno: userworkno,
              userflag: userflag,
              mobilephone: mobilephone,
              mobilephone: mobilephone,
              emails: emails,
              facepicture: facepicture,
              id:id
            }
            wx.setStorage({
              key: 'user',
              data: bean
            });
            wx.showModal({
              title: '登陆成功',
              content: '绑定用户成功！',
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/main/main'
                  })

                } 
              }
            });
          } else if (result == -4) {
            wx.showToast({
              title: '用户密码输入错误',
              icon: 'success',
              duration: 2000
            })
          } else if (result == -2) {
            wx.showToast({
              title: '不存在该用户',
              icon: 'success',
              duration: 2000
            })
          }
        }
      }
    })
  },

  //清空
  formReset: function() {

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})