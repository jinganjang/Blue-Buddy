const arrowBtns = document.querySelectorAll('.pre-view .arrow-down');

arrowBtns.forEach(function(arrowImg) {
    arrowImg.addEventListener('click', function(e) {
        e.preventDefault();

        const preView = arrowImg.closest('.pre-view');
        const detail = preView.nextElementSibling;
        const isOpen = detail.style.display === 'block';

        if (isOpen) {
            detail.style.display = 'none';
            arrowImg.src = '../about-free-diving/assets/images/arrow-down.webp';
            arrowImg.alt = 'arrow';
        } else {
            detail.style.display = 'block';
            arrowImg.src = '../about-free-diving/assets/images/arrow-up.webp';
            arrowImg.alt = 'arrow-up';
        }
    });
});
