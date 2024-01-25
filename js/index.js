//烛光效果
var mouse = {
    X: 0,
    Y: 0,
    CX: 0,
    CY: 0,
  },
  block = {
    X: mouse.X,
    Y: mouse.Y,
    CX: mouse.CX,
    CY: mouse.CY,
  };
$(".show-box").on("mousemove", function (e) {
  mouse.X = e.pageX - $(this).offset().left - $(".show-box").width() / 2;
  mouse.Y = e.pageY - $(this).offset().top - $(".show-box").height() / 2;
});
$(".show-box").on("mouseleave", function (e) {
  mouse.X = mouse.CX;
  mouse.Y = mouse.CY;
});
setInterval(function () {
  block.CY += (mouse.Y - block.CY) / 12;
  block.CX += (mouse.X - block.CX) / 12;
  $(".show-box .circleLight").css(
    "background",
    "radial-gradient(circle at " +
      mouse.X +
      "px " +
      mouse.Y +
      "px, #FEFFFB, transparent)"
  );
  $(".show-box").css(
    "transform",
    "scale(1.03) translate(" +
      block.CX * 0.05 +
      "px, " +
      block.CY * 0.05 +
      "px) rotateX(" +
      block.CY * 0.05 +
      "deg) rotateY(" +
      block.CX * 0.05 +
      "deg)"
  );
}, 30);

//背景随机
$(function () {
  var length = 4;
  $(".bg-img li:nth-child(2)").show();
  var index = 0;
  setInterval(function () {
    if (index > length) {
      index = 0;
    }
    $(".bg-img>li").eq(index).addClass("show").siblings().removeClass("show");
    index++;
  }, 5000);
});
//联系方式
var tips = $(".tips");
$(".list li").hover(
  function () {
    $(this).find(tips).show(30);
  },
  function () {
    $(this).find(tips).hide();
  }
);
// $('.list li a').click(function () {
//   alert('内容待添加 QWQ 感谢关注!!!');
// });

//导航栏
var navBar = true;
$(".menu-btn").click(function () {
  if (navBar) {
    $(".menu").slideDown(300);
  } else {
    $(".menu").slideUp(300);
  }
  navBar = !navBar;
});
if ($(window).width() < 768) {
  $(".menu li").click(function () {
    $(".menu").slideUp(300);
  });
  $(".skill .flex-wrap .flex-item").on("touchstart", function () {
    $(this).find(".front").addClass("front-rotate");
    $(this).find(".back").addClass("back-rotate");
    $(this).siblings().find(".front").removeClass("front-rotate");
    $(this).siblings().find(".back").removeClass("back-rotate");
    setTimeout(() => {
      $(this).find(".front").removeClass("front-rotate");
      $(this).find(".back").removeClass("back-rotate");
    }, 5000);
  });
}

//GoTop
$(window).scroll(function () {
  $(window).scrollTop() > document.documentElement.clientHeight / 2
    ? $("#GoUp").fadeIn()
    : $("#GoUp").fadeOut();
  $(".menu-fixed").hide();
});

$("#GoUp").click(function () {
  $("html,body").stop().animate(
    {
      scrollTop: 0,
    },
    500
  );
});

var UnU = false;
$(".logo").on("click", function () {
  if (UnU) {
    play();
  } else {
    $("#audio").get(0).pause();
    $(this).css("animation", "none");
  }
  UnU = !UnU;
});

$(".logo").css("animation", "music 5s infinite linear");
var musicUrl = "./mediu/music.mp3";
$("#audio").attr("src", musicUrl);

function play() {
  $("#audio").get(0).play();
  $(".logo").css("animation", "music 5s infinite linear");
}
// 左键点击动画
$(function () {
  var a_idx = 0;
  jQuery(document).ready(function ($) {
    "";
    $(".loaded").on("mouseMove", function (e) {
      play();
    });
    $("body").click(function (e) {
      var font = ["F", "A", "N", "G", "J", "I", "E", "S", "O", "N", "G"];
      var $i = $("<span/>").text(font[a_idx]); //新建span标签
      a_idx = (a_idx + 1) % font.length;
      var x = e.pageX,
        y = e.pageY; //获取鼠标点击的坐标
      $i.css({
        "z-index": 99999,
        top: y - 20,
        left: x,
        position: "absolute",
        color: "#12A3EA",
        "font-weight": "700",
        "font-family": "hyllh",
      }); //给生成的span标签加上 样式
      $("body").append($i);
      $i.animate(
        {
          top: y - 180,
          opacity: 0,
        },
        1500,
        function () {
          $i.remove();
        }
      ); //消失动画效果
    });
  });
});
$(".show-box > h1,.show-box > h3,.show-box > p").addClass("animated fadeInUp");
$(".my-avatar,.headline,.flex-item,.say,.timeline,.contact-box").addClass(
  "animated fadeIn"
);
$(".my-avatar,.headline,.flex-item,.say,.timeline,.contact-box").attr(
  "data-wow-duration",
  "1s"
);
$(".view-box").addClass("animated bounceInRight");
$(".moveup").addClass("animated fadeInUp");
var item = $(".flex-wrap > .flex-item");
for (var i = 0; i < item.length; i++) {
  item.eq(i).attr("data-wow-delay", i / 10 + "s");
}
$(window).load(function () {
  $("body").addClass("loaded");
  $("#loeder-wrapper").fadeOut(300);
  // setTimeout(function(){
  // 	$('.pv').fadeOut(300);
  // },6000);
  setTimeout(function () {
    if ($("#audio").get(0)) {
      play();
    }
  }, 5000);
  getmessage();
});

// // 自定义右键菜单
// document.oncontextmenu = function() {
//     return false;
// };
// // 点击鼠标键
// $(document).mousedown(function(e){
//     // 鼠标键 1(左键)，2鼠标滚轮，3右键
//     var key = e.which;
//     // 点击鼠标右键
//     if(key == 3){
//         var x = e.clientX; // x 横坐标
//         var y = e.clientY; // y 纵坐标
//         // $('#zb').html('x = ' + x + '  ,  y = ' + y); 显示坐标值

//         // 获取menu的宽度和高度
//         var menuHeight = $('.menu-fixed').height();
//         var menuWidth = $('.menu-fixed').width();
//         // 获取浏览器的可见高度和宽度
//         var clientHeight = getClientHeight();
//         var clientWidth = getClientWidth();
//         // 判断
//         if(menuHeight + y > clientHeight){
//             y = clientHeight - menuHeight - 5;
//         }
//         if(menuWidth + x > clientWidth){
//             x = clientWidth - menuWidth - 5;
//         }
//         $('.menu-fixed').show().css({left:x,top:y});
//     }

// });
// // 点击空白区域 隐藏鼠标右键
// $(document).click(function(){
//     $('.menu-fixed').hide();
// });
// // 浏览器的可见高度
// function getClientHeight() {
//     var clientHeight = 0;
//     if (document.body.clientHeight && document.documentElement.clientHeight) {
//         clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
//     } else {
//         clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
//     }
//     return clientHeight;
// }
// // 浏览器的可见宽度
// function getClientWidth() {
//     var clientWidth = 0;
//     if (document.body.clientWidth && document.documentElement.clientWidth) {
//         clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth: document.documentElement.clientWidth;
//     } else {
//         clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth: document.documentElement.clientWidth;
//     }
//     return clientWidth;
// }

// $('.menu-fixed > li').eq(0).click(function(){
// 	location.reload();
// })
// function Reido() {
// 	document.onkeydown = function(a) {
// 		a = window.event || a;
// 		if (123 == a.keyCode || a.ctrlKey && a.shiftKey && 73 == a.keyCode || a.shiftKey && 121 == a.keyCode) return !1
// 	}
// }
// Reido();
// document.oncontextmenu = function() {
// 	return !1
// };

var pageNum = 1;

function commitmessage() {
  alert('功能已屏蔽')
  // var user = $("#user").val();
  // var message = $("#message").val();
  // var url = "http://182.61.48.129/api/submitMessage";
  // let time = CurentTime();
  // var data = {
  //   user: user,
  //   message: message,
  //   type: "resume",
  //   time: time,
  // };
  // if (user && message) {
  //   $.ajax({
  //     url: url,
  //     type: "post",
  //     data: data,
  //     success: function (res) {
  //       console.log(res);
  //       $("#message").val("");
  //       reloadmsg();
  //       getmessage();
  //     },
  //   });
  // }
}

function getmessage() {
  var url = "http://182.61.48.129/api/getMessage";
  let data = {
    type: "resume",
    page: pageNum,
    pageNum: 10,
  };
  if ($("#lastmessage .desc").text() == "没有更多了") {
    return;
  }
  console.log(pageNum);
  $.ajax({
    url: url,
    type: "post",
    data: data,
    success: function (res) {
      console.log(res);
      var html = "";
      var arr = res.data.rows;
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          var content =
            "<li>" +
            '<div class="timeline-dots">' +
            '<i class="iconfont icon-foot"></i>' +
            "</div>" +
            '<div class="timeline-content">' +
            '<p class="title">' +
            arr[i].user +
            "</p>" +
            '<p class="desc">' +
            arr[i].message +
            "</p>" +
            '<p class="time">' +
            arr[i].time +
            "</p>" +
            "</div>" +
            "</li>";
          html += content;
        }
        $("#lastmessage").before(html);
        pageNum++;
      } else {
        $("#lastmessage .desc").html("没有更多了");
      }
    },
  });
}

function CurentTime() {
  var now = new Date();
  var year = now.getFullYear(); //年
  var month = now.getMonth() + 1; //月
  var day = now.getDate(); //日
  var hh = now.getHours(); //时
  var mm = now.getMinutes(); //分
  var ss = now.getSeconds(); //分
  var clock = year + "-";

  if (month < 10) clock += "0";

  clock += month + "-";

  if (day < 10) clock += "0";

  clock += day + " ";

  if (hh < 10) clock += "0";

  clock += hh + ":";
  if (mm < 10) clock += "0";
  clock += mm + ":";

  if (ss < 10) clock += "0";
  clock += ss;
  return clock;
}

function reloadmsg() {
  var content =
    '<li id="lastmessage" onclick="getmessage()">' +
    '<div class="timeline-dots">' +
    '<i class="iconfont icon-sun"></i>' +
    "</div>" +
    '<div class="timeline-content">' +
    '<p class="desc">点击查看更多</p>' +
    "</div>" +
    "</li>";
  $("#messageContent").html(content);
  pageNum = 1;
}
