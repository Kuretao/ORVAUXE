"use client";

import { Button } from "@orvauxe/ui";

export interface TurnstileWidgetProps {
  onToken(token: string): void;
}

export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  return (
    <fieldset>
      <legend>Bot verification</legend>
      <p>Complete verification before sending the inquiry.</p>
      <Button onClick={() => onToken("skeleton-turnstile-token")}>Prepare verification</Button>
    </fieldset>
  );
}
