import type { BloodTest } from "./types";

export const BLOOD_TEST_CATEGORIES = [
  "CBC & Hematology",
  "Diabetes",
  "Liver",
  "Kidney",
  "Thyroid",
  "Lipid Profile",
  "Iron & Anemia",
  "Vitamins",
  "Hormones",
  "Cardiac",
  "Electrolytes",
  "Infection",
  "Hepatitis",
  "Autoimmune",
  "Coagulation",
  "Allergy",
  "Fertility",
  "Women's Health",
  "Men's Health",
  "Preventive Health",
] as const;

export type BloodTestCategory = (typeof BLOOD_TEST_CATEGORIES)[number];

export const BLOOD_TESTS: BloodTest[] = [
  // CBC & Hematology
  {
    name: "Complete Blood Count (CBC)",
    category: "CBC & Hematology",
    description: "Evaluates red cells, white cells and platelets for overall blood health.",
  },
  {
    name: "Peripheral Blood Smear",
    category: "CBC & Hematology",
    description: "Microscopic examination of blood cells to detect abnormalities.",
  },
  {
    name: "ESR (Erythrocyte Sedimentation Rate)",
    category: "CBC & Hematology",
    description: "Detects inflammation in the body.",
  },
  {
    name: "Reticulocyte Count",
    category: "CBC & Hematology",
    description: "Assesses bone marrow's red blood cell production.",
  },

  // Diabetes
  {
    name: "Fasting Blood Sugar (FBS)",
    category: "Diabetes",
    description: "Measures blood glucose level after fasting.",
  },
  {
    name: "Post Prandial Blood Sugar (PPBS)",
    category: "Diabetes",
    description: "Measures blood glucose level after a meal.",
  },
  {
    name: "HbA1c (Glycated Hemoglobin)",
    category: "Diabetes",
    description: "Reflects average blood sugar levels over the past 2-3 months.",
  },
  {
    name: "Oral Glucose Tolerance Test (OGTT)",
    category: "Diabetes",
    description: "Assesses how the body processes glucose over time.",
  },
  {
    name: "Random Blood Sugar (RBS)",
    category: "Diabetes",
    description: "Checks glucose level at any time of the day.",
  },

  // Liver
  {
    name: "Liver Function Test (LFT)",
    category: "Liver",
    description: "Panel of tests to assess liver health and function.",
  },
  {
    name: "SGPT (ALT)",
    category: "Liver",
    description: "Enzyme test to detect liver damage.",
  },
  {
    name: "SGOT (AST)",
    category: "Liver",
    description: "Enzyme test associated with liver and muscle health.",
  },
  {
    name: "Bilirubin (Total & Direct)",
    category: "Liver",
    description: "Assesses liver function and detects jaundice.",
  },
  {
    name: "Serum Albumin",
    category: "Liver",
    description: "Measures protein produced by the liver.",
  },

  // Kidney
  {
    name: "Kidney Function Test (KFT)",
    category: "Kidney",
    description: "Panel to assess kidney health, including urea and creatinine.",
  },
  {
    name: "Serum Creatinine",
    category: "Kidney",
    description: "Measures kidney filtration efficiency.",
  },
  {
    name: "Blood Urea Nitrogen (BUN)",
    category: "Kidney",
    description: "Assesses kidney function and waste filtration.",
  },
  {
    name: "Uric Acid",
    category: "Kidney",
    description: "Detects gout and kidney-related conditions.",
  },
  {
    name: "Urine Routine & Microscopy",
    category: "Kidney",
    description: "Screens for urinary tract and kidney disorders.",
  },

  // Thyroid
  {
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Thyroid",
    description: "Comprehensive panel to assess thyroid gland function.",
  },
  {
    name: "TSH (Thyroid Stimulating Hormone)",
    category: "Thyroid",
    description: "Primary screening test for thyroid disorders.",
  },
  {
    name: "Free T3 & Free T4",
    category: "Thyroid",
    description: "Measures active thyroid hormone levels.",
  },
  {
    name: "Anti-TPO Antibody",
    category: "Thyroid",
    description: "Detects autoimmune thyroid conditions.",
  },

  // Lipid Profile
  {
    name: "Complete Lipid Profile",
    category: "Lipid Profile",
    description: "Measures cholesterol, triglycerides, HDL and LDL levels.",
  },
  {
    name: "Total Cholesterol",
    category: "Lipid Profile",
    description: "Assesses overall cholesterol level in the blood.",
  },
  {
    name: "HDL & LDL Cholesterol",
    category: "Lipid Profile",
    description: "Differentiates between good and bad cholesterol.",
  },
  {
    name: "Triglycerides",
    category: "Lipid Profile",
    description: "Measures fat levels linked to heart disease risk.",
  },

  // Iron & Anemia
  {
    name: "Serum Iron",
    category: "Iron & Anemia",
    description: "Measures iron levels circulating in the blood.",
  },
  {
    name: "Serum Ferritin",
    category: "Iron & Anemia",
    description: "Assesses the body's iron storage levels.",
  },
  {
    name: "TIBC (Total Iron Binding Capacity)",
    category: "Iron & Anemia",
    description: "Evaluates the blood's capacity to transport iron.",
  },
  {
    name: "Hemoglobin (Hb)",
    category: "Iron & Anemia",
    description: "Screens for anemia and oxygen-carrying capacity.",
  },

  // Vitamins
  {
    name: "Vitamin D (25-OH)",
    category: "Vitamins",
    description: "Assesses vitamin D sufficiency for bone and immune health.",
  },
  {
    name: "Vitamin B12",
    category: "Vitamins",
    description: "Checks for deficiency affecting nerves and blood cells.",
  },
  {
    name: "Folic Acid (Vitamin B9)",
    category: "Vitamins",
    description: "Important for cell growth and pregnancy health.",
  },

  // Hormones
  {
    name: "Testosterone (Total)",
    category: "Hormones",
    description: "Measures male hormone levels.",
  },
  {
    name: "Prolactin",
    category: "Hormones",
    description: "Assesses hormone linked to reproductive health.",
  },
  {
    name: "Cortisol",
    category: "Hormones",
    description: "Measures stress hormone levels.",
  },
  {
    name: "Insulin (Fasting)",
    category: "Hormones",
    description: "Assesses insulin levels related to metabolic health.",
  },

  // Cardiac
  {
    name: "Troponin-I",
    category: "Cardiac",
    description: "Detects heart muscle injury, used in cardiac emergencies.",
  },
  {
    name: "CPK-MB",
    category: "Cardiac",
    description: "Enzyme test to assess heart muscle damage.",
  },
  {
    name: "NT-proBNP",
    category: "Cardiac",
    description: "Helps evaluate heart failure and cardiac stress.",
  },
  {
    name: "CRP (C-Reactive Protein)",
    category: "Cardiac",
    description: "Measures inflammation linked to cardiovascular risk.",
  },

  // Electrolytes
  {
    name: "Serum Electrolytes (Na, K, Cl)",
    category: "Electrolytes",
    description: "Assesses sodium, potassium and chloride balance.",
  },
  {
    name: "Serum Calcium",
    category: "Electrolytes",
    description: "Important for bone, muscle and nerve function.",
  },
  {
    name: "Serum Magnesium",
    category: "Electrolytes",
    description: "Assesses magnesium levels affecting muscle and nerve health.",
  },
  {
    name: "Serum Phosphorus",
    category: "Electrolytes",
    description: "Evaluates phosphorus balance related to bone health.",
  },

  // Infection
  {
    name: "Widal Test",
    category: "Infection",
    description: "Screens for typhoid fever infection.",
  },
  {
    name: "Malaria Antigen Test",
    category: "Infection",
    description: "Rapid detection of malaria parasites.",
  },
  {
    name: "Dengue NS1 / IgG / IgM",
    category: "Infection",
    description: "Detects dengue fever infection at various stages.",
  },
  {
    name: "CRP (Infection Marker)",
    category: "Infection",
    description: "Assesses presence and severity of infection or inflammation.",
  },
  {
    name: "Urine Culture & Sensitivity",
    category: "Infection",
    description: "Identifies urinary infections and effective antibiotics.",
  },

  // Hepatitis
  {
    name: "HBsAg (Hepatitis B)",
    category: "Hepatitis",
    description: "Screens for Hepatitis B virus infection.",
  },
  {
    name: "Anti-HCV (Hepatitis C)",
    category: "Hepatitis",
    description: "Screens for Hepatitis C virus infection.",
  },
  {
    name: "HAV IgM (Hepatitis A)",
    category: "Hepatitis",
    description: "Detects recent Hepatitis A infection.",
  },

  // Autoimmune
  {
    name: "ANA (Antinuclear Antibody)",
    category: "Autoimmune",
    description: "Screens for autoimmune disorders such as lupus.",
  },
  {
    name: "RA Factor (Rheumatoid Arthritis)",
    category: "Autoimmune",
    description: "Helps detect rheumatoid arthritis.",
  },
  {
    name: "CCP Antibody",
    category: "Autoimmune",
    description: "Supports diagnosis of rheumatoid arthritis.",
  },

  // Coagulation
  {
    name: "PT / INR (Prothrombin Time)",
    category: "Coagulation",
    description: "Assesses blood clotting time, often for anticoagulant monitoring.",
  },
  {
    name: "APTT",
    category: "Coagulation",
    description: "Evaluates the blood clotting pathway.",
  },
  {
    name: "D-Dimer",
    category: "Coagulation",
    description: "Helps detect abnormal blood clot formation.",
  },
  {
    name: "Bleeding Time & Clotting Time",
    category: "Coagulation",
    description: "Basic screening for clotting disorders.",
  },

  // Allergy
  {
    name: "Total IgE",
    category: "Allergy",
    description: "Screens for allergic tendencies in the body.",
  },
  {
    name: "Absolute Eosinophil Count",
    category: "Allergy",
    description: "Assesses allergic or parasitic conditions.",
  },
  {
    name: "Specific Allergy Panel",
    category: "Allergy",
    description: "Identifies reactions to specific food or environmental allergens.",
  },

  // Fertility
  {
    name: "AMH (Anti-Mullerian Hormone)",
    category: "Fertility",
    description: "Assesses ovarian reserve for fertility evaluation.",
  },
  {
    name: "FSH & LH",
    category: "Fertility",
    description: "Evaluates reproductive hormone levels.",
  },
  {
    name: "Semen Analysis",
    category: "Fertility",
    description: "Assesses sperm health for male fertility evaluation.",
  },

  // Women's Health
  {
    name: "Beta hCG (Pregnancy Test)",
    category: "Women's Health",
    description: "Confirms pregnancy through hormone detection.",
  },
  {
    name: "PAP Smear",
    category: "Women's Health",
    description: "Screens for cervical abnormalities.",
  },
  {
    name: "Estrogen & Progesterone",
    category: "Women's Health",
    description: "Assesses female reproductive hormone balance.",
  },

  // Men's Health
  {
    name: "PSA (Prostate Specific Antigen)",
    category: "Men's Health",
    description: "Screens for prostate health concerns.",
  },
  {
    name: "Testosterone Profile",
    category: "Men's Health",
    description: "Assesses male hormonal health.",
  },

  // Preventive Health
  {
    name: "Complete Health Screening Panel",
    category: "Preventive Health",
    description: "Broad panel covering blood counts, sugar, lipids and organ function.",
  },
  {
    name: "Tumor Marker Screening",
    category: "Preventive Health",
    description: "Preliminary screening panel for select cancer markers.",
  },
  {
    name: "Vitamin & Mineral Panel",
    category: "Preventive Health",
    description: "Assesses key vitamin and mineral sufficiency for general wellness.",
  },
];

function testSearchHaystack(test: BloodTest): string {
  return `${test.name} ${test.category} ${test.description}`.toLowerCase();
}

export function searchBloodTests(query: string, category: string = "All"): BloodTest[] {
  const base =
    category === "All"
      ? BLOOD_TESTS
      : BLOOD_TESTS.filter((t) => t.category === category);
  const q = query.trim().toLowerCase();
  if (!q) return base;
  return base.filter((t) => testSearchHaystack(t).includes(q));
}
