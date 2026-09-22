import type { ServiceItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    title: "Blood Tests",
    description: "Wide range of blood tests for diagnosis, screening and monitoring.",
    href: "/blood-tests",
    icon: "droplet",
  },
  {
    title: "Pathology Tests",
    description: "Accurate pathology testing for accurate clinical decisions.",
    href: "/tests",
    icon: "flask",
  },
  {
    title: "Health Checkups",
    description: "Curated health packages for preventive and periodic screening.",
    href: "/health-packages",
    icon: "heart-pulse",
  },
  {
    title: "Home Sample Collection",
    description: "Convenient sample collection from the comfort of your home.",
    href: "/home-sample-collection",
    icon: "home",
  },
  {
    title: "Polyclinic",
    description: "Multi-specialty consultation under one roof.",
    href: "/polyclinic",
    icon: "building-2",
  },
  {
    title: "Specialist Doctor Consultation",
    description: "Consult experienced specialist doctors across various fields.",
    href: "/doctors",
    icon: "stethoscope",
  },
];

export const QUICK_ACTIONS = [
  {
    title: "Blood Tests",
    description: "Browse and book blood tests.",
    href: "/blood-tests",
    icon: "droplet",
    tone: "blue",
  },
  {
    title: "All Diagnostic Tests",
    description: "Explore our full range of diagnostic tests.",
    href: "/tests",
    icon: "flask",
    tone: "red",
  },
  {
    title: "Health Packages",
    description: "View curated health checkup packages.",
    href: "/health-packages",
    icon: "heart-pulse",
    tone: "amber",
  },
  {
    title: "Home Sample Collection",
    description: "Book a home visit for sample collection.",
    href: "/home-sample-collection",
    icon: "home",
    tone: "navy",
  },
  {
    title: "Doctor Appointment",
    description: "Consult our specialist doctors.",
    href: "/doctors",
    icon: "stethoscope",
    tone: "blue",
  },
  {
    title: "WhatsApp Booking",
    description: "Book instantly over WhatsApp.",
    href: "https://wa.me/918100347637",
    icon: "message-circle",
    tone: "red",
  },
] as const;

export const POLYCLINIC_SPECIALTIES = [
  "General Medicine",
  "Pediatrics",
  "Urology",
  "Nephrology",
  "Neurology",
  "Psychiatry",
  "Dermatology",
  "Endocrinology",
  "Diabetology",
  "ENT",
  "Orthopedics",
  "Pulmonology",
  "Gynecology",
  "General Surgery",
  "Cardiology",
  "Physiotherapy",
  "Diet & Nutrition",
  "Ayurveda",
] as const;

/** Maps a polyclinic specialty label to the matching doctor specialty filter value */
export const POLYCLINIC_TO_DOCTOR_SPECIALTY: Record<string, string> = {
  "General Medicine": "General Physician",
  Pediatrics: "Pediatrician",
  Urology: "Urologist",
  Nephrology: "Nephrologist",
  Neurology: "Neurologist",
  Psychiatry: "Psychiatrist",
  Dermatology: "Dermatologist",
  Endocrinology: "Endocrinologist",
  Diabetology: "Diabetologist",
  ENT: "ENT",
  Orthopedics: "Orthopedic",
  Pulmonology: "Pulmonologist",
  Gynecology: "Gynecologist",
  "General Surgery": "General Surgeon",
  Cardiology: "Cardiologist",
  Physiotherapy: "Physiotherapist",
  "Diet & Nutrition": "Dietician",
  Ayurveda: "Ayurveda",
};
