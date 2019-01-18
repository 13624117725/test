
let pUrl = "https://www.guoanfamily.com/"
let COMMON_API_URL = "https://www.guoanfamily.com/common/"
export default {
  $get(url){
    let Authorization = wx.getStorageSync("token");
    if (!Authorization) {
      Authorization = ""
    }
    return new Promise((resolve,reject)=>{
      wx.request({
        url: pUrl + url,
        header: {
          'content-type': 'application/json',
          "Authorization": Authorization
        },
        method: 'GET',
        dataType: 'json',
        success(res) {
          if (res.code == 200 || res.status == 200 || res.Code == 200 || res.Status == 200 || res.statusCode==200 ) {
            resolve(res)
          }else{
            reject(res)
          }
        },
        fail(res){
          reject(res)
        }
      })
    }).then((res)=>{
      return res.data
    })
  },


  $post(url, data = {}, interfaceType = ""){
    let Authorization = wx.getStorageSync("token");
    if (!Authorization){
      Authorization = ""
    }
    return new Promise((resolve,reject)=>{
      switch (interfaceType) {
        case "common":
          pUrl = COMMON_API_URL;
          break;
      }
      wx.request({
        url: pUrl+ url,
        method:"POST",
        header: {
          'content-type': 'application/json',
          "Authorization": Authorization
        },
        dataType: 'json',
        data: data,
        success(res){
          if (res.code == 200 || res.status == 200 || res.Code == 200 || res.Status == 200 || res.statusCode == 200) {
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail(res) {
          reject(res)
        }
      })

    }).then((res) => {
      return res.data
    })
  }


}