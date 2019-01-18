//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    share_src:"",
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval:5000,
    duration: 400,
    circular:true,
    rentHouseArr:[],
    newHouseArr:[],
    rentHouseArrB:[],

    
  },
  testDetails(e) {
    if (e.detail.source == 'autoplay') {
      this.setData({
        autoplay: false
      })
    }
  },
  onShareAppMessage(options) {
    let path = `/pages/index/index`
    return {
      title: "【国安家】为每个家的梦想全力以赴",
      path: path,
      imageUrl: "https://img.guoanfamily.com/311324861370865436.jpg",
      success: function (res) {
        wx.showModal({
          title: "温馨提示：",
          content: '分享成功',
        })
      }
    }      
  },
  onShow() {
    getApp().globalData.$get(`palmsaleapp/api/v1/banner/appList?projectType=4`).then(res=>{
      let Arr = []
      if (res.status==200){
      
        res.data.forEach(item=>{
          if (item.systemtypename ==="APP首页"){
            let obg = {
              url: `https://img.guoanfamily.com/${item.multimefileName}`,
              src: item.bannerValue,
              title: item.linkTitle
            }
            Arr.push(obg)
            
          }
        })
      }
      this.setData({
        imgUrls:Arr
      })
    })
  },
  ImgClick(e){
    this.turnRouter(`#/framePage?src=${e.currentTarget.dataset.src}&title=${e.currentTarget.dataset.title}&`);

  },
  onLoad(options) {
    
    //如果已经显示过web-view页了，则执行后退操作，否则就跳到web-view页
    if (options.Hashs) {
      app.globalData.ctxPath = "https://www.guoanfamily.com/guoanjiaApp/"+ decodeURIComponent(options.Hashs);
      // app.globalData.ctxPath = "https://nt.guoanfamily.com/guoanjiaAppTest/" + decodeURIComponent(options.Hashs);
      wx.navigateTo({
        url: '/pages/first/first'
      })
    }else{
      this.getRent().then(()=>{
        this.getNewHouse()
      })
     
    }


    

  },
  
  getUserInfo: function(e) {
  
  },
  // 请求
  // 租房
  getRent(){
    return getApp().globalData.$post("agenthouseCutomer/common/homePage", { "size": '10'}).then(res=>{
      var Arr = []
      let rentHouseArrB = []
      if (res.code===0){
      
        res.data.roomList.forEach((item,index)=>{
          if (index<5){
            item.roomFirstImage = `https://img.guoanfamily.com/${item.roomFirstImage}?imageView2/0/w/240/h/240`;
            item.roomSecondImage2 = `https://img.guoanfamily.com/${item.roomSecondImage}?imageView2/0/w/160/h/160`;
            item.roomThirdImage2 = `https://img.guoanfamily.com/${item.roomThirdImage}?imageView2/0/w/160/h/160`;
            rentHouseArrB.push(item)
            
          }else{
            return false;
          }
        })
        res.data.roomList = res.data.roomList.reverse()

        res.data.roomList.forEach((item,index)=>{
          if (index<5){
            if (item.image) {
              item.image = `https://img.guoanfamily.com/${item.image}?imageView2/0/w/240/h/240`
            } else {
              item.image = "https://img.guoanfamily.com/rent/static/HomePage/roomimg_03.png?imageView2/0/w/240/h/240"
            }
            Arr.push(item)
          } else {
            return false;
          }
        })
        
        this.setData({
          rentHouseArr: Arr,
          rentHouseArrB: rentHouseArrB
        })
      }
    })
  },
  // 新房
  getNewHouse(){
    getApp().globalData.$get('palmsaleapp/api/v1/build/buildLitsAppm?averagepriceList=&typeList=&areaList=&tenementtypeList=&buildtagList=&hardcoverstandardList').then(res=>{
      if (res.status==200){
        res.data.forEach(item=>{
          item.firstpicture = `https://img.guoanfamily.com/${item.firstpicture}?imageView2/0/w/240/h/240`
        })
        this.setData({
          newHouseArr: res.data
        })
      }
       
    })
  },

  // 跳转页面
  turnRouter(route){
    app.globalData.ctxPath = `https://www.guoanfamily.com/guoanjiaApp/${route}from=xiaochengxu`
    wx.navigateTo({
      url: '/pages/first/first'
    })
  },
  findRentRoom(){
    this.turnRouter("#/HouseList/HotSearch?");
  },
  findRentMap(){
    this.turnRouter("#/MapSearch?title=地图找房&");
  },
  findNewHouse(){
    this.turnRouter("#/newHouseIndex?");
  },
  findRentHouse(){
    this.turnRouter("#/HomePage?");
  },
  findHousePrice(){
    this.turnRouter("#/housingPrice?");
  },
  Entrust(){
    this.turnRouter("#/Entrust?");
  },
  lookCenter(){
    this.turnRouter("#/ExhibitionCenter?");
  },
  VrLook(){
    this.turnRouter("#/VrLook?");
  },
  ActiveList(){
    this.turnRouter("#/ActiveList?");
  },
  RontHouses(){
    this.turnRouter("#/HouseList?name=0019001&");
  },
  RentHousesDetail(e){
    let str = `#/HouseList/houseDetail?id=${e.currentTarget.dataset['id']}&productType=${e.currentTarget.dataset['producttype']}&`
    this.turnRouter(str);
  },
  newHouseIndex(){
    this.turnRouter("#/newHouseIndex?");
  },
  newHouseInfo(e){
    let str = `#/building_detial?buildID=${e.currentTarget.dataset['id']}&productType=${e.currentTarget.dataset['producttype']}&`
    this.turnRouter(str);
  },
  yuekanHouse(){
    this.turnRouter("#/HouseList?");
  },
  rentHouseList(){
    this.turnRouter("#/HouseList?name=0019001&");
  },
  myCenter(){
    this.turnRouter("#/personalCenter?");
  }
})
