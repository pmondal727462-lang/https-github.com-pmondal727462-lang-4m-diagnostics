import type { Doctor } from "./types";

export const SPECIALTY_FILTERS = [
  "All",
  "General Physician",
  "Pediatrician",
  "Urologist",
  "Nephrologist",
  "Neurologist",
  "Psychiatrist",
  "Dermatologist",
  "Endocrinologist",
  "Diabetologist",
  "ENT",
  "Ayurveda",
  "Orthopedic",
  "Pulmonologist",
  "Gynecologist",
  "General Surgeon",
  "Cardiologist",
  "Physical Medicine",
  "Physiotherapist",
  "Dietician",
] as const;

export type SpecialtyFilter = (typeof SPECIALTY_FILTERS)[number];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type DoctorInput = Omit<Doctor, "slug" | "specialties"> & {
  specialties?: string[];
};

function d(input: DoctorInput): Doctor {
  return {
    ...input,
    slug: slugify(input.name),
    specialties: input.specialties ?? [input.specialty],
  };
}

export const DOCTORS: Doctor[] = [
  d({
    name: "Dr. Sumeet Mazumder",
    specialty: "General Physician",
    qualification: "MBBS, DMCW, MD",
    affiliation: "Udaynarayanpur State General Hospital",
    day: "Monday, Thursday & Saturday",
    byAppointment: true,
  }),
  d({
    name: "Dr. Anirudha Saha",
    specialty: "General Physician",
    qualification: "MBBS, MD",
    day: "Monday, Wednesday, Friday & Saturday",
    byAppointment: true,
  }),
  d({
    name: "Dr. J. C. Das",
    specialty: "General Physician",
    specialties: ["General Physician", "Diabetologist"],
    qualification:
      "MBBS, MD, ACCG (Gastro), FID, CCDM (Diabetes), CCDPM (Obesity), CCEPIFD (Nutrition)",
    specialization: "Diabetes, Medicine & Gastroenterology",
    scheduleNotes: [
      "Morning: 9:00 AM - 1:00 PM",
      "Evening: 5:00 PM - 8:00 PM",
      "Saturday: Morning Off",
    ],
    byAppointment: false,
  }),
  d({
    name: "Dr. Amalesh Basak",
    specialty: "Physical Medicine",
    qualification: "MBBS, MD (PMR)",
    role: "Consultant Physician",
    affiliation: "SSKM / PG Hospital",
    byAppointment: true,
  }),
  d({
    name: "Dr. Sayani Halder",
    specialty: "Physical Medicine",
    qualification: "MBBS (WBHS), MD (Physical & Rehabilitation)",
    byAppointment: true,
  }),
  d({
    name: "Dr. Parichaya Bera",
    specialty: "Pediatrician",
    qualification: "MBBS, DCH, DNB (Pediatrics)",
    specialization: "Newborn & Child Specialist",
    affiliation: "Ruby General Hospital",
    scheduleNotes: ["Monday - Saturday: Evening", "Sunday: Morning"],
    byAppointment: false,
  }),
  d({
    name: "Dr. Abanti Bagchi",
    specialty: "Pediatrician",
    qualification: "MBBS, DCH (Pediatrics)",
    day: "Monday, Tuesday & Thursday",
    time: "11:00 AM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Shibshankar Barman",
    specialty: "Pediatrician",
    qualification: "MBBS, MS (General Surgery), M.Ch (Pediatric & Neonatal Surgery)",
    role: "Consultant General Surgeon",
    scheduleNotes: ["Evening"],
    byAppointment: true,
  }),
  d({
    name: "Dr. Ankika Basu",
    specialty: "Pediatrician",
    qualification: "MBBS (Hons), MD, DNB Pediatrics",
    role: "Assistant Professor Pediatrics at JIMSH",
    day: "Wednesday & Friday",
    time: "6:00 PM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Sujoy Basak",
    specialty: "Urologist",
    qualification: "MBBS, MS, DNB (Urology)",
    affiliation: "Ruby General Hospital",
    day: "Wednesday",
    byAppointment: true,
  }),
  d({
    name: "Dr. Avisek Dutta",
    specialty: "Urologist",
    qualification: "MBBS, MS (General Surgery), MRCS (England), MCh (Urology), Gold Medalist",
    role: "Consultant Urologist, Uro Oncologist, Laparoscopic & Endoscopic Surgeon, Renal Transplant Surgeon",
    affiliation: "AMRI Hospital",
    day: "Saturday & Monday",
    byAppointment: true,
  }),
  d({
    name: "Dr. Avisek Maity",
    specialty: "Nephrologist",
    qualification:
      "MBBS (Hons), MD (Med), DNB (Nephrology), Chartered Associate Professor of Nephrology",
    affiliation: "NRS Medical College & Hospital, Kolkata",
    day: "Every Month - 2nd & 4th Friday",
    byAppointment: true,
  }),
  d({
    name: "Dr. Joydeep Biswas",
    specialty: "Neurologist",
    qualification: "MBBS, DNB (General Medicine), DRNB Neurology",
    role: "Consultant Neurologist",
    affiliation: "Ruby / AMRI / Dishan Hospital",
    day: "Monday, Thursday & Saturday",
    byAppointment: true,
  }),
  d({
    name: "Dr. Rajan Kumar",
    specialty: "Neurologist",
    qualification: "MBBS, MS, MCh (Neurosurgery)",
    affiliation: "AMRI Hospital",
    day: "Every Day",
    byAppointment: true,
  }),
  d({
    name: "Dr. Piyali Pathak Ghosh",
    specialty: "Psychiatrist",
    qualification: "MBBS, MD (Psychiatry)",
    affiliation: "NRS Hospital",
    day: "Tuesday",
    byAppointment: true,
  }),
  d({
    name: "Dr. Anupam Das",
    specialty: "Dermatologist",
    qualification: "MD Dermatology (Gold Medalist)",
    role: "Associate Professor",
    affiliation: "KPC MCH",
    day: "Thursday",
    time: "6:00 PM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Sudip Mondal",
    specialty: "Dermatologist",
    qualification: "MBBS, MD",
    role: "Consultant Dermatologist and Cosmetologist",
    day: "Wednesday",
    time: "7:00 PM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Mounam Chattopadhyay",
    specialty: "Endocrinologist",
    specialties: ["Endocrinologist", "Diabetologist"],
    qualification:
      "MBBS (Hons), MD Internal Medicine (Gold Medalist), MRCP, DM Endocrinology",
    role: "Consultant Endocrinologist & Diabetologist",
    affiliation: "Calcutta Medical College",
    day: "Every Friday",
    time: "6:00 PM - 6:30 PM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Satadal Mondal",
    specialty: "ENT",
    qualification: "MBBS, MS (ENT)",
    role: "Associate Professor of IPGMER, SSKM Hospital",
    scheduleNotes: ["Monday: 6:00 PM", "Friday: 5:00 PM"],
    byAppointment: false,
  }),
  d({
    name: "Dr. Sanjula Kumari",
    specialty: "Ayurveda",
    qualification: "M.D. Ayurveda (AKU)",
    specialization: "Nadi Parikshak",
    byAppointment: true,
  }),
  d({
    name: "Dr. Kanchan Maitra",
    specialty: "Orthopedic",
    qualification: "MBBS, MS (Orthopaedics)",
    role: "Consultant Orthopaedic Surgeon",
    day: "Tuesday - Saturday",
    time: "11:00 AM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Debjyoti Mukherjee",
    specialty: "Orthopedic",
    qualification: "MBBS, MS, Orthopedic Surgeon",
    affiliation: "R.G. Kar Medical College & Hospital",
    day: "Tuesday & Wednesday",
    time: "2:30 PM - 3:00 PM",
    byAppointment: false,
  }),
  d({
    name: "Dr. B. K. Saha",
    specialty: "Orthopedic",
    qualification: "MBBS, MS, Orthopedic Surgeon",
    affiliation: "AMRI Hospital",
    day: "Friday",
    time: "5:00 PM",
    byAppointment: false,
  }),
  d({
    name: "Dr. T. K. Mahajon",
    specialty: "Orthopedic",
    qualification: "MBBS, D Ortho, Orthopedic Surgeon",
    day: "Monday & Thursday",
    byAppointment: true,
  }),
  d({
    name: "Dr. Arijit Das",
    specialty: "Orthopedic",
    qualification: "MBBS, D Ortho, DNB (Ortho), MNAMS",
    role: "Consultant Orthopedic Surgeon",
    day: "Sunday",
    byAppointment: true,
  }),
  d({
    name: "Dr. Dibyendu Saha",
    specialty: "Pulmonologist",
    qualification: "MBBS, MD (Pulmonary Medicine)",
    specialization: "Chest Specialist",
    byAppointment: true,
  }),
  d({
    name: "Dr. Archisman Bhattacharjee",
    specialty: "Pulmonologist",
    qualification: "MBBS (Hons), MD Chest Medicine",
    specialization:
      "Pulmonologist, Allergologist, Sleep Management & Medicine Specialist",
    day: "Monday",
    time: "Morning & Evening",
    byAppointment: true,
  }),
  d({
    name: "Dr. Seema Surana Sarowgi",
    specialty: "Gynecologist",
    qualification: "MBBS, DGO, MS (Gynecology & Obstetrics), MRCOG (London)",
    day: "Every Day",
    byAppointment: true,
  }),
  d({
    name: "Dr. Monika Kumari",
    specialty: "Gynecologist",
    qualification: "MBBS, MS, DNB, MRCOG",
    role: "GYNO & Chief IVF Consultant",
    day: "Every Day",
    byAppointment: true,
  }),
  d({
    name: "Dr. Papia Biswas",
    specialty: "Gynecologist",
    qualification: "MBBS (Cal), MS (Gynecology & Obstetrics)",
    specialization: "Laparoscopic Surgeon & Infertility Specialist",
    day: "Thursday",
    time: "4:00 PM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Anusree Aich Bhattacharjee",
    specialty: "Gynecologist",
    qualification: "MS (Gynaecology & Obstetrics), DNB (Gynae & Obs)",
    affiliation: "New Delhi",
    time: "Evening",
    byAppointment: true,
  }),
  d({
    name: "Dr. Rupsha Chowdhury",
    specialty: "Gynecologist",
    qualification: "MBBS, MS (G&O), DNB (G&O)",
    byAppointment: true,
  }),
  d({
    name: "Dr. Priya Singh",
    specialty: "Gynecologist",
    qualification: "MBBS (Hons), MS, DNB",
    specialization:
      "Obstetrics & Gynaecology Sonologist, High Risk Pregnancy & Infertility",
    day: "Evening",
    time: "5:00 PM - 6:00 PM",
    byAppointment: true,
  }),
  d({
    name: "Dr. Supriyo Halder",
    specialty: "Gynecologist",
    qualification: "MBBS, MS (Gynae & Obs), FMAS",
    role: "Consultant Gynaecologist & Obstetrics",
    specialization: "Laparoscopic Surgery",
    day: "Friday",
    byAppointment: true,
  }),
  d({
    name: "Dr. Gourav Priyadarshan",
    specialty: "General Surgeon",
    qualification: "MBBS (Hons), DNB (General Surgery), FMAS, FICRS",
    specialization: "General Laparoscopic & Robotic Surgeon, Laser Proctologist",
    day: "Every Day",
    byAppointment: true,
  }),
  d({
    name: "Dr. Indrani Debnath",
    specialty: "General Surgeon",
    qualification: "MBBS (WBUHS), MS (General Surgery)",
    role: "General Physician, General & Laparoscopic Surgeon",
    byAppointment: true,
  }),
  d({
    name: "Dr. Subhashis Chakraborty",
    specialty: "Cardiologist",
    qualification: "MBBS, MD (Medicine), DM (Cardiology), DTCD, CBET (USG), (WBUHS)",
    role: "Cardiologist & Physician",
    affiliation: "NRS Hospital",
    day: "Thursday",
    time: "5:00 PM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Lina Mukherjee",
    specialty: "Cardiologist",
    qualification: "MBBS (Cal), MD (Medicine), DM (Cardiology)",
    role: "Consultant Cardiologist",
    affiliation: "R.G. Kar Medical College & Hospital",
    day: "Saturday",
    time: "9:00 AM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Pulak Ghosh Dastidar",
    specialty: "Cardiologist",
    qualification: "MBBS, PGDCC",
    day: "Every Tuesday",
    time: "5:00 PM",
    byAppointment: false,
  }),
  d({
    name: "Dr. Abir Pal",
    specialty: "Cardiologist",
    qualification: "MBBS, FCCS SCCM",
    additional: "PG Diploma Cardiology, MSC Diabetes",
    byAppointment: true,
  }),
  d({
    name: "Kalyan Dey",
    specialty: "Physiotherapist",
    role: "Consultant Physiotherapist & Yoga Teacher",
    qualification:
      "B.Sc., BPT (WBUHS), BMCP (JCU-JU), MPT (Sports), MA (Yoga), DFSM (Fitness & Sports Management)",
    day: "Every Day",
    time: "8:30 AM",
    scheduleNotes: ["Sunday: Not Available"],
    byAppointment: true,
  }),
  d({
    name: "Dt. Nirmal Jana",
    specialty: "Dietician",
    role: "Clinical Nutritionist & Dietitian",
    qualification: "M.Sc (CND), V.U (W.B), B.Sc (Nutrition Hons), V.U (W.B)",
    additional: "Diploma in Epidemiology & Public Health, Certified Diabetes Educator",
    affiliation: "IQ City Medical College Hospital",
    day: "Monday - Saturday",
    byAppointment: true,
  }),
];

export function getScheduleLines(doctor: Doctor): string[] {
  const lines: string[] = [];
  if (doctor.day) lines.push(doctor.day);
  if (doctor.time) lines.push(doctor.time);
  if (doctor.scheduleNotes) lines.push(...doctor.scheduleNotes);
  return lines;
}

export function getScheduleSummary(doctor: Doctor): string {
  const lines = getScheduleLines(doctor);
  if (lines.length === 0) return "By Appointment";
  const joined =
    doctor.day && doctor.time ? `${doctor.day} - ${doctor.time}` : lines.join(" · ");
  return doctor.byAppointment ? `${joined} (By Appointment)` : joined;
}

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find((doc) => doc.slug === slug);
}

export function getAllDoctorSlugs(): string[] {
  return DOCTORS.map((doc) => doc.slug);
}

export function filterDoctorsBySpecialty(specialty: string): Doctor[] {
  if (specialty === "All") return DOCTORS;
  return DOCTORS.filter((doc) => doc.specialties.includes(specialty));
}

function doctorSearchHaystack(doc: Doctor): string {
  return [
    doc.name,
    doc.specialties.join(" "),
    doc.qualification,
    doc.role,
    doc.specialization,
    doc.affiliation,
    doc.day,
    doc.time,
    doc.scheduleNotes?.join(" "),
    doc.byAppointment ? "By Appointment" : "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function searchDoctors(query: string, specialty: string = "All"): Doctor[] {
  const base = filterDoctorsBySpecialty(specialty);
  const q = query.trim().toLowerCase();
  if (!q) return base;
  return base.filter((doc) => doctorSearchHaystack(doc).includes(q));
}
