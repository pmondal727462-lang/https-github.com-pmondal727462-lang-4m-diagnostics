"use client";

import { MessageCircle } from "lucide-react";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const whatsappHref = buildWhatsAppUrl(
    buildGeneralEnquiryMessage("your services")
  );

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with 4M Diagnostics on WhatsApp"
      className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 transition-transform hover:scale-105 lg:flex"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
