import {
  Activity,
  Apple,
  Baby,
  Bone,
  Brain,
  Building2,
  Droplets,
  Dumbbell,
  Ear,
  FlaskConical,
  Heart,
  HeartPulse,
  Home,
  Leaf,
  MessageCircle,
  Scissors,
  Sparkles,
  Stethoscope,
  Syringe,
  Wind,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  droplet: Droplets,
  flask: FlaskConical,
  "heart-pulse": HeartPulse,
  home: Home,
  "building-2": Building2,
  stethoscope: Stethoscope,
  "message-circle": MessageCircle,
};

export const SPECIALTY_ICONS: Record<string, LucideIcon> = {
  "General Physician": Stethoscope,
  Pediatrician: Baby,
  Urologist: Droplets,
  Nephrologist: Activity,
  Neurologist: Brain,
  Psychiatrist: Brain,
  Dermatologist: Sparkles,
  Endocrinologist: Activity,
  Diabetologist: Syringe,
  ENT: Ear,
  Ayurveda: Leaf,
  Orthopedic: Bone,
  Pulmonologist: Wind,
  Gynecologist: HeartPulse,
  "General Surgeon": Scissors,
  Cardiologist: Heart,
  "Physical Medicine": Activity,
  Physiotherapist: Dumbbell,
  Dietician: Apple,
};

export function getServiceIcon(key: string): LucideIcon {
  return SERVICE_ICONS[key] ?? Stethoscope;
}

export function getSpecialtyIcon(specialty: string): LucideIcon {
  return SPECIALTY_ICONS[specialty] ?? Stethoscope;
}
