import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import IconBadge from "@/components/ui/IconBadge";
import { getSpecialtyIcon } from "@/components/ui/icon-map";
import {
  POLYCLINIC_SPECIALTIES,
  POLYCLINIC_TO_DOCTOR_SPECIALTY,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Polyclinic",
  description:
    "4M Diagnostics Polyclinic in Narendrapur offers multi-specialty consultations — general medicine, pediatrics, cardiology, orthopedics, gynecology and more.",
  alternates: { canonical: "/polyclinic" },
};

export default function PolyclinicPage() {
  return (
    <>
      <PageHero
        eyebrow="Polyclinic"
        title="Multi-specialty consultations under one roof"
        subtitle="Browse available specialties and view doctors for each department."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POLYCLINIC_SPECIALTIES.map((specialty, index) => {
              const doctorSpecialty = POLYCLINIC_TO_DOCTOR_SPECIALTY[specialty];
              const Icon = getSpecialtyIcon(doctorSpecialty);
              const tone = index % 3 === 0 ? "blue" : index % 3 === 1 ? "red" : "amber";
              return (
                <Link
                  key={specialty}
                  href={`/doctors?specialty=${encodeURIComponent(doctorSpecialty)}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
                >
                  <IconBadge icon={Icon} tone={tone} size="md" />
                  <span className="flex-1 font-semibold text-slate-900">
                    {specialty}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
