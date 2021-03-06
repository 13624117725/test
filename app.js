//app.js
import Ajax from '/public/public.js'
App({
  onHide() {
    this.data.webShowed = false;
  },
  data: {
    webShowed: false //标记web-view页面是否已经显示过了
  },
  onLaunch: function () {
      //获取登录用户的opennid
    wx.login({
      success: function (res) {
        if (res.code) {

          getApp().globalData.$get(`openweixin/miniapp/login?jsCode=${res.code}`).then((res) => {
            if (res.code !== 0) {
              return;
            }

            let openId = res.data;
            wx.setStorageSync("openId", openId);
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // ctxPath:"https://nt.guoanfamily.com/guoanjiaAppTest/#/?from=xiaochengxu",
    ctxPath: 'https://www.guoanfamily.com/guoanjiaApp/#/?from=xiaochengxu',
    $get: Ajax.$get,
    $post: Ajax.$post
  }
  
})