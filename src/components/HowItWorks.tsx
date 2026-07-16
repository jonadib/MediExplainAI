import { motion } from "motion/react";
import { Upload, Brain, FileText, ArrowRight } from "lucide-react";

interface HowItWorksProps {
  language: "en" | "bn";
}

export default function HowItWorks({ language }: HowItWorksProps) {
  const steps = [
    {
      icon: Upload,
      stepNumber: "01",
      title: language === "en" ? "Upload Report" : "রিপোর্ট আপলোড",
      description:
        language === "en"
          ? "Drag and drop any PDF or photo of your report. Works with blood panels, urine tests, thyroid, lipid panels, and scans."
          : "রক্ত পরীক্ষা, থাইরয়েড, লিপিড প্যানেল বা অন্য যেকোনো রিপোর্টের ছবি অথবা পিডিএফ আপলোড করুন।",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    },
    {
      icon: Brain,
      stepNumber: "02",
      title: language === "en" ? "Multimodal AI Parsing" : "কৃত্রিম বুদ্ধিমত্তা বিশ্লেষণ",
      description:
        language === "en"
          ? "Gemini AI reads data locally, cross-checks parameters against clinical reference guidelines instantly."
          : "জেমিনি এআই ল্যাব নির্দেশিকার স্বাভাবিক সীমার সাথে রিপোর্টের প্রতিটি প্যারামিটার নিখুঁতভাবে বিশ্লেষণ করে।",
      badgeColor: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
    },
    {
      icon: FileText,
      stepNumber: "03",
      title: language === "en" ? "Plain Translation" : "সহজ ভাষায় রূপান্তর",
      description:
        language === "en"
          ? "Receive a compassionate summary, decodes of complex clinical words, and safe wellness guidance."
          : "জটিল পরিভাষা এড়িয়ে একদম সাধারণের উপযোগী সাবলীল ব্যাখ্যা ও নিরাপদ পুষ্টি পরামর্শ পেয়ে যান।",
      badgeColor: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50/50 dark:bg-slate-950/20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {language === "en" ? "Simple Walkthrough" : "সহজ পদ্ধতি"}
          </span>
          <h2 className="mt-3 font-sans text-3.5xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {language === "en" ? "Three Steps to Absolute Clarity" : "সহজে রিপোর্ট বোঝার ৩টি ধাপ"}
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-semibold">
            {language === "en"
              ? "We decode complicated medical jargon into clear, patient-friendly findings while maintaining complete local privacy."
              : "আমরা রিপোর্টের জটিল মেডিকেল পরিভাষাগুলোকে সহজ ও সাবলীল বাংলায় রূপান্তর করি, আপনার গোপনীয়তা বজায় রেখে।"}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative flex flex-col items-center text-center p-8 rounded-[32px] border border-slate-200/60 bg-white shadow-sm hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 hover:scale-[1.01] hover:border-blue-500/30 transition-all duration-300 group"
              >
                {/* Step Number Indicator Badge */}
                <div className="absolute top-6 right-8 text-4xl font-black text-slate-100 dark:text-slate-800/60 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                  {step.stepNumber}
                </div>

                {/* Icon Circle */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl mb-6 shadow-inner ${step.badgeColor} group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="h-7 w-7" />
                </div>

                {/* Step Title */}
                <h3 className="font-sans text-xl font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5 justify-center">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {step.description}
                </p>

                {/* Connector Arrows on desktop */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-slate-400 shadow-sm pointer-events-none">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
