// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigationState = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/headers", () => ({
  draftMode: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
}));

vi.mock("next/link", async () => {
  const { createElement } = await import("react");

  return {
    default: ({
      children,
      href,
      onClick,
      ...props
    }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) =>
      createElement(
        "a",
        {
          ...props,
          href,
          onClick: (event: ReactMouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            onClick?.(event);
          },
        },
        children,
      ),
  };
});

import SiteLayout from "../layout";

function renderSiteLayout() {
  return render(
    <SiteLayout>
      <main id="main-content" tabIndex={-1}>
        <h1>Route content</h1>
      </main>
    </SiteLayout>,
  );
}

beforeEach(() => {
  navigationState.pathname = "/";
  document.body.style.overflow = "";

  Object.defineProperties(HTMLDialogElement.prototype, {
    close: {
      configurable: true,
      value(this: HTMLDialogElement) {
        if (!this.open) {
          return;
        }

        this.removeAttribute("open");
        this.dispatchEvent(new Event("close"));
      },
    },
    showModal: {
      configurable: true,
      value(this: HTMLDialogElement) {
        this.setAttribute("open", "");
      },
    },
  });
});

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

describe("site shell", () => {
  it("renders the skip target contract, landmarks, brand lockup, and launch-only navigation", () => {
    const { container } = renderSiteLayout();

    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#main-content",
    );
    expect(container.querySelectorAll("main")).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ORVAUXE home" })).toHaveAttribute("href", "/");

    const primaryNavigation = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primaryNavigation)
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual(["Editions", "Atelier", "Studio", "Start a Project"]);
    expect(within(primaryNavigation).queryByRole("link", { name: "Home" })).not.toBeInTheDocument();

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText("Commerce Atelier")).toBeInTheDocument();
    expect(within(footer).getByText("Chengdu \u00b7 Worldwide")).toBeInTheDocument();
    expect(within(footer).queryAllByRole("link")).toHaveLength(0);
  });

  it("marks a nested Editions route as current without marking sibling links", () => {
    navigationState.pathname = "/editions/lookbook/";
    renderSiteLayout();

    const primaryNavigation = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primaryNavigation).getByRole("link", { name: "Editions" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(primaryNavigation).getByRole("link", { name: "Atelier" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(within(primaryNavigation).getByRole("link", { name: "Studio" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(
      within(primaryNavigation).getByRole("link", { name: "Start a Project" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("opens the modal navigation, moves focus, and restores focus and body scroll on Escape", async () => {
    document.body.style.overflow = "auto";
    const user = userEvent.setup();
    renderSiteLayout();

    const menuButton = screen.getByRole("button", { name: "Open navigation" });
    await user.click(menuButton);

    const dialog = screen.getByRole("dialog", { name: "Site navigation" });
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(document.body.style.overflow).toBe("hidden");
    const closeButton = within(dialog).getByRole("button", { name: "Close navigation" });
    const lastLink = within(dialog).getByRole("link", { name: "Start a Project" });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(lastLink).toHaveFocus();

    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(dialog, { key: "Escape" });

    await waitFor(() => {
      expect(dialog).not.toHaveAttribute("open");
      expect(document.body.style.overflow).toBe("auto");
      expect(menuButton).toHaveFocus();
    });
  });

  it("closes the modal navigation and releases body scroll when a route is selected", async () => {
    const user = userEvent.setup();
    renderSiteLayout();

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = screen.getByRole("dialog", { name: "Site navigation" });

    await user.click(within(dialog).getByRole("link", { name: "Atelier" }));

    await waitFor(() => {
      expect(dialog).not.toHaveAttribute("open");
      expect(document.body.style.overflow).toBe("");
      expect(screen.getByRole("button", { name: "Open navigation" })).toHaveFocus();
    });
  });
});
