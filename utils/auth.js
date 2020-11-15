const requireAuth = () =>{
  let loggedIn = false;
  wx.getStorage({
    key: 'access_token',
    success(res) {
      if (res.data) loggedIn = true;
      if(loggedIn){
        console.log(true)
      }else{
        wx.redirectTo({
          url: '/pages/index/index'
        }) 
      }
    }
  });
}


module.exports = requireAuth;