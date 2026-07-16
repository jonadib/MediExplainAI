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
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 transition-all duration-300 print:hidden">
      <div
        className={`mx-auto max-w-7xl transition-all duration-300 rounded-[28px] border ${
          scrolled
            ? "border-slate-200/80 bg-white/80 shadow-md backdrop-blur-lg dark:border-slate-800/90 dark:bg-slate-950/80"
            : "border-slate-200/40 bg-white/60 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/60"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => onScrollTo("hero")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/15 group-hover:scale-105 transition-all duration-200">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="font-sans text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                MediExplain<span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
            </div>
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-850 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-blue-500" />}
            </button>

            {/* Primary CTA Button */}
            <button
              onClick={onUploadClick}
              className="rounded-full bg-blue-600 px-5.5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-blue-600/10 hover:bg-blue-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
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
