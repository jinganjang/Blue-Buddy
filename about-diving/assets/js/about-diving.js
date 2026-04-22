document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector('.attractions-slider');
    const cards = document.querySelectorAll('.attraction-card');

    let index = 0;
    let interval;

    function getGap() {
        const style = window.getComputedStyle(slider);
        return parseInt(style.gap) || 0;
    }

    function autoSlide() {
        if (!cards.length) return;

        const gap = getGap();
        const cardWidth = cards[0].offsetWidth + gap;

        index++;

        if (index >= cards.length) {
            index = 0;
        }

        slider.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
    }

    function startSlide() {
        interval = setInterval(autoSlide, 2000);
    }

    function stopSlide() {
        clearInterval(interval);
    }

    slider.addEventListener('mouseenter', stopSlide);
    slider.addEventListener('mouseleave', startSlide);

    startSlide();

    // 드래그 스와이프
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // 드래그 속도 조절
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('mousedown', stopSlide);
    slider.addEventListener('mouseup', startSlide);
    slider.addEventListener('mouseleave', startSlide);

    
});
