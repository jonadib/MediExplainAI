export type HealthStatus = "NORMAL" | "NEEDS_ATTENTION" | "CONSULT_DOCTOR";

export interface Finding {
  title: string;
  status: "normal" | "abnormal" | "informational";
  description: string;
}

export interface AbnormalValue {
  test: string;
  result: string;
  reference: string;
  explanation: string;
}

export interface MedicalTerm {
  term: string;
  explanation: string;
}

export interface AnalysisResult {
  summary: string;
  status: HealthStatus;
  findings: Finding[];
  abnormalValues: AbnormalValue[];
  medicalTerms: MedicalTerm[];
  doctorQuestions: string[];
  lifestyleTips: string[];
  disclaimer: string;
}

export interface UploadedFile {
  name: string;
  size: string;
  type: string; // "pdf" | "image"
  dataUrl: string; // base64 / objectURL for preview
  mimeType: string;
}
