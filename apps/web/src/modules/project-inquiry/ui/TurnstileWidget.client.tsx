"use client";

import { Button } from "@orvauxe/ui";

export interface TurnstileWidgetProps {
  onToken(token: string): void;
}

export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  return (
    <fieldset>
      <legend>Verification</legend>
      <p>Verify securely before sending your inquiry.</p>
      <Button onClick={() => onToken("skeleton-turnstile-token")}>Verify &amp; continue</Button>
    </fieldset>
  );
}
