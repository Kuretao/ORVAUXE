"use client";

import * as Sentry from "@sentry/nextjs";
import { Button, Container, Heading, Text } from "@orvauxe/ui";
import { useEffect } from "react";

export interface SiteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SiteError({ error, reset }: SiteErrorProps) {
  useEffect(() => {
    try {
      Sentry.captureException(error);
    } catch {
      // Observability must never replace the safe rendering-error experience.
    }
  }, [error]);

  return (
    <main className="error-screen" id="main-content" tabIndex={-1}>
      <Container>
        <Heading level={1}>Unable to render this page</Heading>
        <Text>The application encountered an unexpected error.</Text>
        <Button onClick={reset}>Try again</Button>
      </Container>
    </main>
  );
}
