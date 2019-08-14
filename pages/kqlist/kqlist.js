const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
     var userinfo = wx.getStorageSync("user");
     if(userinfo == null || userinfo == "" || userinfo == "undefined"){
       this.setData = ({
         array: []
       });
       return false;
     }
  
    var bean ={
      userid: userinfo.id
    };
     wx.request({
       url: app.globalData.httpurlrest+"/LROA/LROAsearchremote/query",
       method:"post",
       header: {
         'Content-Type': 'application/json'
       },

       data: {
         par: bean
       },
       success: function (res) {
         if (res.data != null && res.data.result != null && res.data.result.length > 0) {
           that.setData({
             array: res.data.result
           });
         }
       },
       error: function (res) {

       }
     }) 

  },
  showModal:function(arg){
    console.log(arg);
    var data = arg.currentTarget.dataset.dtas;
    var photo = "";
    if (data.remotephoto !=null){
      photo = JSON.parse(data.remotephoto);
      photo = app.globalData.httpurlimage + "LEAP/Download/" + photo.nameedPath + "/" + photo.name;

      console.log(photo);
    }
     
    this.setData({
      photo: photo,
      targetData: arg.currentTarget.dataset.dtas,
      modalName: "Image"
    })
  },

  hideModal:function(arg){
    this.setData({
      modalName: null
    })
  }, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})