# Sathsara Ranasooriya - AI/ML Engineer Portfolio

Live portfolio: https://sathsararns.github.io/portfolio/

A Next.js portfolio featuring AI assistants, machine learning pipelines and data
engineering projects:

- [WedaHub](https://sathsararns.github.io/portfolio/projects/wedahub/): service booking with an AI assistant.
- [Opsyntra](https://sathsararns.github.io/portfolio/projects/opsyntra/): customer churn prediction and streaming analytics.
- [Voya AI](https://sathsararns.github.io/portfolio/projects/voya/): document-backed travel planning for Sri Lanka.

Built with Next.js, React, TypeScript, Tailwind CSS and Framer Motion. Courier Prime
fonts are served locally. GitHub Actions builds and publishes a static export to
GitHub Pages.

## Local development

Use Node.js 22 and npm:

```powershell
npm ci
npm run dev
```

Open http://localhost:3000. Development files are cached in `.next-dev/` so a
production build can run alongside the development server.

The contact form uses these browser-facing EmailJS settings in a local `.env`:

```text
NEXT_PUBLIC_EMAIL_JS_SERVICE_ID=your-service-id
NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID=your-template-id
NEXT_PUBLIC_EMAIL_JS_USER_ID=your-public-key
```

## Production and future updates

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/portfolio"
npm run build
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

The build emits `out/`, including the sitemap. Push source changes to `master` to
rebuild and deploy automatically. `next start` does not serve this static export.

See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting details and [SEO.md](SEO.md) for
metadata, sitemap and Google Search Console setup.
