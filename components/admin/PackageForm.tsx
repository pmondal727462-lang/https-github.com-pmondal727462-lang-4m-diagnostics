import type { Package, PackageTest, Test } from "../../generated/prisma/client";

const inputCls = "w-full rounded-lg border border-border px-3 py-2 text-sm";

const CATEGORIES = [
  "GENERAL_HEALTH",
  "DIABETES",
  "THYROID",
  "WOMENS_HEALTH",
  "MENS_HEALTH",
  "SENIOR_CITIZEN",
  "HEART_HEALTH",
  "KIDNEY_HEALTH",
  "LIVER_HEALTH",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  GENERAL_HEALTH: "General Health",
  DIABETES: "Diabetes",
  THYROID: "Thyroid",
  WOMENS_HEALTH: "Women's Health",
  MENS_HEALTH: "Men's Health",
  SENIOR_CITIZEN: "Senior Citizen",
  HEART_HEALTH: "Heart Health",
  KIDNEY_HEALTH: "Kidney Health",
  LIVER_HEALTH: "Liver Health",
};

export function PackageForm({
  action,
  tests,
  pkg,
}: {
  action: (formData: FormData) => void;
  tests: Test[];
  pkg?: Package & { tests: (PackageTest & { test: Test })[] };
}) {
  const selectedTestIds = new Set(pkg?.tests.map((t) => t.testId));

  return (
    <form action={action} className="space-y-6 rounded-2xl border border-border bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Package Name" required>
          <input name="name" defaultValue={pkg?.name} required className={inputCls} />
        </Field>
        <Field label="Category" required>
          <select name="category" defaultValue={pkg?.category} required className={inputCls}>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Regular Price (INR)" required>
          <input name="regularPrice" type="number" step="0.01" min={0} defaultValue={pkg ? Number(pkg.regularPrice) : undefined} required className={inputCls} />
        </Field>
        <Field label="Offer Price (INR)">
          <input name="offerPrice" type="number" step="0.01" min={0} defaultValue={pkg?.offerPrice ? Number(pkg.offerPrice) : undefined} className={inputCls} />
        </Field>
        <Field label="Description" full>
          <textarea name="description" rows={3} defaultValue={pkg?.description ?? ""} className={inputCls} />
        </Field>
        <Field label="Preparation" full>
          <textarea name="preparation" rows={2} defaultValue={pkg?.preparation ?? ""} className={inputCls} />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="homeCollectionAvailable" defaultChecked={pkg?.homeCollectionAvailable ?? true} /> Home Collection Available
      </label>

      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Tests Included *</p>
        {tests.length === 0 ? (
          <p className="text-sm text-muted">No active tests yet. Add tests first.</p>
        ) : (
          <div className="grid max-h-64 gap-2 overflow-y-auto rounded-lg border border-border p-3 sm:grid-cols-2">
            {tests.map((t) => (
              <label key={t.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="testIds" value={t.id} defaultChecked={selectedTestIds.has(t.id)} />
                {t.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-dark">
        {pkg ? "Save Changes" : "Create Package"}
      </button>
    </form>
  );
}

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
