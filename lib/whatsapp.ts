import { BUSINESS } from "./constants";

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export function openWhatsApp(message: string) {
  const url = buildWhatsAppUrl(message);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
}

export interface DoctorAppointmentDetails {
  doctorName: string;
  specialty: string;
  patientName: string;
  age: string;
  gender: string;
  mobile?: string;
  date: string;
  time: string;
  reason: string;
}

export function buildDoctorAppointmentMessage(
  details: DoctorAppointmentDetails
) {
  const {
    doctorName,
    specialty,
    patientName,
    age,
    gender,
    mobile,
    date,
    time,
    reason,
  } = details;

  return `Hello 4M Diagnostics,

I would like to book a doctor appointment.

Doctor: ${doctorName}
Specialty: ${specialty}

Patient Name: ${patientName}
Age: ${age}
Gender: ${gender}${mobile ? `\nMobile: ${mobile}` : ""}

Preferred Date: ${date}
Preferred Time: ${time}

Reason for Consultation:
${reason || "Not specified"}

Please confirm the doctor's availability and appointment time.

Thank you.`;
}

export interface TestBookingDetails {
  testName: string;
  patientName: string;
  age: string;
  gender: string;
  date: string;
  homeCollection: string;
}

export function buildTestBookingMessage(details: TestBookingDetails) {
  const { testName, patientName, age, gender, date, homeCollection } =
    details;

  return `Hello 4M Diagnostics,

I want to book a diagnostic test.

Test:
${testName}

Patient Name:
${patientName}

Age:
${age}

Gender:
${gender}

Preferred Date:
${date}

Home Sample Collection:
${homeCollection}

Please confirm availability and price.

Thank you.`;
}

export interface HomeCollectionDetails {
  patientName: string;
  age: string;
  gender: string;
  address: string;
  pincode: string;
  testRequired: string;
  date: string;
  time: string;
}

export function buildHomeCollectionMessage(details: HomeCollectionDetails) {
  const { patientName, age, gender, address, pincode, testRequired, date, time } =
    details;

  return `Hello 4M Diagnostics,

I would like to request home sample collection.

Patient Name: ${patientName || "Not specified"}
Age: ${age || "Not specified"}
Gender: ${gender || "Not specified"}
Address: ${address || "Not specified"}
Pincode: ${pincode || "Not specified"}
Test Required: ${testRequired || "Not specified"}
Preferred Date: ${date || "Not specified"}
Preferred Time: ${time || "Not specified"}

Please confirm availability and charges.

Thank you.`;
}

export function buildHealthPackageEnquiryMessage(packageName: string) {
  return `Hello 4M Diagnostics,

I would like to enquire about the "${packageName}" health package.

Please share the package details, tests included and pricing.

Thank you.`;
}

export function buildGeneralEnquiryMessage(topic: string) {
  return `Hello 4M Diagnostics,

I would like to enquire about ${topic}.

Please share more details.

Thank you.`;
}

export { buildWhatsAppUrl };
