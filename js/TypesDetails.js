/* $(document).ready(function() {
  // --- 맛 프로필 바 (.percent 이미지) 애니메이션 ---

  const $percentImages = $('#section0 .content .right .taste img.percent');

  if ($percentImages.length > 0) {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      };

      // 요소가 화면에 나타났을 때 실행될 콜백 함수
      const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            $(entry.target).addClass('animate-in');
            observer.unobserve(entry.target);
          }
        });
      };

      // IntersectionObserver 인스턴스 생성
      const observer = new IntersectionObserver(animateOnScroll, observerOptions);

      // 각 .percent 이미지에 대해 관찰 시작
      $percentImages.each(function() {
        observer.observe(this); //
      });

    } else {
      console.warn("IntersectionObserver is not supported by this browser. Animating bars directly.");
      setTimeout(function() {
        $percentImages.addClass('animate-in');
      }, 200);
    }
  }

}); */

$(document).ready(function() {
  // --- (이전에 작성한 $viewport, $articles, 페이지네이션 관련 변수 및 함수들 위치) ---

  // --- 맛 프로필 바 (.percent 이미지) 너비 설정 및 애니메이션 ---
  const $percentImages = $('#section0 .content .right .taste img.percent');

  if ($percentImages.length > 0) {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null, // 뷰포트를 기준으로 감지
        rootMargin: '0px',
        threshold: 0.2 // 요소의 20%가 화면에 보일 때 실행
      };

      const animateBarOnScroll = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const $img = $(entry.target); // 현재 화면에 나타난 .percent 이미지
            const value = parseInt($img.attr('alt')); // alt 값 가져오기 (예: 3)
            const maxValue = 5; // 맛 프로필 바의 최대 값 (예: 5칸 만점)

            let targetWidthPercentage = 0; // 기본 너비 0%

            if (!isNaN(value) && value >= 0 && value <= maxValue) {
              targetWidthPercentage = (value / maxValue) * 100; // 너비 비율 계산
            } else {
              console.warn('맛 프로필 바 이미지에 유효한 alt 값이 없거나 범위를 벗어납니다:', $img.attr('alt'));
            }
            
            // 1. 이미지의 최종 너비를 CSS width 속성으로 설정
            $img.css('width', targetWidthPercentage + '%'); 
            
            // 2. 약간의 지연 후 애니메이션 클래스를 추가하여 scaleX 애니메이션 실행
            //    (브라우저가 새로운 width를 적용할 시간을 주기 위함 - 대부분 즉시 적용해도 괜찮음)
            setTimeout(function() {
              $img.addClass('animate-in');
            }, 50); // 50ms (0.05초) 딜레이, 필요에 따라 조절하거나 제거 가능

            observer.unobserve(entry.target); // 애니메이션이 한 번 실행되면 더 이상 관찰하지 않음
          }
        });
      };

      const barObserver = new IntersectionObserver(animateBarOnScroll, observerOptions);

      $percentImages.each(function() {
        barObserver.observe(this); // 각 .percent 이미지 관찰 시작
      });

    } else {
      // IntersectionObserver 미지원 브라우저 대체 처리: 모든 바를 즉시 또는 지연 후 표시
      console.warn("IntersectionObserver 미지원. 모든 맛 프로필 바를 즉시 처리합니다.");
      $percentImages.each(function() {
        const $img = $(this);
        const value = parseInt($img.attr('alt'));
        const maxValue = 5;
        let targetWidthPercentage = 0;
        if (!isNaN(value) && value >= 0 && value <= maxValue) {
          targetWidthPercentage = (value / maxValue) * 100;
        }
        $img.css('width', targetWidthPercentage + '%');
      });
      setTimeout(function() {
        $percentImages.addClass('animate-in');
      }, 200); // 예시: 0.2초 후 애니메이션
    }
  }

  // --- (이전에 작성한 페이지네이션, 휠, 드래그 관련 JavaScript 코드들이 여기에 이어짐) ---

});