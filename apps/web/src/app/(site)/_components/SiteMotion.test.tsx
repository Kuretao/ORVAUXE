// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { SiteMotion } from "./SiteMotion.client";

function mediaQuery(matches: boolean): MediaQueryList {
  return {
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
    matches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  } as MediaQueryList;
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("SiteMotion", () => {
  it("keeps reveal content static and readable when reduced motion is requested", () => {
    const query = mediaQuery(true);
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => query),
    );

    render(
      <>
        <div data-motion-reveal>Important product proof</div>
        <SiteMotion />
      </>,
    );

    expect(screen.getByText("Important product proof")).toHaveAttribute(
      "data-motion-state",
      "static",
    );
    expect(query.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("reveals an observed composition once it enters the viewport and cleans up", () => {
    const query = mediaQuery(false);
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => query),
    );
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      bottom: 1400,
      height: 200,
      left: 0,
      right: 400,
      toJSON: () => ({}),
      top: 1200,
      width: 400,
      x: 0,
      y: 1200,
    });

    const disconnect = vi.fn();
    const observe = vi.fn();
    const unobserve = vi.fn();
    let notify: IntersectionObserverCallback = () => undefined;

    class IntersectionObserverStub implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px 0px -12% 0px";
      readonly scrollMargin = "";
      readonly thresholds = [0, 0.12];

      constructor(callback: IntersectionObserverCallback) {
        notify = callback;
      }

      disconnect() {
        disconnect();
      }

      observe(element: Element) {
        observe(element);
      }

      takeRecords() {
        return [];
      }

      unobserve(element: Element) {
        unobserve(element);
      }
    }

    vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

    const { unmount } = render(
      <>
        <div data-motion-reveal data-motion-variant="composition">
          <h2 data-motion-part="heading">Measured entrance</h2>
        </div>
        <SiteMotion />
      </>,
    );

    const composition = screen.getByRole("heading", { name: "Measured entrance" }).parentElement;
    if (!composition) throw new Error("Expected the motion composition wrapper.");
    expect(composition).toHaveAttribute("data-motion-state", "pending");
    expect(observe).toHaveBeenCalledWith(composition);

    act(() => {
      notify(
        [
          {
            boundingClientRect: { bottom: 400 },
            isIntersecting: true,
            target: composition,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    expect(composition).toHaveAttribute("data-motion-state", "revealed");
    expect(unobserve).toHaveBeenCalledWith(composition);

    unmount();
    expect(disconnect).toHaveBeenCalled();
    expect(query.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("reveals content skipped by a fast scroll even when the observer does not notify", () => {
    const query = mediaQuery(false);
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => query),
    );
    let top = 1200;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      () =>
        ({
          bottom: top + 200,
          height: 200,
          left: 0,
          right: 400,
          toJSON: () => ({}),
          top,
          width: 400,
          x: 0,
          y: top,
        }) as DOMRect,
    );

    class IntersectionObserverStub {
      disconnect = vi.fn();
      observe = vi.fn();
      unobserve = vi.fn();
    }

    vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });

    render(
      <>
        <div data-motion-reveal>Fast-scroll proof</div>
        <SiteMotion />
      </>,
    );

    const proof = screen.getByText("Fast-scroll proof");
    expect(proof).toHaveAttribute("data-motion-state", "pending");

    top = -400;
    fireEvent.scroll(window);

    expect(proof).toHaveAttribute("data-motion-state", "revealed");
  });
});
