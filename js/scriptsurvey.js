 // 술에 종류 밑 설명
        const drinkData = [
                        { name: "경탁주", category: "중류주", sweet: 1, sour: 1, fresh: 3, body: 3, aroma: 3, alcohol: 40, image: "../image/GyeongTakju.png" },

            { name: "배꽃 필 무렵", category: "중류주", sweet: 2, sour: 1, fresh: 3, body: 3, aroma: 3, alcohol: 40, image: "image/배꽃필무렵.png" },

            { name: "술취한원숭이", category: "중류주", sweet: 2, sour: 2, fresh: 3, body: 3, aroma: 3, alcohol: 30, image: "image/술취한원숭이.png" },

            { name: "강냉이막걸리", category: "중류주", sweet: 1, sour: 1, fresh: 3, body: 3, aroma: 3, alcohol: 30, image: "image/강냉이막걸리.png" },

            { name: "한산소곡주", category: "중류주", sweet: 1, sour: 1, fresh: 3, body: 3, aroma: 3, alcohol: 20, image: "image/한산소곡주.png" },

            { name: "마타리 08", category: "약주", sweet: 3, sour: 1, fresh: 3, body: 3, aroma: 3, alcohol: 20, image: "image/마타리.png" },

            { name: "우렁이쌀", category: "과실주", sweet: 4, sour: 3, fresh: 2, body: 2, aroma: 2, alcohol: 20, image: "image/우렁이쌀.png" },

            { name: "초가 한청 철원오대쌀청주", category: "청주", sweet: 2, sour: 2, fresh: 2, body: 2, aroma: 2, alcohol: 20, image: "image/초가한청철원오대쌀청주.png" },

            { name: "여유", category: "청주", sweet: 2, sour: 3, fresh: 3, body: 3, aroma: 3, alcohol: 10, image: "image/여유.png" },

            { name: "안동소주", category: "약주", sweet: 4, sour: 2, fresh: 4, body: 4, aroma: 4, alcohol: 10, image: "image/안동소주.png" },

            { name: "아리랑 주조 겨울소주", category: "과실주", sweet: 5, sour: 2, fresh: 4, body: 4, aroma: 4, alcohol: 10, image: "image/아리랑주조겨울소주.png" },

            { name: "느린마을소주 21", category: "중류주", sweet: 3, sour: 3, fresh: 2, body: 2, aroma: 2, alcohol: 10, image: "image/느린마을소주21.png" },

            { name: "사화 유자", category: "탁주", sweet: 3, sour: 2, fresh: 4, body: 4, aroma: 4, alcohol: 10, image: "image/사화유자.png" },

            { name: "찾을수록 애플", category: "과실주", sweet: 4, sour: 2, fresh: 3, body: 3, aroma: 3, alcohol: 10, image: "image/찾을수록애플.png" },

            { name: "오계리 아이스와인", category: "탁주", sweet: 3, sour: 2, fresh: 2, body: 2, aroma: 2, alcohol: 10, image: "image/오계리아이스와인.png" },

            { name: "단감명작", category: "리큐르", sweet: 3, sour: 3, fresh: 3, body: 3, aroma: 3, alcohol: 10, image: "image/단감명작.png" },

            { name: "오매락 세레모니주", category: "탁주", sweet: 3, sour: 2, fresh: 2, body: 2, aroma: 2, alcohol: 10, image: "image/오매락세레모니주.png" },

            { name: "배도가심플리애플", category: "국산와인", sweet: 4, sour: 2, fresh: 3, body: 3, aroma: 3, alcohol: 10, image: "image/배도가심플리애플.png" },

            { name: "시작", category: "과실주", sweet: 4, sour: 4, fresh: 2, body: 2, aroma: 2, alcohol: 10, image: "image/시작.png" },

            { name: "허니비", category: "탁주", sweet: 3, sour: 3, fresh: 3, body: 3, aroma: 3, alcohol: 10, image: "image/허니비.png" }
        ];

        // 테스트 질문
        const questions = [
            {
                title: "단맛 정도",
                text: "원하는 단맛 정도를 선택해 주세요.",
                options: [1, 2, 3, 4, 5]
            },
            {
                title: "신맛 정도", 
                text: "원하시는 신맛의 정도를 선택해 주세요.",
                options: [1, 2, 3, 4, 5]
            },
            {
                title: "청량감",
                text: "원하시는 청량감을 선택해 주세요.",
                options: [1, 2, 3, 4, 5]
            },
            {
                title: "바디감",
                text: "원하시는 바디감을 선택해 주세요.",
                options: [1, 2, 3, 4, 5]
            },
            {
                title: "향의 정도",
                text: "원하시는 향의 정도를 선택해 주세요.",
                options: [1, 2, 3, 4, 5]
            },
            {
                title: "알콜도수",
                text: "원하시는 알콜도수를 선택해 주세요.",
                options: [10, 20, 30, 40, 50]
            }
        ];

        let currentQuestion = 0;
        let answers = [];

        function startTest() {
            showPage('question-page');
            showQuestion();
        }

        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
        }

        function showQuestion() {
            const question = questions[currentQuestion];
            const progress = ((currentQuestion + 1) / questions.length) * 100;
            
            document.getElementById('progress-bar').style.width = progress + '%';
            document.getElementById('question-title').textContent = question.title;
            document.getElementById('question-text').textContent = question.text;
            
            const optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, idx) => {
                const button = document.createElement('button');
                button.className = 'option';
                button.textContent = option;
                button.onclick = () => selectOption(button, option);
                optionsContainer.appendChild(button);

        // 첫 번째 옵션(1번)을 기본 선택
        if (idx === 0) {
            selectOption(button, option);
        }
    });
    
    // 첫 번째 옵션이 선택되었으므로 next-btn 활성화
    document.getElementById('next-btn').disabled = false;
}

        function selectOption(button, value) {
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            button.classList.add('selected');
            answers[currentQuestion] = value;
            document.getElementById('next-btn').disabled = false;
        }

        function nextQuestion() {
            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }

        function calculateSimilarity(userPrefs, drink) {
            const weights = [0.2, 0.2, 0.2, 0.2, 0.15, 0.05]; // 각 속성별 가중치
            let score = 0;
            
            // 각 속성별 유사도 계산
            score += weights[0] * (5 - Math.abs(userPrefs[0] - drink.sweet));
            score += weights[1] * (5 - Math.abs(userPrefs[1] - drink.sour));
            score += weights[2] * (5 - Math.abs(userPrefs[2] - drink.fresh));
            score += weights[3] * (5 - Math.abs(userPrefs[3] - drink.body));
            score += weights[4] * (5 - Math.abs(userPrefs[4] - drink.aroma));
            
            // 알코올 도수는 더 넓은 범위로 계산
            const alcoholDiff = Math.abs(userPrefs[5] - drink.alcohol);
            score += weights[5] * Math.max(0, 50 - alcoholDiff) / 10;
            
            return score;
        }

        function showResult() {
            // 가장 유사한 음료 찾기
            let maxScore = -1;
            let bestDrink = null;
            let allScores = [];
            
            drinkData.forEach(drink => {
                const score = calculateSimilarity(answers, drink);
                allScores.push({ drink, score });
                if (score > maxScore) {
                    maxScore = score;
                    bestDrink = drink;
                }
            });
            
            // 점수순으로 정렬
            allScores.sort((a, b) => b.score - a.score);
            
            // 결과 표시
            document.getElementById('drink-image').src = bestDrink.image;
            document.getElementById('drink-image').alt = bestDrink.name;
            document.getElementById('result-title').textContent = `${bestDrink.category} 추천`;
            document.getElementById('drink-match').textContent = ` ${bestDrink.name}`;
            
            // 설명 생성
            const description = generateDescription(bestDrink, answers);
            document.getElementById('result-description').textContent = description.main;
            document.getElementById('result-reason').textContent = description.reason;
            
            // 취향 프로필 표시
            const tasteProfile = document.getElementById('taste-profile');
            const labels = ['단맛', '신맛', '청량감', '바디감', '향', '알코올'];
            tasteProfile.innerHTML = '';
            
            answers.forEach((value, index) => {
                const item = document.createElement('div');
                item.className = 'taste-item';
                const displayValue = index === 5 ? value + '%' : value + '/5';
                item.innerHTML = `<strong>${labels[index]}</strong><br>${displayValue}`;
                tasteProfile.appendChild(item);
            });
            
            // 대안 음료 표시 (상위 4개)
            const alternativeList = document.getElementById('alternative-list');
            alternativeList.innerHTML = '';
            allScores.slice(1, 5).forEach(item => {
                const alt = document.createElement('div');
                alt.className = 'alternative-item';
                alt.innerHTML = `
                    <img src="${item.drink.image}" alt="${item.drink.name}" />
                    <span>${item.drink.name}</span>
                `;
                alternativeList.appendChild(alt);
            });
            
            showPage('result-page');
        }

        function generateDescription(drink, userPrefs) {
            const categoryDescriptions = {
                "중류주": "전통적인 증류주의 깊은 맛을 즐기는",
                "약주": "부드럽고 우아한 맛을 선호하는",
                "과실주": "과일의 달콤함과 향을 사랑하는",
                "청주": "깔끔하고 정제된 맛을 추구하는",
                "탁주": "구수하고 친근한 맛을 좋아하는",
                "리큐르": "달콤하고 향긋한 맛을 즐기는",
                "국산와인": "세련되고 모던한 맛을 선호하는"
            };
            
            const main = `당신은 ${categoryDescriptions[drink.category] || "특별한 취향을 가진"} 분입니다. ${drink.name}은 당신의 취향에 완벽하게 맞는 음료로, 특별한 순간을 더욱 의미있게 만들어줄 것입니다.`;
            
            let reason = `이 음료는 `;
            const features = [];
            
            if (drink.sweet >= 4) features.push("풍부한 단맛");
            else if (drink.sweet <= 2) features.push("깔끔한 맛");
            
            if (drink.fresh >= 4) features.push("상쾌한 청량감");
            if (drink.body >= 4) features.push("풍부한 바디감");
            if (drink.aroma >= 4) features.push("진한 향");
            
            if (features.length > 0) {
                reason += features.join(", ") + "을 가지고 있어 ";
            }
            
            reason += `알코올 도수 ${drink.alcohol}%로 당신이 선호하는 강도와 완벽하게 일치합니다.`;
            
            return { main, reason };
        }

        function restartTest() {
            currentQuestion = 0;
            answers = [];
            showPage('start-page');
        }

        function shareResult() {
            const bestDrink = document.getElementById('drink-match').textContent;
            if (navigator.share) {
                navigator.share({
                    title: '전통주 추천 결과',
                    text: `나의 추천 전통주: ${bestDrink}`,
                    url: window.location.href
                });
            } else {
                // 공유 기능이 지원되지 않는 경우 클립보드에 복사
                const text = `나의 추천 전통주: ${bestDrink}\n${window.location.href}`;
                navigator.clipboard.writeText(text).then(() => {
                    alert('결과가 클립보드에 복사되었습니다!');
                });
            }
        }

