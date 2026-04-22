(function () {
    var posts = window.DIVING_ARCHIVE_POSTS || [];
    var heroBg = document.getElementById('archive-hero-bg');
    var heroBadges = document.getElementById('hero-badges');
    var heroKicker = document.getElementById('hero-kicker');
    var heroTitle = document.getElementById('hero-title');
    var heroDesc = document.getElementById('hero-desc');
    var heroRead = document.getElementById('hero-read');
    var grid = document.getElementById('archive-grid');
    var filterButtons = document.querySelectorAll('.archive-filter-btn');

    var currentFilter = 'all';

    function getVisiblePosts() {
        if (currentFilter === 'all') return posts.slice();
        return posts.filter(function (p) {
            return p.level === currentFilter;
        });
    }

    function applyHero(post) {
        if (!post || !heroBg) return;
        heroBg.style.backgroundImage = 'url("' + post.heroImage + '")';
        if (heroBadges) {
            heroBadges.innerHTML =
                '<span class="archive-badge">' +
                post.badgeLevel +
                '</span><span class="archive-badge">' +
                post.date +
                '</span>';
        }
        if (heroKicker) heroKicker.textContent = post.kicker || '';
        if (heroTitle) {
            heroTitle.innerHTML =
                post.titleKo +
                ' <span class="hero-title-en">(' +
                post.titleEn +
                ')</span>';
        }
        if (heroDesc) heroDesc.textContent = post.excerpt || '';
        if (heroRead) {
            heroRead.href = 'detail.html?id=' + encodeURIComponent(post.id);
        }
    }

    function renderGrid() {
        if (!grid) return;
        var visible = getVisiblePosts();
        grid.innerHTML = '';
        visible.forEach(function (post) {
            var art = document.createElement('article');
            art.className = 'archive-card';
            art.dataset.postId = post.id;
            art.dataset.level = post.level;

            var a = document.createElement('a');
            a.href = 'detail.html?id=' + encodeURIComponent(post.id);
            a.addEventListener('click', function (e) {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                applyHero(post);
            });

            var txt = document.createElement('div');
            txt.className = 'card-txt-wrap';
            txt.innerHTML =
                '<h3 class="card-title">' +
                post.titleKo +
                ' <span>(' +
                post.titleEn +
                ')</span></h3><p class="desc">' +
                (post.excerpt || '') +
                '</p>';

            var wrap = document.createElement('div');
            wrap.className = 'archive-image-wrap';
            wrap.innerHTML =
                '<img src="' +
                post.heroImage +
                '" alt=""><div class="archive-badges">' +
                '<span class="archive-badge">' +
                post.badgeLevel +
                '</span><span class="archive-badge">' +
                post.date +
                '</span></div>';

            a.appendChild(txt);
            a.appendChild(wrap);
            art.appendChild(a);
            grid.appendChild(art);
        });

        var first = visible[0];
        if (first) applyHero(first);
    }

    function setFilter(filter) {
        currentFilter = filter;
        filterButtons.forEach(function (btn) {
            var isOn = btn.getAttribute('data-filter') === filter;
            btn.classList.toggle('is-active', isOn);
            btn.setAttribute('aria-selected', isOn ? 'true' : 'false');
        });
        renderGrid();
    }

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var f = btn.getAttribute('data-filter') || 'all';
            setFilter(f);
        });
    });

    if (posts.length) {
        renderGrid();
    }
})();

