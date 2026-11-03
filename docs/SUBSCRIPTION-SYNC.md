# Subscription and features sync

When you change **pricing**, **plan benefits**, or **plan limits** in the mobile app, update the marketing site in the same change:

| App | Website |
|-----|---------|
| `constants/subscriptions.ts` | `assets/subscription-plans.js` |

Also check:

- `assets/pricing-page.js` (display logic only; data should come from `subscription-plans.js`)
- `index.html` feature list if product capabilities changed
- `help.js` FAQs if user-facing policy changed

Commit and push **lookstead-ai-editor-website** to GitHub after website updates.
