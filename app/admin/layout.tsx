import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | 4M Diagnostics Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
