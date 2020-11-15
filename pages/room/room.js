// pages/room/room.js
const io = require('weapp.socket.io');
let socket;
Page({
  /**
   * Page initial data
   */
  data: {
    messages: [],
    message: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const room_id = options.roomId;
    const access_token = wx.getStorageSync('access_token');
    socket = io('http://175.24.235.163:3001/');

    const that = this;

    //Connect to the sokcet
    socket.on("connect", () => {
      socket
          .emit("authenticate", {
              token: access_token
          })
          .on("authenticated", () => {
              socket.emit("joinRoom", room_id);
          })
          .on("unauthorized", (msg) => {
              throw new Error(msg.data.type);
          });
    });

    const messagesBox = wx.createSelectorQuery('#messages');
    //Recevice messages from the socket
    socket.on("message", (message) => {
      this.data.messages.push(message);
      that.setData({
        messages: this.data.messages
      });
      //Scroll down
      messagesBox.scrollTop = messagesBox.scrollHeight;
    });
  },

  sendMessage: function(e) {
    const {message} = e.detail.value;
    if(message) socket.emit("chatMessage", message);
    this.setData({
      message: ''
    });
  },
})