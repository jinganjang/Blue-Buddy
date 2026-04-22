/**
 * Bluebuddy contents: sticky 고정 영역에서 스크롤에 따라 패널 전환 → 스크롤 구간 종료 후 푸터
 * 빈 트윈(duration) = 패널 머무름(hold), 짧은 duration = 크로스페이드
 */
(function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    var sec = document.querySelector('.bb-contents-sec');
    if (!sec) return;

    var p1 = '.bb-panel--01';
    var p2 = '.bb-panel--02';
    var p3 = '.bb-panel--03';
    var p4 = '.bb-panel--04';

    /** 패널당 머무름(스크롤 비율 큼) — 값 키우면 더 오래 정지 */
    var hold = 3;
    /** 크로스페이드 길이(상대값) */
    var cross = 1.2;

    gsap.set(p1, { autoAlpha: 1 });
    gsap.set([p2, p3, p4], { autoAlpha: 0 });

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.bb-contents-sec',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.35,
            invalidateOnRefresh: true,
        },
    });

    tl.to(p1, { autoAlpha: 1, duration: hold, ease: 'none' })
        .to(p1, { autoAlpha: 0, duration: cross })
        .to(p2, { autoAlpha: 1, duration: cross }, '<')
        .to(p2, { autoAlpha: 1, duration: hold, ease: 'none' })
        .to(p2, { autoAlpha: 0, duration: cross })
        .to(p3, { autoAlpha: 1, duration: cross }, '<')
        .to(p3, { autoAlpha: 1, duration: hold, ease: 'none' })
        .to(p3, { autoAlpha: 0, duration: cross })
        .to(p4, { autoAlpha: 1, duration: cross }, '<')
        .to(p4, { autoAlpha: 1, duration: hold, ease: 'none' });

    window.addEventListener(
        'load',
        function () {
            ScrollTrigger.refresh();
        },
        { once: true }
    );
})();
