import type { Metadata } from "next";
import { draftMode } from "next/headers";
import type { ReactNode } from "react";
import { Link } from "@orvauxe/ui";

export async function generateMetadata(): Promise<Metadata> {
  const preview = (await draftMode()).isEnabled;

  return preview
    ? {
        robots: {
          follow: false,
          index: false,
          nocache: true,
        },
      }
    : {};
}

const navigation = [
  { href: "/", label: "Home" },
  { href: "/editions", label: "Editions" },
  { href: "/atelier", label: "Atelier" },
  { href: "/studio", label: "Studio" },
  { href: "/start-a-project", label: "Start a project" },
] as const;

export default function SiteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <nav aria-label="Primary">
          <ul className="site-navigation">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {children}
      <footer className="site-footer">ORVAUXE development skeleton</footer>
    </div>
  );
}
