$(document).ready(function(){

  /* 배너1_________________________________________ */
  let bannerWidth = $(".ban1_hd ul li").width()+10;

  $(".ban1_hd ul li:last").prependTo(".ban1_hd ul");
  $(".ban1_hd ul").css({"left": -bannerWidth+"px"});

  // 왼쪽 버튼
  $(".ban_btn_hd .left_hd").click(function(){
    $(".ban1_hd ul").stop().animate({"left": "+="+bannerWidth+"px"},500, function(){
      $(".ban1_hd ul li:last-child").prependTo(".ban1_hd ul");
      $(this).css({"left": -bannerWidth+"px"});
    });
  });
  // 오른쪽 버튼
  $(".ban_btn_hd .right_hd").click(function(){
    $(".ban1_hd ul").stop().animate({"left": "-="+bannerWidth+"px"},500, function(){
      $(".ban1_hd ul li:first-child").appendTo(".ban1_hd ul");
      $(this).css({"left": -bannerWidth+"px"});
    });
  });


  /* 배너2_________________________________________ */
  let bannerWidth2 = $(".ban2_hd ul li").width()+10;

  $(".ban2_hd ul li:last").prependTo(".ban2_hd ul");
  $(".ban2_hd ul").css({"left": -bannerWidth2+"px"});

  // 왼쪽 버튼
  $(".ban_btn_hd .left_hd").click(function(){
    $(".ban2_hd ul").stop().animate({"left": "+="+bannerWidth2+"px"},500, function(){
      $(".ban2_hd ul li:last-child").prependTo(".ban2_hd ul");
      $(this).css({"left": -bannerWidth2+"px"});
    });
  });
  // 오른쪽 버튼
  $(".ban_btn_hd .right_hd").click(function(){
    $(".ban2_hd ul").stop().animate({"left": "-="+bannerWidth2+"px"},500, function(){
      $(".ban2_hd ul li:first-child").appendTo(".ban2_hd ul");
      $(this).css({"left": -bannerWidth2+"px"});
    });
  });

});