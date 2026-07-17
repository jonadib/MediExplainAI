import { motion } from "motion/react";
import { FileSearch, BookOpen, AlertCircle, Languages, HeartHandshake, HelpCircle } from "lucide-react";

interface FeaturesProps {
  language: "en" | "bn";
}

export default function Features({ language }: FeaturesProps) {
  const list = [
    {
      icon: FileSearch,
      title: language === "en" ? "Generative AI Summary" : "এআই সামগ্রিক সারসংক্ষেপ",
      desc:
        language === "en"
          ? "Receive a compassionate, clear overview summarizing what your report checks for and its main conclusions."
          : "রিপোর্টের মূল উদ্দেশ্য এবং সামগ্রিক স্বাস্থ্য পরিস্থিতির একটি অত্যন্ত সহজ ও স্পষ্ট সারসংক্ষেপ পেয়ে যান।",
      badgeColor: "text-blue-600 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-900/40",
    },
    {
      icon: AlertCircle,
      title: language === "en" ? "Highlight Abnormal Results" : "অস্বাভাবিক মানগুলো চিহ্নিতকরণ",
      desc:
        language === "en"
          ? "Our engine highlights tests that sit outside reference ranges, explaining why they might differ in simple terms."
          : "পরীক্ষার স্বাভাবিক রেঞ্জের বাইরের মানগুলো স্পষ্টভাবে হাইলাইট করে এবং তা পরিবর্তনের সাধারণ কারণ বুঝিয়ে দেয়।",
      badgeColor: "text-red-600 bg-red-50 border-red-100 dark:text-red-400 dark:bg-red-950/30 dark:border-red-900/40",
    },
    {
      icon: BookOpen,
      title: language === "en" ? "Medical Jargon Translator" : "মেডিকেল পরিভাষার অভিধান",
      desc:
        language === "en"
          ? "Demystifies complex laboratory and clinical words (like bilirubin, creatinine, leukocytes) into clear layman terms."
          : "কঠিন ল্যাবরেটরি পরিভাষাগুলোকে (যেমন ক্রিয়েটিনিন, বিলিরুবিন, লিউকোসাইট) একদম সাধারণ ভাষায় সরল করে দেয়।",
      badgeColor: "text-purple-600 bg-purple-50 border-purple-100 dark:text-purple-400 dark:bg-purple-950/30 dark:border-purple-900/40",
    },
    {
      icon: Languages,
      title: language === "en" ? "Full Bangla Localization" : "সাবলীল বাংলা অনুবাদ",
      desc:
        language === "en"
          ? "Perfectly switch between native plain English and comforting, natural Bangla translations with one click."
          : "এক ক্লিকেই ইংরেজি থেকে সুন্দর, পরিমার্জিত এবং অত্যন্ত সাবলীল ও সহজ বাংলা অনুবাদে রূপান্তরের অনন্য সুবিধা।",
      badgeColor: "text-cyan-600 bg-cyan-50 border-cyan-100 dark:text-cyan-400 dark:bg-cyan-950/30 dark:border-cyan-900/40",
    },
    {
      icon: HelpCircle,
      title: language === "en" ? "Doctor Discussion Guide" : "ডাক্তারের আলোচনার গাইড",
      desc:
        language === "en"
          ? "Suggests highly tailored, practical questions you can ask your physician during your next visit."
          : "পরবর্তী চেকাপের সময় চিকিৎসককে জিজ্ঞেস করার মতো গুরুত্বপূর্ণ ও উপযোগী প্রশ্নাবলি প্রস্তুত করে দেয়।",
      badgeColor: "text-amber-600 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-900/40",
    },
    {
      icon: HeartHandshake,
      title: language === "en" ? "Lifestyle & Wellness Tips" : "সুস্থতা ও জীবনযাত্রা পরামর্শ",
      desc:
        language === "en"
          ? "Get general, non-diagnostic healthy living recommendations that support your wellness journey safely."
          : "স্বাভাবিক সুস্থতা ধরে রাখতে পুষ্টি, ঘুম ও জীবনযাত্রার অত্যন্ত সাধারণ ও নিরাপদ স্বাস্থ্য নির্দেশিকা প্রদান করে।",
      badgeColor: "text-emerald-600 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900/40",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {language === "en" ? "Core Capabilities" : "প্রধান সুবিধাসমূহ"}
          </span>
          <h2 className="mt-3 font-sans text-3.5xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {language === "en" ? "Intelligent Features for Better Health Literacy" : "রোগীর সুবিধার্থে তৈরি বুদ্ধিদীপ্ত ফিচারসমূহ"}
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-semibold">
            {language === "en"
              ? "Designed to bridge the communication gap between complex laboratory reports and patients."
              : "ল্যাব রিপোর্টের জটিল বিজ্ঞান এবং রোগীর সরল বোঝার মধ্যে দূরত্ব ঘুচিয়ে দিতে সাহায্য করে আমাদের বিশেষ সুবিধাসমূহ।"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col p-8 rounded-[32px] border border-slate-200/60 bg-white shadow-sm hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 hover:scale-[1.01] hover:border-blue-500/30 transition-all duration-300 group"
              >
                {/* Styled Icon */}
                <div className={`mb-6 flex h-13 w-13 items-center justify-center rounded-2xl border ${item.badgeColor} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Heading */}
                <h3 className="font-sans text-lg font-extrabold text-slate-900 dark:text-white mb-2.5">
                  {item.title}
                </h3>

                {/* Body Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
