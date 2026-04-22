(function () {
    var posts = window.DIVING_ARCHIVE_POSTS || [];
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var post = posts.find(function (p) {
        return p.id === id;
    });

    var img = document.getElementById('detail-img');
    var badges = document.getElementById('detail-badges');
    var title = document.getElementById('detail-title');
    var excerpt = document.getElementById('detail-excerpt');
    var body = document.getElementById('detail-body');
    var missing = document.getElementById('detail-missing');
    var root = document.getElementById('detail-root');

    if (!post) {
        document.title = 'Not found — The Diving Archive';
        if (missing) missing.hidden = false;
        if (img) {
            img.removeAttribute('src');
            var fig = img.closest('.detail-figure');
            if (fig) fig.hidden = true;
        }
        if (badges) badges.hidden = true;
        if (title) {
            title.textContent = '';
            title.hidden = true;
        }
        if (excerpt) excerpt.hidden = true;
        if (body) body.hidden = true;
        var back = document.querySelector('.detail-back');
        if (back) back.hidden = false;
        return;
    }

    if (missing) missing.hidden = true;

    document.title = post.titleKo + ' — The Diving Archive';

    if (img) {
        img.src = post.heroImage;
        img.alt = post.titleKo;
    }

    if (badges) {
        badges.innerHTML =
            '<span class="archive-badge">' +
            post.badgeLevel +
            '</span><span class="archive-badge">' +
            post.date +
            '</span>';
    }

    if (title) {
        title.innerHTML =
            post.titleKo +
            ' <span class="hero-title-en">(' +
            post.titleEn +
            ')</span>';
    }

    if (excerpt) excerpt.textContent = post.excerpt || '';
    if (body) body.textContent = post.body || '';

    if (root) {
        root.classList.add('is-loaded');
    }
})();
