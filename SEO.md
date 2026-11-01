# SEO and Google Search Console

Production URL: https://sathsararns.github.io/portfolio/
Sitemap URL: https://sathsararns.github.io/portfolio/sitemap.xml

The homepage and active project pages have unique titles, descriptions, canonical
URLs, Open Graph/Twitter previews and JSON-LD. The homepage content is present in
the exported HTML before JavaScript runs. The introductory animation still runs
after hydration. Disabled projects are excluded from the sitemap.

`data/site.config.json` is the source of the public URL and search descriptions.
`npm run build` creates `out/` and then generates its sitemap from Next.js's actual
prerendered project routes. Social previews are 1200 x 630 PNGs in `public/social/`;
the matching SVGs preserve editable artwork and embed the licensed local fonts.

## Verify ownership and request indexing

1. Open https://search.google.com/search-console/ with your Google account.
2. Add a **URL prefix** property for `https://sathsararns.github.io/portfolio/`.
   A Domain property would require control of github.io DNS, so use URL prefix.
3. Choose **HTML tag** verification and copy only the tag's `content` value.
4. In the repository's **Settings > Secrets and variables > Actions > Variables**,
   add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` with that value.
5. Rerun the full **Deploy portfolio to GitHub Pages** workflow. After it succeeds,
   return to Search Console and click Verify.
6. Open Sitemaps and submit `sitemap.xml`. Inspect the homepage and project URLs
   using URL Inspection, then request indexing where appropriate.

Ownership verification and submission require your Google account. Neither
sitemap generation nor deployment means that Google has already indexed the site,
and no ranking or rich-result appearance is guaranteed.

## robots.txt on a project site

Search engines read `https://sathsararns.github.io/robots.txt`, at the origin root.
A file at `/portfolio/robots.txt` cannot control this project's crawling. This
repository is hosted under `/portfolio/`, so it does not publish a misleading
subdirectory robots file. Submit the sitemap directly through Search Console.
If you later maintain the account-root site, you can publish robots.txt there.

## Changing the production URL

Update `data/site.config.json` and the deployment's `NEXT_PUBLIC_BASE_PATH` together,
then rebuild. Keep old URL redirects in mind when changing hosting or domains.

References:
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt
