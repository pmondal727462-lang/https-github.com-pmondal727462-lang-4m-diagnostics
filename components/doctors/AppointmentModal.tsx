"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Doctor } from "@/lib/types";
import { buildDoctorAppointmentMessage, openWhatsApp } from "@/lib/whatsapp";

export default function AppointmentModal({
  doctor,
  triggerLabel = "BOOK APPOINTMENT",
  triggerClassName = "inline-flex w-full items-center justify-center rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800",
}: {
  doctor: Doctor;
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = buildDoctorAppointmentMessage({
      doctorName: doctor.name,
      specialty: doctor.specialty,
      patientName,
      age,
      gender,
      mobile,
      date,
      time: time || (doctor.byAppointment ? "By Appointment" : doctor.time ?? "Not specified"),
      reason,
    });
    openWhatsApp(message);
    setOpen(false);
  }

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open
        ? createPortal(
            <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 p-0 sm:items-center sm:p-4">
              <div
                className="absolute inset-0"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <div className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Book Appointment
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Request will be sent to 4M Diagnostics on WhatsApp.
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 rounded-2xl bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-900">{doctor.name}</p>
                  <p className="text-xs uppercase tracking-wide text-blue-700">
                    {doctor.specialty}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="col-span-2 flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Patient Name
                      <input
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Full name"
                      />
                    </label>

                    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Age
                      <input
                        required
                        inputMode="numeric"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Age"
                      />
                    </label>

                    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Gender
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </label>

                    <label className="col-span-2 flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Mobile Number
                      <input
                        required
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="10-digit mobile number"
                      />
                    </label>

                    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Preferred Date
                      <input
                        required
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Preferred Time
                      <input
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder={doctor.byAppointment ? "By Appointment" : doctor.time ?? "e.g. 5:00 PM"}
                      />
                    </label>

                    <label className="col-span-2 flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Reason for Visit
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={3}
                        className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Optional"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mt-1 inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fbf5a]"
                  >
                    CONTINUE TO WHATSAPP
                  </button>
                </form>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
