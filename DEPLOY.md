# Deploy Medical Calculator Online

This app is a static website. It has no backend, no database, and no paid API.

## Best Free Option: GitHub Pages

Use this if you want a stable free public URL such as:

`https://your-github-name.github.io/medical-calculator/`

### Steps: Upload by GitHub Website

1. Create a GitHub account if you do not already have one.
2. Create a new repository named `medical-calculator`.
3. Keep the repository public if you want to use GitHub Pages easily.
4. Do not add README, `.gitignore`, or license on GitHub yet because this folder already has files.
5. Click `Create repository`.
6. Click `uploading an existing file`.
7. Upload these files from this folder:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `.nojekyll`
   - `.gitignore`
   - `netlify.toml`
   - `DEPLOY.md`
8. Do not upload `medical-calculator-deploy.zip`.
9. At the bottom, click `Commit changes`.
10. In GitHub, open the repository.
11. Go to `Settings`.
12. Go to `Pages`.
13. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
14. Click `Save`.
15. Wait 1-3 minutes.
16. Open the URL shown by GitHub Pages.

## If You Want Codex to Push Later

After you create the empty GitHub repository, copy its repository URL and send it back here.

It should look like:

`https://github.com/your-github-name/medical-calculator.git`

Then Codex can try to connect this local folder to that repository if Git permissions are available.

## Easiest No-Code Option: Netlify Drop

Use this if you want to drag and drop the folder.

### Steps

1. Go to `https://app.netlify.com/drop`.
2. Log in or create a free Netlify account.
3. Drag this whole project folder into the drop area.
4. Netlify will publish the app and give you a `netlify.app` URL.
5. You can rename the site in Netlify settings later.

## Cost

- GitHub Pages: free for public repositories.
- Netlify Drop: free tier is enough for this app.
- No server cost.
- No database cost.
- No API cost.

## Privacy Note

This app runs calculations inside the browser. It does not send patient data to a server. If you add analytics, login, database, or AI features later, privacy rules will change.
