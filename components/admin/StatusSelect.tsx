"use client";

export function StatusSelect({
  action,
  value,
  options,
}: {
  action: (formData: FormData) => void;
  value: string;
  options: readonly string[];
}) {
  return (
    <form action={action}>
      <select
        name="status"
        defaultValue={value}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border border-border px-2 py-1 text-xs"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </form>
  );
}
