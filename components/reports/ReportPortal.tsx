"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { formatDate } from "../../lib/format";

interface ReportRow {
  id: string;
  testName: string;
  status: "PROCESSING" | "READY" | "DOWNLOADED";
  reportDate: string | null;
  hasFile: boolean;
}

const inputCls =
  "w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-primary";

const STATUS_LABEL: Record<ReportRow["status"], string> = {
  PROCESSING: "Processing",
  READY: "Ready",
  DOWNLOADED: "Downloaded",
};

export function ReportPortal() {
  const [step, setStep] = useState<"mobile" | "otp" | "reports">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<ReportRow[]>([]);

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, purpose: "REPORT_ACCESS" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Unable to send OTP.");
        return;
      }
      setDevOtp(data.devOtp ?? null);
      setStep("otp");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp, purpose: "REPORT_ACCESS" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Incorrect OTP.");
        return;
      }
      const reportsRes = await fetch("/api/reports");
      const reportsData = await reportsRes.json();
      setReports(reportsData.reports ?? []);
      setStep("reports");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "reports") {
    return (
      <div>
        {reports.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface/60 p-10 text-center">
            <p className="font-semibold text-foreground">No reports found yet</p>
            <p className="mt-1 text-sm text-muted">
              Reports will appear here once your samples have been processed.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
            {reports.map((report) => (
              <div key={report.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <p className="font-semibold text-foreground">{report.testName}</p>
                  <p className="text-xs text-muted">
                    {report.reportDate ? formatDate(report.reportDate) : "Date pending"} ·{" "}
                    {STATUS_LABEL[report.status]}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!report.hasFile}
                  title={report.hasFile ? undefined : "Report file has not been uploaded yet"}
                >
                  {report.hasFile ? "View / Download" : "Not available yet"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      {step === "mobile" ? (
        <form onSubmit={sendOtp} className="space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Mobile Number</span>
            <input
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              className={inputCls}
            />
          </label>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending OTP…" : "Send OTP"}
          </Button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="space-y-4">
          <p className="text-sm text-muted">OTP sent to {mobile}</p>
          {devOtp ? (
            <p className="rounded-lg bg-brand-primary/10 px-3 py-2 text-xs text-brand-primary">
              Development mode — OTP: <strong>{devOtp}</strong>
            </p>
          ) : null}
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Enter OTP</span>
            <input
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              inputMode="numeric"
              maxLength={6}
              className={inputCls}
            />
          </label>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Verifying…" : "Verify & View Reports"}
          </Button>
        </form>
      )}
    </div>
  );
}
