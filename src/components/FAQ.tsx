import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, ShieldCheck, FileType, Stethoscope, Sparkles } from "lucide-react";

interface FAQProps {
  language: "en" | "bn";
}

export default function FAQ({ language }: FAQProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      icon: ShieldCheck,
      question:
        language === "en"
          ? "Is my clinical data and report kept private?"
          : "আমার মেডিকেল রিপোর্ট এবং তথ্য কি সুরক্ষিত থাকবে?",
      answer:
        language === "en"
          ? "Absolutely. We adhere to a strict offline-first and privacy-preserving design. Files are read securely using client-side pipelines, parsed temporarily to the Gemini API, and never stored in any database. Your confidential clinical records remain entirely yours."
          : "অবশ্যই। আপনার ব্যক্তিগত তথ্যের নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার। আপলোড করা ফাইলগুলো কোনো ডাটাবেজে সংরক্ষণ করা হয় না এবং কাজ শেষ হওয়ার সাথে সাথে মুছে ফেলা হয়। আপনার রিপোর্ট সম্পূর্ণ নিরাপদ ও গোপনীয় থাকবে।",
    },
    {
      icon: FileType,
      question:
        language === "en"
          ? "What file formats and types of reports can I upload?"
          : "আমি কী ধরনের রিপোর্ট বা ফাইল আপলোড করতে পারব?",
      answer:
        language === "en"
          ? "We support PDF documents and image files (PNG, JPG, JPEG). You can upload blood panels, Complete Blood Count (CBC), lipid profiles, thyroid panels, urine analyses, diabetes tests, and other standardized clinical laboratory summaries."
          : "আপনি পিডিএফ (PDF) এবং ইমেজ ফরম্যাটের (PNG, JPG, JPEG) ফাইল আপলোড করতে পারবেন। রক্ত পরীক্ষা, থাইরয়েড, ডায়াবেটিস, রক্তের কোলেস্টেরল বা লিপিড প্যানেলসহ যেকোনো স্ট্যান্ডার্ড ল্যাবরেটরি রিপোর্ট আপলোড করতে পারবেন।",
    },
    {
      icon: Sparkles,
      question:
        language === "en"
          ? "Can the AI accurately read hand-written doctors' notes?"
          : "এআই কি ডাক্তারের হাতের লেখা রিপোর্ট পড়তে পারে?",
      answer:
        language === "en"
          ? "Yes! Powered by Gemini's advanced multimodal vision capabilities, our system can recognize and interpret printed report figures as well as clear medical handwritings with exceptionally high precision."
          : "হ্যাঁ! জেমিনির উন্নত কৃত্রিম বুদ্ধিমত্তা এবং ভিশন প্রযুক্তির সাহায্যে আমাদের সিস্টেমটি প্রিন্ট করা রিপোর্টের পাশাপাশি চিকিৎসকের সাধারণ হাতের লেখাও দারুণ নির্ভুলতার সাথে পড়ে অনুবাদ করতে সক্ষম।",
    },
    {
      icon: Stethoscope,
      question:
        language === "en"
          ? "Does this replace a real professional doctor?"
          : "এই এআই কি ডাক্তারের বিকল্প হিসেবে কাজ করতে পারে?",
      answer:
        language === "en"
          ? "Absolutely not. MediExplain AI is designed exclusively for educational purposes to enhance patient health literacy. It does not diagnose illness, recommend medications, or replace the expertise of registered medical practitioners. Always discuss findings with a doctor."
          : "একেবারেই নয়। এই প্ল্যাটফর্মটি শুধুমাত্র সাধারণ মানুষকে রিপোর্টের পরিভাষাগুলো বুঝিয়ে বলার জন্য তৈরি করা হয়েছে। এটি কোনো রোগ নির্ণয় বা প্রেসক্রিপশন প্রদান করতে পারে না। যেকোনো গুরুতর বিষয়ে অবশ্যই চিকিৎসকের পরামর্শ নিন।",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50/50 dark:bg-slate-950/20 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {language === "en" ? "Common Queries" : "জিজ্ঞাসাবাদ"}
          </span>
          <h2 className="mt-3 font-sans text-3.5xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {language === "en" ? "Frequently Asked Questions" : "সাধারণ কিছু প্রশ্নোত্তর"}
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-semibold">
            {language === "en"
              ? "Everything you need to know about report translations, privacy, and clinical boundaries."
              : "মেডিকেল রিপোর্টের সরলীকরণ, তথ্যের নিরাপত্তা এবং আমাদের সীমাবদ্ধতা নিয়ে আপনার সাধারণ কিছু জিজ্ঞাসা ও উত্তর।"}
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const Icon = faq.icon;

            return (
              <div
                key={idx}
                className="rounded-[24px] border border-slate-200/60 bg-white dark:border-slate-800/80 dark:bg-slate-900 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                      isOpen 
                        ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" 
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    } transition-colors duration-300`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-sans text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-blue-500" : ""
                    }`}
                  />
                </button>

                {/* Animated Collapsible Answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-slate-500 dark:text-slate-300 leading-relaxed font-semibold border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/10 dark:bg-slate-950/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
