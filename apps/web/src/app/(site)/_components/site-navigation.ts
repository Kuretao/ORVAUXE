export const siteNavigationItems = [
  { href: "/editions", label: "Editions" },
  { href: "/atelier", label: "Atelier" },
  { href: "/studio", label: "Studio" },
  { href: "/start-a-project", label: "Start a Project" },
] as const;

export type SiteNavigationItem = (typeof siteNavigationItems)[number];

export function isCurrentNavigationItem(pathname: string, href: SiteNavigationItem["href"]) {
  const normalizedPathname = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (href === "/editions") {
    return normalizedPathname === href || normalizedPathname.startsWith(`${href}/`);
  }

  return normalizedPathname === href;
}
