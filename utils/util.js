
// 推荐
function data_swiper(callBack){
  wx.request({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: '5381',
      uin: '0',
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: '0',
      platform: 'h5',
      needNewCode: '1',
      _: 1499224231328
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if(res.statusCode==200){
        callBack(res.data);
      }
    }
  })
}

// 电台
// https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiosonglist.fcg?labelid=307&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1
function radioList_data(id,callBack){
  wx.request({
    url:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiosonglist.fcg',
    data:{
      labelid: id,
      g_tk: '5381',
      uin: '0',
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: '0',
      platform: 'h5',
      needNewCode: '1',
      _: 1499698781836
    },
    header:{
      'content-type': 'application/json'
    },
    success:function(res){
      if (res.statusCode == 200) {
        callBack(res.data);
      }
    }
  })
}
// 排行榜
function data_ranking(callBack) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: '5381',
      uin: '0',
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: '0',
      platform: 'h5',
      needNewCode: '1',
      _: 1499224231328
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        callBack(res.data);
      }
    }
  })
}

function data_ranking_id(id,callBack) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: '5381',
      uin: '0',
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: '0',
      platform: 'h5',
      needNewCode: '1',
      tpl: 3,
      page: 'detail',
      type: 'top',
      topid: id,//排行榜歌曲播放的ID值
      _: 1499307726933
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        callBack(res.data);
      }
    }
  })
}

// 搜索
function search_list(callBack){
  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'h5',
      needNewCode: '1',
      _: 1499327982660
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        callBack(res.data);
      }
    }
  })
}

function search_song_data(val,page, callBack){
  wx.request({
    url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
    data:{
      g_tk: 1565170814,
      uin: 1139733050,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      w: val,//搜索key值
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: 'utf - 8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: page,//歌曲搜索时处于第几页
      remoteplace: 'txt.mqq.all',
      _: Date.now()
    },
    method:'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        callBack(res.data);
      }
    }
  })
}

module.exports={
  data_swiper: data_swiper,
  data_ranking: data_ranking,
  data_ranking_id: data_ranking_id,
  search_list: search_list,
  search_song_data: search_song_data,
  radioList_data: radioList_data
};