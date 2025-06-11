$(document).ready(function() {

  const $percentImages = $('#section0 .content .right .taste img.percent');

  if ($percentImages.length > 0) {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      };

      const animateBarOnScroll = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const $img = $(entry.target);
            const value = parseInt($img.attr('alt'));
            const maxValue = 5;

            let targetWidthPercentage = 0;

            if (!isNaN(value) && value >= 0 && value <= maxValue) {
              targetWidthPercentage = (value / maxValue) * 100;
            } else {
              console.warn('맛 프로필 바 이미지에 유효한 alt 값이 없거나 범위를 벗어납니다:', $img.attr('alt'));
            }
            
            $img.css('width', targetWidthPercentage + '%'); 
            
            setTimeout(function() {
              $img.addClass('animate-in');
            }, 50);

            observer.unobserve(entry.target);
          }
        });
      };

      const barObserver = new IntersectionObserver(animateBarOnScroll, observerOptions);

      $percentImages.each(function() {
        barObserver.observe(this);
      });

    } else {
    
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
      }, 200);
    }
  }

const pathElement = document.getElementById('myAnimatedPath');
if (pathElement) {
  const length = pathElement.getTotalLength();
  pathElement.style.setProperty('--path-length', length);
  console.log('Path length set to CSS variable --path-length:', length);
}
});