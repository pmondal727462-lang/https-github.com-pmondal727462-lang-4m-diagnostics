import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/Card";
import { ReportPortal } from "../../components/reports/ReportPortal";

export const metadata: Metadata = {
  title: "My Reports",
  description: "Securely access your diagnostic reports with mobile number and OTP verification.",
  alternates: { canonical: "/reports" },
};

export default function ReportsPage() {
  return (
    <Container className="max-w-xl py-14">
      <SectionHeading eyebrow="Secure access" title="My Reports" description="Verify your mobile number with an OTP to view your reports." />
      <div className="mt-8">
        <ReportPortal />
      </div>
    </Container>
  );
}
