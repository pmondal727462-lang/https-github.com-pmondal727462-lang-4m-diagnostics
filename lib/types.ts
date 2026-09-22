export interface Doctor {
  slug: string;
  name: string;
  /** Primary specialty label shown on the card */
  specialty: string;
  /** All specialty categories this doctor matches for filtering (usually one) */
  specialties: string[];
  qualification: string;
  role?: string;
  specialization?: string;
  affiliation?: string;
  additional?: string;
  /** Primary day(s) of consultation, e.g. "Thursday", "Every Day" */
  day?: string;
  /** Primary time of consultation, e.g. "5:00 PM" */
  time?: string;
  /** Extra freeform schedule lines for doctors with multiple slots/notes */
  scheduleNotes?: string[];
  /** True when the doctor has no fixed slot and must be booked "By Appointment" */
  byAppointment: boolean;
}

export interface BloodTest {
  name: string;
  category: string;
  description: string;
}

export interface HealthPackage {
  name: string;
  slug: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
