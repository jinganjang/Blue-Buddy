document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.reviews-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    // 스와이프 컨테이너가 없으면 에러 방지 후 종료
    if (!slider) return;

    // 마우스를 클릭했을 때
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active'); // CSS 커서 모양 변경(grabbing)
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    // 마우스가 컨테이너 밖으로 벗어났을 때
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    // 마우스 클릭을 해제했을 때
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    // 마우스를 드래그하며 움직일 때
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; // 클릭 상태가 아니면 작동하지 않음
        e.preventDefault(); // 텍스트 드래그 등 기본 이벤트 방지
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // 스크롤 이동 속도 조절 (숫자가 클수록 빠름)
        slider.scrollLeft = scrollLeft - walk;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. 모든 아코디언 헤더(질문 영역)를 선택합니다.
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // 스크립트 에러 방지를 위해 아코디언이 있는 페이지에서만 실행되도록 체크합니다.
    if (accordionHeaders.length === 0) return;

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // 클릭된 헤더의 부모 요소(.accordion-item)를 가져옵니다.
            const currentItem = this.parentElement;

            // 2. 다른 열려있는 아코디언 닫기 (하나만 열어두기)
            // 여러 개를 동시에 열어두고 싶다면 이 아래 forEach 블록을 삭제하세요.
            const allItems = document.querySelectorAll('.accordion-item');
            allItems.forEach(item => {
                if (item !== currentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });

            // 3. 클릭한 아이템의 active 클래스를 토글합니다.
            // active가 있으면 제거(닫기), 없으면 추가(열기)하여 화살표 회전과 높이 변화 CSS를 작동시킵니다.
            currentItem.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    /* 1. 사이드바 카테고리 클릭 이벤트 */
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault(); // 링크 기본 동작 방지

            // 모든 아이템에서 active 클래스 제거 후 클릭한 아이템에만 추가
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');

            // 실제 개발 시 여기서 선택된 카테고리에 따른 리스트 필터링 로직이 들어갑니다.
            const selectedCategory = this.textContent;
            console.log(`${selectedCategory} 카테고리로 필터링합니다.`);
        });
    });

    /* 2. 검색창 인터랙션 */
    const searchInput = document.querySelector('.search-area input');
    const searchBtn = document.querySelector('.btn-search');

    if (searchInput && searchBtn) {
        // 검색 버튼 클릭 시
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value;
            if (query.trim() !== "") {
                alert(`'${query}' 검색 결과로 이동합니다.`);
            } else {
                alert("검색어를 입력해주세요.");
            }
        });

        // 엔터키 입력 시 검색 작동
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    /* 3. 게시판 리스트 아이템 클릭 효과 */
    const boardItems = document.querySelectorAll('.list-item');

    boardItems.forEach(item => {
        item.addEventListener('click', function () {
            // 클릭 시 시각적 피드백 (선택사항)
            this.style.backgroundColor = 'rgba(32, 62, 181, 0.05)';

            // 실제 상세 페이지 이동 로직 (예시)
            // const postId = this.dataset.id;
            // location.href = `/board/view/${postId}`;

            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
        });
    });
});