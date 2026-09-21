"use client";

import { useMemo, useState } from "react";
import { formatINR } from "../../lib/format";
import { Button } from "../ui/Button";

export interface CatalogItem {
  id: string;
  kind: "test" | "package";
  name: string;
  price: number;
}

interface SearchResult {
  tests: { id: string; name: string; price: number }[];
  packages: { id: string; name: string; price: number }[];
}

export function BookingForm({
  defaultType,
  initialItem,
}: {
  defaultType: "CENTER_VISIT" | "HOME_COLLECTION";
  initialItem: CatalogItem | null;
}) {
  const [type, setType] = useState<"CENTER_VISIT" | "HOME_COLLECTION">(defaultType);
  const [items, setItems] = useState<CatalogItem[]>(initialItem ? [initialItem] : []);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult>({ tests: [], packages: [] });
  const [searching, setSearching] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [landmark, setLandmark] = useState("");
  const [instructions, setInstructions] = useState("");

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingNumber, setBookingNumber] = useState<string | null>(null);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);

  async function runSearch(value: string) {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults({ tests: [], packages: [] });
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(`/api/catalog/search?q=${encodeURIComponent(value)}`);
      const data: SearchResult = await res.json();
      setResults(data);
    } finally {
      setSearching(false);
    }
  }

  function addItem(item: CatalogItem) {
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
    setQuery("");
    setResults({ tests: [], packages: [] });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Select at least one test or package.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          items: items.map((i) =>
            i.kind === "test" ? { testId: i.id } : { packageId: i.id },
          ),
          patient: {
            name,
            mobile,
            email: email || undefined,
            age: age ? Number(age) : undefined,
            gender: gender || undefined,
            address: address || undefined,
            pincode: pincode || undefined,
          },
          scheduledDate: date,
          scheduledSlot: slot,
          homeCollection:
            type === "HOME_COLLECTION"
              ? { address, landmark: landmark || undefined, pincode, specialInstructions: instructions || undefined }
              : undefined,
          couponCode: couponCode || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setBookingNumber(data.booking.bookingNumber);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (bookingNumber) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-3xl">✅</p>
        <h2 className="mt-3 text-xl font-bold text-foreground">Booking Confirmed</h2>
        <p className="mt-2 text-sm text-muted">Your booking ID is</p>
        <p className="mt-1 text-2xl font-bold tracking-wide text-brand-primary">{bookingNumber}</p>
        <p className="mx-auto mt-4 max-w-sm text-sm text-muted">
          Our team will contact you shortly on the mobile number provided to confirm payment and
          scheduling details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <fieldset className="rounded-2xl border border-border bg-surface p-6">
        <legend className="px-2 text-sm font-semibold text-foreground">
          1. Select Test or Package
        </legend>
        <div className="relative mt-3">
          <input
            type="text"
            value={query}
            onChange={(e) => runSearch(e.target.value)}
            placeholder="Search tests or packages to add…"
            className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-primary"
          />
          {query.length >= 2 ? (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg">
              {searching ? (
                <p className="p-3 text-sm text-muted">Searching…</p>
              ) : results.tests.length === 0 && results.packages.length === 0 ? (
                <p className="p-3 text-sm text-muted">No matches found.</p>
              ) : (
                <ul className="max-h-64 overflow-auto py-1">
                  {results.tests.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => addItem({ id: t.id, kind: "test", name: t.name, price: t.price })}
                        className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-brand-primary/5"
                      >
                        <span>{t.name} <span className="text-xs text-muted">(Test)</span></span>
                        <span className="font-medium">{formatINR(t.price)}</span>
                      </button>
                    </li>
                  ))}
                  {results.packages.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => addItem({ id: p.id, kind: "package", name: p.name, price: p.price })}
                        className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-brand-primary/5"
                      >
                        <span>{p.name} <span className="text-xs text-muted">(Package)</span></span>
                        <span className="font-medium">{formatINR(p.price)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </div>

        {items.length > 0 ? (
          <ul className="mt-4 divide-y divide-border">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2 text-sm">
                <span>{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{formatINR(item.price)}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-danger hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">No tests or packages selected yet.</p>
        )}
      </fieldset>

      <fieldset className="rounded-2xl border border-border bg-surface p-6">
        <legend className="px-2 text-sm font-semibold text-foreground">2. Sample Collection</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label
            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
              type === "CENTER_VISIT" ? "border-brand-primary bg-brand-primary/5" : "border-border"
            }`}
          >
            <input
              type="radio"
              name="type"
              checked={type === "CENTER_VISIT"}
              onChange={() => setType("CENTER_VISIT")}
            />
            Visit Diagnostic Centre
          </label>
          <label
            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
              type === "HOME_COLLECTION" ? "border-brand-primary bg-brand-primary/5" : "border-border"
            }`}
          >
            <input
              type="radio"
              name="type"
              checked={type === "HOME_COLLECTION"}
              onChange={() => setType("HOME_COLLECTION")}
            />
            Home Sample Collection
          </label>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-border bg-surface p-6">
        <legend className="px-2 text-sm font-semibold text-foreground">3. Patient Information</legend>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Mobile Number" required>
            <input
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              className={inputCls}
            />
          </Field>
          <Field label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Age">
            <input type="number" min={0} max={120} value={age} onChange={(e) => setAge(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Gender">
            <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </Field>
          <Field label="Pincode">
            <input value={pincode} onChange={(e) => setPincode(e.target.value)} maxLength={6} className={inputCls} />
          </Field>
          <Field label="Address" full>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} className={inputCls} />
          </Field>
        </div>
      </fieldset>

      {type === "HOME_COLLECTION" ? (
        <fieldset className="rounded-2xl border border-border bg-surface p-6">
          <legend className="px-2 text-sm font-semibold text-foreground">Home Collection Details</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Landmark">
              <input value={landmark} onChange={(e) => setLandmark(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Special Instructions">
              <input value={instructions} onChange={(e) => setInstructions(e.target.value)} className={inputCls} />
            </Field>
          </div>
          <p className="mt-2 text-xs text-muted">
            We use the address and pincode entered in Patient Information above for collection.
          </p>
        </fieldset>
      ) : null}

      <fieldset className="rounded-2xl border border-border bg-surface p-6">
        <legend className="px-2 text-sm font-semibold text-foreground">4–6. Date, Time &amp; Coupon</legend>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <Field label="Preferred Date" required>
            <input
              type="date"
              required
              min={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Preferred Time" required>
            <input type="time" required value={slot} onChange={(e) => setSlot(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Coupon Code">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className={inputCls}
            />
          </Field>
        </div>
      </fieldset>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold text-foreground">{formatINR(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-muted">
          Final amount, applicable discounts, and payment options will be confirmed by our team
          after booking.
        </p>
        {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
        <Button type="submit" disabled={submitting} className="mt-4 w-full">
          {submitting ? "Booking…" : "7–8. Confirm Booking"}
        </Button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-primary";

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block font-medium text-foreground">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
