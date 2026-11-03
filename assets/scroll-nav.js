(function initScrollNav() {
  var HEADER_OFFSET = 92;
  var sectionIds = ['features', 'how', 'pricing', 'help'];

  function isHomePage() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    return path === '' || path === '/' || path.endsWith('/index.html');
  }

  function scrollToSection(id, behavior) {
    var el = document.getElementById(id);
    if (!el) {
      return false;
    }
    var top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: behavior || 'smooth' });
    return true;
  }

  function setNavActive(sectionId) {
    var links = document.querySelectorAll('.nav-links a[data-section]');
    links.forEach(function (link) {
      var match = link.getAttribute('data-section') === sectionId;
      link.classList.toggle('nav-link-active', match);
    });
  }

  function sectionFromHash() {
    var hash = window.location.hash.replace('#', '');
    return sectionIds.indexOf(hash) >= 0 ? hash : null;
  }

  function onNavClick(event) {
    var href = this.getAttribute('href') || '';
    var hash = '';
    if (href.indexOf('#') >= 0) {
      hash = href.split('#')[1];
    }
    if (!hash) {
      return;
    }

    if (isHomePage()) {
      event.preventDefault();
      scrollToSection(hash);
      if (history.pushState) {
        history.pushState(null, '', '#' + hash);
      } else {
        window.location.hash = hash;
      }
      setNavActive(hash);
    }
  }

  document.querySelectorAll('.nav-scroll, .nav-links a[href*="#"]').forEach(function (link) {
    link.addEventListener('click', onNavClick);
  });

  function scrollFromHash(behavior) {
    var id = sectionFromHash();
    if (id && isHomePage()) {
      scrollToSection(id, behavior);
      setNavActive(id);
    }
  }

  window.addEventListener('load', function () {
    scrollFromHash('auto');
  });

  window.addEventListener('hashchange', function () {
    scrollFromHash('smooth');
  });

  if (!isHomePage() || !('IntersectionObserver' in window)) {
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      var visible = entries
        .filter(function (e) {
          return e.isIntersecting;
        })
        .sort(function (a, b) {
          return b.intersectionRatio - a.intersectionRatio;
        });
      if (visible.length > 0) {
        setNavActive(visible[0].target.id);
      }
    },
    { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.15, 0.4] },
  );

  sectionIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      observer.observe(el);
    }
  });
})();
