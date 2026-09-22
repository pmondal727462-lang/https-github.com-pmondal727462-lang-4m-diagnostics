import Link from "next/link";
import { Calendar, GraduationCap } from "lucide-react";
import type { Doctor } from "@/lib/types";
import { getScheduleLines } from "@/lib/doctors";
import { getSpecialtyIcon } from "@/components/ui/icon-map";
import IconBadge from "@/components/ui/IconBadge";
import AppointmentModal from "@/components/doctors/AppointmentModal";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const Icon = getSpecialtyIcon(doctor.specialty);
  const scheduleLines = getScheduleLines(doctor);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
      <div className="flex items-start gap-3">
        <IconBadge icon={Icon} tone="blue" size="md" />
        <div className="min-w-0">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="block truncate text-base font-bold text-slate-900 hover:text-blue-700"
          >
            {doctor.name}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
            {doctor.specialty}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
        <span className="line-clamp-2">{doctor.qualification}</span>
      </div>

      {doctor.affiliation ? (
        <p className="mt-1 truncate text-xs text-slate-500">{doctor.affiliation}</p>
      ) : null}

      <div className="mt-4 flex-1 rounded-xl bg-slate-50 p-3">
        <div className="flex items-start gap-2">
          <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <div className="text-sm text-slate-700">
            {scheduleLines.length > 0 ? (
              <div className="flex flex-col gap-0.5">
                {scheduleLines.map((line) => (
                  <span key={line} className="font-medium">
                    {line}
                  </span>
                ))}
                {doctor.byAppointment ? (
                  <span className="mt-1 inline-flex w-fit items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-600/20">
                    By Appointment
                  </span>
                ) : null}
              </div>
            ) : (
              <span className="font-semibold text-amber-700">By Appointment</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <AppointmentModal doctor={doctor} />
      </div>
    </div>
  );
}
