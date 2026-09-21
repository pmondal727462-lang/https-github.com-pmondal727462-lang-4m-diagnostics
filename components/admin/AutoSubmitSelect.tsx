"use client";

export function AutoSubmitSelect({
  action,
  name,
  value,
  options,
}: {
  action: (formData: FormData) => void;
  name: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <form action={action}>
      <select
        name={name}
        defaultValue={value}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border border-border px-2 py-1 text-xs"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  );
}
