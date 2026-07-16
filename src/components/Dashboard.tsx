import React from "react";
import {
  ArrowLeft,
  Copy,
  Printer,
  Share2,
  Check,
  AlertTriangle,
  Info,
  Heart,
  ChevronDown,
  ChevronUp,
  FileText,
  Activity,
  ThumbsUp,
  Clock
} from "lucide-react";
import { AnalysisResult } from "../types";

interface DashboardProps {
  data: AnalysisResult;
  language: "en" | "bn";
  onBack: () => void;
}

export default function Dashboard({ data, language, onBack }: DashboardProps) {
  const [copied, setCopied] = React.useState(false);
  const [checkedQuestions, setCheckedQuestions] = React.useState<Record<number, boolean>>({});
  const [expandedTerm, setExpandedTerm] = React.useState<Record<number, boolean>>({});
  const [showShareModal, setShowShareModal] = React.useState(false);

  const handleCopy = () => {
    const formattedText = `
${data.summary}

HEALTH STATUS: ${data.status}

ABNORMAL VALUES:
${data.abnormalValues.map((v) => `- ${v.test}: ${v.result} (Ref: ${v.reference}) - ${v.explanation}`).join("\n")}

LIFESTYLE SUGGESTIONS:
${data.lifestyleTips.map((t) => `- ${t}`).join("\n")}

${data.disclaimer}
`;
    navigator.clipboard.writeText(formattedText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleQuestion = (idx: number) => {
    setCheckedQuestions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleTerm = (idx: number) => {
    setExpandedTerm((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Get color schemes based on Status
  const getStatusMeta = () => {
    switch (data.status) {
      case "NORMAL":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-950/20",
          border: "border-emerald-200 dark:border-emerald-800",
          text: "text-emerald-700 dark:text-emerald-400",
          badge: "bg-emerald-500 text-white",
          label: language === "en" ? "Within Normal Ranges" : "সব মান স্বাভাবিক সীমায় আছে",
          icon: ThumbsUp,
        };
      case "NEEDS_ATTENTION":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/20",
          border: "border-amber-200 dark:border-amber-800",
          text: "text-amber-700 dark:text-amber-400",
          badge: "bg-amber-500 text-white",
          label: language === "en" ? "Needs Attention" : "সচেতনতা প্রয়োজন",
          icon: Info,
        };
      case "CONSULT_DOCTOR":
        return {
          bg: "bg-red-50 dark:bg-red-950/20",
          border: "border-red-200 dark:border-red-800",
          text: "text-red-700 dark:text-red-400",
          badge: "bg-red-500 text-white",
          label: language === "en" ? "Consult Healthcare Provider" : "ডাক্তারের পরামর্শ নিন",
          icon: AlertTriangle,
        };
    }
  };

  const statusMeta = getStatusMeta();
  const StatusIcon = statusMeta.icon;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 print:p-0">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#0F172A] dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "en" ? "Upload Different Report" : "অন্য রিপোর্ট আপলোড করুন"}
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {/* Copy */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-xs font-bold text-[#0F172A] hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            {copied ? (language === "en" ? "Copied!" : "কপি হয়েছে!") : language === "en" ? "Copy Text" : "লেখা কপি করুন"}
          </button>

          {/* Share */}
          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-xs font-bold text-[#0F172A] hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            {language === "en" ? "Share" : "শেয়ার করুন"}
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1E293B] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            {language === "en" ? "Print / Save PDF" : "প্রিন্ট / পিডিএফ সেভ"}
          </button>
        </div>
      </div>

      {/* 2. Top Banner Status & Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Summary Card */}
        <div className="lg:col-span-2 rounded-[32px] border border-[#E2E8F0] bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">
              <FileText className="h-4 w-4 text-[#2563EB]" />
              <span>{language === "en" ? "Overall Explanation" : "সামগ্রিক বিশ্লেষণ"}</span>
            </div>
            <h3 className="font-sans text-2xl font-extrabold text-[#0F172A] dark:text-white mb-4">
              {language === "en" ? "Summary of Key Findings" : "প্রধান ফলাফলের সংক্ষিপ্ত সারসংক্ষেপ"}
            </h3>
            <p className="text-[#64748B] dark:text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {data.summary}
            </p>
          </div>
          
          <div className="mt-6 flex items-center gap-2.5 text-xs text-[#94A3B8] dark:text-slate-500 italic border-t border-slate-100 dark:border-slate-850/50 pt-4">
            <Clock className="h-3.5 w-3.5 text-slate-300" />
            <span>
              {language === "en"
                ? "Generated in real-time by Deep Thinking Medical AI."
                : "ডিপ থিংকিং মেডিকেল এআই দ্বারা রিয়েল-টাইমে প্রস্তুতকৃত।"}
            </span>
          </div>
        </div>

        {/* Health Status Dashboard Panel */}
        <div className={`rounded-[32px] border ${statusMeta.border} ${statusMeta.bg} p-8 shadow-sm flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {language === "en" ? "Health Status" : "স্বাস্থ্য অবস্থা"}
              </span>
              <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-extrabold uppercase ${statusMeta.badge}`}>
                {data.status}
              </span>
            </div>
            
            <div className="flex items-center gap-3.5 my-6">
              <div className={`flex h-14 w-14 items-center justify-center rounded-[20px] bg-white dark:bg-slate-950 border ${statusMeta.border} shadow-sm`}>
                <StatusIcon className={`h-8 w-8 ${statusMeta.text}`} />
              </div>
              <div>
                <h4 className="font-sans text-lg font-black text-[#0F172A] dark:text-white">
                  {statusMeta.label}
                </h4>
                <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                  {language === "en"
                    ? "Based on lab testing threshold analysis"
                    : "ল্যাব টেস্টের সীমার তুলনামূলক বিশ্লেষণের ভিত্তিতে"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-6">
            <div className="flex justify-between items-center text-xs font-bold text-[#64748B] dark:text-slate-400 mb-2">
              <span>{language === "en" ? "Severity Indicator" : "ঝুঁকির মাত্রা ইন্ডিকেটর"}</span>
              <span>{data.status === "NORMAL" ? "10%" : data.status === "NEEDS_ATTENTION" ? "45%" : "85%"}</span>
            </div>
            {/* Visual Progress Scale */}
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  data.status === "NORMAL"
                    ? "bg-emerald-500 w-[15%]"
                    : data.status === "NEEDS_ATTENTION"
                    ? "bg-amber-500 w-[50%]"
                    : "bg-red-500 w-[85%]"
                }`}
              />
            </div>
            <p className="text-[10px] text-[#94A3B8] dark:text-slate-500 mt-2">
              {language === "en"
                ? "This severity indicator helps read priority. Always verify with your clinical records."
                : "এই ইন্ডিকেটরটি গুরুত্ব বোঝার জন্য। যেকোনো সিদ্ধান্ত ডাক্তারের সাথে পেরিয়ে নিন।"}
            </p>
          </div>
        </div>

      </div>

      {/* 3. Abnormal Values (Interactive Table) */}
      {data.abnormalValues && data.abnormalValues.length > 0 && (
        <div className="rounded-[32px] border border-[#E2E8F0] bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden mb-8">
          <div className="p-6 border-b border-[#E2E8F0] bg-red-50/10 dark:bg-red-950/5">
            <h3 className="font-sans text-xl font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              {language === "en" ? "Abnormal Lab Values Highlighted" : "চিহ্নিত অস্বাভাবিক মানসমূহ"}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">
              {language === "en"
                ? "These laboratory parameters sit outside standard healthy reference thresholds."
                : "এই মানগুলো স্ট্যান্ডার্ড ল্যাবরেটরি সুস্থ নির্দেশিকা সীমার বাইরে রয়েছে।"}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-slate-950 border-b border-[#E2E8F0] text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                  <th className="px-6 py-4">{language === "en" ? "Test" : "পরীক্ষা"}</th>
                  <th className="px-6 py-4">{language === "en" ? "Your Result" : "আপনার মান"}</th>
                  <th className="px-6 py-4">{language === "en" ? "Standard Reference" : "রেফারেন্স সীমা"}</th>
                  <th className="px-6 py-4">{language === "en" ? "Plain Language Explanation" : "সহজ ব্যাখ্যা"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800 text-sm">
                {data.abnormalValues.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#0F172A] dark:text-white">
                      {item.test}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 dark:bg-red-950/30 px-2.5 py-1 text-xs font-bold text-red-600 dark:text-red-400">
                        {item.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#64748B] dark:text-slate-400">
                      {item.reference}
                    </td>
                    <td className="px-6 py-4 text-[#64748B] dark:text-slate-300 leading-relaxed max-w-md">
                      {item.explanation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Important Findings Grid */}
      <div className="mb-8">
        <h3 className="font-sans text-xl font-extrabold text-[#0F172A] dark:text-white mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#2563EB]" />
          {language === "en" ? "Detailed Diagnostic Findings" : "বিস্তারিত স্বাস্থ্য নির্দেশকসমূহ"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.findings.map((item, idx) => {
            const isAbnormal = item.status === "abnormal";
            return (
              <div
                key={idx}
                className={`rounded-[24px] border p-6 bg-white shadow-sm dark:bg-slate-900 transition-all duration-200 ${
                  isAbnormal
                    ? "border-red-200 dark:border-red-900/40 border-l-4 border-l-red-500"
                    : "border-[#E2E8F0] dark:border-slate-800 border-l-4 border-l-emerald-500"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-sans text-base font-bold text-[#0F172A] dark:text-white">
                    {item.title}
                  </h4>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                      isAbnormal
                        ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400"
                        : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                    }`}
                  >
                    {isAbnormal
                      ? language === "en"
                        ? "Flagged Value"
                        : "চিহ্নিত মান"
                      : language === "en"
                      ? "Stable / Normal"
                      : "স্থিতিশীল"}
                  </span>
                </div>
                <p className="text-sm text-[#64748B] dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Medical Terms Explained (Accordion) */}
      {data.medicalTerms && data.medicalTerms.length > 0 && (
        <div className="rounded-[32px] border border-[#E2E8F0] bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 mb-8">
          <h3 className="font-sans text-xl font-extrabold text-[#0F172A] dark:text-white mb-1.5 flex items-center gap-2">
            <Info className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            {language === "en" ? "Medical Terms Simplified" : "মেডিকেল পরিভাষা ডিকোড"}
          </h3>
          <p className="text-xs text-[#94A3B8] dark:text-slate-500 mb-6">
            {language === "en"
              ? "We simplified complicated medical terms found in your report for better clinical literacy."
              : "সহজে বোঝার জন্য রিপোর্টে ব্যবহৃত জটিল শব্দগুলো নিচে ব্যাখ্যা করা হলো।"}
          </p>

          <div className="flex flex-col gap-3">
            {data.medicalTerms.map((item, idx) => {
              const isOpen = expandedTerm[idx];
              return (
                <div
                  key={idx}
                  className="rounded-[16px] border border-[#E2E8F0] dark:border-slate-800/60 overflow-hidden"
                >
                  <button
                    onClick={() => toggleTerm(idx)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-[#F8FAFC] dark:bg-slate-950/30 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-sm text-[#0F172A] dark:text-white">
                      {item.term}
                    </span>
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 py-4 bg-white dark:bg-slate-900 text-sm text-[#64748B] dark:text-slate-300 border-t border-[#E2E8F0] dark:border-slate-800/50 leading-relaxed">
                      {item.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Questions to Ask Your Doctor & Lifestyle Tips (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Doctor Questions */}
        <div className="rounded-[32px] border border-[#E2E8F0] bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-sans text-lg font-extrabold text-[#0F172A] dark:text-white mb-1.5 flex items-center gap-2">
            <Activity className="h-5 w-5 text-amber-500" />
            {language === "en" ? "Questions for Your Doctor" : "ডাক্তারকে জিজ্ঞেস করার প্রশ্নাবলী"}
          </h3>
          <p className="text-xs text-[#94A3B8] dark:text-slate-500 mb-6">
            {language === "en"
              ? "Check off the questions you'd like to ask at your next healthcare visit."
              : "আপনার পরবর্তী ভিজিটে যে প্রশ্নগুলো করতে চান তা সিলেক্ট করে রাখুন।"}
          </p>

          <div className="flex flex-col gap-3">
            {data.doctorQuestions.map((q, idx) => {
              const isChecked = checkedQuestions[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleQuestion(idx)}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    isChecked
                      ? "border-blue-250 bg-[#EEF2FF]/40 dark:border-blue-900/40 dark:bg-blue-950/10"
                      : "border-slate-100 hover:border-slate-200 dark:border-slate-850/50 dark:hover:border-slate-800"
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[8px] border ${
                    isChecked ? "bg-[#2563EB] border-[#2563EB] text-white" : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  }`}>
                    {isChecked && <Check className="h-3.5 w-3.5" />}
                  </div>
                  <span className={`text-sm text-[#0F172A] dark:text-slate-300 leading-relaxed ${isChecked ? "line-through opacity-60" : ""}`}>
                    {q}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lifestyle Suggestions */}
        <div className="rounded-[32px] border border-[#E2E8F0] bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-sans text-lg font-extrabold text-[#0F172A] dark:text-white mb-1.5 flex items-center gap-2">
            <Heart className="h-5 w-5 text-emerald-500" />
            {language === "en" ? "Wellness & Lifestyle Guidelines" : "লাইফস্টাইল ও সুস্থতার পরামর্শ"}
          </h3>
          <p className="text-xs text-[#94A3B8] dark:text-slate-500 mb-6">
            {language === "en"
              ? "General daily routine enhancements supporting healthy lab thresholds."
              : "স্বাভাবিক সুস্থতা ধরে রাখতে জীবনযাত্রার কিছু অত্যন্ত সাধারণ ও নিরাপদ পরামর্শ।"}
          </p>

          <div className="flex flex-col gap-4">
            {data.lifestyleTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex gap-3.5 p-4 rounded-[20px] bg-[#F8FAFC] dark:bg-slate-950 border border-[#E2E8F0]/40"
              >
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Heart className="h-4 w-4" />
                </div>
                <p className="text-sm text-[#64748B] dark:text-slate-300 leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 7. Bottom Disclaimer Warning */}
      <div id="disclaimer" className="rounded-[20px] border border-amber-200 bg-amber-50/20 p-6 dark:border-amber-900/40 dark:bg-amber-950/10">
        <div className="flex items-start gap-3 text-sm text-amber-800 dark:text-amber-400">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold uppercase tracking-wider block mb-1">
              {language === "en" ? "EDUCATIONAL AND HEALTH INFORMATION DISCLAIMER" : "জরুরী সতর্কবার্তা ও দাবিত্যাগ"}
            </span>
            <p className="leading-relaxed text-xs">
              {data.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800">
            <h4 className="font-sans text-lg font-bold text-[#0F172A] dark:text-white mb-3">
              {language === "en" ? "Share Analysis Result" : "বিশ্লেষণের ফলাফল শেয়ার করুন"}
            </h4>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mb-4 leading-relaxed">
              {language === "en"
                ? "This temporary summary can be shared via copying this link. Data is only persistent during active session."
                : "এই লিংকটির মাধ্যমে আপনার সেশনের সামারি শেয়ার করতে পারেন। ব্রাউজার সেশন বন্ধ হলে এটি অ্যাক্সেস করা যাবে না।"}
            </p>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-[#E2E8F0] mb-4">
              <span className="text-xs text-slate-400 dark:text-slate-500 truncate select-all flex-1">
                {window.location.origin}/share/medical-explain-result
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/share/medical-explain-result`);
                  alert(language === "en" ? "Copied share link!" : "শেয়ার লিংক কপি হয়েছে!");
                }}
                className="rounded-[12px] bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white cursor-pointer"
              >
                {language === "en" ? "Copy" : "কপি"}
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="rounded-[16px] border border-[#E2E8F0] px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 cursor-pointer"
              >
                {language === "en" ? "Close" : "বন্ধ করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
