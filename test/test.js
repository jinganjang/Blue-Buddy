/**
 * 다이빙 테스트 제어 로직
 */

// 사용자가 선택한 다음 단계 ID를 임시 저장하는 변수
let selectedNextStep = ""; 

/**
 * 1. 선택지 버튼 클릭 시 실행 (질문 페이지용)
 * 클릭한 버튼의 'data-next' 값을 읽어 변수에 저장하고 시각적 효과를 줍니다.
 */
function selectOption(element) {
    // 현재 클릭한 버튼이 속한 옵션 그룹 내의 모든 버튼에서 'selected' 제거
    const buttons = element.parentElement.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // 클릭한 버튼에만 'selected' 클래스 추가
    element.classList.add('selected');

    // 버튼에 설정된 'data-next' 속성 값을 전역 변수에 할당
    selectedNextStep = element.getAttribute('data-next');
    
    console.log("선택된 다음 단계:", selectedNextStep);
}

/**
 * 2. 'Get Started' 등 즉시 이동이 필요한 버튼 클릭 시 실행
 * 버튼에 설정된 'data-next' 경로로 바로 화면을 전환합니다.
 */
function directNextStep(element) {
    const nextId = element.getAttribute('data-next');
    if (nextId) {
        moveSection(nextId);
    }
}

/**
 * 3. 질문지의 'Next' 버튼 클릭 시 실행
 * 사용자가 옵션을 선택했는지 확인한 후 화면을 전환합니다.
 */
function goToNextSection() {
    // 선택된 값이 없는 경우 알림
    if (!selectedNextStep) {
        alert("옵션을 하나 선택해주세요!");
        return;
    }

    // 화면 전환 실행
    moveSection(selectedNextStep);

    // 다음 섹션의 선택을 위해 변수 초기화
    selectedNextStep = ""; 
}

/**
 * 4. [공통] 실제 섹션 전환 애니메이션 처리 함수
 * @param {string} nextId - 이동할 섹션의 HTML ID
 */
function moveSection(nextId) {
    const currentStep = document.querySelector('.step.active');
    const nextStep = document.getElementById(nextId);

    if (nextStep) {
        // 1. 현재 섹션을 'prev' 상태로 변경 (위로 사라짐)
        if (currentStep) {
            currentStep.classList.remove('active');
            currentStep.classList.add('prev');
        }

        // 2. 다음 섹션을 'active' 상태로 변경 (아래에서 나타남)
        nextStep.classList.remove('prev'); // 혹시 모를 prev 클래스 제거
        nextStep.classList.add('active');
        
        // 3. 페이지 상단으로 스크롤 고정 (필요 시)
        window.scrollTo(0, 0);
    } else {
        console.error("이동하려는 섹션(ID: " + nextId + ")을 찾을 수 없습니다.");
    }
}