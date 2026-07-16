import React from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import LandingHero from "./components/LandingHero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Uploader from "./components/Uploader";
import LoadingScreen from "./components/LoadingScreen";
import Dashboard from "./components/Dashboard";
import { UploadedFile, AnalysisResult } from "./types";
import { AlertTriangle, HeartPulse } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = React.useState<boolean>(() => {
    // Check user preference or system theme
    const saved = localStorage.getItem("medi_explain_dark_mode");
    if (saved) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [language, setLanguage] = React.useState<"en" | "bn">("en");
  const [selectedFile, setSelectedFile] = React.useState<UploadedFile | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Sync dark mode class to HTML element
  React.useEffect(() => {
    localStorage.setItem("medi_explain_dark_mode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleUploadClick = () => {
    handleScrollTo("upload-section");
  };

  const handleAnalyzeFile = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: selectedFile.dataUrl,
          mimeType: selectedFile.mimeType,
          language: language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to parse and analyze report.");
      }

      const parsedResult = await response.json();
      setResult(parsedResult);
      
      // Scroll to dashboard
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);

    } catch (err: any) {
      console.error("Clinical analysis failed:", err);
      setErrorMsg(
        language === "en"
          ? `Analysis failed: ${err.message || "An unexpected error occurred. Please verify your file or try again."}`
          : `বিশ্লেষণ ব্যর্থ হয়েছে: ${err.message || "একটি অপ্রত্যাশিত সমস্যা ঘটেছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToUpload = () => {
    setResult(null);
    setSelectedFile(null);
    setErrorMsg(null);
    // Wait briefly for route transition then scroll to upload section
    setTimeout(() => {
      handleScrollTo("upload-section");
    }, 50);
  };

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC] text-[#0F172A] dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 relative">
      
      {/* Loading Animation Portal */}
      <AnimatePresence>
        {loading && <LoadingScreen language={language} />}
      </AnimatePresence>

      {/* Sticky Premium Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        onScrollTo={handleScrollTo}
        onUploadClick={handleUploadClick}
      />

      {/* Primary Page Layouts */}
      {!result ? (
        /* Landing & Upload Pages View */
        <main className="pb-24">
          
          {/* Landing Hero Screen */}
          <LandingHero
            language={language}
            onUploadClick={handleUploadClick}
          />

          {/* Process Walkthrough */}
          <HowItWorks language={language} />

          {/* Features Grid */}
          <Features language={language} />

          {/* Frequently Asked Questions */}
          <FAQ language={language} />

          {/* Upload and Configuration Module */}
          <Uploader
            language={language}
            setLanguage={setLanguage}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            onClearFile={() => setSelectedFile(null)}
            onAnalyze={handleAnalyzeFile}
          />

          {/* Interactive Page Error Toast if API Call Fails */}
          {errorMsg && (
            <div className="mx-auto max-w-4xl px-4 mt-4">
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-red-50 text-red-800 border border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-950/50">
                <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <span className="font-extrabold block text-base mb-1">
                    {language === "en" ? "Analysis Interrupted" : "বিশ্লেষণে বিঘ্ন ঘটেছে"}
                  </span>
                  <p className="text-sm leading-relaxed font-medium">
                    {errorMsg}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Core Support / Clinical Policy Banner */}
          <div id="disclaimer" className="mx-auto max-w-4xl px-4 mt-8">
            <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 dark:border-slate-800/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30 text-[#2563EB] dark:text-blue-400">
                <HeartPulse className="h-6 w-6" />
              </div>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                {language === "en" ? (
                  <>
                    <strong>Education First policy:</strong> MediExplain AI reads files locally in your browser. All report translations are structured as non-diagnostic guidance to enrich patient health literacy and are optimized to be discussed directly with registered doctors.
                  </>
                ) : (
                  <>
                    <strong>গোপনীয়তা ও সচেতনতা নীতি:</strong> এই এআই টুলটি সাধারণ মানুষের বোঝার সুবিধার্থে রিপোর্ট সরলীকরণ করে থাকে। যেকোনো গুরুতর ল্যাব রিপোর্ট বা চিকিৎসার সিদ্ধান্ত অবশ্যই একজন নিবন্ধিত চিকিৎসকের সাথে আলোচনা করে নিতে হবে।
                  </>
                )}
              </p>
            </div>
          </div>

        </main>
      ) : (
        /* Results / Dashboard Layout View */
        <main className="pb-24">
          <Dashboard
            data={result}
            language={language}
            onBack={handleBackToUpload}
          />
        </main>
      )}

      {/* Sticky High-Contrast Footer */}
      <footer className="w-full border-t border-[#E2E8F0] bg-white py-8 dark:border-slate-800/60 dark:bg-slate-950/50 print:hidden transition-colors duration-300 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-[#64748B] dark:text-slate-500">
            © {new Date().getFullYear()} MediExplain AI • {language === "en" ? "Privacy-preserving Clinical Interpretation" : "গোপনীয়তা-সুরক্ষিত মেডিকেল রিপোর্ট রূপান্তরকারী"}
          </p>
        </div>
      </footer>

    </div>
  );
}
