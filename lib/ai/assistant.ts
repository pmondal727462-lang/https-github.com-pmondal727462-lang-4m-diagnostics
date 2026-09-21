import { prisma } from "../prisma";
import { BUSINESS } from "../constants";

export const AI_DISCLAIMER =
  "4M AI provides general educational information and does not provide medical diagnosis or treatment.";

const DIAGNOSIS_PATTERNS = [
  /do i have/i,
  /am i (diabetic|pregnant|anemic|positive|negative)/i,
  /is this (cancer|serious|dangerous)/i,
  /\bdiagnos(e|es|is|ed|ing)\b/i,
  /what('?s| is) wrong with me/i,
  /should i stop (my |taking )?medicine/i,
  /prescri/i,
  /what medicine/i,
  /interpret my (result|report)/i,
];

const DIAGNOSIS_RESPONSE =
  "I can't diagnose a medical condition or interpret individual results. I can explain general information about tests available at 4M Diagnostics and help you find or book them. For diagnosis or interpreting your report, please consult a qualified healthcare professional.";

function matchesAny(patterns: RegExp[], text: string) {
  return patterns.some((p) => p.test(text));
}

export interface AssistantReply {
  reply: string;
  isSafetyRefusal: boolean;
}

export async function answerQuestion(message: string): Promise<AssistantReply> {
  const text = message.trim();
  const lower = text.toLowerCase();

  if (matchesAny(DIAGNOSIS_PATTERNS, lower)) {
    return { reply: DIAGNOSIS_RESPONSE, isSafetyRefusal: true };
  }

  if (/(where|address|location|located|direction)/.test(lower)) {
    return {
      reply: `4M Diagnostics is located at ${BUSINESS.addressLines.join(", ")}. Open in Google Maps: ${BUSINESS.googleMapsUrl}`,
      isSafetyRefusal: false,
    };
  }

  if (/(contact|phone|call|number)/.test(lower)) {
    return {
      reply: `You can reach 4M Diagnostics at ${BUSINESS.phone}, or message us on WhatsApp from the Contact page.`,
      isSafetyRefusal: false,
    };
  }

  if (/(book|appointment|schedule)/.test(lower) && /(test|package|sample)/.test(lower)) {
    return {
      reply:
        "You can book a test or package online: search for it on the Tests & Packages page, then choose 'Book Now', or start directly from the Book a Test page. You'll be asked for the test/package, patient details, a preferred date and time, and any coupon code.",
      isSafetyRefusal: false,
    };
  }

  if (/home.*(collect|sample)/.test(lower)) {
    return {
      reply:
        "Yes — you can request home sample collection from the Home Sample Collection page. Provide your address, pincode, and preferred date/time, and our team will confirm the visit.",
      isSafetyRefusal: false,
    };
  }

  if (/(report|download)/.test(lower)) {
    return {
      reply:
        "You can access your reports securely from the Reports page. Enter your mobile number, verify the OTP sent to you, and your reports will be listed there for viewing and download.",
      isSafetyRefusal: false,
    };
  }

  if (/(hour|open|timing|close)/.test(lower)) {
    return {
      reply: `For current opening hours, please call us at ${BUSINESS.phone} or check the Contact page.`,
      isSafetyRefusal: false,
    };
  }

  if (/fast/.test(lower)) {
    return {
      reply:
        "Fasting requirements vary by test. Search for the specific test on the Tests page — its detail page shows whether fasting is required and for how long.",
      isSafetyRefusal: false,
    };
  }

  const knowledgeMatch = await searchKnowledgeBase(lower);
  if (knowledgeMatch) return { reply: knowledgeMatch, isSafetyRefusal: false };

  return {
    reply:
      "I don't have specific information about that yet. You can browse Tests & Packages, or contact 4M Diagnostics directly for help.",
    isSafetyRefusal: false,
  };
}

async function searchKnowledgeBase(lowerQuery: string): Promise<string | null> {
  const words = lowerQuery.split(/\s+/).filter((w) => w.length > 3);
  if (words.length === 0) return null;

  const [knowledge, faqs, tests] = await Promise.all([
    prisma.aIKnowledge.findMany({ where: { isActive: true }, take: 50 }),
    prisma.fAQ.findMany({ where: { isActive: true }, take: 50 }),
    prisma.test.findMany({ where: { isActive: true }, take: 100, select: { name: true, description: true, slug: true } }),
  ]);

  for (const item of knowledge) {
    if (words.some((w) => item.title.toLowerCase().includes(w) || item.content.toLowerCase().includes(w))) {
      return item.content;
    }
  }

  for (const faq of faqs) {
    if (words.some((w) => faq.question.toLowerCase().includes(w))) {
      return faq.answer;
    }
  }

  for (const test of tests) {
    if (words.some((w) => test.name.toLowerCase().includes(w))) {
      return `${test.name}: ${test.description ?? "See the test detail page for preparation, sample type, and pricing."} View it at /tests/${test.slug}.`;
    }
  }

  return null;
}
