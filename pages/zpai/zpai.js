// pages/zpai/zpai.js
var qq = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp();
var qqmap;
var subdata = {};
var userss = {};
var imaged = null;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    mode: "scaleToFill",
    src: "../images/dhy02.jpg",
    user: {},
    countries: [{
      "partname": "加载中..."
    }],
    countryIndex: 0,
    imgList: [],

    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },

  bChange: function(e) {
    this.setData({
      accountIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.towerSwiper('swiperList');
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    var that = this;
    userss = wx.getStorageSync("user");
    subdata.userid = userss.id;
    subdata.userflag = userss.userflag;
    subdata.workno = userss.userworkno;
    subdata.remotetype = null;
    if (userss) {
      that.setData({
        user: userss
      });
    }
    this.initData();
  },

  loadModal: function() {
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function() {
      wx.hideLoading()
    }, 1000)
  },

  initData: function() {
    this.initAddress();
    this.initUserAddress();
  },

  initAddress: function() {
    var that = this;
    var bean = {
      userid: userss.id
    };
    wx.request({
      url: app.globalData.httpurlrest+"LROA/lroa_searcHumanLroadala/query",
      // url: "http://192.168.5.201:8081/LROA/restservices/LROA/lroa_searcHumanLroadala/query",
      method: "post",
      header: {
        'Content-Type': 'application/json'
      },

      data: {
        par: bean
      },
      success: (res) =>  {
        if (res.data != null && res.data != null) {
          var arry = [];
          for (var i = 0; i < res.data.length; i++) {
            arry[i] = res.data[i];
          }
            
          that.setData({
            countries: arry
          });
        }
      },
      error: function(res) {

      }
    })
  },

  initUserAddress: function() {
    var userinfo = wx.getStorageSync("user");
    if (userinfo === null || userinfo === undefined || userinfo === '') {
      wx.showModal({
        content: '请先绑定用户!!',
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }
        }
      })
    }
    if (userinfo){
      if (userinfo.facepicture === null || userinfo.facepicture === undefined || userinfo.facepicture === '') {
        wx.showModal({
          content: '请先上传自拍照用于人脸对比!!',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/ff/ff'
              })
            }
          }
        })
      }
    }

    var that = this;

    // 实例化腾讯地图API核心类
    qqmap = new qq({
      key: 'DUMBZ-RFTKO-QDBWQ-S3TIH-IXKK2-7CFD4'
    });

    //1、获取当前位置坐标
    wx.getLocation({
      type: 'gcj02', //gcj02  wgs84
      success: function(res) {

        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(addressRes) {
            console.log(addressRes);
            //获取省市区 用于查询常用地址
            var dkaread = addressRes.result.address_component;
            var dkdata = {
              "province": dkaread.province,
              "city": dkaread.city,
              "county": dkaread.city == "深圳市" ? dkaread.district : ""
            };
            var addr = addressRes.result.formatted_addresses.recommend;
            subdata.remoteaddress = addr;
            subdata.gisp_x = addressRes.result.location.lat;
            subdata.gisp_y = addressRes.result.location.lng;
            that.setData({
              address: addr
            });
          }
        })
      }
    })
  },

  /**图片上传begin***********/

  ChooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera','album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          imaged = res.tempFilePaths;
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImageViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
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
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**图片上传end***********/

  /*** 提交人脸识别**/
  submit: function(e) {
    var that = this;
    wx.showLoading({
      title: '提交中...',
    });
    var data = {
      "userid": userss.id
    };
    if (imaged && imaged.length > 0) {
      wx.uploadFile({
        url: app.globalData.httpurlrest +"/LROA/lroa_FaceMatch/query?bean=" + encodeURI(JSON.stringify(data)),
        filePath: imaged[0],
        name: 'img',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
        },
        formData: {
          'user': 'longrise' //其他额外的formdata，可不写????
        },
        success: function(res) {
          var data = JSON.parse(res.data);
          if (data.result == 1) {
            var phdata = JSON.parse(data.data);
            subdata.remotephoto = data.data;
            console.log(subdata);
            /**
             *附件上传成功后提交数据
             */
            that.submitdata(subdata);
          } else {
            var tip = "人脸识别失败";
            if (res.data == 1) {
              tip = "活体检测通过";
            } else if (res.data == 2) {
              tip = "活体检测分数过低，请将整个脸部对准扫描窗口";
            } else if (res.data == 3) {
              tip = "人脸有被遮挡，请勿遮挡脸部";
            } else if (res.data == 4) {
              tip = "人脸模糊，请将脸部调整清晰";
            } else if (res.data == 5) {
              tip = "人脸光照不好，请移至光线较好处";
            } else if (res.data == 6) {
              tip = "人脸不完整，请将整个脸部对准扫描窗口";
            } else if (res.data == 7) {
              tip = "图片中没有人脸，请将整个脸部对准扫描窗口";
            } else if (res.data == 8) {
              tip = "网络出现故障，请调整好网络重试";
            } else if (res.data == 9) {
              tip = "请将整个脸部对准扫描窗口再次重试";
            } else if (res.data == 10) {
              tip = "活体检测分数过低，请将整个脸部对准扫描窗口";
            } else if (res.data == 11) {
              tip = "左眼遮挡程度过高，请勿遮挡左眼";
            } else if (res.data == 12) {
              tip = "右眼遮挡程度过高，请勿遮挡右眼";
            } else if (res.data == 13) {
              tip = "左脸遮挡程度过高，请勿遮挡左脸";
            } else if (res.data == 14) {
              tip = "右脸遮挡程度过高，请勿遮挡右脸";
            } else if (res.data == 15) {
              tip = "下巴遮挡程度过高，请勿遮挡下巴";
            } else if (res.data == 16) {
              tip = "鼻子遮挡程度过高，请勿遮挡鼻子";
            } else if (res.data == 17) {
              tip = "嘴巴遮挡程度过高，请勿遮挡嘴巴";
            } else if (res.data == 18) {
              tip = "自拍照片对比不通过，请重新拍照重试";
            } else if (res.data == 19) {
              tip = "人脸对比分数过低，请检查上传证照是否完整清晰或再次拍照重试";
            } else if (res.data == 19) {
              tip = "检测用户未上传证照，请先行上传证照";
            } else if (res.data == 99) {
              tip = "系统繁忙，请稍后再次打卡";
            } else if (res.data == 100) {
              tip = "活体检测未通过，请将整个脸部对准扫描窗口重试";
            } else if (res.data == 101) {
              tip = "系统繁忙，请整个脸部对准扫描窗口再次打卡";
            } else if (res.data == 102) {
              tip = "活体检测未通过，请将整个脸部对准扫描窗口重试";
            } else if (res.data == 103) {
              tip = "系统繁忙，请整个脸部对准扫描窗口再次打卡";
            } else if (res.data == 104) {
              tip = "活体检测未通过，请将整个脸部对准扫描窗口重试";
            };
          }
          wx.hideLoading();
          wx.showModal({
            content: tip,
            showCancel: false,
          });
        }
      })
    } else {
      wx.showToast({
        title: '请先上传照片',
        icon: 'success',
        duration: 1000
      })
    }

  },


  submitdata: function(data) {
    var that = this;
    if (data.remotephoto) {
      var bean = JSON.stringify(data);
      wx.request({
        url: app.globalData.httpurlrest+"StudioRest/app_WeChartRemote/query?bean=" + encodeURI(bean),
        //url: getApp().globalData.httpurlrest + 'StudioRest/app_WeChartRemote/query?bean=' + encodeURI(JSON.stringify(data)),
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.statusCode == "200") {
            wx.showToast({
              title: '签到成功',
              icon: 'success',
              duration: 1000
            });
          }
          that.setData({
            imgList: ""
          })
        },
        fail: function(res) {
          console.log(res);
        }
      });
    }
  },


 /*** 图片轮播**/

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }







})