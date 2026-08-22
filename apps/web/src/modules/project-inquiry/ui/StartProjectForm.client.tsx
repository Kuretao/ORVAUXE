"use client";

import { trackClient } from "@orvauxe/analytics/client";
import { Button } from "@orvauxe/ui";
import { useActionState, useRef, useState } from "react";

import { submitProjectInquiryAction } from "../actions/submit-project-inquiry.action";
import { bindTurnstileToken } from "../model/project-inquiry.types";
import type { InquiryActionState, TurnstileIdentityState } from "../model/project-inquiry.types";
import styles from "./StartProjectForm.module.css";
import { TurnstileWidget } from "./TurnstileWidget.client";

const initialState: InquiryActionState = { status: "idle" };

interface StartProjectFormProps {
  initialEditionSlug?: "nocturne";
}

function errorFor(state: InquiryActionState, name: string) {
  return state.status === "invalid" ? state.fieldErrors[name]?.[0] : undefined;
}

export function StartProjectForm({ initialEditionSlug }: StartProjectFormProps) {
  const [submissionId] = useState(() => crypto.randomUUID());
  const started = useRef(false);
  const [verification, setVerification] = useState<TurnstileIdentityState>({ submissionId });
  const [state, action, pending] = useActionState(submitProjectInquiryAction, initialState);
  const completed = state.status === "accepted";

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackClient("project_form_started", { form_version: "1", entry_context: "start-a-project" });
  }

  function fieldState(name: string) {
    const message = errorFor(state, name);
    return {
      "aria-describedby": message ? `${name}-error` : undefined,
      "aria-invalid": message ? (true as const) : undefined,
      message,
    };
  }

  const nameState = fieldState("name");
  const emailState = fieldState("email");
  const websiteState = fieldState("companyWebsite");
  const serviceState = fieldState("serviceInterest");
  const editionState = fieldState("editionSlug");
  const messageState = fieldState("inquiryMessage");

  return (
    <form
      action={action}
      aria-label="Project inquiry"
      className={styles.form}
      onInput={completed ? undefined : markStarted}
    >
      <fieldset className={styles.fields} disabled={pending || completed}>
        <legend className={styles.visuallyHidden}>Project inquiry details</legend>
        <input name="submissionId" type="hidden" value={submissionId} />
        <input
          name="turnstileVerificationId"
          type="hidden"
          value={verification.turnstileVerificationId ?? ""}
        />
        <input name="turnstileToken" type="hidden" value={verification.token ?? ""} />
        <input name="sourceContext" type="hidden" value="start-a-project" />

        <div className={styles.fieldPair}>
          <label className={styles.field}>
            <span>
              Name <em>Required</em>
            </span>
            <input
              aria-describedby={nameState["aria-describedby"]}
              aria-invalid={nameState["aria-invalid"]}
              autoComplete="name"
              name="name"
              required
            />
            {nameState.message ? (
              <small id="name-error" role="alert">
                {nameState.message}
              </small>
            ) : null}
          </label>
          <label className={styles.field}>
            <span>
              Email <em>Required</em>
            </span>
            <input
              aria-describedby={emailState["aria-describedby"]}
              aria-invalid={emailState["aria-invalid"]}
              autoComplete="email"
              name="email"
              required
              type="email"
            />
            {emailState.message ? (
              <small id="email-error" role="alert">
                {emailState.message}
              </small>
            ) : null}
          </label>
        </div>

        <div className={styles.fieldPair}>
          <label className={styles.field}>
            <span>Brand / company</span>
            <input autoComplete="organization" name="companyName" />
          </label>
          <label className={styles.field}>
            <span>Current website</span>
            <input
              aria-describedby={websiteState["aria-describedby"]}
              aria-invalid={websiteState["aria-invalid"]}
              autoComplete="url"
              inputMode="url"
              name="companyWebsite"
              placeholder="https://"
              type="url"
            />
            {websiteState.message ? (
              <small id="companyWebsite-error" role="alert">
                {websiteState.message}
              </small>
            ) : null}
          </label>
        </div>

        <div className={styles.fieldPair}>
          <label className={styles.field}>
            <span>
              What are you building? <em>Required</em>
            </span>
            <select
              aria-describedby={serviceState["aria-describedby"]}
              aria-invalid={serviceState["aria-invalid"]}
              defaultValue={initialEditionSlug ? "edition" : ""}
              name="serviceInterest"
              required
            >
              <option disabled value="">
                Select a project route
              </option>
              <option value="edition">Edition</option>
              <option value="atelier">Atelier</option>
            </select>
            {serviceState.message ? (
              <small id="serviceInterest-error" role="alert">
                {serviceState.message}
              </small>
            ) : null}
          </label>
          <label className={styles.field}>
            <span>Edition interest</span>
            <select
              aria-describedby={editionState["aria-describedby"]}
              aria-invalid={editionState["aria-invalid"]}
              defaultValue={initialEditionSlug ?? ""}
              name="editionSlug"
            >
              <option value="">No specific Edition</option>
              <option value="nocturne">Nocturne — Concept Edition</option>
            </select>
            {editionState.message ? (
              <small id="editionSlug-error" role="alert">
                {editionState.message}
              </small>
            ) : null}
          </label>
        </div>

        <label className={styles.field}>
          <span>Budget range</span>
          <select defaultValue="" name="budgetRange">
            <option value="">Not selected</option>
            <option value="under_10k">Under $10k</option>
            <option value="10k_25k">$10k–$25k</option>
            <option value="25k_50k">$25k–$50k</option>
            <option value="50k_plus">$50k+</option>
            <option value="undecided">Undecided</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>
            Project context <em>Required</em>
          </span>
          <textarea
            aria-describedby={messageState["aria-describedby"]}
            aria-invalid={messageState["aria-invalid"]}
            minLength={10}
            name="inquiryMessage"
            placeholder="The brand, current storefront, launch context and what needs to change."
            required
            rows={7}
          />
          {messageState.message ? (
            <small id="inquiryMessage-error" role="alert">
              {messageState.message}
            </small>
          ) : null}
        </label>

        <div className={styles.verification}>
          <TurnstileWidget
            onToken={(token) => setVerification((current) => bindTurnstileToken(current, token))}
          />
        </div>
        <Button className={styles.submit} disabled={pending || completed} type="submit">
          {pending ? "Submitting…" : completed ? "Inquiry received" : "Submit inquiry"}
        </Button>
      </fieldset>

      <div aria-live="polite" className={styles.response}>
        {state.status === "invalid" ? (
          <p role="alert">Review the marked inquiry fields and try again.</p>
        ) : null}
        {state.status === "verification_failed" || state.status === "retryable_error" ? (
          <p role="alert">{state.message}</p>
        ) : null}
        {state.status === "accepted" ? (
          <p role="status">
            Inquiry received. ORVAUXE will review the project and respond through the email you
            provided.
          </p>
        ) : null}
      </div>
    </form>
  );
}
