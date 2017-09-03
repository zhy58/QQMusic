var app=getApp();
// console.log(app);
Page({
  data:{
    paly_music:true
  },
  onLoad:function(opation){   
    // var id=opation.id;  //接收超链接传的播放id字符串    

    var play_data = app.globalData.play_data;
    //console.log(play_data.length);
    
    // 判断传过来的对象是不是一个数组
    this.setData({
      play_data: play_data,
      albummid: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + play_data.albummid+ '.jpg'
    });
    // 进入页面执行播放音乐
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + play_data.songmid+ '.m4a?fromtag=38',
      title: play_data.songname,
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' +play_data.albummid+ '.jpg'
    });
    this.paly_data('false');
  },
  // 控制音乐播放暂停
  pause_click:function(){
    var that=this;
    if (this.data.play_music == 'true'){
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + that.data.play_data.songmid + '.m4a?fromtag=38',
        title: that.data.play_data.songname,
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + that.data.play_data.albummid + '.jpg'
      });
      that.paly_data('false');      
    }else{
      wx.pauseBackgroundAudio();
      that.paly_data('true');
      //console.log(that.data.play_music);
    }    
  },
  // 此页面停止下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  // 封装一个属性值来改变音乐播放暂停
  paly_data:function(val){
    this.setData({
      play_music : val
    });
  }  
})