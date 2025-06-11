document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const loginForms = document.querySelectorAll('.login-form');
    const mainTitles = document.querySelectorAll('.txt-box h2.tit');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            loginForms.forEach(form => form.classList.remove('active'));
            const targetForm = document.getElementById(targetId);
            if (targetForm) {
                targetForm.classList.add('active');
            }

            mainTitles.forEach(title => title.classList.remove('active'));
            const targetTitle = document.querySelector(`.txt-box h2[data-target-title="${targetId}"]`);
            if (targetTitle) {
                targetTitle.classList.add('active');
            }
        });
    });

    // 비밀번호 보이기/숨기기 토글
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling; 
            if (input.type === 'password') {
                input.type = 'text';
                this.querySelector('i').classList.remove('fa-eye');
                this.querySelector('i').classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.querySelector('i').classList.remove('fa-eye-slash');
                this.querySelector('i').classList.add('fa-eye');
            }
        });
    });
});