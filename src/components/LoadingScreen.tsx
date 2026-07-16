import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Sparkles, Cpu } from "lucide-react";

interface LoadingScreenProps {
  language: "en" | "bn";
}

export default function LoadingScreen({ language }: LoadingScreenProps) {
  const stepsEn = [
    "Uploading report securely...",
    "Reading clinical structure...",
    "Extracting laboratory text & data...",
    "Analyzing values against medical baselines...",
    "Simplifying medical jargon...",
    "Preparing your personalized results dashboard..."
  ];

  const stepsBn = [
    "রিপোর্ট নিরাপদে আপলোড করা হচ্ছে...",
    "রিপোর্টের ধরণ পর্যবেক্ষণ করা হচ্ছে...",
    "ল্যাব টেস্টের ডাটা ও তথ্য সংগ্রহ করা হচ্ছে...",
    "স্বাভাবিক সীমার সাথে মানগুলোর তুলনা করা হচ্ছে...",
    "জটিল মেডিকেল শব্দগুলো সরল করা হচ্ছে...",
    "আপনার জন্য বিস্তারিত বিশ্লেষণ প্রস্তুত করা হচ্ছে..."
  ];

  const steps = language === "en" ? stepsEn : stepsBn;
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-3xl bg-white/95 p-8 text-center shadow-2xl dark:bg-slate-900/95 border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden"
      >
        {/* Neon accent glows */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/5 blur-2xl" />

        {/* Pulse Heartbeat Loader */}
        <div className="relative flex justify-center items-center mb-8 mt-4">
          {/* Pulsing ring 1 */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-24 w-24 rounded-full border border-[#2563EB]/20"
          />
          {/* Pulsing ring 2 */}
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute h-24 w-24 rounded-full border border-[#06B6D4]/10"
          />
          
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[20px] bg-blue-600 text-white shadow-lg shadow-blue-600/10">
            <Cpu className="h-10 w-10 animate-pulse" />
          </div>
        </div>

        {/* Active Title */}
        <h3 className="font-sans text-2xl font-extrabold text-[#0F172A] dark:text-white">
          {language === "en" ? "MediExplain AI is Thinking" : "মেডিএক্সপ্লেইন এআই বিশ্লেষণ করছে"}
        </h3>
        
        <p className="text-sm text-[#64748B] dark:text-slate-400 mt-2">
          {language === "en"
            ? "Our deep thinking clinical parser is reading your report."
            : "আমাদের কৃত্রিম বুদ্ধিমত্তা আপনার রিপোর্টের তথ্য বিশ্লেষণ করছে।"}
        </p>

        {/* Step Progression Timeline */}
        <div className="mt-8 mb-6 flex flex-col gap-3.5 max-w-sm mx-auto text-left">
          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;

            return (
              <div key={idx} className="flex items-center gap-3 transition-opacity duration-300">
                <div className="flex-shrink-0 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-black">
                      ✓
                    </div>
                  ) : isActive ? (
                    <Loader2 className="h-5 w-5 text-[#2563EB] animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" />
                  )}
                </div>
                
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? "text-[#0F172A] dark:text-white font-bold"
                      : isCompleted
                      ? "text-slate-400 dark:text-slate-500 line-through decoration-slate-200"
                      : "text-[#64748B] dark:text-slate-600"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Support Disclaimer */}
        <p className="text-[11px] text-[#64748B] dark:text-slate-500 bg-slate-50 dark:bg-slate-950 py-2.5 px-4 rounded-[16px] border border-slate-100 dark:border-slate-850/30">
          {language === "en"
            ? "Your files are processed in real-time. Strictly educational, non-diagnostic."
            : "আপনার ফাইলটি সুরক্ষিতভাবে বিশ্লেষণ হচ্ছে। এটি সম্পূর্ণ শিক্ষামূলক সাহায্যকারী টুল।"}
        </p>
      </motion.div>
    </div>
  );
}
