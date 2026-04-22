/**
 * 홈 Dive Map — 뷰포트 진입 시 스테이지 페이드인, 리사이즈 시 Observer 정리
 */
(function () {
    var mq = window.matchMedia('(min-width: 1025px)');
    var io = null;

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function disconnectIo() {
        if (io) {
            io.disconnect();
            io = null;
        }
    }

    function setupMapSectionReveal() {
        var section = document.querySelector('.home-map-section');
        if (!section) return;

        function markInView() {
            section.classList.add('is-inview');
        }

        disconnectIo();

        if (!mq.matches) {
            markInView();
            return;
        }

        if (prefersReducedMotion()) {
            markInView();
            return;
        }

        if (section.classList.contains('is-inview')) return;

        io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    section.classList.add('is-inview');
                    disconnectIo();
                });
            },
            {
                threshold: 0.14,
                rootMargin: '0px 0px -6% 0px'
            }
        );

        io.observe(section);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupMapSectionReveal);
    } else {
        setupMapSectionReveal();
    }

    window.addEventListener('resize', setupMapSectionReveal);
})();
