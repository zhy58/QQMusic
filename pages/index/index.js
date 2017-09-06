let data_swiper=require("../../utils/util.js");//获取util页面的数据
let app=getApp(); //全局数据

// 函数节流[第一种方法（闭包方法）]（封装返回一个延迟函数）
let throttle = function (method, delay) {
  let timer = null;
  return function () {
    let that = this, context = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      method.apply(that, context);
    }, delay);
  }
};
let scroll_bottom_data = function () {
  let page = this.data.page + 1;
  let key = this.data.key;
  this.setData({
    page: page,
    off: true
  });
  // console.log(this.data.page);
  this.result(key, page);
};
// //函数节流 第二种方法（非闭包方法）
// function throttle(method,delay,that){
//   clearTimeout(method.timer);
//   method.timer=setTimeout(function(){
//     method.call(that);
//   },delay);
// }

Page({
  // index页面的数据（此页面有效）
  data:{
    tab_data: [
      "推荐",
      "排行榜",
      "搜索"
    ],
    data_index: 0,   //tab默认显示第几个tab
    key_record:[],    //定义一个数组用于保存搜索记录
    flag:true,      //控制搜索记录的显示隐藏(true--hidden)    
    hidden: false,   //搜索出现歌曲列表时改为true（热门搜索执行hidden函数后隐藏）(true--hidden)
    show:false,   //控制搜索结果的显示隐藏
    page:1,
    off:false //第一次调用数据时不用连接concat上一次的数据（也可以判断数据是否为空来代替此属性）
  },
  onLoad:function(){
   let that=this;
    // 推荐数据获取
    data_swiper.data_swiper(function(data){
      that.setData({
        swiper: data.data
      })
      // console.log(that.data.swiper); 
    });
    // 排行榜数据获取
    data_swiper.data_ranking(function (data) {
        that.setData({
          data_ranking: data.data        
        });
      // console.log(that.data.data_ranking);
    }); 
    //  搜索数据获取
    data_swiper.search_list(function(data){      
      that.setData({
        data_search: data.data,
        hot_data: data.data.hotkey.splice(0,8)
      })
      // console.log(that.data.hot_data)
    });    
  },
  // 获取选项卡的index值来改变显示的tab
  tab_click:function(ev){
    let index=ev.currentTarget.dataset.id;
    // console.log(index);
    this.setData({
      data_index: index
    })
  },
  // 获取电台歌单的数据ID，并跳转到详细页面
  radioList_click:function(ev){
    let that=this;
    let index=ev.currentTarget.dataset.list;
    let id = that.data.swiper.radioList[index].radioid;
    data_swiper.radioList_data(id, function (data) {        
        app.globalData.data = data.data;
        // console.log(app.globalData.data);        
      });
    wx.navigateTo({
      url: 'detail/play/play'
    })
  },
  // 获取歌曲排行榜页面的点击ID值，同时获取该值的数据保存到全局变量
  ranking_click:function(ev){
    let index=ev.currentTarget.dataset.id;
    let id = this.data.data_ranking.topList[index].id;
    // 播放数据放入全局数据中
    data_swiper.data_ranking_id(id,function(data){
      app.globalData.play_data=data;
    });
    // console.log(app);
    wx.navigateTo({
      url: 'detail/detail?id='+id
    })
  },
  // 获取搜索文本框的数据保存到data
  search_key_input:function(e){    
    this.setData({
      key: e.detail.value
    });
  },
  // 执行搜索
  search_click:function(){
    let key = this.data.key;    
    let page=this.data.page;
    // 搜索记录隐藏
    this.setData({
      flag: true,
      hidden: true,
      show: false
    });
    if(key){
      this.data.key_record.push(key);
      // console.log(this.data.key_record);
      wx.setStorage({
        key: "key",
        data: this.data.key_record
      }); 
    } 
    this.result(key, page);
  },
  // 点击搜索文本框显示搜索记录
  input_click:function(){
    let that = this;
    if (!this.data.key_record.length==0){
      this.setData({
        flag: true,
        hidden: false,
        show: true
      });
    }    
    wx.getStorage({
      key: "key",
      success: function (res) {
        that.setData({
          key_record: res.data,
          flag:false,
          hidden: true,
          show: true
        });
      }
    });
  },
  // 清楚所有搜索记录
  clear_all_record:function(){
    wx.removeStorage({
      key: 'key',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res)
        }
      }
    });
    // 隐藏搜索记录
    this.setData({
      flag:true,
      hidden: false,
      show: true
    });
  },
  // 获取索引值清除对应的搜索记录
  clear_record:function(ev){
    let index=ev.currentTarget.dataset.index;
    let data = this.data.key_record;
    data.splice(index, 1);
    // 搜索记录数据为空时，隐藏搜索记录
    if(data.length==0){
      this.setData({
        flag: true,
        hidden: false,
        show: true
      });
    }
    this.setData({
      key_record: data
    });
    wx.setStorage({
      key: "key",
      data: data
    });
  }, 
  // 搜索结果跳转播放页面
  song_list_click:function(ev){
    let index=ev.currentTarget.dataset.id;
    app.globalData.data = this.data.search_song[index];
    wx.navigateTo({
      url: 'detail/play/play',
    })
  },
  // 获取热门搜索的key值后替换数据的key值实现搜索
  hot_key_click:function(ev){
    let val = ev.currentTarget.dataset.key;
    this.key_search(val);    
  },
  // 搜索记录实现搜索歌曲列表
  record_text_click: function (ev) {
    let val = ev.currentTarget.dataset.item;
    this.key_search(val);
  },
  // 封装输入key值后的搜索结果数据列表
  result: function (key,page){
    let that=this;    
    data_swiper.search_song_data(key,page,function (data) {
      let search_song = data.data.song.list;
      if(!key) return;
      //也可以判断that.data.search_song中是否具有数据来替换that.data.off
      if (that.data.off) {        
        search_song = search_song.concat(that.data.search_song);
      }
      that.setData({
        search_song: search_song,
        hidden: true,
        show:false,
        flag: true
      });
    });
  },
  // 封装获取key值后实现搜索歌曲列表
  key_search:function(val){
    let that=this;
    let page = that.data.page;
    
    // 不能缺少这句（无法继续调用第二页的接口）
    that.setData({
      key: val
    });
    that.data.key_record.push(val);
    wx.setStorage({
      key: "key",
      data: that.data.key_record
    });    
    that.result(val, page);
  },
  // 滚动歌曲数据只执行一次（函数节流）
  scroll_bottom: throttle(scroll_bottom_data,90)


})
