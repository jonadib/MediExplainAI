import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel, Modality, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up body parser limits for handling PDF/Image base64 payloads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize GoogleGenAI SDK with user-agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// JSON Schema for the structured medical explanation output
const reportAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A patient-friendly overall summary of the medical report. Keep it clear, empathetic, and informative."
    },
    status: {
      type: Type.STRING,
      description: "Overall health category based on findings: 'NORMAL' (all within normal ranges), 'NEEDS_ATTENTION' (some mildly abnormal values or warnings), or 'CONSULT_DOCTOR' (significant abnormalities or explicit instruction to see a doctor)."
    },
    findings: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Name of the finding or category" },
          status: { type: Type.STRING, description: "Status: 'normal', 'abnormal', or 'informational'" },
          description: { type: Type.STRING, description: "Plain language explanation of what this finding means." }
        },
        required: ["title", "status", "description"]
      },
      description: "Key findings, groups, or sections parsed from the report."
    },
    abnormalValues: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          test: { type: Type.STRING, description: "Name of the test or marker (e.g., Hemoglobin, Serum Creatinine, Cholesterol)" },
          result: { type: Type.STRING, description: "The patient's actual result value with units if available" },
          reference: { type: Type.STRING, description: "The standard reference range or limit listed in the report" },
          explanation: { type: Type.STRING, description: "Plain explanation of why this matters, without diagnosing diseases." }
        },
        required: ["test", "result", "reference", "explanation"]
      },
      description: "List of test results that are explicitly outside reference ranges."
    },
    medicalTerms: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          term: { type: Type.STRING, description: "The complex medical term used in the report" },
          explanation: { type: Type.STRING, description: "A simple, easy-to-understand definition" }
        },
        required: ["term", "explanation"]
      },
      description: "Glossary of complex terms simplified."
    },
    doctorQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Suggestions of constructive questions the patient can ask their doctor based on this report."
    },
    lifestyleTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "General supportive health and wellness lifestyle suggestions that are non-diagnostic and broadly safe."
    },
    disclaimer: {
      type: Type.STRING,
      description: "Required warning banner explaining that this is for educational purposes only and not a substitute for medical advice."
    }
  },
  required: ["summary", "status", "findings", "abnormalValues", "medicalTerms", "doctorQuestions", "lifestyleTips", "disclaimer"]
};

// API: Analyze report using gemini-3.1-pro-preview with thinking level HIGH
app.post("/api/analyze", async (req, res) => {
  try {
    const { file, mimeType, language = "en" } = req.body;

    if (!file || !mimeType) {
      return res.status(400).json({ error: "Missing required file data or mimeType." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key is not configured on the server." });
    }

    // Clean up base64 string if it contains data prefix
    const base64Data = file.replace(/^data:[^;]+;base64,/, "");

    const langInstruction = language === "bn"
      ? "IMPORTANT: You MUST generate all text, explanations, titles, and descriptions in Bangla (বাংলা), except for scientific test names, units, and technical medical terms which can be kept in English or transliterated if clearer."
      : "IMPORTANT: You MUST generate all text, explanations, titles, and descriptions in clear, simple plain English.";

    const promptText = `
You are an experienced, compassionate medical report explainer. Your sole responsibility is to translate and explain complex medical reports in simple, patient-friendly language.

${langInstruction}

Rules:
1. NEVER diagnose diseases or prescribe treatments. Keep explanations educational, safe, and objective.
2. Read the uploaded file (PDF or Image) carefully. Extract all tests, results, units, and ranges.
3. Identify abnormal findings ONLY if they are explicitly outside the report's provided reference ranges.
4. Explain complex medical terms in simple analogies or basic words.
5. Provide a clear overall summary, highlight abnormal test values in a structured table format, offer helpful questions to ask a doctor, and list general, non-diagnostic lifestyle suggestions (e.g., staying hydrated, mild walking, balanced diet, sleeping well).
6. Always include a clear disclaimer stating that this report was analyzed by AI, is purely educational, and must be reviewed with a registered medical professional.

Format the output strictly as a JSON object matching the requested schema.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        },
        {
          text: promptText
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: reportAnalysisSchema
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response content generated from Gemini.");
    }

    // Parse the JSON output safely
    const parsedData = JSON.parse(responseText.trim());
    res.json(parsedData);

  } catch (error: any) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze the medical report." });
  }
});

// API: Convert text to speech using gemini-3.1-flash-tts-preview
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voice = "Kore" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text for speech synthesis." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key is not configured on the server." });
    }

    // Call Gemini TTS model
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Read this medical report explanation text clearly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // Voices: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ audio: base64Audio });
    } else {
      res.status(500).json({ error: "TTS model did not return audio data." });
    }

  } catch (error: any) {
    console.error("TTS Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate speech." });
  }
});

// Main async start function to boot Express & Vite Dev server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
