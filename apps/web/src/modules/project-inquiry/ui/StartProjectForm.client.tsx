"use client";

import { trackClient } from "@orvauxe/analytics/client";
import { Button } from "@orvauxe/ui";
import { useActionState, useRef, useState } from "react";

import { submitProjectInquiryAction } from "../actions/submit-project-inquiry.action";
import { bindTurnstileToken } from "../model/project-inquiry.types";
import type { InquiryActionState, TurnstileIdentityState } from "../model/project-inquiry.types";
import { TurnstileWidget } from "./TurnstileWidget.client";

const initialState: InquiryActionState = { status: "idle" };

export function StartProjectForm() {
  const [submissionId] = useState(() => crypto.randomUUID());
  const started = useRef(false);
  const [verification, setVerification] = useState<TurnstileIdentityState>({
    submissionId,
  });
  const [state, action, pending] = useActionState(submitProjectInquiryAction, initialState);
  const completed = state.status === "accepted";

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackClient("project_form_started", { form_version: "1", entry_context: "start-a-project" });
  }

  return (
    <form
      action={action}
      aria-label="Project inquiry"
      onInput={completed ? undefined : markStarted}
    >
      <fieldset aria-disabled={pending || completed} disabled={pending || completed}>
        <input name="submissionId" type="hidden" value={submissionId} />
        <input
          name="turnstileVerificationId"
          type="hidden"
          value={verification.turnstileVerificationId ?? ""}
        />
        <input name="turnstileToken" type="hidden" value={verification.token ?? ""} />
        <input name="sourceContext" type="hidden" value="start-a-project" />

        <label>
          Name
          <input autoComplete="name" name="name" required />
        </label>
        <label>
          Email
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label>
          Company
          <input autoComplete="organization" name="companyName" />
        </label>
        <label>
          Company website
          <input autoComplete="url" name="companyWebsite" type="url" />
        </label>
        <label>
          Project type
          <select defaultValue="" name="serviceInterest" required>
            <option disabled value="">
              Select a project type
            </option>
            <option value="edition">Edition</option>
            <option value="atelier">Atelier</option>
          </select>
        </label>
        <label>
          Edition slug
          <input name="editionSlug" />
        </label>
        <label>
          Budget range
          <select defaultValue="" name="budgetRange">
            <option value="">Not selected</option>
            <option value="under_10k">Under 10k</option>
            <option value="10k_25k">10k–25k</option>
            <option value="25k_50k">25k–50k</option>
            <option value="50k_plus">50k+</option>
            <option value="undecided">Undecided</option>
          </select>
        </label>
        <label>
          Project details
          <textarea minLength={10} name="inquiryMessage" required rows={6} />
        </label>

        <TurnstileWidget
          onToken={(token) => setVerification((current) => bindTurnstileToken(current, token))}
        />
        <Button disabled={pending || completed} type="submit">
          {pending ? "Submitting…" : "Submit inquiry"}
        </Button>
      </fieldset>

      {state.status === "invalid" ? (
        <div role="alert">Review the marked inquiry fields.</div>
      ) : null}
      {state.status === "verification_failed" || state.status === "retryable_error" ? (
        <div role="alert">{state.message}</div>
      ) : null}
      {state.status === "accepted" ? <p role="status">Inquiry accepted.</p> : null}
    </form>
  );
}
