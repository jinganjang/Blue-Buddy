document.addEventListener("DOMContentLoaded", function () {
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
});
