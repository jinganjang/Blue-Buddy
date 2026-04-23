document.addEventListener("DOMContentLoaded", () => {

    // Swiper 초기화
    const swiper = new Swiper('.attractions-slider', {
        loop: true, // 무한 루프
        autoplay: {
            delay: 2500, // 2.5초
            pauseOnMouseEnter: true, // 마우스 호버 시 멈춤
        },
        slidesPerView: 'auto', // 슬라이드 너비에 맞게
        spaceBetween: 50, // gap 50px
        grabCursor: true, // 드래그 커서
    });

    // 아코디언 기능 (기존 코드 유지)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function () {
                const currentItem = this.parentElement;

                const allItems = document.querySelectorAll('.accordion-item');
                allItems.forEach(item => {
                    if (item !== currentItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });

                currentItem.classList.toggle('active');
            });
        });
    }
});