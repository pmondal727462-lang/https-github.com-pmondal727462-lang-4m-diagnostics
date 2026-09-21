"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { formatINR } from "../../lib/format";

export interface DoctorOption {
  id: string;
  name: string;
  specialization: string;
  consultationFee: number;
}

const inputCls =
  "w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-primary";

export function AppointmentForm({
  doctors,
  defaultDoctorId,
}: {
  doctors: DoctorOption[];
  defaultDoctorId?: string;
}) {
  const [doctorId, setDoctorId] = useState(defaultDoctorId ?? doctors[0]?.id ?? "");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const selectedDoctor = doctors.find((d) => d.id === doctorId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId,
          date,
          time,
          patient: { name, mobile, email: email || undefined },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setConfirmed(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (doctors.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/60 p-10 text-center">
        <p className="font-semibold text-foreground">No doctors available yet</p>
        <p className="mt-1 text-sm text-muted">
          Doctor profiles will appear here once published in the admin dashboard.
        </p>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-3xl">✅</p>
        <h2 className="mt-3 text-xl font-bold text-foreground">Appointment Requested</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Our team will contact you on {mobile} to confirm your appointment with{" "}
          {selectedDoctor?.name}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-surface p-6">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Doctor</span>
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className={inputCls}>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.specialization} ({formatINR(d.consultationFee)})
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Full Name *</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Mobile Number *</span>
          <input
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            inputMode="numeric"
            maxLength={10}
            className={inputCls}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-foreground">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Preferred Date *</span>
          <input
            type="date"
            required
            min={new Date().toISOString().slice(0, 10)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputCls}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Preferred Time *</span>
          <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
        </label>
      </div>

      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Requesting…" : "Request Appointment"}
      </Button>
    </form>
  );
}
