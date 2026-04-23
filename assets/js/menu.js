document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");
    const heroSection = document.querySelector(".hero-video-section, .hero-section, .hero");
    const logoImage = header ? header.querySelector(".logo img") : null;
    const menuMoImage = header ? header.querySelector(".menu-bar-mo img") : null;
    const menuButtons = document.querySelectorAll(".menu-btn, .menu-bar-mo");
    const menu = document.querySelector(".global-menu");
    const submenuToggle = document.querySelector(".submenu-toggle");
    const submenuItem = document.querySelector(".has-submenu");

    if (!menu || menuButtons.length === 0) {
        return;
    }

    const closeMenu = function () {
        menu.classList.remove("is-open");
        menu.setAttribute("aria-hidden", "true");
        if (submenuItem) {
            submenuItem.classList.remove("is-open");
        }
        if (submenuToggle) {
            submenuToggle.setAttribute("aria-expanded", "false");
        }
    };

    const toggleMenu = function () {
        const isOpen = menu.classList.toggle("is-open");
        menu.setAttribute("aria-hidden", isOpen ? "false" : "true");

        if (!isOpen) {
            if (submenuItem) {
                submenuItem.classList.remove("is-open");
            }
            if (submenuToggle) {
                submenuToggle.setAttribute("aria-expanded", "false");
            }
        }
    };

    menuButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            toggleMenu();
        });
    });

    if (submenuToggle && submenuItem) {
        submenuToggle.addEventListener("click", function () {
            const isOpen = submenuItem.classList.toggle("is-open");
            submenuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }

    document.addEventListener("click", function (event) {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }

        const clickedInsideMenu = menu.contains(target);
        const clickedMenuButton = target.closest(".menu-btn, .menu-bar-mo");
        if (!clickedInsideMenu && !clickedMenuButton) {
            closeMenu();
        }
    });

    menu.addEventListener("click", function (event) {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }

        const shouldKeepOpen = target.closest(".has-submenu");
        if (!shouldKeepOpen && target.closest("a")) {
            closeMenu();
        }
    });

    // 지정 페이지에서 hero를 벗어나면 헤더 배경 노출
    if (header && heroSection && document.body.classList.contains("home-page")) {
        const logoDark =
            (logoImage && logoImage.getAttribute("data-logo-dark")) ||
            (logoImage ? logoImage.getAttribute("src") : null);
        const logoLight =
            (logoImage && logoImage.getAttribute("data-logo-light")) ||
            (logoDark ? logoDark.replace("logo-w.webp", "logo.webp") : null);
        const menuMoDark =
            (menuMoImage && menuMoImage.getAttribute("data-menu-dark")) ||
            (menuMoImage ? menuMoImage.getAttribute("src") : null);
        const menuMoLight =
            (menuMoImage && menuMoImage.getAttribute("data-menu-light")) ||
            (menuMoDark ? menuMoDark.replace("menu-alt-2.webp", "menu-alt-2-b.webp") : null);

        const onScroll = function () {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const isLightBg = heroBottom <= 0;
            header.classList.toggle("is-scrolled", isLightBg);
            if (logoImage && logoDark && logoLight) {
                logoImage.setAttribute("src", isLightBg ? logoLight : logoDark);
            }
            if (menuMoImage && menuMoDark && menuMoLight) {
                menuMoImage.setAttribute("src", isLightBg ? menuMoLight : menuMoDark);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        onScroll();
    }
});
