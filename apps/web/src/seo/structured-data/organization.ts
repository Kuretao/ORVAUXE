export interface OrganizationStructuredDataInput {
  name: string;
  url: string | URL;
  logoUrl?: string | URL;
  sameAs?: readonly string[];
}

export interface OrganizationStructuredData {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export function buildOrganizationStructuredData({
  name,
  url,
  logoUrl,
  sameAs = [],
}: OrganizationStructuredDataInput): OrganizationStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: url.toString(),
    ...(logoUrl ? { logo: logoUrl.toString() } : {}),
    ...(sameAs.length > 0 ? { sameAs: [...sameAs] } : {}),
  };
}
