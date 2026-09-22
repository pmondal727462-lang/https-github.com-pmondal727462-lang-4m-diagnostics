import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-20">
      <Container className="flex flex-col items-center gap-4 text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          404
        </span>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="max-w-md text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist. Try one of the links
          below or contact us on WhatsApp for help.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Go to Homepage
          </Link>
          <Link
            href="/doctors"
            className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            View Doctors
          </Link>
        </div>
      </Container>
    </section>
  );
}
