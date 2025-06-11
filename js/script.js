$(document).ready(function () {
  const BODY = $("body");
  const mobBtn = $(".mob_btn");
  const scrollTopBtn = $(".scrollTop_btn");
  const ftrBtn = $(".family_wrap > a");
  const ftrWrap = $(".family_wrap");
  const mobSubBtn = $(".subNav .sub_menu .depth1 > li");
  const newsBtn = $(".news_btn");
  const newsItems = $(".news li");
  const mobFooter = document.querySelector(".mob_only");
  const dskFooter = document.querySelector(".dsk_only");
  const headerNav = $(".header_right .h_nav");

  // (1) Mobile Menu Toggle
  mobBtn.on("click", function () {
    BODY.toggleClass("mOpen");
  });

  // (2) Scroll Header (Top 버튼 활성화)
  $(window).on("scroll", function () {
    let scroll = $(this).scrollTop();
    if (scroll > 60) {
      scrollTopBtn.addClass("On");
    } else {
      scrollTopBtn.removeClass("On");
    }
  });

  // (3) Top Button Scroll
  scrollTopBtn.on("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // (4) Footer Family Site Toggle
  ftrBtn.on("click", function (e) {
    e.preventDefault();
    ftrWrap.toggleClass("active");
  });

  // (5) Mobile Sub Navigation (Accordion)
  mobSubBtn.click(function () {
    $(this).siblings().find(".depth2").slideUp(300);
    $(this).siblings().removeClass("active");
    $(this).find(".depth2").slideToggle(200);
    $(this).toggleClass("active");
  });


  

  // (6) Accordion (Generic)
  $(".title").click(function () {
    $(this).siblings().removeClass("active");
    $(this).toggleClass("active");
    $(this).next().stop().slideToggle();
  });

  // (7) News List: Show More
  let showCount = window.innerWidth >= 1200 ? 3 : 2;
  newsItems.hide().slice(0, showCount).show();

  newsBtn.click(function (e) {
    e.preventDefault();
    const hiddenItems = newsItems.filter(":hidden");
    hiddenItems.slice(0, showCount).fadeIn();

    if (hiddenItems.length <= showCount) {
      $(this).hide();
    }
  });

  // (8) Megamenu Hover
  headerNav.on("mouseover", function () {
  $(".megamenu").addClass("active");
  $(".megamenu-bg").addClass("active");
});
headerNav.on("mouseleave", function () {
  $(".megamenu").removeClass("active");
  $(".megamenu-bg").removeClass("active");
});

// 추가: megamenu-bg에도 동일하게 적용
$(".megamenu-bg").on("mouseover", function () {
  $(".megamenu").addClass("active");
  $(".megamenu-bg").addClass("active");
});
$(".megamenu-bg").on("mouseleave", function () {
  $(".megamenu").removeClass("active");
  $(".megamenu-bg").removeClass("active");
});


  // (9) Responsive Footer Visibility
  function updateFooterVisibility() {
    const width = window.innerWidth;

    if (width >= 768 && width < 1200) {
      mobFooter.classList.add("visible");
      mobFooter.classList.remove("hidden");
      dskFooter.classList.add("hidden");
      dskFooter.classList.remove("visible");
    } else if (width >= 1200) {
      mobFooter.classList.add("hidden");
      mobFooter.classList.remove("visible");
      dskFooter.classList.add("visible");
      dskFooter.classList.remove("hidden");
    } else {
      mobFooter.classList.add("visible");
      mobFooter.classList.remove("hidden");
      dskFooter.classList.add("hidden");
      dskFooter.classList.remove("visible");
    }
  }

  // (10) Reset Header Elements on Resize
  function resetHeaderState() {
    BODY.removeClass("mOpen");
    $(".sub_nav").removeAttr("style");
    $(".megamenu").removeClass("active");
    $(".megamenu-bg").removeClass("active");
  }

  // (11) Window Load / Resize
  $(window).on("load resize", function () {
    let width = $(window).innerWidth();

    if (width < 1200 || width >= 1200) {
      resetHeaderState();
    }

    updateFooterVisibility();
  });

  // 초기 실행
  updateFooterVisibility();
});
