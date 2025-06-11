document.addEventListener('DOMContentLoaded', function() {
  function checkScroll() {
    if (typeof $ === 'function') {
      const scrollPosition = $(window).scrollTop();
      const windowHeight = $(window).height();

      $(".ani").each(function () {
          const elementTop = $(this).offset().top;
          if (elementTop < scrollPosition + windowHeight * 0.8) {
              $(this).addClass("moving");
          }
      });
    }
  }

  if (typeof $ === 'function') {
    $(window).on("scroll", checkScroll);
    checkScroll();
  }

  const agreeAllCheckbox = document.getElementById('agreeAll');
  const termsOfUseCheckbox = document.getElementById('termsOfUse');
  const privacyPolicyCheckbox = document.getElementById('privacyPolicy');
  const marketingSmsCheckbox = document.getElementById('marketingSms');
  const marketingEmailCheckbox = document.getElementById('marketingEmail');

  const allIndividualCheckboxes = [
      termsOfUseCheckbox,
      privacyPolicyCheckbox,
      marketingSmsCheckbox,
      marketingEmailCheckbox
  ].filter(checkbox => checkbox !== null);

  if (allIndividualCheckboxes.length < 4) {
      console.warn('일부 동의 체크박스 요소를 찾을 수 없습니다. HTML의 ID를 확인해주세요.');
  }

  // "전체 동의" 체크박스 이벤트 리스너
  if (agreeAllCheckbox) {
    agreeAllCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        allIndividualCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });
  } else {
    console.error("'agreeAll' ID를 가진 체크박스를 찾을 수 없습니다.");
  }

  // 개별 동의 체크박스 이벤트 리스너 (전체 동의 상태 업데이트)
  allIndividualCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (agreeAllCheckbox) {
            const allChecked = allIndividualCheckboxes.every(cb => cb.checked);
            agreeAllCheckbox.checked = allChecked;
        }
    });
  });

  // 폼 제출 시 필수 약관 동의 여부 확인
  const joinForm = document.querySelector('form'); // 
  if (joinForm) {
    joinForm.addEventListener('submit', function(event) {
      const essentialTerms = document.getElementById('termsOfUse');
      const essentialPrivacy = document.getElementById('privacyPolicy');
      
      let essentialAgreed = true;

      if (!essentialTerms || !essentialTerms.checked) {
        essentialAgreed = false;
      }
      if (!essentialPrivacy || !essentialPrivacy.checked) {
        essentialAgreed = false;
      }

      if (!essentialAgreed) {
          alert('필수 약관에 모두 동의해야 회원가입을 진행할 수 있습니다.');
          event.preventDefault();
      }
    });
  } else {
    console.error("회원가입 폼 요소를 찾을 수 없습니다.");
  }
});