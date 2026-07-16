import { motion } from "motion/react";
import { Sparkles, ArrowRight, Shield, Play, Activity, Heart, Eye } from "lucide-react";

interface LandingHeroProps {
  language: "en" | "bn";
  onUploadClick: () => void;
  onSeeDemoClick: () => void;
}

export default function LandingHero({
  language,
  onUploadClick,
  onSeeDemoClick,
}: LandingHeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Premium Background Ambient Glows */}
      <div className="absolute top-10 left-10 -z-10 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/5" />
      <div className="absolute right-10 bottom-20 -z-10 h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/5" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column (Copy and Actions) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* Supercharged Gemini Badge */}
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-400">
                <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-spin-slow" />
                {language === "en" ? "POWERED BY GEMINI 2.5" : "জেমিনি ২.৫ চালিত"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50/50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:border-cyan-950/40 dark:bg-cyan-950/20 dark:text-cyan-400">
                <Shield className="h-3.5 w-3.5 text-cyan-500" />
                {language === "en" ? "HIPAA SAFE" : "শতভাগ গোপনীয়"}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              {language === "en" ? (
                <>
                  Understand your <br />
                  <span className="text-blue-600 dark:text-blue-400">
                    medical report
                  </span>{" "}
                  <br />with AI.
                </>
              ) : (
                <>
                  এআই দিয়ে বুঝুন <br />
                  আপনার{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    মেডিকেল রিপোর্ট।
                  </span>
                </>
              )}
            </h1>

            {/* Explanatory Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed font-medium">
              {language === "en"
                ? "Upload a PDF or photo of your report and get a clear, plain-language explanation in English or Bangla — in seconds."
                : "আপনার ল্যাব টেস্ট, রক্ত পরীক্ষা বা অন্য যেকোনো রিপোর্টের ছবি অথবা পিডিএফ আপলোড করুন এবং কয়েক সেকেন্ডেই বুঝে নিন তার প্রকৃত অর্থ।"}
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button
                onClick={onUploadClick}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-blue-600 px-8 py-4.5 text-base font-extrabold text-white shadow-lg shadow-blue-600/15 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 group cursor-pointer"
              >
                {language === "en" ? "Upload Report" : "রিপোর্ট আপলোড করুন"}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onSeeDemoClick}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white px-8 py-4.5 text-base font-extrabold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 active:scale-[0.98] transition-all duration-200 shadow-sm cursor-pointer"
              >
                <Play className="h-4.5 w-4.5 fill-current text-slate-500 dark:text-slate-400" />
                {language === "en" ? "See Demo" : "ডেমো দেখুন"}
              </button>
            </div>

            {/* Trust and Policy Footer Indicators */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-6 border-t border-slate-100 dark:border-slate-850/60 max-w-md">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span className="text-[10px] font-bold">✓</span>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {language === "en" ? "No login required" : "কোনো লগইনের ঝামেলা নেই"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span className="text-[10px] font-bold">✓</span>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {language === "en" ? "Privacy first" : "শতভাগ গোপনীয়তা"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span className="text-[10px] font-bold">✓</span>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {language === "en" ? "English & Bangla" : "বাংলা ও ইংরেজি সাপোর্ট"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span className="text-[10px] font-bold">✓</span>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {language === "en" ? "Educational only" : "শুধুমাত্র সচেতনতামূলক"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Premium Interactive Dashboard Mockup) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex justify-center items-center"
          >
            {/* Glowing Background Ring Behind Dashboard Mockup */}
            <div className="absolute -inset-4 rounded-[40px] bg-blue-500 opacity-10 blur-2xl dark:opacity-5" />

            {/* Dashboard Mockup Card */}
            <div className="relative w-full max-w-md rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 z-10 overflow-hidden group">

              {/* Dynamic Scanning Line */}
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent top-0 animate-scanner pointer-events-none" />

              {/* Header inside Mockup Card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                    <Activity className="h-5.5 w-5.5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-extrabold text-slate-900 dark:text-white">
                      {language === "en" ? "Complete Blood Count" : "সম্পূর্ণ রক্ত পরীক্ষা (CBC)"}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {language === "en" ? "Analyzed just now" : "এইমাত্র বিশ্লেষণ করা হয়েছে"}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/10">
                  {language === "en" ? "Mostly Normal" : "প্রায় সব স্বাভাবিক"}
                </span>
              </div>

              {/* Lab Values Panel inside Mockup Card */}
              <div className="my-5 flex flex-col gap-3.5">

                {/* Metric 1 */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-950/30">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <div>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {language === "en" ? "Hemoglobin" : "হিমোগ্লোবিন"}
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                        {language === "en" ? "Ref: 12.0 - 15.5 g/dL" : "রেফ: ১২.০ - ১৫.৫ g/dL"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900 dark:text-white">13.8 g/dL</span>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase">{language === "en" ? "Optimal" : "স্বাভাবিক"}</p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-center justify-between rounded-2xl border border-red-200/50 bg-red-50/20 p-3.5 dark:border-red-950/30 dark:bg-red-950/10">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                    <div>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {language === "en" ? "White Blood Cells (WBC)" : "শ্বেত রক্তকণিকা (WBC)"}
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                        {language === "en" ? "Ref: 4.5 - 11.0 x10³/µL" : "রেফ: ৪.৫ - ১১.০ x10³/µL"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900 dark:text-white">11.4 x10³/µL</span>
                    <p className="text-[10px] text-amber-500 font-bold uppercase">{language === "en" ? "Slightly High" : "সামান্য বেশি"}</p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-950/30">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <div>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {language === "en" ? "Platelets" : "প্লেটলেট"}
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                        {language === "en" ? "Ref: 150 - 450 x10³/µL" : "রেফ: ১৫০ - ৪৫০ x10³/µL"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900 dark:text-white">245 x10³/µL</span>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase">{language === "en" ? "Optimal" : "স্বাভাবিক"}</p>
                  </div>
                </div>

              </div>

              {/* Simulated AI Insight Sub-Card */}
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-tr from-blue-50/30 to-cyan-50/30 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs mb-1.5 uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>{language === "en" ? "AI Summary Explanation" : "এআই সরল ব্যাখ্যা"}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  {language === "en"
                    ? "Your White Blood Cell (WBC) count is slightly above the standard range, which commonly happens with minor physical stress or minor cold. All other parameters are within healthy optimal levels. Discuss this with your doctor."
                    : "আপনার শ্বেত রক্তকণিকার (WBC) পরিমাণ স্বাভাবিক সীমার চেয়ে সামান্য বেশি, যা মৃদু ঠাণ্ডা লাগা বা সামান্য শারীরিক ধকলের কারণে হতে পারে। রক্তশূন্যতা বা প্লেটলেটের মতো অন্যান্য সব মান একদম নিখুঁত এবং স্বাভাবিক আছে। চিকিৎসকের সাথে পরামর্শ করুন।"}
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
