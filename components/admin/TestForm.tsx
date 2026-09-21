import type { Test, TestCategory } from "../../generated/prisma/client";

const inputCls = "w-full rounded-lg border border-border px-3 py-2 text-sm";

export function TestForm({
  action,
  categories,
  test,
}: {
  action: (formData: FormData) => void;
  categories: TestCategory[];
  test?: Test;
}) {
  return (
    <form action={action} className="space-y-6 rounded-2xl border border-border bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Test Name" required>
          <input name="name" defaultValue={test?.name} required className={inputCls} />
        </Field>
        <Field label="Test Code" required>
          <input name="code" defaultValue={test?.code} required className={inputCls} />
        </Field>
        <Field label="Category" required>
          <select name="categoryId" defaultValue={test?.categoryId} required className={inputCls}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sample Type">
          <input name="sampleType" defaultValue={test?.sampleType ?? ""} className={inputCls} />
        </Field>
        <Field label="Price (INR)" required>
          <input name="price" type="number" step="0.01" min={0} defaultValue={test ? Number(test.price) : undefined} required className={inputCls} />
        </Field>
        <Field label="Offer Price (INR)">
          <input name="offerPrice" type="number" step="0.01" min={0} defaultValue={test?.offerPrice ? Number(test.offerPrice) : undefined} className={inputCls} />
        </Field>
        <Field label="Fasting Duration (hours)">
          <input name="fastingDurationHours" type="number" min={0} defaultValue={test?.fastingDurationHours ?? undefined} className={inputCls} />
        </Field>
        <Field label="Report Turnaround (hours)">
          <input name="reportTimeHours" type="number" min={0} defaultValue={test?.reportTimeHours ?? undefined} className={inputCls} />
        </Field>
        <Field label="Description" full>
          <textarea name="description" rows={3} defaultValue={test?.description ?? ""} className={inputCls} />
        </Field>
        <Field label="Preparation Instructions" full>
          <textarea name="preparation" rows={2} defaultValue={test?.preparation ?? ""} className={inputCls} />
        </Field>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="fastingRequired" defaultChecked={test?.fastingRequired} /> Fasting Required
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="homeCollectionAvailable" defaultChecked={test?.homeCollectionAvailable ?? true} /> Home Collection Available
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isPopular" defaultChecked={test?.isPopular} /> Mark as Popular
        </label>
      </div>

      <button type="submit" className="rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-dark">
        {test ? "Save Changes" : "Create Test"}
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
