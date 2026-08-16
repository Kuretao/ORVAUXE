"use client";

import { Button } from "@orvauxe/ui";

export interface TurnstileWidgetProps {
  onToken(token: string): void;
}

export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  return (
    <fieldset>
      <legend>Bot verification</legend>
      <p>The production Turnstile widget is connected in the website implementation phase.</p>
      <Button onClick={() => onToken("skeleton-turnstile-token")}>Prepare verification</Button>
    </fieldset>
  );
}
