
import { MoodType, MoodResponse } from "../types";

// Static response matrix for Mood Resonance to eliminate API costs
const STATIC_MOOD_RESPONSES: Record<MoodType, MoodResponse> = {
  'Struggling': {
    message: "It takes immense strength to acknowledge when things are heavy. We are standing with you in this moment.",
    advice: "Try the 5-4-3-2-1 Grounding tool below to bring your focus back to the present safety."
  },
  'Okay': {
    message: "A neutral space is often a place of profound observation. You are doing enough just by being present.",
    advice: "Take 2 minutes for the Box Breathing exercise to maintain your current equilibrium."
  },
  'Good': {
    message: "It's wonderful to see you in a state of flow. May this energy sustain your practice today.",
    advice: "Capture one thing you're grateful for in your professional log today."
  },
  'Great': {
    message: "Your resonance is vibrant. This is a beautiful space from which to support others.",
    advice: "Share a smile or a word of encouragement with a colleague today."
  }
};

const STATIC_JOURNAL_PROMPTS = [
  "What is one small way you can honor your own needs today while remaining present for others?",
  "Reflect on a moment today where you felt truly aligned with your professional purpose.",
  "How are you distinguishing between empathy and emotional labor this week?",
  "What boundary did you successfully hold recently that protected your well-being?",
  "If you were your own supervisor, what compassionate advice would you give yourself right now?",
  "Identify one clinical win from this week, no matter how small it might seem.",
  "What does 'rest' look like for you when you aren't trying to be productive?",
  "How has your perspective on self-care evolved since you started your clinical journey?",
  "Which values are currently guiding your most difficult professional decisions?",
  "What is a piece of feedback you've received that you're still processing?"
];

export const getMoodAdvice = async (mood: MoodType): Promise<MoodResponse> => {
  // Simulate a brief delay to maintain the 'analytical' feel
  await new Promise(resolve => setTimeout(resolve, 800));
  return STATIC_MOOD_RESPONSES[mood];
};

export const getReframedThought = async (negativeThought: string) => {
  // This feature is now marked as 'Coming Soon' in the UI
  return "AI Reframing is currently in development. Please check back soon!";
};

export const getJournalPrompt = async (theme: string) => {
  // Return a random prompt from our curated static library
  await new Promise(resolve => setTimeout(resolve, 500));
  const randomIndex = Math.floor(Math.random() * STATIC_JOURNAL_PROMPTS.length);
  return STATIC_JOURNAL_PROMPTS[randomIndex];
};

export const getInquiryResponse = async (name: string, type: string, message: string) => {
  return `Thank you, ${name}. We have received your inquiry regarding Manovratha's ${type} vertical. A member of our clinical collective will review your message and reach out within 24-48 hours. We look forward to exploring this partnership with you.`;
};
