"use client";

import { useState, type FormEvent } from "react";
import { buildHomeCollectionMessage, openWhatsApp } from "@/lib/whatsapp";

export default function HomeCollectionForm() {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [testRequired, setTestRequired] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = buildHomeCollectionMessage({
      patientName,
      age,
      gender,
      address,
      pincode,
      testRequired,
      date,
      time,
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
          Pincode
          <input
            required
            inputMode="numeric"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="e.g. 700151"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
        Address
        <textarea
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="Full address for sample collection"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
        Test Required
        <input
          required
          value={testRequired}
          onChange={(e) => setTestRequired(e.target.value)}
          className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="e.g. CBC, Thyroid Profile"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
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
            placeholder="e.g. Morning, 10:00 AM"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fbf5a]"
      >
        BOOK HOME COLLECTION
      </button>
    </form>
  );
}
