var list_data=require("../../../utils/util.js");
// console.log(list_data)

var app=getApp();
Page({
  onLoad:function(option){
    var that = this;
    var id=option.id;    
    list_data.data_ranking_id(id,function(data){
      that.setData({
        list_data: data
      })     
    });
    
  },
  play_click:function(ev){
    var index=ev.currentTarget.dataset.id;
    
    // app.globalData.index=index;
    app.globalData.play_data = app.globalData.play_data.songlist[index].data;
    console.log(app.globalData.play_data)
    
    // 获取播放id用连接传过去
    // this.setData({
    //   play_id: this.data.list_data.songlist[index].data.songmid      
    // });
    // console.log(this.data.play_id);
    wx.navigateTo({
      url: 'play/play?id=' + this.data.play_id
    })
  }
})