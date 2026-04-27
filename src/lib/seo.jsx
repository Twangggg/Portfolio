import { Helmet } from "react-helmet-async";
import site from "../content/site.json";

function toAbsolute(urlOrPath) {
  if (!urlOrPath) return "";
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) return urlOrPath;
  const base = (site.siteUrl || "").replace(/\/$/, "");
  const path = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  return base ? `${base}${path}` : path;
}

export default function SEO({
  title,
  description,
  path = "/",
  image = site.socialPreview?.ogImagePath,
}) {
  const siteTitle = site.title || "Portfolio";
  const fullTitle = title ? `${title} · ${siteTitle}` : siteTitle;
  const desc = description || site.tagline || "";
  const url = toAbsolute(path);
  const img = toAbsolute(image);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {desc ? <meta name="description" content={desc} /> : null}

      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      {desc ? <meta property="og:description" content={desc} /> : null}
      <meta property="og:url" content={url} />
      {img ? <meta property="og:image" content={img} /> : null}

      <meta name="twitter:card" content={img ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      {desc ? <meta name="twitter:description" content={desc} /> : null}
      {img ? <meta name="twitter:image" content={img} /> : null}
    </Helmet>
  );
}

