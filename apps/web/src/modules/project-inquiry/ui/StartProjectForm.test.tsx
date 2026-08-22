// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { StartProjectForm } from "./StartProjectForm.client";

vi.mock("@orvauxe/analytics/client", () => ({ trackClient: vi.fn() }));
vi.mock("../actions/submit-project-inquiry.action", () => ({
  submitProjectInquiryAction: vi.fn(async (state: unknown) => state),
}));
afterEach(cleanup);

describe("StartProjectForm", () => {
  it("preselects Nocturne without exposing a free-form edition slug", () => {
    render(<StartProjectForm initialEditionSlug="nocturne" />);

    expect(screen.getByLabelText(/What are you building/i)).toHaveValue("edition");
    expect(screen.getByLabelText("Edition interest")).toHaveValue("nocturne");
    expect(screen.getByRole("option", { name: "Nocturne — Concept Edition" })).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /Edition slug/i })).not.toBeInTheDocument();
  });

  it("exposes the qualification fields and required semantics accessibly", () => {
    render(<StartProjectForm />);

    expect(screen.getByRole("form", { name: "Project inquiry" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name Required$/i)).toBeRequired();
    expect(screen.getByLabelText(/Email/i)).toBeRequired();
    expect(screen.getByLabelText(/What are you building/i)).toBeRequired();
    expect(screen.getByLabelText(/Project context/i)).toBeRequired();
    expect(screen.getByRole("group", { name: "Verification" })).toHaveTextContent(
      "Verify securely before sending your inquiry.",
    );
    expect(screen.getByRole("button", { name: "Verify & continue" })).toBeEnabled();
    expect(screen.queryByText(/Bot verification|Prepare verification/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit inquiry" })).toBeEnabled();
  });
});
