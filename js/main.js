const tabs = document.querySelectorAll('.tab');
const images = document.querySelectorAll('.tab_img img');
const contentsPC = document.querySelectorAll('.tab_content.dsk_only li');
const contentsMobile = document.querySelectorAll('.tab_content.mob_only li');

function activateTab(index) {
  const total = images.length;
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  // 탭 활성화
  tabs.forEach(tab => tab.classList.remove('active'));
  tabs[index].classList.add('active');

  // 이미지 클래스 정리
  images.forEach(img => img.classList.remove('active', 'prev', 'next'));
  images[prevIndex]?.classList.add('prev');
  images[index]?.classList.add('active');
  images[nextIndex]?.classList.add('next');

  // PC/모바일 텍스트 내용 전환
  contentsPC.forEach(li => li.classList.remove('active'));
  contentsMobile.forEach(li => li.classList.remove('active'));
  contentsPC[index]?.classList.add('active');
  contentsMobile[index]?.classList.add('active');
}

// 탭 클릭 이벤트 연결
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(index));
});

// 초기 활성화
// activateTab(0);



const items = document.querySelectorAll('.rolling li');
let current = 0;

function updateRolling() {
  items.forEach((item, i) => {
    item.classList.remove('active', 'prev', 'next');
  });

  let prev = (current - 1 + items.length) % items.length;
  let next = (current + 1) % items.length;

  items[prev].classList.add('prev');
  items[current].classList.add('active');
  items[next].classList.add('next');

  current = next;
}

// updateRolling(); // 초기 표시

setInterval(updateRolling, 3000); // 3초마다 롤링

  $(".scroll_img").each(function () {
    const $imgs = $(this).children("img").clone(true);
    $(this).append($imgs); // 같은 줄에 이미지 2세트 구성
  });




