$(document).ready(function() {
  const $viewport = $('#section0 .viewport');
  const $articles = $viewport.find('article.content-page');
  const $pageNumberSpan = $('#section0 .pagination-controls .page-number');
  const $prevButton = $('#section0 .page-arrow.prev');
  const $nextButton = $('#section0 .page-arrow.next');

  let currentPageIndex = 0;
  const totalPages = $articles.length;
  const tabletBreakpoint = 768;
  
  let isWheeling = false;
  let wheelTimeout;
  
  let isDragging = false;
  let dragStartX, dragStartY;
  let dragInitialScrollLeft, dragInitialScrollTop;
  const DRAG_THRESHOLD_RATIO = 0.25;

  let isProgrammaticScroll = false; 
  let programmaticScrollTimeout;

  // 페이지 번호 업데이트 및 이전/다음 버튼 상태 변경
  function updatePageDisplay() {
    if (totalPages > 0) {
      $pageNumberSpan.text(currentPageIndex + 1);
    } else {
      $pageNumberSpan.text('-');
    }
    $prevButton.toggleClass('disabled', currentPageIndex === 0);
    $nextButton.toggleClass('disabled', currentPageIndex >= totalPages - 1 && totalPages > 0);
  }

  // article로 스크롤
  function scrollToPage(index, instant = false) {
    if (index < 0 || index >= totalPages || $articles.length === 0) {
      if ($articles.length === 0) updatePageDisplay();
      return;
    }

    const oldPageIndex = currentPageIndex;
    currentPageIndex = index;
    const animationDuration = instant ? 0 : 500;

    isProgrammaticScroll = true;
    clearTimeout(programmaticScrollTimeout);

    const scrollCompleteCallback = function() {
      programmaticScrollTimeout = setTimeout(function() {
        isProgrammaticScroll = false;
      }, 100);
    };

    if ($(window).width() >= tabletBreakpoint) {
      const scrollAmount = $viewport.width() * currentPageIndex;
      if ($viewport.scrollLeft() !== scrollAmount || instant) {
        $viewport.stop(true).animate({ scrollLeft: scrollAmount }, animationDuration, scrollCompleteCallback);
      } else {
        scrollCompleteCallback();
      }
    } else {
      const scrollAmount = $viewport.height() * currentPageIndex;
      if ($viewport.scrollTop() !== scrollAmount || instant) {
        $viewport.stop(true).animate({ scrollTop: scrollAmount }, animationDuration, scrollCompleteCallback);
      } else {
        scrollCompleteCallback();
      }
    }
    
    updatePageDisplay();
  }

  // 다음/이전 버튼
  $nextButton.on('click', function(e) {
    e.preventDefault();
    if (!$(this).hasClass('disabled') && currentPageIndex < totalPages - 1) {
      scrollToPage(currentPageIndex + 1);
    }
  });
  $prevButton.on('click', function(e) {
    e.preventDefault();
    if (!$(this).hasClass('disabled') && currentPageIndex > 0) {
      scrollToPage(currentPageIndex - 1);
    }
  });

  // 마우스 휠 이벤트 핸들러
  $viewport.on('wheel', function(event) {
    if ($(window).width() < tabletBreakpoint) return;
    if (isWheeling) { event.preventDefault(); return; }

    const delta = event.originalEvent.deltaY || event.originalEvent.detail || (-event.originalEvent.wheelDelta);
    let didScrollHorizontally = false;

    if (delta > 0) { 
      if (currentPageIndex < totalPages - 1) {
        event.preventDefault(); scrollToPage(currentPageIndex + 1); didScrollHorizontally = true;
      } else { return; }
    } else if (delta < 0) {
      if (currentPageIndex > 0) {
        event.preventDefault(); scrollToPage(currentPageIndex - 1); didScrollHorizontally = true;
      } else { return; }
    }

    if (didScrollHorizontally) {
      isWheeling = true; clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(function() { isWheeling = false; }, 600);
    }
  });

  // 드래그 스크롤
  $viewport.on('mousedown touchstart', function(e) { /* ... (기존 드래그 시작 로직) ... */ });
  $(document).on('mousemove touchmove', function(e) { /* ... (기존 드래그 중 로직) ... */ });
  $(document).on('mouseup touchend touchcancel', function(e) { /* ... (기존 드래그 종료 및 scrollToPage 호출 로직) ... */ });

  let resizeDebounceTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeDebounceTimer);
    resizeDebounceTimer = setTimeout(function() {
      scrollToPage(currentPageIndex, true);
    }, 250);
  });

  // 모바일에서 스크롤 시 현재 페이지 감지
  let scrollDetectTimer;
  $viewport.on('scroll', function() {
    if (isProgrammaticScroll || $(window).width() >= tabletBreakpoint) {
      return;
    }

    clearTimeout(scrollDetectTimer);
    scrollDetectTimer = setTimeout(function() {
      const viewportHeight = $viewport.height();
      if (viewportHeight === 0) return;
      const currentScrollTop = $viewport.scrollTop();
      let newPageIndex = Math.round(currentScrollTop / viewportHeight);
      newPageIndex = Math.max(0, Math.min(newPageIndex, totalPages - 1));

      if (newPageIndex !== currentPageIndex) {
        currentPageIndex = newPageIndex;
        updatePageDisplay();
      }
    }, 150);
  });

  if (totalPages > 0) {
    scrollToPage(0, true); 
  } else {
    console.warn("스크롤할 'article.content-page' 요소가 .viewport 내에 없습니다.");
    updatePageDisplay();
  }
});