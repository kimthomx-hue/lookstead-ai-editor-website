# iOS email suggestions (Keychain + QuickType)

1. Replace `YOUR_APPLE_TEAM_ID` in `.well-known/apple-app-site-association` with your 10-character Team ID (Apple Developer → Membership).
2. Deploy lookstead.com so the file is live at `https://lookstead.com/.well-known/apple-app-site-association` (no file extension).
3. Rebuild the Lookstead iOS app after `associatedDomains` is set in `app.json` (`webcredentials:lookstead.com`).

The app email field uses `emailAddress` on sign-up and `username` on sign-in so iOS can offer saved emails tied to lookstead.com.
