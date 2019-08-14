// pages/map/map.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var loca;
var localhotion;
Page({
  data: {
    Height: 0,
    scale: 13,
    latitude: "",
    longitude: "",
    markers: [],
    isTrue: true,
    circles: []
  },

  onLoad: function() {
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    })

    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        localhotion = "'" + res.latitude + "," + res.longitude+"'";
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: "../images/map.png",

          }],
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            // color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 3000,
            strokeWidth: 1
          }]
        })
      }
    });

    qqmapsdk = new QQMapWX({
      key: '2YZBZ-5OJRJ-B4VFP-FVDSN-TVXEH-7OFKO'
    });
  },


  search: function (e) {
    console.log(1111 + e.detail.value);
    let value = e.detail.value;
    var _this = this;    // 调用接口
    qqmapsdk.search({
      keyword: 'kfc',
      //搜索关键词
      location: '30.37559,114.32168',
      //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调

        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中

            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "/resources/my_marker.png", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中

          markers: mks
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  cover_image_click() {
    var _this = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: "../images/map.png",

          }],
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            // color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 3000,
            strokeWidth: 1
          }]
        })
      }
    })

  },

  regionchange(e) {
    console.log("regiοnchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    console.log(e.markerId)

    wx.showActionSheet({
      itemList: ["A", "B", "c", "B", "B"],
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.currentTarget.id === "jian") {
      that.setData({
        scale: --this.data.scale
      })
    } else {
      that.setData({
        scale: ++this.data.scale
      })
    }


  },


})