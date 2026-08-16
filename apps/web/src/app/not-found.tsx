import { Container, Heading, Link, Text } from "@orvauxe/ui";

export default function NotFound() {
  return (
    <main className="error-screen" id="main-content" tabIndex={-1}>
      <Container>
        <Heading level={1}>Page not found</Heading>
        <Text>The requested route is not available.</Text>
        <Link href="/">Return home</Link>
      </Container>
    </main>
  );
}
