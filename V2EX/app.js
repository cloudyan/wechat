App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
    __wxConfig.projectConfig.Network.RequestDomain = __wxConfig.projectConfig.Network.RequestDomain.concat(['https://www.v2ex.com','http://api.v3.iqianggou.com']);
  },
  onHide: function () {
    console.log('App Hide')
  }
})
