"use client";

import { useMemo, useState, type FormEvent } from "react";
import { DOCTORS, getDoctorBySlug } from "@/lib/doctors";
import { buildDoctorAppointmentMessage, openWhatsApp } from "@/lib/whatsapp";

export default function AppointmentForm({
  initialDoctorSlug = "",
}: {
  initialDoctorSlug?: string;
}) {
  const initialDoctor = initialDoctorSlug ? getDoctorBySlug(initialDoctorSlug) : undefined;

  const [doctorSlug, setDoctorSlug] = useState(initialDoctor?.slug ?? "");
  const [specialty, setSpecialty] = useState(initialDoctor?.specialty ?? "");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const selectedDoctor = useMemo(
    () => DOCTORS.find((doc) => doc.slug === doctorSlug),
    [doctorSlug]
  );

  function handleDoctorChange(slug: string) {
    setDoctorSlug(slug);
    const doc = DOCTORS.find((d) => d.slug === slug);
    if (doc) setSpecialty(doc.specialty);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = buildDoctorAppointmentMessage({
      doctorName: selectedDoctor?.name ?? "Not specified",
      specialty: specialty || "Not specified",
      patientName,
      age,
      gender,
      mobile,
      date,
      time: time || "By Appointment",
      reason,
    });
    openWhatsApp(message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Doctor
          <select
            required
            value={doctorSlug}
            onChange={(e) => handleDoctorChange(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select a doctor</option>
            {DOCTORS.map((doc) => (
              <option key={doc.slug} value={doc.slug}>
                {doc.name} &mdash; {doc.specialty}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Specialty
          <input
            required
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="e.g. Cardiologist"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Patient Name
          <input
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="Full name"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Mobile Number
          <input
            required
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="10-digit mobile number"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Age
          <input
            required
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="Age"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Gender
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Preferred Date
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Preferred Time
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder={selectedDoctor?.byAppointment ? "By Appointment" : selectedDoctor?.time ?? "e.g. 5:00 PM"}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
        Reason for Consultation
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="Briefly describe your concern (optional)"
        />
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fbf5a]"
      >
        BOOK APPOINTMENT ON WHATSAPP
      </button>
    </form>
  );
}
