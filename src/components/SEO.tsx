import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string;
  author?: string;
}

const SEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = "/assets/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords,
  author = "High Agency Collective",
}: SEOProps) => {
  const baseUrl = window.location.origin;
  const fullCanonicalUrl = canonicalUrl || window.location.href;
  const fullTitle = title.includes("High Agency Collective")
    ? title
    : `${title} | High Agency Collective`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      attribute = "name",
    ) => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    if (keywords) updateMetaTag("keywords", keywords);
    updateMetaTag("author", author);

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:type", ogType, "property");
    updateMetaTag("og:url", fullCanonicalUrl, "property");
    updateMetaTag("og:image", `${baseUrl}${ogImage}`, "property");
    updateMetaTag("og:site_name", "High Agency Collective", "property");

    // Twitter Card tags
    updateMetaTag("twitter:card", twitterCard);
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `${baseUrl}${ogImage}`);

    // Canonical URL
    updateLinkTag("canonical", fullCanonicalUrl);

    // Clean up on unmount
    return () => {
      // Note: We don't remove tags on unmount as they should persist for navigation
    };
  }, [
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    twitterCard,
    keywords,
    author,
    fullTitle,
    fullCanonicalUrl,
    baseUrl,
  ]);

  return null;
};

export default SEO;
