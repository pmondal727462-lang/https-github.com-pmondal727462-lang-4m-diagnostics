import { prisma } from "../../../../lib/prisma";
import { updateWebsiteSetting } from "../../../../lib/actions/settings";

const LABELS: Record<string, string> = {
  business_name: "Business Name",
  business_category: "Business Category",
  address: "Address",
  phone: "Phone Number",
  google_maps_url: "Google Maps URL",
};

export default async function AdminSettingsPage() {
  const settings = await prisma.websiteSetting.findMany({ orderBy: { key: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Settings</h1>
      <p className="text-sm text-muted">Business details used across the website.</p>

      <div className="mt-6 space-y-4">
        {settings.map((setting) => (
          <form
            key={setting.id}
            action={updateWebsiteSetting.bind(null, setting.key)}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">
                {LABELS[setting.key] ?? setting.key}
              </span>
              <textarea
                name="value"
                defaultValue={setting.value}
                rows={setting.value.length > 80 ? 3 : 1}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            </label>
            <button type="submit" className="mt-3 rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-primary-dark">
              Save
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
