  //Version 2
  /**
   * 1.取到资源data属性id值
   * 2.取消视频perview类名
   * 3.发送假数据至服务器
   * 
   * 完成时间：2020-4-11-16点35分
   * This code By-钟RH
   */
  var $resList = $('.res-row'); //获取列表的资源
  var resId; //获取资源的dataSet类型id
  var resType; //获取dataSet的资源类型
  var num = 0; //记录请求次数
  var hasClass = $('.res-row').hasClass('preview');
  alert('第一次点开视频等待它自动关闭,之后再点击将不会再打开视频,要观察控制台输出的是success表明点击的视频成功得到经验，error则需要重新点击，所有需要刷的视频点完后再刷新页面就有经验')
  $('.res-row').click(function(e) {
      resId = e.target.dataset['value'];
      resType = e.target.dataset['mime'];
      if (resType !== 'video') {
          alert('当前点击的不是视频资源，Ajax发送请求取消！请重新点击视频');
          return;
      }
      if (resType == 'video') {
          num++;
          //发送假数据至服务器
          $.ajax({
              type: 'post',
              dataType: 'json',
              url: 'https://www.mosoteach.cn/web/index.php?c=res&m=save_watch_to',
              data: {
                  clazz_course_id: clazzcourseId,
                  res_id: resId, //当前观看视频资源的id
                  watch_to: 999, //假数据
                  duration: Math.ceil(myPlayer.duration),
                  current_watch_to: 999 //假数据
              },
              success: function(data) {
                  console.log('发送请求次数:' + num + '服务器返回状态:' + data);
              }
          });
          if (num >= 2) $resList.removeClass('preview');
      }
      setTimeout(() => {
          $('.close-window').click(); //点开视频2秒后自动关闭
      }, 2500);
  })