# Portfolio Launch Tracker — Host-ready package

## What this package is

This is the standalone hosted version of your portfolio tracker.

It is no longer dependent on Claude/ChatGPT artifact storage or UI variables. It includes:

- `index.html`
- `styles.css`
- `app.js`
- Firebase Firestore saving
- multi-device persistence
- manual Save button
- close-tab warning when progress is unsaved
- JSON export/import backup

## Immediate use

Upload these three files together to a folder/subdomain:

```txt
index.html
styles.css
app.js
```

Then open the hosted URL in Chrome.

Do not open `index.html` directly by double-clicking the file. Browser module imports and Firebase work best from a served URL such as:

```txt
https://your-subdomain.com/portfolio-tracker/
```

or from a local test server.

## Local test option

If you want to test locally before deploying:

```bash
cd portfolio-tracker-host-ready
python -m http.server 8080
```

Then open:

```txt
http://localhost:8080
```

## Firebase document used

The app stores tracker state here:

```txt
portfolioTrackers/lohith-portfolio-launch-2026
```

You do not need to manually create this document. The app creates it on first load.

## Firestore rules

You started Firestore in test mode. That is okay for immediate testing.

Important: test mode is temporary and open. Before sharing this with many people, tighten the rules.

For a temporary portfolio-tracker-only public rule, you can use this:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolioTrackers/lohith-portfolio-launch-2026 {
      allow read, write: if true;
    }
  }
}
```

This lets anyone who can access the tracker read/write the tracker state. That is fine only for a low-risk accountability tracker, not private data.

For stronger protection later, add Firebase Authentication and restrict editing to approved users.

## Deployment note

If your portfolio is already deployed from GitHub, place this folder as a separate route, for example:

```txt
/public/portfolio-tracker/
```

or

```txt
/apps/portfolio-tracker/
```

The exact folder depends on your current build setup.

## How saving works

- Changes are local until you click **Save progress**
- If you try to close the tab with unsaved changes, the browser warns you
- After saving, Firestore becomes the source of truth
- Phone, PC, and accountability partners see the same saved tracker
- Export JSON backup is available as a safety net

## Review-agent note

This package is intentionally isolated under:

```txt
public/portfolio-tracker/
```

It is a temporary execution tracker, not part of the actual portfolio experience. Do not refactor it into `src/components`, do not treat it as a portfolio section, and remove it once the portfolio launch tracker has served its purpose.
