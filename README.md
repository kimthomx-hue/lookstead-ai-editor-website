# Lookstead marketing site

Static marketing site for **Lookstead** (separate from the [Lookstead home assistant](https://github.com/kimthomx-hue/lookstead) site and the [Expo app](../lookstead-ai-editor) repo).

## Local preview

```bash
npx serve .
```

## Auth bridge

`assets/auth-redirect.js` forwards Supabase email links to `lookstead-editor://callback`.

## Deploy (GitHub Pages)

Push to `main` runs `.github/workflows/deploy.yml`. In the repo **Settings → Pages**, set source to **GitHub Actions**.

When you have a custom domain, add a `CNAME` file at the repo root (this repo ships without one so it does not override `lookstead.com`).
