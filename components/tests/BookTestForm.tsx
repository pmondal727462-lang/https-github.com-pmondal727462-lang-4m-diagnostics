"use client";

import { useState, type FormEvent } from "react";
import { BLOOD_TESTS } from "@/lib/blood-tests";
import { buildTestBookingMessage, openWhatsApp } from "@/lib/whatsapp";

export default function BookTestForm({ initialTest = "" }: { initialTest?: string }) {
  const [testName, setTestName] = useState(initialTest);
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [date, setDate] = useState("");
  const [homeCollection, setHomeCollection] = useState("No");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = buildTestBookingMessage({
      testName,
      patientName,
      age,
      gender,
      date,
      homeCollection,
    });
    openWhatsApp(message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8"
    >
      <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
        Test
        <input
          required
          list="test-options"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="e.g. Complete Blood Count (CBC)"
          className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <datalist id="test-options">
          {BLOOD_TESTS.map((test) => (
            <option key={test.name} value={test.name} />
          ))}
        </datalist>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="col-span-2 flex flex-col gap-1.5 text-sm font-medium text-slate-700 sm:col-span-1">
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
          Home Sample Collection
          <select
            value={homeCollection}
            onChange={(e) => setHomeCollection(e.target.value)}
            className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fbf5a]"
      >
        BOOK TEST ON WHATSAPP
      </button>
    </form>
  );
}
