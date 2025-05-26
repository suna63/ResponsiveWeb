/* $(document).ready(function() {
  // 1. 주요 요소 선택
  const $viewport = $('#section0 .viewport'); // ID #section0 추가하여 명확히 선택
  const $articles = $viewport.find('article.content-page'); // article에 .content-page 클래스 사용
  const $pageNumberSpan = $('#section0 .pagination-controls .page-number');
  const $prevButton = $('#section0 .page-arrow.prev');
  const $nextButton = $('#section0 .page-arrow.next');

  // 2. 상태 변수
  let currentPageIndex = 0;
  const totalPages = $articles.length;
  const tabletBreakpoint = 768; // CSS 미디어쿼리 분기점과 일치시켜야 합니다.

  // 3. 페이지 번호 업데이트 및 버튼 상태 변경 함수
  function updatePageDisplay() {
    if (totalPages > 0) {
      $pageNumberSpan.text(currentPageIndex + 1); // 1부터 시작하는 페이지 번호
    } else {
      $pageNumberSpan.text('-'); // 페이지가 없을 경우
    }

    // 이전 버튼 상태
    if (currentPageIndex === 0) {
      $prevButton.addClass('disabled'); // CSS에서 .disabled 스타일 정의 필요
    } else {
      $prevButton.removeClass('disabled');
    }

    // 다음 버튼 상태
    if (currentPageIndex >= totalPages - 1) {
      $nextButton.addClass('disabled');
    } else {
      $nextButton.removeClass('disabled');
    }
  }

  // 4. 특정 페이지로 스크롤하는 함수
  function scrollToPage(index) {
    if (index < 0 || index >= totalPages) {
      return; // 유효한 인덱스가 아니면 중단
    }

    currentPageIndex = index;
    // const $targetArticle = $articles.eq(currentPageIndex); // 이 변수는 현재 직접 사용되지 않음

    if ($(window).width() >= tabletBreakpoint) {
      // PC/태블릿 - 가로 스크롤
      // 각 article의 너비가 viewport 너비의 100% (또는 100vw이고 viewport도 그에 맞게 설정됨)라고 가정
      const scrollAmount = $viewport.width() * currentPageIndex;
      $viewport.stop(true).animate({ // stop(true)로 이전 애니메이션 즉시 중단
        scrollLeft: scrollAmount
      }, 500); // 0.5초 동안 부드럽게 스크롤
    } else {
      // 모바일 - 세로 스크롤
      // 각 article의 높이가 viewport 높이의 100%라고 가정
      const scrollAmount = $viewport.height() * currentPageIndex;
      $viewport.stop(true).animate({
        scrollTop: scrollAmount
      }, 500);
    }

    updatePageDisplay();
  }

  // 5. 다음 버튼 클릭 이벤트 핸들러
  $nextButton.on('click', function(e) {
    e.preventDefault();
    if (currentPageIndex < totalPages - 1) {
      scrollToPage(currentPageIndex + 1);
    }
  });

  // 6. 이전 버튼 클릭 이벤트 핸들러
  $prevButton.on('click', function(e) {
    e.preventDefault();
    if (currentPageIndex > 0) {
      scrollToPage(currentPageIndex - 1);
    }
  });

  // 7. 창 크기 변경 시 현재 페이지로 스크롤 위치 재조정 (선택 사항이지만 권장)
  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // 레이아웃 변경에 맞춰 스크롤 위치 즉시 조정 (애니메이션 없이)
      if ($(window).width() >= tabletBreakpoint) {
        if ($viewport.scrollLeft() !== $viewport.width() * currentPageIndex) {
             $viewport.scrollLeft($viewport.width() * currentPageIndex);
        }
      } else {
        if ($viewport.scrollTop() !== $viewport.height() * currentPageIndex) {
            $viewport.scrollTop($viewport.height() * currentPageIndex);
        }
      }
      // 필요시 버튼 상태 등도 업데이트
      updatePageDisplay();
    }, 250); // 250ms 디바운스
  });

  // 8. 초기화
  if (totalPages > 0) {
    // article 태그에 content-page 클래스가 있는지 확인하고,
    // 없다면 JS로 추가하거나 HTML에 직접 추가하는 것을 고려해주세요.
    // 예: $articles.addClass('content-page'); (만약 HTML에 클래스가 없다면)
    scrollToPage(0); // 첫 페이지(인덱스 0)로 스크롤 및 UI 업데이트
  } else {
    // article이 없을 경우 처리 (예: 페이지네이션 컨트롤 숨기기 등)
    console.warn("페이지네이션: 스크롤할 article.content-page 요소가 없습니다.");
    updatePageDisplay(); // 버튼 상태 등을 초기화 (예: 둘 다 disabled)
  }
}); */

/* $(document).ready(function() {
  // 1. 주요 요소 선택
  const $viewport = $('#section0 .viewport'); // #section0 안의 .viewport로 명확히
  const $articles = $viewport.find('article.content-page'); // article에 .content-page 클래스 사용
  const $pageNumberSpan = $('#section0 .pagination-controls .page-number');
  const $prevButton = $('#section0 .page-arrow.prev');
  const $nextButton = $('#section0 .page-arrow.next');

  // 2. 상태 변수
  let currentPageIndex = 0;
  const totalPages = $articles.length;
  const tabletBreakpoint = 768; // CSS 미디어쿼리 분기점과 일치 (예: 768px)
  let isWheeling = false;       // 마우스 휠 이벤트 중복/과다 실행 방지 플래그
  let wheelTimeout;             // isWheeling 상태를 해제하기 위한 타이머

  // 3. 페이지 번호 업데이트 및 이전/다음 버튼 상태 변경 함수
  function updatePageDisplay() {
    if (totalPages > 0) {
      $pageNumberSpan.text(currentPageIndex + 1); // 페이지 번호는 1부터 시작
    } else {
      $pageNumberSpan.text('-'); // 표시할 페이지가 없을 경우
    }

    // 이전 버튼 활성화/비활성화 (CSS에서 .disabled 스타일 정의 필요)
    if (currentPageIndex === 0) {
      $prevButton.addClass('disabled');
    } else {
      $prevButton.removeClass('disabled');
    }

    // 다음 버튼 활성화/비활성화
    if (currentPageIndex >= totalPages - 1) {
      $nextButton.addClass('disabled');
    } else {
      $nextButton.removeClass('disabled');
    }
  }

  // 4. 특정 페이지(article)로 스크롤하는 함수
  function scrollToPage(index, instant = false) {
    if (index < 0 || index >= totalPages || $articles.length === 0) {
      // 유효하지 않은 인덱스거나 article이 없으면 실행 중지
      if ($articles.length === 0) updatePageDisplay(); // article 없을 시 버튼 상태 등 업데이트
      return;
    }

    currentPageIndex = index;
    const animationDuration = instant ? 0 : 500; // 즉시 이동 또는 0.5초 애니메이션

    if ($(window).width() >= tabletBreakpoint) {
      // PC/태블릿 - 가로 스크롤
      const scrollAmount = $viewport.width() * currentPageIndex;
      $viewport.stop(true).animate({
        scrollLeft: scrollAmount
      }, animationDuration);
    } else {
      // 모바일 - 세로 스크롤
      const scrollAmount = $viewport.height() * currentPageIndex;
      $viewport.stop(true).animate({
        scrollTop: scrollAmount
      }, animationDuration);
    }

    updatePageDisplay(); // 페이지 번호 및 버튼 상태 업데이트
  }

  // 5. 다음 버튼 클릭 이벤트
  $nextButton.on('click', function(e) {
    e.preventDefault();
    if (currentPageIndex < totalPages - 1) {
      scrollToPage(currentPageIndex + 1);
    }
  });

  // 6. 이전 버튼 클릭 이벤트
  $prevButton.on('click', function(e) {
    e.preventDefault();
    if (currentPageIndex > 0) {
      scrollToPage(currentPageIndex - 1);
    }
  });

  // 7. 마우스 휠 이벤트 핸들러 (PC/태블릿 가로 스크롤 및 페이지 전체 스크롤 연동)
  $viewport.on('wheel', function(event) {
    // PC/태블릿 뷰가 아니면 이 함수는 아무것도 하지 않고 기본 세로 스크롤 허용
    if ($(window).width() < tabletBreakpoint) {
      return;
    }

    // 이미 휠 애니메이션(페이지 넘김) 처리 중이면 중복 실행 방지
    if (isWheeling) {
      event.preventDefault(); // 다른 스크롤도 일단 막음
      return;
    }

    const delta = event.originalEvent.deltaY || event.originalEvent.detail || (-event.originalEvent.wheelDelta);
    let didScrollHorizontally = false;

    if (delta > 0) { // 마우스 휠 아래로 스크롤 (가로로는 오른쪽으로 이동 시도)
      if (currentPageIndex < totalPages - 1) { // 마지막 페이지가 아니라면
        event.preventDefault(); // ★ 기본 페이지 세로 스크롤을 막고
        scrollToPage(currentPageIndex + 1); // ★ 가로로 다음 페이지 이동
        didScrollHorizontally = true;
      } else {
        // 가로 스크롤의 마지막 페이지임. 더 이상 오른쪽으로 갈 수 없음.
        // 여기서 event.preventDefault()를 호출하지 않으면, 브라우저 기본 동작인
        // 페이지 전체의 세로 스크롤이 일어나도록 허용 (아래로 스크롤).
        return;
      }
    } else if (delta < 0) { // 마우스 휠 위로 스크롤 (가로로는 왼쪽으로 이동 시도)
      if (currentPageIndex > 0) { // 첫 페이지가 아니라면
        event.preventDefault(); // ★ 기본 페이지 세로 스크롤을 막고
        scrollToPage(currentPageIndex - 1); // ★ 가로로 이전 페이지 이동
        didScrollHorizontally = true;
      } else {
        // 가로 스크롤의 첫 페이지임. 더 이상 왼쪽으로 갈 수 없음.
        // 여기서 event.preventDefault()를 호출하지 않으면, 브라우저 기본 동작인
        // 페이지 전체의 세로 스크롤이 일어나도록 허용 (위로 스크롤).
        return;
      }
    }

    if (didScrollHorizontally) {
      isWheeling = true; // 휠 처리 중 플래그 설정
      clearTimeout(wheelTimeout); // 이전 타이머가 있다면 취소
      wheelTimeout = setTimeout(function() {
        isWheeling = false; // 일정 시간 후 플래그 해제, 다시 휠 이벤트 처리 가능
      }, 600); // 애니메이션 시간(500ms)보다 약간 길게 설정
    }
  });

  // 8. 창 크기 변경 시 현재 페이지로 스크롤 위치 재조정 (레이아웃 깨짐 방지)
  let resizeDebounceTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeDebounceTimer);
    resizeDebounceTimer = setTimeout(function() {
      // 현재 페이지 인덱스로 즉시 스크롤 (애니메이션 없이)
      scrollToPage(currentPageIndex, true);
    }, 250); // 0.25초 디바운스
  });

  // 9. 초기화
  if (totalPages > 0) {
    // article 태그에 .content-page 클래스가 없다면 여기서 추가 가능:
    // $articles.addClass('content-page');
    scrollToPage(0, true); // 페이지 로드 시 첫 페이지(인덱스 0)로 즉시 설정 및 UI 업데이트
  } else {
    // 스크롤할 article이 없을 경우의 처리 (예: 페이지네이션 컨트롤 숨기기 등)
    console.warn("주의: 스크롤할 'article.content-page' 요소가 .viewport 내에 없습니다.");
    updatePageDisplay(); // 페이지 번호 '-' 표시 및 버튼 비활성화
  }
});
 */

$(document).ready(function() {
  // 1. 주요 요소 선택
  const $viewport = $('#section0 .viewport');
  const $articles = $viewport.find('article.content-page'); // article에 .content-page 클래스 사용
  const $pageNumberSpan = $('#section0 .pagination-controls .page-number');
  const $prevButton = $('#section0 .page-arrow.prev');
  const $nextButton = $('#section0 .page-arrow.next');

  // 2. 상태 변수
  let currentPageIndex = 0;
  const totalPages = $articles.length;
  const tabletBreakpoint = 768; // CSS 미디어쿼리 분기점과 일치 (예: 768px)
  
  // 휠 이벤트 관련 변수
  let isWheeling = false;
  let wheelTimeout;
  
  // 드래그 스크롤 관련 변수
  let isDragging = false;
  let dragStartX, dragStartY;
  let dragInitialScrollLeft, dragInitialScrollTop;
  const DRAG_THRESHOLD_RATIO = 0.25; // 드래그로 페이지를 넘길지 결정하는 뷰포트 크기 대비 비율 (1/4)

  // 3. 페이지 번호 업데이트 및 이전/다음 버튼 상태 변경 함수
  function updatePageDisplay() {
    if (totalPages > 0) {
      $pageNumberSpan.text(currentPageIndex + 1);
    } else {
      $pageNumberSpan.text('-');
    }
    // CSS에서 .disabled 스타일에 따라 버튼 모양 변경 (예: opacity, pointer-events)
    $prevButton.toggleClass('disabled', currentPageIndex === 0);
    $nextButton.toggleClass('disabled', currentPageIndex >= totalPages - 1);
  }

  // 4. 특정 페이지(article)로 스크롤하는 함수
  function scrollToPage(index, instant = false) {
    if (index < 0 || index >= totalPages || $articles.length === 0) {
      if ($articles.length === 0) updatePageDisplay(); // article 없을 시 버튼 상태 등 초기화
      return; // 유효하지 않으면 중단
    }

    const oldPageIndex = currentPageIndex;
    currentPageIndex = index;
    const animationDuration = instant ? 0 : 500; // 즉시 이동 또는 0.5초 애니메이션

    // 스크롤 방향 결정
    if ($(window).width() >= tabletBreakpoint) { // PC/태블릿 - 가로 스크롤
      const scrollAmount = $viewport.width() * currentPageIndex;
      if ($viewport.scrollLeft() !== scrollAmount || instant) { // 현재 위치와 다를 때만 또는 즉시 이동일 때
        $viewport.stop(true).animate({ scrollLeft: scrollAmount }, animationDuration);
      }
    } else { // 모바일 - 세로 스크롤
      const scrollAmount = $viewport.height() * currentPageIndex;
       if ($viewport.scrollTop() !== scrollAmount || instant) {
        $viewport.stop(true).animate({ scrollTop: scrollAmount }, animationDuration);
       }
    }
    
    if (oldPageIndex !== currentPageIndex || instant) { // 페이지가 실제로 변경되었거나 즉시 업데이트 필요시
        updatePageDisplay();
    }
  }

  // 5. 다음/이전 버튼 클릭 이벤트
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

  // 6. 마우스 휠 이벤트 핸들러 (PC/태블릿 가로 스크롤 및 페이지 전체 스크롤 연동)
  $viewport.on('wheel', function(event) {
    if ($(window).width() < tabletBreakpoint) { // 모바일에선 기본 세로 스크롤 허용
      return;
    }

    if (isWheeling) { // 이전 휠 처리 중이면 중복 방지
      event.preventDefault();
      return;
    }

    const delta = event.originalEvent.deltaY || event.originalEvent.detail || (-event.originalEvent.wheelDelta);
    let didScrollHorizontally = false;

    if (delta > 0) { // 휠 아래로 (가로로는 오른쪽)
      if (currentPageIndex < totalPages - 1) {
        event.preventDefault(); // 기본 페이지 스크롤 막음
        scrollToPage(currentPageIndex + 1);
        didScrollHorizontally = true;
      } else { return; } // 가로 스크롤 끝, 기본 페이지 스크롤 허용
    } else if (delta < 0) { // 휠 위로 (가로로는 왼쪽)
      if (currentPageIndex > 0) {
        event.preventDefault();
        scrollToPage(currentPageIndex - 1);
        didScrollHorizontally = true;
      } else { return; } // 가로 스크롤 처음, 기본 페이지 스크롤 허용
    }

    if (didScrollHorizontally) {
      isWheeling = true;
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(function() {
        isWheeling = false;
      }, 600); // 쿨다운 시간 (애니메이션 시간보다 약간 길게)
    }
  });

  // 7. 드래그(클릭 후 잡아끌기)로 스크롤하는 기능
  $viewport.on('mousedown touchstart', function(e) {
    if (e.type === 'mousedown' && e.which !== 1) return; // 마우스 왼쪽 버튼만

    isDragging = true;
    const eventCoord = e.type === 'touchstart' ? e.originalEvent.touches[0] : e;
    dragStartX = eventCoord.pageX;
    dragStartY = eventCoord.pageY;
    dragInitialScrollLeft = $viewport.scrollLeft();
    dragInitialScrollTop = $viewport.scrollTop();

    $viewport.addClass('is-dragging'); // CSS에서 cursor: grabbing; 등 적용 가능
    // $('body').addClass('no-user-select'); // 드래그 중 텍스트 선택 방지
    
    // 터치 환경에서, 내용물 중 링크 등이 있다면 드래그 시작 시 기본 동작을 막아 스크롤이 부드럽게 되도록 함
    // 하지만 이 경우, 내부 요소의 클릭 이벤트가 발생하지 않을 수 있으므로 주의.
    // if (e.type === 'touchstart') { event.preventDefault(); }
  });

  $(document).on('mousemove touchmove', function(e) {
    if (!isDragging) return;

    // 드래그 중에는 페이지 전체 스크롤 같은 기본 동작 막기
    // (링크가 있는 article 내부에서는 링크 클릭이 어려워질 수 있으므로,
    //  필요에 따라 event.target 등을 확인하여 선택적으로 preventDefault() 호출)
    // e.preventDefault(); 

    const eventCoord = e.type === 'touchmove' ? e.originalEvent.touches[0] : e;
    const currentX = eventCoord.pageX;
    const currentY = eventCoord.pageY;
    const deltaX = currentX - dragStartX;
    const deltaY = currentY - dragStartY;

    if ($(window).width() >= tabletBreakpoint) { // PC/태블릿 - 가로 드래그
      $viewport.scrollLeft(dragInitialScrollLeft - deltaX);
    } else { // 모바일 - 세로 드래그
      $viewport.scrollTop(dragInitialScrollTop - deltaY);
    }
  });

  $(document).on('mouseup touchend touchcancel', function(e) {
    if (!isDragging) return;
    isDragging = false;
    $viewport.removeClass('is-dragging');
    // $('body').removeClass('no-user-select');

    let targetPageIndex = currentPageIndex; // 기본은 현재 페이지 유지
    const eventCoord = e.type.includes('mouse') ? e : e.originalEvent.changedTouches[0];
    // changedTouches가 없을 수 있으므로 방어 코드
    if (!eventCoord && e.originalEvent.touches && e.originalEvent.touches.length > 0) {
        // touchend에서 changedTouches 대신 touches를 사용해야 할 수도 있는 경우 대비 (일반적이지 않음)
        // eventCoord = e.originalEvent.touches[0];
    } else if (!eventCoord) {
        // 좌표를 얻을 수 없으면 현재 페이지로 스냅 (오류 방지)
        scrollToPage(currentPageIndex);
        return;
    }

    const movedX = eventCoord.pageX - dragStartX;
    const movedY = eventCoord.pageY - dragStartY;

    if ($(window).width() >= tabletBreakpoint) { // 가로 스크롤 판단
      const viewportWidth = $viewport.width();
      if (Math.abs(movedX) > viewportWidth * DRAG_THRESHOLD_RATIO) { // 뷰포트 너비의 N% 이상 움직였을 때
        targetPageIndex = (movedX < 0) ? currentPageIndex + 1 : currentPageIndex - 1;
      }
    } else { // 세로 스크롤 판단
      const viewportHeight = $viewport.height();
      if (Math.abs(movedY) > viewportHeight * DRAG_THRESHOLD_RATIO) { // 뷰포트 높이의 N% 이상 움직였을 때
        targetPageIndex = (movedY < 0) ? currentPageIndex + 1 : currentPageIndex - 1;
      }
    }

    targetPageIndex = Math.max(0, Math.min(targetPageIndex, totalPages - 1)); // 인덱스 범위 검사
    scrollToPage(targetPageIndex); // 계산된 페이지로 부드럽게 스냅
  });

  // 8. 창 크기 변경 시 현재 페이지로 스크롤 위치 재조정
  let resizeDebounceTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeDebounceTimer);
    resizeDebounceTimer = setTimeout(function() {
      scrollToPage(currentPageIndex, true); // 현재 페이지로 즉시 위치 조정
    }, 250);
  });

  // 9. 초기화
  if (totalPages > 0) {
    scrollToPage(0, true); // 페이지 로드 시 첫 페이지로 즉시 설정 및 UI 업데이트
  } else {
    console.warn("스크롤할 'article.content-page' 요소가 .viewport 내에 없습니다.");
    updatePageDisplay(); // 페이지 번호 '-' 표시 및 버튼 비활성화
  }
});