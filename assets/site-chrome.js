/** Shared header + footer markup (injected where #site-header / #site-footer exist). */
(function () {
  var active = document.body.dataset.navActive || '';

  function navClass(slug) {
    return active === slug ? ' nav-link-active' : '';
  }

  var headerHtml =
    '<nav class="nav-inner" aria-label="Main">' +
    '<a class="brand" href="/">' +
    '<img class="brand-mark" src="/assets/white-icon-transparent.svg" width="28" height="28" alt="Lookstead" />' +
    'Lookstead</a>' +
    '<div class="nav-links">' +
    '<a class="nav-features' +
    navClass('features') +
    '" href="/features/">Features</a>' +
    '<a class="nav-how' +
    navClass('how') +
    '" href="/how/">How it works</a>' +
    '<a class="nav-pricing' +
    navClass('pricing') +
    '" href="/pricing/">Pricing</a>' +
    '<a class="nav-help' +
    navClass('help') +
    '" href="/help/">Help</a>' +
    '</div>' +
    '<a class="nav-cta app-store-link" href="/download/">' +
    '<span class="apple" aria-hidden="true"></span>' +
    'Download for iPhone</a>' +
    '</nav>';

  var footerHtml =
    '<div class="footer-inner">' +
    '<span class="brand-footer">Lookstead</span>' +
    '<div class="footer-links">' +
    '<a href="/help/">Help</a>' +
    '<a href="/privacy/">Privacy</a>' +
    '<a href="/terms/">Terms</a>' +
    '<a class="email-contact-link" href="mailto:hello@lookstead.com">hello@lookstead.com</a>' +
    '</div>' +
    '<p class="copyright">© Lookstead</p>' +
    '</div>';

  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');
  if (headerEl) {
    headerEl.innerHTML = headerHtml;
  }
  if (footerEl) {
    footerEl.innerHTML = footerHtml;
  }
})();
