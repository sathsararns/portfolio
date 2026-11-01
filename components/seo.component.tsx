import Head from "next/head";
import { pageUrl, publicUrl, site } from "@/utils/seo";

type SeoProps = {
  title: string;
  description: string;
  route?: string;
  image?: string;
  imageAlt?: string;
  structuredData?: Record<string, unknown>;
};

export default function Seo({ title, description, route = "/", image = "/social/portfolio.png", imageAlt = site.name + " - " + site.role, structuredData }: SeoProps) {
  const canonical = pageUrl(route);
  const socialImage = publicUrl(image);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} key="google-site-verification" />}
      <meta name="author" content={site.name} key="author" />
      <meta name="robots" content="index,follow,max-image-preview:large" key="robots" />
      <link rel="canonical" href={canonical} key="canonical" />
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:site_name" content={site.name + " Portfolio"} key="og:site_name" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={canonical} key="og:url" />
      <meta property="og:image" content={socialImage} key="og:image" />
      <meta property="og:image:type" content="image/png" key="og:image:type" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta property="og:image:alt" content={imageAlt} key="og:image:alt" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={socialImage} key="twitter:image" />
      <meta name="twitter:image:alt" content={imageAlt} key="twitter:image:alt" />
      <meta name="theme-color" content="#020617" key="theme-color" />
      {structuredData && (
        <script key="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      )}
    </Head>
  );
}
