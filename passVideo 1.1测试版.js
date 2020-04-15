    var timeId; //定时器
    var num = 0; //记录发送次数
    var $volume = $('.mejs__button>button').get(1); //获取音量键
    alert('代码运行');
    // 函数
    function passVideo() {
        num++;
        //发送视频观看进度假数据
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'https://www.mosoteach.cn/web/index.php?c=res&m=save_watch_to',
            data: {
                clazz_course_id: clazzcourseId, //蓝墨云班课id
                res_id: watchingResId, //当前观看资源的id
                watch_to: 594, //已观看到
                duration: Math.ceil(myPlayer.duration),
                current_watch_to: 594 //当前观看时间
            },
            success: function(data) {
                console.log('返回状态:' + data + '发送请求次数:' + num);
            }
        });
    }

    function isClose() {
        $('.res-row').click(() => {
            passVideo(); //每次点开资源发送一次请求
            $volume.click();
            setTimeout(() => {
                $('.close-window').click(); //点开视频2秒后自动关闭
            }, 2800);
        });
    }
    isClose();

  