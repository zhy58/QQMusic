let app=getApp();

Page({
  data:{
    paly_music:true,
    key:1,
    play_type:0
  },
  onLoad:function(opation){   
    // var id=opation.id;  //接收超链接传的播放id字符串 
    // 判断传过来的对象是不是一个数组 
    let play_data = [];
    if (app.globalData.data instanceof Array){
      play_data = app.globalData.data;
      this.data.play_type = 1;
      this.setData({
        play_data: play_data[this.data.key],
        albummid: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + play_data[this.data.key].album.mid + '.jpg'
      });  
    }else{
      play_data = app.globalData.data;
      this.data.play_type = 0;
      this.setData({
        play_data: play_data,
        albummid: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + play_data.albummid + '.jpg'
      });
    }

    // 进入页面执行播放音乐
    if (this.data.play_type == 0){
      console.log(play_data);
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + play_data.songmid + '.m4a?fromtag=38',
        title: play_data.songname,
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + play_data.albummid + '.jpg'
      });
      this.play('false');
    } else if (this.data.play_type == 1){
      console.log(play_data[this.data.key]);
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + play_data[this.data.key].mid + '.m4a?fromtag=38',
        title: play_data[this.data.key].title,
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + play_data[this.data.key].album.mid + '.jpg'
      });
      this.play('false');
    }    
  },
  play_alone: function (bool){
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + play_data.songmid + '.m4a?fromtag=38',
      title: play_data.songname,
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + play_data.albummid + '.jpg'
    });
    this.play(bool);
  },
  // 控制音乐播放暂停
  pause_click:function(){
    let that=this;
    if (this.data.play_music == 'true'){
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + that.data.play_data.songmid + '.m4a?fromtag=38',
        title: that.data.play_data.songname,
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + that.data.play_data.albummid + '.jpg'
      });
      that.play('false');      
    }else{
      wx.pauseBackgroundAudio();
      that.play('true');
      //console.log(that.data.play_music);
    }    
  },
  // 此页面停止下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  // 封装一个属性值来改变音乐播放暂停
  play:function(val){
    this.setData({
      play_music : val
    });
  }  
})