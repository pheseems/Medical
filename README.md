# Medical Calculator

A local-first medical calculator dashboard for common internal medicine and cardiology-adjacent workflow calculations.

The app is designed as a lightweight personal clinical aid: fast to open, simple to use, and free to host as a static website.

## Live Site

If GitHub Pages is enabled, the app should be available at:

https://pheseems.github.io/Medical/

## Included Calculators

- Calendar due date: days and rounded-up weeks from today
- Warfarin tablet count
- Warfarin dose change
- Anti-TB dosage
- Creatinine clearance by Cockcroft-Gault
- FIB-4 and APRI score with interpretation
- Corrected calcium for hypoalbuminemia
- Corrected sodium for hyperglycemia

## Design Goals

- Run entirely in the browser
- No backend server
- No database
- No login
- No paid API
- Low-friction use during OPD or ward workflow
- Keep calculations visible and auditable

## Privacy

All calculations run locally in the browser. The app does not send patient data to a server.

Privacy may change if future versions add analytics, login, a database, cloud AI, or third-party integrations.

## Clinical Safety

This app is a calculation aid only. It is not a medical authority and should not replace physician judgment.

Before using any result in patient care, verify:

- patient-specific context
- local hospital guideline
- renal and hepatic function
- contraindications
- drug interactions
- pregnancy status when relevant
- dosing limits and formulation availability

Anti-TB and warfarin outputs especially require clinical review.

## How to Run Locally

Open `index.html` directly in a browser.

For a local preview server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Project Structure

```text
.
├── index.html      # App layout and calculator sections
├── styles.css      # Dark pastel dashboard styling
├── app.js          # Calculator formulas and input behavior
├── DEPLOY.md       # Deployment instructions
├── netlify.toml    # Optional Netlify static hosting config
└── .nojekyll       # GitHub Pages static site helper
```

## Deployment

This is a static website and can be hosted for free.

Recommended:

- GitHub Pages
- Netlify
- Cloudflare Pages

For GitHub Pages:

1. Open repository settings.
2. Go to `Pages`.
3. Set source to `Deploy from a branch`.
4. Select branch `main`.
5. Select folder `/root`.
6. Save and wait for GitHub to publish the site.

## Cost

Current version:

- Hosting: free with GitHub Pages
- Database: none
- Server: none
- API calls: none

## Development Notes

This app intentionally uses plain HTML, CSS, and JavaScript. That keeps the project easy to understand, edit, and deploy without a build system.

If the app grows larger, reasonable next steps would be:

- split calculators into separate JavaScript modules
- add unit tests for formulas
- add calculator search/filter
- add favorites
- add Thai/English language toggle
- add print or copy-to-clipboard summaries
