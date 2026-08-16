import type { Metadata } from "next";
import { Container, Heading } from "@orvauxe/ui";

import { StartProjectForm } from "@/modules/project-inquiry";
import { buildMetadata } from "@/seo/metadata/build-metadata";

export const metadata: Metadata = buildMetadata({
  title: "Start a project",
  description: "Neutral project-inquiry route skeleton.",
  pathname: "/start-a-project",
});

export default function StartProjectPage() {
  return (
    <main className="screen-stack" id="main-content" tabIndex={-1}>
      <Container>
        <Heading level={1}>Start a project</Heading>
        <StartProjectForm />
      </Container>
    </main>
  );
}
