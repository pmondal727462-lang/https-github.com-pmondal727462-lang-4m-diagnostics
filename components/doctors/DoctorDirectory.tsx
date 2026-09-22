"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { DOCTORS, SPECIALTY_FILTERS, searchDoctors } from "@/lib/doctors";
import DoctorCard from "@/components/doctors/DoctorCard";

export default function DoctorDirectory({
  initialSpecialty = "All",
}: {
  initialSpecialty?: string;
}) {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState(initialSpecialty);

  const results = useMemo(
    () => searchDoctors(query, specialty),
    [query, specialty]
  );

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by doctor name, specialty, day or time (e.g. Cardiologist)"
          className="w-full rounded-full border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {SPECIALTY_FILTERS.map((item) => {
          const active = item === specialty;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setSpecialty(item)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                active
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Showing {results.length} of {DOCTORS.length} doctors
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-sm text-slate-600">
            No doctors matched your search. Try a different name, specialty,
            day or time, or contact us directly on WhatsApp.
          </p>
        </div>
      )}
    </div>
  );
}
