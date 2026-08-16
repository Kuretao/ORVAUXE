import { describe, expect, it } from "vitest";

import { buildContentSecurityPolicy } from "./content-security-policy";

describe("content security policy", () => {
  it("allows React development diagnostics without weakening production", () => {
    expect(buildContentSecurityPolicy("development")).toContain("'unsafe-eval'");
    expect(buildContentSecurityPolicy("production")).not.toContain("'unsafe-eval'");
    expect(buildContentSecurityPolicy("test")).not.toContain("'unsafe-eval'");
  });
});
