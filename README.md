# Medical Calculator

Medical Calculator is a local-first, static web app for fast bedside calculations in OPD and ward workflow.

It is built as a lightweight clinical aid: no login, no backend server, no database, no cloud storage, and no paid API.

## Live Site

If GitHub Pages is enabled, the app is available at:

https://pheseems.github.io/Medical-Calculator/

If the online page looks outdated after an update, hard refresh the browser or open the URL with a cache-busting query such as:

```text
https://pheseems.github.io/Medical-Calculator/?v=latest
```

## Included Tools

- Due date
  - Calendar due date
  - Appointment date by week or month
- Warfarin
  - Tablet count
  - Weekly dose change
- Anti-TB
  - Weight-based dosing display
  - Tablet/day suggestion where applicable
  - Maximum-dose guardrails
  - Amikacin IV dose display
- CrCl & ATB
  - Creatinine clearance by Cockcroft-Gault
  - Renal dose screening for selected antibiotics
  - Default, hemodialysis, and CRRT dosing modes
- Electrolyte
  - Corrected sodium
  - Corrected calcium
  - Bicarbonate deficit
  - Water deficit
- FIB-4 & APRI
  - HBV, HCV, and MASLD interpretation modes
  - AST ULN selection by sex
- Note
  - Free-text note box with clear, copy, and paste actions

## Design

- Dark theme by default
- Optional light theme
- Compact medical dashboard layout
- Responsive design for desktop, tablet, and smartphone screens
- Pastel accent colors by section
- Vertical scrolling only on mobile portrait screens

## Privacy

All calculations run locally in the browser.

The app does not send patient data to a server and does not store data in cloud storage.

Privacy assumptions may change if future versions add analytics, login, database storage, AI features, or third-party integrations.

## Clinical Safety

This app is a calculation aid only. It is not a medical authority and should not replace physician judgment.

Before using any result in patient care, verify:

- patient-specific context
- indication and disease severity
- renal and hepatic function
- contraindications
- drug interactions
- pregnancy status when relevant
- local hospital guideline
- dosing limits and available formulations

Anti-TB, warfarin, and renal-dose outputs require clinical review before use.

## How to Run Locally

Open `index.html` directly in a browser.

Optional local preview server:

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
├── styles.css      # Dashboard theme, spacing, responsive layout
├── app.js          # Calculator formulas and input behavior
├── README.md       # Project overview
├── DEPLOY.md       # Deployment instructions
├── netlify.toml    # Optional Netlify static hosting config
└── .nojekyll       # GitHub Pages static site helper
```

## Deployment

This is a static website and can be hosted for free.

Recommended options:

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

The app intentionally uses plain HTML, CSS, and JavaScript. This keeps it easy to understand, edit, and deploy without a build system.

Reasonable next improvements:

- add formula unit tests
- split calculators into separate JavaScript modules
- add print or copy-summary output
- add Thai/English language toggle
- add formula/reference modals
- add calculator search or favorites

## Creator

Created by Pitchakorn Puangpornsri, MD.

If there is any problem, please contact the creator directly.
