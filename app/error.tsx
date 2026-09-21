"use client";

import { useEffect } from "react";
import { Container } from "../components/ui/Container";
import { Button, LinkButton } from "../components/ui/Button";
import { BUSINESS } from "../lib/constants";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-danger">Something went wrong</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">We hit an unexpected error</h1>
      <p className="mt-3 max-w-sm text-muted">
        Please try again. If the problem continues, call us at {BUSINESS.phone}.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>Try Again</Button>
        <LinkButton href="/" variant="outline">
          Go to Homepage
        </LinkButton>
      </div>
    </Container>
  );
}
