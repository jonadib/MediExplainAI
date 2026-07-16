import React from "react";
import { Sparkles, Sun, Moon, AlertTriangle, Menu, X, ShieldAlert } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  language: "en" | "bn";
  setLanguage: (lang: "en" | "bn") => void;
  onScrollTo: (id: string) => void;
  onUploadClick: () => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  onScrollTo,
  onUploadClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 transition-colors duration-300 print:hidden">
      <div
        className={`mx-auto max-w-7xl transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 rounded-[28px] border ${
          scrolled
            ? "border-slate-200/80 bg-white/80 shadow-md backdrop-blur-lg dark:border-slate-800/90 dark:bg-slate-950/80"
            : "border-slate-200/40 bg-white/60 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/60"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onScrollTo("hero")}
          >
            <svg 
              viewBox="0 0 680 200" 
              className="h-12 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="iconBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3D5AFE"/>
                  <stop offset="100%" stopColor="#2544E0"/>
                </linearGradient>
              </defs>
             
              {/* ICON: rounded mark containing pulse line resolving into an AI node cluster */}
              <rect x="10" y="20" width="160" height="160" rx="40" fill="url(#iconBg)"/>
             
              {/* pulse / EKG line */}
              <path d="M 34 100
                       L 60 100
                       L 72 72
                       L 86 128
                       L 100 58
                       L 114 100
                       L 128 100"
                    fill="none" stroke="#FFFFFF" strokeWidth="7"
                    strokeLinecap="round" strokeLinejoin="round"/>
             
              {/* AI node cluster continuing the line */}
              <line x1="128" y1="100" x2="150" y2="80" stroke="#BFCCFF" strokeWidth="6" strokeLinecap="round"/>
              <line x1="128" y1="100" x2="150" y2="120" stroke="#BFCCFF" strokeWidth="6" strokeLinecap="round"/>
              <circle cx="128" cy="100" r="8" fill="#FFFFFF"/>
              <circle cx="150" cy="80" r="6" fill="#BFCCFF"/>
              <circle cx="150" cy="120" r="6" fill="#BFCCFF"/>
             
              {/* WORDMARK */}
              <text x="200" y="122" fontFamily="Helvetica, Arial, sans-serif" fontWeight="800" fontSize="58" letterSpacing="-1">
                <tspan className="fill-[#0F1626] dark:fill-white">Medi</tspan>
                <tspan fill="#3D5AFE">Explain</tspan>
                <tspan fill="#3D5AFE">AI</tspan>
              </text>
             
              {/* Tagline */}
              <text x="203" y="152" fontFamily="Helvetica, Arial, sans-serif" fontWeight="500" fontSize="19" letterSpacing="2" className="fill-[#6B7280] dark:fill-slate-400">
                HEALTH ANSWERS, CLEARLY EXPLAINED
              </text>
            </svg>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => onScrollTo("how-it-works")}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {language === "en" ? "How It Works" : "কীভাবে কাজ করে"}
            </button>
            <button
              onClick={() => onScrollTo("features")}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {language === "en" ? "Features" : "বৈশিষ্ট্যসমূহ"}
            </button>
            <button
              onClick={() => onScrollTo("faq")}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {language === "en" ? "FAQ" : "জিজ্ঞাসাবাদ"}
            </button>
            <button
              onClick={() => onScrollTo("disclaimer")}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              {language === "en" ? "Disclaimer" : "দাবিত্যাগ"}
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-5">
            
            {/* Language Switcher */}
            <div className="flex rounded-full bg-slate-100/80 p-0.5 border border-slate-200/50 dark:bg-slate-900/80 dark:border-slate-800/50">
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all duration-200 ${
                  language === "en"
                    ? "bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("bn")}
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all duration-200 ${
                  language === "bn"
                    ? "bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-850 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-blue-500" />}
            </button>

            {/* Primary CTA Button */}
            <button
              onClick={onUploadClick}
              className="rounded-full bg-blue-600 px-5.5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-blue-600/10 hover:bg-blue-700 hover:shadow-lg transition-colors duration-200 cursor-pointer"
            >
              {language === "en" ? "Upload Report" : "রিপোর্ট আপলোড করুন"}
            </button>
          </div>

          {/* Mobile Actions Button Row */}
          <div className="flex lg:hidden items-center gap-2">
            
            {/* Language Switcher for Mobile */}
            <div className="flex rounded-full bg-slate-100 p-0.5 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40">
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  language === "en" ? "bg-white text-blue-600 dark:bg-slate-800 dark:text-blue-400" : "text-slate-500"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("bn")}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  language === "bn" ? "bg-white text-blue-600 dark:bg-slate-800 dark:text-blue-400" : "text-slate-500"
                }`}
              >
                বাং
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-400" />}
            </button>

            {/* Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => {
              onScrollTo("how-it-works");
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            {language === "en" ? "How It Works" : "কীভাবে কাজ করে"}
          </button>
          <button
            onClick={() => {
              onScrollTo("features");
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            {language === "en" ? "Features" : "বৈশিষ্ট্যসমূহ"}
          </button>
          <button
            onClick={() => {
              onScrollTo("faq");
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
          >
            {language === "en" ? "FAQ" : "জিজ্ঞাসাবাদ"}
          </button>
          <button
            onClick={() => {
              onScrollTo("disclaimer");
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="h-4 w-4 text-amber-500" />
            {language === "en" ? "Disclaimer" : "দাবিত্যাগ"}
          </button>
          <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1" />
          <button
            onClick={() => {
              onUploadClick();
              setMobileMenuOpen(false);
            }}
            className="w-full rounded-full bg-blue-600 py-3 text-center text-sm font-extrabold text-white shadow-md shadow-blue-600/10 hover:bg-blue-700 transition-colors"
          >
            {language === "en" ? "Upload Report" : "রিপোর্ট আপলোড করুন"}
          </button>
        </div>
      )}
    </header>
  );
}
