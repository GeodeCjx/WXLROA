var imaged = null;
var userss1 = {};
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    file:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    userss1 = wx.getStorageSync("user");
    that.setData({
      userinfo: userss1
    });
    if (userss1 != null && userss1.facepicture != null && null != JSON.parse(userss1.facepicture)) {
      var picdata = JSON.parse(userss1.facepicture);
      var picurl = app.globalData.httpurlimage +"LEAP/Download/" + picdata.nameedPath + "/" + picdata.name;
      console.log(picurl);
      that.setData({
        file: picurl,
      });
    }

  },

  uploads: function () {
    var that = this;
    wx.showLoading({
      title: '上传中...',
    });

    var bean = {
      userid: userss1.id,
    };    
    if (imaged && imaged.length >0){
      wx.uploadFile({
        url: app.globalData.httpurlrest + "/LROA/lroa_faceUp/query?bean=" + encodeURI(JSON.stringify(bean)),
        filePath: imaged[0],
        name: 'img',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
        },
        formData: {
          'user': 'longrise' //其他额外的formdata，可不写????
        },
        success: function (res) {
          var data = JSON.parse(res.data);
          if (data.result == 1) {
            var bn1 = {
              userid: userss1.id,
              facepicture: data.data
            }
            /**
             *附件上传成功后提交数据
             */
            that.submitdata(bn1);
          }
        },
      })
    }else{
      wx.showToast({
        title: '请先上传照片',
        icon: 'error',
        duration: 1000
      })
    }
   
  },

  submitdata(data){
    debugger
    let plugin = requirePlugin('routePlan');
    let key = '2YZBZ-5OJRJ-B4VFP-FVDSN-TVXEH-7OFKO';  //使用在腾讯位置服务申请的key
    let referer = '烈阳科技应用';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': '北京西站',
      'latitude': 39.894806,
      'longitude': 116.321592
    });
    wx.navigateTo({
      url: 'plugin://routePlan/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });

    var that = this;
    if (data) {
      wx.showLoading({
        title: '上传中...',
      });
      var bean = JSON.stringify(data);
      wx.request({
        url: app.globalData.httpurlrest + "/LROA/lroa_updateFaceData/query?par=" + encodeURI(bean),
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.statusCode == "200") {
            wx.showToast({
              title: '替换成功',
              icon: 'success',
              duration: 1000
            });
            var file = res.data;
            if(file){
              var use = wx.getStorageSync("user");
              use.facepicture = JSON.stringify(file);
              wx.setStorage({
                key: 'user',
                data: use
              });
            }
          }
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }
  },
  
    /**图片上传begin***********/

  ChooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {  
        imaged = res.tempFilePaths;
        this.setData({
          file: res.tempFilePaths
        })
      }
    });
  },
  ViewImageViewImage(e) {
    wx.previewImage({
      urls: this.data.file,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '烈焰之剑',
      content: '确定要删除你的帅照？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.setData({
            file: res.tempFilePaths
          })
        }
      }
    })
  },
  /**图片上传end***********/

})