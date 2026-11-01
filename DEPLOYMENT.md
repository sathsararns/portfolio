# GitHub Pages deployment

This checkout is configured for the project site at https://sathsararns.github.io/portfolio/.
Use the `sathsararns/portfolio` repository. The workflow sets
`NEXT_PUBLIC_BASE_PATH=/portfolio`; localhost development uses the root path.

## First publication

1. Create the `portfolio` repository on the `sathsararns` GitHub account.
   For a free GitHub account, use a public repository.
2. In the repository, open **Settings > Pages** and select **GitHub Actions** as
   the build and deployment source.
3. Add these repository secrets under **Settings > Secrets and variables > Actions**
   using the values from your local EmailJS configuration:
   - `NEXT_PUBLIC_EMAIL_JS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAIL_JS_USER_ID`
   These are public browser configuration values, not server-only credentials.
   In EmailJS, allow https://sathsararns.github.io if you use an origin allowlist.
4. Connect this existing checkout to the repository, commit the intended source
   changes and push `master` or `main`. Do not upload `.env`, `node_modules`,
   `.next`, or `out`.
5. Watch **Actions > Deploy portfolio to GitHub Pages**. After a successful run,
   open https://sathsararns.github.io/portfolio/ and verify the three project pages and form.

If you use GitHub CLI and its login has expired, run `gh auth login --hostname github.com`
first. Never paste authentication tokens into chat or commit them to the repository.

## Local verification

Run `npm run dev` for normal development (cache: `.next-dev/`). Run `npm run build` to create `out/` (build cache: `.next/`).
The export includes directory index files for `/projects/wedahub/`,
`/projects/opsyntra/`, and `/projects/voya/`, so direct visits and reloads work
on a static host. `next start` does not serve a static export; use a static
HTTP server to preview the `out/` directory.

`next/image` is unoptimized because GitHub Pages does not run the Next.js image
optimization service. The unused starter `/api/hello` endpoint is not available
on GitHub Pages. The contact form talks directly to EmailJS from the browser.

## Future updates

Edit this same checkout, verify it locally, commit and push to the production
branch. The workflow rebuilds and deploys the site at the same URL. Changing an
EmailJS repository secret also requires a fresh build; rerun the workflow from
the Actions tab or push a new commit.

To test the production prefix locally in PowerShell, set
`$env:NEXT_PUBLIC_BASE_PATH="/portfolio"`, run `npm run build`, then
`Remove-Item Env:NEXT_PUBLIC_BASE_PATH`. Serve `out/` at the `/portfolio/` mount path.
