document.addEventListener('DOMContentLoaded', () => {
  // GSAP ScrollTrigger 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // 모든 섹션에 애니메이션 적용
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    const rel = section.querySelector('.rel > *');
    if (rel) {
      gsap.from(section.querySelectorAll('.rel > *'), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2, // 요소 간의 애니메이션 간격
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section, // 섹션이 뷰포트에 들어올 때 트리거
          start: 'top 80%', // 트리거 시작 위치
          toggleActions: 'play none none none', // 애니메이션 동작
        },
      });
    }
  });
});

$(document).ready(function () {
  function getShowCount() {
    if (window.innerWidth >= 1200) {
      return 4;
    } else if (window.innerWidth >= 360) {
      return 3;
    } else {
      return 2;
    }
  }

  let showCount = getShowCount();
  let currentCount = showCount;

  function showItems() {
    const total = $(".news li").length;
    $(".news li").hide().slice(0, currentCount).show();
    if (currentCount >= total) {
      $(".news_btn").hide();
    } else {
      $(".news_btn").show();
    }
  }

  showItems();

  $(".news_btn").click(function (e) {
    e.preventDefault();
    currentCount += showCount;
    showItems();
  });

  $(window).on('resize', function () {
    let newShowCount = getShowCount();
    if (showCount !== newShowCount) {
      showCount = newShowCount;
      currentCount = showCount; // 리사이즈 시 항상 처음 개수만 보여줌
      showItems();
    }
  });
});



$(".set_tab .tab").click(function (e) {
  $(".set_tab .tab").removeClass("active");
  $(this).addClass("active");
});

$(".set_tab .tab").click(function (e) {

  $(".set_tab .tab").removeClass("active");
  $(this).addClass("active");
});