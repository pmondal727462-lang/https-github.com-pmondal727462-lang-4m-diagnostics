"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ marginTop: "0.5rem", color: "#5b7480" }}>
          Please refresh the page, or try again shortly.
        </p>
        <button
          onClick={() => reset()}
          style={{
            marginTop: "1.5rem",
            padding: "0.6rem 1.5rem",
            borderRadius: "999px",
            background: "#0d6e8f",
            color: "white",
            border: "none",
            fontWeight: 600,
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
