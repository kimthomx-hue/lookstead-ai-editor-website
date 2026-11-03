(function () {
  /** Replace with your App Store URL when the app is live, e.g. https://apps.apple.com/app/id123456789 */
  const APP_STORE_WEB =
    'https://apps.apple.com/gb/search?term=Lookstead';

  const EMAIL = 'hello@lookstead.com';
  const EMAIL_SUBJECT = 'Lookstead iOS access';

  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  const toastEl = document.getElementById('site-toast');
  let index = 0;
  let timer;
  let toastTimer;

  function isIos() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }

  function appStoreHref() {
    if (isIos()) {
      return APP_STORE_WEB.replace(/^https:\/\//, 'itms-apps://');
    }
    return APP_STORE_WEB;
  }

  function gmailComposeUrl() {
    const params = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: EMAIL,
      su: EMAIL_SUBJECT,
    });
    return `https://mail.google.com/mail/?${params.toString()}`;
  }

  function showToast(message) {
    if (!toastEl) {
      return;
    }
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 4500);
  }

  function openAppStore(e) {
    e.preventDefault();
    const url = appStoreHref();
    if (isIos()) {
      window.location.href = url;
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async function openEmailContact(e) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast(`${EMAIL} copied to clipboard.`);
    } catch {
      showToast(`Email: ${EMAIL}`);
    }

    if (isIos()) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
      return;
    }

    const opened = window.open(gmailComposeUrl(), '_blank', 'noopener,noreferrer');
    if (!opened) {
      showToast(`Allow pop-ups, or email ${EMAIL} manually.`);
    }
  }

  function bindAppStoreLinks() {
    document.querySelectorAll('.app-store-link').forEach((el) => {
      el.setAttribute('href', appStoreHref());
      if (el.dataset.appStoreBound === 'true') {
        return;
      }
      el.dataset.appStoreBound = 'true';
      el.addEventListener('click', openAppStore);
    });
  }

  window.__looksteadBindAppStoreLinks = bindAppStoreLinks;
  bindAppStoreLinks();

  document.querySelectorAll('.email-contact-link').forEach((el) => {
    el.addEventListener('click', openEmailContact);
  });

  function showSlide(i) {
    index = i;
    slides.forEach((el, n) => el.classList.toggle('is-active', n === i));
    dots.forEach((el, n) => {
      el.classList.toggle('is-active', n === i);
      el.setAttribute('aria-selected', n === i ? 'true' : 'false');
    });
  }

  function next() {
    showSlide((index + 1) % slides.length);
  }

  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(next, 7000);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.goto));
      startAutoplay();
    });
  });

  if (slides.length > 1) {
    startAutoplay();
  }
})();
