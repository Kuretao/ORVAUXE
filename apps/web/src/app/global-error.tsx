"use client";

import * as Sentry from "@sentry/nextjs";
import { Button, Heading, Text } from "@orvauxe/ui";
import { useEffect } from "react";

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    try {
      Sentry.captureException(error);
    } catch {
      // Observability must never replace the safe rendering-error experience.
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="error-screen" id="main-content">
          <Heading level={1}>Application error</Heading>
          <Text>The application could not render safely.</Text>
          <Button onClick={reset}>Try again</Button>
        </main>
      </body>
    </html>
  );
}
