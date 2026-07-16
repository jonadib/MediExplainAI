import { AnalysisResult } from "./types";

export const sampleResultEn: AnalysisResult = {
  summary: "This report represents a routine blood panel (Complete Blood Count and basic metabolic markers). The overall results are largely stable, with a few key markers slightly outside standard limits. Specifically, there is mild anemia (low hemoglobin) and a slightly elevated white blood cell count, which is a common response to mild infection or stress. Your kidney and thyroid markers are completely normal. There is no cause for panic, but these findings should be discussed with your primary care provider.",
  status: "NEEDS_ATTENTION",
  findings: [
    {
      title: "Red Blood Cell Indices",
      status: "abnormal",
      description: "Your hemoglobin level is slightly lower than normal, suggesting mild anemia. Red blood cells carry oxygen throughout your body; low levels can make you feel slightly fatigued."
    },
    {
      title: "Immune & Defense Cells",
      status: "abnormal",
      description: "Your white blood cell (WBC) count is slightly above the upper limit of the normal range. This is frequently a natural and temporary response by your body's immune system to fight off minor inflammation, stress, or infection."
    },
    {
      title: "Kidney Filtration",
      status: "normal",
      description: "Serum creatinine level is well within the healthy reference range, indicating that your kidneys are filtering wastes from your blood effectively."
    },
    {
      title: "Thyroid Regulation",
      status: "normal",
      description: "The Thyroid Stimulating Hormone (TSH) is normal, confirming that your thyroid gland is functioning properly to regulate your body's energy use."
    }
  ],
  abnormalValues: [
    {
      test: "Hemoglobin (Hb)",
      result: "10.8 g/dL",
      reference: "12.0 - 15.5 g/dL",
      explanation: "Low hemoglobin means fewer oxygen-carrying cells. It is often linked to low dietary iron intake or minor blood loss. Mild anemia can cause lightheadedness or fatigue."
    },
    {
      test: "White Blood Cell Count (WBC)",
      result: "11,200 cells/mcL",
      reference: "4,500 - 11,000 cells/mcL",
      explanation: "A slightly elevated WBC count is your immune system's standard reaction to minor physical stress, mild infections, or minor tissue irritation."
    }
  ],
  medicalTerms: [
    {
      term: "Hemoglobin",
      explanation: "An iron-rich protein inside red blood cells that binds to oxygen in the lungs and carries it to the rest of the body."
    },
    {
      term: "WBC (Leukocytes)",
      explanation: "Cells of the immune system that protect the body against infectious diseases and foreign invaders."
    },
    {
      term: "Creatinine",
      explanation: "A chemical waste product produced by muscle metabolism, filtered out of the body by healthy kidneys."
    }
  ],
  doctorQuestions: [
    "What could be the primary cause of my mildly low Hemoglobin?",
    "Do you recommend checking my iron or ferritin levels?",
    "Could my slightly elevated white blood cell count be related to my recent mild cold or stress?",
    "Should we repeat this test in a few weeks to monitor these values?"
  ],
  lifestyleTips: [
    "Incorporate iron-rich foods into your diet, such as dark leafy greens, lentils, beans, and lean proteins.",
    "Pair iron-rich foods with Vitamin C (like citrus fruits or bell peppers) to dramatically increase iron absorption.",
    "Ensure you stay properly hydrated by drinking 8-10 glasses of water daily, which supports overall blood volume.",
    "Maintain a consistent sleep schedule to help your immune system rest and recover from minor stresses."
  ],
  disclaimer: "DISCLAIMER: This explanation is powered by medical AI for general educational purposes only. It is NOT a medical diagnosis, does NOT prescribe medication, and CANNOT substitute for the professional clinical judgment of a registered medical professional. Please share these findings with your doctor."
};

export const sampleResultBn: AnalysisResult = {
  summary: "এই রিপোর্টে রক্তের একটি সাধারণ পরীক্ষা (কমপ্লিট ব্লাড কাউন্ট এবং কিডনি ও থাইরয়েডের সাধারণ মার্কার) দেখানো হয়েছে। সামগ্রিকভাবে রিপোর্টটি বেশ ভালো, তবে কয়েকটি মার্কার নির্ধারিত সীমার বাইরে রয়েছে। বিশেষ করে, আপনার রক্তে হিমোগ্লোবিন সামান্য কম (হালকা রক্তস্বল্পতা) এবং শ্বেত রক্তকণিকার পরিমাণ কিছুটা বেশি, যা সাধারণত শরীরে কোনো ছোটখাটো সংক্রমণ বা মানসিক চাপের স্বাভাবিক প্রতিক্রিয়া। আপনার কিডনি এবং থাইরয়েডের কার্যকারিতা সম্পূর্ণ স্বাভাবিক রয়েছে। ভয়ের কোনো কারণ নেই, তবে এই মার্কারগুলো নিয়ে আপনার ডাক্তারের সাথে কথা বলা উচিত।",
  status: "NEEDS_ATTENTION",
  findings: [
    {
      title: "লোহিত রক্তকণিকার সূচক (RBC)",
      status: "abnormal",
      description: "আপনার হিমোগ্লোবিনের মাত্রা স্বাভাবিকের চেয়ে কিছুটা কম, যা মৃদু রক্তস্বল্পতা নির্দেশ করে। লোহিত রক্তকণিকা সারা শরীরে অক্সিজেন পরিবহন করে; এর মাত্রা কম হলে কিছুটা ক্লান্তি লাগতে পারে।"
    },
    {
      title: "রোগ প্রতিরোধ ক্ষমতা ও শ্বেত রক্তকণিকা (WBC)",
      status: "abnormal",
      description: "আপনার শ্বেত রক্তকণিকার (WBC) পরিমাণ স্বাভাবিক সীমার চেয়ে সামান্য বেশি। এটি শরীর সুস্থ রাখার জন্য কোনো ছোটখাটো প্রদাহ বা হালকা সংক্রমণের বিরুদ্ধে রোগ প্রতিরোধ ব্যবস্থার একটি প্রাকৃতিক প্রতিক্রিয়া।"
    },
    {
      title: "কিডনি ফিল্টারিং (Creatinine)",
      status: "normal",
      description: "আপনার সিরাম ক্রিয়েটিনিন মাত্রা সম্পূর্ণ স্বাভাবিক সীমার মধ্যে রয়েছে, যা নির্দেশ করে যে আপনার কিডনি রক্ত থেকে বর্জ্য পদার্থ সঠিকভাবে পরিষ্কার করতে পারছে।"
    },
    {
      title: "থাইরয়েড নিয়ন্ত্রণ (TSH)",
      status: "normal",
      description: "আপনার থাইরয়েড স্টিমুলেটিং হরমোন (TSH) স্বাভাবিক অবস্থায় রয়েছে। এর অর্থ হলো আপনার থাইরয়েড গ্রন্থি শরীরের শক্তি নিয়ন্ত্রণ করতে সঠিকভাবে কাজ করছে।"
    }
  ],
  abnormalValues: [
    {
      test: "হিমোগ্লোবিন (Hb)",
      result: "১০.৮ g/dL",
      reference: "১২.০ - ১৫.৫ g/dL",
      explanation: "হিমোগ্লোবিন কম থাকার অর্থ হলো কোষে অক্সিজেন পৌঁছানোর ক্ষমতা কিছুটা কমে যাওয়া। এটি সাধারণত আয়রনযুক্ত খাবারের ঘাটতি বা সামান্য রক্তক্ষরণের কারণে হতে পারে। এর ফলে শরীর দুর্বল বা ক্লান্ত লাগতে পারে।"
    },
    {
      test: "শ্বেত রক্তকণিকা (WBC Count)",
      result: "১১,২০০ cells/mcL",
      reference: "৪,৫০০ - ১১,০০০ cells/mcL",
      explanation: "শ্বেত রক্তকণিকা সামান্য বৃদ্ধি পাওয়া মানে হলো আপনার শরীর কোনো ছোটখাটো সংক্রমণ বা শারীরিক চাপের বিরুদ্ধে লড়াই করছে। এটি সাধারণত একটি অস্থায়ী প্রতিক্রিয়া।"
    }
  ],
  medicalTerms: [
    {
      term: "হিমোগ্লোবিন (Hemoglobin)",
      explanation: "লোহিত রক্তকণিকার ভেতরে থাকা একটি আয়রন সমৃদ্ধ প্রোটিন যা ফুসফুস থেকে সারা শরীরে অক্সিজেন পৌঁছে দেয়।"
    },
    {
      term: "শ্বেত রক্তকণিকা (WBC)",
      explanation: "শরীরের রোগ প্রতিরোধ ক্ষমতার অন্যতম অংশ, যা বিভিন্ন জীবাণু বা ব্যাকটেরিয়ার আক্রমণ থেকে আমাদের রক্ষা করে।"
    },
    {
      term: "ক্রিয়েটিনিন (Creatinine)",
      explanation: "পেশীর বিপাকীয় প্রক্রিয়ায় তৈরি হওয়া একটি স্বাভাবিক বর্জ্য, যা সুস্থ কিডনি প্রস্রাবের মাধ্যমে শরীর থেকে বের করে দেয়।"
    }
  ],
  doctorQuestions: [
    "আমার হিমোগ্লোবিন সামান্য কম থাকার প্রধান কারণ কী হতে পারে?",
    "আমার রক্তে আয়রন বা ফেরিটিনের মাত্রা পরীক্ষা করার প্রয়োজন আছে কি?",
    "শ্বেত রক্তকণিকা কিছুটা বেশি থাকার পেছনে আমার সাম্প্রতিক ঠান্ডা লাগা বা শারীরিক কোনো চাপের ভূমিকা আছে কি?",
    "কয়েক সপ্তাহ পর এই পরীক্ষাটি পুনরায় করার প্রয়োজন আছে কি?"
  ],
  lifestyleTips: [
    "আপনার খাদ্যতালিকায় আয়রনযুক্ত খাবার যুক্ত করুন, যেমন লাল শাক, কচু শাক, ডাল, শিম এবং ডিম ও মাছ-মাংস।",
    "আয়রণযুক্ত খাবারের সাথে ভিটামিন সি (যেমন লেবু বা আমলকী) খান, এটি শরীরে আয়রন শোষণ করতে দারুণ সাহায্য করে।",
    "দিনে পর্যাপ্ত পরিমাণে পানি পান করুন (৮-১০ গ্লাস), যা রক্তের সামগ্রিক প্রবাহ ঠিক রাখতে সাহায্য করে।",
    "প্রতিদিন সময়মতো ঘুমানো ও পর্যাপ্ত বিশ্রাম নেওয়ার অভ্যাস করুন, যা শরীরের রোগ প্রতিরোধ ক্ষমতাকে সচল রাখে।"
  ],
  disclaimer: "দাবিত্যাগ (DISCLAIMER): এই ব্যাখ্যাটি শুধুমাত্র সাধারণ স্বাস্থ্য সচেতনতা ও শিক্ষার উদ্দেশ্যে তৈরি করা হয়েছে। এটি কোনো পেশাদার চিকিৎসা রোগ নির্ণয় নয়, কোনো ওষুধ প্রেসক্রাইব করে না এবং কোনো রেজিস্টার্ড চিকিৎসকের সরাসরি পরামর্শের বিকল্প হতে পারে না। অনুগ্রহ করে যেকোনো সিদ্ধান্তের আগে আপনার ডাক্তারের সাথে পরামর্শ করুন।"
};
