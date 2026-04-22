document.addEventListener('DOMContentLoaded', function () {
    const indicatorSection = document.querySelector('.diving-indicator-section');
    const revealLabels = Array.from(document.querySelectorAll('.reveal-step'));
    const revealDots = Array.from(document.querySelectorAll('.indicator-dot'));
    const indicatorCircle = document.querySelector('.wrapper_fs .indicator-circle');
    const introStage = document.querySelector('.indicator-intro-stage');
    const introText = document.querySelector('.indicator-intro-text');
    const circleStage = document.querySelector('.indicator-circle-stage');

    function placeIndicatorLabels() {
        if (!indicatorCircle || revealDots.length !== revealLabels.length) {
            return;
        }

        const circleRect = indicatorCircle.getBoundingClientRect();
        const centerX = circleRect.left + circleRect.width / 2;
        const centerY = circleRect.top + circleRect.height / 2;
        const offsetDistance = window.innerWidth <= 900 ? 30 : 44;
        const selectedExtraDistance = window.innerWidth <= 900 ? 10 : 14;
        const sixthExtraDistance = window.innerWidth <= 900 ? 3 : 5;

        revealLabels.forEach(function (label, index) {
            const dotRect = revealDots[index].getBoundingClientRect();
            const dotX = dotRect.left + dotRect.width / 2;
            const dotY = dotRect.top + dotRect.height / 2;

            let vx = dotX - centerX;
            let vy = dotY - centerY;
            const len = Math.hypot(vx, vy) || 1;
            vx /= len;
            vy /= len;

            const order = index + 1;
            const isSelectedLabel = order === 3 || order % 2 === 0;
            const sixthOnlyExtra = order === 6 ? sixthExtraDistance : 0;
            const finalDistance = offsetDistance + (isSelectedLabel ? selectedExtraDistance : 0) + sixthOnlyExtra;
            const targetX = (dotX - circleRect.left) + (vx * finalDistance);
            const targetY = (dotY - circleRect.top) + (vy * finalDistance);

            label.style.left = targetX.toFixed(2) + 'px';
            label.style.top = targetY.toFixed(2) + 'px';
            label.style.transform = 'translate(-50%, -50%)';
        });
    }

    function updateIndicatorProgress() {
        if (!indicatorSection || !introStage || !introText) {
            return;
        }

        const hasCircleStage =
            circleStage &&
            revealLabels.length > 0 &&
            revealDots.length > 0;

        const rect = indicatorSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalScrollable = rect.height - viewportHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
        const progress = totalScrollable <= 0 ? 0 : scrolled / totalScrollable;
        const introEnd = 0.7;

        function applyIntroOnlyAnimation() {
            if (progress < introEnd) {
                const introProgress = progress / introEnd;
                const fadeInEnd = 0.55;

                let opacity;
                let translateY;

                if (introProgress <= fadeInEnd) {
                    const ratio = introProgress / fadeInEnd;
                    opacity = ratio;
                    translateY = 48 - (48 * ratio);
                } else {
                    const ratio = (introProgress - fadeInEnd) / (1 - fadeInEnd);
                    opacity = 1 - ratio;
                    translateY = -(52 * ratio);
                }

                introStage.style.opacity = '1';
                introText.style.opacity = String(Math.max(0, Math.min(1, opacity)));
                introText.style.transform = 'translateY(' + translateY.toFixed(1) + 'px)';
            } else {
                introStage.style.opacity = '0';
                introText.style.opacity = '0';
                introText.style.transform = 'translateY(-52px)';
            }
        }

        if (!hasCircleStage) {
            applyIntroOnlyAnimation();
            return;
        }

        let visibleCount = 0;

        if (progress < introEnd) {
            const introProgress = progress / introEnd;
            const fadeInEnd = 0.55;

            let opacity;
            let translateY;

            if (introProgress <= fadeInEnd) {
                const ratio = introProgress / fadeInEnd;
                opacity = ratio;
                translateY = 48 - (48 * ratio);
            } else {
                const ratio = (introProgress - fadeInEnd) / (1 - fadeInEnd);
                opacity = 1 - ratio;
                translateY = -(52 * ratio);
            }

            introStage.style.opacity = '1';
            introText.style.opacity = String(Math.max(0, Math.min(1, opacity)));
            introText.style.transform = 'translateY(' + translateY.toFixed(1) + 'px)';
            circleStage.style.opacity = '0';
        } else {
            const circleProgress = (progress - introEnd) / (1 - introEnd);
            const normalizedCircle = Math.max(0, Math.min(1, circleProgress));
            const revealUntil = 0.84;
            const revealProgress = Math.min(normalizedCircle / revealUntil, 1);
            visibleCount = Math.max(0, Math.min(revealLabels.length, Math.floor(revealProgress * revealLabels.length)));

            introStage.style.opacity = '0';
            introText.style.opacity = '0';
            introText.style.transform = 'translateY(-52px)';
            circleStage.style.opacity = '1';
        }

        revealLabels.forEach(function (item, index) {
            item.classList.toggle('is-visible', index < visibleCount);
        });

        revealDots.forEach(function (item, index) {
            item.classList.toggle('is-visible', index < visibleCount);
        });
    }

    window.addEventListener('scroll', updateIndicatorProgress, { passive: true });
    window.addEventListener('resize', function () {
        placeIndicatorLabels();
        updateIndicatorProgress();
    });
    placeIndicatorLabels();
    updateIndicatorProgress();

    const marineTabs = Array.from(document.querySelectorAll('.marine-tab'));
    const marineImage = document.getElementById('marine-image');
    const marineTitle = document.getElementById('marine-title');
    const marineVisibility = document.getElementById('marine-visibility');
    const marineRegion = document.getElementById('marine-region');
    const marineSeason = document.getElementById('marine-season');
    const marineDesc = document.getElementById('marine-desc');

    marineTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            marineTabs.forEach(function (item) {
                item.classList.remove('is-active');
            });
            tab.classList.add('is-active');

            if (marineImage) {
                marineImage.src = tab.dataset.image || '';
            }
            if (marineTitle) {
                marineTitle.innerHTML = tab.dataset.title || '';
            }
            if (marineVisibility) {
                marineVisibility.textContent = tab.dataset.visibility || '';
            }
            if (marineRegion) {
                marineRegion.textContent = tab.dataset.region || '';
            }
            if (marineSeason) {
                marineSeason.textContent = tab.dataset.season || '';
            }
            if (marineDesc) {
                marineDesc.textContent = tab.dataset.desc || '';
            }
        });
    });
});
