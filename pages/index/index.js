//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    warn: ''
  },
  login: function(e) {
    const that = this;
    console.log('login', e.detail.value);
    const {
      username,
      password
    } = e.detail.value;
    wx.request({
      url: 'http://175.24.235.163:3000/api/auth/login',
      data: {
        username: username,
        password: password
      },
      method: 'POST',
      success(res) {
        if(res.statusCode === 200){
          wx.setStorage({
            data: res.data.token,
            key: 'access_token',
          })
          wx.redirectTo({
            url: '/pages/rooms/rooms',
          })
        }else{
          that.setData({
            warn: '用户名或密码错误'
          });
        }
      },
      fail(){

      }
    })
    return;
  },
  formReset: () => {
    console.log('reset');
  }
})