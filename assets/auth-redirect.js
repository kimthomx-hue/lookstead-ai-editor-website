/**
 * Forwards Supabase email auth into the Lookstead AI Editor app.
 * Uses query params (not #hash) — iOS often drops hash fragments on custom URL schemes.
 */
(function () {
  var hash = window.location.hash || '';
  if (!hash || hash.length < 2) {
    return;
  }
  var params = hash.charAt(0) === '#' ? hash.slice(1) : hash;
  if (
    params.indexOf('access_token=') === -1 &&
    params.indexOf('token_hash=') === -1 &&
    params.indexOf('error=') === -1 &&
    params.indexOf('code=') === -1
  ) {
    return;
  }

  var appUrl = 'lookstead-editor://callback?' + params;
  window.__looksteadAuthRedirect = appUrl;

  try {
    window.location.replace(appUrl);
  } catch (e) {
    /* manual open on callback page */
  }
})();
