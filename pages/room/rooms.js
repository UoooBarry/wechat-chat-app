// pages/rooms/rooms.js
const requireAuth = require('../../utils/auth');

Page({
  /**
   * Page initial data
   */
  data: {
    rooms: [],
  },
  joinRoom: (e) => {
    console.log('Join room', e.target.id);
    wx.redirectTo({
      url: '/pages/room/room?roomId=' + e.target.id,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function() {
    requireAuth();
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    var that =  this;
    wx.request({
      url: 'http://175.24.235.163:3000/api/room/',
      method: 'GET',
      success(res) {
        console.log(res.data);
        that.setData({
          rooms: res.data.rooms
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})