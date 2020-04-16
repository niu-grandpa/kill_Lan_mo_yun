/*
*Version3-最终版
*已通过测试，效果完美
*Time：2020-4-14
*/
var Tip = $('<div></div>') //绘制提示框窗口节点
Tip.text("😄已启用视频自动化 @作者：M ₩ A");
$(Tip).css({ //添加窗口样式
    "width": "100%",
    "heigth": "80px",
    "position": "fixed",
    "top": "50%",
    "left": "50%",
    "transform": "translate(-50%, -50%)",
    "backgroundColor": "#FFF",
    "box-shadow": "0 0 5px #0BD",
    "color": "red",
    "font-size": "18px",
    "text-align": "center",
    "line-height": "80px",
    "opacity": 0,
    "transition": "all 15s ease",
    "z-index": "999"
});
$('body').append(Tip); //添加节点到页面
var res = $(".res-row"); //获取资源
var video = $(".preview"); //获取所有视频
var close = $(".close-window"); //获取视频关闭按钮,点击关闭触发资源自动点击
var resKey; //获取视频对应id值
var resType; //获取视频类型
var hasClass = res.hasClass("preview-file", "download-res", "preview"); //资源一概去除类名
var nums = 0; //记录请求次数
var to = 9999; //用于发送给服务器的视频已观看时间虚假数据

//自动化函数
function autoClick() {
    setTimeout(function() {
        video.click();
        alert("已完成！请等待自动刷新页面");
        console.log("5秒后自动刷新页面")
    }, 2500)
    setTimeout(function() {
        window.location.reload(); //刷新当前页面.
    }, 6000)
}

video.click(function(e) { //视频点击事件
    resKey = e.target.dataset["value"];
    resType = e.target.dataset["mime"];
    if (resType == "video") {
        nums++;
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'https://www.mosoteach.cn/web/index.php?c=res&m=save_watch_to',
            data: {
                clazz_course_id: clazzcourseId,
                res_id: resKey, //当前点击视频资源的id
                watch_to: to,
                duration: Math.ceil(myPlayer.duration),
                current_watch_to: to
            },
            success: function(data) {
                console.log('发送请求次数:' + nums + '次 ' + '服务器返回状态:' + data);
            }
        });
    }
    console.log("资源Key:" + resKey)
});

close.click(function() { //点击关闭按钮 调用自动化函数
    console.log("自动化操作3秒后开始...");
    alert("等待3秒后自动开始")
    res.removeClass("preview"); //移除视频资源类名，防止自动点击视时打开视频造成报错
    autoClick();
});

setTimeout(function() { //提示窗口出现
    $(Tip).css("opacity", 1);
    alert('请随意点击一个视频并关闭它，即可激活自动化操作！！！')
}, 1000);

if (hasClass) res.removeClass("preview-file").removeClass("download-res"); //移除非视频资源类名，以防点击时跳出页面 
