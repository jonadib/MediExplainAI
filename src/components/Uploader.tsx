import React from "react";
import { Upload, FileText, CheckCircle, Trash2, AlertCircle, FileUp, Languages, Sparkles } from "lucide-react";
import { UploadedFile } from "../types";

interface UploaderProps {
  language: "en" | "bn";
  setLanguage: (lang: "en" | "bn") => void;
  selectedFile: UploadedFile | null;
  onFileSelect: (file: UploadedFile) => void;
  onClearFile: () => void;
  onAnalyze: () => void;
}

export default function Uploader({
  language,
  setLanguage,
  selectedFile,
  onFileSelect,
  onClearFile,
  onAnalyze,
}: UploaderProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);
    const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg(
        language === "en"
          ? "Invalid file format. Please upload a PDF or an image (PNG, JPG)."
          : "অগ্রহণযোগ্য ফাইল টাইপ। অনুগ্রহ করে পিডিএফ অথবা ইমেজ (PNG, JPG) আপলোড করুন।"
      );
      return;
    }

    const maxSizeInBytes = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSizeInBytes) {
      setErrorMsg(
        language === "en"
          ? "File size exceeds the 20MB limit."
          : "ফাইল সাইজ ২০ মেগাবাইটের বেশি হতে পারবে না।"
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      const fileType = file.type === "application/pdf" ? "pdf" : "image";
      
      onFileSelect({
        name: file.name,
        size: sizeStr,
        type: fileType,
        dataUrl: dataUrl,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleZoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div id="upload-section" className="mx-auto max-w-4xl px-4 py-16">
      <div className="relative rounded-[32px] border border-slate-200 bg-white p-8 md:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-all duration-300">
        
        {/* Glow effect behind uploader card */}
        <div className="absolute -inset-px rounded-[32px] bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 opacity-50 -z-10 pointer-events-none" />

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-4 shadow-inner">
            <FileUp className="h-6 w-6" />
          </div>
          <h2 className="font-sans text-2.5xl font-black text-slate-900 dark:text-white">
            {language === "en" ? "Analyze Medical Report" : "মেডিকেল রিপোর্ট আপলোড করুন"}
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">
            {language === "en"
              ? "Select your target explanation language and upload your report file below."
              : "আপনার কাঙ্ক্ষিত ব্যাখ্যার ভাষা নির্বাচন করে নিচে রিপোর্টের ছবি বা পিডিএফ আপলোড করুন।"}
          </p>
        </div>

        {/* Step 1: Target Language Selection Panel */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-[24px] bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
              <Languages className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 block">
                {language === "en" ? "Target Language" : "ব্যাখ্যার ভাষা"}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block mt-0.5">
                {language === "en" ? "Choose translation preference" : "অনুবাদ করার ভাষা নির্বাচন করুন"}
              </span>
            </div>
          </div>
          
          <div className="flex rounded-full bg-slate-100 p-1 border border-slate-200/40 dark:bg-slate-900 dark:border-slate-800 w-full md:w-auto">
            <button
              onClick={() => setLanguage("en")}
              className={`flex-1 md:flex-none rounded-full px-6 py-2.5 text-xs font-black transition-all duration-200 cursor-pointer ${
                language === "en"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`}
            >
              English (Plain English)
            </button>
            <button
              onClick={() => setLanguage("bn")}
              className={`flex-1 md:flex-none rounded-full px-6 py-2.5 text-xs font-black transition-all duration-200 cursor-pointer ${
                language === "bn"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`}
            >
              বাংলা (সহজ বাংলা)
            </button>
          </div>
        </div>

        {/* Step 2: Drag & Drop Interactive Canvas Zone */}
        {!selectedFile ? (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={handleZoneClick}
            className={`group cursor-pointer relative rounded-[28px] border-2 border-dashed flex flex-col items-center justify-center p-12 text-center transition-all duration-300 ${
              dragActive
                ? "border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-950/10"
                : "border-slate-300 bg-slate-50/20 hover:border-blue-500 hover:bg-white dark:border-slate-800 dark:bg-slate-950/20 dark:hover:border-blue-500/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleChange}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
            />
            
            {/* Pulsing Upload Icon Bubble */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-850 shadow-sm border border-slate-200/80 dark:border-slate-800 group-hover:scale-110 group-hover:border-blue-500/20 transition-all duration-300">
              <Upload className="h-6 w-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>

            <p className="text-base font-extrabold text-slate-900 dark:text-white">
              {language === "en" ? "Drag & drop your report file here" : "আপনার মেডিকেল রিপোর্ট এখানে ড্র্যাগ করে ছেড়ে দিন"}
            </p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1.5 max-w-xs leading-relaxed">
              {language === "en" 
                ? "or click to search files on your device" 
                : "অথবা আপনার ডিভাইস থেকে ফাইল সিলেক্ট করতে ক্লিক করুন"}
            </p>
            
            <div className="mt-5 flex flex-wrap justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900">PDF, PNG, JPG, JPEG</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900">{language === "en" ? "Max size 20MB" : "সর্বোচ্চ ২০ মেগাবাইট"}</span>
            </div>
          </div>
        ) : (
          /* File Uploaded Preview Card */
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/30 dark:border-slate-800 dark:bg-slate-950 p-6 flex flex-col sm:flex-row items-center gap-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Visual Thumbnail Frame */}
            <div className="flex-shrink-0 h-24 w-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-sm">
              {selectedFile.type === "pdf" ? (
                <div className="flex flex-col items-center gap-1 text-red-500">
                  <FileText className="h-10 w-10 animate-pulse" />
                  <span className="text-[9px] font-black tracking-widest uppercase">PDF</span>
                </div>
              ) : (
                <img
                  src={selectedFile.dataUrl}
                  alt="Clinical Report Preview"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            {/* Informational Text */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs mb-1.5 uppercase tracking-wider">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>{language === "en" ? "Clinical File Loaded" : "ফাইলটি সফলভাবে লোড হয়েছে"}</span>
              </div>
              <h4 className="font-sans text-base font-extrabold text-slate-900 dark:text-white truncate">
                {selectedFile.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
                {selectedFile.size}
              </p>
            </div>

            {/* Action Buttons */}
            <button
              onClick={onClearFile}
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4.5 py-2.5 text-xs font-black text-red-600 hover:bg-red-100 hover:border-red-300 dark:border-red-950/50 dark:bg-red-950/10 dark:text-red-400 transition-all cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              {language === "en" ? "Remove File" : "মুছে ফেলুন"}
            </button>
          </div>
        )}

        {/* Validation Errors Overlay */}
        {errorMsg && (
          <div className="mt-5 flex items-start gap-3 p-4 rounded-2xl bg-red-50 text-red-700 border border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-950/50 text-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-500" />
            <span className="font-semibold leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* Step 3: Call to Action Analyze Trigger */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onAnalyze}
            disabled={!selectedFile}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-12 py-4.5 text-base font-black text-white shadow-lg transition-all duration-300 cursor-pointer ${
              selectedFile
                ? "bg-blue-600 shadow-blue-600/10 hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"
                : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none dark:bg-slate-800 dark:text-slate-600"
            }`}
          >
            <Sparkles className="h-5 w-5" />
            {language === "en" ? "Analyze Report with AI" : "এআই বিশ্লেষণ শুরু করুন"}
          </button>
        </div>

      </div>
    </div>
  );
}
