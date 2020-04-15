//获取视频进度条
var $pass = $('.video-watch-to');
//获取播放按钮
var $playBtn = $('.mejs__button>button').get(0);
//获取音量按钮
var $volume = $('.mejs__button>button').get(1);
//创建新节点
var $option = $('<div>');
//添加样式
var args = {
    'width': '10px',
    'height': '10px',
    'backgroundColor': 'yellow',
    'position': 'absolute',
    'top': '0',
    'left': '96%',
    'border-radius': '50%'
}
$option.css(args);
//添加id
$option.attr('id', "tag");
//插入节点到页面
$pass.append($option);
//视频进度条宽度不到100%时等于这个值
var prcent = 100;
//函数
function star() {
    //暂停播放
    $playBtn.click();
    //静音
    $volume.click();
    //等待上一个及执行并赋值完毕才执行这里
    setTimeout(() => {
        //点击视频进度条指定位置
        $('#tag').click();
    }, 500);
    //等待点击完视频进度条指定位置后再执行播放
    setTimeout(() => {
        $playBtn.click();
        console.log('跳到指定位置,开始播放');
    }, 2000);
};
star();