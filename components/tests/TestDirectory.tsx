"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BLOOD_TESTS, BLOOD_TEST_CATEGORIES, searchBloodTests } from "@/lib/blood-tests";
import TestCard from "@/components/tests/TestCard";

export default function TestDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => searchBloodTests(query, category), [query, category]);

  const categories = ["All", ...BLOOD_TEST_CATEGORIES];

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tests, e.g. Thyroid, CBC, Vitamin D"
          className="w-full rounded-full border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                active
                  ? "bg-red-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Showing {results.length} of {BLOOD_TESTS.length} tests
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((test) => (
            <TestCard key={test.name} test={test} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-sm text-slate-600">
            No tests matched your search. Contact 4M Diagnostics on WhatsApp
            for any test not listed here.
          </p>
        </div>
      )}
    </div>
  );
}
